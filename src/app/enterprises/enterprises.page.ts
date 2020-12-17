import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-enterprises',
  templateUrl: './enterprises.page.html',
  styleUrls: ['./enterprises.page.scss'],
})
export class EnterprisesPage implements OnInit {
  enterprises = [];
  listTitleEnterprise = 'Lista de Empresas';

  constructor(public actionSheetController: ActionSheetController,
              private router: Router) { }

  ngOnInit() {
    this.enterprises = [
      {nombre:'empresa1',direccion:200343}, //[0]
      {nombre:'empresa2',direccion:5}, //[1]
      {nombre:'empresa3',direccion:'estamos'} //[2]
    ];
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
          this.navigateToEnterprise();
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


  navigateToEnterprise(/*form*/){
    //this.dataStorage.set(form);
    this.router.navigateByUrl("enterprises/enterprise");
    //this.closeModal();
  }

}

