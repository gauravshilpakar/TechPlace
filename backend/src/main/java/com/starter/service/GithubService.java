package com.starter.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.starter.entity.GithubUser;
import com.starter.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class GithubService {
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private UserService userService;
    @Value("${spring.security.oauth2.client.registration.github.client-id}")
    private String GITHUB_CLIENT_ID;
    @Value("${spring.security.oauth2.client.registration.github.client-secret}")
    private String GITHUB_CLIENT_SECRET;

    public Map getGithubSigninUri() {
        String url = "https://github.com/login/oauth/authorize";
        UriComponentsBuilder githubBuilder = UriComponentsBuilder.fromUriString(url)
                .queryParam("client_id", GITHUB_CLIENT_ID)
                .queryParam("redirect_uri", "http://localhost:4200/redirect")
                .queryParam("scope", "user:email")
                .queryParam("state", UUID.randomUUID().toString());

        return Collections.singletonMap("response", String.valueOf(githubBuilder.build().toUri()));
    }

    public ResponseEntity<?> getGithubAccessToken(String accessCode) {
        log.info("GithubService.getGithubAccessToken: {}", accessCode);
        String url = "https://github.com/login/oauth/access_token?client_id=fefe781e48f1aec30b1d&client_secret=89388424faafc92ca1e0fd49dd644a1274a14767&code=1084563b0eb0e5ba0f0d&redirect_uri=http://localhost:4200&state=dasdweradasd";
        UriComponentsBuilder githubBuilder = UriComponentsBuilder.fromUriString(url)
                .queryParam("client_id", GITHUB_CLIENT_ID)
                .queryParam("client_secret", GITHUB_CLIENT_SECRET)
                .queryParam("redirect_uri", "http://localhost:4200/")
                .queryParam("code", accessCode.trim());

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);

        ResponseEntity<AccessToken> exchange = restTemplate.exchange(githubBuilder.build().toUri(), HttpMethod.POST, new HttpEntity(httpHeaders), AccessToken.class);
        Object githubUser = null;
        if (exchange.getStatusCode().equals(HttpStatus.OK)
                && exchange.getBody().access_token() != null) {
            githubUser = getGithubUserInfo(exchange.getBody().access_token());
        }
        return new ResponseEntity<>(exchange.getBody(), exchange.getHeaders(), HttpStatus.OK);
    }

    public Object getGithubUserInfo(String bearertoken) {
        log.info("GithubService.getGithubUserInfo: {}", bearertoken);
        String url = "https://api.github.com/user";

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(HttpHeaders.AUTHORIZATION, "Bearer " + bearertoken.trim());
        httpHeaders.add(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);

        ResponseEntity<JsonNode> githubUserExchange = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity(httpHeaders), JsonNode.class);
        JsonNode githubUserBody = githubUserExchange.getBody();

        GithubUser githubUser = new GithubUser(
                githubUserBody.get("id").asLong(),
                githubUserBody.get("name").asText(),
                "",
                githubUserBody.get("avatar_url").asText()
        );
        if (isId(githubUserExchange)) {
            if (githubUserBody.get("email").isNull()) {
                Optional.of(getGithubUserEmail(bearertoken)).ifPresent(d -> {
                    githubUser.setEmail(d);
                });
            }
        }
        checkAndUpdateUserFromGithub(githubUser);
        return githubUser;
    }

    private void checkAndUpdateUserFromGithub(GithubUser githubUser) {
        Optional<User> byEmail = userService.findByEmail(githubUser.getEmail());
        if(!byEmail.isPresent()){
            //Create new user
            User newUser = new User(githubUser.getId(), githubUser.getName(), githubUser.getEmail() , githubUser.getAvatarUrl());
            userService.saveUser(newUser);
        }
    }

    private boolean isId(ResponseEntity<JsonNode> githubUserExchange) {
        return githubUserExchange.getStatusCode().equals(HttpStatus.OK)
                && githubUserExchange.getBody().get("id") != null;
    }

    public String getGithubUserEmail(String bearertoken) {
        log.info("GithubService.getGithubUserEmail: {}", bearertoken);
        String url = "https://api.github.com/user/emails";
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(HttpHeaders.AUTHORIZATION, "Bearer " + bearertoken.trim());
        httpHeaders.add(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);

        ResponseEntity<JsonNode> githubUserEmail = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity(httpHeaders), JsonNode.class);
        String email = null;
        if (githubUserEmail.getStatusCode().equals(HttpStatus.OK)
                && !githubUserEmail.getBody().get(0).get("email").isNull()) {
            email = githubUserEmail.getBody().get(0).get("email").asText();
            log.info("Email: {}", email);
        }
        return email;
    }

    public record AccessToken(String access_token, String token_type, String scope) {
    }
}
