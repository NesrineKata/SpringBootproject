import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/entity/User';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  @Input()
  u: User;  
  constructor() { }

  ngOnInit(): void {
  }

}
