import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
import { Geolocation } from '@ionic-native/geolocation';
import { MapPage } from '../map/map';
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
   private url:string;
   private address:string="";
   private addres_for_another_place:boolean=false;
   constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public translateService: TranslateService,
     public veporel:VePorEl,
     public util:Util,
     private geolocation: Geolocation,
     ) {



   }

   ionViewDidLoad() {
     let self = this;
     try {
       this.address = this.navParams.get('address');
       if(this.address)
         this.addres_for_another_place = true;
     } catch (e) {
     }
     if (!this.addres_for_another_place) {
       this.geolocation.getCurrentPosition().then((resp) => {
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

   private change_address(){
     this.navCtrl.push(MapPage);
   }

 }
