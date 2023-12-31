import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Items } from 'src/app/models/items';
import { ItemsService } from 'src/app/service/items/items.service';
import { TokenService } from 'src/app/service/token/token.service';

@Component({
  selector: 'app-sellitem',
  templateUrl: './sellitem.component.html',
  styleUrls: ['./sellitem.component.css'],
})
export class SellitemComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private router: Router, 
    private tokenService: TokenService
  ) {}

  submitting: boolean;
  imageUpdated = false;
  reactiveForm: FormGroup;
  currentItem: Items | undefined;
  file: File = null;
  city: string
  state: string

  defaultItem: Items = {
    id: -1,
    name: '',
    price: '',
    description: '',
    availability: true,
    imageUrl: null,
    userId: 0,
    location: 'City, ST',
    datePosted: new Date()
  };

  async ngOnInit(): Promise<void> {
    let routeId: number;
    await this.route.params.subscribe((params) => {
      routeId = params['id'];
      if (routeId) {
        this.itemsService.getItemById(routeId).subscribe((data) => {
          this.currentItem = data;
        });
      } else {
        this.currentItem = this.defaultItem;
      }
    });
    [this.city, this.state] = this.currentItem.location.split(',');
  }

  onChange(event) {
    this.currentItem.location = `${this.city}, ${this.state}`;
    this.file = event.target.files.item(0);
    console.log(event.target.files.item(0));

    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUpdated = true;
        this.currentItem.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.file);
    }
  }

  onSubmit(form: NgForm) {
    this.currentItem.location = `${this.city}, ${this.state}`
    console.log(this.currentItem)
    if (form.controls['name'].valid && form.controls['price'].valid) {
      this.submitting = true;
      console.log(this.currentItem);
      this.submitting = true;
      this.currentItem.imageUrl = null
      this.currentItem.userId = this.tokenService.getUserFromToken().id
      this.itemsService.saveItem(this.currentItem, this.file).subscribe(
        (data) => {
          console.log(data);
          this.submitting = false;
          this.router.navigate(['/']);
        }
      );
    }
  }
}
