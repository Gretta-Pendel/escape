var StartCard = {};
var ChapterCards = [];
var ChapterDice = ["might", "might", "cunning", "cunning", "wisdom", "wisdom"];
const Abbot = ["might", "wisdom", "might-might", "wisdom-wisdom", "wisdom", "cunning"];
const Cook = ["wisdom", "might", "cunning-cunning", "might-might", "might", "cunning"];
const Miller = ["wisdom", "cunning", "might-might", "cunning-cunning", "cunning", "might"];
const Smith = ["wisdom", "might", "might-might", "wisdom-wisdom", "might", "cunning"];
const Tailor = ["wisdom", "cunning", "cunning-cunning", "wisdom-wisdom", "cunning", "might"];
const Tanner = ["might", "wisdom", "cunning-cunning", "wisdom-wisdom", "wisdom", "cunning"];
var CharacterDice = [["Аббат",Abbot,"Abbot"], ["Стряпуха",Cook,"Cook"], ["Мельник",Miller,"Miller"], ["Кузнец",Smith,"Smith"], ["Швея",Tailor,"Tailor"], ["Скорнячка",Tanner,"Tanner"]];
var StartCard;
var BossCards = [1, 2, 3];
var ItemCards = [];
const deckLength = 15;
const cardsLength = 45;
const startCover = 'cover-start.png';
const defaultCover = 'cover.png';

// Епископ ("might", "wisdom", разум*2, разум*2, "wisdom", ловка)
// Каменщик ("wisdom", "might", сила*2, сила*2, "might", ловка)
// Охотница ("wisdom", "cunning", ловка*2, ловка*2, "cunning", сила)

// Ведьма (магия, "might", "wisdom", "cunning", "might", сила*2)
// Дух (разум*2, "wisdom", "might", "cunning", "wisdom", магия)
// Охранник ( ловка*2, "cunning", "wisdom", "might", "cunning", магия)

// Мясник ("cunning", "might", сила/"wisdom", сила/"cunning", "might", разум)
// Оружейница ("might", "cunning", сила/"cunning", сила/"wisdom", "cunning", разум)
// Пастушка ("cunning", "wisdom", разум/"cunning", сила/"wisdom", "wisdom", сила)

StartCard = {
    Text: [
        `<p><i>После многих лет заточения в глубинах тёмного замка, вам удаётся сбежать из своей камеры. В маленькой каменной комнате, примыкающей к тюремному блоку, стоит старый деревянный сундук. Его замок открыт...</i></p>`,
        `<p><b><i>Возьмите по одной карте предмета на игрока.</i></b></p>`,
        `<p><i>Вы слышите приближающиеся шаги. Здесь больше
        нельзя оставаться. Вы направляетесь на поиски выхода,
        скрываясь в темноте…</i></p>`,
        `<p><b><i>Переверните первую карту главы...</i></b></p>`
    ],
    Image: `0.png`
};

