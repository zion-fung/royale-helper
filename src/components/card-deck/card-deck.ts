import { Component } from '@angular/core';
import { CardSelectionPage } from "../../pages/card-selection/card-selection";
import { ModalController, PopoverController } from "ionic-angular";
import { PopoverOptionsPage } from "../../pages/popover-options/popover-options";

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

    constructor(public modalCtrl: ModalController, private popover: PopoverController) {
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

    showAdditionalOptions(event) {
        const popover = this.popover.create(PopoverOptionsPage);
        popover.present({ev: event});
    }
}
