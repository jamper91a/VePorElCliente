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
              private alertCtrl: AlertController,) {

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
    self.diagnostic.isLocationAuthorized().then(function (isAuthorized) {
      if (isAuthorized) {
        self.diagnostic.isLocationEnabled().then(function (isAvailable) {
          if (isAvailable) {
            let dialog = self.util.show_dialog(self.messages.obteniendo_tu_ubicacion);
            self.geolocation.getCurrentPosition().then(
              (resp) => {
                self.veporel.get_address(resp.coords.latitude, resp.coords.longitude, true).subscribe(
                  (result: any) => {
                    dialog.dismiss();
                    if (!result.countryName || !result.countryCode || !result.city) {
                      self.navCtrl.pop();
                    } else {
                      self.account.country_name = result.countryName;
                      self.account.country_code = result.countryCode;
                      self.account.city_name = result.city;

                    }

                  },
                  (error) => {
                    if (error)
                      self.util.show_toast(error);
                  }
                );
              }).catch((error) => {
              if (error)
                self.util.show_toast(error);
            });
          }
          else {

            self.translateService.get(["ubicacion", "activar_ubicacion", "salir", "activar"]).subscribe(
              (res) => {
                let confirm = self.alertCtrl.create({
                  title: res.ubicacion,
                  message: res.activar_ubicacion,
                  buttons: [
                    {
                      text: res.salir,
                      handler: () => {
                        if (self.platform.is('android')) {
                          self.platform.exitApp();
                        } else {
                          self.navCtrl.pop();
                          self.util.show_toast('error_16');
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
        }).catch((error) => {
          if(error)
            self.util.show_toast(error);
        });
      } else {

        self.translateService.get(["ubicacion", "mensaje_ubicacion", "salir", "activar"]).subscribe((res) => {
          let confirm = self.alertCtrl.create({
            title: res.ubicacion,
            message: res.mensaje_ubicacion,
            buttons: [
              {
                text: res.salir,
                handler: () => {
                  if (self.platform.is('android')) {
                    self.platform.exitApp();
                  } else {
                    self.navCtrl.pop();
                    self.util.show_toast('error_16');
                  }
                }
              },
              {
                text: res.activar,
                handler: () => {
                  self.diagnostic.requestLocationAuthorization().then(function (status) {
                    if (status == 'GRANTED' || status == 'authorized_when_in_use' || status == 'authorized') {
                      self.get_location();
                    } else {
                      if (self.platform.is('android')) {
                        self.platform.exitApp();
                      } else {
                        self.navCtrl.pop();
                        self.util.show_toast('error_16');
                      }
                    }
                  }).catch(function (error) {
                    alert(error);
                  });
                }
              }
            ]
          });
          confirm.present();
        });


      }
    }).catch(function (error) {
      alert(error);
    });


  }
}
