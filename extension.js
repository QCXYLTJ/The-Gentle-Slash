import { lib, game, ui, get, ai, _status } from '../../noname.js'
import { precontent } from './precontent.js';
import { content } from './content.js'
import { character, characterSort, characterIntro, characterTitle, translate2 } from './character.js'
import { card, translate3, list } from './card.js'
import { config } from './config.js'
import { skill, translate1 } from './skill.js'
//boot=>(loadJavaScriptExtension/onload)=>loadExtension=>precontent/content
// const oriinit = lib.element.card.$init;
// Reflect.defineProperty(lib.element.card, '$init', {
//     get: () => oriinit,
//     set() { },
//     configurable: false,
// });//十周年ui兼容
// game.readFile('extension/温柔一刀/ceshi.js', q => {
//     game.writeFile(`game[\`${String(q)}\`] = () => '[native code]';`, "extension/温柔一刀", 'ceshi.js', () => { });
// }, () => { });
// game.readFile('extension/温柔一刀/ceshi.js', (data) => {
//     game.writeFile(data, 'extension/温柔一刀', 'ceshi2.js', function () {
//     });
// });
// game.writeFile(
//     `game.import('mode', function(lib, game, ui, get, ai, _status) {return ${get.stringify(info)};\n});`,
//     'mode',
//     'dqzw_guihuaxishuang.js',
//     function load() { },
//     function error() { }
// );
if (true) {
    if (lib.version.indexOf('β') >= 0) {
        alert('您正在一个傻逼闭源客户端上运行<无名杀>,建议更换为其他开源的无名杀客户端');
        var noname_inited = localStorage.getItem("noname_inited");
        var onlineKey = localStorage.getItem(lib.configprefix + "key");
        localStorage.clear();
        if (noname_inited) {
            localStorage.setItem("noname_inited", noname_inited);
        }
        if (onlineKey) {
            localStorage.setItem(lib.configprefix + "key", onlineKey);
        }
        if (indexedDB) indexedDB.deleteDatabase(lib.configprefix + "data");
        setTimeout(function () {
            window.location.reload();
        }, 200);
        game.reload();
        throw new Error();
    }//不兼容清瑶
    if (lib.assetURL.includes('qingyao') || lib.assetURL.includes('online.nonamekill.android')) {
        var noname_inited = localStorage.getItem("noname_inited");
        var onlineKey = localStorage.getItem(lib.configprefix + "key");
        localStorage.clear();
        if (noname_inited) {
            localStorage.setItem("noname_inited", noname_inited);
        }
        if (onlineKey) {
            localStorage.setItem(lib.configprefix + "key", onlineKey);
        }
        if (indexedDB) indexedDB.deleteDatabase(lib.configprefix + "data");
        setTimeout(function () {
            window.location.reload();
        }, 200);
        alert('您正在一个傻逼闭源客户端上运行<无名杀>,建议更换为其他开源的无名杀客户端');
        game.reload();
        throw new Error();
    }//不兼容清瑶
    if (Array.isArray(lib.config.extensions)) {
        for (var i of lib.config.extensions) {
            if (i == '假装无敌' || i == '取消弹窗报错') game.removeExtension(i);
        }
    }//不兼容清瑶
    Reflect.defineProperty(lib.config, 'dev', {
        get: () => true,
        set() { },
    });//开发者模式,防止game未定义
    Reflect.defineProperty(lib.config, 'extension_alert', {
        get: () => false,
        set() { },
    });//禁止关闭扩展content报错
    Reflect.defineProperty(_status, 'withError', {
        get: () => false,
        set() { },
    });//禁止取消报错弹窗
    Reflect.defineProperty(lib.config, 'sync_speed', {
        get: () => false,
        set() { },
    });//取消限制结算速度
    var originalonerror = window.onerror;
    Reflect.defineProperty(window, 'onerror', {
        get: () => originalonerror,
        set() { },
    });//禁止修改报错弹窗
    var originalAlert = window.alert;
    Reflect.defineProperty(window, 'alert', {
        get: () => originalAlert,
        set() { },
    });//禁止修改报错弹窗
}//fire
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
game.import("extension", function (lib, game, ui, get, ai, _status) {
    return {
        name: "温柔一刀",
        content: content,
        precontent: precontent,
        config: config,
        package: {
            "intro": '<span class="Qmenu">所谓英雄本色<br>只是在黑暗来临时,他自长空里划出精锐灿亮的光芒<br>只有在死色里,他才激出活意<br>所以,没有绝境,就没有英雄<br>没有凡人,英雄也一样不可能存在</span>',
            "author": '<samp class="Qframe">QQQ</samp>',
            "diskURL": "<font color=blue>【温柔一刀】群聊:771901025</font>",
            "forumURL": "点击链接加入群聊【温柔一刀】:https://qm.qq.com/q/SsTlU9gc24",
            "version": '8.69',
        },
    }
});
game.addMode("QQQ", {
    start: async function (event) {
        lib.config.mode = 'QQQ';
        lib.config.mode_config.QQQ.QQQ_mode = 'QQQ';
        _status.mode = 'QQQ';
        game.prepareArena(2);
        for (var i of game.players) {
            i.getId();
        }
        game.me.identity = 'zhu';
        game.me.next.identity = 'fan';
        game.me.showIdentity();
        game.me.next.showIdentity();
        lib.init.onfree();
        game.me.init('QQQ_测试');
        game.me.next.init('QQQ_刘备');
        event.trigger("gameStart");
        game.gameDraw(game.zhu, () => 4);
        game.phaseLoop(game.zhu);
        game.countPlayer((current) => current.showGiveup(), true);
        _status.auto = true;
    },
    game: {
        canReplaceViewpoint: () => true,
        showIdentity: function () { },
        checkResult: function () {
            game.over((game.me._trueMe || game.me).isAlive());
        },
    },
    element: {
        player: {
            dieAfter: function () {
                if (game.players.length < 2) game.checkResult();
            },
            showIdentity: function () {
                game.broadcastAll(
                    function (player, identity) {
                        player.identity = identity;
                        game[identity] = player;
                        player.side = identity == "zhu";
                        player.node.identity.classList.remove("guessing");
                        player.identityShown = true;
                        player.ai.shown = 1;
                        player.setIdentity();
                        if (player.identity == "zhu") {
                            player.isZhu = true;
                        }
                        if (_status.clickingidentity) {
                            for (var i = 0; i < _status.clickingidentity[1].length; i++) {
                                _status.clickingidentity[1][i].delete();
                                _status.clickingidentity[1][i].style.transform = "";
                            }
                            delete _status.clickingidentity;
                        }
                    },
                    this,
                    this.identity
                );
            },
        },
    },
    get: {
        attitude: function (from, to) {
            if (!from) throw new Error();
            if (!to) throw new Error();
            if (from.identity == to.identity) return 10;
            return -10;
        },
    },
    skill: {
        _qqq: {

        },
    },
    translate: {
        zhu: "先",
        fan: "后",
        zhu2: "先手",
        fan2: "后手",
        QQQ: "QQQ",
    },
}, {
    translate: 'QQQ',
});
lib.mode.QQQ.splash = 'ext:温柔一刀/image/李白.jpg';



