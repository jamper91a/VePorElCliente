import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
import { Geolocation } from '@ionic-native/geolocation';
import { CompaniesPage } from '../companies/companies';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Diagnostic } from '@ionic-native/diagnostic';
import { TranslateService } from '@ngx-translate/core';
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'page-directory',
  templateUrl: 'directory.html',
})
export class DirectoryPage {

  private countries:any;
  private cities:any;
  private subcategories:any;
  private categories:any;
  private city_name="";
  private country_name="";
  data:{
    country_id:string
    city_id:number,
    category_id:number,
    subcategory_id:number,
    name:string,
    latitude:number,
    longitude:number
  }={
    country_id:"",
    city_id:0,
    category_id:0,
    subcategory_id:0,
    name:"",
    latitude:0,
    longitude:0
  };
  private onResumeSubscription: Subscription;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public util:Util,
    public veporel:VePorEl,
    private geolocation: Geolocation,
    private ga: GoogleAnalytics,
    private diagnostic: Diagnostic,
    private translateService: TranslateService,
    private platform: Platform,
    private alertCtrl: AlertController,
    public viewCtrl: ViewController
  ) {
    var self=this;
    this.platform.resume.subscribe(() => {
      if(this.navCtrl.last().instance instanceof DirectoryPage)
        self.get_location();
    });

  }

  get_location(){
    let self = this;
    self.diagnostic.isLocationAuthorized().then(function (isAuthorized) {
      if(isAuthorized){
        self.diagnostic.isLocationEnabled().then(function(isAvailable){
          if(isAvailable){
            let dialog = self.util.show_dialog('Obteniendo tu ubicación');
            self.geolocation.getCurrentPosition().then((resp) => {
              self.data.latitude = resp.coords.latitude;
              self.data.longitude = resp.coords.longitude;
              self.veporel.get_address(resp.coords.latitude, resp.coords.longitude).subscribe(
                (result: any) => {
                  self.country_name = result.countryCode;
                  self.city_name = result.city;
                  dialog.dismiss();
                  //Obtengo los paises
                  self.veporel.get_countries().subscribe((result:any)=>{
                    let body =  result._body;
                    if(body!=null){
                      self.countries = JSON.parse(body);
                      self.data.country_id = self.country_name;

                      self.veporel.get_categories().subscribe((result:any)=>{
                        if(result!=null){
                          let body = result._body;
                          self.categories = JSON.parse(body);
                        }
                      });
                    }

                  });
                },
                error => {

                }
              );
            }).catch((error) => {
              console.error(error);
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
                      self.platform.exitApp();
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
            self.platform.exitApp();
          }
        }).catch(function (error) {

        });
      }
    }).catch(function () {

    });




  }

  ionViewDidLoad() {

    let self = this;
    this.get_location();





    // this.geolocation.getCurrentPosition().then((resp) => {
    //
    //   self.veporel.get_address(resp.coords.latitude, resp.coords.longitude).subscribe(
    //     (result: any) => {
    //       if (result != null) {
    //         let body = JSON.parse(result._body);
    //         self.city_name = body.results[0].address_components.locality.short_name;
    //         self.country_name = body.results[0].address_components.country.short_name;
    //       }
    //
    //       //Obtengo los paises
    //       this.veporel.get_countries().subscribe((result:any)=>{
    //         let body =  result._body;
    //         if(body!=null){
    //           self.countries = JSON.parse(body);
    //           self.data.country_id = self.country_name;
    //         }
    //
    //       });
    //     },
    //     error => {
    //
    //     }
    //   );
    // }).catch((error) => {
    // });






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
            self.data.city_id = self.cities[i].id;
            return;
          }
        }
      }
    });
  }

  change_category(event:any, category_id:number){
    let self=this;
    //Obtengo las ciudades de ese pais
    this.veporel.get_subcategories(category_id).subscribe((result:any)=>{
      if(result!=null){
        let body = result._body;
        self.subcategories = JSON.parse(body);
      }
    });
  }

  public find(){
    let subcategorie ="";
    for (var i=0; i<this.subcategories.length;i++){
      if(this.subcategories[i].id == this.data.subcategory_id)
      {
        subcategorie = this.subcategories[i].name;
        break;
      }
    }
    this.ga.trackEvent('Busqueda negocios', 'Subcategoria', subcategorie);
    this.navCtrl.push(CompaniesPage,this.data);
  }

}
