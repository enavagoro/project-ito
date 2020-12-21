import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private token : string = "";
  private url: string = "http://161.35.98.48:5155";
  private empresa : string = "";
  constructor(private router:Router,private storage : Storage,private http:HttpClient) {
    this.storage.get('user').then((val) => {
      if(val){
        this.setEmpresa(val['empresa']);
        this.setToken(val['token']);
      }else{
        this.router.navigate(['/login'], {replaceUrl: true});
      }
    })
  }
  
  public getUrl(){
    return new Promise(resolve => {
      resolve("http://161.35.98.48:5155");
    });
  }
  
  public getEmpresa(){
    return this.empresa;
  }  
  public setEmpresa(em){
    this.empresa = em;
  }
  public setToken(t){
    this.token = t;
  }
  public getToken(){
    return "Bearer "+this.token;
  }
  public setUser(user){
    this.storage.set('user', user);
  }
  async getUser(form){
    this.url = <string>await this.getUrl();
    //this.url = "https://api.vase.cl";
    console.log('estoy dentro');

    return this.http.post<any[]>(`${this.url}/user/login/`,form , {
      headers: new HttpHeaders()
      .set('Authorization','Bearer '+this.token)
      .set('Content-Type', 'application/json')
    });
  }
}