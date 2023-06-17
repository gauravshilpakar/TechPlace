import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../utils';
import { User } from 'src/app/models/items';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUserFromId(id:number){
    return this.httpClient.get<User>(API_URL+"/user/"+id)
  }

  
}