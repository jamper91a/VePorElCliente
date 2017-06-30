import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
import { MenuPage } from '../menu/menu';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the CalificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-calification',
  templateUrl: 'calification.html',
})
export class CalificationPage {

  private body:any;
  private reclaimOn=false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public veporel:VePorEl,
    public util:Util,
    public toastCtrl: ToastController,
    public translate: TranslateService,
  ) {
    this.reclaimOn=false;
    this.body={
      id: this.navParams.get("id"),
      calification:3,
      reason: '',
      reclamed: this.navParams.get("reclamed")
    }
    console.log(this.body);
  }

  send_calification() {
    let self=this;
    this.veporel.send_calification(this.body).subscribe(
      (result:any)=>{
        this.translate.get(["opciones",
          "calificacion_exitosa"
        ]).subscribe(
          (values) => {
            let toast = this.toastCtrl.create({
              message: values.calificacion_exitosa,
              position: 'bottom',
              duration: 3000
            });
            toast.present();
            self.navCtrl.setRoot(MenuPage);
          });

      },
      error => {
        this.translate.get(["opciones",
          "error_10"
        ]).subscribe(
          (values) => {
            let toast = this.toastCtrl.create({
              message: values.error_10,
              position: 'bottom',
              duration: 3000
            });

            toast.present();
          });
      }
    );
  }

}
