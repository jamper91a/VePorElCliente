import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
import moment from 'moment';
@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html',
})
export class OfferPage {

  public offer:any[];
  public  offers_user:any[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public veporel:VePorEl,
    public util:Util
  ) {
    let self = this;
    let offer_id = this.navParams.get(this.util.constants.offer_id);
    self.veporel.get_offer_by_id(offer_id).subscribe(
      (result: any) => {
        if (result != null) {
          let body = JSON.parse(result._body);
          self.offer = body.offer;
          self.offers_user = body.offers_user;
        }
      },
      error => {

      }
    );
  }

  ionViewDidLoad() {

  }

  public calculate_saving(regular_price:number, price:number){
    return regular_price-price;
  }
  public calculate_time(finish:any){
    var a = moment(finish);
    var b = moment();
    var days:any =a.diff(b, 'days');
    var hours:any = a.diff(b, 'hours');
    var minutes:any = a.diff(b, 'minutes');
    if(days>1)
      days = days + " dias, ";
    else if (days == 1)
      days = days + " dia, ";
    else
      days = "";
    if(hours>24)
      hours = (hours%24);
    if(hours>1)
      hours = hours + " horas y ";
    else if (hours == 1)
      hours = hours + " hora y ";
    else
      hours = "";

    if(minutes>60)
      minutes = (minutes%60);
    if(minutes>1)
      minutes = minutes + " minutos";
    else if (minutes == 1)
      minutes = minutes + " minuto";
    else
      minutes = "";

    return days+hours+minutes;
  }

  public go_back(){
    this.navCtrl.pop();
  }

}
