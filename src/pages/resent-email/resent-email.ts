import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Util, VePorEl } from '../../providers/providers';

@Component({
  selector: 'page-resent-email',
  templateUrl: 'resent-email.html',
})
export class ResentEmailPage {

  public account:{
    email:string
  }={
    email:''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public util: Util,
    public veporel: VePorEl
  ) {
    //Determino si ya existe algún usuario
    this.account.email = this.util.getPreference("email_temp");

  }

  public resent_email() {
    if(this.account.email){
      this.veporel.resent_email(this.account.email).subscribe((result)=>{
        this.util.show_toast('email_sent');
        this.navCtrl.pop();
      },(err)=>{
        this.util.show_toast('error_12');
      });
    }else{
      this.util.show_toast('error_1');

    }
  }

}
