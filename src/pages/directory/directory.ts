import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
import { Geolocation } from '@ionic-native/geolocation';
import { CompaniesPage } from '../companies/companies';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Diagnostic } from '@ionic-native/diagnostic';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'page-directory',
  templateUrl: 'directory.html',
})
export class DirectoryPage {

  private countries:any;
  private cities:any;
  private categories:any;
  private city_name="";
  private country_name="";
  public language="";

  data:{
    country_id:string,
    country_name:string,
    city_id:number,
    category:string,
    name:string,
    latitude:number,
    longitude:number,
    city_latitude:number,
    city_longitude:number,
    diferent_city:boolean
  }={
    country_id:"",
    country_name:"",
    city_id:0,
    category:"",
    name:"",
    latitude:0,
    longitude:0,
    city_latitude:0,
    city_longitude:0,
    diferent_city:false

  };
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
    private alertCtrl: AlertController
  ) {
    let self = this;
    translateService.get('LANG').subscribe(
      lang => {
        self.language=lang;
      }
    );

  }

  ionViewWillEnter(){
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

  ionViewDidLoad() {
    this.get_location();
  }

  change_country(event:any, country_code:string){
    let self=this;
    //Get conuntry name
    for (var i = 0; i < self.countries.length; i++) {
      if(self.countries[i].code == country_code){
        self.data.country_name=self.countries[i].name;
      }
    }

    //Obtengo las ciudades de ese pais
    this.veporel.get_cities_by_country(country_code,1).subscribe((result:any)=>{
      let body =  result._body;
      if(body!=null) {
        self.cities = JSON.parse(body);
        for (var i = 0; i < self.cities.length; i++) {
          if(self.cities[i].name == self.city_name){
            self.data.city_id = self.cities[i].id;
            self.data.diferent_city=false;
            return;
          }
        }
        this.util.show_toast('error_15');

        return;
      }
    });
  }
  change_city(event:any, city_id:string){
    let self=this;
    self.data.diferent_city=true;
    //Obtengo el nombre de la ciudad
    for (var i = 0; i < self.cities.length; i++) {
      if(self.cities[i].id == city_id){
        self.city_name=self.cities[i].name;
        self.data.city_latitude= self.cities[i].latitude;
        self.data.city_longitude= self.cities[i].longitude;
        self.veporel.get_categories(self.data.country_name,self.data.country_id, self.data.city_latitude, self.data.city_longitude,self.city_name).subscribe((result:any)=>{
          if(result!=null){
            let body = result._body;
            self.categories = JSON.parse(body);
          }
        });
      }
    }

  }
  public get_name(category){
    return category[this.language]
  }


  public find(){
    //this.ga.trackEvent('Busqueda negocios', 'Categoria', subcategorie);
    this.navCtrl.push(CompaniesPage,this.data);
  }

}
