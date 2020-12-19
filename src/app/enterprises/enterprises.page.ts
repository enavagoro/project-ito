import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { LoginService } from '../_services/login.service';
import { Storage } from '@ionic/storage';
import { EnterpriseService } from '../_services/enterprise.service';
//import { UsuariosService } from '../_servicios/users.service';

@Component({
  selector: 'app-enterprises',
  templateUrl: './enterprises.page.html',
  styleUrls: ['./enterprises.page.scss'],
})
export class EnterprisesPage implements OnInit {
  enterprises = [];
  listTitleEnterprise = 'Lista de Empresas';

  constructor(public actionSheetController: ActionSheetController,
              private router: Router,
              private login : LoginService,
              private enterpriseService: EnterpriseService,
              private storage: Storage) { }

  ngOnInit() {
    this.storage.get('user').then((val) => {
      console.log('este es el val',val);
      if(val){
        this.chargeData();
        /*
        this.cargaInicial();
        this.usuario = val;
        console.log(val);
        var permission = this.usuarioService.tienePermiso(val,'ventas');
        if(permission){
          this.permission = permission;
          if(!permission.r){
            this.storage.clear();
            this.router.navigate(['/login'], {replaceUrl: true});
          }
        }
        */
      }else{
        this.router.navigate(['/login'], {replaceUrl: true});
      }
    })
/*
    this.enterprises = [
      {nombre:'empresa1',direccion:200343}, //[0]
      {nombre:'empresa2',direccion:5}, //[1]
      {nombre:'empresa3',direccion:'estamos'}, //[2]
      {nombre:'empresa1',direccion:200343}, //[0]
      {nombre:'empresa2',direccion:5}, //[1]
      {nombre:'empresa3',direccion:'estamos'}, //[2]
      {nombre:'empresa1',direccion:200343}, //[0]
      {nombre:'empresa2',direccion:5}, //[1]
      {nombre:'empresa3',direccion:'estamos'}, //[2]
      {nombre:'empresa1',direccion:200343}, //[0]
      {nombre:'empresa2',direccion:5}, //[1]
      {nombre:'empresa3',direccion:'estamos'} //[2]
    ];
    */
  }

  ngAfterViewInit(){

  }

  chargeData(){
    this.enterpriseService.list().then(servicio=>{
      servicio.subscribe(data=>{
        this.enterprises = data;
      })
    })
  }

  displayEnterpriseOptions(enterprise){
    console.log(enterprise);
  }

  deleteEnterprise(x){
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [
      {
        text: 'Ingresar',
        icon: 'eye',
        handler: () => {
          
        }
      },{
        text: 'Editar',
        icon: 'pencil',
        handler: () => {
          //this.navigateToEnterprise();
        }
      },{
        text: 'Desactivar',
        icon: 'trash',
        handler: () => {
          
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


  navigateToEnterprise(){
    this.router.navigateByUrl("enterprises/enterprise");
  }

  logOut(){
    console.log("cerrar sesion");
    this.storage.clear();
    console.log(this.storage.get('user'))
    this.router.navigate(['/login'], {replaceUrl: true});
  }

}

