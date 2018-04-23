import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, MenuController, AlertController, Platform} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
import { Geolocation } from '@ionic-native/geolocation';
import { FindPromotiosPage } from '../find-promotios/find-promotios';
import { DirectoryPage } from '../directory/directory';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Diagnostic } from '@ionic-native/diagnostic';
import { SpeechRecognition, SpeechRecognitionListeningOptionsAndroid, SpeechRecognitionListeningOptionsIOS } from '@ionic-native/speech-recognition'
import { Push, } from '@ionic-native/push';


/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @Component({
   selector: 'page-home',
   templateUrl: 'home.html',
 })
 export class HomePage {

   private banners:any;
   private address:string="";
   private latitude:number;
   private longitude:number;
   private city_name:string;
   private country_name:string;
   private country_code:string;
   private user:any;

  speechList: Array<string> = [];
  androidOptions: SpeechRecognitionListeningOptionsAndroid;
  iosOptions: SpeechRecognitionListeningOptionsIOS;

   constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public veporel:VePorEl,
     public util:Util,
     private geolocation: Geolocation,
     private translateService: TranslateService,
     public toastCtrl: ToastController,
     public menu: MenuController,
     public socialSharing: SocialSharing,
     private diagnostic: Diagnostic,
     private platform: Platform,
     private alertCtrl: AlertController,
     private speech: SpeechRecognition,
     private push: Push,
     )
   {
      this.util.savePreference(this.util.constants.language,navigator.language.split('-')[0]);
      menu.enable(true);
      this.user = JSON.parse(this.util.getPreference(this.util.constants.user));

   }
  ionViewWillEnter() {
     let self = this;
     //Variable para saber si ya obtuve la ubicacion
     try {
       //Valido si me llega una dirrecion de otra vista
       this.city_name = this.navParams.get('city_name');
       if(this.city_name){
         this.latitude = this.navParams.get(this.util.constants.latitude);
         this.longitude = this.navParams.get(this.util.constants.longitude);
         this.city_name = this.navParams.get(this.util.constants.city_name);
         this.country_code = this.navParams.get(this.util.constants.country_code);
         this.country_name = this.navParams.get(this.util.constants.country_name);
         self.util.savePreference(this.util.constants.latitude, this.latitude);
         self.util.savePreference(this.util.constants.longitude, this.longitude);
         self.util.savePreference(this.util.constants.city_name, this.city_name);
         self.util.savePreference(this.util.constants.country_code, this.country_code);
         self.util.savePreference(this.util.constants.country_name, this.country_name);
         self.get_banners(this.city_name);
       }else{
           //Valido si tengo una direccion almacenada
           if(self.util.getPreference(this.util.constants.city_name)!=this.city_name){
             this.latitude = self.util.getPreference(this.util.constants.latitude);
             this.longitude = self.util.getPreference(this.util.constants.longitude);
             this.city_name= self.util.getPreference(this.util.constants.city_name);
             this.country_name= self.util.getPreference(this.util.constants.country_name);
             self.get_banners(this.city_name);
           }else{
             self.get_location();

           }

       }

     } catch (e) {
       console.log(e);
     }
   }


  private get_location(){
    let self = this;
    if (this.platform.is('cordova')) {
      self.diagnostic.isLocationAuthorized().then(function (isAuthorized) {
        if(isAuthorized){
          self.diagnostic.isLocationEnabled().then(function(isAvailable){
            if(isAvailable){
              //Obtengo las coordenadas actuales
              self.geolocation.getCurrentPosition().then((resp) => {
                self.latitude = resp.coords.latitude;
                self.longitude = resp.coords.longitude;
                self.veporel.get_address(resp.coords.latitude, resp.coords.longitude, false).subscribe(
                  (result: any) => {
                    if (result != null) {
                      self.address = result.city;
                      self.city_name =  result.city;
                      let country_code =  result.countryCode;
                      if (self.city_name) {
                        //Almaceno
                        self.util.savePreference(self.util.constants.latitude, self.latitude);
                        self.util.savePreference(self.util.constants.longitude, self.longitude);
                        self.util.savePreference(self.util.constants.city_name, self.city_name);
                        self.util.savePreference(self.util.constants.country_code, country_code);
                        self.util.savePreference(self.util.constants.country_name, result.countryName);
                        self.get_banners(self.city_name);
                      }
                    }else{
                      self.util.show_toast('error_22');
                    }
                  },
                  (error)=>{
                    if(error)
                      self.util.show_toast(error);
                  }
                );
              }).catch((error) => {
                if(error)
                  self.util.show_toast(error);
              });
            }else{
              self.translateService.get(["ubicacion", "activar_ubicacion","salir","activar"]).subscribe(
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
                        }else{
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
              },
                ()=>{
                  self.util.show_toast('error_22');
                });
            }
          }).catch((error)=>{
            self.util.show_toast(error);
          });
        }else{

          self.translateService.get(["ubicacion", "mensaje_ubicacion","salir","activar"]).subscribe((res) => {
            let confirm = self.alertCtrl.create({
              title: res.ubicacion,
              message: res.mensaje_ubicacion,
              buttons: [
                {
                  text: res.salir,
                  handler: () => {
                    if (self.platform.is('android')) {
                      self.platform.exitApp();
                    }else{
                      self.navCtrl.pop();
                      self.util.show_toast('error_16');
                    }
                  }
                },
                {
                  text: res.activar,
                  handler: () => {
                    self.diagnostic.requestLocationAuthorization().then(function (status) {
                      if(status=='GRANTED' || status=='authorized_when_in_use' || status == 'authorized'){
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
                      self.util.show_toast(error);
                    });
                  }
                }
              ]
            });
            confirm.present();
          });



        }
      }).catch(function (error) {
        if(error)
          self.util.show_toast(error);
      });
    }else{
      //Obtengo las coordenadas actuales
      self.geolocation.getCurrentPosition().then(
        (resp) => {
        self.latitude = resp.coords.latitude;
        self.longitude = resp.coords.longitude;
        self.veporel.get_address(resp.coords.latitude, resp.coords.longitude, false).subscribe(
          (result: any) => {
            if (result != null) {
              self.address = result.city;
              self.city_name =  result.city;
              let country_code =  result.countryCode;
              if (self.city_name) {
                //Almaceno
                self.util.savePreference(self.util.constants.latitude, self.latitude);
                self.util.savePreference(self.util.constants.longitude, self.longitude);
                self.util.savePreference(self.util.constants.city_name, self.city_name);
                self.util.savePreference(self.util.constants.country_code, country_code);
                self.util.savePreference(self.util.constants.country_name, result.countryName);
                self.get_banners(self.city_name);
              }
            }else{
              console.log("error getting location: ");
              console.log(result);
            }
          },
          (error)=>{
            if(error)
              self.util.show_toast(error);
          }
        );
      }
        ).catch((error) => {
        if(error)
          self.util.show_toast(error);
      });
    }






  }

  private get_banners(city_name:string){
     let self = this;
     //Obtengo los banners
     this.veporel.get_banners(city_name,2).subscribe(
       (result:any) =>{

         let body =  result._body;
         if(body!=null)
         {
           self.banners = JSON.parse(body);
         }else{
         }

       },
       error =>{
       }
     );
   }

  public find_promotios(){
     let self = this;
     if(this.city_name){
       this.navCtrl.push(FindPromotiosPage, {
         "type_find_promotio": self.util.constants.find_promotio_by_location,
         "latitude" : self.latitude,
         "longitude" : self.longitude
       });
     }else{
       this.translateService.get("error_9").subscribe((res) => {
         let toast = self.toastCtrl.create({
           message: res,
           duration: 3000,
           position: 'top'
         });
         toast.present();
       })

     }
   }

  public share(){
     this.translateService.get('mensaje_compartir',{
       value: "VPE"+this.user.id,
       google_play: "https://play.google.com/store/apps/details?id=co.colombiaapps.vpeclientes",
       app_store: "https://itunes.apple.com/nl/app/veporel/id1318648947?mt=8"
     }).subscribe((res) => {

       this.socialSharing.share(res, 'VePorEl', []).then(() => {

       }).catch((e) => {
        alert(e);
       });
     });
   }

  public go_to_directory(){
     this.navCtrl.push(DirectoryPage);
   }


 }
