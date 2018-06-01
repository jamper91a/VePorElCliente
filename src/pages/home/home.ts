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
import {MapPage} from "../map/map";
import {ExporterPage} from "../exporter/exporter";
import {CompaniesPage} from "../companies/companies";


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
   private messages: any;

  private options:{
    notifications:boolean,
    range:number,
    debug:boolean
  };

  /**
   * Tipo de busqueda, esta se usa cuando se obtiene la ubicación y saber que se debe hacer
   * luego de obtenerla
   * @type {{banner: string; tourist: string}}
   */
  private type:{
    banner:string,
    tourist:string
  }={
    banner: "banner",
    tourist:"tourist"
  }

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
     private translate: TranslateService,
     )
   {
     this.options= JSON.parse(this.util.getPreference("options"));
     if(!this.options){
       this.options={
         notifications:true,
         range : 2,
         debug: false
       }
     }
      this.util.savePreference(this.util.constants.language,navigator.language.split('-')[0]);
      menu.enable(true);
      this.user = JSON.parse(this.util.getPreference(this.util.constants.user));
      this.get_messages()

   }
  ionViewWillEnter() {

     let self = this;
     self.util.setLogs("ionViewWillEnter");
     //Variable para saber si ya obtuve la ubicacion
     try {
       //Valido si me llega una dirrecion de otra vista
       this.city_name = this.navParams.get('city_name');
       self.util.setLogs("Recibiendo informacion de mapas: "+JSON.stringify(self.navParams));
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
             self.get_location(self.type.banner);

           }

       }

     } catch (e) {
       console.error(e);
     }
   }

  private get_messages() {
    var self = this;
    self.translateService.get([
      'obteniendo_tu_ubicacion',
      'registrando',
      "ubicacion",
      "error_22",
      "reintentar",
      "salir"
    ]).subscribe((value) => {
      self.messages = value;
    }, (err) => {
      alert(err);
    });
  }

  private get_location(type:string) {

    let self = this;
    let dialog = this.util.show_dialog(this.messages.obteniendo_tu_ubicacion);
    self.veporel.get_coordenates(dialog).subscribe( (location)=> {
        switch (location.code) {
          case 1:
            self.latitude = location.lat;
            self.longitude = location.lon;
            self.veporel.get_address(location.lat, location.lon, true).subscribe(
              (result: any) => {
                dialog.dismiss();
                self.address = result.locality;
                self.city_name =  result.locality;
                let country_code =  result.countryCode;
                if (self.city_name) {
                  //Almaceno
                  self.util.savePreference(self.util.constants.latitude, self.latitude);
                  self.util.savePreference(self.util.constants.longitude, self.longitude);
                  self.util.savePreference(self.util.constants.city_name, self.city_name);
                  self.util.savePreference(self.util.constants.country_code, country_code);
                  self.util.savePreference(self.util.constants.country_name, result.countryName);
                  self.address_founded(type);
                }else{
                  self.util.show_toast('error_22');
                }
              },
              (error) => {
                dialog.dismiss();
                self.util.setLogs(JSON.stringify(error));
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
                        self.get_location(type);
                      }
                    }
                  ]
                });
                confirm.present();
              }
            );
            break;
          case 6:
            self.get_location(type);
            break;
          case 3:
            window.location.reload();
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
            if (self.platform.is('android')) {
              self.platform.exitApp();
            }else{
              self.util.show_toast('error_16');
            }
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
                    self.get_location(type);
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
    let self=this;
    this.navCtrl.push(DirectoryPage,{
      type: self.util.constants.find_business
    })
  }

  public go_to_directory_exporters(){
    let self=this;
    this.navCtrl.push(DirectoryPage,{
      type: self.util.constants.find_exporters
    })
  }

  public go_to_directory_agro(){
    let self=this;
    this.navCtrl.push(DirectoryPage,{
      type: self.util.constants.find_agro
    })
  }

  public change_address(){
    this.navCtrl.push(MapPage);
  }

  private address_founded(code:string){
     var self=this;
     switch (code) {
       case self.type.banner:
         self.get_banners(self.city_name);
         break;
       case self.type.tourist:
         self.go_tourist();
         break;
     }
  }
  public go_tourist(){
    let self=this;

    let data:{
      country_name:string,
        country_code:string,
        departament_name:string,
        city_name:string,
        name:string,
        latitude:number,
        longitude:number,
        pagetoken:string,
        type:string,//Tipo de busqueda: Negocios o Exportadores
    }={
      country_name:"",
      country_code:"",
      departament_name:"",
      city_name:"",
      name:"",
      latitude:0,
      longitude:0,
      pagetoken:"",
      type:""
    };

    data.latitude= self.util.getPreference(self.util.constants.latitude);
    data.longitude = self.util.getPreference(self.util.constants.longitude);
    data.city_name = self.util.getPreference(self.util.constants.city_name);
    data.country_code = self.util.getPreference(self.util.constants.country_code);
    data.country_name = self.util.getPreference(self.util.constants.country_name);
    data.departament_name = "";
    data.name = "point_of_interest";
    data.pagetoken = "";
    data.type = self.util.constants.find_business;
    this.navCtrl.push(CompaniesPage,data);
  }
 }
