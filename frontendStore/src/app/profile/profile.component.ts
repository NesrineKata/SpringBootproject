import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JwtResponse } from '../entity/JwtResponse';
import { Order } from '../entity/Order';
import { Role } from '../entity/Role';
import { User } from '../entity/User';
import { CartService } from '../service/cart.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUserSubscription: Subscription;
  name$;
  name: string;
  currentUser: JwtResponse;
  orders:Order[];
  user:User;
  isAdmin;
  manager:Role;
  constructor(public userService:UserService,private catService:CartService) { }

  ngOnInit(): void {
   
    this.name$ = this.userService.name$.subscribe(aName => this.name = aName);
  this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.currentUser.roles.forEach(element => {
        if (element==Role.Manager){
          this.isAdmin=true;
                
        } 
        });
     
   
  });
    this.userService.getUserByUsername(this.currentUser.username).subscribe(
      (u)=>{
      this.user=u;
      console.log(u);
  });
 
    this.catService.getOrders().subscribe(
      response=>this.handleSuccessfulResponse(response)
  );

}

handleSuccessfulResponse(response){
this.orders=response;
}
edit(id){

}
}




