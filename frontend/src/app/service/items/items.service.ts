import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Items } from 'src/app/models/items';
import { API_URL } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  
  constructor(private http: HttpClient) { }

  getAllItems(){
    return this.http.get<Items[]>(`${API_URL}/items`)
  }
  getItemById(id:number){
    return this.http.get<Items>(`${API_URL}/items/${id}`)
  }

  getAllItemsByUserId(id: number) {
    return this.http.get<Items[]>(`${API_URL}/items/user/${id}`)
  }

  saveItem(item:Items, file:File){
    const formData: FormData = new FormData()
    formData.append('file', file, file.name)
    formData.append('item', JSON.stringify(item))
    return this.http.post<Items>(`${API_URL}/items/save`, formData, {
      reportProgress: true,
      responseType: 'json'
    })
  }
  
  deleteItem(itemId: number){
    return this.http.delete(`${API_URL}/items/delete/${itemId}`);
  }
}
