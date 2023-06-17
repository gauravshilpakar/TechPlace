import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AVATAR_URL, EMAIL, ID, NAME, PROXY_URL } from '../utils';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getAuthPage(): Observable<String> {
    return this.http.get<String>(PROXY_URL + '/signin');
  }

  getAcessToken(accessCode: string): any {
    return this.http.post(PROXY_URL + '/signin/getAccessToken', { accessCode });
  }

  getGithubUserInfo(accessToken: string) {
    return this.http.post(PROXY_URL + '/signin/githubUserInfo', {
      accessToken,
    });
  }

  loadUserDetails() {
    this.getGithubUserInfo(localStorage.getItem('access_token')).subscribe(
      (data) => {
        console.log(data);
        this.tokenService.setToken(ID, data['id']);
        this.tokenService.setToken(NAME, data['name']);
        this.tokenService.setToken(EMAIL, data['email']);
        this.tokenService.setToken(AVATAR_URL, data['avatarUrl']);

        const items = { ...localStorage };
        for (const key in items) {
          console.log(key, this.tokenService.getTokenFromKey(key))
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
