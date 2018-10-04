import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CardDeckComponent } from "../../components/card-deck/card-deck";
import { Storage } from "@ionic/storage";

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
    constructor(public navCtrl: NavController, public navParams: NavParams, private _cfr: ComponentFactoryResolver, private storage: Storage) {
        
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
    // Returns an object, with each key being the name of a deck and value representing the sources of the deck
    getDecks() {
        let decks = {};
        const children = this.parent.element.nativeElement.children;
        for(const child of children) {
            const name = child.getElementsByClassName("deckName")[0].id;
            const cards = child.getElementsByClassName("cards")
            decks[name] = [];
            for(const card of cards) {
                decks[name].push(card.src);
            }
        }
        return decks;
    }
    deleteDeck(ev) {
        // console.log("Removing:", ev);
        this.decks.delete(ev);
    }
    ngOnDestroy() {
        // Save all decks to local storage
        this.saveDecks();
    }
    async saveDecks() {
        // console.log("Saving decks!");
        const decks = this.getDecks();
        console.log("Saving:", decks);
        for(const key in decks) {
            // Does it not support other objects?
            console.log("Setting", key, "to", decks[key]);
            await this.storage.set(key, decks[key]);
        }
    }
    async printDecks() {
        await this.saveDecks();
        this.storage.keys().then(
            data => {
                for(const key of data) {
                    console.log(key, ":", data[key]);
                }
            }, error => {
                console.log("Error retrieving storage:", error);
            }
        )
    }
}
