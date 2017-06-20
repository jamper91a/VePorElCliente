import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
import { Geolocation } from '@ionic-native/geolocation';
import { MapPage } from '../map/map';
import { FindPromotiosPage } from '../find-promotios/find-promotios';
import { CategoriesPage } from '../categories/categories';
import { DirectoryPage } from '../directory/directory';
import { SocialSharing } from '@ionic-native/social-sharing';
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
   constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public veporel:VePorEl,
     public util:Util,
     private geolocation: Geolocation,
     private translateService: TranslateService,
     public toastCtrl: ToastController,
     public menu: MenuController,
     public socialSharing: SocialSharing
     )
   {
      menu.enable(true);


   }

   ionViewDidLoad() {
     let self = this;
     try {
       //Valido si me llega una dirrecion de otra vista
       this.address = this.navParams.get('address');
       if(this.address){
         this.latitude = this.navParams.get(this.util.constants.latitude);
         this.longitude = this.navParams.get(this.util.constants.longitude);
         this.city_name = this.navParams.get(this.util.constants.city_name);
         self.util.savePreference(this.util.constants.address, this.address);
         self.util.savePreference(this.util.constants.latitude, this.latitude);
         self.util.savePreference(this.util.constants.longitude, this.longitude);
         self.util.savePreference(this.util.constants.city_name, this.city_name);
         self.get_banners(this.city_name);
       }else{
         //Valido si tengo una direccion almacenada
         if(self.util.getPreference(this.util.constants.address)){
           this.address = self.util.getPreference(this.util.constants.address);
           this.latitude = self.util.getPreference(this.util.constants.latitude);
           this.longitude = self.util.getPreference(this.util.constants.longitude);
           this.city_name= self.util.getPreference(this.util.constants.city_name);
           self.get_banners(this.city_name);
         }else{
           //Obtengo las coordenadas actuales
           this.geolocation.getCurrentPosition().then((resp) => {
             self.latitude = resp.coords.latitude;
             self.longitude = resp.coords.longitude;

             self.veporel.get_address(resp.coords.latitude, resp.coords.longitude).subscribe(
               (result: any) => {
                 if (result != null) {
                   // let body = JSON.parse(result._body);
                   // self.address = body.results[0].formatted_address;
                   //
                   // let city_name = body.results[0].address_components[5].short_name;
                   self.address = result.street + " "+ result.houseNumber;

                   let city_name =  result.city;
                   if (city_name) {
                     //Almaceno
                     self.util.savePreference(this.util.constants.address, this.address);
                     self.util.savePreference(this.util.constants.latitude, self.latitude);
                     self.util.savePreference(this.util.constants.longitude, self.longitude);
                     self.util.savePreference(this.util.constants.city_name, city_name);
                     self.get_banners(city_name);
                   }
                 }
               },
               error => {

               }
             );
           }).catch((error) => {
             console.log('Error getting location', error);
           });
         }
       }

     } catch (e) {
     }
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
     if(this.address){
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
     this.navCtrl.push(CategoriesPage);
   }

   public share(){
     this.translateService.get('mensaje_compartir').subscribe((res) => {
       this.socialSharing.share(res, 'VePorEl', 'http://veporel.com/images/logo.png', 'http://veporel.com/').then(() => {

       }).catch(() => {
       });
     });
   }

   public go_to_directory(){
     this.navCtrl.push(DirectoryPage);
   }

 }
