import requests
from bs4 import BeautifulSoup
from os import listdir
if __name__ == "__main__":
    base_url = "http://clashroyale.wikia.com/wiki/"
    cards = listdir("../src/assets/imgs/cards")
    file = open("cards.json", "w")
    file.write("[")
    i = 0
    for card in cards:
        card_name = card.replace("Card.png", "")
        # if name has multiple word add underscores before every capital letter after the first
        if "PEKKA" in card_name:
            if "Mini" in card_name:
                card_name = "Mini_P.E.K.K.A"
            else:
                card_name = "P.E.K.K.A"
        elif card_name == "X-Bow":
            pass
        else:
            temp = card_name[:1]
            for char in card_name[1:]:
                if char.isupper():
                    temp += "_"
                temp += char
            card_name = temp
        print("Writing:", card_name)
        webpage = requests.get(base_url + card_name).text
        soup = BeautifulSoup(webpage, "html.parser")
        stats = soup.find_all(class_="pi-data-value pi-font", limit=2)
        obj = {
            "name": card_name.replace("_", " "),
            "src":"assets/imgs/cards/" + card,
            "elxir": stats[0].text,
            "rarity": stats[1].text
        }
        file.write(str(obj))
        file.write(",")
        i += 1
    file.write("]")
    file.close()
    print("Wrote:", i, "cards")
