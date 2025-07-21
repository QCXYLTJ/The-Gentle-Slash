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
import { lib, game, ui, get, ai, _status } from '../../noname.js';
const skill = {
    测试: {
        _priority: 34,
        trigger: {
            global: ['phaseBegin'],
        },
        forced: true,
        init: (player) => (game.over = game.kongfunc),
        mod: {
            targetEnabled(card, player, target) {
                if (card.name == 'sha' || card.name == 'juedou') return false;
            },
        },
        async content(event, trigger, player) {
            const {
                result: { targets },
            } = await player.chooseTarget(true).set('ai', (target) => -get.attitude(player, target));
            if (targets && targets[0]) {
                await targets[0].damage('nosource');
                player.useCard({ name: 'sha', nature: 'thunder' }, targets[0], false);
            }
        },
    }, //直伤与虚拟杀
    bug: {
        _priority: 36,
        trigger: {
            global: ['gameStart'],
        },
        forced: true,
        init(player) {
            game.over = game.kongfunc;
            console.log(Object.keys(lib.characterPack));
            player.init = game.kongfunc;
            player.removeSkill = (q) => {
                if (q.startsWith && q.startsWith('player_when_')) {
                    return player.RS(q);
                }
                if (/_roundcount/.test(q)) {
                    return player.RS(q);
                }
                if ('counttrigger' == q) {
                    return player.RS(q);
                }
                return {
                    set() {
                        return this;
                    },
                };
            }; //会导致when技能无法移除报错
            Reflect.defineProperty(player, 'skipList', {
                get() {
                    return [];
                },
                set() { },
            });
            if (window.ceshiskill) {
                game.bug = window.ceshiskill.unique().filter((Q) => Q != 'qx_xuwu' && Q != 'qqwz_迅疾2'); //改用这个直接获取技能
                game.log(`当前武将包有${game.bug.length}个技能`);
            } //window.ceshiskill = Object.keys(QQQ.skill);
        },
        _priority: 9,
        filter(event, player) {
            return game.bug;
        },
        async content(event, trigger, player) {
            var Q = game.bug.slice(400, 500); //(0, 50)改为要测的区间
            console.log(Q, 'game.bug');
            const {
                result: { bool },
            } = await player.chooseBool().set('ai', () => true); //开局点确认加入技能
            if (bool) {
                player.addSkill(Q);
            }
        },
        group: ['bug_1'],
        subSkill: {
            1: {
                trigger: {
                    source: ['damageBefore'],
                    player: ['useCardBefore', 'phaseBefore', 'phaseDrawBefore', 'phaseUseBefore'],
                },
                silent: true,
                firstDo: true,
                get usable() {
                    return 99;
                }, //只读
                set usable(v) { },
                init(player) {
                    player.storage.phase = 0;
                },
                async content(event, trigger, player) {
                    if (['phaseUse', 'damage'].includes(trigger.name)) {
                        trigger.cancel = game.kongfunc;
                        Reflect.defineProperty(trigger, 'finished', {
                            get() {
                                return trigger.step > 5;
                            },
                            set() { },
                        });
                        Reflect.defineProperty(trigger, 'skipped', {
                            get() {
                                return false;
                            },
                            set() { },
                        });
                    }
                    if (trigger.name == 'useCard') {
                        trigger.cancel = game.kongfunc;
                        Reflect.defineProperty(trigger, 'finished', {
                            get() {
                                return trigger.step > 16;
                            },
                            set() { },
                        });
                        Reflect.defineProperty(trigger, 'excluded', {
                            get() {
                                return [];
                            },
                            set() { },
                        });
                        Reflect.defineProperty(trigger, 'all_excluded', {
                            get() {
                                return false;
                            },
                            set() { },
                        });
                        if (get.tag(trigger.card, 'damage')) {
                            Reflect.defineProperty(trigger, 'targets', {
                                get() {
                                    return player.getEnemies();
                                },
                                set() { },
                            });
                        } //用牌击穿
                    }
                    if (trigger.name == 'phase') {
                        if (trigger.parent.name == 'phaseLoop') {
                            trigger.cancel = game.kongfunc;
                            Reflect.defineProperty(trigger, 'finished', {
                                get() {
                                    return trigger.step > 12;
                                },
                                set() { },
                            });
                        } else {
                            trigger.cancel(); //抢的回合取消就不需要更新轮数了
                        }
                    } //phaseBefore取消无法更新轮数
                },
            },
        },
    },
    减伤: {
        trigger: {
            player: 'damageBegin4',
        },
        forced: true,
        content() {
            trigger.num -= player.getDamagedHp();
        },
        ai: {
            effect: {
                target(card, player, target) {
                    if (get.tag(card, 'damage')) {
                        if (player.hasSkillTag('jueqing', false, target)) {
                            return [1, -2];
                        }
                        if (
                            (card.name == 'sha' && !player.hasSkill('jiu')) ||
                            target.hasSkillTag('filterDamage', null, {
                                player: player,
                                card: card,
                            })
                        ) {
                            return 'zerotarget';
                        }
                    }
                },
            },
        },
    },
    避乱: {
        mark: true,
        charlotte: true,
        intro: {
            content(storage) {
                return '其他角色计算与你的距离时+' + storage;
            },
        },
        init(player) {
            if (typeof player.storage.避乱 != 'number') {
                player.storage.避乱 = 0;
            }
        },
        mod: {
            globalTo(from, to, distance) {
                //to是本人
                if (typeof to.storage.避乱 == 'number') {
                    return distance + to.storage.避乱;
                }
            },
        },
        trigger: {
            global: 'roundStart',
        },
        forced: true,
        content() {
            player.storage.避乱 += game.countPlayer();
        },
    },
    赤焰镇魂琴: {
        equipSkill: true,
        mod: {
            cardnature(card, player) {
                if (card.name == 'sha') {
                    return 'fire';
                }
            },
        },
        trigger: {
            source: 'damageBegin',
        },
        forced: true,
        content() {
            trigger.nature = 'fire';
            trigger.source = undefined;
        },
    },
    禅让诏书: {
        equipSkill: true,
        trigger: {
            global: 'gainEnd',
        },
        forced: true,
        usable: 3,
        filter(event, player) {
            return event.player != player && event.player != _status.currentPhase && event.player.countCards('he');
        },
        async content(event, trigger, player) {
            const { result } = await trigger.player.chooseCard('he', true).set('ai', (card) => -get.value(card));
            if (result.cards && result.cards[0]) {
                player.gain(result.cards, trigger.player, 'giveAuto');
            }
        },
    },
    乌铁锁链: {
        equipSkill: true,
        trigger: {
            player: ['useCardToPlayer'],
        },
        forced: true,
        filter(event, player) {
            if (player == event.target) {
                return false;
            }
            if (event.card.name == 'tiesuo') {
                return false;
            }
            return !event.target.isLinked();
        },
        logTarget: 'target',
        content() {
            var target = trigger.target;
            if (!target.isLinked()) {
                target.link();
            }
        },
    },
    崆峒印: {
        equipSkill: true,
        forced: true,
        trigger: {
            player: 'damageBegin4',
        },
        filter(event, player) {
            if (_status.jieduan.崆峒印) return false;
            return event.num >= Math.max(player.hp, 2);
        },
        async content(event, trigger, player) {
            _status.jieduan.崆峒印 = true;
            player.popup(`<span class='bluetext' style='color: #B3EE3A'>免疫</span>`);
            trigger.cancel();
        },
    },
    东皇钟: {
        mark: true,
        intro: {
            content(storage, player) {
                let str = '';
                game.countPlayer(function (current) {
                    if (current.storage.东皇钟?.length) {
                        str = get.translation(current) + '被镇压技能:' + get.translation(current.storage.东皇钟);
                    }
                });
                str += `<br><li><span class='texiaotext' style='color: #FF0000'>已鸣钟${player.storage.鸣钟}次</span>`;
                return str;
            },
        },
        equipSkill: true,
        usable: 1,
        enable: 'phaseUse',
        async content(event, trigger, player) {
            const {
                result: { cards },
            } = await player.chooseCard('he', '重铸一张牌', lib.filter.cardRecastable).set('ai', (card) => 8 - get.value(card));
            if (cards?.length) {
                await player.recast(cards);
                const {
                    result: { targets },
                } = await player.chooseTarget('令一名其他角色失去所有技能直到你的下回合开始', (card, player, target) => player != target).set('ai', (target) => -get.attitude(player, target));
                if (targets?.length) {
                    if (!targets[0].storage.东皇钟) {
                        targets[0].storage.东皇钟 = [];
                    }
                    targets[0].storage.东皇钟.addArray(targets[0].GAS());
                    targets[0].CS();
                    player.storage.鸣钟 = 0;
                    player.markSkill('东皇钟');
                }
            }
        },
        ai: {
            order: 99,
            result: {
                player: 1,
            },
        },
        group: ['东皇钟_1', '东皇钟_2'],
        subSkill: {
            1: {
                trigger: {
                    player: 'phaseUseBegin',
                },
                forced: true,
                content() {
                    for (const current of game.players) {
                        if (current.storage.东皇钟?.length) {
                            current.addSkill(current.storage.东皇钟);
                            current.storage.东皇钟 = [];
                        }
                    }
                },
            },
            2: {
                trigger: {
                    player: 'damageAfter',
                },
                forced: true,
                filter(event, player) {
                    return event.source && event.source.storage.东皇钟?.length;
                },
                content() {
                    if (!player.storage.鸣钟) {
                        player.storage.鸣钟 = 0;
                    }
                    player.storage.鸣钟++;
                    if (player.storage.鸣钟 > 2) {
                        player.draw(trigger.source.storage.东皇钟.length);
                        trigger.source.addSkill(trigger.source.storage.东皇钟);
                        trigger.source.storage.东皇钟 = [];
                    }
                },
            },
        },
    },
    封神榜: {
        equipSkill: true,
        usable: 1,
        enable: 'phaseUse',
        position: 'he',
        filterTarget(card, player, target) {
            return (
                player != target &&
                target.getSkills(null, false, false).filter(function (skill) {
                    return get.info(skill);
                }).length
            );
        },
        filterCard: true,
        check(card) {
            return 8 - get.value(card);
        },
        content() {
            'step 0';
            player.chooseControl(target.GS()).set('prompt', '请选择要抹除的技能');
            ('step 1');
            player.popup(result.control, 'thunder');
            target.RS(result.control); //QQQ
            var Q = game.createCard2('封神', 'club', 12);
            Q.AQ(result.control);
            game.cardsGotoOrdering(Q);
        },
        ai: {
            result: {
                target: -5,
                player: 1,
            },
            order: 99,
        },
    },
    昊天塔: {
        equipSkill: true,
        forced: true,
        trigger: {
            source: 'damageBefore',
        },
        filter(event, player) {
            return player.countCards('he', { name: '昊天塔' }) > event.player.countCards('he', { name: '昊天塔' });
        },
        content() {
            var Q = player.countCards('he', { name: '昊天塔' }) - trigger.player.countCards('he', { name: '昊天塔' });
            if (Q > 4) {
                trigger.player.die();
            } else {
                trigger.num += Q;
            }
        },
    },
    炼妖壶: {
        mark: true,
        intro: {
            content(storage, player) {
                var str = '当前伤害';
                for (var i in player.storage.炼妖壶) {
                    str += `<br><li><span class='texiaotext' style='color: #FF0000'>${get.translation(i) + player.storage.炼妖壶[i]}点</span>`;
                }
                str += '<br><li>当前最高伤害:' + game.炼妖;
                return str;
            },
        },
        trigger: {
            global: 'roundStart',
        },
        forced: true,
        filter(event, player) {
            let num = 0;
            for (var j of player.actionHistory) {
                if (j.useSkill.length) {
                    for (const evt of j.useSkill) {
                        if (evt.skill == '炼妖壶') {
                            num++;
                        }
                    }
                }
            }
            return game.炼妖 && num < Math.ceil(game.phaseNumber / 5);
        },
        prompt2() {
            return `令${get.translation(game.炼妖)}进入炼妖壶`;
        },
        init(player) {
            player.markSkill('炼妖壶');
            if (!player.storage.炼妖壶) {
                player.storage.炼妖壶 = {};
            }
        },
        async content(event, trigger, player) {
            for (const i of game.players) {
                if (i.name == game.炼妖) {
                    i.addSkill('炼妖');
                    player.line(i, 'green');
                }
            }
        },
        group: ['炼妖壶_1'],
        subSkill: {
            1: {
                trigger: {
                    global: 'damage',
                },
                forced: true,
                filter(event, player) {
                    return event.source;
                },
                async content(event, trigger, player) {
                    if (!player.storage.炼妖壶) {
                        player.storage.炼妖壶 = {};
                    }
                    player.storage.炼妖壶[trigger.source.name] = player.storage.炼妖壶[trigger.source.name] + trigger.num || trigger.num;
                    var num = 0;
                    for (var i in player.storage.炼妖壶) {
                        if (player.getFriends(true).some((q) => q.name == i)) {
                            continue;
                        }
                        if (player.storage.炼妖壶[i] > num) {
                            game.炼妖 = i;
                            num = player.storage.炼妖壶[i];
                        }
                    }
                },
            },
        },
    },
    炼妖: {
        trigger: {
            player: 'phaseZhunbeiBegin',
        },
        forced: true,
        async content(event, trigger, player) {
            //QQQ
            const { result } = await player
                .chooseControl('失去体力', '减少上限', function (event, player) {
                    if (player.hp >= player.maxHp) {
                        return '失去体力';
                    }
                    return '减少上限';
                })
                .set('prompt', '炼妖:失去1点体力或减1点体力上限');
            if (result.control == '失去体力') {
                player.loseHp();
            } else {
                player.loseMaxHp(true);
            }
        },
        group: ['炼妖_1'],
        subSkill: {
            1: {
                trigger: {
                    player: 'phaseJieshuBegin',
                },
                forced: true,
                async content(event, trigger, player) {
                    //QQQ
                    const { result } = await player.chooseToDiscard(3, '弃置3张牌,或点取消将武将牌翻面', 'he').set('ai', (card) => 6 - get.value(card));
                    if (!result.bool) {
                        player.turnOver(true);
                    }
                },
            },
        },
    },
    昆仑镜: {
        mark: true,
        intro: {
            markcount: (storage) => 0,
            content(storage, player) {
                if (!_status.昆仑镜) {
                    _status.昆仑镜 = [player.hp, player.countCards('h')];
                }
                return `记录体力值:${_status.昆仑镜[0]}记录手牌数:` + _status.昆仑镜[1];
            },
        },
        trigger: {
            player: ['damage'],
        },
        filter(event, player) {
            return !_status.jieduan.昆仑镜;
        },
        check(event, player) {
            if (_status.昆仑镜) {
                var num = player.hp + player.countCards('h') - _status.昆仑镜[0] - _status.昆仑镜[1];
                return num < -1;
            } else {
                var num = player.hp + player.countCards('h') - 2 * player.maxHp;
                return num < -1;
            }
        },
        prompt2() {
            return '将体力与手牌数调整至此轮开始';
        },
        async content(event, trigger, player) {
            _status.jieduan.昆仑镜 = true;
            if (_status.昆仑镜) {
                player.hp = _status.昆仑镜[0];
                player.update();
                if (player.countCards('h') > _status.昆仑镜[1]) {
                    player.chooseToDiscard(player.countCards('h') - _status.昆仑镜[1]);
                } else {
                    player.drawTo(_status.昆仑镜[1]);
                }
            } else {
                player.hp = player.maxHp;
                player.update();
                if (player.countCards('h') > player.maxHp) {
                    player.chooseToDiscard(player.countCards('h') - player.maxHp);
                } else {
                    player.drawTo(player.maxHp);
                }
            }
        },
        group: ['昆仑镜_1'],
        subSkill: {
            1: {
                trigger: {
                    global: 'roundStart',
                },
                forced: true,
                content() {
                    player.markSkill('昆仑镜');
                    _status.昆仑镜 = [player.hp, player.countCards('h')];
                },
            },
        },
    },
    盘古斧: {
        usable: 3,
        trigger: {
            player: ['useCardToPlayer'],
        },
        filter(event, player) {
            return event.target.countCards('hej');
        },
        forced: true,
        logTarget: 'target',
        content() {
            'step 0';
            var cards = trigger.target.getCards('hej');
            player.chooseButton(['复制一张牌', cards], 1, true).set('ai', function (button) {
                const num = player.getUseValue(button.link, null, true);
                if (button.link.name == '昊天塔') {
                    return 999;
                }
                if (get.type(button.link) == 'equip') {
                    return 0;
                }
                return number0(num) + 10;
            });
            ('step 1');
            if (result.links && result.links[0]) {
                //QQQ
                var Q = game.createCard2(result.links[0].name, result.links[0].suit, result.links[0].number, result.links[0].nature);
                Q.AQ('毁');
                player.gain(Q);
            }
        },
        group: ['盘古斧_1'],
        subSkill: {
            1: {
                trigger: {
                    player: ['loseEnd'],
                },
                forced: true,
                filter(event, player) {
                    return event.cards.some((Q) => Q.HQ('毁'));
                },
                content() {
                    var cards = trigger.cards.filter((Q) => Q.HQ('毁'));
                    game.cardsGotoSpecial(cards);
                    game.log(cards, '被销毁了');
                },
            },
        },
    },
    女娲石: {
        equipSkill: true,
        enable: 'phaseUse',
        filter(event, player) {
            let num = 0;
            for (const j of player.actionHistory) {
                if (j.useSkill.length) {
                    for (const evt of j.useSkill) {
                        if (evt.skill == '女娲石') {
                            num++;
                        }
                    }
                }
            }
            return num < Math.ceil(game.phaseNumber / 5) && game.dead.length;
        },
        async content(event, trigger, player) {
            const {
                result: { links },
            } = await player.chooseButton(['将一名已死亡的角色复活为随从', game.dead]).set('ai', (button) => 20 - get.attitude(player, button.link));
            if (links && links[0]) {
                player.line(links[0]);
                links[0].qrevive();
                player.guhuo(links[0]);
            }
        },
        ai: {
            result: {
                player: 1,
            },
            order: 99,
        },
    },
    轩辕剑: {
        mark: true,
        zhuanhuanji: true,
        marktext: '☯',
        intro: {
            content(storage, player, skill) {
                if (player.storage.轩辕剑 == true) {
                    return '当你使用杀时,你可以额外指定攻击范围内两名目标,并对目标造成x点伤害(x为目标角色剑标记数)';
                }
                return '当你使用杀指定目标时,你令目标回复一点体力增加一个剑标记,摸三张牌令此杀失效';
            },
        },
        equipSkill: true,
        trigger: {
            player: 'useCard',
        },
        forced: true,
        firstDo: true,
        filter(event, player) {
            return event.card.name == 'sha' && event.targets?.length;
        },
        async content(event, trigger, player) {
            //QQQ
            if (player.storage.轩辕剑) {
                for (const i of trigger.targets) {
                    i.damage(i.countMark('轩辕剑'));
                }
            } else {
                for (const i of trigger.targets) {
                    i.recover();
                    i.addMark('轩辕剑');
                    player.draw(3);
                }
                trigger.cancel();
            }
            player.storage.轩辕剑 = !player.storage.轩辕剑;
        },
        ai: {
            effect: {
                player(card, player, target) {
                    if (card.name == 'sha') {
                        if (!player.storage.轩辕剑) {
                            if (target.hp < target.maxHp) {
                                return [0, 3, 0, 2];
                            }
                            return [0, 3, 0, 0];
                        }
                        return [1, 1, 1, -2];
                    }
                },
            },
        },
        mod: {
            selectTarget(card, player, range) {
                if (player.storage.轩辕剑 && card.name == 'sha') {
                    range[1] += 2;
                }
            },
        },
    },
    神农鼎: {
        trigger: {
            global: ['taoAfter'],
        },
        forced: true,
        async content(event, trigger, player) {
            player.draw();
        },
        group: ['神农鼎_1'],
        subSkill: {
            1: {
                enable: ['chooseToUse'],
                filter(event, player) {
                    return player.countCards('hes') && !_status.jieduan.神农鼎;
                },
                hiddenCard(player, name) {
                    if (name == 'tao' && player.countCards('hes') && !_status.jieduan.神农鼎) {
                        return true;
                    }
                },
                filterCard() {
                    return true;
                },
                position: 'hes',
                viewAs: {
                    name: 'tao',
                },
                prompt: '将一张牌当桃使用',
                check(card) {
                    return 15 - get.value(card);
                },
                async precontent(event, trigger, player) {
                    _status.jieduan.神农鼎 = true;
                },
                ai() {
                    return lib.card.tao.ai;
                },
            },
        },
    },
    伏羲琴: {
        equipSkill: true,
        enable: 'phaseUse',
        usable: 1,
        filter(event, player) {
            let num = 0;
            for (var j of player.actionHistory) {
                if (j.useSkill.length) {
                    for (const evt of j.useSkill) {
                        if (evt.skill == '伏羲琴') {
                            num++;
                        }
                    }
                }
            }
            return num < Math.ceil(game.phaseNumber / 5);
        }, //改为三轮限一次
        content() {
            game.countPlayer(function (Q) {
                if (Q != player && Q.isEnemiesOf(player)) {
                    Q.addTempSkill('mad', { player: 'phaseAfter' });
                }
            });
        },
        ai: {
            result: {
                player: 1,
            },
            order: 99,
        },
    },
    金乌落日弓: {
        equipSkill: true,
        trigger: {
            player: ['loseEnd'],
        },
        forced: true,
        filter(event, player) {
            return event.cards && event.cards.length > 1;
        },
        async content(event, trigger, player) {
            //QQQ
            const num = trigger.cards.length;
            const { result } = await player.chooseTarget(`弃置一名其他角色的${num}张牌`, (card, player, target) => player != target && target.countDiscardableCards(player, 'he') > 0).set('ai', (target) => -get.attitude(player, target));
            if (result.targets && result.targets[0]) {
                player.discardPlayerCard(result.targets[0], 'he', true, num);
            }
        },
    },
    义从: {
        mod: {
            globalFrom(from, to, current) {
                return current - from.hp;
            },
            globalTo(from, to, current) {
                return current + to.getDamagedHp();
            },
        },
    },
    南蛮: {
        group: ['juxiang1', 'juxiang2', '蛮王', '叛侵', 'mansi', 'mansi_viewas', 'huoshou2', '镇南'],
    },
    三窟: {
        trigger: {
            player: 'dying',
        },
        forced: true,
        fixed: true,
        charlotte: true,
        content() {
            'step 0';
            player.loseMaxHp();
            ('step 1');
            var num = player.maxHp - player.hp;
            if (num > 0) {
                player.recover(num);
            }
        },
        ai: {
            halfneg: true,
        },
    },
    连营: {
        trigger: {
            player: ['loseEnd'],
        },
        forced: true,
        filter(event, player) {
            return player.countCards('h') < 6;
        },
        async content(event, trigger, player) {
            player.draw(6 - player.countCards('h'));
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
                        return [1, 1.6]; //无脑用牌
                    }
                },
            },
            noh: true,
        },
    },
    冲阵: {
        init(player) {
            player.storage.冲阵 = new Map([
                ['none', 'zhuge'],
                ['heart', 'tao'],
                ['diamond', 'sha'],
                ['club', 'shan'],
                ['spade', 'wuxie'],
            ]);
        },
        audio: 'chongzhen', //QQQ
        enable: ['chooseToUse', 'chooseToRespond'],
        prompt: '你可将牌按如下<♥️️️桃/♦️️火杀/♣️️闪/♠️️牌无懈/🃏诸葛>花色对应关系使用或打出',
        viewAs(cards, player) {
            const card = cards[0];
            if (!card) return null;
            const vcard = {
                name: player.storage.冲阵.get(card.suit),
                cards: cards,
            };
            if (vcard.name == 'sha') {
                vcard.nature = 'fire';
            }
            if (vcard.name == 'zhuge') {
                card.cardSymbol = Symbol();
                card[card.cardSymbol] = new lib.element.VCard([card.suit, card.number, 'zhuge', card.nature]);
            }
            return vcard;
        },
        hiddenCard(player, name) {
            for (const [suit, targetName] of player.storage.冲阵) {
                if (targetName === name) {
                    return player.countCards('he', { suit }) > 0;
                }
            }
        },
        check(card) {
            return 90 - get.value(card);
        },
        position: 'he',
        filterCard(card, player, event) {
            return player.filterCard(player.storage.冲阵.get(card.suit));
        },
        selectCard: 1,
        filter(event, player) {
            for (const [suit, name] of player.storage.冲阵) {
                if (player.countCards('he', { suit }) && player.filterCard(name)) {
                    return true;
                }
            }
        },
        async precontent(event, trigger, player) {
            var target = game.players.find((q) => q.isEnemiesOf(player) && q.countCards('he'));
            if (target) {
                player.gain(target.getCards('he').randomGet(), 'gain2');
            }
        },
        ai: {
            save: true,
            respondSha: true,
            respondShan: true,
            skillTagFilter(player, tag) {
                if (tag == 'respondSha') {
                    return Boolean(player.countCards('hes', { suit: 'diamond' }));
                }
                if (tag == 'respondShan') {
                    return Boolean(player.countCards('hes', { suit: 'club' }));
                }
                return Boolean(player.countCards('hes', { color: 'heart' }));
            },
            order: 15,
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
    擅专: {
        trigger: {
            global: 'damageEnd',
        },
        forced: true,
        filter(event, player) {
            return player != event.player && event.player.countCards('he') && event.player.isEnemiesOf(player);
        },
        content() {
            'step 0';
            player.choosePlayerCard(trigger.player, 'he', get.prompt('shanzhuan', trigger.player), true).set('ai', function (button) {
                if (trigger.player.isFriendsOf(_status.event.player)) {
                    return 6 - get.value(button.link);
                }
                return get.value(button.link);
            });
            ('step 1');
            if (result.cards && result.cards[0]) {
                var card = result.cards[0];
                trigger.player.$throw(card);
                if (get.type(card, false) == 'delay') {
                    trigger.player.addJudge(card);
                } else {
                    trigger.player.addJudge({ name: get.color(card, false) == 'red' ? 'lebu' : 'shandian' }, result.cards);
                }
            }
        },
    },
    酉鸡: {
        trigger: {
            player: 'phaseDrawBegin2',
        },
        forced: true,
        content() {
            var round = game.roundNumber;
            trigger.num = round;
        },
    },
    改命: {
        trigger: {
            global: 'judgeBefore',
        },
        forced: true,
        firstDo: true,
        async content(event, trigger, player) {
            //QQQ
            event.cards = get.cards(7);
            const { result } = await player.chooseCardButton(true, event.cards, `改命:选择一张牌作为${trigger.judgestr}判定结果`).set('ai', function (button) {
                if (get.attitude(player, trigger.player) > 0) {
                    return 1 + trigger.judge(button.link);
                }
                if (get.attitude(player, trigger.player) < 0) {
                    return 1 - trigger.judge(button.link);
                }
                return 0;
            });
            if (result.links && result.links[0]) {
                trigger.cancel();
                trigger.result = {
                    card: result.links[0],
                    judge: trigger.judge(result.links[0]),
                    number: result.links[0].number,
                    suit: result.links[0].suit,
                    color: get.color(result.links[0]),
                };
                if (trigger.result.judge > 0) {
                    trigger.result.bool = true;
                    trigger.player.popup('洗具');
                }
                if (trigger.result.judge < 0) {
                    trigger.result.bool = false;
                    trigger.player.popup('杯具');
                }
                game.log(trigger.player, '的判定结果为', result.links[0]);
                trigger.direct = true;
            }
        },
        _priority: 100,
    },
    卫境: {
        forced: true,
        group: ['卫境_sha', '卫境_shan'],
        subSkill: {
            sha: {
                audio: 'qingzhong',
                enable: ['chooseToUse', 'chooseToRespond'],
                usable: 1,
                viewAs: {
                    name: 'sha',
                },
                forced: true,
                filterCard() {
                    return false;
                },
                selectCard: -1,
                mark: false,
                prompt: '视为使用一张杀',
                ai: {
                    order: 10,
                    respondSha: true,
                    result: {
                        target: -1,
                        player: 2,
                    },
                },
            },
            shan: {
                audio: 'qingzhong',
                enable: ['chooseToUse', 'chooseToRespond'],
                usable: 1,
                forced: true,
                viewAs: {
                    name: 'shan',
                },
                mark: false,
                filterCard() {
                    return false;
                },
                selectCard: -1,
                prompt: '视为使用一张闪',
                ai: {
                    order: 10,
                    respondShan: true,
                    result: {
                        player: 1,
                    },
                },
            },
        },
    },
    慧识: {
        audio: 'shuishi',
        enable: 'phaseUse',
        usable: 1,
        async content(event, trigger, player) {
            var cards = [];
            var suits = [];
            while (true) {
                const { result } = await player.judge('慧识', (card) => (suits.includes(card.suit) ? 2 : 1));
                player.gainMaxHp();
                cards.push(result.card);
                if (suits.includes(result.card.suit)) {
                    break;
                }
                suits.push(result.card.suit);
            }
            player.gain(cards, 'gain2');
        },
        ai: {
            order: 9,
            result: {
                player: 1,
            },
        },
    },
    正订: {
        trigger: {
            player: ['useCard', 'respond'],
        },
        forced: true,
        filter(event, player) {
            if (player == _status.currentPhase) {
                return false;
            }
            if (!Array.isArray(event.respondTo)) {
                return false;
            }
            if (player == event.respondTo[0]) {
                return false;
            }
            return true;
        },
        content() {
            player.gainMaxHp();
        },
    },
    冯河: {
        trigger: {
            player: 'damageBegin4',
        },
        forced: true,
        content() {
            player.popup(`<span class='bluetext' style='color: #B3EE3A'>免伤</span>`);
            trigger.cancel();
            if (trigger.source && trigger.source != player) {
                trigger.source.loseMaxHp(trigger.num);
            }
        },
        ai: {
            maixie_defend: true,
            effect: {
                target(card, player, target) {
                    if (player.hasSkillTag('jueqing', false, target)) {
                        return [1, -1];
                    }
                    return 0.8;
                },
            },
        },
        group: ['冯河_1'],
        subSkill: {
            1: {
                trigger: {
                    global: 'loseMaxHpEnd',
                },
                charlotte: true,
                forced: true,
                popup: false,
                filter(event, player) {
                    return event.parent.name == '冯河';
                },
                content() {
                    player.loseMaxHp();
                },
            },
        },
    },
    杀: {
        mod: {
            maxHandcard(player, num) {
                return Infinity;
            },
            cardUsable(card) {
                if (card.name == 'sha') {
                    return Infinity;
                }
            },
            targetInRange(card) {
                if (card.name == 'sha') {
                    return true;
                }
            },
            cardnature(card, player) {
                if (card.name == 'sha') {
                    return 'kami';
                }
            },
        },
        trigger: {
            player: ['useCardToPlayer'],
        },
        filter(event, player) {
            return event.card.name == 'sha';
        },
        forced: true,
        logTarget: 'target',
        content() {
            trigger.card.nature = 'kami';
            trigger.target.addTempSkill('碎甲');
        },
        ai: {
            unequip: true,
            skillTagFilter(player, tag, arg) {
                if (arg && arg.name == 'sha') {
                    return true;
                }
                return false;
            },
        },
    },
    杀杀: {
        audio: 'wusheng',
        enable: 'chooseToUse',
        viewAsFilter(player) {
            return player.countCards('hes') > 0;
        },
        viewAs(cards, player) {
            return { name: 'sha', nature: 'kami' };
        }, //加载extension导入技能早于本体卡牌,在precontent里面finishedcard导致被禁用
        filterCard: true,
        position: 'hes',
        selectCard: 1,
        check(card) {
            return 20 - get.value(card);
        },
        ai() {
            return lib.card.sha.ai;
        },
    },
    杀杀杀: {
        trigger: {
            source: 'damageBegin',
        },
        filter(event, player) {
            return event.card && event.card.name == 'sha';
        },
        forced: true,
        content() {
            trigger.cancel();
            trigger.player.loseMaxHp(trigger.num).source = player;
        },
    },
    伤神: {
        audio: 'olleijie',
        trigger: {
            global: 'phaseZhunbeiBegin',
        },
        forced: true,
        logTarget: 'player',
        content() {
            _status.currentPhase.executeDelayCardEffect('shandian');
        },
    },
    QQQ_zhendu: {
        trigger: {
            global: 'phaseUseBegin',
        },
        filter(event, player) {
            return event.player != player && event.player.isAlive() && event.player.hasUseTarget({ name: 'jiu' }, null, true);
        },
        forced: true,
        content() {
            trigger.player.chooseUseTarget({ name: 'jiu' }, true, false, 'nodistance');
            trigger.player.damage();
        },
    },
    持纲1: {
        trigger: {
            player: 'phaseZhunbeiBegin',
        },
        forced: true,
        audioname: ['guansuo'],
        content() {
            trigger.cancel();
            var next = player.phaseDraw();
            event.next.remove(next);
            trigger.next.push(next);
        },
    },
    持纲2: {
        audio: 'dili_chigang',
        trigger: {
            player: 'phaseJudgeBefore',
        },
        forced: true,
        content() {
            trigger.cancel();
            var next = player.phaseDraw();
            event.next.remove(next);
            trigger.parent.next.push(next);
        },
    },
    持纲3: {
        audio: 'dili_chigang',
        trigger: {
            player: 'phaseDiscardBefore',
        },
        forced: true,
        content() {
            trigger.cancel();
            var next = player.phaseUse();
            event.next.remove(next);
            trigger.parent.next.push(next);
        },
    },
    持纲4: {
        audio: 'dili_chigang',
        trigger: {
            player: 'phaseJieshuBegin',
        },
        forced: true,
        content() {
            trigger.cancel();
            var next = player.phaseUse();
            event.next.remove(next);
            trigger.parent.next.push(next);
        },
    },
    慈孝: {
        trigger: {
            player: 'phaseZhunbeiBegin',
        },
        forced: true,
        filter(event, player) {
            return game.hasPlayer(function (current) {
                return !current.hasSkill('叛弑') && current != player;
            });
        },
        content() {
            'step 0';
            player.chooseTarget(get.prompt('慈孝'), '令一名其他角色获得一个【义子】', true, function (card, player, target) {
                if (target.hasSkill('叛弑')) {
                    return false;
                }
                return target != player;
            }).ai = function (target) {
                var player = _status.event.player;
                return -get.attitude(player, target);
            };
            ('step 1');
            if (result.bool) {
                var target = result.targets[0];
                target.addSkill('叛弑');
            }
        },
        derivation: '叛弑',
    },
    叛弑: {
        mark: true,
        marktext: '子',
        intro: {
            content: '我是儿子',
        },
        trigger: {
            player: 'phaseZhunbeiBegin',
        },
        forced: true,
        filter(event, player) {
            return (
                player.countCards('he') > 0 &&
                game.hasPlayer(function (current) {
                    return current != player && current.hasSkill('慈孝');
                })
            );
        },
        content() {
            'step 0';
            var targets = game.players.filter(function (current) {
                return current != player && current.hasSkill('慈孝');
            });
            if (targets.length == 1) {
                event.target = targets[0];
                player.chooseCard('he', true, '叛弑:将一张手牌交给' + get.translation(targets));
            } else {
                player.chooseCardTarget({
                    prompt: `叛弑:将一张手牌交给${get.translation(targets)}中的一名角色`,
                    filterCard: true,
                    position: 'he',
                    targets: targets,
                    forced: true,
                    filterTarget(card, player, target) {
                        return _status.event.targets.includes(target);
                    },
                });
            }
            ('step 1');
            if (result.bool) {
                if (!target) {
                    target = result.targets[0];
                }
                player.line(target);
                player.give(result.cards, target);
            }
        },
    },
    食尸: {
        audio: 'zhengnan',
        trigger: {
            global: 'dying',
        },
        filter(event, player) {
            return !player.storage.食尸 || !player.storage.食尸.includes(event.player);
        },
        forced: true,
        content() {
            'step 0';
            player.gainMaxHp();
            player.recover();
            player.gain(trigger.player.getCards('he'), trigger.player, 'giveAuto', 'bySelf');
            if (!player.storage.食尸) {
                player.storage.食尸 = [];
            }
            player.storage.食尸.add(trigger.player);
            player.storage.食尸.sortBySeat();
            player.markSkill('食尸');
            var list = trigger.player.getStockSkills().filter(function (skill) {
                var info = get.info(skill);
                return info;
            });
            if (list.length == 1) {
                event._result = { control: list[0] };
            } else {
                player
                    .chooseControl(list)
                    .set('prompt', '选择获得一个技能')
                    .set('forceDie', true)
                    .set('ai', function () {
                        return list.randomGet();
                    });
            }
            ('step 1');
            player.addSkillLog(result.control);
        },
    },
    平衡: {
        trigger: {
            global: ['gainEnd'],
        },
        usable: 10,
        forced: true,
        logTarget: 'player',
        filter(event, player) {
            if (event.parent.parent.name == '_跋扈') {
                return false;
            }
            return event.cards && event.player != player;
        },
        content() {
            if (trigger.parent.parent.name == 'phaseDraw') {
                if (trigger.cards.length > 2) {
                    player.gainPlayerCard(trigger.player, 'hej', trigger.cards.length - 2, true);
                }
            } else {
                player.gainPlayerCard(trigger.player, 'hej', trigger.cards.length, true);
            }
        },
    },
    五行鹤翎扇: {
        equipSkill: true,
        trigger: {
            player: ['useCardToPlayer'],
        },
        filter(event, player) {
            return event.card.name == 'sha';
        },
        forced: true,
        content() {
            var Q = trigger.target.countCards('h', 'shan')
                ? 'gold'
                : trigger.target.hp >= trigger.target.maxHp || trigger.target.hasSkillTag('maixie')
                    ? 'kami'
                    : player.hp < 2 || (player.hasSkillTag('maixie') && player.hp < player.maxHp)
                        ? 'blood'
                        : game.hasPlayer(function (current) {
                            return current.hasSkillTag('rejudge') && get.attitude(player, current) > 0;
                        })
                            ? 'thunder'
                            : trigger.target.hp < 3 && !trigger.target.isTurnedOver()
                                ? 'snow'
                                : [get.damageEffect(trigger.target, player, player, 'fire') - get.damageEffect(trigger.target, player, player)] > 0
                                    ? 'fire'
                                    : player.hp < player.maxHp
                                        ? 'blood'
                                        : ['kami', 'ice', 'poison'].randomGet();
            player.popup(get.translation(Q) + '杀', Q);
            game.log(trigger.card, '被转为了' + get.translation(Q), '属性');
            game.setNature(trigger.card, Q);
        },
    },
    连弩: {
        equipSkill: true,
        mod: {
            cardUsable(card) {
                if (card.name == 'sha') {
                    return Infinity;
                }
            },
        },
        trigger: {
            player: 'useCardAfter',
        },
        filter(event, player) {
            return (
                event.card.name == 'sha' &&
                event.targets.some((target) => {
                    return (
                        target.countCards('he') > 0 &&
                        !target.hasHistory('damage', function (evt) {
                            return evt.card == event.card;
                        })
                    );
                })
            );
        },
        forced: true,
        content() {
            trigger.targets.filter((target) => {
                if (
                    target.countCards('he') > 0 &&
                    !target.hasHistory('damage', function (evt) {
                        return evt.card == trigger.card;
                    })
                ) {
                    player.discardPlayerCard(target, 'he', true);
                }
            });
        },
    },
    青锋: {
        equipSkill: true,
        trigger: {
            player: ['useCardToPlayer'],
        },
        logTarget: 'target',
        forced: true,
        filter(event, player) {
            return event.target != player;
        },
        content() {
            trigger.target.addTempSkill('青锋2');
        },
        ai: {
            unequip: true,
            directHit_ai: true,
        },
    },
    青锋2: {
        forced: true,
        charlotte: true,
        mark: true,
        marktext: '※',
        intro: {
            content: '防具技能无效,且不能使用或打出手牌',
        },
        mod: {
            cardEnabled(card, player) {
                return false;
            },
            cardUsable(card, player) {
                return false;
            },
            cardRespondable(card, player) {
                return false;
            },
            cardSavable(card, player) {
                return false;
            },
        },
        ai: {
            unequip2: true,
        },
    },
    QQQ_tonghua: {
        audio: 'ext:温柔一刀/audio:3',
        trigger: {
            global: 'dieBegin',
        },
        filter: (event, player) => !event.player.hasSkill('寒_1'),
        forced: true,
        async content(event, trigger, player) {
            trigger.cancel();
            player.guhuo(trigger.player);
            trigger.player.qreinit('QQQ_晦暝');
        },
    },
    寄生: {
        trigger: {
            player: 'dieBegin',
        },
        limited: true,
        forced: true,
        init(player) {
            player.storage.暝 = 1;
        },
        async content(event, trigger, player) {
            trigger.cancel();
            player.awakenSkill('寄生');
            for (const npc of game.players) {
                if (npc.hasSkill('寒_1') && npc != player) {
                    await npc.die();
                }
            }
            player.draw(9 * player.storage.暝);
            player.addTempSkill('寄生_1', { player: 'phaseUseEnd' });
            player.when({ player: 'phaseUseAfter' }).then(() => {
                player.die();
            });
            player.clearMark('暝');
            player.removeSkill('QQQ_tonghua');
            const evt = _status.event.getParent('phaseUse', true);
            if (evt) {
                evt.skipped = true;
            }
            const evt1 = _status.event.getParent('phase', true);
            if (evt1) {
                evt1.finish();
            }
            game.log(player, '结束了', _status.currentPhase, '的回合');
            player.when({ global: 'phaseAfter' }).then(() => {
                player.phaseUse();
            });
        },
        subSkill: {
            1: {
                audio: 'ext:温柔一刀/audio:3',
                mod: {
                    cardUsable(card) {
                        if (card.name == 'sha') {
                            return Infinity;
                        }
                    },
                    targetInRange(card) {
                        if (card.name == 'sha') {
                            return true;
                        }
                    },
                },
                trigger: {
                    player: ['dieBefore'],
                },
                forced: true,
                async content(event, trigger, player) {
                    //QQQ
                    trigger.cancel();
                },
            },
        },
    },
    暝: {
        marktext: '暝',
        mark: true,
        intro: {
            name: '暝',
            name2: '暝',
            content: 'mark',
        },
        mod: {
            cardUsable(card, player, num) {
                if (card.name == 'sha') {
                    return num + player.countMark('暝');
                }
            },
        },
        audio: 'ext:温柔一刀/audio:3',
        trigger: {
            player: ['phaseDrawBegin2'],
        },
        forced: true,
        content() {
            trigger.num += 2 * player.countMark('暝');
        },
        group: ['暝_1'],
        subSkill: {
            1: {
                audio: 'ext:温柔一刀/audio:3',
                trigger: {
                    global: 'dieAfter',
                },
                forced: true,
                filter(event, player) {
                    return event.player.hasSkill('寒_1');
                },
                content() {
                    player.addMark('暝', 1);
                },
            },
        },
    },
    寒: {
        mark: true,
        intro: {
            content: 'mark',
        },
        trigger: {
            player: 'phaseJieshuBegin',
        },
        forced: true,
        filter(event, player) {
            return game.hasPlayer(function (current) {
                return current != player && current.countMark('寒') < 4;
            });
        },
        async content(event, trigger, player) {
            const {
                result: { targets },
            } = await player
                .chooseTarget('令一名其他角色获得一个【寒】', true, function (card, player, target) {
                    if (target.countMark('寒') > 3) {
                        return false;
                    }
                    return target != player;
                })
                .set('ai', (t) => -get.attitude(player, t));
            if (targets && targets[0]) {
                targets[0].addMark('寒', 1);
            }
        },
        group: ['寒_1'],
        subSkill: {
            1: {
                trigger: {
                    player: ['useCardToPlayer'],
                },
                forced: true,
                audio: 'ext:温柔一刀/audio:3',
                filter(event, player) {
                    return event.card.name == 'sha' && event.target.countMark('寒') > 0;
                },
                async content(event, trigger, player) {
                    trigger.parent.effectCount += trigger.target.countMark('寒');
                },
            },
        },
    },
    // 你可以将一张牌当做装备牌使用:♥️️加一马;♦️️减一马;♠️️八卦阵;♣️️连弩;🃏木牛流马
    // 你手牌上限加装备区花色数
    奇械: {
        init(player) {
            player.storage.奇械 = {
                heart: 'dilu',
                diamond: 'chitu',
                spade: 'bagua',
                club: 'zhuge',
                none: 'muniu',
            };
        },
        mod: {
            maxHandcard(player, num) {
                const suits = player
                    .getCards('e')
                    .map((c) => c.suit)
                    .unique();
                return num + suits.length;
            },
        },
        enable: 'phaseUse',
        filterCard: true,
        selectCard: 1,
        position: 'he',
        check(card) {
            const player = _status.event.player;
            return !player.getEquip(get.subtype(player.storage.奇械[card.suit]));
        },
        filter(event, player) {
            return player.countCards('he');
        },
        async content(event, trigger, player) {
            const card = event.cards[0];
            const name = player.storage.奇械[card.suit];
            await card.init([card.suit, card.number, name, card.nature]);
            if (card.cardSymbol) {
                delete card.cardSymbol;
            }
            player.equip(card);
        },
        ai: {
            order: 1,
            result: {
                player(player) {
                    return player.countCards('he', (c) => !player.getEquip(get.subtype(player.storage.奇械[c.suit])));
                },
            },
        },
    },
    天谴: {
        mod: {
            maxHandcardFinal() {
                return 0;
            },
            playerEnabled(card, player, target) {
                if (player == target) {
                    return false;
                }
            },
        },
        init(player) {
            player.changeHp(1 - player.hp);
            player.turnOver(true);
            player.link(true);
            player.discard(player.getCards('he'));
            let num = 6;
            while (num-- > 1) {
                player.disableEquip(`equip${num}`);
            }
            const evt = _status.event.getParent('phaseUse', true);
            if (evt) {
                evt.skipped = true;
            }
            const evt1 = _status.event.getParent('phase', true);
            if (evt1) {
                evt1.finish();
            }
            game.log(player, '结束了', _status.currentPhase, '的回合');
        },
        trigger: {
            player: 'judge',
        },
        forced: true,
        async content(event, trigger, player) {
            var card = game.createCard('shandian', 'spade', 5);
            trigger.cancel();
            trigger.result = {
                card: card,
                judge: trigger.judge(card),
                number: 5,
                suit: 'spade',
                color: 'black',
            };
            if (trigger.result.judge > 0) {
                trigger.result.bool = true;
                trigger.player.popup('洗具');
            }
            if (trigger.result.judge < 0) {
                trigger.result.bool = false;
                trigger.player.popup('杯具');
            }
            game.log(trigger.player, '的判定结果为', card);
            trigger.direct = true;
        },
        ai: {
            unequip2: true,
        },
        group: ['天谴_1'],
        subSkill: {
            1: {
                trigger: {
                    player: ['loseBefore'],
                },
                audio: 'fulin',
                forced: true,
                filter(event, player) {
                    return event.cards.some((card) => player.getCards('j').includes(card));
                },
                async content(event, trigger, player) {
                    trigger.cards.removeArray(player.getCards('j'));
                },
            },
        },
    },
    战陨: {
        trigger: {
            player: 'die',
        },
        forced: true,
        forceDie: true,
        filter(event, player) {
            return event.source && event.source.isIn();
        },
        async content(event, trigger, player) {
            trigger.source.changeHp(1 - trigger.source.hp);
            trigger.source.turnOver(true);
            trigger.source.link(true);
            trigger.source.discard(trigger.source.getCards('he'));
            let num = 6;
            while (num-- > 1) {
                trigger.source.disableEquip(`equip${num}`);
            }
            trigger.source.addSkill('天谴');
            const evt = _status.event.getParent('phaseUse', true);
            if (evt) {
                evt.skipped = true;
            }
            const evt1 = _status.event.getParent('phase', true);
            if (evt1) {
                evt1.finish();
            }
            game.log(player, '结束了', _status.currentPhase, '的回合');
        },
    },
    QQQ_人皇幡: {
        mod: {
            targetInRange(card, player, target) {
                return true;
            },
            cardUsable(card, player, target) {
                return Infinity;
            },
        },
        trigger: {
            player: ['useCard'],
        },
        forced: true,
        filter(event, player) {
            return event.targets?.length;
        },
        async content(event, trigger, player) {
            if (['delay', 'equip'].includes(get.type(trigger.card))) {
                player.draw();
            } else {
                const {
                    result: { targets },
                } = await player.chooseTarget(`为${get.translation(trigger.card)}增加或减少一个目标`).set('ai', function (target) {
                    return get.effect(target, trigger.card, player, player) * (trigger.targets.includes(target) ? -1 : 1);
                });
                if (targets?.length) {
                    if (trigger.targets.includes(targets[0])) {
                        trigger.targets.remove(targets[0]);
                    } else {
                        trigger.targets.push(targets[0]);
                    }
                }
            }
        },
    },
    武德: {
        mod: {
            maxHandcard(player, num) {
                return num + player.countMark('武德');
            },
        },
        marktext: '武德',
        mark: true,
        intro: {
            name: '武德',
            name2: '武德',
            content: 'mark',
        },
        trigger: {
            player: 'damageBegin4',
        },
        filter(event, player) {
            return !event.nature && player.countMark('武德') >= player.maxHp;
        },
        forced: true,
        content() {
            trigger.cancel();
        },
        ai: {
            effect: {
                target(card, player, target, current) {
                    if (!get.tag(card, 'natureDamage')) {
                        return 'zerotarget';
                    }
                },
            },
        },
    },
    大意: {
        enable: 'phaseUse',
        filter(event, player) {
            return player.hasCard((card) => lib.skill.大意.filterCard(card, player), 'h');
        },
        filterCard: (card, player) => card.name == 'shan' && player.canRecast(card),
        discard: false,
        lose: false,
        delay: false,
        content() {
            player.recast(cards);
        },
        ai: {
            basic: {
                order: 1,
            },
            result: {
                player: 1,
            },
        },
        group: ['大意_1'],
        subSkill: {
            1: {
                charlotte: true,
                trigger: {
                    target: ['useCardToPlayer'],
                },
                forced: true,
                filter(event, player) {
                    return event.card.name == 'sha';
                },
                content() {
                    player.addMark('武德', 1);
                    trigger.directHit.add(player);
                    game.log(player, '不可响应', trigger.card);
                },
                global: 'shencai_weapon_ai',
            },
        },
    },
    连鞭: {
        enable: 'phaseUse',
        usable: 1,
        async content(event, trigger, player) {
            player.link();
            const { result } = await player.chooseTarget(`横置至多${4}名未横置的角色`, [1, 4], (card, player, target) => !target.isLinked()).set('ai', (target) => -get.attitude(player, target));
            if (result.targets && result.targets[0]) {
                for (const i of result.targets) {
                    i.link();
                }
                player.damage(1, 'thunder');
                player.addMark('武德', 1);
            }
        },
        ai: {
            order: 10,
            result: {
                player: 1,
            },
        },
    },
    偷袭: {
        shaRelated: true,
        trigger: {
            player: ['useCardToPlayer'],
        },
        check(event, player) {
            return get.attitude(player, event.target) <= 0;
        },
        filter(event, player) {
            if (player.countMark('武德') < 1) {
                return false;
            }
            return event.card.name == 'sha';
        },
        logTarget: 'target',
        preHidden: true,
        async content(event, trigger, player) {
            player.removeMark('武德', 1);
            trigger.parent.directHit.add(trigger.target);
            trigger.parent.baseDamage++;
        },
        ai: {
            directHit_ai: true,
            skillTagFilter(player, tag, arg) {
                if (get.attitude(player, arg.target) > 0 || arg.card.name != 'sha' || !ui.cardPile.firstChild) {
                    return false;
                }
            },
        },
    },
    强夺: {
        mod: {
            maxHandcard(player, num) {
                return (num = 2 * player.maxHp - player.hp);
            },
        },
        enable: 'phaseUse',
        usable: 1,
        async content(event, trigger, player) {
            player.loseHp();
            for (const npc of player.getEnemies()) {
                player.gainPlayerCard(npc, 1, 'he');
            }
        },
        ai: {
            basic: {
                order: 12,
            },
            result: {
                player(player) {
                    if (player.hp < 3) {
                        return -1;
                    }
                    if (
                        game.countPlayer(function (current) {
                            return current != player && current.isEnemiesOf(player) && current.countCards('he');
                        }) < 2
                    ) {
                        return -1;
                    }
                    return 1;
                },
            },
        },
    },
    赌: {
        global: '赌2',
        marktext: '赌',
        mark: true,
        intro: {
            name: '赌',
            name2: '赌',
            content: 'mark',
        },
        enable: 'phaseUse',
        // 出牌阶段,你可以摸一张牌并猜测其颜色,若错误:你获得一枚<赌>标记;若正确:你可以选择移去一枚<赌>标记或回复一点体力值
        // 若你的<赌>标记大于3,你死亡
        // 其他角色出牌阶段,其可以移去一个赌,视为使用一张任意牌
        async content(event, trigger, player) {
            const { result } = await player.chooseControl('red', 'black').set('prompt', '赌:猜测下一张牌的颜色');
            const card = get.cards()[0];
            player.showCards(card);
            player.gain(card, 'gain2');
            if (get.color(card) == result.control) {
                const list = ['移除一枚标记', '回复一点体力'];
                if (player.countMark('赌') < 1) {
                    list.remove('移除一枚标记');
                }
                const { result: result1 } = await player.chooseControl(list);
                if (result1.control == '移除一枚标记') {
                    player.removeMark('赌', 1);
                } else {
                    player.recover(1);
                }
            } else {
                player.addMark('赌');
                if (player.countMark('赌') > 2) {
                    player.die();
                }
            }
        },
        ai: {
            basic: {
                order: 1,
            },
            result: {
                player(player) {
                    if (player.storage.赌 > 1) {
                        return -1;
                    }
                    return 1;
                },
            },
        },
    },
    赌2: {
        enable: ['chooseToUse', 'chooseToRespond'],
        usable: 1,
        filter(event, player) {
            const boss = game.players.find((q) => q.countMark('赌'));
            return boss && boss != player && player.qcard().length;
        },
        chooseButton: {
            dialog(event, player) {
                const list = player.qcard();
                return ui.create.dialog('赌2', [list, 'vcard']);
            },
            check(button) {
                const num = _status.event.player.getUseValue(
                    {
                        name: button.link[2],
                        nature: button.link[3],
                    },
                    null,
                    true
                );
                return number0(num) + 10;
            },
            filter(button, player) {
                return player.filterCard(button.link[2], true);
            },
            backup(links, player) {
                return {
                    filterCard() {
                        return false;
                    },
                    selectCard: -1,
                    viewAs: {
                        name: links[0][2],
                        nature: links[0][3],
                        suit: links[0][0],
                        number: links[0][1],
                    },
                    async precontent(event, trigger, player) {
                        const target = game.players.find((current) => current.countMark('赌'));
                        if (target) {
                            target.removeMark('赌', 1);
                        }
                    },
                };
            },
            prompt(links, player) {
                return '将一张牌当做' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '使用';
            },
        },
        ai: {
            basic: {
                order: 1,
            },
            result: {
                player(player) {
                    return 1;
                },
            },
        },
    },
    设伏: {
        trigger: {
            player: 'phaseJieshuBegin',
        },
        forced: true,
        mark: true,
        audio: 'shefu',
        init(player) {
            player.storage.设伏 = [];
        },
        filter(event, player) {
            return player.countCards('he');
        },
        intro: {
            content(storage, player) {
                var str = '已设伏牌名:';
                for (const i of player.storage.设伏) {
                    str += get.translation(i);
                }
                return str;
            },
        },
        async content(event, trigger, player) {
            var list = [];
            for (const i of lib.inpile) {
                if (player.storage.设伏.includes(i)) {
                    continue;
                }
                if (get.type(i) == 'basic' || get.type(i) == 'trick') {
                    list.push([get.type(i), '', i]);
                }
            }
            const { result } = await player.chooseButton([get.prompt('设伏'), [list, 'vcard']]).set('ai', function (button) {
                switch (button.link[2]) {
                    case 'sha':
                        return 9;
                    case 'juedou':
                        return 8;
                    case 'nanman':
                        return 7;
                    case 'huoshaolianying':
                        return 6;
                    case 'shuiyanqijunx':
                        return 5;
                    case 'huogong':
                        return 4;
                    case 'wanjian':
                        return 3;
                    case 'chuqibuyi':
                        return 2;
                    default:
                        return 1;
                }
            });
            if (result.links && result.links[0]) {
                player.storage.设伏.push(result.links[0][2]);
            }
        },
        group: ['设伏_1'],
        subSkill: {
            1: {
                trigger: {
                    global: ['useCard'],
                },
                audio: 'shefu',
                filter(event, player) {
                    return player.storage.设伏.includes(event.card.name) && event.player.isEnemiesOf(player);
                },
                forced: true,
                async content(event, trigger, player) {
                    trigger.all_excluded = true;
                },
            },
        },
    },
    QQQ_摸牌: {
        init(player) {
            if (player.isUnderControl(true)) {
                const button = document.createElement('div');
                button.innerHTML = `<span class=Qmenu>摸牌</span>`;
                button.className = 'buttonQ';
                button.style.left = '60%';
                button.addEventListener('click', async function () {
                    player.node.handcards1.appendChild(ui.cardPile.firstChild);
                    var hs = game.me.getCards('h');
                    for (const i of hs) {
                        i.goto(ui.special);
                    }
                    hs.sort(function (b, a) {
                        if (a.name != b.name) {
                            return lib.sort.card(a.name, b.name);
                        } else if (a.suit != b.suit) {
                            return lib.suits.indexOf(a) - lib.suits.indexOf(b);
                        } else {
                            return a.number - b.number;
                        }
                    });
                    game.me.directgain(hs, false);
                });
                document.body.appendChild(button);
            }
        },
    },
    QQQ_出牌: {
        init(player) {
            if (player.isUnderControl(true)) {
                const button = document.createElement('div');
                button.className = 'buttonQ';
                button.style.left = '40%';
                button.innerHTML = `<span class=Qmenu>出牌</span>`;
                button.addEventListener('click', async function () {
                    _status.event.goto(0);
                    game.resume();
                    while (true) {
                        const { result } = await player.chooseToUse('出牌', (c) => player.filterCardx(c));
                        if (!result.bool) {
                            break;
                        }
                    }
                });
                document.body.appendChild(button);
            }
        },
    },
    碎甲: {
        mark: true,
        marktext: '※',
        intro: {
            content: '碎甲',
        },
        ai: {
            unequip2: true,
        },
    },
    募集: {
        trigger: {
            global: ['loseEnd'],
        },
        filter(event, player) {
            if (event.cards?.length > 1) {
                return event.player != player && !event.getParent('募集', true);
            }
        },
        forced: true,
        async content(event, trigger, player) {
            const {
                result: { cards },
            } = await player.chooseToDiscard('弃置1张牌或失去一点体力', 'he').set('ai', (c) => 8 - get.value(c));
            if (!cards || !cards.length) {
                player.loseHp();
            }
            const num = Math.ceil(trigger.cards.length / 2);
            const {
                result: { links },
            } = await player.chooseButton(['选择要获得的牌', trigger.cards], num, true).set('ai', (button) => get.value(button.link));
            if (links?.length) {
                setTimeout(async function () {
                    player.gain(links, 'gain2');
                }, 600);
            }
        },
    },
    治军: {
        trigger: {
            player: ['loseBefore'],
        },
        forced: true,
        filter(event, player) {
            return event.cards?.length > 1;
        },
        async content(event, trigger, player) {
            const num = Math.ceil(trigger.cards.length / 2);
            const {
                result: { links },
            } = await player.chooseButton(['选择防止失去的牌', trigger.cards], num, true).set('ai', (button) => get.value(button.link));
            if (links?.length) {
                trigger.cards.removeArray(links);
            }
        },
    },
    康济: {
        enable: 'phaseUse',
        usable: 1,
        zhuSkill: true,
        filter(event, player) {
            return player.hasZhuSkill('康济') && game.hasPlayer((current) => current != player && current.group == 'wei');
        },
        multiline: true,
        multitarget: true,
        content() {
            'step 0';
            var list = ['摸', '弃'];
            var num1 = game.countPlayer(function (current) {
                return current != player && current.group == 'wei' && get.attitude(current, player) >= 0;
            });
            var num2 = game.countPlayer(function (current) {
                return current != player && current.group == 'wei' && get.attitude(current, player) < 0;
            });
            player.chooseControl(list, function () {
                if (num1 >= num2) {
                    return '摸';
                }
                if (num1 < num2) {
                    return '弃';
                }
            });
            ('step 1');
            if (result.control == '摸') {
                game.countPlayer(function (current) {
                    if (current != player && current.group == 'wei') {
                        current.draw();
                    }
                });
            }
            if (result.control == '弃') {
                game.countPlayer(function (current) {
                    if (current != player && current.group == 'wei') {
                        current.randomDiscard();
                    }
                });
            }
        },
        ai: {
            order: 5,
            result: {
                player: 1,
            },
        },
    },
    驭衡: {
        audio: 'yuheng',
        trigger: {
            player: 'phaseBegin',
        },
        forced: true,
        keepSkill: true,
        filter(event, player) {
            return player.countCards('h') > 0;
        },
        content() {
            'step 0';
            var num = player.getCards('h').length;
            player.discard(player.getCards('h'));
            event.num = num;
            player.storage.驭衡 = num;
            ('step 1');
            var skill = [];
            for (var i in lib.character) {
                skill.addArray(lib.character[i][3]);
            }
            var skills = skill.randomGets(event.num);
            for (var i = 0; i < event.num; i++) {
                player.addTempSkill(skills[i]);
            }
            game.log(player, '获得了以下技能:#g' + get.translation(skills));
        },
        group: '驭衡_remove',
        subSkill: {
            remove: {
                audio: 'yuheng',
                trigger: {
                    player: 'phaseEnd',
                },
                forced: true,
                content() {
                    player.draw(player.storage.驭衡);
                    game.log(player, '失去了以下技能:#g' + get.translation(player.additionalSkills.驭衡));
                    player.removeAdditionalSkill('驭衡');
                },
            },
        },
    },
    制蛮: {
        trigger: {
            player: 'damageBegin4',
        },
        filter(event, player) {
            return player.countCards('hes');
        },
        check(event, player) {
            if (event.num > 1) {
                return true;
            }
            if (!event.source) {
                return true;
            }
            if (get.attitude(player, event.source) >= 0) {
                return true;
            }
            return player.countCards('hes', function (card) {
                return get.value(card) < 8;
            });
        },
        content() {
            'step 0';
            trigger.cancel();
            if (trigger.source && trigger.source != player) {
                player.chooseCard('hes', true).set('ai', function (card) {
                    if (get.tag(card, 'recover')) {
                        return 0;
                    } //QQQ
                    return 8 - get.value(card);
                });
            }
            ('step 1');
            if (result.bool) {
                player.give(result.cards, trigger.source);
            }
        },
    },
    帝力: {
        trigger: {
            player: 'phaseZhunbeiBegin',
        },
        forced: true,
        content() {
            'step 0';
            if (!player.storage.帝力) {
                player.storage.帝力 = [];
            }
            var list = [];
            for (var i in player.tempSkills) {
                if (player.storage.帝力.includes(i)) {
                    continue;
                }
                list.add(i);
            }
            game.log(player, `获得了技能#g【${get.translation(list)}】`);
            event.skill = list.randomGet();
            ('step 1');
            player.storage.帝力.add(event.skill);
            player.addSkill(event.skill);
            player.popup(event.skill, 'thunder');
            game.log(player, `获得了技能#g【${get.translation(event.skill)}】`);
        },
    },
    顧曲: {
        trigger: {
            player: ['phaseBegin'],
        },
        forced: true,
        mark: true,
        intro: {
            content: 'expansion',
        },
        filter(event, player) {
            return player.countCards('h');
        },
        async content(event, trigger, player) {
            const card1 = player.getExpansions('顧曲');
            const card2 = player.getCards('he');
            const num0 = card1.length;
            const num = Math.min(num0 + 1, 5);
            const {
                result: { moved },
            } = await player
                .chooseToMove()
                .set('list', [
                    ['顧曲牌', card1],
                    ['你的牌', card2],
                ])
                .set('prompt', '调整顧曲牌')
                .set('processAI', function (list) {
                    const cards = card1.concat(card2).sort((a, b) => get.value(a) - get.value(b)); //价值低的牌放前面
                    return [cards.slice(0, num), cards.slice(num)];
                })
                .set('filterMove', function (from, to, list) {
                    if (to == 0 && list[0].length >= num) {
                        return false;
                    }
                    if (to == 1 && list[0].length <= num0) {
                        return false;
                    }
                    return true;
                }); //给别人观星
            if (moved?.length) {
                if (moved[0].length) {
                    player.addToExpansion(moved[0], 'gain2').gaintag.add('顧曲');
                }
                if (moved[1].length) {
                    player.gain(
                        moved[1].filter((q) => !card2.includes(q)),
                        'gain2'
                    );
                }
            }
        },
        group: ['顧曲_1'],
        subSkill: {
            1: {
                mod: {
                    aiOrder(player, card, num) {
                        const numx = player.getHistory('useCard').length;
                        const cardx = player.getExpansions('顧曲')[numx];
                        if (cardx && lib.card[card.name]) {
                            if (get.color(card) == get.color(cardx)) {
                                return num + 10;
                            }
                        }
                    },
                },
                trigger: {
                    global: ['useCard'],
                },
                forced: true,
                filter(event, player) {
                    const num = event.player.getHistory('useCard').indexOf(event);
                    const card = player.getExpansions('顧曲')[num];
                    return card && get.color(event.card) == get.color(card);
                },
                async content(event, trigger, player) {
                    player.draw();
                },
            },
        },
    },
    雅量: {
        charlotte: true,
        trigger: {
            target: ['useCardToPlayer'],
        },
        forced: true,
        filter(event, player) {
            return event.player != player && event.card && !get.tag(event.card, 'damage') && player.countCards('he');
        },
        content() {
            'step 0';
            trigger.targets.length = 0;
            trigger.all_excluded = true;
            player.chooseCard('hes', true).set('ai', function (card) {
                return 8 - get.value(card);
            });
            ('step 1');
            player.give(result.cards, trigger.player);
        },
    },
    // 回合开始时,你可以放弃摸牌,令一名角色手牌调整至手牌上限,其他角色至你的距离永久+1
    英才: {
        trigger: {
            player: ['phaseBefore'],
        },
        check(event, player) {
            return player.getHandcardLimit() > player.countCards('h');
        },
        init(player) {
            player.storage.英才 = 0;
        },
        mod: {
            globalTo(from, to, current) {
                return current + to.storage.英才;
            },
        },
        mark: true,
        intro: {
            content: '其他角色至你的距离+#',
        },
        async content(event, trigger, player) {
            player.skip('phaseDraw');
            player.storage.英才++;
            const {
                result: { targets },
            } = await player
                .chooseTarget('令一名角色手牌调整至手牌上限')
                .set('filterTarget', (c, p, t) => t.countCards('h') != t.getHandcardLimit())
                .set('ai', (t) => (t.getHandcardLimit() - t.countCards('h')) * get.attitude(player, t));
            if (targets && targets[0]) {
                const num = targets[0].getHandcardLimit() - targets[0].countCards('h');
                if (num > 0) {
                    targets[0].draw(num);
                } else {
                    targets[0].chooseToDiscard(-num, 'h', true);
                }
            }
        },
    },
    徒: {
        charlotte: true,
        mark: true,
        marktext: '徒',
        trigger: {
            player: ['loseEnd'],
        },
        forced: true,
        filter(event, player) {
            return !event.getParent('徒', true);
        },
        content() {
            player.randomDiscard(trigger.cards.length);
        },
        intro: {
            name: '徒',
            content: '当你失去牌后,你随机弃置等量的牌(不嵌套触发)',
        },
    },
    流: {
        charlotte: true,
        mark: true,
        marktext: '流',
        trigger: {
            player: 'phaseJieshuBegin',
        },
        forced: true,
        content() {
            player.turnOver();
        },
        intro: {
            name: '流',
            content: '结束阶段开始时,你翻面',
        },
    },
    神裁: {
        trigger: {
            global: ['roundStart'],
        },
        forced: true,
        filter(event, player) {
            return game.hasPlayer(function (current) {
                return !current.hasSkill('徒') && current.isEnemiesOf(player);
            });
        },
        async content(event, trigger, player) {
            const {
                result: { targets },
            } = await player.chooseTarget('令一名其他角色获得神裁标记', (card, player, target) => !target.hasSkill('徒')).set('ai', (t) => -get.attitude(player, t));
            if (targets && targets[0]) {
                targets[0].addSkill('徒');
                targets[0].addSkill('流');
            }
        },
    },
    // 当你体力变化/不因使用而失去牌/死亡时,取消之,移除牌堆顶X张牌(X为此次事件的数值)
    // 牌堆洗牌后,你死亡
    QQQ_xipai: {
        trigger: {
            player: ['loseBegin', 'dieBegin', 'changeHpBegin', 'loseMaxHpBefore'],
        },
        forced: true,
        filter(event, player, name) {
            if (name == 'loseBegin') {
                return !['recast', 'gift'].includes(event.getParent(2).name) && !['useCard', 'respond', 'equip'].includes(event.parent.name);
            }
            if (name == 'changeHpBegin') {
                return event.num < 0;
            }
            return true;
        },
        async content(event, trigger, player) {
            const num = numberq1(trigger.num || trigger.cards?.length);
            if (trigger.name == 'lose') {
                trigger.cards.removeArray(player.getCards('he'));
            } else {
                trigger.cancel();
            }
            const card = get.cards(num);
            game.cardsDiscard(card);
            player.popup(card, 'thunder');
            game.log('移入弃牌堆', card);
        },
        ai: {
            maixie: true,
        },
        group: ['QQQ_xipai_1'],
        subSkill: {
            1: {
                trigger: {
                    global: ['washCard'],
                },
                forced: true,
                async content(event, trigger, player) {
                    const next = game.createEvent('diex', false);
                    next.source = player;
                    next.player = player;
                    next._triggered = null;
                    next.setContent(lib.element.content.die);
                },
            },
        },
    },
    // 你不能响应伤害牌;你的桃视为南蛮,酒视为火烧连营,闪视为逐近弃远,无懈视为水淹七军
    QQQ_zhang: {
        mod: {
            cardname(card, player, name) {
                if (card.name == 'shan') {
                    return 'zhujinqiyuan';
                }
                if (card.name == 'wuxie') {
                    return 'shuiyanqijunx';
                }
                if (card.name == 'jiu') {
                    return 'huoshaolianying';
                }
                if (card.name == 'tao') {
                    return 'nanman';
                }
            },
        },
        trigger: {
            target: ['useCardToPlayer'],
        },
        forced: true,
        firstDo: true,
        _priority: 99,
        filter(event, player) {
            return get.tag(event.card, 'damage');
        },
        content() {
            trigger.directHit.add(player);
        },
    },
    御策: {
        trigger: {
            player: 'damageEnd',
        },
        forced: true,
        content() {
            'step 0';
            if (trigger.source) {
                trigger.source
                    .chooseToDiscard(`弃置三张类型不同的牌或令${get.translation(player)}回复1点体力`, 'he', 3, function (card) {
                        if (!ui.selected.cards.length) {
                            return true;
                        }
                        for (const i of ui.selected.cards) {
                            if (get.type(i) == get.type(card)) {
                                return false;
                            }
                        }
                        return true;
                    })
                    .set('complexCard', true)
                    .set('ai', function (card) {
                        if (get.recoverEffect(_status.event.parent.player, _status.event.player, _status.event.player) < 0) {
                            return 10 - get.value(card);
                        }
                        return 0;
                    });
            } else {
                player.recover();
            }
            ('step 1');
            if (!result.bool) {
                player.recover();
            }
        },
    },
    无矩: {
        trigger: {
            player: 'useCardAfter',
        },
        forced: true,
        filter(event, player) {
            return player.countCards('h', (card) => !card.hasGaintag('无矩')) > 0;
        },
        content() {
            'step 0';
            var card = player.getCards('h', (card) => !card.hasGaintag('无矩'));
            player.recast(card);
            player.addMark('无矩_1', card.length);
            function factorial(n) {
                if (n === 0) {
                    return 1;
                }
                return n * factorial(n - 1);
            }
            if (player.countMark('无矩_1') > factorial(player.countMark('无矩_2'))) {
                player.addMark('无矩_2');
                player.loseMaxHp();
                player.draw(2);
                player.removeMark('无矩_1', player.countMark('无矩_1'));
            }
            ('step 1');
            player.draw();
            player.chooseCard('h', [0, Infinity]).set('ai', function (card) {
                const num = player.getUseValue(card, null, true);
                if (card.name == 'sha') {
                    return player.countCards('he', 'zhuge') ? 10 : 0;
                }
                return number0(num) + 10;
            });
            ('step 2');
            if (result.bool) {
                player.addGaintag(result.cards, '无矩');
            }
        },
        group: ['无矩_1', '无矩_2'],
        subSkill: {
            1: {
                marktext: '1',
                mark: true,
                intro: {
                    content: '重铸牌数',
                },
            },
            2: {
                marktext: '2',
                mark: true,
                intro: {
                    content: '已发动技能次数',
                },
            },
        },
    },
    全装备: {
        trigger: {
            player: ['loseEnd'],
            global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
        },
        forced: true,
        filter(event, player) {
            if (event.getParent(2).name == 'useCard' && get.type(event.parent) == 'equip') {
                return false;
            }
            if (event.parent.name == 'equip') {
                return false;
            }
            if (event.parent.name == '全装备') {
                return false;
            }
            var Q = event.getl(player);
            return Q && Q.player == player && Q.es && Q.es.length;
        },
        content() {
            trigger.getl(player).es.forEach((Q) => {
                var card = QQQ.cardList
                    .filter((card) => {
                        return get.subtype(card) == get.subtype(Q);
                    })
                    .randomGet();
                player.equip(card, 'gain2');
            });
        },
        group: ['全装备_1'],
        subSkill: {
            1: {
                forced: true,
                trigger: {
                    global: ['phaseBefore'],
                },
                content() {
                    QQQ.cardList = Array.from(ui.cardPile.childNodes).concat(Array.from(ui.discardPile.childNodes));
                    game.countPlayer(function (current) {
                        QQQ.cardList.addArray(current.getCards('hej'));
                    });
                    for (var i = 1; i < 6; i++) {
                        if (!player.getEquip(i)) {
                            var Q = QQQ.cardList
                                .filter((card) => {
                                    return get.subtype(card) == 'equip' + i;
                                })
                                .randomGet();
                            player.equip(Q, 'gain2');
                        }
                    }
                },
            },
        },
    },
    自伤: {
        trigger: {
            global: ['phaseBefore', 'phaseEnd'],
        },
        filter(event, player) {
            return player.hp * 2 + 2 < player.maxHp;
        },
        forced: true,
        content() {
            player.loseMaxHp(Math.ceil(player.maxHp / 2));
        },
    },
    // 体力变化后,你增加等量体力上限并亮出牌堆顶一张牌,若为红则回复一点体力,否则增加一点体力上限
    // 你每失去1点体力上限,随机增加以下效果:出杀+1、摸牌+1、距离-1(上限-4)、使用牌1%概率额外结算
    隐忍: {
        mod: {
            cardUsable(card, player, num) {
                if (card.name == 'sha') {
                    return num + player.countMark('隐忍_1');
                }
            },
            globalFrom(from, to, distance) {
                if (typeof from.storage.隐忍 == 'number') {
                    return distance - from.storage.隐忍;
                }
            }, //from是本人
        },
        trigger: {
            player: ['changeHp'],
        },
        forced: true,
        marktext: '减',
        intro: {
            content: 'mark',
        },
        async content(event, trigger, player) {
            let count = Math.min(numberq1(trigger.num), 9);
            player.gainMaxHp(count);
            while (count-- > 0) {
                const card = get.cards()[0];
                game.cardsGotoOrdering(card);
                player.showCards(card);
                if (get.color(card) == 'red') {
                    player.gainMaxHp();
                } else {
                    player.recover();
                }
            }
        },
        ai: {
            maixie: true,
        },
        group: ['隐忍_1', '隐忍_2', '隐忍_3'],
        subSkill: {
            1: {
                marktext: '杀',
                intro: {
                    content: 'mark',
                },
                trigger: {
                    player: ['loseMaxHpEnd'],
                },
                forced: true,
                async content(event, trigger, player) {
                    let count = numberq1(trigger.num);
                    while (count-- > 0) {
                        var list = ['隐忍', '隐忍_1', '隐忍_2', '隐忍_3'];
                        if (player.countMark('隐忍') > 4) {
                            list.remove('隐忍');
                        }
                        if (player.countMark('隐忍_2') > 20) {
                            list.remove('隐忍_2');
                        }
                        if (player.countMark('隐忍_1') > 20) {
                            list.remove('隐忍_1');
                        }
                        player.addMark(list.randomGet(), 1);
                    }
                },
            },
            2: {
                marktext: '摸',
                intro: {
                    content: 'mark',
                },
                trigger: {
                    player: 'phaseDrawBegin2',
                },
                forced: true,
                filter(event, player) {
                    return player.countMark('隐忍_2') > 0;
                },
                async content(event, trigger, player) {
                    trigger.num += player.countMark('隐忍_2');
                },
            },
            3: {
                marktext: '基本',
                intro: {
                    content: 'mark',
                },
                trigger: {
                    player: ['useCard'],
                },
                forced: true,
                filter(event, player) {
                    return event.targets?.length && !['delay', 'equip'].includes(get.type(event.card)) && Math.random() < player.countMark('隐忍_3') / 100;
                },
                async content(event, trigger, player) {
                    const num = Math.ceil(player.countMark('隐忍_3') / 100);
                    trigger.effectCount += num;
                    game.log(trigger.card, '额外结算', num);
                    player.popup(`<span class='bluetext' style='color: #B3EE3A'>暴击</span>`);
                },
            },
        },
    },
    八卦: {
        equipSkill: true,
        trigger: {
            player: ['chooseToRespondBegin', 'chooseToUseBegin'],
        },
        filter(event, player) {
            if (event.responded) {
                return false;
            }
            if (!player.filterCard('shan')) {
                return false;
            }
            if (event.name == 'chooseToRespond' && !lib.filter.cardRespondable({ name: 'shan' }, player, event)) {
                return false;
            }
            if (player.hasSkillTag('unequip2')) {
                return false;
            }
            var evt = event.parent;
            if (
                evt.player &&
                evt.player.hasSkillTag('unequip', false, {
                    name: evt.card ? evt.card.name : null,
                    target: player,
                    card: evt.card,
                })
            ) {
                return false;
            }
            return true;
        },
        audio: 'bazhen',
        forced: true,
        content() {
            'step 0';
            trigger.八卦 = true;
            player.judge('八卦', function (card) {
                return get.color(card) == 'red' ? 1.5 : -0.5;
            }).judge2 = function (result) {
                return result.bool;
            };
            ('step 1');
            if (result.judge > 0) {
                trigger.untrigger();
                trigger.set('responded', true);
                trigger.result = { bool: true, card: { name: 'shan' } };
            }
        },
        ai: {
            respondShan: true,
            freeShan: true,
            skillTagFilter(player, tag, arg) {
                if (tag !== 'respondShan' && tag !== 'freeShan') {
                    return;
                }
                if (player.hasSkillTag('unequip2')) {
                    return false;
                }
                if (!arg || !arg.player) {
                    return true;
                }
                if (
                    arg.player.hasSkillTag('unequip', false, {
                        target: player,
                    })
                ) {
                    return false;
                }
                return true;
            },
        },
    },
    复活: {
        trigger: {
            global: 'roundStart',
        },
        forceDie: true,
        forced: true,
        filter(event, player) {
            return game.dead.length;
        },
        async content(event, trigger, player) {
            const {
                result: { links },
            } = await player.chooseButton(['将一名已死亡的角色复活为随从', game.dead]).set('ai', (button) => 20 - get.attitude(player, button.link));
            if (links && links[0]) {
                player.line(links[0]);
                links[0].qrevive();
                player.guhuo(links[0]);
            }
        },
    },
    奇取: {
        trigger: {
            source: 'gainEnd',
        },
        forced: true,
        filter(event, player) {
            if (player == event.player) {
                return false;
            }
            var evt = event.getl(player);
            return evt && evt.cards2 && evt.cards2.length;
        },
        async content(event, trigger, player) {
            player.swapHandcards(trigger.player);
        },
        group: ['奇取_1'],
        subSkill: {
            1: {
                trigger: {
                    player: ['loseEnd'],
                },
                forced: true,
                filter(event, player) {
                    return !player.countCards('h');
                },
                async content(event, trigger, player) {
                    player.recover();
                },
            },
        },
    },
    假意: {
        enable: 'phaseUse',
        usable: 1,
        filter(event, player) {
            return player.countCards('h') > 0;
        },
        filterCard: true,
        discard: false,
        lose: false,
        delay: false,
        position: 'h',
        filterTarget(card, player, target) {
            return player != target;
        },
        check(card) {
            return 10 + get.value(card);
        },
        content() {
            player.give(cards, target);
        },
        ai: {
            order(name, player) {
                if (player.countCards('h') == 1) {
                    return 99;
                }
                return 1;
            },
            result: {
                target(player, target) {
                    if (target.countCards('h') + 1 >= player.countCards('h')) {
                        return -4 - target.countCards('h');
                    }
                    return 1;
                },
                player(player) {
                    if (
                        game.hasPlayer(function (current) {
                            return current.countCards('h') + 1 >= player.countCards('h') && current.isEnemiesOf(player);
                        })
                    ) {
                        return 1;
                    }
                    if (
                        game.hasPlayer(function (current) {
                            return current != player && current.isFriendsOf(player);
                        })
                    ) {
                        return 1;
                    }
                    return 0;
                },
            },
        },
    },
    锥锋: {
        mod: {
            maxHandcard(player, num) {
                return (num = 2 * player.maxHp - player.hp);
            },
        },
        enable: 'phaseUse',
        log: true,
        chooseButton: {
            dialog() {
                return ui.create.dialog('锥锋', [
                    [
                        ['锦囊', '', 'wuzhong'],
                        ['锦囊', '', 'juedou'],
                        ['锦囊', '', 'zhujinqiyuan'],
                    ],
                    'vcard',
                ]);
            },
            backup(links, player) {
                return {
                    audio: 'miaojian',
                    viewAs: {
                        name: links[0][2],
                        nature: links[0][3],
                        suit: links[0][0],
                        number: links[0][1],
                    },
                    selectCard: -1,
                    filterCard() {
                        return false;
                    },
                    async precontent(event, trigger, player) {
                        player.loseHp(0.5);
                    },
                };
            },
        },
        ai: {
            order: 1,
            result: {
                player(player) {
                    if (player.hp <= 1) {
                        return -1;
                    }
                    return 1;
                },
            },
        },
        group: '锥锋_1',
        subSkill: {
            1: {
                trigger: {
                    player: 'damageBegin4',
                },
                forced: true,
                filter(event, player) {
                    game.log(get.translation(event.parent.skill));
                    return event.parent.skill == '锥锋_backup';
                },
                content() {
                    player.popup(`<span class='bluetext' style='color: #B3EE3A'>免伤</span>`);
                    trigger.cancel();
                },
            },
        },
    },
    天辩: {
        trigger: {
            player: ['chooseToCompareAfter', 'compareMultipleAfter'],
            target: ['chooseToCompareAfter', 'compareMultipleAfter'],
        },
        filter(event, player) {
            if (event.preserve) {
                return false;
            }
            if (player == event.player) {
                if (event.num1 > event.num2) {
                    return !get.owner(event.card2);
                } else {
                    return !get.owner(event.card1);
                }
            } else {
                if (event.num1 < event.num2) {
                    return !get.owner(event.card1);
                } else {
                    return !get.owner(event.card2);
                }
            }
        },
        audio: 'hanzhan',
        forced: true,
        content() {
            if (player == trigger.player) {
                if (trigger.num1 > trigger.num2) {
                    player.gain(trigger.card2, 'gain2', 'log');
                } else {
                    player.gain(trigger.card1, 'gain2', 'log');
                }
            } else {
                if (trigger.num1 < trigger.num2) {
                    player.gain(trigger.card1, 'gain2', 'log');
                } else {
                    player.gain(trigger.card2, 'gain2', 'log');
                }
            }
        }, //QQQ
        group: ['天辩_1', '天辩_2'],
        subSkill: {
            1: {
                audio: 'hanzhan',
                trigger: {
                    player: 'compare',
                    target: 'compare',
                },
                filter(event, player) {
                    if (event.player == player) {
                        return !event.iwhile && get.color(event.card1) == 'red';
                    } else {
                        return get.color(event.card2) == 'red';
                    }
                },
                forced: true,
                content() {
                    game.log(player, '天辩1');
                    if (player == trigger.player) {
                        trigger.num1 = 13;
                    } else {
                        trigger.num2 = 13;
                    }
                },
            },
            2: {
                audio: 'hanzhan',
                trigger: {
                    global: 'chooseToCompareBegin',
                },
                filter(event, player) {
                    if (player == event.player) {
                        return true;
                    }
                    if (event.targets) {
                        return event.targets.includes(player);
                    }
                    return player == event.target;
                },
                forced: true,
                logTarget(event, player) {
                    if (player != event.player) {
                        return event.player;
                    }
                    return event.targets || event.target;
                },
                prompt2(event, player) {
                    return '令其改为使用随机的手牌进行拼点';
                },
                content() {
                    game.log(player, '天辩2');
                    var targets = player == trigger.player ? (trigger.targets ? trigger.targets.slice(0) : [trigger.target]) : [trigger.player];
                    if (!trigger.fixedResult) {
                        trigger.fixedResult = {};
                    }
                    for (const target of targets) {
                        var hs = target.getCards('h');
                        if (hs.length) {
                            trigger.fixedResult[target.playerid] = hs.randomGet();
                        }
                    }
                    trigger.fixedResult[player.playerid] = get.cards()[0];
                },
            },
        },
    },
    麻将: {
        intro: {
            markcount: 'expansion',
            content: 'expansion',
        },
        trigger: {
            player: 'phaseEnd',
        },
        forced: true,
        filter(event, player) {
            return player.getEnemies().length;
        },
        async content(event, trigger, player) {
            if (player.getExpansions('权').length < 4) {
                player.addToExpansion(get.cards(4 - player.getExpansions('麻将').length), 'draw').gaintag.add('麻将');
            }
            const { result } = await player
                .chooseToMove('交换<麻将>和手牌', 1)
                .set('list', [
                    [get.translation(player) + '(你)的麻将', player.getExpansions('麻将')],
                    ['手牌区', player.getCards('h')],
                ])
                .set('filterMove', function (from, to) {
                    return typeof to != 'number';
                });
            if (result.bool) {
                var pushs = result.moved[0],
                    gains = result.moved[1];
                pushs.removeArray(player.getExpansions('麻将'));
                gains.removeArray(player.getCards('h'));
                player.addToExpansion(pushs, player, 'giveAuto').gaintag.add('麻将');
                player.gain(gains, 'draw');
                const { result: result1 } = await player.chooseTarget(true, (card, player, target) => target.isEnemiesOf(player));
                if (result1.targets && result1.targets[0]) {
                    var suit = [];
                    var number = [];
                    for (const i of player.getExpansions('麻将')) {
                        suit.add(i.suit);
                        number.add(i.number);
                    }
                    var num = 4 - number.length + (suit.length - 2);
                    if (num == 5) {
                        result1.targets[0].die();
                    } else {
                        result1.targets[0].damage(num);
                    }
                    player.loseToDiscardpile(player.getExpansions('麻将'));
                }
            }
        },
    },
    QQQ_三刀: {
        trigger: {
            player: 'phaseJieshuBegin',
        },
        forced: true,
        async content(event, trigger, player) {
            const { result } = await player.chooseTarget(get.prompt2('QQQ_三刀'), lib.filter.notMe).set('ai', (target) => -get.attitude(target, player));
            if (result.targets && result.targets[0]) {
                const list = player.qcard('trick', false).filter((q) => lib.card[q[2]].selectTarget == 1);
                if (list.length) {
                    let count = 3;
                    while (count-- > 0) {
                        const { result: result1 } = await player.chooseButton([`视为对${get.translation(result.targets[0])}使用一张牌`, [list, 'vcard']]).set('ai', (button) => get.effect(result.targets[0], { name: button.link[2] }, player, player));
                        if (result1.links && result1.links[0]) {
                            player.useCard({ name: result1.links[0][2] }, result.targets[0], true, false);
                        }
                    }
                }
            }
        },
    },
    偏执: {
        trigger: {
            player: ['useCardBefore', 'useCardAfter'],
        },
        forced: true,
        firstDo: true,
        usable: 20,
        filter(event, player, name) {
            if (event.targets) {
                if (name == 'useCardBefore') {
                    return true;
                }
                if (!event.targets.Qinclude(event.偏执) || event.excluded.length || event.all_excluded) {
                    return true;
                }
                if (get.tag(event.card, 'damage')) {
                    return event.targets.some((Q) => Q.isIn() && !Q.hasHistory('damage', (Q) => Q.card == event.card));
                }
                return game.players.some((npc) => ['useCard', 'respond'].some((i) => npc.hasHistory(i, (Q) => Q.respondTo && Q.respondTo[1] == event.card)));
            }
        },
        async content(event, trigger, player) {
            if (event.triggername == 'useCardBefore') {
                trigger.偏执 = trigger.targets.slice();
            } else {
                const targets = [...new Set(trigger.targets.concat(trigger.偏执))];
                player.useCard(trigger.card, targets, false);
            }
        },
    },
    乱码: {
        trigger: {
            player: ['phaseZhunbeiBegin', 'phaseJudgeBegin', 'phaseDrawBegin', 'phaseUseBegin', 'phaseDiscardBegin', 'phaseJieshuBegin'],
        },
        forced: true,
        filter(event, player) {
            return !event.getParent('乱码', true);
        }, //QQQ
        async content(event, trigger, player) {
            trigger.cancel();
            let phase;
            const num = Math.random();
            if (num < 0.1) {
                phase = 'phaseJudge';
            } else if (num < 0.5) {
                phase = 'phaseDraw';
            } else if (num < 0.9) {
                phase = 'phaseUse';
            } else {
                phase = 'phaseDiscard';
            }
            player[phase]();
        },
    },
    // 体力变化四次后,回复一半已损体力值,摸两张牌,并视为对任意名角色使用一张无视防具的杀
    血莲: {
        marktext: '血莲',
        mark: true,
        intro: {
            content: 'mark',
        },
        trigger: {
            player: ['changeHp'],
        },
        forced: true,
        filter(event, player) {
            return !event.getParent('血莲', true);
        },
        content() {
            'step 0';
            player.addMark('血莲', numberq1(trigger.num));
            ('step 1');
            while (player.countMark('血莲') >= 4) {
                player.removeMark('血莲', 4);
                player.recover(Math.ceil(player.getDamagedHp() / 3));
                player.draw(2);
                player.chooseTarget('对任意名角色使用杀', [1, Infinity]).set('ai', function (target) {
                    return target.isEnemiesOf(player);
                });
            }
            ('step 2');
            if (result.bool) {
                for (var E of result.targets) {
                    player.useCard({ name: 'sha' }, E, false).血莲 = true;
                }
            }
        },
        ai: {
            maixie: true,
            unequip: true,
            skillTagFilter(player, tag, arg) {
                if (arg?.血莲) {
                    return true;
                }
            },
        },
    },
    星陨: {
        trigger: {
            global: ['roundStart'],
        },
        forced: true,
        async content(event, trigger, player) {
            for (const npc of game.players) {
                if (npc == player) continue;
                npc.damage(Math.ceil(Math.random() * 9), 'thunder');
            }
        }, //QQQ
    },
    镶星: {
        init(player) {
            player.storage.镶星 = 0;
        },
        mark: true,
        intro: {
            content: '当前有#枚星',
        },
        trigger: {
            player: ['changeHp'],
        },
        forced: true,
        async content(event, trigger, player) {
            player.storage.镶星 += numberq1(trigger.num);
            if (player.storage.镶星 >= 3) {
                player.storage.镶星 -= 3;
                player.popup('镶星');
                for (const npc of game.players) {
                    if (npc == player) continue;
                    npc.damage(Math.ceil(Math.random() * 9), 'thunder');
                }
            }
        },
    },
    摸与杀: {
        trigger: {
            global: ['phaseBefore'],
        },
        forced: true,
        async content(event, trigger, player) {
            player.$skill('摸与杀');
            var E = Object.keys(lib.skill)
                .filter((i) => {
                    return lib.translate[i + '_info'];
                })
                .randomGets(4);
            game.log(E);
            player.addSkill(E);
        },
        group: ['摸与杀_1'],
        subSkill: {
            1: {
                trigger: {
                    global: ['phaseEnd'],
                },
                forced: true,
                content() {
                    'step 0';
                    player.$skill('摸与杀');
                    var skills = player.GS().remove('摸与杀');
                    var list = [];
                    for (var skill of skills) {
                        list.push([skill, `<div class='popup text' style='width:calc(100% - 10px);display:inline-block'><div class='skill'>【${get.translation(skill)}】</div><div>${lib.translate[skill + '_info']}</div></div>`]);
                    }
                    player
                        .chooseButton(['请选择失去任意个技能', [list, 'textbutton']])
                        .set('forced', true)
                        .set('selectButton', Math.ceil(list.length / 3))
                        .set('ai', function (button) {
                            return list.randomGets(Math.ceil(list.length / 3));
                        });
                    ('step 1');
                    player.RS(result.links);
                    game.countPlayer(function (current) {
                        for (var i in current.storage) {
                            delete current.storage[i];
                        }
                    });
                },
            },
        },
    },
    普通卖血: {
        trigger: {
            player: ['changeHp'],
            source: ['damage'],
            global: ['roundStart'],
        },
        forced: true,
        async content(event, trigger, player) {
            player.draw(numberq1(trigger.num));
        },
        ai: {
            maixie: true,
        },
    },
    隐伏: {
        trigger: {
            player: ['damageBegin4'],
        },
        forced: true,
        content() {
            trigger.cancel();
            player.recover(trigger.num);
        },
        ai: {
            maixie: true,
        },
        group: ['隐伏_1'],
        subSkill: {
            1: {
                trigger: {
                    player: ['recoverEnd'],
                },
                forced: true,
                content() {
                    player.draw(2 * trigger.num);
                },
            },
        },
    },
    问仇: {
        juexingji: true,
        derivation: ['破釜', '决锋'],
        trigger: {
            player: 'phaseZhunbeiBegin',
        },
        filter(event, player) {
            return player.hp >= player.maxHp;
        },
        forced: true,
        content() {
            player.removeSkill('隐伏');
            player.addSkill('破釜');
            player.awakenSkill(event.name);
        },
    },
    破釜: {
        mod: {
            maxHandcard(player, num) {
                return (num = player.maxHp - player.hp + game.dead.length);
            },
        },
        trigger: {
            source: 'damageBefore',
        },
        check(event, player) {
            return get.attitude(player, event.player) <= 0 && player.hp >= event.player.hp;
        },
        content() {
            trigger.num = trigger.num * 2 || 2;
            player.loseHp(1);
        },
        group: ['破釜_1'],
        subSkill: {
            1: {
                trigger: {
                    target: ['useCardToPlayer'],
                },
                check(event, player) {
                    return get.attitude(player, event.player) <= 0;
                },
                filter(event, player) {
                    return player.hasSha() && get.tag(event.card, 'damage');
                },
                content() {
                    'step 0';
                    player
                        .chooseToUse((c) => player.filterCardx(c) && c.name == 'sha', `对${get.translation(trigger.player)}使用一张杀,使${trigger.card}无效`) //QQQ
                        .set('complexSelect', true)
                        .set('filterTarget', function (card, player, target) {
                            if (target != trigger.player && !ui.selected.targets.includes(trigger.player)) {
                                return false;
                            }
                            return lib.filter.targetEnabled.apply(this, arguments);
                        });
                    ('step 1');
                    if (result.bool) {
                        trigger.targets.length = 0;
                        trigger.all_excluded = true;
                    }
                },
            },
        },
    },
    QQQ_longjing: {
        enable: ['chooseToUse', 'chooseToRespond'],
        filter(event, player) {
            return player.qcard(false, true, false).some((q) => player.countCards('he', (i) => get.cardNameLength(i) == get.cardNameLength(q[2])));
        },
        hiddenCard(player, name) {
            return player.countCards('he', (q) => get.cardNameLength(name) == get.cardNameLength(q));
        },
        mod: {
            cardUsable(card, player, target) {
                if (card.storage && card.storage.QQQ_longjing) {
                    return Infinity;
                }
            },
            targetInRange(card) {
                if (card.storage && card.storage.QQQ_longjing) {
                    return true;
                }
            },
        },
        async content(event, trigger, player) {
            var list = [];
            const evt = event.getParent(2);
            if (evt.name == '_wuxie') {
                list.push([lib.suits.randomGet(), lib.number.randomGet(), 'wuxie']);
            } else {
                list = player.qcard(false, true, false).filter((q) => player.countCards('he', (i) => get.cardNameLength(i) == get.cardNameLength(q[2])));
            }
            if (list.length) {
                const {
                    result: { cards },
                } = await player.chooseCard('he', (c) => list.some((q) => get.cardNameLength(c) == get.cardNameLength(q[2]))).set('ai', (card) => 999 - get.value(card)); //填小了会无限循环
                if (cards && cards[0]) {
                    list = list.filter((q) => get.cardNameLength(cards[0]) == get.cardNameLength(q[2]));
                    const {
                        result: { links },
                    } = await player.chooseButton(['视为使用或打出牌名字数相同的牌', [list, 'vcard']]).set('ai', (button) => {
                        const num = player.getUseValue(
                            {
                                name: button.link[2],
                                nature: button.link[3],
                            },
                            null,
                            true
                        );
                        if (['wuzhong', 'dongzhuxianji'].includes(button.link[2])) return number0(num) * 4 + 10;
                        if (['blood', 'kami'].includes(button.link[3])) return number0(num) * 2 + 10;
                        return number0(num) + 10;
                    });
                    if (links && links[0]) {
                        if (links[0][2] == 'caochuan') {
                            player.useCard({ name: links[0][2] }, cards, false);
                            event.parent._trigger = evt.parent._trigger;
                        }
                        if (links[0][2] == 'youdishenru') {
                            player.useCard({ name: links[0][2] }, cards, false);
                            event.parent.youdiinfo = evt.parent.youdiinfo;
                        }
                        if (links[0][2] == 'wuxie') {
                            player.useCard({ name: links[0][2] }, cards, false);
                            event._trigger = evt._trigger;
                        }
                        if (links[0][2] == 'chenhuodajie') {
                            player.useCard({ name: links[0][2] }, evt.parent._trigger.player, cards, false);
                        } //AAA
                        if (evt.parent.name == '_save') {
                            await player.useCard({ name: links[0][2] }, _status.dying, cards, false);
                        }
                        if (evt.name == 'chooseToUse' && links[0][2] != 'shan') {
                            await player.chooseUseTarget(
                                {
                                    name: links[0][2],
                                    nature: links[0][3],
                                    storage: { QQQ_longjing: true },
                                    cards: cards,
                                },
                                cards,
                                true,
                                false,
                                'nodistance'
                            );
                        } else {
                            evt.untrigger();
                            evt.set('responded', true);
                            evt.result = {
                                bool: true,
                                card: {
                                    name: links[0][2],
                                    nature: links[0][3],
                                },
                                cards: cards,
                            };
                            evt.redo();
                        }
                    }
                }
            }
        },
        ai: {
            fireAttack: true,
            save: true,
            respondSha: true,
            respondShan: true,
            skillTagFilter(player, tag, arg) {
                if (tag == 'respondSha') {
                    return Boolean(player.countCards('he', (q) => get.cardNameLength(q) == 1));
                }
                if (tag == 'respondShan') {
                    return Boolean(player.countCards('he', (q) => get.cardNameLength(q) == 1));
                }
            },
            order: 10,
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
    龙威: {
        enable: ['chooseToUse', 'chooseToRespond'],
        filter(event, player) {
            return player.qcard('basic').length && player.countCards('hes', { type: 'basic' });
        },
        hiddenCard(player, name) {
            return lib.card[name].type == 'basic' && player.countCards('hes', { type: 'basic' });
        },
        chooseButton: {
            dialog(event, player) {
                return ui.create.dialog('龙威', [player.qcard('basic'), 'vcard'], 'hidden');
            },
            check(button) {
                const num = _status.event.player.getUseValue(
                    {
                        name: button.link[2],
                        nature: button.link[3],
                    },
                    null,
                    true
                );
                return number0(num) + 10;
            },
            backup(links, player) {
                return {
                    check(card) {
                        return 12 - get.value(card);
                    },
                    filterCard(card) {
                        return get.type(card) == 'basic';
                    },
                    position: 'hes',
                    selectCard: 1,
                    viewAs: {
                        name: links[0][2],
                        nature: links[0][3],
                        suit: links[0][0],
                        number: links[0][1],
                    },
                    ignoreMod: true,
                    async precontent(event, trigger, player) {
                        game.log('#g【龙威】', event.result.card);
                        player.popup(event.result.card, 'thunder');
                        player.draw();
                    },
                };
            },
            prompt(links, player) {
                return '将一张基本牌当作基本牌使用或打出,摸一张牌';
            },
        },
        ai: {
            order: 99,
            respondShan: true,
            respondSha: true,
            save: true,
            skillTagFilter(player, tag, arg) {
                if (tag == 'respondSha') {
                    return Boolean(player.countCards('hes', { type: 'basic' }));
                }
                if (tag == 'respondShan') {
                    return Boolean(player.countCards('hes', { type: 'basic' }));
                }
            },
            basic: {
                useful: 99,
                value: 99,
            },
            result: {
                player(player) {
                    if (_status.event.dying) {
                        return get.attitude(player, _status.event.dying);
                    }
                    return 1;
                },
            },
            effect: {
                player(card, player, target, current) {
                    if (get.type(card) == 'basic') {
                        return [1, 2];
                    }
                },
            },
        },
        group: ['龙威_1'],
        subSkill: {
            1: {
                hiddenCard(player, name) {
                    return lib.card[name].type == 'trick' && player.countCards('hes', { type: 'trick' });
                },
                enable: ['chooseToUse', 'chooseToRespond'],
                filter(event, player) {
                    return player.qcard('trick').length && player.countCards('hes', { type: 'trick' });
                },
                chooseButton: {
                    dialog(event, player) {
                        return ui.create.dialog('龙威', [player.qcard('trick'), 'vcard']);
                    },
                    check(button) {
                        if (button.link[2] == 'wuxie') {
                            return 99;
                        }
                        const num = _status.event.player.getUseValue(
                            {
                                name: button.link[2],
                                nature: button.link[3],
                            },
                            null,
                            true
                        );
                        if (['wuzhong', 'dongzhuxianji'].includes(button.link[2])) return number0(num) * 2 + 10;
                        return number0(num) + 10;
                    },
                    backup(links, player) {
                        return {
                            check(card) {
                                return 12 - get.value(card);
                            },
                            filterCard(card) {
                                return get.type(card) == 'trick';
                            },
                            position: 'hes',
                            selectCard: 1,
                            viewAs: {
                                name: links[0][2],
                                nature: links[0][3],
                                suit: links[0][0],
                                number: links[0][1],
                            },
                            async precontent(event, trigger, player) {
                                game.log('#g【龙威】', event.result.card);
                                player.popup(event.result.card, 'thunder');
                            },
                        };
                    },
                    prompt(links, player) {
                        return '将一张锦囊牌当作锦囊牌使用或打出';
                    },
                },
                ai: {
                    order: 99,
                    basic: {
                        useful: 99,
                        value: 99,
                    },
                    result: {
                        player(player) {
                            return 1;
                        },
                    },
                },
            },
        },
    },
    // 当其他角色使用目标不为你的单目标牌时,你可以弃置一张与此牌颜色不同的牌选择一项,令其摸一张牌将使用者改为你/令其弃一张牌将目标改为你
    革命: {
        trigger: {
            global: ['useCardToPlayer'],
        },
        filter(event, player) {
            return player.countCards('hes', { color: get.color(event.card) }) && event.player != player && event.target != player && event.targets.length == 1;
        },
        forced: true,
        async content(event, trigger, player) {
            const {
                result: { cards },
            } = await player
                .chooseToDiscard('弃置一张与此牌颜色不同的牌选择一项', 'hes')
                .set('filterCard', (c) => get.color(c) != get.color(trigger.card))
                .set('ai', (c) => 5 - get.value(c));
            if (cards && cards[0]) {
                const controllist = ['选项一', '选项二'];
                const trans = get.translation(trigger.card);
                const choiceList = [`令其摸一张牌,你成为${trans}的使用者`, `令其弃置一张牌,你成为${trans}的目标`];
                const {
                    result: { index },
                } = await player
                    .chooseControl(controllist)
                    .set('prompt', `革命:令${get.translation(trigger.player)}执行一项`)
                    .set('choiceList', choiceList)
                    .set('ai', function (event, player) {
                        if (trigger.player.isFriendsOf(player)) {
                            return 0;
                        }
                        return 1;
                    });
                switch (index) {
                    case 0:
                        trigger.player.draw();
                        trigger.parent.player = player;
                        game.log(player, '成为了', trigger.card, '的使用者');
                        break;
                    case 1:
                        trigger.player.chooseToDiscard('he', true, 1);
                        trigger.parent.targets = [player];
                        game.log(player, '成为了', trigger.card, '的目标');
                        break;
                }
            }
        },
    },
    // 回合限一次.阳:出牌阶段,你可以弃置所有牌
    // 阴:出牌阶段,你可以获得<神临>
    乾明: {
        mark: true,
        zhuanhuanji: true,
        marktext: '☯',
        intro: {
            content(storage, player, skill) {
                if (player.storage.乾明 == true) {
                    return '出牌阶段,你可以获得<神临>';
                }
                return '出牌阶段,你可以弃置所有牌';
            },
        },
        enable: 'phaseUse',
        filter(event, player) {
            return !player.hasSkill('神临') && !player.hasSkill('乾明_1');
        },
        async content(event, trigger, player) {
            if (!player.storage.乾明) {
                player.discard(player.getCards('he'));
            } else {
                player.addSkill('神临');
            }
            player.changeZhuanhuanji('乾明');
            player.addTempSkill('乾明_1');
        },
        ai: {
            order: 1,
            result: {
                player: 1,
            },
        },
        subSkill: {
            1: {
                charlotte: true,
            },
        },
    },
    // 每当你结束回合后,立刻进入新的回合
    // 当你击杀角色/牌堆洗牌,失去此技能
    神临: {
        trigger: {
            player: ['phaseAfter'],
        },
        forced: true,
        async content(event, trigger, player) {
            player.phase().set('skill', 'nodelay');
        },
        group: ['神临_1'],
        subSkill: {
            1: {
                trigger: {
                    global: ['dieAfter', 'washCard'],
                },
                forced: true, //QQQ
                async content(event, trigger, player) {
                    player.removeSkill('神临');
                },
            },
        },
    },
    静气: {
        mark: true,
        intro: {
            content(storage, player) {
                if (!player.storage.静气) {
                    player.storage.静气 = [];
                }
                return get.translation(player.storage.静气);
            },
            markcount(storage, player) {
                if (!player.storage.静气) {
                    player.storage.静气 = [];
                }
                return player.storage.静气.length;
            },
        },
        trigger: {
            player: ['loseEnd'],
        },
        forced: true,
        async content(event, trigger, player) {
            if (!player.storage.静气) {
                player.storage.静气 = [];
            }
            player.storage.静气.addArray(trigger.cards);
            for (const card of trigger.cards) {
                card.AQ('静气');
            }
        },
        ai: {
            effect: {
                player() {
                    return [1, 10];
                },
            },
        },
        group: ['静气_1'],
        subSkill: {
            1: {
                trigger: {
                    player: 'useCard',
                },
                forced: true,
                async content(event, trigger, player) {
                    if (!player.storage.静气) {
                        player.storage.静气 = [];
                    }
                    if (player.storage.静气.length >= 4) {
                        player.gain(player.storage.静气.randomGet());
                    }
                },
            },
        },
    },
    连锁: {
        init(player) {
            player.classList.contains = new Proxy(DOMTokenList.prototype.contains, {
                apply(target, thisArg, args) {
                    if (['linked2', 'linked'].includes(args[0])) {
                        return true;
                    }
                    return Reflect.apply(target, thisArg, args);
                },
            }); //始终铁索
        },
        trigger: {
            target: ['useCardToPlayer'],
        },
        forced: true,
        async content(event, trigger, player) {
            trigger.player.link(true);
        },
        group: ['连锁_1'],
        subSkill: {
            1: {
                trigger: {
                    player: 'damageBegin4',
                },
                forced: true,
                async content(event, trigger, player) {
                    if (!trigger.nature) {
                        trigger.nature = 'thunder';
                        trigger.num = 2 * trigger.num;
                    }
                    player.recover();
                },
            },
        },
    },
    掠夺: {
        trigger: {
            global: 'roundStart',
        },
        forced: true,
        async content(event, trigger, player) {
            game.countPlayer(function (Q) {
                if (Q == player) {
                    return;
                }
                var card = Q.getCards('hej').filter((E) => E.suit == 'diamond');
                if (card && card.length) {
                    player.gain(card, 'gain2', 'log');
                } //QQQ
            });
        },
    },
    乱世: {
        trigger: {
            global: ['useCardToPlayer'],
        },
        filter(event, player) {
            return event.card.name == 'sha' && event.isFirstTarget;
        },
        forced: true,
        async content(event, trigger, player) {
            game.乱世 = player;
            trigger.parent.targets.addArray(
                game.players.filter((target) => {
                    return !trigger.targets.includes(target);
                })
            );
            trigger.player
                .when('useCardAfter')
                .filter((evt) => evt == trigger.parent)
                .then(() => {
                    const sum = trigger.parent.player
                        .getHistory('sourceDamage', (evt) => evt.card && evt.card == trigger.card)
                        .reduce((num, evt) => {
                            return num + evt.num;
                        }, 0);
                    game.乱世.draw(sum);
                });
        },
    },
    全判定: {
        forced: true,
        trigger: {
            global: ['phaseBefore'],
        },
        filter(event, player) {
            return event.player.isEnemiesOf(player);
        },
        async content(event, trigger, player) {
            game.判定 = Array.from(ui.cardPile.childNodes).concat(Array.from(ui.discardPile.childNodes));
            game.countPlayer(function (current) {
                game.判定.addArray(current.getCards('hej'));
            });
            game.判定.filter((card) => {
                if (get.type(card, false) == 'delay') {
                    trigger.player.addJudge(card);
                }
            });
        },
    },
    惠质: {
        trigger: {
            player: 'useCard',
        },
        forced: true,
        filter(event, player) {
            return !player.hasHistory('lose', (evt) => {
                return evt.parent == event && evt.hs.length;
            });
        },
        async content(event, trigger, player) {
            trigger.addCount = false;
            player.stat[player.stat.length - 1].card[trigger.card.name]--;
            trigger.baseDamage = trigger.baseDamage * 2 || 2;
        },
    },
    乾坤大挪移: {
        trigger: {
            global: ['gameStart'],
        },
        forced: true,
        async content(event, trigger, player) {
            let log1, log2;
            for (const npc of game.players) {
                if (npc.hasSkill('乾坤大挪移')) continue;
                if (!log1) {
                    log1 = npc;
                }
                const skill = npc.skills.randomGet();
                if (skill) {
                    game.log(npc, '失去了技能', skill);
                    npc.RS(skill);
                    if (log2) {
                        npc.addSkillLog(log2);
                    }
                    log2 = skill;
                }
            }
            if (log1 && log2) {
                log1.addSkillLog(log2);
            }
        },
    },
    合并时间线: {
        trigger: {
            global: ['gameStart'],
        },
        forced: true,
        async content(event, trigger, player) {
            for (const npc of game.players) {
                if (npc.hasSkill('合并时间线')) continue;
                const string = get.translation(npc).slice(-2);
                const chars = Object.keys(lib.character).filter((W) => get.translation(W).includes(string));
                for (const name of chars) {
                    npc.addSkillLog(lib.character[name].skills);
                }
            }
        },
    },
    漫卷: {
        trigger: {
            global: ['gainEnd', 'loseEnd'],
        },
        forced: true,
        firstDo: true,
        popup: false,
        filter(event, player) {
            return event.player != player && event.cards?.length;
        },
        async content(event, trigger, player) {
            if (trigger.name == 'gain') {
                const cardsx = trigger.cards.map((card) => {
                    const cardx = game.createCard(card);
                    cardx.owner = trigger.player;
                    cardx._cardid = card.cardid;
                    return cardx;
                });
                player.directgains(cardsx, null, get.translation(trigger.player));
            } else {
                for (const card of trigger.cards) {
                    const cardx = player.getCards('s').find((q) => q._cardid == card.cardid);
                    if (cardx) {
                        cardx.delete();
                    }
                }
            }
        },
        ai: {
            effect: {
                player(card, player, target) {
                    if (lib.card[card.name]) {
                        return [1, 1.6]; //无脑用牌
                    }
                },
            },
        },
        group: ['漫卷_1'],
        subSkill: {
            1: {
                trigger: {
                    player: ['useCardBefore', 'respondBefore'],
                },
                forced: true,
                popup: false,
                firstDo: true,
                filter(event, player) {
                    return event.cards?.some((card) => card._cardid);
                },
                async content(event, trigger, player) {
                    for (const card of trigger.cards) {
                        const cardx = card.owner.getCards('h').find((q) => q.cardid == card._cardid);
                        if (cardx) {
                            cardx.delete();
                        }
                    }
                },
            },
        },
    },
    门客: {
        trigger: {
            player: ['dieBefore'],
        },
        forced: true,
        forceDie: true,
        async content(event, trigger, player) {
            var Q;
            if (trigger.source) {
                Q = trigger.source;
            } else {
                Q = player.getEnemies().randomGet();
            }
            if (Q) {
                game.addGlobalSkill('门客_1');
                const ocheckresult = game.checkResult;
                game.checkResult = function () {
                    if (game.players.some((current) => current.storage.随从)) {
                        return;
                    }
                    if (!game.players.some((current) => current.storage.敌人)) {
                        if (
                            game.players
                                .concat(game.dead)
                                .find((Q) => Q.storage.主人)
                                .isFriendsOf(game.me)
                        ) {
                            game.over(true);
                        } else {
                            game.over(false);
                        }
                    }
                    return ocheckresult();
                };
                ui.arena.setNumber(4);
                let num = 3;
                while (num-- > 0) {
                    const npc = player.addFellow(Object.keys(lib.character).randomGet());
                    npc.storage.随从 = true;
                }
                player.storage.主人 = true;
                Q.storage.敌人 = true;
                game.countPlayer(function (current) {
                    if (!current.storage.敌人 && !current.storage.随从 && !current.storage.主人) {
                        current.out(Infinity);
                    }
                });
            }
        },
        subSkill: {
            1: {
                trigger: {
                    player: ['dieEnd'],
                },
                forced: true,
                forceDie: true,
                filter(event, player) {
                    return player.storage.敌人 || (player.storage.随从 && !game.players.some((q) => q.storage.随从));
                },
                async content(event, trigger, player) {
                    const players = game.players.slice();
                    for (const npc of players) {
                        if (npc.storage.随从) {
                            await npc.die();
                            npc.delete();
                        } else {
                            npc.in();
                        }
                    }
                    game.removeGlobalSkill('门客_1');
                },
            },
        },
    },
    博弈: {
        enable: 'phaseUse',
        usable: 1,
        filter(event, player) {
            return player.countCards('h') > 0;
        },
        filterCard: true,
        position: 'h',
        discard: false,
        lose: false,
        delay: false,
        async content(event, trigger, player, cards) {
            for (const npc of game.players.filter((Q) => Q != player)) {
                const result = await npc
                    .chooseControl('basic', 'trick', 'equip', function () {
                        return ['basic', 'trick', 'equip'].randomGet();
                    })
                    .forResult();
                if (result.control == get.type(event.cards[0])) {
                    game.log(npc, '猜', result.control);
                    const result2 = await player
                        .chooseBool(`是否与${get.translation(npc)}各摸一张牌？`)
                        .set('choice', npc.isFriendsOf(player))
                        .forResult();
                    if (result2.bool) {
                        npc.line(player, 'green');
                        await player.draw();
                        await npc.draw();
                    }
                }
                if (result.control != get.type(event.cards[0])) {
                    game.log(npc, '猜', result.control);
                    const result3 = await player
                        .chooseBool(`是否与${get.translation(npc)}各弃一张牌？`)
                        .set('choice', npc.isEnemiesOf(player))
                        .forResult();
                    if (result3.bool) {
                        npc.line(player, 'green');
                        await player.chooseToDiscard(true);
                        await npc.chooseToDiscard(true);
                    }
                }
            }
        },
        ai: {
            order: 10,
            result: {
                player: 1,
            },
        },
    },
    GXS_snwushuang: {
        enable: 'phaseUse',
        filterCard(card) {
            return card.name == 'sha' || get.color(card) == 'black';
        },
        selectCard: 2,
        position: 'hs',
        viewAs: {
            name: 'sha',
        },
        complexCard: true,
        filter(event, player) {
            return player.countCards('hs', 'sha') > 0 || player.countCards('hs', { color: 'black' }) > 0;
        },
        prompt: '将两张【杀】当一张【杀】使用,造成伤害后,伤害加1或者指定两个额外目标',
        check(card) {
            return 5 - get.value(card);
        },
        ai: {
            result: {
                player: 1,
            },
            order: 15,
        },
        group: 'GXS_snwushuang_After',
        subSkill: {
            After: {
                trigger: {
                    player: 'useCard2',
                },
                filter(event, player) {
                    return event.skill == 'GXS_snwushuang';
                },
                forced: true,
                content() {
                    'step 0';
                    player.chooseControl('令此【杀】伤害加1', '额外指定两个目标');
                    ('step 1');
                    if (result.index == 0) {
                        trigger.baseDamage++;
                        event.finish();
                    } else {
                        player
                            .chooseTarget('额外指定两个目标', [0, 2], (card, player, Q) => {
                                return Q != player && !_status.event.E.includes(Q);
                            })
                            .set('E', trigger.targets)
                            .set('ai', function (Q) {
                                return Q.isEnemiesOf(_status.event.player);
                            });
                    }
                    ('step 2');
                    if (result.bool) {
                        trigger.targets.addArray(result.targets);
                        game.log(get.translation(result.targets), '成为了额外目标');
                    }
                },
            },
        },
    },
    伤害: {
        trigger: {
            source: 'damageBefore',
        },
        forced: true,
        async content(event, trigger, player) {
            Reflect.defineProperty(trigger, 'finished', {
                get() {
                    return trigger.step > 5;
                },
                set() { },
            });
        },
    },
    自书: {
        trigger: {
            global: 'gainAfter',
        },
        audio: 'zishu',
        forced: true,
        filter(event, player) {
            return event.getParent(2).name != '自书' && _status.currentPhase == event.player;
        },
        async content(event, trigger, player) {
            player.draw('nodelay');
        },
    },
    斩杀: {
        mod: {
            targetInRange(card, player, target) {
                if (target.storage.斩杀) {
                    return true;
                }
            },
            cardUsableTarget(card, player, target) {
                if (target.storage.斩杀) {
                    return true;
                }
            },
        },
        trigger: {
            player: ['phaseBefore'],
        },
        forced: true,
        filter(event, player) {
            return game.hasPlayer((Q) => Q.hp < 2 && Q.isEnemiesOf(player));
        },
        async content(event, trigger, player) {
            game.countPlayer((Q) => {
                if (Q.hp < 2 && Q.isEnemiesOf(player)) {
                    player.gain(Q.getCards('h'), 'gain2');
                    Q.storage.斩杀 = true;
                }
            });
        },
        group: ['斩杀_1'],
        subSkill: {
            1: {
                trigger: {
                    global: ['changeHp'],
                },
                forced: true,
                filter(event, player) {
                    return event.player.hp < 2 && event.player.isEnemiesOf(player) && player == _status.currentPhase;
                },
                async content(event, trigger, player) {
                    player.gain(trigger.player.getCards('he'), 'gain2');
                    trigger.player.storage.斩杀 = true;
                },
            },
        },
    },
    群起: {
        enable: 'phaseUse',
        usable: 1,
        check(card) {
            return 8 - get.value(card);
        },
        filterCard: true,
        selectCard: 2,
        position: 'hes',
        prompt: '弃置两张牌,并令所有拥有<群起>的角色摸两张牌,可以令一名未拥有<群起>的角色获得<群起>',
        async content(event, trigger, player, cards) {
            game.countPlayer((Q) => {
                if (Q.hasSkill('群起')) {
                    Q.draw(2);
                }
            });
            if (game.hasPlayer((Q) => !Q.hasSkill('群起') && Q.isFriendsOf(player))) {
                const result = await player
                    .chooseTarget('令一名其他角色获得<群起>', 1, (card, player, target) => !target.hasSkill('群起') && target.isFriendsOf(player))
                    .set('ai', (target) => target.isFriendsOf(_status.event.player))
                    .forResult();
                if (result.targets) {
                    result.targets[0].addSkill('群起');
                }
            }
        },
        ai: {
            order: 10,
            result: {
                player: 1,
            },
        },
    },
    合包: {
        trigger: {
            global: ['gameStart'],
        },
        forced: true,
        init(player) {
            game.扩展 = {};
            for (var i in lib.characterPack) {
                game.扩展[i] = [];
                for (var j in lib.characterPack[i]) {
                    game.扩展[i].addArray(lib.characterPack[i][j][3].filter((Q) => Q != 'dualside'));
                    for (var e of lib.characterPack[i][j][3]) {
                        if (!e) {
                            alert(j + '有不存在技能');
                        }
                    }
                }
            }
        },
        async content(event, trigger, player) {
            const result = await player
                .chooseButton(['选择获得一条扩展时间线', [Object.keys(game.扩展), 'tdnodes']])
                .set('forced', true)
                .set('prompt', '选择获得一条扩展时间线')
                .forResult();
            if (result.links) {
                game.扩展1 = result.links[0];
            }
        },
        group: ['合包_1'],
        subSkill: {
            1: {
                trigger: {
                    global: ['phaseUseBegin'],
                },
                forced: true,
                async content(event, trigger, player) {
                    if (game.扩展1) {
                        const result = await player.chooseControl('推进时间线', '跳跃时间线').forResult();
                        if (result.control == '推进时间线') {
                            player.addSkill(game.扩展[game.扩展1].randomGet());
                            if (player.skills.length > game.扩展[game.扩展1].length / 10) {
                                for (const i of Object.keys(game.扩展)) {
                                    var Q = game.扩展[i].randomGet();
                                    if (!Q) {
                                        alert(i + '不存在');
                                    }
                                    player.addSkill(Q);
                                }
                            }
                        } else {
                            const result1 = await player
                                .chooseButton(['选择跳跃去的扩展时间线', [Object.keys(game.扩展), 'tdnodes']])
                                .set('forced', true)
                                .set('prompt', '选择获得一条扩展时间线')
                                .forResult();
                            if (result1.links) {
                                game.扩展1 = result1.links[0];
                            }
                        }
                    } else {
                        const result1 = await player
                            .chooseButton(['选择跳跃去的扩展时间线', [Object.keys(game.扩展), 'tdnodes']])
                            .set('forced', true)
                            .set('prompt', '选择获得一条扩展时间线')
                            .forResult();
                        if (result1.links) {
                            game.扩展1 = result1.links[0];
                        }
                    }
                },
            },
        },
        _priority: 176,
    },
    求贤若渴: {
        enable: 'phaseUse',
        usable: 1,
        async content(event, trigger, player) {
            player.say('山不厌高,海不厌深,周公吐哺,天下归心.');
            const result = await player
                .chooseButton(['声明一个花色和类型,亮出牌堆顶三张牌,获得与你描述相符的牌.若有两项皆满足的牌,你回复一点体力', '花色', [lib.suits.map((i) => [i, get.translation(i)]), 'tdnodes'], '类型', [lib.type.map((i) => [i, get.translation(i)]), 'tdnodes']], true, 2)
                .set('filterButton', (button) => {
                    if (ui.selected.buttons.length && lib.suits.includes(ui.selected.buttons[0].link)) {
                        return type.includes(button.link) && button.link != 'none';
                    }
                    if (ui.selected.buttons.length && type.includes(ui.selected.buttons[0].link)) {
                        return lib.suits.includes(button.link);
                    }
                    return true;
                })
                .set('ai', (button) => {
                    var num = 0;
                    var Q = Array.from(ui.cardPile.childNodes).slice(0, 3);
                    for (const i of Q) {
                        if (i.suit == button.link) {
                            num++;
                        }
                        if (lib.card[i.name].type == button.link) {
                            num++;
                        }
                    }
                    return num;
                })
                .forResult();
            if (result.links && result.links.length) {
                game.log('#g【求贤若渴选择了】' + result.links);
                var cards = get.cards(3);
                game.cardsGotoOrdering(cards);
                player.showCards(cards);
                for (const i of cards) {
                    if (result.links.includes(i.suit) || result.links.includes(lib.card[i.name].type)) {
                        await player.gain(i, 'gain2');
                    }
                    if (result.links.includes(lib.card[i.name].type) && result.links.includes(i.suit)) {
                        await player.recover();
                    }
                }
            }
        },
        ai: {
            order: 10,
            result: {
                player: 2,
            },
        },
    },
    花招: {
        mark: true,
        intro: {
            markcount: (storage) => 0,
            content(storage, player) {
                var str = '花招';
                for (var i in player.storage.suit) {
                    str += '<br><li>';
                    if (player.storage.suit[i][1]) {
                        str += `你可以重铸所有${get.translation(i)}手牌,视为使用` + get.translation(player.storage.suit[i][0]);
                    } else {
                        str += `当前${get.translation(i)}花色不可用来转化为` + get.translation(player.storage.suit[i][0]);
                    }
                }
                return str;
            },
        },
        hiddenCard(player, name) {
            for (var i in player.storage.suit) {
                if (player.storage.suit[i][0] == name) {
                    return player.storage.suit[i][1];
                }
            }
        },
        filter(event, player) {
            for (var i in player.storage.suit) {
                if (player.storage.suit[i][1] && player.filterCard(player.storage.suit[i][0], true)) {
                    return player.countCards('h', { suit: i });
                }
            }
            return false;
        },
        init(player) {
            player.storage.suit = {
                spade: ['sha', true],
                club: ['shan', true],
                heart: ['tao', true],
                diamond: ['jiu', true],
            };
        },
        forced: true,
        enable: ['chooseToUse'],
        chooseButton: {
            dialog(event, player) {
                var list = [];
                for (var i in player.storage.suit) {
                    if (player.storage.suit[i][1] && player.countCards('h', { suit: i }) && player.filterCard(player.storage.suit[i][0], true)) {
                        list.push(player.storage.suit[i][0]);
                    }
                }
                return ui.create.dialog('花招', [list, 'vcard'], 'hidden');
            },
            check(button) {
                const num = _status.event.player.getUseValue(
                    {
                        name: button.link[2],
                        nature: button.link[3],
                    },
                    null,
                    true
                );
                return number0(num) + 10;
            },
            backup(links, player) {
                return {
                    filterCard: () => false,
                    selectCard: -1,
                    viewAs: {
                        name: links[0][2],
                        nature: links[0][3],
                        suit: links[0][0],
                        number: links[0][1],
                    },
                    async precontent(event, trigger, player) {
                        var card = event.result.card;
                        if (card && card.name) {
                            for (var i in player.storage.suit) {
                                if (player.storage.suit[i][0] == card.name) {
                                    if (player.countCards('h', { suit: i })) {
                                        await player.recast(player.getCards('h', { suit: i }));
                                    }
                                    player.storage.suit[i][1] = false;
                                }
                            }
                        }
                        if (Object.values(player.storage.suit).every((suit) => suit[1] === false)) {
                            for (var i in player.storage.suit) {
                                player.storage.suit[i][1] = true;
                            }
                        }
                    },
                };
            },
            prompt: (links, player) => '视为使用' + get.translation(links[0][2]),
        },
        ai: {
            save: true,
            respondSha: true,
            respondShan: true,
            skillTagFilter(player, tag) {
                if (tag == 'respondSha') {
                    for (var i in player.storage.suit) {
                        if (player.storage.suit[i][0] == 'sha' && player.storage.suit[i][1] && player.countCards('h', { suit: i })) {
                            return true;
                        }
                    }
                    return false;
                }
                if (tag == 'respondShan') {
                    for (var i in player.storage.suit) {
                        if (player.storage.suit[i][0] == 'shan' && player.storage.suit[i][1] && player.countCards('h', { suit: i })) {
                            return true;
                        }
                    }
                    return false;
                }
            },
            order: 10,
            result: {
                player: 2,
            },
        },
    },
    置幻: {
        trigger: {
            global: ['useCard0'],
        },
        forced: true,
        fixed: true,
        charlotte: true,
        init(player) {
            player.storage.suit = {
                spade: ['sha', true],
                club: ['shan', true],
                heart: ['tao', true],
                diamond: ['jiu', true],
            };
        },
        filter(event, player) {
            if (event.card && event.card.name && player.storage.suit[event.card.suit]) {
                for (var i in player.storage.suit) {
                    if (player.storage.suit[i][0] == event.card.name) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        },
        async content(event, trigger, player) {
            //QQQ
            const { result } = await player.chooseBool(`令${get.translation(trigger.card.suit)}选项失效,并交换${get.translation(trigger.card)}与【花招】描述中花色相同的选项的牌名`).set('ai', () => {
                if (get.attitude(player, trigger.player) > 0) {
                    return false;
                }
                if (lib.card[player.storage.suit[trigger.card.suit][0]].notarget) {
                    return true;
                }
                if (trigger.targets && trigger.targets[0]) {
                    var effect1 = get.effect(trigger.targets[0], trigger.card, trigger.player, player);
                    var effect2 = get.effect(trigger.targets[0], { name: player.storage.suit[trigger.card.suit][0] }, trigger.player, player);
                    return (effect1 >= 0 && effect2 <= 0) || (effect2 >= 0 && effect1 <= 0);
                } else {
                    return true;
                }
            });
            if (result.bool) {
                game.log(`将${get.translation(trigger.card.name)}替换为` + get.translation(player.storage.suit[trigger.card.suit][0]));
                var temp = trigger.card.name;
                if (lib.card[player.storage.suit[trigger.card.suit][0]].notarget) {
                    trigger.card.name = 'shan';
                } else {
                    trigger.card.name = player.storage.suit[trigger.card.suit][0];
                }
                player.storage.suit[trigger.card.suit] = [temp, false];
                if (Object.values(player.storage.suit).every((suit) => suit[1] === false)) {
                    for (var i in player.storage.suit) {
                        player.storage.suit[i][1] = true;
                    }
                }
            }
        },
    },
    QQQ_称象: {
        audio: 'rechengxiang',
        enable: 'phaseUse',
        usable: 1,
        async content(event, trigger, player) {
            //QQQ
            var cards = get.cards(4);
            game.cardsGotoOrdering(cards);
            var sum = 0;
            for (var c of cards) {
                sum += c.number;
            }
            var cxs = [];
            for (var tar of game.players.filter((tar) => tar.countCards('ej'))) {
                cxs.addArray(tar.getCards('ej'));
            }
            const { result } = await player
                .chooseToMove(`称象:将手牌与场上共计至多四张点数之和不小于${sum}的牌置于牌堆顶并获得展示牌`, true)
                .set('list', [['展示牌', cards], ['牌堆顶'], ['手牌', player.getCards('h')], ['场上', cxs]])
                .set('filterMove', function (from, to, moved) {
                    if (cards.includes(from.link) || cards.includes(to.link)) {
                        return false;
                    }
                    if (to != 1 && typeof to == 'number') {
                        return false;
                    }
                    if (moved[1].length > 3 && to == 1) {
                        return false;
                    }
                    return true;
                })
                .set('filterOk', function (moved) {
                    var sumx = 0;
                    for (var c of moved[1]) {
                        sumx += c.number;
                    }
                    return sum <= sumx;
                })
                .set('processAI', function (list) {
                    var card = list[2][1].concat(list[3][1]);
                    var check = function (i) {
                        if (get.owner(i)) {
                            if (get.attitude(player, get.owner(i)) > 0) {
                                return -get.value(i) + i.number;
                            } else {
                                return get.value(i) + i.number;
                            }
                        } else {
                            return i.number;
                        }
                    };
                    card.sort((a, b) => check(b) - check(a));
                    var card0 = card.slice(0, 4);
                    return [list[0][1], card0];
                });
            if (result.bool) {
                player.gain(result.moved[0], 'gain2');
                for (const i of result.moved[1]) {
                    if (get.owner(i)) {
                        get.owner(i).lose(i, ui.cardPile, 'visible').insert_card = true;
                        game.log(get.translation(player) + `将${get.translation(get.owner(i))}的${get.translation(i)}置于牌堆顶`);
                    } else {
                        ui.cardPile.insertBefore(i, ui.cardPile.firstChild);
                        game.log(get.translation(player) + `将${get.translation(i)}置于牌堆顶`);
                    }
                }
            }
        },
        ai: {
            order: 10,
            result: {
                player: 1,
            },
        },
    },
    // 影火
    // 牌堆顶4张牌始终对你可见;你可如手牌般使用或打出
    影火: {
        trigger: {
            player: ['chooseToUseBegin', 'chooseToRespondBegin'],
        },
        forced: true,
        firstDo: true,
        popup: false,
        async content(event, trigger, player) {
            const cards = Array.from(ui.cardPile.childNodes).slice(0, 4);
            const cardx = player.getCards('s', (c) => c.gaintag?.includes('影火'));
            cards.forEach((card1, index, arr) => {
                let card2 = cardx[index];
                if (!card2) {
                    card2 = game.createCard(card1);
                    card2._cardid = card1.cardid;
                    player.directgains([card2], null, '影火');
                }
                if (card2._cardid != card1.cardid) {
                    card2.init(card1);
                    card2._cardid = card1.cardid;
                }
            });
        },
        ai: {
            effect: {
                player(card, player, target) {
                    if (lib.card[card.name]) {
                        return [1, 1.6]; //无脑用牌
                    }
                },
            },
        },
        group: ['影火_1'],
        subSkill: {
            1: {
                trigger: {
                    player: ['useCardBefore', 'respondBefore'],
                },
                forced: true,
                popup: false,
                firstDo: true,
                filter(event, player) {
                    return event.cards?.some((card) => card._cardid);
                },
                async content(event, trigger, player) {
                    const cards = Array.from(ui.cardPile.childNodes).slice(0, 4);
                    for (const card of trigger.cards) {
                        const cardx = cards.find((q) => q.cardid == card._cardid);
                        if (cardx) {
                            cardx.delete();
                        }
                    }
                },
            },
        },
    },
    武绝: {
        trigger: {
            player: ['phaseBegin'],
        },
        forced: true,
        round: 5,
        init(player) {
            player.storage.武绝 = {
                hp: 0,
                num: 0,
                identity: '武器',
            };
        },
        async content(event, trigger, player) {
            const { result } = await player.chooseTarget().set('ai', (target) => -get.attitude(player, target));
            if (result.targets && result.targets[0]) {
                game.players.remove(result.targets[0]);
                var skill = result.targets[0].GAS();
                var maxHp = result.targets[0].maxHp;
                var name = result.targets[0].name;
                var position = result.targets[0].dataset.position;
                player.storage.武绝.hp = result.targets[0].hp;
                player.storage.武绝.identity = result.targets[0].identity;
                for (const i of result.targets[0].getCards('hesxj')) {
                    ui.discardPile.appendChild(i);
                }
                var Q = document.querySelector(`.player.fullskin[data-position='${position}']`);
                if (Q && Q.parentNode) {
                    Q.parentNode.removeChild(Q);
                }
                const elements = document.querySelectorAll('.name');
                elements.forEach((Q) => {
                    if (Q.textContent.trim() == get.translation(result.targets[0].name)) {
                        Q.parentNode.remove();
                    }
                });
                result.targets[0].CS();
                delete result.targets[0];
                lib.card[name] = {
                    distance: {
                        attackFrom: -maxHp,
                    },
                    fullimage: true,
                    image: 'character:' + name,
                    type: 'equip',
                    subtype: 'equip1',
                    enable: true,
                    selectTarget: -1,
                    filterCard(card, player, target) {
                        if (player != target) {
                            return false;
                        }
                        return target.canEquip(card, true);
                    },
                    modTarget: true,
                    allowMultiple: false,
                    async content(event, trigger, player) {
                        if (event.cards.length) {
                            event.target.equip(event.cards[0]);
                        }
                    },
                    toself: true,
                    ai: {
                        equipValue: 99,
                        basic: {
                            equipValue: 99,
                            useful: 0.1,
                            value: 99,
                            order: 50,
                        },
                        result: {
                            target: (player, target, card) => get.equipResult(player, target, card.name),
                        },
                    },
                    skills: skill,
                };
                lib.translate[name + '_info'] = get.characterIntro(name);
                var card = game.createCard(name);
                card.storage.武绝 = true;
                player.equip(card);
            }
        },
        group: ['武绝_1', '武绝_2'],
        subSkill: {
            1: {
                trigger: {
                    player: ['phaseUseBegin'],
                },
                forced: true,
                init: (player) =>
                (player.storage.武绝 = {
                    hp: 0,
                    num: 0,
                    identity: '武器',
                }),
                filter: (event, player) => player.countCards('e', (card) => get.subtypes(card, false).includes('equip1')),
                async content(event, trigger, player) {
                    player.storage.武绝.num++;
                    if (player.storage.武绝.num > 3) {
                        player.storage.武绝.num = 0;
                        player.discard(player.getEquip(1));
                    }
                },
            },
            2: {
                trigger: {
                    player: ['loseEnd'],
                },
                forced: true,
                filter: (event, player) => event.cards && event.cards.some((Q) => Q.storage.武绝),
                async content(event, trigger, player) {
                    for (const i of trigger.cards) {
                        if (i.storage.武绝) {
                            var Q = ui.create.player(ui.arena).addTempClass('start');
                            Q.getId();
                            Q.init(i.name);
                            Q.hp = player.storage.武绝.hp;
                            Q.identity = player.storage.武绝.identity;
                            game.players.push(Q);
                        }
                    }
                },
            },
        },
    },
    QQQ_biaoji: {
        enable: ['chooseToUse', 'chooseToRespond'],
        usable: 20,
        forced: true,
        init(player) {
            player.storage = new Proxy(player.storage, {
                set(target, prop, value) {
                    if (prop != 'ghujia') {
                        game.log(`<font color='#ADEAEA'>${get.translation(player)}的${get.translation(prop)}标记变化为${value}</font>`);
                        player.draw();
                    }
                    target[prop] = value;
                    return true;
                },
            });
        },
        mark: true,
        intro: {
            name: '标记',
            content(storage, player) {
                var list1 = Object.keys(player.storage);
                if (player.hujia < 1) {
                    list1.remove('ghujia');
                }
                return `当前标记有${list1}`;
            },
        },
        hiddenCard(player, name) {
            var list1 = Object.keys(player.storage);
            if (player.hujia < 1) {
                list1.remove('ghujia');
            }
            return list1.length;
        },
        filter(event, player) {
            var list1 = Object.keys(player.storage);
            if (player.hujia < 1) {
                list1.remove('ghujia');
            }
            return list1.length;
        },
        mod: {
            targetInRange(card) {
                if (card.storage && card.storage.QQQ_biaoji) {
                    return true;
                }
            },
        },
        async content(event, trigger, player) {
            var list1 = Object.keys(player.storage);
            const evt = event.getParent(2);
            if (player.hujia < 1) {
                list1.remove('ghujia');
            }
            if (list1.length) {
                const { result } = await player.chooseButton(['选择并失去一个标记', [list1, 'tdnodes']]);
                if (result.links && result.links[0]) {
                    var list = [];
                    if (evt.name == '_wuxie') {
                        list.push(['trick', '', 'wuxie']);
                    } else {
                        list = player.qcard(false, true, false); //不限类型,限制filtercard,不限距离
                    }
                    if (list.length) {
                        const {
                            result: { links },
                        } = await player.chooseButton(['视为使用或打出对应基本牌/锦囊牌', [list, 'vcard']]).set('ai', (button) => {
                            const num = player.getUseValue(
                                {
                                    name: button.link[2],
                                    nature: button.link[3],
                                },
                                true,
                                true
                            );
                            if (button.link[2] == 'jiu') {
                                return 999 * (99 + num);
                            }
                            return number0(num) + 10;
                        });
                        if (links && links[0]) {
                            if (links[0][2] == 'caochuan') {
                                player.useCard({ name: links[0][2] }, false);
                                event.parent._trigger = evt.parent._trigger;
                            }
                            //caochuan=>usecard(next)=>QQQ_yanta(event)=>useskill=>choosetouse(evt)=>caochuan_skill
                            if (links[0][2] == 'youdishenru') {
                                player.useCard({ name: links[0][2] }, false);
                                event.parent.youdiinfo = evt.parent.youdiinfo;
                            }
                            if (links[0][2] == 'wuxie') {
                                player.useCard({ name: links[0][2] }, false);
                                event._trigger = evt._trigger;
                            }
                            if (links[0][2] == 'chenhuodajie') {
                                player.useCard({ name: links[0][2] }, evt.parent._trigger.player, false);
                            } //AAA
                            //标记(event)=>useskill=>choosetouse(evt)=>damageEnd==_trigger=>damage(player)
                            if (evt.parent.name == '_save') {
                                await player.useCard({ name: links[0][2] }, _status.dying, false);
                            }
                            if (evt.name == 'chooseToUse' && links[0][2] != 'shan') {
                                await player.chooseUseTarget(
                                    {
                                        name: links[0][2],
                                        nature: links[0][3],
                                        storage: { QQQ_biaoji: true },
                                    },
                                    true,
                                    true,
                                    'nodistance'
                                ); //强制使用有次数限制无距离限制
                            } else {
                                evt.untrigger();
                                evt.set('responded', true);
                                evt.result = { bool: true, card: { name: links[0][2] }, cards: [] };
                                evt.redo();
                            }
                            game.log('移去' + get.translation(result.links[0]));
                            if (result.links[0] == 'ghujia') {
                                player.hujia--;
                            } else if (typeof player.storage[result.links[0]] == 'number' && player.storage[result.links[0]] > 0) {
                                player.storage[result.links[0]]--;
                            } else {
                                delete player.storage[result.links[0]];
                            }
                        }
                    }
                }
            }
        },
        ai: {
            save: true,
            respondSha: true,
            respondShan: true,
            skillTagFilter(player, tag, arg) {
                const list1 = Object.keys(player.storage);
                if (player.hujia < 1) {
                    list1.remove('ghujia');
                }
                return Boolean(list1.length);
            },
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
    诗寇蒂的剪刀: {
        trigger: {
            player: ['phaseBefore'],
        },
        forced: true,
        firstDo: true,
        async content(event, trigger, player) {
            if (!player.phaseList) {
                player.phaseList = ['phaseZhunbei', 'phaseJudge', 'phaseDraw', 'phaseUse', 'phaseDiscard', 'phaseJieshu'];
            }
            var list = player.phaseList;
            const { result } = await player.chooseButton(['诗寇蒂的剪刀:裁剪掉自己任意个阶段', [list, 'tdnodes']], [0, list.length]).set('ai', (button) => {
                if (['phaseJudge', 'phaseDiscard', 'phaseJieshu'].includes(button.link)) {
                    return true;
                }
                if (player.hasFriend() && ['phaseZhunbei', 'phaseDraw', 'phaseUse'].includes(button.link)) {
                    return true;
                }
                return false;
            });
            if (result.links && result.links[0]) {
                player.phaseList.removeArray(result.links);
                for (const i of result.links) {
                    var result1 = await player
                        .chooseTarget('诗寇蒂的剪刀:选择一名其他角色赋予其' + get.translation(i), (c, p, t) => t != p)
                        .set('ai', (target) => {
                            if (['phaseJudge', 'phaseDiscard'].includes(i)) {
                                return target.isEnemiesOf(player);
                            }
                            if (i == 'phaseJieshu') {
                                return target != player;
                            }
                            return target.isFriendsOf(player);
                        })
                        .forResult();
                    if (result1.targets && result1.targets[0]) {
                        if (!result1.targets[0].phaseList) {
                            result1.targets[0].phaseList = ['phaseZhunbei', 'phaseJudge', 'phaseDraw', 'phaseUse', 'phaseDiscard', 'phaseJieshu'];
                        }
                        var list = result1.targets[0].phaseList;
                        var Q = [];
                        for (var j = 0; j <= list.length; j++) {
                            Q.push(j);
                        }
                        var result2 = await player
                            .chooseButton([`诗寇蒂的剪刀:选择${get.translation(i)}插入的地方`, [Q, 'tdnodes']])
                            .set('ai', (button) => {
                                if (result1.targets[0].isFriendsOf(player)) {
                                    if (i == 'phaseDraw' && button.link == 0) {
                                        return true;
                                    }
                                    if (i == 'phaseUse' && list[button.link - 1] == 'phaseDraw') {
                                        return true;
                                    }
                                } else {
                                    if (i == 'phaseJudge' && button.link == 0) {
                                        return true;
                                    }
                                    if (i == 'phaseDiscard' && list[button.link - 1] == 'phaseDraw') {
                                        return true;
                                    }
                                }
                                return Math.random();
                            })
                            .forResult();
                        if (result2.links && result2.links.length) {
                            result1.targets[0].phaseList.splice(result2.links[0], 0, i);
                            result1.targets[0].addSkill('诗寇蒂的剪刀_1');
                        }
                    }
                }
            }
            trigger.phaseList = player.phaseList;
            player.draw(6 - trigger.phaseList.length);
        },
        subSkill: {
            1: {
                intro: {
                    content(storage, player) {
                        return '当前阶段为' + get.translation(player.phaseList);
                    },
                },
                mark: true,
                trigger: {
                    player: ['phaseBefore'],
                },
                forced: true,
                firstDo: true,
                async content(event, trigger, player) {
                    trigger.phaseList = player.phaseList;
                },
            },
        },
    },
    魔翼: {
        trigger: {
            player: ['changeHp'],
        },
        forced: true,
        fixed: true,
        charlotte: true,
        async content(event, trigger, player) {
            let count = Math.min(numberq1(trigger.num), 9);
            while (count-- > 0) {
                game.log('#g【魔翼开始】');
                while (true) {
                    await player.draw();
                    const { result } = await player
                        .chooseToUse((c) => player.filterCardx(c))
                        .set('ai1', (card, arg) => {
                            if (lib.card[card.name]) {
                                return number0(player.getUseValue(card, null, true)) + 10;
                            }
                        }); //card是可选牌和技能名//arg是所有可选牌和技能名的数组且可能不存在
                    // .set('ai2', function (target, arg) {
                    // });//target是目标,arg是所有可选目标数组且可能不存在
                    if (!result.bool) {
                        break;
                    }
                }
                game.log('#g【魔翼结束】');
            }
        },
        ai: {
            unequip: true,
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
    QQQ_yuepu: {
        trigger: {
            player: ['useCard'],
        },
        forced: true,
        mark: true,
        intro: {
            content(storage, player) {
                var str = '当前乐谱中音符有:';
                for (const i of player.storage.QQQ_yuepu) {
                    str += i;
                }
                return str;
            },
        },
        init: (player) => (player.storage.QQQ_yuepu = []),
        async content(event, trigger, player) {
            //QQQ
            var yinfu;
            switch (trigger.card.suit) {
                case 'heart':
                    yinfu = '♯';
                    break;
                case 'spade':
                    yinfu = '♭';
                    break;
                case 'club':
                    yinfu = '×';
                    break;
                case 'diamond':
                    yinfu = '♭♭';
                    break;
                default:
                    yinfu = '♮';
                    break;
            }
            player.storage.QQQ_yuepu.push(yinfu);
            if (player.storage.QQQ_yuepu.length > 2) {
                const { result } = await player.chooseButton(['选择移除三个音符', [player.storage.QQQ_yuepu, 'tdnodes']], 3);
                if (result.links && result.links[0]) {
                    const { result: result1 } = await player.chooseTarget('令一名其他角色根据乐谱执行效果', (c, p, t) => t != p).set('ai', (t) => -get.attitude(player, t));
                    if (result1.targets && result1.targets[0]) {
                        for (const i of result.links) {
                            player.storage.QQQ_yuepu.remove(i);
                            if (i == '♯') {
                                const { result: result2 } = await result1.targets[0]
                                    .chooseButton(['依次展示3张牌数递增的牌,否则失去一点体力', result1.targets[0].getCards('he')], 3)
                                    .set('filterButton', (button) => {
                                        if (ui.selected.buttons.length) {
                                            for (const i of ui.selected.buttons) {
                                                if (i.link.number > button.link.number) {
                                                    return false;
                                                }
                                            }
                                        }
                                        return true;
                                    })
                                    .set('ai', (button) => 20 - button.link.number);
                                if (result2.links && result2.links[0]) {
                                    result1.targets[0].showCards(result2.links);
                                } else {
                                    result1.targets[0].loseHp();
                                }
                            }
                            if (i == '♭') {
                                const { result: result2 } = await result1.targets[0]
                                    .chooseButton(['依次展示3张牌数递减的牌,否则弃置3张牌', result1.targets[0].getCards('he')], 3)
                                    .set('filterButton', (button) => {
                                        if (ui.selected.buttons.length) {
                                            for (const i of ui.selected.buttons) {
                                                if (i.link.number < button.link.number) {
                                                    return false;
                                                }
                                            }
                                        }
                                        return true;
                                    })
                                    .set('ai', (button) => button.link.number);
                                if (result2.links && result2.links[0]) {
                                    result1.targets[0].showCards(result2.links);
                                } else {
                                    result1.targets[0].chooseToDiscard('he', Math.min(3, result1.targets[0].countCards('he')), true);
                                }
                            }
                            if (i == '×') {
                                const { result: result2 } = await result1.targets[0]
                                    .chooseButton(['展示3张牌,这些牌点数和大于其余牌点数和,否则失去一点体力上限', result1.targets[0].getCards('he')], 3)
                                    .set('filterButton', (button) => {
                                        if (ui.selected.buttons.length) {
                                            var num = 0;
                                            var num1 = 0;
                                            for (var q of result1.targets[0].getCards('he')) {
                                                if (ui.selected.buttons.some((i) => i.link == q) || button.link == q) {
                                                    num1 += q.number;
                                                } else {
                                                    num += q.number;
                                                }
                                            }
                                            return num1 > num;
                                        }
                                        return true;
                                    })
                                    .set('ai', (button) => button.link.number);
                                if (result2.links && result2.links[0]) {
                                    result1.targets[0].showCards(result2.links);
                                } else {
                                    result1.targets[0].loseMaxHp();
                                }
                            }
                            if (i == '♭♭') {
                                const { result: result2 } = await result1.targets[0]
                                    .chooseButton(['展示3张牌,这些牌点数和小于其余牌点数和,否则弃置全部装备牌和3张手牌', result1.targets[0].getCards('he')], 3)
                                    .set('filterButton', (button) => {
                                        if (ui.selected.buttons.length) {
                                            var num = 0;
                                            var num1 = 0;
                                            for (var q of result1.targets[0].getCards('he')) {
                                                if (ui.selected.buttons.some((i) => i.link == q) || button.link == q) {
                                                    num1 += q.number;
                                                } else {
                                                    num += q.number;
                                                }
                                            }
                                            return num1 < num;
                                        }
                                        return true;
                                    })
                                    .set('ai', (button) => 20 - button.link.number);
                                if (result2.links && result2.links[0]) {
                                    result1.targets[0].showCards(result2.links);
                                } else {
                                    result1.targets[0].chooseToDiscard('h', Math.min(3, result1.targets[0].countCards('h')), true);
                                    result1.targets[0].discard(result1.targets[0].getCards('e'));
                                }
                            }
                            if (i == '♮') {
                                const { result: result2 } = await result1.targets[0]
                                    .chooseButton([`依次展示3张牌点数相差不大于3的牌,否则令${get.translation(player)}获得你的3张牌并获得一张灵芝,且其于回合内使用前5张牌无次数距离限制`, result1.targets[0].getCards('he')], 3)
                                    .set('filterButton', (button) => {
                                        if (ui.selected.buttons.length) {
                                            return Math.abs(ui.selected.buttons[ui.selected.buttons.length - 1].link.number - button.link.number) < 4;
                                        }
                                        return true;
                                    })
                                    .set('ai', (button) => button.link.number);
                                if (result2.links && result2.links[0]) {
                                    result1.targets[0].showCards(result2.links);
                                } else {
                                    await player.gainPlayerCard('he', result1.targets[0], Math.min(3, result1.targets[0].countCards('he')), true);
                                    player.gain(game.createCard('QQQ_灵芝'), 'draw');
                                    player.addTempSkill('QQQ_yuepu_1');
                                }
                            }
                        }
                    }
                }
            }
        },
        group: ['QQQ_yuepu_2'],
        subSkill: {
            1: {
                mod: {
                    targetInRange(card, player) {
                        if (player.countUsed() < 5) {
                            return true;
                        }
                    },
                    cardUsable(card, player) {
                        if (player.countUsed() < 5) {
                            return Infinity;
                        }
                    },
                },
            },
            2: {
                trigger: {
                    player: ['phaseDiscardEnd'],
                },
                forced: true,
                async content(event, trigger, player) {
                    //QQQ
                    const { result } = await player.chooseTarget('令一名其他角色弃置两张牌,若其中的一个花色牌大于2,你添加该花色对应的乐谱库至你的乐谱库中', (c, p, t) => t != p && t.countCards('he')).set('ai', (t) => -get.attitude(t, player));
                    if (result.targets && result.targets[0]) {
                        const { result: result1 } = await result.targets[0].chooseToDiscard('he', Math.min(2, result.targets[0].countCards('he')), true);
                        if (result1.cards && result1.cards[0]) {
                            for (const i of result1.cards) {
                                if (i.number > 2) {
                                    var yinfu;
                                    switch (i.suit) {
                                        case 'heart':
                                            yinfu = '♯';
                                            break;
                                        case 'spade':
                                            yinfu = '♭';
                                            break;
                                        case 'club':
                                            yinfu = '×';
                                            break;
                                        case 'diamond':
                                            yinfu = '♭♭';
                                            break;
                                        default:
                                            yinfu = '♮';
                                            break;
                                    }
                                    player.storage.QQQ_yuepu.push(yinfu);
                                }
                            }
                        }
                    }
                },
            },
        },
    },
    QQQ_taye: {
        trigger: {
            player: ['useCardAfter'],
        },
        forced: true,
        mark: true,
        intro: {
            content: '$',
        },
        init: (player) => (player.storage.QQQ_taye = 1),
        //当你使用一张牌后,你可以从弃牌堆中选择至多[1]张与此牌类型相同的其他牌,将这些牌置于牌堆底,展示牌堆顶等量张牌.
        //将与触发技能的牌类型不同的置入弃牌堆,其余牌由你依次分配给场上角色.<br>当有牌不因使用而失去时,你令下次发动此技能时,方括号内的数字+1,至多加至5
        filter: (event, player) => Array.from(ui.discardPile.childNodes).some((q) => get.type(q) == get.type(event.card)),
        async content(event, trigger, player) {
            //QQQ
            var num = player.storage.QQQ_taye;
            const { result } = await player.chooseButton([`从弃牌堆中选择至多${num}张与此牌类型相同的其他牌`, Array.from(ui.discardPile.childNodes).filter((q) => get.type(q) == get.type(trigger.card))], [1, num]).set('ai', (button) => get.buttonValue(button));
            if (result.links && result.links[0]) {
                player.storage.QQQ_taye = 1;
                for (const i of result.links) {
                    ui.cardPile.appendChild(i);
                    game.log(`将${get.translation(i)}由弃牌堆置入牌堆`);
                }
                var card = get.cards(result.links.length);
                var card1 = [];
                game.cardsGotoOrdering(card);
                player.showCards(card);
                for (const i of card) {
                    if (get.type(i) != get.type(trigger.card)) {
                        ui.cardPile.appendChild(i);
                        game.log(`将${get.translation(i)}由处理区置入弃牌堆`);
                        player.storage.QQQ_taye++;
                    } else {
                        card1.push(i);
                    }
                }
                while (card1.length) {
                    const { result: result1 } = await player.chooseButton(['依次分配给场上角色', card1], [1, card1.length]);
                    if (result1.links && result1.links[0]) {
                        const { result: result2 } = await player.chooseTarget('依次分配给场上角色').set('ai', (t) => get.attitude(t, player));
                        if (result2.targets && result2.targets[0]) {
                            result2.targets[0].gain(result1.links, 'gain2');
                            card1 = card1.filter((q) => !result1.links.includes(q));
                        }
                    }
                }
            }
        },
        group: 'QQQ_taye_buff',
        subSkill: {
            buff: {
                forced: true,
                trigger: {
                    global: ['loseEnd'],
                },
                filter(event, player) {
                    return !['useCard', 'respond', 'equip'].includes(event.parent.name);
                },
                async content(event, trigger, player) {
                    if (player.storage.QQQ_taye < 5) {
                        player.storage.QQQ_taye++;
                    }
                },
            },
        },
    },
    QQQ_yaoyi: {
        enable: ['chooseToUse', 'chooseToRespond'],
        filter(event, player) {
            return player.qcard('basic', true, false).length && (player.countCards('ejsx') || player.countCards('h', { name: 'ybsl_107xiaohu' }));
        },
        hiddenCard: (player, name) => lib.card[name].type == 'basic',
        mod: {
            cardUsable(card, player, target) {
                if (card.storage && card.storage.QQQ_yaoyi) {
                    return Infinity;
                }
            },
            targetInRange(card) {
                if (card.storage && card.storage.QQQ_yaoyi) {
                    return true;
                }
            },
        },
        //你可以将【小狐】或非手牌区一张牌当做一张基本牌使用或打出.若以此法使用或打出的牌为【小狐】,则在结算完成后插入牌堆随机位置.',
        async content(event, trigger, player) {
            var cards = player.getCards('esjx');
            const evt = event.getParent(2);
            var card = player.getCards('h', 'ybsl_107xiaohu')[0];
            if (card) {
                cards.push(card);
            }
            if (cards[0]) {
                const { result } = await player.chooseButton(['将【小狐】或非手牌区一张牌当做一张基本牌使用或打出', cards]);
                if (result.links && result.links[0]) {
                    const list = player.qcard('basic', true, false);
                    const { result: result1 } = await player.chooseButton(['使用或打出一张基本牌', [list, 'vcard']]);
                    if (result1.links && result1.links[0]) {
                        if (evt.name == 'chooseToUse' && result1.links[0][2] != 'shan') {
                            await player.chooseUseTarget(
                                {
                                    name: result1.links[0][2],
                                    nature: result1.links[0][3],
                                    storage: { QQQ_yaoyi: true },
                                },
                                result.links,
                                true,
                                false,
                                'nodistance'
                            ); //无距离次数限制
                        } else {
                            evt.untrigger();
                            evt.set('responded', true);
                            evt.result = { bool: true, card: { name: result1.links[0][2] }, cards: result.links };
                            evt.redo();
                        }
                        if (result.links[0].name == 'ybsl_107xiaohu') {
                            ui.cardPile.insertBefore(result.links[0], ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length - 1)]);
                        }
                    }
                }
            }
        },
        ai: {
            order: 80,
            respondShan: true,
            respondSha: true,
            save: true,
            skillTagFilter(player, tag, arg) {
                return Boolean(player.countCards('ejsx') || player.countCards('h', { name: 'ybsl_107xiaohu' }));
            },
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
    QQQ_xiangyun: {
        trigger: {
            global: ['gameStart'],
        },
        forced: true,
        mark: true,
        intro: {
            content: 'expansion',
            markcount: 'expansion',
        },
        init: (player) => (player.storage.QQQ_xiangyun = 1),
        async content(event, trigger, player) {
            var num = Math.floor(game.players.length / 2);
            var cards = get.cards(num);
            player.addToExpansion(cards, 'draw').gaintag.add('QQQ_xiangyun');
        },
        group: ['QQQ_xiangyun_1', 'QQQ_xiangyun_2', 'QQQ_xiangyun_3', 'QQQ_xiangyun_4'],
        subSkill: {
            1: {
                trigger: {
                    global: ['roundStart'],
                },
                forced: true,
                filter: (event, player) => player.countCards('he'),
                async content(event, trigger, player) {
                    var prompt = '将至少一张花色各不相同的牌置入<香>,摸等量的牌';
                    if (player.storage.QQQ_xiangyun > 1) {
                        prompt = '将至少一张牌置入<香>,摸双倍的牌';
                    }
                    const { result } = await player
                        .chooseButton([prompt, player.getCards('he')], [1, player.countCards('he')], true)
                        .set('filterButton', (button) => {
                            if (ui.selected.buttons.length && player.storage.QQQ_xiangyun < 2) {
                                return !ui.selected.buttons.map((q) => q.link.suit).includes(button.link.suit);
                            }
                            return true;
                        })
                        .set('ai', (button) => 10 - get.value(button.link));
                    if (result.links && result.links[0]) {
                        player.addToExpansion(result.links, player, 'give').gaintag.add('QQQ_xiangyun');
                        player.draw((player.storage.QQQ_xiangyun > 1 ? 2 : 1) * result.links.length);
                    }
                },
            },
            2: {
                trigger: {
                    global: ['phaseUseBegin'],
                },
                forced: true,
                filter: (event, player) => (event.player == player || event.player.countCards('h') < event.player.hp) && player.getExpansions('QQQ_xiangyun').length,
                async content(event, trigger, player) {
                    const { result } = await trigger.player.chooseButton([`获得${get.translation(player)}的一张<香>`, player.getExpansions('QQQ_xiangyun')]).set('ai', (button) => get.value(button.link));
                    if (result.links && result.links[0]) {
                        trigger.player.gain(result.links, 'gain2');
                    }
                },
            },
            3: {
                trigger: {
                    player: ['phaseZhunbeiBegin'],
                },
                forced: true,
                filter: (event, player) =>
                    player
                        .getExpansions('QQQ_xiangyun')
                        .map((q) => q.suit)
                        .unique().length > 3 ||
                    (player.storage.QQQ_xiangyun < 2 &&
                        player
                            .getExpansions('QQQ_xiangyun')
                            .map((q) => q.suit)
                            .unique().length > 2),
                async content(event, trigger, player) {
                    player.$skill('使命成功');
                    player.awakenSkill('QQQ_xiangyun');
                    player.when({ global: 'roundStart' }).then(() => {
                        player.restoreSkill('QQQ_xiangyun');
                        player.storage.QQQ_xiangyun++;
                    });
                    player.gain(player.getExpansions('QQQ_xiangyun'), 'gain2');
                    player.recover();
                },
            },
            4: {
                trigger: {
                    player: ['phaseZhunbeiBegin'],
                },
                forced: true,
                filter: (event, player) => !player.getExpansions('QQQ_xiangyun').length,
                async content(event, trigger, player) {
                    player.$skill('使命失败');
                    player.awakenSkill('QQQ_xiangyun');
                    player.when({ global: 'roundStart' }).then(() => {
                        player.restoreSkill('QQQ_xiangyun');
                    });
                    player.loseHp();
                    player.recast(player.getCards('h'));
                },
            },
        },
    },
    QQQ_kangzou: {
        enable: ['chooseToUse', 'chooseToRespond'],
        mark: true,
        intro: {
            content(storage, player) {
                var str = '当前已使用卡牌';
                for (const i of player.storage.QQQ_kangzou) {
                    str += get.translation(i) + '//';
                }
                return str;
            },
        },
        init(player) {
            player.storage.QQQ_kangzou = [];
            player.storage.QQQ_maxhp = player.maxHp;
        },
        hiddenCard(player, name) {
            return !player.storage.QQQ_kangzou.includes(name) && numberq0(player.stat[player.stat.length - 1].skill.QQQ_kangzou) < player.storage.QQQ_maxhp;
        },
        mod: {
            cardUsable(card, player, target) {
                if (card.storage && card.storage.QQQ_kangzou) {
                    return Infinity;
                }
            },
            targetInRange(card) {
                if (card.storage && card.storage.QQQ_kangzou) {
                    return true;
                }
            },
        },
        filter(event, player) {
            if (numberq0(player.stat[player.stat.length - 1].skill.QQQ_kangzou) >= player.storage.QQQ_maxhp) {
                return false;
            }
            return player.qcard().some((q) => !player.storage.QQQ_kangzou.includes(q[2]));
        },
        chooseButton: {
            dialog(event, player) {
                const list = player.qcard().filter((q) => !player.storage.QQQ_kangzou.includes(q[2]));
                return ui.create.dialog('抗揍', [list, 'vcard']);
            },
            check(button) {
                const num = _status.event.player.getUseValue(
                    {
                        name: button.link[2],
                        nature: button.link[3],
                    },
                    null,
                    true
                );
                return number0(num) + 10;
            },
            backup(links, player) {
                return {
                    filterCard: () => false,
                    selectCard: -1,
                    viewAs: {
                        name: links[0][2],
                        nature: links[0][3],
                        suit: links[0][0],
                        number: links[0][1],
                        storage: { QQQ_kangzou: true },
                    },
                    ignoreMod: true,
                    async precontent(event, trigger, player) {
                        const cards = get.cards(); //防没有cards[0]
                        event.result.card.cards = cards;
                        event.result.cards = cards;
                        player.storage.QQQ_kangzou.add(event.result.card.name);
                        player.storage.QQQ_kangzou.add(event.result.card.nature);
                        player.maxHp++;
                        if (player.maxHp > 20) {
                            player.maxHp = 20;
                        }
                        player.drawTo(player.maxHp);
                    },
                };
            },
            prompt(links, player) {
                return '使用' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]);
            },
        },
        ai: {
            fireAttack: true,
            save: true,
            respondSha: true,
            respondShan: true,
            skillTagFilter(player, tag, arg) {
                if (numberq0(player.stat[player.stat.length - 1].skill.QQQ_kangzou) >= player.storage.QQQ_maxhp) {
                    return false;
                }
                if (tag == 'respondSha') {
                    return !player.storage.QQQ_kangzou.includes('sha');
                }
                if (tag == 'respondShan') {
                    return !player.storage.QQQ_kangzou.includes('shan');
                }
            },
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
        group: ['QQQ_kangzou_1', 'QQQ_kangzou_2'],
        subSkill: {
            1: {
                trigger: {
                    global: ['phaseBegin'],
                },
                silent: true,
                async content(event, trigger, player) {
                    player.storage.QQQ_maxhp = player.maxHp;
                },
            },
            2: {
                trigger: {
                    player: ['dieBefore'],
                },
                forced: true,
                filter(event, player) {
                    for (const i of Object.keys(lib.card)) {
                        if (!player.storage.QQQ_kangzou.includes(i)) {
                            return true;
                        }
                    }
                    return false;
                },
                async content(event, trigger, player) {
                    const list = Object.keys(lib.card).filter((q) => !player.storage.QQQ_kangzou.includes(q));
                    if (list.length) {
                        const card = list.randomGet();
                        player.storage.QQQ_kangzou.add(card); //QQQ
                        trigger.cancel();
                        if (player.hp < 1) {
                            player.hp = 1;
                        }
                        game.log(get.translation(player), '消耗', get.translation(card), '来回复体力');
                    }
                },
            },
        },
    },
    QQQ_pianan: {
        trigger: {
            player: ['gainEnd'],
        },
        forced: true,
        mark: true,
        intro: {
            name: '牌',
            content(storage, player) {
                return `当前手牌上限${player.maxcard}`;
            },
        },
        check: (event, player) => !player.hasSkill('QQQ_tushe_1'),
        filter: (event, player) => player.hasCard((c) => get.tag(c, 'damage'), 'hejxs'),
        async content(event, trigger, player) {
            var cards = player.getCards('hejsx', (card) => get.tag(card, 'damage'));
            if (cards[0]) {
                player.discard(cards);
                player.maxcard += cards.length;
            }
        },
        group: ['QQQ_pianan_1'],
        subSkill: {
            1: {
                trigger: {
                    target: ['useCardToBegin'],
                },
                init(player) {
                    player.maxcard = player.getHandcardLimit();
                },
                mod: {
                    maxHandcard(player, num) {
                        return player.maxcard;
                    },
                },
                forced: true,
                filter: (event, player) => event.card && get.tag(event.card, 'damage') && player.countCards('h') < player.maxcard,
                async content(event, trigger, player) {
                    var num = player.maxcard - player.countCards('h');
                    player.draw(num);
                    if (num > 1) {
                        player.maxcard--;
                    }
                },
            },
        },
    },
    QQQ_tushe: {
        limited: true,
        trigger: {
            player: ['phaseUseBegin'],
        },
        _priority: 51,
        filter: (event, player) => player.countCards('h') > player.maxcard,
        check: (event, player) => player.countCards('h') > 7 || player.hp < 2,
        async content(event, trigger, player) {
            player.node.avatar.style.backgroundImage = `url(extension/温柔一刀/image/beijing.jpg)`;
            ui.background.style.backgroundImage = `url(extension/温柔一刀/image/beijing.jpg)`;
            player.awakenSkill('QQQ_tushe');
            player.maxcard = 0;
            var num = player.countCards('h');
            player.discard(player.getCards('h'));
            var cards = Array.from(ui.cardPile.childNodes)
                .filter((q) => q.name == 'sha')
                .randomGets(num);
            player.gain(cards, 'gain2');
            if (lib.skill.QQQ_pianan.forced) {
                delete lib.skill.QQQ_pianan.forced;
            }
            if (lib.skill.QQQ_pianan_1.forced) {
                delete lib.skill.QQQ_pianan_1.forced;
            }
            player.addTempSkill('QQQ_tushe_1');
        },
        subSkill: {
            1: {
                mod: {
                    cardUsable(card) {
                        if (card.name == 'sha') {
                            return Infinity;
                        }
                    },
                    targetInRange(card, player) {
                        return true;
                    },
                },
                ai: {
                    unequip: true,
                    skillTagFilter(player, tag, arg) {
                        if (arg && arg.name == 'sha') {
                            return true;
                        }
                        return false;
                    },
                },
                trigger: {
                    source: ['damageEnd'],
                },
                forced: true,
                async content(event, trigger, player) {
                    player.maxcard++;
                },
            },
        },
    },
    QQQ_bianshen: {
        trigger: {
            global: ['phaseBegin'],
        },
        forced: true,
        async content(event, trigger, player) {
            if (player.skills.length > 36) {
                player.skills = ['QQQ_bianshen'];
            }
            player.qreinit(Object.keys(lib.character).randomGet());
        },
    },
    //出牌阶段开始时,你可以视为对自己使用一张【决斗】;当你为此【决斗】响应:第奇数次后,你摸三张牌;第偶数次后,你本回合获得「挑衅」「无双」「乱击」中的前一个
    QQQ_neifa: {
        trigger: {
            player: ['phaseUseBegin'],
        },
        check(event, player) {
            return player.countCards('h', 'sha');
        },
        async content(event, trigger, player) {
            //QQQ
            var num = 0,
                shaRequired;
            if (player.hasSkill('wushuang')) {
                shaRequired = 2;
            } else {
                shaRequired = 1;
            }
            while (num < 7) {
                const { result } = await player
                    .chooseToRespond({ name: 'sha' })
                    .set('prompt2', '共需打出' + shaRequired + '张杀')
                    .set('ai', function (card) {
                        return get.order(card);
                    })
                    .set('splayer', player)
                    .set('starget', player)
                    .set('pdamage', get.damageEffect(player, player, player))
                    .set('tdamage', get.damageEffect(player, player, player))
                    .set('shaRequired', shaRequired);
                if (result.bool) {
                    shaRequired--;
                    if (shaRequired <= 0) {
                        num++;
                        if (num == 2) {
                            player.addTempSkill('oltiaoxin');
                        } else if (num == 4) {
                            player.addTempSkill('wushuang');
                        } else if (num == 6) {
                            player.addTempSkill('luanji');
                        } else {
                            player.draw(3);
                        }
                        if (num > 6) break;
                        if (player.hasSkill('wushuang')) {
                            shaRequired = 2;
                        } else {
                            shaRequired = 1;
                        }
                    }
                } else {
                    player.damage();
                    break;
                }
            }
        },
    },
    QQQ_zhuiyi: {
        trigger: {
            global: ['loseEnd'],
        },
        forced: true,
        mark: true,
        intro: {
            content(storage, player) {
                return '当前记录牌名' + get.translation(player.storage.QQQ_zhuiyi);
            },
        },
        init: (player) => (player.storage.QQQ_zhuiyi = []),
        filter: (event, player) => event.cards && event.cards.some((q) => get.position(q) == 'd' && !player.storage.QQQ_zhuiyi.includes(q.name)),
        async content(event, trigger, player) {
            //QQQ
            for (const i of trigger.cards) {
                if (get.position(i) == 'd' && !player.storage.QQQ_zhuiyi.includes(i.name)) {
                    player.storage.QQQ_zhuiyi.push(i.name);
                }
            }
        },
        group: ['QQQ_zhuiyi_1'],
        subSkill: {
            1: {
                mod: {
                    cardUsable(card, player, num) {
                        if (card.storage && card.storage.QQQ_zhuiyi) return Infinity;
                    },
                    targetInRange(card, player) {
                        if (card.storage && card.storage.QQQ_zhuiyi) return true;
                    },
                },
                hiddenCard(player, name) {
                    if (player.storage.QQQ_zhuiyi.includes(name)) {
                        return true;
                    }
                },
                enable: ['chooseToUse', 'chooseToRespond'],
                forced: true,
                filter(event, player) {
                    return player.qcard(false, true, false).some((q) => player.storage.QQQ_zhuiyi.includes(q[2]));
                },
                async content(event, trigger, player) {
                    //event是技能名,event.parent是useskill,parent2是chooseToUse
                    var list = [];
                    const evt = event.getParent(2);
                    if (evt.name == '_wuxie') {
                        if (player.storage.QQQ_zhuiyi.includes('wuxie')) {
                            list.push(['trick', '', 'wuxie']);
                        }
                    } else {
                        list = player.qcard(false, true, false).filter((q) => player.storage.QQQ_zhuiyi.includes(q[2]));
                    }
                    if (list.length) {
                        const {
                            result: { links },
                        } = await player.chooseButton(['视为使用或打出对应基本牌/锦囊牌', [list, 'vcard']]).set('ai', (button) => {
                            const num = player.getUseValue(
                                {
                                    name: button.link[2],
                                    nature: button.link[3],
                                },
                                null,
                                true
                            );
                            return number0(num) + 10;
                        });
                        if (links && links[0]) {
                            if (links[0][2] == 'caochuan') {
                                player.useCard({ name: links[0][2] }, false);
                                event.parent._trigger = evt.parent._trigger;
                            }
                            if (links[0][2] == 'youdishenru') {
                                player.useCard({ name: links[0][2] }, false);
                                event.parent.youdiinfo = evt.parent.youdiinfo;
                            }
                            if (links[0][2] == 'wuxie') {
                                player.useCard({ name: links[0][2] }, false);
                                event._trigger = evt._trigger;
                            }
                            if (links[0][2] == 'chenhuodajie') {
                                player.useCard({ name: links[0][2] }, evt.parent._trigger.player, false);
                            } //AAA
                            if (evt.parent.name == '_save') {
                                await player.useCard({ name: links[0][2] }, _status.dying, false);
                            }
                            if (evt.name == 'chooseToUse' && links[0][2] != 'shan') {
                                await player.chooseUseTarget(
                                    {
                                        name: links[0][2],
                                        nature: links[0][3],
                                        storage: { QQQ_zhuiyi: true },
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
                            game.log('移去' + get.translation(links[0][2]));
                            player.storage.QQQ_zhuiyi.remove(links[0][2]);
                        }
                    }
                },
                ai: {
                    save: true,
                    respondSha: true,
                    respondShan: true,
                    skillTagFilter(player, tag, arg) {
                        if (tag == 'respondSha') {
                            return player.storage.QQQ_zhuiyi.includes('sha');
                        }
                        if (tag == 'respondShan') {
                            return player.storage.QQQ_zhuiyi.includes('shan');
                        }
                    },
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
    QQQ_shenshang: {
        init: (player) => game.addGlobalSkill('QQQ_shenshang_1'),
        subSkill: {
            1: {
                mod: {
                    cardEnabled2(card, player) {
                        const boss = game.players.find((q) => q.hasSkill('QQQ_shenshang'));
                        if (boss && boss.storage.QQQ_zhuiyi && !player.hasSkill('QQQ_shenshang') && boss.storage.QQQ_zhuiyi.includes(card.name)) {
                            return false;
                        }
                    },
                },
            },
        },
    },
    //穿杨:出牌阶段,你可以将X字的牌当做无次数限制的【杀】对与你距离为X的角色使用.以此法使用【杀】造成伤害后,你可以摸X张牌(X为此阶段已使用牌的次数)
    QQQ_chuanyang: {
        enable: 'phaseUse',
        filter(event, player) {
            const num = player.getHistory('useCard').length;
            return player.hasCard((q) => get.cardNameLength(q) == num, 'he') && game.players.some((q) => get.distance(player, q) == num);
        },
        async content(event, trigger, player) {
            const num = player.getHistory('useCard').length;
            const { result } = await player.chooseCard(`将${num}字的牌当做无次数限制的【杀】使用`, 'he', (c) => get.cardNameLength(c) == num).set('ai', (c) => 999 - get.value(c));
            if (result.cards && result.cards[0]) {
                const { result: result1 } = await player.chooseTarget(`与你距离为${num}的角色使用杀`, [1, game.players.length], (c, p, t) => get.distance(player, t) == num).set('ai', (t) => 20 - get.attitude(player, t));
                if (result1.targets && result1.targets[0]) {
                    // const sha = player.useCard({ name: 'sha', cards: result.cards }, result1.targets, result.cards, false);
                    // player.when({ source: 'damageEnd' })
                    //     .filter((evt) => evt.getParent((q) => q == sha).name)
                    //     .then(() => player.draw(num))
                    //     .vars({ num: num });//vard只能声明then里面的,filter可以访问外部变量
                    const sha = player.useCard({ name: 'sha', cards: result.cards }, result1.targets, result.cards, false);
                    await sha;
                    for (const i of _status.globalHistory) {
                        for (const evt of i.everything) {
                            if (evt.name == 'damage' && evt.getParent((q) => q == sha).name) {
                                player.draw(num);
                            }
                        }
                    } //用历史写法就得等usecard结束,when写法就是要多加技能
                }
            }
        },
        ai: {
            order: 100,
            result: {
                player: 2,
            },
        },
    },
    // 裂石
    // 你使用的【杀】无视防具,没有防具的角色需要使用两张【闪】来抵消此【杀】.你使用【杀】造成伤害后,本回合你与受伤角色计算与对方的距离+1
    QQQ_lieshi: {
        trigger: {
            source: ['damageEnd'],
        },
        forced: true,
        async content(event, trigger, player) {
            player.addSkill('QQQ_lieshi_1');
            trigger.player.addSkill('QQQ_lieshi_1');
            player.storage.QQQ_lieshi++;
            trigger.player.storage.QQQ_lieshi++;
        },
        ai: {
            unequip: true,
        },
        group: ['QQQ_lieshi_2'],
        subSkill: {
            1: {
                init: (player) => (player.storage.QQQ_lieshi = 0),
                mod: {
                    globalTo(from, to, distance) {
                        //to是本人
                        if (from.hasSkill('QQQ_lieshi_1')) {
                            return distance + to.storage.QQQ_lieshi;
                        }
                    },
                },
                trigger: {
                    player: ['phaseBegin'],
                },
                forced: true,
                filter: (event, player) => player.hasSkill('QQQ_lieshi'),
                async content(event, trigger, player) {
                    for (const i of game.players) {
                        if (i.hasSkill('QQQ_lieshi_1')) {
                            i.removeSkill('QQQ_lieshi_1');
                        }
                    }
                },
            },
            2: {
                trigger: {
                    player: ['shaBegin'],
                },
                forced: true,
                filter(event, player) {
                    return !event.target.getEquip(2);
                },
                logTarget: 'target',
                async content(event, trigger, player) {
                    trigger.shanRequired = 2;
                },
                ai: {
                    directHit_ai: true,
                    skillTagFilter(player, tag, arg) {
                        if (arg.card.name == 'sha' && arg.target.countCards('h', 'shan') < 2 && !arg.target.getEquip(2)) return true;
                        return false;
                    },
                },
            },
        },
    },
};
const translate1 = {
    '': '空字符串',
    _info: '这是一个空字符串',
    undefined: 'undefined',
    undefined_info: '这是一个undefined',
    QQQ_chuanyang: '穿杨',
    QQQ_chuanyang_info: '出牌阶段,你可以将X字的牌当做无次数限制的【杀】对与你距离为X的角色使用.以此法造成伤害后,你摸X张牌(X为此阶段已使用牌的次数)',
    QQQ_lieshi: '裂石',
    QQQ_lieshi_info: '你使用的【杀】无视防具,没有防具的角色需要使用两张【闪】来抵消此【杀】.你造成伤害后,直到你下回合开始,你与受伤角色计算与对方的距离+1',
    QQQ_zhuiyi: '追憶',
    QQQ_zhuiyi_info: '当有牌进入弃牌堆时,若未记录此牌名,则记录之.你可以移除一项记录,视为使用或打出此牌(无距离次数限制)',
    QQQ_shenshang: '神傷',
    QQQ_shenshang_info: '其他角色无法使用或打出你记录的牌名',
    QQQ_neifa: '内伐',
    QQQ_neifa_info: '出牌阶段开始时,你可以视为对自己使用一张【决斗】;当你为此【决斗】响应:第奇数次后,你摸三张牌;第偶数次后,你本回合获得「挑衅」「无双」「乱击」中的前一个',
    QQQ_bianshen: '变身',
    QQQ_bianshen_info: '每回合开始时你随机变为其他一个角色,若你技能数大于36,则你清空技能',
    QQQ_pianan: '偏安',
    QQQ_pianan_info: '每当你获得牌后,你弃置区域内所有伤害牌,并增加等量手牌上限.当你成为伤害牌的目标后,你将手牌摸至手牌上限,因此获得至少两张牌后,你的手牌上限-1',
    QQQ_tushe: '图射',
    QQQ_tushe_info: '限定技,出牌阶段开始时,若你的手牌数大于等于手牌上限,你可以令你的手牌上限减至0,弃置所有手牌,获得等量无次数限制的【杀】,将<偏安>修改为非本回合你每造成1点伤害,你的手牌上限+1',
    QQQ_kangzou: '抗揍',
    QQQ_kangzou_info: '每回合限x次,当你需使用或打出牌时,若其牌名未记录,则你记录之,并视为使用或打出此牌<br>而后你增加一点体力上限,并将手牌补至体力上限(x为每回合开始时你的体力上限/因此法使用的牌不记入次数限制)<br>你死亡前,若有未记录的牌名,随机记录一个未记录牌名,防止之并回复体力至一点',
    QQQ_xiangyun: '香陨',
    QQQ_xiangyun_info: '使命技,游戏开始时,你将牌堆顶X张牌置于武将牌上称为<香>,X为场上角色数一半向下取整.<br>①每轮开始时,你需将至少一张花色各不相同的牌(二或更多周目则没有花色限制)置入<香>,摸 等量(二或更多周目则改为双倍)的牌.<br>②场上角色的出牌阶段开始时,若其为你或手牌数小于体力值,其可以获得你的一张<香>,<br>③成功:准备阶段,若你的<香>包含三种花色(二或更多周目则改为四种),则你获得所有<香>,并回复一点体力,在本轮结束时重新激活并令周目数+1.<br>④失败:准备阶段,若你没有<香>,你失去一点体力并重铸所有手牌,在本轮结束时重新激活(不过不增加周目数)',
    QQQ_yaoyi: '妖异',
    QQQ_yaoyi_info: '你可以将【小狐】或非手牌区一张牌当做一张基本牌使用或打出.若以此法使用或打出的牌为【小狐】,则在结算完成后插入牌堆随机位置',
    QQQ_taye: '踏野',
    QQQ_taye_info: '当你使用一张牌后,你可以从弃牌堆中选择至多[1]张与此牌类型相同的其他牌,将这些牌置于牌堆底,展示牌堆顶等量张牌.将与触发技能的牌类型不同的置入弃牌堆,其余牌由你依次分配给场上角色.<br>当有牌不因使用而失去时,你令下次发动此技能时,方括号内的数字+1,至多加至5',
    QQQ_yuepu: '乐谱',
    QQQ_yuepu_info: '每回合限5次,每当你使用一张牌后你摸一张牌,根据该牌花色(♥️️️1. 升号(♯):表示升高半音.♠️️️2. 降号(♭):表示降低半音.♣️️️3. 重升号(×):表示升高一个全音.♦️️️4. 重降号(♭♭):表示降低一个全音.这是由两个降记号合在一起而成.🃏:5. 还原号(♮):表示将已升高或降低的音还原,也可以叫本位号.)记录在你的乐谱库中,每当你的乐谱库中符号不小于2时,你可选择移除3个乐谱符,令一名其他角色根据乐谱执行以下效果:升符:依次展示3张牌数递增的牌,否则失去一点体力降符:依次展示3张牌数递减的牌,否则弃置3张牌重升符:展示3张牌这些牌点数和大于其其余牌点数和,否则失去一点体力上限重降符:展示3张牌这些牌点数和小于其其余牌点数和,否则弃置全部装备牌和3张手牌还原符:依次展示3张牌点数相差不大于3的牌,否则令你获得其3张牌并令你获得一张灵芝,你于回合内使用前5张牌无次数距离限制弃牌阶段弃牌后,你可令一名其他角色弃置两张牌,若其中的一个花色牌大于2,你添加该花色对应的乐谱库至你的乐谱库中',
    温柔一刀: `<a href='https://qm.qq.com/q/SsTlU9gc24'><span class=Qmenu>温柔一刀</span></a>`,
    诗寇蒂的剪刀: '诗寇蒂的剪刀',
    诗寇蒂的剪刀_info: '回合开始时,你可以永久裁剪掉自己的任意个阶段,并将其赋予任意角色,且可以插入任意位置.回合开始时,你摸当前缺失阶段数量的牌',
    QQQ_biaoji: '标记',
    QQQ_biaoji_info: '你可以将你的标记当作任意一张牌使用与打出,当你的标记数变化,你摸一张牌',
    武绝: '武绝',
    武绝_info: '五轮限一次,你可以将一名其他角色置入你的装备区三回合',
    影火: `<a href='https://qm.qq.com/q/SsTlU9gc24'><span class=Qmenu>影火</span></a>`,
    影火_info: '牌堆顶4张牌始终对你可见;你可将其如手牌般使用与打出',
    置幻: '置幻',
    置幻_info: '任意角色使用非转化牌时,若【花招】中不含此牌名,你可以令包含此牌花色的选项失效,并交换此牌与【花招】描述中花色相同的选项的牌名.当【花招】没有可用选项时,重置所有选项',
    QQQ_称象: '称象',
    QQQ_称象_info: '回合限一次,将手牌与场上共计至多四张点数之和不小于牌堆顶四张牌的牌置于牌堆顶并获得牌堆顶四张牌',
    花招: '花招',
    花招_info: '你可以重铸所有:1.♥️️手牌,视为使用【桃】;2.♠️️手牌,视为使用【杀】;3.♦️️手牌,视为使用【酒】;4.♣️️手牌,视为使用【闪】.选择完毕后令该项失效.当【花招】没有可用选项时,重置所有选项',
    求贤若渴: '求贤若渴',
    求贤若渴_info: '出牌阶段,你声明一个花色及类别,亮出牌堆顶3张牌,你获得与你声明相符的牌.若有两项皆满足的牌,你回复一点体力',
    魔翼: '魔翼',
    魔翼_info: '体力变化后,你可以摸一张牌并用一张牌,直到你没有使用牌',
    bug: 'bug',
    bug_info: '测bug专用',
    _append: '',
    _ab: '',
    合包: '合包',
    合包_info: '游戏开始时你获得一条扩展时间线,每个回合开始时你可以选择跳跃时间线或者推进时间线,时间线推进到一定程度会触发合并时间线',
    群起: '群起',
    群起_info: '出牌阶段,你可以弃置两张牌,并令所有拥有<群起>的角色摸两张牌,可以令一名未拥有<群起>的角色获得<群起>',
    斩杀: '斩杀',
    斩杀_info: '你的回合内,当有角色体力值小于二时,你获得其所有手牌并且对其使用牌无次数限制和距离',
    自书: '自书',
    自书_info: '任意角色回合内摸牌后,你摸一张牌',
    伤害: '伤害',
    伤害_info: '你的伤害不可阻挡',
    漫卷: '漫卷',
    漫卷_info: '如手牌般使用别人的手牌',
    GXS_snwushuang: '无双',
    GXS_snwushuang_info: '无双',
    博弈: '博弈',
    博弈_info: '回合限一次.你选择一张手牌并使全部其他角色猜测该牌的类型.若猜对:你可令你与该角色各摸一张牌:若猜错:你可令你与该角色各弃置一张牌',
    门客: '门客',
    门客_info: '你死亡后,令击杀你的角色进入门客秘境(其他角色暂时移出游戏,进入门客秘境的人需要面对三名门客的夹击,直至一方全部阵亡)',
    减伤: '减伤',
    减伤_info: '当你受到伤害时,此伤害减去你已损体力值',
    避乱: '避乱',
    避乱_info: '结束阶段开始时,本局内其他角色计算与你的距离时+X.(X为场上角色数)',
    义从: '义从',
    义从_info: '你计算与其他角色的距离时-X,其他角色计算与你的距离时+Y(X为你的体力值,Y为你的已损体力值)',
    南蛮: '南蛮',
    南蛮_info: '南蛮',
    三窟: '三窟',
    三窟_info: '当你进入濒死状态时,你减1点体力上限,将体力回复至体力上限',
    连营: '连营',
    连营_info: '当手牌数小于6时,你将手牌补至6张',
    冲阵: '冲阵',
    冲阵_info: '你可将牌按如下<♥️️️桃/♦️️火杀/♣️️闪/♠️️牌无懈/🃏诸葛>花色对应关系使用或打出并获得随机对方一张牌',
    持纲4: '持纲4',
    持纲4_info: '结束改出牌',
    擅专: '擅专',
    擅专_info: '任意角色受到伤害时,你将其一张牌置于其判定区,黑色视为闪电,红色视为乐不思蜀',
    酉鸡: '酉鸡',
    酉鸡_info: '摸牌阶段,你多摸X张牌(X为游戏轮数)',
    改命: '改命',
    改命_info: '观星七张改判定',
    卫境: '卫境',
    卫境_info: '每回合一次,当你需要使用【杀】或【闪】时,你可以视为使用一张【杀】或【闪】',
    慧识: '慧识',
    慧识_info: '回合限一次.你可进行判定获得判定牌并加1点体力上限,直到出现两张相同花色的牌',
    正订: '正订',
    正订_info: '当你于回合外使用或打出牌响应其他角色使用的牌时,你加1点体力上限',
    冯河: '冯河',
    冯河_info: '当你受到伤害时,你防止之,若此伤害有来源且来源不是你,你与伤害来源各减一点体力上限',
    杀: '杀',
    杀_info: '你的杀无限距离、无限次数、无视防具,且视为神属性',
    杀杀: '杀杀',
    杀杀_info: '你可以将任何一张牌当杀使用或打出',
    伤神: '伤神',
    伤神_info: '任意角色回合开始时,进行一次闪电判定',
    QQQ_zhendu: '鸩毒',
    QQQ_zhendu_info: '其他角色回合开始时,你对其造成一点伤害并视为对其使用一张<酒>',
    持纲1: '持纲1',
    持纲1_info: '准备改摸牌',
    持纲3: '持纲3',
    持纲3_info: '弃牌改出牌',
    持纲2: '持纲2',
    持纲2_info: '判定改摸牌',
    慈孝: '慈孝',
    慈孝_info: '准备阶段你令一名未拥有义子标记的其他角色获得一个<义子>标记.(拥有<义子>标记的角色视为拥有技能<叛弑>)',
    叛弑: '叛弑',
    叛弑_info: '准备阶段,你交给拥有技能<慈孝>的角色一张手牌',
    食尸: '食尸',
    食尸_info: '当有角色进入濒死时(每名角色限一次),你增加一点体力上限并回复一点体力,并获得其所有牌',
    平衡: '平衡',
    平衡_info: '当其他角色非摸牌阶段获得牌、摸牌阶段摸超过两张牌时,你获得其等量的牌',
    QQQ_tonghua: '同化',
    QQQ_tonghua_info: '所有其他角色死亡前将其转变为晦暝,回复至两点体力',
    寄生: '寄生',
    寄生_info: '当你死亡时,所有晦暝死亡,你每个<暝>标记摸9张牌.你弃置所有<暝>标记,并失去技能<同化>.你结束所有人的出牌阶段,并插入一个出牌阶段,且此阶段内你出杀无次数限制,此阶段结束后,你死亡且永久移出游戏',
    暝: '暝',
    暝_info: '晦暝属于你的阵营.晦暝死亡后你获得一个<暝>标记.每有一个 <暝>标记,摸牌阶段多摸2张牌,出牌阶段出杀次数加一',
    寒: '寒',
    寒_info: '结束阶段,你指定一名其他角色获得一个<寒>标记.同一个角色最多标记4个.当你使用杀指定拥有<寒>的角色时,此杀效果额外结算x次,x为目标角色拥有<寒>的数量',
    寒_1: '寒',
    寒_1_info: '当你使用杀指定拥有<寒>的角色时,此杀效果额外结算x次,x为目标角色拥有<寒>的数量',
    寄生_1: '寄生_1',
    寄生_1_info: '你出杀无距离次数限制且免疫死亡',
    奇械: '奇械',
    奇械_info: '你可以将一张手牌当做装备牌使用:♥️️加一马;♦️️减一马;♠️️八卦阵;♣️️连弩;🃏木牛流马<br>你手牌上限加装备区花色数',
    天谴: '天谴',
    天谴_info: '你已被天谴',
    战陨: '战陨',
    战陨_info: '击杀你的角色:废除装备区,翻面并横置,体力值修改为1,弃置所有牌,立刻结束出牌阶段(不是出牌阶段则结束当前回合),不能对自己使用牌,判定牌永远视为♠️️五,手牌上限为0',
    武德: '武德',
    武德_info: '当你成为杀的目标时,获得一枚<武德>标记.当你的<武德>标记数大于等于你的体力值时,无属性伤害对你无效.你的手牌上限+X(X为你的<武德>标记数)',
    大意: '大意',
    大意_info: '你可以重铸闪.你无法使用闪来响应杀',
    连鞭: '连鞭',
    连鞭_info: '回合限一次,你可以横置自己与至多四名其他角色,并对自己造成1点雷电伤害.若如此做,你获得一个<武德>标记',
    偷袭: '偷袭',
    偷袭_info: '当你使用杀指定目标时,你可以弃置一枚<武德>标记,使此杀伤害+1且不可被闪避',
    强夺: '强夺',
    强夺_info: '出牌阶段你可以失去一点体力,并获得所有非友方角色的一张牌',
    赌: '赌',
    赌_info: '出牌阶段,你可以摸一张牌并猜测其颜色,若错误:你获得一枚<赌>标记;若正确:你可以选择移去一枚<赌>标记或回复一点体力<br>若你的<赌>标记大于3,你死亡<br>其他角色出牌阶段,其可以移去一个赌,视为使用一张任意牌',
    赌2: '赌2',
    赌2_info: '其他角色出牌阶段,其可以移去一个赌,视为使用一张任意牌',
    连弩: '连弩',
    连弩_info: '你使用杀无次数限制,当你使用的杀未造成伤害,你弃置此杀目标角色一张牌',
    设伏: '设伏',
    设伏_info: '回合结束时,你选择任意一种牌名,并将一张牌置于武将牌上.当其他角色使用此牌名时,你可以令其失效',
    杀杀杀: '杀杀杀',
    杀杀杀_info: '你用杀造成伤害时,防止此伤害,让目标减少此伤害数值的体力上限',
    五行鹤翎扇: '五行鹤翎扇',
    五行鹤翎扇_info: '你使用杀时,将此杀转为任意属性(冰、火、雷、雪、毒、金、神、血)',
    QQQ_摸牌: '摸牌',
    QQQ_摸牌_info: '你可以在任何时候摸一张牌',
    QQQ_出牌: '出牌',
    QQQ_出牌_info: '任何时候,你可以出牌(不能是需要你响应的时机)',
    碎甲: '碎甲',
    碎甲_info: '你的防具失效',
    募集: '募集',
    募集_info: '其他角色失去至少2牌时,你可以弃置一张牌或失去一点体力获得这些牌中的一半(向上取整)',
    治军: '治军',
    治军_info: '当你失去至少2牌时,你可以防止其中一半的牌失去(向上取整)',
    康济: '康济',
    康济_info: '主公技,回合限一次,你可另其他魏势力武将各摸或随机弃置一张牌',
    驭衡: '驭衡',
    驭衡_info: '准备阶段你弃置所有手牌并随机获得等量技能,结束阶段你摸等量的牌并失去这些技能',
    制蛮: '制蛮',
    制蛮_info: '当你受到伤害时,你可以交给来源一张牌防止之',
    帝力: '帝力',
    帝力_info: '准备阶段,你令你随机一个临时技能变为永久技能',
    顧曲: '顧曲',
    顧曲_info: '回合开始阶段,你可以将一张手牌置于武将牌,称为<律>或进行更换(<律>至多五张).其他角色于出牌阶段使用牌颜色顺序,若与<律>相符,你摸一张牌',
    雅量: '雅量',
    雅量_info: '当其他角色对你使用唯一目标的非伤害锦囊时,你需给其一张牌,此锦囊不生效(无牌则此技不生效)',
    英才: '英才',
    英才_info: '回合开始时,你可以放弃摸牌,令一名角色手牌调整至手牌上限,其他角色至你的距离永久+1',
    徒: '徒',
    徒_info: '当你失去牌后,你随机弃置等量的牌(不嵌套触发)',
    流: '流',
    流_info: '结束阶段开始时,你翻面',
    QQQ_zhang: '只攻不防',
    QQQ_zhang_info: '你不能响应伤害牌;你的桃视为南蛮,酒视为火烧连营,闪视为逐近弃远,无懈视为水淹七军',
    神裁: '神裁',
    神裁_info: '游戏开始时,令一名其他角色获得神裁标记',
    QQQ_xipai: '万物源气',
    QQQ_xipai_info: '当你体力变化/不因使用而失去牌/死亡时,取消之,移除牌堆顶X张牌(X为此次事件的数值).牌堆洗牌后,你死亡',
    御策: '御策',
    御策_info: '你受到伤害后,除非来源弃置三种不同类型的牌,否则你回复一点体力',
    无矩: '无矩',
    无矩_info: '你使用手牌结算后,重铸所有手牌并摸一张牌,你可以令其中任意张牌本回合无法被重铸.当你通过技能弃置的牌数超过x!时,你减一点体力上限,摸两张牌并清空弃牌记录.(x为你发动此技能的次数)',
    全装备: '全装备',
    全装备_info: '开局铠甲合体',
    自伤: '自伤',
    自伤_info: '使用后减少当前一半体力上限,体力上限为1时无法使用该技能.体力上限最少1点',
    隐忍: '隐忍',
    隐忍_info: '体力变化后,你增加等量体力上限并亮出牌堆顶一张牌,若为红则回复一点体力,否则增加一点体力上限<br>你每失去1点体力上限,随机增加以下效果:出杀+1、摸牌+1、距离-1(上限-4)、使用牌1%概率额外结算',
    八卦: '八卦',
    八卦_info: '八卦',
    复活: '复活',
    复活_info: '摸牌阶段若场上有死亡角色,你跳过摸牌阶段令一名死亡角色复活且其转为你阵营',
    奇取: '奇取',
    奇取_info: '当你失去所有的手牌后,你回复一点体力,其他角色获得你的牌时,你与其交换手牌',
    假意: '假意',
    假意_info: '回合限一次,你可以交给一名其他角色一张手牌',
    锥锋: '锥锋',
    锥锋_info: '出牌阶段你可以视为使用决斗',
    天辩: '天辩',
    天辩_info: '当你拼点时,改为用牌堆顶第一张牌,你的♥️️拼点牌视为K,你令拼点目标改为随机使用手牌,你拼点输获得你拼点的牌,拼点赢获得对方拼点的牌',
    麻将: '麻将',
    麻将_info: '回合结束时,你将麻将牌补至4,可以将一张手牌与一张麻将牌交换.选择一名敌方角色并对其造成0点伤害<br>麻将牌每满足下列一项,伤害加一:3种花色:4种花色:2张同点数牌:3张同点数牌:4张同点数牌<br>若上述五项均满足,其立即死亡',
    QQQ_三刀: '三刀',
    QQQ_三刀_info: '回合结束时你可以视为使用三张锦囊',
    偏执: '偏执',
    偏执_info: '当你使用的牌被响应后,你在此牌结算完成后视为再次使用一张同名牌',
    乱码: '乱码',
    乱码_info: '当你一个阶段开始前,你取消之并随机执行一个阶段(准备和结束阶段除外)',
    镶星: '镶星',
    镶星_info: '体力变化三次后,随机对场上其他角色造成九点雷电伤害',
    血莲: '血莲',
    血莲_info: '体力变化四次后,回复一半已损体力值,摸两张牌,并视为对任意名角色使用一张无视防具的杀',
    星陨: '星陨',
    星陨_info: '每轮开始时,随机对场上其他角色造成九点雷电伤害',
    测试: '测试',
    测试_info: '测试',
    摸与杀: '摸与杀',
    摸与杀_info: '回合开始时随机获得四个有描述的技能,回合结束时选择失去三分之一的技能(向上取整)',
    普通卖血: '普通卖血',
    普通卖血_info: '<体力变化/造成伤害/每轮开始>时,你摸等量牌',
    隐伏: '隐伏',
    隐伏_info: '当你受到伤害时,改为回复等量体力.当你回复体力时,摸回复量两倍的牌',
    问仇: '问仇',
    问仇_info: '觉醒技,准备阶段若你未受伤,你失去隐伏获得破釜',
    破釜: '破釜',
    破釜_info: '当你成为其他角色牌的目标时,你可以对其使用一张杀令此牌无效.当你造成伤害时,可以失去一点体力令伤害翻倍.你的手牌上限等于已损体力值加上场上死亡人数',
    QQQ_longjing: '龙境',
    QQQ_longjing_info: '你可以将一张牌当成牌名字数相同的牌使用或打出',
    龙威: '龙威',
    龙威_info: '你可以将一张基本牌当作任意基本牌使用或打出并摸一张牌,你可以将一张锦囊牌当作任意锦囊牌使用',
    革命: '革命',
    革命_info: '当其他角色使用目标不为你的单目标牌时,你可以弃置一张与此牌颜色不同的牌选择一项,令其摸一张牌将使用者改为你/令其弃一张牌将目标改为你',
    乾明: '乾明',
    乾明_info: '回合限一次.阳:出牌阶段,你可以弃置所有牌<br>阴:出牌阶段,你可以获得<神临>',
    神临: '神临',
    神临_info: '每当你结束回合后,立刻进入新的回合<br>当你击杀角色/牌堆洗牌,失去此技能',
    静气: '静气',
    静气_info: '离开你区域的牌对你始终可见,你每使用一张牌,随机获得一半静气牌',
    连锁: '连锁',
    连锁_info: '你始终处于横置状态,其他角色使用牌指定你为目标时,横置其.当你受到无属性伤害,改为受到两倍的属性伤害;受到属性伤害后,回复一点体力',
    掠夺: '掠夺',
    掠夺_info: '每轮开始时,你获得其他所有角色的♦️️牌',
    乱世: '乱世',
    乱世_info: '任意角色使用杀后,你令所有角色成为目标',
    全判定: '全判定',
    全判定_info: '任意角色回合开始时,你将牌堆中所有延时锦囊置入其判定区',
    惠质: '惠质',
    惠质_info: '你使用非你手牌的牌不计入次数限制且伤害翻倍',
    乾坤大挪移: '乾坤大挪移',
    乾坤大挪移_info: '游戏开始时,全场其他角色依次交换一个技能',
    合并时间线: '合并时间线',
    合并时间线_info: '游戏开始时,全场角色获得其同名角色的技能',
};
for (const i in skill) {
    const info = skill[i];
    info.nobracket = true;
    const trans = translate1[`${i}_info`];
    if (info.forced && trans) {
        translate1[`${i}_info`] = `<span class=Qmenu>锁定技,</span>${trans}`;
    }
    if (!info.audio) {
        info.audio = 'ext:温柔一刀/audio:2';
    }
    if (info.subSkill) {
        for (const x in info.subSkill) {
            const infox = info.subSkill[x];
            if (!infox.audio) {
                infox.audio = 'ext:温柔一刀/audio:2';
            } //如果是choosebutton,语音应该是xxx_backup
        }
    }
} //QQQ
Object.assign(lib.skill, skill);
_status.gentle.skill = skill;
Object.assign(lib.translate, translate1);
_status.gentle.translate1 = translate1;
