import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Items } from 'src/app/models/items';
import { ItemsService } from 'src/app/service/items/items.service';
import { TokenService } from 'src/app/service/token/token.service';
import { UserService } from 'src/app/service/user/user.service';


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

  defaultItem: Items = {
    id: -1,
    name: '',
    price: '',
    description: '',
    availability: true,
    imageUrl: null,
    userId: 0,
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
  }

  onChange(event) {
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
    console.log(form.controls['name'].valid && form.controls['price'].valid)
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
