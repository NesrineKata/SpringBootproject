import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {
  @Input()
  u: User;
  @Output()
  userDeletedEvent = new EventEmitter();
  constructor(private http:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  deleteUser() {
    this.http.deleteUser(this.u.id).subscribe(
      (u) => {
        this.userDeletedEvent.emit();
        this.router.navigate(['admin', 'users']);
      }
    );
  }
}
