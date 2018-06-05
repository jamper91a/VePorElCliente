import {Component, ViewChild} from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { VePorEl, Util } from '../../providers/providers';
import { FindPromotiosPage } from '../find-promotios/find-promotios';
@Component({
  selector: 'page-company',
  templateUrl: 'company.html',
})
export class CompanyPage {

  @ViewChild(Content) content: Content;

  public company:any;
  private branch:any;
  private company_id:any;
  private photos:any;
  public mas_info:boolean=false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public veporel:VePorEl,
    public util:Util,
  ) {
    this.company_id = this.navParams.get(this.util.constants.company).id;
    this.branch=this.navParams.get(this.util.constants.company);
  }

  ionViewDidLoad() {
    let self = this;
    this.veporel.get_company_by_id(this.company_id, this.branch.b_id).subscribe((result:any)=>{
      if(result!=null){
        var body = JSON.parse(result._body);
        //Analizo la columna de la imagen de la foto, para determinar si hay varias
        let url_photo = body.company.url_photo;
        if(url_photo)
          self.photos= url_photo.split(";");
        else
          self.photos=[];
        self.company = body.company;
        self.branch = body.branch;
      }
    });
  }

  go_to_offers(){
    this.navCtrl.push(FindPromotiosPage,{
      "type_find_promotio": this.util.constants.find_promotion_by_user_id
    })
  }

  show_mas_info(){
    this.mas_info=true;
    this.content.scrollToBottom(200);
  }



}
