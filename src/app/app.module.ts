import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CardSelectionPage } from "../pages/card-selection/card-selection";
import { DecksPage } from "../pages/decks/decks";
import { PopoverOptionsPage } from "../pages/popover-options/popover-options";
import { CardDeckComponent } from "../components/card-deck/card-deck";
import { IonicStorageModule } from "@ionic/storage";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CardSelectionPage,
    DecksPage,
    PopoverOptionsPage,
    CardDeckComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CardSelectionPage,
    DecksPage,
    PopoverOptionsPage,
    CardDeckComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
