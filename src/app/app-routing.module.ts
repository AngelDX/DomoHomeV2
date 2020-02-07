import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './view/login/login.component';
import { GestionSensoresComponent } from './view/gestion-sensores/gestion-sensores.component';
import { MainSensoresComponent } from './view/main-sensores/main-sensores.component';
import { ListarSensoresComponent } from './view/listar-sensores/listar-sensores.component';
import { NotFoundComponent } from './view/not-found/not-found.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'main_sensores',component:MainSensoresComponent,canActivate:[AuthGuard]},
  {path:'gestion_sensores',component:GestionSensoresComponent,canActivate:[AuthGuard]},
  {path:'listar_sensores',component:ListarSensoresComponent,canActivate:[AuthGuard]},
  {path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
