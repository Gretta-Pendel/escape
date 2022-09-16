'use strict';
window.addEventListener("DOMContentLoaded", function () {

    var Deck = [];
    var ItemsDeck = [];
    var Characters = [];
    // Deck tracker
    var index = 0;
    var currentCard = Deck[0];

    var charactersSelects = [];
    var charNumber = 2;
    var startHealth = charNumber == 2 ? 18 : charNumber == 3 ? 14 : charNumber == 4 ? 12 : 0;

    // Saving progress
    var gameSave = {
        gameCharNumber: charNumber,
        gameDeck: Deck,
        gameDeckIndex: index,
        gameItemsDeck: ItemsDeck,
        gameCharacters: Characters
    };    
    
    let rulesBox = document.getElementById('rules');
    let deckBox = document.getElementById('deckBox');
    let currentCardBox = document.getElementById('currentCard');
    let currentDeckBox = document.getElementById('currentDeck');
    let currentTextBox = document.getElementById('currentText');
    let charactersBox = document.getElementById('charactersBox');
    let items = document.getElementById('items');
    let getItemButton = document.getElementById('getItemButton');
    let itemsBox = document.getElementById('itemsBox');
    let charactersNumber = document.getElementById('charactersNumber');
    let newGame = document.getElementById('newGame');
    let saveButton = document.getElementById('saveButton');
    let loadButton = document.getElementById('loadButton');

    saveButton.addEventListener('click', save);
    loadButton.addEventListener('click', load);

// Build Deck
function buildDeck() {
    Deck.push(StartCard);    
    BuildDeckByData(deckLength, ChapterCards);
    let boss = getRndInteger(0, 2);
    Deck.push(BossCards[boss]);  
}

// Build Items Deck
function buildItemsDeck() {
    BuildItemsDeck();
}

// New game
function startNewGame() { 
    Deck = [];
    ItemsDeck = [];
    Characters = [];
    charactersSelects = [];
    buildDeck();
    buildItemsDeck();
}

function save() {
    saveGame();
    let jsonSave = JSON.stringify(gameSave);
    var data = [new ClipboardItem({ "text/plain": new Blob([jsonSave], { type: "text/plain" }) })];
    navigator.clipboard.write(data).then(function() {
        console.log("Copied to clipboard successfully!");
    }, function() {
        console.error("Unable to write to clipboard. :-(");
    });
    alert("В буфере обмена код. Его нужно вставить в пустой текстовый файл и бережно сохранить.");
}

function load() {
    let result = prompt("Тут должен быть код из сэйва", '{"gameCharNumber":2,"gameDeck":[],"gameDeckIndex":0,"gameItemsDeck":[],"gameCharacters":[]}');
    let value = JSON.parse(result);
    gameSave = value;
    Deck = gameSave.gameDeck;
    ItemsDeck = gameSave.gameItemsDeck;
    Characters = gameSave.gameCharacters;
    index = gameSave.gameDeckIndex || 0;
    charNumber = gameSave.gameCharNumber;
    currentCard = Deck[0];
    renderCharacterSelect(charNumber);
    renderCharacters();
}

    function saveGame() {
        gameSave = {
            gameCharNumber: charNumber,
            gameDeck: Deck,
            gameDeckIndex: index,
            gameItemsDeck: ItemsDeck,
            gameCharacters: Characters        
        };
    }
    // Rules Navigation
    rulesBox.insertAdjacentHTML('beforeend', "<a href=rules.html target=_blank>Правила ></a>");
    rulesBox.insertAdjacentHTML('beforeend', rules);
    let rulesH2 = rulesBox.getElementsByTagName('h2');
    Array.from(rulesH2).forEach(item => {
        let div = item.nextElementSibling;
        if (div.matches('div')) {
            item.className = 'open';
            item.addEventListener('click', function () {
                div.className = div.className === 'show' ? 'hide' : 'show';
            })
        }
    });

    // Turning over the chapter cards one by one
    currentDeck.addEventListener('click', function () {
        if (Characters.length == 0) {
            alert('Выберите персонажей')
            return;
        }
        turnOver(index);
    });
    currentCardBox.addEventListener('click', function () {
        if (Characters.length == 0) {
            alert('Выберите персонажей')
            return;
        }
        turnBack(index);
    });


    // New Game
    // Characters number
    charactersNumber.addEventListener('change', function () {
        if (Characters.length > 0) {
            let ok = confirm("Игра начнется заново. Вы уверены?");
            if (!ok) return;
        }
        // Clear cahracters:
        charactersBox.innerHTML = "";
        charNumber = charactersNumber.value;
        Characters = [{},{},{},{}];
        // render character selects:
        renderCharacterSelect(charactersNumber.value);
        charactersSelects = document.getElementsByName('characterSelect');
        // Choose Characters:
        for (let index = 0; index < charactersSelects.length; index++) {
            const charSelect = charactersSelects[index];
            charSelect.addEventListener("change", function () {
                let val = this.value;
                let die = CharacterDice.filter(item => item[0] == val)[0];
                for (const _charSelect of charactersSelects) {
                    if (_charSelect != charSelect) {
                        for (var i = 0; i < _charSelect.options.length; i++) {
                            if (_charSelect.options[i].value == val)
                                _charSelect.remove(i);
                        }
                    }
                }
                // add Character to characters global array                
                Characters[index] = {
                    Job: val,
                    Image: die[2],
                    Dice: die[1],
                    StartHealth: startHealth,
                    Health: startHealth,
                    Items: []
                }; 
                // show characters in their containers
                renderCharacters();
            });
        }
    });

    // functions
    // Turn over - show next Card
    function turnOver(i) {
        if (i > deckLength + 1) {
            currentCardBox.innerHTML = "";
            currentTextBox.innerHTML = "";
            currentDeckBox.innerHTML = "<h1>Game over!</h1>"
            return;
        }
        currentCard = Deck[index];
        currentCardBox.innerHTML = "";
        if (currentCard.Image)
            createImage(currentCardBox, 'cards/', 'card', currentCard.Image)
        currentTextBox.innerHTML = "";
        currentTextBox.append(renderCurrentCard(currentCard));
        currentDeckBox.innerHTML = "";
        createImage(currentDeckBox, "", 'card', defaultCover);
        index++;
    }

    // Turn back - show previous Card
    function turnBack(i) {
        index = index - 2;
        if (i < 0) {
            index = 0;
            return;
        }
        if (i == 0) {
            currentCardBox.innerHTML = "";
            currentTextBox.innerHTML = "";
            currentDeckBox.innerHTML = "";
            createImage(currentDeckBox, "", 'card', startCover);
            index = 0;
            return;
        }
        currentCard = Deck[index];
        currentCardBox.innerHTML = "";
        if (currentCard.Image)
            createImage(currentCardBox, 'cards/', 'card', currentCard.Image)
        currentTextBox.innerHTML = "";
        currentTextBox.append(renderCurrentCard(currentCard));
        currentDeckBox.innerHTML = "";
        createImage(currentDeckBox, "", 'card', defaultCover);
    }

    // Render Characters
    function renderCharacters() {
        charactersBox.innerHTML = "";
        for (const char of Characters) {
            if (!char) return;
            let charBox = document.createElement('article');
            let charBar = document.createElement('div');
            let charItems = document.createElement('div');
            let charImage = document.createElement('div');
            charBar.className = 'charBar';
            charItems.className = 'charItems';
            charImage.className = 'charImage';

            // HP
            let charHP = document.createElement('div');
            // Current HP
            let charHealth = document.createElement('input');
            charHealth.value = char.Health;
            charHP.innerHTML = "HP: ";
            charHP.append(charHealth);
            charHealth.addEventListener('onchange', function () {
                char.Health = charHealth.value;
                saveGame();
            });
            //charHP.insertAdjacentHTML('beforeend', "HP: ");
            charHP.insertAdjacentHTML('beforeend', " / " + char.StartHealth);
            charHP.className = "hpBox";
            // Save hp
            let hpButton = document.createElement('button');
            hpButton.innerText = "💾";
            hpButton.setAttribute("title", "Сохранить");
            hpButton.className = "hpButton";
            charHP.append(hpButton);
            hpButton.addEventListener('click', function () {
                char.Health = charHealth.value;
                saveGame();
            });

            charBar.append(charHP);
        
            // Roll button and result
            let charButton = document.createElement('button');
            charButton.innerText = "🎲";
            charButton.setAttribute("title", "Бросить кубик");
            charButton.className = "charButton";
            charBar.append(charButton);

            let charResult = document.createElement('div');
            charResult.className = 'charResult';
            charButton.addEventListener('click', function () {
                let rnd = char.Dice[getRndInteger(0, 5)];
                charResult.innerHTML = "";
                createImage(charResult, 'dice/', 'dice', rnd + '.svg')
            });
            charBar.append(charResult);


            let charGetItemButton = document.createElement('button');
            charGetItemButton.innerText = "🗡️";
            charGetItemButton.setAttribute("title", "Взять предмет");
            charGetItemButton.className = "charGetItemButton";
            charBar.append(charGetItemButton);
            renderItem(char, charItems);
            charGetItemButton.addEventListener('click', function () {
                if (ItemsDeck.length == 0) {
                    alert("А все, кончились предметы");
                    return;
                }
                else if (char.Items.length > 1) {
                    alert("Предметов уже два");
                    return;
                }
                let newItem = getItem();
                char.Items.push(newItem);
                renderItem(char, charItems);
            });
            charBox.append(charItems);

            // Image
            createImage(charImage, 'dice/', 'char', char.Image + '.png');

            charBox.append(charBar);
            charBox.append(charImage);
            charBox.append(charItems);

            charactersBox.append(charBox);
        }
    }
    // Render character selects
    function renderCharacterSelect(n) {        
        newGame.innerHTML = '';
        for (let i = 0; i < n; i++) {
            let characterSelect = document.createElement('select');
            characterSelect.id = "character" + (i + 1) + "Select";
            characterSelect.name = "characterSelect";
            let firstOption = document.createElement('option');
            firstOption.name = "Выберите персонажа";
            firstOption.value = "Выберите персонажа";
            firstOption.innerHTML = "Выберите персонажа";
            characterSelect.appendChild(firstOption);            
            for (const char of CharacterDice) {
                let charOption = document.createElement('option');
                charOption.name = char[0];
                charOption.value = char[0];
                charOption.innerHTML = char[0];
                characterSelect.appendChild(charOption);
            }
            if (Characters.length > 0 && Characters[i]) {
                characterSelect.value = Characters[i].Job;
            }
            newGame.append(characterSelect);
        }
    }

    // Random number from min to max
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Build Deck 15 of 45
    function BuildDeckByData(count, cardList) {
        if (count < 1) return;
        let rnd, arrayCards = cardList;
        rnd = getRndInteger(0, arrayCards.length - 1);
        Deck.push(arrayCards[rnd]);
        arrayCards.splice(rnd, 1);
        BuildDeckByData(count - 1, arrayCards);
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
        let rnd = getRndInteger(0, ItemsDeck.length - 1);
        item = ItemsDeck[rnd];
        ItemsDeck.splice(rnd, 1);
        return item;
    }

    // Create <img> and push into parent element
    function createImage(parent, path, cssclass, name) {
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
            createImage(charResult, 'dice/', 'dice', rnd + '.svg')
        });
        cardDice.append(charResult);
        cardElement.append(cardDice);

        return cardElement;
    }

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
                    let porItem = Characters[posChar].Items.indexOf(item);
                    Characters[posChar].Items.splice(porItem, 1);
                }
                renderItem(char, parent);
            });
            parent.append(itemBox);
        }    
    }    
});
