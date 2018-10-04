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
    @ViewChild("parent", { read: ViewContainerRef}) parent: ViewContainerRef;
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
    save() {
        console.log(this.parent);
        const children = this.parent.element.nativeElement.children;
        for(const child of children) {
            const cards = child.getElementsByClassName("cards")
            for(const card of cards) {
                console.log(card.src);
            }
            console.log(child.getElementsByClassName("deckName")[0].id);
            console.log("------------");
        }
    }
    deleteDeck(ev) {
        // console.log("Removing:", ev);
        this.decks.delete(ev);
    }
}
