import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {VePorEl} from '../../providers/providers';
import {Util} from '../../providers/providers';
import {ExporterPage} from "../exporter/exporter";

/**
 * Generated class for the ExportersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-exporters',
  templateUrl: 'exporters.html',
})
export class ExportersPage {

  private data: any[];
  private page = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public veporel: VePorEl,
    public util: Util,
  ) {
  }

  ionViewDidLoad() {
    let self = this;
    this.veporel.get_exporter_by_product(this.navParams.data, this.page).subscribe((result: any) => {
        if (result != null) {
          var body = JSON.parse(result._body);
          self.data = body;
          if (self.data.length == 0) {
            this.navCtrl.pop();
            this.util.show_toast('error_13');
          } else {
            self.get_banners();
          }
        }
      },
      () => {
        this.navCtrl.pop();
        this.util.show_toast('error_13');
      });
  }

  doInfinite(infiniteScroll) {
    var self = this;
    this.page = this.page + 20;
    this.veporel.get_exporter_by_product(this.navParams.data, this.page).subscribe((result: any) => {
      infiniteScroll.complete();

      if (result != null) {
        var body = JSON.parse(result._body);
        let new_data = body.data;
        if (new_data) {
        } else {
          self.data = self.data.concat(new_data);
        }
      }
    });


  }


  go_to_exporter(exporter: any) {
    console.log(exporter);
    this.navCtrl.push(ExporterPage, {
      exporter: exporter
    })
  }

  public valid_photo(branch) {
    if (branch && branch.url_photo) {
      branch.photo = branch.url_photo.split(";")[0];
      return this.util.isUrlValid(branch.photo);
    } else
      return false;
  }

  private banners: any;

  private get_banners() {
    let city_name = this.util.getPreference(this.util.constants.city_name);
    let self = this;
    //Obtengo los banners
    this.veporel.get_banners(city_name, 4).subscribe(
      (result: any) => {
        let body = result._body;
        if (body != null) {
          self.banners = JSON.parse(body);
        } else {
        }

      },
      error => {
      }
    );
  }

}
