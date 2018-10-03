import requests
from bs4 import BeautifulSoup
from os import listdir
import json
def get_stats():
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
def sort_cards():
    j = json.loads(open("cards-elixir-asc.json", "r").read())
    commons = []
    rares = []
    epics = []
    legendaries = []
    for card in j:
        if card["rarity"] == "Common":
            commons.append(card)
        elif card["rarity"] == "Rare":
            rares.append(card)
        elif card["rarity"] == "Epic":
            epics.append(card)
        else:
            legendaries.append(card)
    # j.sort(key=lambda card: card["elixir"], reverse=True)
    asc = legendaries + epics + rares + commons
    file = open("rarity-desc.json", "w")
    file.write(str(asc))
    file.close()
def arrayToMap():
    f = open("cards.json", "r")
    cards = json.loads(f.read())
    # Given an object with name key, make the name the key with an object containing everything else as the value
    def extractName(dict):
        name = dict["name"]
        dict.pop("name", None)
        return {name: dict}
    result = list(map(extractName, cards))
    d = {}
    index = 0
    for res in result:
        key = list(res.keys())[0]
        d[key] = res[key]
        index += 1
    print(d)
    # print("Found", index, "cards")
    f.close();
if __name__ == "__main__":
    # sort_cards()
    arrayToMap()