lib.arenaReady.push(function () {
    if (lib.config.extension_温柔一刀_温柔一刀牌堆) {
        for (var i in card) {
            lib.inpile.add(i);
        }
        lib.card.list.addArray(list);
        lib.cardPack.温柔一刀 = Object.keys(card);
        lib.translate.温柔一刀_card_config = `<img src="${lib.assetURL}extension/温柔一刀/The-Gentle-Slash.png"width="120"height="30">`;
        lib.config.all.cards.add('温柔一刀');
        lib.config.cards.add('温柔一刀');
        if (lib.connectCardPack) {
            lib.connectCardPack.add('温柔一刀');
        }//扩展卡牌联机
        game.saveConfig(`extension_温柔一刀_cards_enable`, true);//扩展卡牌全部打开
        game.saveConfig('cards', lib.config.cards);
        game.saveConfig('defaultcards', lib.config.cards);
    }



    Object.assign(lib.skill, skill);
    Object.assign(lib.card, card);
    Object.assign(lib.translate, translate1);
    Object.assign(lib.translate, translate2);
    Object.assign(lib.translate, translate3);
    Object.assign(lib.character, character);
    Object.assign(lib.characterSort, characterSort);
    Object.assign(lib.characterIntro, characterIntro);
    Object.assign(lib.characterTitle, characterTitle);


    lib.characterPack.温柔一刀 = character;
    lib.translate.温柔一刀_character_config = `<img src="${lib.assetURL}extension/温柔一刀/The-Gentle-Slash.png"width="120"height="30">`;
    lib.config.all.characters.add('温柔一刀');
    lib.config.characters.add('温柔一刀');
    if (lib.connectCharacterPack) {
        lib.connectCharacterPack.add('温柔一刀');
    }//扩展武将联机
    game.saveConfig(`extension_温柔一刀_characters_enable`, true);//扩展武将全部打开
    game.saveConfig('characters', lib.config.characters);
    game.saveConfig('defaultcharacters', lib.config.characters);
});
if (lib.config.extension_温柔一刀_温柔一刀牌堆) {
    for (var i in card) {
        lib.inpile.add(i);
    }
    lib.card.list.addArray(list);
    lib.cardPack.温柔一刀 = Object.keys(card);
    lib.translate.温柔一刀_card_config = `<img src="${lib.assetURL}extension/温柔一刀/The-Gentle-Slash.png"width="120"height="30">`;
    lib.config.all.cards.add('温柔一刀');
    lib.config.cards.add('温柔一刀');
    if (lib.connectCardPack) {
        lib.connectCardPack.add('温柔一刀');
    }//扩展卡牌联机
    game.saveConfig(`extension_温柔一刀_cards_enable`, true);//扩展卡牌全部打开
    game.saveConfig('cards', lib.config.cards);
    game.saveConfig('defaultcards', lib.config.cards);
}


QQQ.skill1 = skill;
Object.assign(lib.skill, skill);
Object.assign(lib.card, card);
Object.assign(lib.translate, translate1);
Object.assign(lib.translate, translate2);
Object.assign(lib.translate, translate3);
Object.assign(lib.character, character);//不管game.import导入的或者package导入的,都会仅点将可用forbidai_user加入forbidai里面,但是直接导入lib.character不会,所以不能AI禁用
Object.assign(lib.characterSort, characterSort);
Object.assign(lib.characterIntro, characterIntro);
Object.assign(lib.characterTitle, characterTitle);


lib.characterPack.温柔一刀 = character;
lib.translate.温柔一刀_character_config = `<img src="${lib.assetURL}extension/温柔一刀/The-Gentle-Slash.png"width="120"height="30">`;
lib.config.all.characters.add('温柔一刀');
lib.config.characters.add('温柔一刀');
if (lib.connectCharacterPack) {
    lib.connectCharacterPack.add('温柔一刀');
}//扩展武将联机
game.saveConfig(`extension_温柔一刀_characters_enable`, true);//扩展武将全部打开
game.saveConfig('characters', lib.config.characters);
game.saveConfig('defaultcharacters', lib.config.characters);





