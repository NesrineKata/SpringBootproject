import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JwtResponse } from '../entity/JwtResponse';
import { Role } from '../entity/Role';
import { User } from '../entity/User';
import { CategoryService } from '../service/category.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-bs-header',
  templateUrl: './bs-header.component.html',
  styleUrls: ['./bs-header.component.css']
})
export class BsHeaderComponent implements OnInit {
  info: any;
  currentUserSubscription: Subscription;
    name$;
    name: string;
    currentUser: JwtResponse;
    root = '/';
    Role = Role;
    values:string;
    u:User;
    car:string;
    constructor(private userService: UserService,
      private router: Router,private cat:CategoryService 
) {
  //window.location.reload();

}

ngOnInit() {
  this.name$ = this.userService.name$.subscribe(aName => this.name = aName);
  this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
     // if (!user || user.role == Role.Customer) {
          this.root = '';
     // } else {
        //  this.root = '/seller';
     // }
  });

}
 routeMe(){
   if(this.currentUser)
      this.router.navigateByUrl("/cart");
    else
     this.router.navigateByUrl("/login");
 }
 searchForMe(){
    console.log(this.car);
    this.router.navigate(['searchhome'], { queryParams: {str: this.car } });
 }
  logout() {
   this.userService.logout();
   // window.location.reload();
  }

  

 
 /* private setUserName() {
    if (this.authenticationService.getUserName() != null) {
      this.userAccount = this.authenticationService.getUserName();
      this.showLoginButton = false;
    } else {
      this.showLoginButton = true;
    }
   
  }
   */
  

}
