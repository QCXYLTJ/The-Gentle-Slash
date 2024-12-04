/*                                                                                                           
            QQQQQQQQQQQQQQQQ                                    QQQQQQQQQQQQQQQQ                                    QQQQQQQQQQQQQQQQ                        
          QQ::::::::::::::::QQ                                QQ::::::::::::::::QQ                                QQ::::::::::::::::QQ                      
        QQ:::::::::::::::::::::QQ                           QQ:::::::::::::::::::::QQ                           QQ:::::::::::::::::::::QQ                   
      QQ:::::::QQQQQQQQQQQ::::::::Q                       QQ:::::::QQQQQQQQQQQ::::::::Q                       QQ:::::::QQQQQQQQQQQ::::::::Q                 
    QQ::::::QQQ           QQ::::::::Q                   QQ::::::QQQ           QQ::::::::Q                   QQ::::::QQQ           QQ::::::::Q               
   Q:::::::QQ               QQ:::::::Q                 Q:::::::QQ               QQ:::::::Q                 Q:::::::QQ               QQ:::::::Q              
  Q::::::QQ                  QQ:::::::Q               Q::::::QQ                  QQ:::::::Q               Q::::::QQ                  QQ:::::::Q             
 Q::::::QQ                    QQ:::::::Q             Q::::::QQ                    QQ:::::::Q             Q::::::QQ                    QQ:::::::Q            
 Q::::::QQ                    QQ:::::::Q             Q::::::QQ                    QQ:::::::Q             Q::::::QQ                    QQ:::::::Q            
 Q::::::QQ                    QQ:::::::Q             Q::::::QQ                    QQ:::::::Q             Q::::::QQ                    QQ:::::::Q            
 Q:::::::QQ                   QQ:::::::Q             Q:::::::QQ                   QQ:::::::Q             Q:::::::QQ                   QQ:::::::Q            
  Q:::::::QQ  QQQQQQQQQQQ    QQ:::::::Q               Q:::::::QQ  QQQQQQQQQQQ    QQ:::::::Q               Q:::::::QQ  QQQQQQQQQQ     QQ:::::::Q             
   Q::::::::QQQQQ:::::::QQQQQ::::::::Q                 Q::::::::QQQQQ:::::::QQQQQ::::::::Q                 Q::::::::QQQQQ:::::::QQQQQ::::::::Q              
    QQ:::::::::::::::::::::::::::::Q                    QQ:::::::::::::::::::::::::::::Q                    QQ:::::::::::::::::::::::::::::Q                
      QQ::::::::::::::::::::QQQQQQ                        QQ::::::::::::::::::::QQQQQQ                        QQ::::::::::::::::::::QQQQQQ                  
        QQQQQQQQ:::::::::QQ                                 QQQQQQQQ:::::::::QQ                                 QQQQQQQQ:::::::::QQ                         
                  Q:::::::Q                                           Q:::::::Q                                           Q:::::::Q                         
                   QQQQQQQQQ                                           QQQQQQQQQ                                           QQQQQQQQQ                        
*/

//-------------------------------------------------------备忘录0
/*
return (player.stat[player.stat.length - 1].skill.ybhzy_yaxiang || 0) < (player.storage.counttrigger && player.storage.counttrigger.ybhzy_xiasi || 0);//storage.counttrigger可以不存在
主动技async有event.targets和event.target,没有event.card,如果不选牌的话,event.cards是空数组.不加multitarget的话,每个目标执行一次content
usecard时机gain trigger.card是没有用的,因为那是vcard,没有event.target,只有event.targets
result.cancelled是拼点未完成
不能在lib.updetes中检索是game.update输入了空参数


*/
//-------------------------------------------------------备忘录1
/*
disableskill删掉onremove里面的storage,某些技能通过init来添加标记就因为有技能而不能添加,然后没标记报错


async content 有event.targets、event.target、event.cards,没有event.card

damageBefore加伤
damageBegin转属性
damageBegin4减伤害


如果chooseusetarget使用卡牌,卡牌的selecttaget参数都是undefined
changeboss\((.+),.+\)
changeboss($1)
while卡死,
换图片路径之后除了卡牌包、武将包以及技能语音路径要修改,可能有其他直接写路径的调用,可能遗漏

*/
//------------------------------------------------先查询是否最新版
//------------------------------------------------解混淆
//------------------------------------------------脚本替换
//-------------------------------------------------------正则替换
//forced: true,\n\s*forced: true,
//.i
//for (var i =
//[,//, ,//,]//,)
//cards.splice//i.discard()

//game.zmmp46('$1');
//game\[otherFunction\[6\]\]\(game.zzm1Gif\('(.+).gif', null, null, true\), .+\);
//game\[otherFunction\[.+\]\]\(game.+\('(.+).gif', null, null, true\), .+\);
//audio:\s*\[\s*["'][^"']*["'],\s*(\d+)\s*\],//audio:\s*\[["'][^"']*["']\],
//lib\.element\.Player.+= fun//   get\..+= fun//game\..+= fun
//\s\sconsole\.log\(.+\);
//game\.delay\(([^;]*;[^;]*)\)
//\s\s\sgame\.delay\(.*\);
//game\.delayx\(([^;]*;[^;]*)\)
//\s\s\sgame\.delayx\(.*\);
//player\.logSkill\(([^;]*;[^;]*)\)
//\s\s\splayer\.logSkill\(.*\);
//\n\s*\n//温柔一刀/**/*
//$1:   //[\t\s][\t\s]["']([^"'--+・•★《?？①②③☆~♂♀、✴️:#&＆..=!…</<\d\s]+)["']\s*:
//.$1   //(?<![\s:,[(=])\[["']([^·\.'" --+\d]*)["']\]
//content:\s*function\s*\((?!storage\b).+\)
//\s\sevent.name = //getdefaulthandertype函数报错eventname[0].touppercase没有eventname[0],是因为技能修改了event.name

//\[['`]([^'`]*)['`]\s*\+\s*([^,+\[\]]*)\]//[`$1${$2}`]//先换括号里面的
//\[([^,+\[\]]*)\s*\+\s*['`]([^'`]*)['`]\]//[`${$1}$2`]//先换括号里面的
//\[["`]([^"`]*)["`]\s*\+\s*([^,+\[\]]*)\]//[`$1${$2}`]//先换括号里面的
//\[([^,+\[\]]*)\s*\+\s*["`]([^"`]*)["`]\]//[`${$1}$2`]//先换括号里面的

//`$1${$2}$3`
//['`]([^'`]*)['`]\s*\+\s*([^+'`]*)\s*\+\s*['`]([^'`]*)['`]//再换字符串+变量+字符串
//["`]([^"`]*)["`]\s*\+\s*([^+"`]*)\s*\+\s*["`]([^"`]*)["`]
//["'`]([^"'`]*)["'`]\s*\+\s*([^+"'`]*)\s*\+\s*["'`]([^"'`]*)["'`]

//PlayerCard\(.+set\('ai', function \(card\)//PlayerCard\(.+\n\s*\.set\('ai', function \(card\)
//event.result.cards = []//delete event.result.skill




//.useCard(result.links[0][2])==>.useCard(result.links[0])
//.useCard({ name: result.links[0] })==>.useCard({ name: result.links[0][2] })
//countCards\(['"](?!(h|he|e|j|ej|hej|hs|x|s|hes|hse)['"])[^'"]*['"]\)
//event.getParent(2).filterCard
//backup里面的onuse:
//choosebutton选了视为牌又没有可以用的牌卡死, 滕芳兰选了选项有没有有收益的目标, 返回上一步, 卡死
//转化牌不填position会导致报错lib.element.content[undefined], 不加check、filter导致没有可以选的牌无限循环
//if (lib.device || lib.node) 
//filter: function (event)//filter: function ()//filter: function (event, player)
// = game.addPlayer//gain事件找不到owner.lose就是因为加的随从没有getId
//杀掉莫名其妙加在武将牌上的技能//删除覆盖本体函数
//while (true)
//countDiscardableCards('//countgainableCards('
//lib.filter.characterDisabled = 
//game.notMe//game.swapcontrol//ui.click.auto();
//lib.character[i][4].indexOf(//lib.character[i][4].push
// audio: "ext:耀武将:false",
//set: ()//set()
//ai2: get.eff
//file:///storage/emulated/0/Android/data/yuri.nakamura.noname_android/
//file:///storage/emulated/0/Android/data/com.//noname.shijian/
//" + lib.assetURL + "
//if (evt)//_status.event = evt//导致卡死//_status.event = _status.event.parent;
/* 
_status.event.getParent('phaseLoop

var evt = _status.event.getParent('phaseUse');
if (evt && evt.name == 'phaseUse') {
    evt.skipped = true;
}
var evt = _status.event.getParent('phase');
if (evt && evt.name == 'phase') {
    evt.finish();
} 
*/



