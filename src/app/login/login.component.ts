  
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private _myservice: MyserviceService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute ,
    private toaster :ToastrService 
      ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

  }

  ngOnInit() {
  }

  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  login() {
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this._myservice.login(this.loginForm.value)
        .subscribe(
          data => {
            console.log(data);
            localStorage.setItem('token', data.toString());
            this._router.navigate(['/']);
            this.toaster.success('Bienvenu chez Let\'Shop');
          },
          error => { this.toaster.error('veuillez vérifier vos credentials ');}
        );
    }
   
  }

  movetoregister() {
    this._router.navigate(['/register'], { relativeTo: this._activatedRoute });
  }
}