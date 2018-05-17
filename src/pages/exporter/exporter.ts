import {Component, ViewChild} from '@angular/core';
import {Content, NavController, NavParams} from 'ionic-angular';
import {Util, VePorEl} from "../../providers/providers";

/**
 * Generated class for the ExporterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-exporter',
  templateUrl: 'exporter.html',
})
export class ExporterPage {

  @ViewChild(Content) content: Content;

  public data:any;
  private photos:any;
  public mas_info:boolean=false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public veporel:VePorEl,
    public util:Util,
  ) {
    var self=this;
    this.data = this.navParams.get(this.util.constants.exporter);
    let url_photo = this.data.url_photo;
    if(url_photo)
      self.photos= url_photo.split(";");
    else
      self.photos=[];
  }

  ionViewDidLoad() {

  }

  show_mas_info(){
    this.mas_info=true;
    this.content.scrollToBottom(200);
  }

}
