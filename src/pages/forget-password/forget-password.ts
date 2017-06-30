import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Util, VePorEl } from '../../providers/providers';

@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  public account:{
    email:string,
    temp_password: number,
    new_password: string,
    new_password_r: string,
  }={
    email:'',
    temp_password: 0,
    new_password: '',
    new_password_r: ''

  };
  private step:number=1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public util: Util,
    public veporel: VePorEl
  ) {
    //Determino si ya existe algún usuario
    this.account.email = this.util.getPreference("email_temp");

  }

  public send_temp_password() {
    if(this.account.email){
      this.veporel.recovery_password(this.account.email).subscribe((result)=>{
        this.util.savePreference("email_temp", this.account.email);
        this.util.show_toast('envio_contrasena_temporal');
        this.next_step();
      },(err)=>{
        this.util.show_toast('error_12');
      });
    }else{
      this.util.show_toast('error_1');

    }
  }

  public next_step(){
    this.step=2;
  }
  public reset_password(){
    if (this.account.temp_password) {
      if (this.account.new_password) {
        if (this.account.new_password == this.account.new_password_r) {
          this.veporel.reset_password(
            this.account.email,
            this.account.temp_password,
            this.account.new_password
          ).subscribe((result)=>{
            this.util.savePreference("email_temp", "");
            this.util.show_toast('reset_password_ok');
            this.next_step();
          },(err)=>{
            try {
              let body = JSON.parse(err._body);
              this.util.show_toast(body.message);
            } catch (e) {
              this.util.show_toast('error_12');
            }
          });
        }else{
          this.util.show_toast('error_3');
        }
      }else{
        this.util.show_toast('error_4');
      }
    }else{
      this.util.show_toast('error_2');
    }
  }

}
