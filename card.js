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
    赤血青锋: {
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
    无双方天戟: {
        type: 'equip',
        subtype: 'equip1',
        skills: ['无双方天戟'],
        distance: {
            attackFrom: -2,
        },
        ai: {
            equipValue: 85,
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
    //毒爆:将全场所有角色随机一半牌变成毒,然后弃置所有毒
    QQQ_dubao: {
        type: 'trick',
        filterTarget(card, player, target) {
            return true;
        },
        selectTarget: -1,
        async content(event, trigger, player) {
            const cards = event.target.getCards('hej');
            const cards1 = cards.randomGets(Math.ceil(cards.length / 2));
            for (var j of cards1) {
                j.init([lib.suits.randomGet(), lib.number.randomGet(), 'du']);
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
    //尸爆:对一名已死亡的角色使用,将其炸掉(移出游戏),然后对其相邻角色造成一点伤害
    QQQ_shibao: {
        type: 'trick',
        filterTarget(card, player, target) {
            return true;
        },
        selectTarget: -1,
        async content(event, trigger, player) {
            const {
                result: { targets },
            } = await player
                .chooseTarget('对一名已死亡的角色使用,将其炸掉', (c, p, t) => t.isDead())
                .set('deadTarget', true)
                .set('ai', (target) => {
                    var num = 0;
                    const next = target.next;
                    const previous = target.previous;
                    if (next) {
                        num -= get.attitude(player, next);
                    }
                    if (previous) {
                        num -= get.attitude(player, previous);
                    }
                    return get.attitude(player, target) * num;
                });
            if (targets && targets[0]) {
                const next = targets[0].next;
                const previous = targets[0].previous;
                game.log(`<span class="Qmenu">${get.translation(targets[0])}尸体被炸掉</span>`);
                game.removePlayer(targets[0]);
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
            const list = game.qcard(player, false, false).filter((q) => lib.card[q[2]].ai?.tag?.damage > 0);
            const card = list.randomGet();
            player.useCard({ name: card[2], nature: card[3] }, event.target, false);
        },
        ai: {
            order: 10,
            result: {
                target: -1,
            },
            tag: {
                damgage: 1,
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
                                equips = [...new Set([...equips, ...player.artifact])];
                                return equips;
                            },
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
}
const translate3 = {
    QQQ_人皇幡: '人皇幡',
    QQQ_人皇幡_info: '<span class="Qmenu">锁定技,</span>使用有目标的牌时,若此牌是装备牌或延时锦囊则你摸一张牌.否则此牌无距离次数限制,且可以增加或减少一个目标',
    QQQ_wodani: '我就打你',
    QQQ_wodani_info: '普通伤害锦囊牌,视为对目标使用随机一张伤害牌',
    QQQ_baota: '玲珑宝塔',
    QQQ_baota_info: '每轮游戏开始时,你可以选择一名角色(不能是上次选择的角色),其被镇压于塔内(镇压效果:造成或受到伤害-1,摸牌数-1,跳过回合然后你令其回复或失去一点体力)',
    QQQ_dubao: '毒爆',
    QQQ_dubao_info: '将全场所有角色随机一半牌变成毒,然后弃置所有毒',
    QQQ_shibao: '尸爆',
    QQQ_shibao_info: '对一名已死亡的角色使用,将其炸掉,然后对其相邻角色造成一点伤害',
    QQQ_灵芝: '灵芝',
    QQQ_灵芝_info: '出牌阶段对一名角色使用,其增加一点体力上限回复全部体力',
    禅让诏书: '禅让诏书',
    禅让诏书_info: '其他角色于其回合外获得牌时,你可以选择一项:1.交给其一张牌;2.令其交给你一张牌',
    赤血青锋: '赤血青锋',
    赤血青锋_info: '赤血青锋',
    赤焰镇魂琴: '赤焰镇魂琴',
    赤焰镇魂琴_info: '你的伤害视为火属性且无来源',
    金乌落日弓: '金乌落日弓',
    金乌落日弓_info: '你一次性失去2张及以上手牌时,你可以选择一名其他角色,并弃置其X张牌,X为你本次失去的牌的数量',
    无双方天戟: '无双方天戟',
    无双方天戟_info: '当你使用牌指定目标后,你可以选择一项:1、你摸一张牌; 2、弃置其一张牌',
    崆峒印: '崆峒印',
    崆峒印_info: '每回合限一次,你受到致命伤害时,防止之',
    东皇钟: '东皇钟',
    东皇钟_info: '出牌阶段限一次,你可以重铸一张牌,并令一名角色武将牌上的所有技能失效直到你的下回合开始,其对你造成伤害后,你摸其技能数张牌并恢复其武将牌上的技能',
    封神榜: '封神榜',
    封神榜_info: '出牌阶段限一次,你可以弃置一张牌并选择一名角色的一个技能,其失去此技能,然后你将一张印有此技能的<封神>置入弃牌堆.＊封神:使用后获得上面印的技能,然后销毁这张卡',
    封神: '封神',
    封神_info: '使用后获得上面印的技能,然后销毁这张卡',
    昊天塔: '昊天塔',
    昊天塔_info: '分为五个碎片牌.<span class="Qmenu">锁定技,</span>你对其他角色造成的伤害+x,若x为5,你令其立即死亡.(x为你昊天塔碎片比其多的数量)',
    炼妖壶: '炼妖壶',
    炼妖壶_info: '<span class="Qmenu">锁定技,</span>其他角色本局游戏造成伤害的总数对你始终可见.限定技:每轮开始时,你可以令累计造成伤害最多的角色获得<炼妖>:准备阶段开始时失去一点体力或减一点体力上限,结束阶段翻面或弃置三张牌',
    昆仑镜: '昆仑镜',
    昆仑镜_info: '每回合限一次,当你受到伤害后,你可以将体力与手牌数调整至此轮开始',
    盘古斧: '盘古斧',
    盘古斧_info: '每回合限三次,你使用牌指定目标后,你可以复制目标角色区域内的一张牌并获得复制牌,复制牌在进入弃牌堆后销毁',
    女娲石: '女娲石',
    女娲石_info: '每五轮增加一次使用次数,出牌阶段或当你死亡时,你可以选择一名已阵亡的角色,将其复活,体力调整至体力上限、摸四张牌,改为由你操控',
    轩辕剑: '轩辕剑',
    轩辕剑_info: '当你使用杀指定目标时,阳:你令其恢复一点体力,令此杀失效,你摸三张牌;阴:你可以额外指定两名目标,对目标之一造成一点伤害',
    神农鼎: '神农鼎',
    神农鼎_info: '改变你桃的作用,改为可以回血超过上限且回复效果两倍且获得两点护甲.当有角色使用桃后,你摸一张牌.每回合限一次,你可以将一张牌当桃使用',
    伏羲琴: '伏羲琴',
    伏羲琴_info: '每五轮增加一次使用次数,混乱全场敌对角色,直至你下个出牌阶段开始',
};
Object.assign(lib.card, card);
if (QQQ.config.温柔一刀牌堆) {
    for (var i in card) {
        lib.inpile.add(i);
        const info = card[i];
        if (!QQQ.config.神器牌堆 && info.artifact) continue;
        if (info.mode && !info.mode.includes(lib.config.mode)) continue;
        if (!info.content) continue;
        lib.card.list.push([lib.suits.randomGet(), lib.number.randomGet(), i]);
    }
    lib.cardPack.温柔一刀 = Object.keys(card);
    lib.translate.温柔一刀_card_config = `<img src="${lib.assetURL}extension/温柔一刀/other/The-Gentle-Slash.png"width="120"height="30">`;
    lib.config.all.cards.add('温柔一刀');
    lib.config.cards.add('温柔一刀');
    game.saveConfig(`extension_温柔一刀_cards_enable`, true); //扩展卡牌全部打开
    game.saveConfig('cards', lib.config.cards);
    game.saveConfig('defaultcards', lib.config.cards);
}
Object.assign(lib.translate, translate3);
_status.gentle.translate3 = translate3;
