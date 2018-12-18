import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, Modal, ToastController, normalizeURL, NavController } from 'ionic-angular';
import { SetCoordinatesPage } from '../set-coordinates/set-coordinates';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Entry } from '@ionic-native/file';
import { NatureViewService } from '../../services/nature-view.service';
import { NatureView } from '../../models/nature-view.model';

declare var cordova: any;

@Component({
  selector: 'page-new-view',
  templateUrl: 'new-view.html',
})
export class NewViewPage implements OnInit {

  natureViewForm: FormGroup;
  latitude: number;
  longitude: number;
  imageUrl: string;


  constructor(private formBuilder: FormBuilder,
              private modalController: ModalController,
              private toastController: ToastController,
              private camera: Camera,
              private natureViewService: NatureViewService,
              private navController: NavController,
              private file: File) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.natureViewForm = this.formBuilder.group({
      name: ['', Validators.required],
      date: [new Date().toISOString(), Validators.required],
      description: ['']
    });
  }

  onOpenCoordsModal() {
    let modal: Modal;
    if (this.latitude) {
      modal = this.modalController.create(
        SetCoordinatesPage, {latitude: this.latitude, longitude: this.longitude}
      );
    } else {
      modal = this.modalController.create(SetCoordinatesPage);
    }
    modal.present();
    modal.onDidDismiss(
      (data) => {
        if (data) {
          this.latitude = data.latitude;
          this.longitude = data.longitude;
        }
      }
    );
  }

  onTakePhoto() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }).then(
      (data) => {
        if (data) {
          const path = data.replace(/[^\/]*$/, '');
          const filename = data.replace(/^.*[\\\/]/, '');
          const targetDirectory = cordova.file.dataDirectory;
          this.file.moveFile(path, filename, targetDirectory, filename + new Date().getTime()).then(
            (data: Entry) => {
              this.imageUrl = normalizeURL(data.nativeURL);
              this.camera.cleanup();
            }
          )        
        }
      }
    ).catch(
      (error) => {
        this.toastController.create({
          message: error.message,
          duration: 3000,
          position: 'bottom'
        }).present();
        this.camera.cleanup();
      }
    );
  }

  onSubmitForm() {
    let newView = new NatureView(
      this.natureViewForm.get('name').value,
      new Date(),
      this.natureViewForm.get('description').value,
      this.latitude,
      this.longitude,
      this.imageUrl
    );
    this.natureViewService.addNatureView(newView);
    this.navController.pop();
  }
}
