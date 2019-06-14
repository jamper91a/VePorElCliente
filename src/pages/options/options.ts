import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Util } from '../../providers/providers';
import {SocialSharing} from "@ionic-native/social-sharing";
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {

  private options:{
    notifications:boolean,
    range:number,
    debug:boolean,
    url:string
  };
  private logs:string;
  private user:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public util: Util,
    public socialSharing: SocialSharing,
  ) {
    //Obtengo la inforacion del usuario
    this.user = JSON.parse(this.util.getPreference(this.util.constants.user));
    try{
      if(this.user.debuger)
        this.user.debuger=true;
      else
        this.user.debuger=false;
    }catch (e){
      this.user.debuger=false;
    }
    this.options= JSON.parse(this.util.getPreference("options"));
    if(!this.options){
      this.options={
        notifications:true,
        range : 10,
        debug: false,
        url:util.url
      }
    }
    this.logs = this.util.getLogs();
  }

  ionViewWillEnter(){
    this.logs = this.util.getLogs();
  }

  public clear_logs(){
   this.util.clearLogs();
   this.logs="";
  }

  public save_options(){
    this.util.savePreference("options", JSON.stringify(this.options));
    this.navCtrl.pop();
  }
  public share(){
    this.socialSharing.share(this.logs, 'VePorEl', []).then(() => {
    }).catch((e) => {
      alert(e);
    });
  }

}
