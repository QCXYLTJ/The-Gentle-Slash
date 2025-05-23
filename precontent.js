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
MaxHp
武将改名图片也要改,技能改名语音也要改
mod里面的card是vcard
silent发动的触发技不会logskill所以就没有round限制
直接操作卡牌的目标或者exclude会出现bug,因为有些卡牌默认选择两个角色,这时候移除掉一个就会出问题
chooseToUse里面填true会导致强制出牌,没有可以出的就会usecard不存在的牌
precontent这时候还没载入卡牌,这时候finishcards会让温柔一刀部分viewas的技能失效
隐匿将,所以有init的技能不会被载入init,所以标记不存在,偏偏hiddencard又会检测隐匿技能
return (player.stat[player.stat.length - 1].skill.ybhzy_yaxiang || 0) < (player.storage.counttrigger && player.storage.counttrigger.ybhzy_xiasi || 0);//storage.counttrigger可以不存在
主动技async有event.targets和event.target,没有event.card,如果不选牌的话,event.cards是空数组.不加multitarget的话,每个目标执行一次content
usecard时机gain trigger.card是没有用的,因为那是vcard,没有event.target,只有event.targets
result.cancelled是拼点未完成
不能在lib.updetes中检索是game.update输入了空参数
card.storage.mx_pingyiboduo = player;装备就会出错
phasebefore和phaseendphaseafter加的tempskill很容易立刻消失,要注意
disableSkill/unmarkSkill/removeSkill/
*/
//-------------------------------------------------------备忘录1
/*
Q群
//result的target和player里面,参数直接用player即可,用status.event.player,会因为filter调用get.effect时,当前事件为arrangetrigger,没有player,报错
markcount(里面unmark就会报错
花色
sdk.js报错是error或者err或者catch的原因
拼点AI
if (info.onEquip && 
   video(player
   equipx(
   $usedtag:
targets[0].addTempSkill('QQQ_baixiangl_1', { global: 'roundStart' });在某时机添加同时机失去的临时技能会卡死
skillblocker内部检测hasskill会卡死,无限自循环
disableskill删掉onremove里面的storage,某些技能通过init来添加标记就因为有技能而不能添加,然后没标记报错
async content 有event.targets、event.target、event.cards,没有event.card
damageBefore加伤
damageBegin转属性
damageBegin4减伤害
directgain会清空参数数组
如果chooseusetarget使用卡牌,卡牌的selecttaget参数都是undefined
changeboss\((.+),.+\)
changeboss($1)
while卡死,
换图片路径之后除了卡牌包、武将包以及技能语音路径要修改,可能有其他直接写路径的调用,可能遗漏
*/
//------------------------------------------------先查询是否最新版
//------------------------------------------------解混淆
/* 
\s([^'\s]*):
'$1':
先变换成员表达链接符,再花指令处理
setInterval常量计算会被删掉
*/
/*
//------------------------------------------------脚本替换
\),\n\s*\(====;\n
.i
for (var i =
[,//, ,//,]//,)
cards.splice//i.discard()
//-------------------------------------------------------正则替换
!((?!\(\b)[^&|\s]*) == //$1 !=
'die:(?!ext\b)
function \(.*\) \{\n\s*\}//function \(.*\) \{ \}//= () => { }
'[^)']+logSkill[^']*'//'[^)']*logSkill[^']+'//'[^)']+logSkill[^']+'//popup: false,
\.filterCard\(\{([^),]*)\)
.filterCard({$1,player)
event, step, source, 
: function//content*\\content: function*\\以及？:
(?<!classList)(?<!window)(?<!arena)(?<!cardPile)\.contains\(//.includes(
audio:\s*\[\s*('[^']*'),\s*(\d+)\s*\],//audio:$1,
audio:\s*\[('[^']*')\],//audio:$1,
lib\.element\.Player.+= fun//   get\..+= fun//game\..+= fun
console\.log\(.+\);
game\.delay\(.*\);
game\.delayx\(.*\);
player\.logSkill\(.*\);
\n\s*\n
\s\scontent\((?!storage\b).+\)//precontent\((?!storage\b).+\)
\starget\((?!card|player\b).+\)
\splayer\((?!card|player\b).+\)
\sorder\((?!card|item|skill|name\b).+\)
\s\sevent.name = //getdefaulthandertype函数报错eventname[0].touppercase没有eventname[0],是因为技能修改了event.name
PlayerCard\(.+set\('ai', function \(card\)//PlayerCard\(.+\n\s*\.set\('ai', function \(card\)
lib.nature.add\('(.+)'\)//lib.nature.set('$1',90)
card.fix\(\);\n\s*card.remove\(\);
countCards\('(?!(h|he|e|j|ej|hej|hs|x|s|hes|hse)')[^'"]*'\)
.hasCard\('([^'"]*)'\)
.set\('ai', function \(.+,
.ai = function \(.+,
//-------------------------------------------------------普通替换
identityList[i]
updateMark
syncStorage
lib.config.characters.remove
lib.config.characters.push
lib.config.all.characters.remove
lib.config.all.characters.push
game.saveConfig('characters', 
lib.config.cards.remove
lib.config.cards.push
lib.config.all.cards.remove
lib.config.all.cards.push
game.saveConfig('cards', 
addCharacterPack
die_audio
url("
url('
lib.assetURL
src=extension
Object.keys(extensionInfo)
basic.extensionDirectoryPath
basic.resolve
basic.js
hasSkill('')
ai.shown
player.addExpose
timeout:
(result.links[0][2])
({ name: result.links[0] })
card.selfDestroy====>cards?.forEach(q => q.selfDestroy(event));
lib.nature.//Array.from(lib.nature.keys())
event.result.cards = []//delete event.result.skill
$equip
directequip
storage.disableEquip//disabledSlots
storage.disableEquip.includes//hasDisabledSlot
storage.disableEquip.length//countDisabledSlot
storage.disableEquip.add//disableEquip
storage.disableEquip.remove//enableEquip
event.getParent(2).filterCard
if (lib.device || lib.node)
left2 = left2.previous;
= game.addPlayer//gain事件找不到owner.lose就是因为加的随从没有getId
while (true)
countDiscardableCards('//countgainableCards('
lib.filter.characterDisabled =
game.notMe//game.swapcontrol//ui.click.auto();
lib.character[i][4].indexOf(//lib.character[i][4].push
if (evt)//phaseLoop//_status.event =
.hasCard('h
Object.setPrototypeOf(next, lib.element.Button.prototype);//QQQ
Object.setPrototypeOf(layer, lib.element.Dialog.prototype); //QQQ
lib.extensionMenu
BUTTONVALUE(button.link)
decade//十周年UI//tenui
selectTarget() {返回数组而不是数字
.canAddJudge(//输入字符串导致checkmod报错
return 8.5 - get.equipValue(card, player) / 20;//value = get.value(current, player);
button.link[0][2]是字符button.link[0]才是字符串//backup内的check参数是card//backup外的check参数是button
event.logged
cards[0].
player.name == //全局不杀//音效图片不杀//current.name ==
lutou//qhly
开启所有菜单按钮
*/
import { updateActiveCard, setUpdateActiveCard, menux, menuxpages, clickToggle, createConfig } from '../../noname/ui/create/menu/index.js'; //UI.create.cardPackMenu相关参数
import { lib, game, ui, get, ai, _status } from '../../noname.js';
export { precontent };
_status.gentle = {};
const windowq = function () {
    window.QQQ = {
        div: document.createElement('div'),//存放移除的节点
        boss: [],//存放温柔一刀boss名字
        global: {},//全局技能控制台
        config: {},//温柔一刀菜单
        DEEP(path) {
            const [top, ...deep] = path.split('.');
            var Q = window[top];
            for (const i of deep) {
                if (Q && Q[i] && typeof Q[i] === 'object') {
                    Q = Q[i];
                } else {
                    console.log(Q, i, '不是对象');
                    return false;
                }
            }
            return true;
        },
    };
    for (const key in lib.config) {
        if (key.startsWith('extension_温柔一刀_')) {
            QQQ.config[key.slice(15)] = lib.config[key];
        }
    }
    //—————————————————————————————————————————————————————————————————————————————数据操作相关自定义函数
    const numfunc = function () {
        if (!lib.number) {
            lib.number = [];
            for (var i = 1; i < 14; i++) {
                lib.number.add(i);
            }
        } //添加lib.number
        window.sgn = function (bool) {
            if (bool) return 1;
            return -1;
        };//true转为1,false转为-1
        window.numberq0 = function (num) {
            if (isNaN(Number(num))) return 0;
            return Math.abs(Number(num));
        };//始终返回正数(取绝对值)
        window.numberq1 = function (num) {
            if (isNaN(Number(num))) return 1;
            return Math.max(Math.abs(Number(num)), 1);
        };//始终返回正数且至少为1(取绝对值)
        window.number0 = function (num) {
            if (isNaN(Number(num))) return 0;
            return Math.max(Number(num), 0);
        };//始终返回正数
        window.number1 = function (num) {
            if (isNaN(Number(num))) return 1;
            return Math.max(Number(num), 1);
        };//始终返回正数且至少为1
        window.deepClone = function (obj) {
            const clone = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const info = obj[key];
                    if (typeof info == 'object') {
                        if (Array.isArray(info)) {
                            clone[key] = info.slice();
                        } else {
                            clone[key] = window.deepClone(info);
                        }
                    } else {
                        clone[key] = info;
                    }
                }
            }
            return clone;
        }; //深拷贝对象
    };
    numfunc();
}
windowq();
const precontent = async function () {
    //—————————————————————————————————————————————————————————————————————————————测试区
    if (QQQ.config.报错) {
        lib.skill._QUANJU = {
            trigger: {
                global: ['gameStart'],
            },
            silent: true,
            firstDo: true,
            _priority: 9999,
            filter: (event, player) => player == game.me,
            async content(event, trigger, player) {
                for (const i of lib.inpile) {
                    if (!lib.card[i]) {
                        console.log(i);
                        alert(i + '没有info');
                    }
                }//onfree之后才有inpile与牌堆
                for (const i of Array.from(ui.cardPile.childNodes)) {
                    if (lib.card[i.name].mode && !lib.card[i.name].mode.includes(lib.config.mode)) {
                        console.log(i.name, '不该存在于牌堆的牌');
                    }
                }//onfree之后才有inpile与牌堆
                for (const i in lib.card) {
                    const info = lib.card[i];
                    let range;
                    let select = get.copy(info.selectTarget);
                    if (select == undefined) {
                        if (info.filterTarget == undefined) range = [0, 0];
                    } else if (typeof select == 'number') range = [select, select];
                    else if (get.itemtype(select) == 'select') range = select;
                    else if (typeof select == 'function') range = select({ name: i }, player);
                    if (!Array.isArray(range)) {
                        alert(i + 'range有问题');
                    }
                } //卡牌加入牌堆
            },
        };//只触发一次
        lib.skill._测试4 = {
            trigger: {
                global: [
                    // 'chooseToUseBefore',
                    // 'gameStart',
                    // 'chooseButtonBefore',
                    // 'chooseControlBefore'
                    // 'chooseCharacterBefore'
                ],//QQQ
                player: [
                    //'useCardToBegin'
                    //'useCardAfter'
                    //'phaseBegin',
                    //'dieBegin'
                    //'damageEnd'
                    //'changeHpBefore'
                ],
            },
            silent: true,
            async content(event, trigger, player) {
                debugger;
                //QQQ
                /*
                lib.card.list.some((q)=>q[2]=='火链')
                const { result: { control } } = await player.chooseControl('获得', '替换')
                    .set('ai', (e, p) => ['获得', '替换'].randomGet());
                if (control == '获得') {
                }
                const { result: { cards } } = await player.chooseCard('he', [1, player.countCards('he')])
                    .set('ai', (c) => 6 - get.value(c));
                    if (cards && cards[0]) {
                }
                const { result: { targets } } = await player.chooseTarget('对一名角色造成一点伤害', (c, p, t) => p != t)
                    .set('ai', (t) => -get.attitude(player, t));
                    if (targets && targets[0]) {
                }
                const { result: { links } } = await player.chooseButton(['请选择卡牌', list], true, trigger.num)
                    .set('ai', (button) => get.value(button.link));
                if (links && links[0]) {
                }
                */
                /*
                game.me.gain(game.createCard('wuxie'), 'gain2');
                var num = 20;
                var evt = _status.event;
                while (num-- > 0) {
                    console.log(evt.name);
                    evt = evt.parent;
                }
                Array.from(ui.cardPile.childNodes).some((q) => q.name == 'ywhy_zhizunmojie')
                throw new Error();
                for (const i of player.skills) {
                    if (lib.skill[i].forced) {
                        delete lib.skill[i].forced;
                    }
                }
                player.node.handcards1.appendChild(game.createCard('轩辕剑'));
                player.addSkill('qianxing');
                player.delete();
                player.classList.add('removing');
                player.classList.add("hidden");
                player.gain(trigger.cards);
                trigger.cancel();
                player.next.damage('blood');
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
                */
            },
            _priority: 19,
        };
    }
    //—————————————————————————————————————————————————————————————————————————————lib.onfree
    lib.onfree.push(function () {
        console.log(Object.keys(lib.skill).length, 'lib.onfree', 'skill');
        console.log(Object.keys(lib.card).length, 'card');
        console.log(Object.keys(lib.character).length, 'character');
        game.finishCards();
        for (const i in lib.skill) {
            const info = lib.skill[i];
            if (typeof info != 'object') {
                if (QQQ.config.报错) {
                    alert(i + 'info不是对象');
                }
                continue;
            }
            if (info.enable == 'phaseUse' && !info.viewAs) {
                if (typeof info.ai != 'object') {
                    info.ai = {
                        order: 10,
                        result: {
                            player: 1,
                        },
                    };
                    console.log('修复增加', `${i}的ai`);
                }
                if (!info.ai.order && !info.ai.basic?.order) {
                    info.ai.order = 10;
                    console.log(`修改${i}的order为10`);
                }
                if (typeof info.ai.result != 'object') {
                    info.ai.result = {
                        player: 1,
                    };
                    console.log('修复增加', `${i}的ai.result`);
                }
                if (!info.ai.result.player && !info.ai.result.target) {
                    info.ai.result.player = 1;
                    console.log(`修改${i}的result.player为1`);
                }
                const con = info.content;
                if (con && con.toString().includes('event.card.') && !con.toString().includes('event.card =')) {
                    alert(i + 'content有问题4');
                }
            }//防止主动技ai不发动
            // if (info.trigger && !info.forced && !info.silent && !info.cost && !info.direct && !info.frequent && !info.check) {
            //     info.forced = true;
            //     //console.log(`修改${i}的forced为true`);
            // }//这个问题不大,没有forced也会发动
            if (!info._priority && !info.priority && !info.lastDo && !info.firstDo) {
                info._priority = Math.random();
            }
            if (QQQ.config.加倍模式) {
                if (info.usable == 1) {
                    try {
                        info.usable = 2;
                    } catch (e) {
                        console.log(i + '不能修改usable');
                    }
                }
            } //加倍模式
            if (QQQ.config.禁止多次触发) {
                try {
                    info.usable = 1;
                } catch (e) {
                    console.log(i + '不能修改usable');
                }
            } //禁止多次触发
            if (QQQ.config.卖血模式) {
                if (!['dcshibei', 'shibei'].includes(i)) {
                    if (info.ai && ['maihp', 'maixie_defend', 'maixie'].some((q) => info.ai[q]) && info.trigger?.player) {
                        if (Array.isArray(info.trigger.player)) {
                            for (let j of info.trigger.player) {
                                if (j == 'damageEnd') {
                                    j = 'changeHp';
                                }
                            }
                        }
                        else if (info.trigger.player == 'damageEnd') {
                            info.trigger.player = 'changeHp';
                        }
                    }
                }
            } //卖血模式
            if (QQQ.config.报错) {
                if (info.round && info.popup == false) {
                    alert(i + 'round与popup共存');
                }
                if (info.trigger) {
                    for (const j in info.trigger) {
                        const infox = info.trigger[j];
                        if (!['player', 'global', 'source', 'target'].includes(j)) {
                            alert(i + 'trigger有问题');
                        }
                        if (!Array.isArray(infox) && typeof infox != 'string') {
                            alert(i + 'trigger有问题');
                        }
                        if (typeof infox == 'string') {
                            if (infox == 'logSkillBegin' && info.popup != false && !info.direct && !info.usable) {
                                console.log(i + 'trigger有问题');
                            }
                        }
                        if (Array.isArray(infox)) {
                            if (infox.includes('logSkillBegin') && info.popup != false && !info.direct && !info.usable) {
                                console.log(i + 'trigger有问题');
                            }
                        }
                    }
                }
                if (info.cost) {
                    if (info.forced || info.direct) {
                        alert(i + 'cost与forced共存');
                    }
                }
                if (info.audio == i) {
                    alert(i + 'audio');
                }
                if (info.audio && info.audio[0] == i) {
                    alert(i + 'audio');
                }
                if (info.trigger && !info.content) {
                    alert(i + '没有content');
                }
                if (info.result) {
                    alert(i + 'ai有问题1');
                }
                if (info.effect && (info.effect.player || info.effect.target)) {
                    alert(i + 'ai有问题2');
                }
                if (info.ai) {
                    if (info.ai.player || info.ai.target) {
                        alert(i + 'ai有问题3');
                    }
                    if (info.ai.result) {
                        const pla = info.ai.result.player;
                        const tar = info.ai.result.target;
                        if (typeof pla == 'function') {
                            if (pla.toString().includes('_status.event.player')) {
                                alert(i + 'ai有问题4');
                            }
                        }
                        if (typeof tar == 'function') {
                            if (tar.toString().includes('_status.event.player')) {
                                alert(i + 'ai有问题5');
                            }
                        }
                    }
                    if (info.ai.ai) {
                        alert(i + 'ai有问题6');
                    }
                }
            }
        }
        if (QQQ.config.报错) {
            for (const i in lib.characterSort) {
                const info = lib.characterSort[i];
                for (const pack in info) {
                    if (!Array.isArray(info[pack])) {
                        alert(i + pack + '分包有误');
                    }
                }
            }
        }
        game.BGM = [];
        game.getFileList('extension/温柔一刀/BGM', (folders, files) => {
            if (files && files.length) {
                files.forEach((n) => {
                    if (n.includes('.mp3')) {
                        game.BGM.add(`extension/温柔一刀/BGM/${n}`);
                    }
                });
            }
        });
        game.getFileList('audio/background', (folders, files) => {
            if (files && files.length) {
                files.forEach((n) => {
                    if (n.includes('.mp3')) {
                        game.BGM.add(`audio/background/${n}`);
                    }
                });
            }
        });
        if (!lib.config.gentle_BGM) {
            game.saveConfig('gentle_BGM', game.BGM.randomGet());
        }
        ui.backgroundMusic.src = lib.config.gentle_BGM;
        ui.backgroundMusic.loop = true;
        ui.create.system(
            '换歌',
            function () {
                const name = game.BGM.randomGet();
                if (name) {
                    game.saveConfig('gentle_BGM', name);
                    ui.backgroundMusic.src = name;
                } else {
                    ui.backgroundMusic.src = `extension/温柔一刀/BGM/望乡曲.mp3`;
                }
                ui.backgroundMusic.loop = true;
            },
            true
        ); //BGM
    }); //需要晚的时机的
    //—————————————————————————————————————————————————————————————————————————————lib.onover
    lib.onover.push(function (result) {
        if (!lib.config.Qrecord) {
            lib.config.Qrecord = {};
        }
        for (const i of game.players.concat(game.dead)) {
            if (!lib.config.Qrecord[i.name]) {
                lib.config.Qrecord[i.name] = {};
            }
            const info = lib.config.Qrecord[i.name];
            if (result == true) {
                if (i.isFriendsOf(game.me, true)) {
                    info.win = numberq0(info.win) + 1;
                } else {
                    info.lose = numberq0(info.lose) + 1;
                }
            } else {
                if (i.isFriendsOf(game.me, true)) {
                    info.lose = numberq0(info.lose) + 1;
                } else {
                    switch (lib.config.mode) {
                        case 'boss':
                            info.win = numberq0(info.win) + 1;
                            break;
                        case 'doudizhu':
                            info.win = numberq0(info.win) + 1;
                            break;
                        case 'single':
                            info.win = numberq0(info.win) + 1;
                            break;
                        case 'identity':
                            {
                                if (game.zhu.isAlive()) {
                                    if (i.isFriendsOf(game.zhu, true)) {
                                        info.win = numberq0(info.win) + 1;
                                    } else {
                                        info.lose = numberq0(info.lose) + 1;
                                    }
                                } else {
                                    if (i.isFriendsOf(game.zhu, true)) {
                                        info.lose = numberq0(info.lose) + 1;
                                    } else {
                                        info.win = numberq0(info.win) + 1;
                                    }
                                }
                            }
                            break;
                        case 'guozhan':
                            {
                                const boss = game.players[0];
                                if (i.isFriendsOf(boss, true)) {
                                    info.win = numberq0(info.win) + 1;
                                } else {
                                    info.lose = numberq0(info.lose) + 1;
                                }
                            }
                            break;
                    }
                }
            }
        }
        for (var i in lib.config.Qrecord) {
            if (!lib.config.Qrecord[i].win && !lib.config.Qrecord[i].lose) {
                delete lib.config.Qrecord[i];
            }
        }
        const list = Object.entries(lib.config.Qrecord).map(([key, value]) => ({ key, ...value }));
        function winratio(a) {
            if (a.lose && a.win) {
                return a.win / (a.lose + a.win);
            }
            if (a.win) {
                return 20 * a.win / 100;
            }
            if (a.lose) {
                return -20 * a.lose / 100;
            }
            return 0; // 降序排列
        }
        list.sort((a, b) => winratio(b) - winratio(a));
        const jieguo = {};
        for (const item of list) {
            jieguo[item.key] = { ...item }; // 确保我们不会丢失原始键名
            delete jieguo[item.key].key; // 移除额外添加的 key 属性
        }
        game.saveConfig('Qrecord', jieguo);
        const jilu = {};
        for (const i in jieguo) {
            const info = jieguo[i];
            if (numberq0(info.lose) + numberq0(info.win) > 5) {
                jilu[i] = info;
            }
        }
        console.log(jilu);
    }); //记录单将胜率
    //—————————————————————————————————————————————————————————————————————————————game相关本体函数
    const gameq = function () {
        game.checkMod = function () {
            const Q = Array.from(arguments);
            const card = Q[0];
            const player1 = Q[1]; //playerenable的mod主/使用者 //targetEnabled的使用者
            const target = Q[2]; //playerenable的目标 //targetEnabled的mod主/目标
            let unchanged = Q[Q.length - 3]; //无mod返回值
            const name = Q[Q.length - 2]; //mod名字
            const player2 = Q[Q.length - 1];
            if (player2.name == 'HL_许劭') {
                if (name == 'cardUsable') return true;
                return unchanged;
            }//让许劭可以无视自身mod使用牌
            if (player1?.name == 'HL_许劭') {
                return unchanged;
            }//让许劭可以无视对方mod使用牌
            //game.checkMod(card, player, 0, 'aiEV', player);
            if (!card && QQQ.config.报错) {
                alert('checkMod了不存在的牌');
                throw new Error();
            }
            if (typeof card != 'object' && QQQ.config.报错) {
                console.log(card);
                alert('checkMod的card不是一个对象');
                throw new Error();
            }
            const skills = [];
            if (typeof player2.getModableSkills == 'function') {
                skills.addArray(player2.getModableSkills());
            } else if (typeof player2.getSkills == 'function') {
                skills.addArray(player2.getSkills());
                skills.addArray(lib.skill.global);
                game.expandSkills(skills);
                skills = skills.filter(function (skill) {
                    var info = get.info(skill);
                    return info && info.mod;
                });
                skills.sort((a, b) => get.priority(a) - get.priority(b));
            }
            const A = Q.slice(0, -2); //切掉最后两个
            if (Array.isArray(skills)) {
                skills.forEach((skill) => {
                    var mod = get.info(skill).mod[name];
                    if (!mod) return;
                    const result = mod.call(this, ...A);
                    if (result != undefined && typeof unchanged != 'object') {
                        unchanged = result;
                        A[A.length - 1] = result;
                    }
                });
            }
            return unchanged;
        }; //mod技能修改,让许劭可以无视mod、无次数限制使用牌
        game.expandSkills = function (skills) {
            if (!Array.isArray(skills) && QQQ.config.报错) {
                alert(skills + '不是数组');
                throw new Error();
            }
            return skills.addArray(
                skills.reduce((previousValue, currentValue) => {
                    const info = get.info(currentValue);
                    if (info) {
                        if (info.group) {
                            const adds = (Array.isArray(info.group) ? info.group : [info.group]).filter((i) => lib.skill[i]);
                            previousValue.push(...adds);
                        }
                    } else {
                        console.log(currentValue);
                    }
                    return previousValue;
                }, [])
            );
        }; //展开group
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
                    if (lib.config[`extension_${extname}_cards_enable`]) {
                        //QQQ
                        for (let j of pack[i]) {
                            if (lib.card[j[2]] && (!lib.card[j[2]].mode || lib.card[j[2]].mode.includes(lib.config.mode))) {
                                lib.card.list.push(j);
                            }
                        } //检测是否存在对应属性并符合模式
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
                            } else if (pack[i][j].fullimage) {
                                pack[i][j].image = `ext:${extname}/${j}.jpg`;
                            }
                        }
                        lib.cardPack[packname].push(j);
                    } else if (i == 'skill') {
                        if (typeof pack[i][j].audio == 'number' || typeof pack[i][j].audio == 'boolean') {
                            pack[i][j].audio = `ext:${extname}:` + pack[i][j].audio;
                        }
                    }
                    if (lib[i][j] == undefined) {
                        lib[i][j] = pack[i][j];
                    } //QQQ
                }
            }
        }; //修复package里面的卡牌,关闭按钮之后,没有lib.card,却仍然存在于lib.card.list里面
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
            const info = lib.card[name];
            if (!info && QQQ.config.报错) {
                alert(name + '没有info');
                name = 'sha';
                throw new Error();
            }
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
            } else if (suit == 'black') {
                suit = Math.random() < 0.5 ? 'club' : 'spade';
            } else if (suit == 'red') {
                suit = Math.random() < 0.5 ? 'diamond' : 'heart';
            }
            if (typeof number != 'number' && typeof number != 'string') {
                number = Math.ceil(Math.random() * 13);//随机点数
            }
            let card;
            if (noclick) {
                card = ui.create.card(ui.special, 'noclick', true);
            } else {
                card = ui.create.card(ui.special);
            }
            card.storage.vanish = true;
            return card.init([suit, number, name, nature]);
        };
    } //game相关本体函数
    gameq();
    //—————————————————————————————————————————————————————————————————————————————视为转化虚拟牌相关自创函数
    const shiwei = function () {
        lib.element.player.filterCardx = function (card, filter) {
            if (typeof card == 'string') {
                card = { name: card };
            }
            const player = this, info = get.info(card);
            if (!lib.filter.cardEnabled(card, player)) return false; //卡牌使用限制
            if (info.notarget) return true;
            if (!info.filterTarget) return true;
            if (!info.enable) return true;
            return game.hasPlayer(function (current) {
                if (info.multicheck && !info.multicheck(card, player)) return false;
                if (filter) {
                    if (!lib.filter.targetInRange(card, player, current)) return false; //距离限制
                    return lib.filter.targetEnabledx(card, player, current);
                }
                return lib.filter.targetEnabled(card, player, current); //目标限制
            });
        }; //适用于choosetouse的filtercard
        lib.element.player.filterCard = function (card, filter) {
            if (typeof card == 'string') {
                card = { name: card };
            }
            const player = this, info = get.info(card), event = _status.event;
            const evt = event.name.startsWith('chooseTo') ? event : event.getParent((q) => q.name.startsWith('chooseTo'));
            if (evt.filterCard2) {
                return evt._backup.filterCard(card, player, evt);
            }//viewAs的技能会修改chooseToUse事件的filterCard
            else if (evt.filterCard && evt.filterCard != lib.filter.filterCard) {
                return evt.filterCard(card, player, evt);//这里也有次数限制
            }
            else {
                if (!lib.filter.cardEnabled(card, player)) return false;//卡牌使用限制
                if (info.notarget) return true;
                if (!info.filterTarget) return true;
                if (!info.enable) return true;
                if (evt.name == 'chooseToRespond') return true;//chooseToRespond无次数距离目标限制
                if (filter) {
                    if (!lib.filter.cardUsable(card, player, evt)) return false;//次数限制
                }
                if (evt.filterTarget && evt.filterTarget != lib.filter.filterTarget) {
                    return game.hasPlayer(function (current) {
                        return evt.filterTarget(card, player, current);
                    });
                }
                return game.hasPlayer(function (current) {
                    if (info.multicheck && !info.multicheck(card, player)) return false;
                    if (filter) {
                        if (!lib.filter.targetInRange(card, player, current)) return false;//距离限制
                        return lib.filter.targetEnabledx(card, player, current);
                    }
                    return lib.filter.targetEnabled(card, player, current);//目标限制
                });
            }
        };//删除次数限制//filter决定有无次数距离限制//viewAs的技能会修改chooseToUse事件的filterCard
        game.qcard = (player, type, filter, range) => {
            if (range !== false) {
                range = true;
            }
            const list = [];
            for (const i in lib.card) {
                const info = lib.card[i];
                if (info.mode && !info.mode.includes(lib.config.mode)) {
                    continue;
                }
                if (!info.content) {
                    continue;
                }
                if (['delay', 'equip'].includes(info.type)) {
                    continue;
                }
                if (type && info.type != type) {
                    continue;
                }
                if (filter !== false) {
                    if (!player.filterCard(i, range)) {
                        continue;
                    }
                }
                list.push([lib.suits.randomGet(), lib.number.randomGet(), i]); //花色/点数/牌名/属性/应变
                if (i == 'sha') {
                    for (const j of Array.from(lib.nature.keys())) {
                        list.push([lib.suits.randomGet(), lib.number.randomGet(), 'sha', j]);
                    }
                }
            }
            return list;
        }; //可以转化为的牌//filter控制player.filterCard//range控制是否计算次数与距离限制
    };
    shiwei();
    //—————————————————————————————————————————————————————————————————————————————获取卡牌历史相关自创函数
    const cardfunc = function () {
        game.center = function () {
            const list = [];
            game.countPlayer2(function (current) {
                current.getHistory('lose', function (evt) {
                    if (evt.position == ui.discardPile) list.addArray(evt.cards);
                });
            });
            game.getGlobalHistory('cardMove', function (evt) {
                if (evt.name == 'cardsDiscard') list.addArray(evt.cards);
            });
            return list;
        }; //获取本回合进入弃牌堆的牌
        game.lose = function () {
            const list = [];
            for (const npc of game.players.concat(game.dead)) {
                const his = npc.actionHistory;
                const evt = his[his.length - 1];
                for (const e of evt.lose) {
                    if (e.cards?.length) {
                        list.addArray(e.cards);
                    }
                }
            }
            return list;
        }; //获取本回合失去过的牌
        game.xunshi = function (card) {
            var card = lib.card[card.name];
            if (!card) {
                if (QQQ.config.报错) {
                    alert(card + card.name + '没有卡牌info');
                    throw new Error();
                }
                card = lib.card['sha'];
            }
            if (card.notarget || card.selectTarget == undefined) return false;
            if (Array.isArray(card.selectTarget)) {
                if (card.selectTarget[0] < 0) return !card.toself;
                return card.selectTarget[0] != 1 || card.selectTarget[1] != 1;
            } else {
                if (card.selectTarget < 0) return !card.toself;
                return card.selectTarget != 1;
            }
        }; //多目标牌检测
    };
    cardfunc();
    //—————————————————————————————————————————————————————————————————————————————game相关自创函数
    const gamex = function () {
        game.VIDEO = async function (name) {
            return new Promise((resolve) => {
                const url = `extension/温柔一刀/mp4/${name}.mp4`;
                const video = window.document.createElement('video');
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
                video.style.mixBlendMode = 'screen';
                video.style.pointerEvents = 'none';
                const backButton = window.document.createElement('div');
                backButton.style.zIndex = 999;
                backButton.innerHTML = '返回游戏'; //文字内容
                backButton.style.position = 'absolute'; //绝对定位
                backButton.style.bottom = '10px';
                backButton.style.right = '10px';
                backButton.style.color = 'red'; //文字颜色
                backButton.style.fontSize = '16px'; //文字大小
                backButton.style.padding = '5px 10px'; //内边距
                backButton.style.background = 'rgba(0, 0, 0, 0.3)'; //背景颜色为黑色透明度为0.3
                backButton.onclick = function () {
                    backButton.remove();
                    video.remove();
                    resolve();
                }; //设置返回按钮的点击事件
                document.body.appendChild(video);//document上面创建video元素之后不要立刻贴上,加一个延迟可以略过前面的播放框,配置越烂延迟越大
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
        }; //播放mp4
        game.movimage = function (src) {
            const div = document.createElement('div');
            div.className = 'movimage';
            const img = document.createElement('img');
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
        }; //从右侧切入图片动画
        game.src = function (name) {
            let extimage = null,
                nameinfo = get.character(name),
                imgPrefixUrl;
            if (nameinfo && nameinfo.trashBin) {
                for (const value of nameinfo.trashBin) {
                    if (value.startsWith('img:')) {
                        imgPrefixUrl = value.slice(4);
                        break;
                    } else if (value.startsWith('ext:')) {
                        extimage = value;
                        break;
                    } else if (value.startsWith('character:')) {
                        name = value.slice(10);
                        break;
                    }
                }
            }
            if (imgPrefixUrl) return imgPrefixUrl;
            else if (extimage) return extimage.replace(/^ext:/, 'extension/');
            return `image/character/${name}.jpg`;
        }; //获取武将名对应立绘路径
        game.yinshi = function (str) {
            //当时年少掷春光,花马踏蹄酒溅香.爱恨情仇随浪来,夏蝉歌醒夜未央.光阴长河种红莲,韶光重回泪已干.今刻沧桑登舞榭,万灵且待命无缰!
            // 创建诗歌容器
            const poemContainer = document.createElement('div');
            poemContainer.className = 'poem-container';
            document.body.appendChild(poemContainer);
            // 分割成8列
            const columns = 8;
            const charsPerColumn = Math.ceil(str.length / columns);
            let columnIndex = 0;
            // 定义火焰效果的SVG滤镜
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '0');
            svg.setAttribute('height', '0');
            document.body.appendChild(svg);
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            svg.appendChild(defs);
            const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
            filter.setAttribute('id', 'fireFilter');
            filter.setAttribute('x', '0');
            filter.setAttribute('y', '0');
            filter.setAttribute('width', '200%');
            filter.setAttribute('height', '200%');
            defs.appendChild(filter);
            const turbulence = document.createElementNS('http://www.w3.org/2000/svg', 'feTurbulence');
            turbulence.setAttribute('type', 'fractalNoise');
            turbulence.setAttribute('baseFrequency', '0.01');
            turbulence.setAttribute('numOctaves', '5');
            turbulence.setAttribute('result', 'turbulence');
            filter.appendChild(turbulence);
            const displacementMap = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
            displacementMap.setAttribute('in', 'SourceGraphic');
            displacementMap.setAttribute('in2', 'turbulence');
            displacementMap.setAttribute('scale', '10');
            filter.appendChild(displacementMap);
            const colorMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
            colorMatrix.setAttribute('type', 'matrix');
            colorMatrix.setAttribute('values', '0 0 0 0 1 0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 1 0');
            colorMatrix.setAttribute('result', 'colorized');
            filter.appendChild(colorMatrix);
            const gaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
            gaussianBlur.setAttribute('stdDeviation', '2');
            gaussianBlur.setAttribute('result', 'blurred');
            filter.appendChild(gaussianBlur);
            const merge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
            filter.appendChild(merge);
            const mergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
            mergeNode1.setAttribute('in', 'blurred');
            merge.appendChild(mergeNode1);
            const mergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
            mergeNode2.setAttribute('in', 'SourceGraphic');
            merge.appendChild(mergeNode2);
            // 遍历诗歌文本,创建每个字符的span元素
            for (let i = 0; i < str.length; i++) {
                if (i % charsPerColumn === 0) {
                    // 创建新的列容器
                    const columnDiv = document.createElement('div');
                    columnDiv.className = 'column';
                    poemContainer.appendChild(columnDiv);
                    columnIndex++;
                }
                // 获取当前列容器
                const currentColumn = poemContainer.children[columnIndex - 1];
                // 创建字符元素
                const charSpan = document.createElement('span');
                charSpan.className = 'poem-char';
                charSpan.textContent = str[i];
                // 添加字符到当前列
                currentColumn.appendChild(charSpan);
                // 延迟显示每个字符,每列完成后延迟更多时间
                setTimeout(
                    () => {
                        charSpan.classList.add('show');
                    },
                    (columnIndex - 1) * 1200 + (i % charsPerColumn) * 200
                ); // 每列之间间隔1200毫秒,每个字符之间间隔200毫秒
            }
            // 如果最后一列没有填满,则隐藏多余的空格
            for (let i = 0; i < columns - 1; i++) {
                if (poemContainer.children[i].children.length < charsPerColumn) {
                    while (poemContainer.children[i].lastChild) {
                        poemContainer.children[i].removeChild(poemContainer.children[i].lastChild);
                    }
                }
            }
            setTimeout(function () {
                poemContainer.remove();
                svg.remove();
            }, 12000);
        };
        game.maxcard = function (type, unique) {
            let maxCount = -Infinity;
            let maxplayer = null;
            for (const player of game.players) {
                const count = player.countCards(type);
                if (count > maxCount) {
                    maxCount = count;
                    maxplayer = player;
                } else if (count === maxCount && unique) {
                    maxplayer = null; // 发现另一个玩家有相同的最大值,标记为不唯一
                }
            }
            return maxplayer;
        };//找到场上某个区域牌最多的玩家
        game.maxhp = function (unique) {
            let maxCount = -Infinity;
            let maxplayer = null;
            for (const player of game.players) {
                const count = player.hp;
                if (count > maxCount) {
                    maxCount = count;
                    maxplayer = player;
                } else if (count === maxCount && unique) {
                    maxplayer = null; // 发现另一个玩家有相同的最大值,标记为不唯一
                }
            }
            return maxplayer;
        };//找到场上血量最多的玩家
        game.maxmaxhp = function (unique) {
            let maxCount = -Infinity;
            let maxplayer = null;
            for (const player of game.players) {
                const count = player.maxHp;
                if (count > maxCount) {
                    maxCount = count;
                    maxplayer = player;
                } else if (count === maxCount && unique) {
                    maxplayer = null; // 发现另一个玩家有相同的最大值,标记为不唯一
                }
            }
            return maxplayer;
        };//找到场上体力上限最多的玩家
    } //game相关自创函数
    gamex();
    //—————————————————————————————————————————————————————————————————————————————UI相关本体函数
    const uiq = function () {
        ui.click.mousewheel = function (evt) {
            if (this.firstElementChild && this.firstElementChild.classList.contains('handcards') && !this.classList.contains('scrollh')) return;
            var node = this;
            var num = Number(QQQ.config.滚轮速度); //this._scrollnum || 6;
            var speed = 3 * num;
            clearInterval(node.interval);
            if (evt.detail > 0 || evt.wheelDelta < 0) {
                node.interval = setInterval(function () {
                    if (num-- && Math.abs(node.scrollLeft + node.clientWidth - node.scrollWidth) > 0) {
                        node.scrollLeft += speed;
                    } else {
                        clearInterval(node.interval);
                    }
                }, 16);
            } else {
                node.interval = setInterval(function () {
                    if (num-- && node.scrollLeft > 0) {
                        node.scrollLeft -= speed;
                    } else {
                        clearInterval(node.interval);
                    }
                }, 16);
            }
        }; //BOSS模式鼠标滚动速度
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
                                    if (node.link && node.link.firstChild) node.link.firstChild.classList.add('on'); //QQQ
                                } else {
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
                            } else {
                                node.classList.add('off');
                                if (node.link) node.link.firstChild.classList.remove('on');
                            }
                        } else {
                            if (lib.config.cards.includes(node.mode)) {
                                node.classList.remove('off');
                                if (node.link) node.link.firstChild.classList.add('on');
                            } else {
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
                        } else {
                            lib.config.connect_cards.remove(name);
                        }
                        game.saveConfig('connect_cards', lib.config.connect_cards);
                    } else {
                        if (bool) {
                            lib.config.cards.add(name);
                        } else {
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
                } else {
                    lib.config.bannedpile[name].add(number);
                }
                recreatePile();
            };
            var createModeConfig = function (mode, position) {
                var info = lib.cardPack[mode];
                let cardPack = lib.cardPackInfo[mode];
                if (!lib.cardPile[mode] && cardPack && cardPack.list && Array.isArray(cardPack.list)) lib.cardPile[mode] = cardPack.list;
                var page = ui.create.div('');
                var node = ui.create.div('.menubutton.large', lib.translate[`${mode}_card_config`], position, clickMode);
                if (node.innerHTML.length >= 5) {
                    node.classList.add('smallfont');
                }
                node.mode = mode;
                node._initLink = function () {
                    node.link = page;
                    var list = [];
                    for (var i = 0; i < info.length; i++) {
                        if (!lib.card[info[i]]) continue; //QQQ
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
                        } else if (sort1 > sort2) {
                            return 1;
                        } else {
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
                    } else {
                        page.style.paddingTop = '8px';
                    }
                    var banCard = function (e) {
                        if (_status.clicked) {
                            _status.clicked = false;
                            return;
                        }
                        if (mode.startsWith('mode_') && !mode.startsWith('mode_extension_') && mode != 'mode_banned') {
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
                        } else {
                            list = lib.config[`${get.mode()}_bannedcards`];
                        }
                        if (list && list.includes(this.link[2])) {
                            this.classList.add('banned');
                        } else {
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
                                    alert('隐藏的扩展包可通过选项-其他-重置隐藏内容恢复');
                                    game.saveConfig('prompt_hidepack', true);
                                }
                            } else {
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
                            } else {
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
                                if (cardpileNodes[i].type == 'defaultcards' && cardpileNodes[i].classList.contains('on')) {
                                    clickToggle.call(cardpileNodes[i]);
                                }
                            }
                        });
                        var cfgenablecard = ui.create.node('button', '', '全部开启', cfgnode, function () {
                            for (var i = 0; i < cardpileNodes.length; i++) {
                                if (cardpileNodes[i].type == 'defaultcards' && !cardpileNodes[i].classList.contains('on')) {
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
                                ['heart', '♥️️'],
                                ['diamond', '♦️️'],
                                ['club', '♣️️'],
                                ['spade', '♠️️'],
                            ],
                            null,
                            cardpileadd
                        );
                        cardpileaddsuit.style.width = '53px';
                        cardpileaddsuit.style.marginRight = '2px';
                        var cardpileaddnumber = ui.create.selectlist([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], null, cardpileadd);
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
                            cfgnode.innerHTML = get.translation(card[2]) + ' ' + get.translation(card[0]) + get.strNumber(card[1]);
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
                                name: (card[2] == 'sha' && card[3] ? get.translation(card[3]) : '') + get.translation(card[2]) + ' ' + get.translation(card[0]) + get.strNumber(card[1]),
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
                            } else {
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
                        } else {
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
                        } else {
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
                            if (lib.config.mode_config[i] && (lib.config.mode_config[i].cardpilename == '当前牌堆' || !lib.config.mode_config[i].cardpilename)) {
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
        }; //修复扩展乱斗模式报错,因为本体把扩展中带有衍生标签的卡牌都放进了衍生卡牌包里面,导致原扩展卡牌包变成空的,然后游戏要添加卡牌包开关按钮,就找不到firstchlid
    } //UI相关函数
    uiq();
    //—————————————————————————————————————————————————————————————————————————————get相关本体函数
    const getq = function () {
        get.is.banWords = function (str) {
            return false;
        };
        get.equipValue = function (card, player) {
            if (!card) return 0;
            if (player == undefined || get.itemtype(player) != 'player') player = get.owner(card);
            if (player == undefined || get.itemtype(player) != 'player') player = _status.event.player;
            var info = get.info(card);
            var result = game.checkMod(card, player, 0, 'aiEV', player); //倒数第三个不能是对象,倒数第二个填mod名
            if (result) return result;
            if (!info.ai) return 0;
            if (!info.ai.equipValue && (!info.ai.basic || !info.ai.basic.equipValue)) return 0; //QQQ
            var value = info.ai.equipValue || info.ai.basic.equipValue;
            if (typeof value == 'number') return value;
            if (typeof value == 'function') return value(card, player, null, 'raw2');
            return 0;
        }; //装备价值修改
        get.equipResult = function (player, target, card) {
            let name;
            if (typeof card.name == 'string') {
                name = card.name;
            } else {
                name = card;
            }
            if (target.getEquip(lib.card[name].subtype)) {
                return get.equipValue({ name: name }, target) - get.equipValue(target.getEquip({ name: name }), target); //不能装备但是还没装备就会出错
            }
            return get.equipValue({ name: name }, target);
        }; //是否上装备AI
        get.buttonValue = function (button, player) {
            var card = button.link;
            if (!card && QQQ.config.报错) {
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
        }; //选牌AI修改,判定区牌视为负价值
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
        }; //选牌AI修改,判定区牌视为负价值
        // player.getUseValue({ name: 'huoshaolianying' })
        // getusevalue=>effect=>result
        // get.damageEffect(target, player, target, 'fire');
        // get.effect(target, { name: 'firedamage' }, player, target);
        get.info = function (item, player) {
            if (typeof item == 'string') {
                //if (item.startsWith('player_when_')) return lib.skill.jiang;//when技能排除掉就会不能发动
                if (!lib.skill[item]) {
                    if (QQQ.config.报错 && (get.mode() == 'single' || lib.config.mode == 'QQQ')) {
                        if (item) {
                            console.log(item, '不存在的技能名info');
                            alert(item + '是一个不存在的技能名info');
                            throw new Error();
                        }
                    }
                    return lib.skill.jiang;
                }
                return lib.skill[item];
            }
            if (typeof item == 'object') {
                if (!lib.card[item.name]) {
                    if (QQQ.config.报错) {
                        if (item.name) {
                            console.log(item, item.name, '是一个不存在的卡牌名info');
                            alert(item.name + '是一个不存在的卡牌名info');
                            throw new Error();
                        }
                    }
                    return lib.card.sha;
                }
                var name = item.name;
                if (player !== false) name = get.name(item, player);//这里不能换成自带子属性,不然视为牌不能正常使用(神关羽武神)
                return lib.card[name];
            } else {
                if (QQQ.config.报错) {
                    if (item) {
                        console.log(item, '不存在的技能名info');
                        alert(item + '是一个不存在的技能名info');
                        throw new Error();
                    }
                }
                return lib.skill.jiang;
            }
        }; //报错取消
        get.type = function (obj, method, player) {
            if (typeof obj == 'string') obj = { name: obj };
            if (typeof obj != 'object') return;
            var name = obj.name;
            if (!lib.card[name]) {
                if (!name) {
                    if (QQQ.config.报错) {
                        console.log(obj);
                        alert(obj + '是一个不存在的卡牌名type');
                        throw new Error();
                    }
                    return;
                }
                if (!name.startsWith) {
                    console.log(name);
                    console.log(obj);
                    alert(name + '没有startswith方法');
                }
                if (!name.startsWith('sha_')) return;
                if (
                    name
                        .slice(4)
                        .split('_')
                        .every((n) => lib.nature.has(n))
                )
                    return 'basic';
            }
            if (method == 'trick' && lib.card[name].type == 'delay') return 'trick';
            return lib.card[name].type;
        };
        get.is.shownCard = function (card) {
            if (!card) return false;
            const gaintag = card.gaintag;
            return Array.isArray(gaintag) && gaintag.some((tag) => tag && tag.startsWith('visible_'));
        };
        get.vcardInfo = function (card) { }; //卡牌storage里面存了DOM元素会循环引用导致不能JSON.stringify
    } //get相关本体函数
    getq();
    //—————————————————————————————————————————————————————————————————————————————锁几个技能
    const lockskill = function () {
        Reflect.defineProperty(lib.skill, 'jiwu', {
            get() {
                return {
                    mod: {
                        aiOrder(player, card, num) {
                            if (get.type(card) == 'equip' && !player.getEquips(get.subtype(card)).length) return 15;
                            if (get.type(card) == 'equip' && player.getEquips(get.subtype(card)).length) return 1;
                        },
                    },
                    derivation: ['qiangxix', 'retieji', 'olxuanfeng', 'rewansha'],
                    audio: 2,
                    enable: 'phaseUse',
                    filter(event, player) {
                        if (player.countCards('he') == 0) return false;
                        if (player.hasSkill('qiangxix') && player.hasSkill('retieji') && player.hasSkill('olxuanfeng') && player.hasSkill('rewansha')) return false;
                        return true;
                    },
                    filterCard: true,
                    position: 'he',
                    check(card, player) {
                        player = _status.event.player;
                        if (get.subtype(card) == 'equip1') return (6 - get.value(card)) / 6;
                        if (get.position(card) == 'e' && player.hasSkill('olxuanfeng') && game.hasPlayer((Q) => Q.countCards('he') > 0 && Q.isEnemiesOf(player))) return 70 - get.value(card);
                        if (get.type(card) == 'equip') return (6 - get.value(card)) / 6;
                        if (card.name == 'sha' && player.countCards('h', { name: 'sha' }) < 3) return (6 - get.value(card)) / 6;
                        return 9 - get.value(card);
                    },
                    content() {
                        'step 0';
                        var list = [];
                        if (!player.hasSkill('qiangxix')) list.push('qiangxix');
                        if (!player.hasSkill('retieji')) list.push('retieji');
                        if (!player.hasSkill('olxuanfeng')) list.push('olxuanfeng');
                        if (!player.hasSkill('rewansha')) list.push('rewansha');
                        if (list.length == 1) {
                            player.addTempSkills(list[0]);
                            event.finish();
                        } else {
                            player
                                .chooseControl(list, function () {
                                    if (list.includes('olxuanfeng') && player.countCards('he', { type: 'equip' }) && game.hasPlayer((Q) => Q.countCards('he') > 0 && Q.isEnemiesOf(player))) return 'olxuanfeng';
                                    if (list.includes('qiangxix') && (game.hasPlayer((Q) => player.hp > Q.hp && Q.isEnemiesOf(player)) || player.countCards('he', { subtype: 'equip1' }))) return 'qiangxix';
                                    if (list.includes('retieji') && player.hasSha()) return 'retieji';
                                    if (list.includes('rewansha') && player.getEnemies().length >= 2) return 'rewansha';
                                })
                                .set('prompt', '选择获得一项技能直到回合结束');
                        }
                        ('step 1');
                        player.addTempSkills(result.control);
                    },
                    ai: {
                        order(name, player) {
                            if (player.countCards('he', { type: 'equip' }) && !player.hasSkill('olxuanfeng')) return 99;
                            if (player.countCards('e') && !player.hasSkill('retieji')) return 13;
                            if (player.countCards('e') && !player.hasSkill('qiangxix')) return 13;
                            if (player.countCards('e') && !player.hasSkill('rewansha')) return 13;
                            return 10;
                        },
                        result: {
                            player(player) {
                                if (player.countCards('he', { type: 'equip' }) && !player.hasSkill('olxuanfeng') && game.hasPlayer((Q) => Q.countCards('he') > 0 && Q.isEnemiesOf(player))) return 1;
                                if (!player.hasSkill('qiangxix') && (game.hasPlayer((Q) => player.hp > Q.hp && Q.isEnemiesOf(player)) || player.countCards('he', { subtype: 'equip1' }))) return 1;
                                if (!player.hasSkill('retieji') && player.hasSha()) return 1;
                                if (!player.hasSkill('rewansha') && player.getEnemies().length >= 2) return 1;
                                return 0;
                            },
                        },
                    },
                };
            },
            set() { },
        }); //极武AI优化
        Reflect.defineProperty(lib.skill, 'boss_zhangwu', {
            get() {
                return {
                    global: 'boss_zhangwu_ai',
                    trigger: { player: 'damageEnd' },
                    check(event, player) {
                        return event.source && event.source.isIn() && get.damageEffect(event.source, player, player) > 0;
                    },
                    filter(event, player) {
                        return event.source && event.source.isAlive();
                    },
                    forced: true,
                    logTarget: 'source',
                    content() {
                        'step 0';
                        player
                            .chooseToDiscard(get.prompt('boss_zhangwu', trigger.source), 'he', [1, Infinity])
                            .set('ai', function (card) {
                                if (get.attitude(player, trigger.source) < 0) return 8 - get.value(card);
                                return 0;
                            })
                            ('step 1');
                        if (result.bool) {
                            var num = result.cards.length;
                            var cnum = get.cnNumber(num);
                            event.num = num;
                            trigger.source.chooseToDiscard('he', `章武:弃置${cnum}张牌,或取消并受到${cnum}点伤害`, num).set('ai', function (card) {
                                if (!trigger.source.hasSkillTag('nodamage')) return 10 - get.value(card);
                                return 0;
                            });
                        } else {
                            event.finish();
                        }
                        ('step 2');
                        if (!result.bool) {
                            trigger.source.damage(event.num);
                        }
                    },
                    ai: {
                        maixie: true,
                        maixie_hp: true,
                        effect: {
                            target(card, player, target) {
                                if (get.tag(card, 'damage') && get.attitude(target, player) < 0 && player.countCards('he') < target.countCards('he')) {
                                    return [0, 2];
                                }
                            },
                        },
                    },
                };
            },
            set() { },
        }); //章武AI优化
        Reflect.defineProperty(lib.skill, 'boss_biantian', {
            get() {
                return {
                    trigger: { player: 'phaseBegin' },
                    forced: true,
                    group: 'boss_biantian4',
                    content() {
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
                        ('step 1');
                        var targets = [],
                            players = game.players;
                        if (result.color == 'red') {
                            for (var i = 0; i < players.length; i++) {
                                if (!players[i].isFriendOf(player)) {
                                    players[i].addSkill('boss_biantian3');
                                    players[i].popup('kuangfeng');
                                    targets.push(players[i]);
                                }
                            }
                        } else if (result.color == 'black') {
                            for (var i = 0; i < players.length; i++) {
                                if (players[i].isFriendOf(player)) {
                                    players[i].addSkill('boss_biantian2');
                                    players[i].popup('dawu');
                                    targets.push(players[i]);
                                }
                            }
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
                    init(player) {
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
                    content() {
                        'step 0';
                        var num = trigger.num;
                        if (num > 0) {
                            player.storage.xiangxing_count += num;
                        }
                        if (player.storage.xiangxing_count >= 7) {
                            if (player.hasSkill('yueyin') && lib.skill.yueyin.skipDamage[`x${player.storage.xiangxing}`](player, trigger)) {
                                event.goto(3);
                            }
                            player.storage.xiangxing--;
                            player.storage.xiangxing_count = 0;
                            if (!player.storage.xiangxing) {
                                player.awakenSkill('xiangxing');
                            }
                            player.popup('xiangxing');
                            game.log(player, '失去了一枚星');
                        } else {
                            event.finish();
                        }
                        ('step 1');
                        var list = game.players;
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
                        ('step 2');
                        if (event.list.length) {
                            var target = event.list.shift();
                            target.damage(event.list2.shift(), 'thunder');
                            player.line(target, 'thunder');
                            event.redo();
                        }
                        ('step 3');
                        if (player.storage.xiangxing == 0) {
                            player.maxHp = 3;
                            player.update();
                        }
                    },
                };
            },
            set() { },
        });
    } //锁几个技能玩玩
    lockskill();
    //—————————————————————————————————————————————————————————————————————————————锁几个函数
    const lockfunc = function () {
        Reflect.defineProperty(get, 'attitude', {
            get() {
                return function (from, to) {
                    if (!from) {
                        if (QQQ.config.报错) {
                            throw new Error();
                        }
                        from = _status.event.player;
                    }
                    if (!to) {
                        if (QQQ.config.报错) {
                            throw new Error();
                        }
                        to = _status.event.player;
                    }
                    let att = 0;
                    if (get.rawAttitude) {
                        att = get.rawAttitude(from, to);
                    }
                    else {
                        att = get.oriAttitude(from, to);
                    }
                    if (from.skills.includes('mad') || from.tempSkills.mad) {
                        att = -att;
                    }
                    if ((to.skills.includes('mad') || to.tempSkills.mad) && att > 0) {
                        if (to.identity == 'zhu') {
                            att = 1;
                        } else {
                            att = 0;
                        }
                    }
                    if (from.ai.modAttitudeFrom) {
                        att = from.ai.modAttitudeFrom(from, to, att);
                    }
                    if (to.ai.modAttitudeTo) {
                        att = to.ai.modAttitudeTo(from, to, att);
                    }
                    return att;
                };
            },
            set(v) {
                get.oriAttitude = v;
            },
            configurable: false,
        });
        Reflect.defineProperty(lib.element.player, 'damage', {
            get() {
                return function () {
                    if (QQQ.config.属性杀) {
                        for (var i = 0; i < arguments.length; i++) {
                            if (typeof arguments[i] == 'number') {
                                var num = arguments[i];
                            } else if (get.itemtype(arguments[i]) == 'player') {
                                var source = arguments[i];
                            } else if (get.itemtype(arguments[i]) == 'nature' && arguments[i] != 'stab') {
                                var nature = arguments[i];
                            } else if (get.itemtype(arguments[i]) == 'natures') {
                                var natures = arguments[i].split(lib.natureSeparator);
                                natures.remove('stab');
                                if (natures.length) var nature = natures.join(lib.natureSeparator);
                            }
                        }
                        if (source == undefined) {
                            source = _status.event.customSource || _status.event.player;
                        }
                        if (num == undefined) {
                            num = numberq1(_status.event.baseDamage) + numberq0(_status.event.extraDamage);
                        }
                        const numQ = numberq0(source?.storage?.jiu) + numberq1(_status.event.baseDamage) + numberq0(_status.event.extraDamage);
                        if (nature == 'ice' && source && this.countCards('h')) {
                            if (this.countCards('h') >= 4 * numQ) {
                                source.discardPlayerCard(this, 'he', 4 * numQ, true);
                                return game.kong;
                            }
                            if (this.countCards('h') < 4 * numQ) this.discard(this.getCards('he'));
                        }
                        if (nature == 'kami') {
                            this.loseMaxHp(numQ).source = source;
                            return game.kong;
                        }
                    }
                    var next = game.createEvent('damage');
                    next.player = this;
                    var nocard, nosource;
                    var event = _status.event;
                    for (var i = 0; i < arguments.length; i++) {
                        if (get.itemtype(arguments[i]) == 'cards') {
                            next.cards = arguments[i].slice(0);
                        } else if (get.itemtype(arguments[i]) == 'card') {
                            next.card = arguments[i];
                        } else if (typeof arguments[i] == 'number') {
                            next.num = arguments[i];
                        } else if (get.itemtype(arguments[i]) == 'player') {
                            next.source = arguments[i];
                        } else if (typeof arguments[i] == 'object' && arguments[i] && arguments[i].name) {
                            next.card = arguments[i];
                        } else if (arguments[i] == 'nocard') {
                            nocard = true;
                        } else if (arguments[i] == 'nosource') {
                            nosource = true;
                        } else if (arguments[i] == 'notrigger') {
                            next._triggered = null;
                            next.notrigger = true;
                        } else if (arguments[i] == 'unreal') {
                            next.unreal = true;
                        } else if (get.itemtype(arguments[i]) == 'nature' && arguments[i] != 'stab') {
                            next.nature = arguments[i];
                        } else if (get.itemtype(arguments[i]) == 'natures') {
                            var natures = arguments[i].split(lib.natureSeparator);
                            natures.remove('stab');
                            if (natures.length) next.nature = natures.join(lib.natureSeparator);
                        }
                    }
                    if (next.card == undefined && !nocard) next.card = event.card;
                    if (next.cards == undefined && !nocard) next.cards = event.cards;
                    if (next.source == undefined && !nosource) next.source = event.customSource || event.player;
                    if (next.source && next.source.isDead()) {
                        delete next.source;
                    }
                    if (next.unreal == undefined) {
                        next.unreal = false;
                    }
                    if (next.num == undefined) {
                        next.num = numberq1(event.baseDamage) + numberq0(event.extraDamage);
                    }
                    if (QQQ.config.醉酒模式 && next.source && next.source.storage?.jiu) {
                        next.num += next.source.storage.jiu;
                    }
                    next.original_num = next.num;
                    next.change_history = [];
                    next.hasNature = function (nature) {
                        if (!nature) return Boolean(this.nature && this.nature.length);
                        let natures = get.natureList(nature),
                            naturesx = get.natureList(this.nature);
                        if (nature == 'linked') return naturesx.some((n) => lib.linked.includes(n));
                        return get.is.sameNature(natures, naturesx);
                    };
                    next.setContent('damageQ');
                    next.filterStop = function () {
                        if (this.source && this.source.isDead()) delete this.source;
                        var num = this.original_num;
                        for (const i of this.change_history) num += i;
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
                };
            },
            set() { },
            configurable: false,
        }); //毒属性伤害修复//醉酒模式//属性杀
        lib.element.content.damageQ = function () {
            'step 0';
            event.forceDie = true;
            if (event.unreal) {
                event.goto(4);
                return;
            }
            event.trigger('damageBegin1');
            ('step 1');
            event.trigger('damageBegin2');
            ('step 2');
            event.trigger('damageBegin3');
            ('step 3');
            event.trigger('damageBegin4');
            ('step 4');
            if (source && source.hasSkill('醉诗')) {
                const max = numberq0(source.storage.jiu) + numberq1(event.baseDamage) + numberq0(event.extraDamage);
                if (num < max) {
                    num = max;
                }
            } //QQQ
            if (player.hujia > 0 && !player.hasSkillTag('nohujia')) {
                var damageAudioInfo = lib.natureAudio.hujia_damage[event.nature];
                if (!damageAudioInfo || damageAudioInfo == 'normal') {
                    damageAudioInfo = 'effect/hujia_damage' + (num > 1 ? '2' : '') + '.mp3';
                } else if (damageAudioInfo == 'default') {
                    damageAudioInfo = 'effect/hujia_damage_' + event.nature + (num > 1 ? '2' : '') + '.mp3';
                } else {
                    damageAudioInfo = damageAudioInfo[num > 1 ? 2 : 1];
                }
                game.broadcastAll(function (damageAudioInfo) {
                    if (lib.config.background_audio) game.playAudio(damageAudioInfo);
                }, damageAudioInfo);
            } //声音
            else {
                var damageAudioInfo = lib.natureAudio.damage[event.nature];
                if (!damageAudioInfo || damageAudioInfo == 'normal') {
                    damageAudioInfo = 'effect/damage' + (num > 1 ? '2' : '') + '.mp3';
                } else if (damageAudioInfo == 'default') {
                    damageAudioInfo = 'effect/damage_' + event.nature + (num > 1 ? '2' : '') + '.mp3';
                } else {
                    damageAudioInfo = damageAudioInfo[num > 1 ? 2 : 1];
                }
                game.broadcastAll(function (damageAudioInfo) {
                    if (lib.config.background_audio) game.playAudio(damageAudioInfo);
                }, damageAudioInfo);
            } //声音
            var str = event.unreal ? '视为受到了' : '受到了';
            if (source) str += `来自<span class='bluetext'>${source == player ? '自己' : get.translation(source)}</span>的`;
            str += get.cnNumber(num) + '点';
            if (event.nature) str += get.translation(event.nature) + '属性';
            str += '伤害';
            game.log(player, str);
            if (player.stat[player.stat.length - 1].damaged == undefined) {
                player.stat[player.stat.length - 1].damaged = num;
            } else {
                player.stat[player.stat.length - 1].damaged += num;
            }
            if (source) {
                source.getHistory('sourceDamage').push(event);
                if (source.stat[source.stat.length - 1].damage == undefined) {
                    source.stat[source.stat.length - 1].damage = num;
                } else {
                    source.stat[source.stat.length - 1].damage += num;
                }
            }
            player.getHistory('damage').push(event);
            if (source && source.hasSkill('醉诗')) {
                player.hujia = 0;
                if (!player.hp) player.hp = 0;
                if (player.hp == Infinity) player.hp = 4;
                if (player.maxHp == Infinity) player.maxHp = 4;
                if (player.hp > 100) player.hp = player.hp % 100;
                player.hp -= num;
                player.update();
            } //QQQ
            else {
                if (!event.unreal) {
                    if (event.notrigger) {
                        player.changeHp(-num, false)._triggered = null;
                    } else {
                        player.changeHp(-num, false);
                    }
                } //减少体力
            }
            if (event.animate !== false) {
                player.$damage(source);
                var natures = (event.nature || '').split(lib.natureSeparator);
                game.broadcastAll(
                    function (natures, player) {
                        if (lib.config.animation && !lib.config.low_performance) {
                            if (natures.includes('fire')) {
                                player.$fire();
                            }
                            if (natures.includes('thunder')) {
                                player.$thunder();
                            }
                        }
                    },
                    natures,
                    player
                );
                var numx = player.hasSkillTag('nohujia') ? num : Math.max(0, num - player.hujia);
                player.$damagepop(-numx, natures[0]);
            } //动画
            if (event.unreal) event.goto(6);
            if (!event.notrigger) {
                if (num == 0) {
                    event.trigger('damageZero');
                    event._triggered = null;
                } else {
                    event.trigger('damage');
                }
            }
            ('step 5');
            if (event.nature && QQQ.config.属性杀) {
                switch (event.nature) {
                    case 'fire':
                        player.randomDiscard(1);
                        break;
                    case 'thunder':
                        {
                            const card = get.cards()[0];
                            player.showCards(card, '闪电');
                            if (card.suit == 'spade' && card.number > 1 && card.number < 10) {
                                if (Math.random() > 0.5) {
                                    game.playAudio('../extension/温柔一刀/audio/_thundersha1.mp3');
                                } else {
                                    game.playAudio('../extension/温柔一刀/audio/_thundersha2.mp3');
                                }
                                player.damage(3).source = source;
                            }
                        }
                        break;
                    case 'snow':
                        {
                            player.classList.add('turnedover');
                            if (player.classList.contains('turnedover')) {
                                const num = Math.floor(player.hp);
                                if (num > 0) {
                                    player.draw(Math.min(3, num));
                                }
                            }
                        }
                        break;
                    case 'poison':
                        {
                            const cardsq = [];
                            for (var i = 0; i < num; i++) {
                                cardsq.push(game.createCard('du'));
                            }
                            player.gain(cardsq, 'gain2');
                        }
                        break;
                    case 'blood':
                        {
                            if (source) {
                                source.recover(num);
                            }
                        }
                        break;
                }
            }
            if (QQQ.config.醉酒模式 && source && source.storage?.jiu && num > source.storage.jiu) {
                delete source.storage.jiu;
                source.unmarkSkill('jiu');
                if (source.node.jiu) {
                    source.node.jiu.delete();
                    source.node.jiu2.delete();
                    delete source.node.jiu;
                    delete source.node.jiu2;
                }
            }
            if (player.hp <= 0 && player.isAlive() && !event.nodying) {
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
                    } else if (lib.config.autoborder_start == 'gold') {
                        dnum += 8;
                    }
                }
                if (lib.config.autoborder_count == 'damage') {
                    source.node.framebg.dataset.decoration = '';
                    if (dnum >= 10) {
                        source.node.framebg.dataset.auto = 'gold';
                        if (dnum >= 12) source.node.framebg.dataset.decoration = 'gold';
                    } else if (dnum >= 6) {
                        source.node.framebg.dataset.auto = 'silver';
                        if (dnum >= 8) source.node.framebg.dataset.decoration = 'silver';
                    } else if (dnum >= 2) {
                        source.node.framebg.dataset.auto = 'bronze';
                        if (dnum >= 4) source.node.framebg.dataset.decoration = 'bronze';
                    }
                    if (dnum >= 2) {
                        source.classList.add('topcount');
                    }
                } else if (lib.config.autoborder_count == 'mix') {
                    source.node.framebg.dataset.decoration = '';
                    switch (source.node.framebg.dataset.auto) {
                        case 'bronze':
                            if (dnum >= 4) source.node.framebg.dataset.decoration = 'bronze';
                            break;
                        case 'silver':
                            if (dnum >= 8) source.node.framebg.dataset.decoration = 'silver';
                            break;
                        case 'gold':
                            if (dnum >= 12) source.node.framebg.dataset.decoration = 'gold';
                            break;
                    }
                }
            }
            ('step 6');
            if (!event.notrigger) event.trigger('damageSource');
        }; //李白加伤//醉酒模式//属性杀
    } //锁几个函数玩玩
    lockfunc();
    //—————————————————————————————————————————————————————————————————————————————按钮控制技能添加与修改
    const config = function () {
        if (QQQ.config.禁止封禁出牌) {
            Reflect.defineProperty(game, 'checkMod', {
                get() {
                    return function () {
                        const Q = Array.from(arguments);
                        const card = Q[0];
                        const player1 = Q[1];
                        let unchanged = Q[Q.length - 3];
                        const name = Q[Q.length - 2];
                        let player2 = Q[Q.length - 1];
                        if (name == 'targetInRange') return true; //无距离限制使用牌
                        if (name == 'cardUsable') return true; //无次数限制使用牌
                        if (typeof player2 === 'object') return unchanged; //无视自身mod使用牌
                        if (typeof player1 === 'object') return unchanged; //无视对方mod使用牌
                        if (typeof player2.getModableSkills == 'function') {
                            player2 = player2.getModableSkills();
                        } else if (typeof player2.getSkills == 'function') {
                            player2 = player2.getSkills().concat(lib.skill.global);
                            game.expandSkills(player2);
                            player2 = player2.filter(function (skill) {
                                var info = get.info(skill);
                                return info && info.mod;
                            });
                            player2.sort((a, b) => get.priority(a) - get.priority(b));
                        }
                        const A = Q.slice(0, -2);
                        player2.forEach((value) => {
                            var mod = get.info(value).mod[name];
                            if (!mod) return;
                            const result = mod.call(this, ...A);
                            if (result != undefined && typeof unchanged != 'object') {
                                unchanged = result;
                                A[A.length - 1] = result;
                            }
                        });
                        return unchanged;
                    };
                },
                set() { },
                configurable: false,
            }); //禁止封禁出牌
        } //所有人都不能被禁止出牌
        if (QQQ.config.武将全部可选) {
            Reflect.defineProperty(lib.filter, 'characterDisabled', {
                get() {
                    return function (i) {
                        return !lib.character[i];
                    };
                },
                set() { },
            }); //取消禁将
            lib.filter.characterDisabled2 = function (i) {
                return !lib.character[i];
            }; //取消禁将
            get.gainableSkills = function (func, player) {
                var list = [];
                for (var i in lib.character) {
                    for (var j = 0; j < lib.character[i][3].length; j++) {
                        list.add(lib.character[i][3][j]);
                    }
                }
                return list;
            }; //BOSS选将
            get.gainableSkillsName = function (name, func) {
                var list = [];
                if (name && lib.character[name]) {
                    for (var j = 0; j < lib.character[name][3].length; j++) {
                        list.add(lib.character[name][3][j]);
                    }
                }
                return list;
            }; //BOSS选将
            Reflect.defineProperty(ui.create, 'characterDialog', {
                get() {
                    return function () {
                        var filter, str, noclick, thisiscard, seperate, expandall, onlypack, heightset, precharacter, characterx;
                        for (var i = 0; i < arguments.length; i++) {
                            if (arguments[i] === 'thisiscard') {
                                thisiscard = true;
                            } else if (arguments[i] === 'expandall') {
                                expandall = true;
                            } else if (arguments[i] === 'heightset') {
                                heightset = true;
                            } else if (arguments[i] == 'precharacter') {
                                precharacter = true;
                            } else if (arguments[i] == 'characterx') {
                                characterx = true;
                            } else if (typeof arguments[i] == 'string' && arguments[i].startsWith('onlypack:')) {
                                onlypack = arguments[i].slice(9);
                            } else if (typeof arguments[i] == 'object' && typeof arguments[i].seperate == 'function') {
                                seperate = arguments[i].seperate;
                            } else if (typeof arguments[i] === 'string') {
                                str = arguments[i];
                            } else if (typeof arguments[i] === 'function') {
                                filter = arguments[i];
                            } else if (typeof arguments[i] == 'boolean') {
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
                            } else {
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
                        } else {
                            var groupnum = {};
                            for (var i in lib.character) {
                                list.push(i);
                                if (get.is.double(i)) {
                                    groups.add('double');
                                } else {
                                    const Q = lib.character[i][1];
                                    if (!groupnum[Q]) groupnum[Q] = 0;
                                    groupnum[Q]++;
                                    if (groupnum[Q] > 20) {
                                        groups.add(lib.character[i][1]);
                                    } //删除多余势力
                                } //删除多余势力
                                if (namecapt.indexOf(getCapt(i)) == -1) {
                                    namecapt.push(getCapt(i));
                                }
                            }
                        } //删除多余势力
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
                                        } else if (dialog.currentcapt2 && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt, true)) {
                                            dialog.buttons[i].classList.add('nodisplay');
                                        } else {
                                            dialog.buttons[i].classList.remove('nodisplay');
                                        }
                                    }
                                } else {
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
                                        } else if (dialog.currentcapt2 && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt, true)) {
                                            dialog.buttons[i].classList.add('nodisplay');
                                        } else if (dialog.currentgroup && dialog.buttons[i].group != dialog.currentgroup) {
                                            dialog.buttons[i].classList.add('nodisplay');
                                        } else {
                                            dialog.buttons[i].classList.remove('nodisplay');
                                        }
                                    }
                                }
                            } else {
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
                                        } else if (dialog.currentcapt && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt)) {
                                            dialog.buttons[i].classList.add('nodisplay');
                                        } else {
                                            dialog.buttons[i].classList.remove('nodisplay');
                                        }
                                    }
                                } else {
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
                                    } else if (this.parentNode == newlined2) {
                                        packsource.innerHTML = this.innerHTML;
                                        packsource.classList.add('thundertext');
                                    }
                                    for (var i = 0; i < dialog.buttons.length; i++) {
                                        if (dialog.currentcapt && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt)) {
                                            dialog.buttons[i].classList.add('nodisplay');
                                        } else if (dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt, true)) {
                                            dialog.buttons[i].classList.add('nodisplay');
                                        } else if (dialog.currentgroup && dialog.buttons[i].group != dialog.currentgroup) {
                                            dialog.buttons[i].classList.add('nodisplay');
                                        } else {
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
                                    } else {
                                        dialog.seperate[i].style.display = '';
                                        dialog.seperate[i].nextSibling.style.display = '';
                                    }
                                }
                            }
                            if (filternode) {
                                if (filternode.querySelector('.active')) {
                                    packsource.classList.add('thundertext');
                                } else {
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
                                } else {
                                    newlined.style.fontSize = '22px';
                                }
                                newlined.style.textAlign = 'center';
                                node.appendChild(newlined);
                            } else if (newlined) {
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
                                } else {
                                    span._nature = 'wood';
                                }
                            } else {
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
                                var node = this,
                                    link = this.link;
                                if (node.classList.contains('thundertext')) {
                                    dialog.currentgroup = null;
                                    dialog.currentgroupnode = null;
                                    node.classList.remove('thundertext');
                                    for (var i = 0; i < dialog.buttons.length; i++) {
                                        if (dialog.currentcapt && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt)) {
                                            dialog.buttons[i].classList.add('nodisplay');
                                        } else if (dialog.currentcapt2 && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt, true)) {
                                            dialog.buttons[i].classList.add('nodisplay');
                                        } else {
                                            dialog.buttons[i].classList.remove('nodisplay');
                                        }
                                    }
                                } else {
                                    if (dialog.currentgroupnode) {
                                        dialog.currentgroupnode.classList.remove('thundertext');
                                    }
                                    dialog.currentgroup = link;
                                    dialog.currentgroupnode = node;
                                    node.classList.add('thundertext');
                                    for (var i = 0; i < dialog.buttons.length; i++) {
                                        if (dialog.currentcapt && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt)) {
                                            dialog.buttons[i].classList.add('nodisplay');
                                        } else if (dialog.currentcapt2 && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt, true)) {
                                            dialog.buttons[i].classList.add('nodisplay');
                                        } else if (dialog.currentgroup == 'double') {
                                            if (dialog.buttons[i]._changeGroup) dialog.buttons[i].classList.remove('nodisplay');
                                            else dialog.buttons[i].classList.add('nodisplay');
                                        } else if (dialog.currentgroup == 'ye') {
                                            if (dialog.buttons[i].group == 'ye') dialog.buttons[i].classList.remove('nodisplay');
                                            else dialog.buttons[i].classList.add('nodisplay');
                                        } else {
                                            if (dialog.buttons[i]._changeGroup || dialog.buttons[i].group != dialog.currentgroup) {
                                                dialog.buttons[i].classList.add('nodisplay');
                                            } else {
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
                            } else {
                                if (onlypack) {
                                    packsource.onlypack = true;
                                    packsource.innerHTML = get.translation(onlypack + '_character_config');
                                    packsource.style.display = 'none';
                                    packsource.previousSibling.style.display = 'none';
                                } else {
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
                            } else {
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
                                        filternode.firstChild.style.top = dh / 2 + 'px';
                                    } else {
                                        filternode.firstChild.style.top = '';
                                    }
                                } else {
                                    if (newlined2.style.display == 'none') {
                                        newlined2.style.display = 'block';
                                    } else {
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
                                } else {
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
                                    case 'basic':
                                        return 0;
                                    case 'chess':
                                        return 1.5;
                                    case 'trick':
                                        return 2;
                                    case 'delay':
                                        return 3;
                                    case 'equip':
                                        return 4;
                                    case 'zhenfa':
                                        return 5;
                                    default:
                                        return 6;
                                }
                            };
                            list.sort(function (a, b) {
                                var del = groupSort(a) - groupSort(b);
                                if (del != 0) return del;
                                var aa = a,
                                    bb = b;
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
                        } else {
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
                            dialog.style.height = (game.layout == 'long2' || game.layout == 'nova' ? 380 : 350) + 'px';
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
                                    } else {
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
                            } else {
                                dialog.add([list, 'vcard'], noclick);
                            }
                        } else {
                            if (precharacter) {
                                dialog.add([list, 'precharacter'], noclick);
                            } else if (characterx) {
                                dialog.add([list, 'characterx'], noclick);
                            } else {
                                dialog.add([list, 'character'], noclick);
                            }
                        }
                        dialog.add(ui.create.div('.placeholder'));
                        for (var i = 0; i < dialog.buttons.length; i++) {
                            if (thisiscard) {
                                dialog.buttons[i].capt = getCapt(dialog.buttons[i].link[2]);
                            } else {
                                dialog.buttons[i].group = lib.character[dialog.buttons[i].link][1];
                                dialog.buttons[i].capt = getCapt(dialog.buttons[i].link);
                            }
                        }
                        if (!expandall) {
                            if (!thisiscard && (lib.characterDialogGroup[lib.config.character_dialog_tool] || lib.config.character_dialog_tool == '自创')) {
                                clickCapt.call(node[lib.config.character_dialog_tool]);
                            }
                        }
                        //仅仅下面是新加的,by Curpond
                        let container = dialog.querySelector('.content-container>.content');
                        let Searcher = ui.create.div('.searcher.caption');
                        let input = document.createElement('input');
                        input.style.textAlign = 'center';
                        input.style.border = 'solid 2px #294510';
                        input.style.borderRadius = '6px';
                        input.style.fontWeight = 'bold';
                        input.style.fontSize = '21px';
                        let find = ui.create.button(['find', '搜索'], 'tdnodes');
                        find.style.display = 'inline';
                        let clickfind = function (e) {
                            e.stopPropagation();
                            let value = input.value;
                            if (value == '') {
                                game.alert('搜索不能为空');
                                input.focus();
                                return;
                            }
                            let list = [];
                            for (let btn of dialog.buttons) {
                                if (new RegExp(value, 'g').test(get.translation(btn.link))) {
                                    btn.classList.remove('nodisplay');
                                } else {
                                    btn.classList.add('nodisplay');
                                }
                            }
                        };
                        input.addEventListener('keyup', (e) => {
                            if (e.key == 'Enter') clickfind(e);
                        });
                        find.listen(clickfind);
                        Searcher.appendChild(input);
                        Searcher.appendChild(find);
                        container.prepend(Searcher);
                        return dialog;
                    };
                },
                set() { },
            }); //选将列表修改
        } //武将全部可选
        if (QQQ.config.还原初始牌堆) {
            Reflect.defineProperty(lib.card, 'list', {
                get() {
                    return [
                        ['heart', 10, 'sha'],
                        ['heart', 2, 'shan'],
                        ['diamond', 2, 'shan'],
                        ['diamond', 12, 'fangtian'],
                        ['spade', 9, 'sha'],
                        ['diamond', 6, 'shan'],
                        ['heart', 5, 'chitu'],
                        ['heart', 10, 'sha', 'fire'],
                        ['heart', 8, 'wuzhong'],
                        ['heart', 11, 'shan'],
                        ['spade', 8, 'sha'],
                        ['club', 2, 'bagua'],
                        ['club', 5, 'dilu'],
                        ['heart', 11, 'sha'],
                        ['heart', 13, 'shan'],
                        ['club', 8, 'sha'],
                        ['spade', 1, 'juedou'],
                        ['heart', 4, 'sha', 'fire'],
                        ['club', 6, 'sha'],
                        ['club', 8, 'sha', 'thunder'],
                        ['heart', 6, 'tao'],
                        ['club', 10, 'sha'],
                        ['diamond', 1, 'zhuque'],
                        ['heart', 9, 'tao'],
                        ['spade', 2, 'hanbing'],
                        ['club', 11, 'sha'],
                        ['heart', 1, 'taoyuan'],
                        ['heart', 8, 'shan'],
                        ['club', 4, 'guohe'],
                        ['club', 4, 'bingliang'],
                        ['diamond', 9, 'sha'],
                        ['club', 11, 'sha'],
                        ['heart', 7, 'tao'],
                        ['spade', 12, 'zhangba'],
                        ['spade', 8, 'sha', 'thunder'],
                        ['spade', 4, 'shunshou'],
                        ['heart', 6, 'tao'],
                        ['diamond', 8, 'shan'],
                        ['spade', 2, 'tengjia'],
                        ['heart', 8, 'tao'],
                        ['spade', 6, 'qinggang'],
                        ['spade', 11, 'tiesuo'],
                        ['club', 12, 'wuxie'],
                        ['club', 9, 'sha'],
                        ['spade', 12, 'tiesuo'],
                        ['spade', 3, 'guohe'],
                        ['spade', 7, 'sha', 'thunder'],
                        ['heart', 5, 'qilin'],
                        ['diamond', 12, 'wuxie'],
                        ['spade', 3, 'shunshou'],
                        ['heart', 12, 'shan'],
                        ['diamond', 4, 'shan'],
                        ['heart', 9, 'shan'],
                        ['heart', 10, 'sha'],
                        ['diamond', 8, 'shan'],
                        ['spade', 11, 'wuxie'],
                        ['diamond', 6, 'sha'],
                        ['diamond', 7, 'shan'],
                        ['spade', 6, 'sha', 'thunder'],
                        ['heart', 7, 'sha', 'fire'],
                        ['club', 2, 'renwang'],
                        ['spade', 13, 'dawan'],
                        ['club', 13, 'wuxie'],
                        ['heart', 12, 'tao'],
                        ['diamond', 6, 'shan'],
                        ['club', 9, 'jiu'],
                        ['spade', 6, 'lebu'],
                        ['heart', 7, 'wuzhong'],
                        ['spade', 5, 'qinglong'],
                        ['diamond', 12, 'huogong'],
                        ['spade', 3, 'jiu'],
                        ['diamond', 3, 'tao'],
                        ['diamond', 11, 'shan'],
                        ['diamond', 10, 'sha'],
                        ['diamond', 8, 'sha'],
                        ['spade', 4, 'sha', 'thunder'],
                        ['heart', 2, 'huogong'],
                        ['diamond', 3, 'shunshou'],
                        ['spade', 10, 'bingliang'],
                        ['diamond', 12, 'tao'],
                        ['spade', 12, 'guohe'],
                        ['club', 12, 'tiesuo'],
                        ['diamond', 3, 'shan'],
                        ['heart', 5, 'tao'],
                        ['spade', 13, 'wuxie'],
                        ['spade', 10, 'sha'],
                        ['club', 12, 'jiedao'],
                        ['club', 13, 'tiesuo'],
                        ['spade', 13, 'nanman'],
                        ['diamond', 5, 'guanshi'],
                        ['diamond', 10, 'shan'],
                        ['spade', 7, 'sha'],
                        ['heart', 2, 'shan'],
                        ['club', 7, 'nanman'],
                        ['spade', 1, 'shandian'],
                        ['diamond', 13, 'sha'],
                        ['heart', 1, 'wuxie'],
                        ['club', 3, 'jiu'],
                        ['heart', 12, 'guohe'],
                        ['heart', 6, 'lebu'],
                        ['club', 7, 'sha'],
                        ['diamond', 1, 'zhuge'],
                        ['spade', 1, 'guding'],
                        ['heart', 4, 'wugu'],
                        ['spade', 5, 'jueying'],
                        ['spade', 9, 'jiu'],
                        ['spade', 8, 'sha'],
                        ['heart', 12, 'shandian'],
                        ['club', 3, 'guohe'],
                        ['club', 8, 'sha'],
                        ['diamond', 9, 'jiu'],
                        ['club', 9, 'sha'],
                        ['heart', 3, 'huogong'],
                        ['diamond', 9, 'shan'],
                        ['club', 3, 'sha'],
                        ['club', 1, 'baiyin'],
                        ['club', 1, 'juedou'],
                        ['diamond', 2, 'shan'],
                        ['heart', 13, 'wuxie'],
                        ['heart', 11, 'wuzhong'],
                        ['club', 7, 'sha', 'thunder'],
                        ['heart', 3, 'wugu'],
                        ['spade', 2, 'bagua'],
                        ['club', 6, 'sha', 'thunder'],
                        ['club', 13, 'jiedao'],
                        ['diamond', 1, 'juedou'],
                        ['heart', 1, 'wanjian'],
                        ['spade', 10, 'sha'],
                        ['spade', 9, 'sha'],
                        ['spade', 11, 'shunshou'],
                        ['diamond', 5, 'sha', 'fire'],
                        ['diamond', 7, 'sha'],
                        ['club', 5, 'sha', 'thunder'],
                        ['diamond', 5, 'muniu'],
                        ['club', 2, 'tengjia'],
                        ['spade', 5, 'sha', 'thunder'],
                        ['diamond', 13, 'hualiu'],
                        ['diamond', 4, 'sha', 'fire'],
                        ['heart', 9, 'wuzhong'],
                        ['club', 6, 'lebu'],
                        ['spade', 4, 'guohe'],
                        ['spade', 7, 'nanman'],
                        ['club', 10, 'sha'],
                        ['diamond', 4, 'shunshou'],
                        ['diamond', 11, 'shan'],
                        ['club', 1, 'zhuge'],
                        ['spade', 2, 'cixiong'],
                        ['club', 2, 'sha'],
                        ['diamond', 5, 'shan'],
                        ['diamond', 11, 'shan'],
                        ['diamond', 2, 'tao'],
                        ['club', 5, 'sha'],
                        ['club', 10, 'tiesuo'],
                        ['club', 11, 'tiesuo'],
                        ['diamond', 7, 'shan'],
                        ['heart', 4, 'tao'],
                        ['diamond', 10, 'shan'],
                        ['heart', 13, 'zhuahuang'],
                        ['heart', 3, 'tao'],
                        ['club', 4, 'sha'],
                        ['diamond', 13, 'zixin'],
                    ].randomSort();
                },
                configurable: false,
                set() { },
            });
        } //还原初始牌堆
        if (QQQ.config.神武再世) {
            game.loadModeAsync('boss', function (mode) {
                for (var i in mode.translate) {
                    lib.translate[i] = lib.translate[i] || mode.translate[i];
                }
                for (var i in mode.skill) {
                    if (!lib.skill[i]) {
                        lib.skill[i] = mode.skill[i];
                    } //QQQ
                    game.finishSkill(i);
                }
                for (var i in mode.card) {
                    lib.card[i] = lib.card[i] || mode.card[i];
                    lib.card.list.push([lib.suits.randomGet(), lib.number.randomGet(), i]);
                    lib.inpile.add(i);
                }
                for (var i in mode.characterPack.mode_boss) {
                    lib.character[i] = lib.character[i] || mode.characterPack.mode_boss[i];
                    Reflect.defineProperty(lib.character[i], 'trashBin', {
                        get() {
                            return [`mode:boss`];
                        },
                        configurable: false,
                        set() { },
                    });
                }
                lib.characterPack.boss = mode.characterPack.mode_boss;
                lib.translate.boss_character_config = '挑战武将';
            }); //挑战模式
            game.loadModeAsync('versus', function (mode) {
                for (var i in mode.translate) {
                    lib.translate[i] = lib.translate[i] || mode.translate[i];
                }
                for (var i in mode.skill) {
                    if (!lib.skill[i]) {
                        lib.skill[i] = mode.skill[i];
                    } //QQQ
                    game.finishSkill(i);
                }
                for (var i in mode.card) {
                    lib.card[i] = lib.card[i] || mode.card[i];
                    lib.card.list.push([lib.suits.randomGet(), lib.number.randomGet(), i]);
                    lib.inpile.add(i);
                }
                for (var i in mode.jiangeboss) {
                    lib.character[i] = lib.character[i] || mode.jiangeboss[i];
                    Reflect.defineProperty(lib.character[i], 'trashBin', {
                        get() {
                            return [`mode:versus`];
                        },
                        configurable: false,
                        set() { },
                    });
                }
                lib.characterPack.jiange = mode.jiangeboss;
                lib.translate.jiange_character_config = '剑阁武将';
            }); //对决模式
        } //添加boss模式专属卡牌技能
        //—————————————————————————————————————————————————————————————————————————————CSS
        const css = function () {
            lib.init.css('extension/温柔一刀/QQQ.css');
            if (QQQ.config.界面修改) {
                lib.init.css('extension/温柔一刀/QQ.css');
                if (!(_status.maximumNumberOfPlayers > 32)) {
                    _status.maximumNumberOfPlayers = 32;
                }
                for (let num = 9; num < 33; num++) {
                    const list = [];
                    const fan = Math.ceil(num * 0.4);
                    const nei = Math.ceil(num * 0.2);
                    const zhong = num - 1 - fan - nei;
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
                    lib.config.mode_config.identity.identity[num - 2] = list;
                    const style = document.createElement('style');
                    style.innerHTML = ``;
                    for (let pos = 1; pos < num; pos++) {
                        if (pos < num / 4) {
                            style.innerHTML += `#arena[data-number='${num}']>.player[data-position='${pos}']{
                                        top:calc(${60 - (40 / num) * pos}%)!important;
                                        left:calc(${45 + (200 / num) * pos}%)!important;
                                        transform: scale(${Math.max(0.55, 1 - num / 70)})!important;
                                        }`;
                        }
                        else if (pos == num / 4) {
                            style.innerHTML += `#arena[data-number='${num}']>.player[data-position='${pos}']{
                                        top:calc(25%)!important;
                                        left:calc(92%)!important;
                                        transform: scale(${Math.max(0.55, 1 - num / 70)})!important;
                                        }`;
                        }
                        else if (pos < num / 2) {
                            style.innerHTML += `#arena[data-number='${num}']>.player[data-position='${pos}']{
                                            top:calc(${15 - (40 / num) * pos}%)!important;
                                            left:calc(${145 - (200 / num) * pos}%)!important;
                                            transform: scale(${Math.max(0.55, 1 - num / 70)})!important;
                                            }`;
                        }
                        else if (pos == num / 2) {
                            style.innerHTML += `#arena[data-number='${num}']>.player[data-position='${pos}']{
                                            top:calc(-5%)!important;
                                            left:calc(45%)!important;
                                            transform: scale(${Math.max(0.55, 1 - num / 70)})!important;
                                            }`;
                        }
                        else if (pos < 0.75 * num) {
                            style.innerHTML += `#arena[data-number='${num}']>.player[data-position='${pos}']{
                                            top:calc(${(40 / num) * pos - 25}%)!important;
                                            left:calc(${145 - (200 / num) * pos}%)!important;
                                            transform: scale(${Math.max(0.55, 1 - num / 70)})!important;
                                            }`;
                        }
                        else if (pos == 0.75 * num) {
                            style.innerHTML += `#arena[data-number='${num}']>.player[data-position='${pos}']{
                                            top:calc(25%)!important;
                                            left:calc(-4%)!important;
                                            transform: scale(${Math.max(0.55, 1 - num / 70)})!important;
                                            }`;
                        }
                        else {
                            style.innerHTML += `#arena[data-number='${num}']>.player[data-position='${pos}']{
                                        top:calc(${20 + (40 / num) * pos}%)!important;
                                        left:calc(${-155 + (200 / num) * pos}%)!important;
                                        transform: scale(${Math.max(0.55, 1 - num / 70)})!important;
                                        }`;
                        }
                    }
                    document.head.appendChild(style);
                }
            } //多人场适配//拉长立绘//移动标记
            if (QQQ.config.文字闪烁) {
                //—————————————————————————————————————————————————————————————————————————————技能标签
                const style1 = document.createElement('style');
                style1.innerHTML = '@keyframes QQQ{';
                for (var i = 1; i <= 20; i++) {
                    let rand1 = Math.floor(Math.random() * 255),
                        rand2 = Math.floor(Math.random() * 255),
                        rand3 = Math.floor(Math.random() * 255);
                    style1.innerHTML += i * 5 + `%{text-shadow: black 0 0 1px,rgba(${rand1}, ${rand2}, ${rand3}, 0.6) 0 0 2px,rgba(${rand1}, ${rand2}, ${rand3}, 0.6) 0 0 5px,rgba(${rand1}, ${rand2}, ${rand3}, 0.6) 0 0 10px,rgba(${rand1}, ${rand2}, ${rand3}, 0.6) 0 0 10px,rgba(${rand1}, ${rand2}, ${rand3}, 0.6) 0 0 20px,rgba(${rand1}, ${rand2}, ${rand3}, 0.6) 0 0 20px}`;
                }
                style1.innerHTML += '}';
                document.head.appendChild(style1);
                //—————————————————————————————————————————————————————————————————————————————火焰前缀
                const style2 = document.createElement('style');
                style2.innerHTML = '@keyframes flame {';
                for (var i = 0; i <= 100; i++) {
                    // 随着动画进展,颜色逐渐从橙红变为黄色再到白色
                    let r = Math.min(255, 140 + i * 1.15); // 红色分量逐渐增加
                    let g = Math.min(255, 30 + i * 2.25); // 绿色分量逐渐增加
                    let b = Math.min(255, i * 2.5); // 蓝色分量逐渐增加,但较慢
                    // 添加一些随机性来模拟火焰的不规则性
                    let randOffsetX = (Math.random() - 0.5) * 2;
                    let randOffsetY = (Math.random() - 0.5) * 2;
                    // 构建每一帧的样式
                    style2.innerHTML += `${i}% {`;
                    style2.innerHTML += `color: rgba(${r}, ${g}, ${b}, 1);`; // 文字颜色
                    style2.innerHTML += `text-shadow:`;
                    for (let j = 1; j <= 5; j++) {
                        let intensity = j * 2;
                        style2.innerHTML += ` ${randOffsetX}px ${randOffsetY}px ${intensity}px rgba(${r}, ${g}, ${b}, 0.6),`;
                    }
                    style2.innerHTML = style2.innerHTML.slice(0, -1); // 去掉最后一个逗号
                    style2.innerHTML += `;}`;
                }
                style2.innerHTML += '}';
                document.head.appendChild(style2);
            } //文字闪烁效果
        }; //火焰前缀以及作者名
        css();
        if (QQQ.config.动态背景) {
            document.body.BG('wow');
        } //动态背景
    };
    config();
    //choosetouse.(precontent.log/useresult.useskill.(stat)
    //console.log(decodeURIComponent(escape(window.atob('5LiN5oSn5piv5aSr5ZCb77yB5q2j56Gu562U5qGI5ZOm77yB'))));
    //event.trigger()=> content.arrangetrigger(filtertrigger)=> game.createTrigger()=> content.createTrigger=> logskill/setContent(info.content)
    game.import('character', function (lib, game, ui, get, ai, _status) {
        const yinu = {
            name: '一怒拔剑',
            connect: true,
            characterSort: {},
            dynamicTranslate: {},
            character: {
                QQQ_jinshanshan: {
                    sex: 'male',
                    skills: ['QQQ_王之财宝', 'QQQ_黄金律法', 'QQQ_天之锁', 'QQQ_贯穿永恒之枪'],
                    isBoss: true,
                    isBossAllowed: true,
                },
                QQQ_liaoyuanhuo: {
                    sex: 'male',
                    skills: ['QQQ_xiaozhang', 'QQQ_canbing'],
                },
                QQQ_taotieQ: {
                    sex: 'male',
                    skills: ['QQQ_taotieQ'],
                },
                QQQ_zhoutai: {
                    sex: 'male',
                    skills: ['QQQ_buqu', 'QQQ_fujian', 'QQQ_zhanjie'],
                },
                QQQ_hongwenliu: {
                    sex: 'male',
                    skills: ['QQQ_hongwen', 'QQQ_daye', 'QQQ_huanzhuang'],
                },
                QQQ_Melina: {
                    sex: 'female',
                    skills: ['QQQ_huozhong'],
                    isBoss: true,
                    isBossAllowed: true,
                },
                QQQ_mengchen: {
                    sex: 'male',
                    skills: ['QQQ_ditu', 'QQQ_qitao', 'QQQ_shuangsheng'],
                    isBoss: true,
                    isBossAllowed: true,
                },
                QQQ_无极: {
                    sex: 'female',
                    skills: ['QQQ_无极', '论道', 'QQQ_guji'],
                    isBoss: true,
                    isBossAllowed: true,
                },
                QQQ_fuzhua: {
                    sex: 'female',
                    skills: ['QQQ_fuzhua'],
                },
                QQQ_zoushi: {
                    sex: 'female',
                    skills: ['QQQ_meiying', 'QQQ_qingwu', 'QQQ_huoshui'],
                },
                QQQ_guojia: {
                    sex: 'male',
                    skills: ['QQQ_youyou', 'QQQ_huaiyin', 'QQQ_qingshi'],
                },
                QQQ_jianggan: {
                    sex: 'male',
                    skills: ['QQQ_daoshu', 'QQQ_daizui'],
                },
                QQQ_dongzhuo: {
                    sex: 'male',
                    hp: 7,
                    maxHp: 7,
                    skills: ['QQQ_chenshi', 'QQQ_tanbao', 'QQQ_jiaoheng'],
                    isBoss: true,
                    isBossAllowed: true,
                },
                QQQ_Messmer: {
                    sex: 'male',
                    skills: ['QQQ_ezhishe', 'QQQ_liuhuo', 'QQQ_chuanci'],
                    isBoss: true,
                    isBossAllowed: true,
                },
                QQQ_lijing: {
                    sex: 'male',
                    skills: ['QQQ_tuota'],
                },
                QQQ_mengzhuge: {
                    sex: 'male',
                    hp: 3,
                    maxHp: 7,
                    skills: ['QQQ_jieming', 'QQQ_beiding', 'QQQ_chuancheng'],
                },
                QQQ_Godwyn: {
                    sex: 'male',
                    hp: 2,
                    maxHp: 6,
                    skills: ['QQQ_sidan', 'QQQ_siwangshanyan'],
                },
                QQQ_Trina: {
                    sex: 'female',
                    skills: ['QQQ_mihuan'],
                },
                QQQ_SmelterKnights: {
                    sex: 'male',
                    skills: ['QQQ_ronglu'],
                },
                QQQ_zhushou: {
                    sex: 'male',
                    hp: 6,
                    maxHp: 6,
                    skills: ['QQQ_cejun', 'QQQ_zhenzhan'],
                },
                QQQ_lunxunq: {
                    sex: 'male',
                    skills: ['QQQ_baixiangl', 'QQQ_linlve', 'QQQ_shidi'],
                },
                QQQ_hongting: {
                    sex: 'male',
                    skills: ['QQQ_chunqiuchan'],
                },
                QQQ_qinbaisheng: {
                    sex: 'male',
                    skills: ['QQQ_datongfeng', 'QQQ_wuzhiquanxinjian'],
                },
                EX_zhonghui: {
                    sex: 'male',
                    skills: ['EX_duji'],
                },
                QQQ_jiananfeng: {
                    sex: 'female',
                    skills: ['QQQ_xingluan', 'QQQ_kuangzheng'],
                },
                QQQ_Marika: {
                    sex: 'female',
                    skills: ['QQQ_shuangmian', 'QQQ_shichui'],
                    isBoss: true,
                    isBossAllowed: true,
                },
                QQQ_Radagon: {
                    sex: 'male',
                    skills: ['QQQ_shuangmian', 'QQQ_shichui'],
                    isBoss: true,
                    isBossAllowed: true,
                },
                QQQ_xingxiu: {
                    sex: 'female',
                    skills: ['QQQ_yuxiu', 'QQQ_fengrufeitun'],
                },
                QQQ_CosmicStarfish: {
                    sex: 'male',
                    skills: ['QQQ_diwuweidu'],
                },
                QQQ_Malenia: {
                    sex: 'female',
                    skills: ['QQQ_shuiniao', 'QQQ_yishoudao', 'QQQ_xinghongfubai'],
                },
                QQQ_Radahn: {
                    sex: 'male',
                    skills: ['QQQ_zhongli', 'QQQ_suixing', 'QQQ_zhandoujidian', 'QQQ_dahuangxingyun'],
                },
                QQQ_Morgott: {
                    sex: 'male',
                    skills: ['QQQ_zhoujian', 'QQQ_zhuying'],
                },
                QQQ_菈妮: {
                    sex: 'female',
                    skills: ['QQQ_anyue'],
                },
                QQQ_Mohg: {
                    sex: 'male',
                    skills: ['QQQ_xianxuejixian', 'QQQ_zuzhouzhixue', 'QQQ_zhenshizhimu'],
                    hp: 5,
                    maxHp: 5,
                },
            },
            characterTitle: {
                QQQ_jinshanshan: `<b style='color: rgb(231, 233, 203); font-size: 25px;'>金闪闪</b>`,
                QQQ_Messmer: `<b style='color: rgb(221, 22, 22); font-size: 25px;'>幽影之火</b>`,
                QQQ_Godwyn: `<b style='color: rgb(22, 4, 70); font-size: 25px;'>死王子</b>`,
                QQQ_Melina: `<b style='color: rgb(231, 111, 12); font-size: 25px;'>火种少女</b>`,
                QQQ_hongting: `<b style='color: rgb(221, 22, 22); font-size: 25px;'>红莲魔尊</b>`,
                QQQ_CosmicStarfish: `<b style='color: rgb(22, 85, 221); font-size: 25px;'>群星与苍穹之上的梦</b>`,
                QQQ_Malenia: `<b style='color: rgb(165, 15, 224); font-size: 25px;'>女武神</b>`,
                QQQ_Radahn: `<b style='color: rgb(74, 8, 161); font-size: 25px;'>碎星将军</b>`,
                QQQ_Morgott: `<b style='color: rgb(226, 230, 39); font-size: 25px;'>赐福王</b>`,
                QQQ_菈妮: `<b style='color: rgb(92, 153, 233); font-size: 25px;'>暗月公主</b>`,
                QQQ_Mohg: `<b style='color: rgb(221, 22, 22); font-size: 25px;'>鲜血君王</b>`,
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
                QQQ_Messmer: '设计者:秋(1138146139)<br>编写者:潜在水里的火(1476811518)',
                QQQ_lijing: '设计者:裸睡天依(2847826324)<br>编写者:潜在水里的火(1476811518)',
                QQQ_liaoyuanhuo: '设计者:秋(1138146139)<br>编写者:潜在水里的火(1476811518)',
                QQQ_mengzhuge: '设计者:想去远方(3436289223)<br>编写者:潜在水里的火(1476811518)<br>五丈原上,秋风瑟瑟,诸葛亮身披鹤氅,手执羽扇,端坐于七星灯下.此灯乃按北斗七星之形排列,寓意借天之力,延寿一纪.亮知天命将尽,然心中壮志未酬,故行此法,以求再战中原.<br>魏延者,蜀汉猛将也,素以勇猛著称,然性急躁,不善深思.是夜,魏延巡营至中军大帐外,见七星灯明灭不定,误以为敌袭,遂大步闯入.<br>亮见状,微叹一声,未及言语,魏延已至灯前.众将皆惊,恐灯灭而丞相生命危矣.<br>然魏延虽鲁莽,此刻却似有神助,竟未触及灯盏,仅一步之遥,便止步不前,环顾四周,恍然大悟,自知闯祸,慌忙退出帐外.原来,此乃天意使然,魏延虽无意,却成全了亮之心愿.<br>自此之后,亮身体渐复,精神焕发,乃整顿兵马,誓师北伐.曹魏闻风丧胆,望风而逃.亮率大军北定中原,所向披靡,一时之间,天下震动.<br>既平北方,亮又洞察时局,审时度势,决意东征伐吴.姜维者,凉州上士也,文武双全,忠诚可靠.亮观其言行举止,知其可担大任,遂悉心传授兵法韬略,以及治国安邦之道.<br>亮临终之际,召集诸将,于病榻前指姜维而言曰:<吾平生所学,已尽传于此子,汝等当辅佐之,共谋大业.>言罢而逝,举帐痛哭,声震四野.姜维继丞相之位,秉承遗志,继续北伐,虽屡遭挫折,然忠心不改.<br>此时,蜀汉已据中原,国力强盛.维遂挥师东向,直指江东.吴主孙皓闻之,惊慌失措,急聚群臣商议对策.姜维运用诸葛亮所授兵法,运筹帷幄,决胜千里.吴军节节败退,最终,姜维大军压境,孙皓被迫请降.<br>自此,三国归一,天下太平.姜维功成名就,被尊为<武乡侯>,与诸葛亮齐名.后人论及此事,无不感叹诸葛武侯之智谋与姜维之勇毅,共赞之曰:<前后出师遗表在,令人一览泪沾襟>',
                QQQ_Trina: '设计者:想去远方(3436289223)<br>编写者:潜在水里的火(1476811518)',
                QQQ_SmelterKnights: '设计者:秋(1138146139)<br>编写者:潜在水里的火(1476811518)',
                QQQ_zhushou: '设计者:秋(1138146139)<br>编写者:潜在水里的火(1476811518)',
                QQQ_lunxunq: '设计者:梦婉清(3541725571)<br>编写者:潜在水里的火(1476811518)',
                QQQ_jiananfeng: '设计者:秋(1138146139)<br>编写者:潜在水里的火(1476811518)',
                QQQ_xingxiu: '童年,由于宿命蛊昭示其将是未来的人族仙尊,开创智道.三岁时被元始仙尊收为弟子<br>因星宿不练习杀招反贪玩逗弄小狸猫而被元始仙尊带到被异族屠戮一空的村庄进行教训,告诉她要努力修行,成为仙尊,开创智道,将惧怕元始仙尊而躲藏起来的异人的福地洞天推算出来一一铲除,真正奠定人族的盛世<br>数日后星宿和小狸猫小黄分别.因孤独努力的童年暗自哭泣,从心口分出一团星影,取名明皓(取自元始仙尊<明眸皓齿,聪明伶俐>的夸赞),若有来生则替自己好好玩耍,弥补此生遗憾<br>青年,星宿出落成一位妙龄女仙.为了开创智道,不一味地闭关,经常游历四方,充实眼界.在伪装身份行走东海的时候,她结识到了一位蛊仙.因机缘巧合下的多次相遇,携手对敌,剪除异人部族,共探海底深沟等等,情谊浓郁,转为情愫<br>但在心上人重伤显露异人本相后,因为<自己作为人族未来仙尊,要为人族铲除异人蛊仙,如果自己的丈夫是异人,自己会下不了手.而一旦姑息异人,人族又何去何从.>而与异人分别,在治好他后隐藏身形目送他离去<br>因爱不得的心痛心口分出一团星影,取名毓秀(取自心上人<钟灵毓秀>的夸赞),若有来生则替自己好好活着,为自己自私一次,痛快地去爱,淋漓地去哭!<br>晚年,星宿已然成尊,剿除了绝大多数的异人蛊仙,我已经带领人族走向昌盛.在为了天庭未来牺牲自我同化天意前,面对亲如母女的师姐的劝阻,从心口分出一团星影,取名丰雅(取自师姐<丰神雅量>的夸赞),让其服侍在师姐身边,替自己弥补遗憾.并告诉师姐,留下的三个星影,亦是自己重生的布置,并约定自己再次重生,一定为自己而活,不管这世界,不管什么人族!而后前去同化天意<br>当明皓、毓秀、丰雅被唤醒,得到的是巨大的噩耗:宿命蛊毁灭,天庭衰败到了谷底,方源成魔,正消魔涨,中洲危机四伏.面对这种情况,三位亚仙尊于疯魔窟第八层青莲大世界合而为一,化为星宿仙尊.于元境之中补足境界,重登智道道主',
                QQQ_CosmicStarfish: '一位沉睡的王在水中安息.碎为五片,他翻滚在永恒的噩梦里:一个篡权者夺取了他的王座.但他并非全然不知.第五王看向世界,用不息之火焚尽世界,惩罚那把他流放的叛徒.他的怒火是无可驾驭的.所以,他分享了梦.他们为特定的缘由被选中,他们是他的斗士,命定要以他的荣光共享这世界.命定要用妨碍他者的血沐浴世界,提醒所有人谁为真正的尊主.即便是怀着最盛的饥渴,有时他们也只咬一小口.血祭是其所欲.魂祭是其所需',
            },
            skill: {
                //————————————————————————————————————————————吉尔伽美什
                QQQ_黄金律法: {
                    trigger: {
                        player: ['dieAfter'],
                        global: ['phaseEnd'],
                    },
                    init(player) {
                        player.storage.QQQ_黄金律法 = 3;
                        const dieAfter = lib.element.player.dieAfter;
                        lib.element.player.dieAfter = function () {
                            if (this.storage && this.storage.QQQ_黄金律法 > 0) return;
                            dieAfter.apply(this, arguments);
                        }; //死后先不结算
                    },
                    filter(event, player) {
                        return player.storage.QQQ_黄金律法 > 0 && !game.players.includes(player);
                    },
                    get usable() {
                        return undefined;
                    }, //只读//如果限制每回合发动次数那么第三次就不能复活,但是游戏仍然不能结束
                    set usable(v) { },
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
                        const num = lib.character[player.name]?.maxHp || 4;
                        player.maxHp = num;
                        player.hp = num;
                        player.draw(num);
                        player.markSkill('QQQ_黄金律法');
                        if (player.storage.QQQ_黄金律法 <= 0) {
                            player.$skill('赐福消逝');
                        }
                    },
                    group: ['QQQ_黄金律法_1', 'QQQ_黄金律法_2'],
                    subSkill: {
                        1: {
                            trigger: {
                                player: 'damageAfter',
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
                                source: 'damageBefore',
                            },
                            silent: true,
                            async content(event, trigger, player) {
                                player.storage.QQQ_黄金律法 += trigger.num;
                            },
                        },
                    },
                },
                QQQ_王之财宝: {
                    trigger: {
                        global: ['useCard0'],
                    },
                    forced: true,
                    init: (player) => (player.storage.QQQ_王之财宝 = 0),
                    async content(event, trigger, player) {
                        const card = Array.from(ui.cardPile.childNodes)
                            .filter((Q) => get.type(Q) == 'equip')
                            .randomGet();
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
                        },
                    },
                },
                QQQ_天之锁: {
                    trigger: {
                        global: ['roundStart'],
                    },
                    forced: true,
                    async content(event, trigger, player) {
                        const phaselist = ['phaseZhunbei', 'phaseJudge', 'phaseDraw', 'phaseUse', 'phaseDiscard', 'phaseJieshu'];
                        const skip0 = phaselist.randomGet();
                        player.skip(skip0);
                        game.log(`${get.translation(player)}跳过了${get.translation(skip0)}`);
                        const { result } = await player.chooseTarget('令其随机跳过两个阶段,若其为神势力,则随机跳过四个阶段', (c, p, t) => t != p, [1, game.players.length]).set('ai', (target) => -get.attitude(target, player));
                        if (result.targets && result.targets[0]) {
                            for (const i of result.targets) {
                                if (i.group == 'shen') {
                                    const skip = phaselist.randomGets(4);
                                    i.skipList.addArray(skip);
                                    game.log(`${get.translation(i)}跳过了${get.translation(skip)}`);
                                } else {
                                    const skip = phaselist.randomGets(2);
                                    i.skipList.addArray(skip);
                                    game.log(`${get.translation(i)}跳过了${get.translation(skip)}`);
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
                    init: (player) => (player.storage.QQQ_贯穿永恒之枪 = 0),
                    mark: true,
                    intro: {
                        name: '贯穿',
                        content: '$',
                    },
                    _priority: 23,
                    async content(event, trigger, player) {
                        if (trigger.targets && (!player.storage.QQQ_贯穿card || player.storage.QQQ_贯穿card == trigger.card.name) && (!player.storage.QQQ_贯穿target || player.storage.QQQ_贯穿target.Qinclude(trigger.targets))) {
                            player.storage.QQQ_贯穿永恒之枪++;
                        } else {
                            player.storage.QQQ_贯穿永恒之枪 = 1;
                        }
                        player.storage.QQQ_贯穿card = trigger.card.name;
                        if (trigger.targets) {
                            player.storage.QQQ_贯穿target = trigger.targets;
                        }
                        if (player.storage.QQQ_贯穿永恒之枪 > 2) {
                            for (const i of trigger.targets) {
                                i.die();
                            }
                        }
                    },
                },
                //————————————————————————————————————————————饕餮
                //摸牌阶段你改为从任意位置获得等量的桃,每当你摸到桃后,为此牌增加一个标记.每当你摸到带标记的牌之后,你摸等同于此牌标记数的牌
                QQQ_taotieQ: {
                    trigger: {
                        player: ['gainAfter'],
                    },
                    forced: true,
                    filter(event, player) {
                        if (event.cards) {
                            return event.cards.some((q) => Object.keys(player.storage).length || q.gaintag.length || (q.cardtags && q.cardtags.length) || q.name == 'tao');
                        }
                    },
                    async content(event, trigger, player) {
                        var num = 0;
                        for (const i of trigger.cards) {
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
                                const cardList = Array.from(ui.cardPile.childNodes).concat(Array.from(ui.discardPile.childNodes));
                                game.countPlayer(function (current) {
                                    cardList.addArray(current.getCards('hej'));
                                });
                                const cards = cardList.filter((q) => q.name == 'tao');
                                if (cards[0]) {
                                    player.gain(cards.randomGets(trigger.num), 'gain2');
                                }
                            },
                        },
                    },
                },
                //————————————————————————————————————————————周泰
                //不屈:当你受到伤害后:你将对你造成伤害的牌和牌堆顶的一张牌置于你的武将牌上.若如此做,且你的武将牌上有牌名相同的牌,弃置这些牌,回复等量体力
                QQQ_buqu: {
                    trigger: {
                        player: ['damage'],
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
                        for (const i of player.getCards('x')) {
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
                            const { result } = await player.chooseBool('令其选择使用你武将牌上与此牌名不同的一张牌').set('ai', () => trigger.source.isFriendsOf(player));
                            if (result.bool) {
                                const { result: result1 } = await trigger.source
                                    .chooseButton([`选择使用${get.translation(player)}武将牌上与${get.translation(card)}牌名不同的一张牌`, player.getCards('x')])
                                    .set('filterButton', (button) => button.link.name != card.name)
                                    .set('ai', (button) => number0(trigger.source.getUseValue(button.link, true, true)) + 10);
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
                        cardUsable(card, player, num) {
                            if (card.cards?.some((q) => player.getCards('x').includes(q))) {
                                return Infinity;
                            }
                        },
                        targetInRange(card, player) {
                            if (card.cards?.some((q) => player.getCards('x').includes(q))) {
                                return true;
                            }
                        },
                    },
                    hiddenCard(player, name) {
                        return player.getCards('x').some((q) => q.name == name);
                    },
                    enable: ['chooseToUse', 'chooseToRespond'],
                    forced: true,
                    filter(event, player) {
                        for (const i of player.getCards('x')) {
                            if (player.filterCard(i)) {
                                return true;
                            }
                        }
                    },
                    async content(event, trigger, player) {
                        //event是技能名,event.parent是useskill,parent2是chooseToUse
                        const list = [];
                        const evt = event.getParent(2);
                        if (evt.name == '_wuxie') {
                            if (player.getCards('x').some((q) => q.name == 'wuxie')) {
                                list.addArray(player.getCards('x').filter((q) => q.name == 'wuxie'));
                            }
                        } else {
                            for (const i of player.getCards('x')) {
                                if (!lib.card[i.name].content) continue;
                                if (player.filterCard(i)) {
                                    list.push(i);
                                }
                            }
                        }
                        if (list.length) {
                            const {
                                result: { links },
                            } = await player.chooseButton(['使用或打出武将牌上的牌', list]).set('ai', (button) => {
                                if (evt.name == '_wuxie') {
                                    return -get.attitude(player, evt.getParent('useCard').player);
                                }
                                const num = player.getUseValue(button.link, null, true);
                                return number0(num) + 10;
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
                                } //AAA
                                if (evt.parent.name == '_save') {
                                    await player.useCard(links[0], _status.dying, false);
                                }
                                if (evt.name == 'chooseToUse' && links[0].name != 'shan') {
                                    await player.chooseUseTarget(links[0], true, false, 'nodistance'); //强制//不计入次数//无距离限制
                                } else {
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
                            player(player) {
                                if (_status.event.type == 'dying') {
                                    return get.attitude(player, _status.event.dying);
                                }
                                return 1;
                            },
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
                //红温:你的红温不会因使用杀或回合结束消失.若你处于红温状态,则你使用杀指定目标后可以弃置所有牌,然后弃置目标角色所有牌
                QQQ_hongwen: {
                    init(player) {
                        player.storage.jiu = 0;
                        player.node.jiu = ui.create.div('.playerjiu', player.node.avatar);
                        player.node.jiu2 = ui.create.div('.playerjiu', player.node.avatar2);
                        player.node.jiu.delete = game.kongfunc;
                        player.hongwen = 0;
                        Reflect.defineProperty(player.storage, 'jiu', {
                            get() {
                                return player.hongwen;
                            },
                            set(value) {
                                game.log(`红温层数由${player.hongwen}变为${value}`);
                                if (value > player.hongwen) player.hongwen = value;
                                if (isNaN(value)) player.hongwen++;
                            },
                        });
                    },
                    mark: true,
                    intro: {
                        content(storage, player) {
                            return `当前红温层数${player.hongwen}`;
                        },
                    },
                    trigger: {
                        player: ['useCardBefore'],
                    },
                    filter: (event, player) => player.hongwen > 0 && event.card && event.card.name == 'sha' && event.targets,
                    check: (event, player) => event.targets.some((q) => q.isEnemiesOf(player) && q.countCards('he') > player.countCards('he')),
                    async content(event, trigger, player) {
                        player.discard(player.getCards('he'));
                        for (const i of trigger.targets) {
                            i.discard(i.getCards('he'));
                        }
                    },
                    mod: {
                        aiOrder(player, card, num) {
                            if (card.name == 'sha') return 1;
                        },
                    },
                },
                //打野:每当你获得伤害牌后,增加一层红温.当你使用伤害牌后,若此牌未造成伤害,则增加一层红温
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
                            filter(event, player) {
                                return get.tag(event.card, 'damage') && event.targets.some((Q) => !Q.hasHistory('damage', (Q) => Q.card == event.card));
                            },
                            content() {
                                player.hongwen++;
                            },
                        },
                    },
                },
                //换装:当你濒死时,移除红温层数并回复等量体力直到你的体力值大于零
                QQQ_huanzhuang: {
                    trigger: {
                        player: 'dying',
                    },
                    firstDo: true,
                    forced: true,
                    filter(event, player) {
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
                                player: 'useCard1',
                            },
                            filter(event, player) {
                                return event.card && event.card.name == 'sha' && !player.hasSkill('jiu');
                            },
                            forced: true,
                            content() {
                                trigger.baseDamage += player.hongwen;
                            },
                        },
                    },
                },
                //————————————————————————————————————————————夢塵
                //奉旨乞讨,尔等安敢不服
                //帝圖:当有角色成为牌唯一目标时,你可以让所有角色成为此牌目标;当一张牌指定多个目标时,你可以取消之,将所有目标角色各一张牌置于牌堆顶,视为对目标角色使用一张五谷丰登
                QQQ_ditu: {
                    trigger: {
                        global: ['useCardBegin'],
                    },
                    check(event, player) {
                        const current = game.players.filter((q) => !event.targets.includes(q));
                        const friend = current.filter((q) => q.isFriendsOf(player));
                        const enemy = current.filter((q) => q.isEnemiesOf(player));
                        return get.effect(player, event.card, player, player) > 0 == friend.length > enemy.length;
                    },
                    filter: (event, player) => event.targets && event.targets.length == 1 && !['delay', 'equip'].includes(lib.card[event.card.name].type),
                    async content(event, trigger, player) {
                        trigger.targets = game.players;
                    },
                    prompt(event) {
                        return `让所有角色成为${get.translation(event.card)}目标`;
                    },
                    group: ['QQQ_ditu_1'],
                    subSkill: {
                        1: {
                            trigger: {
                                global: ['useCardBefore'],
                            },
                            prompt(event) {
                                return `取消${get.translation(event.card)}的目标<${get.translation(event.targets)}>,将所有目标角色各一张牌置于牌堆顶,视为对目标角色使用一张五谷丰登`;
                            },
                            check(event, player) {
                                const friend = event.targets.filter((q) => q.isFriendsOf(player));
                                const enemy = event.targets.filter((q) => q.isEnemiesOf(player));
                                return get.effect(player, event.card, player, player) > 0 == friend.length < enemy.length;
                            },
                            filter: (event, player) => event.targets && event.targets.length > 1 && event.parent.name != 'QQQ_ditu_1',
                            async content(event, trigger, player) {
                                trigger.all_excluded = true;
                                const list = trigger.targets.filter((q) => q.countCards('he'));
                                for (const i of list) {
                                    const { result } = await player.chooseButton(['将所有目标角色各一张牌置于牌堆顶', i.getCards('he')], true).set('ai', (button) => -get.attitude(player, i) * get.value(button.link));
                                    if (result.links && result.links[0]) {
                                        ui.cardPile.insertBefore(result.links[0], ui.cardPile.firstChild);
                                    }
                                }
                                player.useCard({ name: 'wugu' }, list);
                            },
                        },
                    },
                },
                //乞討:一名角色摸牌阶段结束后,若手牌数为全场最多,其选择一项①交给你x张牌②视为你对其使用x张杀,若此杀造成伤害执行①选项(x为手牌数减手牌上限)
                QQQ_qitao: {
                    trigger: {
                        global: ['phaseDrawAfter'],
                    },
                    forced: true,
                    filter(event, player) {
                        if (event.player == player) return false;
                        for (const i of game.players) {
                            if (event.player.countCards('h') < i.countCards('h')) return false;
                        }
                        return event.player.countCards('h') > event.player.getHandcardLimit();
                    },
                    async content(event, trigger, player) {
                        const num = trigger.player.countCards('h') - trigger.player.getHandcardLimit();
                        const { result } = await trigger.player.chooseControl(`交给${get.translation(player)}${num}张牌`, `视为${get.translation(player)}对你使用${num}张杀,每造成一次伤害执行一次①选项`);
                        if (result.control == `交给${get.translation(player)}${num}张牌`) {
                            await trigger.player.chooseToGive(player, 'he', num, true);
                        } else {
                            var num1 = num;
                            while (num1-- > 0) {
                                const sha = player.useCard({ name: 'sha' }, trigger.player);
                                await sha;
                                if (trigger.player.getHistory('damage', (q) => q.getParent((x) => x == sha)).length > 0) {
                                    await trigger.player.chooseToGive(player, 'he', num, true);
                                }
                            }
                        }
                    },
                },
                //雙生:一名角色回合结束时,若你本回合受到过伤害,你摸八张不同牌名的牌,将体力调整至上限,更换武将牌为梦婉清,执行一个出牌阶段
                QQQ_shuangsheng: {
                    trigger: {
                        global: ['phaseAfter'],
                    },
                    forced: true,
                    filter: (event, player) => player.getHistory('damage').length > 0,
                    async content(event, trigger, player) {
                        const seen = new Set();
                        const uniqueList = Array.from(ui.cardPile.childNodes).filter((item) => {
                            if (seen.has(item.name)) {
                                return false;
                            } else {
                                seen.add(item.name);
                                return true;
                            }
                        });
                        player.gain(uniqueList.randomGets(8), 'gain2');
                        player.hp = player.maxHp;
                        player.qreinit('QQQ_mengwanqing');
                        player.phase();
                    },
                },
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
                        content(storage, player) {
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
                    init(player) {
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
                        game.playAudio('../extension/温柔一刀/audio/相逢.mp3');
                        const list = ['生命', '智力', '魔力', '速度', '精力'];
                        for (const i of game.players) {
                            var num = 0;
                            if (!i.storage.QQQ_huozhong) {
                                i.storage.QQQ_huozhong = {};
                            } else {
                                for (var j in i.storage.QQQ_huozhong) {
                                    num += i.storage.QQQ_huozhong[j];
                                }
                            }
                            num++;
                            const { result } = await i.chooseCard(`交给${get.translation(player)}${num}张牌,然后增加一项基本数值`, 'he', num).set('ai', (card) => get.attitude(player, i) - get.value(card));
                            if (result && result.cards && result.cards[0]) {
                                if (Math.random() > 0.5) {
                                    game.playAudio('../extension/温柔一刀/audio/你听说过指头女巫吗.mp3');
                                } else {
                                    game.playAudio('../extension/温柔一刀/audio/她们是引导褪色者的人.mp3');
                                }
                                if (i == player) {
                                    for (var j of result.cards) {
                                        await player.chooseUseTarget(j, true, false, 'nodistance');
                                    }
                                } else {
                                    i.give(result.cards, player);
                                }
                                const { result: result1 } = await player.chooseButton(['令其增加一项基本数值', [list, 'tdnodes']], true).set('ai', (button) => {
                                    switch (button.link) {
                                        case '智力':
                                            return get.attitude(player, i) * 3.2 * Math.random();
                                        case '魔力':
                                            return get.attitude(player, i) * 3.1 * Math.random();
                                        case '生命':
                                            return get.attitude(player, i) * 3 * Math.random();
                                        case '精力':
                                            return get.attitude(player, i) * 2 * Math.random();
                                        case '速度':
                                            return get.attitude(player, i) * 1 * Math.random();
                                    }
                                });
                                if (result1.links && result1.links[0]) {
                                    if (Math.random() > 0.5) {
                                        game.playAudio('../extension/温柔一刀/audio/你现在没有女巫.mp3');
                                    } else {
                                        game.playAudio('../extension/温柔一刀/audio/我可以代替她的职责.mp3');
                                    }
                                    switch (result1.links[0]) {
                                        case '智力':
                                            {
                                                i.addSkill('QQQ_huozhong_1');
                                                i.storage.QQQ_huozhong.智力 = numberq0(i.storage.QQQ_huozhong.智力) + 1;
                                            }
                                            break;
                                        case '魔力':
                                            {
                                                i.addSkill('QQQ_huozhong_2');
                                                i.storage.QQQ_huozhong.魔力 = numberq0(i.storage.QQQ_huozhong.魔力) + 1;
                                            }
                                            break;
                                        case '精力':
                                            {
                                                i.addSkill('QQQ_huozhong_3');
                                                i.storage.QQQ_huozhong.精力 = numberq0(i.storage.QQQ_huozhong.精力) + 1;
                                            }
                                            break;
                                        case '生命':
                                            {
                                                i.storage.QQQ_huozhong.生命 = numberq0(i.storage.QQQ_huozhong.生命) + 1;
                                                i.gainMaxHp();
                                            }
                                            break;
                                        case '速度':
                                            {
                                                i.addSkill('QQQ_huozhong_4');
                                                i.storage.QQQ_huozhong.速度 = numberq0(i.storage.QQQ_huozhong.速度) + 1;
                                            }
                                            break;
                                    }
                                    i.markSkill('QQQ_huozhong');
                                    player.storage.QQQ_huozhong_num++;
                                    if (player.storage.QQQ_huozhong_num > 5) {
                                        if (Math.random() > 0.5) {
                                            game.playAudio('../extension/温柔一刀/audio/你一定能当上艾尔登之王.mp3');
                                        } else {
                                            game.playAudio('../extension/温柔一刀/audio/我必须向你道谢.mp3');
                                        }
                                        player.$skill('使命成功');
                                        player.node.avatar.style.backgroundImage = `url(extension/温柔一刀/image/Melina_huozhong.jpg)`;
                                        ui.background.style.backgroundImage = `url(extension/温柔一刀/image/Melina_beijing.jpg)`;
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
                            init: (player) => (player.QQQ_huozhong = 0),
                            async content(event, trigger, player) {
                                if (player.QQQ_huozhong < player.storage.QQQ_huozhong.智力) {
                                    if (Math.random() > 0.5) {
                                        game.playAudio('../extension/温柔一刀/audio/你身体中有另一个人.mp3');
                                    } else {
                                        game.playAudio('../extension/温柔一刀/audio/嗨,另一个你.mp3');
                                    }
                                    player.QQQ_huozhong++;
                                    await player.phase();
                                } else {
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
                                    game.playAudio('../extension/温柔一刀/audio/将卢恩化作你的力量.mp3');
                                } else {
                                    game.playAudio('../extension/温柔一刀/audio/想好接受我的条件了吗.mp3');
                                }
                                trigger.num += player.storage.QQQ_huozhong.魔力;
                            },
                        },
                        3: {
                            mod: {
                                cardUsable(card, player, num) {
                                    return num + player.storage.QQQ_huozhong.精力;
                                },
                            },
                        },
                        4: {
                            mod: {
                                globalFrom(from, to, distance) {
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
                                    game.playAudio('../extension/温柔一刀/audio/我请求你最后一次.mp3');
                                } else {
                                    game.playAudio('../extension/温柔一刀/audio/不要否认生命的存在.mp3');
                                }
                                player.$skill('使命失败');
                                player.node.avatar.style.backgroundImage = `url(extension/温柔一刀/image/Melina_dianhuo.jpg)`;
                                document.body.BG('癫火之王');
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
                    trigger: {
                        global: ['phaseBegin'],
                    },
                    filter(event, player) {
                        return game.players.some((i) => player.storage.QQQ_fenjin[i.playerid] >= lib.character[i.name]?.hp);
                    },
                    check(event, player) {
                        const current = game.players.filter((i) => player.storage.QQQ_fenjin[i.playerid] >= lib.character[i.name]?.hp);
                        const friend = current.filter((q) => q.isFriendsOf(player));
                        const enemy = current.filter((q) => q.isEnemiesOf(player));
                        return enemy.length > friend.length;
                    },
                    group: ['QQQ_fenjin_1'],
                    init(player) {
                        if (Math.random() > 0.5) {
                            game.playAudio('../extension/温柔一刀/audio/你准备好了吗.mp3');
                        } else {
                            game.playAudio('../extension/温柔一刀/audio/好久不见.mp3');
                        }
                        player.storage.QQQ_fenjin = {};
                        for (const i of game.players) {
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
                        content(storage, player) {
                            var str = '当前会被巨人火焰焚烬的角色:';
                            for (const i of game.players) {
                                if (player.storage.QQQ_fenjin[i.playerid] >= lib.character[i.name]?.hp) {
                                    str += get.translation(i);
                                }
                            }
                            return str;
                        },
                    },
                    async content(event, trigger, player) {
                        if (Math.random() > 0.5) {
                            game.playAudio('../extension/温柔一刀/audio/黄金树燃烧吧.mp3');
                        } else {
                            game.playAudio('../extension/温柔一刀/audio/伴火同进者,终有一天会遇见命定之死.mp3');
                        }
                        await game.VIDEO('燃烧黄金树');
                        player.awakenSkill('QQQ_fenjin');
                        for (const i of game.players.filter((q) => q != player)) {
                            if (player.storage.QQQ_fenjin[i.playerid] >= lib.character[i.name]?.hp) {
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
                                    game.playAudio('../extension/温柔一刀/audio/我们的约定完成了.mp3');
                                } else {
                                    game.playAudio('../extension/温柔一刀/audio/再见.mp3');
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
                //当一名角色在其濒死结算后未死亡,你获得一个<命定之死>.<br>当一名角色回复体力时,你可以移去一枚<命定之死>并改为对其使用一张<神杀>.当一名角色获得牌时,你可以移去一枚<命定之死>并改为对其使用一张<冰杀><br>当你死亡前,若你的<命定之死>数小于你的体力上限,你豁免
                QQQ_mingsi: {
                    trigger: {
                        player: ['dieBefore'],
                    },
                    forced: true,
                    mark: true,
                    init: (player) => (player.storage.QQQ_mingsi = 0),
                    intro: {
                        name: '死',
                        content: '#',
                    },
                    filter: (event, player) => player.maxHp > player.storage.QQQ_mingsi,
                    async content(event, trigger, player) {
                        if (Math.random() > 0.5) {
                            game.playAudio('../extension/温柔一刀/audio/否认了这些也就算不上王了.mp3');
                        } else {
                            game.playAudio('../extension/温柔一刀/audio/你能不能悬崖勒马.mp3');
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
                                    game.playAudio('../extension/温柔一刀/audio/你受赐癫火了.mp3');
                                } else {
                                    game.playAudio('../extension/温柔一刀/audio/我们已不能相容.mp3');
                                }
                                player.addMark('QQQ_mingsi');
                            },
                        },
                        2: {
                            trigger: {
                                global: ['recoverBefore'],
                            },
                            prompt(event) {
                                return `终止${get.translation(event.player)}回复体力,并改为对其使用一张<神杀>`;
                            },
                            filter: (event, player) => player.storage.QQQ_mingsi > 0,
                            check: (event, player) => event.player.isEnemiesOf(player),
                            async content(event, trigger, player) {
                                game.playAudio('../extension/温柔一刀/audio/为你献上,命定之死.mp3');
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
                            prompt(event) {
                                return `终止${get.translation(event.player)}获得牌,并改为对其使用一张<冰杀>`;
                            },
                            filter: (event, player) => player.storage.QQQ_mingsi > 0,
                            check: (event, player) => event.player.isEnemiesOf(player),
                            async content(event, trigger, player) {
                                if (Math.random() > 0.5) {
                                    game.playAudio('../extension/温柔一刀/audio/我会杀了你,像黑夜追逐白天.mp3');
                                } else {
                                    game.playAudio('../extension/温柔一刀/audio/永别了.mp3');
                                }
                                player.storage.QQQ_mingsi--;
                                trigger.cancel();
                                trigger.player.useCard({ name: 'sha', nature: 'ice' }, trigger.player, trigger.cards);
                            },
                        },
                    },
                },
                //————————————————————————————————————————————无极
                //论道:每名角色出牌阶段开始时,所有角色都对随机目标使用手牌中的随机一张牌,若有人以此法指定自身为目标,则你摸一张牌
                论道: {
                    trigger: {
                        global: 'phaseUseBegin',
                    },
                    forced: true,
                    _priority: 45,
                    async content(event, trigger, player) {
                        for (const i of game.players) {
                            const card = i
                                .getCards('h')
                                .filter((q) => {
                                    const info = lib.card[q.name];
                                    if (!info.selectTarget) return false;
                                    if (typeof info.selectTarget == 'number' && info.selectTarget > 1) return false;
                                    return !info.notarget && info.content;
                                })
                                .randomGet();
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
                //孤寂:每轮结束时,若存在角色在此轮中为成为过其他角色牌的目标,你令其死亡.<有一种寂寞足以杀人,不是吗?>
                QQQ_guji: {
                    trigger: {
                        global: ['roundStart'],
                    },
                    forced: true,
                    _priority: 46,
                    init: (player) => (player.storage.QQQ_guji = []),
                    filter: (event, player) => game.roundNumber > 1,
                    async content(event, trigger, player) {
                        const die = game.players.filter((q) => !player.storage.QQQ_guji.includes(q));
                        for (const i of die) {
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
                //每轮开始时,你随机获得一个有技能描述的技能
                QQQ_无极: {
                    audio: 'yuheng',
                    trigger: {
                        global: 'roundStart',
                    },
                    forced: true,
                    async content(event, trigger, player) {
                        var E = Object.keys(lib.skill).filter((i) => {
                            return lib.translate[i + '_info'];
                        });
                        player.addSkillLog(E.randomGet());
                    },
                },
                //————————————————————————————————————————————桴挝
                //桴挝,游戏开始时,你的初始手牌增加<桴挝>标记且不计入手牌上限.<br>你失去一张<桴挝>牌时,若你其余手牌中有与<桴挝>点数相同的牌,将这些牌增加<桴挝>标记,否则你摸一张牌并标记为<桴挝>,你弃置其他角色一张牌,若此时为你的回合外,再对一名角色造成一点伤害
                QQQ_fuzhua: {
                    mod: {
                        ignoredHandcard: (card, player) => player.storage.QQQ_fuzhua.includes(card),
                    },
                    init(player) {
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
                        for (const i of card0) {
                            const card1 = player.getCards('h', (q) => q.number == i.number && !player.storage.QQQ_fuzhua.includes(q));
                            if (card1[0]) {
                                player.addGaintag(card1, '桴挝');
                                player.storage.QQQ_fuzhua.addArray(card1);
                            } else {
                                const { result: cards } = await player.draw();
                                player.addGaintag(cards, '桴挝');
                                player.storage.QQQ_fuzhua.addArray(cards);
                            }
                            const { result } = await player.chooseTarget('弃置其他角色一张牌', (c, p, t) => t.countCards('he')).set('ai', (t) => -get.attitude(player, t));
                            if (result.targets && result.targets[0]) {
                                await player.discardPlayerCard(result.targets[0], 'he');
                            }
                            if (_status.currentPhase != player) {
                                const {
                                    result: { targets },
                                } = await player.chooseTarget('对一名角色造成一点伤害').set('ai', (t) => -get.attitude(player, t));
                                if (targets && targets[0]) {
                                    targets[0].damage();
                                }
                            }
                        }
                    },
                    ai: {
                        effect: {
                            player(card, player, target) {
                                if (lib.card[card.name]) {
                                    if (player.getEquips('zhuge') && get.subtype(card) == 'equip1' && card.name != 'zhuge') {
                                        return -1;
                                    }
                                    return [1, 1.6]; //无脑用牌
                                }
                            },
                        },
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
                        const {
                            result: { targets },
                        } = await player.chooseTarget('选择一名角色,本回合其当前所有手牌均视为<影>').set('ai', (t) => -get.attitude(player, t));
                        if (targets && targets[0]) {
                            targets[0].addTempSkill('QQQ_meiying_1');
                            targets[0].storage.QQQ_meiying = targets[0].getCards('h');
                            for (const i of targets[0].storage.QQQ_meiying) {
                                i.storage.QQQ_meiying = true;
                            }
                        }
                    },
                    subSkill: {
                        1: {
                            init(player) {
                                player.storage.QQQ_meiying = player.getCards('h');
                                for (const i of player.storage.QQQ_meiying) {
                                    i.storage.QQQ_meiying = true;
                                }
                            },
                            mod: {
                                cardname(card, player) {
                                    if (player.storage.QQQ_meiying.includes(card) || (card.storage && card.storage.QQQ_meiying)) {
                                        return 'ying';
                                    }
                                },
                            },
                            onremove(player, skill) {
                                for (const i of player.storage.QQQ_meiying) {
                                    i.storage.QQQ_meiying = false;
                                }
                                player.storage.QQQ_meiying = [];
                            },
                        },
                    },
                },
                //倾舞:出牌阶段,你可以将所有手牌与一名其他角色的所有手牌交换,若你仅失去<影>,则此技能本回合失效
                QQQ_qingwu: {
                    enable: 'phaseUse',
                    filterTarget: (c, p, t) => t != p,
                    async content(event, trigger, player) {
                        game.log(`<span class=Qmenu>${get.translation(player)}与${get.translation(event.targets[0])}交换手牌</span>`);
                        const cards0 = event.targets[0].getCards('h');
                        const { cards } = await event.targets[0].gain(player.getCards('h'), 'gain2');
                        if (cards && cards[0]) {
                            if (!cards.some((q) => !q.storage.QQQ_meiying)) {
                                player.tempBanSkill('QQQ_qingwu');
                            }
                        } else {
                            player.tempBanSkill('QQQ_qingwu');
                        }
                        player.gain(cards0, 'gain2');
                    },
                    ai: {
                        order: 1,
                        result: {
                            player(player, target, card) {
                                const num = target.countCards('h') - player.countCards('h') + player.countCards('h', (q) => q.name == 'ying' || (q.storage && q.storage.QQQ_meiying));
                                return target.countCards('h') - player.countCards('h');
                            },
                            target(player, target, card) {
                                const num = player.countCards('h') - target.countCards('h') + target.countCards('h', (q) => q.name == 'ying' || (q.storage && q.storage.QQQ_meiying));
                                return player.countCards('h') - target.countCards('h');
                            },
                        },
                    },
                },
                //祸水:你的回合内,失去<影>的角色视为使用一张不计次数的<杀>(若该角色是你,则改为使用x张不计次数的<杀>,x为失去<影>的数量)
                QQQ_huoshui: {
                    trigger: {
                        global: ['loseAfter'],
                    },
                    forced: true,
                    filter: (event, player) => _status.currentPhase == player && event.cards && event.cards.some((q) => q.name == 'ying' || (q.storage && q.storage.QQQ_meiying)),
                    async content(event, trigger, player) {
                        if (trigger.player == player) {
                            var num = trigger.cards.filter((q) => q.name == 'ying' || (q.storage && q.storage.QQQ_meiying)).length;
                            while (num-- > 0) {
                                await player.chooseUseTarget({ name: 'sha' }, false, false, 'nodistance');
                            }
                        } else {
                            await trigger.player.chooseUseTarget({ name: 'sha' }, false, false, 'nodistance');
                        }
                    },
                },
                //————————————————————————————————————————————郭嘉
                //优游
                // 当你的判定牌生效后,你随机获得牌堆\弃牌堆\场上与此牌类型不同的牌各一张.你可以使用或打出<怀隐>牌
                QQQ_youyou: {
                    trigger: {
                        player: 'judgeAfter',
                    },
                    forced: true,
                    async content(event, trigger, player) {
                        const types = [lib.card[trigger.result.card.name].type];
                        const cards1 = [];
                        const cards = Array.from(ui.cardPile.childNodes).concat(Array.from(ui.discardPile.childNodes));
                        for (const i of game.players) {
                            if (i != player) {
                                cards.addArray(i.getCards('hejxs'));
                            }
                        }
                        cards.randomSort();
                        for (const i of cards) {
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
                                cardUsable(card, player, num) {
                                    const boss = game.players.filter((q) => q.hasSkill('QQQ_youyou'));
                                    const cards = [];
                                    for (const i of boss) {
                                        cards.addArray(i.getCards('x'));
                                    }
                                    if (card.cards?.some((q) => cards.includes(q))) {
                                        return Infinity;
                                    }
                                },
                                targetInRange(card, player) {
                                    const boss = game.players.filter((q) => q.hasSkill('QQQ_youyou'));
                                    const cards = [];
                                    for (const i of boss) {
                                        cards.addArray(i.getCards('x'));
                                    }
                                    if (card.cards?.some((q) => cards.includes(q))) {
                                        return true;
                                    }
                                },
                            },
                            hiddenCard(player, name) {
                                const boss = game.players.filter((q) => q.hasSkill('QQQ_youyou'));
                                const cards = [];
                                for (const i of boss) {
                                    cards.addArray(i.getCards('x'));
                                }
                                return cards.some((q) => q.name == name);
                            },
                            enable: ['chooseToUse', 'chooseToRespond'],
                            forced: true,
                            filter(event, player) {
                                const boss = game.players.filter((q) => q.hasSkill('QQQ_youyou'));
                                const cards = [];
                                for (const i of boss) {
                                    cards.addArray(i.getCards('x'));
                                }
                                for (const i of cards) {
                                    if (player.filterCard(i)) {
                                        return true;
                                    }
                                }
                            },
                            async content(event, trigger, player) {
                                //event是技能名,event.parent是useskill,parent2是chooseToUse
                                const list = [];
                                const evt = event.getParent(2);
                                const boss = game.players.filter((q) => q.hasSkill('QQQ_youyou'));
                                const cards = [];
                                for (const i of boss) {
                                    cards.addArray(i.getCards('x'));
                                }
                                if (evt.name == '_wuxie') {
                                    if (cards.some((q) => q.name == 'wuxie')) {
                                        list.addArray(cards.filter((q) => q.name == 'wuxie'));
                                    }
                                } else {
                                    for (const i of cards) {
                                        if (!lib.card[i.name].content) continue;
                                        if (player.filterCard(i)) {
                                            list.push(i);
                                        }
                                    }
                                }
                                if (list.length) {
                                    const {
                                        result: { links },
                                    } = await player.chooseButton(['使用或打出武将牌上的牌', list]).set('ai', (button) => {
                                        if (evt.name == '_wuxie') {
                                            return -get.attitude(player, evt.getParent('useCard').player);
                                        }
                                        const num = player.getUseValue(button.link, null, true);
                                        return number0(num) + 10;
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
                                        } //AAA
                                        if (evt.parent.name == '_save') {
                                            await player.useCard(links[0], _status.dying, false);
                                        }
                                        if (evt.name == 'chooseToUse' && links[0].name != 'shan') {
                                            await player.chooseUseTarget(links[0], true, false, 'nodistance'); //强制//不计入次数//无距离限制
                                        } else {
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
                                    player(player) {
                                        if (_status.event.type == 'dying') {
                                            return get.attitude(player, _status.event.dying);
                                        }
                                        return 1;
                                    },
                                },
                            },
                        },
                    },
                },
                //怀隐:每当你受到一点伤害后,你可以展示牌堆顶两张牌并置于你的的武将牌上,称为<怀隐>.若你以此法展示的两张牌颜色相同,你将血量回复至体力上限,否则,你摸两张牌.然后你可将任意张牌分别交给任意名角色
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
                        var num = numberq1(trigger.num);
                        while (num-- > 0) {
                            const cards1 = get.cards(2);
                            player.showCards(cards1);
                            player.addToExpansion(cards1, 'giveAuto', player).gaintag = ['QQQ_huaiyin'];
                            if (get.color(cards1[0]) == get.color(cards1[1])) {
                                player.hp = player.maxHp;
                            } else {
                                player.draw(2);
                                while (player.getCards('he').length) {
                                    const {
                                        result: { targets },
                                    } = await player.chooseTarget('将任意张牌交给任意名角色', (c, p, t) => t != p).set('ai', (t) => get.attitude(player, t));
                                    if (targets && targets[0]) {
                                        const {
                                            result: { cards },
                                        } = await player.chooseCard('he', [1, player.countCards('he')]).set('ai', (c) => 6 - get.value(c));
                                        if (cards && cards[0]) {
                                            await player.give(cards, targets[0]);
                                        } else {
                                            break;
                                        }
                                    } else {
                                        break;
                                    }
                                }
                            }
                        }
                    },
                },
                //清识:出牌阶段,你可弃置一张未以此法弃置过的花色牌并发动一次判定,若判定为黑色/ 红色,你获得〖先辅〗并可发动之/ 你可选择一名角色,你与其依次视为使用一张【树上开花】,然后该角色获得〖优游〗直到你下个出牌阶段开始
                QQQ_qingshi: {
                    enable: 'phaseUse',
                    init: (player) => (player.storage.QQQ_qingshi = []),
                    filterCard: (c, player) => !player.storage.QQQ_qingshi.includes(c.suit),
                    selectCard: 1,
                    async content(event, trigger, player) {
                        player.storage.QQQ_qingshi.add(event.cards[0].suit);
                        player.when({ global: 'phaseAfter' }).then(() => (player.storage.QQQ_qingshi = []));
                        const {
                            result: { color },
                        } = await player.judge('清识', (card) => (get.color(card) == 'red' ? 2 : 1)); //判定结果子属性有name,num,suit,color
                        if (color == 'red') {
                            const {
                                result: { targets },
                            } = await player.chooseTarget('与其依次视为使用一张【树上开花】,然后该角色获得〖优游〗直到你下个出牌阶段开始', (c, p, t) => t != p).set('ai', (t) => get.attitude(player, t));
                            if (targets && targets[0]) {
                                for (const i of [targets[0], player]) {
                                    i.useCard({ name: 'kaihua' }, i);
                                }
                                targets[0].addSkill('QQQ_youyou');
                                targets[0]
                                    .when({ global: 'phaseUseBegin' })
                                    .filter((e) => e.player == player)
                                    .then(() => player.removeSkill('QQQ_youyou')); //vars是定义的then里面的,filter直接用外部变量即可
                            }
                        } else {
                            player.addSkill('xianfu');
                            player.addSkill('xianfu2');
                            const {
                                result: { targets },
                            } = await player.chooseTarget('请选择【先辅】的目标', true, (card, player, target) => target != player && (!player.storage.xianfu2 || !player.storage.xianfu2.includes(target))).set('ai', (t) => get.attitude(player, t));
                            if (targets && targets[0]) {
                                if (!player.storage.xianfu2) {
                                    player.storage.xianfu2 = [];
                                }
                                player.storage.xianfu2.push(targets[0]);
                                if (!targets[0].storage.xianfu_mark) {
                                    targets[0].storage.xianfu_mark = [];
                                }
                                targets[0].storage.xianfu_mark.add(player);
                                targets[0].markSkill('xianfu_mark', null, null, true);
                            }
                        }
                    },
                    ai: {
                        order: 10,
                        result: {
                            player: 3,
                        },
                    },
                },
                //————————————————————————————————————————————蒋干
                //盗书:回合限一次,你可与一名其他角色进行两次谋弈,你选择真盗、伪盗,其选择真睡、假睡,你选择真降、伪降,其选择真醉、假醉,谋弈成功你获得其3张牌对其造成1点刺属性伤害
                QQQ_daoshu: {
                    enable: 'phaseUse',
                    usable: 1,
                    filterTarget: (c, p, t) => t != p,
                    async content(event, trigger, player) {
                        const list1 = ['真盗', '伪盗'];
                        const list2 = ['真睡', '假睡'];
                        const list3 = ['真降', '伪降'];
                        const list4 = ['真醉', '假醉'];
                        const {
                            result: { links: links1 },
                        } = await player.chooseButton(['谋弈', [list1, 'tdnodes']], true).set('ai', (button) => Math.random());
                        const {
                            result: { links: links2 },
                        } = await event.target.chooseButton(['谋弈', [list2, 'tdnodes']], true).set('ai', (button) => Math.random());
                        const {
                            result: { links: links3 },
                        } = await player.chooseButton(['谋弈', [list3, 'tdnodes']], true).set('ai', (button) => Math.random());
                        const {
                            result: { links: links4 },
                        } = await event.target.chooseButton(['谋弈', [list4, 'tdnodes']], true).set('ai', (button) => Math.random());
                        if (links1[0] && links2[0] && links3[0] && links4[0]) {
                            game.log(`${get.translation(player)}${links1[0]}${get.translation(event.target)}${links2[0]}`);
                            game.log(`${get.translation(player)}${links3[0]}${get.translation(event.target)}${links4[0]}`);
                            if (list1.indexOf(links1[0]) == list2.indexOf(links2[0])) {
                                await player.gainPlayerCard(event.target, Math.min(3, event.target.countCards('he')), 'he', true);
                                event.target.damage('stab');
                            }
                            if (list3.indexOf(links3[0]) == list4.indexOf(links4[0])) {
                                await player.gainPlayerCard(event.target, Math.min(3, event.target.countCards('he')), 'he', true);
                                event.target.damage('stab');
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
                        for (const i of player.getFriends()) {
                            const card = game.createCard(cards.randomGet());
                            i.gain(card, 'gain2');
                        }
                    },
                },
                //————————————————————————————————————————————董卓
                //沉势:若弃牌堆里的基本牌数大于弃牌堆里的非基本牌数,你使用<杀>造成的伤害+1,受到<杀>造成的伤害-1
                QQQ_chenshi: {
                    trigger: {
                        player: ['damageBegin4'],
                        source: ['damageBefore'],
                    },
                    forced: true,
                    filter(event, player) {
                        const num1 = Array.from(ui.discardPile.childNodes).filter((q) => get.type(q) == 'basic').length;
                        const num = Array.from(ui.discardPile.childNodes).length;
                        return num < 2 * num1 && event.card && event.card.name == 'sha';
                    },
                    async content(event, trigger, player) {
                        if (trigger.player == player) {
                            trigger.num--;
                        } else {
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
                    init: (player) => (player.storage.QQQ_tanbao = 0),
                    check: (event, player) => event.player.isEnemiesOf(player),
                    filter: (event, player) => event.player != player,
                    async content(event, trigger, player) {
                        const pile = Array.from(ui.cardPile.childNodes);
                        const num = Math.ceil((pile.length * player.hp) / 100);
                        const cards = pile.randomGets(num);
                        player.showCards(cards);
                        game.cardsDiscard(cards);
                        for (const i of cards) {
                            if (get.type(i) != 'basic') {
                                i.selfDestroy();
                            }
                        }
                        const cards1 = cards.filter((q) => q.name == 'sha');
                        const w = cards1.length;
                        const y = player.storage.QQQ_tanbao;
                        if (w > y) {
                            if (y == 0) {
                                for (const i of cards1) {
                                    await player.useCard(i, trigger.player, false);
                                }
                            } else {
                                const {
                                    result: { links },
                                } = await player.chooseButton([`使用其中${w - y}张杀`, cards1], w - y, true).set('ai', (button) => get.effect(trigger.player, button.link, player, player));
                                if (links && links[0]) {
                                    for (const i of links) {
                                        await player.useCard(i, trigger.player, false);
                                    }
                                }
                            }
                        } else {
                            if (y - w > w) {
                                player.storage.QQQ_tanbao = 0;
                                for (const i of cards1) {
                                    await trigger.player.useCard(i, player, false);
                                }
                            } else {
                                const {
                                    result: { links },
                                } = await trigger.player.chooseButton([`使用其中${y - w}张杀`, cards1], y - w, true).set('ai', (button) => get.effect(player, button.link, trigger.player, trigger.player));
                                if (links && links[0]) {
                                    player.storage.QQQ_tanbao = 0;
                                    for (const i of links) {
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
                //骄横:回合限一次,你可以与一名其他角色各摸三张牌,然后与其连续进行三次拼点,每次拼点结束后,赢的角色视为对输家使用一张杀
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
                            if (result) {
                                if (result.num1 >= result.num2) {
                                    await player.useCard({ name: 'sha' }, event.target, false);
                                } else {
                                    await event.target.useCard({ name: 'sha' }, player, false);
                                }
                            }
                        }
                    },
                    ai: {
                        order: 15,
                        result: {
                            target: -2,
                        },
                    },
                },
                //————————————————————————————————————————————幽影之火——梅瑟莫
                //你受到大于x的伤害时,防止超过x的部分(x为你当前体力值的一半,不小于1)
                //恶之蛇:当你受到伤害后,你获得一个觉醒技或限定技并隐匿(登场后,强制发动该技能)
                QQQ_ezhishe: {
                    trigger: {
                        player: ['damageEnd'],
                    },
                    forced: true,
                    init(player) {
                        var num = 4;
                        Reflect.defineProperty(player, 'maxHp', {
                            get() {
                                return Math.max(1, num);
                            },
                            set(v) {
                                num = v;
                            },
                        }); //扣减体力上限抗性
                        player.getExpansions = () => get.cards(3);
                    },
                    async content(event, trigger, player) {
                        //QQQ
                        const list = [];
                        for (var i in lib.skill) {
                            if (lib.skill[i].limited || lib.skill[i].juexingji) {
                                list.add(i);
                            }
                        }
                        list.remove('baiyi');
                        const {
                            result: { links },
                        } = await player.chooseButton(['获得一个觉醒技或限定技并隐匿', [list.randomGets(3), 'tdnodes']]);
                        //const links = ['baiyi'];//QQQ
                        if (links && links[0]) {
                            lib.skill[`QQQ_ezhishe_${links[0]}`] = {
                                audio: links[0],
                                trigger: {
                                    player: 'showCharacterAfter',
                                },
                                charlotte: true,
                                forced: true,
                                group: links[0],
                                async content(event, trigger, player) {
                                    //QQQ
                                    if (!trigger.source) {
                                        trigger.source = player.getEnemies().randomGet();
                                    }
                                    if (!trigger.targets) {
                                        trigger.targets = player.getEnemies();
                                    } //QQQ
                                    if (!trigger.target) {
                                        trigger.target = trigger.targets[0];
                                    }
                                    if (!trigger.cards || !trigger.cards[0]) {
                                        trigger.cards = [ui.cardPile.firstChild];
                                    }
                                    if (!trigger.card) {
                                        trigger.card = ui.cardPile.firstChild;
                                    }
                                    if (!trigger.num) {
                                        trigger.num = 1;
                                    }
                                    if (!trigger.skill) {
                                        trigger.skill = '评鉴';
                                    }
                                    if (!trigger.sourceSkill) {
                                        trigger.sourceSkill = '评鉴';
                                    }
                                    if (!trigger.respondTo || !trigger.respondTo[0]) {
                                        trigger.respondTo = [trigger.source, trigger.card];
                                    }
                                    if (!trigger.excluded) {
                                        trigger.excluded = [player];
                                    }
                                    player.awakenSkill(event.name);
                                    const skill = event.name.slice(12);
                                    const info = get.info(skill);
                                    let result0 = {};
                                    if (info) {
                                        const choose = info.filterTarget ? (info.filterCard ? 'chooseCardTarget' : 'chooseTarget') : info.filterCard ? 'chooseCard' : null;
                                        if (choose) {
                                            const next = player[choose]();
                                            next.player = player;
                                            next.selectTarget = info.selectTarget == -1 ? 1 : info.selectTarget;
                                            next.filterTarget = typeof info.filterTarget === 'function' ? info.filterTarget : () => true;
                                            if (info.filterCard) {
                                                next.selectCard = info.selectCard;
                                                next.filterCard = typeof info.filterCard === 'function' ? info.filterCard : () => true;
                                            }
                                            result0 = await next.forResult();
                                        }
                                    }
                                    if (typeof lib.skill[skill].cost === 'function') {
                                        const next = game.createEvent(`${skill}_cost`, false);
                                        next.player = player;
                                        next._trigger = trigger;
                                        next.triggername = event.triggername;
                                        next.skill = skill;
                                        const { result } = await next.setContent(lib.skill[skill].cost);
                                        if (result && result.bool) {
                                            const next0 = game.createEvent(skill, false);
                                            if (result0.cards && result0.cards[0]) {
                                                next0.cards = result0.cards;
                                            }
                                            if (result0.targets && result0.targets[0]) {
                                                next0.targets = result0.targets;
                                                next0.target = result0.targets[0];
                                            }
                                            next0.skill = skill;
                                            next0.player = player;
                                            next0._trigger = trigger;
                                            next0.triggername = event.triggername;
                                            if (result.targets && result.targets[0]) next0.targets = result.targets;
                                            if (result.cards) next0.cards = result.cards;
                                            if (result.cost_data) next0.cost_data = result.cost_data;
                                            next0.setContent(lib.skill[skill].content);
                                        }
                                    } else if (typeof lib.skill[skill].content === 'function') {
                                        const next = game.createEvent(skill, false);
                                        if (result0.cards && result0.cards[0]) {
                                            next.cards = result0.cards;
                                        }
                                        if (result0.targets && result0.targets[0]) {
                                            next.targets = result0.targets;
                                            next.target = result0.targets[0];
                                        }
                                        if (!next.cards) {
                                            next.cards = [ui.cardPile.firstChild];
                                        }
                                        if (!next.targets) {
                                            next.targets = player.getEnemies();
                                        }
                                        if (!next.target) {
                                            next.target = next.targets[0];
                                        }
                                        next.skill = skill;
                                        next.player = player;
                                        next._trigger = trigger;
                                        next.triggername = event.triggername;
                                        next.setContent(lib.skill[skill].content);
                                    }
                                },
                            };
                            lib.translate[`QQQ_ezhishe_${links[0]}`] = lib.translate[links[0]];
                            lib.translate[`QQQ_ezhishe_${links[0]}_info`] = lib.translate[`${links[0]}_info`];
                            player.addSkill(`QQQ_ezhishe_${links[0]}`);
                            player.popup(`QQQ_ezhishe_${links[0]}`);
                            game.log(player, '获得了技能', '【' + get.translation(`QQQ_ezhishe_${links[0]}`) + '】');
                            player.yinni();
                        }
                    },
                },
                //幽影流火:当全场失去♦️️牌后,你将此牌当作火杀对随机敌方角色使用
                QQQ_liuhuo: {
                    trigger: {
                        global: ['loseAfter'],
                    },
                    forced: true,
                    filter: (event, player) => event.cards?.some((q) => q.suit == 'diamond'),
                    async content(event, trigger, player) {
                        for (const i of trigger.cards) {
                            if (i.suit == 'diamond') {
                                const tar = player.getEnemies().randomGet();
                                if (tar) {
                                    await player.useCard(
                                        {
                                            name: 'sha',
                                            nature: 'fire',
                                            cards: [i],
                                        },
                                        tar,
                                        [i],
                                        false
                                    );
                                }
                            }
                        }
                    },
                },
                //穿刺者之矛:其他角色出牌阶段开始时须将一张牌置于你的武将牌上,称为<刺>.若你的<刺>包含三种类型/四种花色/五种牌名,你获得所有<刺>,对其造成等量伤害
                QQQ_chuanci: {
                    trigger: {
                        global: ['phaseUseBegin'],
                    },
                    forced: true,
                    mark: true,
                    intro: {
                        content: 'expansion',
                    },
                    filter: (event, player) => event.player.isEnemiesOf(player) && event.player.countCards('he'),
                    async content(event, trigger, player) {
                        const {
                            result: { cards },
                        } = await trigger.player.chooseCard('he', true).set('ai', (c) => 8 - get.value(c));
                        if (cards && cards[0]) {
                            player.addToExpansion(cards, 'give', trigger.player).gaintag = ['QQQ_chuanci'];
                            const card = player.getCards('x');
                            const suit = card.map((q) => q.suit).unique();
                            const type = card.map((q) => get.type(q)).unique();
                            const name = card.map((q) => q.name).unique();
                            if (name.length > 4 || suit.length > 3 || type.length > 2) {
                                player.gain(card, 'gain2');
                                trigger.player.damage(card.length);
                            }
                        }
                    },
                },
                //————————————————————————————————————————————李靖
                //托塔:你视为装备【宝塔】
                QQQ_tuota: {
                    init(player) {
                        const card = game.createCard('QQQ_baota');
                        player.useCard(card, player);
                    },
                },
                //玲珑宝塔:每轮游戏开始时,你可以选择一名角色(不能是上次选择的角色),其被镇压于塔内(镇压效果:造成或受到伤害-1,摸牌数-1,跳过回合然后你令其回复或失去一点体力)
                QQQ_baota: {
                    trigger: {
                        global: ['roundStart'],
                    },
                    forced: true,
                    mark: true,
                    intro: {
                        content: (storage, player) => `当前镇压了${get.translation(player.storage.QQQ_baota)}`,
                    },
                    async content(event, trigger, player) {
                        if (player.storage.QQQ_baota) {
                            player.storage.QQQ_baota.removeSkill('QQQ_baota_1');
                        }
                        const {
                            result: { targets },
                        } = await player.chooseTarget('选择一名角色(不能是上次选择的角色)镇压于塔内', (c, p, t) => t != player.storage.QQQ_baota, true).set('ai', (t) => 20 - get.attitude(t, player));
                        if (targets && targets[0]) {
                            player.storage.QQQ_baota = targets[0];
                            player.markSkill('QQQ_baota');
                            targets[0].addSkill('QQQ_baota_1');
                        }
                    },
                    subSkill: {
                        1: {
                            trigger: {
                                player: ['damageBegin4', 'phaseBegin', 'drawBefore'],
                                source: ['damageBegin4'],
                            }, //phasebefore就跳过回合会导致轮次不能刷新
                            forced: true,
                            mark: true,
                            intro: {
                                content(storage, player) {
                                    const boss = game.players.find((q) => q.storage.QQQ_baota == player);
                                    if (boss) {
                                        return `已被${get.translation(boss)}镇压`;
                                    }
                                },
                            },
                            async content(event, trigger, player) {
                                if (trigger.name == 'phase') {
                                    trigger.cancel();
                                    const boss = game.players.find((q) => q.storage.QQQ_baota == player);
                                    if (boss) {
                                        const {
                                            result: { control },
                                        } = await boss.chooseControl('失去体力', '回复体力').set('ai', (e, p) => {
                                            if (get.attitude(boss, player) > 0) return '回复体力';
                                            return '失去体力';
                                        });
                                        if (control == '回复体力') {
                                            player.recover();
                                        } else {
                                            player.loseHp();
                                        }
                                    }
                                } else {
                                    trigger.num--;
                                }
                            },
                        },
                    },
                },
                //————————————————————————————————————————————燎原火
                //出牌阶段,你可以展示牌堆顶一张牌,然后选择是否获得.若你选择获得,则由随机一名其他角色对你使用牌堆中下一张牌.若你不获得,则由你对随机一名角色使用此牌,然后此技能本回合失效
                QQQ_xiaozhang: {
                    enable: ['phaseUse'],
                    async content(event, trigger, player) {
                        //QQQ
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
                                if (!info.notarget && info.content && info.selectTarget && info.enable) {
                                    await q.useCard(card0, player, false);
                                } else {
                                    await game.VIDEO('火凤燎原');
                                }
                            }
                        } else {
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
                    },
                },
                //残兵:当你使用或打出牌时,你可以观看一名角色的手牌并弃置其区域内一张牌,然后你摸一张牌并交给其一张牌
                QQQ_canbing: {
                    trigger: {
                        player: ['loseAfter'],
                    },
                    forced: true,
                    filter: (event, player) => event.cards?.length && !event.getParent('QQQ_canbing').name,
                    async content(event, trigger, player) {
                        //QQQ
                        for (const i of trigger.cards) {
                            const {
                                result: { targets },
                            } = await player.chooseTarget('观看一名其他角色的手牌并弃置其区域内一张牌', (c, p, t) => t != p && t.countDiscardableCards(player, 'he')).set('ai', (t) => -get.attitude(player, t));
                            if (targets && targets[0]) {
                                const {
                                    result: { links },
                                } = await player.discardPlayerCard(targets[0], 'he', 'visible');
                                if (links && links[0]) {
                                    player.draw();
                                    const {
                                        result: { cards },
                                    } = await player.chooseCard('he', true).set('ai', (c) => 8 - get.value(c));
                                    if (cards && cards[0]) {
                                        player.give(cards, targets[0]);
                                    }
                                }
                            }
                        }
                    },
                },
                //————————————————————————————————————————————梦诸葛亮
                //借命:准备阶段,记录你此刻的状态.结束阶段开始时,你可以亮出牌堆顶x张牌,若你准备阶段记录的手牌与其中存在牌名相同的牌,你将体力值和手牌调整为准备阶段的状态并弃置牌名相同的牌,然后进行一个额外回合(x为你已损失体力值)
                QQQ_jieming: {
                    trigger: {
                        player: ['phaseZhunbeiBegin', 'phaseJieshuBegin'],
                    },
                    forced: true,
                    mark: true,
                    intro: {
                        content(storage, player) {
                            return `当前记录的体力值:${player.storage.QQQ_jieming.hp},手牌${get.translation(player.storage.QQQ_jieming.card)}`;
                        },
                    },
                    _priority: 6,
                    async content(event, trigger, player) {
                        //QQQ
                        if (event.triggername == 'phaseZhunbeiBegin') {
                            player.storage.QQQ_jieming = {
                                hp: player.hp,
                                card: player.getCards('h'),
                            };
                        } else {
                            const cards = get.cards(player.maxHp - player.hp);
                            player.showCards(cards);
                            player.showCards(player.storage.QQQ_jieming.card);
                            const nameCounts = new Map();
                            const allCards = [...player.storage.QQQ_jieming.card, ...cards];
                            for (const card of allCards) {
                                if (!nameCounts.has(card.name)) {
                                    nameCounts.set(card.name, { count: 0, cards: [] });
                                }
                                const entry = nameCounts.get(card.name);
                                entry.count += 1;
                                entry.cards.push(card);
                            }
                            const discard = [];
                            for (const [name, entry] of nameCounts) {
                                if (entry.count > 1) {
                                    discard.addArray(entry.cards);
                                }
                            }
                            if (discard.length) {
                                player.hp = player.storage.QQQ_jieming.hp;
                                await player.discard(player.getCards('h'));
                                await player.gain(player.storage.QQQ_jieming.card, 'gain2');
                                player.discard(discard);
                                player.phase();
                            }
                        }
                    },
                },
                //北定:回合限一次,你可以交换自己的体力值和以损体力值,若你以此法失去了体力,你可以摸三张牌,若你此次发回复了体力,你需弃所有手牌
                QQQ_beiding: {
                    enable: 'phaseUse',
                    usable: 1,
                    async content(event, trigger, player) {
                        //QQQ
                        const hp = player.hp;
                        const losehp = player.maxHp - player.hp;
                        player.hp = losehp;
                        if (losehp < hp) {
                            player.draw(3);
                        }
                        if (hp < losehp) {
                            player.discard(player.getCards('h'));
                        }
                    },
                    ai: {
                        order: 1,
                        result: {
                            player(player, target, card) {
                                if (2 * player.hp > player.maxHp) {
                                    //失去了体力
                                    if (2 * player.hp < 1 + player.maxHp) return 1;
                                } else {
                                    return (player.maxHp - 2 * player.hp) * 2 - player.countCards('h');
                                }
                            },
                        },
                    },
                },
                //傳承:当有角色进行额外回合时,你需要减少一点体力上限,并且选择一名角色获得<八阵>,若选择的角色为自己,则获得<界观星>.(若目标已有对应技能,则改为摸三张牌)
                QQQ_chuancheng: {
                    silent: true,
                    trigger: {
                        global: ['phaseBegin'],
                    },
                    _priority: 7,
                    async content(event, trigger, player) {
                        //QQQ
                        if (!trigger.player.QQQ_chuancheng) {
                            trigger.player.QQQ_chuancheng = 0;
                        }
                        trigger.player.QQQ_chuancheng++;
                        if (trigger.player.QQQ_chuancheng > 1) {
                            player.loseMaxHp();
                            const {
                                result: { targets },
                            } = await player.chooseTarget('选择一名角色获得<八阵>').set('ai', (t) => get.attitude(player, t));
                            if (targets && targets[0]) {
                                if (targets[0].hasSkill('bagua_skill')) {
                                    targets[0].draw(3);
                                } else {
                                    targets[0].addSkill('bagua_skill');
                                }
                                if (targets[0] == player) {
                                    if (player.hasSkill('reguanxing')) {
                                        player.draw(3);
                                    } else {
                                        player.addSkill('reguanxing');
                                    }
                                }
                            }
                        }
                    },
                    group: ['QQQ_chuancheng_1'],
                    subSkill: {
                        1: {
                            silent: true,
                            trigger: {
                                global: ['roundStart'],
                            },
                            async content(event, trigger, player) {
                                //QQQ
                                for (const i of game.players) {
                                    i.QQQ_chuancheng = 0;
                                }
                            },
                        },
                    },
                },
                //————————————————————————————————————————————葛德文
                //死诞:在你受到伤害前,你摸一张牌并防止此伤害,然后将牌堆顶一张牌置于你的武将牌上称为<死>,若你的<死>包含四种花色,你获得全部<死>然后减一点体力上限
                QQQ_sidan: {
                    audio: 'buqu',
                    trigger: {
                        player: ['damageBefore'],
                    },
                    forced: true,
                    async content(event, trigger, player) {
                        //QQQ
                        trigger.cancel();
                        player.addToExpansion(ui.cardPile.firstChild, 'draw').gaintag = ['QQQ_sidan'];
                        player.draw();
                        if (
                            player
                                .getCards('x')
                                .map((q) => q.suit)
                                .unique().length > 3
                        ) {
                            player.gain(player.getCards('x'));
                            player.loseMaxHp();
                        }
                    },
                    intro: {
                        content: 'expansion',
                        markcount: 'expansion',
                    },
                },
                //死亡闪焰:当你使用牌指定其他角色为目标后,为目标角色添加一层<咒死>.当你使用相同牌名的牌再次指定其为目标后,引爆其<咒死>形成一次范围伤害(伤害范围为其<咒死>层数,伤害值为其<咒死>层数/其体力值且至少为1),受到此伤害的角色添加伤害值的<咒死>层数.若一名角色<咒死>层数大于其体力上限,则其立即死亡.
                QQQ_siwangshanyan: {
                    trigger: {
                        player: ['useCardToBefore'],
                    },
                    filter: (event, player) => event.target && event.target != player,
                    forced: true,
                    mark: true,
                    intro: {
                        name: '咒死',
                        content(storage, player) {
                            let num = 0;
                            if (!player.zhousi) {
                                player.zhousi = {};
                            }
                            for (var i in player.zhousi) {
                                num += player.zhousi[i];
                            }
                            return `当前咒死层数${num}`;
                        },
                    },
                    async content(event, trigger, player) {
                        //QQQ
                        if (!trigger.target.zhousi) {
                            trigger.target.zhousi = {};
                        }
                        const name = trigger.card.name;
                        const info = trigger.target.zhousi;
                        if (!info[name]) {
                            info[name] = 0;
                        }
                        info[name]++;
                        trigger.target.markSkill('QQQ_siwangshanyan');
                        if (info[name] > 1) {
                            let num = 0;
                            for (var i in info) {
                                num += info[i];
                                info[i] = 0;
                            }
                            trigger.target.markSkill('QQQ_siwangshanyan');
                            const damage = Math.ceil(num / trigger.target.hp);
                            trigger.target.damage(damage);
                            const players = [];
                            let next = trigger.target.next,
                                previous = trigger.target.previous;
                            const numo = num;
                            while (num-- > 0) {
                                if (next != trigger.target && next) {
                                    if (!players.includes(next)) {
                                        players.push(next);
                                        if (damage > numo - num) {
                                            next.damage(damage - numo + num);
                                            if (!next.zhousi) {
                                                next.zhousi = {};
                                            }
                                            if (!next.zhousi.none) {
                                                next.zhousi.none = 0;
                                            }
                                            next.zhousi.none += damage - numo + num;
                                            next.markSkill('QQQ_siwangshanyan');
                                            let numx = 0;
                                            for (var i in next.zhousi) {
                                                numx += next.zhousi[i];
                                            }
                                            if (numx > next.maxHp) {
                                                next.die();
                                            }
                                        }
                                    } else {
                                        break;
                                    }
                                    next = next.next;
                                }
                                if (previous != trigger.target && previous) {
                                    if (!players.includes(previous)) {
                                        players.push(previous);
                                        if (damage > numo - num) {
                                            previous.damage(damage - numo + num);
                                            if (!previous.zhousi) {
                                                previous.zhousi = {};
                                            }
                                            if (!previous.zhousi.none) {
                                                previous.zhousi.none = 0;
                                            }
                                            previous.zhousi.none += damage - numo + num;
                                            previous.markSkill('QQQ_siwangshanyan');
                                            let numx = 0;
                                            for (var i in previous.zhousi) {
                                                numx += previous.zhousi[i];
                                            }
                                            if (numx > previous.maxHp) {
                                                previous.die();
                                            }
                                        }
                                    } else {
                                        break;
                                    }
                                    previous = previous.previous;
                                }
                            }
                        } else {
                            let num = 0;
                            for (var i in info) {
                                num += info[i];
                            }
                            if (num > trigger.target.maxHp) {
                                trigger.target.die();
                            }
                        }
                    },
                },
                //————————————————————————————————————————————托莉娜
                // 迷幻
                // 阶段限一次,当你需要使用基本牌或普通锦囊牌时,你可以观看牌堆顶四张牌,然后将其中的【1】黑色牌以任意顺序置于牌堆顶,然后获得剩余【2】红色牌
                // 若你以此法放置于牌堆顶的牌有与你需要打出的牌牌名相同的牌,你视为使用了此牌且交换【1】和【2】,然后视为此技能未发动过
                QQQ_mihuan: {
                    enable: ['chooseToUse', 'chooseToRespond'],
                    init(player) {
                        player.storage.QQQ_mihuan = {
                            red: 'red',
                            black: 'black',
                        };
                    },
                    hiddenCard(player, name) {
                        return player.stat[player.stat.length - 1].skill?.QQQ_mihuan < lib.skill.QQQ_mihuan.usable;
                    },
                    mod: {
                        cardUsable(card, player, num) {
                            if (card.storage && card.storage.QQQ_mihuan) return Infinity;
                        },
                        targetInRange(card, player) {
                            if (card.storage && card.storage.QQQ_mihuan) return true;
                        },
                    },
                    filter(event, player) {
                        return !_status.jieduan.QQQ_mihuan;
                    },
                    async content(event, trigger, player) {
                        _status.jieduan.QQQ_mihuan = true;
                        const cards = get.cards(4);
                        const red = cards.filter((q) => get.color(q) == player.storage.QQQ_mihuan.red);
                        player.gain(red, 'gain2');
                        const black = cards.filter((q) => get.color(q) == player.storage.QQQ_mihuan.black);
                        if (black[0]) {
                            const {
                                result: { moved },
                            } = await player
                                .chooseToMove()
                                .set('list', [['牌堆顶', black]])
                                .set('prompt', '将牌移动到牌堆顶')
                                .set('processAI', function (list) {
                                    var cards = list[0][1];
                                    var target = _status.currentPhase?.next;
                                    if (target) {
                                        var att = get.sgn(get.attitude(player, target));
                                    } else {
                                        var att = -1;
                                    }
                                    var top = [];
                                    if (target.countCards('j')) {
                                        for (const i of player.getCards('j')) {
                                            var judge = get.judge(i);
                                            cards.sort((a, b) => (judge(b) - judge(a)) * att); //态度大于0就把价值高的牌放前面
                                            top.push(cards.shift());
                                        }
                                        while (cards.length) {
                                            top.push(cards.shift());
                                        }
                                    } else {
                                        top = cards.sort((a, b) => (get.value(b) - get.value(a)) * att); //态度大于0就把价值高的牌放前面
                                    }
                                    return [top];
                                }); //给别人观星
                            moved[0].reverse();
                            for (const i of moved[0]) {
                                ui.cardPile.insertBefore(i, ui.cardPile.firstChild);
                            }
                            const vcard = game.qcard(player, false, true, false).filter((x) => black.some((q) => x[2] == q.name));
                            if (vcard.length) {
                                const evt = event.getParent(2);
                                const {
                                    result: { links },
                                } = await player.chooseButton(['视为使用或打出对应基本牌/锦囊牌', [vcard, 'vcard']]).set('ai', (button) => {
                                    if (evt.name == '_wuxie') {
                                        return -get.attitude(player, evt.getParent('useCard').player);
                                    }
                                    const num = player.getUseValue({
                                        name: button.link[2],
                                        nature: button.link[3],
                                    }, null, true);
                                    return number0(num) + 10;
                                });
                                if (links && links[0]) {
                                    if (links[0][2] == 'caochuan') {
                                        await player.useCard({ name: links[0][2] }, false);
                                        event.parent._trigger = evt.parent._trigger;
                                    }
                                    if (links[0][2] == 'youdishenru') {
                                        await player.useCard({ name: links[0][2] }, false);
                                        event.parent.youdiinfo = evt.parent.youdiinfo;
                                    }
                                    if (links[0][2] == 'wuxie') {
                                        await player.useCard({ name: links[0][2] }, false);
                                        event._trigger = evt._trigger;
                                    }
                                    if (links[0][2] == 'chenhuodajie') {
                                        await player.useCard({ name: links[0][2] }, evt.parent._trigger.player, false);
                                    } //AAA
                                    if (evt.parent.name == '_save') {
                                        await player.useCard({ name: links[0][2] }, _status.dying, false);
                                    }
                                    if (evt.name == 'chooseToUse' && links[0][2] != 'shan') {
                                        await player.chooseUseTarget(
                                            {
                                                name: links[0][2],
                                                nature: links[0][3],
                                                storage: { QQQ_mihuan: true },
                                            },
                                            true,
                                            false,
                                            'nodistance'
                                        ); //无距离次数限制
                                    } else {
                                        evt.untrigger();
                                        evt.set('responded', true);
                                        evt.result = { bool: true, card: { name: links[0][2] }, cards: [] };
                                        evt.redo();
                                    }
                                }
                                _status.jieduan.QQQ_mihuan = false;
                                const temp = player.storage.QQQ_mihuan.red;
                                player.storage.QQQ_mihuan.red = player.storage.QQQ_mihuan.black;
                                player.storage.QQQ_mihuan.black = temp;
                                lib.translate.QQQ_mihuan_info = `阶段限一次,当你需要使用基本牌或普通锦囊牌时,你可以观看牌堆顶四张牌,然后将其中的【1】${get.translation(player.storage.QQQ_mihuan.black)}牌以任意顺序置于牌堆顶,然后获得剩余【2】${get.translation(player.storage.QQQ_mihuan.red)}牌,若你以此法放置于牌堆顶的牌有与你需要打出的牌牌名相同的牌,你视为使用了此牌,交换【1】和【2】,视为此技能未发动过`;
                            }
                        }
                    },
                    ai: {
                        respondSha: true,
                        respondShan: true,
                        order: 99,
                        result: {
                            player(player) {
                                if (_status.event.type == 'dying') {
                                    return get.attitude(player, _status.event.dying);
                                }
                                return 1;
                            },
                        },
                    },
                },
                //————————————————————————————————————————————熔炉骑士
                //生命熔炉:游戏开始时你开辟一片新区域,称为<生命熔炉>,然后摸四张牌并将四张牌置于<生命熔炉>内.准备阶段你可以选择至多两名其他角色,令这些角色参与<生命熔炉>直到下一次发动此技能
                QQQ_ronglu: {
                    init(player) {
                        const div = document.createElement('div');
                        div.style.top = '10%';
                        div.style.left = '0%';
                        div.style.width = '30%';
                        div.style.height = '10%';
                        div.style.backgroundImage = `url(extension/温柔一刀/image/beijing1.jpg)`;
                        div.style.backgroundSize = 'cover';
                        div.style.backgroundPosition = 'center';
                        div.style.zIndex = 1;
                        div.style.position = 'absolute';
                        div.style.display = 'flex';
                        document.body.appendChild(div);
                        _status.QQQ_ronglu = div;
                        _status.QQQ_ronglu.add = function (cards) {
                            for (const card of cards) {
                                _status._QQQ_ronglu.add(card);
                                this.appendChild(card);
                            }
                        };
                        _status._QQQ_ronglu = [];
                        _status.QQQ_ronglu.baixiang = [];
                        _status.QQQ_ronglu.add(Array.from(ui.cardPile.childNodes).randomGets(4));
                    },
                    trigger: {
                        player: ['phaseZhunbeiBefore'],
                    },
                    forced: true,
                    _priority: 56,
                    async content(event, trigger, player) {
                        //QQQ
                        const {
                            result: { targets },
                        } = await player.chooseTarget('令这些角色参与<驻防>', (c, p, t) => p != t, [1, 2]).set('ai', (t) => get.attitude(player, t));
                        if (targets && targets[0]) {
                            _status.QQQ_ronglu.baixiang = [player, ...targets];
                        } else {
                            _status.QQQ_ronglu.baixiang = [player];
                        }
                    },
                    global: ['QQQ_baixiang', 'QQQ_baixiang_1', 'QQQ_baixiang_2'],
                },
                //熔炉百相:<生命熔炉>内角色回合限一次,可以将一张牌置于<生命熔炉>内.<生命熔炉>内角色不因使用而失去牌后,将此牌置于<生命熔炉>内.<生命熔炉>内角色可以将<生命熔炉>内的基本牌当做【杀】/【闪】,锦囊牌当做【酒】/【桃】,装备牌当做【无懈可击】使用
                QQQ_baixiang: {
                    usable: 1,//QQQ
                    enable: 'phaseUse',
                    filterCard: true,
                    selectCard: 1,
                    check(card) {
                        if (['basic', 'trick', 'equip'].includes(get.type(card))) return 8 - get.value(card);
                        return 0;
                    },
                    filter: (event, player) => _status.QQQ_ronglu.baixiang.includes(player),
                    discard: false,
                    prompt: `将一张牌置于<生命熔炉>内`,
                    async content(event, trigger, player) {
                        //QQQ
                        _status.QQQ_ronglu.add(event.cards);
                    },
                    ai: {
                        order: 10,
                        result: {
                            player: 1,
                        },
                    },
                    subSkill: {
                        1: {
                            trigger: {
                                player: ['loseAfter'],
                            },
                            forced: true,
                            filter: (event, player) => _status.QQQ_ronglu.baixiang.includes(player) && event.cards?.length && event.parent.name != 'useCard',
                            async content(event, trigger, player) {
                                //QQQ
                                _status.QQQ_ronglu.add(trigger.cards);
                            },
                        },
                        2: {
                            enable: ['chooseToUse', 'chooseToRespond'],
                            hiddenCard(player, name) {
                                return _status.QQQ_ronglu.baixiang.includes(player) && ['sha', 'shan', 'jiu', 'tao', 'wuxie'].includes(name);
                            },
                            filter(event, player) {
                                if (!_status.QQQ_ronglu.baixiang.includes(player)) return false;
                                const list = {
                                    basic: ['sha', 'shan'],
                                    trick: ['jiu', 'tao'],
                                    equip: ['wuxie'],
                                };
                                _status.QQQ_ronglu.add(_status._QQQ_ronglu);
                                for (const name of ['sha', 'shan', 'jiu', 'tao', 'wuxie']) {
                                    const info = lib.card[name];
                                    if (!player.filterCard(name, true)) {
                                        continue;
                                    }
                                    if (!info.notarget && info.filterTarget && info.enable && !player.hasUseTarget({ name: name }, false, false)) {
                                        continue;
                                    }
                                    for (const i in list) {
                                        if (list[i].includes(name)) {
                                            if (Array.from(_status.QQQ_ronglu.childNodes).some((c) => get.type(c) == i)) {
                                                return true;
                                            }
                                        }
                                    }
                                }
                            },
                            chooseButton: {
                                dialog(event, player) {
                                    const vcard = [];
                                    const list = {
                                        basic: ['sha', 'shan'],
                                        trick: ['jiu', 'tao'],
                                        equip: ['wuxie'],
                                    };
                                    _status.QQQ_ronglu.add(_status._QQQ_ronglu);
                                    for (const name of ['sha', 'shan', 'jiu', 'tao', 'wuxie']) {
                                        const info = lib.card[name];
                                        if (!player.filterCard(name, true)) {
                                            continue;
                                        }
                                        if (!info.notarget && info.filterTarget && info.enable && !player.hasUseTarget({ name: name }, false, false)) {
                                            continue;
                                        }
                                        for (const i in list) {
                                            if (list[i].includes(name) && Array.from(_status.QQQ_ronglu.childNodes).some((c) => get.type(c) == i)) {
                                                vcard.push(name);
                                            }
                                        }
                                    }
                                    return ui.create.dialog('抗揍', [vcard, 'vcard'], Array.from(_status.QQQ_ronglu.childNodes));
                                },
                                filter(button) {
                                    if (!ui.selected.buttons.length) return ['sha', 'shan', 'jiu', 'tao', 'wuxie'].includes(button.link[2]);
                                    if (button._args[1] != 'card') return false;
                                    const list = {
                                        basic: ['sha', 'shan'],
                                        trick: ['jiu', 'tao'],
                                        equip: ['wuxie'],
                                    };
                                    for (const i in list) {
                                        if (ui.selected.buttons[0] && list[i].includes(ui.selected.buttons[0].link[2])) {
                                            return get.type(button.link) == i;
                                        }
                                    }
                                },
                                select: 2,
                                check(button) {
                                    if (lib.card[button.link[2]]) {
                                        const num = _status.event.player.getUseValue({
                                            name: button.link[2],
                                            nature: button.link[3],
                                        }, null, true);
                                        return number0(num) + 10;
                                    }
                                    return 1;
                                },
                                backup(links, player) {
                                    return {
                                        filterCard: links[1],
                                        selectCard: -1,
                                        viewAs: {
                                            name: links[0][2],
                                            nature: links[0][3],
                                            suit: links[0][0],
                                            number: links[0][1],
                                            cards: links[1],
                                        },
                                        async precontent(event, trigger, player) {
                                            ui.discardPile.appendChild(event.result.card.cards);//QQQ
                                            _status._QQQ_ronglu.remove(event.result.card.cards);
                                            game.log('#g【熔炉百相】', event.result.card);
                                        },
                                    };
                                },
                            },
                            ai: {
                                fireAttack: true,
                                save: true,
                                respondTao: true,
                                respondwuxie: true,
                                respondSha: true,
                                respondShan: true,
                                order: 1,
                                result: {
                                    player(player) {
                                        if (_status.event.dying) {
                                            return get.attitude(player, _status.event.dying);
                                        }
                                        return 1;
                                    },
                                },
                            },
                        },
                    },
                },
                //————————————————————————————————————————————总督军务威武大将军总兵官朱寿
                //策军: 你可以将一张非伤害牌当做【我就打你】使用
                QQQ_cejun: {
                    enable: 'chooseToUse',
                    filterCard(card) {
                        return !get.tag(card, 'damage');
                    },
                    position: 'hes',
                    selectCard: 1,
                    viewAs: {
                        name: 'QQQ_wodani',
                    },
                    prompt: '将一张非伤害牌当做【我就打你】使用',
                    check(card) {
                        return 8 - get.value(card);
                    },
                    ai: {
                        result: {
                            player: 1,
                        },
                    },
                },
                //阵斩: 当你造成伤害后,令受伤者一张手牌当做【我就打你】对你使用,若你未受到伤害,你摸一张牌.
                QQQ_zhenzhan: {
                    trigger: {
                        source: ['damageEnd'],
                    },
                    forced: true,
                    filter: (event, player) => event.player != player && event.player.countCards('he'),
                    async content(event, trigger, player) {
                        //QQQ
                        const {
                            result: { links },
                        } = await player.chooseButton(['令受伤者一张手牌当做【我就打你】对你使用', trigger.player.getCards('he')], true).set('ai', (button) => -get.attitude(player, trigger.player) * get.value(button.link));
                        if (links && links[0]) {
                            const dani = trigger.player.useCard({ name: 'QQQ_wodani' }, player);
                            await dani;
                            let bool = true;
                            // for (const i of _status.globalHistory) {
                            //     for (const evt of i.everything) {
                            //         if (evt.name == 'damage' && evt.getParent((q) => q == dani).name) {
                            //             bool = false;
                            //         }
                            //     }
                            // }
                            for (var j of player.actionHistory) {
                                if (j.damage.length) {
                                    for (const evt of j.damage) {
                                        if (evt.getParent((q) => q == dani).name) {
                                            bool = false;
                                        }
                                    }
                                }
                            }
                            if (bool) {
                                player.draw();
                            }
                            //用历史写法就得等usecard结束,when写法就是要多加技能
                        }
                    },
                },
                //————————————————————————————————————————————陆逊
                //拜相:每轮开始时你可将任意牌交给任意名角色.本轮中,这些角色的回合内你移除游戏,你的回合内这些角色失去所有技能,且无法使用或打出手牌
                QQQ_baixiangl: {
                    trigger: {
                        global: ['roundStart'],
                    },
                    forced: true,
                    _priority: -68,
                    async content(event, trigger, player) {
                        //QQQ
                        for (const npc of game.players) {
                            if (npc.skills.includes('QQQ_baixiangl_1')) {
                                npc.removeSkill('QQQ_baixiangl_1');
                            }
                        }
                        const cardq = player.getCards('he');
                        while (cardq.length) {
                            const {
                                result: { targets },
                            } = await player
                                .chooseTarget('将任意牌交给任意名角色', (c, p, t) => p != t)
                                .set('ai', (t) => {
                                    if (t.isEnemiesOf(player) && !t.skills.includes('QQQ_baixiangl_1')) {
                                        return 2;
                                    }
                                    return 0;
                                });
                            if (targets && targets[0]) {
                                const {
                                    result: { cards },
                                } = await player.chooseCard('he', (c) => cardq.includes(c)).set('ai', (c) => 8 - get.value(c));
                                if (cards && cards[0]) {
                                    cardq.removeArray(cards);
                                    targets[0].addSkill('QQQ_baixiangl_1');
                                    targets[0].gain(cards, 'gain2');
                                } else break;
                            } else break;
                        }
                    },
                    subSkill: {
                        1: {
                            mod: {
                                cardEnabled2() {
                                    const boss = game.players.find((q) => q.skills.includes('QQQ_baixiangl'));
                                    if (boss && boss == _status.currentPhase) {
                                        return false;
                                    }
                                },
                            },
                            init(player) {
                                if (!player.storage.skill_blocker) {
                                    player.storage.skill_blocker = [];
                                }
                                player.storage.skill_blocker.add('QQQ_baixiangl_1');
                            },
                            onremove(player) {
                                if (player.storage.skill_blocker) {
                                    player.storage.skill_blocker.remove('QQQ_baixiangl_1');
                                }
                            },
                            skillBlocker(skill) {
                                const boss = game.players.find((q) => q.skills.includes('QQQ_baixiangl'));
                                if (boss) {
                                    return boss == _status.currentPhase && skill != 'QQQ_baixiangl_1';
                                }
                            },
                            mark: true,
                            intro: {
                                content(storage, player) {
                                    const boss = game.players.find((q) => q.skills.includes('QQQ_baixiangl'));
                                    if (boss) {
                                        if (boss == _status.currentPhase) {
                                            return '<li>拜相:本回合所有技能失效能且无法使用或打出手牌';
                                        }
                                        return `<li>拜相:你的回合内,${get.translation(boss)}移出游戏`;
                                    }
                                },
                            },
                            trigger: {
                                player: ['phaseBegin'],
                            },
                            forced: true,
                            filter: (event, player) => game.players.some((q) => q.skills.includes('QQQ_baixiangl')),
                            async content(event, trigger, player) {
                                //QQQ
                                const boss = game.players.find((q) => q.skills.includes('QQQ_baixiangl'));
                                boss.out(1);
                                player
                                    .when({ player: 'phaseEnd' })
                                    .then(() => boss.in())
                                    .vars({ boss: boss });
                            },
                        },
                    },
                },
                //凛略:游戏开始时你获得一枚<略>.你手牌数始终不小于<略>数.当你对一名角色造成伤害时,若其区域内牌数不小于你手牌数,你获得一枚<略>.当你受到伤害时,若来源区域内牌数小于你手牌数,你失去一枚<略>
                QQQ_linlve: {
                    mark: true,
                    intro: {
                        content: '#',
                    },
                    _priority: 67,
                    trigger: {
                        player: ['loseAfter'],
                    },
                    forced: true,
                    init: (player) => player.addMark('QQQ_linlve'),
                    filter: (event, player) => player.countCards('h') < player.storage.QQQ_linlve,
                    async content(event, trigger, player) {
                        //QQQ
                        player.drawTo(player.storage.QQQ_linlve);
                    },
                    group: ['QQQ_linlve_1'],
                    subSkill: {
                        1: {
                            trigger: {
                                player: ['damageEnd'],
                                source: ['damageBefore'],
                            },
                            forced: true,
                            filter(event, player) {
                                if (event.player == player) return event.num > 0 && event.source && event.source.countCards('he') < player.countCards('h');
                                return player.countCards('h') <= event.player.countCards('he');
                            },
                            async content(event, trigger, player) {
                                //QQQ
                                if (trigger.player == player) {
                                    player.removeMark('QQQ_linlve');
                                } else {
                                    const num = numberq1(trigger.num);
                                    player.addMark('QQQ_linlve', num);
                                }
                            },
                        },
                    },
                },
                // 势敵
                // 当你指定或成为牌的目标时,你可以将其区域内的牌扣至与你手牌相同(于弃牌阶段归还)
                QQQ_shidi: {
                    trigger: {
                        player: ['useCardToBefore'],
                        target: ['useCardToBefore'],
                    },
                    forced: true,
                    filter(event, player) {
                        if (event.player == player) {
                            if (event.targets?.length == 1 && event.target == player) return false;
                            return event.targets?.some((q) => q.countCards('he') > player.countCards('h'));
                        }
                        return event.player.countCards('he') > player.countCards('h');
                    },
                    async content(event, trigger, player) {
                        //QQQ
                        const targets = trigger.player == player ? trigger.targets : [trigger.player];
                        for (const npc of targets.filter((q) => q.countCards('he') > player.countCards('h'))) {
                            const num = npc.countCards('he') - player.countCards('h');
                            const {
                                result: { links },
                            } = await player.chooseButton([`将${get.translation(npc)}区域内的牌扣至与你相同`, npc.getCards('he')], [1, num]).set('ai', (button) => -get.attitude(player, npc) * get.value(button.link));
                            if (links && links[0]) {
                                npc.addToExpansion(links, 'giveauto').gaintag = ['QQQ_shidi'];
                                npc.addTempSkill('QQQ_shidi_1', { player: 'phaseDiscardBefore' });
                            }
                        }
                    },
                    subSkill: {
                        1: {
                            onremove: (player) => player.gain(player.getExpansions('QQQ_shidi'), 'gain2'),
                        },
                    },
                },
                //————————————————————————————————————————————红莲魔尊————洪亭
                //回溯技能与标记状态
                QQQ_chunqiuchan: {
                    trigger: {
                        global: ['roundStart', 'phaseAfter'],
                    },
                    silent: true,
                    async content(event, trigger, player) {
                        //QQQ
                        if (!lib.config.huisu) {
                            lib.config.huisu = {};
                        }
                        if (!lib.config.huisu.last) {
                            lib.config.huisu.last = 0;
                        }
                        lib.config.huisu.last++;
                        if (lib.config.huisu.last > 20) {
                            lib.config.huisu.last = 1;
                        }
                        lib.config.huisu[lib.config.huisu.last] = {
                            avatar: player.node.avatar.backgroundImage,
                            name: player.name,
                            hp: player.hp,
                            maxHp: player.maxHp,
                            //storage: player.storage,
                            card: {
                                h: player.getCards('h').map((q) => q.name),
                                e: player.getCards('e').map((q) => q.name),
                                x: player.getCards('x').map((q) => q.name),
                                s: player.getCards('s').map((q) => q.name),
                            },
                            skills: player.skills,
                            additionalSkills: player.additionalSkills,
                        };
                        game.saveConfig('huisu', lib.config.huisu);
                    },
                    group: ['QQQ_chunqiuchan_1'],
                    subSkill: {
                        1: {
                            trigger: {
                                player: ['damageAfter', 'dieBefore'],
                            },
                            forced: true,
                            async content(event, trigger, player) {
                                //QQQ
                                const str = trigger.name == 'die' ? '当前已即将死亡,请选择时间长河中的一个点并回溯到过去' : '是否选择时间长河中的一个点并回溯到过去';
                                const list = [str];
                                for (const i in lib.config.huisu) {
                                    if (i == 'last') continue;
                                    const info = lib.config.huisu[i];
                                    list.add([[info.name], 'character']);
                                    const additionalSkills = [];
                                    for (const j in info.additionalSkills) {
                                        additionalSkills.addArray(info.additionalSkills[j]);
                                    }
                                    const storage = [];
                                    for (const x in info.storage) {
                                        storage.add(get.translation(x));
                                        storage.add(get.translation(info.storage[x]));
                                    }
                                    list.add([[[i, `名字:${get.translation(info.name)},血量:${info.hp},上限:${info.maxHp},技能:${get.translation(info.skills)},牌上技能:${get.translation(additionalSkills)},手牌:${get.translation(info.card.h)},装备:${get.translation(info.card.e)}`]], 'textbutton']);
                                }
                                const {
                                    result: { links },
                                } = await player
                                    .chooseButton(list)
                                    .set('filterButton', (button) => lib.config.huisu[button.link])
                                    .set('ai', (button) => {
                                        const info = lib.config.huisu[button.link];
                                        if (!info.skills.includes('QQQ_chunqiuchan')) return 0;
                                        const additionalSkills = [];
                                        for (const j in info.additionalSkills) {
                                            additionalSkills.addArray(info.additionalSkills[j]);
                                        }
                                        return info.hp * 2 + info.maxHp * 2 + info.skills.length * 5 + info.card.h.length + info.card.e.length + additionalSkills.length * 5;
                                    });
                                if (links && links[0]) {
                                    game.yinshi('当时年少掷春光,花马踏蹄酒溅香.爱恨情仇随浪来,夏蝉歌醒夜未央.光阴长河种红莲,韶光重回泪已干.今刻沧桑登舞榭,万灵且待命无缰!');
                                    if (trigger.name == 'die') {
                                        trigger.cancel();
                                    }
                                    const info = lib.config.huisu[links[0]];
                                    player.name = info.name;
                                    player.hp = info.hp;
                                    player.maxHp = info.maxHp;
                                    //player.storage = info.storage;
                                    for (const i of info.card.h) {
                                        if (lib.card[i]) {
                                            player.gain(game.createCard(i));
                                        }
                                    }
                                    for (const i of info.card.e) {
                                        if (lib.card[i]) {
                                            player.equip(game.createCard(i));
                                        }
                                    }
                                    player.skills = info.skills;
                                    player.additionalSkills = info.additionalSkills;
                                    for (const i of player.GAS()) {
                                        player.addSkillTrigger(i);
                                    }
                                    player.node.avatar.backgroundImage = info.avatar;
                                    const skills = [];
                                    for (const skill of player.GS()) {
                                        skills.push([skill, get.translation(skill)]);
                                    }
                                    const {
                                        result: { links: links1 },
                                    } = await player.chooseButton(['选择一个技能失去', [skills, 'tdnodes']], true).set('ai', (button) => {
                                        if (button.link == 'QQQ_chunqiuchan') return 0;
                                        if (player.GES().concat(player.GTS()).includes(button.link)) return 1;
                                        return Math.random();
                                    });
                                    if (links1 && links1[0]) {
                                        player.removeSkill(links1[0]);
                                        game.log(`<span class=Qmenu>${get.translation(player)}发动回溯气运衰败,失去了技能${get.translation(links1[0])}</span>`);
                                        lib.config.huisu[links[0]] = {
                                            avatar: player.node.avatar.backgroundImage,
                                            name: player.name,
                                            hp: player.hp,
                                            maxHp: player.maxHp,
                                            //storage: player.storage,
                                            card: {
                                                h: player.getCards('h').map((q) => q.name),
                                                e: player.getCards('e').map((q) => q.name),
                                                x: player.getCards('x').map((q) => q.name),
                                                s: player.getCards('s').map((q) => q.name),
                                            },
                                            skills: player.skills,
                                            additionalSkills: player.additionalSkills,
                                        };
                                        game.saveConfig('huisu', lib.config.huisu);
                                    }
                                }
                            },
                        },
                    },
                },
                //————————————————————————————————————————————秦百胜
                //大同风幕
                //限定技,出牌阶段你可以失去全部体力值并将失去体力值数十倍的杀加入牌堆,与全部其他角色进入大同风中,直到牌堆洗牌.在此期间:①你每次死亡前, 以移除剩余十分之一牌堆为代价豁免.②全场角色每累计失去三张牌时, 随机一名角色受到一点无来源伤害.③每死亡一名角色, 将五分之一的弃牌堆加入牌堆.④所有锦囊牌均失效
                QQQ_datongfeng: {
                    enable: 'phaseUse',
                    limited: true,
                    async content(event, trigger, player) {
                        game.yinshi('历经五十四次劫,劫云依旧漫遮天.胸中魂光压众生,拳里剑气纵北原.时来时去四百载,无死何能生新颜.弃此残躯换清风,卷席苍穹复光年!');
                        player.awakenSkill('QQQ_datongfeng');
                        _status.datongfeng = player;
                        game.addGlobalSkill('QQQ_datongfeng_1');
                        game.addGlobalSkill('QQQ_datongfeng_2');
                        game.addGlobalSkill('QQQ_datongfeng_3');
                        game.addGlobalSkill('QQQ_datongfeng_4');
                        let num = player.hp;
                        player.loseHp(num);
                        while (num-- > 0) {
                            ui.cardPile.appendChild(game.createCard('sha'));
                        }
                    },
                    ai: {
                        order: 1,
                        result: {
                            player: 1,
                        },
                    },
                    subSkill: {
                        1: {
                            trigger: {
                                player: ['dieBefore'],
                            },
                            forced: true,
                            async content(event, trigger, player) {
                                if (_status.datongfeng == player) {
                                    trigger.cancel();
                                    const pile = Array.from(ui.cardPile.childNodes);
                                    const cards = pile.randomGets(Math.floor(pile.length / 10));
                                    game.cardsDiscard(cards);
                                }
                                else {
                                    const pile = Array.from(ui.discardPile.childNodes);
                                    const cards = pile.randomGets(Math.ceil(pile.length / 5));
                                    for (const i of cards) {
                                        ui.cardPile.appendChild(i);
                                    }
                                }
                            },
                        },
                        2: {
                            trigger: {
                                player: ['loseAfter'],
                            },
                            forced: true,
                            filter: (event, player) => event.cards?.length,
                            async content(event, trigger, player) {
                                if (!_status.datongfeng_lose) {
                                    _status.datongfeng_lose = 0;
                                }
                                _status.datongfeng_lose += trigger.cards.length;
                                while (_status.datongfeng_lose > 3) {
                                    _status.datongfeng_lose -= 3;
                                    const npc = game.players.randomGet();
                                    npc.damage('nosource');
                                }
                            },
                        },
                        3: {
                            trigger: {
                                player: ['useCardToBefore'],
                            },
                            forced: true,
                            filter: (event, player) => get.type(event.card) == 'trick',
                            async content(event, trigger, player) {
                                trigger.cancel();
                            },
                        },
                        4: {
                            trigger: {
                                global: ['washCard'],
                            },
                            forced: true,
                            async content(event, trigger, player) {
                                game.removeGlobalSkill('QQQ_datongfeng_1');
                                game.removeGlobalSkill('QQQ_datongfeng_2');
                                game.removeGlobalSkill('QQQ_datongfeng_3');
                                game.removeGlobalSkill('QQQ_datongfeng_4');
                            },
                        },
                    },
                },
                //五指拳心剑
                //每当你不因使用而失去牌时,可以将其当作无距离次数限制无视闪避无视防具的杀使用,且每次以此法使用的杀基础伤害值翻倍(挥手不是再见,五指拳心剑!)
                QQQ_wuzhiquanxinjian: {
                    trigger: {
                        player: ['loseAfter'],
                    },
                    forced: true,
                    filter: (event, player) => event.cards?.length && event.parent.name != 'useCard',
                    _priority: 73,
                    async content(event, trigger, player) {
                        for (const card of trigger.cards) {
                            player.storage.QQQ_wuzhiquanxinjian = numberq0(player.storage.QQQ_wuzhiquanxinjian) + 1;
                            const { result: { targets } } = await player.chooseTarget(`选择第${player.storage.QQQ_wuzhiquanxinjian}剑的目标`, (c, p, t) => t != player)
                                .set('ai', (t) => -get.attitude(t, player));
                            if (targets && targets[0]) {
                                const xinjian = player.useCard({
                                    name: 'sha',
                                    storage: { wuzhiquanxinjian: true },
                                    cards: [card]
                                }, [card], targets[0], false);
                                xinjian.directHit = game.players;
                                xinjian.baseDamage = Math.pow(2, player.storage.QQQ_wuzhiquanxinjian - 1);
                                await xinjian;
                            }
                        }
                    },
                    ai: {
                        nohujia: true,
                        unequip: true,
                        effect: {
                            player(card) {
                                if (lib.card[card.name]?.type == 'equip') return 2;
                                if (card.storage?.wuzhiquanxinjian) return 2;
                                if (card.cards?.length) return 'zerotarget';
                            },
                        },
                    },
                },
                EX_duji: {
                    trigger: {
                        player: ['changeHpBefore'],
                        source: ['damageBefore'],
                    },
                    forced: true,
                    mark: true,
                    intro: {
                        content: '#',
                    },
                    content() {
                        const duji = function (npc) {
                            const num = numberq1(trigger.num);
                            npc.addMark('EX_duji', num);
                            if (npc.countMark('EX_duji') > 2) {
                                game.playAudio('../extension/EX钟会/音效/duji.mp3');
                                npc.removeMark('EX_duji', 3);
                                npc.damage('poinson', 2);
                            }
                        };
                        if (trigger.player == player) {
                            let source, evt = trigger.parent;
                            while (evt && evt.name) {
                                if (evt.player != player) {
                                    source = evt.player;
                                    break;
                                }
                                else {
                                    evt = evt.parent;
                                }
                            }
                            if (source) {
                                duji(source);
                            }
                            else {
                                for (const npc of game.players.filter((q) => q != player)) {
                                    duji(npc);
                                }
                            }
                        }
                        else {
                            duji(trigger.player);
                        }
                    },
                },
                //————————————————————————————————————————————贾南风
                //兴乱:每张杀第一次被使用后由使用者下家获得,然后你增加一点护甲.第二次被使用后不计入使用次数且置于牌堆顶,然后你从牌堆底摸一张牌
                QQQ_xingluan: {
                    trigger: {
                        global: ['useCardToEnd'],
                    },
                    forced: true,
                    mod: {
                        aiOrder(player, card, num) {
                            if (card.name == 'sha' && card.storage?.QQQ_xingluan == 1) return 99;
                        },
                    },
                    filter: (event, player) => event.card.name == 'sha' && event.cards.some((q) => !(q.storage.QQQ_xingluan > 1)),
                    async content(event, trigger, player) {
                        for (const card of trigger.cards) {
                            if (!card.storage.QQQ_xingluan) {
                                card.storage.QQQ_xingluan = 1;
                                card.AQ('兴乱1')
                                trigger.player.next.gain(card, 'gain2');
                                player.changeHujia(1);
                            }
                            else if (card.storage.QQQ_xingluan < 2) {
                                card.storage.QQQ_xingluan++;
                                card.AQ('兴乱2')
                                trigger.parent.addCount = false;
                                const stat = trigger.player.stat;
                                if (stat[stat.length - 1].card.sha > 0) {
                                    stat[stat.length - 1].card.sha--;
                                }
                                ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
                                player.draw('bottom');
                            }
                        }
                    },
                },
                //匡政:其他角色结束阶段,若其本回合使用了超过一张【杀】,你可以对任意名角色使用一张【五谷丰登】
                QQQ_kuangzheng: {
                    trigger: {
                        global: ['phaseEnd'],
                    },
                    forced: true,
                    filter(event, player) {
                        let num = 0;
                        const his = event.player.actionHistory;
                        for (const evt of his[his.length - 1].useCard) {
                            if (evt.card.name == 'sha') {
                                num++;
                            }
                        }
                        return num > 1;
                    },
                    async content(event, trigger, player) {
                        const { result: { targets } } = await player.chooseTarget('对这些角色使用一张【五谷丰登】', [1, game.players.length])
                            .set('ai', (t) => get.attitude(player, t));
                        if (targets && targets[0]) {
                            player.useCard({ name: 'wugu' }, targets);
                        }
                    },
                },
                //————————————————————————————————————————————玛莉卡&拉达冈————我的半身,击碎彼此吧!
                //游戏开始时召唤你的半身,而后每回合结束或受到伤害后你切换一次形态,双形态彼此独立
                QQQ_shuangmian: {
                    trigger: {
                        global: ['phaseEnd'],
                        player: ['dieBefore'],
                    },
                    forced: true,
                    mark: true,
                    intro: {
                        name: '法环破碎度',
                        content(storage, player) {
                            return `法环破碎度${_status.fahuan.num}`;
                        },
                    },
                    filter: (event, player) => player.fanmian?.isAlive(),
                    async content(event, trigger, player) {
                        const boss = player.fanmian;
                        QQQ.div.appendChild(player);
                        ui.arena.appendChild(boss);
                        const meIndex = game.players.indexOf(player);
                        game.players[meIndex] = boss;
                        //player.next = boss;//防止删除角色再死,next与previous混乱,dead里面多出一个没排序的人,卡死trigger
                        game.sort();
                        if (game.me == player) {
                            game.me = boss;
                            while (ui.handcards1Container.firstChild) {
                                ui.handcards1Container.firstChild.remove();
                            }
                            ui.handcards1Container.appendChild(game.me.node.handcards1.addTempClass("start").fix());
                            ui.updatehl();
                        }
                        if (game.boss == player) {
                            game.boss = boss;
                        }
                        if (_status.roundStart == player) {
                            _status.roundStart = boss;
                        }
                        game.playerMap[player.playerid] = boss;
                        _status.event.player = boss;
                        if (trigger.name != 'die') {
                            let evt = _status.event;
                            while (evt && evt.name) {
                                if (evt.player == player) {
                                    evt.player = boss;
                                }
                                for (const i of evt.next) {
                                    if (i.player == player) {
                                        i.player = boss;
                                    }
                                }
                                evt = evt.parent;
                            }
                        }
                    },
                    group: ['QQQ_shuangmian_1'],
                    subSkill: {
                        1: {
                            trigger: {
                                global: ['gameStart'],
                            },
                            forced: true,
                            async content(event, trigger, player) {
                                const boss = ui.create.player(ui.arena).addTempClass('start');
                                boss.playerid = player.playerid;
                                player.guhuo(boss);
                                if (player.name == 'QQQ_Marika') {
                                    boss.init('QQQ_Radagon');
                                }
                                else {
                                    boss.init('QQQ_Marika');
                                }
                                boss.remove();
                                boss.fanmian = player;
                                player.fanmian = boss;
                                if (!_status.fahuan) {
                                    _status.fahuan = {};
                                }
                                if (!_status.fahuan.map) {
                                    _status.fahuan.map = new Map();
                                }
                                const jindutiao1 = player.nengliangtiao();
                                _status.fahuan.map.set(player, jindutiao1);
                                const jindutiao2 = boss.nengliangtiao();
                                _status.fahuan.map.set(boss, jindutiao2);
                                let fahuan = 50;
                                Reflect.defineProperty(_status.fahuan, 'num', {
                                    get() {
                                        if (_status.fahuan.posui) {
                                            return 100;
                                        }
                                        if (_status.fahuan.wanzheng) {
                                            return 0;
                                        }
                                        return fahuan;
                                    },
                                    set(v) {
                                        for (const [npc, jindutiaox] of _status.fahuan.map) {
                                            if (npc.dataset.position == 0) {
                                                jindutiaox.style.width = `${v}%`;
                                                jindutiaox.style.height = `100%`;
                                            }
                                            else {
                                                jindutiaox.style.width = `100%`;
                                                jindutiaox.style.height = `${v}%`;
                                            }
                                            jindutiaox.innerHTML = v;
                                        }
                                        fahuan = v;
                                    },
                                });
                            },
                        },
                    },
                },
                //根据你当前的形态,你始终装备对应的神器石槌
                QQQ_shichui: {
                    init(player) {
                        if (!player.getEquip('QQQ_EldenRing')) {
                            const card = game.createCard('QQQ_EldenRing');
                            player.useCard(card, player);
                        }
                        if (player.name == 'QQQ_Marika') {
                            if (!player.getEquip('QQQ_Marikashichui')) {
                                const card = game.createCard('QQQ_Marikashichui');
                                player.useCard(card, player);
                            }
                        }
                        else {
                            if (!player.getEquip('QQQ_Radagonshichui')) {
                                const card = game.createCard('QQQ_Radagonshichui');
                                player.useCard(card, player);
                            }
                        }
                    },
                },
                //当你使用实体伤害牌指定目标后,根据法环修复度视为敌方角色使用随机x张伤害牌(x为法环修复度除以10)
                QQQ_Marikashichui: {
                    trigger: {
                        player: ['useCardToPlayer'],
                    },
                    forced: true,
                    filter(event, player) {
                        if (!_status.fahuan) {
                            _status.fahuan = {};
                        }
                        return event.cards?.length && get.tag(event.card, 'damage') && _status.fahuan.num < 100;
                    },
                    async content(event, trigger, player) {
                        let num = 100 - _status.fahuan.num;//修复度
                        const list = [];
                        for (const i in lib.card) {
                            const info = lib.card[i];
                            if (info.ai?.tag?.damage && info.content) {
                                list.add(i);
                            }
                        }
                        while (num > 0) {
                            num -= 10;
                            await player.useCard({ name: list.randomGet() }, player.getEnemies(), false);
                        }
                    },
                    group: ['QQQ_Marikashichui_1'],
                    subSkill: {
                        1: {
                            trigger: {
                                global: ['changeHp', 'loseAfter'],
                            },
                            silent: true,
                            filter(event, player, name) {
                                if (!_status.fahuan) {
                                    _status.fahuan = {};
                                }
                                if (name == 'changeHp') return event.num < 0;
                                return event.cards?.length;
                            },
                            async content(event, trigger, player) {
                                if (trigger.name == 'changeHp') {
                                    _status.fahuan.num += numberq1(trigger.num);
                                }
                                else {
                                    _status.fahuan.num += numberq1(trigger.cards.length);
                                }
                                if (_status.fahuan.num > 99 && player.fanmian) {
                                    const card = player.getEquip('QQQ_EldenRing');
                                    if (card) {
                                        card.node.name2.innerHTML = `${get.translation(card.suit)}${card.number}<span style='color: #FF0000'>破碎法环</span>`;
                                        lib.translate.QQQ_EldenRing = `<span style='color: #FF0000'>破碎法环</span>`;
                                    }
                                    _status.fahuan.posui = true;
                                    delete player.fanmian;
                                    game.addGlobalSkill('QQQ_posuizhanzheng');
                                    game.addGlobalSkill('QQQ_posuizhanzheng_1');
                                    player.offspring = [];
                                    for (const i of [
                                        'QQQ_Godwyn', 'QQQ_Morgott', 'QQQ_Mohg',
                                        'QQQ_Radahn', 'QQQ_菈妮',
                                        'QQQ_Messmer', 'QQQ_Melina',
                                        'QQQ_Malenia', 'QQQ_Trina'
                                    ]) {
                                        const npc = player.addFellow(i);
                                        player.offspring.push(npc);
                                    }
                                }
                            },
                        },
                    },
                },
                //当你成为实体非伤害牌的目标后,根据法环破碎度令友方角色回复x点体力(已死亡的角色会因此复活)(x为法环破碎度除以10)
                QQQ_Radagonshichui: {
                    trigger: {
                        target: ['useCardToPlayer'],
                    },
                    forced: true,
                    filter(event, player) {
                        if (!_status.fahuan) {
                            _status.fahuan = {};
                        }
                        return event.cards?.length && !get.tag(event.card, 'damage') && _status.fahuan.num > 0;
                    },
                    async content(event, trigger, player) {
                        const num = Math.ceil(_status.fahuan.num / 10);
                        const boss = player.fanmian;
                        for (const i of player.getFriends(true, true).filter((q) => q != boss)) {
                            if (i.isDead()) {
                                i.qrevive();
                                i.hp = 0;
                            }
                            i.recover(num);
                        }
                        if (boss?.isDead()) {
                            boss.qrevive();
                            game.players.remove(boss);
                        }
                        boss?.recover(num);
                    },
                    group: ['QQQ_Radagonshichui_1', 'QQQ_Radagonshichui_2'],
                    subSkill: {
                        1: {
                            trigger: {
                                global: ['changeHp', 'gainAfter'],
                            },
                            silent: true,
                            filter(event, player, name) {
                                if (!_status.fahuan) {
                                    _status.fahuan = {};
                                }
                                if (name == 'changeHp') return event.num > 0;
                                return event.cards?.length;
                            },
                            async content(event, trigger, player) {
                                if (trigger.name == 'changeHp') {
                                    _status.fahuan.num -= numberq1(trigger.num);
                                }
                                else {
                                    _status.fahuan.num -= numberq1(trigger.cards.length);
                                }
                                if (_status.fahuan.num < 1 && player.fanmian) {
                                    const card = player.getEquip('QQQ_EldenRing');
                                    if (card) {
                                        card.node.name2.innerHTML = `${get.translation(card.suit)}${card.number}<span style='color: gold'>艾尔登法环</span>`;
                                        lib.translate.QQQ_EldenRing = `<span style='color: gold'>艾尔登法环</span>`;
                                    }
                                    _status.fahuan.wanzheng = true;
                                    delete player.fanmian;
                                }
                            },
                        },
                        2: {
                            trigger: {
                                player: ['dieBefore'],
                            },
                            forced: true,
                            filter: (event, player) => player.fanmian,
                            async content(event, trigger, player) {
                                _status.fahuan.num -= 10;
                                trigger.cancel();
                            },
                        },
                    },
                },
                // 世界秩序化身,每一次破碎或修复都会带来秩序的剧变
                // 当其完全破碎后,玛莉卡将完全取代拉达冈,并踏上登神之路开启破碎战争
                // 当其完全修复后,拉达冈将完全取代玛莉卡,然后装备完整的法环统御天地众生
                QQQ_EldenRing: {
                    trigger: {
                        global: ['changeHp'],
                    },
                    silent: true,
                    filter(event, player) {
                        if (!_status.fahuan) {
                            _status.fahuan = {};
                        }
                        return _status.fahuan.num < 1 && !event.getParent('QQQ_EldenRing').name;
                    },
                    async content(event, trigger, player) {
                        let maxCount = -Infinity;
                        let maxplayer = null;
                        let mincount = Infinity;
                        let minplayer = null;
                        for (const player of game.players) {
                            const count = player.hp;
                            if (count > maxCount) {
                                maxCount = count;
                                maxplayer = player;
                            }
                            if (count < mincount) {
                                mincount = count;
                                minplayer = player;
                            }
                        }
                        if (maxplayer.isEnemiesOf(player)) {
                            game.log(`<span class=Qmenu>${get.translation(maxplayer)}体力最大,受到世界秩序制裁</span>`);
                            maxplayer.damage(2);
                        }
                        if (minplayer.isFriendsOf(player)) {
                            game.log(`<span class=Qmenu>${get.translation(minplayer)}体力最小,受到世界秩序补偿</span>`);
                            minplayer.recover(2);
                        }
                    },
                    group: ['QQQ_EldenRing_1'],
                    subSkill: {
                        1: {
                            trigger: {
                                global: ['gainEnd', 'loseEnd'],
                            },
                            silent: true,
                            filter(event, player) {
                                if (!_status.fahuan) {
                                    _status.fahuan = {};
                                }
                                return _status.fahuan.num < 1 && !event.getParent('QQQ_EldenRing').name;
                            },
                            async content(event, trigger, player) {
                                let maxCount = -Infinity;
                                let maxplayer = null;
                                let mincount = Infinity;
                                let minplayer = null;
                                for (const player of game.players) {
                                    const count = player.countCards('h');
                                    if (count > maxCount) {
                                        maxCount = count;
                                        maxplayer = player;
                                    }
                                    if (count < mincount) {
                                        mincount = count;
                                        minplayer = player;
                                    }
                                }
                                if (maxplayer.isEnemiesOf(player)) {
                                    game.log(`<span class=Qmenu>${get.translation(maxplayer)}手牌最多,受到世界秩序制裁</span>`);
                                    maxplayer.randomDiscard(2);
                                }
                                if (minplayer.isFriendsOf(player)) {
                                    game.log(`<span class=Qmenu>${get.translation(minplayer)}手牌最少,受到世界秩序补偿</span>`);
                                    minplayer.draw(2);
                                }
                            },
                        },
                    },
                },
                // 完整的法环会制裁手牌与体力值最多的角色,补偿体力值与手牌最少的角色
                // 破碎战争期间,每一个玛莉卡子嗣的死亡,都会推进玛莉卡登神的进度
                QQQ_posuizhanzheng: {
                    trigger: {
                        global: ['dieAfter'],
                    },
                    forced: true,
                    filter: (event, player) => player.offspring?.includes(event.player),
                    async content(event, trigger, player) {
                        player.offspring.remove(event.player);
                        player.maxHp *= 2;
                        player.hp = player.maxHp;
                        player.Godhood = numberq0(player.Godhood) + 1;
                        player.$skill(`登神${player.Godhood}步`);
                        for (const i of trigger.player.GS()) {
                            player.addSkill(i);
                        }
                    },
                    subSkill: {
                        1: {
                            trigger: {
                                player: ['dieBefore'],
                            },//QQQ
                            forced: true,
                            filter: (event, player) => player.offspring?.length,
                            async content(event, trigger, player) {
                                trigger.cancel();
                            },
                        },
                    },
                },
                //————————————————————————————————————————————星宿仙尊————明皓、毓秀、丰雅
                //钟灵毓秀:你将全场失去的♥️️牌置于牌堆底,每次你体力变化后或每轮开始时,你依次展示牌堆底的牌直到出现两种花色,然后你选择使用其中任意牌,并摸没有被使用的牌数的牌
                QQQ_yuxiu: {
                    //他既然夸我钟灵毓秀,那我就给你起名毓秀。若有来生,就请你替我好好活着,不要管什么人族未来,不要想什么苍生安危,就为自己活一次,为自己自私一次,痛快地去爱,淋漓地去哭！
                    trigger: {
                        global: ['loseAfter'],
                    },
                    forced: true,
                    filter: (event, player) => event.cards?.some((q) => q.suit == 'heart'),
                    async content(event, trigger, player) {
                        for (const i of trigger.cards.filter((q) => q.suit == 'heart')) {
                            setTimeout(() => {
                                if (get.owner(i)) {
                                    get.owner(i).lose(i, ui.cardPile)._triggered = null;
                                }
                                else {
                                    ui.cardPile.appendChild(i);
                                }
                            }, 600);
                        }
                    },
                    group: ['QQQ_yuxiu_1'],
                    subSkill: {
                        1: {
                            trigger: {
                                global: ['roundStart'],
                                player: ['changeHp'],
                            },
                            forced: true,
                            _priority: 23,
                            async content(event, trigger, player) {
                                game.yinshi('三百万年转瞬封,半为天意半为空.算尽天下穷心力,逆转宿命显神通.红莲涅火焚天下,天魔无相乱中州.气贯五域天地阔,重振天庭舞清风.');
                                let count = numberq1(trigger.num);
                                while (count-- > 0) {
                                    const cards = [];
                                    while (cards.map((q) => q.suit).unique().length < 2) {
                                        const card = ui.cardPile.lastChild;
                                        game.cardsGotoOrdering(card);
                                        await player.showCards(card);
                                        cards.push(card);
                                    }
                                    const { result: { links } } = await player.chooseButton(['选择使用其中任意牌,并摸没有被使用的牌数的牌', cards], [1, cards.length])
                                        .set('ai', (button) => number0(player.getUseValue(button.link, true, true)) - 6);
                                    if (links && links[0]) {
                                        for (const i of links) {
                                            cards.remove(i);
                                            await player.chooseUseTarget(i, true, false, 'nodistance');
                                        }
                                    }
                                    player.draw(cards.length);
                                }
                            },
                        },
                    },
                },
                // 你装备区、手牌区、判定区内的牌数量始终相等（若不相等则为牌数少的区域内合法的置入牌直至相等）
                QQQ_diwuweidu: {
                    trigger: {
                        player: ['gainAfter', 'loseAfter'],
                    },
                    forced: true,
                    filter(event, player) {
                        return !event.getParent('QQQ_diwuweidu').name;
                    },
                    async content(event, trigger, player) {
                        const numh = player.countCards('h');
                        const nume = player.countCards('e');
                        const numj = player.countCards('j');
                        const numx = player.countCards('x');
                        const num = Math.max(numh, nume, numj);
                        if (numh < num) {
                            player.drawTo(num);
                        }
                        if (nume < num) {
                            let numq = num - nume;
                            while (numq-- > 0) {
                                const equip = get.cardPile((c) => get.type(c) == 'equip', 'field');
                                if (equip) {
                                    await player.equip(equip);
                                }
                            }
                        }
                        if (numj < num) {
                            let numq = num - numj;
                            while (numq-- > 0) {
                                const delay = get.cardPile((c) => get.type(c) == 'delay', 'field');
                                if (delay) {
                                    await player.addJudge(delay);
                                }
                            }
                        }
                        if (numx < num) {
                            let numq = num - numx;
                            while (numq-- > 0) {
                                const ex = get.cards()[0];
                                if (ex) {
                                    player.node.expansions.appendChild(ex);
                                }
                            }
                        }
                    },
                    group: ['QQQ_diwuweidu_1'],
                    subSkill: {
                        1: {
                            trigger: {
                                player: ['equipBefore'],
                            },
                            forced: true,
                            async content(event, trigger, player) {
                                trigger.cancel();
                                const card = trigger.cards[0];
                                if (card) {
                                    player.vcardsMap?.equips.push(new lib.element.VCard(card));
                                    player.node.equips.appendChild(card);
                                    card.style.transform = '';
                                    card.node.name2.innerHTML = `${get.translation(card.suit)}${card.number} ${get.translation(card.name)}`;
                                }
                                const info = get.info(card, false);
                                if (info.skills) {
                                    for (const i of info.skills) {
                                        player.addSkillTrigger(i);
                                    }
                                }
                            },
                        },
                    },
                },
                //丰乳肥臀:每阶段结束时,若此阶段内场上有其他角色累计获得或失去至少两张牌,你令其将这些牌当作顺手牵羊对你使用
                QQQ_fengrufeitun: {
                    trigger: {
                        global: ['loseAfter', 'gainAfter'],
                    },
                    forced: true,
                    popup: false,
                    init(player) {
                        player.storage.QQQ_fengrufeitun = new Map();
                    },
                    filter(event, player) {
                        return event.cards?.length && event.player != player && !event.getParent('QQQ_fengrufeitun_1').name;
                    },
                    async content(event, trigger, player) {
                        const storage = player.storage.QQQ_fengrufeitun;
                        if (!storage.has(trigger.player)) {
                            storage.set(trigger.player, { gain: [], lose: [] });
                        }
                        const entry = storage.get(trigger.player);
                        if (trigger.name == 'gain') {
                            entry.gain.addArray(trigger.cards);
                        }
                        else {
                            entry.lose.addArray(trigger.cards);
                        }
                    },
                    group: ['QQQ_fengrufeitun_1'],
                    subSkill: {
                        1: {
                            trigger: {
                                global: ['phaseEnd', 'phaseZhunbeiEnd', 'phaseJudgeEnd', 'phaseDrawEnd', 'phaseUseEnd', 'phaseDiscardEnd', 'phaseJieshuEnd'],
                            },
                            forced: true,
                            async content(event, trigger, player) {
                                for (const [npc, entry] of player.storage.QQQ_fengrufeitun) {
                                    if (entry.lose.length > 1) {
                                        await npc.useCard({ name: 'shunshou' }, entry.lose, player, false);
                                    }
                                    if (entry.gain.length > 1) {
                                        await npc.useCard({ name: 'shunshou' }, entry.gain, player, false);
                                    }
                                    entry.lose = [];
                                    entry.gain = [];
                                }
                            },
                        },
                    },
                },
                //出牌阶段开始时，你摸四张牌，然后将一张牌当所有花色均失效的【乐不思蜀】使用并弃置任意张牌作为此牌的生效花色
                QQQ_qiaobian: {
                    trigger: {
                        player: ['phaseUseBegin'],
                    },
                    forced: true,
                    async content(event, trigger, player) {
                        player.draw(4);
                        const { result: { cards } } = await player.chooseCard('he', '将一张牌当所有花色均失效的【乐不思蜀】使用', true)
                            .set('ai', (c) => 6 - get.value(c));
                        if (cards && cards[0]) {
                            const { result: { targets } } = await player.chooseTarget('选择乐不思蜀的目标', (c, p, t) => p != t)
                                .set('ai', (t) => -get.attitude(player, t));
                            if (targets && targets[0]) {
                                if (!lib.card.QQQ_lebu) {
                                    lib.card.QQQ_lebu = lib.card.lebu;
                                    lib.card.QQQ_lebu.judge = function (card) {
                                        if (lib.card.QQQ_lebu.suits?.includes(card.suit)) return -2;
                                        return 1;
                                    };
                                    lib.translate.QQQ_lebu = '乐不思蜀';
                                }
                                await targets[0].addJudge({ name: 'QQQ_lebu' }, cards);
                                const suits = [];
                                const { result: { links } } = await player.chooseButton(['弃置任意张不同花色牌作为此牌的生效花色', player.getCards('he')], [1, 4])
                                    .set('filterButton', (button) => {
                                        if (ui.selected.buttons.length) {
                                            const suit = ui.selected.buttons.map((q) => q.link.suit);
                                            return !suit.includes(button.link.suit);
                                        }
                                        return true;
                                    })
                                    .set('ai', (button) => 6 - get.value(button.link));
                                if (links && links[0]) {
                                    player.discard(links);
                                    suits.addArray(links.map((q) => q.suit));
                                }
                                lib.card.QQQ_lebu.suits = suits;
                            }
                        }
                    },
                },
                //————————————————————————————————————————————玛莲妮娅/Malenia
                // 水鸟乱舞
                // 当你使用杀指定目标时,你连续在场上变换三次位置,并对经过的角色造成一点出血伤害
                // 此过程中,每有角色进入过濒死,你额外变换一次位置
                QQQ_shuiniao: {
                    trigger: {
                        player: ['shaBegin'],
                    },
                    forced: true,
                    async content(event, trigger, player) {
                        const his = [];
                        for (const i of _status.globalHistory) {
                            for (const evt of i.everything) {
                                if (evt.name == 'dying') {
                                    his.push(evt);
                                }
                            }
                        }
                        let count = 3;
                        while (count-- > 0) {
                            const num = Math.floor(game.players.length * Math.random());
                            const target = game.players.find((q) => q.dataset.position == num);
                            target.dataset.position = player.dataset.position;
                            player.dataset.position = num;
                            game.log(player, target, '交换位置');
                            game.sort();
                            let left = [], right = [];
                            let left2 = player.previous, right2 = player.next;
                            while (left2 && ![target, player].includes(left2) && right2 && ![target, player].includes(right2)) {
                                left.push(left2);
                                right.push(right2);
                                left2 = left2.previous;
                                right2 = right2.next;
                            }
                            if (target == left2) {
                                for (const i of left) {
                                    await i.damage('ScarletRot');
                                }
                            }
                            if (target == right2) {
                                for (const i of right) {
                                    await i.damage('ScarletRot');
                                }
                            }
                            for (const i of _status.globalHistory) {
                                for (const evt of i.everything) {
                                    if (evt.name == 'dying' && !his.includes(evt)) {
                                        his.push(evt)
                                        count++;
                                    }
                                }
                            } //用历史写法就得等usecard结束,when写法就是要多加技能
                        }
                    },
                },
                // 女武神的义手刀
                // 在你使用牌的结算过程中,你处于无敌状态
                QQQ_yishoudao: {
                    init(player) {
                        player.storage.QQQ_yishoudao = [];
                    },
                    trigger: {
                        player: ['useCardBefore'],
                    },
                    firstDo: true,
                    forced: true,
                    popup: false,
                    mark: true,
                    intro: {
                        content(storage) {
                            if (storage.length) {
                                return '当前处于无敌状态';
                            }
                            return '未处于无敌状态';
                        },
                    },
                    async content(event, trigger, player) {
                        player.storage.QQQ_yishoudao.push(trigger.card);
                    },
                    group: ['QQQ_yishoudao_1', 'QQQ_yishoudao_2'],
                    subSkill: {
                        1: {
                            trigger: {
                                player: ['changeHpBefore', 'loseBefore'],
                            },
                            forced: true,
                            filter(event, player, name) {
                                if (name == 'loseBefore' && event.parent.name == 'useCard') {
                                    return false;
                                }
                                return player.storage.QQQ_yishoudao.length;
                            },
                            async content(event, trigger, player) {
                                trigger.cancel();
                            },
                        },
                        2: {
                            trigger: {
                                player: ['useCardAfter'],
                            },
                            lastDo: true,
                            forced: true,
                            popup: false,
                            async content(event, trigger, player) {
                                player.storage.QQQ_yishoudao.remove(trigger.card);
                            },
                        }
                    },
                },
                // 猩红腐败绽放
                // 当你进入濒死时,视为对攻击范围内的全部其他角色使用一张腐败属性的杀;然后恢复此杀结算过程中,场上角色受到伤害值的体力
                QQQ_xinghongfubai: {
                    trigger: {
                        player: ['dying'],
                    },
                    forced: true,
                    async content(event, trigger, player) {
                        const his = [];
                        for (const i of _status.globalHistory) {
                            for (const evt of i.everything) {
                                if (evt.name == 'damage') {
                                    his.push(evt);
                                }
                            }
                        }
                        const targets = game.players.filter((q) => q != player && get.distance(player, q, 'attack') < 2);
                        const sha = player.useCard({
                            name: 'sha',
                            nature: 'ScarletRot',
                        }, targets).set('addCount', false);
                        await sha;
                        let num = 0;
                        for (const i of _status.globalHistory) {
                            for (const evt of i.everything) {
                                if (evt.name == 'damage' && !his.includes(evt)) {
                                    num += numberq1(evt.num);
                                }
                            }
                        }
                        player.recover(num);
                    },
                },
                // 猩红腐败
                // 任意回合结束后流失1点体力并减少一层状态
                _ScarletRot: {
                    trigger: {
                        global: ['phaseEnd'],
                    },
                    forced: true,
                    filter(event, player) {
                        return player.storage._ScarletRot > 0;
                    },
                    intro: {
                        name: '猩红腐败',
                        content: 'mark',
                    },
                    async content(event, trigger, player) {
                        player.storage._ScarletRot--;
                        player.loseHp();
                    },
                    subSkill: {
                        1: {
                            trigger: {
                                player: ['damageEnd'],
                            },
                            forced: true,
                            filter(event, player) {
                                return event.nature == 'ScarletRot';
                            },
                            async content(event, trigger, player) {
                                player.addMark('_ScarletRot', numberq1(trigger.num));
                            },
                        },
                    },
                },
                //————————————————————————————————————————————拉塔恩 6/8
                // 重力魔法
                // 每轮开始时,你选择一种花色,令所有其他角色展示同花色所有牌,展示牌最多的角色受到一点雷电伤害
                QQQ_zhongli: {
                    trigger: {
                        global: ['roundStart'],
                    },
                    forced: true,
                    async content(event, trigger, player) {
                        const {
                            result: { control },
                        } = await player
                            .chooseControl(lib.suits)
                            .set('prompt', `选择一种花色,令所有其他角色展示同花色所有牌`)
                            .set('ai', (e, p) => {
                                return lib.suits.randomGet();
                            });
                        let num = 0, log;
                        for (const npc of game.players) {
                            const cards = npc.getCards('he', { suit: control });
                            if (npc != player && cards.length) {
                                await npc.showCards(cards);
                                if (cards.length > num) {
                                    num = cards.length;
                                    log = npc;
                                }
                            }
                        }
                        if (log) {
                            log.damage('thunder');
                        }
                    },
                },
                // 碎星双剑
                // 当有牌被展示或明置时,将这些牌置于你的装备区,并为这些牌赋予一个带有<星>字的技能
                // 这些牌被失去后,你回复一点体力
                QQQ_suixing: {
                    trigger: {
                        global: ['showCardsEnd', 'addShownCardsEnd'],
                    },
                    forced: true,
                    filter(event, player, name) {
                        return event.cards?.length;
                    },
                    async content(event, trigger, player) {
                        for (const card of trigger.cards) {
                            const skill = Object.keys(lib.skill).filter((i) => get.translation(i).includes('星') && lib.translate[`${i}_info`]).randomGet();
                            if (skill) {
                                const info = lib.card[card.name];
                                const name = `suixing_${card.name}`;
                                const subtype = `equip${Math.ceil(5 * Math.random())}`;
                                let src;
                                if (info.image) {
                                    if (info.image.startsWith("ext:")) {
                                        src = info.image.replace(/^ext:/, "extension/");
                                    }
                                    else {
                                        src = info.image;
                                    }
                                }
                                else {
                                    if (info.fullskin) {
                                        src = `image/card/${card.name}.png`;
                                    }
                                    else {
                                        src = `image/card/${card.name}.jpg`;
                                    }
                                }
                                lib.card[name] = {
                                    type: 'equip',
                                    subtype: subtype,
                                    skills: [skill],
                                    enable: true,
                                    selectTarget: -1,
                                    filterTarget(card, player, target) {
                                        return target == player;
                                    },
                                    modTarget: true,
                                    allowMultiple: false,
                                    toself: true,
                                    async content(event, trigger, player) {
                                        if (event.cards.length) {
                                            event.target.equip(event.cards[0]);
                                        }
                                    },
                                    async onLose(event, trigger, player) {
                                        const boss = game.players.find((q) => q.hasSkill('QQQ_suixing'));
                                        if (boss) {
                                            boss.recover();
                                        }
                                    },
                                    ai: {
                                        equipValue: 70,
                                        basic: {
                                            order: 70,
                                            useful: 70,
                                            value: 70,
                                        },
                                        result: {
                                            target(player, target, card) {
                                                return get.equipResult(player, target, card.name);
                                            },
                                        },
                                    },
                                };
                                lib.translate[name] = `碎星${lib.translate[card.name]}`;
                                lib.translate[`${name}_info`] = lib.translate[`${skill}_info`];
                                card.init([card.suit, card.number, name, card.nature]);
                                card.classList.add('fullskin');
                                card.node.image.style.backgroundImage = `url(${src})`;
                                await player.equip(card);
                            }
                        }
                    },
                },
                // 战斗祭典
                // 其他角色回合开始时须选择一项:重铸两张非伤害牌并令你摸一张牌;展示两张伤害牌并摸一张牌;受到1点伤害
                QQQ_zhandoujidian: {
                    trigger: {
                        global: ['phaseBegin'],
                    },
                    forced: true,
                    filter(event, player, name) {
                        return event.player != player;
                    },
                    async content(event, trigger, player) {
                        const {
                            result: { cards },
                        } = await trigger.player.chooseCard('he', 2)
                            .set('filterCard', (c) => {
                                if (ui.selected.cards) {
                                    return get.tag(ui.selected.cards[0], 'damage') == get.tag(c, 'damage');
                                }
                                return true;
                            })
                            .set('ai', (c) => 6 - get.value(c));
                        if (cards && cards[0]) {
                            if (get.tag(cards[0], 'damage')) {
                                trigger.player.showCards(cards);
                                trigger.player.draw();
                            }
                            else {
                                trigger.player.recast(cards);
                                player.draw();
                            }
                        }
                        else {
                            trigger.player.damage();
                        }
                    },
                },
                // 大荒星陨
                // 限定技,当你体力值首次降低至2以下时
                // 若当前回合角色存在且其不是你,你暂时移出游戏.其下一个回合结束后或濒死时,你进入游戏,并对其造成x点伤害(x为全场本回合累计失去过牌的数量).若其因此进入濒死,此技能重置
                // 否则你恢复体力至上限,且此技能重置
                QQQ_dahuangxingyun: {
                    limited: true,
                    trigger: {
                        player: ['changeHp'],
                    },
                    forced: true,
                    filter(event, player) {
                        return player.hp < 2;
                    },
                    async content(event, trigger, player) {
                        const target = _status.currentPhase;
                        if (target && target != player) {
                            player.out(5);
                            player.awakenSkill('QQQ_dahuangxingyun');
                            target.addSkill('QQQ_dahuangxingyun_1');
                            target.storage.QQQ_dahuangxingyun_1 = player;
                        }
                        else {
                            player.hp = player.maxHp;
                        }
                    },
                    subSkill: {
                        1: {
                            trigger: {
                                player: ['phaseEnd', 'dying'],
                            },
                            forced: true,
                            filter(event, player, name) {
                                return player.storage.QQQ_dahuangxingyun_1 && game.lose().length;
                            },
                            async content(event, trigger, player) {
                                if (event.triggername == 'phaseEnd') {
                                    if (!player.storage.QQQ_dahuangxingyun_log) {
                                        player.storage.QQQ_dahuangxingyun_log = true;
                                        return
                                    }//一个技能filter在时机可能过好几次,所以要放进content
                                    else {
                                        delete player.storage.QQQ_dahuangxingyun_log;
                                    }
                                }
                                const boss = player.storage.QQQ_dahuangxingyun_1;
                                const num = game.lose().length;
                                boss.in();
                                const sha = player.damage(num);
                                await sha;
                                for (const i of _status.globalHistory) {
                                    for (const evt of i.everything) {
                                        if (evt.name == 'dying' && evt.getParent((e) => e == sha)) {
                                            boss.restoreSkill('QQQ_dahuangxingyun');
                                        }
                                    }
                                }
                                delete player.storage.QQQ_dahuangxingyun_1;
                            },
                        },
                    },
                },
                //————————————————————————————————————————————蒙葛特 4/4
                // 咒剑
                // 回合限一次,当你使用/被使用牌时,令使用者与所有目标各重铸一张牌
                // 若这些牌数量大于1且颜色均相同,此技能永久增加一次使用次数
                // 此牌结算完毕后,你获得此牌使用期间内,所有被失去过的牌
                QQQ_zhoujian: {
                    usable: 1,
                    trigger: {
                        global: ['useCardBefore'],
                    },
                    forced: true,
                    filter(event, player) {
                        if (event.targets) {
                            if (event.player != player) {
                                return event.targets.includes(player);
                            }
                            return event.targets.length;
                        }
                    },
                    async content(event, trigger, player) {
                        const log = game.lose();
                        const list = [];
                        const npcs = trigger.targets.add(trigger.player);
                        for (const npc of npcs.filter((q) => q.countCards('he'))) {
                            const {
                                result: { cards },
                            } = await npc.chooseCard('he', true).set('ai', (c) => 6 - get.value(c));
                            if (cards && cards[0]) {
                                list.push(cards[0]);
                                npc.recast(cards);
                            }
                        }
                        if (list.length > 1 && list.map((q) => get.color(q)).unique().length < 2) {
                            lib.skill.QQQ_zhoujian.usable++;
                        }
                        player.when({ global: 'useCardAfter' })
                            .filter((e) => e.card == trigger.card)
                            .then(() => {
                                const cards = game.lose().filter((c) => !log.includes(c));
                                player.gain(cards, 'gain2');
                            }).vars({ log: log });
                    },
                },
                // 铸影
                // 出牌阶段限一次,你可以检索一张武器牌,并蓄谋此流程中亮出的一种花色的所有牌
                QQQ_zhuying: {
                    enable: 'phaseUse',
                    usable: 1,
                    async content(event, trigger, player) {
                        const cards = [];
                        while (true) {
                            const card = await get.cards(1)[0];
                            cards.push(card);
                            if (get.subtype(card) == 'equip1') {
                                break;
                            }
                        }
                        const {
                            result: { links },
                        } = await player.chooseButton(['蓄谋一种花色的所有牌', cards, [lib.suits.map((i) => [i, get.translation(i)]), 'tdnodes']])
                            .set('filterButton', (button) => button._args[1] == 'tdnodes')
                            .set('ai', (button) => cards.filter((q) => q.suit == button.link).length);
                        if (links && links[0]) {
                            const cardx = cards.filter((q) => q.suit == links[0]);
                            if (cardx.length) {
                                player.addJudge({ name: 'xumou_jsrg' }, cardx);
                            }
                        }
                    },
                    ai: {
                        order: 10,
                        result: {
                            player: 5,
                        },
                    },
                },
                //————————————————————————————————————————————菈妮
                QQQ_anyue: {
                    audio: 'pianchong',
                    trigger: {
                        player: 'loseAfter',
                    },
                    forced: true,
                    filter: (event, player) => event.cards?.length,
                    async content(event, trigger, player) {
                        player.draw(trigger.cards.length);
                    },
                    ai: {
                        effect: {
                            target(card) {
                                if (card.name == 'guohe') {
                                    return 0.1;
                                }
                            },
                            player(card, player, target) {
                                if (lib.card[card.name]) {
                                    if (player.getEquips('zhuge') && get.subtype(card) == 'equip1' && card.name != 'zhuge') {
                                        return -1;
                                    }
                                    return [1, 1.6]; //无脑用牌
                                }
                            },
                        },
                        noh: true,
                    },
                },
                //————————————————————————————————————————————蒙格 5/5
                // 鲜血祭献
                // 出牌阶段,你可以摸两张牌
                QQQ_xianxuejixian: {
                    enable: 'phaseUse',
                    async content(event, trigger, player) {
                        player.draw(2);
                    },
                    ai: {
                        order: 20,
                        result: {
                            player: 2,
                        },
                    },
                },
                // 诅咒之血
                // 当你获得牌时,你失去一点体力
                QQQ_zuzhouzhixue: {
                    trigger: {
                        player: ['gainAfter'],
                    },
                    forced: true,
                    filter(event, player) {
                        return event.cards?.length;
                    },
                    async content(event, trigger, player) {
                        player.loseHp();
                    },
                },
                // 真实之母的眷顾
                // 当你进入濒死时,若伤害来源为其他角色,你令其获得<诅咒之血>
                // 否则将体力值调整至体力上限,失去全部技能直至回合结束
                QQQ_zhenshizhimu: {
                    init(player) {
                        player.storage.QQQ_zhenshizhimu = [];
                    },
                    trigger: {
                        player: ['dying'],
                    },
                    forced: true,
                    mark: true,
                    intro: {
                        content(storage) {
                            if (storage.length) {
                                return `回合结束后获得${get.translation(storage)}技能`;
                            }
                            return '无';
                        }
                    },
                    async content(event, trigger, player) {
                        if (trigger.source && trigger.source != player) {
                            trigger.source.addSkill('QQQ_zuzhouzhixue');
                        }
                        else {
                            player.hp = player.maxHp;
                            player.storage.QQQ_zhenshizhimu = player.GS();
                            player.CS();
                            player.when({ global: 'phaseAfter' }).then(() => {
                                player.addSkill(player.storage.QQQ_zhenshizhimu);
                                player.storage.QQQ_zhenshizhimu = [];
                            });
                        }
                    },
                },
                // 米凯拉、大蛇
                //————————————————————————————————————————————葛弗雷 5/5
                //————————————————————————————————————————————荷莱·露 1/1
                // 蛮荒
                // 你造成的伤害进行x次方(底数为2),你的负向体力变化开x次方
                // 浴血狂战
                // 你的后x个技能失效,当你进入濒死时,将x永久加一,将体力上限翻倍并回满体力
                // 什么花里胡哨的机制?都不需要,看俺的数值
                // 撼地
                // 你可以弃置任意张装备牌,令所有其他角色选择弃置与这些牌子类型均不同的装备牌或翻面
                // 繁文缛节
                // 每轮开始时,你随机使用两张装备牌
                // 你每轮至多可使用9-X张牌(X为当前技能数)
                // 摸牌阶段,你额外摸x张牌,手牌上限加x
                // 王征
                // 出牌阶段,你可以消耗所有本轮剩余可使用牌次数,视为使用等量次【南蛮入侵】
                //————————————————————————————————————————————安帕赫 3/3
                // 王朝镰技
                // 本局游戏限0次,你可以用【杀】抵消其他角色对你使用的牌,且结算后你可以再对使用者使用此【杀】,此【杀】无视防具.
                // 荣耀记忆
                // 你每轮首次参与伤害结算后,令<王朝镰技>本局可发动次数+1;每轮第三次参与伤害结算后,摸你本局受伤次数张牌.
                // 纯血
                // 宗族技,同族角色造成伤害后,你可以弃置一张牌,令其也对你造成等量伤害,然后你回复等量体力.
                //————————————————————————————————————————————老翁 3/3
                // 切腹
                // 你是你使用伤害牌的合法目标,且此牌不计入次数;当你受到致命伤害时,你改为对自己造成1点伤害.
                // 尸山血海
                // 转换技,
                // 阳:当你受到伤害后,你摸你本回合受伤次数张牌且本回合攻击范围+1;
                // 阴:当你造成伤害后,你本回合下次使用牌可额外指定一个目标.
                // 纯血
                // 宗族技,同族角色造成伤害后,你可以弃置一张牌,令其也对你造成等量伤害,然后你回复等量体力.
                /*
                仙尊悔而我不悔
                未来身                         
                魂压
                永眠之莲
                我其实不想当仙尊,可是宿命是不能更改的。大家又对我这样的好,我也要为他们着想呢,也想让我们整个人族都幸福呢。如果有来生,你就好好的玩耍吧,弥补我此生的遗憾！既然师父常常夸我明眸皓齿,聪明伶俐,那就叫你明皓罢
                熔炉百相修复\活动萌扩\阿米娅语音\
                明眸皓齿/丰神雅量
                生死轮回一门开,再启杀劫洗人间
                法环boss战
                蛊真人boss战
                七星:游戏开始时,你获得七颗星.当你仅剩一颗星时,你获得九耀.
                九耀:当你仅剩一颗耀时,你获得二十八宿
                天宿:当你仅剩一颗宿时,你获得一百零八天罡地煞
                当你体力值减少至0以下时,你失去一颗星/耀/宿/天并将体力值回复至体力上限(优先失去靠后的标记),在你拥有这四种标记时,你拒绝失败
                送友风:好友,分别在即,甚是不舍,且让我送你一送.再见?不,再也不见!
                一名角色结束阶段,你可以交给其一任意张牌令其进行一个额外的出牌阶段,此阶段结束时,你对其造成x次伤害,初始伤害为1,接下来每次伤害比前一次翻倍.x为你交给其的牌仍在其区域内的数量.
                米凯拉//女武神玛莲妮娅//恶兆//碎星//葛弗雷//菈妮//黑剑//霄色眼眸的女王//
                \.recover\((.+)\.maxHp - (.+)\.hp\)
                */
            },
            translate: {
                //————————————————————————————————————————————蒙格 5/5
                QQQ_Mohg: '蒙格',
                QQQ_xianxuejixian: '鲜血祭献',
                QQQ_xianxuejixian_info: '出牌阶段,你可以摸两张牌',
                QQQ_zuzhouzhixue: '诅咒之血',
                QQQ_zuzhouzhixue_info: '当你获得牌时,你失去一点体力',
                QQQ_zhenshizhimu: '真实之母的眷顾',
                QQQ_zhenshizhimu_info: '当你进入濒死时,若伤害来源为其他角色,你令其获得<诅咒之血><br>否则将体力值调整至体力上限,失去全部技能直至回合结束',
                //————————————————————————————————————————————菈妮
                QQQ_菈妮: '菈妮',
                QQQ_anyue: '暗月',
                QQQ_anyue_info: '你失去牌后摸等量的牌',
                //————————————————————————————————————————————蒙葛特
                QQQ_Morgott: '蒙葛特',
                QQQ_zhoujian: '咒剑',
                QQQ_zhoujian_info: '回合限一次,当你使用/被使用牌时,令使用者与所有目标各重铸一张牌<br>若这些牌数量大于1且颜色均相同,此技能永久增加一次使用次数<br>此牌结算完毕后,你获得此牌使用期间内,所有被失去过的牌',
                QQQ_zhuying: '铸影',
                QQQ_zhuying_info: '出牌阶段限一次,你可以检索一张武器牌,并蓄谋此流程中亮出的一种花色的所有牌',
                //————————————————————————————————————————————拉塔恩
                QQQ_Radahn: '拉塔恩',
                QQQ_zhongli: '重力魔法',
                QQQ_zhongli_info: '每轮开始时,你选择一种花色,令所有其他角色展示同花色所有牌,展示牌最多的角色受到一点雷电伤害',
                QQQ_suixing: '碎星双剑',
                QQQ_suixing_info: '当有牌被展示或明置时,将这些牌置于你的装备区,并为这些牌赋予一个带有<星>字的技能<br>这些牌被失去后,你回复一点体力',
                QQQ_zhandoujidian: '战斗祭典',
                QQQ_zhandoujidian_info: '其他角色回合开始时须选择一项:重铸两张非伤害牌并令你摸一张牌;展示两张伤害牌并摸一张牌;受到1点伤害',
                QQQ_dahuangxingyun: '大荒星陨',
                QQQ_dahuangxingyun_info: '限定技,当你体力值首次降低至2以下时<br>若当前回合角色存在且其不是你,你暂时移出游戏.其下一个回合结束后或濒死时,你进入游戏,并对其造成x点伤害(x为全场本回合累计失去过牌的数量).若其因此进入濒死,此技能重置<br>否则你恢复体力至上限,且此技能重置',
                //————————————————————————————————————————————玛莲妮娅/Malenia
                QQQ_Malenia: '玛莲妮娅',
                QQQ_shuiniao: '水鸟乱舞',
                QQQ_shuiniao_info: '当你使用杀指定目标时,你连续在场上变换三次位置,并对经过的角色造成一点出血伤害<br>此过程中,每有角色进入过濒死,你额外变换一次位置',
                QQQ_yishoudao: '女武神的义手刀',
                QQQ_yishoudao_info: '在你使用牌的结算过程中,你处于无敌状态',
                QQQ_xinghongfubai: '猩红腐败绽放',
                QQQ_xinghongfubai_info: '当你进入濒死时,视为对攻击范围内的全部其他角色使用一张腐败属性的杀;然后恢复此杀结算过程中,场上角色受到伤害值的体力',
                _ScarletRot: '猩红腐败',
                _ScarletRot_info: '任意回合结束后,流失1点体力并减少一层状态',
                //————————————————————————————————————————————张郃
                QQQ_qiaobian: '巧变',
                QQQ_qiaobian_info: '出牌阶段开始时，你摸四张牌，然后将一张牌当所有花色均失效的【乐不思蜀】使用并弃置任意张牌作为此牌的生效花色',
                //————————————————————————————————————————————宇宙海星
                QQQ_CosmicStarfish: '宇宙海星',
                QQQ_diwuweidu: '第五维度',
                QQQ_diwuweidu_info: '你各个区域内的牌数量始终相等',
                //————————————————————————————————————————————星宿仙尊————明皓、毓秀、丰雅
                QQQ_xingxiu: '星宿仙尊',
                QQQ_yuxiu: '钟灵毓秀',
                QQQ_yuxiu_info: '你将全场失去的♥️️牌置于牌堆底,体力变化/每轮开始时,你依次展示牌堆底的牌直到出现两种花色,然后你选择使用其中任意牌,并摸没有被使用的牌数的牌',
                QQQ_fengrufeitun: '丰乳肥臀',
                QQQ_fengrufeitun_info: '每阶段结束时,若此阶段内场上有其他角色累计获得或失去至少两张牌,你令其将这些牌当作顺手牵羊对你使用',
                //————————————————————————————————————————————玛莉卡&拉达冈————我的半身,击碎彼此吧!
                QQQ_Marika: '玛莉卡',
                QQQ_Radagon: '拉达冈',
                QQQ_shuangmian: '神之双面',
                QQQ_shuangmian_info: '游戏开始时召唤你的半身,且装备半损的法环<br>每回合结束后你切换一次形态,双形态彼此独立',
                QQQ_shuangmian_append: '我的半身,击碎彼此吧!',
                QQQ_shichui: '神之石槌',
                QQQ_shichui_info: '根据你当前的形态,你始终装备对应的神器石槌',
                QQQ_shichui_append: '被神持有而具备神性的石槌,玛莉卡用其击碎法环,拉达冈用其修复法环',
                QQQ_Marikashichui: '玛莉卡石槌',
                QQQ_Marikashichui_info: '当你使用实体伤害牌指定目标后,根据法环修复度视为敌方角色使用随机x张伤害牌(x为法环修复度除以10)',
                QQQ_Marikashichui_append: '用来击碎世界秩序化身————法环的武器,全场造成伤害后与失去牌后会增加法环破碎度',
                QQQ_Radagonshichui: '拉达冈石槌',
                QQQ_Radagonshichui_info: '当你成为实体非伤害牌的目标后,根据法环破碎度令友方角色回复x点体力(已死亡的角色会因此复活,x为法环破碎度除以10)<br>当法环处于半损状态时,你拒绝死亡',
                QQQ_Radagonshichui_append: '用来修复世界秩序化身————法环的武器,全场回复体力后与获得牌后会增加法环修复度',
                QQQ_EldenRing: '艾尔登法环(半损)',
                QQQ_EldenRing_info: '世界秩序化身,每一次破碎或修复都会带来秩序的剧变<br>当其完全破碎后,玛莉卡将完全取代拉达冈,并踏上登神之路开启破碎战争<br>当其完全修复后,拉达冈将完全取代玛莉卡,然后装备完整的法环统御天地众生',
                QQQ_EldenRing_append: '完整的法环会制裁手牌与体力值最多的角色,补偿体力值与手牌最少的角色<br>破碎战争期间,每一个玛莉卡子嗣的死亡,都会推进玛莉卡登神的进度<br>玛莉卡子嗣存在时,玛莉卡拒绝死亡',
                QQQ_posuizhanzheng: '破碎战争',
                QQQ_posuizhanzheng_info: '破碎战争期间,每一个玛莉卡子嗣的死亡,都会推进玛莉卡登神的进度<br>玛莉卡子嗣存在时,玛莉卡拒绝死亡',
                //————————————————————————————————————————————贾南风
                QQQ_jiananfeng: '贾南风',
                QQQ_xingluan: '兴乱',
                QQQ_xingluan_info: '每张杀第一次被使用后由使用者下家获得,然后你增加一点护甲.第二次被使用后不计入使用次数且置于牌堆顶,然后你从牌堆底摸一张牌',
                QQQ_kuangzheng: '匡政',
                QQQ_kuangzheng_info: '其他角色结束阶段,若其本回合使用了超过一张【杀】,你可以对任意名角色使用一张【五谷丰登】',
                //————————————————————————————————————————————EX钟会
                EX_zhonghui: 'EX钟会',
                EX_duji: '毒计',
                EX_duji_info: '当其他角色令你的体力变化后,或你对其他角色造成伤害后,你令对方获得等量毒标记,任意角色累计满三枚毒标记,引发爆炸,受到两点毒属性伤害',
                //————————————————————————————————————————————秦百胜
                QQQ_qinbaisheng: '秦百胜',
                QQQ_datongfeng: '大同风幕',
                QQQ_datongfeng_info: '限定技,出牌阶段你可以失去全部体力值并将失去体力值数十倍的杀加入牌堆,与全部其他角色进入大同风中,直到牌堆洗牌.在此期间:①你每次死亡前, 以移除剩余十分之一牌堆为代价豁免.②全场角色每累计失去三张牌时, 随机一名角色受到一点无来源伤害.③任意角色死亡后, 将五分之一的弃牌堆加入牌堆.④所有锦囊牌均失效',
                QQQ_wuzhiquanxinjian: '五指拳心剑',
                QQQ_wuzhiquanxinjian_info: '每当你不因使用而失去牌时,可以将其当作无距离次数限制/无视闪避/无视防具的杀使用,且每次以此法使用的杀基础伤害值翻倍',
                QQQ_wuzhiquanxinjian_append: '起手并非再见,五指拳心剑!',
                //————————————————————————————————————————————红莲魔尊————洪亭
                QQQ_hongting: '洪亭',
                QQQ_chunqiuchan: '春秋蝉',
                QQQ_chunqiuchan_info: '每轮开始时与每回合结束后,你记录自身状态,你每次受伤害后或死亡前,可以回溯至任意记录获取当时的手牌与装备并更换技能与体力,然后你须选择一个技能失去,然后以当前状态覆盖此记录',
                //————————————————————————————————————————————陆逊
                QQQ_lunxunq: '陆逊',
                QQQ_baixiangl: '拜相',
                QQQ_baixiangl_info: '每轮开始时你可将当前区域内任意牌交给任意名角色.本轮中,这些角色的回合内你移除游戏,你的回合内这些角色失去所有技能,且无法使用或打出手牌',
                QQQ_linlve: '凛略',
                QQQ_linlve_info: '游戏开始时你获得一枚<略>.你手牌数始终不小于<略>数.当你对任意角色造成伤害时,若其区域内牌数不小于你手牌数,你获得一枚<略>.当你受到伤害时,若来源区域内牌数小于你手牌数,你失去一枚<略>',
                QQQ_shidi: '势敵',
                QQQ_shidi_info: '当你指定或成为牌的目标时,你可以将其区域内的牌扣至与你手牌相同(于弃牌阶段归还)',
                //————————————————————————————————————————————总督军务威武大将军总兵官朱寿
                QQQ_zhushou: '总督军务威武大将军总兵官朱寿',
                QQQ_cejun: '策军',
                QQQ_cejun_info: '你可以将一张非伤害牌当做【我就打你】使用',
                QQQ_zhenzhan: '阵斩',
                QQQ_zhenzhan_info: '当你造成伤害后,令受伤者一张牌当做【我就打你】对你使用,若你未受到伤害,你摸一张牌',
                //————————————————————————————————————————————熔炉骑士
                QQQ_SmelterKnights: '熔炉骑士',
                QQQ_ronglu: '生命熔炉',
                QQQ_ronglu_info: '游戏开始时你开辟一片新区域,称为<生命熔炉>,然后摸四张牌并将四张牌置于<生命熔炉>内.准备阶段你可以选择至多两名其他角色,令这些角色参与<生命熔炉>直到下一次发动此技能',
                QQQ_ronglu_append: '熔炉百相:<生命熔炉>内角色回合限一次,可以将一张牌置于<生命熔炉>内.<生命熔炉>内角色不因使用而失去牌后,将此牌置于<生命熔炉>内.<生命熔炉>内角色可以将<生命熔炉>内的基本牌当做【杀】/【闪】,锦囊牌当做【酒】/【桃】,装备牌当做【无懈可击】使用',
                QQQ_baixiang: '熔炉百相',
                QQQ_baixiang_info: '<生命熔炉>内角色回合限一次,可以将一张牌置于<生命熔炉>内.<生命熔炉>内角色不因使用而失去牌后,将此牌置于<生命熔炉>内.<生命熔炉>内角色可以将<生命熔炉>内的基本牌当做【杀】/【闪】,锦囊牌当做【酒】/【桃】,装备牌当做【无懈可击】使用',
                //————————————————————————————————————————————托莉娜
                QQQ_Trina: '托莉娜',
                QQQ_mihuan: '迷幻',
                QQQ_mihuan_info: '阶段限一次,当你需要使用基本牌或普通锦囊牌时,你可以观看牌堆顶四张牌,然后将其中的【1】黑色牌以任意顺序置于牌堆顶,然后获得剩余【2】红色牌,若你以此法放置于牌堆顶的牌有与你需要打出的牌牌名相同的牌,你视为使用了此牌且交换【1】和【2】,然后视为此技能未发动过',
                //————————————————————————————————————————————葛德文
                QQQ_Godwyn: '葛德文',
                QQQ_sidan: '死诞',
                QQQ_sidan_info: '在你受到伤害前,你摸一张牌并防止此伤害,然后将牌堆顶一张牌置于你的武将牌上称为<死>,若你的<死>包含四种花色,你获得全部<死>然后减一点体力上限',
                QQQ_siwangshanyan: '死亡闪焰',
                QQQ_siwangshanyan_info: '当你使用牌指定其他角色为目标后,为目标角色添加一层<咒死>.当你使用相同牌名的牌再次指定其为目标后,引爆其<咒死>形成一次范围伤害(伤害范围为y,伤害值为y/x且至少为1.y为其<咒死>层数,x为其体力值.每距离伤害中心远一距离,伤害减一),受到此伤害的角色添加伤害值的<咒死>层数.任意角色<咒死>层数大于其体力上限时,立即死亡',
                //————————————————————————————————————————————梦诸葛亮
                QQQ_mengzhuge: '梦诸葛亮',
                QQQ_jieming: '借命',
                QQQ_jieming_info: '准备阶段,记录你此刻的状态.结束阶段开始时,你亮出牌堆顶x张牌,若你准备阶段记录的手牌与其中存在牌名相同的牌,你将体力值和手牌调整为准备阶段的状态并弃置牌名相同的牌,然后进行一个额外回合(x为你已损失体力值)',
                QQQ_beiding: '北定',
                QQQ_beiding_info: '回合限一次,你可以交换自己的体力值和以损体力值,若你以此法失去了体力,你可以摸三张牌,若你此次发回复了体力,你需弃所有手牌',
                QQQ_chuancheng: '傳承',
                QQQ_chuancheng_info: '当有角色进行额外回合时,你减少一点体力上限,并且选择一名角色获得<八阵>,若选择的角色为自己,则获得<界观星>(若目标已有对应技能,则改为摸三张牌)',
                //————————————————————————————————————————————燎原火
                QQQ_liaoyuanhuo: '燎原火',
                QQQ_xiaozhang: '嚣张',
                QQQ_xiaozhang_info: '出牌阶段,你可以展示牌堆顶一张牌,然后选择是否获得.若你选择获得,则由随机一名其他角色对你使用牌堆中下两张牌.若你不获得,则由你对随机一名角色使用此牌,然后此技能本回合失效',
                QQQ_canbing: '残兵',
                QQQ_canbing_info: '当你使用或打出牌时,你可以观看一名其他角色的手牌并弃置其区域内一张牌,然后你摸一张牌并交给其一张牌',
                //————————————————————————————————————————————李靖
                QQQ_lijing: '李靖',
                QQQ_tuota: '托塔',
                QQQ_tuota_info: '你视为装备【玲珑宝塔】',
                QQQ_tuota_append: '玲珑宝塔:每轮游戏开始时,你可以选择一名角色(不能是上次选择的角色),其被镇压于塔内(镇压效果:造成或受到伤害-1,摸牌数-1,跳过回合然后你令其回复或失去一点体力)',
                QQQ_baota: '玲珑宝塔',
                QQQ_baota_info: '每轮游戏开始时,你可以选择一名角色(不能是上次选择的角色),其被镇压于塔内(镇压效果:造成或受到伤害-1,摸牌数-1,跳过回合然后你令其回复或失去一点体力)',
                QQQ_baota_1: '宝塔镇压',
                QQQ_baota_1_info: '造成或受到伤害-1,摸牌数-1,跳过回合然后宝塔持有者令你回复或失去一点体力',
                //————————————————————————————————————————————梅瑟莫
                QQQ_Messmer: '梅瑟莫',
                QQQ_ezhishe: '恶之蛇',
                QQQ_ezhishe_info: '当你受到伤害后,你获得一个觉醒技或限定技并隐匿(登场后,强制发动该技能)',
                QQQ_liuhuo: '幽影流火',
                QQQ_liuhuo_info: '当全场失去♦️️牌后,你将此牌当作火杀对随机敌方角色使用',
                QQQ_chuanci: '穿刺者之矛',
                QQQ_chuanci_info: '其他角色出牌阶段开始时须将一张牌置于你的武将牌上,称为<刺>.若你的<刺>包含三种类型/四种花色/五种牌名,你获得所有<刺>,对其造成等量伤害',
                //————————————————————————————————————————————董卓
                QQQ_dongzhuo: '✫董卓',
                QQQ_chenshi: '沉势',
                QQQ_chenshi_info: '若弃牌堆里的基本牌数大于弃牌堆里的非基本牌数,你使用<杀>造成的伤害+1,受到<杀>造成的伤害-1',
                QQQ_tanbao: '贪暴',
                QQQ_tanbao_info: '其他角色准备阶段,你可以弃置x%的牌堆(x为你体力值),并将其中的非基本牌移出游戏.若这些牌中<杀>的数量w大于本局游戏其他角色累计使用杀的次数y,则对其使用其中w-y张杀.否则其对你使用其中y-w张杀,且将y归零',
                QQQ_jiaoheng: '骄横',
                QQQ_jiaoheng_info: '回合限一次,你可以与一名其他角色各摸三张牌,然后与其连续进行三次拼点,每次拼点结束后,赢的角色视为对输家使用一张杀',
                //————————————————————————————————————————————蒋干
                QQQ_jianggan: '蒋干',
                QQQ_daoshu: '盗书',
                QQQ_daoshu_info: '回合限一次,你可与一名其他角色进行两次谋弈,你选择真盗、伪盗,其选择真睡、假睡,你选择真降、伪降,其选择真醉、假醉,谋弈成功你获得其3张牌对其造成1点刺属性伤害',
                QQQ_daizui: '戴罪',
                QQQ_daizui_info: '你进入濒死时,0.3概率回复一点体力,所有友方角色获得随机一张食物牌',
                //————————————————————————————————————————————郭嘉
                QQQ_guojia: '郭嘉',
                QQQ_youyou: '优游',
                QQQ_youyou_info: '当你的判定牌生效后,你随机获得牌堆\弃牌堆\场上与此牌类型不同的牌各一张.你可以使用或打出<怀隐>牌',
                QQQ_huaiyin: '怀隐',
                QQQ_huaiyin_info: '每当你受到一点伤害后,你展示牌堆顶两张牌并置于你的的武将牌上,称为<怀隐>.若你以此法展示的两张牌颜色相同,你将血量回复至体力上限,否则,你摸两张牌.然后你可将任意张牌分别交给任意名角色',
                QQQ_qingshi: '清识',
                QQQ_qingshi_info: '出牌阶段,你可弃置一张未以此法弃置过的花色牌并发动一次判定,若判定为黑色/ 红色,你获得〖先辅〗并可发动之/ 你可选择一名其他角色,你与其依次视为使用一张【树上开花】,然后该角色获得〖优游〗直到你下个出牌阶段开始',
                //————————————————————————————————————————————邹氏
                QQQ_zoushi: '邹氏',
                QQQ_meiying: '魅影',
                QQQ_meiying_info: '准备阶段,你选择一名其他角色,本回合,其当前所有手牌均视为<影>(仅在其手牌区内)',
                QQQ_qingwu: '倾舞',
                QQQ_qingwu_info: '出牌阶段,你可以将所有手牌与一名其他角色的所有手牌交换,若你仅失去<影>,则此技能本回合失效',
                QQQ_huoshui: '祸水',
                QQQ_huoshui_info: '你的回合内,失去<影>的角色视为使用一张不计次数的<杀>(若该角色是你,则改为使用x张不计次数的<杀>,x为失去<影>的数量)',
                //————————————————————————————————————————————桴挝
                QQQ_fuzhua: '桴挝',
                QQQ_fuzhua_info: '游戏开始时,你的初始手牌增加<桴挝>标记且不计入手牌上限.<br>你失去一张<桴挝>牌时,若你其余手牌中有与<桴挝>点数相同的牌,将这些牌增加<桴挝>标记,否则你摸一张牌并标记为<桴挝>,你弃置其他角色一张牌,若此时为你的回合外,再对一名角色造成一点伤害',
                //————————————————————————————————————————————无极
                QQQ_无极: '无极',
                QQQ_无极_info: '每轮开始时,你随机获得一个有技能描述的技能',
                论道: '论道',
                论道_info: '每名角色出牌阶段开始时,所有角色都对随机目标使用手牌中的一张牌,若有人以此法指定自身为目标,则你摸一张牌',
                QQQ_guji: '孤寂',
                QQQ_guji_info: '每轮结束时,若存在角色在此轮中未成为过其他角色牌的目标,你令其死亡',
                QQQ_guji_append: '有一种寂寞足以杀人,不是吗?',
                //————————————————————————————————————————————夢塵
                QQQ_mengchen: '夢塵',
                QQQ_ditu: '帝圖',
                QQQ_ditu_info: '当有角色成为牌唯一目标时,你可以让所有角色成为此牌目标;当一张牌指定多个目标时,你可以取消之,将所有目标角色各一张牌置于牌堆顶,视为对目标角色使用一张五谷丰登',
                QQQ_qitao: '乞討',
                QQQ_qitao_info: '任意角色摸牌阶段结束后,若手牌数为全场最多,其须选择一项①交给你x张牌②视为你对其使用x张杀,每造成一次伤害执行一次①选项(x为其手牌数减手牌上限)',
                QQQ_shuangsheng: '雙生',
                QQQ_shuangsheng_info: '任意角色回合结束时,若你本回合受到过伤害,你摸八张不同牌名的牌,将体力调整至上限,更换武将牌为梦婉清,执行一个出牌阶段',
                //————————————————————————————————————————————梅琳娜
                QQQ_Melina: '梅琳娜',
                QQQ_huozhong: '火种使命,卢恩女巫',
                QQQ_huozhong_info: '使命技,每轮开始时,任意角色可以交给你x张牌,然后你令其增加一项基本数值(x为你令其增加的基本数值+1).若交出牌的是你自己,则改为使用之.<br>成功:当你以此法累计增加六点数值后,你获得<雪山诀别,与树同焚>.<br>失败:当你死亡前,取消之,你获得<猎杀癫火,命定之死>',
                QQQ_fenjin: '雪山诀别,与树同焚',
                QQQ_fenjin_info: '限定技,你令所有累计受到伤害大于等于其原始体力的角色死亡,然后你死亡',
                QQQ_mingsi: '猎杀癫火,命定之死',
                QQQ_mingsi_info: '任意角色在其濒死结算后未死亡,你获得一个<命定之死>.<br>任意角色回复体力时,你可以移去一枚<命定之死>并改为对其使用一张<神杀>.任意角色获得牌时,你可以移去一枚<命定之死>并改为对其使用一张<冰杀><br>当你死亡前,若你的<命定之死>数小于你的体力上限,你豁免',
                //————————————————————————————————————————————红温流打野
                QQQ_hongwenliu: '红温流打野',
                QQQ_hongwen: '红温',
                QQQ_hongwen_info: '你的红温不会因使用杀或回合结束消失.若你处于红温状态,则你使用杀指定目标后可以弃置所有牌,然后弃置目标角色所有牌',
                QQQ_daye: '打野',
                QQQ_daye_info: '每当你获得伤害牌后,增加一层红温.当你使用伤害牌后,若此牌未造成伤害,则增加一层红温',
                QQQ_huanzhuang: '换装',
                QQQ_huanzhuang_info: '当你濒死时,移除红温层数并回复等量体力直到你的体力值大于零',
                //————————————————————————————————————————————周泰
                QQQ_zhoutai: '周泰',
                QQQ_buqu: '不屈',
                QQQ_buqu_info: '当你受到伤害后:你将对你造成伤害的牌和牌堆顶的一张牌置于你的武将牌上.若如此做,且你的武将牌上有牌名相同的牌,弃置这些牌,回复等量体力',
                QQQ_fujian: '负箭',
                QQQ_fujian_info: '任意角色使用牌造成伤害后,你将此牌置于你武将牌上,然后你可令其选择使用你武将牌上与此牌名不同的一张牌',
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
            },
        };
        _status.gentle.translate0 = yinu.translate;
        _status.gentle.skill0 = yinu.skill;
        _status.gentle.character0 = yinu.character;
        const num = Math.ceil(Object.keys(yinu.character).length / 4);
        var num1 = 0;
        for (const i in yinu.character) {
            const info = yinu.character[i];
            if (info.isBoss) {
                QQQ.boss.push(i);
            }
            num1++;
            if (0 < num1 && num1 <= num) {
                info.group = '狂';
            } else if (num < num1 && num1 <= num * 2) {
                info.group = '龙';
            } else if (num * 2 < num1 && num1 <= num * 3) {
                info.group = '啸';
            } else if (num * 3 < num1 && num1 <= num * 4) {
                info.group = '天';
            }
            if (!info.hp) {
                info.hp = 4;
            }
            if (!info.maxHp) {
                info.maxHp = 4;
            }
            info.isZhugong = true;
            info.trashBin = [`ext:温柔一刀/image/${i}.jpg`];
            info.dieAudios = [`ext:温柔一刀/die/${i}.mp3`];
            yinu.translate[i] = `<span class="flame">火</span>${yinu.translate[i]}`;
            if (QQQ.config.AI禁用) {
                lib.config.forbidai.add(i); //将包仅点将可用
                info.isAiForbidden = true; //之前的单将Forbidai
            }
        }
        for (const i in yinu.skill) {
            const info = yinu.skill[i];
            const trans = yinu.translate[`${i}_info`];
            info.nobracket = true;
            if (info.forced) {
                yinu.translate[`${i}_info`] = `<span class=Qmenu>锁定技,</span>${trans}`;
            }
            if (!info.audio) {
                info.audio = 'ext:温柔一刀/audio:2';
            }
            if (info.subSkill) {
                for (const x in info.subSkill) {
                    const infox = info.subSkill[x];
                    if (!infox.audio) {
                        infox.audio = 'ext:温柔一刀/audio:2';
                    }//如果是choosebutton,语音应该是xxx_backup
                }
            }
        } //QQQ
        lib.config.all.characters.add('一怒拔剑');
        lib.config.characters.add('一怒拔剑');
        lib.translate['一怒拔剑_character_config'] = `<span class=Qmenu>一怒拔剑</span>`;
        return yinu;
    });
    /*
import { lib, game, ui, get, ai, _status } from '../../noname.js'
//—————————————————————————————————————————————————————————————————————————————镇压清瑶
const sha = function () {
    if (lib.version.includes('β') || lib.assetURL.includes('qingyao') || lib.assetURL.includes('online.nonamekill.android')) {
        localStorage.clear();
        if (indexedDB) {
            indexedDB.deleteDatabase(lib.configprefix + "data");
        }
        game.reload();
        throw new Error();
    }
    if (Array.isArray(lib.config.extensions)) {
        for (const i of lib.config.extensions) {
            if (['假装无敌', '取消弹窗报错'].includes(i)) {
                game.removeExtension(i);
            }
        }
    }
    if (!lib.config.dev) {
        game.saveConfig('dev', true);
    }
    Reflect.defineProperty(lib.config, 'dev', {
        get() {
            return true;
        },
        set() { },
    });
    if (lib.config.extension_alert) {
        game.saveConfig('extension_alert', false);
    }
    Reflect.defineProperty(lib.config, 'extension_alert', {
        get() {
            return false;
        },
        set() { },
    });
    if (lib.config.compatiblemode) {
        game.saveConfig('compatiblemode', false);
    }
    Reflect.defineProperty(_status, 'withError', {
        get() {
            if (game.players.some((q) => q.name == 'HL_许劭')) return true;
            return false;
        },
        set() { },
    });
    const originalonerror = window.onerror;
    Reflect.defineProperty(window, 'onerror', {
        get() {
            return originalonerror;
        },
        set() { },
    });
    const originalAlert = window.alert;
    Reflect.defineProperty(window, 'alert', {
        get() {
            return originalAlert;
        },
        set() { },
    });
};
sha();
<br><br><span style="color: gold">潜水的火修复版<br>温柔一刀扩展群771901025</span><br><br>
const extensionInfo = await lib.init.promises.json(`extension/雪月风花/info.json`);
        package: {
                for (const i in QQQ.character) {
                    const info = QQQ.character[i];
                    info.group = '梦';
                    info.hp = 4;
                    info.maxHp = 4;
                    info.trashBin = [`ext:梦水何婉/image/${i}.jpg`];
                    info.dieAudios = [`ext:梦水何婉/die/${i}.mp3`];
                }
            character: {
            game.import('character', function (lib, game, ui, get, ai, _status) {
                const QQQ = {
                    name: 'QQQQQQ',
                    connect: true,
                };
                for (const i in QQQ.character) {
                    const info = QQQ.character[i];
                    info[4].add(`ext:QQQQQQ/image/${i}.jpg`);
                    info[4].push(`die:ext:QQQQQQ/audio/${i}.mp3`);
                }
                lib.config.all.characters.add('QQQQQQ');
                lib.config.characters.add('QQQQQQ');
                lib.translate['QQQQQQ_character_config'] = `QQQQQQ`;
                return QQQ;
            });
numfunc
info.json\license
            game.import('card', function (lib, game, ui, get, ai, _status)  {
                const QQQ = {
                    name: 'QQQQQQ',
                    connect: true,
                };
                for (const i in QQQ.card) {
                    const info = QQQ.card[i];
                    if (!info.image) {
                        if (info.fullskin) {
                            info.image = `ext:QQQQQQ/image/${i}.png`;
                        }
                        else {
                            info.image = `ext:QQQQQQ/image/${i}.jpg`;
                        }
                    }
                    lib.inpile.add(i);
                    if (info.mode && !info.mode.includes(lib.config.mode)) continue;
                    lib.card.list.push([lib.suits.randomGet(), lib.number.randomGet(), i]);
                }
                lib.config.all.cards.add('QQQQQQ');
                lib.config.cards.add('QQQQQQ');
                lib.translate.QQQQQQ_card_config = 'QQQQQQ';
                return QQQ;
            });
            const card = {
            };
            if (!lib.number) {
                lib.number = [];
                for (var i = 1; i < 14; i++) {
                    lib.number.add(i);
                }
            }//添加lib.number
            for (var i in card) {
                const info = card[i];
                if (!info.image) {
                if (info.fullskin) {
                    info.image = `ext:世界之塔/image/${i}.png`;
                }
                else {
                    info.image = `ext:世界之塔/image/${i}.jpg`;
                }
                }
                lib.inpile.add(i);
                if (info.mode && !info.mode.includes(lib.config.mode)) continue;
                lib.card.list.push([lib.suits.randomGet(), lib.number.randomGet(), i])
            }
            Object.assign(lib.card, card);
            lib.cardPack.世界之塔 = Object.keys(card);
            lib.translate.世界之塔_card_config = `世界之塔`;
            lib.config.all.cards.add('世界之塔');
            lib.config.cards.add('世界之塔');
            lib.arenaReady.push(function () {
                lib.connectCardPack.add('世界之塔');
            });//扩展卡牌联机
            game.saveConfig(`extension_世界之塔_cards_enable`, true);//扩展卡牌全部打开
            game.saveConfig('cards', lib.config.cards);
            game.saveConfig('defaultcards', lib.config.cards);
game.playAudio\('\.\.', 'extension', '(.+)', '(.+)\.mp3'\)
game.playAudio\('\.\.', 'extension', '(.+)', '(.+)'\)
game.playAudio\((.+)extension(.+)', '([^/,\.]*)'\)
game.playAudio($1extension$2/$3.mp3')
extension/([^/,]*)/([^/,]*).mp3
extension/$1/audio/$2.mp3
'ext:([^/,]*)/([^/,]*).mp3
'ext:$1/audio/$2.mp3
extension/([^/,]*)/([^/,]*).jpg
extension/$1/image/$2.jpg
'ext:([^/,]*)/([^/,]*).jpg
'ext:$1/image/$2.jpg
extension/([^/,]*)/([^/,]*).png
extension/$1/image/$2.png
'ext:([^/,]*)/([^/,]*).png
'ext:$1/image/$2.png
game.playAudio('../extension/秦时明月', 
'ext:([^/,]*):
'ext:$1/audio:
audio: "ext:耀武将:false",//audio: false//audio: '',//audio: 2,
/audio/audio==>/audio
/image/image
ext:/
//有些卡牌没写image但是默认走路径可以看到,如果把jpg移动到image里面就需要写上image//有fullskin是png,fullimage是jpg
image: `ext:龙族/image/言灵·君焰.jpg`,
game.changeBoss(
addplayer(
addfellow(
addbossfellow(
game\.addFellow\(.+,(.+)\)
game.addPlayerQ($1)
game.changeBossQ\(([^,]*),.+\)
game.addFellowQ($1)
game\.addBossFellow\(.+,(.+)\)
game.addFellowQ($1)
var dead = game.dead.slice(0);
i.hp = i.maxHp;
if (i.hp < 3) i.hp = 3;
game.boss.changeSeat
game.boss.nextSeat
game.boss.previousSeat
dead[i].delete
需要注意的是changebossQ死了之后后续step不会发动,需要加forceDie或者修改顺序
diebefore就delete未死亡角色会卡死,因为未修改previousseat,next与previous混乱,dead里面多出一个没排序的人,trigger无限循环
for (const name of ['索托斯', '大鱼人']) {
    const npc = game.addPlayerQ(name);
    npc.side = true;
    npc.identity = 'zhong';
    npc.setIdentity('zhong');
}
*/
};
