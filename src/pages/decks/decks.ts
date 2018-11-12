import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
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
    decks = new Set();
    @ViewChild("parent", { read: ViewContainerRef}) parent: ViewContainerRef;
    constructor(public navCtrl: NavController, public navParams: NavParams, private _cfr: ComponentFactoryResolver, private storage: Storage, private action: ActionSheetController, private alert: AlertController) {
        
    }
    ionViewDidLoad() {
        this.storage.forEach((value, key, i) => {
            this.addFilledDeck(key, value);
            console.log("Added deck: ", key, ": ", value);
            setTimeout(() => {}, 250);
        });
    }
    addEmptyDeck() {
        // const comp = this._cfr.resolveComponentFactory(CardDeckComponent);
        // console.log(comp.ngContentSelectors)
        // console.log(comp);
        // const cardDeck = this.parent.createComponent(comp);
        const id = new Date().getTime();
        const newDeck = {"id": id, "name": "", "deck": ["assets/imgs/PlaceholderCard.png", "assets/imgs/PlaceholderCard.png", "assets/imgs/PlaceholderCard.png", "assets/imgs/PlaceholderCard.png", "assets/imgs/PlaceholderCard.png", "assets/imgs/PlaceholderCard.png", "assets/imgs/PlaceholderCard.png", "assets/imgs/PlaceholderCard.png"]}
        this.decks.add(newDeck);
    }
    addFilledDeck(name, deck) {
        const id = new Date().getTime();
        const newDeck = {"id": id, "name":name, "deck": deck}
        this.decks.add(newDeck);
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
        console.log("Destroy?");
    }
    saveDecks() {
        // console.log("Saving decks!");
        this.storage.clear().then(res => {
            const decks = this.getDecks();
            console.log("Saving:", decks);
            for(const name in decks) {
                if(name != "undefined") {
                    console.log("Setting:", name, " to:", decks[name]);
                    this.storage.set(name, decks[name]);
                }
            }
            const alert = this.alert.create({
                title: "Your decks have been saved!",
                buttons: ["OK"]
            });
            alert.present();
        });
    }
    async deleteDecks() {
        await this.storage.clear();
    }
    printDecks() {
        // this.saveDecks();
        this.storage.forEach(function(value, key, iteration) {
            console.log(key, ":", value);
        });
    }
    deckDebug() {
        const action = this.action.create({
            buttons: [
                {
                    text: "Print Decks",
                    handler: () => {
                        this.printDecks();
                    }
                },
                {
                    text: "Clear Decks",
                    handler: () => {
                        this.storage.clear().then(
                            res => {
                                console.log("Decks deleted");
                            }
                        );
                    }
                },
                {
                    text: "Save Decks",
                    handler: () => {
                        this.saveDecks();
                    }
                }
            ]
        });
        action.present();
    }
}
