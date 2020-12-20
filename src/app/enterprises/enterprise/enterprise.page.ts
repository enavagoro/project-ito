import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../_services/login.service';
import { ValidationService } from '../../_services/validation.service';
import { EnterpriseService } from '../../_services/enterprise.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, Validators} from '@angular/forms';
import { Storage } from '@ionic/storage';
import { DataStorageService } from 'src/app/_services/dataStorage.service';

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.page.html',
  styleUrls: ['./enterprise.page.scss'],
})

export class EnterprisePage implements OnInit {
  formTitle = '';
  formValue;
  crudStatus = [{value:0,title:'Crear Empresa'},{value:1,title:'Editar Empresa'}];
  enterpriseForm;
  enterprise = {name:'',address:''};
  
  constructor(private loginService: LoginService,
              public router:Router,
              public alertController:AlertController,
              private formBuilder:FormBuilder,
              private storage: Storage,
              private dataStorage: DataStorageService,
              private enterpriseService: EnterpriseService) {
    this.enterpriseForm = this.formBuilder.group({
      name : ['',Validators.required],
      address : ['',Validators.required],
      status: [true],
    });
   }

  ngOnInit() {
    this.storage.get('user').then((val) => {
      if(val){
        var crudStatus = this.dataStorage.get('crudEnterpriseStatus');
        this.formTitle = this.crudStatus[crudStatus.value].title;
        this.formValue = this.crudStatus[crudStatus.value].value;
        if(crudStatus.status == 'update'){
          this.setUpForm();          
        }
      }else{
        this.router.navigate(['/login'], {replaceUrl: true});
      }
    })
  }

  saveEnterprise(){
    this.insertEnterprise();
  }

  insertEnterprise(){
    //this.enterpriseForm.controls['status'].setValue(true);
    this.enterpriseService.insert(this.enterpriseForm.value).subscribe(data=>{
      this.userStatus('creado');
      this.cleanPersonForm();
    })
  }

  updateEnterprise(){
    this.enterpriseService.update(this.enterpriseForm.value,this.enterprise['_id']).subscribe(data=>{
      this.userStatus('actualizado');      
    })
  }

  cleanPersonForm(){
    this.enterpriseForm.reset();
  }

  setUpForm(){
    this.enterprise = this.dataStorage.get('enterprise');
    for(var index in this.enterprise){
      if(this.enterpriseForm.controls[index]){
        this.enterpriseForm.controls[index].setValue(this.enterprise[index]);                       
      }
    }
  }

  navigateToEnterprises(){
    this.enterpriseForm.reset();
    this.enterprise = {name:'',address:''};
    this.router.navigate(['/enterprises'], {replaceUrl: true});
  }

  //alertas 

  async confirmUpdate(opcion) {
    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: '¡Estás a punto de actualizar una empresa!',
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
            this.updateEnterprise();
          }
        }
      ]
    });

    await alert.present();
  }

  async userStatus(option) {
    const alert = await this.alertController.create({
      header: 'Información!',
      message: '¡Has '+option+' una empresa correctamente!',
      buttons: [{
          text: 'Continuar',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }
}
