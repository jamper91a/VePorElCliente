import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
import { MapOfferPage } from '../map-offer/map-offer';

@Component({
  selector: 'page-companies',
  templateUrl: 'companies.html',
})
export class CompaniesPage {


  private branchs:any[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public veporel:VePorEl,
    public util:Util,
  ) {
  }

  ionViewDidLoad() {
    let self = this;
    this.veporel.get_companies_by_city_subcategorie_and_name(this.navParams.data).subscribe((result:any)=>{
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

}
