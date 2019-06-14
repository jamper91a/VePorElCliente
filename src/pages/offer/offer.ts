import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
import { MapOfferPage } from '../map-offer/map-offer';
import moment from 'moment';
import { LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import {SocialSharing} from "@ionic-native/social-sharing";


@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html',
})
export class OfferPage {

  private offer_id:number;
  private branch_id:number;
  private cantidad:number;
  public offer:any;
  public  offers_user:any;
  public  company_name:string;
  private user:any = null;
  private demo:boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public veporel:VePorEl,
    public util:Util,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translate: TranslateService,
    public socialSharing: SocialSharing,
    private alertCtrl: AlertController,
  ) {
    let self = this;
    this.offer_id = this.navParams.get(this.util.constants.offer_id);
    this.branch_id = this.navParams.get(this.util.constants.branch_id);
    this.company_name = this.navParams.get(this.util.constants.company_name);
    self.veporel.get_offer_by_id(this.offer_id, this.branch_id).subscribe(
      (result: any) => {
        if (result != null) {
          let body = JSON.parse(result._body);
          self.offer = body.offer;
          console.log(self.offer);
          //If is user demo, not offers user
          self.offers_user = body.offers_user;
          self.cantidad = body.cantidad;
          //Check user is not demo
          if(this.user==null || this.user.username=='demo@veporel.com'){
            self.demo =true;
          }
            if(self.cantidad>0 && !self.offers_user && self.demo==false){
              this.translate.get(["opciones",
                "uso_bloqueado"
              ]).subscribe(
                (values) => {
                  let toast = this.toastCtrl.create({
                    message: values.uso_bloqueado,
                    position: 'bottom',
                    duration: 3000
                  });

                  toast.present();
                });

            }else if(self.offers_user && self.offers_user.state>0){
              this.translate.get(["opciones",
                "oferta_ya_reclamada"
              ]).subscribe(
                (values) => {
                  let toast = this.toastCtrl.create({
                    message: values.oferta_ya_reclamada,
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

  ionViewWillEnter() {
    if (this.util.getPreference(this.util.constants.logged)) {
      this.user = JSON.parse(this.util.getPreference(this.util.constants.user));
    }
    if(this.user==null || this.user.username=='demo@veporel.com'){
      this.demo =true;
    }
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
    if(!self.demo){
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
          try {
            let body = JSON.parse(error._body);
            loader.dismiss();
            let toast = self.toastCtrl.create({
              message: body.message,
              duration: 3000,
              position: 'top'
            });
            toast.present();
            self.go_back();
          } catch (e) {
            loader.dismiss();
            let toast = self.toastCtrl.create({
              message: "Error al intentar reservar, por favor intentalo mas tarde",
              duration: 3000,
              position: 'top'
            });
            toast.present();
          }

        }
      );
    }else{
      this.ask_for_login();
    }

  }

  public ask_for_login(){
    var self=this;
    let confirm = self.alertCtrl.create({
      title: "VePorEl",
      message: "Para poder reclamar la oferta, debes logearte en la aplicacion",
      buttons: [
        {
          text: "Ok",
          handler: () => {
            this.util.clearAllData();
            window.location.reload();
          }
        },
        {
          text: "Cancelar",
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  public go_to_offer()
  {
    let self = this;
    this.navCtrl.push(MapOfferPage,{
      offers_user: self.offers_user,
      offer: self.offer,
      kind_map: self.util.constants.map_offer
    });
  }

  public share(){
    var self=this;
    this.translate.get('mensaje_compartir_offer',{offer: self.offer.name, company: this.company_name}).subscribe((res) => {

      this.socialSharing.share(res, 'VePorEl', [], 'http://veporel.com').then(() => {

      }).catch((e) => {
        alert(e);
      });
    });
  }


}
