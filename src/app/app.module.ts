import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; //Protocolo http para que los servicios se comuniquen con la api
//esto es para los formularios
import {ReactiveFormsModule,FormsModule} from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//paquetes externos

import { IonicStorageModule } from '@ionic/storage';  //Paquete que guarda data

//servicios

import { AuthService } from './_services/auth.service';
import { LoginService } from './_services/login.service';
import { ValidationService } from './_services/validation.service';
import { DataStorageService } from './_services/dataStorage.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(),HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    LoginService,
    DataStorageService,
    ValidationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  schemas :[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
