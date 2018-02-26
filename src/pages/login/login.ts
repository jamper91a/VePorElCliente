import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';

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
  account: { username: string, password: string, push_code: string } = {
    username: '',
    password: '',
    push_code: ''
  };

  // Our translated text strings
  private loginErrorString: string;
  private serverErrorString: string;
  private validando_informacion:string;


  validations_form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public user: User,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public util: Util,
    public translateService: TranslateService,
    private fb: Facebook,
    public formBuilder: FormBuilder
  ) {

    this.account.username = this.navParams.get('username');
    this.account.password = this.navParams.get('password');
    if (!this.util.getPreference(this.util.constants.logged)) {
      this.translateService.get(['LOGIN_ERROR', 'SERVER_ERROR','validando_informacion']).subscribe((values) => {
        this.loginErrorString = values.LOGIN_ERROR;
        this.serverErrorString = values.SERVER_ERROR;
        this.validando_informacion= values.validando_informacion;
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
    let dialog = this.util.show_dialog(this.validando_informacion);
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
