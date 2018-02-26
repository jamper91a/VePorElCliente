import {Component, ViewChild} from '@angular/core';
import {NavController, ToastController, NavParams, Platform, AlertController} from 'ionic-angular';


import { User } from '../../providers/user';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';

import { TranslateService } from '@ngx-translate/core';
import { Geolocation } from '@ionic-native/geolocation';
import {WelcomePage} from "../welcome/welcome";
import {Diagnostic} from "@ionic-native/diagnostic";


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  account: {
    username: string,
    password: string,
    names: string,
    last_name: string,
    cellphone: string,
    push_code: string,
    notifications: number,
    birthday: string,
    sex: string,
    subcategories: number[],
    city_id: number,
    country_id: string,
    r_password: string,
    refer_code:string
  }={
    username: "",
    password: "",
    names: "",
    last_name: "",
    cellphone: "",
    push_code: "",
    notifications: 0,
    birthday: "",
    sex: "",
    subcategories: [],
    city_id: 0,
    country_id: "",
    r_password: "",
    refer_code:""
  };

  private signup_by_facebook=false;

  // Our translated text strings
  private signupErrorString: string;
  private countries:any;
  private cities:any;
  private subcategories:any;
  private city_name="";
  private country_name="";
  private messages:any;
  private serverErrorString: string;


  @ViewChild('password') inputP;
  @ViewChild('r_password') inputRP;
  constructor(
    public navCtrl: NavController,
    public user: User,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private geolocation: Geolocation,
    public util:Util,
    public veporel:VePorEl,
    private diagnostic: Diagnostic,
    private platform: Platform,
    private alertCtrl: AlertController,

  ) {








  }

  ionViewWillEnter(){

    this.translateService.get(['LOGIN_ERROR', 'SERVER_ERROR','validando_informacion']).subscribe((values) => {
      this.serverErrorString = values.SERVER_ERROR;
    });
    let self=this;

    this.account.username = this.navParams.get('username');
    this.account.password = this.navParams.get('password');
    this.account.r_password = this.navParams.get('password');
    if(this.account.password)
      this.signup_by_facebook = true;
    this.account.names = this.navParams.get('names');
    this.account.last_name = this.navParams.get('last_name');
    this.get_messages();
    this.get_location();
    this.veporel.get_translation();
  }

  get_messages(){
    this.translateService.get([
      'SIGNUP_ERROR',
      'error_3',
      'obteniendo_tu_ubicacion'
    ]).subscribe((value) => {
      this.messages = value;
    }, (err)=>{
      alert(err);
    });
  }

  doSignup() {
    var self=this;

    if(this.account.r_password == this.account.password)
    {
      let dialog = this.util.show_dialog("Registrando");
      if(!self.account.birthday){
        self.account.birthday="2017-01-01";
      }
      if(!self.account.sex){
        self.account.sex="M";
      }

      if(!self.account.cellphone){
        alert("cellphone vacio");
        self.account.cellphone="0000000000";
      }
      this.user.signup(this.account).subscribe((resp) => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        this.navCtrl.push(WelcomePage);
      }, (err) => {
        console.log("Error cuando intento registrar");
        console.log(err);
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        try {
          let body = JSON.parse(err._body);
          if (body.code=="E_VALIDATION") {
            let toast = self.toastCtrl.create({
              message: "Correo existente. Por favor intente su registro con un nuevo correo o diríjase a la opción: Olvidé la Contraseña",
              duration: 3000,
              position: 'top'
            });
            toast.present();
          }
        } catch (e) {
          console.error(e);
          let toast = self.toastCtrl.create({
            message: self.serverErrorString,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
      });
    }else{
      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.messages.error_3,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }

  }

  change_country(event:any, country_code:string){
    let self=this;
    //Obtengo las ciudades de ese pais
    this.veporel.get_cities_by_country(country_code).subscribe((result:any)=>{
      let body =  result._body;
      if(body!=null) {
        self.cities = JSON.parse(body);
        for (var i = 0; i < self.cities.length; i++) {
          if(self.cities[i].name == self.city_name){
            self.account.city_id = self.cities[i].id;
            return;
          }
        }
      }
    });
  }

  showPassword(): any {
    this.inputP.type = this.inputP.type === 'password' ?  'text' : 'password';
    this.inputRP.type = this.inputRP.type === 'password' ?  'text' : 'password';
  }

  get_location(){
    let self = this;
    self.diagnostic.isLocationAuthorized().then(function (isAuthorized) {
      if(isAuthorized){
        self.diagnostic.isLocationEnabled().then(function(isAvailable){
          if(isAvailable){
            let dialog = self.util.show_dialog(self.messages.obteniendo_tu_ubicacion);
            self.geolocation.getCurrentPosition().then((resp) => {

              self.veporel.get_address(resp.coords.latitude, resp.coords.longitude).subscribe(
                (result: any) => {
                  if (result != null) {
                    self.city_name =result.city;
                    self.country_name = result.countryCode;
                  }
                  dialog.dismiss();

                  //Obtengo los paises
                  self.veporel.get_countries().subscribe((result:any)=>{
                    let body =  result._body;
                    if(body!=null){
                      self.countries = JSON.parse(body);
                      self.account.country_id = self.country_name;
                      self.veporel.get_categories().subscribe((result:any)=>{
                        if(result!=null){
                          let body = result._body;
                          self.subcategories = JSON.parse(body);
                        }
                      });
                    }

                  });
                },
                (error) => {
                  alert(error);
                }
              );
            }).catch((error) => {
              console.error(error);
              alert(error);
            });
          }else{


            self.translateService.get(["ubicacion", "activar_ubicacion","salir","activar"]).subscribe((res) => {
              let confirm = self.alertCtrl.create({
                title: res.ubicacion,
                message: res.activar_ubicacion,
                buttons: [
                  {
                    text: res.salir,
                    handler: () => {
                      if (this.platform.is('android')) {
                        self.platform.exitApp();
                      }else{
                        self.navCtrl.pop();
                        this.util.show_toast('error_16');
                      }
                    }
                  },
                  {
                    text: res.activar,
                    handler: () => {
                      self.diagnostic.switchToLocationSettings();
                    }
                  }
                ]
              });
              confirm.present();
            });

          }
        }).catch((error)=>{
          alert(error);
        });
      }else{
        /*self.diagnostic.requestLocationAuthorization().then(function (status) {
          if(status=='GRANTED'){
            self.get_location();
          }else{
            if (self.platform.is('android')) {
              self.platform.exitApp();
            }else{
              self.navCtrl.pop();
              self.util.show_toast('error_16');
            }
          }
        }).catch(function (error) {
          alert(error);
        });*/


        //Obtengo los paises
        self.veporel.get_countries().subscribe((result:any)=>{
          let body =  result._body;
          if(body!=null){
            self.countries = JSON.parse(body);
            //self.account.country_id = self.country_name;
            self.veporel.get_categories().subscribe((result:any)=>{
              if(result!=null){
                let body = result._body;
                self.subcategories = JSON.parse(body);
              }
            });
          }

        });
      }
    }).catch(function (error) {
      alert(error);
    });




  }
}
