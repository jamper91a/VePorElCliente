import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

import { MenuPage } from '../menu/menu';
import { ForgetPasswordPage } from '../forget-password/forget-password';

import { User } from '../../providers/user';

import { TranslateService } from '@ngx-translate/core';
import { Util } from '../../providers/util';
import { Facebook } from '@ionic-native/facebook';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { username: string, password: string } = {
    username: '',
    password: ''
  };

  // Our translated text strings
  private loginErrorString: string;
  private serverErrorString: string;

  constructor(
    public navCtrl: NavController,
    public user: User,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public util: Util,
    public translateService: TranslateService,
    private fb: Facebook,
  ) {

    this.account.username = this.navParams.get('username');
    this.account.password = this.navParams.get('password');
    if (!this.util.getPreference(this.util.constants.logged)) {
      this.translateService.get(['LOGIN_ERROR', 'SERVER_ERROR']).subscribe((values) => {
        this.loginErrorString = values.LOGIN_ERROR;
        this.serverErrorString = values.SERVER_ERROR;
      });
      this.account.username = this.navParams.get('username');
      this.account.password = this.navParams.get('password');
    }else{
      this.navCtrl.setRoot(MenuPage);
    }
  }


  // Attempt to login in through our User service
  doLogin() {
    let dialog = this.util.show_dialog('Validando información');
    let self=this;
    this.user.login(this.account).subscribe((resp) => {
      dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
      self.util.savePreference(self.util.constants.logged, true);
      self.navCtrl.setRoot(MenuPage);
    }, (err) => {
      dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
      try {
        let body = JSON.parse(err._body);
        if (body.code==-1) {
          let toast = self.toastCtrl.create({
            message: self.loginErrorString,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }else if(body.code==-2){
          let toast = self.toastCtrl.create({
            message: "Usuario no existe",
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
  }

  public olvide_contrasena(){
    this.navCtrl.push(ForgetPasswordPage);
  }


}
