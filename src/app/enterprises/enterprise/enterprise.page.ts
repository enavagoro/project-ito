import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../_services/login.service';
import { ValidationService } from '../../_services/validation.service';
import { EnterpriseService } from '../../_services/enterprise.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, Validators} from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.page.html',
  styleUrls: ['./enterprise.page.scss'],
})

export class EnterprisePage implements OnInit {
  formTitle = '';
  crudStatus = [{value:0,title:'Crear Empresa'},{value:1,title:'Editar Empresa'}];
  enterpriseForm;
  
  constructor(private loginService: LoginService,
              public router:Router,
              public alertController:AlertController,
              private formBuilder:FormBuilder,
              private storage: Storage,
              private enterpriseService: EnterpriseService) {
    this.enterpriseForm = this.formBuilder.group({
      name : ['',Validators.required],
      address : ['',Validators.required]
    });
   }

  ngOnInit() {
    this.storage.get('user').then((val) => {
      console.log('este es el val',val);
      if(val){
       this.formTitle = this.crudStatus[0].title;
        console.log('crudStatus',this.crudStatus[0].title);
      }else{
        this.router.navigate(['/login'], {replaceUrl: true});
      }
    })
  }

  saveEnterprise(){
    this.insertEnterprise();
  }

  insertEnterprise(){
    this.enterpriseService.insert(this.enterpriseForm.value).subscribe(data=>{
      console.log('insertado correctamente');
      this.cleanPersonForm();
    })
  }

  /*
  updateEnterprise(){
    this.enterpriseService.update(this.enterpriseForm.value).subscribe(data=>{
      console.log('insertado correctamente');
      this.cleanPersonForm();
    })
  }*/

  cleanPersonForm(){
    this.enterpriseForm.reset();
  }

  navigateToEnterprises(){
    this.router.navigate(['/enterprises'], {replaceUrl: true}).then(() => {
      this.ngOnInit();
    });
  }
}
