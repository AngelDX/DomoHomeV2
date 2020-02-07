import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { take, map, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
  	private router:Router,
  	private afAuth:AngularFireAuth,
  	private authService:AuthService
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.afAuth.authState
    .pipe(
      take(1),
      map(authState => !! authState),
        tap(logado => {
        if(!logado){
          this.router.navigate(['/']);
        }
      })
    )
  }
  
}
