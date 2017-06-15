import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { HomePage } from '../home/home';

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

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public util: Util,
    public translateService: TranslateService,
    private fb: Facebook,
  ) {

    if (!this.util.getPreference(this.util.constants.logged)) {
      this.translateService.get(['LOGIN_ERROR', 'SERVER_ERROR']).subscribe((values) => {
        this.loginErrorString = values.LOGIN_ERROR;
        this.serverErrorString = values.SERVER_ERROR;
      })
    }else{
      this.navCtrl.push(HomePage);
    }
  }


  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).subscribe((resp) => {
      this.util.savePreference(this.util.constants.logged, true);
      this.navCtrl.push(HomePage);
    }, (err) => {
      try {
        let body = JSON.parse(err._body);
        if (body.code==-1) {
          let toast = this.toastCtrl.create({
            message: this.loginErrorString,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
      } catch (e) {
        let toast = this.toastCtrl.create({
          message: this.serverErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }

    });
  }

  public facebook_login(){
    let self=this;
    this.fb.login(['public_profile', 'email'])
      .then(
        (res: any) => {
          //Getting name and gender properties
          let userId = res.authResponse.userID;
          let params = new Array<string>();
          self.fb.api("/me?fields=id,first_name,last_name,email,gender, birthday", params)
            .then(function(user) {
              user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
              console.log(user.name);
              console.log(user.email);
            });
          // console.log('Logged into Facebook!', res.data.email);
        })
      .catch(
        e => {
          console.log('Error logging into Facebook', e)
        });
  }

  facebook_loggout(){
    this.fb.logout();
  }
}
