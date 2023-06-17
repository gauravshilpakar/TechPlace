import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  constructor(private router: Router, public tokenService: TokenService) {}

  ngOnInit(): void {}
  spinner = false;

  logout() {
    this.spinner = true;
    setTimeout(() => {
      this.tokenService.removeAllToken();
      this.spinner = false;
      window.location.reload()
    }, 3000);
  }

  handleCreateListing() {
   if(this.tokenService.isLoggedIn()){
    this.router.navigate(["/sell-item"])
   }else{
    this.router.navigate(["/login"])
   }
    }
}
