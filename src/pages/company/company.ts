import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VePorEl, Util } from '../../providers/providers';
@Component({
  selector: 'page-company',
  templateUrl: 'company.html',
})
export class CompanyPage {

  private company:any;
  private company_id:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public veporel:VePorEl,
    public util:Util,
  ) {
    this.company_id = this.navParams.get(this.util.constants.company).company_id;
  }

  ionViewDidLoad() {
    let self = this;
    this.veporel.get_company_by_id(this.company_id).subscribe((result:any)=>{
      if(result!=null){
        self.company = JSON.parse(result._body);
      }
    });

  }

}
