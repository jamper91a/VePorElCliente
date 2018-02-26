import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
import {CompanyPage} from "../company/company";
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
        self.branchs = JSON.parse(result._body);
        if(self.branchs.length==0){
          this.navCtrl.pop();
          this.util.show_toast('error_13');
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
    this.page=this.page+50;
    this.veporel.get_companies_by_city_categorie_and_name(this.navParams.data, this.page).subscribe((result:any)=>{
      infiniteScroll.complete();

      if(result!=null){
        let new_Branchs= JSON.parse(result._body);
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


}
