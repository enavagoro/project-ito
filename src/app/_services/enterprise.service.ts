import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})

export class EnterpriseService {
  private url: string = "http://161.35.98.48:5155";
  constructor(private login:LoginService,private http:HttpClient) {
  }

  async list() {  
    return this.http.get<any[]>(`${this.url}/enterprise/` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      //.set('empresaId' , this.login.getEmpresa())
    });
  }
  get(id){
    return this.http.get<any[]>(`${this.url}/enterprise/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      //.set('empresaId' , this.login.getEmpresa())
    });
  }
  insert(enterprise){
    return this.http.post<any[]>(`${this.url}/enterprise/`,enterprise , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      //.set('empresaId' , this.login.getEmpresa())
    });
  }
  update(enterprise,id){
    return this.http.patch<any[]>(`${this.url}/enterprise/${id}`,enterprise , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      //.set('empresaId' , this.login.getEmpresa())
    });
  }

  delete(enterprise,id){
      enterprise.status = false;
      delete enterprise.__v;
      return this.http.patch<any[]>(`${this.url}/enterprise/${id}`,enterprise , {
        headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization' , this.login.getToken())
        //.set('empresaId' , this.login.getEmpresa())
      });
  }
}