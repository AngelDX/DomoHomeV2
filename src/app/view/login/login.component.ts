import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email:string;
  public password:string;

  constructor(public authService:AuthService,public router: Router,private toastr: ToastrService) { }

  ngOnInit() {
  }

  onSubmitLogin(){
  	this.authService.loginEmail(this.email,this.password)
  	.then((res)=>{
      this.toastr.success('Usuario logado correctamente.');
  		this.router.navigate(['./gestion_sensores']);
  	}).catch((err)=>{
  		console.log(err);
      this.toastr.warning(err.message);
  		this.router.navigate(['./']);
  	});
  }

  onClickGoogleLogin(){
    this.authService.loginGoogle()
    .then((res)=>{
      this.toastr.success('Usuario logado con Google correctamente.');
      this.router.navigate(['/gestion_sensores']);
    }).catch(err=>console.log(err.message));
  }

  onClickFacebookLogin(){
    this.authService.loginFacebook()
    .then((res)=>{
      this.toastr.success('Usuario logado con Facebook correctamente.');
      this.router.navigate(['/gestion_sensores']);
    }).catch(err=>console.log(err.message));
  }
  

}