//return { name: 
//.hasCard('h//
//files: { //forumURL://, content://config: { "//diskURL://help: {}//list: [//closeable: true,
//window.prompt(//   prompt(
//.set("ai", //.set('ai', 
//.set('ai', function (target,//.set('ai', function (card,//.set('ai', function (player,//.set('ai', function (event,
//Object.setPrototypeOf(next, lib.element.Button.prototype);//QQQ
//Object.setPrototypeOf(dialog, (lib.element.Dialog || Dialog).prototype);//QQQ
//BUTTONVALUE(button.link)
//decadeui//十周年UI//decade_//tenui
// = function (all) {// = () => ({})
//selectTarget: function () {返回数组而不是数字
//.canAddJudge(//输入字符串导致checkmod报错
//return 8.5 - get.equipValue(card, player) / 20;    //value = get.value(current, player);
//button.link[0][2]是字符button.link[0]才是字符串//backup内的check参数是card//backup外的check参数是button
//function _//version_//encode//atob//';\x20'//\x
//lib.config.compatiblemod
//get.attackRange
//event.logged
//switch (get.name(cards[0]
//lib.nature.
//lib.skill[i].group || []
//player.name == //全局不杀//音效图片不杀
//damage(trigger.num)._triggered = null//damage()._triggered = null//trigger._triggered = null
//lutou//qhly
import {
    menuContainer,
    popupContainer,
    updateActive,
    setUpdateActive,
    updateActiveCard,
    setUpdateActiveCard,
    menux,
    menuxpages,
    menuUpdates,
    openMenu,
    clickToggle,
    clickSwitcher,
    clickContainer,
    clickMenuItem,
    createMenu,
    createConfig,
} from '../../noname/ui/create/menu/index.js';//UI.create.cardPackMenu相关参数
import { lib, game, ui, get, ai, _status } from '../../noname.js'
import { character } from './character.js'
//game.saveConfig('mode', 'boss');
export async function precontent(config, pack) {
    //game.saveConfig('extension_温柔一刀_技能拦截', false);
    window.QQQ = {
        content: [],
        global: {},
        logskill: {},
        logskill1: {},
        logskill2: {},
        num: 0,
        num1: 0,
        num2: 0,
        num3: 0,
        num4: 0,
        num5: 0,
        value: [],//除装备之外的正收益牌
        unvalue: [],//除装备之外的负收益牌
        value0: [],//除装备之外的0收益牌
        kong: {
            set() {
                return this;
            },
            get player() {
                return game.me;
            },//先声明后赋值的,后面调用会是underfined,所以用getter实时获取
            cards: [],
            result: {
                cards: [],
            },
            gaintag: [],
        },
        DEEP: function (path) {
            const [top, ...deep] = path.split('.');
            var Q = window[top];
            for (const i of deep) {
                if (Q && Q[i] && typeof Q[i] === 'object') {
                    Q = Q[i];
                }
                else {
                    console.log(Q, i, '不是对象');
                    return false;
                }
            }
            return true;
        },
        clickToggle: function () {
            if (this.classList.contains("disabled")) return;
            this.classList.toggle("on");
            var config = this._link.config;
            if (config.onclick) {
                if (config.onclick.call(this, this.classList.contains("on")) === false) {
                    this.classList.toggle("on");
                }
            }
            if (config.update) {
                config.update();
            }
        },
        createConfig: function (config) {
            const node = document.createElement('div');
            node.className = 'configQ';
            node.innerHTML = config.name;
            node._link = { config: config };
            if (!config.intro) {
                config.intro = "设置" + config.name;
            }
            lib.setIntro(node, function (uiintro) {
                if (lib.config.touchscreen) _status.dragged = true;
                uiintro.style.width = "170px";
                var str = config.intro;
                if (typeof str == "function") {
                    str = str();
                }
                uiintro._place_text = uiintro.add(
                    '<div class="text" style="display:inline">' + str + "</div>"
                );
            });
            const toggle = document.createElement('div');
            toggle.className = 'toggleQ';
            node.listen(QQQ.clickToggle);
            if (config.init == true) {
                node.classList.add("on");
            }
            node.appendChild(toggle);
            return node;
        },
    };
    lib.number = [];
    for (var i = 1; i < 14; i++) {
        lib.number.push(i);
    }//添加lib.number
    Reflect.defineProperty(Array.prototype, 'clear', {
        configurable: true,
        enumerable: false,
        writable: true,
        value: function () {
            return [];
        },
    });//给所有数组添加一个方法
    Array.prototype.contains = Array.prototype.includes;//给所有数组修改includes方法









    if (true) {
        lib.skill._测试4 = {
            trigger: {
                global: [
                    //'chooseCharacterBegin',
                    //'useCardAfter'
                    //'gameStart'
                    //'logSkillBegin'
                ],
                player: [
                    //'useCardToBegin'
                    //'useCardAfter'
                    'phaseBegin'
                    //'dieBegin'    
                    //'changeHpBefore'
                ],
            },
            silent: true,
            filter: (event, player) => {
                // console.log(player.actionHistory);
                // console.log(event.target, event.targets, 'useCardToBegin');
                //console.log(Array.from(lib.nature.keys()));
                //console.log(event);
                return lib.config.extension_温柔一刀_报错 && player == game.me;
                //return true;
            },
            async content(event, trigger, player) {
                // var num = 20;
                // var evt = _status.event;
                // while (num-- > 0) {
                //     console.log(evt.name);
                //     evt = evt.parent;
                // }


                //Array.from(ui.cardPile.childNodes).some((q) => q.name == 'changshezhen')

                //throw new Error();
                // for (var i of player.skills) {
                //     if (lib.skill[i].forced) {
                //         delete lib.skill[i].forced;
                //     }
                // }
                // const card1 = game.createCard('盘古斧', 'spade');
                // card1.cardtags = ['gifts'];
                // player.equip(card1, 'gain2');
                const card = game.createCard('zhuge', 'spade');
                //card.cardtags = ['gifts'];
                player.gain(card, 'gain2');

                // const card2 = game.createCard('QQQ_shibao', 'spade');
                // //card2.cardtags = ['gifts'];
                // player.gain(card2, 'gain2');

                /*
                player.gain(game.createCard('fudichouxin'), 'gain2');
                player.node.handcards1.appendChild(game.createCard('轩辕剑'));


                var num = 1;
                let evt = trigger;
                console.log(trigger.skill);
                while (num++ < 9 && evt) {
                    console.log(evt.name);
                    evt = evt.parent;
                }

                player.addSkill('qianxing');

                player.delete();

                player.classList.add('removing');
                player.classList.add("hidden");

                player.gain(trigger.cards);

                setInterval(() => {
                    console.log(player.stat[player.stat.length - 1].skill, 'stat');
                }, 2000);
                setInterval(() => {
                    console.log(player.storage.counttrigger, 'counttrigger');
                }, 2000);

                trigger.cancel();

                player.next.damage('blood');

                console.log(get.itemtype({ name: 'sha' }) + 'itemtype');

                player.addJudge({ name: 'zmtianlei' }, ui.cardPile.firstChild);

                var next = player.lose(player.getCards('h'), ui.discardPile);
                next.type = 'discard';
                next.animate = false;
                next.delay = false;
                next.getlx = false;

                var evt = _status.event.getParent('phaseUse');
                if (evt && evt.name == 'phaseUse') {
                    evt.skipped = true;
                }

                throw new Error();

                await player.chooseUseTarget({ name: 'bxyr_duyunliangcao' }, true);
                
                var num = 1;
                while (num++ < 9) {
                    console.log(get.value(Array.from(ui.cardPile.childNodes)[num]));
                }
                */
            },
            _priority: 19,
        };//测试
    }//测试









    lib.init.css(lib.assetURL + 'extension/温柔一刀/QQQ.css');
    if (lib.config.extension_温柔一刀_界面修改) {
        lib.init.css(lib.assetURL + 'extension/温柔一刀/QQ.css');
        {
            if (!(_status.maximumNumberOfPlayers > 16)) _status.maximumNumberOfPlayers = 16;
            lib.translate.unknown8 = '九号位';
            lib.translate.unknown9 = '十号位';
            lib.translate.unknown10 = '十一号位';
            lib.translate.unknown11 = '十二号位';
            lib.translate.unknown12 = '十三号位';
            lib.translate.unknown13 = '十四号位';
            lib.translate.unknown14 = '十五号位';
            lib.translate.unknown15 = '十六号位';
            lib.arenaReady.push(function () {
                if ((get.mode() == 'identity') || (get.mode() == 'guozhan')) {
                    if (lib.device && get.config('player_number') > 8) {
                        var zoom = function (num) {
                            var zoom = num;
                            game.documentZoom = game.deviceZoom * zoom;
                            document.documentElement.style.zoom = game.documentZoom;
                        };
                        if (config.upgrade_Appearence != 'default') {
                            var dx = config.upgrade_Appearence * 0.05 + 0.45;
                            zoom(dx);
                        }
                        else {
                            zoom(0.97);
                        }
                        ui.updatez();
                    }
                    ui.arenalog.style.top = '240px';
                    ui.arenalog.style.height = '35%';
                }
                //—————————————————————————//	
            });
            for (var i = 9; i < 17; i++) {
                var Q = document.createElement('style');
                Q.innerHTML = ``;
                for (var j = 1; j < i; j++) {
                    if (j < (i / 4)) {
                        Q.innerHTML += `#arena[data-number='${i}']>.player[data-position='${j}']{
							top:calc(${(85 - (200 / i) * j + ((24 * j) / i) - 6) * 0.9}%)!important;
							left:calc(${45 + (200 / i) * j}%)!important;
							transform: scale(${Math.max(0.55, 1 - i / 70)})!important;
							}`;
                    }
                    if (j == (i / 4)) {
                        Q.innerHTML += `#arena[data-number='${i}']>.player[data-position='${j}']{
							top:calc(${(85 - (200 / i) * j) * 0.9}%)!important;
							left:calc(${42 + (200 / i) * j}%)!important;
							transform: scale(${Math.max(0.55, 1 - i / 70)})!important;
							}`;
                    }
                    if ((i / 4) < j && j < (i / 2)) {
                        Q.innerHTML += `#arena[data-number='${i}']>.player[data-position='${j}']{
								top:calc(${(85 - (200 / i) * j) * 0.9}%)!important;
								left:calc(${145 - (200 / i) * j}%)!important;
								transform: scale(${Math.max(0.55, 1 - i / 70)})!important;
								}`;
                    }
                    if (j == (i / 2)) {
                        Q.innerHTML += `#arena[data-number='${i}']>.player[data-position='${j}']{
								top:calc(${((200 / i) * j - 105) * 0.9}%)!important;
								left:calc(${145 - (200 / i) * j}%)!important;
								transform: scale(${Math.max(0.55, 1 - i / 70)})!important;
								}`;
                    }
                    if ((i / 2) < j && j < ((3 * i) / 4)) {
                        Q.innerHTML += `#arena[data-number='${i}']>.player[data-position='${j}']{
								top:calc(${((200 / i) * j - 115) * 0.9}%)!important;
								left:calc(${145 - (200 / i) * j}%)!important;
								transform: scale(${Math.max(0.55, 1 - i / 70)})!important;
								}`;
                    }
                    if (j == ((3 * i) / 4)) {
                        Q.innerHTML += `#arena[data-number='${i}']>.player[data-position='${j}']{
								top:calc(${((200 / i) * j - 115) * 0.9}%)!important;
								left:calc(${146 - (200 / i) * j}%)!important;
								transform: scale(${Math.max(0.55, 1 - i / 70)})!important;
								}`;
                    }
                    if (((3 * i) / 4) < j) {
                        Q.innerHTML += `#arena[data-number='${i}']>.player[data-position='${j}']{
							top:calc(${((200 / i) * j - 115 - ((24 * j) / i) + 18) * 0.9}%)!important;
							left:calc(${-155 + (200 / i) * j}%)!important;
							transform: scale(${Math.max(0.55, 1 - i / 70)})!important;
							}`;
                    }
                }
                document.head.appendChild(Q);
            }
            var list = [];
            var num = get.config('player_number');
            var fan = Math.floor(num / 2);
            var nei = [1, 2, 3].randomGet();
            var zhong = num - 1 - fan - nei;
            list.push('zhu');
            for (var i = 0; i < zhong; i++) {
                list.push('zhong');
            }
            for (var i = 0; i < nei; i++) {
                list.push('nei');
            }
            for (var i = 0; i < fan; i++) {
                list.push('fan');
            }
            lib.config.mode_config.identity.identity.push(list);
        }//多人场适配
    }//多人场适配//拉长立绘//移动标记
    if (lib.config.extension_温柔一刀_神武再世) {
        game.loadModeAsync('boss', function (mode) {
            for (var i in mode.translate) {
                lib.translate[i] = lib.translate[i] || mode.translate[i];
            }
            for (var i in mode.skill) {
                if (!lib.skill[i]) {
                    lib.skill[i] = mode.skill[i];
                }//QQQ
                game.finishSkill(i);
            }
            for (var i in mode.card) {
                lib.card[i] = lib.card[i] || mode.card[i];
                lib.card.list.push([lib.suits.randomGet(), lib.number.randomGet(), i]);
                lib.inpile.add(i);
            }
            game.finishCards();
            for (var i in mode.characterPack.mode_boss) {
                lib.character[i] = lib.character[i] || mode.characterPack.mode_boss[i];
            }
        });//挑战模式
        game.loadModeAsync("versus", function (mode) {
            for (var i in mode.translate) {
                lib.translate[i] = lib.translate[i] || mode.translate[i];
            }
            for (var i in mode.skill) {
                if (!lib.skill[i]) {
                    lib.skill[i] = mode.skill[i];
                }//QQQ
                game.finishSkill(i);
            }
            for (var i in mode.card) {
                lib.card[i] = lib.card[i] || mode.card[i];
                lib.card.list.push([lib.suits.randomGet(), lib.number.randomGet(), i]);
                lib.inpile.add(i);
            }
            game.finishCards();
            for (var i in mode.jiangeboss) {
                lib.character[i] = lib.character[i] || mode.jiangeboss[i];
            }
        });//对决模式
    }//添加boss模式专属卡牌技能
    if (lib.config.extension_温柔一刀_文字闪烁) {
        var style = document.createElement('style');
        style.innerHTML = '@keyframes QQQ{';
        for (var i = 1; i <= 20; i++) {
            let rand1 = Math.floor(Math.random() * 255),
                rand2 = Math.floor(Math.random() * 255),
                rand3 = Math.floor(Math.random() * 255);
            style.innerHTML += (i * 5) + `%{text-shadow: black 0 0 1px,rgba(${rand1}, ${rand2}, ${rand3}, 0.6) 0 0 2px,rgba(${rand1}, ${rand2}, ${rand3}, 0.6) 0 0 5px,rgba(${rand1}, ${rand2}, ${rand3}, 0.6) 0 0 10px,rgba(${rand1}, ${rand2}, ${rand3}, 0.6) 0 0 10px,rgba(${rand1}, ${rand2}, ${rand3}, 0.6) 0 0 20px,rgba(${rand1}, ${rand2}, ${rand3}, 0.6) 0 0 20px}`;
        }
        style.innerHTML += '}';
        document.head.appendChild(style);
    }//文字闪烁效果
    lib.arenaReady.push(function () {
        lib.config.all.characters.add('温柔一刀');
        if (!lib.config.extension_温柔一刀_BOSS) {
            for (var i in lib.character) {
                lib.character[i].isBoss = false;
            }//BOSS
        }
        if (lib.config.extension_温柔一刀_武将全开) {
            //lib.config.characters = [];//重置一次
            for (var i in lib.character) {
                lib.character[i].isAiForbidden = false;//AI禁用
                lib.character[i].isUnseen = false;//隐藏
            }
            for (var i of lib.config.extensions) {
                game.saveConfig(`extension_${i}_characters_enable`, true);//扩展武将全部打开
            }
            for (var i in lib.characterPack) {
                if (!lib.config.characters.includes(i)) {
                    lib.config.characters.push(i);
                }//扩展武将全部添加
                lib.connectCharacterPack.add(i);//扩展武将联机
            }//全开武将包
            // lib.config.all.characters = lib.config.characters;
            // game.saveConfig('all', lib.config.all);
            game.saveConfig('banned', []);//禁将
            game.saveConfig('forbidai_user', []);//仅点将可用
            game.saveConfig('forbidai', []);
            for (var i of lib.config.all.mode) {
                game.saveConfig(`${i}_banned`, []);//模式禁将
                game.saveConfig(`connect_${i}_banned`, []);//联机模式禁将
            }
            game.saveConfig('connect_characters', []);//联机禁将包,放进去的才是要禁的
            game.saveConfig('characters', lib.config.characters);
            game.saveConfig('defaultcharacters', lib.config.characters);
        }//扩展武将全部打开
        if (lib.config.extension_温柔一刀_卡牌全开) {
            game.saveConfig('bannedcards', []);
            for (var i of lib.config.all.mode) {
                game.saveConfig(`${i}_bannedcards`, []);
            }
            for (var i of lib.config.extensions) {
                game.saveConfig(`extension_${i}_cards_enable`, true);//扩展卡牌全部打开
            }
            for (var i in lib.cardPack) {
                if (!lib.config.cards.includes(i)) {
                    lib.config.cards.push(i);
                }//扩展卡牌全部添加
                lib.connectCardPack.add(i);//扩展卡牌联机
                if (lib.cardPackInfo[i]) {
                    lib.cardPackInfo[i].closeable = true;
                }//添加关闭卡牌按钮
            }
            game.saveConfig('cards', lib.config.cards);
            game.saveConfig('connect_cards', []);//联机禁将,放进去的才是要禁的
            game.saveConfig('defaultcards', lib.config.cards);
        }//扩展卡牌全部打开
        if (lib.config.extension_温柔一刀_联机禁官服将) {
            game.saveConfig('connect_characters', [
                "standard", "refresh", "shenhua", "yijiang", "sp", "onlyOL", "yingbian", "clan", "xinghuoliaoyuan", "huicui", "xianding", "sp2", "extra", "mobile", "shiji", "sb", "tw", "collab", "jsrg", "offline", "old", "diy", "ddd", "key", "yxs", "hearth", "gwent", "mtg", "ow", "swd", "gujian", "xianjian", 'sixiang', 'newjiang',
            ]);
            Reflect.defineProperty(game, 'chooseCharacterOL', {
                get: () => function () {
                    if (_status.mode == "purple") {
                        game.chooseCharacterPurpleOL();
                        return;
                    }
                    else if (_status.mode == "stratagem") {
                        game.chooseCharacterStratagemOL();
                        return;
                    }
                    var next = game.createEvent("chooseCharacter");
                    next.setContent(function () {
                        "step 0";
                        ui.arena.classList.add("choose-character");
                        var i;
                        var identityList;
                        if (_status.mode == "zhong") {
                            event.zhongmode = true;
                            identityList = ["zhu", "zhong", "mingzhong", "nei", "fan", "fan", "fan", "fan"];
                        }
                        else {
                            identityList = get.identityList(game.players.length);
                        }
                        identityList.randomSort();
                        for (i = 0; i < game.players.length; i++) {
                            game.players[i].identity = identityList[i];
                            game.players[i].setIdentity("cai");
                            game.players[i].node.identity.classList.add("guessing");
                            if (event.zhongmode) {
                                if (identityList[i] == "mingzhong") {
                                    game.zhu = game.players[i];
                                }
                                else if (identityList[i] == "zhu") {
                                    game.zhu2 = game.players[i];
                                }
                            }
                            else {
                                if (identityList[i] == "zhu") {
                                    game.zhu = game.players[i];
                                }
                            }
                            game.players[i].identityShown = false;
                        }
                        if (lib.configOL.special_identity && !event.zhongmode && game.players.length == 8) {
                            var map = {};
                            var zhongs = game.filterPlayer(function (current) {
                                return current.identity == "zhong";
                            });
                            var fans = game.filterPlayer(function (current) {
                                return current.identity == "fan";
                            });
                            if (fans.length >= 1) {
                                map.identity_zeishou = fans.randomRemove();
                            }
                            if (zhongs.length > 1) {
                                map.identity_dajiang = zhongs.randomRemove();
                                map.identity_junshi = zhongs.randomRemove();
                            }
                            else if (zhongs.length == 1) {
                                if (Math.random() < 0.5) {
                                    map.identity_dajiang = zhongs.randomRemove();
                                }
                                else {
                                    map.identity_junshi = zhongs.randomRemove();
                                }
                            }
                            game.broadcastAll(
                                function (zhu, map) {
                                    for (var i in map) {
                                        map[i].special_identity = i;
                                    }
                                },
                                game.zhu,
                                map
                            );
                            event.special_identity = map;
                        }

                        game.zhu.setIdentity();
                        game.zhu.identityShown = true;
                        game.zhu.isZhu = game.zhu.identity == "zhu";
                        game.zhu.node.identity.classList.remove("guessing");
                        game.me.setIdentity();
                        game.me.node.identity.classList.remove("guessing");
                        if (game.me.special_identity) {
                            game.me.node.identity.firstChild.innerHTML = get.translation(game.me.special_identity + "_bg");
                        }

                        for (var i = 0; i < game.players.length; i++) {
                            game.players[i].send(
                                function (zhu, zhuid, me, identity) {
                                    for (var i in lib.playerOL) {
                                        lib.playerOL[i].setIdentity("cai");
                                        lib.playerOL[i].node.identity.classList.add("guessing");
                                    }
                                    zhu.identityShown = true;
                                    zhu.identity = zhuid;
                                    if (zhuid == "zhu") zhu.isZhu = true;
                                    zhu.setIdentity();
                                    zhu.node.identity.classList.remove("guessing");
                                    me.setIdentity(identity);
                                    me.node.identity.classList.remove("guessing");
                                    if (me.special_identity) {
                                        me.node.identity.firstChild.innerHTML = get.translation(me.special_identity + "_bg");
                                    }
                                    ui.arena.classList.add("choose-character");
                                },
                                game.zhu,
                                game.zhu.identity,
                                game.players[i],
                                game.players[i].identity
                            );
                        }

                        var list;
                        var list2 = [];
                        var list3 = [];
                        var list4 = [];
                        event.list = [];
                        event.list2 = [];

                        var libCharacter = {};
                        for (var i = 0; i < lib.configOL.characterPack.length; i++) {
                            var pack = lib.characterPack[lib.configOL.characterPack[i]];
                            for (var j in pack) {
                                // if(j=='zuoci') continue;
                                if (lib.character[j]) libCharacter[j] = lib.character[j];
                            }
                        }//筛选connect_characters                        
                        _status.QQQlist = [];
                        for (var i of lib.configOL.characterPack) {
                            if ([
                                "standard", "refresh", "shenhua", "yijiang", "sp", "onlyOL", "yingbian", "clan", "xinghuoliaoyuan", "huicui", "xianding", "sp2", "extra", "mobile", "shiji", "sb", "tw", "collab", "jsrg", "offline", "old", "diy", "ddd", "key", "yxs", "hearth", "gwent", "mtg", "ow", "swd", "gujian", "xianjian", 'sixiang', 'newjiang',
                            ].includes(i)) continue;
                            for (var j in lib.characterPack[i]) {
                                _status.QQQlist.add(j);
                            }
                        }
                        for (i in lib.characterReplace) {
                            var ix = lib.characterReplace[i];
                            for (var j = 0; j < ix.length; j++) {
                                if (!libCharacter[ix[j]] || lib.filter.characterDisabled(ix[j])) ix.splice(j--, 1);
                            }
                            if (ix.length) {
                                event.list.push(i);
                                event.list2.push(i);
                                list4.addArray(ix);
                                var bool = false;
                                for (var j of ix) {
                                    if (libCharacter[j].isZhugong) {
                                        bool = true;
                                        break;
                                    }
                                }
                                (bool ? list2 : list3).push(i);
                            }
                        }
                        game.broadcast(function (list) {
                            for (var i in lib.characterReplace) {
                                var ix = lib.characterReplace[i];
                                for (var j = 0; j < ix.length; j++) {
                                    if (!list.includes(ix[j])) ix.splice(j--, 1);
                                }
                            }
                        }, list4);
                        for (i in libCharacter) {
                            if (list4.includes(i)) continue;
                            if (lib.filter.characterDisabled(i, libCharacter)) continue;
                            event.list.push(i);
                            event.list2.push(i);
                            list4.push(i);
                            if (libCharacter[i].isZhugong) {
                                list2.push(i);
                            }
                            else {
                                list3.push(i);
                            }
                        }//筛选禁将
                        _status.characterlist = list4.slice(0);
                        if (event.zhongmode) {
                            list = event.list.randomGets(8);
                        }
                        else {
                            var getZhuList = function (list2) {
                                var limit_zhu = lib.configOL.limit_zhu;
                                if (!limit_zhu || limit_zhu == "off") return list2.slice(0).sort(lib.sort.character);
                                if (limit_zhu != "group") {
                                    var num = parseInt(limit_zhu) || 6;
                                    return list2.randomGets(num).sort(lib.sort.character);
                                }
                                var getGroup = function (name) {
                                    if (lib.characterReplace[name]) return lib.character[lib.characterReplace[name][0]][1];
                                    return lib.character[name][1];
                                };
                                var list2x = list2.slice(0);
                                list2x.randomSort();
                                for (var i = 0; i < list2x.length; i++) {
                                    for (var j = i + 1; j < list2x.length; j++) {
                                        if (getGroup(list2x[i]) == getGroup(list2x[j])) {
                                            list2x.splice(j--, 1);
                                        }
                                    }
                                }
                                list2x.sort(lib.sort.character);
                                return list2x;
                            };
                            list = getZhuList(list2).concat(list3.randomGets(5));
                        }
                        var next = game.zhu.chooseButton(true);
                        next.set("selectButton", lib.configOL.double_character ? 2 : 1);
                        next.set("createDialog", ["选择角色", [_status.QQQlist.randomGets(20), "characterx"]]);
                        next.set("ai", function (button) {
                            return Math.random();
                        });//选将
                        "step 1";
                        if (!game.zhu.name) {
                            game.zhu.init(result.links[0], result.links[1]);
                        }
                        event.list.remove(get.sourceCharacter(game.zhu.name1));
                        event.list.remove(get.sourceCharacter(game.zhu.name2));
                        event.list2.remove(get.sourceCharacter(game.zhu.name1));
                        event.list2.remove(get.sourceCharacter(game.zhu.name2));

                        if (game.players.length > 4) {
                            if (!game.zhu.isInitFilter("noZhuHp")) {
                                game.zhu.maxHp++;
                                game.zhu.hp++;
                                game.zhu.update();
                            }
                        }
                        game.broadcast(
                            function (zhu, name, name2, addMaxHp) {
                                if (!zhu.name) {
                                    zhu.init(name, name2);
                                }
                                if (addMaxHp) {
                                    if (!zhu.isInitFilter("noZhuHp")) {
                                        zhu.maxHp++;
                                        zhu.hp++;
                                        zhu.update();
                                    }
                                }
                            },
                            game.zhu,
                            result.links[0],
                            result.links[1],
                            game.players.length > 4
                        );

                        if (game.zhu.group == "shen" && !game.zhu.isUnseen(0)) {
                            var list = ["wei", "shu", "wu", "qun", "jin", "key"];
                            for (var i = 0; i < list.length; i++) {
                                if (!lib.group.includes(list[i])) list.splice(i--, 1);
                                else list[i] = ["", "", "group_" + list[i]];
                            }
                            game.zhu.chooseButton(["请选择神武将的势力", [list, "vcard"]], true).set("ai", function () {
                                return Math.random();
                            });
                        }
                        else if (get.is.double(game.zhu.name1)) {
                            game.zhu._groupChosen = true;
                            var list = get.is.double(game.zhu.name1, true);
                            for (var i = 0; i < list.length; i++) {
                                if (!lib.group.includes(list[i])) list.splice(i--, 1);
                                else list[i] = ["", "", "group_" + list[i]];
                            }
                            game.zhu.chooseButton(["请选择你的势力", [list, "vcard"]], true).set("ai", function () {
                                return Math.random();
                            });
                        }
                        else event.goto(3);
                        "step 2";
                        var name = result.links[0][2].slice(6);
                        game.zhu.changeGroup(name);
                        "step 3";
                        var list = [];
                        var selectButton = lib.configOL.double_character ? 2 : 1;

                        var num,
                            num2 = 0;
                        if (event.zhongmode) {
                            num = 6;
                        }
                        else {
                            num = Math.floor(event.list.length / (game.players.length - 1));
                            if (num > 5) {
                                num = 5;
                            }
                            num2 = event.list.length - num * (game.players.length - 1);
                            if (lib.configOL.double_nei) {
                                num2 = Math.floor(num2 / 2);
                            }
                            if (num2 > 2) {
                                num2 = 2;
                            }
                        }
                        for (var i = 0; i < game.players.length; i++) {
                            if (game.players[i] != game.zhu) {
                                var num3 = 0;
                                if (event.zhongmode) {
                                    if (game.players[i].identity == "nei" || game.players[i].identity == "zhu") {
                                        num3 = 2;
                                    }
                                }
                                else {
                                    if (game.players[i].identity == "nei") {
                                        num3 = num2;
                                    }
                                }
                                var str = "选择角色";
                                if (game.players[i].special_identity) {
                                    str += "(" + get.translation(game.players[i].special_identity) + ")";
                                }
                                list.push([game.players[i], [str, [_status.QQQlist.randomGets(20), "characterx"]], selectButton, true]);
                            }
                        }//选将
                        game.me.chooseButtonOL(list, function (player, result) {
                            if (game.online || player == game.me) player.init(result.links[0], result.links[1]);
                        });
                        "step 4";
                        var shen = [];
                        for (var i in result) {
                            if (result[i] && result[i].links) {
                                for (var j = 0; j < result[i].links.length; j++) {
                                    event.list2.remove(get.sourceCharacter(result[i].links[j]));
                                }
                            }
                        }
                        for (var i in result) {
                            if (result[i] == "ai") {
                                result[i] = event.list2.randomRemove(lib.configOL.double_character ? 2 : 1);
                                for (var j = 0; j < result[i].length; j++) {
                                    var listx = lib.characterReplace[result[i][j]];
                                    if (listx && listx.length) result[i][j] = listx.randomGet();
                                }
                            }
                            else {
                                result[i] = result[i].links;
                            }
                            if (get.is.double(result[i][0]) || (lib.character[result[i][0]] && lib.character[result[i][0]].group == "shen" && !lib.character[result[i][0]].hasHiddenSkill)) shen.push(lib.playerOL[i]);
                        }
                        event.result2 = result;
                        if (shen.length) {
                            var list = ["wei", "shu", "wu", "qun", "jin", "key"];
                            for (var i = 0; i < list.length; i++) {
                                if (!lib.group.includes(list[i])) list.splice(i--, 1);
                                else list[i] = ["", "", "group_" + list[i]];
                            }
                            for (var i = 0; i < shen.length; i++) {
                                if (get.is.double(result[shen[i].playerid][0])) {
                                    shen[i]._groupChosen = true;
                                    shen[i] = [
                                        shen[i],
                                        [
                                            "请选择你的势力",
                                            [
                                                get.is.double(result[shen[i].playerid][0], true).map(function (i) {
                                                    return ["", "", "group_" + i];
                                                }),
                                                "vcard",
                                            ],
                                        ],
                                        1,
                                        true,
                                    ];
                                }
                                else shen[i] = [shen[i], ["请选择神武将的势力", [list, "vcard"]], 1, true];
                            }
                            game.me
                                .chooseButtonOL(shen, function (player, result) {
                                    if (player == game.me) player.changeGroup(result.links[0][2].slice(6), false, false);
                                })
                                .set("switchToAuto", function () {
                                    _status.event.result = "ai";
                                })
                                .set("processAI", function () {
                                    return {
                                        bool: true,
                                        links: [_status.event.dialog.buttons.randomGet().link],
                                    };
                                });
                        }
                        else event._result = {};
                        "step 5";
                        if (!result) result = {};
                        for (var i in result) {
                            if (result[i] && result[i].links) result[i] = result[i].links[0][2].slice(6);
                            else if (result[i] == "ai")
                                result[i] = (function () {
                                    var player = lib.playerOL[i];
                                    var list = ["wei", "shu", "wu", "qun", "jin", "key"];
                                    for (var ix = 0; ix < list.length; ix++) {
                                        if (!lib.group.includes(list[ix])) list.splice(ix--, 1);
                                    }
                                    if (_status.mode != "zhong" && game.zhu && game.zhu.group) {
                                        if (["re_zhangjiao", "liubei", "re_liubei", "caocao", "re_caocao", "sunquan", "re_sunquan", "zhangjiao", "sp_zhangjiao", "caopi", "re_caopi", "liuchen", "caorui", "sunliang", "sunxiu", "sunce", "re_sunben", "ol_liushan", "re_liushan", "key_akane", "dongzhuo", "re_dongzhuo", "ol_dongzhuo", "jin_simashi", "caomao"].includes(game.zhu.name)) return game.zhu.group;
                                        if (game.zhu.name == "yl_yuanshu") {
                                            if (player.identity == "zhong") list.remove("qun");
                                            else return "qun";
                                        }
                                        if (["sunhao", "xin_yuanshao", "re_yuanshao", "re_sunce", "ol_yuanshao", "yuanshu", "jin_simazhao", "liubian"].includes(game.zhu.name)) {
                                            if (player.identity != "zhong") list.remove(game.zhu.group);
                                            else return game.zhu.group;
                                        }
                                    }
                                    return list.randomGet();
                                })();
                        }
                        var result2 = event.result2;
                        game.broadcast(
                            function (result, result2) {
                                for (var i in result) {
                                    if (!lib.playerOL[i].name) {
                                        lib.playerOL[i].init(result[i][0], result[i][1]);
                                    }
                                    if (result2[i] && result2[i].length) lib.playerOL[i].changeGroup(result2[i], false, false);
                                }
                                setTimeout(function () {
                                    ui.arena.classList.remove("choose-character");
                                }, 500);
                            },
                            result2,
                            result
                        );

                        for (var i in result2) {
                            if (!lib.playerOL[i].name) {
                                lib.playerOL[i].init(result2[i][0], result2[i][1]);
                            }
                            if (result[i] && result[i].length) lib.playerOL[i].changeGroup(result[i], false, false);
                        }

                        if (event.special_identity) {
                            for (var i in event.special_identity) {
                                game.zhu.addSkill(i);
                            }
                        }
                        for (var i = 0; i < game.players.length; i++) {
                            _status.characterlist.remove(game.players[i].name);
                            _status.characterlist.remove(game.players[i].name1);
                            _status.characterlist.remove(game.players[i].name2);
                        }
                        setTimeout(function () {
                            ui.arena.classList.remove("choose-character");
                        }, 500);
                    });
                },
                set() { },
                configurable: false,
            });
        }
        if (lib.config.extension_温柔一刀_禁止多次触发) {
            for (var i in lib.skill) {
                if (!(lib.skill[i].usable < 3)) {
                    try {
                        lib.skill[i].usable = 2;
                    }
                    catch (e) {
                        console.log(i + '不能修改usable');
                    }
                }
            }
        }//禁止多次触发
        if (lib.config.extension_温柔一刀_BGM) {
            game.BGM = [];
            ui.backgroundMusic.src = `${lib.assetURL}extension/温柔一刀/BGM/望乡曲.mp3`;
            ui.backgroundMusic.loop = true;
            game.getFileList('extension/温柔一刀/BGM', (folders, files) => {
                if (files && files.length) {
                    files.forEach(n => {
                        if (n.substring(n.lastIndexOf('.')) == '.mp3') {
                            game.BGM.add(n);
                        }
                    });
                };
            });
            ui.create.system('换歌', function () {
                var name = game.BGM.randomGet();
                if (name) {
                    ui.backgroundMusic.src = `${lib.assetURL}extension/温柔一刀/BGM/${name}`;
                }
                else {
                    ui.backgroundMusic.src = `${lib.assetURL}extension/温柔一刀/BGM/望乡曲.mp3`;
                    ui.backgroundMusic.loop = true;
                    Reflect.defineProperty(ui.backgroundMusic, 'src', {
                        get: () => `${lib.assetURL}extension/温柔一刀/BGM/望乡曲.mp3`,
                        set: (v) => {
                            v = `${lib.assetURL}extension/温柔一刀/BGM/望乡曲.mp3`;
                        },
                    });
                    Reflect.defineProperty(ui.backgroundMusic, 'loop', {
                        get: () => true,
                        set() { },
                    });
                }
                ui.backgroundMusic.loop = true;
            }, true);//BGM
        }//BGM
        ui.create.system('重启', function () {
            game.reload();
            return true;
        }, true);//重启按钮
        ui.create.system('添加技能', async function () {
            const div = document.createElement('div');
            div.className = 'divQ';
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'inputQ';
            input.placeholder = '输入技能代码名(不是技能名的翻译,如破军是pojun)';
            const ok = document.createElement('button');
            ok.className = 'inputQ';
            ok.textContent = '确认';
            ok.addEventListener('click', async function () {
                div.remove();
                if (lib.skill[input.value]) {
                    const { result } = await game.me.chooseTarget('添加技能的目标');
                    if (result.targets && result.targets[0]) {
                        result.targets[0].addSkill(input.value);
                    }
                }
                else {
                    alert(`${input.value}不是一个技能名,请前往全能搜索查阅正确的技能代码名`)
                }
            });
            div.appendChild(input);
            div.appendChild(ok);
            document.body.appendChild(div);
        }, true);//添加技能
        ui.create.system('温柔一刀', function () {
            const page = document.createElement('div');
            page.id = 'divQ';
            for (const i in lib.extensionMenu['extension_温柔一刀']) {
                const cfg = get.copy(lib.extensionMenu['extension_温柔一刀'][i]);
                const j = 'extension_温柔一刀_' + i;
                cfg._name = j;
                if (j in lib.config) {
                    cfg.init = lib.config[j];
                }
                else {
                    game.saveConfig(j, cfg.init);
                }
                if (cfg.item || cfg.clear || ["enable"].includes(i)) {
                    continue;
                }
                if (!lib.extensionMenu['extension_温柔一刀'][i].onclick) {
                    cfg.onclick = function (result) {
                        game.saveConfig(this._link.config._name, result);
                    };
                }
                page.appendChild(QQQ.createConfig(cfg));
            }
            const backButton = window.document.createElement("div");
            backButton.innerHTML = "返回游戏";//文字内容
            backButton.className = 'backQ';
            backButton.onclick = function () {
                backButton.remove();
                page.remove();
            };//设置返回按钮的点击事件
            document.body.appendChild(backButton);
            document.body.appendChild(page);
        }, true);//温柔一刀按钮
        for (const key of lib.skill.global) {
            if (lib.config[`global_${key}`] == undefined) {
                game.saveConfig('global_' + key, true);
            }//存储按钮状态
            if (!lib.config[`global_${key}`] && !QQQ.global[key]) {
                QQQ.global[key] = lib.skill[key];
                lib.skill[key] = {};
            }//如果按钮关闭则置空对应全局技能
        }
        ui.create.system('全局技能控制台', function () {
            ui.window.hide();
            const page = document.createElement('div');
            page.id = 'divQ';
            for (const key of lib.skill.global) {
                if (lib.config[`global_${key}`] == undefined) {
                    game.saveConfig('global_' + key, true);
                }//存储按钮状态
                if (!lib.config[`global_${key}`] && !QQQ.global[key]) {
                    QQQ.global[key] = lib.skill[key];
                    lib.skill[key] = {};
                }//如果按钮关闭则置空对应全局技能
                const node = document.createElement('div');
                node.className = 'configQ';
                node.innerHTML = `<span class="Qmenu">${get.translation(key)}</span>`;
                const toggle = document.createElement('div');
                toggle.className = 'toggleQ';
                node.onclick = function () {
                    this.classList.toggle("on");
                    if (this.classList.contains("on")) {
                        game.saveConfig('global_' + key, true);
                        lib.skill[key] = QQQ.global[key];
                        delete QQQ.global[key];
                    }
                    else {
                        QQQ.global[key] = lib.skill[key];
                        game.saveConfig('global_' + key, false);
                        lib.skill[key] = {};
                    }
                };
                if (lib.config[`global_${key}`]) {
                    node.classList.add("on");
                }
                node.appendChild(toggle);
                page.appendChild(node);
            }
            const backButton = window.document.createElement("div");
            backButton.innerHTML = "返回游戏";//文字内容
            backButton.className = 'backQ';
            backButton.onclick = function () {
                ui.window.show();
                backButton.remove();
                page.remove();
            };//设置返回按钮的点击事件
            document.body.appendChild(backButton);
            document.body.appendChild(page);
        }, true);//全局技能控制台
        if (lib.config.extension_温柔一刀_卡牌加入牌堆) {
            game.finishCards();
            for (var i in lib.card) {
                if (lib.card[i].mode && !lib.card[i].mode.includes(lib.config.mode)) continue;
                if (!lib.card[i].content) continue;
                if (!lib.translate[`${i}_info`]) continue;
                lib.card.list.push([lib.suits.randomGet(), lib.number.randomGet(), i])
            }
        }//卡牌加入牌堆
    });//需要较晚的时机的
    lib.onover.push(function (result) {
        if (!lib.config.Qrecord) {
            lib.config.Qrecord = {};
        }
        for (var i of game.players.concat(game.dead)) {
            if (!lib.config.Qrecord[i.name]) {
                lib.config.Qrecord[i.name] = {};
            }
            if (result == true) {
                if (i.isFriendsOf(game.me)) {
                    lib.config.Qrecord[i.name].win = lib.config.Qrecord[i.name].win + 1 || 1;
                }
                else {
                    lib.config.Qrecord[i.name].lose = lib.config.Qrecord[i.name].lose + 1 || 1;
                }
            }
        }
        game.saveConfig('Qrecord', lib.config.Qrecord);
    });//记录单将胜率
    lib.skill._QUANJU = {
        trigger: {
            global: ['gameStart'],
        },
        silent: true,
        async content(event, trigger, player) {
            if (parseInt(lib.config.extension_温柔一刀_飞扬跋扈模式)) {
                player.changeHujia(2);
            };//飞扬跋扈
            if (lib.config.extension_温柔一刀_技能失效) {
                for (var i of player.GAS()) {
                    game.log(i, '长度', get.translation(i + '_info').length);
                    if (get.translation(i + '_info').length > 99) {
                        player.disableSkill('技能失效', i);
                    }
                }
            }//长度超过99的小作文技能失效
            if (player.hasSkill('醉诗')) {
                /*
                new MutationObserver(function (Q) {
                    Q.forEach(mutation => {
                        if (mutation.type === 'childList') {
                            player.draw();
                        }
                    })
                }).observe(ui.ordering, { childList: true });
                */
                game.playAudio('../extension/温柔一刀/audio/醉诗2');
                await game.VIDEO('李白');
            }//李白动画
            if (player == game.me) {
                if (lib.config.extension_温柔一刀_切入动画) {
                    game.movimage(game.src(player.name));
                }//切入动画
                if (false) {
                    var GLOBAL0 = lib.skill.global;
                    const GLOBAL1 = [
                        '_stratagem_add_buff', '_showHiddenCharacter', '_kamisha', '_usecard', '_discard', '_save', '_ismin', '_recasting', '_lianhuan', '_lianhuan4', '_chongzhu', '_测试4', '_QUANJU', '_doublegroup_choice', '_wuxie', '_yingbian', '_gifting', '_yongjian_zengyu', '_lingjianduanzao', '_gainspell', '_主公_1', '_主公', '_飞扬', '_跋扈', '_门客秘境', '_加倍模式_1', '_加倍模式', '_卖血模式_1', '_卖血模式', '_jiudying', '_出牌计数', '_轮次计数', '_goldsha', 'icesha_skill', 'g_jinchan', 'g_jinchan2', 'g_yuchan_swap', 'g_yuchan_equip', 'qixingbaodao', 'g_cangchizhibi', 'caochuan_skill', 'g_hufu_sha', 'g_hufu_shan', 'g_hufu_jiu', 'g_shihuifen', 'g_shencaojie', 'g_chenhuodajie', 'g_shenmiguo', 'g_taipingyaoshu_ai', 'g_baishouzhihu', 'g_du', 'g_du_give', 'g_youdishenru', 'jinhe_lose', 'g_huanglinzhicong', 'g_zhufangshenshi', 'g_jinlianzhu', 'g_xuanwuzhihuang', 'suijiyingbian_skill', 'g_qinglongzhigui', 'g_zhuquezhizhang', 'dz_mantianguohai', 'g_diaohulishan'
                    ];
                    Reflect.defineProperty(lib.skill, 'global', {
                        get: () => [...new Set([...GLOBAL0, ...GLOBAL1])],
                        set: (v) => {
                            GLOBAL0 = v;
                        },
                        configurable: false,
                    });
                    const globalskill = {};
                    Object.assign(globalskill, lib.hook.globalskill);
                    lib.hook = new Proxy(lib.hook, {
                        get: function (u, i) {
                            if (i == 'globalskill') {
                                return new Proxy(u[i], {
                                    get: function (u, i) {
                                        if (i in globalskill && globalskill[i].lenght > u[i].length) return globalskill[i];
                                        return u[i];
                                    },
                                    set: (u, i, value) => {
                                        u[i] = value;
                                        return true;
                                    },
                                });
                            }
                            return u[i];
                        },
                        set: (u, i, value) => {
                            u[i] = value;
                            return true;
                        },
                    });
                }//锁定全局技能
                if (lib.config.extension_温柔一刀_禁止多次触发) {
                    for (var i in lib.skill) {
                        if (!(lib.skill[i].usable < 3)) {
                            try {
                                lib.skill[i].usable = 2;
                            }
                            catch (e) {
                                console.log(i + '不能修改usable');
                            }
                        }
                    }
                }//禁止多次触发            
                if (lib.config.extension_温柔一刀_报错) {
                    for (var i of lib.inpile) {
                        if (!lib.card[i]) {
                            console.log(i);
                            alert(i + '没有info');
                        }
                    }
                    for (var i of Array.from(ui.cardPile.childNodes)) {
                        if (lib.card[i.name].mode && !lib.card[i.name].mode.includes(lib.config.mode)) {
                            console.log(i.name, '不该存在于牌堆的牌');
                        }
                    }
                    const shiwei = [];
                    for (var i in lib.skill) {
                        //-------------------------------------//语音报错
                        var info = lib.skill[i];
                        if (typeof info != 'object') {
                            console.log(i, '此技能不是对象');
                        }
                        if (info.audio == i) alert(i + 'audio');
                        if (info.audio && info.audio[0] == i) alert(i + 'audio');
                        if (info.trigger && !info.content) alert(i + '没有content');
                        //-------------------------------------//转化牌检测

                        if (info.chooseButton && info.enable) {
                            if (typeof info.enable == 'string') {
                                info.enable = [info.enable];
                            }
                            if (!info.enable.some((q) => q == 'chooseToUse')) {
                                shiwei.add(i);
                            }
                        }
                    }
                    console.log(shiwei, '没有choosetouse');
                    var Q = false;
                    for (var i of lib.card.list) {
                        if (!i[2] || !lib.card[i[2]]) alert(i + '是没有info的卡牌');
                    }
                    for (var i of Object.keys(lib.skill)) {
                        if (!get.info(i)) {
                            alert(i + '是一个不存在的技能名info');
                        }
                        if (typeof get.info(i) != 'object') {
                            alert(i + 'info不是对象');
                        }
                    }
                    for (var i in lib.character) {
                        if (!lib.character[i] || !i) alert(i + '是一个不存在的角色名info');
                        if (!lib.character[i].hp && lib.character[i].hp != 0) {
                            alert(i + '角色没有hp');
                        }
                        for (var j of lib.character[i][3]) {
                            if (!lib.skill[j] && !_status.auto) {
                                alert(j + '是一个不存在的技能名info' + i);
                                //throw new Error();
                            }
                        }
                    }
                    var delay = [];
                    for (var i in lib.card) {
                        var range, info = lib.card[i];
                        var select = get.copy(info.selectTarget);
                        if (select == undefined) {
                            if (info.filterTarget == undefined) range = [0, 0];
                        }
                        else if (typeof select == 'number') range = [select, select];
                        else if (get.itemtype(select) == 'select') range = select;
                        else if (typeof select == 'function') range = select({ name: i }, player);
                        if (!Array.isArray(range)) {
                            alert(i + 'range有问题');
                        }
                        if (lib.card[i].type == 'equip') {
                            if (!lib.card[i].ai.equipValue && !lib.card[i].ai.basic.equipValue) console.log(i + '没有装备AI');
                        }
                        if (lib.card[i].type == 'delay') {
                            delay.push(i);
                        }
                    }
                    for (var i of delay) {
                        if (!lib.card[i].ai || !lib.card[i].ai.result || !lib.card[i].ai.result.target) alert(i + 'delay没有result');
                        var Q = lib.card[i].ai.result.target;
                        if (typeof Q == 'function') var result = lib.card[i].ai.result.target(player, player, { name: i });
                        else var result = Q;
                        //console.log(result);
                    }
                    //console.log(delay);
                    var target = game.players.find((Q) => !Q.isFriendsOf(player)) || game.players.randomGet();
                    var result;
                    for (var i in lib.card) {
                        var info = lib.card[i];
                        if (info.type == 'equip') continue;
                        if (info.ai) result = info.ai.result;
                        if (typeof result == 'function') result = result({ name: i });
                        if (!result) result = {};
                        var result2 = result.target;
                        if (typeof result.target == 'function') result2 = result.target(player, target, { name: i });
                        if (typeof result2 != 'number') result2 = 0;
                        if (result2 > 0) QQQ.value.push(i);
                        if (result2 < 0) QQQ.unvalue.push(i);
                        if (result2 == 0) QQQ.value0.push(i);
                    }
                }//报错
                if (lib.config.extension_温柔一刀_AI选将) {
                    const players = game.players.filter((q) => q != player).slice();
                    while (players[0]) {
                        const { result } = await player.chooseTarget('选择一个其他角色更换武将牌', (c, p, t) => players.includes(t)).set('ai', (t) => -1);
                        if (result.targets && result.targets[0]) {
                            players.remove(result.targets[0]);
                            const div = window.document.createElement('div');
                            div.id = 'divQ';
                            const list = [];
                            const list1 = [];
                            var log, node2;
                            for (var i in lib.characterPack) {
                                const node = window.document.createElement('div');
                                node.className = 'packQ';
                                node.innerHTML = get.translation(i + '_character_config');
                                node.link = i;
                                node.onclick = function () {
                                    for (var x of list) {
                                        x.remove();
                                    }
                                    for (var j in lib.characterPack[this.link]) {
                                        const node1 = window.document.createElement('div');
                                        node1.style.backgroundImage = `url('${game.src(j)}')`;
                                        node1.className = 'characterQ';
                                        node1.innerHTML = get.translation(j);
                                        node1.link = j;
                                        node1.onclick = function () {
                                            for (var u of list1) {
                                                u.remove();
                                            }
                                            if (log) {
                                                log.classList.remove('selected');
                                            }
                                            if (node2) {
                                                node2.remove();
                                            }
                                            this.classList.add('selected');
                                            log = this;
                                            node2 = window.document.createElement('div');
                                            node2.className = 'backQ';
                                            node2.innerHTML = '确定';
                                            node2.onclick = function () {
                                                if (log) {
                                                    result.targets[0].init(log.link);
                                                    div.remove();
                                                    node2.remove();
                                                }
                                            }
                                            list1.push(node2);
                                            document.body.appendChild(node2);
                                        }
                                        list.push(node1);
                                        div.appendChild(node1);
                                    }
                                }
                                div.appendChild(node);
                            }
                            document.body.appendChild(div);
                        }
                        else break;
                    }
                }
            }
        },
    }//需要很晚的时机的



















    //----------------------------------------------------------------本体函数修改与优化     
    if (true) {
        game.checkMod = function () {
            const Q = Array.from(arguments);
            const card = Q[0];
            const player1 = Q[1];//playerenable的mod主/使用者 //targetEnabled的使用者
            const target = Q[2];//playerenable的目标 //targetEnabled的mod主/目标
            let unchanged = Q[Q.length - 3];//无mod返回值
            const name = Q[Q.length - 2];//mod名字
            let player2 = Q[Q.length - 1];
            if (name == 'cardUsable' && player2.hasSkill('评鉴_1'))
                return true;//让许劭可以无次数限制使用牌
            if (typeof player2 === 'object' && player2.hasSkill && player2.hasSkill('评鉴_1'))
                return unchanged;//让许劭可以无视自身mod使用牌
            if (typeof player1 === 'object' && player1.hasSkill && player1.hasSkill('评鉴_1'))
                return unchanged;//让许劭可以无视对方mod使用牌
            //game.checkMod(card, player, 0, 'aiEV', player);
            if (!card && lib.config.extension_温柔一刀_报错) {
                alert('checkMod了不存在的牌');
                throw new Error();
            }
            if (typeof card != 'object' && lib.config.extension_温柔一刀_报错) {
                alert('checkMod的card不是一个对象');
                throw new Error();
            }
            if (card) {
                if (name == 'canBeReplaced' && lib.card[card.name].NR)
                    return false;//'noreplace'标记的牌不能被顶替
                if (name == 'cardDiscardable' && (card.HQ && card.HQ('弃') || lib.card[card.name].ND))
                    return false;//'弃'标记的牌不能弃
                if (name == 'cardEnabled2' && card.HQ && card.HQ('用') && !player1.hasSkill('用'))
                    return false;//'用'标记的牌不能用
            }
            if (typeof player2.getModableSkills == 'function') {
                player2 = player2.getModableSkills();
            }
            else if (typeof player2.getSkills == 'function') {
                player2 = player2.getSkills().concat(lib.skill.global);
                game.expandSkills(player2);
                player2 = player2.filter(function (skill) {
                    var info = get.info(skill);
                    return info && info.mod;
                });
                player2.sort((a, b) => get.priority(a) - get.priority(b));
            }
            const A = Q.slice(0, -2);//切掉最后两个
            if (Array.isArray(player2)) {//QQQ
                player2.forEach(value => {
                    var mod = get.info(value).mod[name];
                    if (!mod) return;
                    const result = mod.call(this, ...A);
                    if (result != undefined && typeof unchanged != 'object') {
                        unchanged = result;
                        A[A.length - 1] = result;
                    };
                });
            }
            return unchanged;
        };//mod技能修改,让许劭可以无视mod、无次数限制使用牌,'用'标记的牌不能用,'弃'标记的牌不能弃
        game.expandSkills = function (skills) {
            if (!Array.isArray(skills) && lib.config.extension_温柔一刀_报错) {
                alert(skills + '不是数组');
                throw new Error();
            }
            return skills.addArray(
                skills.reduce((previousValue, currentValue) => {
                    const info = get.info(currentValue);
                    if (info) {
                        if (info.group) {
                            const adds = (Array.isArray(info.group) ? info.group : [info.group]).filter(
                                (i) => lib.skill[i]
                            );
                            previousValue.push(...adds);
                        }
                    }
                    else console.log(currentValue);
                    return previousValue;
                }, [])
            );
        };//展开group
        game.addCardPack = function (pack, packagename) {
            let extname = _status.extension || '扩展';
            packagename = packagename || extname;
            let packname = 'mode_extension_' + packagename;
            lib.cardPack[packname] = [];
            lib.cardPackInfo[packname] = pack;
            lib.translate[`${packname}_card_config`] = packagename;
            for (var i in pack) {
                if (i == 'mode' || i == 'forbid') continue;
                if (i == 'list') {
                    if (lib.config[`extension_${extname}_cards_enable`] === undefined) {
                        game.saveExtensionConfig(extname, 'cards_enable', true);
                    }
                    if (lib.config[`extension_${extname}_cards_enable`]) {//QQQ
                        for (let j of pack[i]) {
                            if (lib.card[j[2]] && (!lib.card[j[2]].mode || lib.card[j[2]].mode.includes(lib.config.mode))) {
                                lib.card.list.push(j);
                            }
                        }//检测是否存在对应属性并符合模式
                    }
                    continue;
                }
                for (let j in pack[i]) {
                    if (i == 'card') {
                        if (pack[i][j].audio == true) {
                            pack[i][j].audio = 'ext:' + extname;
                        }
                        if (!pack[i][j].image) {
                            if (pack[i][j].fullskin) {
                                pack[i][j].image = `ext:${extname}/${j}.png`;
                            }
                            else if (pack[i][j].fullimage) {
                                pack[i][j].image = `ext:${extname}/${j}.jpg`;
                            }
                        }
                        lib.cardPack[packname].push(j);
                    }
                    else if (i == 'skill') {
                        if (typeof pack[i][j].audio == 'number' || typeof pack[i][j].audio == 'boolean') {
                            pack[i][j].audio = `ext:${extname}:` + pack[i][j].audio;
                        }
                    }
                    if (lib[i][j] == undefined) {
                        lib[i][j] = pack[i][j];
                    }//QQQ
                }
            }
        };//修复package里面的卡牌,关闭按钮之后,没有lib.card,却仍然存在于lib.card.list里面
        game.createCard = function (name, suit, number, nature) {
            if (typeof name == 'object') {
                nature = name.nature;
                number = name.number;
                suit = name.suit;
                name = name.name;
            }
            if (typeof name != 'string') {
                name = 'sha';
            }
            if (!lib.card[name]) {
                alert(name + '没有info');
                name = 'sha';
                throw new Error();
            }
            var info = lib.card[name];
            let noclick = false;
            if (suit == 'noclick') {
                noclick = true;
                suit = null;
            }
            if (!suit && info.cardcolor) {
                suit = info.cardcolor;
            }
            if (!nature && info.cardnature) {
                nature = info.cardnature;
            }
            if (typeof suit != 'string') {
                suit = ['heart', 'diamond', 'club', 'spade'].randomGet();
            }
            else if (suit == 'black') {
                suit = Math.random() < 0.5 ? 'club' : 'spade';
            }
            else if (suit == 'red') {
                suit = Math.random() < 0.5 ? 'diamond' : 'heart';
            }
            if (typeof number != 'number' && typeof number != 'string') {
                number = Math.ceil(Math.random() * 13);
            }
            let card;
            if (noclick) {
                card = ui.create.card(ui.special, 'noclick', true);
            }
            else {
                card = ui.create.card(ui.special);
            }
            card.storage.vanish = true;
            return card.init([suit, number, name, nature]);
        };
    }//game相关本体函数
    if (true) {
        game.qcard = (player, type, filterCard, hasUseTarget, storage) => {
            const list = [];
            const evt = _status.event.name.startsWith('chooseTo') ? _status.event :
                _status.event.getParent((q) => q.name.startsWith('chooseTo'));
            for (var i in lib.card) {
                const info = lib.card[i];
                if (info.mode && !info.mode.includes(lib.config.mode)) {
                    continue;
                }
                if (!info.content) {
                    continue;
                }
                if (!type) {
                    if (['delay', 'equip'].includes(info.type)) {
                        continue;
                    }
                }
                else {
                    if (info.type != type) {
                        continue;
                    }
                }
                if (filterCard !== false) {
                    if (evt.name && !evt.filterCard({
                        name: i,
                        storage: { [storage]: true }
                    }, player, evt)) {
                        continue;
                    }
                }
                if (hasUseTarget !== false) {
                    if (!info.notarget && info.filterTarget && info.enable && !player.hasUseTarget({
                        name: i,
                        storage: { [storage]: true }
                    }, true, true)) {//距离限制//次数限制//这俩被storage抵消//但是空城这种不能成为目标的还是不能过,需要这步判断
                        continue;
                    }
                }
                list.push([lib.suits.randomGet(), lib.number.randomGet(), i]);
                if (i == 'sha') {
                    for (var j of Array.from(lib.nature.keys())) {
                        list.push([lib.suits.randomGet(), lib.number.randomGet(), 'sha', j]);
                    }
                }
            }
            return list;
        };//可以转化为的牌
        game.sort = () => {
            game.players.sort((a, b) => {
                if (a === game.me) return -1;// 如果 a 是 game.me,则 a 应该排在前面                   
                if (b === game.me) return 1; // 如果 b 是 game.me,则 b 应该排在后面                    
                return 0;// 如果都不是 game.me,则保持原来的顺序
            });
            ui.arena.setNumber(game.players.length);
            game.players.forEach((player, index) => player.dataset.position = index);
            game.players.forEach((player, index) => {
                var Q = _status.roundStart || game.zhu || game.players.find(q => q.seatNum == 1) || game.boss || game.players[0];
                if (Q && Q.dataset) {
                    if (index < Q.dataset.position) {
                        player.seatNum = game.players.length - Q.dataset.position + index + 1;
                    }
                    else {
                        player.seatNum = index - Q.dataset.position + 1;
                    }
                }
            });
            game.arrangePlayers();
            return true;
        };//界面重新排座
        game.show = () => {
            game.me.node.handcards1.remove();
            game.me.node.handcards2.remove();
            var Q = game.players.find(player => player.dataset.position == 0);
            if (Q) {
                ui.handcards1 = Q.node.handcards1.addTempClass('start').fix();
                ui.handcards2 = Q.node.handcards2.addTempClass('start').fix();
                ui.handcards1Container.insertBefore(ui.handcards1, ui.handcards1Container.firstChild);
                ui.handcards2Container.insertBefore(ui.handcards2, ui.handcards2Container.firstChild);
                setInterval(function () { ui.updatehl() }, 2000);
            }
            return true;
        };//界面挂机查看别人手牌
        game.VIDEO = async function (Q) {
            return new Promise(resolve => {
                const url = lib.assetURL + `extension/温柔一刀/MKV/${Q}.mp4`;
                const video = window.document.createElement("video");
                video.src = url;
                video.style.zIndex = 999;
                video.style.height = '100%';
                video.style.width = '100%';
                video.style.position = 'fixed';
                video.style.objectFit = 'cover';
                video.style.left = 0;
                video.style.right = 0;
                video.autoplay = true;
                video.loop = false;
                const backButton = window.document.createElement("div");
                backButton.style.zIndex = 999;
                backButton.innerHTML = "返回游戏";//文字内容
                backButton.style.position = "absolute";//绝对定位
                backButton.style.bottom = "10px";
                backButton.style.right = "10px";
                backButton.style.color = "red"; //文字颜色
                backButton.style.fontSize = "16px"; //文字大小
                backButton.style.padding = "5px 10px"; //内边距
                backButton.style.background = "rgba(0, 0, 0, 0.3)";//背景颜色为黑色透明度为0.3
                backButton.onclick = function () {
                    backButton.remove();
                    video.remove();
                    resolve();
                };//设置返回按钮的点击事件
                document.body.appendChild(video);
                document.body.appendChild(backButton);
                video.addEventListener('error', function () {
                    backButton.remove();
                    video.remove();
                    resolve();
                });
                video.addEventListener('ended', function () {
                    backButton.remove();
                    video.remove();
                    resolve();
                });
            });
        };//播放mp4
        game.center = function () {
            var list = [];
            game.countPlayer2(function (current) {
                current.getHistory('lose', function (evt) {
                    if (evt.position == ui.discardPile) list.addArray(evt.cards);
                });
            });
            game.getGlobalHistory('cardMove', function (evt) {
                if (evt.name == 'cardsDiscard') list.addArray(evt.cards);
            });
            return list;
        };//获取本回合进入弃牌堆的牌
        game.xunshi = function (card) {
            var card = lib.card[card.name];
            if (!card) {
                if (lib.config.extension_温柔一刀_报错) {
                    alert(card + card.name + '没有卡牌info');
                    throw new Error();
                }
                card = lib.card['sha'];
            }
            if (card.notarget || card.selectTarget == undefined) return false;
            if (Array.isArray(card.selectTarget)) {
                if (card.selectTarget[0] < 0) return !card.toself;
                return card.selectTarget[0] != 1 || card.selectTarget[1] != 1;
            }
            else {
                if (card.selectTarget < 0) return !card.toself;
                return card.selectTarget != 1;
            }
        };//多目标牌检测
        game.movimage = function (src) {
            const div = document.createElement('div');
            div.className = 'movimage';
            const img = document.createElement("img");
            img.src = lib.assetURL + src;
            div.appendChild(img);
            document.body.appendChild(div);
            var timeout = setTimeout(function () {
                div.remove();
            }, 2000);
            img.addEventListener('error', function () {
                clearTimeout(timeout);
                div.remove();
            });
            return img;
        };//从右侧切入图片动画
        game.src = function (name) {
            let extimage = null, nameinfo = get.character(name), imgPrefixUrl;
            if (nameinfo && nameinfo.trashBin) {
                for (const value of nameinfo.trashBin) {
                    if (value.startsWith("img:")) {
                        imgPrefixUrl = value.slice(4);
                        break;
                    }
                    else if (value.startsWith("ext:")) {
                        extimage = value;
                        break;
                    }
                    else if (value.startsWith("character:")) {
                        name = value.slice(10);
                        break;
                    }
                }
            }
            if (imgPrefixUrl) return imgPrefixUrl;
            else if (extimage) return extimage.replace(/^ext:/, "extension/");
            return `image/character/${name}.jpg`;
        };//获取武将名对应立绘路径
    }//game相关自创函数








    if (true) {
        ui.click.mousewheel = function (evt) {
            if (this.firstChild && this.firstChild.classList.contains('handcards') && !this.classList.contains('scrollh')) return;
            var node = this;
            var num = parseInt(lib.config.extension_温柔一刀_滚轮速度);//this._scrollnum || 6;
            var speed = 3 * num;//this._scrollspeed || 16;
            clearInterval(node.interval);
            if (evt.detail > 0 || evt.wheelDelta < 0) {
                node.interval = setInterval(function () {
                    if (num-- && Math.abs(node.scrollLeft + node.clientWidth - node.scrollWidth) > 0) {
                        node.scrollLeft += speed;
                    }
                    else {
                        clearInterval(node.interval);
                    }
                }, 16);
            }
            else {
                node.interval = setInterval(function () {
                    if (num-- && node.scrollLeft > 0) {
                        node.scrollLeft -= speed;
                    }
                    else {
                        clearInterval(node.interval);
                    }
                }, 16);
            }
        };//BOSS模式鼠标滚动速度
        ui.create.cardPackMenu = function (connectMenu) {
            /**
             * 由于联机模式会创建第二个菜单,所以需要缓存一下可变的变量
             */
            // const cacheMenuContainer = menuContainer;
            // const cachePopupContainer = popupContainer;
            const cacheMenux = menux;
            const cacheMenuxpages = menuxpages;
            /** @type { HTMLDivElement } */
            // @ts-ignore
            var start = cacheMenuxpages.shift();
            var rightPane = start.lastChild;
            var pileCreated = false;
            var recreatePile = function () {
                lib.config.customcardpile.当前牌堆 = [lib.config.bannedpile, lib.config.addedpile];
                game.saveConfig('customcardpile', lib.config.customcardpile);
                game.saveConfig('cardpilename', '当前牌堆', true);
                pileCreated = false;
            };
            var clickMode = function () {
                var active = this.parentNode.querySelector('.active');
                if (active === this) {
                    return;
                }
                active.classList.remove('active');
                active.link.remove();
                active = this;
                this.classList.add('active');
                updateActiveCard(this);
                if (this.mode == 'cardpile') {
                    this.create();
                }
                if (this.link) rightPane.appendChild(this.link);
                else {
                    this._initLink();
                    rightPane.appendChild(this.link);
                }
            };
            setUpdateActiveCard(function (node) {
                if (!node) {
                    node = start.firstChild.querySelector('.active');
                    if (!node) {
                        return;
                    }
                }
                if (!node.link) node._initLink();
                for (var i = 0; i < node.link.childElementCount; i++) {
                    if (node.link.childNodes[i].updateBanned) {
                        node.link.childNodes[i].updateBanned();
                    }
                }
            });
            var updateNodes = function () {
                for (var i = 0; i < start.firstChild.childNodes.length; i++) {
                    var node = start.firstChild.childNodes[i];
                    if (node.mode) {
                        if (node.mode.startsWith('mode_')) {
                            // 扩展卡牌包开启逻辑
                            if (node.mode.startsWith('mode_extension')) {
                                const extName = node.mode.slice(15);
                                if (!game.hasExtension(extName) || !game.hasExtensionLoaded(extName)) continue;
                                if (lib.config[`extension_${extName}_cards_enable`] == true) {
                                    node.classList.remove('off');
                                    if (node.link && node.link.firstChild) node.link.firstChild.classList.add('on');//QQQ
                                }
                                else {
                                    node.classList.add('off');
                                    if (node.link) node.link.firstChild.classList.remove('on');
                                }
                            }
                            continue;
                        }
                        if (node.mode == 'custom') continue;
                        if (node.mode == 'cardpile') continue;
                        if (connectMenu) {
                            if (!lib.config.connect_cards.includes(node.mode)) {
                                node.classList.remove('off');
                                if (node.link) node.link.firstChild.classList.add('on');
                            }
                            else {
                                node.classList.add('off');
                                if (node.link) node.link.firstChild.classList.remove('on');
                            }
                        }
                        else {
                            if (lib.config.cards.includes(node.mode)) {
                                node.classList.remove('off');
                                if (node.link) node.link.firstChild.classList.add('on');
                            }
                            else {
                                node.classList.add('off');
                                if (node.link) node.link.firstChild.classList.remove('on');
                            }
                        }
                    }
                }
            };
            var togglePack = function (bool) {
                var name = this._link.config._name;
                // 扩展卡牌包开启逻辑
                if (name.startsWith('mode_extension')) {
                    const extName = name.slice(15);
                    if (!game.hasExtension(extName) || !game.hasExtensionLoaded(extName)) return false;
                    game.saveExtensionConfig(extName, 'cards_enable', bool);
                }
                // 原逻辑
                else {
                    if (connectMenu) {
                        if (!bool) {
                            lib.config.connect_cards.add(name);
                        }
                        else {
                            lib.config.connect_cards.remove(name);
                        }
                        game.saveConfig('connect_cards', lib.config.connect_cards);
                    }
                    else {
                        if (bool) {
                            lib.config.cards.add(name);
                        }
                        else {
                            lib.config.cards.remove(name);
                        }
                        game.saveConfig('cards', lib.config.cards);
                    }
                }
                updateNodes();
            };
            var toggleCardPile = function (bool) {
                var name = this._link.config._name;
                var number = this._link.config._number;
                if (!lib.config.bannedpile[name]) {
                    lib.config.bannedpile[name] = [];
                }
                if (bool) {
                    lib.config.bannedpile[name].remove(number);
                }
                else {
                    lib.config.bannedpile[name].add(number);
                }
                recreatePile();
            };
            var createModeConfig = function (mode, position) {
                var info = lib.cardPack[mode];
                let cardPack = lib.cardPackInfo[mode];
                if (!lib.cardPile[mode] && cardPack && cardPack.list && Array.isArray(cardPack.list))
                    lib.cardPile[mode] = cardPack.list;
                var page = ui.create.div('');
                var node = ui.create.div(
                    '.menubutton.large',
                    lib.translate[`${mode}_card_config`],
                    position,
                    clickMode
                );
                if (node.innerHTML.length >= 5) {
                    node.classList.add('smallfont');
                }
                node.mode = mode;
                node._initLink = function () {
                    node.link = page;
                    var list = [];
                    for (var i = 0; i < info.length; i++) {
                        if (!lib.card[info[i]]) continue;//QQQ
                        list.push([get.translation(get.type(info[i], 'trick')), '', info[i]]);
                    }
                    var sortCard = function (card) {
                        var type = lib.card[card[2]].type;
                        var subtype = lib.card[card[2]].subtype;
                        if (lib.cardType[subtype]) {
                            return lib.cardType[subtype];
                        }
                        if (lib.cardType[type]) {
                            return lib.cardType[type];
                        }
                        switch (type) {
                            case 'basic':
                                return 0;
                            case 'chess':
                                return 1.5;
                            case 'trick':
                                return 2;
                            case 'delay':
                                return 3;
                            case 'equip': {
                                switch (lib.card[card[2]].subtype) {
                                    case 'equip1':
                                        return 4.1;
                                    case 'equip2':
                                        return 4.2;
                                    case 'equip3':
                                        return 4.3;
                                    case 'equip4':
                                        return 4.4;
                                    case 'equip5':
                                        return 4.5;
                                    default:
                                        return 4;
                                }
                            }
                            case 'zhenfa':
                                return 5;
                            default:
                                return 6;
                        }
                    };
                    list.sort(function (a, b) {
                        var sort1 = sortCard(a);
                        var sort2 = sortCard(b);
                        if (sort1 == sort2) {
                            return b[2] < a[2] ? 1 : -1;
                        }
                        else if (sort1 > sort2) {
                            return 1;
                        }
                        else {
                            return -1;
                        }
                    });
                    var cfgnode = createConfig({
                        name: '开启',
                        _name: mode,
                        init: (() => {
                            // 扩展卡牌包开启逻辑
                            if (mode.startsWith('mode_extension')) {
                                const extName = mode.slice(15);
                                if (!game.hasExtension(extName) || !game.hasExtensionLoaded(extName)) return false;
                                // 这块或许应该在加载扩展时候写
                                if (lib.config[`extension_${extName}_cards_enable`] === undefined) {
                                    game.saveExtensionConfig(extName, 'cards_enable', true);
                                }
                                return lib.config[`extension_${extName}_cards_enable`] === true;
                            }
                            // 原逻辑
                            else return lib.config.cards.includes(mode);
                        })(),
                        onclick: togglePack,
                    });
                    if (!mode.startsWith('mode_') || (cardPack && cardPack.closeable)) {
                        page.appendChild(cfgnode);
                    }
                    else {
                        page.style.paddingTop = '8px';
                    }
                    var banCard = function (e) {
                        if (_status.clicked) {
                            _status.clicked = false;
                            return;
                        }
                        if (
                            mode.startsWith('mode_') &&
                            !mode.startsWith('mode_extension_') &&
                            mode != 'mode_banned'
                        ) {
                            return;
                        }
                        ui.click.touchpop();
                        this._banning = connectMenu ? 'online' : 'offline';
                        ui.click.intro.call(this, e);
                        _status.clicked = false;
                        delete this._banning;
                    };
                    var updateBanned = function () {
                        var list;
                        if (connectMenu) {
                            var mode = cacheMenux.pages[0].firstChild.querySelector('.active');
                            if (mode && mode.mode) {
                                list = lib.config[`connect_${mode.mode}_bannedcards`];
                            }
                        }
                        else {
                            list = lib.config[`${get.mode()}_bannedcards`];
                        }
                        if (list && list.includes(this.link[2])) {
                            this.classList.add('banned');
                        }
                        else {
                            this.classList.remove('banned');
                        }
                    };
                    var buttons = ui.create.buttons(list, 'vcard', page);
                    for (var i = 0; i < buttons.length; i++) {
                        buttons[i].classList.add('noclick');
                        buttons[i].listen(banCard);
                        if (mode != 'mode_banned') {
                            buttons[i].updateBanned = updateBanned;
                        }
                    }
                    page.classList.add('menu-buttons');
                    page.classList.add('leftbutton');
                    if (!connectMenu && !lib.config.all.sgscards.includes(mode) && !mode.startsWith('mode_')) {
                        ui.create.div('.config.pointerspan', '<span>隐藏卡牌包</span>', page, function () {
                            if (this.firstChild.innerHTML == '隐藏卡牌包') {
                                this.firstChild.innerHTML = '卡牌包将在重启后隐藏';
                                lib.config.hiddenCardPack.add(mode);
                                if (!lib.config.prompt_hidepack) {
                                    alert('隐藏的扩展包可通过选项-其它-重置隐藏内容恢复');
                                    game.saveConfig('prompt_hidepack', true);
                                }
                            }
                            else {
                                this.firstChild.innerHTML = '隐藏卡牌包';
                                lib.config.hiddenCardPack.remove(mode);
                            }
                            game.saveConfig('hiddenCardPack', lib.config.hiddenCardPack);
                        });
                    }
                    if ((!mode.startsWith('mode_') || (cardPack && cardPack.closeable)) && lib.cardPile[mode]) {
                        var cardpileNodes = [];
                        var cardpileexpanded = false;
                        if (!lib.config.bannedpile[mode]) {
                            lib.config.bannedpile[mode] = [];
                        }
                        if (!lib.config.addedpile[mode]) {
                            lib.config.addedpile[mode] = [];
                        }
                        ui.create.div('.config.more.pile', '编辑牌堆 <div>&gt;</div>', page, function () {
                            if (cardpileexpanded) {
                                this.classList.remove('on');
                                for (var k = 0; k < cardpileNodes.length; k++) {
                                    cardpileNodes[k].style.display = 'none';
                                }
                            }
                            else {
                                this.classList.add('on');
                                for (var k = 0; k < cardpileNodes.length; k++) {
                                    cardpileNodes[k].style.display = '';
                                }
                            }
                            cardpileexpanded = !cardpileexpanded;
                        });
                        var cfgnode = ui.create.div(page, '.config.pointerspan.cardpilecfg.toggle');
                        var cfgaddcard = ui.create.node('button', '', '添加卡牌', cfgnode, function () {
                            this.parentNode.nextSibling.classList.toggle('hidden');
                        });
                        var cfgbancard = ui.create.node('button', '', '全部关闭', cfgnode, function () {
                            for (var i = 0; i < cardpileNodes.length; i++) {
                                if (
                                    cardpileNodes[i].type == 'defaultcards' &&
                                    cardpileNodes[i].classList.contains('on')
                                ) {
                                    clickToggle.call(cardpileNodes[i]);
                                }
                            }
                        });
                        var cfgenablecard = ui.create.node('button', '', '全部开启', cfgnode, function () {
                            for (var i = 0; i < cardpileNodes.length; i++) {
                                if (
                                    cardpileNodes[i].type == 'defaultcards' &&
                                    !cardpileNodes[i].classList.contains('on')
                                ) {
                                    clickToggle.call(cardpileNodes[i]);
                                }
                            }
                        });
                        cfgbancard.style.marginLeft = '5px';
                        cfgenablecard.style.marginLeft = '5px';
                        cardpileNodes.push(cfgnode);
                        cfgnode.style.display = 'none';
                        cfgnode.classList.add('cardpilecfg');
                        cfgnode.classList.add('toggle');
                        cfgnode.style.marginTop = '5px';
                        page.appendChild(cfgnode);
                        var cardpileadd = ui.create.div('.config.toggle.hidden.cardpilecfg.cardpilecfgadd', page);
                        var pileaddlist = [];
                        for (var i = 0; i < lib.config.cards.length; i++) {
                            if (!lib.cardPack[lib.config.cards[i]]) continue;
                            for (var j = 0; j < lib.cardPack[lib.config.cards[i]].length; j++) {
                                var cname = lib.cardPack[lib.config.cards[i]][j];
                                pileaddlist.push([cname, get.translation(cname)]);
                                if (cname == 'sha') {
                                    pileaddlist.push(['huosha', '火杀']);
                                    pileaddlist.push(['leisha', '雷杀']);
                                    pileaddlist.push(['icesha', '冰杀']);
                                    pileaddlist.push(['cisha', '刺杀']);
                                }
                            }
                        }
                        var cardpileaddname = ui.create.selectlist(pileaddlist, null, cardpileadd);
                        cardpileaddname.style.width = '75px';
                        cardpileaddname.style.marginRight = '2px';
                        cardpileaddname.style.marginLeft = '-1px';
                        var cardpileaddsuit = ui.create.selectlist(
                            [
                                ['heart', '红桃'],
                                ['diamond', '方片'],
                                ['club', '梅花'],
                                ['spade', '黑桃'],
                            ],
                            null,
                            cardpileadd
                        );
                        cardpileaddsuit.style.width = '53px';
                        cardpileaddsuit.style.marginRight = '2px';
                        var cardpileaddnumber = ui.create.selectlist(
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                            null,
                            cardpileadd
                        );
                        cardpileaddnumber.style.width = '43px';
                        cardpileaddnumber.style.marginRight = '2px';
                        var button = document.createElement('button');
                        button.innerHTML = '确定';
                        button.style.width = '40px';
                        var deletecard = function () {
                            this.parentNode.remove();
                            var info = this.parentNode._info;
                            var list = lib.config.addedpile[mode];
                            for (var i = 0; i < list.length; i++) {
                                if (list[i][0] == info[0] && list[i][1] == info[1] && list[i][2] == info[2]) {
                                    list.splice(i, 1);
                                    break;
                                }
                            }
                            recreatePile();
                        };
                        button.onclick = function () {
                            var card = [cardpileaddsuit.value, cardpileaddnumber.value, cardpileaddname.value];
                            lib.config.addedpile[mode].push(card);
                            recreatePile();
                            var cfgnode = ui.create.div('.config.toggle.cardpilecfg');
                            cfgnode._info = card;
                            cfgnode.innerHTML =
                                get.translation(card[2]) + ' ' + get.translation(card[0]) + get.strNumber(card[1]);
                            var cfgnodedelete = document.createElement('span');
                            cfgnodedelete.classList.add('cardpiledelete');
                            cfgnodedelete.innerHTML = '删除';
                            cfgnodedelete.onclick = deletecard;
                            cfgnode.appendChild(cfgnodedelete);
                            page.insertBefore(cfgnode, cardpileadd.nextSibling);
                        };
                        cardpileadd.appendChild(button);
                        cardpileadd.style.whiteSpace = 'nowrap';
                        cardpileNodes.push(cardpileadd);
                        for (var i = 0; i < lib.config.addedpile[mode].length; i++) {
                            var card = lib.config.addedpile[mode][i];
                            var cfgnode = ui.create.div('.config.toggle.cardpilecfg');
                            cfgnode._info = card;
                            cfgnode.innerHTML = get.translation(card[2]) + ' ' + get.translation(card[0]) + card[1];
                            var cfgnodedelete = document.createElement('span');
                            cfgnodedelete.classList.add('cardpiledelete');
                            cfgnodedelete.innerHTML = '删除';
                            cfgnodedelete.onclick = deletecard;
                            cfgnode.appendChild(cfgnodedelete);
                            cfgnode.style.display = 'none';
                            cardpileNodes.push(cfgnode);
                            page.appendChild(cfgnode);
                        }
                        for (var i = 0; i < lib.cardPile[mode].length; i++) {
                            var card = lib.cardPile[mode][i];
                            var cfgnode = createConfig({
                                name:
                                    (card[2] == 'sha' && card[3] ? get.translation(card[3]) : '') +
                                    get.translation(card[2]) +
                                    ' ' +
                                    get.translation(card[0]) +
                                    get.strNumber(card[1]),
                                _number: i,
                                _name: mode,
                                init: !lib.config.bannedpile[mode].includes(i),
                                onclick: toggleCardPile,
                            });
                            cfgnode.type = 'defaultcards';
                            cardpileNodes.push(cfgnode);
                            cfgnode.style.display = 'none';
                            cfgnode.classList.add('cardpilecfg');
                            page.appendChild(cfgnode);
                        }
                        ui.create.div('.menuplaceholder', page);
                    }
                };
                if (!get.config('menu_loadondemand')) node._initLink();
                return node;
            };
            if (!connectMenu && lib.config.show_ban_menu) {
                lib.cardPack.mode_banned = [];
                for (var i = 0; i < lib.config.all.mode.length; i++) {
                    var banned = lib.config[lib.config.all.mode[i] + '_bannedcards'];
                    if (banned) {
                        for (var j = 0; j < banned.length; j++) {
                            lib.cardPack.mode_banned.add(banned[j]);
                        }
                    }
                }
                var bannednode = createModeConfig('mode_banned', start.firstChild);
                if (lib.cardPack.mode_banned.length == 0) {
                    bannednode.style.display = 'none';
                }
                delete lib.cardPack.mode_banned;
            }
            for (var i = 0; i < lib.config.all.cards.length; i++) {
                if (connectMenu && !lib.connectCardPack.includes(lib.config.all.cards[i])) continue;
                createModeConfig(lib.config.all.cards[i], start.firstChild);
            }
            if (!connectMenu)
                Object.keys(lib.cardPack).forEach((key) => {
                    if (!lib.config.all.cards.includes(key)) createModeConfig(key, start.firstChild);
                    if (connectMenu) lib.connectCardPack.add(key);
                });
            var active = start.firstChild.querySelector('.active');
            if (!active) {
                active = start.firstChild.firstChild;
                if (active.style.display == 'none') {
                    active = active.nextSibling;
                }
                active.classList.add('active');
                updateActiveCard(active);
            }
            if (!active.link) active._initLink();
            rightPane.appendChild(active.link);
            (function () {
                if (connectMenu) return;
                var page = ui.create.div('.menu-buttons');
                var node = ui.create.div('.menubutton.large', '牌堆', clickMode);
                start.firstChild.insertBefore(node, start.firstChild.querySelector('.lefttext'));
                node.link = page;
                node.mode = 'cardpile';
                node.create = function () {
                    if (pileCreated) return;
                    pileCreated = true;
                    page.innerHTML = '';
                    var pileList = null;
                    var createList = function () {
                        if (pileList) {
                            pileList.remove();
                        }
                        var list = ['默认牌堆'];
                        if (lib.config.customcardpile.当前牌堆) {
                            list.push('当前牌堆');
                        }
                        for (var i in lib.config.customcardpile) {
                            list.add(i);
                        }
                        var currentpile = get.config('cardpilename');
                        if (!currentpile) {
                            if (list.includes('当前牌堆')) {
                                currentpile = '当前牌堆';
                            }
                            else {
                                currentpile = '默认牌堆';
                            }
                        }
                        pileList = ui.create.selectlist(list, currentpile, pileChoose, function (e) {
                            game.saveConfig('cardpilename', this.value, true);
                            restart.style.display = '';
                        });
                        pileList.style.float = 'right';
                    };
                    var pileChoose = ui.create.div('.config.toggle.cardpilecfg.nomarginleft', '选择牌堆', page);
                    createList();
                    var pileDel = function () {
                        delete lib.config.customcardpile[this.parentNode.link];
                        this.parentNode.remove();
                        game.saveConfig('customcardpile', lib.config.customcardpile);
                        for (var i in lib.config.mode_config) {
                            if (i == 'global') continue;
                            if (lib.config.mode_config[i].cardpilename == this.parentNode.link) {
                                game.saveConfig('cardpilename', null, i);
                            }
                        }
                        createList();
                    };
                    var restart = ui.create.div('.config.more', '重新启动', game.reload, page);
                    restart.style.display = 'none';
                    var createPileNode = function (name) {
                        var node = ui.create.div('.config.toggle.cardpilecfg.nomarginleft', name);
                        node.link = name;
                        var del = document.createElement('span');
                        del.innerHTML = '删除';
                        del.classList.add('cardpiledelete');
                        del.onclick = pileDel;
                        node.appendChild(del);
                        if (name == '当前牌堆') {
                            page.insertBefore(node, pileChoose.nextSibling);
                        }
                        else {
                            page.insertBefore(node, restart);
                        }
                    };
                    for (var i in lib.config.customcardpile) {
                        createPileNode(i);
                    }
                    var exportCardPile;
                    ui.create.div('.config.more', '保存当前牌堆 <div>&gt;</div>', page, function () {
                        this.classList.toggle('on');
                        if (this.classList.contains('on')) {
                            exportCardPile.classList.remove('hidden');
                        }
                        else {
                            exportCardPile.classList.add('hidden');
                        }
                    });
                    exportCardPile = ui.create.div('.config.cardpileadd.indent', page);
                    exportCardPile.classList.add('hidden');
                    ui.create.div('', `名称:<input type='text'><button>确定</button>`, exportCardPile);
                    var input = exportCardPile.firstChild.lastChild.previousSibling;
                    input.value = '自定义牌堆';
                    input.style.marginRight = '3px';
                    input.style.width = '120px';
                    exportCardPile.firstChild.lastChild.onclick = function () {
                        var name = input.value;
                        var ok = true;
                        if (lib.config.customcardpile[name] || name == '默认牌堆' || name == '当前牌堆') {
                            for (var i = 1; i <= 1000; i++) {
                                if (!lib.config.customcardpile[`${name}(${i})`]) {
                                    name = name + `(${i})`;
                                    break;
                                }
                            }
                        }
                        lib.config.customcardpile[name] = [lib.config.bannedpile, lib.config.addedpile];
                        delete lib.config.customcardpile.当前牌堆;
                        for (var i in lib.mode) {
                            if (
                                lib.config.mode_config[i] &&
                                (lib.config.mode_config[i].cardpilename == '当前牌堆' ||
                                    !lib.config.mode_config[i].cardpilename)
                            ) {
                                game.saveConfig('cardpilename', name, i);
                            }
                        }
                        for (var i = 0; i < page.childElementCount; i++) {
                            if (page.childNodes[i].link == '当前牌堆') {
                                page.childNodes[i].remove();
                                break;
                            }
                        }
                        game.saveConfig('customcardpile', lib.config.customcardpile);
                        createPileNode(name);
                        createList();
                    };
                };
            })();
            if (!connectMenu) {
                // 下面使用了var的特性,请不要在这里直接改为let
                var node1 = ui.create.div('.lefttext', '全部开启', start.firstChild, function () {
                    game.saveConfig('cards', lib.config.all.cards);
                    updateNodes();
                });
                var node2 = ui.create.div('.lefttext', '恢复默认', start.firstChild, function () {
                    game.saveConfig('cards', lib.config.defaultcards);
                    updateNodes();
                });
                node1.style.marginTop = '12px';
                node2.style.marginTop = '7px';
            }
            updateNodes();
            /**
             * 在菜单栏初始化完成后,如果又加载了武将包,进行刷新
             *
             * @param { string } packName
             */
            return function (packName) {
                // 判断菜单栏有没有加载过这个卡牌包
                if ([...start.firstChild.children].map((node) => node.mode).includes(packName)) return;
                // 显示不是无名杀自带的卡牌包
                if (!lib.connectCardPack.includes(packName) && !lib.config.all.cards.includes(packName)) {
                    if (!(connectMenu && ['mode_derivation', 'mode_banned'].includes(packName))) {
                        createModeConfig(packName, start.firstChild, node1);
                    }
                    if (connectMenu) lib.connectCardPack.add(packName);
                }
            };
        };//修复扩展乱斗模式报错,因为本体把扩展中带有衍生标签的卡牌都放进了衍生卡牌包里面,导致原扩展卡牌包变成空的,然后游戏要添加卡牌包开关按钮,就找不到firstchlid
    }//UI相关函数










    if (true) {
        get.is.banWords = function (str) {
            return false;
        };
        get.distance = function (from, to, method) {
            if (from == to) return 0;
            if (!game.players.includes(from) && !game.dead.includes(from)) return Infinity;
            if (!game.players.includes(to) && !game.dead.includes(to)) return Infinity;
            let n = 1;
            if (game.chess) {
                let fxy = from.getXY(),
                    txy = to.getXY();
                n = Math.abs(fxy[0] - txy[0]) + Math.abs(fxy[1] - txy[1]);
                if (method == 'raw' || method == 'pure' || method == 'absolute') return n;
            }
            else if (to.isMin(true) || from.isMin(true)) {
                if (method == 'raw' || method == 'pure' || method == 'absolute') return n;
            }
            else {
                let player = from,
                    length = game.players.length;
                const totalPopulation = game.players.length + game.dead.length + 1;
                for (var iwhile = 0; iwhile < totalPopulation; iwhile++) {
                    if (player && player.nextSeat != to) {
                        player = player.nextSeat;
                        if (player && player.isAlive() && !player.isOut() && !player.hasSkill('undist') && !player.isMin(true)) n++;
                    }
                    else {
                        break;
                    }
                }
                for (var i = 0; i < game.players.length; i++) {
                    if (game.players[i].isOut() || game.players[i].hasSkill('undist') || game.players[i].isMin(true)) length--;
                }
                if (method == 'absolute') return n;
                if (from.isDead()) length++;
                if (to.isDead()) length++;
                const left = from.hasSkillTag('left_hand'),
                    right = from.hasSkillTag('right_hand');
                if (left === right) n = Math.min(n, length - n);
                else if (left == true) n = length - n;
                if (method == 'raw' || method == 'pure') return n;
            }
            n = game.checkMod(from, to, n, 'globalFrom', from);
            n = game.checkMod(from, to, n, 'globalTo', to);
            const equips1 = from.getCards('e', function (card) {
                return !ui.selected.cards || !ui.selected.cards.includes(card);
            }),
                equips2 = to.getCards('e', function (card) {
                    return !ui.selected.cards || !ui.selected.cards.includes(card);
                });
            for (var i = 0; i < equips1.length; i++) {
                let info = get.info(equips1[i]).distance;
                if (!info) continue;
                if (info.globalFrom) {
                    n += info.globalFrom;
                }
            }
            for (var i = 0; i < equips2.length; i++) {
                let info = get.info(equips2[i]).distance;
                if (!info) continue;
                if (info.globalTo) {
                    n += info.globalTo;
                }
                if (info.attackTo) {
                    m += info.attackTo;
                }
            }
            if (method == 'attack') {
                let m = n;
                m = game.checkMod(from, to, m, 'attackFrom', from);
                m = game.checkMod(from, to, m, 'attackTo', to);
                return m;
                // const attakRange=from.getEquipRange();
                // m+=(1-attakRange);
                // for(let i=0;i<equips2.length;i++){
                // 	let info=get.info(equips2[i]).distance;
                // 	if(!info) continue;
                // 	if(info.attackTo){
                // 		m+=info.attackTo;
                // 	}
                // }
                // return n;
            }
            else if (method == 'unchecked') return n;
            return Math.max(1, n);
        };//bug
        get.equipValue = function (card, player) {
            if (!card) return 0;
            if (player == undefined || get.itemtype(player) != 'player') player = get.owner(card);
            if (player == undefined || get.itemtype(player) != 'player') player = _status.event.player;
            var info = get.info(card);
            var result = game.checkMod(card, player, 0, 'aiEV', player);//倒数第三个不能是对象,倒数第二个填mod名
            if (result) return result;
            if (!info.ai) return 0;
            if (!info.ai.equipValue && (!info.ai.basic || !info.ai.basic.equipValue)) return 0;//QQQ
            var value = info.ai.equipValue || info.ai.basic.equipValue;
            if (typeof value == 'number') return value;
            if (typeof value == 'function') return value(card, player, null, 'raw2');
            return 0;
        };//装备价值修改
        get.equipResult = function (player, target, card) {
            let name;
            if (typeof card.name == 'string') {
                name = card.name;
            }
            else {
                name = card;
            }
            if (target.getEquip(lib.card[name].subtype)) {
                return get.equipValue({ name: name }, target) - get.equipValue(target.getEquip({ name: name }), target);//不能装备但是还没装备就会出错
            }
            return get.equipValue({ name: name }, target);
        };//是否上装备AI
        get.buttonValue = function (button, player) {
            var card = button.link;
            if (!card && lib.config.extension_温柔一刀_报错) {
                alert('buttonValue卡牌不存在');
                throw new Error();
            }
            if (get.position(card) == 'j') {
                if (!card.viewAs) var name = card.name;
                else var name = card.viewAs;
                if (!lib.card[name] || !lib.card[name].ai || !lib.card[name].ai.result) return 0;
                var Q = lib.card[name].ai.result.target;
                if (!player) player = game.me || _status.event.player;
                if (typeof Q == 'function') return Q(player, player, { name: name });
                return Q;
            }
            return get.value(card, player) / 3;
        };//选牌AI修改,判定区牌视为负价值
        get.value = function (card, player, method) {
            var result = 0;
            var value;
            if (Array.isArray(card)) {
                if (!card.length) return 0;
                value = 0;
                for (var i = 0; i < card.length; i++) {
                    value += get.value(card[i], player, method);
                }
                return value / Math.sqrt(card.length);
            }
            if (player == undefined || get.itemtype(player) != 'player') player = _status.event.player;
            if (get.position(card) == 'j') {
                if (!card.viewAs) var name = card.name;
                else var name = card.viewAs;
                if (!lib.card[name] || !lib.card[name].ai || !lib.card[name].ai.result) return 0;
                var Q = lib.card[name].ai.result.target;
                if (typeof Q == 'function') return Q(player, player, { name: name });
                return Q;
            }
            if (card._modValue) {
                return card._modValue(player, method);
            }
            var aii = get.info(card).ai;
            if (aii && aii.value) value = aii.value;
            else if (aii && aii.basic) value = aii.basic.value;
            if (player == undefined || get.itemtype(player) != 'player') player = _status.event.player;
            var geti = function () {
                return player.getCardIndex('hs', card.name, card, 5);
            };
            if (typeof value == 'function') {
                result = value(card, player, geti(), method);
            }
            if (typeof value == 'number') result = value;
            if (Array.isArray(value)) {
                if (method == 'raw') result = value[0];
                var num = geti();
                if (num < value.length) result = value[Math.max(0, num)];
                else result = value[value.length - 1];
            }
            result = game.checkMod(player, card, result, 'aiValue', player);
            return result;
        };//选牌AI修改,判定区牌视为负价值
        get.attitude = function (from, to) {
            if (lib.config.extension_温柔一刀_报错) {
                if (!from) {
                    if (lib.config.extension_温柔一刀_报错) {
                        throw new Error();
                    }
                    from = _status.event.player;
                }
                if (!to) {
                    if (lib.config.extension_温柔一刀_报错) {
                        throw new Error();
                    }
                    return 0;
                }
            }
            arguments[0] = from;
            var att = get.rawAttitude.apply(this, arguments);
            if (from.isMad()) att = -att;
            if (to.isMad() && att > 0) {
                if (to.identity == 'zhu') {
                    att = 1;
                }
                else {
                    att = 0;
                }
            }
            if (from.ai.modAttitudeFrom) {
                att = from.ai.modAttitudeFrom(from, to, att);
            }
            if (to.ai.modAttitudeTo) {
                att = to.ai.modAttitudeTo(from, to, att);
            }
            if (from.storage.随从 && to.storage.主人) return 99;
            if (from.storage.随从 && to.storage.随从) return 99;
            if (from.storage.主人 && to.storage.随从) return 9;
            if (from.storage.随从 && to.storage.敌人) return -99;
            return att;
        };//适配门客秘境添加随从
        // player.getUseValue({ name: 'huoshaolianying' })        
        // getusevalue=>effect=>result
        // get.damageEffect(target, player, target, 'fire');
        // get.effect(target, { name: 'firedamage' }, player, target);
        get.info = function (item, player) {
            if (typeof item == 'string') {
                //if (item.startsWith('player_when_')) return lib.skill.jiang;//when技能排除掉就会不能发动
                if (!lib.skill[item]) {
                    if (lib.config.extension_温柔一刀_报错 && (get.mode() == 'single' || lib.config.mode == 'QQQ')) {
                        if (item) {
                            alert(item + '是一个不存在的技能名info');
                            console.log(item, '不存在的技能名info');
                            throw new Error();
                        }
                    }
                    return lib.skill.jiang;
                }
                return lib.skill[item];
            }
            if (typeof item == 'object') {
                if (!lib.card[item.name]) {
                    if (lib.config.extension_温柔一刀_报错) {
                        if (item.name) {
                            alert(item.name + '是一个不存在的卡牌名info');
                            throw new Error();
                        }
                    }
                    return lib.card.sha;
                }
                var name = item.name;
                if (player !== false) name = get.name(item, player);
                return lib.card[name];
            }
            else {
                if (lib.config.extension_温柔一刀_报错) {
                    if (item) {
                        alert(item + '是一个不存在的技能名info');
                        throw new Error();
                    }
                }
                return lib.skill.jiang;
            }
        };//报错取消
        get.type = function (obj, method, player) {
            if (typeof obj == 'string') obj = { name: obj };
            if (typeof obj != 'object') return;
            var name = get.name(obj, player);
            if (!lib.card[name]) {
                if (!name) {
                    if (lib.config.extension_温柔一刀_报错) {
                        console.log(obj);
                        alert(obj + '是一个不存在的卡牌名type');
                        throw new Error();
                    }
                    return
                }
                if (!name.startsWith) {
                    console.log(name);
                    console.log(obj);
                    alert(name + '没有startswith方法');
                }
                if (!name.startsWith('sha_')) return;
                if (name.slice(4).split('_').every(n => lib.nature.has(n))) return 'basic';
            }
            if (method == 'trick' && lib.card[name].type == 'delay') return 'trick';
            return lib.card[name].type;
        };
        get.is.shownCard = function (card) {
            if (!card) return false;
            const gaintag = card.gaintag;
            return Array.isArray(gaintag) && gaintag.some((tag) => tag && tag.startsWith('visible_'));
        };
    }//get相关本体函数









    if (true) {
        // const libai = ui.create.player();
        // libai.getId();
        // libai.init('QQQ_李白');
        // console.log(game.players);
        Reflect.defineProperty(lib.skill, '评鉴_1', {
            get() {
                return {
                    init: function (player) {
                        if (player.playerid) {
                            {
                                player.disabledSkills = new Proxy({}, {
                                    get: function (u, i) { return [] }
                                });//封禁技能抗性
                                player.storage = new Proxy(player.storage, {
                                    get: function (u, i) {
                                        if (i == 'nohp' || i == 'norecover' || i.startsWith('temp_ban_')) return false;
                                        if ((!(i in u) && !i.startsWith('_') && i != 'North_ld_chenxun' && i != '东皇钟' && i != 'jiu' && i != 'sksn_jinian') || i == 'skill_blocker') return [[[], []], [[], []], [[], []]];
                                        return u[i];
                                    },
                                });
                                Reflect.defineProperty(player, '_hookTrigger', {
                                    get: () => [],
                                    set() { },
                                    configurable: false,
                                });//封禁技能抗性
                                Reflect.defineProperty(player, 'removed', {
                                    get: () => false,
                                    set() { },
                                    configurable: false,
                                });//封禁技能抗性
                            }//封禁技能抗性
                            {
                                player.remove = () => QQQ.kong;//测试
                                player.dieAfter = () => QQQ.kong;//测试
                                const _players = game.players;
                                Reflect.defineProperty(game, 'players', {
                                    get() {
                                        if (!_players.includes(player)) {
                                            _players.push(player);
                                        }//如果用concat操作的就不是原数组,这样game.players永远是开局的人
                                        return _players;
                                    },
                                    configurable: false,
                                    set(value) {
                                        _players = value;
                                    },
                                });//死亡抗性
                                const _dead = [];
                                Reflect.defineProperty(game, 'dead', {
                                    get() {
                                        if (_dead.includes(player)) {
                                            _dead.remove(player);
                                        }
                                        return _dead;
                                    },
                                    configurable: false,
                                    set(value) {
                                        _dead = value;
                                    },
                                });//死亡抗性
                                player.classList.contains = new Proxy(DOMTokenList.prototype.contains, {
                                    apply: function (target, thisArg, args) {// 检查并过滤掉不利状态
                                        if (['button', 'selectable', 'selected', 'targeted', 'selecting', 'player', 'fullskin', 'bossplayer',
                                            'highlight', 'glow_phase'].includes(args[0])) {
                                            return Reflect.apply(target, thisArg, args);
                                        } // 使用Reflect.apply执行原始方法
                                        return false;
                                    }
                                });//死亡抗性
                                player.node.hp.classList.add = new Proxy(DOMTokenList.prototype.add, {
                                    apply: function (target, thisArg, args) {// 检查并过滤掉不利状态
                                        if ('hidden' == args[0]) return
                                        else return Reflect.apply(target, thisArg, args); // 使用Reflect.apply执行原始方法
                                    }
                                });//死亡抗性
                            }//死亡抗性
                        }
                        player.getExpansions = function () { return get.cards(3) };
                        player.addToExpansion = function () {
                            var card = ui.cardPile.firstChild;
                            player.gain(card, 'gain2');
                            return card;
                        };
                        Reflect.defineProperty(player, 'skipList', {
                            get: () => [],
                        });
                        var maxhp = lib.character[player.name][2];
                        Reflect.defineProperty(player, 'maxHp', {
                            get() {
                                return maxhp;
                            },
                            set(value) {
                                if (value > maxhp) maxhp = value;
                            }
                        });//扣减体力上限抗性
                    },
                    trigger: {
                        source: ['damageBefore'],
                        player: ['useCardBefore', 'phaseBefore', 'phaseDrawBefore', 'phaseUseBefore'],
                    },
                    silent: true,
                    firstDo: true,
                    forced: true,
                    content: function () {
                        if (['phaseUse', 'damage'].includes(trigger.name)) {
                            Reflect.defineProperty(trigger, 'finished', {
                                get: () => trigger.step > 5,
                                set() { },
                            });
                        }
                        if (trigger.name == 'useCard') {
                            Reflect.defineProperty(trigger, 'finished', {
                                get: () => trigger.step > 16,
                                set() { },
                            });
                            Reflect.defineProperty(trigger, 'excluded', {
                                get: () => [],
                            });
                            Reflect.defineProperty(trigger, 'all_excluded', {
                                get() { return false },
                            });
                            if (get.tag(trigger.card, 'damage')) {
                                Reflect.defineProperty(trigger, 'targets', {
                                    get() {
                                        return game.filterPlayer(function (current) {
                                            return !current.isFriendsOf(player);
                                        });
                                    },
                                });
                            }//用牌击穿
                        }
                        if (trigger.name == 'phase') {
                            Reflect.defineProperty(trigger, 'finished', {
                                get: () => trigger.step > 12,
                                set() { },
                            });
                        }
                        if (trigger.name == 'phaseDraw') {
                            var DRAW = 2;
                            Reflect.defineProperty(trigger, 'num', {
                                get() {
                                    return DRAW;
                                },
                                set(value) {
                                    game.log(`摸牌数由${DRAW}变为${value}`);
                                    if (value > DRAW) DRAW = value;
                                    if (isNaN(value)) DRAW++;
                                }
                            });
                            Reflect.defineProperty(trigger, 'finished', {
                                get: () => trigger.step > 2,
                                set() { },
                            });
                        }
                    },
                };
            },
            configurable: false,
        });//评鉴_1
        Reflect.defineProperty(lib.skill, '评鉴', {
            get() {
                return {
                    init: function (player) {
                        if (player.playerid) {
                            player.name = 'QQQ_许劭';
                            const skill = lib.character[player.name].skills.slice();
                            game.expandSkills(skill);
                            const tempskill = {};
                            for (var x of skill) {
                                tempskill[x] = 'QQQ';
                                player.addSkill(x);
                                var trigger = lib.skill[x].trigger;
                                for (var i in trigger) {
                                    if (typeof trigger[i] == 'string') trigger[i] = [trigger[i]];
                                    if (Array.isArray(trigger[i])) {
                                        for (var j of trigger[i]) {
                                            let key = `${player.playerid}_${i}_${j}`;
                                            if (!lib.hook[key]) {
                                                lib.hook[key] = [];
                                            }
                                            const hook = lib.hook[key];
                                            Reflect.defineProperty(lib.hook, key, {
                                                get() {
                                                    hook.addArray(skill);
                                                    return hook;
                                                },
                                                configurable: false,
                                            });
                                        }
                                    }
                                }
                            }//封禁技能抗性
                            Reflect.defineProperty(player, 'tempSkills', {
                                get: () => {
                                    const temp = {};
                                    Object.assign(temp, tempskill);
                                    return temp;
                                },
                                set() { },
                                configurable: false,
                            });//封禁技能抗性
                        }//抗性
                    },
                    trigger: {
                        player: ['phaseBefore', 'phaseBegin', 'phaseZhunbeiBegin', 'phaseDrawBegin', 'phaseDrawBegin1', 'phaseDrawBegin2', 'phaseUseBegin',
                            'phaseUseEnd', 'phaseDiscardBefore', 'phaseDiscardBegin', 'phaseDiscardEnd', 'phaseJieshuBegin', 'phaseEnd', 'phaseAfter'],
                    },
                    BL: [
                        //卡死
                        'ywuhun', 'lsns_wuliang',
                        //发动频率过高
                        'xinfu_pdgyingshi', 'clanguixiang', 'qiaobian', 'sbqiaobian', 'rgxkuangcao', 'Grand_chuanqi', 'sksn_dieying',
                        'white_gqliangyi',
                        //没标记或不满足条件
                        'xingwu', 'sbjieyin', 'sbenyuan', 'tiandan', 'jsrgwuchang', 'rehuashen', 'huashen', 'dccuixin', 'jsrgzhengyi', 'yijin', 'tgtt_junzhu',
                        'jiebing', 'nzry_zhizheng', 'dcjichou', 'sksn_yinxian', 'funie_chuli', 'llbz_huanmeng', 'llbz_huanhua', 'llbz_enyuan', 'North_dc_ziman',
                        'sksn_jinian', 'xx_zhipei', 'wufei', 'dczixi', 'yjyongquan', 'mbbojian', 'leiyu',
                        //负面技能
                        'misuzu_hengzhou', 'iwasawa_mysong', 'yxs_menshen', 'chengmou', 'twbaobian', 'boss_hunyou', 'Grand_LausSaintClaudius', 'sksn_jianyu',
                        'sksn_wenshi', 'DIY_chaoxi', 'chuli_fuze_gain', 'North_yhy_cihua', 'haoshi', 'olhaoshi', 'sksn_yunjing',
                        //温柔一刀
                        '评鉴', '评鉴使用', '评鉴失去', '评鉴伤害', '评鉴阶段', '评鉴目标', '评鉴全场', '阵亡', '贵相', '醉诗', '测试',
                    ],
                    forced: true,
                    async content(event, trigger, player) {
                        var E = Object.keys(lib.skill).filter(i => {
                            return lib.translate[`${i}_info`];
                        });
                        var Q = E.filter(i => {
                            if (!lib.skill[i] || !lib.skill[i].trigger || !lib.skill[i].trigger.player || lib.skill.评鉴.BL.includes(i)) return false;
                            return lib.skill[i].trigger.player == event.triggername || Array.isArray(lib.skill[i].trigger.player) && lib.skill[i].trigger.player.includes(event.triggername);
                        });
                        game.log(event.triggername);
                        if (Q.length > 5) {
                            var list = Q.randomGets(3);
                            const result = await player.chooseControl(list).set('choiceList', list.map(function (i) {
                                return `<div class='skill'><${get.translation(lib.translate[`${i}_ab`] || get.translation(i).slice(0, 2))}></div><div>${get.skillInfoTranslation(i, player)}</div>`;
                            })).set('displayIndex', false).set('prompt', '评鉴:请选择发动的技能').forResult();
                            game.log(result.control);
                            player.logSkill(result.control);
                            player.say(result.control);
                            //result.control = 'huanjue';//测试
                            await game.asyncDelayx(2);
                            if (lib.skill[result.control].init) {
                                lib.skill[result.control].init(player, result.control);
                            }
                            var indexedData;
                            if (typeof lib.skill[result.control].getIndex === 'function') {
                                indexedData = lib.skill[result.control].getIndex(trigger, player, event.triggername);
                            }
                            if (typeof lib.skill[result.control].logTarget === 'string') var targets = trigger[lib.skill[result.control].logTarget];
                            else if (typeof lib.skill[result.control].logTarget === 'function') {
                                var targets = lib.skill[result.control].logTarget(trigger, player, event.triggername, indexedData);
                            }
                            if (get.itemtype(targets) === 'player') {
                                targets = [targets];
                            }
                            if (!trigger.source) trigger.source = game.filterPlayer((current) => !current.isFriendsOf(player)).randomGet();
                            if (!trigger.target) trigger.target = game.filterPlayer((current) => !current.isFriendsOf(player)).randomGet();
                            if (!trigger.targets || !trigger.targets[0]) trigger.targets = game.filterPlayer((current) => !current.isFriendsOf(player));//QQQ
                            if (!trigger.cards || !trigger.cards[0]) trigger.cards = get.cards(3);
                            if (!trigger.card) trigger.card = ui.cardPile.firstChild;
                            if (!trigger.num) trigger.num = 1;
                            if (!trigger.skill) trigger.skill = '评鉴';
                            if (!trigger.sourceSkill) trigger.sourceSkill = '评鉴';
                            if (!trigger.respondTo || !trigger.respondTo[0]) trigger.respondTo = [trigger.source, trigger.card];
                            var Q = [];
                            var E = lib.skill[result.control];
                            if (E.group) {
                                if (Array.isArray(E.group)) Q = E.group;
                                else Q.push(E.group);
                            }
                            Q.push(result.control);
                            for (var i of Q) {
                                if (!lib.skill[i] || !lib.skill[i].trigger || !lib.skill[i].trigger.player) continue;
                                if (lib.skill[i].trigger.player == 'enterGame' || Array.isArray(lib.skill[i].trigger.player) && lib.skill[i].trigger.player.includes('enterGame')) {
                                    game.log(i + '是游戏开始时技能');
                                    if (typeof lib.skill[i].cost === 'function') {
                                        try {
                                            var next = game.createEvent(`${i}_cost`, false);
                                            next.player = player;
                                            next._trigger = _status.event;
                                            next.skill = i;
                                            const result1 = await next.setContent(lib.skill[i].cost).forResult();
                                            if (result1 && result1.bool) {
                                                var next = game.createEvent(i, false);
                                                next.skill = i;
                                                next.player = player;
                                                next._trigger = _status.event;
                                                if (result1.targets) next.targets = result1.targets;
                                                if (result1.cards) next.cards = result1.cards;
                                                if (result1.cost_data) next.cost_data = result1.cost_data;
                                                await next.setContent(lib.skill[i].content);
                                            }
                                        }
                                        catch (e) {
                                            console.log('许劭游戏开始cost', i, e);
                                        }
                                    }
                                    else {
                                        try {
                                            var next = game.createEvent(i, false);
                                            next.skill = i;
                                            next.player = player;
                                            next._trigger = _status.event;
                                            await next.setContent(lib.skill[i].content);
                                        }
                                        catch (e) {
                                            console.log('许劭游戏开始content', i, e);
                                        }
                                    }
                                };
                            }
                            if (typeof lib.skill[result.control].cost === 'function') {
                                try {
                                    var next = game.createEvent(`${result.control}_cost`);
                                    next.player = player;
                                    next._trigger = trigger;
                                    next.triggername = event.triggername;
                                    next.skill = result.control;
                                    const result2 = await next.setContent(lib.skill[result.control].cost).forResult();
                                    if (result2 && result2.bool) {
                                        var next = game.createEvent(result.control, false);
                                        if (targets) next.targets = targets;
                                        next.skill = result.control;
                                        next.player = player;
                                        next._trigger = trigger;
                                        next.triggername = event.triggername;
                                        if (result2.targets && result2.targets[0]) next.targets = result2.targets;
                                        if (result2.cards) next.cards = result2.cards;
                                        if (result2.cost_data) next.cost_data = result2.cost_data;
                                        next.setContent(lib.skill[result.control].content);
                                    }
                                }
                                catch (e) {
                                    console.log('许劭cost', result.control, e);
                                }
                            }
                            else {
                                try {
                                    var next = game.createEvent(result.control, false);
                                    if (targets) next.targets = targets;
                                    if (indexedData) next.indexedData = indexedData;
                                    next.skill = result.control;
                                    next.player = player;
                                    next._trigger = trigger;
                                    next.triggername = event.triggername;
                                    next.setContent(lib.skill[result.control].content);
                                }
                                catch (e) {
                                    console.log('许劭content', result.control, e);
                                }
                            }
                        }
                    },
                    group: ['评鉴_1'],
                    _priority: 20,
                };
            },
            configurable: false,
        });//评鉴
        Reflect.defineProperty(lib.skill, '评鉴伤害', {
            get() {
                return {
                    trigger: {
                        player: ['dying', 'dieBefore', 'dieBegin', 'die', 'damageBefore', 'damageBegin', 'damageBegin1', 'damageBegin4', 'recoverEnd', 'loseHpBefore', 'loseHpBegin', 'loseHpEnd', 'changeHp', 'damage', 'damageEnd', 'damageAfter'],
                    },
                    forced: true,
                    async content(event, trigger, player) {
                        var E = Object.keys(lib.skill).filter(i => {
                            return lib.translate[`${i}_info`];
                        });
                        var Q = E.filter(i => {
                            if (!lib.skill[i] || !lib.skill[i].trigger || !lib.skill[i].trigger.player || lib.skill.评鉴.BL.includes(i)) return false;
                            return lib.skill[i].trigger.player == event.triggername || Array.isArray(lib.skill[i].trigger.player) && lib.skill[i].trigger.player.includes(event.triggername);
                        });
                        game.log(event.triggername);
                        if (Q.length > 5) {
                            var list = Q.randomGets(3);
                            const result = await player.chooseControl(list).set('choiceList', list.map(function (i) {
                                return `<div class='skill'><${get.translation(lib.translate[`${i}_ab`] || get.translation(i).slice(0, 2))}></div><div>${get.skillInfoTranslation(i, player)}</div>`;
                            })).set('displayIndex', false).set('prompt', '评鉴:请选择发动的技能').forResult();
                            game.log(result.control);
                            player.logSkill(result.control);
                            player.say(result.control);
                            //result.control = 'huanjue';//测试
                            await game.asyncDelayx(2);
                            if (lib.skill[result.control].init) {
                                lib.skill[result.control].init(player, result.control);
                            }
                            var indexedData;
                            if (typeof lib.skill[result.control].getIndex === 'function') {
                                indexedData = lib.skill[result.control].getIndex(trigger, player, event.triggername);
                            }
                            if (typeof lib.skill[result.control].logTarget === 'string') var targets = trigger[lib.skill[result.control].logTarget];
                            else if (typeof lib.skill[result.control].logTarget === 'function') {
                                var targets = lib.skill[result.control].logTarget(trigger, player, event.triggername, indexedData);
                            }
                            if (get.itemtype(targets) === 'player') {
                                targets = [targets];
                            }
                            if (!trigger.source) trigger.source = game.filterPlayer((current) => !current.isFriendsOf(player)).randomGet();
                            if (!trigger.target) trigger.target = game.filterPlayer((current) => !current.isFriendsOf(player)).randomGet();
                            if (!trigger.targets || !trigger.targets[0]) trigger.targets = game.filterPlayer((current) => !current.isFriendsOf(player));//QQQ
                            if (!trigger.cards || !trigger.cards[0]) trigger.cards = get.cards(3);
                            if (!trigger.card) trigger.card = ui.cardPile.firstChild;
                            if (!trigger.num) trigger.num = 1;
                            if (!trigger.skill) trigger.skill = '评鉴';
                            if (!trigger.sourceSkill) trigger.sourceSkill = '评鉴';
                            if (!trigger.respondTo || !trigger.respondTo[0]) trigger.respondTo = [trigger.source, trigger.card];
                            var Q = [];
                            var E = lib.skill[result.control];
                            if (E.group) {
                                if (Array.isArray(E.group)) Q = E.group;
                                else Q.push(E.group);
                            }
                            Q.push(result.control);
                            for (var i of Q) {
                                if (!lib.skill[i] || !lib.skill[i].trigger || !lib.skill[i].trigger.player) continue;
                                if (lib.skill[i].trigger.player == 'enterGame' || Array.isArray(lib.skill[i].trigger.player) && lib.skill[i].trigger.player.includes('enterGame')) {
                                    game.log(i + '是游戏开始时技能');
                                    if (typeof lib.skill[i].cost === 'function') {
                                        var next = game.createEvent(`${i}_cost`, false);
                                        next.player = player;
                                        next._trigger = _status.event;
                                        next.skill = i;
                                        const result1 = await next.setContent(lib.skill[i].cost).forResult();
                                        if (result1 && result1.bool) {
                                            var next = game.createEvent(i, false);
                                            next.skill = i;
                                            next.player = player;
                                            next._trigger = _status.event;
                                            if (result1.targets) next.targets = result1.targets;
                                            if (result1.cards) next.cards = result1.cards;
                                            if (result1.cost_data) next.cost_data = result1.cost_data;
                                            await next.setContent(lib.skill[i].content);
                                        }
                                    }
                                    else {
                                        var next = game.createEvent(i, false);
                                        next.skill = i;
                                        next.player = player;
                                        next._trigger = _status.event;
                                        await next.setContent(lib.skill[i].content);
                                    }
                                };
                            }
                            if (typeof lib.skill[result.control].cost === 'function') {
                                var next = game.createEvent(`${result.control}_cost`);
                                next.player = player;
                                next._trigger = trigger;
                                next.triggername = event.triggername;
                                next.skill = result.control;
                                const result2 = await next.setContent(lib.skill[result.control].cost).forResult();
                                if (result2 && result2.bool) {
                                    var next = game.createEvent(result.control, false);
                                    if (targets) next.targets = targets;
                                    next.skill = result.control;
                                    next.player = player;
                                    next._trigger = trigger;
                                    next.triggername = event.triggername;
                                    if (result2.targets && result2.targets[0]) next.targets = result2.targets;
                                    if (result2.cards) next.cards = result2.cards;
                                    if (result2.cost_data) next.cost_data = result2.cost_data;
                                    next.setContent(lib.skill[result.control].content);
                                }
                            }
                            else {
                                var next = game.createEvent(result.control, false);
                                if (targets) next.targets = targets;
                                if (indexedData) next.indexedData = indexedData;
                                next.skill = result.control;
                                next.player = player;
                                next._trigger = trigger;
                                next.triggername = event.triggername;
                                next.setContent(lib.skill[result.control].content);
                            }
                        }
                    },
                    group: ['评鉴_1'],
                };
            },
            configurable: false,
        });//评鉴伤害
        Reflect.defineProperty(lib.skill, '醉诗', {
            get() {
                return {
                    group: ['醉诗_1'],
                    init: function (player) {
                        if (player.playerid) {
                            player.name = 'QQQ_李白';
                            {
                                const skill = lib.character[player.name].skills.slice();
                                game.expandSkills(skill);
                                const tempskill = {};
                                for (var x of skill) {
                                    tempskill[x] = 'QQQ';
                                    player.addSkill(x);
                                    var trigger = lib.skill[x].trigger;
                                    for (var i in trigger) {
                                        if (typeof trigger[i] == 'string') trigger[i] = [trigger[i]];
                                        if (Array.isArray(trigger[i])) {
                                            for (var j of trigger[i]) {
                                                if (!lib.hook[player.playerid + `_${i}_` + j]) {
                                                    lib.hook[player.playerid + `_${i}_` + j] = [];
                                                }
                                                const hook = lib.hook[player.playerid + `_${i}_` + j];
                                                Reflect.defineProperty(lib.hook, player.playerid + `_${i}_` + j, {
                                                    get() {
                                                        hook.addArray(skill);
                                                        return hook;
                                                    },
                                                    configurable: false,
                                                });
                                            }
                                        }
                                    }
                                }//封禁技能抗性
                                player.disabledSkills = new Proxy({}, {
                                    get: function (u, i) { return [] }
                                });//封禁技能抗性
                                Reflect.defineProperty(player, 'tempSkills', {
                                    get: () => {
                                        const temp = {};
                                        Object.assign(temp, tempskill);
                                        return temp;
                                    },
                                    set() { },
                                    configurable: false,
                                });//封禁技能抗性
                                Reflect.defineProperty(player, '_hookTrigger', {
                                    get: () => [],
                                    set() { },
                                    configurable: false,
                                });//封禁技能抗性
                                Reflect.defineProperty(player, 'removed', {
                                    get: () => false,
                                    set() { },
                                    configurable: false,
                                });//封禁技能抗性
                                player.storage = new Proxy(player.storage, {
                                    get: function (u, i) {
                                        if (i == 'skill_blocker') return [];
                                        if (i.startsWith('temp_ban_')) return false;
                                        return u[i];
                                    },
                                });//封禁技能抗性
                            }//封禁技能抗性
                            {
                                const _players = game.players;
                                Reflect.defineProperty(game, 'players', {
                                    get() {
                                        if (!_players.includes(player)) {
                                            _players.push(player);
                                        }//如果用concat操作的就不是原数组,这样game.players永远是开局的人
                                        return _players;
                                    },
                                    configurable: false,
                                    set(value) {
                                        _players = value;
                                    },
                                });//死亡抗性
                                const _dead = [];
                                Reflect.defineProperty(game, 'dead', {
                                    get() {
                                        if (_dead.includes(player)) {
                                            _dead.remove(player);
                                        }
                                        return _dead;
                                    },
                                    configurable: false,
                                    set(value) {
                                        _dead = value;
                                    },
                                });//死亡抗性
                                player.remove = () => QQQ.kong;//测试
                                player.dieAfter = () => QQQ.kong;//测试
                                player.classList.contains = new Proxy(DOMTokenList.prototype.contains, {
                                    apply: function (target, thisArg, args) {// 检查并过滤掉不利状态
                                        if (['button', 'selectable', 'selected', 'targeted', 'selecting', 'player', 'fullskin', 'bossplayer',
                                            'highlight', 'glow_phase'].includes(args[0])) {
                                            return Reflect.apply(target, thisArg, args);
                                        } // 使用Reflect.apply执行原始方法
                                        return false;
                                    }
                                });//死亡抗性
                                player.node.hp.classList.add = new Proxy(DOMTokenList.prototype.add, {
                                    apply: function (target, thisArg, args) {// 检查并过滤掉不利状态
                                        if ('hidden' == args[0]) return
                                        else return Reflect.apply(target, thisArg, args); // 使用Reflect.apply执行原始方法
                                    }
                                });//死亡抗性
                            }//死亡抗性
                        }//抗性
                    },
                    trigger: {
                        player: ['changeHp'],
                        global: ['roundStart'],
                    },
                    forced: true,
                    audio: 'ext:温柔一刀/audio:32',
                    content: function () {
                        'step 0'
                        event.count = (trigger.num ? Math.abs(trigger.num) : 1);
                        'step 1'
                        event.count--;
                        if (Math.random() < 0.6) {
                            player.node.avatar.style.backgroundImage = `url('${lib.assetURL}extension/温柔一刀/image/李白1.jpg')`;
                            ui.background.setBackgroundImage('extension/温柔一刀/image/李白4.jpg');
                        }
                        else {
                            player.node.avatar.setBackgroundImage('extension/温柔一刀/image/李白2.jpg');
                            ui.background.setBackgroundImage('extension/温柔一刀/image/李白3.jpg');
                        }
                        game.addVideo('jiuNode', player, true);
                        if (!player.storage.jiu) player.storage.jiu = 0;
                        player.storage.jiu += 1
                        //if (player.hp < -1) player.hp = 1;
                        player.markSkill('jiu');
                        player.updateMarks();
                        game.broadcastAll(function (player) {
                            if (!player.node.jiu && lib.config.jiu_effect) {
                                player.node.jiu = ui.create.div('.playerjiu', player.node.avatar);
                                player.node.jiu2 = ui.create.div('.playerjiu', player.node.avatar2);
                            }
                        }, player);
                        'step 2'
                        var T = [];
                        for (var i of ui.cardPile.childNodes) {
                            if (get.tag(i, 'damage') || get.name(i) == 'tao' || get.name(i) == 'jiu' || get.name(i) == 'sha') T.push(i);
                        }
                        if (T.length) {
                            var A = T.randomGet();
                            game.log(`<span class="greentext">${get.translation(player)}<醉酒狂诗>${get.translation(A)}</span>`);
                            game.diren = game.filterPlayer(function (current) {
                                return !current.isFriendsOf(player);
                            });
                            if (get.name(A) == 'tao' || get.name(A) == 'jiu') player.changeHp(1);
                            else {
                                player.useCard(A, game.diren.randomGet(), false);
                                ui.discardPile.insertBefore(A, ui.discardPile.firstChild);
                            }
                        }
                        'step 3'
                        var W = [];
                        for (var i of Array.from(ui.discardPile.childNodes).concat(Array.from(ui.ordering.childNodes))) {
                            if (get.tag(i, 'damage') || get.name(i) == 'tao' || get.name(i) == 'jiu' || get.name(i) == 'sha') W.push(i);
                        }
                        player.logSkill('醉诗')
                        if (W.length) {
                            var A = W.randomGet();
                            game.log(`<span class="greentext">${get.translation(player)}<青莲剑仙>${get.translation(A)}</span>`);
                            if (get.name(A) == 'tao' || get.name(A) == 'jiu') player.changeHp(1);
                            else {
                                player.useCard(A, game.diren.randomGet(), false);
                                ui.discardPile.insertBefore(A, ui.discardPile.firstChild);
                            }
                        }
                        'step 4'
                        if (event.count > 0) event.goto(1);
                    },
                    ai: {
                        maixie: true,
                        unequip: true,
                    },
                }
            },
            configurable: false,
        });//醉诗
        Reflect.defineProperty(lib.skill, '醉诗_1', {
            get() {
                return {
                    trigger: {
                        source: ['damageBefore'],
                        player: ['useCardBefore'],
                    },
                    silent: true,
                    forced: true,
                    firstDo: true,
                    content: function () {
                        if (trigger.name == 'damage') {
                            Reflect.defineProperty(trigger, 'finished', {
                                get: () => trigger.step > 5,
                                set() { },
                            });
                        }
                        if (trigger.name == 'useCard') {
                            Reflect.defineProperty(trigger, 'finished', {
                                get: () => trigger.step > 16,
                                set() { },
                            });
                            Reflect.defineProperty(trigger, 'excluded', {
                                get: () => [],
                            });
                            Reflect.defineProperty(trigger, 'all_excluded', {
                                get() { return false },
                            });
                            if (get.tag(trigger.card, 'damage')) {
                                Reflect.defineProperty(trigger, 'targets', {
                                    get() {
                                        return game.filterPlayer(function (current) {
                                            return !current.isFriendsOf(player);
                                        });
                                    },
                                });
                            }//用牌击穿
                        }
                    },
                };
            },
            configurable: false,
        });//醉诗_1
        Reflect.defineProperty(lib.skill, 'jiwu', {
            get() {
                return {
                    mod: {
                        aiOrder: (player, card, num) => {
                            if (get.type(card) == 'equip' && !player.getEquips(get.subtype(card)).length) return 15;
                            if (get.type(card) == 'equip' && player.getEquips(get.subtype(card)).length) return 1;
                        },
                    },
                    derivation: ['qiangxix', 'retieji', 'olxuanfeng', 'rewansha'],
                    audio: 2,
                    enable: 'phaseUse',
                    filter: function (event, player) {
                        if (player.countCards('he') == 0) return false;
                        if (player.hasSkill('qiangxix') && player.hasSkill('retieji') && player.hasSkill('olxuanfeng') && player.hasSkill('rewansha')) return false;
                        return true;
                    },
                    filterCard: true,
                    position: 'he',
                    check: function (card, player) {
                        if (get.subtype(card) == 'equip1') return (6 - get.value(card)) / 6;
                        var player = _status.event.player;
                        if (get.position(card) == 'e' && player.hasSkill('olxuanfeng')
                            && game.hasPlayer(Q => Q.countCards('he') > 0 && !Q.isFriendsOf(player))) return 70 - get.value(card);
                        if (get.type(card) == 'equip') return (6 - get.value(card)) / 6;
                        if (get.name(card) == 'sha' && player.countCards('h', { name: 'sha' }) < 3) return (6 - get.value(card)) / 6;
                        return 9 - get.value(card);
                    },
                    content: function () {
                        'step 0'
                        var list = [];
                        if (!player.hasSkill('qiangxix')) list.push('qiangxix');
                        if (!player.hasSkill('retieji')) list.push('retieji');
                        if (!player.hasSkill('olxuanfeng')) list.push('olxuanfeng');
                        if (!player.hasSkill('rewansha')) list.push('rewansha');
                        if (list.length == 1) {
                            player.addTempSkills(list[0]);
                            event.finish();
                        }
                        else {
                            player.chooseControl(list, function () {
                                if (list.includes('olxuanfeng') && player.countCards('he', { type: 'equip' })
                                    && game.hasPlayer(Q => Q.countCards('he') > 0 && !Q.isFriendsOf(player))) return 'olxuanfeng';
                                if (list.includes('qiangxix') && (game.hasPlayer(Q => player.hp > Q.hp && !Q.isFriendsOf(player)) || player.countCards('he', { subtype: 'equip1' }))) return 'qiangxix';
                                if (list.includes('retieji') && player.hasSha()) return 'retieji';
                                if (list.includes('rewansha') && game.filterPlayer().filter(Q => !Q.isFriendsOf(player)).length >= 2) return 'rewansha';
                            }).set('prompt', '选择获得一项技能直到回合结束');
                        }
                        'step 1'
                        player.addTempSkills(result.control);
                    },
                    ai: {
                        order: function () {
                            var player = _status.event.player;
                            if (player.countCards('he', { type: 'equip' }) && !player.hasSkill('olxuanfeng')) return 99;
                            if (player.countCards('e') && !player.hasSkill('retieji')) return 13;
                            if (player.countCards('e') && !player.hasSkill('qiangxix')) return 13;
                            if (player.countCards('e') && !player.hasSkill('rewansha')) return 13;
                            return 10;
                        },
                        result: {
                            player: function (player) {
                                if (player.countCards('he', { type: 'equip' }) && !player.hasSkill('olxuanfeng')
                                    && game.hasPlayer(Q => Q.countCards('he') > 0 && !Q.isFriendsOf(player))) return 1;
                                if (!player.hasSkill('qiangxix') && (game.hasPlayer(Q => player.hp > Q.hp && !Q.isFriendsOf(player)) || player.countCards('he', { subtype: 'equip1' }))) return 1;
                                if (!player.hasSkill('retieji') && player.hasSha()) return 1;
                                if (!player.hasSkill('rewansha') && game.filterPlayer().filter(Q => !Q.isFriendsOf(player)).length >= 2) return 1;
                                return 0;
                            },
                        },
                    },
                };
            },
            set() { },
        });//极武AI优化
        Reflect.defineProperty(lib.skill, 'boss_zhangwu', {
            get() {
                return {
                    global: 'boss_zhangwu_ai',
                    trigger: { player: 'damageEnd' },
                    check: function (event, player) {
                        return (
                            event.source &&
                            event.source.isIn() &&
                            get.damageEffect(event.source, player, player) > 0
                        );
                    },
                    filter: function (event, player) {
                        return event.source && event.source.isAlive();
                    },
                    direct: true,
                    logTarget: 'source',
                    content: function () {
                        'step 0';
                        player
                            .chooseToDiscard(get.prompt('boss_zhangwu', trigger.source), 'he', [1, Infinity])
                            .set('ai', function (card) {
                                if (get.attitude(player, trigger.source) < 0) return 8 - get.value(card);
                                return 0;
                            })
                            .set('logSkill', ['boss_zhangwu', trigger.source]);
                        'step 1';
                        if (result.bool) {
                            var num = result.cards.length;
                            var cnum = get.cnNumber(num);
                            event.num = num;
                            trigger.source
                                .chooseToDiscard(
                                    'he',
                                    `章武:弃置${cnum}张牌,或取消并受到${cnum}点伤害`,
                                    num
                                )
                                .set('ai', function (card) {
                                    if (!trigger.source.hasSkillTag('nodamage')) return 10 - get.value(card);
                                    return 0;
                                });
                        }
                        else {
                            event.finish();
                        }
                        'step 2';
                        if (!result.bool) {
                            trigger.source.damage(event.num);
                        }
                    },
                    ai: {
                        maixie: true,
                        maixie_hp: true,
                        effect: {
                            target: function (card, player, target) {
                                if (
                                    get.tag(card, 'damage') &&
                                    get.attitude(target, player) < 0 &&
                                    player.countCards('he') < target.countCards('he')
                                ) {
                                    return [0, 2];
                                }
                            },
                        },
                    },
                };
            },
            set() { },
        });//章武AI优化      
        Reflect.defineProperty(lib.skill, 'boss_biantian', {
            get() {
                return {
                    trigger: { player: 'phaseBegin' },
                    forced: true,
                    unique: true,
                    audio: false,
                    group: 'boss_biantian4',
                    content: function () {
                        'step 0';
                        for (var i = 0; i < game.players.length; i++) {
                            if (game.players[i].hasSkill('boss_biantian3')) {
                                game.players[i].removeSkill('boss_biantian3');
                                game.players[i].popup('boss_biantian3');
                            }
                            if (game.players[i].hasSkill('boss_biantian2')) {
                                game.players[i].removeSkill('boss_biantian2');
                                game.players[i].popup('boss_biantian2');
                            }
                        }
                        player.judge(function (card) {
                            var color = get.color(card);
                            if (color == 'black') return 1;
                            if (color == 'red') return 0;
                            return -1;
                        });
                        'step 1';
                        var targets = [],
                            players = game.filterPlayer();
                        if (result.color == 'red') {
                            for (var i = 0; i < players.length; i++) {
                                if (!players[i].isFriendOf(player)) {
                                    players[i].addSkill('boss_biantian3');
                                    players[i].popup('kuangfeng');
                                    targets.push(players[i]);
                                }
                            }
                            player.logSkill('kuangfeng', targets, 'fire');
                        }
                        else if (result.color == 'black') {
                            for (var i = 0; i < players.length; i++) {
                                if (players[i].isFriendOf(player)) {
                                    players[i].addSkill('boss_biantian2');
                                    players[i].popup('dawu');
                                    targets.push(players[i]);
                                }
                            }
                            player.logSkill('dawu', targets, 'thunder');
                        }
                    },
                    ai: {
                        threaten: 1.6,
                    },
                };
            },
            set() { },
        });
        Reflect.defineProperty(lib.skill, 'xiangxing', {
            get() {
                return {
                    unique: true,
                    init: function (player) {
                        player.storage.xiangxing = 7;
                        player.storage.xiangxing_count = 0;
                    },
                    mark: true,
                    intro: {
                        content: '当前有#枚星',
                    },
                    trigger: { player: ['damageEnd', 'loseHpEnd'] },
                    forced: true,
                    popup: false,
                    content: function () {
                        'step 0';
                        var num = trigger.num;
                        if (num > 0) {
                            player.storage.xiangxing_count += num;
                        }
                        if (player.storage.xiangxing_count >= 7) {
                            if (
                                player.hasSkill('yueyin') &&
                                lib.skill.yueyin.skipDamage[`x${player.storage.xiangxing}`](player, trigger)
                            ) {
                                event.goto(3);
                            }
                            player.storage.xiangxing--;
                            player.storage.xiangxing_count = 0;
                            player.updateMarks();
                            if (!player.storage.xiangxing) {
                                player.awakenSkill('xiangxing');
                            }
                            player.popup('xiangxing');
                            game.log(player, '失去了一枚星');
                        }
                        else {
                            player.updateMarks();
                            event.finish();
                        }
                        'step 1';
                        var list = game.filterPlayer();
                        list.remove(player);
                        list.sort(lib.sort.seat);
                        var list2 = [];
                        for (var i = 0; i < list.length; i++) {
                            list2.push(0);
                        }
                        for (var i = 0; i < 7; i++) {
                            list2[Math.floor(Math.random() * list2.length)]++;
                        }
                        event.list = list;
                        event.list2 = list2;
                        'step 2';
                        if (event.list.length) {
                            var target = event.list.shift();
                            target.damage(event.list2.shift(), 'thunder');
                            player.line(target, 'thunder');
                            event.redo();
                        }
                        'step 3';
                        if (player.storage.xiangxing == 0) {
                            player.maxHp = 3;
                            player.update();
                        }
                    },
                };
            },
            set() { },
        });
        lib.translate.醉诗_info = '每轮开始时或当你体力值变化后,你可以视为使用一张<酒>并随机使用牌堆中一张伤害牌,然后你随机使用弃牌堆或处理区中一张伤害牌';
        lib.translate.评鉴_info = '在很多时机,你都可以尝试运行一个对应时机技能的content';
        lib.translate.评鉴伤害_info = '在很多时机,你都可以尝试运行一个对应时机技能的content';
    }//锁几个技能玩玩
    if (true) {
        if (lib.config.extension_温柔一刀_全局技能拦截) {
            lib.hook = new Proxy(lib.hook, {
                get: function (u, i) {
                    if (i == 'globalskill') {
                        return new Proxy(u[i], {
                            get: function (u, i) {
                                return [];
                            },
                        });
                    }
                    return u[i];
                },
                set: (u, i, value) => {
                    u[i] = value;
                },
                defineProperty: () => false,
                deleteProperty: () => false,
            });
        }//全局技能拦截
        if (lib.config.extension_温柔一刀_技能拦截) {
            lib.skill = new Proxy(lib.skill, {
                get: function (u, i) {
                    if (i == 'global') {
                        return [];
                    }
                    u[i] = {};
                    return new Proxy(u[i], {
                        get: function (u, i) {
                            if ([
                                'markimage', 'markimage2', 'group', 'mode', 'usable', 'viewAs', 'inherit', 'priority', 'global', 'name', 'init', 'init2', 'mark', 'onChooseToUse', 'mod', 'changeTarget', 'subfrequent', 'limited', 'onChooseToRespond'
                            ].includes(i)) return false;
                            if ([
                                'content', 'contentBefore'
                            ].includes(i)) return () => { };
                            u[i] = {};
                            return new Proxy(u[i], {
                                get: function (u, i) {
                                    if ([
                                        'markcount', 'skillTagFilter', 'player'
                                    ].includes(i)) return false;
                                    u[i] = {};
                                    return new Proxy(u[i], {
                                        get: function (u, i) {
                                            u[i] = {};
                                            return new Proxy(u[i], {
                                                get: function (u, i) {
                                                    return {};
                                                },
                                                set() { },
                                            });
                                        },
                                        set() { },
                                    });
                                },
                                set() { },
                            });
                        },
                        set() { },
                    });
                },
                set: (u, i, value) => {
                    u[i] = value;
                },
                defineProperty: () => true,
                deleteProperty: () => true,
            });
        }//技能拦截
        if (lib.config.extension_温柔一刀_托管) {
            if (window._status) {
                Reflect.defineProperty(window._status, 'auto', {
                    get: () => true,
                    set() { },
                    configurable: false,
                });
            }//托管
        }//托管
        Reflect.defineProperty(lib.element.player, 'reinit', {
            get: () => function (from, to) {
                this.name1 = to;
                this.name = to;
                this.sex = lib.character[to][0];
                this.changeGroup(lib.character[to][1], false);
                for (var i of lib.character[to][3]) {
                    var info = lib.skill[i];
                    if (info && info.zhuSkill && !this.isZhu2()) continue;
                    this.addSkill(i);
                }
                this.maxHp = get.infoMaxHp(lib.character[to][2]);
                game.broadcast(function (player, to, skills) {
                    player.applySkills(skills);
                }, this, to, get.skillState(this));
                game.addVideo('reinit3', this, {
                    to: to,
                    hp: this.maxHp,
                    avatar2: this.name2 == to
                });
                this.smoothAvatar(false);
                this.node.avatar.setBackground(to, 'character');
                this.node.name.innerHTML = get.slimName(to);
                if (this == game.me && ui.fakeme) {
                    ui.fakeme.style.backgroundImage = this.node.avatar.style.backgroundImage;
                }
                this.update();
            },//覆盖本体变身函数
            set() { },
            //configurable: false,
        });//覆盖本体变身函数
        if (lib.config.extension_温柔一刀_禁止封禁出牌) {
            Reflect.defineProperty(game, 'checkMod', {
                get: () => function () {
                    const Q = Array.from(arguments);
                    const card = Q[0];
                    const player1 = Q[1];
                    let unchanged = Q[Q.length - 3];
                    const name = Q[Q.length - 2];
                    let player2 = Q[Q.length - 1];
                    if (name == 'targetInRange') return true;//无距离限制使用牌
                    if (name == 'cardUsable') return true;//无次数限制使用牌
                    if (typeof player2 === 'object') return unchanged;//无视自身mod使用牌
                    if (typeof player1 === 'object') return unchanged;//无视对方mod使用牌
                    if (typeof player2.getModableSkills == 'function') {
                        player2 = player2.getModableSkills();
                    }
                    else if (typeof player2.getSkills == 'function') {
                        player2 = player2.getSkills().concat(lib.skill.global);
                        game.expandSkills(player2);
                        player2 = player2.filter(function (skill) {
                            var info = get.info(skill);
                            return info && info.mod;
                        });
                        player2.sort((a, b) => get.priority(a) - get.priority(b));
                    }
                    const A = Q.slice(0, -2);
                    player2.forEach(value => {
                        var mod = get.info(value).mod[name];
                        if (!mod) return;
                        const result = mod.call(this, ...A);
                        if (result != undefined && typeof unchanged != 'object') {
                            unchanged = result;
                            A[A.length - 1] = result;
                        };
                    });
                    return unchanged;
                },
                set() { },
                configurable: false,
            });//禁止封禁出牌
        }//所有人都不能被禁止出牌
        if (lib.config.extension_温柔一刀_武将全部可选) {
            Reflect.defineProperty(lib.filter, 'characterDisabled', {
                get: () => function (i) {
                    return !lib.character[i];
                },
                set() { },
            });//取消禁将
            lib.filter.characterDisabled2 = function (i) {
                return !lib.character[i];
            };//取消禁将
            get.gainableSkills = function (func, player) {
                var list = [];
                for (var i in lib.character) {
                    for (var j = 0; j < lib.character[i][3].length; j++) {
                        list.add(lib.character[i][3][j]);
                    }
                }
                return list;
            };//BOSS选将
            get.gainableSkillsName = function (name, func) {
                var list = [];
                if (name && lib.character[name]) {
                    for (var j = 0; j < lib.character[name][3].length; j++) {
                        list.add(lib.character[name][3][j]);
                    }
                }
                return list;
            };//BOSS选将
            Reflect.defineProperty(ui.create, 'characterDialog', {
                get: () => function () {
                    var filter, str, noclick, thisiscard, seperate, expandall, onlypack, heightset, precharacter, characterx;
                    for (var i = 0; i < arguments.length; i++) {
                        if (arguments[i] === 'thisiscard') {
                            thisiscard = true;
                        }
                        else if (arguments[i] === 'expandall') {
                            expandall = true;
                        }
                        else if (arguments[i] === 'heightset') {
                            heightset = true;
                        }
                        else if (arguments[i] == 'precharacter') {
                            precharacter = true;
                        }
                        else if (arguments[i] == 'characterx') {
                            characterx = true;
                        }
                        else if (typeof arguments[i] == 'string' && arguments[i].startsWith('onlypack:')) {
                            onlypack = arguments[i].slice(9);
                        }
                        else if (typeof arguments[i] == 'object' && typeof arguments[i].seperate == 'function') {
                            seperate = arguments[i].seperate;
                        }
                        else if (typeof arguments[i] === 'string') {
                            str = arguments[i];
                        }
                        else if (typeof arguments[i] === 'function') {
                            filter = arguments[i];
                        }
                        else if (typeof arguments[i] == 'boolean') {
                            noclick = arguments[i];
                        }
                    }
                    var list = [];
                    const groups = [];
                    var dialog;
                    var node = ui.create.div('.caption.pointerspan');
                    if (get.is.phoneLayout()) {
                        node.style.fontSize = '30px';
                    }
                    var namecapt = [];
                    var getCapt = function (str) {
                        var capt;
                        if (str.indexOf('_') == -1) {
                            capt = str[0];
                        }
                        else {
                            capt = str[str.lastIndexOf('_') + 1];
                        }
                        capt = capt.toLowerCase();
                        if (!/[a-z]/i.test(capt)) {
                            capt = '自定义';
                        }
                        return capt;
                    };
                    if (thisiscard) {
                        for (var i in lib.card) {
                            if (!lib.translate[`${i}_info`]) continue;
                            if (filter && filter(i)) continue;
                            list.push(['', get.translation(lib.card[i].type), i]);
                            if (namecapt.indexOf(getCapt(i)) == -1) {
                                namecapt.push(getCapt(i));
                            }
                        }
                    }
                    else {
                        var groupnum = {};
                        for (var i in lib.character) {
                            list.push(i);
                            if (get.is.double(i)) {
                                groups.add('double');
                            }
                            else {
                                const Q = lib.character[i][1];
                                if (!groupnum[Q]) groupnum[Q] = 0;
                                groupnum[Q]++;
                                if (groupnum[Q] > 20) {
                                    groups.add(lib.character[i][1]);
                                }//删除多余势力
                            }//删除多余势力
                            if (namecapt.indexOf(getCapt(i)) == -1) {
                                namecapt.push(getCapt(i));
                            }
                        }
                    }//删除多余势力
                    namecapt.sort(function (a, b) {
                        return a > b ? 1 : -1;
                    });
                    groups.sort(lib.sort.group);
                    if (!thisiscard) {
                        namecapt.remove('自定义');
                        namecapt.push('newline');
                        for (var i in lib.characterDialogGroup) {
                            namecapt.push(i);
                        }
                    }
                    var newlined = false;
                    var newlined2;
                    var packsource;
                    var clickCapt = function (e) {
                        if (_status.dragged) return;
                        if (dialog.currentcapt2 == '最近' && dialog.currentcaptnode2 != this && !dialog.currentcaptnode2.inited) {
                            dialog.currentcapt2 = null;
                            dialog.currentcaptnode2.classList.remove('thundertext');
                            dialog.currentcaptnode2.inited = true;
                            dialog.currentcaptnode2 = null;
                        }
                        if (this.alphabet) {
                            if (this.classList.contains('thundertext')) {
                                dialog.currentcapt = null;
                                dialog.currentcaptnode = null;
                                this.classList.remove('thundertext');
                                if (this.touchlink) {
                                    this.touchlink.classList.remove('active');
                                }
                                for (var i = 0; i < dialog.buttons.length; i++) {
                                    if (dialog.currentgroup && dialog.buttons[i].group != dialog.currentgroup) {
                                        dialog.buttons[i].classList.add('nodisplay');
                                    }
                                    else if (dialog.currentcapt2 && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt, true)) {
                                        dialog.buttons[i].classList.add('nodisplay');
                                    }
                                    else {
                                        dialog.buttons[i].classList.remove('nodisplay');
                                    }
                                }
                            }
                            else {
                                if (dialog.currentcaptnode) {
                                    dialog.currentcaptnode.classList.remove('thundertext');
                                    if (dialog.currentcaptnode.touchlink) {
                                        dialog.currentcaptnode.touchlink.classList.remove('active');
                                    }
                                }
                                dialog.currentcapt = this.link;
                                dialog.currentcaptnode = this;
                                this.classList.add('thundertext');
                                if (this.touchlink) {
                                    this.touchlink.classList.add('active');
                                }
                                for (var i = 0; i < dialog.buttons.length; i++) {
                                    if (dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt)) {
                                        dialog.buttons[i].classList.add('nodisplay');
                                    }
                                    else if (dialog.currentcapt2 && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt, true)) {
                                        dialog.buttons[i].classList.add('nodisplay');
                                    }
                                    else if (dialog.currentgroup && dialog.buttons[i].group != dialog.currentgroup) {
                                        dialog.buttons[i].classList.add('nodisplay');
                                    }
                                    else {
                                        dialog.buttons[i].classList.remove('nodisplay');
                                    }
                                }
                            }
                        }
                        else {
                            if (newlined2) {
                                newlined2.style.display = 'none';
                                if (!packsource.onlypack) {
                                    packsource.classList.remove('thundertext');
                                    if (!get.is.phoneLayout() || !lib.config.filternode_button) {
                                        packsource.innerHTML = '武将包';
                                    }
                                }
                            }
                            if (this.classList.contains('thundertext')) {
                                dialog.currentcapt2 = null;
                                dialog.currentcaptnode2 = null;
                                this.classList.remove('thundertext');
                                if (this.touchlink) {
                                    this.touchlink.classList.remove('active');
                                }
                                for (var i = 0; i < dialog.buttons.length; i++) {
                                    if (dialog.currentgroup && dialog.buttons[i].group != dialog.currentgroup) {
                                        dialog.buttons[i].classList.add('nodisplay');
                                    }
                                    else if (dialog.currentcapt && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt)) {
                                        dialog.buttons[i].classList.add('nodisplay');
                                    }
                                    else {
                                        dialog.buttons[i].classList.remove('nodisplay');
                                    }
                                }
                            }
                            else {
                                if (dialog.currentcaptnode2) {
                                    dialog.currentcaptnode2.classList.remove('thundertext');
                                    if (dialog.currentcaptnode2.touchlink) {
                                        dialog.currentcaptnode2.touchlink.classList.remove('active');
                                    }
                                }
                                dialog.currentcapt2 = this.link;
                                dialog.currentcaptnode2 = this;
                                this.classList.add('thundertext');
                                if (this.touchlink) {
                                    this.touchlink.classList.add('active');
                                }
                                else if (this.parentNode == newlined2) {
                                    packsource.innerHTML = this.innerHTML;
                                    packsource.classList.add('thundertext');
                                }
                                for (var i = 0; i < dialog.buttons.length; i++) {
                                    if (dialog.currentcapt && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt)) {
                                        dialog.buttons[i].classList.add('nodisplay');
                                    }
                                    else if (dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt, true)) {
                                        dialog.buttons[i].classList.add('nodisplay');
                                    }
                                    else if (dialog.currentgroup && dialog.buttons[i].group != dialog.currentgroup) {
                                        dialog.buttons[i].classList.add('nodisplay');
                                    }
                                    else {
                                        if (dialog.buttons[i].activate) {
                                            dialog.buttons[i].activate();
                                        }
                                        dialog.buttons[i].classList.remove('nodisplay');
                                    }
                                }
                            }
                        }
                        if (dialog.seperate) {
                            for (var i = 0; i < dialog.seperate.length; i++) {
                                if (!dialog.seperate[i].nextSibling.querySelector('.button:not(.nodisplay)')) {
                                    dialog.seperate[i].style.display = 'none';
                                    dialog.seperate[i].nextSibling.style.display = 'none';
                                }
                                else {
                                    dialog.seperate[i].style.display = '';
                                    dialog.seperate[i].nextSibling.style.display = '';
                                }
                            }
                        }
                        if (filternode) {
                            if (filternode.querySelector('.active')) {
                                packsource.classList.add('thundertext');
                            }
                            else {
                                packsource.classList.remove('thundertext');
                            }
                        }
                        if (e) e.stopPropagation();
                    };
                    for (var i = 0; i < namecapt.length; i++) {
                        if (namecapt[i] == 'newline') {
                            newlined = document.createElement('div');
                            newlined.style.marginTop = '5px';
                            newlined.style.display = 'block';
                            if (get.is.phoneLayout()) {
                                newlined.style.fontSize = '32px';
                            }
                            else {
                                newlined.style.fontSize = '22px';
                            }
                            newlined.style.textAlign = 'center';
                            node.appendChild(newlined);
                        }
                        else if (newlined) {
                            var span = ui.create.div('.tdnode.pointerdiv.shadowed.reduce_radius');
                            span.style.margin = '3px';
                            span.style.width = 'auto';
                            span.innerHTML = ` ${namecapt[i].toUpperCase()} `;
                            span.link = namecapt[i];
                            span.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', clickCapt);
                            newlined.appendChild(span);
                            node[namecapt[i]] = span;
                            if (namecapt[i] == '收藏') {
                                span._nature = 'fire';
                            }
                            else {
                                span._nature = 'wood';
                            }
                        }
                        else {
                            var span = document.createElement('span');
                            span.innerHTML = ` ${namecapt[i].toUpperCase()} `;
                            span.link = namecapt[i];
                            span.alphabet = true;
                            span.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', clickCapt);
                            node.appendChild(span);
                        }
                    }
                    if (!thisiscard) {
                        var natures = ['water', 'soil', 'wood', 'metal'];
                        var span = document.createElement('span');
                        newlined.appendChild(span);
                        span.style.margin = '8px';
                        var clickGroup = function () {
                            if (_status.dragged) return;
                            if (dialog.currentcapt2 == '最近' && dialog.currentcaptnode2 != this && !dialog.currentcaptnode2.inited) {
                                dialog.currentcapt2 = null;
                                dialog.currentcaptnode2.classList.remove('thundertext');
                                dialog.currentcaptnode2.inited = true;
                                dialog.currentcaptnode2 = null;
                            }
                            var node = this, link = this.link;
                            if (node.classList.contains('thundertext')) {
                                dialog.currentgroup = null;
                                dialog.currentgroupnode = null;
                                node.classList.remove('thundertext');
                                for (var i = 0; i < dialog.buttons.length; i++) {
                                    if (dialog.currentcapt && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt)) {
                                        dialog.buttons[i].classList.add('nodisplay');
                                    }
                                    else if (dialog.currentcapt2 && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt, true)) {
                                        dialog.buttons[i].classList.add('nodisplay');
                                    }
                                    else {
                                        dialog.buttons[i].classList.remove('nodisplay');
                                    }
                                }
                            }
                            else {
                                if (dialog.currentgroupnode) {
                                    dialog.currentgroupnode.classList.remove('thundertext');
                                }
                                dialog.currentgroup = link;
                                dialog.currentgroupnode = node;
                                node.classList.add('thundertext');
                                for (var i = 0; i < dialog.buttons.length; i++) {
                                    if (dialog.currentcapt && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt)) {
                                        dialog.buttons[i].classList.add('nodisplay');
                                    }
                                    else if (dialog.currentcapt2 && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt, true)) {
                                        dialog.buttons[i].classList.add('nodisplay');
                                    }
                                    else if (dialog.currentgroup == 'double') {
                                        if (dialog.buttons[i]._changeGroup) dialog.buttons[i].classList.remove('nodisplay');
                                        else dialog.buttons[i].classList.add('nodisplay');
                                    }
                                    else if (dialog.currentgroup == 'ye') {
                                        if (dialog.buttons[i].group == 'ye') dialog.buttons[i].classList.remove('nodisplay');
                                        else dialog.buttons[i].classList.add('nodisplay');
                                    }
                                    else {
                                        if (dialog.buttons[i]._changeGroup || dialog.buttons[i].group != dialog.currentgroup) {
                                            dialog.buttons[i].classList.add('nodisplay');
                                        }
                                        else {
                                            dialog.buttons[i].classList.remove('nodisplay');
                                        }
                                    }
                                }
                            }
                        };
                        for (var i = 0; i < groups.length; i++) {
                            var span = ui.create.div('.tdnode.pointerdiv.shadowed.reduce_radius.reduce_margin');
                            span.style.margin = '3px';
                            newlined.appendChild(span);
                            span.innerHTML = get.translation(groups[i]);
                            span.link = groups[i];
                            span._nature = natures[i];
                            span.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', clickGroup);
                        }
                        var span = document.createElement('span');
                        newlined.appendChild(span);
                        span.style.margin = '8px';
                        packsource = ui.create.div('.tdnode.pointerdiv.shadowed.reduce_radius.reduce_margin');
                        packsource.style.margin = '3px';
                        newlined.appendChild(packsource);
                        var filternode = null;
                        var clickCaptNode = function (e) {
                            delete _status.filterCharacter;
                            ui.window.classList.remove('shortcutpaused');
                            filternode.delete();
                            filternode.classList.remove('shown');
                            clickCapt.call(this.link, e);
                        };
                        if (get.is.phoneLayout() && lib.config.filternode_button) {
                            newlined.style.marginTop = '';
                            packsource.innerHTML = '筛选';
                            filternode = ui.create.div('.popup-container.filter-character.modenopause');
                            ui.create.div(filternode);
                            filternode.listen(function (e) {
                                if (this.classList.contains('removing')) return;
                                delete _status.filterCharacter;
                                ui.window.classList.remove('shortcutpaused');
                                this.delete();
                                this.classList.remove('shown');
                                e.stopPropagation();
                            });
                            for (var i = 0; i < node.childElementCount; i++) {
                                if (node.childNodes[i].tagName.toLowerCase() == 'span') {
                                    node.childNodes[i].style.display = 'none';
                                    node.childNodes[i].touchlink = ui.create.div(filternode.firstChild, clickCaptNode, '.menubutton.large.capt', node.childNodes[i].innerHTML);
                                    node.childNodes[i].touchlink.link = node.childNodes[i];
                                }
                            }
                            ui.create.node('br', filternode.firstChild);
                        }
                        else {
                            if (onlypack) {
                                packsource.onlypack = true;
                                packsource.innerHTML = get.translation(onlypack + '_character_config');
                                packsource.style.display = 'none';
                                packsource.previousSibling.style.display = 'none';
                            }
                            else {
                                packsource.innerHTML = '武将包';
                            }
                        }
                        newlined2 = document.createElement('div');
                        newlined2.style.marginTop = '5px';
                        newlined2.style.display = 'none';
                        newlined2.style.fontFamily = 'xinwei';
                        newlined2.classList.add('pointernode');
                        if (get.is.phoneLayout()) {
                            newlined2.style.fontSize = '32px';
                        }
                        else {
                            newlined2.style.fontSize = '22px';
                        }
                        newlined2.style.textAlign = 'center';
                        node.appendChild(newlined2);
                        packsource.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
                            if (packsource.onlypack) return;
                            if (_status.dragged) return;
                            if (get.is.phoneLayout() && lib.config.filternode_button && filternode) {
                                _status.filterCharacter = true;
                                ui.window.classList.add('shortcutpaused');
                                ui.window.appendChild(filternode);
                                ui.refresh(filternode);
                                filternode.classList.add('shown');
                                var dh = filternode.offsetHeight - filternode.firstChild.offsetHeight;
                                if (dh > 0) {
                                    filternode.firstChild.style.top = (dh / 2) + 'px';
                                }
                                else {
                                    filternode.firstChild.style.top = '';
                                }
                            }
                            else {
                                if (newlined2.style.display == 'none') {
                                    newlined2.style.display = 'block';
                                }
                                else {
                                    newlined2.style.display = 'none';
                                }
                            }
                        });
                        var packlist = [];
                        for (var i = 0; i < lib.config.all.characters.length; i++) {
                            if (!lib.config.characters.includes(lib.config.all.characters[i])) continue;
                            packlist.push(lib.config.all.characters[i]);
                        }
                        for (var i in lib.characterPack) {
                            if (lib.config.characters.includes(i) && !lib.config.all.characters.includes(i)) {
                                packlist.push(i);
                            }
                        }
                        for (var i = 0; i < packlist.length; i++) {
                            var span = document.createElement('div');
                            span.style.display = 'inline-block';
                            span.style.width = 'auto';
                            span.style.margin = '5px';
                            if (get.is.phoneLayout()) {
                                span.style.fontSize = '32px';
                            }
                            else {
                                span.style.fontSize = '22px';
                            }
                            span.innerHTML = lib.translate[packlist[i] + '_character_config'];
                            span.link = packlist[i];
                            span.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', clickCapt);
                            newlined2.appendChild(span);
                            if (filternode && !onlypack) {
                                span.touchlink = ui.create.div(filternode.firstChild, clickCaptNode, '.menubutton.large', span.innerHTML);
                                span.touchlink.link = span;
                            }
                        }
                    }
                    var groupSort;
                    if (thisiscard) {
                        groupSort = function (name) {
                            var type = lib.card[name[2]].type;
                            if (lib.cardType[type]) {
                                return lib.cardType[type];
                            }
                            switch (type) {
                                case 'basic': return 0;
                                case 'chess': return 1.5;
                                case 'trick': return 2;
                                case 'delay': return 3;
                                case 'equip': return 4;
                                case 'zhenfa': return 5;
                                default: return 6;
                            }
                        };
                        list.sort(function (a, b) {
                            var del = groupSort(a) - groupSort(b);
                            if (del != 0) return del;
                            var aa = a, bb = b;
                            if (a.includes('_')) {
                                a = a.slice(a.lastIndexOf('_') + 1);
                            }
                            if (b.includes('_')) {
                                b = b.slice(b.lastIndexOf('_') + 1);
                            }
                            if (a != b) {
                                return a > b ? 1 : -1;
                            }
                            return aa > bb ? 1 : -1;
                        });
                    }
                    else {
                        list.sort(lib.sort.character);
                    }
                    dialog = ui.create.dialog('hidden');
                    dialog.classList.add('noupdate');
                    dialog.classList.add('scroll1');
                    dialog.classList.add('scroll2');
                    dialog.classList.add('scroll3');
                    dialog.addEventListener(lib.config.touchscreen ? 'touchend' : 'mouseup', function () {
                        _status.clicked2 = true;
                    });
                    if (heightset) {
                        dialog.style.height = ((game.layout == 'long2' || game.layout == 'nova') ? 380 : 350) + 'px';
                        dialog._scrollset = true;
                    }
                    dialog.getCurrentCapt = function (link, capt, noalph) {
                        var currentcapt = noalph ? this.currentcapt2 : this.currentcapt;
                        if (this.seperatelist && noalph) {
                            if (this.seperatelist[currentcapt].includes(link)) return capt;
                            return null;
                        }
                        if (lib.characterDialogGroup[currentcapt]) {
                            return lib.characterDialogGroup[currentcapt](link, capt);
                        }
                        if (lib.characterPack[currentcapt]) {
                            if (lib.characterPack[currentcapt][link]) {
                                return capt;
                            }
                            return null;
                        }
                        return this.currentcapt;
                    };
                    if (str) {
                        dialog.add(str);
                    }
                    dialog.add(node);
                    if (thisiscard) {
                        if (seperate) {
                            seperate = seperate(list);
                            dialog.seperate = [];
                            dialog.seperatelist = seperate.list;
                            if (dialog.seperatelist) {
                                newlined = document.createElement('div');
                                newlined.style.marginTop = '5px';
                                newlined.style.display = 'block';
                                newlined.style.fontFamily = 'xinwei';
                                if (get.is.phoneLayout()) {
                                    newlined.style.fontSize = '32px';
                                }
                                else {
                                    newlined.style.fontSize = '22px';
                                }
                                newlined.style.textAlign = 'center';
                                node.appendChild(newlined);
                                for (var i in dialog.seperatelist) {
                                    var span = document.createElement('span');
                                    span.style.margin = '3px';
                                    span.innerHTML = i;
                                    span.link = i;
                                    span.seperate = true;
                                    span.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', clickCapt);
                                    newlined.appendChild(span);
                                }
                            }
                            for (var i in seperate) {
                                if (i == 'list') continue;
                                var link = '';
                                var linkcontent = seperate[i];
                                if (i.includes('_link:')) {
                                    link = i.slice(i.indexOf('_link:') + 6);
                                    i = i.slice(0, i.indexOf('_link:'));
                                }
                                var nodesep = dialog.add(i);
                                nodesep.link = link;
                                dialog.seperate.push(nodesep);
                                dialog.add([linkcontent, 'vcard'], noclick);
                            }
                        }
                        else {
                            dialog.add([list, 'vcard'], noclick);
                        }
                    }
                    else {
                        if (precharacter) {
                            dialog.add([list, 'precharacter'], noclick);
                        }
                        else if (characterx) {
                            dialog.add([list, 'characterx'], noclick);
                        }
                        else {
                            dialog.add([list, 'character'], noclick);
                        }
                    }
                    dialog.add(ui.create.div('.placeholder'));
                    for (var i = 0; i < dialog.buttons.length; i++) {
                        if (thisiscard) {
                            dialog.buttons[i].capt = getCapt(dialog.buttons[i].link[2]);
                        }
                        else {
                            dialog.buttons[i].group = lib.character[dialog.buttons[i].link][1];
                            dialog.buttons[i].capt = getCapt(dialog.buttons[i].link);
                        }
                    }
                    if (!expandall) {
                        if (!thisiscard && (lib.characterDialogGroup[lib.config.character_dialog_tool] ||
                            lib.config.character_dialog_tool == '自创')) {
                            clickCapt.call(node[lib.config.character_dialog_tool]);
                        }
                    }
                    //仅仅下面是新加的,by Curpond
                    let container = dialog.querySelector('.content-container>.content')
                    let Searcher = ui.create.div('.searcher.caption')
                    let input = document.createElement('input')
                    input.style.textAlign = 'center'
                    input.style.border = 'solid 2px #294510'
                    input.style.borderRadius = '6px'
                    input.style.fontWeight = 'bold'
                    input.style.fontSize = '21px'
                    let find = ui.create.button(['find', '搜索'], 'tdnodes')
                    find.style.display = 'inline'
                    let clickfind = function (e) {
                        e.stopPropagation()
                        let value = input.value
                        if (value == '') {
                            game.alert('搜索不能为空')
                            input.focus()
                            return
                        }
                        let list = []
                        for (let btn of dialog.buttons) {
                            if ((new RegExp(value, 'g').test(get.translation(btn.link)))) {
                                btn.classList.remove('nodisplay')
                            }
                            else {
                                btn.classList.add('nodisplay')
                            }
                        }
                    }
                    input.addEventListener('keyup', (e) => {
                        if (e.key == 'Enter') clickfind(e)
                    })
                    find.listen(clickfind)
                    Searcher.appendChild(input)
                    Searcher.appendChild(find)
                    container.prepend(Searcher)
                    return dialog;
                },
                set() { },
            });//选将列表修改
        }//武将全部可选
        Reflect.defineProperty(game, 'over', {
            get: () => function (result, bool) {
                if (game.门客秘境) {
                    if (game.hasPlayer(function (current) { return current.storage.随从 })) {
                        return;
                    }
                    if (!game.hasPlayer(function (current) { return current.storage.敌人 })) {
                        if (game.players.concat(game.dead).filter(Q => Q.storage.主人)[0].isFriendsOf(game.me._trueMe || game.me)) result = true;
                        else result = false;
                    }
                }
                if (_status.mode == 'dianjiang' && game.players.length > 1) return;
                if (lib.config.mode == 'QQQ' && game.players.length > 1) return;
                if (_status.over) return;
                if (game.me._trueMe) game.swapPlayer(game.me._trueMe);
                let j, k, num, table, tr, td, dialog;
                _status.over = true;
                ui.control.show();
                ui.clear();
                game.stopCountChoose();
                if (ui.time3) {
                    clearInterval(ui.time3.interval);
                }
                if ((game.layout == 'long2' || game.layout == 'nova') && !game.chess) {
                    ui.arena.classList.add('choose-character');
                    ui.me.hide();
                    ui.mebg.hide()
                    ui.autonode.hide();
                    if (lib.config.radius_size != 'off') {
                        ui.historybar.style.borderRadius = '0 0 0 4px';
                    }
                }
                if (game.online) {
                    let dialog = ui.create.dialog();
                    dialog.noforcebutton = true;
                    dialog.content.innerHTML = result;
                    dialog.forcebutton = true;
                    let result2 = arguments[1];
                    if (result2 == true) {
                        dialog.content.firstChild.innerHTML = '战斗胜利';
                    }
                    else if (result2 == false) {
                        dialog.content.firstChild.innerHTML = '战斗失败';
                    }
                    ui.update();
                    dialog.add(ui.create.div('.placeholder'));
                    for (var i = 0; i < game.players.length; i++) {
                        let hs = game.players[i].getCards('h');
                        if (hs.length) {
                            dialog.add(`<div class='text center'>'${get.translation(game.players[i])}'</div>`);
                            dialog.addSmall(hs);
                        }
                    }
                    for (let j = 0; j < game.dead.length; j++) {
                        let hs = game.dead[j].getCards('h');
                        if (hs.length) {
                            dialog.add(`<div class='text center'>'${get.translation(game.players[i])}'</div>`);
                            dialog.addSmall(hs);
                        }
                    }
                    dialog.add(ui.create.div('.placeholder.slim'));
                    if (lib.config.background_audio) {
                        if (result2 === true) {
                            game.playAudio('effect', 'win');
                        }
                        else if (result2 === false) {
                            game.playAudio('effect', 'lose');
                        }
                        else {
                            game.playAudio('effect', 'tie');
                        }
                    }
                    if (!ui.exit) {
                        ui.create.exit();
                    }
                    if (ui.giveup) {
                        ui.giveup.remove();
                        delete ui.giveup;
                    }
                    if (game.servermode) {
                        ui.exit.firstChild.innerHTML = '返回房间';
                        setTimeout(function () {
                            ui.exit.firstChild.innerHTML = '退出房间';
                            _status.roomtimeout = true;
                            lib.config.reconnect_info[2] = null;
                            game.saveConfig('reconnect_info', lib.config.reconnect_info);
                        }, 10000);
                    }
                    if (ui.tempnowuxie) {
                        ui.tempnowuxie.close();
                        delete ui.tempnowuxie;
                    }
                    if (ui.auto) ui.auto.hide();
                    if (ui.wuxie) ui.wuxie.hide();
                    if (game.getIdentityList) {
                        for (var i = 0; i < game.players.length; i++) {
                            game.players[i].setIdentity();
                        }
                    }
                    return;
                }
                if (lib.config.background_audio) {
                    if (result === true) {
                        game.playAudio('effect', 'win');
                    }
                    else if (result === false) {
                        game.playAudio('effect', 'lose');
                    }
                    else {
                        game.playAudio('effect', 'tie');
                    }
                }
                let resultbool = result;
                if (typeof resultbool !== 'boolean') {
                    resultbool = null;
                }
                if (result === true) result = '战斗胜利';
                if (result === false) result = '战斗失败';
                if (result == undefined) result = '战斗结束';
                dialog = ui.create.dialog(result);
                dialog.noforcebutton = true;
                dialog.forcebutton = true;
                if (game.addOverDialog) {
                    game.addOverDialog(dialog, result);
                }
                if (typeof _status.coin == 'number' && !_status.connectMode) {
                    let coeff = Math.random() * 0.4 + 0.8;
                    let added = 0;
                    let betWin = false;
                    if (result == '战斗胜利') {
                        if (_status.betWin) {
                            betWin = true;
                            _status.coin += 10;
                        }
                        _status.coin += 20;
                        if (_status.additionalReward) {
                            _status.coin += _status.additionalReward();
                        }
                        switch (lib.config.mode) {
                            case 'identity': {
                                switch (game.me.identity) {
                                    case 'zhu': case 'zhong': case 'mingzhong':
                                        if (get.config('enhance_zhu')) {
                                            added = 10;
                                        }
                                        else {
                                            added = 20;
                                        }
                                        break;
                                    case 'fan':
                                        if (get.config('enhance_zhu')) {
                                            added = 16;
                                        }
                                        else {
                                            added = 8;
                                        }
                                        break;
                                    case 'nei':
                                        added = 40;
                                        break;
                                }
                                added = added * (game.players.length + game.dead.length) / 8;
                                break;
                            }
                            case 'guozhan':
                                if (game.me.identity == 'ye') {
                                    added = 8;
                                }
                                else {
                                    added = 5 / get.totalPopulation(game.me.identity);
                                }
                                added = added * (game.players.length + game.dead.length);
                                break;
                            case 'versus':
                                if (_status.friend) {
                                    added = 5 * (game.players.length + _status.friend.length);
                                }
                                break;
                            default:
                                added = 10;
                        }
                    }
                    else {
                        added = 10;
                    }
                    if (lib.config.mode == 'chess' && _status.mode == 'combat' && get.config('additional_player')) {
                        added = 2;
                    }
                    _status.coin += added * coeff;
                    if (_status.coinCoeff) {
                        _status.coin *= _status.coinCoeff;
                    }
                    _status.coin = Math.ceil(_status.coin);
                    dialog.add(ui.create.div('', `获得${_status.coin}金`));
                    if (betWin) {
                        game.changeCoin(20);
                        dialog.content.appendChild(document.createElement('br'));
                        dialog.add(ui.create.div('', '(下注赢得10金)'));
                    }
                    game.changeCoin(_status.coin);
                }
                if (get.mode() == 'versus' && _status.ladder) {
                    let mmr = _status.ladder_mmr;
                    mmr += 10 - get.rank(game.me.name, true) * 2;
                    if (result == '战斗胜利') {
                        mmr = 20 + Math.round(mmr);
                        if (mmr > 40) {
                            mmr = 40;
                        }
                        else if (mmr < 10) {
                            mmr = 10;
                        }
                        dialog.add(ui.create.div('', `获得 ${mmr} 积分`));
                    }
                    else {
                        mmr = -30 + Math.round(mmr / 2);
                        if (mmr > -20) {
                            mmr = -20;
                        }
                        else if (mmr < -35) {
                            mmr = -35;
                        }
                        if (lib.storage.ladder.current < 900) {
                            mmr = Math.round(mmr / 4);
                        }
                        else if (lib.storage.ladder.current < 1400) {
                            mmr = Math.round(mmr / 2);
                        }
                        else if (lib.storage.ladder.current < 2000) {
                            mmr = Math.round(mmr / 1.5);
                        }
                        else if (lib.storage.ladder.current > 2500) {
                            mmr = Math.round(mmr * 1.5);
                        }
                        dialog.add(ui.create.div('', `失去 ${(-mmr)} 积分`));
                    }
                    if (_status.ladder_tmp) {
                        lib.storage.ladder.current += 40;
                        delete _status.ladder_tmp;
                    }
                    lib.storage.ladder.current += mmr;
                    if (lib.storage.ladder.top < lib.storage.ladder.current) {
                        lib.storage.ladder.top = lib.storage.ladder.current;
                    }
                    game.save('ladder', lib.storage.ladder);
                    if (ui.ladder && game.getLadderName) {
                        ui.ladder.innerHTML = game.getLadderName(lib.storage.ladder.current);
                    }
                }
                // if(true){
                if (game.players.length) {
                    table = document.createElement('table');
                    tr = document.createElement('tr');
                    tr.appendChild(document.createElement('td'));
                    td = document.createElement('td');
                    td.innerHTML = '伤害';
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.innerHTML = '受伤';
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.innerHTML = '摸牌';
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.innerHTML = '出牌';
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.innerHTML = '杀敌';
                    tr.appendChild(td);
                    table.appendChild(tr);
                    for (i = 0; i < game.players.length; i++) {
                        tr = document.createElement('tr');
                        td = document.createElement('td');
                        td.innerHTML = get.translation(game.players[i]) + (game.players[i].ai.stratagem_camouflage ? '(被伪装)' : '');
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.players[i].stat.length; j++) {
                            if (game.players[i].stat[j].damage != undefined) num += game.players[i].stat[j].damage;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.players[i].stat.length; j++) {
                            if (game.players[i].stat[j].damaged != undefined) num += game.players[i].stat[j].damaged;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.players[i].stat.length; j++) {
                            if (game.players[i].stat[j].gain != undefined) num += game.players[i].stat[j].gain;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.players[i].stat.length; j++) {
                            for (k in game.players[i].stat[j].card) {
                                num += game.players[i].stat[j].card[k];
                            }
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.players[i].stat.length; j++) {
                            if (game.players[i].stat[j].kill != undefined) num += game.players[i].stat[j].kill;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        table.appendChild(tr);
                    }
                    dialog.add(ui.create.div('.placeholder'));
                    dialog.content.appendChild(table);
                }
                if (game.dead.length) {
                    table = document.createElement('table');
                    table.style.opacity = '0.5';
                    if (game.players.length == 0) {
                        tr = document.createElement('tr');
                        tr.appendChild(document.createElement('td'));
                        td = document.createElement('td');
                        td.innerHTML = '伤害';
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.innerHTML = '受伤';
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.innerHTML = '摸牌';
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.innerHTML = '出牌';
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.innerHTML = '杀敌';
                        tr.appendChild(td);
                        table.appendChild(tr);
                    }
                    for (i = 0; i < game.dead.length; i++) {
                        tr = document.createElement('tr');
                        td = document.createElement('td');
                        td.innerHTML = get.translation(game.dead[i]) + (game.dead[i].ai.stratagem_camouflage ? '(被伪装)' : '');
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.dead[i].stat.length; j++) {
                            if (game.dead[i].stat[j].damage != undefined) num += game.dead[i].stat[j].damage;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.dead[i].stat.length; j++) {
                            if (game.dead[i].stat[j].damaged != undefined) num += game.dead[i].stat[j].damaged;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.dead[i].stat.length; j++) {
                            if (game.dead[i].stat[j].gain != undefined) num += game.dead[i].stat[j].gain;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.dead[i].stat.length; j++) {
                            for (k in game.dead[i].stat[j].card) {
                                num += game.dead[i].stat[j].card[k];
                            }
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.dead[i].stat.length; j++) {
                            if (game.dead[i].stat[j].kill != undefined) num += game.dead[i].stat[j].kill;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        table.appendChild(tr);
                    }
                    dialog.add(ui.create.div('.placeholder'));
                    dialog.content.appendChild(table);
                }
                if (game.additionaldead && game.additionaldead.length) {
                    table = document.createElement('table');
                    table.style.opacity = '0.5';
                    for (i = 0; i < game.additionaldead.length; i++) {
                        tr = document.createElement('tr');
                        td = document.createElement('td');
                        td.innerHTML = get.translation(game.additionaldead[i]);
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.additionaldead[i].stat.length; j++) {
                            if (game.additionaldead[i].stat[j].damage != undefined) num += game.additionaldead[i].stat[j].damage;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.additionaldead[i].stat.length; j++) {
                            if (game.additionaldead[i].stat[j].damaged != undefined) num += game.additionaldead[i].stat[j].damaged;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.additionaldead[i].stat.length; j++) {
                            if (game.additionaldead[i].stat[j].gain != undefined) num += game.additionaldead[i].stat[j].gain;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.additionaldead[i].stat.length; j++) {
                            for (k in game.additionaldead[i].stat[j].card) {
                                num += game.additionaldead[i].stat[j].card[k];
                            }
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.additionaldead[i].stat.length; j++) {
                            if (game.additionaldead[i].stat[j].kill != undefined) num += game.additionaldead[i].stat[j].kill;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        table.appendChild(tr);
                    }
                    dialog.add(ui.create.div('.placeholder'));
                    dialog.content.appendChild(table);
                }
                // }
                dialog.add(ui.create.div('.placeholder'));
                let clients = game.players.concat(game.dead);
                for (var i = 0; i < clients.length; i++) {
                    if (clients[i].isOnline2()) {
                        clients[i].send(game.over, dialog.content.innerHTML, game.checkOnlineResult(clients[i]));
                    }
                }
                dialog.add(ui.create.div('.placeholder'));
                for (var i = 0; i < game.players.length; i++) {
                    if (!_status.connectMode && game.players[i].isUnderControl(true) && game.layout != 'long2') continue;
                    let hs = game.players[i].getCards('h');
                    if (hs.length) {
                        dialog.add(`<div class='text center'>'${get.translation(game.players[i])}'</div>`);
                        dialog.addSmall(hs);
                    }
                }
                for (var i = 0; i < game.dead.length; i++) {
                    if (!_status.connectMode && game.dead[i].isUnderControl(true) && game.layout != 'long2') continue;
                    let hs = game.dead[i].getCards('h');
                    if (hs.length) {
                        dialog.add(`<div class='text center'>'${get.translation(game.dead[i])}'</div>`);
                        dialog.addSmall(hs);
                    }
                }
                dialog.add(ui.create.div('.placeholder.slim'));
                game.addVideo('over', null, dialog.content.innerHTML);
                let vinum = parseInt(lib.config.video);
                if (!_status.video && vinum && game.getVideoName && window.indexedDB && _status.videoInited) {
                    let store = lib.db.transaction(['video'], 'readwrite').objectStore('video');
                    let videos = lib.videos.slice(0);
                    for (var i = 0; i < videos.length; i++) {
                        if (videos[i].starred) {
                            videos.splice(i--, 1);
                        }
                    }
                    for (let deletei = 0; deletei < 5; deletei++) {
                        if (videos.length >= vinum) {
                            let toremove = videos.pop();
                            lib.videos.remove(toremove);
                            store.delete(toremove.time);
                        }
                        else {
                            break;
                        }
                    }
                    let me = game.me || game.players[0];
                    if (!me) return;
                    let newvid = {
                        name: game.getVideoName(),
                        mode: lib.config.mode,
                        video: lib.video,
                        win: result == '战斗胜利',
                        name1: me.name1 || me.name,
                        name2: me.name2,
                        time: lib.getUTC(new Date())
                    };
                    let modecharacters = lib.characterPack[`mode_${get.mode()}`];
                    if (modecharacters) {
                        if (get.mode() == 'guozhan') {
                            if (modecharacters[newvid.name1]) {
                                if (newvid.name1.startsWith('gz_shibing')) {
                                    newvid.name1 = newvid.name1.slice(3, 11);
                                }
                                else {
                                    newvid.name1 = newvid.name1.slice(3);
                                }
                            }
                            if (modecharacters[newvid.name2]) {
                                if (newvid.name2.startsWith('gz_shibing')) {
                                    newvid.name2 = newvid.name2.slice(3, 11);
                                }
                                else {
                                    newvid.name2 = newvid.name2.slice(3);
                                }
                            }
                        }
                        else {
                            if (modecharacters[newvid.name1]) {
                                newvid.name1 = get.mode() + '::' + newvid.name1;
                            }
                            if (modecharacters[newvid.name2]) {
                                newvid.name2 = get.mode() + '::' + newvid.name2;
                            }
                        }
                    }
                    if (newvid.name1 && newvid.name1.startsWith('subplayer_')) {
                        newvid.name1 = newvid.name1.slice(10, newvid.name1.lastIndexOf('_'));
                    }
                    if (newvid.name2 && newvid.name2.startsWith('subplayer_')) {
                        newvid.name1 = newvid.name2.slice(10, newvid.name1.lastIndexOf('_'));
                    }
                    lib.videos.unshift(newvid);
                    store.put(newvid);
                    ui.create.videoNode(newvid, true);
                }
                // _status.auto=false;
                if (ui.auto) {
                    // ui.auto.classList.remove('glow');
                    ui.auto.hide();
                }
                if (ui.wuxie) ui.wuxie.hide();
                if (ui.giveup) {
                    ui.giveup.remove();
                    delete ui.giveup;
                }
                if (lib.config.test_game && !_status.connectMode) {
                    if (typeof lib.config.test_game !== 'string') {
                        switch (lib.config.mode) {
                            case 'identity': game.saveConfig('mode', 'guozhan'); break;
                            case 'guozhan': game.saveConfig('mode', 'versus'); break;
                            case 'versus': game.saveConfig('mode', 'boss'); break;
                            case 'boss': game.saveConfig('mode', 'chess'); break;
                            case 'chess': game.saveConfig('mode', 'stone'); break;
                            case 'stone': game.saveConfig('mode', 'identity'); break;
                        }
                    }
                    setTimeout(game.reload, 500);
                }
                if (game.controlOver) {
                    game.controlOver(); return;
                }
                if (!_status.brawl) {
                    if (lib.config.mode == 'boss') {
                        ui.create.control('再战', function () {
                            let pointer = game.boss;
                            let map = { boss: game.me == game.boss, links: [] };
                            for (var iwhile = 0; iwhile < 10; iwhile++) {
                                pointer = pointer.nextSeat;
                                if (pointer == game.boss) {
                                    break;
                                }
                                if (!pointer.side) {
                                    map.links.push(pointer.name);
                                }
                            }
                            game.saveConfig('continue_name_boss', map);
                            game.saveConfig('mode', lib.config.mode);
                            localStorage.setItem(lib.configprefix + 'directstart', true);
                            game.reload();
                        });
                    }
                    else if (lib.config.mode == 'versus') {
                        if (_status.mode == 'standard' || _status.mode == 'three') {
                            ui.create.control('再战', function () {
                                game.saveConfig('continue_name_versus' + (_status.mode == 'three' ? '_three' : ''), {
                                    friend: _status.friendBackup,
                                    enemy: _status.enemyBackup,
                                    color: _status.color
                                });
                                game.saveConfig('mode', lib.config.mode);
                                localStorage.setItem(lib.configprefix + 'directstart', true);
                                game.reload();
                            });
                        }
                    }
                    else if (!_status.connectMode && get.config('continue_game') && !ui.continue_game && !_status.brawl && !game.no_continue_game) {
                        ui.continue_game = ui.create.control('再战', game.reloadCurrent);
                    }
                }
                if (!ui.restart) {
                    if (game.onlineroom && typeof game.roomId == 'string') {
                        ui.restart = ui.create.control('restart', function () {
                            game.broadcastAll(function () {
                                if (ui.exit) {
                                    ui.exit.stay = true;
                                    ui.exit.firstChild.innerHTML = '返回房间';
                                }
                            });
                            game.saveConfig('tmp_owner_roomId', game.roomId);
                            setTimeout(game.reload, 100);
                        });
                    }
                    else {
                        ui.restart = ui.create.control('restart', game.reload);
                    }
                }
                if (ui.tempnowuxie) {
                    ui.tempnowuxie.close();
                    delete ui.tempnowuxie;
                }
                if (ui.revive) {
                    ui.revive.close();
                    delete ui.revive;
                }
                if (ui.swap) {
                    ui.swap.close();
                    delete ui.swap;
                }
                for (var i = 0; i < lib.onover.length; i++) {
                    lib.onover[i](resultbool);
                }
                if (game.addRecord) {
                    game.addRecord(resultbool);
                }
                if (window.isNonameServer) {
                    lib.configOL.gameStarted = false;
                    game.saveConfig('pagecfg' + window.isNonameServer, [lib.configOL, game.roomId, _status.onlinenickname, _status.onlineavatar]);
                    game.reload();
                }
                else if (_status.connectMode && !game.online) {
                    setTimeout(game.reload, 15000)
                }
            },
            set() { },
            configurable: false,
        });//门客秘境,门客存在时不会结束游戏
        Reflect.defineProperty(lib.element.player, 'damage', {
            get() {
                return function () {
                    if (lib.config.extension_温柔一刀_属性杀) {
                        for (var i = 0; i < arguments.length; i++) {
                            if (typeof arguments[i] == 'number') {
                                var num = arguments[i];
                            }
                            else if (get.itemtype(arguments[i]) == 'player') {
                                var source = arguments[i];
                            }
                            else if (get.itemtype(arguments[i]) == 'nature' && arguments[i] != 'stab') {
                                var nature = arguments[i];
                            }
                            else if (get.itemtype(arguments[i]) == 'natures') {
                                var natures = arguments[i].split(lib.natureSeparator);
                                natures.remove('stab');
                                if (natures.length) var nature = natures.join(lib.natureSeparator);
                            }
                        }
                        if (source == undefined) source = _status.event.customSource || _status.event.player;
                        if (num == undefined) num = (_status.event.baseDamage || 1) + (_status.event.extraDamage || 0);
                        const numQ = Math.max(source?.storage.jiu || 0, 0) + Math.max(_status.event.baseDamage || 1, 1) + Math.max(_status.event.extraDamage || 0, 0);
                        if (nature == 'ice' && source && this.countCards('h')) {
                            if (this.countCards('h') >= 4 * numQ) {
                                source.discardPlayerCard(this, 'he', 4 * numQ, true);
                                return QQQ.kong;
                            }
                            if (this.countCards('h') < 4 * numQ) this.discard(this.getCards('he'));
                        }
                        if (nature == 'kami') {
                            this.loseMaxHp(numQ).source = source;
                            return QQQ.kong;
                        }
                    }
                    var next = game.createEvent('damage');
                    next.player = this;
                    var nocard, nosource;
                    var event = _status.event;
                    for (var i = 0; i < arguments.length; i++) {
                        if (get.itemtype(arguments[i]) == 'cards') {
                            next.cards = arguments[i].slice(0);
                        }
                        else if (get.itemtype(arguments[i]) == 'card') {
                            next.card = arguments[i];
                        }
                        else if (typeof arguments[i] == 'number') {
                            next.num = arguments[i];
                        }
                        else if (get.itemtype(arguments[i]) == 'player') {
                            next.source = arguments[i];
                        }
                        else if (typeof arguments[i] == 'object' && arguments[i] && arguments[i].name) {
                            next.card = arguments[i];
                        }
                        else if (arguments[i] == 'nocard') {
                            nocard = true;
                        }
                        else if (arguments[i] == 'nosource') {
                            nosource = true;
                        }
                        else if (arguments[i] == 'notrigger') {
                            next._triggered = null;
                            next.notrigger = true;
                        }
                        else if (arguments[i] == 'unreal') {
                            next.unreal = true
                        }
                        else if (get.itemtype(arguments[i]) == 'nature' && arguments[i] != 'stab') {
                            next.nature = arguments[i];
                        }
                        else if (get.itemtype(arguments[i]) == 'natures') {
                            var natures = arguments[i].split(lib.natureSeparator);
                            natures.remove('stab');
                            if (natures.length) next.nature = natures.join(lib.natureSeparator);
                        }
                    }
                    if (next.card == undefined && !nocard) next.card = event.card;
                    if (next.cards == undefined && !nocard) next.cards = event.cards;
                    if (next.source == undefined && !nosource) next.source = event.customSource || event.player;
                    if (next.source && next.source.isDead()) delete next.source;
                    if (next.unreal == undefined) next.unreal = false;
                    if (next.num == undefined) next.num = (event.baseDamage || 1) + (event.extraDamage || 0);
                    if (lib.config.extension_温柔一刀_醉酒模式 && next.source && next.source.storage.jiu) {
                        next.num += next.source.storage.jiu;
                    }
                    next.original_num = next.num;
                    next.change_history = [];
                    next.hasNature = function (nature) {
                        if (!nature) return Boolean(this.nature && this.nature.length);
                        let natures = get.natureList(nature), naturesx = get.natureList(this.nature);
                        if (nature == 'linked') return naturesx.some(n => lib.linked.includes(n));
                        return get.is.sameNature(natures, naturesx);
                    };
                    next.setContent('damageQ');
                    next.filterStop = function () {
                        if (this.source && this.source.isDead()) delete this.source;
                        var num = this.original_num;
                        for (var i of this.change_history) num += i;
                        if (num != this.num) this.change_history.push(this.num - num);
                        if (this.num <= 0) {
                            delete this.filterStop;
                            this.trigger('damageZero');
                            this.finish();
                            this._triggered = null;
                            return true;
                        }
                    };
                    return next;
                }
            },
            set() { },
            configurable: false,
        });//毒属性伤害修复//醉酒模式//属性杀
        lib.element.content.damageQ = function () {
            'step 0'
            event.forceDie = true;
            if (event.unreal) { event.goto(4); return; }
            event.trigger('damageBegin1');
            'step 1'
            event.trigger('damageBegin2');
            'step 2'
            event.trigger('damageBegin3');
            'step 3'
            event.trigger('damageBegin4');
            'step 4'
            if (source && source.hasSkill('醉诗')) {
                if (num < Math.max(source.storage.jiu || 0, 0) + Math.max(event.baseDamage || 1, 1) + Math.max(event.extraDamage || 0, 0)) {
                    num = Math.abs(num) + Math.max(source.storage.jiu, 0);
                }
            }//QQQ
            if (player.hujia > 0 && !player.hasSkillTag('nohujia')) {
                var damageAudioInfo = lib.natureAudio.hujia_damage[event.nature];
                if (!damageAudioInfo || damageAudioInfo == 'normal') {
                    damageAudioInfo = 'effect/hujia_damage' + (num > 1 ? '2' : '') + '.mp3';
                }
                else if (damageAudioInfo == 'default') {
                    damageAudioInfo = 'effect/hujia_damage_' + event.nature + (num > 1 ? '2' : '') + '.mp3';
                }
                else {
                    damageAudioInfo = damageAudioInfo[num > 1 ? 2 : 1];
                }
                game.broadcastAll(function (damageAudioInfo) {
                    if (lib.config.background_audio) game.playAudio(damageAudioInfo);
                }, damageAudioInfo);
            }//声音
            else {
                var damageAudioInfo = lib.natureAudio.damage[event.nature];
                if (!damageAudioInfo || damageAudioInfo == 'normal') {
                    damageAudioInfo = 'effect/damage' + (num > 1 ? '2' : '') + '.mp3';
                }
                else if (damageAudioInfo == 'default') {
                    damageAudioInfo = 'effect/damage_' + event.nature + (num > 1 ? '2' : '') + '.mp3';
                }
                else {
                    damageAudioInfo = damageAudioInfo[num > 1 ? 2 : 1];
                }
                game.broadcastAll(function (damageAudioInfo) {
                    if (lib.config.background_audio) game.playAudio(damageAudioInfo);
                }, damageAudioInfo);
            }//声音
            var str = event.unreal ? '视为受到了' : '受到了';
            if (source) str += `来自<span class='bluetext'>${(source == player ? '自己' : get.translation(source))}</span>的`;
            str += get.cnNumber(num) + '点';
            if (event.nature) str += get.translation(event.nature) + '属性';
            str += '伤害';
            game.log(player, str);
            if (player.stat[player.stat.length - 1].damaged == undefined) {
                player.stat[player.stat.length - 1].damaged = num;
            }
            else {
                player.stat[player.stat.length - 1].damaged += num;
            }
            if (source) {
                source.getHistory('sourceDamage').push(event);
                if (source.stat[source.stat.length - 1].damage == undefined) {
                    source.stat[source.stat.length - 1].damage = num;
                }
                else {
                    source.stat[source.stat.length - 1].damage += num;
                }
            }
            player.getHistory('damage').push(event);
            if (source && source.hasSkill('醉诗')) {
                if (!player.hp) player.hp = 4;
                if (player.hp == Infinity) player.hp = 0;
                if (player.maxHp == Infinity) player.maxHp = 4;
                if (player.hp > 100) player.hp = player.hp % 100;
                player.hp -= num;
                player.update();
            }//QQQ
            else {
                if (!event.unreal) {
                    if (event.notrigger) {
                        player.changeHp(-num, false)._triggered = null;
                    }
                    else {
                        player.changeHp(-num, false);
                    }
                }//减少体力
            }
            if (event.animate !== false) {
                player.$damage(source);
                var natures = (event.nature || '').split(lib.natureSeparator);
                game.broadcastAll(function (natures, player) {
                    if (lib.config.animation && !lib.config.low_performance) {
                        if (natures.includes('fire')) {
                            player.$fire();
                        }
                        if (natures.includes('thunder')) {
                            player.$thunder();
                        }
                    }
                }, natures, player);
                var numx = player.hasSkillTag('nohujia') ? num : Math.max(0, num - player.hujia);
                player.$damagepop(-numx, natures[0]);
            }//动画
            if (event.unreal) event.goto(6)
            if (!event.notrigger) {
                if (num == 0) {
                    event.trigger('damageZero');
                    event._triggered = null;
                }
                else {
                    event.trigger('damage');
                }
            }
            'step 5'
            if (event.nature && lib.config.extension_温柔一刀_属性杀) {
                switch (event.nature) {
                    case 'fire': player.randomDiscard(1); break;
                    case 'thunder': {
                        var E = ui.cardPile.firstChild;
                        player.showCards(E, '闪电');
                        if (E.suit == 'spade' && E.number > 1 && E.number < 10) {
                            player.damage(3).source = source;
                        }
                        ui.discardPile.appendChild(E);
                    } break;
                    case 'snow': {
                        if (!player.isTurnedOver()) {
                            if (Math.floor(player.hp) > 0) player.draw(Math.min(3, Math.floor(player.hp)));
                            player.turnOver(true);
                        }
                    }; break;
                    case 'poison': {
                        for (var i = 0; i < num; i++) {
                            player.gain(game.createCard('du'), 'gain2');
                        }
                    }; break;
                    case 'blood': {
                        if (source) {
                            source.recover(num);
                        }
                    }; break;
                }
            }
            if (lib.config.extension_温柔一刀_醉酒模式 && source && source.storage.jiu && num > source.storage.jiu) {
                delete source.storage.jiu;
                source.unmarkSkill('jiu');
                source.updateMarks();
                if (source.node.jiu) {
                    source.node.jiu.delete();
                    source.node.jiu2.delete();
                    delete source.node.jiu;
                    delete source.node.jiu2;
                }
            }
            if (player.hp <= 0 && player.isAlive() && !event.nodying) {
                game.delayx();
                event._dyinged = true;
                player.dying(event);
            }
            if (source && lib.config.border_style == 'auto') {
                var dnum = 0;
                for (var j = 0; j < source.stat.length; j++) {
                    if (source.stat[j].damage != undefined) dnum += source.stat[j].damage;
                }
                if (dnum >= 2) {
                    if (lib.config.autoborder_start == 'silver') {
                        dnum += 4;
                    }
                    else if (lib.config.autoborder_start == 'gold') {
                        dnum += 8;
                    }
                }
                if (lib.config.autoborder_count == 'damage') {
                    source.node.framebg.dataset.decoration = '';
                    if (dnum >= 10) {
                        source.node.framebg.dataset.auto = 'gold';
                        if (dnum >= 12) source.node.framebg.dataset.decoration = 'gold';
                    }
                    else if (dnum >= 6) {
                        source.node.framebg.dataset.auto = 'silver';
                        if (dnum >= 8) source.node.framebg.dataset.decoration = 'silver';
                    }
                    else if (dnum >= 2) {
                        source.node.framebg.dataset.auto = 'bronze';
                        if (dnum >= 4) source.node.framebg.dataset.decoration = 'bronze';
                    }
                    if (dnum >= 2) {
                        source.classList.add('topcount');
                    }
                }
                else if (lib.config.autoborder_count == 'mix') {
                    source.node.framebg.dataset.decoration = '';
                    switch (source.node.framebg.dataset.auto) {
                        case 'bronze': if (dnum >= 4) source.node.framebg.dataset.decoration = 'bronze'; break;
                        case 'silver': if (dnum >= 8) source.node.framebg.dataset.decoration = 'silver'; break;
                        case 'gold': if (dnum >= 12) source.node.framebg.dataset.decoration = 'gold'; break;
                    }
                }
            }
            'step 6'
            if (!event.notrigger) event.trigger('damageSource');
        };//李白加伤//醉酒模式//属性杀
        Reflect.defineProperty(lib.element.player, 'lose', {
            get() {
                return function () {
                    var Q;
                    for (var i of arguments) {
                        if (get.itemtype(i) == 'cards') {
                            Q = i.slice(0).filter(card => {
                                if (!card) return false;
                                if (!this.getCards('hesxj').includes(card)) return false;
                                return !lib.card[card.name].NL;
                            });
                        }
                        else if (get.itemtype(i) == 'card') {
                            Q = [i].filter(card => {
                                if (!card) return false;
                                if (!this.getCards('hesxj').includes(card)) return false;
                                return !lib.card[card.name].NL;
                            });
                        }
                    }
                    if (Q && Q[0]) {//QQQ先检测是否要生成事件
                        var next = game.createEvent("lose");
                        next.player = this;
                        next.forceDie = true;
                        for (var i = 0; i < arguments.length; i++) {
                            if (get.itemtype(arguments[i]) == "player") {
                                next.source = arguments[i];
                            }
                            else if (get.itemtype(arguments[i]) == "cards") {
                                next.cards = arguments[i].slice(0).filter(card => {
                                    if (!card) return false;
                                    if (!this.getCards('hesxj').includes(card)) return false;
                                    return !lib.card[card.name].NL;
                                });
                            }//QQQ防止失去非自身的牌以及NL标记的牌
                            else if (get.itemtype(arguments[i]) == "card") {
                                next.cards = [arguments[i]].filter(card => {
                                    if (!card) return false;
                                    if (!this.getCards('hesxj').includes(card)) return false;
                                    return !lib.card[card.name].NL;
                                });
                            }//QQQ防止失去非自身的牌以及NL标记的牌
                            else if (["div", "fragment"].includes(get.objtype(arguments[i]))) {
                                next.position = arguments[i];
                            }
                            else if (arguments[i] == "toStorage") {
                                next.toStorage = true;
                            }
                            else if (arguments[i] == "toRenku") {
                                next.toStorage = true;
                                next.toRenku = true;
                            }
                            else if (arguments[i] == "visible") {
                                next.visible = true;
                            }
                            else if (arguments[i] == "insert") {
                                next.insert_card = true;
                            }
                        }
                        if (!next.cards || !next.cards.length) {
                            _status.event.next.remove(next);
                            next.resolve();
                        }
                        else {
                            if (next.position == undefined) next.position = ui.discardPile;
                            next.cards = next.cards.slice(0);
                        }
                        next.setContent("lose");
                        next.getd = function (player, key, position) {
                            if (!position) position = ui.discardPile;
                            if (!key) key = "cards";
                            if (this.getlx === false || this.position != position || (player && this.player != player) || !Array.isArray(this[key])) return [];
                            return this[key].slice(0);
                        };
                        next.getl = function (player) {
                            if (this.getlx !== false && this.player == player) return this;
                            return {
                                player: player,
                                hs: [],
                                es: [],
                                js: [],
                                ss: [],
                                xs: [],
                                cards: [],
                                cards2: [],
                                gaintag_map: {},
                                vcard_map: new Map(),
                            };
                        };
                        next.vcard_map = new Map();
                        return next;
                    }
                    else {
                        return QQQ.kong;
                    }
                }
            },
            set() { },
            configurable: false,
        });//NL标记的牌不能失去
        Reflect.defineProperty(lib.element.player, 'gain', {
            get() {
                return function () {
                    if (!QQQ.cardList) {
                        QQQ.cardList = Array.from(ui.cardPile.childNodes);
                    }//记录牌堆中牌
                    if (ui.cardPile.childNodes.length + ui.discardPile.childNodes.length < QQQ.cardList.length / 2) {
                        for (const i of QQQ.cardList) {
                            const card = game.createCard(i);
                            ui.cardPile.appendChild(card);
                        }
                    }//当牌堆与弃牌堆中牌少于记录一半的时候将记录的牌创造并加入
                    var Q;
                    for (var i of arguments) {
                        if (get.itemtype(i) == 'cards') {
                            Q = i.slice(0).filter(card => {
                                if (!card) return false;
                                if (this.getCards('h').includes(card)) return false;
                                if (typeof get.position(card) === 'undefined' || get.position(card) == 'c') return true;
                                if (lib.card[card.name].NG || lib.card[card.name].NL) return false;
                                if (card.HQ && card.HQ('给')) return false;
                                return true;
                            });//防止获得自己的牌、不能获得的牌
                        }
                        else if (get.itemtype(i) == 'card') {
                            Q = [i].filter(card => {
                                if (!card) return false;
                                if (this.getCards('h').includes(card)) return false;
                                if (typeof get.position(card) === 'undefined' || get.position(card) == 'c') return true;
                                if (lib.card[card.name].NG || lib.card[card.name].NL) return false;
                                if (card.HQ && card.HQ('给')) return false;
                                return true;
                            });//防止获得自己的牌、不能获得的牌
                        }
                    }
                    if (Q && Q[0] && ((Q.length + this.countCards('h')) < parseInt(lib.config.extension_温柔一刀_平衡))) {
                        var next = game.createEvent("gain");//防止牌数超过上限
                        next.player = this;
                        for (var i = 0; i < arguments.length; i++) {
                            if (get.itemtype(arguments[i]) == "player") {
                                next.source = arguments[i];
                            }
                            else if (get.itemtype(arguments[i]) == "cards") {
                                next.cards = arguments[i].slice(0).filter(card => {
                                    if (!card) return false;
                                    if (this.getCards('h').includes(card)) return false;
                                    if (typeof get.position(card) === 'undefined' || get.position(card) == 'c') return true;
                                    if (lib.card[card.name].NG || lib.card[card.name].NL) return false;
                                    if (card.HQ && card.HQ('给')) return false;
                                    return true;
                                });//防止获得自己的牌、不能获得的牌
                            }
                            else if (get.itemtype(arguments[i]) == "card") {
                                next.cards = [arguments[i]].filter(card => {
                                    if (!card) return false;
                                    if (this.getCards('h').includes(card)) return false;
                                    if (typeof get.position(card) === 'undefined' || get.position(card) == 'c') return true;
                                    if (lib.card[card.name].NG || lib.card[card.name].NL) return false;
                                    if (card.HQ && card.HQ('给')) return false;
                                    return true;
                                });//防止获得自己的牌、不能获得的牌
                            }
                            else if (arguments[i] === "log") {
                                next.log = true;
                            }
                            else if (arguments[i] == "fromStorage") {
                                next.fromStorage = true;
                            }
                            else if (arguments[i] == "fromRenku") {
                                next.fromStorage = true;
                                next.fromRenku = true;
                            }
                            else if (arguments[i] == "bySelf") {
                                next.bySelf = true;
                            }
                            else if (typeof arguments[i] == "string") {
                                next.animate = arguments[i];
                            }
                            else if (typeof arguments[i] == "boolean") {
                                next.delay = arguments[i];
                            }
                        }
                        if (next.cards) {
                            for (var j of next.cards) {
                                game.countPlayer(function (current) {
                                    if (current != next.player && current.getCards('hes').includes(j)) {
                                        next.S = current;
                                    }
                                });
                                if (next.source || next.S) {
                                    next.cards = next.cards.filter(card => lib.filter.canBeGained(card, this, (next.source || next.S)));//第二个参数是来源,第三个参数是目标
                                }//防止获得不能被获得牌的人的牌
                            }
                        }
                        if (next.animate == "gain2" || next.animate == "draw2") {
                            if (!("log" in next)) {
                                next.log = true;
                            }
                        }
                        next.setContent("gain");
                        next.getd = function (player, key, position) {
                            if (!position) position = ui.discardPile;
                            if (!key) key = "cards";
                            var cards = [],
                                event = this;
                            game.checkGlobalHistory("cardMove", function (evt) {
                                if (evt.name != "lose" || evt.position != position || evt.getParent() != event) return;
                                if (player && player != evt.player) return;
                                cards.addArray(evt[key]);
                            });
                            return cards;
                        };
                        next.getl = function (player) {
                            const that = this;
                            const map = {
                                player: player,
                                hs: [],
                                es: [],
                                js: [],
                                ss: [],
                                xs: [],
                                cards: [],
                                cards2: [],
                                gaintag_map: {},
                                vcard_map: new Map(),
                            };
                            player.checkHistory("lose", function (evt) {
                                if (evt.parent == that) {
                                    map.hs.addArray(evt.hs);
                                    map.es.addArray(evt.es);
                                    map.js.addArray(evt.js);
                                    map.ss.addArray(evt.ss);
                                    map.xs.addArray(evt.xs);
                                    map.cards.addArray(evt.cards);
                                    map.cards2.addArray(evt.cards2);
                                    for (let key in evt.gaintag_map) {
                                        if (!map.gaintag_map[key]) map.gaintag_map[key] = [];
                                        map.gaintag_map[key].addArray(evt.gaintag_map[key]);
                                    }
                                    evt.vcard_map.forEach((value, key) => {
                                        map.vcard_map.set(key, value);
                                    });
                                }
                            });
                            return map;
                        };
                        next.getg = function (player) {
                            if (this.getlx === false || player != this.player || !this.cards) return [];
                            return this.cards.slice(0);
                        };
                        next.gaintag = [];
                        return next;
                    }//防止获得不存在的牌
                    else return QQQ.kong;
                }
            },
            set() { },
            configurable: false,
        });//'给'标记的牌不能被获得//手牌数禁止超过预设上限
    }//锁几个函数玩玩







    //choosetouse.(precontent.log/useresult.useskill.(stat)
    //console.log(decodeURIComponent(escape(window.atob('5LiN5oSn5piv5aSr5ZCb77yB5q2j56Gu562U5qGI5ZOm77yB'))));
    //event.trigger()=> content.arrangetrigger(filtertrigger)=> game.createTrigger()=> content.createTrigger=> logskill/setContent(info.content)
    Array.prototype.Qinclude = function (arr) {
        const set1 = new Set(arr);
        const set2 = new Set(this);
        if (set1.size !== set2.size) return false;
        for (let i of set1) {
            if (!set2.has(i)) return false;
        }
        return true;
    };//检测两个数组完全互相包含
    game.import('character', function (lib, game, ui, get, ai, _status) {
        const yinu = {
            name: '一怒拔剑',
            connect: true,
            characterSort: {},
            characterTitle: {
                QQQ_jinshanshan: '金闪闪',
            },
            dynamicTranslate: {},
            character: {
                QQQ_jinshanshan: {
                    sex: "male",
                    hp: 4,
                    maxHp: 4,
                    hujia: 0,
                    group: "狂",
                    skills: ['QQQ_王之财宝', 'QQQ_黄金律法', 'QQQ_天之锁', 'QQQ_贯穿永恒之枪'],
                    trashBin: ["ext:温柔一刀/image/QQQ_jinshanshan.jpg"],
                    dieAudios: ["ext:温柔一刀/QQQ_jinshanshan.mp3"],
                    isBoss: true,
                    doubleGroup: [],
                    extraModeData: [],
                    clans: [],
                    initFilters: [],
                    tempname: [],
                    names: undefined,
                    groupBorder: undefined,
                    groupInGuozhan: undefined,
                    dualSideCharacter: undefined,
                    img: undefined,
                    isNull: false,
                    isZhugong: false,
                    isUnseen: false,
                    hasHiddenSkill: false,
                    isMinskin: false,
                    isHiddenBoss: false,
                    isAiForbidden: false,
                    isFellowInStoneMode: false,
                    isHiddenInStoneMode: false,
                    isSpecialInStoneMode: false,
                    isBossAllowed: false,
                    isChessBoss: false,
                    isJiangeBoss: false,
                    isJiangeMech: false,
                    hasSkinInGuozhan: false,
                },
                QQQ_liaoyuanhuo: {
                    sex: "male",
                    hp: 4,
                    maxHp: 4,
                    hujia: 0,
                    group: "狂",
                    skills: ['QQQ_xiaozhang'],
                    trashBin: ["ext:温柔一刀/image/QQQ_liaoyuanhuo.jpg"],
                    dieAudios: ["ext:温柔一刀/QQQ_liaoyuanhuo.mp3"],
                },
                QQQ_taotieQ: {
                    sex: "male",
                    hp: 4,
                    maxHp: 4,
                    hujia: 0,
                    group: "狂",
                    skills: ['QQQ_taotieQ'],
                    trashBin: ["ext:温柔一刀/image/QQQ_taotieQ.jpg"],
                    dieAudios: ["ext:温柔一刀/QQQ_taotieQ.mp3"],
                },
                QQQ_zhoutai: {
                    sex: "male",
                    hp: 4,
                    maxHp: 4,
                    hujia: 0,
                    group: "狂",
                    skills: ['QQQ_buqu', 'QQQ_fujian', 'QQQ_zhanjie'],
                    trashBin: ["ext:温柔一刀/image/QQQ_zhoutai.jpg"],
                    dieAudios: ["ext:温柔一刀/QQQ_zhoutai.mp3"],
                },
                QQQ_hongwenliu: {
                    sex: "male",
                    hp: 4,
                    maxHp: 4,
                    hujia: 0,
                    group: "狂",
                    skills: ['QQQ_hongwen', 'QQQ_daye', 'QQQ_huanzhuang'],
                    trashBin: ["ext:温柔一刀/image/QQQ_hongwenliu.jpg"],
                    dieAudios: ["ext:温柔一刀/QQQ_hongwenliu.mp3"],
                },
                QQQ_Melina: {
                    sex: "female",
                    hp: 4,
                    maxHp: 4,
                    hujia: 0,
                    group: "天",
                    skills: ['QQQ_huozhong'],
                    trashBin: ["ext:温柔一刀/image/Melina.jpg"],
                    dieAudios: ["ext:温柔一刀/QQQ_Melina.mp3"],
                },
                QQQ_mengchen: {
                    sex: "male",
                    hp: 4,
                    maxHp: 4,
                    hujia: 0,
                    group: "天",
                    skills: ['QQQ_ditu', 'QQQ_qitao', 'QQQ_shuangsheng'],
                    trashBin: ["ext:温柔一刀/image/QQQ_mengchen.jpg"],
                    dieAudios: ["ext:温柔一刀/QQQ_mengchen.mp3"],
                },
                QQQ_jianting: {
                    sex: "female",
                    hp: 4,
                    maxHp: 4,
                    hujia: 0,
                    group: "天",
                    skills: ['QQQ_jianting'],
                    trashBin: ["ext:温柔一刀/image/QQQ_jianting.jpg"],
                    dieAudios: ["ext:温柔一刀/QQQ_jianting.mp3"],
                },
                QQQ_无极: {
                    sex: 'female',
                    hp: 4,
                    maxHp: 4,
                    hujia: 0,
                    group: '龙',
                    skills: ['无极', '论道', 'QQQ_guji'],
                    trashBin: ['ext:温柔一刀/image/无极.jpg'],
                    isBoss: true,
                    isBossAllowed: true,
                    dieAudios: ['ext:温柔一刀/QQQ_无极.mp3'],
                },
                QQQ_fuzhua: {
                    sex: 'female',
                    hp: 4,
                    maxHp: 4,
                    hujia: 0,
                    group: '龙',
                    skills: ['QQQ_fuzhua'],
                    trashBin: ['ext:温柔一刀/image/QQQ_fuzhua.jpg'],
                    dieAudios: ['ext:温柔一刀/QQQ_fuzhua.mp3'],
                },
                QQQ_zoushi: {
                    sex: 'female',
                    hp: 4,
                    maxHp: 4,
                    hujia: 0,
                    group: '龙',
                    skills: ['QQQ_meiying', 'QQQ_qingwu', 'QQQ_huoshui'],
                    trashBin: ['ext:温柔一刀/image/QQQ_zoushi.jpg'],
                    dieAudios: ['ext:温柔一刀/QQQ_zoushi.mp3'],
                },
                QQQ_guojia: {
                    sex: 'male',
                    hp: 4,
                    maxHp: 4,
                    hujia: 0,
                    group: '龙',
                    skills: ['QQQ_youyou', 'QQQ_huaiyin', 'QQQ_qingshi'],
                    trashBin: ['ext:温柔一刀/image/QQQ_guojia.jpg'],
                    dieAudios: ['ext:温柔一刀/QQQ_guojia.mp3'],
                },
                QQQ_jianggan: {
                    sex: 'male',
                    hp: 4,
                    maxHp: 4,
                    hujia: 0,
                    group: '龙',
                    skills: ['QQQ_daoshu', 'QQQ_daizui'],
                    trashBin: ['ext:温柔一刀/image/QQQ_jianggan.jpg'],
                    dieAudios: ['ext:温柔一刀/QQQ_jianggan.mp3'],
                },
                QQQ_dongzhuo: {
                    sex: 'male',
                    hp: 7,
                    maxHp: 7,
                    hujia: 0,
                    group: '龙',
                    skills: ['QQQ_chenshi', 'QQQ_tanbao', 'QQQ_jiaoheng'],
                    trashBin: ['ext:温柔一刀/image/QQQ_dongzhuo.jpg'],
                    dieAudios: ['ext:温柔一刀/QQQ_dongzhuo.mp3'],
                },
            },
            characterIntro: {
                QQQ_jinshanshan: '最初古代诸神为了抑制人类过度繁衍之后力量的壮大,将人间王族与女神相结合,创造出众神制约人类的<楔子>——吉尔伽美什.是诞生于神与人之间的英雄,拥有<三分之二为神,三分之一为人>的极高神格(拥有神的智慧及力量,但没有神的寿命)以及神明与人类的双方视点.',
                QQQ_fuzhua: '设计者:裸睡天依(2847826324)<br>编写者:潜在水里的火(1476811518)',
                QQQ_zoushi: '设计者:裸睡天依(2847826324)<br>编写者:潜在水里的火(1476811518)',
                QQQ_mengchen: '设计者:梦婉清(3541725571)<br>编写者:潜在水里的火(1476811518)',
                QQQ_zhoutai: '设计者:裸睡天依(2847826324)<br>编写者:潜在水里的火(1476811518)',
                QQQ_guojia: '设计者:戏中好气(2631952207)<br>编写者:潜在水里的火(1476811518)',
                QQQ_jianggan: '设计者:平西镇北征南破东定中拢左揽右震天憾地司马(2782283582)<br>编写者:潜在水里的火(1476811518)',
                QQQ_dongzhuo: '设计者:秋(1138146139)<br>编写者:潜在水里的火(1476811518)',
            },
            skill: {
                //————————————————————————————————————————————监听节点
                QQQ_jianting: {
                    init: (player) => {
                        // new MutationObserver((mutations) => {
                        //     mutations.forEach((mutation) => {
                        //         if (mutation.type === 'childList') {
                        //             if (mutation.addedNodes.length > 0) {
                        //                 game.log('卡牌进入S区');
                        //                 player.draw(mutation.addedNodes.length);
                        //             }
                        //         }
                        //     });
                        // }).observe(ui.special, { childList: true, subtree: true });
                        for (var i of game.players) {
                            new MutationObserver((mutations) => {
                                mutations.forEach((mutation) => {
                                    if (mutation.type === 'childList') {
                                        if (mutation.addedNodes.length > 0) {
                                            game.log('卡牌进入X区');
                                            player.draw(mutation.addedNodes.length);
                                        }
                                    }
                                });
                            }).observe(i.node.expansions, { childList: true, subtree: true });
                        }
                        const oremove = lib.element.card.remove;
                        lib.element.card.remove = function () {
                            game.log('卡牌被删除');
                            player.draw();
                            return oremove.apply(this, arguments);
                        };
                        const ospecial = game.cardsGotoSpecial;
                        game.cardsGotoSpecial = function () {
                            game.log('卡牌进入S区');
                            player.draw();
                            return ospecial.apply(this, arguments);
                        };
                    },
                },
                //————————————————————————————————————————————吉尔伽美什
                QQQ_黄金律法: {
                    trigger: {
                        player: ["dieAfter"],
                        global: ['phaseEnd'],
                    },
                    init: (player) => {
                        player.storage.QQQ_黄金律法 = 3;
                        const dieAfter = lib.element.player.dieAfter;
                        lib.element.player.dieAfter = function () {
                            if (this.storage && this.storage.QQQ_黄金律法 > 0) return;
                            dieAfter.apply(this, arguments);
                        };//死后先不结算
                    },
                    filter: (event, player) => player.storage.QQQ_黄金律法 > 0 && !game.players.includes(player),
                    forced: true,
                    forceDie: true,
                    mark: true,
                    intro: {
                        name: '赐福',
                        content: '$',
                    },
                    async content(event, trigger, player) {
                        player.storage.QQQ_黄金律法--;
                        lib.element.player.revive.apply(player);
                        player.markSkill('QQQ_黄金律法');
                        if (player.storage.QQQ_黄金律法 <= 0) {
                            player.$skill('赐福消逝');
                        }
                    },
                    group: ['QQQ_黄金律法_1', 'QQQ_黄金律法_2'],
                    subSkill: {
                        1: {
                            trigger: {
                                player: 'damageAfter'
                            },
                            silent: true,
                            filter: (event, player) => !event.nature,
                            async content(event, trigger, player) {
                                player.storage.QQQ_黄金律法--;
                                if (player.storage.QQQ_黄金律法 <= 0) {
                                    player.$skill('赐福消逝');
                                }
                            },
                        },
                        2: {
                            trigger: {
                                source: 'damageBefore'
                            },
                            silent: true,
                            async content(event, trigger, player) {
                                player.storage.QQQ_黄金律法 += trigger.num;
                            },
                        },
                    }
                },
                QQQ_王之财宝: {
                    trigger: {
                        global: ['useCard0'],
                    },
                    forced: true,
                    init: (player) => player.storage.QQQ_王之财宝 = 0,
                    async content(event, trigger, player) {
                        const card = Array.from(ui.cardPile.childNodes).filter((Q) => get.type(Q) == 'equip').randomGet();
                        if (card) {
                            player.equip(card);
                            if (get.cardNameLength(card) == get.cardNameLength(trigger.card)) {
                                player.storage.QQQ_王之财宝++;
                                trigger.player.damage(player.storage.QQQ_王之财宝, 'gold');
                            }
                        }
                    },
                    group: ['QQQ_王之财宝_1'],
                    subSkill: {
                        1: {
                            trigger: {
                                global: ['phaseAfter'],
                            },
                            forced: true,
                            async content(event, trigger, player) {
                                player.storage.QQQ_王之财宝 = 0;
                            },
                        }
                    },
                },
                QQQ_天之锁: {
                    trigger: {
                        global: ['roundStart'],
                    },
                    forced: true,
                    async content(event, trigger, player) {
                        const phaselist = ['phaseZhunbei', 'phaseJudge', 'phaseDraw', 'phaseUse', 'phaseDiscard', 'phaseJieshu'];
                        const skip0 = phaselist.randomGet()
                        player.skip(skip0);
                        game.log(`${get.translation(player)}跳过了${get.translation(skip0)}`)
                        const { result } = await player.chooseTarget('令其随机跳过两个阶段,若其为神势力,则随机跳过四个阶段', (c, p, t) => t != p, [1, game.players.length])
                            .set('ai', (target) => -get.attitude(target, player));
                        if (result.targets && result.targets[0]) {
                            for (var i of result.targets) {
                                if (i.group == 'shen') {
                                    const skip = phaselist.randomGets(4)
                                    i.skipList.addArray(skip);
                                    game.log(`${get.translation(i)}跳过了${get.translation(skip)}`)
                                }
                                else {
                                    const skip = phaselist.randomGets(2)
                                    i.skipList.addArray(skip);
                                    game.log(`${get.translation(i)}跳过了${get.translation(skip)}`)
                                }
                            }
                        }
                    },
                },
                QQQ_贯穿永恒之枪: {
                    trigger: {
                        player: ['useCard0'],
                    },
                    forced: true,
                    init: (player) => player.storage.QQQ_贯穿永恒之枪 = 0,
                    mark: true,
                    intro: {
                        name: '贯穿',
                        content: '$',
                    },
                    _priority: 23,
                    async content(event, trigger, player) {
                        if (trigger.targets && (!player.storage.QQQ_贯穿card || player.storage.QQQ_贯穿card == trigger.card.name)
                            && (!player.storage.QQQ_贯穿target || player.storage.QQQ_贯穿target.Qinclude(trigger.targets))) {
                            player.storage.QQQ_贯穿永恒之枪++;
                        }
                        else {
                            player.storage.QQQ_贯穿永恒之枪 = 1;
                        }
                        player.storage.QQQ_贯穿card = trigger.card.name;
                        if (trigger.targets) {
                            player.storage.QQQ_贯穿target = trigger.targets;
                        }
                        if (player.storage.QQQ_贯穿永恒之枪 > 2) {
                            for (var i of trigger.targets) {
                                i.die();
                            }
                        }
                    },
                },
                //————————————————————————————————————————————？？？
                //你可将所有黑色手牌当作任意一张普通锦囊牌使用,并摸一张牌
                QQQ_miaoxian: {
                    hiddenCard: (player, name) => lib.card[name].type == 'trick' && player.countCards('h', { color: "black" }),
                    enable: "chooseToUse",
                    filter: (event, player) => {
                        return game.qcard(player, 'trick').length && player.hasCard({ color: "black" }, 'h');
                    },
                    chooseButton: {
                        dialog: function (event, player) {
                            const list = game.qcard(player, 'trick');
                            return ui.create.dialog("妙弦", [list, "vcard"], "hidden");
                        },
                        check: function (button) {
                            if (button.link[2] == 'wuzhong') return 9999;
                            return (_status.event.player.getUseValue({
                                name: button.link[2],
                                nature: button.link[3]
                            }, null, true) || 0) / 2 + 10;
                        },
                        backup: function (links, player) {
                            return {
                                audio: "QQQ_miaoxian",
                                popname: true,
                                filterCard: { color: "black" },
                                selectCard: -1,
                                position: "h",
                                viewAs: {
                                    name: links[0][2],
                                    nature: links[0][3],
                                    suit: links[0][0],
                                    number: links[0][1],
                                    storage: { [_status.event.buttoned]: true },
                                },
                                onuse: function (links, player) {
                                    player.draw();
                                },
                            };
                        },
                        prompt: function (links, player) {
                            return "将" + get.translation(player.getCards("h", { color: "black" })) + `当做${get.translation(links[0][2])}使用`;
                        },
                    },
                    ai: {
                        order: function (item, player) {
                            if (player.countCards('h', { color: "black" }) == 1) return 99;
                            return 1;
                        },
                        result: {
                            player: 1,
                        },
                    },
                },
                //————————————————————————————————————————————燎原火
                //出牌阶段,你可以展示牌堆顶一张牌,然后选择是否获得.若你选择获得,则由随机一名其他角色对你使用牌堆中下一张牌.若你不获得,则由你对随机一名角色使用此牌,然后此技能本回合失效
                QQQ_xiaozhang: {
                    enable: ['phaseUse'],
                    async content(event, trigger, player) {//QQQ
                        const card = get.cards(1)[0];
                        player.showCards(card);
                        const { result } = await player.chooseBool(`是否获得${get.translation(card)}`).set('ai', () => true);
                        if (result.bool) {
                            player.gain(card, 'gain2');
                            var num = 2;
                            while (num-- > 0) {
                                const card0 = ui.cardPile.firstChild;
                                const q = game.players.filter((q) => q != player).randomGet();
                                const info = lib.card[card0.name];
                                if (!info.notarget && info.content && info.selectTarget) {
                                    await q.useCard(card0, player, false);
                                }
                                else {
                                    await game.VIDEO('火凤燎原');
                                }
                            }
                        }
                        else {
                            player.tempBanSkill('QQQ_xiaozhang', 'phaseEnd');
                            const q = game.players.randomGet();
                            const info = lib.card[card.name];
                            if (!info.notarget && info.content && info.selectTarget) {
                                player.useCard(card, q, false);
                            }
                        }
                    },
                    ai: {
                        order: 1,
                        result: {
                            player: 1,
                        },
                    }
                },
                //————————————————————————————————————————————饕餮
                //摸牌阶段你改为从任意位置获得等量的桃,每当你摸到桃后,为此牌增加一个标记.每当你摸到带标记的牌之后,你摸等同于此牌标记数的牌
                QQQ_taotieQ: {
                    trigger: {
                        player: ['gainAfter']
                    },
                    forced: true,
                    filter: (event, player) => {
                        if (event.cards) {
                            return event.cards.some((q) => (Object.keys(player.storage).length || q.gaintag.length || (q.cardtags && q.cardtags.length)) || q.name == 'tao');
                        }
                    },
                    async content(event, trigger, player) {
                        var num = 0;
                        for (var i of trigger.cards) {
                            console.log(i);
                            console.log(i.storage);
                            console.log(i.gaintag);
                            num += Object.keys(i.storage).length;
                            num += i.gaintag.length;
                            if (i.cardtags) {
                                num += i.cardtags.length;
                            }
                            if (i.name == 'tao') {
                                i.addGaintag('QQQ_taotieQ');
                                i.storage[Math.random()] = true;
                            }
                        }
                        if (num > 0) {
                            player.draw(num);
                        }
                    },
                    group: ['QQQ_taotieQ_1'],
                    subSkill: {
                        1: {
                            trigger: {
                                player: ['phaseDrawBegin'],
                            },
                            forced: true,
                            async content(event, trigger, player) {
                                trigger.cancel();
                                const cardList = Array.from(ui.cardPile.childNodes).concat(Array.from(ui.discardPile.childNodes))
                                game.countPlayer(function (current) {
                                    cardList.addArray(current.getCards('hej'));
                                });
                                const cards = cardList.filter((q) => q.name == 'tao');
                                if (cards[0]) {
                                    player.gain(cards.randomGets(trigger.num), 'gain2');
                                }
                            },
                        },
                    }
                },
                //————————————————————————————————————————————周泰
                //不屈:锁定技,当你受到伤害后:你将对你造成伤害的牌和牌堆顶的一张牌置于你的武将牌上.若如此做,且你的武将牌上有牌名相同的牌,弃置这些牌,回复等量体力
                QQQ_buqu: {
                    trigger: {
                        player: ['damage']
                    },
                    forced: true,
                    mark: true,
                    intro: {
                        content: 'expansion',
                    },
                    async content(event, trigger, player) {
                        const cards = [ui.cardPile.firstChild];
                        if (trigger.cards) {
                            cards.addArray(trigger.cards);
                        }
                        player.addToExpansion(cards, 'giveAuto', player).gaintag.add('QQQ_buqu');
                        const list = {};
                        for (var i of player.getCards('x')) {
                            if (!list[i.name]) list[i.name] = [];
                            list[i.name].add(i);
                        }
                        for (var i in list) {
                            if (list[i].length > 1) {
                                player.recover(list[i].length);
                                await player.discard(list[i]);
                            }
                        }
                    },
                },
                //负箭:当一名角色使用牌造成伤害后,你将此牌置于你武将牌上,然后你可令其选择使用你武将牌上与此牌名不同的一张牌
                QQQ_fujian: {
                    trigger: {
                        global: ['damageAfter'],
                    },
                    forced: true,
                    _priority: 18,
                    filter: (event, player) => event.cards && event.cards[0],
                    async content(event, trigger, player) {
                        const card = trigger.card ? trigger.card : trigger.cards[0];
                        player.addToExpansion(trigger.cards, 'giveAuto', player).gaintag.add('QQQ_buqu');
                        if (trigger.source && trigger.source.isFriendsOf(player) && player.getCards('x').some((q) => q.name != card.name)) {
                            const { result } = await player.chooseBool('令其选择使用你武将牌上与此牌名不同的一张牌')
                                .set('ai', () => trigger.source.isFriendsOf(player));
                            if (result.bool) {
                                const { result: result1 } = await trigger.source.chooseButton([`选择使用${get.translation(player)}武将牌上与${get.translation(card)}牌名不同的一张牌`, player.getCards('x')])
                                    .set('filterButton', (button) => button.link.name != card.name)
                                    .set('ai', (button) => (trigger.source.getUseValue(button.link, true, true) || 0) + 10);
                                if (result1.links && result1.links[0]) {
                                    await trigger.source.chooseUseTarget(result1.links[0], false, false, 'nodistance');
                                }
                            }
                        }
                    },
                },
                //战竭:若你本阶段未造成伤害,你可以使用或打出武将牌上的牌
                QQQ_zhanjie: {
                    mod: {
                        cardUsable: function (card, player, num) {
                            if (player.getCards('x').includes(card)) return Infinity;
                        },
                        targetInRange: function (card, player) {
                            if (player.getCards('x').includes(card)) return true;
                        },
                    },
                    hiddenCard: function (player, name) {
                        return player.getCards('x').some((q) => q.name == name);
                    },
                    enable: ['chooseToUse', 'chooseToRespond'],
                    forced: true,
                    filter: (event, player) => {
                        for (var i of player.getCards('x')) {
                            if (event.filterCard(i, player, event)) {
                                return true;
                            }
                        }
                    },
                    async content(event, trigger, player) {//event是技能名,event.parent是useskill,parent2是chooseToUse
                        const list = [];
                        const evt = event.getParent(2);
                        if (evt.name == '_wuxie') {
                            if (player.getCards('x').some((q) => q.name == 'wuxie')) {
                                list.addArray(player.getCards('x').filter((q) => q.name == 'wuxie'));
                            }
                        }
                        else {
                            for (var i of player.getCards('x')) {
                                if (evt.filterCard(i, player, evt)) {
                                    list.push(i);
                                }
                            }
                        }
                        if (list.length) {
                            const { result: { links } } = await player.chooseButton(['使用或打出武将牌上的牌', list])
                                .set('ai', (button) => {
                                    if (evt.name == '_wuxie') {
                                        return -get.attitude(player, evt.getParent('useCard').player);
                                    }
                                    const num = player.getUseValue(button.link, null, true);
                                    return num || 0;
                                });
                            if (links && links[0]) {
                                if (links[0].name == 'caochuan') {
                                    player.useCard(links[0], false);
                                    event.parent._trigger = evt.parent._trigger;
                                }
                                if (links[0].name == 'youdishenru') {
                                    player.useCard(links[0], false);
                                    event.parent.youdiinfo = evt.parent.youdiinfo;
                                }
                                if (links[0].name == 'wuxie') {
                                    player.useCard(links[0], false);
                                    event._trigger = evt._trigger;
                                }
                                if (links[0].name == 'chenhuodajie') {
                                    player.useCard(links[0], evt.parent._trigger.player, false);
                                }//AAA
                                if (evt.parent.name == '_save') {
                                    await player.useCard(links[0], _status.dying, false);
                                }
                                if (evt.name == 'chooseToUse' && links[0].name != 'shan') {
                                    await player.chooseUseTarget(links[0], true, false, 'nodistance');//强制//不计入次数//无距离限制
                                }
                                else {
                                    evt.untrigger();
                                    evt.set('responded', true);
                                    evt.result = { bool: true, card: links[0], cards: links };
                                    evt.redo();
                                }
                                game.log(`${get.translation(player)}使用或打出武将牌上的${get.translation(links)}`);
                            }
                        }
                    },
                    ai: {
                        respondSha: true,
                        respondShan: true,
                        order: 10,
                        result: {
                            player: 1,
                        },
                    },
                    group: ['QQQ_zhanjie_1'],
                    subSkill: {
                        1: {
                            trigger: {
                                source: ['damageAfter'],
                            },
                            silent: true,
                            async content(event, trigger, player) {
                                player.tempBanSkill('QQQ_zhanjie', { player: ['phaseAfter', 'phaseZhunbeiAfter', 'phaseDrawAfter', 'phaseUseAfter', 'phaseDiscardAfter', 'phaseJudgeAfter', 'phaseJieshuAfter'] });
                            },
                        },
                    },
                },
                //————————————————————————————————————————————红温流打野
                //红温:锁定技,你的红温不会因使用杀或回合结束消失.若你处于红温状态,则你使用杀指定目标后可以弃置所有牌,然后弃置目标角色所有牌
                QQQ_hongwen: {
                    init: (player) => {
                        player.storage.jiu = 0;
                        player.node.jiu = ui.create.div('.playerjiu', player.node.avatar);
                        player.node.jiu2 = ui.create.div('.playerjiu', player.node.avatar2);
                        player.node.jiu.delete = () => QQQ.kong;
                        player.hongwen = 0;
                        Reflect.defineProperty(player.storage, 'jiu', {
                            get() {
                                return player.hongwen;
                            },
                            set(value) {
                                game.log(`红温层数由${player.hongwen}变为${value}`);
                                if (value > player.hongwen) player.hongwen = value;
                                if (isNaN(value)) player.hongwen++;
                            }
                        });
                    },
                    mark: true,
                    intro: {
                        content: (storage, player) => {
                            return `当前红温层数${player.hongwen}`
                        },
                    },
                    trigger: {
                        player: ['useCardBefore'],
                    },
                    filter: (event, player) => player.hongwen > 0 && event.card && event.card.name == 'sha' && event.targets,
                    check: (event, player) => event.targets.some((q) => !q.isFriendsOf(player) && q.countCards('he') > player.countCards('he')),
                    async content(event, trigger, player) {
                        player.discard(player.getCards('he'));
                        for (var i of trigger.targets) {
                            i.discard(i.getCards('he'));
                        }
                    },
                    mod: {
                        aiOrder: (player, card, num) => {
                            if (get.name(card) == 'sha') return 1;
                        },
                    },
                },
                //打野:锁定技,每当你获得伤害牌后,增加一层红温.当你使用伤害牌后,若此牌未造成伤害,则增加一层红温
                QQQ_daye: {
                    forced: true,
                    trigger: {
                        player: ['gainAfter'],
                    },
                    filter: (event, player) => event.cards && event.cards.some((q) => get.tag(q, 'damage')),
                    async content(event, trigger, player) {
                        player.hongwen += trigger.cards.filter((q) => get.tag(q, 'damage')).length;
                    },
                    group: ['QQQ_daye_1'],
                    subSkill: {
                        1: {
                            trigger: {
                                player: 'useCardEnd',
                            },
                            forced: true,
                            filter: function (event, player) {
                                return get.tag(event.card, 'damage') && event.targets.some(Q => !Q.hasHistory('damage', (Q) => Q.card == event.card));
                            },
                            content: function () {
                                player.hongwen++;
                            },
                        }
                    }
                },
                //换装:锁定技,当你濒死时,移除红温层数并回复等量体力直到你的体力值大于零
                QQQ_huanzhuang: {
                    trigger: {
                        player: 'dying',
                    },
                    firstDo: true,
                    forced: true,
                    filter: function (event, player) {
                        return player.hongwen > 0;
                    },
                    async content(event, trigger, player) {
                        while (player.hongwen > 0 && player.hp <= 0) {
                            player.hongwen--;
                            await player.recover();
                        }
                    },
                    group: ['QQQ_huanzhuang_1'],
                    subSkill: {
                        1: {
                            trigger: {
                                player: "useCard1",
                            },
                            filter: function (event, player) {
                                return event.card && event.card.name == "sha" && !player.hasSkill('jiu');
                            },
                            forced: true,
                            content: function () {
                                trigger.baseDamage += player.hongwen;
                            },
                        }
                    }
                },
                //————————————————————————————————————————————夢塵
                //帝圖:当有角色成为牌唯一目标时,你可以让所有角色成为此牌目标;当一张牌指定多个目标时,你可以取消之,将所有目标角色各一张牌置于牌堆顶,视为对目标角色使用一张五谷丰登
                QQQ_ditu: {
                    trigger: {
                        global: ['useCardBegin'],
                    },
                    check: (event, player) => {
                        const current = game.players.filter((q) => !event.targets.includes(q));
                        const friend = current.filter((q) => q.isFriendsOf(player));
                        const enemy = current.filter((q) => !q.isFriendsOf(player));
                        return (get.effect(player, event.card, player, player) > 0) == (friend.length > enemy.length);
                    },
                    filter: (event, player) => event.targets && event.targets.length == 1 && !['delay', 'equip'].includes(lib.card[event.card.name].type),
                    async content(event, trigger, player) {
                        trigger.targets = game.players;
                    },
                    prompt: (event, player) => {
                        return `让所有角色成为${get.translation(event.card)}目标`;
                    },
                    group: ['QQQ_ditu_1'],
                    subSkill: {
                        1: {
                            trigger: {
                                global: ['useCardBefore'],
                            },
                            prompt: (event, player) => {
                                return `取消${get.translation(event.card)}的目标<${get.translation(event.targets)}>,将所有目标角色各一张牌置于牌堆顶,视为对目标角色使用一张五谷丰登`;
                            },
                            check: (event, player) => {
                                const friend = event.targets.filter((q) => q.isFriendsOf(player));
                                const enemy = event.targets.filter((q) => !q.isFriendsOf(player));
                                return (get.effect(player, event.card, player, player) > 0) == (friend.length < enemy.length);
                            },
                            filter: (event, player) => event.targets && event.targets.length > 1 && event.parent.name != 'QQQ_ditu_1',
                            async content(event, trigger, player) {
                                trigger.all_excluded = true;
                                const list = trigger.targets.filter((q) => q.countCards('he'));
                                for (var i of list) {
                                    const { result } = await player.chooseButton(['将所有目标角色各一张牌置于牌堆顶', i.getCards('he')], true).set('ai', (button) => -get.attitude(player, i) * get.value(button.link));
                                    if (result.links && result.links[0]) {
                                        ui.cardPile.insertBefore(result.links[0], ui.cardPile.firstChild);
                                    }
                                }
                                player.useCard({ name: 'wugu' }, list);
                            },
                        }
                    }
                },
                //乞討:一名角色摸牌阶段结束后,若手牌数为全场最多,其选择一项①交给你x张牌②视为你对其使用x张杀,若此杀造成伤害执行①选项(x为手牌数减手牌上限)
                QQQ_qitao: {
                    trigger: {
                        global: ['phaseDrawAfter'],
                    },
                    forced: true,
                    filter: (event, player) => {
                        if (event.player == player) return false;
                        for (var i of game.players) {
                            if (event.player.countCards('h') < i.countCards('h')) return false;
                        }
                        return event.player.countCards('h') > event.player.getHandcardLimit();
                    },
                    async content(event, trigger, player) {
                        const num = trigger.player.countCards('h') - trigger.player.getHandcardLimit();
                        const { result } = await trigger.player.chooseControl(`交给${get.translation(player)}${num}张牌`, `视为${get.translation(player)}对你使用${num}张杀,每造成一次伤害执行一次①选项`);
                        if (result.control == `交给${get.translation(player)}${num}张牌`) {
                            await trigger.player.chooseToGive(player, 'he', num, true);
                        }
                        else {
                            var num1 = num;
                            while (num1-- > 0) {
                                const sha = await player.useCard({ name: 'sha' }, trigger.player);
                                if (trigger.player.getHistory('damage', (q) => q.getParent((x) => x == sha)).length > 0) {
                                    await trigger.player.chooseToGive(player, 'he', num, true);
                                }
                            }
                        }
                    },
                },
                //雙生:锁定技,一名角色回合结束时,若你本回合受到过伤害,你摸八张不同牌名的牌,将体力调整至上限,更换武将牌为梦婉清,执行一个出牌阶段
                QQQ_shuangsheng: {
                    trigger: {
                        global: ['phaseAfter'],
                    },
                    forced: true,
                    filter: (event, player) => player.getHistory('damage').length > 0,
                    async content(event, trigger, player) {
                        const seen = new Set();
                        const uniqueList = Array.from(ui.cardPile.childNodes).filter(item => {
                            if (seen.has(item.name)) {
                                return false;
                            }
                            else {
                                seen.add(item.name);
                                return true;
                            }
                        });
                        player.gain(uniqueList.randomGets(8), 'gain2');
                        player.hp = player.maxHp;
                        player.reinit(player.name, 'QQQ_mengwanqing');
                        player.phase();
                    },
                },
                //奉旨乞讨,尔等安敢不服
                //————————————————————————————————————————————梅琳娜
                //火种使命,卢恩女巫
                //使命技,每轮开始时,任意角色可以交给你x张牌,然后你令其增加一项基本数值(x为你令其增加的基本数值+1).若交出牌的是你自己,则改为使用之.<br>成功:当你以此法累计增加六点数值后,你获得<雪山诀别,与树同焚>.<br>失败:当你死亡前,取消之,你获得<猎杀癫火,命定之死>
                QQQ_huozhong: {
                    trigger: {
                        global: ['roundStart'],
                    },
                    priority: 53,
                    forced: true,
                    mark: true,
                    intro: {
                        content: (storage, player) => {
                            var str = '';
                            if (player.storage.QQQ_huozhong) {
                                for (var j in player.storage.QQQ_huozhong) {
                                    str += `已经增加过${j}${player.storage.QQQ_huozhong[j]}点<br>`;
                                }
                            }
                            if (player.hasSkill('QQQ_huozhong')) {
                                str += `已经增加过${player.storage.QQQ_huozhong_num}次数值`;
                            }
                            return str;
                        },
                    },
                    init: (player) => {
                        player.storage.QQQ_huozhong = {
                            智力: 0,
                            魔力: 0,
                            生命: 0,
                            精力: 0,
                            速度: 0,
                        };
                        player.storage.QQQ_huozhong_num = 0;
                    },
                    async content(event, trigger, player) {
                        game.playAudio('../extension/温柔一刀/audio/相逢');
                        const list = ['生命', '智力', '魔力', '速度', '精力'];
                        for (var i of game.players) {
                            var num = 0;
                            if (!i.storage.QQQ_huozhong) {
                                i.storage.QQQ_huozhong = {};
                            }
                            else {
                                for (var j in i.storage.QQQ_huozhong) {
                                    num += i.storage.QQQ_huozhong[j];
                                }
                            }
                            num++;
                            const { result } = await i.chooseCard(`交给${get.translation(player)}${num}张牌,然后增加一项基本数值`, 'he', num).set('ai', (card) => get.attitude(player, i) - get.value(card));
                            if (result && result.cards && result.cards[0]) {
                                if (Math.random() > 0.5) {
                                    game.playAudio('../extension/温柔一刀/audio/你听说过指头女巫吗');
                                }
                                else {
                                    game.playAudio('../extension/温柔一刀/audio/她们是引导褪色者的人');
                                }
                                if (i == player) {
                                    for (var j of result.cards) {
                                        await player.chooseUseTarget(j, true, false, 'nodistance');
                                    }
                                }
                                else {
                                    i.give(result.cards, player);
                                }
                                const { result: result1 } = await player.chooseButton(['令其增加一项基本数值', [list, 'tdnodes']], true)
                                    .set('ai', (button) => {
                                        switch (button.link) {
                                            case '智力': return get.attitude(player, i) * 3.2 * Math.random();
                                            case '魔力': return get.attitude(player, i) * 3.1 * Math.random();
                                            case '生命': return get.attitude(player, i) * 3 * Math.random();
                                            case '精力': return get.attitude(player, i) * 2 * Math.random();
                                            case '速度': return get.attitude(player, i) * 1 * Math.random();
                                        }
                                    });
                                if (result1.links && result1.links[0]) {
                                    if (Math.random() > 0.5) {
                                        game.playAudio('../extension/温柔一刀/audio/你现在没有女巫');
                                    }
                                    else {
                                        game.playAudio('../extension/温柔一刀/audio/我可以代替她的职责');
                                    }
                                    switch (result1.links[0]) {
                                        case '智力': {
                                            i.addSkill('QQQ_huozhong_1');
                                            i.storage.QQQ_huozhong.智力 = i.storage.QQQ_huozhong.智力 + 1 || 1;
                                        } break;
                                        case '魔力': {
                                            i.addSkill('QQQ_huozhong_2');
                                            i.storage.QQQ_huozhong.魔力 = i.storage.QQQ_huozhong.魔力 + 1 || 1;
                                        } break;
                                        case '精力': {
                                            i.addSkill('QQQ_huozhong_3');
                                            i.storage.QQQ_huozhong.精力 = i.storage.QQQ_huozhong.精力 + 1 || 1;
                                        } break;
                                        case '生命': {
                                            i.storage.QQQ_huozhong.生命 = i.storage.QQQ_huozhong.生命 + 1 || 1;
                                            i.gainMaxHp();
                                        } break;
                                        case '速度': {
                                            i.addSkill('QQQ_huozhong_4');
                                            i.storage.QQQ_huozhong.速度 = i.storage.QQQ_huozhong.速度 + 1 || 1;
                                        } break;
                                    }
                                    i.markSkill('QQQ_huozhong');
                                    player.storage.QQQ_huozhong_num++;
                                    if (player.storage.QQQ_huozhong_num > 5) {
                                        if (Math.random() > 0.5) {
                                            game.playAudio('../extension/温柔一刀/audio/你一定能当上艾尔登之王');
                                        }
                                        else {
                                            game.playAudio('../extension/温柔一刀/audio/我必须向你道谢');
                                        }
                                        player.$skill('使命成功');
                                        player.node.avatar.style.backgroundImage = `url('${lib.assetURL}extension/温柔一刀/image/Melina_huozhong.jpg')`;
                                        ui.background.style.backgroundImage = `url('${lib.assetURL}extension/温柔一刀/image/Melina_beijing.jpg')`;
                                        player.awakenSkill('QQQ_huozhong');
                                        player.addSkill('QQQ_fenjin');
                                    }
                                }
                            }
                        }
                    },
                    group: ['QQQ_huozhong_5'],
                    subSkill: {
                        1: {
                            trigger: {
                                player: ['phaseAfter'],
                            },
                            forced: true,
                            init: (player) => player.QQQ_huozhong = 0,
                            async content(event, trigger, player) {
                                if (player.QQQ_huozhong < player.storage.QQQ_huozhong.智力) {
                                    if (Math.random() > 0.5) {
                                        game.playAudio('../extension/温柔一刀/audio/你身体中有另一个人');
                                    }
                                    else {
                                        game.playAudio('../extension/温柔一刀/audio/嗨,另一个你');
                                    }
                                    player.QQQ_huozhong++;
                                    await player.phase();
                                }
                                else {
                                    player.QQQ_huozhong = 0;
                                }
                            },
                        },
                        2: {
                            trigger: {
                                player: ['phaseDrawBegin'],
                            },
                            forced: true,
                            async content(event, trigger, player) {
                                if (Math.random() > 0.5) {
                                    game.playAudio('../extension/温柔一刀/audio/将卢恩化作你的力量');
                                }
                                else {
                                    game.playAudio('../extension/温柔一刀/audio/想好接受我的条件了吗？');
                                }
                                trigger.num += player.storage.QQQ_huozhong.魔力;
                            },
                        },
                        3: {
                            mod: {
                                cardUsable: function (card, player, num) {
                                    return num + player.storage.QQQ_huozhong.精力;
                                },
                            },
                        },
                        4: {
                            mod: {
                                globalFrom: function (from, to, distance) {
                                    return distance - from.storage.QQQ_huozhong.速度;
                                },
                            },
                        },
                        5: {
                            trigger: {
                                player: ['dieBefore'],
                            },
                            forced: true,
                            async content(event, trigger, player) {
                                if (Math.random() > 0.5) {
                                    game.playAudio('../extension/温柔一刀/audio/我请求你最后一次');
                                }
                                else {
                                    game.playAudio('../extension/温柔一刀/audio/不要否认生命的存在');
                                }
                                player.$skill('使命失败');
                                player.node.avatar.style.backgroundImage = `url('${lib.assetURL}extension/温柔一刀/image/Melina_dianhuo.jpg')`;
                                const video = window.document.createElement("video");
                                video.src = 'extension/温柔一刀/MKV/癫火之王.mp4';
                                video.style = "bottom: 0%; left: 0%; width: 100%; height: 100%; object-fit: cover; object-position: 50% 50%; position: absolute;";
                                video.style.zIndex = 0.1;
                                video.autoplay = true;
                                video.loop = true;
                                document.body.appendChild(video);
                                video.addEventListener('error', function () {
                                    video.remove();
                                });
                                trigger.cancel();
                                player.awakenSkill('QQQ_huozhong');
                                player.addSkill('QQQ_mingsi');
                            },
                        },
                    },
                },
                //雪山诀别,与树同焚
                //限定技,你令所有累计受到伤害大于等于其原始体力的角色死亡,然后你死亡
                QQQ_fenjin: {
                    limited: true,
                    skillAnimation: true,
                    animationColor: 'water',
                    trigger: {
                        global: ['phaseBegin'],
                    },
                    filter: (event, player) => game.players.some((i) => player.storage.QQQ_fenjin[i.playerid] >= lib.character[i.name].hp),
                    check: (event, player) => {
                        const current = game.players.filter((i) => player.storage.QQQ_fenjin[i.playerid] >= lib.character[i.name].hp);
                        const friend = current.filter((q) => q.isFriendsOf(player));
                        const enemy = current.filter((q) => !q.isFriendsOf(player));
                        return enemy.length > friend.length;
                    },
                    group: ['QQQ_fenjin_1'],
                    init: (player) => {
                        if (Math.random() > 0.5) {
                            game.playAudio('../extension/温柔一刀/audio/你准备好了吗');
                        }
                        else {
                            game.playAudio('../extension/温柔一刀/audio/好久不见');
                        }
                        player.storage.QQQ_fenjin = {};
                        for (var i of game.players) {
                            player.storage.QQQ_fenjin[i.playerid] = 0;
                            for (var j of i.actionHistory) {
                                if (j.damage.length) {
                                    for (var x of j.damage) {
                                        player.storage.QQQ_fenjin[i.playerid] += x.num;
                                    }
                                }
                            }
                        }
                    },
                    mark: true,
                    intro: {
                        content: (storage, player) => {
                            var str = '当前会被巨人火焰焚烬的角色:';
                            for (var i of game.players) {
                                if (player.storage.QQQ_fenjin[i.playerid] >= lib.character[i.name].hp) {
                                    str += get.translation(i);
                                }
                            }
                            return str;
                        },
                    },
                    async content(event, trigger, player) {
                        if (Math.random() > 0.5) {
                            game.playAudio('../extension/温柔一刀/audio/黄金树燃烧吧');
                        }
                        else {
                            game.playAudio('../extension/温柔一刀/audio/伴火同进者,终有一天会遇见命定之死');
                        }
                        await game.VIDEO('燃烧黄金树');
                        player.awakenSkill('QQQ_fenjin');
                        for (var i of game.players.filter((q) => q != player)) {
                            if (player.storage.QQQ_fenjin[i.playerid] >= lib.character[i.name].hp) {
                                await i.die();
                            }
                        }
                        player.die();
                    },
                    subSkill: {
                        1: {
                            trigger: {
                                global: 'damage',
                            },
                            forced: true,
                            async content(event, trigger, player) {
                                if (Math.random() > 0.5) {
                                    game.playAudio('../extension/温柔一刀/audio/我们的约定完成了');
                                }
                                else {
                                    game.playAudio('../extension/温柔一刀/audio/再见');
                                }
                                if (!player.storage.QQQ_fenjin[trigger.player.playerid]) {
                                    player.storage.QQQ_fenjin[trigger.player.playerid] = 0;
                                }
                                player.storage.QQQ_fenjin[trigger.player.playerid] += trigger.num;
                            },
                        },
                    },
                },
                //猎杀癫火,命定之死
                //锁定技,当一名角色在其濒死结算后未死亡,你获得一个<命定之死>.<br>当一名角色回复体力时,你可以移去一枚<命定之死>并改为对其使用一张<神杀>.当一名角色获得牌时,你可以移去一枚<命定之死>并改为对其使用一张<冰杀><br>当你死亡前,若你的<命定之死>数小于你的体力上限,你豁免
                QQQ_mingsi: {
                    trigger: {
                        player: ['dieBefore'],
                    },
                    forced: true,
                    mark: true,
                    init: (player) => player.storage.QQQ_mingsi = 0,
                    intro: {
                        name: '死',
                        content: '#',
                    },
                    filter: (event, player) => player.maxHp > player.storage.QQQ_mingsi,
                    async content(event, trigger, player) {
                        if (Math.random() > 0.5) {
                            game.playAudio('../extension/温柔一刀/audio/否认了这些也就算不上王了');
                        }
                        else {
                            game.playAudio('../extension/温柔一刀/audio/你能不能悬崖勒马');
                        }
                        trigger.cancel();
                    },
                    group: ['QQQ_mingsi_1', 'QQQ_mingsi_2', 'QQQ_mingsi_3'],
                    subSkill: {
                        1: {
                            trigger: {
                                global: ['dyingAfter'],
                            },
                            forced: true,
                            filter: (event, player) => game.players.includes(event.player),
                            async content(event, trigger, player) {
                                if (Math.random() > 0.5) {
                                    game.playAudio('../extension/温柔一刀/audio/你受赐癫火了');
                                }
                                else {
                                    game.playAudio('../extension/温柔一刀/audio/我们已不能相容');
                                }
                                player.addMark('QQQ_mingsi');
                            },
                        },
                        2: {
                            trigger: {
                                global: ['recoverBefore'],
                            },
                            prompt: (event, player) => {
                                return `终止${get.translation(event.player)}回复体力,并改为对其使用一张<神杀>`;
                            },
                            filter: (event, player) => player.storage.QQQ_mingsi > 0,
                            check: (event, player) => !event.player.isFriendsOf(player),
                            async content(event, trigger, player) {
                                game.playAudio('../extension/温柔一刀/audio/为你献上,命定之死');
                                await game.VIDEO('命定之死');
                                player.storage.QQQ_mingsi--;
                                trigger.cancel();
                                trigger.player.useCard({ name: 'sha', nature: 'kami' }, trigger.player, trigger.cards);
                            },
                        },
                        3: {
                            trigger: {
                                global: ['gainBefore'],
                            },
                            prompt: (event, player) => {
                                return `终止${get.translation(event.player)}获得牌,并改为对其使用一张<冰杀>`;
                            },
                            filter: (event, player) => player.storage.QQQ_mingsi > 0,
                            check: (event, player) => !event.player.isFriendsOf(player),
                            async content(event, trigger, player) {
                                if (Math.random() > 0.5) {
                                    game.playAudio('../extension/温柔一刀/audio/我会杀了你,像黑夜追逐白天');
                                }
                                else {
                                    game.playAudio('../extension/温柔一刀/audio/永别了');
                                }
                                player.storage.QQQ_mingsi--;
                                trigger.cancel();
                                trigger.player.useCard({ name: 'sha', nature: 'ice' }, trigger.player, trigger.cards);
                            },
                        },
                    },
                },
                //————————————————————————————————————————————无极
                //论道:锁定技,每名角色出牌阶段开始时,所有角色都对随机目标使用手牌中的随机一张牌,若有人以此法指定自身为目标,则你摸一张牌
                论道: {
                    trigger: {
                        global: 'phaseUseBegin',
                    },
                    forced: true,
                    _priority: 45,
                    async content(event, trigger, player) {
                        for (const i of game.players) {
                            const card = i.getCards('h').filter((q) => {
                                const info = lib.card[q.name];
                                if (!info.selectTarget) return false;
                                if (typeof info.selectTarget == 'number' && info.selectTarget > 1) return false;
                                return !info.notarget && info.content;
                            }).randomGet();
                            const tar = game.players.randomGet();
                            if (tar == i) {
                                player.draw();
                            }
                            if (card) {
                                await i.useCard(tar, card, false);
                            }
                        }

                    },
                },
                //孤寂:每轮结束时,若存在角色在此轮中为成为过其他角色牌的目标,你令其死亡.<有一种寂寞足以杀人,不是吗？>
                QQQ_guji: {
                    trigger: {
                        global: ['roundStart'],
                    },
                    forced: true,
                    _priority: 46,
                    init: (player) => player.storage.QQQ_guji = [],
                    filter: (event, player) => game.roundNumber > 1,
                    async content(event, trigger, player) {
                        const die = game.players.filter((q) => !player.storage.QQQ_guji.includes(q));
                        for (var i of die) {
                            await i.die();
                        }
                        player.storage.QQQ_guji = [];
                    },
                    group: ['QQQ_guji_1'],
                    subSkill: {
                        1: {
                            trigger: {
                                global: ['useCardBefore'],
                            },
                            forced: true,
                            filter: (event, player) => event.targets && event.targets.some((q) => q != event.player && !player.storage.QQQ_guji.includes(q)),
                            async content(event, trigger, player) {
                                player.storage.QQQ_guji.addArray(trigger.targets);
                            },
                        },
                    },
                },
                //锁定技,每轮开始时,你随机获得一个有技能描述的技能
                无极: {
                    audio: 'yuheng',
                    trigger: {
                        global: 'roundStart',
                    },
                    forced: true,
                    async content(event, trigger, player) {
                        var E = Object.keys(lib.skill).filter(i => {
                            return lib.translate[i + '_info'];
                        });
                        player.addSkillLog(E.randomGet());
                    },
                },
                //————————————————————————————————————————————桴挝
                //桴挝,锁定技,游戏开始时,你的初始手牌增加<桴挝>标记且不计入手牌上限.<br>你失去一张<桴挝>牌时,若你其余手牌中有与<桴挝>点数相同的牌,将这些牌增加<桴挝>标记,否则你摸一张牌并标记为<桴挝>,你弃置其他角色一张牌,若此时为你的回合外,再对一名角色造成一点伤害
                QQQ_fuzhua: {
                    mod: {
                        ignoredHandcard: (card, player) => player.storage.QQQ_fuzhua.includes(card),
                    },
                    init: (player) => {
                        player.storage.QQQ_fuzhua = Array.from(ui.cardPile.childNodes).randomGets(4);
                        player.gain(player.storage.QQQ_fuzhua, 'gain2').gaintag = ['桴挝'];
                    },
                    trigger: {
                        player: ['loseAfter'],
                    },
                    forced: true,
                    filter: (event, player) => event.cards && event.cards.some((q) => player.storage.QQQ_fuzhua.includes(q)),
                    async content(event, trigger, player) {
                        const card0 = trigger.cards.filter((q) => player.storage.QQQ_fuzhua.includes(q));
                        for (var i of card0) {
                            const card1 = player.getCards('h', (q) => q.number == i.number && !player.storage.QQQ_fuzhua.includes(q));
                            if (card1[0]) {
                                player.addGaintag(card1, '桴挝');
                                player.storage.QQQ_fuzhua.addArray(card1);
                            }
                            else {
                                const { result: card } = await player.draw();
                                player.addGaintag(card, '桴挝');
                                player.storage.QQQ_fuzhua.addArray(card);
                            }
                            const { result } = await player.chooseTarget('弃置其他角色一张牌', (c, p, t) => t.countCards('he'))
                                .set('ai', (t) => -get.attitude(player, t));
                            if (result.targets && result.targets[0]) {
                                await player.discardPlayerCard(result.targets[0], 'he');
                            }
                            if (_status.currentPhase != player) {
                                const { result: { targets } } = await player.chooseTarget('对一名角色造成一点伤害')
                                    .set('ai', (t) => -get.attitude(player, t));
                                if (targets && targets[0]) {
                                    targets[0].damage();
                                }
                            }
                        }
                    },
                },
                //————————————————————————————————————————————邹氏
                //魅影:准备阶段,你可以选择一名其他角色,本回合,其当前所有手牌均视为<影>(仅在其手牌区内)
                QQQ_meiying: {
                    trigger: {
                        player: ['phaseZhunbeiBegin'],
                    },
                    forced: true,
                    async content(event, trigger, player) {
                        const { result: { targets } } = await player.chooseTarget('选择一名角色,本回合其当前所有手牌均视为<影>')
                            .set('ai', (t) => -get.attitude(player, t));
                        if (targets && targets[0]) {
                            targets[0].addTempSkill('QQQ_meiying_1');
                            targets[0].storage.QQQ_meiying = targets[0].getCards('h');
                            for (var i of targets[0].storage.QQQ_meiying) {
                                i.storage.QQQ_meiying = true;
                            }
                        }
                    },
                    subSkill: {
                        1: {
                            init: (player) => {
                                player.storage.QQQ_meiying = player.getCards('h');
                                for (var i of player.storage.QQQ_meiying) {
                                    i.storage.QQQ_meiying = true;
                                }
                            },
                            mod: {
                                cardname: function (card, player) {
                                    if (player.storage.QQQ_meiying.includes(card) || (card.storage && card.storage.QQQ_meiying)) {
                                        return 'ying';
                                    }
                                },
                            },
                            onremove: (player, skill) => {
                                for (var i of player.storage.QQQ_meiying) {
                                    i.storage.QQQ_meiying = false;
                                }
                                player.storage.QQQ_meiying = [];
                            },
                        }
                    }
                },
                //倾舞:出牌阶段,你可以将所有手牌与一名其他角色的所有手牌交换,若你仅失去<影>,则此技能本回合失效
                QQQ_qingwu: {
                    enable: 'phaseUse',
                    filterTarget: (c, p, t) => t != p,
                    async content(event, trigger, player) {
                        game.log(`<span class="Qmenu">${get.translation(player)}与${get.translation(event.targets[0])}交换手牌</span>`);
                        const cards0 = event.targets[0].getCards('h');
                        const { cards } = await event.targets[0].gain(player.getCards('h'), 'gain2');
                        if (cards && cards[0]) {
                            if (!cards.some((q) => !q.storage.QQQ_meiying)) {
                                player.tempBanSkill('QQQ_qingwu');
                            }
                        }
                        else {
                            player.tempBanSkill('QQQ_qingwu');
                        }
                        player.gain(cards0, 'gain2');
                    },
                    ai: {
                        order: 1,
                        result: {
                            player: function (player, target, card) {
                                const num = target.countCards('h') - player.countCards('h') + player.countCards('h', (q) => get.name(q, player) == 'ying' || (q.storage && q.storage.QQQ_meiying));
                                console.log(num, 'player');
                                return target.countCards('h') - player.countCards('h');
                            },
                            target: function (player, target, card) {
                                const num = player.countCards('h') - target.countCards('h') + target.countCards('h', (q) => get.name(q, target) == 'ying' || (q.storage && q.storage.QQQ_meiying));
                                console.log(num, 'target');
                                return player.countCards('h') - target.countCards('h');
                            },
                        }
                    },
                },
                //祸水:锁定技,你的回合内,失去<影>的角色视为使用一张不计次数的<杀>(若该角色是你,则改为使用x张不计次数的<杀>,x为失去<影>的数量)
                QQQ_huoshui: {
                    trigger: {
                        global: ['loseAfter'],
                    },
                    forced: true,
                    filter: (event, player) => _status.currentPhase == player && event.cards && event.cards.some((q) => get.name(q, event.player) == 'ying' || (q.storage && q.storage.QQQ_meiying)),
                    async content(event, trigger, player) {
                        if (trigger.player == player) {
                            var num = trigger.cards.filter((q) => get.name(q, player) == 'ying' || (q.storage && q.storage.QQQ_meiying)).length;
                            while (num-- > 0) {
                                await player.chooseUseTarget({ name: 'sha' }, false, false, 'nodistance');
                            }
                        }
                        else {
                            await trigger.player.chooseUseTarget({ name: 'sha' }, false, false, 'nodistance');
                        }
                    },
                },
                //————————————————————————————————————————————郭嘉
                //优游:锁定技.当你的判定牌生效后,你随机获得牌堆\弃牌堆\场上与此牌类型不同的牌各一张.你可以使用或打出<怀隐>牌
                //台词:界天妒
                QQQ_youyou: {
                    trigger: {
                        player: 'judgeAfter',
                    },
                    forced: true,
                    async content(event, trigger, player) {
                        const types = [lib.card[trigger.result.card.name].type];
                        const cards1 = [];
                        const cards = Array.from(ui.cardPile.childNodes).concat(Array.from(ui.discardPile.childNodes));
                        for (var i of game.players) {
                            if (i != player) {
                                cards.addArray(i.getCards('hejxs'));
                            }
                        }
                        cards.randomSort();
                        for (var i of cards) {
                            if (!types.includes(lib.card[i.name].type)) {
                                types.add(lib.card[i.name].type);
                                cards1.push(i);
                            }
                        }
                        player.gain(cards1, 'gain2');
                    },
                    group: ['QQQ_youyou_1'],
                    subSkill: {
                        1: {
                            mod: {
                                cardUsable: function (card, player, num) {
                                    const boss = game.players.filter((q) => q.hasSkill('QQQ_youyou'));
                                    const cards = [];
                                    for (var i of boss) {
                                        cards.addArray(i.getCards('x'))
                                    }
                                    if (cards.includes(card)) return Infinity;
                                },
                                targetInRange: function (card, player) {
                                    const boss = game.players.filter((q) => q.hasSkill('QQQ_youyou'));
                                    const cards = [];
                                    for (var i of boss) {
                                        cards.addArray(i.getCards('x'))
                                    }
                                    if (cards.includes(card)) return true;
                                },
                            },
                            hiddenCard: function (player, name) {
                                const boss = game.players.filter((q) => q.hasSkill('QQQ_youyou'));
                                const cards = [];
                                for (var i of boss) {
                                    cards.addArray(i.getCards('x'))
                                }
                                return cards.some((q) => q.name == name);
                            },
                            enable: ['chooseToUse', 'chooseToRespond'],
                            forced: true,
                            filter: (event, player) => {
                                const boss = game.players.filter((q) => q.hasSkill('QQQ_youyou'));
                                const cards = [];
                                for (var i of boss) {
                                    cards.addArray(i.getCards('x'))
                                }
                                for (var i of cards) {
                                    if (event.filterCard(i, player, event)) {
                                        return true;
                                    }
                                }
                            },
                            async content(event, trigger, player) {//event是技能名,event.parent是useskill,parent2是chooseToUse
                                const list = [];
                                const evt = event.getParent(2);
                                const boss = game.players.filter((q) => q.hasSkill('QQQ_youyou'));
                                const cards = [];
                                for (var i of boss) {
                                    cards.addArray(i.getCards('x'))
                                }
                                if (evt.name == '_wuxie') {
                                    if (cards.some((q) => q.name == 'wuxie')) {
                                        list.addArray(cards.filter((q) => q.name == 'wuxie'));
                                    }
                                }
                                else {
                                    for (var i of cards) {
                                        if (evt.filterCard(i, player, evt)) {
                                            list.push(i);
                                        }
                                    }
                                }
                                if (list.length) {
                                    const { result: { links } } = await player.chooseButton(['使用或打出武将牌上的牌', list])
                                        .set('ai', (button) => {
                                            if (evt.name == '_wuxie') {
                                                return -get.attitude(player, evt.getParent('useCard').player);
                                            }
                                            const num = player.getUseValue(button.link, null, true);
                                            return num || 0;
                                        });
                                    if (links && links[0]) {
                                        if (links[0].name == 'caochuan') {
                                            player.useCard(links[0], false);
                                            event.parent._trigger = evt.parent._trigger;
                                        }
                                        if (links[0].name == 'youdishenru') {
                                            player.useCard(links[0], false);
                                            event.parent.youdiinfo = evt.parent.youdiinfo;
                                        }
                                        if (links[0].name == 'wuxie') {
                                            player.useCard(links[0], false);
                                            event._trigger = evt._trigger;
                                        }
                                        if (links[0].name == 'chenhuodajie') {
                                            player.useCard(links[0], evt.parent._trigger.player, false);
                                        }//AAA
                                        if (evt.parent.name == '_save') {
                                            await player.useCard(links[0], _status.dying, false);
                                        }
                                        if (evt.name == 'chooseToUse' && links[0].name != 'shan') {
                                            await player.chooseUseTarget(links[0], true, false, 'nodistance');//强制//不计入次数//无距离限制
                                        }
                                        else {
                                            evt.untrigger();
                                            evt.set('responded', true);
                                            evt.result = { bool: true, card: links[0], cards: links };
                                            evt.redo();
                                        }
                                        game.log(`${get.translation(player)}使用或打出武将牌上的${get.translation(links)}`);
                                    }
                                }
                            },
                            ai: {
                                respondSha: true,
                                respondShan: true,
                                order: 10,
                                result: {
                                    player: 1,
                                },
                            },
                        }
                    }
                },
                //怀隐:每当你受到一点伤害后,你可以展示牌堆顶两张牌并置于你的的武将牌上,称为<怀隐>.若你以此法展示的两张牌颜色相同,你将血量回复至体力上限,否则,你摸两张牌.然后你可将任意张牌分别交给任意名角色
                //台词:界遗计
                QQQ_huaiyin: {
                    trigger: {
                        player: ['changeHp'],
                    },
                    forced: true,
                    mark: true,
                    intro: {
                        content: 'expansion',
                    },
                    filter: (event, player) => event.num <= 0,
                    async content(event, trigger, player) {
                        var num = Math.abs(trigger.num) || 1;
                        while (num-- > 0) {
                            const cards1 = get.cards(2);
                            player.showCards(cards1);
                            player.addToExpansion(cards1, 'giveAuto', player).gaintag = ['QQQ_huaiyin'];
                            if (get.color(cards1[0]) == get.color(cards1[1])) {
                                player.hp = player.maxHp;
                            }
                            else {
                                player.draw(2);
                                while (player.getCards('he').length) {
                                    const { result: { targets } } = await player.chooseTarget('将任意张牌交给任意名角色', (c, p, t) => t != p)
                                        .set('ai', (t) => get.attitude(player, t));
                                    if (targets && targets[0]) {
                                        const { result: { cards } } = await player.chooseCard('he', [1, player.countCards('he')]).set('ai', (c) => 6 - get.value(c));
                                        if (cards && cards[0]) {
                                            await player.give(cards, targets[0]);
                                        }
                                        else {
                                            break;
                                        }
                                    }
                                    else {
                                        break;
                                    }
                                }
                            }
                        }
                    },
                },
                //清识:出牌阶段,你可弃置一张未以此法弃置过的花色牌并发动一次判定,若判定为黑色/ 红色,你获得〖先辅〗并可发动之/ 你可选择一名角色,你与其依次视为使用一张【树上开花】,然后该角色获得〖优游〗直到你下个出牌阶段开始
                //台词:佐幸
                QQQ_qingshi: {
                    enable: 'phaseUse',
                    init: (player) => player.storage.QQQ_qingshi = [],
                    filterCard: (c, player) => !player.storage.QQQ_qingshi.includes(c.suit),
                    selectCard: 1,
                    async content(event, trigger, player) {
                        player.storage.QQQ_qingshi.add(event.cards[0].suit);
                        player.when({ global: 'phaseAfter' }).then(() => player.storage.QQQ_qingshi = []);
                        const { result: { color } } = await player.judge('清识', (card) => (get.color(card) == 'red') ? 2 : 1);//判定结果子属性有name,num,suit,color
                        if (color == 'red') {
                            const { result: { targets } } = await player.chooseTarget('与其依次视为使用一张【树上开花】,然后该角色获得〖优游〗直到你下个出牌阶段开始', (c, p, t) => t != p)
                                .set('ai', (t) => get.attitude(player, t));
                            if (targets && targets[0]) {
                                for (var i of [targets[0], player]) {
                                    i.useCard({ name: 'kaihua' }, i);
                                }
                                targets[0].addSkill('QQQ_youyou');
                                targets[0].when({ global: 'phaseUseBegin' })
                                    .filter((e) => e.player == player)
                                    .then(() => player.removeSkill('QQQ_youyou'));//vars是定义的then里面的,filter直接用外部变量即可
                            }
                        }
                        else {
                            player.addSkill('xianfu');
                            player.addSkill("xianfu2");
                            const { result: { targets } } = await player.chooseTarget("请选择【先辅】的目标", true, (card, player, target) => target != player && (!player.storage.xianfu2 || !player.storage.xianfu2.includes(target)))
                                .set('ai', (t) => get.attitude(player, t));
                            if (targets && targets[0]) {
                                if (!player.storage.xianfu2) {
                                    player.storage.xianfu2 = [];
                                }
                                player.storage.xianfu2.push(targets[0]);
                                if (!targets[0].storage.xianfu_mark) {
                                    targets[0].storage.xianfu_mark = [];
                                }
                                targets[0].storage.xianfu_mark.add(player);
                                targets[0].markSkill("xianfu_mark", null, null, true);
                            }
                        }
                    },
                    ai: {
                        order: 10,
                        result: {
                            player: 3,
                        },
                    }
                },
                //————————————————————————————————————————————蒋干
                //盗书:出牌阶段限一次,你可与一名其他角色进行两次谋弈,你选择真盗、伪盗,其选择真睡、假睡,你选择真降、伪降,其选择真醉、假醉,谋弈成功你获得其3张牌对其造成1点刺属性伤害
                QQQ_daoshu: {
                    enable: 'phaseUse',
                    usable: 1,
                    filterTarget: (c, p, t) => t != p,
                    async content(event, trigger, player) {
                        const list1 = ['真盗', '伪盗'];
                        const list2 = ['真睡', '假睡'];
                        const list3 = ['真降', '伪降'];
                        const list4 = ['真醉', '假醉'];
                        const { result: { links: links1 } } = await player.chooseButton(['谋弈', [list1, 'tdnodes']], true)
                            .set('ai', (button) => Math.random());
                        const { result: { links: links2 } } = await event.target.chooseButton(['谋弈', [list2, 'tdnodes']], true)
                            .set('ai', (button) => Math.random());
                        const { result: { links: links3 } } = await player.chooseButton(['谋弈', [list3, 'tdnodes']], true)
                            .set('ai', (button) => Math.random());
                        const { result: { links: links4 } } = await event.target.chooseButton(['谋弈', [list4, 'tdnodes']], true)
                            .set('ai', (button) => Math.random());
                        if (links1[0] && links2[0] && links3[0] && links4[0]) {
                            game.log(`${get.translation(player)}${links1[0]}${get.translation(event.target)}${links2[0]}`);
                            game.log(`${get.translation(player)}${links3[0]}${get.translation(event.target)}${links4[0]}`);
                            console.log(links1[0].indexOf(list1));
                            if (list1.indexOf(links1[0]) == list2.indexOf(links2[0])) {
                                await player.gainPlayerCard(event.target, Math.min(3, event.target.countCards('he')), 'he', true);
                                event.target.damage('stab')
                            }
                            if (list3.indexOf(links3[0]) == list4.indexOf(links4[0])) {
                                await player.gainPlayerCard(event.target, Math.min(3, event.target.countCards('he')), 'he', true);
                                event.target.damage('stab')
                            }
                        }
                    },
                    ai: {
                        order: 10,
                        result: {
                            target: -3,
                        },
                    },
                },
                //戴罪:你进入濒死时,0.3概率回复一点体力,所有友方角色获得随机一张食物牌
                QQQ_daizui: {
                    trigger: {
                        player: ['dying'],
                    },
                    forced: true,
                    filter: (event, player) => Math.random() < 0.3,
                    async content(event, trigger, player) {
                        player.recover();
                        const cards = [];
                        for (var i in lib.card) {
                            if (lib.card[i].type == 'food') {
                                cards.add(i);
                            }
                        }
                        for (var i of game.players.filter((q) => q.isFriendsOf(player))) {
                            const card = game.createCard(cards.randomGet());
                            i.gain(card, 'gain2');
                        }
                    },
                },
                //————————————————————————————————————————————
                //本体有点卡牌就可以删掉了
                //————————————————————————————————————————————董卓
                //沉势:锁定技,若弃牌堆里的基本牌数大于弃牌堆里的非基本牌数,你使用<杀>造成的伤害+1,受到<杀>造成的伤害-1
                QQQ_chenshi: {
                    trigger: {
                        player: ['damageBegin4'],
                        source: ['damageBefore'],
                    },
                    forced: true,
                    filter: (event, player) => {
                        const num1 = Array.from(ui.discardPile.childNodes).filter((q) => get.type(q) == 'basic').length;
                        const num = Array.from(ui.discardPile.childNodes).length;
                        return num < 2 * num1 && event.card && event.card.name == 'sha';
                    },
                    async content(event, trigger, player) {
                        if (trigger.player == player) {
                            trigger.num--;
                        }
                        else {
                            trigger.num++;
                        }
                    },
                },
                //贪暴:其他角色准备阶段,你可以弃置x%的牌堆(x为你体力值),并将其中的非基本牌移出游戏.若这些牌中<杀>的数量w大于本局游戏其他角色累计使用杀的次数y,则对其使用其中w-y张杀.否则其对你使用其中y-w张杀,且将y归零
                QQQ_tanbao: {
                    trigger: {
                        global: ['phaseZhunbeiBegin'],
                    },
                    mark: true,
                    intro: {
                        content: (storage, player) => `本局游戏其他角色累计使用${player.storage.QQQ_tanbao}次<杀>`,
                    },
                    init: (player) => player.storage.QQQ_tanbao = 0,
                    check: (event, player) => !event.player.isFriendsOf(player),
                    filter: (event, player) => event.player != player,
                    async content(event, trigger, player) {
                        const pile = Array.from(ui.cardPile.childNodes);
                        const num = Math.ceil(pile.length * player.hp / 100);
                        const cards = pile.randomGets(num);
                        player.showCards(cards);
                        game.cardsDiscard(cards);
                        for (var i of cards) {
                            if (get.type(i) != 'basic') {
                                i.selfDestroy();
                            }
                        }
                        const cards1 = cards.filter((q) => q.name == 'sha');
                        const w = cards1.length;
                        const y = player.storage.QQQ_tanbao;
                        if (w > y) {
                            if (y == 0) {
                                for (var i of cards1) {
                                    await player.useCard(i, trigger.player, false);
                                }
                            }
                            else {
                                const { result: { links } } = await player.chooseButton([`使用其中${w - y}张杀`, cards1], w - y, true)
                                    .set('ai', (button) => get.effect(trigger.player, button.link, player, player));
                                if (links && links[0]) {
                                    for (var i of links) {
                                        await player.useCard(i, trigger.player, false);
                                    }
                                }
                            }
                        }
                        else {
                            if (y - w > w) {
                                player.storage.QQQ_tanbao = 0;
                                for (var i of cards1) {
                                    await trigger.player.useCard(i, player, false);
                                }
                            }
                            else {
                                const { result: { links } } = await trigger.player.chooseButton([`使用其中${y - w}张杀`, cards1], y - w, true)
                                    .set('ai', (button) => get.effect(player, button.link, trigger.player, trigger.player));
                                if (links && links[0]) {
                                    player.storage.QQQ_tanbao = 0;
                                    for (var i of links) {
                                        await trigger.player.useCard(i, player, false);
                                    }
                                }
                            }
                        }
                    },
                    group: ['QQQ_tanbao_1'],
                    subSkill: {
                        1: {
                            trigger: {
                                global: ['useCardAfter'],
                            },
                            silent: true,
                            filter: (event, player) => event.player != player && event.card.name == 'sha',
                            async content(event, trigger, player) {
                                player.storage.QQQ_tanbao++;
                            },
                        },
                    },
                },
                //骄横:出牌阶段限一次,你可以与一名其他角色各摸三张牌,然后与其连续进行三次拼点,每次拼点结束后,赢的角色视为对输家使用一张杀
                QQQ_jiaoheng: {
                    enable: 'phaseUse',
                    usable: 1,
                    filterTarget: (c, p, t) => t != p,
                    selectTarget: 1,
                    async content(event, trigger, player) {
                        player.draw(3);
                        event.target.draw(3);
                        var num = 3;
                        while (num-- > 0) {
                            const { result } = await player.chooseToCompare(event.target, (card) => card.number);
                            if (result.num1 >= result.num2) {
                                await player.useCard({ name: 'sha' }, event.target, false);
                            }
                            else {
                                await event.target.useCard({ name: 'sha' }, player, false);
                            }
                        }
                    },
                    ai: {
                        order: 15,
                        result: {
                            target: -2,
                        },
                    }
                },
            },
            translate: {
                //————————————————————————————————————————————董卓
                QQQ_dongzhuo: '✫董卓',
                QQQ_chenshi: '沉势',
                QQQ_chenshi_info: '锁定技,若弃牌堆里的基本牌数大于弃牌堆里的非基本牌数,你使用<杀>造成的伤害+1,受到<杀>造成的伤害-1',
                QQQ_tanbao: '贪暴',
                QQQ_tanbao_info: '其他角色准备阶段,你可以弃置x%的牌堆(x为你体力值),并将其中的非基本牌移出游戏.若这些牌中<杀>的数量w大于本局游戏其他角色累计使用杀的次数y,则对其使用其中w-y张杀.否则其对你使用其中y-w张杀,且将y归零',
                QQQ_jiaoheng: '骄横',
                QQQ_jiaoheng_info: '出牌阶段限一次,你可以与一名其他角色各摸三张牌,然后与其连续进行三次拼点,每次拼点结束后,赢的角色视为对输家使用一张杀',
                //————————————————————————————————————————————蒋干
                QQQ_jianggan: '蒋干',
                QQQ_daoshu: '盗书',
                QQQ_daoshu_info: '出牌阶段限一次,你可与一名其他角色进行两次谋弈,你选择真盗、伪盗,其选择真睡、假睡,你选择真降、伪降,其选择真醉、假醉,谋弈成功你获得其3张牌对其造成1点刺属性伤害',
                QQQ_daizui: '戴罪',
                QQQ_daizui_info: '你进入濒死时,0.3概率回复一点体力,所有友方角色获得随机一张食物牌',
                //————————————————————————————————————————————郭嘉
                QQQ_guojia: '郭嘉',
                QQQ_youyou: '优游',
                QQQ_youyou_info: '锁定技.当你的判定牌生效后,你随机获得牌堆\弃牌堆\场上与此牌类型不同的牌各一张.你可以使用或打出<怀隐>牌',
                QQQ_huaiyin: '怀隐',
                QQQ_huaiyin_info: '每当你受到一点伤害后,你可以展示牌堆顶两张牌并置于你的的武将牌上,称为<怀隐>.若你以此法展示的两张牌颜色相同,你将血量回复至体力上限,否则,你摸两张牌.然后你可将任意张牌分别交给任意名角色',
                QQQ_qingshi: '清识',
                QQQ_qingshi_info: '出牌阶段,你可弃置一张未以此法弃置过的花色牌并发动一次判定,若判定为黑色/ 红色,你获得〖先辅〗并可发动之/ 你可选择一名角色,你与其依次视为使用一张【树上开花】,然后该角色获得〖优游〗直到你下个出牌阶段开始',
                //————————————————————————————————————————————邹氏
                QQQ_zoushi: '邹氏',
                QQQ_meiying: '魅影',
                QQQ_meiying_info: '准备阶段,你可以选择一名其他角色,本回合,其当前所有手牌均视为<影>(仅在其手牌区内)',
                QQQ_qingwu: '倾舞',
                QQQ_qingwu_info: '出牌阶段,你可以将所有手牌与一名其他角色的所有手牌交换,若你仅失去<影>,则此技能本回合失效',
                QQQ_huoshui: '祸水',
                QQQ_huoshui_info: '锁定技,你的回合内,失去<影>的角色视为使用一张不计次数的<杀>(若该角色是你,则改为使用x张不计次数的<杀>,x为失去<影>的数量)',
                //————————————————————————————————————————————桴挝
                QQQ_fuzhua: '桴挝',
                QQQ_fuzhua_info: '锁定技,游戏开始时,你的初始手牌增加<桴挝>标记且不计入手牌上限.<br>你失去一张<桴挝>牌时,若你其余手牌中有与<桴挝>点数相同的牌,将这些牌增加<桴挝>标记,否则你摸一张牌并标记为<桴挝>,你弃置其他角色一张牌,若此时为你的回合外,再对一名角色造成一点伤害',
                //————————————————————————————————————————————无极
                QQQ_无极: '无极',
                无极: '无极',
                无极_info: '<span class="Qmenu">锁定技,</span>每轮开始时,你随机获得一个有技能描述的技能',
                论道: '论道',
                论道_info: '<span class="Qmenu">锁定技,</span>每名角色出牌阶段开始时,所有角色都对随机目标使用手牌中的一张牌,若有人以此法指定自身为目标,则你摸一张牌',
                QQQ_guji: '孤寂',
                QQQ_guji_info: '每轮结束时,若存在角色在此轮中为成为过其他角色牌的目标,你令其死亡',
                QQQ_guji_append: '有一种寂寞足以杀人,不是吗？',
                //————————————————————————————————————————————监听
                QQQ_jianting: '监听',
                QQQ_jianting_info: '当有牌被移出游戏之后,你摸一张牌',
                //————————————————————————————————————————————夢塵
                QQQ_mengchen: '夢塵',
                QQQ_ditu: '帝圖',
                QQQ_ditu_info: '当有角色成为牌唯一目标时,你可以让所有角色成为此牌目标;当一张牌指定多个目标时,你可以取消之,将所有目标角色各一张牌置于牌堆顶,视为对目标角色使用一张五谷丰登',
                QQQ_qitao: '乞討',
                QQQ_qitao_info: '一名角色摸牌阶段结束后,若手牌数为全场最多,其须选择一项①交给你x张牌②视为你对其使用x张杀,每造成一次伤害执行一次①选项(x为其手牌数减手牌上限)',
                QQQ_shuangsheng: '雙生',
                QQQ_shuangsheng_info: '锁定技,一名角色回合结束时,若你本回合受到过伤害,你摸八张不同牌名的牌,将体力调整至上限,更换武将牌为梦婉清,执行一个出牌阶段',
                //————————————————————————————————————————————梅琳娜
                QQQ_Melina: '梅琳娜',
                QQQ_huozhong: '火种使命,卢恩女巫',
                QQQ_huozhong_info: '使命技,每轮开始时,任意角色可以交给你x张牌,然后你令其增加一项基本数值(x为你令其增加的基本数值+1).若交出牌的是你自己,则改为使用之.<br>成功:当你以此法累计增加六点数值后,你获得<雪山诀别,与树同焚>.<br>失败:当你死亡前,取消之,你获得<猎杀癫火,命定之死>',
                QQQ_fenjin: '雪山诀别,与树同焚',
                QQQ_fenjin_info: '限定技,你令所有累计受到伤害大于等于其原始体力的角色死亡,然后你死亡',
                QQQ_mingsi: '猎杀癫火,命定之死',
                QQQ_mingsi_info: '锁定技,当一名角色在其濒死结算后未死亡,你获得一个<命定之死>.<br>当一名角色回复体力时,你可以移去一枚<命定之死>并改为对其使用一张<神杀>.当一名角色获得牌时,你可以移去一枚<命定之死>并改为对其使用一张<冰杀><br>当你死亡前,若你的<命定之死>数小于你的体力上限,你豁免',
                //————————————————————————————————————————————红温流打野
                QQQ_hongwenliu: '红温流打野',
                QQQ_hongwen: '红温',
                QQQ_hongwen_info: '锁定技,你的红温不会因使用杀或回合结束消失.若你处于红温状态,则你使用杀指定目标后可以弃置所有牌,然后弃置目标角色所有牌',
                QQQ_daye: '打野',
                QQQ_daye_info: '锁定技,每当你获得伤害牌后,增加一层红温.当你使用伤害牌后,若此牌未造成伤害,则增加一层红温',
                QQQ_huanzhuang: '换装',
                QQQ_huanzhuang_info: '锁定技,当你濒死时,移除红温层数并回复等量体力直到你的体力值大于零',
                //————————————————————————————————————————————周泰
                QQQ_zhoutai: '周泰',
                QQQ_buqu: '不屈',
                QQQ_buqu_info: '锁定技,当你受到伤害后:你将对你造成伤害的牌和牌堆顶的一张牌置于你的武将牌上.若如此做,且你的武将牌上有牌名相同的牌,弃置这些牌,回复等量体力',
                QQQ_fujian: '负箭',
                QQQ_fujian_info: '当一名角色使用牌造成伤害后,你将此牌置于你武将牌上,然后你可令其选择使用你武将牌上与此牌名不同的一张牌',
                QQQ_zhanjie: '战竭',
                QQQ_zhanjie_info: '若你本阶段未造成伤害,你可以使用或打出武将牌上的牌',
                //————————————————————————————————————————————饕餮
                QQQ_taotieQ: '饕餮',
                QQQ_taotieQ_info: '摸牌阶段你改为从任意位置获得等量的桃,每当你摸到桃后,为此牌增加一个标记.每当你摸到带标记的牌之后,你摸等同于此牌标记数的牌',
                //————————————————————————————————————————————吉尔伽美什
                QQQ_黄金律法: '黄金律法',
                QQQ_黄金律法_info: '<span style="color: gold;">偉大的黃金律法——讓世界規律不亂,讓生命蒙受福祉與賜福</span>',
                QQQ_黄金律法_append: '在赐福消逝之前,你每次死亡都会重生.你每次受到无属性伤害,都会消耗赐福.你每次造成伤害后,都会增加伤害值的赐福',
                QQQ_jinshanshan: '吉尔伽美什',
                QQQ_王之财宝: '王之财宝',
                QQQ_王之财宝_info: '<span style="color: gold;">连接黄金之都的钥匙</span>',
                QQQ_王之财宝_append: '当场上有角色A使用牌X时,你随机装备一张装备牌Y.若Y与X牌名字数相同,你令S加一,然后你对A造成S点金属性伤害.S初始为0,每回合结束后将S重置为0',
                QQQ_天之锁: '天之锁',
                QQQ_天之锁_info: '<span style="color: gold;">对神兵装,曾捕缚了让乌鲁克陷入七年饥荒的<天之公牛>的锁链,其能力为<律神>之物,捕缚的对象神性越高越是增加硬度</span>',
                QQQ_天之锁_append: '每轮开始时,你随机跳过一个阶段并选择任意名角色,令其随机跳过两个阶段.若其为神势力,则随机跳过四个阶段.',
                QQQ_贯穿永恒之枪: '贯穿永恒之枪',
                QQQ_贯穿永恒之枪_info: '<span style="color: gold;">不出意外的话,这把武器命中的目标都会死去</span>',
                QQQ_贯穿永恒之枪_append: '当你连续使用三次相同牌名的牌且这些牌均指定相同的目标,则令目标角色立刻死亡.',
                //————————————————————————————————————————————？？？
                QQQ_miaoxian: '妙弦',
                QQQ_miaoxian_info: '你可将所有黑色手牌当作任意一张普通锦囊牌使用,并摸一张牌',
                //————————————————————————————————————————————燎原火
                QQQ_liaoyuanhuo: '燎原火',
                QQQ_xiaozhang: '嚣张',
                QQQ_xiaozhang_info: '出牌阶段,你可以展示牌堆顶一张牌,然后选择是否获得.若你选择获得,则由随机一名其他角色对你使用牌堆中下两张牌.若你不获得,则由你对随机一名角色使用此牌,然后此技能本回合失效',
            },
        };
        for (var i in yinu.character) {
            lib.translate[`${i}_prefix`] = 'Q';
            yinu.translate[i] = `Q${yinu.translate[i]}`;
        }
        if (lib.config.extension_温柔一刀_AI禁用) {
            for (var i in yinu.character) {
                lib.config.forbidai.add(i);//将包仅点将可用
                yinu.character[i].isAiForbidden = true;//之前的单将Forbidai
            }
        }
        if (!lib.config.all.characters.includes('一怒拔剑')) {
            lib.config.all.characters.push('一怒拔剑');
        }
        if (!lib.config.characters.includes('一怒拔剑')) {
            lib.config.characters.push('一怒拔剑');
        }
        lib.translate['一怒拔剑_character_config'] = `<span class="Qmenu">一怒拔剑</span>`;
        return yinu;
    });
    lib.namePrefix.set('Q', {
        showName: '<span class="Qmenu">Q</span>',
    });
}