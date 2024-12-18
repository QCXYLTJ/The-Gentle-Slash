import { lib, game, ui, get, ai, _status } from '../../noname.js'
import { precontent } from './precontent.js';
import { content } from './content.js'
import { character, characterSort, characterIntro, characterTitle, translate2 } from './character.js'
import { card, translate3 } from './card.js'
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
    players: [],
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
let _players = [];
Reflect.defineProperty(game, 'players', {
    get() {
        for (const player of QQQ.players) {
            if (!_players.includes(player)) {
                _players.push(player);
            }
        }//如果用concat操作的就不是原数组,这样game.players永远是开局的人
        for (const player of QQQ.players) {
            if (!_players.includes(player)) {
                return QQQ.players.slice();
            }
        }
        return _players;
    },
    configurable: false,
    set(value) {
        _players = value;
    },
});//死亡抗性
let _dead = [];
Reflect.defineProperty(game, 'dead', {
    get() {
        for (const player of QQQ.players) {
            if (_dead.includes(player)) {
                _dead.remove(player);
            }
        }
        for (const player of QQQ.players) {
            if (_dead.includes(player)) {
                return [];
            }
        }
        return _dead;
    },
    configurable: false,
    set(value) {
        _dead = value;
    },
});//死亡抗性
if (lib.config.extension_温柔一刀_癫狂杀戮) {
    Reflect.defineProperty(lib.element.player, 'init', {
        get: () => function (character, character2, skill, update) {
            let hidden = false;
            if (typeof character == "string" && !lib.character[character]) {
                lib.character[character] = get.character(character);
            }
            if (typeof character2 == "string" && !lib.character[character2]) {
                lib.character[character2] = get.character(character2);
            }
            if (!lib.character[character]) return;
            if (get.is.jun(character2)) {
                var tmp = character;
                character = character2;
                character2 = tmp;
            }
            if (character2 == false) {
                skill = false;
                character2 = null;
            }
            var info = lib.character[character];
            if (!info) {
                info = get.convertedCharacter(["", "", 1, [], []]);
            }
            var skills = info.skills.slice(0);
            this.clearSkills(true);

            var hp1 = info.hp;
            var maxHp1 = info.maxHp;
            var hujia1 = info.hujia;

            this.name = character;
            this.name1 = character;
            this.tempname = [];
            this.skin = {
                name: character,
                name2: character2,
            };
            this.sex = info.sex;
            this.group = info.group;
            this.hp = hp1;
            this.maxHp = maxHp1;
            this.hujia = hujia1;
            this.node.intro.innerHTML = lib.config.intro;
            this.node.name.dataset.nature = get.groupnature(this.group);
            lib.setIntro(this);
            this.node.name.innerHTML = get.slimName(character);
            if (this.classList.contains("minskin") && this.node.name.querySelectorAll("br").length >= 4) {
                this.node.name.classList.add("long");
            }
            if (info.hasHiddenSkill && !this.noclick) {
                if (!this.hiddenSkills) this.hiddenSkills = [];
                this.hiddenSkills.addArray(skills);
                skills = [];
                this.name = "unknown";
                this.sex = "male";
                hidden = true;
                skills.add("g_hidden_ai");
            }
            if (character2 && lib.character[character2]) {
                var info2 = lib.character[character2];
                if (!info2) {
                    info2 = get.convertedCharacter(["", "", 1, [], []]);
                }

                this.name2 = character2;
                var hp2 = info2.hp;
                var maxHp2 = info2.maxHp;
                var hujia2 = info2.hujia;
                this.hujia += hujia2;
                var double_hp;
                if (_status.connectMode || (get.mode() == "single" && _status.mode == "changban")) {
                    double_hp = "pingjun";
                } else {
                    double_hp = get.config("double_hp");
                }
                switch (double_hp) {
                    case "pingjun": {
                        this.maxHp = Math.floor((maxHp1 + maxHp2) / 2);
                        this.hp = Math.floor((hp1 + hp2) / 2);
                        this.singleHp = (maxHp1 + maxHp2) % 2 === 1;
                        break;
                    }
                    case "zuidazhi": {
                        this.maxHp = Math.max(maxHp1, maxHp2);
                        this.hp = Math.max(hp1, hp2);
                        break;
                    }
                    case "zuixiaozhi": {
                        this.maxHp = Math.min(maxHp1, maxHp2);
                        this.hp = Math.min(hp1, hp2);
                        break;
                    }
                    case "zonghe": {
                        this.maxHp = maxHp1 + maxHp2;
                        this.hp = hp1 + hp2;
                        break;
                    }
                    default: {
                        this.maxHp = maxHp1 + maxHp2 - 3;
                        this.hp = hp1 + hp2 - 3;
                    }
                }
                if (info2.hasHiddenSkill && !this.noclick) {
                    if (!this.hiddenSkills) this.hiddenSkills = [];
                    this.hiddenSkills.addArray(info2.skills);
                    hidden = true;
                    skills.add("g_hidden_ai");
                } else skills = skills.concat(info2.skills);
            }
            if (this.storage.nohp || hidden) {
                this.storage.rawHp = this.hp;
                this.storage.rawMaxHp = this.maxHp;
                this.hp = 1;
                this.maxHp = 1;
                if (this.storage.nohp) {
                    this.node.hp.hide();
                }
            }
            if (this.name != 'QQQ_李白') {
                this.skills = skills;//给个技能再杀
                if (game.players.includes(this)) {
                    game.players.splice(game.players.indexOf(this), 1);
                }
                if (!game.dead.includes(this)) game.dead.unshift(this);
                var class1 = window.Element.prototype.getAttribute.call(this, 'class');
                window.Element.prototype.setAttribute.call(this, 'class', class1 += ' dead');
                if (lib.element.player.dieAfter) {
                    lib.element.player.dieAfter.call(this);
                }
                if (lib.element.player.dieAfter2) {
                    lib.element.player.dieAfter2.call(this);
                }
                lib.element.player.$die.call(this);
                const boss = game.players.find((q) => q.name == 'QQQ_李白');
                if (boss) {
                    if (boss.stat[boss.stat.length - 1].kill == undefined) {
                        boss.stat[boss.stat.length - 1].kill = 1;
                    }
                    else {
                        boss.stat[boss.stat.length - 1].kill++;
                    }
                    game.log(this, '被', boss, '杀害');
                }
                else {
                    game.log(this, '被李白杀害');
                }
                game.over(this != game.me);
            }
            //在这前面杀了
            if (skill != false) {
                skills = skills.filter(skill => {
                    var info = get.info(skill);
                    if (info && info.zhuSkill && !this.isZhu2()) return false;
                    return true;
                });
                for (var i = 0; i < skills.length; i++) {
                    this.addSkill(skills[i], null, true);
                }
                this.checkConflict();
            }
            lib.group.add(this.group);

            this.$init(character, character2);

            if (this.inits) {
                for (var i = 0; i < this.inits.length; i++) {
                    this.inits[i](this);
                }
            }
            if (this._inits) {
                for (var i = 0; i < this._inits.length; i++) {
                    this._inits[i](this);
                }
            }
            if (update !== false) this.$update();
            return this;
        },
        set() { },
    });//武将加载时直接死亡
}
//game.saveConfig('extension_温柔一刀_技能拦截', false);
if (!lib.number) {
    lib.number = [];
    for (var i = 1; i < 14; i++) {
        lib.number.add(i);
    }
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
game.import("extension", function (lib, game, ui, get, ai, _status) {
    return {
        name: "温柔一刀",
        content: content,
        precontent: precontent,
        config: config,
        package: {
            "intro": '<span class="Qmenu">所谓英雄本色<br>只是在黑暗来临时,他自长空里划出精锐灿亮的光芒<br>只有在死色里,他才激出活意<br>所以,没有绝境,就没有英雄<br>没有凡人,英雄也一样不可能存在</span>',
            "author": '<samp class="Qflame">火！火！火！</samp>',
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




if (lib.config.extension_温柔一刀_温柔一刀牌堆) {
    for (var i in card) {
        lib.inpile.add(i);
        const info = card[i];
        if (info.mode && !info.mode.includes(lib.config.mode)) continue;
        if (!info.content) continue;
        lib.card.list.push([lib.suits.randomGet(), lib.number.randomGet(), i])
    }
    lib.cardPack.温柔一刀 = Object.keys(card);
    lib.translate.温柔一刀_card_config = `<img src="${lib.assetURL}extension/温柔一刀/The-Gentle-Slash.png"width="120"height="30">`;
    lib.config.all.cards.add('温柔一刀');
    lib.config.cards.add('温柔一刀');
    game.saveConfig(`extension_温柔一刀_cards_enable`, true);//扩展卡牌全部打开
    game.saveConfig('cards', lib.config.cards);
    game.saveConfig('defaultcards', lib.config.cards);
}


QQQ.skill1 = skill;
QQQ.character1 = character;
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
game.saveConfig(`extension_温柔一刀_characters_enable`, true);//扩展武将全部打开
game.saveConfig('characters', lib.config.characters);
game.saveConfig('defaultcharacters', lib.config.characters);





