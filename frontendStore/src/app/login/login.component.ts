import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};

  isLoggedIn:boolean;
  isInvalid: boolean;
  isLogout: boolean;
  submitted = false;
  
  returnUrl = '/';
  roles: string[] = [];
  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    
    let params = this.route.snapshot.queryParamMap;
    this.isLogout = params.has('logout');
    this.returnUrl = params.get('returnUrl');
    
  }

  onSubmit() {
    
        // this.loginInfo = new AuthLoginInfo(
          this.form.username,
          this.form.password;
          this.userService.login(this.form).subscribe(
            user => {
                if (user) {
                    this.router.navigateByUrl(this.returnUrl);
                } else {
                   // this.isLogout = false;
                    this.isInvalid = true;
                }

            }
        );
    
  }


}
