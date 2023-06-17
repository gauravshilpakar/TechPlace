package com.starter.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.starter.service.GithubService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200", exposedHeaders = {"Access-Control-Allow-Origin"})
public class GithubUserController {

    @Autowired
    GithubService githubService;
    @Autowired
    private RestTemplate restTemplate;
    @Value("${spring.security.oauth2.client.registration.github.client-id}")
    private String GITHUB_CLIENT_ID;
    @Value("${spring.security.oauth2.client.registration.github.client-secret}")
    private String GITHUB_CLIENT_SECRET;

    public void signin() {
        Map<String, String> variables = new HashMap<>();
        variables.put("client_id", GITHUB_CLIENT_ID);
        variables.put("redirect_uri", "http://localhost:4200/");
        variables.put("scope", "read:user");
        variables.put("state", UUID.randomUUID().toString());

        String uri = "https://github.com/login/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&scope={scope}&state={state}";
        System.out.println("Sigin Uri");

        System.out.println(uri);

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.ACCEPT, MediaType.TEXT_HTML_VALUE);
        HttpEntity<?> entity = new HttpEntity<>(headers);
        ResponseEntity<String> exchange = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class, variables);
    }

    @RequestMapping("/signin")
    public Map githubSignin() {
        log.info("/api/signin");
        return githubService.getGithubSigninUri();
    }

    @PostMapping(value = "/signin/getAccessToken")
    public ResponseEntity<?> getAccessToken(@RequestBody JsonNode accessCode) {
        log.info("/api/signin/getAccessToken accessCode: {}", accessCode.get("accessCode"));
        return githubService.getGithubAccessToken(accessCode.get("accessCode").asText());
    }

    @PostMapping("/signin/githubUserInfo")
    Object getGithubUserInfo(@RequestBody JsonNode bearerToken){
        log.info("/api/signin/githubUserInfo bearerToken: {}", bearerToken.get("accessToken"));
        return githubService.getGithubUserInfo(bearerToken.get("accessToken").asText());
    }
}
