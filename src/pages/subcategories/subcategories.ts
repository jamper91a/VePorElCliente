import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
import {FindPromotiosPage} from "../find-promotios/find-promotios";

/**
 * Generated class for the SubcategoriesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-subcategories',
  templateUrl: 'subcategories.html',
})
export class SubcategoriesPage {

  private subcategories:any[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public veporel:VePorEl,
    public util:Util,
  ) {
    try {
      let self = this;
      let category_id = this.navParams.get(this.util.constants.category_id);
      if(category_id){
        let city_name=self.util.getPreference(this.util.constants.city_name);
        self.veporel.get_subcategories(category_id, city_name).subscribe(
          (result: any) => {
            if (result != null) {
              self.subcategories = JSON.parse(result._body);
              if(self.subcategories.length==0){
                self.navCtrl.pop();
                this.util.show_toast('error_13');
              }
            }
          },
          error => {

          }
        );
      }

    } catch (e) {
    }


  }
  ionViewDidLoad() {
    this.get_banners();
  }

  public get_offers(subcategory_id:number){
    this.navCtrl.push(FindPromotiosPage,{
      "type_find_promotio": this.util.constants.find_promotion_by_category,
      "subcategory_id": subcategory_id
    })
  }

  private banners:any;
  private get_banners(){
    let city_name = this.util.getPreference(this.util.constants.city_name);
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

}
