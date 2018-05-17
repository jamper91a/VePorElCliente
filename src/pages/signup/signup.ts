import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform, AlertController} from 'ionic-angular';


import {User} from '../../providers/user';
import {VePorEl} from '../../providers/providers';
import {Util} from '../../providers/providers';

import {TranslateService} from '@ngx-translate/core';
import {Geolocation} from '@ionic-native/geolocation';
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
    country_name: string,
    country_code: string,
    departament_name: string,
    city_name: string,
    r_password: string,
    refer_code: string
  } = {
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
    country_name: "",
    country_code: "",
    departament_name: "",
    city_name: "",
    r_password: "",
    refer_code: ""
  };

  private signup_by_facebook = false;

  // Our translated text strings
  private messages: any;


  @ViewChild('password') inputP;
  @ViewChild('r_password') inputRP;

  constructor(public navCtrl: NavController,
              public user: User,
              public navParams: NavParams,
              public translateService: TranslateService,
              private geolocation: Geolocation,
              public util: Util,
              public veporel: VePorEl,
              private diagnostic: Diagnostic,
              private platform: Platform,
              private alertCtrl: AlertController,
              private translate: TranslateService) {

    this.account.username = this.navParams.get('username');
    this.account.password = this.navParams.get('password');
    this.account.r_password = this.navParams.get('password');
    if (this.account.password)
      this.signup_by_facebook = true;
    this.account.names = this.navParams.get('names');
    this.account.last_name = this.navParams.get('last_name');
    this.get_messages();
    this.get_location();
    this.veporel.get_translation();


  }

  ionViewWillEnter() {


  }

  get_messages() {
    var self = this;
    self.translateService.get([
      'SIGNUP_ERROR',
      'error_3',
      'obteniendo_tu_ubicacion',
      'registrando',
      'SERVER_ERROR'
    ]).subscribe((value) => {
      self.messages = value;
    }, (err) => {
      alert(err);
    });
  }

  doSignup() {
    var self = this;

    if (this.account.r_password == self.account.password) {
      let dialog = self.util.show_dialog(self.messages.registrando);
      if (!self.account.birthday) {
        self.account.birthday = "2017-01-01";
      }
      if (!self.account.sex) {
        self.account.sex = "M";
      }

      if (!self.account.cellphone) {
        self.account.cellphone = "0000000000";
      }
      this.user.signup(self.account).subscribe((resp) => {
        dialog.dismiss();
        self.util.show_toast("validate_email");
        this.navCtrl.push(WelcomePage);
      }, (err) => {
        dialog.dismiss();
        try {
          let body = JSON.parse(err._body);
          if (body.code == "-1") {
            self.util.show_toast("error_19");
          }else{
            self.util.show_toast(self.messages.SERVER_ERROR);
          }
        } catch (e) {
          self.util.show_toast(self.messages.SERVER_ERROR);
        }
      });
    } else {
      // Unable to sign up
      self.util.show_toast("error_3");
    }

  }

  showPassword(): any {
    this.inputP.type = this.inputP.type === 'password' ? 'text' : 'password';
    this.inputRP.type = this.inputRP.type === 'password' ? 'text' : 'password';
  }

  get_location() {

    let self = this;
    let dialog = this.util.show_dialog(this.messages.obteniendo_tu_ubicacion);
    self.veporel.get_coordenates(dialog).subscribe( (location)=> {
      switch (location.code) {
        case 1:
          self.veporel.get_address(location.lat, location.lon, true).subscribe(
            (result: any) => {
              dialog.dismiss();
              self.account.country_name = result.countryName;
              self.account.country_code = result.countryCode;
              self.account.city_name = result.locality;
            },
            (error) => {
              dialog.dismiss();
              self.util.setLogs(JSON.stringify(error));
              self.translate.get(["ubicacion","error_22", "reintentar", "salir"]).subscribe(
                (res) => {
                  let confirm = self.alertCtrl.create({
                    title: res.ubicacion,
                    message: res.error_22,
                    buttons: [
                      {
                        text: res.salir,
                        handler: () => {
                          if (self.platform.is('android')) {
                            self.platform.exitApp();
                          }else{
                            self.util.show_toast('error_22');
                          }
                        }
                      },
                      {
                        text: res.reintentar,
                        handler: () => {
                          self.get_location();
                        }
                      }
                    ]
                  });
                  confirm.present();
                });
            }
          );
          break;
        case 6:
          self.get_location();
          break;
        case 3:
          self.navCtrl.pop();
          self.diagnostic.switchToLocationSettings();
          break;
      }
    },
      (err)=>{
        dialog.dismiss();
        self.util.setLogs(JSON.stringify(err));
        switch (err.code){
          case 3:
          case 5:
          case 7:
              self.util.show_toast('error_16');
              self.navCtrl.pop();
            break;
          case 1:
          case 2:
            let confirm = self.alertCtrl.create({
              title: self.messages.ubicacion,
              message: self.messages.error_22,
              buttons: [
                {
                  text: self.messages.salir,
                  handler: () => {
                    if (self.platform.is('android')) {
                      self.platform.exitApp();
                    }else{
                      self.util.show_toast('error_22');
                    }
                  }
                },
                {
                  text: self.messages.reintentar,
                  handler: () => {
                    self.get_location();
                  }
                }
              ]
            });
            confirm.present();
            break;
          default:
            self.util.show_toast(err.message);
            break;
        }
      });


  }
}
