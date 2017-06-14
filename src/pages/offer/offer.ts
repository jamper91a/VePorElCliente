import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
import { MapOfferPage } from '../map-offer/map-offer';
import moment from 'moment';
import { LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html',
})
export class OfferPage {

  private offer_id:number;
  private branch_id:number;
  private cantidad:number;
  public offer:any[];
  public  offers_user:any[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public veporel:VePorEl,
    public util:Util,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translate: TranslateService,
  ) {
    let self = this;
    this.offer_id = this.navParams.get(this.util.constants.offer_id);
    this.branch_id = this.navParams.get(this.util.constants.branch_id);
    self.veporel.get_offer_by_id(this.offer_id).subscribe(
      (result: any) => {
        if (result != null) {
          let body = JSON.parse(result._body);
          self.offer = body.offer;
          self.offers_user = body.offers_user;
          self.cantidad = body.cantidad;
          if(self.cantidad>0){
            this.translate.get(["opciones",
              "uso_bloqueado",
              "aceptar",
            ]).subscribe(
              (values) => {
                let toast = this.toastCtrl.create({
                  message: values.uso_bloqueado,
                  position: 'bottom',
                  duration: 3000
                });

                toast.present();
              });

          }
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

  public take_offer(){
    let self=this;
    let loader = this.loadingCtrl.create({
      content: "Reservando ..."
    });
    loader.present();

    self.veporel.take_offer(this.offer_id, this.branch_id).subscribe(
      (result: any) => {
        if (result != null) {
          loader.dismiss();
          self.go_to_offer();
        }
      },
      error => {
        let body = JSON.parse(error._body);
        loader.dismiss();
        let toast = self.toastCtrl.create({
          message: body.message,
          duration: 3000,
          position: 'top'
        });
        toast.present();
        self.go_back();

      }
    );
  }

  public go_to_offer()
  {
    let self = this;
    this.navCtrl.push(MapOfferPage,{
      offers_user: self.offers_user,
      offer: self.offer
    });
  }


}