ChapterCards = [
    {//0
        Text: [
            `<p><i>Со вскриком ты спотыкаешься о растяжку, а сверху льётся поток кислоты.</i></p>`,
            `<p>Все игроки должны выбросить <b>ловкость</b> за одну попытку.</p>
            <p>Для каждого игрока...</p>
            <p><b>Успех:</b> ты уклоняешься от ловушки.</p>
            <p><b>Провал:</b> кислотные брызги шипят и дымятся, растворяя переносимый тобою предмет. <b><i>Сбрось один предмет.</i></b> Если предметов два, перетасуй их рубашкой вверх и <b><i>сбрось один вслепую</i></b>. Если у тебя нет предметов, теряешь <b>1 ОЗ</b>, потому что кислота прожигает твою плоть.</p>`
        ],
        Image: `1.png`
    },
    {//1
        Text: [
            `<p><i>Вы наткнулись на недавно покинутую комнату охраны. Котелок с кипящим супом стоит на плите, а огонь всё ещё тлеет в камине. Вы слышите сердитые голоса и звук приближающихся к вам шагов. Вы хватайте всё, что можете, прежде чем ускользнуть в темноту коридоров.</i></p>`,
            `<p><b>Возьмите карту предмета.</b></p>`
        ],
        Image: `2.png`
    },
    {//2
        Text: [
            `<p><i>Из тьмы перед вами с пронзительным воплем появляется мерзкое отродье. При виде вас оно пускает слюни.</i></p>`,
            `<p>Сообща выберите один вариант, затем начните сражение...</p>`
        ],
        Actions: [
            {
                Description: `Окружить тварь и атаковать её со всех сторон:`,
                Dice: ["might", "character"],
                Damage: 3
            }, {
                Description: `Держаться вместе и биться на ходу:`,
                Dice: ["might", "wisdom", "wisdom", "character"],
                Damage: 2
            }
        ],
        Image: `3.png`
    },
    {//3
        Text: [
            `<p><i>Стрела, летящая из тьмы коридора, свистит мимо уха. Прежде чем ты успеваешь среагировать, другая впивается в плечо, и ты в агонии сползаешь по стене.</i></p>`,
            `<p><b>Ты</b> теряешь <b>2 ОЗ</b>.</p>`,
            `<p><i>Осторожно проползая по коридору, ты находишь тело человека, нашпигованное стрелами. Нападавших и след простыл, так что можно проверить, нет ли у него что-нибудь ценного.</i></p>`,
            `<p><b>Возьмите карту предмета.</b></p>`
        ],
        Image: `4.png`
    },
    {//4
        Text: [
            `<p><i>Ты входишь на небольшую, песчаную арену. В центре стоит женщина, выше и мускулистее тебя, она поднимает свой изношенный клинок и кричит: «Ты бросил вызов, готовься к смерти!»</i></p>`,
            `<p><b><i>Сражение началось...</i></b></p>`,
            `<p><b>Особенности боя:</b> перед каждым раундом боя выберите одного игрока, который будет сражаться с чемпионом арены. Только этот игрок атакует и получает урон. <b>Ты</b> должен биться в первом раунде.</p>`
        ],
        Actions: [
            {
                Dice: ["might","cunning","wisdom","character"],
                Damage: 1
            }
        ],
        Image: `5.png`
    },
    {//5
        Text: [
            `<p><i>Тебя замечает чудище, пожирающее свежепойманную добычу. Оно поднимает голову, с его покрытого кровью рта свисают сухожилия. Оно нападает.</i></p>`,
            `<p><b>Ты</b> должен выбросить <b>силу или дубль</b> за одну попытку...</p>`,
            `<p><b>Успех:</b> ты быстро реагируешь и отпрыгиваешь. <b><i>Сражение началось...</i></b></p>`,
            `<p><b>Провал:</b> ты валишься на пол. Теряешь <b>2 ОЗ</b>. <b><i>Сражение началось...</i></b></p>`
        ],
        Actions: [
            {
                Dice: ["might","cunning","character"],
                Damage: 2
            }
        ],
        Image: `6.png`
    },
    {//6
        Text: [
            `<p><i>Вы поднимаетесь по узкой винтовой лестнице на продуваемую ветрами колокольню. Когда ты проходишь мимо, колокол оживает, мрачный звон сотрясает ваши кости.</i></p>`,
            `<p>Каждый игрок, что не выбросит <b>разум или дубль</b> за одну попытку, теряет <b>2 ОЗ</b>, когда звон начинает сводить его с ума.</p>`
        ],
        Image: `7.png`
    },
    {//7
        Text: [
            `<p><i>В этой душной каморке кузнец куёт меч. Он настолько поглощён своим ремеслом, что вы можете рискнуть и обокрасть его.</i></p>`,
            `<p>Сообща выберите один вариант...</p>`,
            `<p><i>Двигаться дальше:</i> не стоит рисковать. <b><i>Переверните следующую карту главы.</i></b></p>`,
            `<p><i>Украсть:</i> выберите игрока, чтобы выбросить <b>ловкость</b> за одну попытку.</p>`,
            `<p><b>Успех:</b> вы хватаете несколько изделий кузнеца, прежде чем ускользнуть. <b><i>Возьмите две карты предметов.</i></b></p>`,
            `<p><b>Провал:</b> вы пойманы с поличным, и кузнец замахивается своим молотом. Каждый игрок теряет по <b>2 ОЗ</b>, во время бегства.</p>`
        ],
        Image: `8.png`
    },
    {//8
        Text: [
            `<p><i>Два уродливых головореза обсуждали как лучше убить и съесть другого человека, когда вы вошли.</i></p>`,
            `<p>Выберите игрока, чтобы выбросить <b>разум или дубль</b> за одну попытку...</p>`,
            `<p><b>Успех:</b> ублюдки бегут, а жертва отдаёт вам вещь из своего тайника. Каждый игрок получает <b>1 ОЗ</b> или карту предмета.</p>`,
            `<p><b>Провал:</b> выродки убивают человека и осматривают вас с ног до головы, облизывая губы. <b><i>Сражение началось...</i></b></p>`
        ],
        Actions: [
            {
                Dice: ["cunning","character"],
                Damage: 2
            }
        ],
        Image: `9.png`
    },
    {//9
        Text: [
            `<p><i>В этой комнате висит густой запах навоза, исходящий от
            деревянных загонов для животных. Взволнованный вьючный зверь
            вырывается из загона и мешает вам пройти. Он загнан в угол,
            его могучие рога готовы проткнуть каждого, кто приблизится.</i></p>`,
            `<p><b><i>Сражение началось...</i></b></p>`,
            `<p><b>Особенности боя:</b> каждый раунд, когда атакует, он дополнительно отнимает по <b>1 ОЗ</b> у каждого игрока, кто попадал по нему атакой.</p>`
        ],
        Actions: [
            {
                Dice: ["cunning","character"],
                Damage: 2
            }
        ],
        Image: `10.png`
    },
    {//10
        Text: [
            `<p><i>Пьяный охранник останавливает вас и требует назвать
            цель визита. Он нетвёрдо держится на ногах, от него несёт
            перегаром.</i></p>`,
            `<p>Сообща выберите один вариант...</p>`,
            `<p><i>Подкупить:</i> <b>сбросьте один предмет</b>, и он забудет, что вас видел.</p>`,
            `<p><i>Отвлечь:</i> выберите игрока, чтобы выбросить <b>разум</b> за одну попытку...</p>`,
            `<p><b>Успех:</b> ты запутываешь охранника и вы двигаетесь дальше.</p>`,
            `<p><b>Провал:</b> охранник пытается вас схватить. Вы вырываетесь и сбегаете, но все игроки теряют по <b>1 ОЗ</b> во время драки.</p>`
        ],
        Image: `11.png`
    },
    {//11
        Text: [
            `<p><i>Твоя душа внезапно вырвалась из тела. Не в силах двинуться, ты можешь только наблюдать, как она парит над тобой.</i></p>`,
            `<p>Ты обездвижен. Чтобы восстановить твой духовный баланс, другие игроки должны одновременно кидать кубики, пока не выбросят суммарный <b>разум</b>, равный числу игроков. За каждую проваленную попытку ты теряешь по <b>1 ОЗ</b>.</p>`,
            `<p>После трёх провалов подряд, проклятие спадает, и твоя душа возвращается в тело.</p>`
        ],
        Image: `12.png`
    },
    {//12
        Text: [
            `<p><i>Останавливая свою тележку рядом с тобой, интригующий незнакомец настаивает, чтобы ты попробовал его новое зелье – лечебный эликсир. На его поясе болтается шипастая дубина, и когда ты хочешь уйти, то понимаешь, что он не примет отказа. Насколько всё плохо?</i></p>`,
            `<p><b>Ты</b> должен выбрать один вариант...</p>`,
            `<p><i>Слегка отхлебнуть:</i> Получаешь <b>1 ОЗ</b>.</p>`,
            `<p><i>Выпить залпом:</i> Выбрось <b>силу</b> за одну попытку...</p>`,
            `<p><b>Успех:</b> эликсир согревает тебя изнутри. Получаешь <b>3 ОЗ</b>.</p>`,
            `<p><b>Провал:</b> он дурно пахнет и токсичен. Тебя тошнит. Теряешь <b>1 ОЗ</b>.</p>`
        ],
        Image: `13.png`
    },
    {//13
        Text: [
            `<p><i>Когда ты подходишь к тяжёлой деревянной двери, она распахивается, и на тебя бросается безумец в лохмотьях. Он использует свои кандалы как оружие, обезумевший взгляд даёт понять, что ты стоишь на его пути к свободе.</i></p>`,
            `<p>Ты должен выбросить <b>силу</b> или дубль за одну попытку...</p>`,
            `<p><b>Успех:</b> ты уклоняешься от его диких ударов. <b><i>Сражение началось...</i></b></p>`,
            `<p><b>Провал:</b> сокрушающий удар отбрасывает тебя, теряешь 2 ОЗ. <b><i>Сражение началось...</i></b></p>`,
        ],
        Actions: [
            {
                Dice: ["might","cunning","character"],
                Damage: 2
            }
        ],
        Image: `14.png`
    },
    {//14
        Text: [
            `<p><i>Этот коридор внезапно наполняется грубым шёпотом проклятий. Огонь спрыгивает с настенных факелов, принимая облик демонического воина, языки чародейского пламени прорываются из его обугленного черепа.</i></p>`,
            `<p>Сообща выберите один вариант...</p>`,
            `<p><i>Бежать:</i> вы спасаетесь, но теряете по 2 ОЗ, пробегая через огонь.</p>`,
            `<p><i>Сражаться:</i> <b><i>Сражение началось...</i></b></p>`,
            `<p><b>Особенности боя:</b> тот, кто нанёс последний удар, теряет 1 ОЗ,
            когда демон исчезает в огненном взрыве, блок игнорируется.</p>`
        ],
        Actions: [
            {
                Dice: ["cunning","wisdom","character"],
                Damage: 2
            }
        ],
        Image: `15.png`
    },
    {//15
        Text: [
            `<p><i>В углу этой тёмной комнаты лежит скелет. Под пылью веков, он всё ещё сжимает трухлявую карту.</i></p>`,
            `<p>Сообща выберите один вариант...</p>`,
            `<p><i>Двигаться дальше:</i> здесь что-то не так. <b>Переверните следующую карту главы.</b></p>`,
            `<p><i>Украдите карту:</i> выберите игрока, чтобы выбросить <b>разум</b> за три попытки...</p>`,
            `<p><b>Успех:</b> эта карта ведёт к тайнику. Возьмите две карты предметов.</p>`,
            `<p><b>Провал:</b> скелет дёргается, выходя из своего древнего сна, чтобы покарать вас. Он разрывает карту в ярости. <b><i>Сражение началось...</i></b></p>`
        ],
        Actions: [
            {
                Dice: ["cunning","wisdom","character"],
                Damage: 2
            }
        ],
        Image: `16.png`
    },
    {//16
        Text: [
            `<p><i>В конце этого коридора стоит старый каменный колодец,
            Когда ты доходишь до него, чтобы проверить воду, она
            извергается бурным потоком. Ты потревожил злого духа.</i></p>`,
            `<p><b><i>Сражение началось...</i></b></p>`,
            `<p><b>Особенности боя: ты</b> обездвижен в первом раунде
            боя, в котором ты не можешь сражаться и отдыхать, но
            получаешь урон как обычно. Ты приходишь в себя в
            начале второго раунда.</p>`
        ],
        Actions: [
            {
                Dice: ["cunning","wisdom","character"],
                Damage: 2
            }
        ],
        Image: `17.png`
    },
    {//17
        Text: [
            `<p><i>К вам подходит человек в плаще. Он осторожно оглядывается, затем шёпотом спрашивает вас, не хотите ли вы поторговать.</i></p>`,
            `<p>Каждый игрок может выбрать один вариант...</p>`,
            `<p><i>Сторговаться:</i> <b>сбрось любой предмет</b>, возьми два новых.</p>`,
            `<p><i>Уболтать:</i> Выбрось <b>дубль</b> за одну попытку...</p>`,
            `<p><b>Успех:</b> хорошо подвешенный язык творит чудеса. <b>Возьми
            карту предмета.</b></p>`,
            `<p><b>Провал:</b> лживая лесть не тронула сердце. Оставив тебя ни
            с чем.</p>`
        ],
        Actions: [
            {
                Damage: 1
            }
        ],
        Image: `18.png`
    },
    {//18
        Text: [
            `<p><i>По вашему следу пустили свирепых гончих псов. Вы разделяетесь, каждый должен сражаться в одиночку.</i></p>`,
            `<p>Киньте по одному кубику главы на каждого игрока – это атакующая его гончая. Гончие чувствуют слабость – все игроки <b>с 8 ОЗ и меньше</b> бросают два кубика вместо одного. <b><i>Сражение началось...</i></b></p>`,
            `<p><b>Особенности боя:</b> игрок не может <b>отдыхать</b>, пока напавшие
            на него гончие не будут побеждены. Затем он может помочь
            другому игроку. Помогающий в бою игрок получает урон
            как обычно, он должен объявить кому помогает до броска.</p>`
        ],
        Image: `19.png`
    },
    {//19
        Text: [
            `<p><i>Аромат горячей еды приводит вас к кухне. На столе возле двери стоит дымящийся мясной пирог.</i></p>`,
            `<p>Сообща выберите один вариант...</p>`,
            `<p><i>Двигаться дальше:</i> не стоит рисковать. <b>Переверните следующую карту главы.</b></p>`,
            `<p><i>Украсть:</i> выберите игрока, чтобы выбросить <b>ловкость</b> за три попытки...</p>`,
            `<p><b>Успех:</b> пирог был сытен и вкусен. Все игроки получают по <b>1 ОЗ</b>.</p>
            <p><b>Провал:</b> повар ловит вас и клянётся, что сделает из вас начинку для нового пирога. <b><i>Сражение началось...</i></b></p>`
        ],
        Actions: [
            {
                Dice: ["might","wisdom","character"],
                Damage: 2
            }
        ],
        Image: `20.png`
    },
    {//20
        Text: [
            `<p><i>Чтобы пройти в эту дверь, ты вынужден отодвинуть толстые, покрытые шипами лозы. Они оживают, сковывают твои запястья и тащат в сторону зарослей.</i></p>`,
            `<p><b>Ты</b> теряешь <b>1 ОЗ</b>.</p>`,
            `<p><i>Сопротивление агрессивным сорнякам заставляет их отступать через трещины в старых каменных стенах, оставляя после себя вещи предыдущих жертв.</i></p>`,
            `<p><b><i>Возьмите две карты предметов.</i></b></p>`
        ],
        Image: `21.png`
    },    
    {//21
        Text: [
            `<p><i>Ты слышишь крик позади, но оборачиваешься слишком поздно, чтобы избежать когтей шатающегося упыря.</i></p>`,
            `<p>Сообща выберите один вариант...</p>`,
            `<p><i>Бежать:</i> вы убегаете, но ты теряешь <b>2 ОЗ</b> от когтей упыря.</p>`,
            `<p><i>Сражаться:</i> <b><i>Сражение началось...</i></b></p>`,
            `<p><b>Особенности боя:</b> ты настолько напуган, что любой выброшенный в этой главе разум не оказывает эффекта.</p>`
        ],
        Actions: [
            {
                Dice: ["wisdom","character"],
                Damage: 2
            }
        ],
        Image: `22.png`
    },
    {//22
        Text: [
            `<p><i>Несколько вооруженных фигур выскакивают из тени и атакуют. Вы разделяетесь, каждый должен сражаться в одиночку.</i></p>`,
            `<p>Киньте по одному кубику главы на каждого игрока – это атакующий его грабитель. Грабители хотят отнять ваши предметы – игроки, переносящие два предмета, бросают два кубика вместо одного. <b><i>Сражение началось...</i></b></p>`,
            `<p><b>Особенности боя:</b> игрок не может <b>отдыхать</b>, пока напавшие на него разбойники не будут побеждены. Затем он может помочь другому игроку. Помогающий в бою игрок получает урон как обычно, он должен объявить кому помогает до броска. Каждый раз, когда игрок получает урон от разбойника, он может уклониться, сбросив предмет.</p>`
        ],
        Actions: [
            {
                Damage: 1
            }
        ],
        Image: `23.png`
    },
    {//23
        Text: [
            `<p><i>Что-то блокирует дверь в эту комнату, чтобы её открыть, ты влетаешь в неё плечом с разбега. Как только ты входишь внутрь, хруст яичной скорлупы из под ног даёт понять, что это было чьё-то гнездо. Из темноты доносится скорбный вой, и скорбь скоро превращается в ярость.</i></p>`,
            `<p><b><i>Сражение началось...</i></b></p>`,
            `<p><b>Особенности боя:</b> все игроки могут сражаться как обычно, но эта тварь атакует только <b>тебя</b> и <b>ты</b> не можешь отдыхать.</p>`
        ],
        Actions: [
            {
                Dice: ["might","cunning","character"],
                Damage: 2
            }
        ],
        Image: `24.png`
    },
    {//24
        Text: [
            `<p><i>Странно, но кажется, что этот дворянин гуляет по недрам замка. Он предлагает награду в обмен на молчание о том, что вы его видели. Говоря с вами, он прикрывает нос, явно испытывая отвращение.</i></p>`,
            `<p>Сообща выберите один вариант...</p>`,
            `<p><i>Помочь:</i> вы соглашаетесь и он даёт вам награду. <b>Возьмите карту предмета.</b></p>`,
            `<p><i>Напасть:</i> вы пытаетесь ограбить его, и он отбивается,
            ослепительно орудуя шпагой. <b><i>Сражение началось...</i></b></p>`,
            `<p>Если выжили, возьмите по карте предмета за каждого игрока.</p>`
        ],
        Actions: [
            {
                Dice: ["cunning","character"],
                Damage: 1
            }
        ],
        Image: `25.png`
    },
    {//25
        Text: [
            `<p><i>Спеша в освёщенную свечами комнату; Ты прерываешь церемонию жертвоприношения. Человек в мантии и маске из черепа объявляет, что теперь тебя тоже принесут в жертву.</i></p>`,
            `<p><b><i>Сражение началось...</i></b></p>`,
            `<p><b>Особенности боя:</b> <b>ты</b> охвачен страхом. Все выброшенные в этой главе <b>дубли</b> считаются одиночными умениями, и ты не можешь <b>блокировать</b>.</p>`
        ],
        Actions: [
            {
                Dice: ["cunning","wisdom","character"],
                Damage: 2
            }
        ],
        Image: `26.png`
    },
    {//26
        Text: [
            `<p><i>Из ниоткуда появляется измождённая старуха и заявляет, что предскажет вашу судьбу. Что-то в её глазах говорит о могуществе. Вы чувствуете, что разумно будет подчиниться.</i></p>`,
            `<p>Каждый игрок должен отдельно объявить умение, а затем выбросить его за одну попытку. Для каждого игрока...</p>`,
            `<p><b>Успех:</b> ты можешь получить <b>1 ОЗ или взять карту предмета</b>.</p>`,
            `<p><b>Провал:</b> ведьма крадёт часть твоей души. Теряешь <b>1 ОЗ</b>.</p>`
        ],
        Image: `27.png`
    },
    {//27
        Text: [
            `<p><i>С одной стороны этой комнаты есть проход в пещеру, усеянный обглоданными костями. Вдруг, раздаётся гортанное рычание, и нечто выползает наружу.</i></p>`,
            `<p>Сообща выберите один вариант, затем <b><i>Сражение началось...</i></b></p>`,
            `<p></p>`
        ],
        Actions: [
            {
                Description: `<p><i>Сразиться с чудищем лицом к лицу:</i></p>`,
                Dice: ["character"],
                Damage: 3
            },
            {
                Description: `<p><i>Использовать тактику «ударил-отбежал»:</i></p>`,
                Dice: ["might","might","cunning","character"],
                Damage: 2
            }
        ],
        Image: `28.png`
    },
    {//28
        Text: [
            `<p><i>За столом сидит человек, лицо его скрыто тенью. Когда ты проходишь мимо, он бросается вперёд и с рычанием тянется к тебе, открывая своё покрытое шрамами лицо и гнилые стремления.</i></p>`,
            `<p>Сообща выберите один вариант...</p>`,
            `<p><i>Бежать:</i> вы отбиваетесь и убегаете, но сначала <b>ты</b>
            теряешь <b>3 ОЗ</b> от рук гнилого капитана.</p>`,
            `<p>Сражаться: <b><i>Сражение началось...</i></b></p>`
        ],
        Actions: [
            {
                Dice: ["might","wisdom","character"],
                Damage: 2
            }
        ],
        Image: `29.png`
    },
    {//29
        Text: [
            `<p><i>Когда вы проходите мимо богато украшенного зеркала в этой спальне, искажённые копии вас выходят из зеркала с недобрыми намерениями. Вы разделяетесь, каждый должен сражаться в одиночку.</i></p>`,
            `<p>Каждый игрок должен бросить свои кубики дважды и поместить
            перед собой соответствующие грани на кубиках главы,
            представляющие его двойника. Если выпал <b>дубль</b>, поместите
            только один кубик. <b><i>Сражение началось...</i></b></p>`,
            `<p><b>Особенности боя:</b> никто из игроков не может отдыхать, пока его двойник не будет побеждён. Затем он может помочь другому игроку. Помогающий в бою игрок получает урон как обычно, он должен объявить кому помогает до броска.</p>`
        ],
        Actions: [
            {
                Damage: 1
            }
        ],
        Image: `30.png`
    },
    {//30
        Text: [
            `<p><i>Ты стираешь пыль с крышки большого гроба, надеясь прочесть надпись. Крышка открывается от касания, гигантский рыцарь восстаёт из мёртвого сна, рыча, что не стоило его беспокоить.</i></p>`,
            `<p>Сообща выберите один вариант...</p>`,
            `<p><i>Бежать:</i> когда вы убегаете, восставший рубит тебя мечом. <b>Ты</b> теряешь <b>3 ОЗ</b>.</p>`,
            `<p>Сражаться: <b><i>Сражение началось...</i></b></p>`,
            `<p><b>Особенности боя:</b> все игроки могут сражаться как обычно, но этот гигант атакует только тебя и <b>ты</b> не можешь <b>отдыхать</b>.</p>`
        ],
        Actions: [
            {
                Dice: ["wisdom","character"],
                Damage: 2
            }
        ],
        Image: `31.png`
    },
    {//31
        Text: [
            `<p><i>Когда эти три старухи подходят ближе, вы замечаете, что их ноги не касаются земли. С хихиканьем они бросаются на вас, ощупывая иссохшими руками и гнилыми языками.</i></p>`,
            `<p><b><i>Сражение началось...</i></b></p>`,
            `<p><b>Особенности боя:</b> в первый раз, когда мёртвые карги будут побеждены, прежде чем брать карту предмета, бросьте кубик главы. Если выпал <b>разум</b> – они регенерируют, вы должны победить их во второй раз.</p>`
        ],
        Actions: [
            {
                Dice: ["wisdom","character"],
                Damage: 1
            }
        ],
        Image: `32.png`
    },
    {//32
        Text: [
            `<p><i>Там, где когда-то была плоть и мех скелетообразного зверя остались одни кости, потрескивающие угрожающей силой тёмной магии.</i></p>`,
            `<p><b><i>Сражение началось...</i></b></p>`,
            `<p><b>Особенности боя:</b> вместо того, чтобы убрать кубик главы при попадании по этому врагу, бросьте его. Если выпал разум, не убирайте его, а положите стороной с разумом вверх.</p>`
        ],
        Actions: [
            {
                Dice: ["cunning","wisdom","character"],
                Damage: 2
            }
        ],
        Image: `33.png`
    },
    {//33
        Text: [
            `<p><i>Этот коридор ведёт вас мимо тёмных, незапертых камер. Изнутри доносится звук костлявых рук, сжимающих сталь.</i></p>`,
            `<p>Сообща выберите один вариант, затем <b><i>Сражение началось...</i></b></p>`,
        ],
        Actions: [
            {
                Description: `<p><i>Ринуться внутрь:</i></p>`,
                Dice: ["character"],
                Damage: 2
            },
            {
                Description: `<p><i>Выманить наружу:</i></p>`,
                Dice: ["might","might","character"],
                Damage: 1
            }
        ],
        Image: `34.png`
    },
    {//34
        Text: [
            `<p><i>Этот коридор ведёт к старым каменным ступеням. Идя по ним, вы спускаетесь в затопленную пещеру. Вода мутная, но неглубоко внизу виден тусклый свет. Вы делаете глубокий вдох и ныряете, плывя к свету.</i></p>`,
            `<p>Все игроки должны выбросить <b>дубль</b> за одну попытку. Для каждого игрока...</p>`,
            `<p><b>Успех:</b> ты всплываешь на поверхность с другой стороны.</p>`,
            `<p><b>Провал:</b> ты начинаешь барахтаться. Теряешь <b>1 ОЗ</b> и повторяешь попытку. После трёх неудачных попыток, ты наконец то выплываешь, запыхавшись и выбившись из сил.</p>`
        ],
        Image: `35.png`
    },
    {//35
        Text: [
            `<p><i>Неожиданно, в коридор врывается рой гигантских летучих мышей. Вам остаёться только пригнуться, чтобы укрыться от бесчисленных клыков и крыльев.</i></p>`,
            `<p>Когда летучие мыши проносятся мимо, каждый игрок в свой ход должен бросить свой кубик персонажа вместе с тремя кубиками главы. После броска игрок теряет по <b>1 ОЗ</b> за каждый кубик главы, совпадающий с кубиком персонажа. Если выпадает <b>дубль</b> или совпадений нет, то летучие мыши не задели игрока.</p>`
        ],
        Image: `36.png`
    },
    {//36
        Text: [
            `<p><i>С потолка этого узкого коридора свисают длинные лезвия. Вы изучаете схему их движения и готовитесь бежать на другую сторону.</i></p>`,
            `<p>Все игроки три раза одновременно бросают кубики. Каждый бросает по кубику персонажа и кубику главы. Каждый раз, когда кубик персонажа игрока <b>совпадает</b> с кубиком главы, он нарывается на лезвие и теряет <b>2 ОЗ</b>. Если игрок выбрасывает <b>дубль</b> на любом из трёх бросков, он проноситься мимо не получая урона.</p>`
        ],
        Image: `37.png`
    },
    {//37
        Text: [
            `<p><i>Вы проходите через комнату, служащую выгребной ямой под уборными замка. Когда вы выбираете путь через нечистоты, в глаза бросается что-то необычное.</i></p>`,
            `<p><b><i>Возьмите карту предмета.</i></b></p>`
        ],
        Image: `38.png`
    },
    {//38
        Text: [
            `<p><i>Тебя сбивают с ног и тащат по боковому проходу. Ты приходишь в себя привязанным к столу, рядом человек в грязном фартуке счищает ржавчину с зазубренного лезвия. Ты станешь подопытным для палача.</i></p>`,
            `<p>Ты должен терпеть боль и ждать, когда твоё отсутствие заметят и придут на помощь. Брось кубик своего персонажа пять раз. За любую грань, кроме <b>силы</b> или дубля, теряешь <b>1 ОЗ</b>.</p>`
        ],
        Image: `39.png`
    },
    {//39
        Text: [
            `<p><i>В конце этого извилистого коридора стоит деревянный сундук, покрытый паутиной, он защищён несколькими зловещими ловушками.</i></p>`,
            `<p>Сообща выберите один вариант...</p>`,
            `<p><i>Двигаться дальше:</i> это не стоит риска. <b><i>Переверните следующую карту главы.</i></b></p>`,
            `<p><i>Рискнуть:</i> выберите игрока, чтобы попытаться стащить предметы из сундука. Он должен выбросить ловкость за одну попытку и может сделать столько попыток, сколько всего игроков.</p>`,
            `<p><b>За каждый успех:</b> <b><i>возьмите карту предмета</i></b> (две за <b>дубль</b> ловкости).</p>`,
            `<p><b>За каждый провал:</b> выбранный игрок теряет <b>2 ОЗ</b>.</p>`
        ],
        Image: `40.png`
    },
    {//40
        Text: [
            `<p><i>Вы поворачиваете за угол и оказываетесь на пути двух охранников. Они обмениваются озадаченными взглядами, а затем пытаются схватить вас.</i></p>`,
            `<p>Сообща выберите один вариант...</p>`,
            `<p><i>Бежать:</i> вы пробиваетесь мимо них, в процессе получаете несколько скользящих ударов. Каждый игрок теряет по 1 ОЗ.</p>`,
            `<p><i>Сражаться:</i> <b><i>Сражение началось...</i></b></p>`
        ],
        Actions: [
            {
                Dice: ["character"],
                Damage: 2
            }
        ],
        Image: `41.png`
    },
    {//41
        Text: [
            `<p><i>Ты чувствуешь что-то странное в этой комнате. Температура резко падает, а воздух становится неподвижным. Затем ты видишь это.</i></p>`,
            `<p>Сообща выберите один вариант...</p>`,
            `<p><i>Бежать:</i> призрак крадёт часть души и ты теряешь 2 ОЗ.</p>`,
            `<p><i>Сражаться:</i> <b><i>Сражение началось...</i></b></p>`,
            `<p><b>Особенности боя:</b> <b>ты</b> в ужасе, так что любая выброшенная в этой главе <b>сила</b> не оказывает эффекта.</p>`
        ],
        Actions: [
            {
                Dice: ["might","character"],
                Damage: 1
            }
        ],
        Image: `42.png`
    },
    {//42
        Text: [
            `<p><i>Существо, сшитое из нескольких частей мёртвых животных, бежит к вам. Оно так отвратительно, что вы инстинктивно отшатываетесь.</i></p>`,
            `<p><b><i>Сражение началось...</i></b> но ты можешь сделать одну атаку
            до первого раунда, не получая урона.</p>`,
            `<p><b>Особенности боя:</b> в первый раз, когда это существо побеждено, бросьте кубик главы перед тем как взять карту предмета. Если выпала сила – оно регенерирует, вы должны победить его во второй раз.</p>`
        ],
        Actions: [
            {
                Dice: ["wisdom","character"],
                Damage: 1
            }
        ],
        Image: `43.png`
    },
    {//43
        Text: [
            `<p><i>Слышен оглушительный рев, и коридор начинает трясти. Часть старой стены рядом с тобой рушится, ты погребён под кусками тяжёлого камня.</i></p>`,
            `<p><b>Ты</b> обездвижен. Чтобы убрать завалившие тебя обломки, другие игроки должны одновременно кидать кубики, пока не выбросят суммарную <b>силу, равную числу игроков</b>. За каждую проваленную попытку ты теряешь по <b>1 ОЗ</b>.</p>`,
            `<p>Если тебя не спасли после трёх попыток, то тебе удаётся выползти из-под завалов и продолжить свой путь.</p>`
        ],
        Image: `44.png`
    },
    {//44
        Text: [
            `<p><i>Чудовищная крылатая тварь налетает на тебя из темноты потолка. Её охотничий рык оглушает.</i></p>`,
            `<p><b>Ты</b> должен выбросить <b>ловкость</b> или дубль за одну попытку...</p>`,
            `<p><b>Успех:</b> ты быстро реагируешь и отпрыгиваешь. <b><i>Сражение началось...</i></b></p>`,
            `<p><b>Провал:</b> её когти режут твоё плечо и ты теряешь <b>2 ОЗ</b>.</p>`,
            `<p><b><i>Сражение началось...</i></b></p>`,
            `<p><b>Особенности боя:</b> после того, как игрок получит урон от
            этой твари, он не сможет блокировать.</p>`
        ],
        Actions: [
            {
                Dice: ["cunning","wisdom","character"],
                Damage: 1
            }
        ],
        Image: `45.png`
    }
];

