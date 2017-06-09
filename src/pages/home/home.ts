import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
import { Geolocation } from '@ionic-native/geolocation';
import { MapPage } from '../map/map';
import { FindPromotiosPage } from '../find-promotios/find-promotios';
import { CategoriesPage } from '../categories/categories';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
   selector: 'page-home',
   templateUrl: 'home.html',
 })
 export class HomePage {

   private banners:any;
   private address:string="";
   private addres_for_another_place:boolean=false;
   private latitude:number;
   private longitude:number;
   constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public veporel:VePorEl,
     public util:Util,
     private geolocation: Geolocation,
     private translateService: TranslateService,
     public toastCtrl: ToastController,
     ) {



   }

   ionViewDidLoad() {
     let self = this;
     try {
       this.address = this.navParams.get('address');
       if(this.address){
         this.addres_for_another_place = true;
         this.latitude = this.navParams.get('latitude');
         this.longitude = this.navParams.get('longitude');
       }

     } catch (e) {
     }
     if (!this.addres_for_another_place) {
       this.geolocation.getCurrentPosition().then((resp) => {
         self.latitude = resp.coords.latitude;
         self.longitude = resp.coords.longitude;
         self.veporel.get_address(resp.coords.latitude, resp.coords.longitude).subscribe(
           (result: any) => {
             if (result != null) {
               let body = JSON.parse(result._body);
               self.address = body.results[0].formatted_address;
               let city_name = body.results[0].address_components[5].short_name;
               if (city_name) {
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

 }
