import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enterprises',
  templateUrl: './enterprises.page.html',
  styleUrls: ['./enterprises.page.scss'],
})
export class EnterprisesPage implements OnInit {
  enterprises = [];
  enterprisesDeletes = [];

  constructor() { }

  ngOnInit() {
    this.enterprises = [
      {nombre:'empresa1',direccion:200343}, //[0]
      {nombre:'empresa2',direccion:5}, //[1]
      {nombre:'empresa3',direccion:'estamos'} //[2]
    ];

    /*
    this.test('aqui');
    this.test(0);
    this.test(this.enterprises);
    this.test(1 + 1);
    this.test('hola');
    
    var variableCualquiera = this.otroFuncion('cacaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    this.test(variableCualquiera);
    
    /* for con nombred
    for(let enterprise of this.enterprises){
      console.log(enterprise.direccion);
    }
    */

/* FOR NORMAL
    console.log('Largo del arreglo',this.enterprises.length);

    for(let i=0; i<this.enterprises.length; i++){
      console.log('Valor de I:',i);
      console.log('enterpise[',i,']:',this.enterprises[i]);
    }
  */  
  }//aqui termina el ngOnInit


/*
  otroFuncion(parametro){
    console.log('este el parametro que entra a la otroFUncion::',parametro);
    parametro = 'chao';
    console.log('este el parametro que sale de la otroFUncion::',parametro);
    return parametro
  }
*/

  deleteEnterprise(x){
    this.enterprisesDeletes.push(this.enterprises[x]);
    this.enterprises.splice(x, 1);
  }
}

