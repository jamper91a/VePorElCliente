import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
import { Geolocation } from '@ionic-native/geolocation';
import { CompaniesPage } from '../companies/companies';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
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
  }={
    country_id:"",
    city_id:0,
    category_id:0,
    subcategory_id:0,
    name:""
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public util:Util,
    public veporel:VePorEl,
    private geolocation: Geolocation,
    private ga: GoogleAnalytics,
  ) {

  }

  ionViewDidLoad() {
    let self = this;
    this.geolocation.getCurrentPosition().then((resp) => {
      let dialog = this.util.show_dialog('Obteniendo tu ubicación');
      self.veporel.get_address(resp.coords.latitude, resp.coords.longitude).subscribe(
        (result: any) => {
          self.country_name = result.countryCode;
          self.city_name = result.city;
          dialog.dismiss();
          //Obtengo los paises
          this.veporel.get_countries().subscribe((result:any)=>{
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
    });


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



    this.veporel.get_categories().subscribe((result:any)=>{
      if(result!=null){
        let body = result._body;
        self.categories = JSON.parse(body);
      }
    });


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
    console.log(subcategorie);
    this.ga.trackEvent('Busqueda negocios', 'Subcategoria', subcategorie);
    this.navCtrl.push(CompaniesPage,this.data);
  }

}
