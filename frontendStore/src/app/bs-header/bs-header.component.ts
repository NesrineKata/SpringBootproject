import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bs-header',
  templateUrl: './bs-header.component.html',
  styleUrls: ['./bs-header.component.css']
})
export class BsHeaderComponent implements OnInit {
  userAccount: string;
  showLoginButton: boolean;

  constructor(private router: Router) {
   
  }

  ngOnInit() {
    this.userAccount="user";
    this.showLoginButton=true;
  }
}