BossCards = [
    {
        Name: `Безумная жрица`,
        Text: [
            `<p><i>«Вы не сможете мне навредить.<br>Узрите преданность моих последователей!»</i></p>`,
            `<p>Жрицу защищают одержимые прислужники (ряд кубиков главы с <b>силой</b>). Вы должны убрать эти кубики прежде, чем атаковать саму жрицу (кубики во втором ряду, над кубиками с <b>силой</b>).<br><b>Сражение началось...</b></p>`
        ],
        Actions: [
            {
                Dice: ["character","wisdom","might","might","might"],
                Damage: 3
            }
        ],
        Image: `b1.png`
    },
    {
        Name: `Ужас преисподней`,
        Text: [
            `<p><i>«Боль лишь делает меня сильнее!»</i></p>`,
            `<p>В конце каждого раунда, если Ужас преисподней не побеждён, он становится сильнее – бросьте кубик главы и добавьте его в ряд оставшихся кубиков.<br><b>Сражение началось...</b></p>`
        ],
        Actions: [
            {
                Dice: ["might","cunning","cunning","cunning","character"],
                Damage: 3
            }
        ],
        Image: `b2.png`
    },
    {
        Name: `Темнейший`,
        Text: [
            `<p><i>«Твои жалкие безделушки ничто против моей тёмной магии!»</i></p>`,
            `<p>Когда ты приближаешься к Темнейшему, все предметы, которые ты переносишь, испаряются. <b>Немедленно сбрось их.</b><br><b>Сражение началось...</b></p>`
        ],
        Actions: [
            {
                Dice: ["cunning","wisdom","wisdom","wisdom","character"],
                Damage: 3
            }
        ],
        Image: `b3.png`
    },
]

