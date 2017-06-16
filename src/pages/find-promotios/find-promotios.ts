import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
import { OfferPage } from '../offer/offer';

/**
 * Generated class for the FindPromotiosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-find-promotios',
  templateUrl: 'find-promotios.html',
})
export class FindPromotiosPage {
  private type_find_promotion;
  private promotions:any[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public veporel:VePorEl,
    public util:Util,
  ) {
  }

  ionViewDidEnter() {
    let self = this;
    try {
      this.type_find_promotion = this.navParams.get(this.util.constants.type_find_promotio);
      if(this.type_find_promotion && this.type_find_promotion == this.util.constants.find_promotio_by_location){
        let latitude = this.navParams.get(this.util.constants.latitude);
        let longitude = this.navParams.get(this.util.constants.longitude);
        self.veporel.get_promotions_by_location(latitude, longitude).subscribe(
          (result: any) => {
            if (result != null) {
              self.promotions = JSON.parse(result._body);
              if(self.promotions.length==0){
                self.navCtrl.pop();
                this.util.show_toast('error_13');
              }
            }
          },
          error => {

          }
        );
      }else if (this.type_find_promotion && this.type_find_promotion == this.util.constants.find_promotion_by_subcategory){
        let subcategory_id = this.navParams.get(this.util.constants.subcategory_id);
        self.veporel.get_offers_by_subcategory(subcategory_id).subscribe(
          (result: any) => {
            if (result != null) {
              self.promotions = JSON.parse(result._body);
            }
          },
          error => {

          }
        );
      }

    } catch (e) {
    }
  }

  public transform_distance(distance:number){
    let d:number= parseInt((distance*100).toFixed(0));
    if(d<1000){
      return d+ " Mts";
    }else{
      return (d/1000).toFixed(0)+ " Kms"
    }
  }

  go_to_offer(offer_id:any, bid:any){
    this.navCtrl.push(OfferPage,{
      offer_id: offer_id,
      branch_id: bid
    })
  }


}
