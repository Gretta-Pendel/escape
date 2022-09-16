'use strict';

var Deck = [];
var ItemsDeck = [];
var Characters = [];
// Deck tracker
var index = 0;
var currentCard = Deck[0];

// [{Job:'Miller',Dice:???,StartHealth:18,Health:18,Items:[ItemsCards[i],ItemsCards[j]]}]
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

// Build Deck
function buildDeck() {
    Deck.push(StartCard);    
    BuildDeck(deckLength, ChapterCards);
    let boss = getRndInteger(0, 2);
    Deck.push(BossCards[boss]);  
    console.log(Deck);
}

// Build Items Deck
function buildItemsDeck() {
  BuildItemsDeck();
    console.log(ItemsDeck);
  
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

function saveGame() {
    gameSave = {
        gameCharNumber: charNumber,
        gameDeck: Deck,
        gameDeckIndex: index,
        gameItemsDeck: ItemsDeck,
        gameCharacters: Characters
    }
}

window.addEventListener("DOMContentLoaded", function () {
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
        // Clear cahracters:
        charactersBox.innerHTML = "";
        Characters = [];
        charNumber = charactersNumber.value;
        // render character selects:
        renderCharacterSelect(charactersNumber.value);
        charactersSelects = document.getElementsByName('characterSelect');
        // Choose Characters:
        for (const charSelect of charactersSelects) {
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
                Characters.push({
                    Job: val,
                    Image: die[2],
                    Dice: die[1],
                    StartHealth: startHealth,
                    Health: startHealth,
                    Items: []
                });
                // show characters in their containers
                renderCharacters()
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
            charHP.append(charHealth);
            charHP.insertAdjacentHTML('beforeend', " / " + char.StartHealth);
            charHP.insertAdjacentHTML('afterbegin', "HP: ");
            charHP.className = "hpBox";
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
        startNewGame();
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
            newGame.append(characterSelect);
        }
    }
    
});