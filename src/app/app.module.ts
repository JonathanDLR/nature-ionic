import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SingleViewPage } from '../pages/single-view/single-view';
import { SetCoordinatesPage } from '../pages/set-coordinates/set-coordinates';
import { NewViewPage } from '../pages/new-view/new-view';
import { NatureViewService } from '../services/nature-view.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SingleViewPage,
    NewViewPage,
    SetCoordinatesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCWzXMpu1d_IrpxOR1CfX13SxDeErkECIY'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SingleViewPage,
    NewViewPage,
    SetCoordinatesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NatureViewService,
    Geolocation,
    Camera,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
