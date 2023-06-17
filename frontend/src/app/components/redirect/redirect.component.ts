import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';
import { TokenService } from 'src/app/service/token/token.service';
import { ACCESS_TOKEN } from 'src/app/service/utils';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css'],
})
export class RedirectComponent {
  constructor(
    private active: ActivatedRoute,
    private service: LoginService,
    public tokenService: TokenService
  ) {}

  loading = true;
  errorOccurred = false;
  loggedIn = false;

  ngOnInit() {
    setTimeout(() => {
      this.active.queryParams.subscribe((params) => {
        const code = params['code'];
        this.service.getAcessToken(code).subscribe(
          (data) => {
            this.tokenService.setToken(ACCESS_TOKEN, data["access_token"])
            this.service.loadUserDetails()
            this.loading = false;
            this.loggedIn = true;
            setTimeout(()=>{
              window.location.assign("/")
            },3000)
          },
          (err) => {
            console.log(err);
            this.errorOccurred = true;
            this.loading = false;
          }
        );
      });
    }, 2000);
  }
  
}


