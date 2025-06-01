import { lib, game, ui, get, ai, _status } from '../../noname.js';
const card = {
    QQQ_人皇幡: {
        type: 'equip',
        subtype: 'equip1',
        distance: {
            attackFrom: -2,
        },
        skills: ['QQQ_人皇幡'],
        ai: {
            equipValue: 70,
        },
    },
    QQQ_EldenRing: {
        type: 'equip',
        subtype: 'equip5',
        skills: ['QQQ_EldenRing'],
        artifact: true,
        ai: {
            equipValue: 90,
        },
    },
    QQQ_Marikashichui: {
        type: 'equip',
        subtype: 'equip1',
        distance: {
            attackFrom: -2,
        },
        skills: ['QQQ_Marikashichui'],
        artifact: true,
        ai: {
            equipValue: 70,
        },
    },
    QQQ_Radagonshichui: {
        type: 'equip',
        subtype: 'equip1',
        distance: {
            attackFrom: -2,
        },
        skills: ['QQQ_Radagonshichui'],
        artifact: true,
        ai: {
            equipValue: 70,
        },
    },
    QQQ_baota: {
        type: 'equip',
        subtype: 'equip5',
        skills: ['QQQ_baota'],
        artifact: true,
        ai: {
            equipValue: 90,
        },
    },
    禅让诏书: {
        type: 'equip',
        subtype: 'equip5',
        skills: ['禅让诏书'],
        ai: {
            equipValue: 70,
        },
    },
    青锋: {
        type: 'equip',
        subtype: 'equip1',
        distance: {
            attackFrom: -1,
        },
        skills: ['青锋'],
        ai: {
            equipValue: 80,
        },
    },
    赤焰镇魂琴: {
        type: 'equip',
        subtype: 'equip1',
        skills: ['赤焰镇魂琴'],
        distance: {
            attackFrom: -3,
        },
        ai: {
            equipValue: 60,
        },
    },
    金乌落日弓: {
        type: 'equip',
        subtype: 'equip1',
        skills: ['金乌落日弓'],
        distance: {
            attackFrom: -8,
        },
        ai: {
            equipValue: 60,
        },
    },
    崆峒印: {
        type: 'equip',
        subtype: 'equip2',
        skills: ['崆峒印'],
        artifact: true,
        ai: {
            equipValue: 70,
        },
    },
    东皇钟: {
        type: 'equip',
        subtype: 'equip5',
        skills: ['东皇钟'],
        mode: ['boss'],
        artifact: true,
        ai: {
            equipValue: 70,
        },
    },
    封神榜: {
        type: 'equip',
        subtype: 'equip5',
        skills: ['封神榜'],
        mode: ['boss'],
        artifact: true,
        ai: {
            equipValue: 70,
        },
    },
    封神: {
        type: 'basic',
        cardcolor: 'red',
        filterTarget(card, player, target) {
            return target == player;
        },
        mode: ['boss'],
        async content(event, trigger, player) {
            //QQQ
            if (event.cards[0] && event.cards[0].Q) {
                player.addSkill(event.cards[0].Q);
                game.cardsGotoSpecial(event.cards[0]);
            }
        },
        ai: {
            basic: {
                useful: 4.5,
                value: 9.2,
            },
            result: {
                target: 5,
            },
            order: 50,
        },
    },
    昊天塔: {
        type: 'equip',
        subtype: 'equip4',
        skills: ['昊天塔'],
        artifact: true,
        ai: {
            equipValue: 70,
        },
    },
    炼妖壶: {
        type: 'equip',
        subtype: 'equip3',
        skills: ['炼妖壶'],
        artifact: true,
        ai: {
            equipValue: 70,
        },
    },
    昆仑镜: {
        type: 'equip',
        subtype: 'equip2',
        skills: ['昆仑镜'],
        artifact: true,
        ai: {
            equipValue: 70,
        },
    },
    盘古斧: {
        type: 'equip',
        subtype: 'equip1',
        skills: ['盘古斧'],
        distance: {
            attackFrom: -2,
        },
        artifact: true,
        ai: {
            equipValue: 70,
        },
    },
    女娲石: {
        type: 'equip',
        subtype: 'equip3',
        skills: ['女娲石'],
        artifact: true,
        ai: {
            equipValue: 70,
        },
    },
    轩辕剑: {
        type: 'equip',
        subtype: 'equip1',
        skills: ['轩辕剑'],
        distance: {
            attackFrom: -1,
            attackRange(card, player) {
                if (player.storage.轩辕剑) return 4;
                return 2;
            },
        },
        artifact: true,
        ai: {
            equipValue: 70,
        },
    },
    神农鼎: {
        type: 'equip',
        subtype: 'equip3',
        skills: ['神农鼎'],
        artifact: true,
        ai: {
            equipValue: 70,
        },
    },
    伏羲琴: {
        type: 'equip',
        subtype: 'equip5',
        skills: ['伏羲琴'],
        artifact: true,
        ai: {
            equipValue: 70,
        },
    },
    QQQ_灵芝: {
        type: 'basic',
        savable: true,
        filterTarget(card, player, target) {
            return true;
        },
        async content(event, trigger, player) {
            event.target.maxHp++;
            event.target.hp = event.target.maxHp;
        },
        ai: {
            order: 10,
            result: {
                target: 4,
            },
            tag: {
                recover: 1,
                save: 1,
            },
            basic: {
                useful: 9,
                value: 9,
            },
        },
    },
    火: {
        type: 'basic',
        enable: false,
        ai: {
            basic: {
                useful: 0,
                value: 0,
            },
        },
    },
    //毒爆:将全场所有角色随机一半牌变成毒,弃置所有毒
    QQQ_dubao: {
        type: 'trick',
        filterTarget(card, player, target) {
            return true;
        },
        selectTarget: -1,
        async content(event, trigger, player) {
            const cards = event.target.getCards('hej');
            const cards1 = cards.randomGets(Math.ceil(cards.length / 2));
            event.target.removeEquipTrigger();
            for (const card of cards1) {
                card.init([lib.suits.randomGet(), lib.number.randomGet(), 'du']);
            }
            const cards2 = event.target.getCards('hej').filter((q) => q.name == 'du');
            event.target.discard(cards2);
        },
        ai: {
            result: {
                player(player, target, card) {
                    //主动技是否发动
                    var num1 = game.players.filter((q) => q.isEnemiesOf(player)).reduce((acc, curr) => acc + curr.countCards('he'), 0);
                    var num2 = game.players.filter((q) => q.isFriendsOf(player)).reduce((acc, curr) => acc + curr.countCards('he'), 0);
                    return num1 - num2;
                },
            },
            order: 1,
            basic: {
                useful: 1,
                value: 1,
            },
        },
    },
    // 尸爆
    // 将一名已死亡的角色炸掉,对其相邻角色造成一点伤害
    QQQ_shibao: {
        type: 'trick',
        enable(card, player, event) {
            return game.dead.length;
        },
        filterTarget(card, player, target) {
            return target == player;
        },//QQQ
        selectTarget: -1,
        async content(event, trigger, player) {
            const {
                result: { links },
            } = await player.chooseButton(['将一名已死亡的角色炸掉', game.dead])
                .set('ai', (button) => 20 - get.attitude(player, button.link));
            if (links && links[0]) {
                const next = links[0].next;
                const previous = links[0].previous;
                game.log(`<span class=Qmenu>${get.translation(links[0])}尸体被炸掉</span>`);
                game.removePlayer(links[0]);
                if (next) {
                    next.damage();
                }
                if (previous) {
                    previous.damage();
                }
            }
        },
        ai: {
            result: {
                player(player, target, card) {
                    //主动技是否发动
                    return game.dead.filter((target) => {
                        var num = 0;
                        const next = target.next;
                        const previous = target.previous;
                        if (next) {
                            num -= get.attitude(player, next);
                        }
                        if (previous) {
                            num -= get.attitude(player, previous);
                        }
                        return num > 0;
                    }).length;
                },
            },
            order: 10,
            basic: {
                useful: 1,
                value: 1,
            },
        },
    },
    //我就打你: 普通伤害锦囊牌,视为对目标使用随机一张伤害牌
    QQQ_wodani: {
        type: 'trick',
        filterTarget(card, player, target) {
            return target != player;
        },
        selectTarget: 1,
        async content(event, trigger, player) {
            const list = game.qcard(player, false, false).filter((q) => get.tag({ name: q[2] }, 'damage'));
            const card = list.randomGet();
            player.useCard({ name: card[2], nature: card[3] }, event.target, false);
        },
        ai: {
            order: 10,
            result: {
                target: -1,
            },
            tag: {
                damage: 1,
            },
            basic: {
                useful: 1,
                value: 5,
            },
        },
    },
};
for (const i in card) {
    const info = card[i];
    if (!info.audio) {
        info.audio = 'ext:温柔一刀/audio:2';
    }
    info.modTarget = true;
    info.equipDelay = false;
    info.loseDelay = false;
    info.image = `ext:温柔一刀/card/${i}.jpg`;
    if (info.enable == undefined) {
        info.enable = true;
    }
    if (info.type == 'equip') {
        info.toself = true;
        info.filterTarget = function (card, player, target) {
            return player == target && target.canEquip(card, true);
        };
        info.selectTarget = -1;
        info.ai.basic = {
            equipValue: info.ai.equipValue,
            useful: 0.1,
            value: info.ai.equipValue,
            order: info.ai.equipValue,
        };
        if (info.artifact) {
            info.content = async function (event, trigger, player) {
                if (event.cards.length) {
                    const card = event.cards[0];
                    if (card) {
                        const name = card.name;
                        Reflect.defineProperty(card, 'name', {
                            get() {
                                return name;
                            },
                            set() { },
                            configurable: false,
                        });
                        card.node.name2.innerHTML = `${get.translation(card.suit)}${card.number} ${get.translation(card.name)}`;
                        const vcard = new lib.element.VCard(card);
                        if (!player.artifact) {
                            player.artifact = [];
                        }
                        player.artifact.add(vcard);
                        let equips = player.vcardsMap.equips || [];
                        Reflect.defineProperty(player.vcardsMap, 'equips', {
                            get() {
                                equips.addArray(player.artifact);
                                return equips;
                            },//不需要取消代理就没必要重赋值数组,会导致加减元素出点问题
                            configurable: false,
                            set(value) {
                                equips = value;
                            },
                        });
                        if (player.playerid) {
                            if (lib.card[card.name].skills) {
                                const skill = lib.card[card.name].skills.slice();
                                game.expandSkills(skill);
                                for (const x of skill) {
                                    const trigger = lib.skill[x].trigger;
                                    for (const i in trigger) {
                                        if (typeof trigger[i] == 'string') {
                                            trigger[i] = [trigger[i]];
                                        }
                                        if (Array.isArray(trigger[i])) {
                                            for (const j of trigger[i]) {
                                                const key = `${player.playerid}_${i}_${j}`;
                                                const hook = lib.hook[key] || [];
                                                Reflect.defineProperty(lib.hook, key, {
                                                    get() {
                                                        hook.add(x);
                                                        return hook;
                                                    },
                                                    set() { },
                                                    configurable: false,
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        player.node.equips.lock(card);
                    }
                }
            };
            info.ai.result = {
                keepAI: true,//防止result被本体替换
                player: 99,
                target: 99,
            };
        }
        else {
            info.content = async function (event, trigger, player) {
                if (event.cards.length) {
                    event.target.equip(event.cards[0]);
                }
            };
            info.ai.result = {
                target: (player, target, card) => get.equipResult(player, target, card),
            };
        }
    }
    if (QQQ.config.温柔一刀牌堆) {
        lib.inpile.add(i);
        if (!QQQ.config.神器牌堆 && info.artifact) continue;
        if (info.mode && !info.mode.includes(lib.config.mode)) continue;
        lib.card.list.push([lib.suits.randomGet(), lib.number.randomGet(), i]);
    }
}
lib.cardPack.温柔一刀 = Object.keys(card);
lib.translate.温柔一刀_card_config = `<img src="extension/温柔一刀/other/The-Gentle-Slash.png"width="120"height="30">`;
lib.config.all.cards.add('温柔一刀');
lib.config.cards.add('温柔一刀');
const translate3 = {
    火: '火',
    火_info: '当此牌被获得或失去时,当前角色受到一点火属性伤害',
    QQQ_wodani: '我就打你',
    QQQ_wodani_info: '普通伤害锦囊牌,视为对目标使用随机一张伤害牌',
    QQQ_dubao: '毒爆',
    QQQ_dubao_info: '将全场所有角色随机一半牌变成毒,弃置所有毒',
    QQQ_shibao: '尸爆',
    QQQ_shibao_info: '对一名已死亡的角色使用,将其炸掉,对其相邻角色造成一点伤害',
    QQQ_灵芝: '灵芝',
    QQQ_灵芝_info: '出牌阶段对一名角色使用,其增加一点体力上限回复全部体力',
};
Object.assign(lib.card, card);
Object.assign(lib.translate, translate3);
_status.gentle.translate3 = translate3;
