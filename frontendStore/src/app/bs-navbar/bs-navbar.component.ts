import { Component, OnInit } from '@angular/core';
import { Category } from '../entity/Category';
import { Role } from '../entity/Role';
import { CategoryService } from '../service/category.service';
import { UserService } from '../service/user.service';
import { Subscription } from 'rxjs';
import { JwtResponse } from '../entity/JwtResponse';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  categories:Array<Category>;
  
  currentUserSubscription: Subscription;
  name$;
  name: string;
  currentUser: JwtResponse;
  isAdmin;
  manager:Role;
  constructor(private seviceCat:CategoryService,public userService:UserService) { 
  }

  ngOnInit(): void {
    this.manager=Role.Manager;
    this.name$ = this.userService.name$.subscribe(aName => this.name = aName);
  this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
     this.currentUser.roles.forEach(element => {
      if (element==Role.Manager)
        this.isAdmin=true;        
      });
   
  });
       //console.log("My role is "+GlobalConstants.role.toString());
    
    //console.log("Manager role is "+this.manager.toString());
    this.seviceCat.getCategories().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
    

  }

  handleSuccessfulResponse(response) {
    this.categories = response;
  }


}
