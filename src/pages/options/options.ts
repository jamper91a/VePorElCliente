import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Util } from '../../providers/providers';
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {

  private options:{
    notifications:boolean,
    range:number
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public util: Util,
  ) {
    this.options= JSON.parse(this.util.getPreference("options"));
    if(!this.options){
      this.options={
        notifications:false,
        range : 2
      }
    }
  }

  public save_options(){
    this.util.savePreference("options", JSON.stringify(this.options));
    this.navCtrl.pop();
  }

}
