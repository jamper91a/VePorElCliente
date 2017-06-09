import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
import { SubcategoriesPage } from '../subcategories/subcategories';

/**
 * Generated class for the CategoriesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  public categories:any[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public veporel:VePorEl,
    public util:Util,
  ) {

    let self = this;
    self.veporel.get_categories().subscribe(
      (result: any) => {
        if (result != null) {
          self.categories = JSON.parse(result._body);
        }
      },
      error => {

      }
    );
  }

  ionViewDidLoad() {

  }

  public find_subcategories(category_id:number){
    this.navCtrl.push(SubcategoriesPage,{
      category_id: category_id
    })
  }

}
