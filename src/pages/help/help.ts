import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
import { TranslateService } from '@ngx-translate/core';
import {MenuPage} from "../menu/menu";
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  public message:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public veporel:VePorEl,
    public util:Util,
    public toastCtrl: ToastController,
    public translate: TranslateService,
    public socialSharing: SocialSharing,
  ) {
  }

  public send() {
    let self=this;
    this.veporel.send_message(this.message).subscribe(
      (result:any)=>{
        this.translate.get([
          "mensaje_enviado_exito"
        ]).subscribe(
          (values) => {
            let toast = this.toastCtrl.create({
              message: values.mensaje_enviado_exito,
              position: 'bottom',
              duration: 3000
            });
            toast.present();
            self.navCtrl.setRoot(MenuPage);
          });

      },
      error => {
        this.translate.get([
          "error_11"
        ]).subscribe(
          (values) => {
            let toast = this.toastCtrl.create({
              message: values.error_11,
              position: 'bottom',
              duration: 3000
            });

            toast.present();
          });
      }
    );
  }

  public share(){
      this.socialSharing.shareViaWhatsAppToReceiver("+573193811648", this.message, '', '').then(() => {

      }).catch(() => {
      });
  }

}
