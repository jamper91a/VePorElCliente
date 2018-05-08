import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { Util } from '../../providers/util';
import {MenuPage} from "../menu/menu";
import { Facebook } from '@ionic-native/facebook';
import { User } from '../../providers/user';
import { TranslateService } from '@ngx-translate/core';
import {VePorEl} from "../../providers/veporel";

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  private account: { username: string, password: string, push_code: string } = {
    username: '',
    password: '',
    push_code: ''
  };
  private messages;
  private loginErrorString: string;
  private serverErrorString: string;
  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public user: User,
    public util: Util,
    private fb: Facebook,
    public veporel: VePorEl
  ) {
    if (!this.util.getPreference(this.util.constants.logged)) {
      this.translateService.get(['LOGIN_ERROR', 'SERVER_ERROR','validando_informacion']).subscribe((values) => {
        this.loginErrorString = values.LOGIN_ERROR;
        this.serverErrorString = values.SERVER_ERROR;
        this.messages = values;
      })
    }else{
      this.navCtrl.setRoot(MenuPage);
    }

  }

  ionViewWillEnter(){
    this.veporel.get_translation();
  }

  login() {
    this.navCtrl.push(LoginPage);
  }
  demo() {
    let dialog = this.util.show_dialog(this.messages.validando_informacion);
    let self=this;
    this.account.username="demo@veporel.com";
    this.account.password="demo123";
    this.user.login(this.account).subscribe((resp) => {
      dialog.dismiss();
      self.util.savePreference(self.util.constants.logged, true);
      self.navCtrl.setRoot(MenuPage);
    }, (err) => {
      dialog.dismiss();
      try {
        let body = JSON.parse(err._body);
        if (body.code==-1) {
          self.util.show_toast(self.messages.LOGIN_ERROR);
        }else if(body.code==-2){
          self.util.show_toast("error_20");
        }else if(body.code==-3){
          self.util.show_toast("error_21");
        }
      } catch (e) {
        self.util.show_toast(self.messages.SERVER_ERROR);
      }

    });
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

  public facebook_login(){
    let self=this;
    this.fb.login(['public_profile', 'email'])
      .then(
        (res: any) => {
          //Getting name and gender properties
          let userId = res.authResponse.userID;
          let params = new Array<string>();
          self.fb.api("/me?fields=id,first_name,last_name,email,gender,birthday", params)
            .then(function(user) {
              user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
              //Ingreso al usuario en el sistema
              self.account.username = user.email;
              self.account.password = user.id;
              self.user.login(self.account).subscribe((result)=>{
                self.util.savePreference(self.util.constants.logged, true);
                self.navCtrl.setRoot(MenuPage);
              },(err)=>{
                console.log(err);
                if(err!=null){
                  let body = JSON.parse(err._body);
                  console.log(body.code);
                  if(body.code==-1){
                    let toast = self.toastCtrl.create({
                      message: self.loginErrorString,
                      duration: 3000,
                      position: 'bottom'
                    });
                    toast.present();
                    self.navCtrl.push(LoginPage,{
                      username: user.email,
                      password: user.id

                    });
                  }else if(body.code==-2){
                    self.navCtrl.push(SignupPage,{
                      username: user.email,
                      password: user.id,
                      names: user.first_name,
                      last_name: user.last_name,

                    });
                  }
                }
              });
            });
        })
      .catch(
        (e) => {
          alert(e);
        });
  }
}
