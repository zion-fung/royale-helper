import { Component } from '@angular/core';
import { CardSelectionPage } from "../../pages/card-selection/card-selection";
import { ModalController } from "ionic-angular";

/**
 * Generated class for the CardDeckComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'card-deck',
    templateUrl: 'card-deck.html'
})
export class CardDeckComponent {

    text: string;

    constructor(public modalCtrl: ModalController) {
        console.log('Hello CardDeckComponent Component');
        this.text = 'Hello World';
    }

    openCardSelection(event) {
        const modal = this.modalCtrl.create(CardSelectionPage);
        modal.onDidDismiss(data => {
            // console.log("Set to:", data);
            if(data) {
                event.target.src = data;
            }
        });
        modal.present();
    }

}
