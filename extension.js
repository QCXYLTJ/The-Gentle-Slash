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
        '三国全系列', '云将', '贴吧精品', '梦隐', '众星起源', '小镜子', '次元世界', '太虚幻境',
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
        arenaReady() {
            console.log(Object.keys(lib.skill).length, 'lib.arenaReady', 'skill');
            console.log(Object.keys(lib.card).length, 'card');
            console.log(Object.keys(lib.character).length, 'character');
            game.finishCards();
            if (QQQ.config.卖血模式) {
                lib.skill.yuqi.ai = { maixie: true };
                lib.skill.luochong.ai = { maixie: true };
                lib.skill.xinyaoming.ai = { maixie: true };
                lib.skill.xinfu_andong.ai = { maixie: true };
                lib.skill.yachai.ai = { maixie: true };
                lib.skill.yaoming.ai.maixie = true;
                lib.skill.clanxieshu.ai.maixie = true;
            }
            if (!_status.characterlist) {
                _status.characterlist = Object.keys(lib.character);
            }
            if (!lib.type) {
                lib.type = [];
            }
            for (const i in lib.card) {
                const info = lib.card[i];
                if (typeof info != 'object') {
                    if (QQQ.config.报错) {
                        alert(i + 'info不是对象');
                    }
                    continue;
                }
                if (!lib.type.includes(info.type)) {
                    lib.type.push(info.type);
                }
                if (info.destroy) {
                    delete info.destroy;
                } //禁止销毁
                if (!info.content) continue;
                if (QQQ.config.报错) {
                    if (info.enable == 'phaseUse') {
                        alert(i + 'enable有问题');
                    }
                    if (!info.type) {
                        alert(i + 'type有问题');
                    }
                    if (info.type == 'equip') {
                        if (!info.subtype) {
                            console.log(i + '没有subtype');
                        }
                        if (['equip2', 'equip1', 'equip5'].includes(info.subtype) && !info.skills) {
                            console.log(i + '没有装备技能');
                        }
                        if (!info.ai.equipValue && !info.ai.basic.equipValue) {
                            alert(i + '没有装备AI');
                        }
                    }
                    if (info.type == 'delay') {
                        if (!info.ai || !info.ai.result || !info.ai.result.target) {
                            alert(i + 'delay没有result');
                        }
                    }
                }
                if (QQQ.config.卡牌加入牌堆) {
                    if (lib.cardPack.温柔一刀?.includes(i)) continue;//不重复添加温柔一刀牌堆
                    if (info.mode && !info.mode.includes(lib.config.mode)) continue;
                    if (!lib.translate[`${i}_info`]) continue;
                    lib.card.list.push([lib.suits.randomGet(), lib.number.randomGet(), i]);
                }
            } //卡牌加入牌堆
            lib.config.all.characters.add('温柔一刀');
            lib.connectCardPack.add('温柔一刀');
            lib.connectCharacterPack.add('温柔一刀');
            for (const i in lib.character) {
                const info = lib.character[i];
                if (typeof info != 'object') {
                    if (QQQ.config.报错) {
                        alert(i + 'info不是对象');
                    }
                    continue;
                }
                if (!QQQ.config.BOSS) {
                    info.isBoss = false;
                } //BOSS
                if (QQQ.config.武将全开) {
                    info.isAiForbidden = false; //AI禁用
                    info.isUnseen = false; //隐藏
                }
                if (QQQ.config.报错) {
                    for (const j of info[4]) {
                        if (!j) {
                            alert(i + '角色没有info');
                        }
                    }
                    if (!info.hp && info.hp != 0) {
                        alert(i + '角色没有hp');
                    }
                    for (const j of info.skills) {
                        if (!lib.skill[j] && !_status.auto) {
                            console.log(j, '是一个不存在的技能名info', i);
                            alert(j + '是一个不存在的技能名info' + i);
                        }
                    }
                }
            }
            lib.card.list = lib.card.list.filter((i) => {
                const name = i[2];
                const info = lib.card[name];
                if (!name || !info) {
                    if (QQQ.config.报错) {
                        alert(i + '是没有info的卡牌');
                    }
                    return false;
                }
                if (info.mode && !info.mode.includes(lib.config.mode)) {
                    console.log(name, 'mode不符合');
                    return false;
                }
                return true;
            });//最晚lib.arenaReady里面
            if (QQQ.config.武将全开) {
                for (const i of lib.config.extensions) {
                    game.saveConfig(`extension_${i}_characters_enable`, true); //扩展武将全部打开
                }
                for (var i in lib.characterPack) {
                    if (!lib.config.characters.includes(i)) {
                        lib.config.characters.push(i);
                    } //扩展武将全部添加
                    lib.connectCharacterPack.add(i); //扩展武将联机
                } //全开武将包
                // lib.config.all.characters = lib.config.characters;
                // game.saveConfig('all', lib.config.all);
                game.saveConfig('banned', []); //禁将
                game.saveConfig('forbidai_user', []); //仅点将可用
                game.saveConfig('forbidai', []);
                for (const i of lib.config.all.mode) {
                    game.saveConfig(`${i}_banned`, []); //模式禁将
                    game.saveConfig(`connect_${i}_banned`, []); //联机模式禁将
                }
                //game.saveConfig('connect_characters', []);//联机禁将包,放进去的才是要禁的
                game.saveConfig('characters', lib.config.characters);
                game.saveConfig('defaultcharacters', lib.config.characters);
            } //扩展武将全部打开
            if (QQQ.config.卡牌全开) {
                game.saveConfig('bannedcards', []);
                for (const i of lib.config.all.mode) {
                    game.saveConfig(`${i}_bannedcards`, []);
                }
                for (const i of lib.config.extensions) {
                    game.saveConfig(`extension_${i}_cards_enable`, true); //扩展卡牌全部打开
                }
                for (var i in lib.cardPack) {
                    if (!lib.config.cards.includes(i)) {
                        lib.config.cards.push(i);
                    } //扩展卡牌全部添加
                    lib.connectCardPack.add(i); //扩展卡牌联机
                    if (lib.cardPackInfo[i]) {
                        lib.cardPackInfo[i].closeable = true;
                    } //添加关闭卡牌按钮
                }
                game.saveConfig('cards', lib.config.cards);
                game.saveConfig('connect_cards', []); //联机禁将,放进去的才是要禁的
                game.saveConfig('defaultcards', lib.config.cards);
            } //扩展卡牌全部打开
            if (QQQ.config.联机禁官服将) {
                game.saveConfig('connect_characters', ['standard', 'refresh', 'shenhua', 'yijiang', 'sp', 'onlyOL', 'yingbian', 'clan', 'xinghuoliaoyuan', 'huicui', 'xianding', 'sp2', 'extra', 'mobile', 'shiji', 'sb', 'tw', 'collab', 'jsrg', 'offline', 'old', 'diy', 'ddd', 'key', 'yxs', 'hearth', 'gwent', 'mtg', 'ow', 'swd', 'gujian', 'xianjian', 'sixiang', 'newjiang']);
            }
            ui.create.system(
                '换将',
                function () {
                    for (const player of game.players) {
                        player.classList.add('Qselectable');
                        player.onclick = function () {
                            const play = this;
                            const div = window.document.createElement('div');
                            div.id = 'divQ';
                            const JUESELIST = [];
                            //————————————————————————————————————————————————————————确定
                            const OK = window.document.createElement('div');
                            OK.className = 'backQ';
                            OK.innerHTML = '确定';
                            OK.onclick = function () {
                                if (div.log) {
                                    play.init(div.log.link);
                                }
                                input.remove();
                                FIND.remove();
                                div.remove();
                                OK.remove();
                                for (const player of game.players) {
                                    player.classList.remove('Qselectable');
                                    player.onclick = null;
                                }
                            };
                            document.body.appendChild(OK);
                            //————————————————————————————————————————————————————————搜索
                            const input = document.createElement('input');
                            input.className = 'shuruQ';
                            const FIND = window.document.createElement('div');
                            FIND.className = 'findQ';
                            FIND.innerHTML = '搜索';
                            FIND.onclick = function () {
                                for (const x of JUESELIST) {
                                    x.remove();
                                }
                                for (const j in lib.character) {
                                    if (lib.translate[j] && lib.translate[j].includes(input.value) || j.includes(input.value)) {
                                        const JUESE = window.document.createElement('div');
                                        JUESE.style.backgroundImage = `url('${game.src(j)}')`;
                                        JUESE.className = 'characterQ';
                                        JUESE.innerHTML = get.translation(j);
                                        JUESE.link = j;
                                        JUESE.onclick = function () {
                                            if (div.log) {
                                                div.log.classList.remove('selected');
                                            }
                                            div.log = this;
                                            this.classList.add('selected');
                                        };
                                        JUESELIST.push(JUESE);
                                        div.appendChild(JUESE);
                                    }
                                }
                            };
                            document.body.appendChild(FIND);
                            document.body.appendChild(input);
                            //————————————————————————————————————————————————————————武将列表
                            for (const i in lib.characterPack) {
                                const PACK = window.document.createElement('div');
                                PACK.className = 'packQ';
                                PACK.innerHTML = get.translation(i + '_character_config');
                                PACK.link = i;
                                PACK.onclick = function () {
                                    for (const x of JUESELIST) {
                                        x.remove();
                                    }
                                    for (const j in lib.characterPack[this.link]) {
                                        const JUESE = window.document.createElement('div');
                                        JUESE.style.backgroundImage = `url('${game.src(j)}')`;
                                        JUESE.className = 'characterQ';
                                        JUESE.innerHTML = get.translation(j);
                                        JUESE.link = j;
                                        JUESE.onclick = function () {
                                            if (div.log) {
                                                div.log.classList.remove('selected');
                                            }
                                            div.log = this;
                                            this.classList.add('selected');
                                        };
                                        JUESELIST.push(JUESE);
                                        div.appendChild(JUESE);
                                    }
                                };
                                div.appendChild(PACK);
                            }
                            document.body.appendChild(div);
                        };
                    }
                },
                true
            ); //换将
            ui.create.system(
                '重启',
                function () {
                    game.reload();
                    return true;
                },
                true
            ); //重启按钮
            ui.create.system(
                '添加技能',
                async function () {
                    const div = document.createElement('div');
                    div.id = 'skilllist';
                    const input = document.createElement('input');
                    input.className = 'shuruQ';
                    input.placeholder = '输入技能代码名(不是技能名的翻译,如破军是pojun)';
                    const FIND = window.document.createElement('div');
                    FIND.className = 'findQ';
                    FIND.innerHTML = '搜索';
                    const skilllist = [];
                    FIND.onclick = function () {
                        for (var x of skilllist) {
                            x.remove();
                        }
                        for (const j in lib.skill) {
                            if (lib.translate[j]?.includes(input.value) || j.includes(input.value)) {
                                const skill = window.document.createElement('div');
                                skill.className = 'skillQ';
                                skill.innerHTML = `${lib.translate[j]}(${j}):${lib.translate[`${j}_info`]}`;
                                skill.link = j;
                                skill.onclick = function () {
                                    if (div.log) {
                                        div.log.classList.remove('selected');
                                    }
                                    div.log = this;
                                    this.classList.add('selected');
                                };
                                skilllist.push(skill);
                                div.appendChild(skill);
                            }
                        }
                    };
                    const ok = document.createElement('button');
                    ok.className = 'backQ';
                    ok.textContent = '确认';
                    ok.addEventListener('click', async function () {
                        div.remove();
                        if (div.log && lib.skill[div.log.link]) {
                            for (const player of game.players) {
                                player.classList.add('Qselectable');
                                player.onclick = function () {
                                    const play = this;
                                    play.addSkill(div.log.link);
                                    for (const player of game.players) {
                                        player.classList.remove('Qselectable');
                                        player.onclick = null;
                                    }
                                };
                            }
                        }
                    });
                    div.appendChild(FIND);
                    div.appendChild(input);
                    div.appendChild(ok);
                    document.body.appendChild(div);
                },
                true
            ); //添加技能
            ui.create.system(
                '温柔一刀',
                function () {
                    const page = document.createElement('div');
                    page.id = 'divQ';
                    let intro;
                    for (const i in lib.extensionMenu['extension_温柔一刀']) {
                        const cfg = get.copy(lib.extensionMenu['extension_温柔一刀'][i]);
                        const j = 'extension_温柔一刀_' + i;
                        if (j in lib.config) {
                            cfg.init = lib.config[j];
                        } else {
                            game.saveConfig(j, cfg.init);
                        }
                        if (cfg.item || cfg.clear || ['enable'].includes(i)) {
                            continue;
                        }
                        const node = document.createElement('div');
                        node.className = 'configQ';
                        node.innerHTML = cfg.name;
                        node.onclick = function (result) {
                            if (intro) {
                                intro.remove();
                            }
                            node.classList.toggle('on');
                            game.saveConfig(j, node.classList.contains('on'));
                        };
                        node.oncontextmenu = function (result) {
                            if (intro) {
                                intro.remove();
                            }
                            intro = document.createElement('div');
                            intro.className = 'introQ';
                            intro.innerHTML = cfg.intro;
                            document.body.appendChild(intro);
                        };
                        if (cfg.init) {
                            node.classList.add('on');
                        }
                        const toggle = document.createElement('div');
                        toggle.className = 'toggleQ';
                        node.appendChild(toggle);
                        page.appendChild(node);
                    }
                    const backButton = window.document.createElement('div');
                    backButton.innerHTML = '返回游戏'; //文字内容
                    backButton.className = 'backQ';
                    backButton.onclick = function () {
                        if (intro) {
                            intro.remove();
                        }
                        backButton.remove();
                        page.remove();
                    }; //设置返回按钮的点击事件
                    document.body.appendChild(backButton);
                    document.body.appendChild(page);
                },
                true
            ); //温柔一刀按钮
        },
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
            rawAttitude(from, to) {
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