ItemsCards = [
    {
        Name: `ЧАСТИЧНО ГНИЛОЕ ЯБЛОКО`,
        Type: `еда`,
        Image: `1.png`,
        Text: `<b>Сбрось</b>, чтобы восстановить <b>1 ОЗ</b> своему персонажу.`,
        Count: 6
    },
    {
        Name: `ЧЁРСТВЫЙ ХЛЕБ`,
        Type: `еда`,
        Image: `2.png`,
        Text: `<b>Сбрось</b>, чтобы восстановить <b>2 ОЗ</b> своему персонажу.`,
        Count: 3
    },
    {
        Name: `ЗАПЛЕСНЕВЕЛОЕ СЫРНОЕ КОЛЕСО`,
        Type: `еда`,
        Image: `3.png`,
        Text: `<b>Сбрось</b>, чтобы восстановить <b>1 ОЗ</b> всем персонажам.`,
        Count: 3
    },
    {
        Name: `ГНИЛОЙ ЩИТ`,
        Type: `доспехи`,
        Image: `4.png`,
        Text: `Когда получаешь урон, уменьшай его сумму на 1 (минимум до 1).`,
        Count: 2
    },
    {
        Name: `НАЛИВКА СИЛЫ`,
        Type: `зелье`,
        Image: `5.png`,
        Text: `<b>Сбрось</b> в любой момент, чтобы получить <b>одну силу</b>.`,
        Count: 1 
    },
    {
        Name: `БУРДА ЛОВКОСТИ`,
        Type: `зелье`,
        Image: `6.png`,
        Text: `<b>Сбрось</b> в любой момент, чтобы получить <b>одну ловкость</b>.`,
        Count: 1 
    },
    {
        Name: `КОНЦЕНТРАТ РАЗУМА`,
        Type: `зелье`,
        Image: `7.png`,
        Text: `<b>Сбрось</b> в любой момент, чтобы получить <b>1 разум</b>.`,
        Count: 1 
    },
    {
        Name: `ШИПУЧКА УКЛОНЕНИЯ`,
        Type: `зелье`,
        Image: `8.png`,
        Text: `Когда ты должен получить урон, <b>сбрось</b> эту карту, чтобы увернуться.`,
        Count: 4 
    },
    {
        Name: `ЭЛИКСИР ПРОЗРЕНИЯ`,
        Type: `зелье`,
        Image: `9.png`,
        Text: `<b>Сбрось</b> перед любым раундом боя, чтобы поставить 1 кубик главы на любую грань.`,
        Count: 3 
    },
    {
        Name: `ТОНИК УДАЧИ`,
        Type: `зелье`,
        Image: `10.png`,
        Text: `<b>Сбрось</b> чтобы перебросить кубик своего персонажа, примени второй бросок.`,
        Count: 5 
    },
    {
        Name: `РУНА ЧИСТОТЫ`,
        Type: `реликвия`,
        Image: `11.png`,
        Text: `Когда выбрасываешь <b>дубль</b> , можешь сменить символ на <b>любой одинарный</b>.`,
        Count: 1 
    },
    {
        Name: `ОСКОЛОК ЯРОСТИ`,
        Type: `реликвия`,
        Image: `12.png`,
        Text: `Когда выбрасываешь <b>дубль</b> в сражении, можешь бросить кубик второй раз. Примени оба результата.`,
        Count: 1 
    },
    {
        Name: `ЦЕЛЕБНЫЕ СТИХИ`,
        Type: `реликвия`,
        Image: `13.png`,
        Text: `Когда выбрасываешь <b>дубль</b>, можешь восстановить <b>1 ОЗ</b> любому персонажу.`,
        Count: 1 
    },
    // {
    //     Name: `ДУБЛИРУЮЩИЕ КАМНИ`,
    //     Type: `реликвия`,
    //     Image: `14.png`,
    //     Text: `Когда выбрасываешь <b>один символ</b>, считай его <b>двумя</b> символами того же умения.`,
    //     Count: 1 
    // },
    // {
    //     Name: `ТРЕСНУВШИЙ ТОПОР`,
    //     Type: `оружие, двуручное`,
    //     Image: `15.png`,
    //     Text: `При каждой атаке в сражении, бросай кубик главы вместе с кубиком персонажа. Примени оба результата.`,
    //     Count: 1 
    // },
    {
        Name: `ВЕТХИЙ КЛИНОК`,
        Type: `оружие, одноручное`,
        Image: `16.png`,
        Text: `1 раз за раунд сражения, когда выпадает <b>разум</b>, можешь бросить кубик снова и выбрать 1 из бросков.`,
        Count: 1 
    },
    {
        Name: `РЖАВЫЙ ЦЕП`,
        Type: `оружие, одноручное`,
        Image: `17.png`,
        Text: `1 раз за раунд сражения, когда выпадает <b>ловкость</b>, можешь бросить кубик снова и выбрать 1 из бросков.`,
        Count: 1 
    },
    {
        Name: `ПОГНУТАЯ ПАЛИЦА`,
        Type: `оружие, одноручное`,
        Image: `18.png`,
        Text: `1 раз за раунд сражения, когда выпадает <b>сила</b>, можешь бросить кубик снова и выбрать 1 из бросков.`,
        Count: 1 
    }
    // {
    //     Name: `ЗОЛОТОЙ ТОПОР`,
    //     Type: `реликвия, оружие, двуручное`,
    //     Image: `19.png`,
    //     Text: `В сражении брось кубик Золотого топора вместе с кубиком персонажа:
    //     <b>[топор]</b>: Убери любой кубик главы.
    //     <b>[череп]</b>: Теряешь <b>1 ОЗ</b> и <b>сбрось</b> Золотой топор.`,
    //     Count: 1 
    // }
]