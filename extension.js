import { lib, game, ui, get, ai, _status } from '../../noname.js';
import { precontent } from './precontent.js';
import { content } from './content.js';
import { config } from './config.js';
import('./character.js');
import('./card.js');
import('./skill.js');
if (QQQ.config.扩展导入) {
    game.getFileList('extension', function (fold, file) {
        for (const i of Array.from(fold)) {
            if (['coin', 'boss', 'wuxing', 'cardpile'].includes(i)) continue;
            lib.config.extensions.add(i);
        }
        game.saveConfig('extensions', lib.config.extensions);
    });
} //扩展全部导入
if (QQQ.config.扩展全开) {
    for (const i of lib.config.extensions) {
        if (![].includes(i)) {
            game.saveConfig(`extension_${i}_enable`, true); //扩展全部打开
        }
    }
} //扩展全部打开
if (QQQ.config.扩展全关) {
    for (const i of lib.config.extensions) {
        if (!['温柔一刀'].includes(i)) {
            game.saveConfig(`extension_${i}_enable`, false);
        } //扩展全部关闭
    }
} //扩展全部关闭
if (QQQ.config.扩展修改) {
    var Q = [
        'BGM', '温柔一刀', '红莲灿世', '火灵月影', 'EX技能', '缺德扩展', '梦水何婉', '神通世界',
        '三国全系列', '云将', '贴吧精品', '梦隐', '众星起源', '五行天师', '胜负统计', '萌将坛',
    ];
    game.saveConfig('extensions', Q); //扩展修改
} //扩展修改
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
        value() {
            return [];
        },
    });//清空数组
    Reflect.defineProperty(Array.prototype, 'Qinclude', {
        configurable: true,
        enumerable: false,
        writable: true,
        value(arr) {
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
//—————————————————————————————————————————————————————————————————————————————boss模式相关函数,目前改用代理来排序
const boss = function () {
    lib.skill._sort = {
        trigger: {
            player: ['phaseEnd'],
        },
        silent: true,
        forceDie: true,
        forceOut: true,
        filter: () => game.sort(),
        async content(event, trigger, player) { },
    }; //排座位
    let _me;
    Reflect.defineProperty(game, 'me', {
        get() {
            return _me;
        },
        set(v) {
            _me = v;
            if (game.players.includes(v) && game.players[0] != v) {//这样挑战模式不管选什么挑战李白都会变成game.me是李白,因为李白最先进入players
                game.nosort = true;
                while (game.players[0] != v) {
                    const start = game.players.shift();
                    game.players.push(start);
                }
                game.nosort = false;
                game.sort();
            }//如果数组target[meIndex]是李白,那么替换掉的一瞬间,接下来调用就会再添加一个李白,导致数组两个李白
        },//更换game.me之后第一时间排序
    });
    game.sort = function (players) {
        if (game.nosort) return false;
        if (!players) players = game.players;
        ui.arena.setNumber(players.length);
        game.dead.forEach((player) => {
            player.classList.add('removing');
            player.classList.add('hidden');
        });
        if (players.includes(game.me) && players[0] != game.me) {
            game.nosort = true;
            while (players[0] != game.me) {
                const start = players.shift();
                players.push(start);
            }
            game.nosort = false;
        }//后面复活也要排序
        players.forEach((player, index, array) => {
            if (index == 0 && ui.handcards1Container && ui.handcards1Container.firstChild != player.node.handcards1) {
                while (ui.handcards1Container.firstChild) {
                    ui.handcards1Container.firstChild.remove();
                }
                ui.handcards1Container.appendChild(player.node.handcards1.addTempClass('start').fix());
                if (game.me != player) {
                    ui.updatehl();
                }
            }
            player.classList.remove('removing');
            player.classList.remove('hidden');
            player.dataset.position = index;
            const zhu = _status.roundStart || game.zhu || array.find((p) => p.seatNum == 1) || game.boss || array[0];
            if (zhu) {
                if (index < (zhu.dataset && zhu.dataset.position) || 0) {
                    player.seatNum = players.length - (zhu.dataset && zhu.dataset.position) + index + 1;
                } else {
                    player.seatNum = index - (zhu.dataset && zhu.dataset.position) + 1;
                }
            }
            player.previous = array[index === 0 ? array.length - 1 : index - 1];
            player.next = array[index === array.length - 1 ? 0 : index + 1];
        });
        players.concat(game.dead).forEach((player, index, array) => {
            player.previousSeat = array[index === 0 ? array.length - 1 : index - 1];
            player.nextSeat = array[index === array.length - 1 ? 0 : index + 1];
        });
        return true;
    };
    game.players = new Proxy([], {
        set(target, property, value) {
            const result = Reflect.set(target, property, value);
            if (property === 'length') {
                game.sort();
            }
            return result;
        },
    });
    game.dead = new Proxy([], {
        set(target, property, value) {
            const result = Reflect.set(target, property, value);
            if (property === 'length') {
                game.sort();
            }
            return result;
        },
    });
    game.kong = {
        set() {
            return this;
        },
        get player() {
            return game.me;
        }, //先声明后赋值的,后面调用会是underfined,所以用getter实时获取
        cards: [],
        result: {
            cards: [],
        },
        gaintag: [],
        forResult() { },
    };
    game.changeBossQ = function (name) {
        _status.event.forceDie = true;
        const boss = game.addPlayerQ(name);
        boss.side = true;
        if (game.additionaldead) {
            game.additionaldead.push(game.boss);
        } else {
            game.additionaldead = [game.boss];
        }
        boss.setIdentity('zhu');
        boss.identity = 'zhu';
        const player = game.boss;
        game.boss = boss;
        game.addVideo('bossSwap', player, '_' + boss.name);
        if (game.me == player) {
            game.swapControl(boss);
        }
        return boss;
    };
    game.addPlayerQ = function (name) {
        const player = ui.create.player(ui.arena).addTempClass('start');
        player.getId();
        if (name) player.init(name);
        game.players.push(player);
        player.draw(Math.min(player.maxHp, 20));
        return player;
    };
    game.addFellowQ = function (name) {
        game.log('boss增加了随从', name);
        const player = game.addPlayerQ(name);
        player.side = true;
        player.identity = 'zhong';
        player.setIdentity('zhong');
        game.addVideo('setIdentity', player, 'zhong');
        return player;
    };
    lib.element.player.addFellow = function (name) {
        const npc = game.addPlayerQ(name);
        this.guhuo(npc);
        return npc;
    }; //添加随从
    lib.element.player.guhuo = function (target) {
        target.side = this.side;
        target.identity = this.identity;
        target.setIdentity(this.identity, 'blue');
        target.boss = this;
        target.ai.modAttitudeFrom = function (from, to, att) {
            //这里from是本人
            if (to == from.boss) return 99;
            return att;
        };
        target.ai.modAttitudeTo = function (from, to, att) {
            //这里to是本人
            if (to.boss == from) return 99;
            return att;
        };
        return target;
    }; //令一名角色服从你
};
boss();
//—————————————————————————————————————————————————————————————————————————————加载扩展
const extensionInfo = await lib.init.promises.json(`extension/温柔一刀/info.json`);
game.import('extension', function (lib, game, ui, get, ai, _status) {
    const QQQ = {
        name: '温柔一刀',
        content: content,
        precontent: precontent,
        config: config,
        package: {},
    };
    Object.assign(QQQ.package, extensionInfo);
    return QQQ;
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
            for (const i of game.players) {
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
            showIdentity() { },
            checkResult() {
                game.over((game.me._trueMe || game.me).isAlive());
            },
        },
        element: {
            player: {
                dieAfter() {
                    if (game.players.length < 2) game.checkResult();
                },
                showIdentity() {
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
            attitude(from, to) {
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
lib.mode.QQQ.splash = 'ext:温柔一刀/image/beijing1.jpg';
//—————————————————————————————————————————————————————————————————————————————单向联机
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