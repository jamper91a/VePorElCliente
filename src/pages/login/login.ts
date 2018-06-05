import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';

import { MenuPage } from '../menu/menu';
import { ForgetPasswordPage } from '../forget-password/forget-password';
import { ResentEmailPage } from '../resent-email/resent-email';

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
  account: { username: string, password: string, push_code: string } = {
    username: '',
    password: '',
    push_code: ''
  };

  // Our translated text strings
  private messages;


  validations_form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public user: User,
    public navParams: NavParams,
    public util: Util,
    public translateService: TranslateService,
    public formBuilder: FormBuilder
  ) {

    this.account.username = this.navParams.get('username');
    this.account.password = this.navParams.get('password');
    if (!this.util.getPreference(this.util.constants.logged)) {
      this.translateService.get(['LOGIN_ERROR', 'SERVER_ERROR','validando_informacion']).subscribe((values) => {
        this.messages=values;
      });
      this.account.username = this.navParams.get('username');
      this.account.password = this.navParams.get('password');
    }else{
      this.navCtrl.setRoot(MenuPage);
    }

    this.validations_form = this.formBuilder.group({
     username: new FormControl('', Validators.compose([
       Validators.required,
       Validators.email
     ])),
     password: new FormControl('', Validators.required),
   });
  }


  // Attempt to login in through our User service
  doLogin() {
    let dialog = this.util.show_dialog(this.messages.validando_informacion);
    let self=this;
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

  public olvide_contrasena(){
    this.navCtrl.push(ForgetPasswordPage);
  }
  public resent_confirmation_email(){
    this.navCtrl.push(ResentEmailPage);
  }


}
