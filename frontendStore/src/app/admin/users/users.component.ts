import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/entity/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<User>;
  //booksRecieved: Array<Book>;
  selectedUser: User;
  action: string;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }


    ngOnInit() {
      this.refreshData();
    }
  
    refreshData() {
      this.userService.getUsers().subscribe(
        response => this.handleSuccessfulResponse(response)
      );
     
     this.route.queryParams.subscribe(
        (params) => {
          this.action=params.action;
          const id= params.id;
          if (id) {
            this.selectedUser = this.users.find(p => p.id ==id);
          }
        });
  
    }
  
   
    handleSuccessfulResponse(response) {
      
      this.users = response;
    }
  
    addUser() {
      this.selectedUser = new User();
      this.router.navigate(['admin', 'users'], { queryParams: { action: 'add' } });
    }
  
    viewUser(id: number) {
      this.router.navigate(['admin', 'users'], { queryParams: { id, action: 'view' } });
    }
  }