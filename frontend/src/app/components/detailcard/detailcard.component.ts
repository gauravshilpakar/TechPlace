import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Items, User } from 'src/app/models/items';
import { TokenService } from 'src/app/service/token/token.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-detailcard',
  templateUrl: './detailcard.component.html',
  styleUrls: ['./detailcard.component.css'],
})
export class DetailcardComponent implements OnInit {
  @Input()
  currentItem: Items | undefined;

  loading:boolean
  sellItemPage=false
  currentUser: User
  constructor(private router: Router, private activatedRoute:ActivatedRoute, private tokenService: TokenService,private userService: UserService) {}


  ngOnInit(): void {
    if(this.router.url==="/sell-item"){
      this.sellItemPage = true;
      this.currentUser = this.tokenService.getUserFromToken()
    }
    else{
      if(this.currentItem){
        console.log(this.currentItem)
        this.userService.getUserFromId(this.currentItem.userId).subscribe(data=>{
          console.log(data)
          this.currentUser = data
        })
      }
      
    }
  }
}
