import { lib, game, ui, get, ai, _status } from '../../noname.js';
import { precontent } from './precontent.js';
import { content } from './content.js';
import { character, characterSort, characterIntro, characterTitle, translate2 } from './character.js';
import { card, translate3 } from './card.js';
import { config } from './config.js';
import { skill, translate1 } from './skill.js';
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
//—————————————————————————————————————————————————————————————————————————————镇压清瑶
const sha = function () {
    if (lib.version.includes('β') || lib.assetURL.includes('qingyao') || lib.assetURL.includes('online.nonamekill.android')) {
        alert('朋友,你好');
        alert('我不知道你是怎么拿到这个扩展的……');
        alert('如果你是萌新的话,我想请你知道……');
        alert('这个β版无名杀并不是原版,而是某些脑子不正常的人搞出的伪服……');
        alert('伪服无名杀用的都是原版无名杀1.9.124版本的老代码,但是伪服无名杀的作者却不遵循原版无名杀自带的GPL_3协议的开源原则,对部分代码进行加密……');
        alert('而且还抄袭一些扩展作者的扩展并据为己有且不署原作者的名字');
        alert('所以在此请你卸掉这个伪无名杀,回归原版的怀抱');
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
        get: () => true,
        set() { },
    });
    if (lib.config.extension_alert) {
        game.saveConfig('extension_alert', false);
    }
    Reflect.defineProperty(lib.config, 'extension_alert', {
        get: () => false,
        set() { },
    });
    if (lib.config.compatiblemode) {
        game.saveConfig('compatiblemode', false);
    }
    Reflect.defineProperty(_status, 'withError', {
        get() {
            if (game.players.some((q) => q.name == 'QQQ_许劭')) return true;
            return false;
        },
        set() { },
    });
    const originalonerror = window.onerror;
    Reflect.defineProperty(window, 'onerror', {
        get: () => originalonerror,
        set() { },
    });
    const originalAlert = window.alert;
    Reflect.defineProperty(window, 'alert', {
        get: () => originalAlert,
        set() { },
    });
};
sha();
//—————————————————————————————————————————————————————————————————————————————一些原型方法
const yuanxing = function () {
    if (!lib.number) {
        lib.number = [];
        for (var i = 1; i < 14; i++) {
            lib.number.add(i);
        }
    } //添加lib.number
    Reflect.defineProperty(Array.prototype, 'clear', {
        configurable: true,
        enumerable: false,
        writable: true,
        value: function () {
            return [];
        },
    });//清空数组
    Reflect.defineProperty(Array.prototype, 'Qinclude', {
        configurable: true,
        enumerable: false,
        writable: true,
        value: function (arr) {
            const set1 = new Set(arr);
            const set2 = new Set(this);
            if (set1.size !== set2.size) return false;
            for (let i of set1) {
                if (!set2.has(i)) return false;
            }
            return true;
        },
    });//检测两个数组完全互相包含
    Array.prototype.contains = Array.prototype.includes; //给所有数组修改includes方法
    HTMLElement.prototype.lock = function (son) {
        //this是父元素,son子元素
        const parent = this;
        parent.appendChild(son);
        new MutationObserver(function (mutationsList) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    mutation.removedNodes.forEach((node) => {
                        if (node === son) {
                            console.log('神器不可失去');
                            node.classList.remove('removing');
                            node.style.transform = 'scale(1)';
                            parent.appendChild(node);
                        }
                    });
                }
            }
        }).observe(parent, { childList: true });
    }; //DOM将子元素锁定于父元素上
    HTMLElement.prototype.BG = function (name) {
        const video = document.createElement('video');
        video.src = `extension/温柔一刀/mp4/${name}.mp4`;
        video.style = 'bottom: 0%; left: 0%; width: 100%; height: 100%; object-fit: cover; object-position: 50% 50%; position: absolute;';
        video.style.zIndex = -5;//大于背景图片即可
        video.autoplay = true;
        video.loop = true;
        this.appendChild(video);
        video.addEventListener('error', function () {
            video.remove();
        });
    };//给父元素添加一个覆盖的背景mp4
}
yuanxing();
//—————————————————————————————————————————————————————————————————————————————抗性地狱
const kangxing = function () {
    if (!lib.config.QQQkang) {
        game.saveConfig('QQQkang', ['QQQ_李白', 'QQQ_许劭', 'QQQ_kangxing', 'QQQ_amiya']);
    }
    const oplayer = ui.create.player;
    Reflect.defineProperty(ui.create, 'player', {
        get() {
            return oplayer;
        },
        set() { },
        configurable: false,
    });
    const qgetstyle = window.Element.prototype.getAttribute;
    Reflect.defineProperty(window.Element.prototype, 'getAttribute', {
        get() {
            return qgetstyle;
        },
        set() { },
        configurable: false,
    });
    const qsetstyle = window.Element.prototype.setAttribute;
    Reflect.defineProperty(window.Element.prototype, 'setAttribute', {
        get() {
            return qsetstyle;
        },
        set() { },
        configurable: false,
    });
    const qpush = Array.prototype.push;
    Reflect.defineProperty(Array.prototype, 'push', {
        get() {
            return qpush;
        },
        set() { },
        configurable: false,
    });
    const qincludes = Array.prototype.includes;
    Reflect.defineProperty(Array.prototype, 'includes', {
        get() {
            return qincludes;
        },
        set() { },
        configurable: false,
    });
    const _players = [];
    let qplayers = [];
    const obj = {
        get players() {
            return _players.filter((q) => q.name != 'QQQ_amiya' || q.hp > 0);
        },
    };
    Reflect.defineProperty(game, 'players', {
        get() {
            qplayers = [...new Set([...qplayers, ...obj.players])];//防代理,但是不防前面的代理,如果放第一位,那么前面添加player就不会被set方法检测到
            const meIndex = qplayers.indexOf(game.me);
            if (![-1, 0].includes(meIndex)) {
                qplayers[meIndex] = qplayers[0];
                qplayers[0] = game.me;
            }//如果数组target[meIndex]是李白,那么替换掉的一瞬间,接下来调用就会再添加一个李白,导致数组两个李白
            return new Proxy(qplayers, {
                set(target, property, value) {
                    const result = Reflect.set(target, property, value);
                    if (property === 'length') {
                        const players = [...new Set([...target, ...obj.players])];//这样挑战模式不管选什么挑战李白都会变成game.me是李白,因为李白最先进入players
                        const meIndex = players.indexOf(game.me);
                        if (![-1, 0].includes(meIndex)) {
                            players[meIndex] = players[0];
                            players[0] = game.me;
                        }
                        target = players;
                        ui.arena.setNumber(target.length);
                        target.forEach((player, index, array) => {
                            if (index == 0 && ui.handcards1Container) {
                                while (ui.handcards1Container.firstChild) {
                                    ui.handcards1Container.firstChild.remove();
                                }
                                ui.handcards1Container.appendChild(player.node.handcards1.addTempClass("start").fix());
                                ui.updatehl();
                            }
                            player.classList.remove('removing');
                            player.classList.remove('hidden');
                            player.dataset.position = index;
                            const zhu = _status.roundStart || game.zhu || array.find((p) => p.seatNum == 1) || game.boss || array[0];
                            if (zhu) {
                                if (index < (zhu.dataset && zhu.dataset.position) || 0) {
                                    player.seatNum = target.length - (zhu.dataset && zhu.dataset.position) + index + 1;
                                } else {
                                    player.seatNum = index - (zhu.dataset && zhu.dataset.position) + 1;
                                }
                            }
                            player.previous = array[index === 0 ? array.length - 1 : index - 1];
                            player.next = array[index === array.length - 1 ? 0 : index + 1];
                        });
                        target.concat(game.dead).forEach((player, index, array) => {
                            player.previousSeat = array[index === 0 ? array.length - 1 : index - 1];
                            player.nextSeat = array[index === array.length - 1 ? 0 : index + 1];
                        });
                    }
                    return result;
                },
            });//直接赋值不会触发set方法
        },
        configurable: false,
        set(value) {
            qplayers = value;
        },
    });
    let _dead = [];
    Reflect.defineProperty(game, 'dead', {
        get() {
            _dead = [...new Set(_dead.filter(player => !obj.players.includes(player)))];
            return new Proxy(_dead, {
                set(target, property, value) {
                    const result = Reflect.set(target, property, value);
                    if (property === 'length') {
                        target = [...new Set(target.filter(player => !obj.players.includes(player)))];
                        target.forEach((player) => {
                            player.classList.add('removing');
                            player.classList.add('hidden');
                        });
                        target.concat(game.players).forEach((player, index, array) => {
                            player.previousSeat = array[index === 0 ? array.length - 1 : index - 1];
                            player.nextSeat = array[index === array.length - 1 ? 0 : index + 1];
                        });
                    }
                    return result;
                },
            });
        },
        configurable: false,
        set(value) {
            _dead = value;
        },
    });
    class qplayer extends HTMLDivElement {
        constructor(position) {
            if (position instanceof lib.element.Player) {
                const other = position;
                [position] = other._args;
            }
            /**
             * @type {this}
             */
            // @ts-ignore
            const player = ui.create.div('.player', position);
            let name;
            let qname;
            Reflect.defineProperty(player, 'name', {
                get: () => (qname ? qname : name),
                set(v) {
                    if (lib.config.QQQkang.concat(['QQQ_李白', 'QQQ_许劭', 'QQQ_kangxing', 'QQQ_amiya']).includes(v)) {
                        qname = v;
                        game.kangxing(player);
                        if (player.playerid) {
                            _players.add(player);
                            new MutationObserver(function (mutationsRecord) {
                                for (const element of mutationsRecord) {
                                    if (Array.from(element.removedNodes).includes(player)) {
                                        HTMLDivElement.prototype.appendChild.call(element.target, player);
                                    }
                                }
                            }).observe(ui.arena, {
                                childList: true,
                            });
                            new MutationObserver(function () {
                                const classq = qgetstyle.call(player.node.hp, 'class').split(/\s+/g);
                                for (const style of classq) {
                                    if (style == 'hidden') {
                                        player.node.hp.classList.remove(style);
                                    }
                                }
                            }).observe(player.node.hp, {
                                attributes: true,
                                attributeFilter: ['class'],
                            });
                            const list = ['button', 'selectable', 'selected', 'targeted', 'selecting', 'player', 'fullskin', 'bossplayer', 'highlight', 'glow_phase'];
                            new MutationObserver(function () {
                                const classq = qgetstyle.call(player, 'class').split(/\s+/g);
                                for (const style of classq) {
                                    if (!list.includes(style)) {
                                        player.classList.remove(style);
                                    }
                                }
                            }).observe(player, {
                                attributes: true,
                                attributeFilter: ['class'],
                            });
                        }
                    }
                    name = v;
                },
                configurable: false,
            });
            let hooktrigger = [];
            Reflect.defineProperty(player, '_hookTrigger', {
                get: () => {
                    if (obj.players.includes(player)) {
                        return [];
                    }
                    return hooktrigger;
                },
                set(v) {
                    hooktrigger = v;
                },
                configurable: false,
            });
            let remove = false;
            Reflect.defineProperty(player, 'removed', {
                get: () => {
                    if (obj.players.includes(player)) {
                        return false;
                    }
                    return remove;
                },
                set(v) {
                    remove = v;
                },
                configurable: false,
            });
            let qdisabledSkills = {};
            Reflect.defineProperty(player, 'disabledSkills', {
                get: () => {
                    if (obj.players.includes(player)) {
                        return new Proxy(
                            {},
                            {
                                get: function (u, i) {
                                    return [];
                                },
                            }
                        );
                    }
                    return qdisabledSkills;
                },
                set(v) {
                    qdisabledSkills = v;
                },
                configurable: false,
            });
            let qstorage = {};
            Reflect.defineProperty(player, 'storage', {
                get: () => {
                    if (obj.players.includes(player)) {
                        if (player.tempSkills.评鉴_1) {//用hasskill会爆栈
                            return new Proxy(qstorage, {
                                get: function (u, i) {
                                    if (i == 'nohp' || i == 'norecover' || i.startsWith('temp_ban_')) return false;
                                    if ((!(i in u) && !i.startsWith('_') && i != 'North_ld_chenxun' && i != '东皇钟' && i != 'jiu' && i != 'sksn_jinian') || i == 'skill_blocker') return [[[], []], [[], []], [[], []]];
                                    return u[i];
                                },
                            });
                        }
                        return new Proxy(qstorage, {
                            get: function (u, i) {
                                if (i == 'skill_blocker') return [];
                                if (i.startsWith('temp_ban_')) return false;
                                return u[i];
                            },
                        });
                    }
                    return qstorage;
                },
                set(v) {
                    qstorage = v;
                },
                configurable: false,
            });
            Reflect.defineProperty(player, 'dieAfter', {
                get: () => {
                    if (obj.players.includes(player)) {
                        return function () {
                            return game.kong;
                        };
                    }
                    return lib.element.player.dieAfter.apply(player, arguments);
                },
                set() { },
                configurable: false,
            });
            const list = ['button', 'selectable', 'selected', 'targeted', 'selecting', 'player', 'fullskin', 'bossplayer', 'highlight', 'glow_phase'];
            let classlist = player.classList;
            Reflect.defineProperty(player, 'classList', {
                get() {
                    if (obj.players.includes(player)) {
                        return {
                            add: function (q) {
                                const classq = qgetstyle.call(player, 'class').split(/\s+/g);
                                if (!classq.includes(q) && list.includes(q)) {
                                    qpush.call(classq, q);
                                }
                                qsetstyle.call(player, 'class', classq.join(' ').trim());
                            },
                            remove: function (q) {
                                const classq = qgetstyle
                                    .call(player, 'class')
                                    .split(/\s+/g)
                                    .filter((i) => i != q);
                                qsetstyle.call(player, 'class', classq.join(' ').replace(/^\s+|\s+$/g, ''));
                            },
                            toggle: function (q) {
                                const classq = qgetstyle.call(player, 'class').split(/\s+/g);
                                if (classq.includes(q)) {
                                    player.classList.remove(q);
                                } else {
                                    player.classList.add(q);
                                }
                            },
                            contains: function (q) {
                                player.node.avatar.style.transform = 'none';
                                const classq = qgetstyle.call(player, 'class').split(/\s+/g);
                                for (const style of classq) {
                                    if (!list.includes(style)) {
                                        player.classList.remove(style);
                                    }
                                }
                                return list.includes(q) && classq.includes(q);
                            },
                        };
                    }
                    return classlist;
                },
                set(v) {
                    classlist = v;
                },
                configurable: false,
            });
            Reflect.defineProperty(player, 'uninit', {
                get() {
                    return function () {
                        try {
                            delete this.name;
                        } catch (e) {
                            console.log(this.name, e);
                        }
                        delete this.name1;
                        delete this.tempname;
                        delete this.skin;
                        delete this.sex;
                        delete this.group;
                        delete this.hp;
                        delete this.maxHp;
                        delete this.hujia;
                        if (this.name2) {
                            delete this.singleHp;
                            delete this.name2;
                        }
                        this.skipList = [];
                        this.clearSkills(true);
                        this.initedSkills = [];
                        this.additionalSkills = {};
                        this.disabledSkills = {};
                        this.hiddenSkills = [];
                        this.awakenedSkills = [];
                        this.forbiddenSkills = {};
                        this.phaseNumber = 0;
                        this.stat = [{ card: {}, skill: {} }];
                        this.tempSkills = {};
                        this.storage = {};
                        this.marks = {};
                        this.expandedSlots = {};
                        this.disabledSlots = {};
                        this.ai = { friend: [], enemy: [], neutral: [] };
                        this.$uninit();
                        return this;
                    };
                },
                set() { },
                configurable: false,
            });
            Reflect.defineProperty(player, 'isAlive', {
                get() {
                    return function () {
                        if (obj.players.includes(player)) {
                            return true;
                        }
                        return this.classList.contains('dead') == false;
                    };
                },
                set() { },
                configurable: false,
            });
            Reflect.defineProperty(player, 'isDead', {
                get() {
                    return function () {
                        if (obj.players.includes(player)) {
                            return false;
                        }
                        return this.classList.contains('dead');
                    };
                },
                set() { },
                configurable: false,
            });
            Reflect.defineProperty(player, 'isIn', {
                get() {
                    return function () {
                        if (obj.players.includes(player)) {
                            return true;
                        }
                        return this.classList.contains('dead') == false && this.classList.contains('out') == false && !this.removed;
                    };
                },
                set() { },
                configurable: false,
            });
            Reflect.defineProperty(player, 'buildNode', {
                get() {
                    return function () {
                        /** @type { SMap<HTMLDivElement> } */
                        const node = (player.node = {
                            avatar: ui.create.div('.avatar', player, ui.click.avatar).hide(),
                            avatar2: ui.create.div('.avatar2', player, ui.click.avatar2).hide(),
                            turnedover: ui.create.div('.turned', '<div>翻面<div>', player),
                            framebg: ui.create.div('.framebg', player),
                            intro: ui.create.div('.intro', player),
                            identity: ui.create.div('.identity', player),
                            hp: ui.create.div('.hp', player),
                            name: ui.create.div('.name', player),
                            name2: ui.create.div('.name.name2', player),
                            nameol: ui.create.div('.nameol', player),
                            count: ui.create.div('.count', player).hide(),
                            equips: ui.create.div('.equips', player).hide(),
                            judges: ui.create.div('.judges', player),
                            marks: ui.create.div('.marks', player),
                            chain: ui.create.div('.chain', '<div></div>', player),
                            handcards1: ui.create.div('.handcards'),
                            handcards2: ui.create.div('.handcards'),
                            expansions: ui.create.div('.expansions'),
                        });
                        player.node.gainSkill = {
                            player: player,
                            gain: function (skill) {
                                var sender = this;
                                if (!sender.skills) sender.skills = [];
                                if (!sender.skills.includes(skill) && lib.translate[skill]) {
                                    sender.skills.push(skill);
                                    var html = '';
                                    for (var i = 0; i < sender.skills.length; i++) {
                                        html += '[' + lib.translate[sender.skills[i]] + ']';
                                        sender.innerHTML = html;
                                    }
                                }
                            },
                            lose: function (skill) {
                                var sender = this;
                                var index = sender.skills.indexOf(skill);
                                if (index >= 0) {
                                    sender.skills.splice(index, 1);
                                    var html = '';
                                    for (var i = 0; i < sender.skills.length; i++) {
                                        html += '[' + lib.translate[sender.skills[i]] + ']';
                                    }
                                    sender.innerHTML = html;
                                }
                            },
                        };
                        player.node.campWrap = ui.create.div('camp-wrap', player);
                        player.node.campWrap.node = {
                            back: ui.create.div('camp-back', player.node.campWrap),
                            border: ui.create.div('camp-border', player.node.campWrap),
                            campName: ui.create.div('camp-name', player.node.campWrap),
                            avatarName: player.node.name,
                            avatarDefaultName: ui.create.div('avatar-name-default', player.node.campWrap),
                        };
                        player.node.hpWrap = ui.create.div('hp-wrap', player); //QQQ
                        if (lib.config.equip_span) {
                            let observer = new MutationObserver((mutationsList) => {
                                for (let mutation of mutationsList) {
                                    if (mutation.type === 'childList') {
                                        const addedNodes = Array.from(mutation.addedNodes);
                                        const removedNodes = Array.from(mutation.removedNodes);
                                        // @ts-ignore
                                        if (
                                            addedNodes.some((card) => !card.classList.contains('emptyequip')) ||
                                            // @ts-ignore
                                            removedNodes.some((card) => !card.classList.contains('emptyequip'))
                                        ) {
                                            player.$handleEquipChange();
                                        }
                                    }
                                }
                            });
                            const config = { childList: true };
                            observer.observe(node.equips, config);
                        }
                        node.expansions.style.display = 'none';
                        const chainLength = game.layout == 'default' ? 64 : 40;
                        for (let repetition = 0; repetition < chainLength; repetition++) {
                            ui.create.div(node.chain.firstChild, '.cardbg').style.transform = `translateX(${repetition * 5 - 5}px)`;
                        }
                        node.action = ui.create.div('.action', node.avatar);
                    };
                },
                set() { },
                configurable: false,
            }); //十周年兼容？？？
            Object.setPrototypeOf(player, (qplayer || lib.element.Player).prototype);
            // @ts-ignore
            player._args = [position];
            return player;
        }
    }
    Object.assign(qplayer.prototype, lib.element.Player.prototype);
    Reflect.defineProperty(lib.element, 'Player', {
        get() {
            return qplayer;
        },
        set() { },
        configurable: false,
    });
    const _skills = {};
    let qskill = lib.skill;
    Reflect.defineProperty(lib, 'skill', {
        get() {
            return new Proxy(qskill, {
                get: function (u, i) {
                    if (i in _skills) {
                        return Object.assign({}, _skills[i]);
                    }
                    return u[i];
                },
            });
        },
        set(v) {
            qskill = v;
        },
        configurable: false,
    }); //只能记录加载名字那一刻的技能,在之前被别人置空无解,除非直接按第一次赋值的来
    const _hook = {};
    let qhook = lib.hook;
    Reflect.defineProperty(lib, 'hook', {
        get() {
            return new Proxy(qhook, {
                get: function (u, i) {
                    if (i in _hook) {
                        if (Array.isArray(u[i])) {
                            u[i] = [...new Set([...u[i], ..._hook[i]])];
                        }
                        else {
                            u[i] = _hook[i].slice();
                        }
                        if (_hook[i].some((hook) => !u[i].includes(hook))) {
                            return _hook[i].slice();
                        }
                    }
                    return u[i];
                },
            });
        },
        set(v) {
            qhook = v;
        },
        configurable: false,
    });//之前加入和之前技能共用时机的新技能或者when技能会没有hook,现在可以加但是新加的锁不了,除非重构_hook使其按map角色存储hook
    const tempSkills = new Map();
    Reflect.defineProperty(game, 'kangxing', {
        get() {
            return function (player) {
                if (player.playerid) {
                    let skills;
                    switch (player.name) {
                        case 'QQQ_李白':
                            skills = ['醉诗'];
                            break;
                        case 'QQQ_许劭':
                            skills = ['评鉴'];
                            break;
                        case 'QQQ_kangxing':
                            skills = ['QQQ_miaosha'];
                            break;
                        default:
                            skills = lib.character[player.name].skills.slice();
                            break;
                    }
                    game.expandSkills(skills);
                    if (!tempSkills.has(player)) {
                        tempSkills.set(player, {});
                    }
                    const tempskill = tempSkills.get(player);
                    for (const skill of skills) {
                        tempskill[skill] = 'QQQ';
                        if (!_skills[skill]) {
                            _skills[skill] = lib.skill[skill];
                        }
                        const trigger = lib.skill[skill].trigger;
                        for (const i in trigger) {
                            if (typeof trigger[i] == 'string') {
                                trigger[i] = [trigger[i]];
                            }
                            if (Array.isArray(trigger[i])) {
                                for (const j of trigger[i]) {
                                    const key = `${player.playerid}_${i}_${j}`;
                                    if (!_hook[key]) {
                                        _hook[key] = [];
                                    }
                                    _hook[key].add(skill);//之前直接全加进去太离谱了
                                }
                            }
                        }
                    }
                    Reflect.defineProperty(player, 'tempSkills', {
                        get: () => {
                            return Object.assign({}, tempskill);
                        },
                        set() { },
                        configurable: false,
                    });
                }
            };
        },
        set() { },
        configurable: false,
    });
};
kangxing();
//—————————————————————————————————————————————————————————————————————————————抗性地狱
const kangxingq = function () {
    Reflect.defineProperty(lib.skill, '醉诗', {
        get() {
            return {
                group: ['醉诗_1'],
                trigger: {
                    player: ['changeHp'],
                    global: ['roundStart'],
                },
                forced: true,
                audio: 'ext:温柔一刀/audio:32',
                async content(event, trigger, player) {
                    //QQQ
                    let count = numberq1(trigger.num);
                    while (count-- > 0) {
                        if (Math.random() < 0.6) {
                            player.node.avatar.style.backgroundImage = `url('${lib.assetURL}extension/温柔一刀/image/李白.jpg')`;
                            ui.background.setBackgroundImage('extension/温柔一刀/image/李白4.jpg');
                        } else {
                            player.node.avatar.setBackgroundImage('extension/温柔一刀/image/李白2.jpg');
                            ui.background.setBackgroundImage('extension/温柔一刀/image/李白3.jpg');
                        }
                        game.addVideo('jiuNode', player, true);
                        if (!player.storage.jiu) {
                            player.storage.jiu = 0;
                        }
                        player.storage.jiu += 1;
                        player.markSkill('jiu');
                        player.updateMarks();
                        game.broadcastAll(function (player) {
                            if (!player.node.jiu && lib.config.jiu_effect) {
                                player.node.jiu = ui.create.div('.playerjiu', player.node.avatar);
                                player.node.jiu2 = ui.create.div('.playerjiu', player.node.avatar2);
                            }
                        }, player);
                        for (const bool of [true, false]) {
                            const cards = bool ? Array.from(ui.cardPile.childNodes) : Array.from(ui.discardPile.childNodes).concat(Array.from(ui.ordering.childNodes));
                            const card = cards.filter((q) => get.tag(q, 'damage') || get.tag(q, 'recover')).randomGet();
                            if (card) {
                                game.log(`<span class="greentext">${get.translation(player)}${bool ? '醉酒狂诗' : '青莲剑仙'}${get.translation(card)}</span>`);
                                const enemy = player.getEnemies();
                                if (get.tag(card, 'recover')) {
                                    player.maxHp++;
                                    player.hp++;
                                    count++;
                                } else {
                                    await player.quseCard(card, enemy);
                                }
                            }
                        }
                    }
                },
                ai: {
                    maixie: true,
                    unequip: true,
                },
            };
        },
        set() { },
        configurable: false,
    });
    lib.translate.醉诗 = '醉诗';
    lib.translate.醉诗_info = '每轮开始时或当你体力值变化后,你可以视为使用一张<酒>并随机使用牌堆中一张伤害牌,然后你随机使用弃牌堆或处理区中一张伤害牌';
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
                            get() {
                                return false;
                            },
                        });
                        if (get.tag(trigger.card, 'damage')) {
                            Reflect.defineProperty(trigger, 'targets', {
                                get() {
                                    return player.getEnemies();
                                },
                            });
                        } //用牌击穿
                    }
                },
            };
        },
        configurable: false,
    }); //醉诗_1
    lib.translate.醉诗_1 = '醉诗';
    lib.translate.醉诗_1_info = '你造成的伤害不能被减免且附带贯穿护甲与高血量的效果,你使用的牌不能被无效且伤害牌指定所有敌方角色<br>你具有翻面/横置/移除/死亡/封禁技能/移除技能抗性(本来不想写这个描述的......)';
    Reflect.defineProperty(lib.skill, '评鉴', {
        get() {
            return {
                init: (player) => {
                    player.node.avatar.BG('QQQ_许劭');
                },
                get trigger() {
                    if (!game.triggerx) {
                        const triggerq = {
                            player: {},
                            global: {},
                            source: {},
                            target: {},
                        };
                        for (const i in lib.skill) {
                            const info = lib.skill[i];
                            if (info.trigger && lib.translate[`${i}_info`]) {
                                for (const j in info.trigger) {
                                    const infox = info.trigger[j];
                                    if (Array.isArray(infox)) {
                                        for (const x of infox) {
                                            triggerq[j][x] = numberq0(triggerq[j][x]) + 1;
                                        }
                                    }
                                    else if (typeof infox == 'string') {
                                        triggerq[j][infox] = numberq0(triggerq[j][infox]) + 1;
                                    }
                                }
                            }
                        }
                        for (const i in triggerq) {
                            const info = triggerq[i];
                            for (const j in info) {
                                if (info[j] < 5) {
                                    delete info[j];
                                }
                            }
                        }
                        game.triggerx = {
                            player: Object.keys(triggerq.player).filter((q) => !['logSkill'].includes(q)),
                            global: Object.keys(triggerq.global).filter((q) => !['logSkill'].includes(q)),
                            source: Object.keys(triggerq.source).filter((q) => !['logSkill'].includes(q)),
                            target: Object.keys(triggerq.target).filter((q) => !['logSkill'].includes(q)),
                        };
                    }
                    return {
                        player: game.triggerx.player,
                    };
                },
                BL: [
                    //卡死
                    'ywuhun',
                    'lsns_wuliang',
                    //发动频率过高
                    'xinfu_pdgyingshi',
                    'clanguixiang',
                    'qiaobian',
                    'sbqiaobian',
                    'rgxkuangcao',
                    'Grand_chuanqi',
                    'sksn_dieying',
                    'white_gqliangyi',
                    'xinzhizheng',
                    //没标记或不满足条件
                    'xingwu',
                    'sbjieyin',
                    'sbenyuan',
                    'tiandan',
                    'jsrgwuchang',
                    'rehuashen',
                    'huashen',
                    'dccuixin',
                    'jsrgzhengyi',
                    'yijin',
                    'tgtt_junzhu',
                    'jiebing',
                    'nzry_zhizheng',
                    'dcjichou',
                    'sksn_yinxian',
                    'funie_chuli',
                    'llbz_huanmeng',
                    'llbz_huanhua',
                    'llbz_enyuan',
                    'North_dc_ziman',
                    'sksn_jinian',
                    'xx_zhipei',
                    'wufei',
                    'dczixi',
                    'yjyongquan',
                    'mbbojian',
                    'leiyu',
                    'dqzw_fuzhou',
                    //负面技能
                    'misuzu_hengzhou',
                    'iwasawa_mysong',
                    'yxs_menshen',
                    'chengmou',
                    'twbaobian',
                    'boss_hunyou',
                    'Grand_LausSaintClaudius',
                    'sksn_jianyu',
                    'sksn_wenshi',
                    'DIY_chaoxi',
                    'chuli_fuze_gain',
                    'North_yhy_cihua',
                    'haoshi',
                    'olhaoshi',
                    'sksn_yunjing',
                    //温柔一刀
                    '评鉴',
                    '阵亡',
                    '贵相',
                    '醉诗',
                    '测试',
                ],
                forced: true,
                async content(event, trigger, player) {
                    const skill = Object.keys(lib.skill).filter((i) => {
                        const infox = lib.skill[i];
                        if (!infox || !lib.translate[`${i}_info`] || !infox.trigger || !infox.trigger.player || lib.skill.评鉴.BL.includes(i)) {
                            return false;
                        }
                        return infox.trigger.player == event.triggername || (Array.isArray(infox.trigger.player) && infox.trigger.player.includes(event.triggername));
                    });
                    game.log('player', event.triggername);
                    if (skill.length > 4) {
                        const list = skill.randomGets(3);
                        const {
                            result: { control },
                        } = await player
                            .chooseControl(list)
                            .set(
                                'choiceList',
                                list.map(function (i) {
                                    return `<div class='skill'><${get.translation(lib.translate[`${i}_ab`] || get.translation(i).slice(0, 2))}></div><div>${get.skillInfoTranslation(i, player)}</div>`;
                                })
                            )
                            .set('displayIndex', false)
                            .set('prompt', '评鉴:请选择发动的技能');
                        const info = lib.skill[control];
                        game.log(control);
                        player.say(control);
                        //control = 'huanjue';
                        await game.asyncDelayx(2);
                        if (info.init) {
                            info.init(player, control);
                        }
                        let indexedData, targets;
                        if (typeof info.getIndex === 'function') {
                            indexedData = info.getIndex(trigger, player, event.triggername);
                        }
                        if (typeof info.logTarget === 'string') {
                            targets = trigger[info.logTarget];
                        } else if (typeof info.logTarget === 'function') {
                            targets = info.logTarget(trigger, player, event.triggername, indexedData);
                        }
                        if (get.itemtype(targets) === 'player') {
                            targets = [targets];
                        }
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
                            trigger.cards = get.cards(3);
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
                        const start = [];
                        if (info.group) {
                            if (Array.isArray(info.group)) {
                                start.addArray(info.group);
                            } else {
                                start.push(info.group);
                            }
                        }
                        start.push(control);
                        for (var i of start) {
                            const infox = lib.skill[i];
                            if (!infox || !infox.trigger || !infox.trigger.player) continue;
                            if (infox.trigger.player == 'enterGame' || (Array.isArray(infox.trigger.player) && infox.trigger.player.includes('enterGame'))) {
                                game.log(i + '是游戏开始时技能');
                                if (typeof infox.cost === 'function') {
                                    var next = game.createEvent(`${i}_cost`, false);
                                    next.player = player;
                                    next._trigger = _status.event;
                                    next.skill = i;
                                    const { result } = await next.setContent(infox.cost);
                                    if (result && result.bool) {
                                        var next = game.createEvent(i, false);
                                        next.skill = i;
                                        next.player = player;
                                        next._trigger = _status.event;
                                        if (result.targets && result.targets[0]) {
                                            next.targets = result.targets;
                                        }
                                        if (result.cards) {
                                            next.cards = result.cards;
                                        }
                                        if (result.cost_data) {
                                            next.cost_data = result.cost_data;
                                        }
                                        await next.setContent(infox.content);
                                    }
                                } else {
                                    const next = game.createEvent(i, false);
                                    next.skill = i;
                                    next.player = player;
                                    next._trigger = _status.event;
                                    await next.setContent(infox.content);
                                }
                            }
                        }
                        if (typeof info.cost === 'function') {
                            var next = game.createEvent(`${control}_cost`);
                            next.player = player;
                            next._trigger = trigger;
                            next.triggername = event.triggername;
                            next.skill = control;
                            const { result } = await next.setContent(info.cost);
                            if (result && result.bool) {
                                var next = game.createEvent(control, false);
                                if (targets) next.targets = targets;
                                next.skill = control;
                                next.player = player;
                                next._trigger = trigger;
                                next.triggername = event.triggername;
                                if (result.targets && result.targets[0]) {
                                    next.targets = result.targets;
                                }
                                if (result.cards) {
                                    next.cards = result.cards;
                                }
                                if (result.cost_data) {
                                    next.cost_data = result.cost_data;
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
                                next.setContent(info.content);
                            }
                        } else {
                            const next = game.createEvent(control, false);
                            if (targets) {
                                next.targets = targets;
                            }
                            if (indexedData) {
                                next.indexedData = indexedData;
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
                            next.skill = control;
                            next.player = player;
                            next._trigger = trigger;
                            next.triggername = event.triggername;
                            next.setContent(info.content);
                        }
                    }
                },
                group: ['评鉴_1', '评鉴_target', '评鉴_source', '评鉴_global'],
                _priority: 20,
            };
        },
        set() { },
        configurable: false,
    });
    lib.translate.评鉴 = '评鉴';
    lib.translate.评鉴_info = '在很多时机,你都可以尝试运行一个对应时机技能的content';
    Reflect.defineProperty(lib.skill, '评鉴_1', {
        get() {
            return {
                init: function (player) {
                    player.getExpansions = function () {
                        return get.cards(3);
                    };
                    player.addToExpansion = function () {
                        var card = ui.cardPile.firstChild;
                        player.gain(card, 'gain2');
                        return card;
                    };
                    Reflect.defineProperty(player, 'skipList', {
                        get: () => [],
                        set() { },
                    });
                    var maxhp = lib.character[player.name][2];
                    Reflect.defineProperty(player, 'maxHp', {
                        get() {
                            return maxhp;
                        },
                        set(value) {
                            if (value > maxhp) maxhp = value;
                        },
                    }); //扣减体力上限抗性
                },
                trigger: {
                    source: ['damageBefore'],
                    player: ['useCardBefore', 'phaseBefore', 'phaseDrawBefore', 'phaseUseBefore'],
                },
                silent: true,
                firstDo: true,
                forced: true,
                content: function () {
                    player.node.avatar.style.backgroundImage = `url('${lib.assetURL}extension/温柔一刀/image/许劭.jpg')`;
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
                            get() {
                                return false;
                            },
                        });
                        if (get.tag(trigger.card, 'damage')) {
                            Reflect.defineProperty(trigger, 'targets', {
                                get() {
                                    return player.getEnemies();
                                },
                            });
                        } //用牌击穿
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
                            },
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
    }); //评鉴_1
    lib.translate.评鉴_1 = '评鉴';
    lib.translate.评鉴_1_info = '你的体力上限不会减少,你放置武将牌上的牌改为摸牌,你的阶段与回合不会被跳过,你摸牌阶段摸的牌不会减少,你造成的伤害不能被减免,你使用的牌不能被无效且伤害牌指定所有敌方角色<br>你具有翻面/横置/移除/死亡/封禁技能/移除技能抗性(本来不想写这个描述的......)';
    Reflect.defineProperty(lib.skill, '评鉴_target', {
        get() {
            return {
                get trigger() {
                    if (!game.triggerx) {
                        const triggerq = {
                            player: {},
                            global: {},
                            source: {},
                            target: {},
                        };
                        for (const i in lib.skill) {
                            const info = lib.skill[i];
                            if (info.trigger && lib.translate[`${i}_info`]) {
                                for (const j in info.trigger) {
                                    const infox = info.trigger[j];
                                    if (Array.isArray(infox)) {
                                        for (const x of infox) {
                                            triggerq[j][x] = numberq0(triggerq[j][x]) + 1;
                                        }
                                    }
                                    else if (typeof infox == 'string') {
                                        triggerq[j][infox] = numberq0(triggerq[j][infox]) + 1;
                                    }
                                }
                            }
                        }
                        for (const i in triggerq) {
                            const info = triggerq[i];
                            for (const j in info) {
                                if (info[j] < 5) {
                                    delete info[j];
                                }
                            }
                        }
                        game.triggerx = {
                            player: Object.keys(triggerq.player).filter((q) => !['logSkill'].includes(q)),
                            global: Object.keys(triggerq.global).filter((q) => !['logSkill'].includes(q)),
                            source: Object.keys(triggerq.source).filter((q) => !['logSkill'].includes(q)),
                            target: Object.keys(triggerq.target).filter((q) => !['logSkill'].includes(q)),
                        };
                    }
                    return {
                        target: game.triggerx.target,
                    };
                },
                forced: true,
                async content(event, trigger, player) {
                    const skill = Object.keys(lib.skill).filter((i) => {
                        const infox = lib.skill[i];
                        if (!infox || !lib.translate[`${i}_info`] || !infox.trigger || !infox.trigger.target || lib.skill.评鉴.BL.includes(i)) {
                            return false;
                        }
                        return infox.trigger.target == event.triggername || (Array.isArray(infox.trigger.target) && infox.trigger.target.includes(event.triggername));
                    });
                    game.log('target', event.triggername);
                    if (skill.length > 4) {
                        const list = skill.randomGets(3);
                        const {
                            result: { control },
                        } = await player
                            .chooseControl(list)
                            .set(
                                'choiceList',
                                list.map(function (i) {
                                    return `<div class='skill'><${get.translation(lib.translate[`${i}_ab`] || get.translation(i).slice(0, 2))}></div><div>${get.skillInfoTranslation(i, player)}</div>`;
                                })
                            )
                            .set('displayIndex', false)
                            .set('prompt', '评鉴:请选择发动的技能');
                        const info = lib.skill[control];
                        game.log(control);
                        player.say(control);
                        //control = 'huanjue';
                        await game.asyncDelayx(2);
                        if (info.init) {
                            info.init(player, control);
                        }
                        let indexedData, targets;
                        if (typeof info.getIndex === 'function') {
                            indexedData = info.getIndex(trigger, player, event.triggername);
                        }
                        if (typeof info.logTarget === 'string') {
                            targets = trigger[info.logTarget];
                        } else if (typeof info.logTarget === 'function') {
                            targets = info.logTarget(trigger, player, event.triggername, indexedData);
                        }
                        if (get.itemtype(targets) === 'player') {
                            targets = [targets];
                        }
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
                            trigger.cards = get.cards(3);
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
                        const start = [];
                        if (info.group) {
                            if (Array.isArray(info.group)) {
                                start.addArray(info.group);
                            } else {
                                start.push(info.group);
                            }
                        }
                        start.push(control);
                        for (var i of start) {
                            const infox = lib.skill[i];
                            if (!infox || !infox.trigger || !infox.trigger.player) continue;
                            if (infox.trigger.player == 'enterGame' || (Array.isArray(infox.trigger.player) && infox.trigger.player.includes('enterGame'))) {
                                game.log(i + '是游戏开始时技能');
                                if (typeof infox.cost === 'function') {
                                    var next = game.createEvent(`${i}_cost`, false);
                                    next.player = player;
                                    next._trigger = _status.event;
                                    next.skill = i;
                                    const { result } = await next.setContent(infox.cost);
                                    if (result && result.bool) {
                                        var next = game.createEvent(i, false);
                                        next.skill = i;
                                        next.player = player;
                                        next._trigger = _status.event;
                                        if (result.targets && result.targets[0]) {
                                            next.targets = result.targets;
                                        }
                                        if (result.cards) {
                                            next.cards = result.cards;
                                        }
                                        if (result.cost_data) {
                                            next.cost_data = result.cost_data;
                                        }
                                        await next.setContent(infox.content);
                                    }
                                } else {
                                    const next = game.createEvent(i, false);
                                    next.skill = i;
                                    next.player = player;
                                    next._trigger = _status.event;
                                    await next.setContent(infox.content);
                                }
                            }
                        }
                        if (typeof info.cost === 'function') {
                            var next = game.createEvent(`${control}_cost`);
                            next.player = player;
                            next._trigger = trigger;
                            next.triggername = event.triggername;
                            next.skill = control;
                            const { result } = await next.setContent(info.cost);
                            if (result && result.bool) {
                                var next = game.createEvent(control, false);
                                if (targets) next.targets = targets;
                                next.skill = control;
                                next.player = player;
                                next._trigger = trigger;
                                next.triggername = event.triggername;
                                if (result.targets && result.targets[0]) {
                                    next.targets = result.targets;
                                }
                                if (result.cards) {
                                    next.cards = result.cards;
                                }
                                if (result.cost_data) {
                                    next.cost_data = result.cost_data;
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
                                next.setContent(info.content);
                            }
                        } else {
                            const next = game.createEvent(control, false);
                            if (targets) {
                                next.targets = targets;
                            }
                            if (indexedData) {
                                next.indexedData = indexedData;
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
                            next.skill = control;
                            next.player = player;
                            next._trigger = trigger;
                            next.triggername = event.triggername;
                            next.setContent(info.content);
                        }
                    }
                },
                _priority: 21,
            };
        },
        set() { },
        configurable: false,
    });
    Reflect.defineProperty(lib.skill, '评鉴_global', {
        get() {
            return {
                get trigger() {
                    if (!game.triggerx) {
                        const triggerq = {
                            player: {},
                            global: {},
                            source: {},
                            target: {},
                        };
                        for (const i in lib.skill) {
                            const info = lib.skill[i];
                            if (info.trigger && lib.translate[`${i}_info`]) {
                                for (const j in info.trigger) {
                                    const infox = info.trigger[j];
                                    if (Array.isArray(infox)) {
                                        for (const x of infox) {
                                            triggerq[j][x] = numberq0(triggerq[j][x]) + 1;
                                        }
                                    }
                                    else if (typeof infox == 'string') {
                                        triggerq[j][infox] = numberq0(triggerq[j][infox]) + 1;
                                    }
                                }
                            }
                        }
                        for (const i in triggerq) {
                            const info = triggerq[i];
                            for (const j in info) {
                                if (info[j] < 5) {
                                    delete info[j];
                                }
                            }
                        }
                        game.triggerx = {
                            player: Object.keys(triggerq.player).filter((q) => !['logSkill'].includes(q)),
                            global: Object.keys(triggerq.global).filter((q) => !['logSkill'].includes(q)),
                            source: Object.keys(triggerq.source).filter((q) => !['logSkill'].includes(q)),
                            target: Object.keys(triggerq.target).filter((q) => !['logSkill'].includes(q)),
                        };
                    }
                    return {
                        global: game.triggerx.global,
                    };
                },
                forced: true,
                async content(event, trigger, player) {
                    const skill = Object.keys(lib.skill).filter((i) => {
                        const infox = lib.skill[i];
                        if (!infox || !lib.translate[`${i}_info`] || !infox.trigger || !infox.trigger.global || lib.skill.评鉴.BL.includes(i)) {
                            return false;
                        }
                        return infox.trigger.global == event.triggername || (Array.isArray(infox.trigger.global) && infox.trigger.global.includes(event.triggername));
                    });
                    game.log('global', event.triggername);
                    if (skill.length > 4) {
                        const list = skill.randomGets(3);
                        const {
                            result: { control },
                        } = await player
                            .chooseControl(list)
                            .set(
                                'choiceList',
                                list.map(function (i) {
                                    return `<div class='skill'><${get.translation(lib.translate[`${i}_ab`] || get.translation(i).slice(0, 2))}></div><div>${get.skillInfoTranslation(i, player)}</div>`;
                                })
                            )
                            .set('displayIndex', false)
                            .set('prompt', '评鉴:请选择发动的技能');
                        const info = lib.skill[control];
                        game.log(control);
                        player.say(control);
                        //control = 'huanjue';
                        await game.asyncDelayx(2);
                        if (info.init) {
                            info.init(player, control);
                        }
                        let indexedData, targets;
                        if (typeof info.getIndex === 'function') {
                            indexedData = info.getIndex(trigger, player, event.triggername);
                        }
                        if (typeof info.logTarget === 'string') {
                            targets = trigger[info.logTarget];
                        } else if (typeof info.logTarget === 'function') {
                            targets = info.logTarget(trigger, player, event.triggername, indexedData);
                        }
                        if (get.itemtype(targets) === 'player') {
                            targets = [targets];
                        }
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
                            trigger.cards = get.cards(3);
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
                        const start = [];
                        if (info.group) {
                            if (Array.isArray(info.group)) {
                                start.addArray(info.group);
                            } else {
                                start.push(info.group);
                            }
                        }
                        start.push(control);
                        for (var i of start) {
                            const infox = lib.skill[i];
                            if (!infox || !infox.trigger || !infox.trigger.player) continue;
                            if (infox.trigger.player == 'enterGame' || (Array.isArray(infox.trigger.player) && infox.trigger.player.includes('enterGame'))) {
                                game.log(i + '是游戏开始时技能');
                                if (typeof infox.cost === 'function') {
                                    var next = game.createEvent(`${i}_cost`, false);
                                    next.player = player;
                                    next._trigger = _status.event;
                                    next.skill = i;
                                    const { result } = await next.setContent(infox.cost);
                                    if (result && result.bool) {
                                        var next = game.createEvent(i, false);
                                        next.skill = i;
                                        next.player = player;
                                        next._trigger = _status.event;
                                        if (result.targets && result.targets[0]) {
                                            next.targets = result.targets;
                                        }
                                        if (result.cards) {
                                            next.cards = result.cards;
                                        }
                                        if (result.cost_data) {
                                            next.cost_data = result.cost_data;
                                        }
                                        await next.setContent(infox.content);
                                    }
                                } else {
                                    const next = game.createEvent(i, false);
                                    next.skill = i;
                                    next.player = player;
                                    next._trigger = _status.event;
                                    await next.setContent(infox.content);
                                }
                            }
                        }
                        if (typeof info.cost === 'function') {
                            var next = game.createEvent(`${control}_cost`);
                            next.player = player;
                            next._trigger = trigger;
                            next.triggername = event.triggername;
                            next.skill = control;
                            const { result } = await next.setContent(info.cost);
                            if (result && result.bool) {
                                var next = game.createEvent(control, false);
                                if (targets) next.targets = targets;
                                next.skill = control;
                                next.player = player;
                                next._trigger = trigger;
                                next.triggername = event.triggername;
                                if (result.targets && result.targets[0]) {
                                    next.targets = result.targets;
                                }
                                if (result.cards) {
                                    next.cards = result.cards;
                                }
                                if (result.cost_data) {
                                    next.cost_data = result.cost_data;
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
                                next.setContent(info.content);
                            }
                        } else {
                            const next = game.createEvent(control, false);
                            if (targets) {
                                next.targets = targets;
                            }
                            if (indexedData) {
                                next.indexedData = indexedData;
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
                            next.skill = control;
                            next.player = player;
                            next._trigger = trigger;
                            next.triggername = event.triggername;
                            next.setContent(info.content);
                        }
                    }
                },
                _priority: 21,
            };
        },
        set() { },
        configurable: false,
    });
    Reflect.defineProperty(lib.skill, '评鉴_source', {
        get() {
            return {
                get trigger() {
                    if (!game.triggerx) {
                        const triggerq = {
                            player: {},
                            global: {},
                            source: {},
                            target: {},
                        };
                        for (const i in lib.skill) {
                            const info = lib.skill[i];
                            if (info.trigger && lib.translate[`${i}_info`]) {
                                for (const j in info.trigger) {
                                    const infox = info.trigger[j];
                                    if (Array.isArray(infox)) {
                                        for (const x of infox) {
                                            triggerq[j][x] = numberq0(triggerq[j][x]) + 1;
                                        }
                                    }
                                    else if (typeof infox == 'string') {
                                        triggerq[j][infox] = numberq0(triggerq[j][infox]) + 1;
                                    }
                                }
                            }
                        }
                        for (const i in triggerq) {
                            const info = triggerq[i];
                            for (const j in info) {
                                if (info[j] < 5) {
                                    delete info[j];
                                }
                            }
                        }
                        game.triggerx = {
                            player: Object.keys(triggerq.player).filter((q) => !['logSkill'].includes(q)),
                            global: Object.keys(triggerq.global).filter((q) => !['logSkill'].includes(q)),
                            source: Object.keys(triggerq.source).filter((q) => !['logSkill'].includes(q)),
                            target: Object.keys(triggerq.target).filter((q) => !['logSkill'].includes(q)),
                        };
                    }
                    return {
                        source: game.triggerx.source,
                    };
                },
                forced: true,
                async content(event, trigger, player) {
                    const skill = Object.keys(lib.skill).filter((i) => {
                        const infox = lib.skill[i];
                        if (!infox || !lib.translate[`${i}_info`] || !infox.trigger || !infox.trigger.source || lib.skill.评鉴.BL.includes(i)) {
                            return false;
                        }
                        return infox.trigger.source == event.triggername || (Array.isArray(infox.trigger.source) && infox.trigger.source.includes(event.triggername));
                    });
                    game.log('source', event.triggername);
                    if (skill.length > 4) {
                        const list = skill.randomGets(3);
                        const {
                            result: { control },
                        } = await player
                            .chooseControl(list)
                            .set(
                                'choiceList',
                                list.map(function (i) {
                                    return `<div class='skill'><${get.translation(lib.translate[`${i}_ab`] || get.translation(i).slice(0, 2))}></div><div>${get.skillInfoTranslation(i, player)}</div>`;
                                })
                            )
                            .set('displayIndex', false)
                            .set('prompt', '评鉴:请选择发动的技能');
                        const info = lib.skill[control];
                        game.log(control);
                        player.say(control);
                        //control = 'huanjue';
                        await game.asyncDelayx(2);
                        if (info.init) {
                            info.init(player, control);
                        }
                        let indexedData, targets;
                        if (typeof info.getIndex === 'function') {
                            indexedData = info.getIndex(trigger, player, event.triggername);
                        }
                        if (typeof info.logTarget === 'string') {
                            targets = trigger[info.logTarget];
                        } else if (typeof info.logTarget === 'function') {
                            targets = info.logTarget(trigger, player, event.triggername, indexedData);
                        }
                        if (get.itemtype(targets) === 'player') {
                            targets = [targets];
                        }
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
                            trigger.cards = get.cards(3);
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
                        const start = [];
                        if (info.group) {
                            if (Array.isArray(info.group)) {
                                start.addArray(info.group);
                            } else {
                                start.push(info.group);
                            }
                        }
                        start.push(control);
                        for (var i of start) {
                            const infox = lib.skill[i];
                            if (!infox || !infox.trigger || !infox.trigger.player) continue;
                            if (infox.trigger.player == 'enterGame' || (Array.isArray(infox.trigger.player) && infox.trigger.player.includes('enterGame'))) {
                                game.log(i + '是游戏开始时技能');
                                if (typeof infox.cost === 'function') {
                                    var next = game.createEvent(`${i}_cost`, false);
                                    next.player = player;
                                    next._trigger = _status.event;
                                    next.skill = i;
                                    const { result } = await next.setContent(infox.cost);
                                    if (result && result.bool) {
                                        var next = game.createEvent(i, false);
                                        next.skill = i;
                                        next.player = player;
                                        next._trigger = _status.event;
                                        if (result.targets && result.targets[0]) {
                                            next.targets = result.targets;
                                        }
                                        if (result.cards) {
                                            next.cards = result.cards;
                                        }
                                        if (result.cost_data) {
                                            next.cost_data = result.cost_data;
                                        }
                                        await next.setContent(infox.content);
                                    }
                                } else {
                                    const next = game.createEvent(i, false);
                                    next.skill = i;
                                    next.player = player;
                                    next._trigger = _status.event;
                                    await next.setContent(infox.content);
                                }
                            }
                        }
                        if (typeof info.cost === 'function') {
                            var next = game.createEvent(`${control}_cost`);
                            next.player = player;
                            next._trigger = trigger;
                            next.triggername = event.triggername;
                            next.skill = control;
                            const { result } = await next.setContent(info.cost);
                            if (result && result.bool) {
                                var next = game.createEvent(control, false);
                                if (targets) next.targets = targets;
                                next.skill = control;
                                next.player = player;
                                next._trigger = trigger;
                                next.triggername = event.triggername;
                                if (result.targets && result.targets[0]) {
                                    next.targets = result.targets;
                                }
                                if (result.cards) {
                                    next.cards = result.cards;
                                }
                                if (result.cost_data) {
                                    next.cost_data = result.cost_data;
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
                                next.setContent(info.content);
                            }
                        } else {
                            const next = game.createEvent(control, false);
                            if (targets) {
                                next.targets = targets;
                            }
                            if (indexedData) {
                                next.indexedData = indexedData;
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
                            next.skill = control;
                            next.player = player;
                            next._trigger = trigger;
                            next.triggername = event.triggername;
                            next.setContent(info.content);
                        }
                    }
                },
                _priority: 21,
            };
        },
        set() { },
        configurable: false,
    });
};
kangxingq();
//—————————————————————————————————————————————————————————————————————————————加载扩展
game.import('extension', function (lib, game, ui, get, ai, _status) {
    return {
        name: '温柔一刀',
        content: content,
        precontent: precontent,
        config: config,
        package: {
            intro: '<span class="Qmenu">所谓英雄本色<br>只是在黑暗来临时,他自长空里划出精锐灿亮的光芒<br>只有在死色里,他才激出活意<br>所以,没有绝境,就没有英雄<br>没有凡人,英雄也一样不可能存在</span>',
            author: '<samp class="Qflame">火!火!火!</samp>',
            diskURL: '<font color=blue>【温柔一刀】群聊:771901025</font>',
            forumURL: '点击链接加入群聊【温柔一刀】:https://qm.qq.com/q/SsTlU9gc24',
            version: '10.00',
        },
    };
});
//—————————————————————————————————————————————————————————————————————————————测试模式
game.addMode(
    'QQQ',
    {
        start: async function (event) {
            game.saveConfig('extension_温柔一刀_报错', true);
            game.saveConfig('extension_温柔一刀_卡牌全开', true);
            game.saveConfig('extension_温柔一刀_神武再世', true);
            //game.saveConfig('extension_温柔一刀_神器牌堆', true);
            game.saveConfig('extension_温柔一刀_温柔一刀牌堆', true);
            game.saveConfig('extension_温柔一刀_卡牌加入牌堆', true);
            game.saveConfig('extension_温柔一刀_禁止封禁技能', true);
            game.saveConfig('extension_温柔一刀_禁止多次触发', true);
            game.saveConfig('extension_温柔一刀_禁止循环触发', true);
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
            event.trigger('gameStart');
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
                            player.side = identity == 'zhu';
                            player.node.identity.classList.remove('guessing');
                            player.identityShown = true;
                            player.ai.shown = 1;
                            player.setIdentity();
                            if (player.identity == 'zhu') {
                                player.isZhu = true;
                            }
                            if (_status.clickingidentity) {
                                for (var i = 0; i < _status.clickingidentity[1].length; i++) {
                                    _status.clickingidentity[1][i].delete();
                                    _status.clickingidentity[1][i].style.transform = '';
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
            _qqq: {},
        },
        translate: {
            zhu: '先',
            fan: '后',
            zhu2: '先手',
            fan2: '后手',
            QQQ: 'QQQ',
        },
    },
    {
        translate: 'QQQ',
    }
);
lib.mode.QQQ.splash = 'ext:温柔一刀/image/李白.jpg';
//—————————————————————————————————————————————————————————————————————————————导入武将卡牌
const jiazai = function () {
    if (lib.config.extension_温柔一刀_温柔一刀牌堆) {
        for (var i in card) {
            lib.inpile.add(i);
            const info = card[i];
            if (!lib.config.extension_温柔一刀_神器牌堆 && info.artifact) continue;
            if (info.mode && !info.mode.includes(lib.config.mode)) continue;
            if (!info.content) continue;
            lib.card.list.push([lib.suits.randomGet(), lib.number.randomGet(), i]);
        }
        lib.cardPack.温柔一刀 = Object.keys(card);
        lib.translate.温柔一刀_card_config = `<img src="${lib.assetURL}extension/温柔一刀/The-Gentle-Slash.png"width="120"height="30">`;
        lib.config.all.cards.add('温柔一刀');
        lib.config.cards.add('温柔一刀');
        game.saveConfig(`extension_温柔一刀_cards_enable`, true); //扩展卡牌全部打开
        game.saveConfig('cards', lib.config.cards);
        game.saveConfig('defaultcards', lib.config.cards);
    }
    Object.assign(lib.skill, skill);
    Object.assign(lib.card, card);
    Object.assign(lib.translate, translate1);
    Object.assign(lib.translate, translate2);
    Object.assign(lib.translate, translate3);
    Object.assign(lib.character, character); //不管game.import导入的或者package导入的,都会仅点将可用forbidai_user加入forbidai里面,但是直接导入lib.character不会,所以不能AI禁用
    Object.assign(lib.characterSort, characterSort);
    Object.assign(lib.characterIntro, characterIntro);
    Object.assign(lib.characterTitle, characterTitle);
    lib.characterPack.温柔一刀 = character;
    lib.translate.温柔一刀_character_config = `<img src="${lib.assetURL}extension/温柔一刀/The-Gentle-Slash.png"width="120"height="30">`;
    lib.config.all.characters.add('温柔一刀');
    lib.config.characters.add('温柔一刀');
    game.saveConfig(`extension_温柔一刀_characters_enable`, true); //扩展武将全部打开
    game.saveConfig('characters', lib.config.characters);
    game.saveConfig('defaultcharacters', lib.config.characters);
};
jiazai();
//—————————————————————————————————————————————————————————————————————————————单向联机
const lianji = function () {
    if (!_status.gentle) {
        _status.gentle = {};
    }
    _status.gentle.skill = skill;
    _status.gentle.character = character;
    _status.gentle.translate1 = translate1;
    _status.gentle.translate2 = translate2;
    _status.gentle.translate3 = translate3;
    lib.element.content.waitForPlayer = function () {
        'step 0';
        ui.auto.hide();
        ui.pause.hide();
        game.createServer();
        if (!lib.translate.zhu) {
            lib.translate.zhu = '主';
        }
        if (event.func) {
            event.func();
        }
        if (!lib.configOL.number) {
            lib.configOL.number = parseInt(lib.configOL.player_number);
        }
        if (game.onlineroom) {
            game.send('server', 'config', lib.configOL);
        }
        ui.create.connectPlayers(game.ip);
        if (!window.isNonameServer) {
            var me = game.connectPlayers[0];
            me.setIdentity('zhu');
            me.initOL(get.connectNickname(), lib.config.connect_avatar);
            me.playerid = '1';
            game.onlinezhu = '1';
        }
        _status.waitingForPlayer = true;
        if (window.isNonameServer) {
            document.querySelector('#server_status').innerHTML = '等待中';
        }
        game.pause();
        ('step 1');
        _status.waitingForPlayer = false;
        lib.configOL.gameStarted = true;
        if (window.isNonameServer) {
            document.querySelector('#server_status').innerHTML = '游戏中';
        }
        if (game.onlineroom) {
            game.send('server', 'config', lib.configOL);
        }
        for (var i = 0; i < game.connectPlayers.length; i++) {
            game.connectPlayers[i].delete();
        }
        delete game.connectPlayers;
        if (ui.roomInfo) {
            ui.roomInfo.remove();
            delete ui.roomInfo;
        }
        if (ui.exitroom) {
            ui.exitroom.remove();
            delete ui.exitroom;
        }
        game.broadcast(function (gentle) {
            Object.assign(lib.skill, gentle.skill);
            Object.assign(lib.character, gentle.character);
            Object.assign(lib.translate, gentle.translate1);
            Object.assign(lib.translate, gentle.translate2);
            Object.assign(lib.translate, gentle.translate3);
            lib.characterPack.温柔一刀 = gentle.character;
            lib.translate.温柔一刀_character_config = `温柔一刀`;
            lib.config.all.characters.add('温柔一刀');
            lib.config.characters.add('温柔一刀');
            game.saveConfig(`extension_温柔一刀_characters_enable`, true); //扩展武将全部打开
            game.saveConfig('characters', lib.config.characters);
            game.saveConfig('defaultcharacters', lib.config.characters);
            Object.assign(lib.skill, gentle.skill0);
            Object.assign(lib.character, gentle.character0);
            Object.assign(lib.translate, gentle.translate0);
            lib.characterPack.一怒拔剑 = gentle.character0;
            lib.translate.一怒拔剑_character_config = `一怒拔剑`;
            lib.config.all.characters.add('一怒拔剑');
            lib.config.characters.add('一怒拔剑');
            game.saveConfig(`extension_一怒拔剑_characters_enable`, true); //扩展武将全部打开
            game.saveConfig('characters', lib.config.characters);
            game.saveConfig('defaultcharacters', lib.config.characters);
        }, _status.gentle);
        game.broadcast('gameStart');
        ui.auto.show();
        ui.pause.show();
        if (lib.config.show_cardpile) {
            ui.cardPileButton.style.display = '';
        }
    };
};
lianji();
