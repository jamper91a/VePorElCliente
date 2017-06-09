import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';

/**
 * Generated class for the SubcategoriesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-subcategories',
  templateUrl: 'subcategories.html',
})
export class SubcategoriesPage {

  private subcategories:any[]
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public veporel:VePorEl,
    public util:Util,
  ) {
    try {
      let self = this;
      let category_id = this.navParams.get(this.util.constants.category_id);
      if(category_id){
        self.veporel.get_subcategories(category_id).subscribe(
          (result: any) => {
            if (result != null) {
              self.subcategories = JSON.parse(result._body);
            }
          },
          error => {

          }
        );
      }

    } catch (e) {
    }


  }

  ionViewDidLoad() {
  }

}
