import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CardSelectionPage } from "../../pages/card-selection/card-selection";
import { ModalController, ActionSheetController, AlertController, Alert } from "ionic-angular";
import { CardInformation } from "../../card-information";

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
    averageElixirCost: any;
    // @ViewChild("parent", {read: ElementRef}) card;
    @Output() destroyCheck:EventEmitter<string> = new EventEmitter<string>();
    @Input() input;
    @Input() name;
    constructor(public modalCtrl: ModalController, private action: ActionSheetController, private alertCtrl: AlertController) {
    }
    @Input() deck = ["assets/imgs/PlaceholderCard.png", "assets/imgs/PlaceholderCard.png", "assets/imgs/PlaceholderCard.png", "assets/imgs/PlaceholderCard.png", "assets/imgs/PlaceholderCard.png", "assets/imgs/PlaceholderCard.png", "assets/imgs/PlaceholderCard.png", "assets/imgs/PlaceholderCard.png"];
    openCardSelection(event, index) {
        const modal = this.modalCtrl.create(CardSelectionPage);
        modal.onDidDismiss(data => {
            // console.log("Set to:", data);
            if(data) {
                if(new Set(this.deck).has(data)) {
                    const alert = this.alertCtrl.create({
                        title: "You cannot have duplicate cards",
                        buttons: ["OK"]
                    });
                    alert.present();
                    return;
                }
                event.target.src = data;
                this.deck[index] = data;
                this.calculateAverageElixir();
                // console.log(this.deck);
            }
        });
        modal.present();
    }

    showAdditionalOptions(event) {
        const actionsheet = this.action.create({
            buttons: [
                {
                    text: "Delete",
                    icon: "trash",
                    handler: () => {
                        this.destroyCheck.emit(this.input);
                    }
                },
                {
                    text: "Export",
                    icon: "download",
                    handler: () => {
                        if(new Set(this.deck).size < 8) {
                            console.log("You can't export less than 8 cards");
                        } else {
                            window.open(CardInformation.getDeckLink(this.deck.map(link => CardInformation.pathToName(link))));
                        }
                    }
                }, 
                {
                    text: "Cancel",
                    icon: "close",
                    role: "cancel",
                    handler: () => {
                        
                    }
                }
            ]
        });
        actionsheet.present();
    }
    defaultPath = "assets/imgs/PlaceholderCard.png";
    calculateAverageElixir() {
        let total:number = 0;
        let hasMirror:boolean = false;
        for(const card of this.deck) {
            if(card.indexOf("Placeholder") != -1) {
                return;
            }
            const card_name = CardInformation.pathToName(card);
            // console.log("Searching for", card_name);
            const elixir = Number(CardInformation.getCardInfo(card_name)["elixir"]);
            total += elixir;
            if(elixir == 0) {
                hasMirror = true;
            }
        }
        if(hasMirror) {
            this.averageElixirCost = (total / 7).toFixed(1);
        } else {
            this.averageElixirCost = (total / 8).toFixed(1);
        }
    }
}
