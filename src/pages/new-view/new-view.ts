import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, Modal } from 'ionic-angular';
import { SetCoordinatesPage } from '../set-coordinates/set-coordinates';

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
              private modalController: ModalController) {
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
}