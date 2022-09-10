var ChapterCards = [];
var ChapterDice = ["might", "might", "cunning", "cunning", "wisdom", "wisdom"];
var Abbot, Tailor, Smith, Tanner, Miller, Cook;
var CharacterDice = [Abbot, Cook, Miller, Smith, Tailor, Tanner];
Abbot = ["might", "wisdom", "might+might", "wisdom+wisdom", "wisdom", "cunning"];
Cook = ["wisdom", "might", "cunning+cunning", "might+might", "might", "cunning"];
Miller = ["wisdom", "cunning", "might+might", "cunning+cunning", "cunning", "might"];
Smith = ["wisdom", "might", "might+might", "wisdom+wisdom", "might", "cunning"];
Tailor = ["wisdom", "cunning", "cunning+cunning", "wisdom+wisdom", "cunning", "might"];
Tanner = ["might", "wisdom", "cunning+cunning", "wisdom+wisdom", "wisdom", "cunning"];
var StartCard;
var BossCards = [1, 2, 3];
var ItemCards = [];

// Епископ ("might", "wisdom", разум*2, разум*2, "wisdom", ловка)
// Каменщик ("wisdom", "might", сила*2, сила*2, "might", ловка)
// Охотница ("wisdom", "cunning", ловка*2, ловка*2, "cunning", сила)

// Ведьма (магия, "might", "wisdom", "cunning", "might", сила*2)
// Дух (разум*2, "wisdom", "might", "cunning", "wisdom", магия)
// Охранник ( ловка*2, "cunning", "wisdom", "might", "cunning", магия)

// Мясник ("cunning", "might", сила/"wisdom", сила/"cunning", "might", разум)
// Оружейница ("might", "cunning", сила/"cunning", сила/"wisdom", "cunning", разум)
// Пастушка ("cunning", "wisdom", разум/"cunning", сила/"wisdom", "wisdom", сила)

ChapterCards = [
    {
        Text: [
            `<p><i>Со вскриком ты спотыкаешься о растяжку, а сверху льётся поток кислоты.</i></p>`,
            `<p>Все игроки должны выбросить <b>ловкость</b> за одну попытку.</p>
            <p>Для каждого игрока...</p>
            <p><b>Успех:</b> ты уклоняешься от ловушки.</p>
            <p><b>Провал:</b> кислотные брызги шипят и дымятся, растворяя переносимый тобою предмет. <b><i>Сбрось один предмет.</i></b> Если предметов два, перетасуй их рубашкой вверх и <b><i>сбрось один вслепую</i></b>. Если у тебя нет предметов, теряешь <b>1 ОЗ</b>, потому что кислота прожигает твою плоть.</p>`
        ],
        Image:`1.png`
    },
    {
        Text: [
            `<p><i>Вы наткнулись на недавно покинутую комнату охраны. Котелок с кипящим супом стоит на плите, а огонь всё ещё тлеет в камине. Вы слышите сердитые голоса и звук приближающихся к вам шагов. Вы хватайте всё, что можете, прежде чем ускользнуть в темноту коридоров.</i></p>`,
            `<p><b>Возьмите карту предмета.</b></p>`
        ],
        Image:`2.png`
    },
    {
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
        Image:`3.png`
    },
    {
        Text: [
            `<p><i>Стрела, летящая из тьмы коридора, свистит мимо уха. Прежде чем ты успеваешь среагировать, другая впивается в плечо, и ты в агонии сползаешь по стене.</i></p>`,
            `<p><b>Ты</b> теряешь <b>2 ОЗ</b>.</p>`,
            `<p><i>Осторожно проползая по коридору, ты находишь тело человека, нашпигованное стрелами. Нападавших и след простыл, так что можно проверить, нет ли у него что-нибудь ценного.</i></p>`,
            `<p><b>Возьмите карту предмета.</b></p>`
        ],
        Image:`4.png`
    }
]