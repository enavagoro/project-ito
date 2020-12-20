import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { LoginService } from '../_services/login.service';
import { Storage } from '@ionic/storage';
import { EnterpriseService } from '../_services/enterprise.service';
import { DataStorageService } from 'src/app/_services/dataStorage.service';

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
              public alertController:AlertController,
              private enterpriseService: EnterpriseService,
              private dataStorage: DataStorageService,              
              private storage: Storage) { 
                this.router.routeReuseStrategy.shouldReuseRoute = function() {
                  return false;
              };
              }

  ngOnInit() {
    console.log('hola');
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
  }

  ngAfterViewInit(){

  }

  chargeData(){
    this.enterpriseService.list().then(servicio=>{
      servicio.subscribe(enterprisesData=>{
        var enterprises = [];
        enterprisesData.map(data=>{
          if(data.status==true){
            enterprises.push(data);
          }
        })
        this.enterprises = enterprises;        
        console.log('empresas',this.enterprises);
      })
    })
  }

  desactivateEnterprise(enterprise){
    this.enterpriseService.delete(enterprise,enterprise['_id']).subscribe(data=>{
      this.chargeData();
      this.deleteAlert();
    })
  }

  async enterpriseOptions(enterpriseIndex) {
    var enterprise = this.enterprises[enterpriseIndex];

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
          this.dataStorage.set('enterprise',enterprise);
          this.navigateToEnterprise({status:'update',value:1});
        }
      },{
        text: 'Borrar',
        icon: 'trash',
        handler: () => {
          this.confirmDelete(enterprise);
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

  async confirmDelete(enterprise) {
    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: '¡Estás a punto de borrar una empresa!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Cancelado');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.desactivateEnterprise(enterprise);            
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteAlert() {
    const alert = await this.alertController.create({
      header: 'Información',
      message: '¡Empresa borrada exitosamente!',
      buttons: [{
          text: 'Okay',
          handler: () => {

          }
        }
      ]
    });

    await alert.present();
  }


  ionViewWillEnter(){
    this.chargeData();
  }

  navigateToEnterprise(crudStatus){
    console.log('crudStatus',crudStatus);
    this.dataStorage.set('crudEnterpriseStatus',crudStatus);
    this.router.navigateByUrl("enterprises/enterprise");
  }

  logOut(){
    console.log("cerrar sesion");
    this.dataStorage.clear();
    this.storage.clear();
    console.log(this.storage.get('user'))
    this.router.navigate(['/login'], {replaceUrl: true});
  }

}

