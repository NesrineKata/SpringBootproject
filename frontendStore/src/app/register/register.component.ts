import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../entity/User';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  //signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

 
 user:User;
  constructor(
   
               private userService: UserService,
               private router: Router) {this.user=new User() }

  ngOnInit() { }

  onSubmit() {
    /*console.log(this.form);

    this.signupInfo = new SignUpInfo(
      */
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password;
      
      this.userService.signUp(this.form).subscribe(u => {
        this.router.navigate(['/login']);
      },
        
          e => {
            console.log("error");
          });
      
    }
    

}
