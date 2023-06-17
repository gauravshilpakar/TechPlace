import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { ItemsService } from '../../service/items/items.service';
import { Items } from '../../models/items';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit{
  loaded = false;
  itemsArray: Items[] = [];
  selectedItem: Items | undefined;
  showModal = false;
  loadingItem = false;

  constructor(private itemService: ItemsService, private router: Router) {}

  ngOnInit(): void {
    this.itemService.getAllItems().subscribe((data) => {
      console.log(data);
      this.itemsArray = data;
      this.toggleLoaded();
    });
  }

  toggleLoaded() {
    if (this.itemsArray.length > 0) this.loaded = true;
  }

  handleCardLoad(id: number) {
    console.log(id);

    this.loadingItem = true;
    this.showModal = true;

    setTimeout(() => {
      this.loadingItem = false;
      const item = this.itemsArray.find((data) => data.id === id);
      this.selectedItem = item;
    }, );
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
