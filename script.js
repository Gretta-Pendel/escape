window.addEventListener("DOMContentLoaded", function(){
    
    'use strict';

    let rules = document.getElementById('rules');
    let rulesH2 = rules.querySelectorAll('h2')

    let d6 = document.getElementById('d6');
    let d6roll = document.getElementById('d6roll');    
    let test = document.getElementById('test');    
    
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    function createImage(parent,cssclass,name) {
        let img = document.createElement('img');
        img.setAttribute('class', cssclass);
        img.setAttribute("src", 'img/cards/' + name);
        parent.append(img);
    }

    // for (var i = 0; i < rulesH2.length; i++) {
    //     rulesH2[i].addEventListener("click", function() {
    //         /* Do your stuffs here */
    //     });

    Array.from(rulesH2).forEach(item => {
        let div = item.nextElementSibling;
        if (div.matches('div')) {
            item.className = 'open';
            item.addEventListener('click', function () {
                div.className = div.className === 'show' ? 'hide' : 'show';            
            })
        }
    });

    // for (let h2 of rulesH2) {
    //     h2.onclick = () => this.querySelector('div').className =
    //         this.querySelector('div').className === 'hide' ? 'show' : 'hide';
    // }



    
    d6roll.onclick = function(e){
        d6.innerText = getRndInteger(1,6);
    };

    for (let index = 0; index < ChapterCards.length; index++) {
        const card = ChapterCards[index];
        let cardElement = document.createElement('article');
        let cardText = ``;
        for (let t = 0; t < card.Text.length; t++) {
            cardText += card.Text[t]
        }
        createImage(cardElement,'card',card.Image)
        cardElement.insertAdjacentHTML('beforeend', cardText);
        if (card.Actions) {
            let actions = document.createElement('div');
            for (let a = 0; a < card.Actions.length; a++) {
                let desc = document.createElement('p');
                desc.innerHTML = card.Actions[a].Description;
                let dice = document.createElement('div');
                dice.innerHTML = card.Actions[a].Dice;
                let dmg = document.createElement('div');
                dmg.innerHTML = card.Actions[a].Damage;
                actions.append(desc);
                actions.append(dice);
                actions.append(dmg);
                cardElement.append(actions);
            }
        }
        test.append(cardElement);
    }

});