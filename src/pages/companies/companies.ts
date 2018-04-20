import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
import {MapOfferPage} from "../map-offer/map-offer";

@Component({
  selector: 'page-companies',
  templateUrl: 'companies.html',
})
export class CompaniesPage {


  private branchs:any[];
  private page=0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public veporel:VePorEl,
    public util:Util,
  ) {
  }

  ionViewDidLoad() {
    let self = this;
    this.veporel.get_companies_by_city_categorie_and_name(this.navParams.data, this.page).subscribe((result:any)=>{
      if(result!=null){
        var body = JSON.parse(result._body);
        try {
          this.navParams.data.pagetoken = body.pagetoken;
        } catch (e) {
          this.navParams.data.pagetoken = "";
        }
        self.branchs = body.branchs;
        if(self.branchs.length==0){
          this.navCtrl.pop();
          this.util.show_toast('error_13');
        }else{
          self.get_banners();
        }
      }
    });
  }

  go_to_map(branch:any){
    let self = this;
    this.navCtrl.push(MapOfferPage,{
      kind_map: self.util.constants.map_branch,
      branch: branch
    })
  }

  doInfinite(infiniteScroll) {
    var self=this;
    this.page=this.page+20;
    this.veporel.get_companies_by_city_categorie_and_name(this.navParams.data, this.page).subscribe((result:any)=>{
      infiniteScroll.complete();

      if(result!=null){
        var body = JSON.parse(result._body);
        try {
          this.navParams.data.pagetoken = body.pagetoken;
        } catch (e) {
          this.navParams.data.pagetoken = "";
        }
        let new_Branchs = body.branchs;
        if(new_Branchs==0){
        }else{
          self.branchs = self.branchs.concat(new_Branchs);
        }
      }
    });


  }

  public transform_distance(distance:number){
    let d:number= parseInt((distance*1).toFixed(0));
    if(d<1000){
      return d+ " Mts";
    }else{
      return (d/1000).toFixed(0)+ " Kms"
    }
  }

  public valid_photo(branch){

    if(branch && branch.url_photo) {
      branch.url_photo = branch.url_photo.split(";")[0];
      return this.util.isUrlValid(branch.url_photo);
    }else
      return false;
  }

  private banners:any;
  private get_banners(){
    let city_name = this.util.getPreference(this.util.constants.city_name);
    let self = this;
    //Obtengo los banners
    this.veporel.get_banners(city_name, 3).subscribe(
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


}
