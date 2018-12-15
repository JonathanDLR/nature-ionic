import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-set-coordinates',
  templateUrl: 'set-coordinates.html',
})
export class SetCoordinatesPage implements OnInit {

  latitude: number;
  longitude: number;
  marker: {
    latitude: number,
    longitude: number,
    draggable: true
  };

  constructor(private viewController: ViewController,
              private navParams: NavParams,
              private geolocation: Geolocation,
              private loadingController: LoadingController,
              private toastController: ToastController) {}

  ngOnInit() {
    let receivedLatitude = this.navParams.get('latitude');
    let receivedLongitude = this.navParams.get('longitude');
    if (receivedLatitude) {
      this.latitude = receivedLatitude;
      this.longitude = receivedLongitude;
      this.marker = {
        latitude: receivedLatitude,
        longitude: receivedLongitude,
        draggable: true
      }
    } else {
      this.latitude = 57.28;
      this.longitude = -2.58;
    }
  }

  onCancel() {
    this.viewController.dismiss();
  }

  onMapClicked($event) {
    this.marker = {
      latitude: $event.coords.lat,
      longitude: $event.coords.lng,
      draggable: true
    };
  }

  onSave() {
    this.viewController.dismiss({
      latitude: this.marker.latitude,
      longitude: this.marker.longitude
    });
  }

  onLocateMe() {
    let loader = this.loadingController.create({
      content: 'Scanning position...'
    });
    loader.present();
    this.geolocation.getCurrentPosition().then(
      (resp) => {
        loader.dismiss();
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.marker = {
          latitude: resp.coords.latitude,
          longitude: resp.coords.longitude,
          draggable: true
        }
      }).catch(
      (error) => {
        loader.dismiss();
        this.toastController.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }
}
