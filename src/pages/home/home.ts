import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, MenuController, AlertController, Platform} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
import { Geolocation } from '@ionic-native/geolocation';
import { MapPage } from '../map/map';
import { FindPromotiosPage } from '../find-promotios/find-promotios';
import { CategoriesPage } from '../categories/categories';
import { DirectoryPage } from '../directory/directory';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Diagnostic } from '@ionic-native/diagnostic';
import { SpeechRecognition, SpeechRecognitionListeningOptionsAndroid, SpeechRecognitionListeningOptionsIOS } from '@ionic-native/speech-recognition'
import { Push, PushObject, PushOptions } from '@ionic-native/push';


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

   ionViewDidLoad() {
     let self = this;
     try {
       //Valido si me llega una dirrecion de otra vista
       this.city_name = this.navParams.get('city_name');
       if(this.city_name){
         this.latitude = this.navParams.get(this.util.constants.latitude);
         this.longitude = this.navParams.get(this.util.constants.longitude);
         this.city_name = this.navParams.get(this.util.constants.city_name);
         this.country_code = this.navParams.get(this.util.constants.country_code);
         self.util.savePreference(this.util.constants.address, this.address);
         self.util.savePreference(this.util.constants.latitude, this.latitude);
         self.util.savePreference(this.util.constants.longitude, this.longitude);
         self.util.savePreference(this.util.constants.city_name, this.city_name);
         self.util.savePreference(this.util.constants.country_code, this.country_code);
         self.get_banners(this.city_name);
       }else{
         //Valido si tengo una direccion almacenada
         if(self.util.getPreference(this.util.constants.city_name)){
           this.address = self.util.getPreference(this.util.constants.address);
           this.latitude = self.util.getPreference(this.util.constants.latitude);
           this.longitude = self.util.getPreference(this.util.constants.longitude);
           this.city_name= self.util.getPreference(this.util.constants.city_name);
           self.get_banners(this.city_name);
         }else{
           self.get_location();

         }
       }

     } catch (e) {
     }
   }

  get_location(){
    let self = this;
    self.diagnostic.isLocationAuthorized().then(function (isAuthorized) {
      if(isAuthorized){
        self.diagnostic.isLocationEnabled().then(function(isAvailable){
          if(isAvailable){
            //Obtengo las coordenadas actuales
            self.geolocation.getCurrentPosition().then((resp) => {
              self.latitude = resp.coords.latitude;
              self.longitude = resp.coords.longitude;
              self.veporel.get_address(resp.coords.latitude, resp.coords.longitude).subscribe(
                (result: any) => {
                  if (result != null) {
                    console.log(result);
                    // let body = JSON.parse(result._body);
                    // self.address = body.results[0].formatted_address;
                    //
                    // let city_name = body.results[0].address_components[5].short_name;
                    self.address = result.city

                    self.city_name =  result.city;
                    let country_code =  result.countryCode;
                    if (self.city_name) {
                      //Almaceno
                      self.util.savePreference(self.util.constants.address, self.address);
                      self.util.savePreference(self.util.constants.latitude, self.latitude);
                      self.util.savePreference(self.util.constants.longitude, self.longitude);
                      self.util.savePreference(self.util.constants.city_name, self.city_name);
                      self.util.savePreference(self.util.constants.country_code, country_code);
                      self.util.savePreference(self.util.constants.country_name, result.countryName);
                      self.get_banners(self.city_name);
                    }
                  }
                },
                error => {

                }
              );
            }).catch((error) => {
              console.log('Error getting location', error);
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
          console.error(error);
        });
      }else{
        self.diagnostic.requestLocationAuthorization().then(function (status) {
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

        });
      }
    }).catch(function () {

    });




  }

   private get_banners(city_name:string){
     let self = this;
     //Obtengo los banners
     this.veporel.get_banners(city_name).subscribe(
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

  public change_address(){
     this.navCtrl.push(MapPage);
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

   public find_categories(){
     let self = this;
     if(this.city_name){
       this.navCtrl.push(CategoriesPage, {
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
     var self=this;
     this.translateService.get('mensaje_compartir',{value: "VPE"+this.user.id}).subscribe((res) => {

       this.socialSharing.share(res, 'VePorEl', [], 'http://veporel.com').then(() => {

       }).catch((e) => {
        alert(e);
       });
     });
   }

   public go_to_directory(){
     this.navCtrl.push(DirectoryPage);
   }

  async isSpeechSupported(): Promise<boolean> {
    let isAvailable = await this.speech.isRecognitionAvailable();
    return isAvailable;
  }
  async getPermission(): Promise<void> {
    try {
      let permission = await this.speech.requestPermission();
      return permission;
    }
    catch (e) {
      console.error(e);
    }
  }
  async hasPermission(): Promise<boolean> {
    try {
      let permission = await this.speech.hasPermission();
      return permission;
    }
    catch (e) {
      console.error(e);
    }
  }
  async getSupportedLanguages(): Promise<Array<string>> {
    try {
      let languages = await this.speech.getSupportedLanguages();
      return languages;
    }
    catch (e) {
      console.error(e);
    }
  }
  listenForSpeech(): void {
     var self=this;
     this.isSpeechSupported().then((isSupported:boolean)=>{
       if(isSupported){
         self.hasPermission().then((hasPermission:boolean)=>{
           if(hasPermission){
             self.androidOptions = {
               prompt: 'Cual producto deseas buscarle ofertas',
               language: 'es-MX'
             }

             self.iosOptions = {
               language: 'es-MX'
             }

             if (self.platform.is('android')) {
               self.speech.startListening(self.androidOptions).subscribe(data => {
                 let confirm = self.alertCtrl.create({
                   title:  "Buscar ofertas",
                   message: "Deseas buscar ofertas del producto "+data[0]+"?",
                   buttons: [
                     {
                       text: "Cancelar",
                       handler: () => {

                       }
                     },
                     {
                       text: "Buscar",
                       handler: () => {
                         self.get_offers(data[0]);
                       }
                     }
                   ]
                 });
                 confirm.present();
               }, error => console.log(error));
             }
             else if (self.platform.is('ios')) {
               self.speech.startListening(self.iosOptions).subscribe(data => self.speechList = data, error => console.log(error));
             }
           }else{
             self.getPermission();
           }
         });


       }else{

       }
     });


  }

  public get_offers(subcategory_name:string){
    this.navCtrl.push(FindPromotiosPage,{
      "type_find_promotio": this.util.constants.find_promotion_by_subcategory_name,
      "subcategory_name": subcategory_name
    })
  }

 }
