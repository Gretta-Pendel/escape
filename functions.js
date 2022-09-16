// Functions
// Random number from min to max
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Build Deck 15 of 45
function BuildDeck(count, cardList) { 
    if (count < 1) {
        return
    }
    let rnd, arrayCards = cardList;
    rnd = getRndInteger(0, arrayCards.length - 1);
    Deck.push(arrayCards[rnd]);
    arrayCards.splice(rnd, 1);
    BuildDeck(count - 1, arrayCards);
}

// Build Items Deck
function BuildItemsDeck() {
    for (const item of ItemsCards) {
        for (let i = 0; i < item.Count; i++) {
            ItemsDeck.push(item);            
        }
    }
}

// Get Item from Itemd Deck
function getItem() {
    let item;
    rnd = getRndInteger(0, ItemsDeck.length - 1);
    item = ItemsDeck[rnd];
    ItemsDeck.splice(rnd, 1);
    console.log(ItemsDeck)
    return item;
}

// Create <img> and push into parent element
function createImage(parent,path,cssclass,name) {
    let img = document.createElement('img');
    img.setAttribute('class', cssclass);
    img.setAttribute('src', 'img/' + path + name);
    parent.append(img);
}

// Render Current card
function renderCurrentCard(card) {
    let cardElement = document.createElement('article');


    let cardText = ``;
    if (card.Name) {
        cardText += `<h3>${card.Name}</h3>`;
    }
    if (card.Text) {
        for (let t = 0; t < card.Text.length; t++) {
            cardText += card.Text[t]
        }
    }
    //createImage(cardElement,'card',card.Image)
    cardElement.insertAdjacentHTML('beforeend', cardText);
    if (card.Actions) {
        let actions = document.createElement('div');
        for (let a = 0; a < card.Actions.length; a++) {
            if (card.Actions[a].Description) {
                let desc = document.createElement('p');
                desc.innerHTML = card.Actions[a].Description;
                actions.append(desc);
            }
            if (card.Actions[a].Damage) {
                let dmg = document.createElement('div');
                dmg.innerHTML = "<b>Урон: </b>" + card.Actions[a].Damage;               
                actions.append(dmg);
            }            
            if (card.Actions[a].Dice) {
                let dice = document.createElement('div');
                for (const d in card.Actions[a].Dice) {
                    let n = card.Actions[a].Dice[d];
                    createImage(dice, 'dice/', 'chapter-dice', n + '.svg')
                }
                actions.append(dice);

                if (~card.Actions[a].Dice.indexOf("character")) {
                    let charRolls = document.createElement('div');
                    charRolls.className = "charRolls";
                    charRolls.innerHTML = "<img class=\"chapter-dice\" src=\"img/dice/character.svg\">: [";
                    for (let i = 0; i < Characters.length; i++) {
                        let result = ChapterDice[getRndInteger(0, 5)];
                        createImage(charRolls, 'dice/', 'chapter-dice', result + '.svg')
                    }
                    charRolls.insertAdjacentHTML('beforeend', ']');
                    actions.append(charRolls);
                }
            }
            cardElement.append(actions);
        }
    }

    let cardDice = document.createElement('div');
    cardDice.className = "cardDice";

    // Roll button and result
    let cardButton = document.createElement('button');
    cardButton.innerText = "🎲";
    cardButton.setAttribute("title", "Бросить кубик");
    cardButton.className = "cardButton";
    cardDice.append(cardButton);

    let charResult = document.createElement('div');
    charResult.className = 'charResult';
    cardButton.addEventListener('click', function () {
        let rnd = ChapterDice[getRndInteger(0, 5)];
        //charResult.innerHTML = "";
        createImage(charResult,'dice/','dice',rnd + '.svg')
    });
    cardDice.append(charResult);
    cardElement.append(cardDice);

    return cardElement;
}

// Render Deck on page
// function renderDeck(deck) {
//     for (let index = 0; index < deck.length; index++) {
//         const card = deck[index];
//         let cardElement = document.createElement('article');
//         let cardText = ``;
//         if (card.Name) {
//             let name = document.createElement('h3');
//             name.innerText = card.Name;
//             cardText.insertAdjacentHTML('beforeend', name);
//         }
//         if (card.Text) {
//             for (let t = 0; t < card.Text.length; t++) {
//                 cardText += card.Text[t]
//             }
//         }
//         createImage(cardElement,'card',card.Image)
//         cardElement.insertAdjacentHTML('beforeend', cardText);
//         if (card.Actions) {
//             let actions = document.createElement('div');
//             for (let a = 0; a < card.Actions.length; a++) {
//                 if (card.Actions[a].Description) {
//                     let desc = document.createElement('p');
//                     desc.innerHTML = card.Actions[a].Description;
//                     actions.append(desc);
//                 }
//                 if (card.Actions[a].Dice) {
//                     let dice = document.createElement('div');
//                     dice.innerHTML = card.Actions[a].Dice;
//                     actions.append(dice);
//                }
//                 if (card.Actions[a].Damage) {
//                     let dmg = document.createElement('div');
//                     dmg.innerHTML = "<b>Урон: </b>" + card.Actions[a].Damage;
//                     actions.append(dmg);
//               }
//                 cardElement.append(actions);
//             }
//         }
//         console.log(card.Image)
//     }
// }

// render Item

function renderItem(char, parent) { 
    parent.innerHTML = '';
    for (const item of char.Items) {
        let itemBox = document.createElement('div');
        itemBox.className = 'item-box';
        if (item.Image)
            createImage(itemBox, 'items/', 'item', item.Image);
        itemBox.insertAdjacentHTML('beforeend', '<div>' + item.Name + '</div>');
        itemBox.insertAdjacentHTML('beforeend', '<div class=type>' + item.Type + '</div>');
        itemBox.insertAdjacentHTML('beforeend', '<div>' + item.Text + '</div>');
        let itemDiscard = document.createElement('button');
        itemDiscard.innerHTML = '🪣';
        itemDiscard.setAttribute("title", "Сбросить");
        itemBox.append(itemDiscard);
        itemDiscard.addEventListener('click', function () {
            if (Characters.find(el => el == char)) {
                let posChar = Characters.indexOf(char);
                console.log(posChar)
                let porItem = Characters[posChar].Items.indexOf(item);
                Characters[posChar].Items.splice(porItem,1);
            }
            renderItem(char, parent);
        });
        parent.append(itemBox);
        console.log(Characters);
    }
    
}
