import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { LoginService } from 'src/app/service/login/login.service';
import { firstValueFrom, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {}
  authUrl = '';

  ngOnInit() {
    this.loginService.getAuthPage().subscribe((response) => {
      console.log(response)
      this.authUrl = response['response'];
    });
  }

  handleLogin() {
    this.router.navigate(['/dummy'],{queryParams:{url:this.authUrl}});
  }
}
