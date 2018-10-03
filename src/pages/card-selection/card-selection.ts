import { Component } from '@angular/core';
import { CardInformation } from "../../card-information";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from "ionic-angular";

/**
 * Generated class for the CardSelectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'card-selection',
    templateUrl: 'card-selection.html',
})
export class CardSelectionPage {
    cards: any[];
    constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
        if(CardInformation) {
            this.cards = CardInformation.getAllCards();
            this.filterStack.push(CardInformation.getAllCards());
        }
    }

    ionViewDidLoad() {
        
        // console.log('ionViewDidLoad CardSelectionPage');
    }

    sortMethod = ["Name", "Elixir Descending", "Elixir Ascending", "Rarity Descending", "Rarity Ascending"];
    index = 0;
    filterStack = [];

    filterCards(ev) {
        // use indexof
        let substring = ev.target.value;
        // console.log("Filter for:", substring);
        if(substring != "") {
            this.cards = CardInformation.getAllCards().filter((item) => {
                return (item["name"].toLowerCase().indexOf(substring.toLowerCase()) > -1);
            })
        } else {
            this.cards = CardInformation.getAllCards();
        }
    }
    changeSortMethod() {
        this.index = (this.index + 1) % this.sortMethod.length;
    }
    chooseCard(event) {
        let source = event.target.src;
        this.view.dismiss(source);
    }
}
