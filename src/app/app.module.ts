import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFirestoreModule, AngularFirestore} from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { SensoresService } from './services/sensores.service';

import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './view/login/login.component';
import { NotFoundComponent } from './view/not-found/not-found.component';
import { GestionSensoresComponent } from './view/gestion-sensores/gestion-sensores.component';
import { LineChartComponent } from './view/line-chart/line-chart.component';
import { ListarSensoresComponent } from './view/listar-sensores/listar-sensores.component';
import { MainSensoresComponent } from './view/main-sensores/main-sensores.component';
import { TimeChartComponent } from './view/time-chart/time-chart.component';
import { DataSensoresComponent } from './view/data-sensores/data-sensores.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    GestionSensoresComponent,
    LineChartComponent,
    ListarSensoresComponent,
    MainSensoresComponent,
    TimeChartComponent,
    DataSensoresComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), //Conexion Firebase
    AngularFireAuthModule, //Autentificaion con Firebase
    AngularFireDatabaseModule,
    CommonModule,//Toastr: mensajes emergentes
    HttpClientModule,
    ToastrModule.forRoot(),
    DataTablesModule
  ],
  providers: [SensoresService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
