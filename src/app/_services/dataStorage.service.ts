import { Injectable } from '@angular/core';
@Injectable()

export class DataStorageService {
  private data = [];

  constructor() {

  }
  
  get(dataName){
    return this.data[dataName];
  }

  set(dataName,dataValue){
    this.data[dataName] = dataValue;
    console.log('data-storaged',this.data);
  }

  clear(){
    this.data = [];
    console.log(this.data);
  }
}