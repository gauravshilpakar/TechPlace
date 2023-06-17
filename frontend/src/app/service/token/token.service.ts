import { Injectable, OnInit } from '@angular/core';
import { ACCESS_TOKEN, AVATAR_URL, EMAIL, ID, NAME } from '../utils';
import { User } from 'src/app/models/items';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  setToken(key, token): void {
    localStorage.setItem(key, token);
  }

  getTokenFromKey(key): string {
    return localStorage.getItem(key);
  }

  removeToken(): void {
    localStorage.removeItem(ACCESS_TOKEN);
  }

  isLoggedIn(): boolean {
    return this.getTokenFromKey(ACCESS_TOKEN) !== null;
  }
  
  removeAllToken() {
    localStorage.clear();
  }

  getUserFromToken (): User{
      let user: User = {
        id: parseInt(this.getTokenFromKey(ID)),
        name:this.getTokenFromKey(NAME),
        email:this.getTokenFromKey(EMAIL),
        avatarUrl: this.getTokenFromKey(AVATAR_URL)
      }
      return user;
  }
}
