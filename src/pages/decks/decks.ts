import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CardDeckComponent } from "../../components/card-deck/card-deck";

/**
 * Generated class for the DecksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-decks',
    templateUrl: 'decks.html',
})
export class DecksPage {
    show = true;
    decks = new Set([1]);
    // @ViewChild("parent", { read: ViewContainerRef}) parent: ViewContainerRef;
    constructor(public navCtrl: NavController, public navParams: NavParams, private _cfr: ComponentFactoryResolver) {
        
    }
    ionViewDidLoad() {
        // console.log(this.parent);
    }
    addDeck() {
        // const comp = this._cfr.resolveComponentFactory(CardDeckComponent);
        // console.log(comp.ngContentSelectors)
        // console.log(comp);
        // const cardDeck = this.parent.createComponent(comp);
        this.decks.add(new Date().getTime());
    }
    deleteDeck(ev) {
        // console.log("Removing:", ev);
        this.decks.delete(ev);
    }
}
