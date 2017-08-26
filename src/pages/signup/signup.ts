import {Component, ViewChild} from '@angular/core';
import { NavController, ToastController,NavParams } from 'ionic-angular';


import { User } from '../../providers/user';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';

import { TranslateService } from '@ngx-translate/core';
import { Geolocation } from '@ionic-native/geolocation';
import {WelcomePage} from "../welcome/welcome";


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
    r_password: string
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
    r_password: ""
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

  @ViewChild('password') inputP;

  constructor(
    public navCtrl: NavController,
    public user: User,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private geolocation: Geolocation,
    public util:Util,
    public veporel:VePorEl

  ) {

    let self=this;

    this.account.username = this.navParams.get('username');
    this.account.password = this.navParams.get('password');
    this.account.r_password = this.navParams.get('password');
    if(this.account.password)
      this.signup_by_facebook = true;
    this.account.names = this.navParams.get('names');
    this.account.last_name = this.navParams.get('last_name');

    this.translateService.get(['SIGNUP_ERROR', 'error_3']).subscribe((value) => {
      this.messages = value;
    });

    this.geolocation.getCurrentPosition().then((resp) => {

      self.veporel.get_address(resp.coords.latitude, resp.coords.longitude).subscribe(
        (result: any) => {
          if (result != null) {
            self.city_name =result.city;
            self.country_name = result.countryCode;

            // let body = JSON.parse(result._body);
            // self.city_name = body.results[0].address_components[5].short_name;
            // self.country_name = body.results[0].address_components[6].short_name;
          }

          //Obtengo los paises
          this.veporel.get_countries().subscribe((result:any)=>{
            let body =  result._body;
            if(body!=null){
              self.countries = JSON.parse(body);
              self.account.country_id = self.country_name;
            }

          });
        },
        error => {

        }
      );
    }).catch((error) => {
    });

    this.veporel.get_subcategories(0).subscribe((result:any)=>{
      if(result!=null){
        let body = result._body;
        self.subcategories = JSON.parse(body);
      }
    });

  }

  doSignup() {
    if(this.account.r_password == this.account.password)
    {
      this.user.signup(this.account).subscribe((resp) => {
        this.navCtrl.push(WelcomePage);
      }, (err) => {

        //this.navCtrl.push(HomePage); // TODO: Remove this when you add your signup endpoint

        // Unable to sign up
        let toast = this.toastCtrl.create({
          message: this.signupErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
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
  }
}
