import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Items, User } from 'src/app/models/items';
import { ItemsService } from 'src/app/service/items/items.service';
import { TokenService } from 'src/app/service/token/token.service';
import { CONSTANT_DELAY } from 'src/app/service/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private tokenService: TokenService,
    private itemService: ItemsService,
    private router: Router
  ) {}

  currentUser: User;
  currentUserItems: Items[];
  showDeleteModal = false;
  loading = false;
  errorOccurred = false;
  selectedItemForDeletion: Items;

  ngOnInit(): void {
    this.initLoad()
  }

  initLoad(){
    this.currentUser = this.tokenService.getUserFromToken();
    this.itemService
      .getAllItemsByUserId(this.currentUser.id)
      .subscribe((data) => {
        console.log(data);
        this.currentUserItems = data;
      });
  }

  handleEdit(id: number) {
    this.router.navigate(['edit-item', id]);
  }

  handleDelete(id: number) {
    this.loading = true;
    this.errorOccurred = false;

    const item = this.currentUserItems.find((data) => data.id === id);
    this.selectedItemForDeletion = item;
    setTimeout(() => {
      console.log('Deleting ' + this.selectedItemForDeletion.name);
      this.itemService.deleteItem(this.selectedItemForDeletion.id).subscribe({
        next: (data)=> {
          this.loading = false;
          this.toggleDeleteModal(-1)
          this.initLoad();
        },error:(msg)=>{
          console.log("Error "+msg.error)
          this.loading = false;
          this.errorOccurred = true;
          console.log(this.errorOccurred)
          console.log(this.loading)
        }
      });
    }, CONSTANT_DELAY);
  }

  toggleDeleteModal(id: number) {
    if(id!=-1){
      const item = this.currentUserItems.find((data) => data.id === id);
      this.selectedItemForDeletion = item;
    }
  
    this.showDeleteModal = !this.showDeleteModal;
  }
}


