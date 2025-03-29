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
    安国: {
        audio: 'anguo',
        enable: 'phaseUse',
        usable: 2,
        filterTarget(card, player, target) {
            return player != target;
        },
        async content(event, trigger, player) {
            event.target.draw();
            event.target.recover();
            var equip = Array.from(ui.cardPile.childNodes)
                .filter((Q) => get.type(Q) == 'equip' && event.target.canEquip(Q))
                .randomGet();
            if (equip) {
                event.target.equip(equip, 'gain2');
            }
            player.draw();
            player.recover();
            var equip = Array.from(ui.cardPile.childNodes)
                .filter((Q) => get.type(Q) == 'equip' && player.canEquip(Q))
                .randomGet();
            if (equip) {
                player.equip(equip, 'gain2');
            } //QQQ
        },
        ai: {
            threaten: 1.6,
            order: 9,
            result: {
                target(player, target) {
                    if (get.attitude(player, target) <= 0) {
                        if (target.isMinHandcard() || target.isMinEquip() || target.isMinHp()) {
                            return 4;
                        }
                    }
                    var num = 1;
                    if (target.isMinHandcard()) {
                        num += 2;
                    }
                    if (target.isMinEquip()) {
                        num += 2;
                    }
                    if (target.isDamaged()) {
                        num += 4;
                    }
                    return num;
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
    不动白: {
        trigger: {
            player: 'phaseBegin',
        },
        forced: true,
        charlotte: true,
        content() {
            player.skip('phaseUse');
        },
        marktext: '乐',
        mark: true,
        intro: {
            content: '跳过出牌阶段',
        },
    },
    摸牌白: {
        trigger: {
            player: 'phaseBegin',
        },
        forced: true,
        charlotte: true,
        content() {
            player.skip('phaseDraw');
        },
        marktext: '兵',
        mark: true,
        intro: {
            content: '跳过摸牌阶段',
        },
    },
    蛇毒: {
        trigger: {
            player: 'phaseBegin',
        },
        mark: true,
        intro: {
            content: 'mark',
        },
        forced: true,
        filter(event, player) {
            return player.storage.蛇毒 && player.storage.蛇毒 > 0;
        },
        async content(event, trigger, player) {
            var num = player.storage.蛇毒;
            const { result } = await player.chooseToDiscard('he', num, `弃置${num}张牌,或失去${num}点体力`).set('ai', (card) => 12 - get.value(card));
            if (!result.bool) {
                player.loseHp(num);
            }
            player.storage.蛇毒--;
            if (num > 1) {
                player.markSkill('蛇毒');
            } else {
                player.unmarkSkill('蛇毒');
            }
        },
    },
    琼梳: {
        equipSkill: true,
        trigger: {
            player: 'damageBegin4',
        },
        forced: true,
        filter: (event, player) => player.countCards('he'),
        async content(event, trigger, player) {
            const { result } = await player.chooseToDiscard('he', '弃置牌并防止伤害', [1, trigger.num]).set('ai', (card) => 20 - get.value(card));
            if (result.cards && result.cards[0]) {
                trigger.num -= result.cards.length;
            }
        },
    },
    金梳: {
        equipSkill: true,
        trigger: {
            player: 'phaseEnd',
        },
        forced: true,
        filter(event, player) {
            return player.countCards('h') < player.maxHp;
        },
        content() {
            player.drawTo(Math.min(50, player.maxHp));
        },
    },
    犀梳: {
        equipSkill: true,
        trigger: {
            player: ['phaseJudgeBefore', 'phaseDiscardBefore'],
        },
        forced: true,
        content() {
            trigger.cancel();
        },
    },
    修罗炼狱戟: {
        equipSkill: true,
        trigger: {
            source: ['damageBefore', 'damageEnd'],
        },
        _priority: 22,
        forced: true,
        content() {
            if (event.triggername == 'damageBefore') {
                trigger.num += Math.ceil(Math.max(trigger.player.maxHp, trigger.player.hp) / 3);
            } else {
                trigger.player.recover(Math.floor(Math.min(trigger.player.maxHp, trigger.player.hp) / 4));
            }
        },
        group: ['修罗炼狱戟_2'],
        subSkill: {
            2: {
                trigger: {
                    player: 'useCard',
                },
                filter(event, player) {
                    return event.card && !['equip', 'delay'].includes(get.type(event.card));
                },
                _priority: 23,
                forced: true,
                content() {
                    if (get.effect(player, trigger.card, player, player) > 0) {
                        trigger.excluded.addArray(player.getEnemies());
                        trigger.targets.addArray(player.getFriends(true));
                    } else {
                        trigger.excluded.addArray(player.getFriends(true));
                        trigger.targets.addArray(player.getEnemies());
                    }
                },
            },
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
            player: 'useCardToPlayered',
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
    无双方天戟: {
        equipSkill: true,
        trigger: {
            player: 'useCardToPlayered',
        },
        logTarget: 'target',
        forced: true,
        filter(event, player) {
            return event.target != player;
        },
        async content(event, trigger, player) {
            //QQQ
            if (trigger.target.countCards('he')) {
                const { result } = await player
                    .chooseControl('摸一张牌', '弃置目标的一张牌')
                    .set('prompt', get.prompt('无双方天戟'))
                    .set('ai', function () {
                        if (get.attitude(player, trigger.target) > 0) {
                            return 0;
                        }
                        if (get.effect(trigger.target, { name: 'guohe_copy2' }, player, player) > get.effect(player, { name: 'wuzhong' }, player, player) / 2) {
                            return 1;
                        }
                        return 0;
                    });
                if (result.index == 0) {
                    player.draw();
                }
                if (result.index == 1) {
                    await player.discardPlayerCard(trigger.target, 'he', true);
                }
            } else {
                player.draw();
            }
        },
        _priority: 50,
    },
    妆梳: {
        trigger: {
            global: 'phaseBegin',
        },
        forced: true,
        filter(event, player) {
            return event.player != player && player.hasCard(lib.skill.zhuangshu.filterCard, 'he');
        },
        filterCard(card) {
            if (_status.connectMode) {
                return true;
            }
            var type = get.type2(card);
            return type == 'basic' || type == 'trick' || type == 'equip';
        },
        content() {
            'step 0';
            player
                .chooseToDiscard('he', get.prompt('zhuangshu', trigger.player), '弃置一张牌,并根据此牌的类型,按如下关系将一张宝物牌置入该角色的装备区:{<基本牌,【琼梳】>,<锦囊牌,【犀梳】>,<装备牌,【金梳】>}.', function (card) {
                    var type = get.type2(card);
                    return type == 'basic' || type == 'trick' || type == 'equip';
                })
                .set('ai', function (card) {
                    var player = _status.event.player;
                    if (get.attitude(player, _status.event.getTrigger().player) < 0) {
                        return 0;
                    }
                    var name = '妆梳_' + get.type2(card, player);
                    return 15 - get.value(card);
                }).logSkill = ['zhuangshu', trigger.player];
            ('step 1');
            if (result.bool) {
                var name = '妆梳_' + get.type2(result.cards[0], result.cards[0].original == 'h' ? player : false);
                if (lib.card[name] && trigger.player.isIn && trigger.player.hasEmptySlot(5)) {
                    var card = game.createCard(name, lib.card[name].suit, 12);
                    trigger.player.$gain2(card, false);
                    trigger.player.equip(card);
                }
            }
        },
    },
    贵相: {
        trigger: {
            player: ['phaseZhunbeiBegin', 'phaseDrawBefore', 'phaseJudgeBefore', 'phaseDiscardBefore', 'phaseJieshuBegin'],
        },
        forced: true,
        content() {
            trigger.cancel();
            var next = player.phaseUse();
            event.next.remove(next);
            trigger.parent.next.push(next);
        },
    },
    移荣: {
        mod: {
            maxHandcard(player, num) {
                var add = player.storage.移荣_Q;
                if (typeof add == 'number') {
                    return num + add;
                }
            },
        },
        enable: 'phaseUse',
        usable: 1,
        content() {
            var num1 = player.countCards('h');
            var num2 = player.getHandcardLimit();
            if (num1 < num2) {
                player.draw(num2 - num1);
            }
            player.addMark('移荣_Q');
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
        group: ['移荣_M'],
        subSkill: {
            Q: {
                marktext: 'Q',
                mark: true,
                intro: {
                    name: 'Q',
                    name2: 'Q',
                    content: 'mark',
                },
            },
            M: {
                trigger: {
                    player: ['phaseEnd'],
                },
                forced: true,
                content() {
                    player.removeMark('移荣_Q', 4);
                },
            },
        },
    },
    国色: {
        enable: 'phaseUse',
        filterTarget(card, player, target) {
            if (target.hasSkill('不动白')) {
                return false;
            }
            return player != target;
        },
        filterCard: {
            suit: 'diamond',
        },
        position: 'h',
        selectTarget: 1,
        check(card) {
            return 20 - get.value(card);
        },
        content() {
            target.addTempSkill('不动白', { player: 'phaseEnd' });
            player.draw();
        },
        ai: {
            order: 15,
            result: {
                target(player, target) {
                    return -1;
                },
                player: 1,
            },
            tag: {
                skip: 'phaseUse',
            },
        },
    },
    断粮: {
        enable: 'phaseUse',
        filterTarget(card, player, target) {
            if (target.hasSkill('摸牌白')) {
                return false;
            }
            return player != target;
        },
        filterCard: {
            color: 'black',
        },
        position: 'h',
        selectTarget: 1,
        check(card) {
            return 20 - get.value(card);
        },
        content() {
            target.addTempSkill('摸牌白', { player: 'phaseEnd' });
        },
        ai: {
            order: 15,
            result: {
                target(player, target) {
                    return -1;
                },
            },
            tag: {
                skip: 'phaseDraw',
            },
        },
    },
    流离: {
        audioname: ['re_daqiao', 'daxiaoqiao'],
        trigger: {
            target: 'useCardToTarget',
        },
        forced: true,
        filter(event, player) {
            if (player.countCards('he') == 0) {
                return false;
            }
            if (event.player == player) {
                return false;
            }
            return get.effect(player, event.card, event.player, player) < 0;
        },
        async content(event, trigger, player) {
            //QQQ
            const { result } = await player.chooseCardTarget({
                forced: true,
                position: 'he',
                filterCard: true,
                filterTarget(card, player, target) {
                    return player != target;
                },
                ai1(card) {
                    return get.unuseful(card) + 9;
                },
                ai2(target) {
                    return target.isEnemiesOf(player);
                },
                prompt: get.prompt('流离'),
                prompt2: `弃置一张牌,将${get.translation(trigger.card)}转移`,
                source: trigger.player,
                card: trigger.card,
            });
            if (result.targets && result.targets[0] && result.cards) {
                player.discard(result.cards);
                var evt = trigger.parent;
                evt.triggeredTargets2.remove(player);
                evt.targets.remove(player);
                evt.targets.push(result.targets[0]);
            }
        },
    },
    顺世: {
        trigger: {
            player: ['damageEnd'],
            global: ['roundStart'],
        },
        forced: true,
        filter(event, player) {
            return player.countCards('he') && game.hasPlayer((current) => current != player);
        },
        async content(event, trigger, player) {
            const { result } = await player.chooseCardTarget({
                prompt: '将一张牌交给一名其他角色,并获得+1效果',
                filterCard: true,
                forced: true,
                filterTarget: (card, player, target) => target != player,
                position: 'he',
                source: trigger.source,
                ai1(card) {
                    if (player.getFriends().length && get.color(card) == 'red') {
                        return 10 - get.value(card);
                    }
                    if (get.color(card) == 'black') {
                        return 20 - get.value(card);
                    }
                    return 0;
                },
                ai2(target) {
                    var card = ui.selected.cards[0];
                    if (get.color(card) == 'red') {
                        return get.attitude(player, target);
                    }
                    if (get.color(card) == 'black') {
                        return -get.attitude(player, target);
                    }
                },
            });
            if (result.bool) {
                player.give(result.cards, result.targets[0]);
                player.addMark('顺世_mark');
                player.addSkill('顺世_mark');
            }
        },
        subSkill: {
            mark: {
                trigger: {
                    player: 'phaseDrawBegin2',
                },
                forced: true,
                charlotte: true,
                popup: false,
                filter(event, player) {
                    return !event.numFixed;
                },
                content() {
                    trigger.num += player.countMark('顺世_mark');
                },
                mod: {
                    maxHandcard(player, num) {
                        return num + player.countMark('顺世_mark');
                    },
                    cardUsable(card, player, num) {
                        if (card.name == 'sha') {
                            return num + player.countMark('顺世_mark');
                        }
                    },
                },
                intro: {
                    content: '拥有#层效果',
                },
            },
        },
    },
    黠慧: {
        mod: {
            ignoredHandcard: (card, player) => get.color(card) == 'black',
        },
        trigger: {
            global: 'gainBefore',
        },
        forced: true,
        filter: (event, player) => event.player != player && event.cards && event.cards.some((q) => player.getCards('he').includes(q)),
        async content(event, trigger, player) {
            for (const i of trigger.cards) {
                if (player.getCards('he').includes(i)) {
                    if (get.color(i) == 'red') {
                        player.draw();
                        const { result } = await player.chooseBool(`令${get.translation(trigger.player)}回复1点体力`).set('ai', () => get.recoverEffect(trigger.player, player, player));
                        if (result.bool) {
                            trigger.player.recover();
                        }
                    } else {
                        trigger.player.addMark('黠慧_1');
                        trigger.player.addSkill('黠慧_1');
                        trigger.player.addSkill('黠慧_2');
                        i.storage.黠慧 = true;
                        player.draw(2);
                    }
                }
            }
        },
        subSkill: {
            1: {
                trigger: {
                    player: 'damageBefore',
                },
                forced: true,
                charlotte: true,
                filter(event, player) {
                    return event.card && event.card.name == 'sha';
                },
                content() {
                    trigger.num += player.countMark('黠慧_1');
                    player.storage.黠慧_1 = 0;
                    player.removeSkill('黠慧_1');
                },
                intro: {
                    content: '下一次受到杀的伤害+#',
                },
            },
            2: {
                mark: true,
                intro: {
                    content: '不能使用、打出或弃置获得的黑色牌',
                },
                mod: {
                    cardDiscardable(card, player) {
                        if (card.storage && card.storage.黠慧) {
                            return false;
                        }
                    },
                    canBeDiscarded(card) {
                        if (card.storage && card.storage.黠慧) {
                            return false;
                        }
                    },
                    canBeGained(card) {
                        if (card.storage && card.storage.黠慧) {
                            return false;
                        }
                    },
                    cardEnabled2(card, player) {
                        if (card.storage && card.storage.黠慧) {
                            return false;
                        }
                    },
                },
                forced: true,
                popup: false,
                charlotte: true,
            },
        },
    },
    截辎: {
        trigger: {
            global: ['phaseDrawSkipped', 'phaseDrawCancelled'],
        },
        forced: true,
        content() {
            player.draw(2);
        },
    },
    冲阵: {
        audio: 'chongzhen', //QQQ
        charlotte: true,
        enable: ['chooseToUse', 'chooseToRespond'],
        prompt: '将一张♥牌当做桃,♦牌当做火杀,♣牌当做闪,♠牌当做无懈可击使用或打出',
        logTarget(event, player) {
            if (event.card.name == 'sha') {
                return event.targets[0];
            }
            return event.respondTo[0];
        },
        viewAs(cards, player) {
            var name = false;
            var nature = null;
            switch (cards[0]?.suit) {//QQQ
                case 'club':
                    name = 'shan';
                    break;
                case 'diamond':
                    name = 'sha';
                    nature = 'fire';
                    break;
                case 'spade':
                    name = 'wuxie';
                    break;
                case 'heart':
                    name = 'tao';
                    break;
            }
            if (name) {
                return { name: name, nature: nature };
            }
            return null;
        },
        hiddenCard(player, name) {
            if (name == 'wuxie' && _status.connectMode && player.countCards('hes') > 0) {
                return true;
            }
            if (name == 'wuxie') {
                return player.countCards('hes', { suit: 'spade' }) > 0;
            }
            if (name == 'tao') {
                return player.countCards('hes', { suit: 'heart' }) > 0;
            }
        },
        check(card) {
            return 90 - get.value(card);
        },
        position: 'hes',
        filterCard(card, player, event) {
            event = event || _status.event;
            var filter = event._backup.filterCard;
            var name = card.suit;
            if (name == 'club' && filter({ name: 'shan', cards: [card] }, player, event)) {
                return true;
            }
            if (name == 'diamond' && filter({ name: 'sha', cards: [card], nature: 'fire' }, player, event)) {
                return true;
            }
            if (name == 'spade' && filter({ name: 'wuxie', cards: [card] }, player, event)) {
                return true;
            }
            if (name == 'heart' && filter({ name: 'tao', cards: [card] }, player, event)) {
                return true;
            }
            return false;
        },
        filter(event, player) {
            var filter = event.filterCard;
            if (filter({ name: 'sha', nature: 'fire' }, player, event) && player.countCards('hes', { suit: 'diamond' })) {
                return true;
            }
            if (filter({ name: 'shan' }, player, event) && player.countCards('hes', { suit: 'club' })) {
                return true;
            }
            if (filter({ name: 'tao' }, player, event) && player.countCards('hes', { suit: 'heart' })) {
                return true;
            }
            if (filter({ name: 'wuxie' }, player, event) && player.countCards('hes', { suit: 'spade' })) {
                return true;
            }
            return false;
        },
        async precontent(event, trigger, player) {
            var target = game.players.find((q) => q.isEnemiesOf(player) && q.countCards('he'));
            if (target) {
                player.gain(target.getCards('he').randomGet(), 'gain2');
            }
        },
        ai: {
            respondSha: true,
            respondShan: true,
            skillTagFilter(player, tag) {
                var name;
                switch (tag) {
                    case 'respondSha':
                        name = 'diamond';
                        break;
                    case 'respondShan':
                        name = 'club';
                        break;
                    case 'save':
                        name = 'heart';
                        break;
                }
                if (!player.countCards('hes', { suit: name })) {
                    return false;
                }
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
    权变: {
        audio: 'quanbian',
        forced: true,
        trigger: {
            player: ['useCard', 'respond'],
        },
        filter(event, player) {
            var phase = event.getParent('phaseUse');
            if (!phase || phase.player != player) {
                return false;
            }
            return true;
        },
        content() {
            'step 0';
            var cards = get.cards(player.maxHp);
            game.cardsGotoOrdering(cards);
            var next = player.chooseToMove('权变:获得一张牌并排列其他牌');
            next.set('list', [['牌堆顶', cards], ['获得']]);
            next.set('filterMove', function (from, to, moved) {
                if (moved[0].includes(from.link)) {
                    if (typeof to == 'number') {
                        if (to == 1) {
                            if (moved[1].length) {
                                return false;
                            }
                            return true;
                        }
                        return true;
                    }
                    return true;
                } else {
                    return true;
                }
            });
            next.set('processAI', function (list) {
                var cards = list[0][1].slice(0).sort(function (a, b) {
                    return _status.event.player.getUseValue(b, true, true) - _status.event.player.getUseValue(a, true, true);
                }),
                    card = cards.shift();
                return [cards, [card]];
            });
            ('step 1');
            if (result.bool) {
                var list = result.moved;
                if (list[1].length) {
                    player.gain(list[1], 'gain2');
                }
                while (list[0].length) {
                    ui.cardPile.insertBefore(list[0].pop(), ui.cardPile.firstChild);
                }
                game.updateRoundNumber();
            }
        },
    },
    恶臭: {
        trigger: {
            global: 'useCard',
        },
        filter(event, player) {
            return event.player != player && ['tao', 'jiu'].includes(event.card.name);
        },
        forced: true,
        content() {
            var target = trigger.player;
            player.line(target);
            target.addMark('蛇毒', 1);
            target.markSkill('蛇毒');
        },
    },
    毒躯: {
        trigger: {
            player: 'damageEnd',
        },
        filter(event, player) {
            return event.source && event.source != player;
        },
        content() {
            trigger.source.addMark('蛇毒', trigger.num);
            trigger.source.markSkill('蛇毒');
        },
        forced: true,
        global: '蛇毒',
    },
    绝境: {
        mod: {
            maxHandcard(player, num) {
                return 5 + num;
            },
        },
        trigger: {
            player: ['dying', 'dyingAfter'],
        },
        forced: true,
        content() {
            player.draw(2);
        },
    },
    涉猎: {
        audio: 'shelie',
        trigger: {
            player: 'phaseDrawBegin1',
        },
        forced: true,
        content() {
            trigger.changeToZero();
            var cards = [];
            for (const i of lib.suits) {
                var card = get.cardPile2(function (card) {
                    return card.suit == i;
                });
                if (card) {
                    cards.push(card);
                }
            }
            if (cards.length) {
                player.gain(cards, 'gain2');
            }
        },
    },
    权计: {
        trigger: {
            player: ['changeHp', 'loseAfter'],
            global: ['roundStart'],
        },
        forced: true,
        filter(event, player) {
            if (event.name == 'changeHp' || event.name == 'roundStart') {
                return true;
            }
            if (player == _status.currentPhase) {
                return false;
            }
            if (event.getParent(2).name == '权计') {
                return false;
            }
            return true;
        },
        async content(event, trigger, player) {
            var count = numberq1(trigger.num);
            while (count-- > 0) {
                player.draw();
                if (player.countCards('he')) {
                    const { result } = await player.chooseCard('h', true, '选择一张手牌作为<权>');
                    if (result.bool && result.cards[0]) {
                        player.addToExpansion(result.cards, 'giveAuto', player).gaintag.add('权计');
                        if (player.getExpansions('权计').length > 2 && !player.hasSkill('排异')) {
                            player.gainMaxHp();
                            player.recover(2);
                            player.draw(2);
                            player.addSkill('排异');
                        }
                    }
                }
            }
        },
        intro: {
            content: 'expansion',
            markcount: 'expansion',
        },
        mod: {
            maxHandcard(player, num) {
                return num + player.getExpansions('权计').length;
            },
        },
        ai: {
            maixie: true,
        },
    },
    排异: {
        audio: 'xinpaiyi',
        enable: 'phaseUse',
        usable: 2,
        filter(event, player) {
            return player.getExpansions('权计').length;
        },
        content() {
            player.loseToDiscardpile(player.getExpansions('权计').randomGet());
            if (!player.storage.排异) {
                player.draw(Math.max(1, player.getExpansions('权计').length));
                player.storage.排异 = true;
            } else {
                game.countPlayer(function (current) {
                    if (current.isEnemiesOf(player)) {
                        current.damage();
                    }
                });
                delete player.storage.排异;
            }
        },
        ai: {
            order: 1,
            result: {
                player: 1,
            },
        },
    },
    崆峒印: {
        equipSkill: true,
        usable: 1,
        forced: true,
        trigger: {
            player: 'damageBegin4',
        },
        filter(event, player) {
            return event.num >= Math.max(player.hp, 2);
        },
        content() {
            player.popup(`<span class='bluetext' style='color:    #B3EE3A'>免疫</span>`);
            trigger.cancel();
        },
    },
    东皇钟: {
        mark: true,
        intro: {
            content(player, storage) {
                _status.东皇钟 = '';
                game.countPlayer(function (current) {
                    if (current.storage.东皇钟) {
                        _status.东皇钟 = get.translation(current) + '被镇压技能:' + get.translation(current.storage.东皇钟);
                    }
                });
                _status.东皇钟 += `<br><li><span class='texiaotext' style='color:#FF0000'>已鸣钟${game.me.storage.鸣钟}次</span>`;
                return _status.东皇钟;
            },
        },
        equipSkill: true,
        usable: 1,
        enable: 'phaseUse',
        content() {
            'step 0';
            player.chooseCard('he', '重铸一张牌', true, lib.filter.cardRecastable).set('ai', function (card) {
                return 8 - get.value(card);
            });
            ('step 1');
            player.recast(result.cards);
            player
                .chooseTarget('令一名角色技能失效', true, function (card, player, target) {
                    return player != target;
                })
                .set('ai', function (target) {
                    return -get.attitude(player, target);
                });
            ('step 2');
            if (result && result.targets && result.targets[0]) {
                //QQQ
                result.targets[0].storage.东皇钟 = result.targets[0].GAS();
                result.targets[0].CS();
                player.storage.鸣钟 = 0;
                player.markSkill('东皇钟');
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
                    game.countPlayer(function (current) {
                        if (current.storage.东皇钟) {
                            current.addSkill(current.storage.东皇钟);
                            delete current.storage.东皇钟;
                        }
                    });
                },
            },
            2: {
                trigger: {
                    player: 'damageAfter',
                },
                forced: true,
                filter(event, player) {
                    return event.source && event.source.storage.东皇钟;
                },
                content() {
                    if (!player.storage.鸣钟) {
                        player.storage.鸣钟 = 0;
                    }
                    player.storage.鸣钟++;
                    if (player.storage.鸣钟 > 2) {
                        player.draw(trigger.source.storage.东皇钟.length);
                        trigger.source.addSkill(trigger.source.storage.东皇钟);
                        delete trigger.source.storage.东皇钟;
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
        limited: true,
        skillAnimation: true,
        animationColor: 'water',
        mark: true,
        intro: {
            content(storage, player) {
                var str = '当前伤害';
                for (var i in player.storage.炼妖壶) {
                    str += `<br><li><span class='texiaotext' style='color:#FF0000'>${get.translation(i) + player.storage.炼妖壶[i]}点</span>`;
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
        usable: 1,
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
            player: 'damage',
        },
        check() {
            var player = _status.event.player;
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
        content() {
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
            player: 'useCardToPlayered',
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
                return number0(num) / 2 + 10;
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
                    player: 'loseAfter',
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
        limited: true,
        skillAnimation: true,
        animationColor: 'metal',
        trigger: {
            player: 'die',
        },
        forceDie: true,
        forced: true,
        filter(event, player) {
            let num = 0;
            for (var j of player.actionHistory) {
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
            //QQQ
            const {
                result: { targets },
            } = await player
                .chooseTarget(true)
                .set('ai', function (target) {
                    return 1;
                })
                .set('deadTarget', true)
                .set('filterTarget', function (card, player, target) {
                    return target.isDead();
                });
            if (targets && targets[0]) {
                player.line(targets[0]);
                targets[0].qrevive();
                player.guhuo(targets[0]);
            }
        },
        group: ['女娲石_1'],
        subSkill: {
            1: {
                equipSkill: true,
                enable: 'phaseUse',
                filter(event, player) {
                    let num = 0;
                    for (const j of player.actionHistory) {
                        if (j.useSkill.length) {
                            for (const evt of j.useSkill) {
                                if (evt.skill == '女娲石_1') {
                                    num++;
                                }
                            }
                        }
                    }
                    return num < Math.ceil(game.phaseNumber / 5) && game.dead.length;
                },
                async content(event, trigger, player) {
                    //QQQ
                    const {
                        result: { targets },
                    } = await player
                        .chooseTarget(true)
                        .set('ai', function (target) {
                            return 1;
                        })
                        .set('deadTarget', true)
                        .set('filterTarget', function (card, player, target) {
                            return target.isDead();
                        });
                    if (targets && targets[0]) {
                        player.line(targets[0]);
                        targets[0].qrevive();
                        player.guhuo(targets[0]);
                    }
                },
                ai: {
                    result: {
                        player: 1,
                    },
                    order: 99,
                },
            },
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
                return '当你使用杀指定目标时,你令目标恢复一点体力增加一个剑标记,然后摸三张牌令此杀失效';
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
            global: 'taoAfter',
        },
        forced: true,
        content() {
            player.draw();
        },
        group: ['神农鼎_1'],
        subSkill: {
            1: {
                usable: 1,
                enable: 'chooseToUse',
                viewAsFilter(player) {
                    return player.countCards('hes') > 0;
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
                ai: () => lib.card.tao.ai,
            },
        },
    },
    伏羲琴: {
        limited: true,
        skillAnimation: true,
        animationColor: 'metal',
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
    琴音: {
        trigger: {
            player: 'phaseEnd',
        },
        forced: true,
        content() {
            game.countPlayer(function (current) {
                if (current.isEnemiesOf(player)) {
                    current.loseHp();
                } else {
                    current.recover();
                }
            });
        },
    },
    业炎: {
        enable: 'phaseUse',
        usable: 1,
        animationColor: 'metal',
        skillAnimation: 'legend',
        async content(event, trigger, player) {
            const Q = [];
            let num = 3;
            while (num > 0) {
                const result = await player
                    .chooseTarget(`分配${num}点火焰伤害`, true, (card, player, target) => {
                        return target.isEnemiesOf(player);
                    })
                    .set('ai', (target) => {
                        return get.damageEffect(target, _status.event.player, target, 'fire');
                    })
                    .set('Q', Q)
                    .forResult();
                if (result.bool) {
                    const target = result.targets[0];
                    num--;
                    const index = Q.find((item) => item[0] == target);
                    if (!index) {
                        Q.push([target, 1]);
                    } else {
                        index[1]++;
                    }
                } else {
                    break;
                }
            }
            if (Q.length) {
                if (Math.random() > 0.5) {
                    game.playAudio('../extension/温柔一刀/audio/天降业火.mp3');
                } else {
                    game.playAudio('../extension/温柔一刀/audio/业火燎原.mp3');
                }
                if (Q[0].length == 1) {
                    Q[0][0].damage(Q[0][1], 'fire');
                } else {
                    for (const i of Q) {
                        i[0].damage(i[1], 'fire');
                    }
                }
            }
        },
        ai: {
            order: 1,
            fireAttack: true,
            result: {
                player: 1,
            },
        },
    },
    神威: {
        trigger: {
            player: 'phaseDrawBegin',
        },
        forced: true,
        content() {
            trigger.num += game.players.length;
        },
        mod: {
            maxHandcard(player, current) {
                return current + game.players.length;
            },
        },
    },
    QQQ_暴虐: {
        trigger: {
            global: 'changeHp',
        },
        forced: true,
        async content(event, trigger, player) {
            var count = numberq1(trigger.num);
            while (count-- > 0) {
                var E = get.cards(1);
                await game.cardsGotoOrdering(E);
                await player.showCards(E, 'QQQ_暴虐');
                if (E[0].suit == 'spade') {
                    await player.recover();
                    await player.gain(E[0], 'gain2', 'log');
                }
            }
        },
    },
    落英: {
        trigger: {
            global: ['loseAfter'],
        },
        filter(event, player) {
            if (event.getParent(2).name == 'recast' || event.parent.name == 'useCard') {
                return false;
            }
            return event.cards && event.cards.some((q) => q.suit == 'spade');
        },
        forced: true,
        async content(event, trigger, player) {
            //QQQ
            var cards = trigger.cards.filter((q) => q.suit == 'spade');
            player.gain(cards, 'gain2');
        },
    },
    复难: {
        trigger: {
            global: ['respond', 'useCard'],
        },
        forced: true,
        filter(event, player) {
            if (!event.respondTo) {
                return false;
            }
            if (event.player == player) {
                return false;
            }
            if (player != event.respondTo[0]) {
                return false;
            } else {
                return event.cards.filterInD('od').length;
            }
        },
        logTarget: 'player',
        content() {
            var cards = trigger.cards.filterInD('od');
            player.gain(cards, 'log', 'gain2');
        },
    },
    金乌落日弓: {
        equipSkill: true,
        trigger: {
            player: 'loseAfter',
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
    夷灭: {
        forced: true,
        preHidden: true,
        trigger: {
            source: 'damageBefore',
        },
        filter(event, player) {
            return player != event.player && event.num < event.player.hp;
        },
        logTarget: 'player',
        content() {
            trigger.num = trigger.player.hp;
        },
    },
    泰然: {
        trigger: {
            player: 'phaseEnd',
        },
        forced: true,
        preHidden: true,
        filter(event, player) {
            return player.hp < player.maxHp || player.countCards('h') < player.maxHp;
        },
        content() {
            'step 0';
            var num = player.maxHp - player.hp;
            if (num > 0) {
                player.recover(num);
            }
            ('step 1');
            if (player.countCards('h') < player.maxHp) {
                player.drawTo(player.maxHp).gaintag = ['tairan'];
            }
        },
        ai: {
            threaten: 0.4,
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
    孙权: {
        audio: 'rezhiheng',
        trigger: {
            player: 'drawBefore',
        },
        forced: true,
        async content(event, trigger, player) {
            var cards = ui.cardPile.childNodes;
            var list = [];
            for (var i = 0; i < cards.length; i++) {
                list.push(cards[i]);
            }
            const { result: { links } } = await player.chooseButton(['请选择卡牌', list], true, trigger.num)
                .set('ai', (button) => get.value(button.link));
            if (links && links[0]) {
                player.gain(links, 'drawpile');
                trigger.cancel();
            }
        },
        ai: {
            order: 10,
            result: {
                player: 1,
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
            player: 'loseAfter',
        },
        forced: true,
        filter(event, player) {
            return player.countCards('h') < 6;
        },
        content() {
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
                    if (player.getEquips('zhuge') && get.subtype(card) == 'equip1' && card.name != 'zhuge') {
                        return -1;
                    }
                    return [1, 1.6]; //无脑用牌
                },
            },
            noh: true,
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
    QQQ_wangzun: {
        trigger: {
            global: 'phaseZhunbeiBegin',
        },
        audio: 'wangzun',
        filter(event, player) {
            return event.player != player;
        },
        check: (event, player) => event.player.isEnemiesOf(player),
        logTarget: 'player',
        async content(event, trigger, player) {
            player.draw();
            trigger.player.addTempSkill('QQQ_wangzun_1');
        },
        subSkill: {
            1: {
                mod: {
                    maxHandcard(player, num) {
                        return num - 3;
                    },
                    playerEnabled(card, player, target) {
                        const q = game.players.find((i) => i.hasSkill('QQQ_wangzun'));
                        if (q) {
                            if (target != q) return false;
                        }
                    },
                    targetEnabled(card, player, target) {
                        const q = game.players.find((i) => i.hasSkill('QQQ_wangzun'));
                        if (q) {
                            if (target != q) return false;
                        }
                    },
                },
                mark: true,
                intro: {
                    content(storage, player) {
                        const q = game.players.find((i) => i.hasSkill('QQQ_wangzun'));
                        if (q) {
                            return `手牌上限减三且本回合只能对${get.translation(q)}使用牌`;
                        }
                    },
                },
            },
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
    拒战: {
        group: ['拒战_1', '拒战_2'],
        subSkill: {
            1: {
                audio: 'nzry_juzhan_1',
                trigger: {
                    target: 'useCardToTarget',
                },
                prompt2: '当你成为其他角色牌的目标后,你与其各摸一张牌,然后其本回合内不能再对你使用牌',
                filter(event, player) {
                    return player != event.player;
                },
                forced: true,
                logTarget: 'player',
                content() {
                    'step 0';
                    player.draw();
                    trigger.player.draw();
                    trigger.player.addTempSkill('nzry_juzhany');
                    player.addTempSkill('nzry_juzhanx');
                    ('step 1');
                },
            },
            2: {
                audio: 'nzry_juzhan_1',
                trigger: {
                    player: 'useCardToPlayered',
                },
                prompt2: '当你使用牌指定一名角色为目标后,你可以获得其一张牌',
                filter(event, player) {
                    return player != event.target && event.target.countGainableCards(player, 'he') > 0;
                },
                forced: true,
                logTarget: 'target',
                content() {
                    player.gainPlayerCard(trigger.target, 'he', true);
                },
            },
        },
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
                    isCard: true,
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
                    isCard: true,
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
    膂力: {
        audio: 'lvli',
        trigger: {
            player: 'damageEnd',
            source: 'damageSource',
        },
        forced: true,
        filter(event, player, name) {
            if (player.hp == player.countCards('h')) {
                return false;
            }
            if (player.hp < player.countCards('h') && player.isHealthy()) {
                return false;
            }
            return true;
        },
        content() {
            var num = player.hp - player.countCards('h');
            if (num > 0) {
                player.draw(num);
            } else {
                player.recover(-num);
            }
        },
    },
    清剿: {
        trigger: {
            player: 'phaseUseBegin',
        },
        filter(event, player) {
            if (!ui.cardPile.hasChildNodes() && !ui.discardPile.hasChildNodes()) {
            }
            return true;
        },
        check: (event, player) => player.countCards('h') < 5,
        content() {
            'step 0';
            player.chooseToDiscard(true, 'h', player.countCards('h'));
            ('step 1');
            var evt = trigger.parent;
            if (evt && evt.getParent && !evt.qingjiao) {
                evt.qingjiao = true;
                var next = game.createEvent('qingjiao_discard', false, evt.parent);
                next.player = player;
                next.setContent(function () {
                    var hs = player.getCards('h');
                    if (hs.length) {
                        player.discard(hs);
                    }
                });
            }
            ('step 2');
            var list = [];
            var typelist = [];
            var getType = function (card) {
                var sub = get.subtype(card);
                if (sub) {
                    return sub;
                }
                return card.name;
            };
            for (var i = 0; i < ui.cardPile.childElementCount; i++) {
                var node = ui.cardPile.childNodes[i];
                var typex = getType(node);
                if (!typelist.includes(typex)) {
                    list.push(node);
                    typelist.push(typex);
                    if (list.length >= 8) {
                        break;
                    }
                }
            }
            if (list.length < 8) {
                for (var i = 0; i < ui.discardPile.childElementCount; i++) {
                    var node = ui.discardPile.childNodes[i];
                    var typex = getType(node);
                    if (!typelist.includes(typex)) {
                        list.push(node);
                        typelist.push(typex);
                        if (list.length >= 8) {
                            break;
                        }
                    }
                }
            }
            player.gain(list, 'gain2');
        },
    },
    冯河: {
        trigger: {
            player: 'damageBegin4',
        },
        forced: true,
        content() {
            player.popup(`<span class='bluetext' style='color:    #B3EE3A'>免伤</span>`);
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
    给橘: {
        trigger: {
            player: 'phaseUseBegin',
        },
        forced: true,
        content() {
            'step 0';
            player.chooseTarget(get.prompt('给橘'), '移去一个【橘】或失去1点体力,然后令一名其他角色获得一个【橘】', function (card, player, target) {
                return target != player && target.isFriendsOf(player);
            });
            ('step 1');
            if (result.bool) {
                event.target = result.targets[0];
                if (player.hasMark('橘')) {
                    player
                        .chooseControl()
                        .set('choiceList', ['流失一点体力', '移去一个<橘>'])
                        .set('ai', function () {
                            if (player.hp > 3) {
                                return 0;
                            }
                            return 1;
                        });
                } else {
                    event._result = { index: 0 };
                }
            } else {
                event.finish();
            }
            ('step 2');
            if (result.index == 1) {
                player.removeMark('橘', 1);
            } else {
                player.loseHp();
            }
            target.addMark('橘', 2);
        },
    },
    橘: {
        init(player) {
            player.addMark('橘', 6);
        },
        marktext: '橘',
        mark: true,
        intro: {
            name: '橘',
            content: '当前有#个<橘>',
        },
        group: ['橘_1', '橘_2'],
        subSkill: {
            1: {
                audio: 'nzry_huaiju',
                trigger: {
                    global: ['damageBegin4', 'phaseDrawBegin2'],
                },
                forced: true,
                filter(event, player) {
                    return event.player.hasMark('橘') && (event.name == 'damage' || !event.numFixed);
                },
                content() {
                    player.line(trigger.player, 'green');
                    if (trigger.name == 'damage') {
                        trigger.cancel();
                        trigger.player.removeMark('橘', 1);
                    } else {
                        trigger.num += 2;
                    }
                },
            },
            2: {
                trigger: {
                    player: 'phaseDrawBefore',
                },
                forced: true,
                content() {
                    player.addMark('橘', 2);
                },
            },
        },
    },
    垂涕: {
        trigger: {
            global: ['loseAfter'],
        },
        forced: true,
        filter(event, player) {
            return event.type != 'use' && event.cards && event.cards[0];
        },
        async content(event, trigger, player) {
            for (const i of trigger.cards) {
                await player.chooseUseTarget(i, true, false, 'nodistance');
            }
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
            player: 'useCardToPlayered',
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
        }, //加载extension导入技能早于本体卡牌,然后在precontent里面finishedcard导致被禁用
        filterCard: true,
        position: 'hes',
        selectCard: 1,
        check(card) {
            return 20 - get.value(card);
        },
        ai: {
            skillTagFilter(player) {
                if (get.zhu(player, 'shouyue')) {
                    if (!player.countCards('hes')) {
                        return false;
                    }
                }
            },
            respondSha: true,
            yingbian(card, player, targets, viewer) {
                if (get.attitude(viewer, player) <= 0) {
                    return 0;
                }
                var base = 0,
                    hit = false;
                if (get.cardtag(card, 'yingbian_hit')) {
                    hit = true;
                    if (
                        targets.filter(function (target) {
                            return target.hasShan() && get.attitude(viewer, target) < 0 && get.damageEffect(target, player, viewer, get.nature(card)) > 0;
                        })
                    ) {
                        base += 5;
                    }
                }
                if (get.cardtag(card, 'yingbian_all')) {
                    if (
                        game.hasPlayer(function (current) {
                            return !targets.includes(current) && lib.filter.targetEnabled2(card, player, current) && get.effect(current, card, player, player) > 0;
                        })
                    ) {
                        base += 5;
                    }
                }
                if (get.cardtag(card, 'yingbian_damage')) {
                    if (
                        targets.filter(function (target) {
                            return (
                                get.attitude(player, target) < 0 &&
                                (hit ||
                                    !target.mayHaveShan() ||
                                    player.hasSkillTag(
                                        'directHit_ai',
                                        true,
                                        {
                                            target: target,
                                            card: card,
                                        },
                                        true
                                    )) &&
                                !target.hasSkillTag('filterDamage', null, {
                                    player: player,
                                    card: card,
                                    jiu: true,
                                })
                            );
                        })
                    ) {
                        base += 5;
                    }
                }
                return base;
            },
            canLink(player, target, card) {
                if (!target.isLinked() && !player.hasSkill('wutiesuolian_skill')) {
                    return false;
                }
                if (
                    target.mayHaveShan() &&
                    !player.hasSkillTag(
                        'directHit_ai',
                        true,
                        {
                            target: target,
                            card: card,
                        },
                        true
                    )
                ) {
                    return false;
                }
                if (player.hasSkill('jueqing') || player.hasSkill('gangzhi') || target.hasSkill('gangzhi')) {
                    return false;
                }
                return true;
            },
            basic: {
                useful: [5, 3, 1],
                value: [5, 3, 1],
            },
            order: 15,
            result: {
                target(player, target, card, isLink) {
                    var eff = (function () {
                        if (!isLink && player.hasSkill('jiu')) {
                            if (
                                !target.hasSkillTag('filterDamage', null, {
                                    player: player,
                                    card: card,
                                    jiu: true,
                                })
                            ) {
                                if (get.attitude(player, target) > 0) {
                                    return -7;
                                } else {
                                    return -4;
                                }
                            }
                            return -0.5;
                        }
                        return -1.5;
                    })();
                    if (
                        !isLink &&
                        target.mayHaveShan() &&
                        !player.hasSkillTag(
                            'directHit_ai',
                            true,
                            {
                                target: target,
                                card: card,
                            },
                            true
                        )
                    ) {
                        return eff / 1.2;
                    }
                    return eff;
                },
                player(player) {
                    return 1;
                },
            },
            tag: {
                respond: 1,
                respondShan: 1,
                damage(card) {
                    if (card.nature == 'poison') {
                        return;
                    }
                    return 1;
                },
                natureDamage(card) {
                    if (card.nature) {
                        return 1;
                    }
                },
                fireDamage(card, nature) {
                    if (card.nature == 'fire') {
                        return 1;
                    }
                },
                thunderDamage(card, nature) {
                    if (card.nature == 'thunder') {
                        return 1;
                    }
                },
                poisonDamage(card, nature) {
                    if (card.nature == 'poison') {
                        return 1;
                    }
                },
            },
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
    QQQ_leiji: {
        audio: 'xinleiji',
        trigger: {
            global: 'judgeEnd',
        },
        forced: true,
        filter(event, player) {
            return ['spade', 'club'].includes(event.result.suit);
        },
        async content(event, trigger, player) {
            const num = 1 + ['club', 'spade'].indexOf(trigger.result.suit);
            if (num == 1 && player.isDamaged()) {
                player.recover();
            }
            const { result: { targets } } = await player.chooseTarget(`对一名角色造成${num}点雷电伤害`, lib.filter.notMe)
                .set('ai', (t) => -get.attitude(player, t));
            if (targets?.length) {
                targets[0].damage(num, 'thunder');
            }
        },
        group: ['QQQ_leiji_1'],
        subSkill: {
            1: {
                audioname: ['boss_qinglong'],
                trigger: {
                    player: ['useCard', 'respond'],
                },
                forced: true,
                filter(event, player) {
                    return player != _status.currentPhase;
                },
                async content(event, trigger, player) {
                    player.judge(function (card) {
                        if (card.suit == 'spade') {
                            return 4;
                        }
                        if (card.suit == 'club') {
                            return 3;
                        }
                        return 0;
                    });
                },
            }
        }
    },
    鬼道: {
        trigger: {
            global: 'judge',
        },
        filter(event, player) {
            return player.countCards('hes') > 0;
        },
        forced: true,
        async content(event, trigger, player) {
            const { result } = await player.chooseCard(get.translation(trigger.player) + '的' + (trigger.judgestr || '') + `判定为${get.translation(trigger.player.judging[0])},` + get.prompt('xinguidao'), 'hes', true).set('ai', function (card) {
                var result = trigger.judge(card) - trigger.judge(trigger.player.judging[0]);
                var attitude = get.attitude(player, trigger.player);
                if (attitude == 0 || result == 0) {
                    return 0;
                }
                if (card.suit == 'spade') {
                    result += 4;
                }
                if (card.suit == 'club') {
                    result += 3;
                }
                if (attitude > 0) {
                    return result;
                } else {
                    return -result;
                }
            });
            if (result.cards && result.cards[0]) {
                player.respond(result.cards, 'highlight', 'xinguidao', 'noOrdering');
                player.gain(trigger.player.judging[0]);
                player.draw('nodelay');
                trigger.player.judging[0] = result.cards[0];
                trigger.orderingCards.push(result.cards[0]);
                game.log(trigger.player, '的判定牌改为', result.cards[0]);
            }
        },
        ai: {
            rejudge: true,
            tag: {
                rejudge: 1,
            },
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
    反间: {
        enable: 'phaseUse',
        filter(event, player) {
            return player.countCards('h') > 0;
        },
        filterTarget(card, player, target) {
            return player != target;
        },
        content() {
            'step 0';
            target.chooseControl('heart2', 'diamond2', 'club2', 'spade2').set('ai', function (event) {
                switch (Math.floor(Math.random() * 6)) {
                    case 0:
                        return 'heart2';
                    case 1:
                    case 4:
                    case 5:
                        return 'diamond2';
                    case 2:
                        return 'club2';
                    case 3:
                        return 'spade2';
                }
            });
            ('step 1');
            game.log(target, '选择了' + get.translation(result.control));
            event.choice = result.control;
            target.chat('我选' + get.translation(event.choice));
            target.gainPlayerCard(player, true, 'h');
            ('step 2');
            if (result.bool && result.cards[0].suit + '2' != event.choice) {
                target.damage('nocard');
            }
        },
        ai: {
            order: 1,
            result: {
                target(player, target) {
                    var eff = get.damageEffect(target, player);
                    if (eff >= 0) {
                        return 1 + eff;
                    }
                    var value = 0,
                        i;
                    var cards = player.getCards('h');
                    for (var i = 0; i < cards.length; i++) {
                        value += get.value(cards[i]);
                    }
                    value /= player.countCards('h');
                    if (target.hp == 1) {
                        return Math.min(0, value - 7);
                    }
                    return Math.min(0, value - 5);
                },
            },
        },
    },
    洛神: {
        trigger: {
            player: 'phaseZhunbeiBegin',
        },
        forced: true,
        content() {
            'step 0';
            if (event.cards == undefined) {
                event.cards = [];
            }
            var next = player.judge(function (card) {
                if (card.suit != 'heart') {
                    return 1.5;
                }
                return -1.5;
            });
            next.judge2 = function (result) {
                return result.bool;
            };
            next.set('callback', function () {
                if (event.judgeResult.suit != 'heart' && get.position(card, true) == 'o') {
                    player.gain(card, 'gain2');
                }
            });
            ('step 1');
            if (result.judge > 0) {
                event.cards.push(result.card);
            } else {
                event.cards = event.cards.filter((i) => get.position(i, true) == 'o');
                if (event.cards.length) {
                    player.gain(event.cards, 'gain2');
                }
                event.finish();
            }
            ('step 2');
            if (result.bool) {
                event.goto(0);
            } else {
                if (event.cards.length) {
                    player.gain(event.cards, 'gain2');
                }
            }
        },
    },
    倾国: {
        mod: {
            ignoredHandcard(card, player) {
                if (card.suit != 'heart') {
                    return true;
                }
            },
            cardDiscardable(card, player, name) {
                if (name == 'phaseDiscard' && card.suit != 'heart') {
                    return false;
                }
            },
            aiValue(player, card, num) {
                if (card.name != 'shan' && get.color(card) != 'black') {
                    return;
                }
                var cards = player.getCards('hs', function (card) {
                    return card.name == 'shan' || get.color(card) == 'black';
                });
                cards.sort(function (a, b) {
                    return (b.name == 'shan' ? 1 : 2) - (a.name == 'shan' ? 1 : 2);
                });
                var geti = function () {
                    if (cards.includes(card)) {
                        return cards.indexOf(card);
                    }
                    return cards.length;
                };
                if (card.name == 'shan') {
                    return Math.min(num, [6, 4, 3][Math.min(geti(), 2)]) * 0.6;
                }
                return Math.max(num, [6.5, 4, 3][Math.min(geti(), 2)]);
            },
            aiUseful() {
                return lib.skill.reqingguo.mod.aiValue.apply(this, arguments);
            },
        },
        enable: ['chooseToRespond', 'chooseToUse'],
        filterCard(card) {
            return get.color(card) == 'black';
        },
        position: 'hes',
        viewAs: {
            name: 'shan',
        },
        viewAsFilter(player) {
            if (!player.countCards('hes', { color: 'black' })) {
                return false;
            }
        },
        prompt: '将一张黑色牌当闪打出',
        check() {
            return 1;
        },
        ai: {
            order: 2,
            respondShan: true,
            skillTagFilter(player) {
                if (!player.countCards('hes', { color: 'black' })) {
                    return false;
                }
            },
            effect: {
                target(card, player, target, current) {
                    if (get.tag(card, 'respondShan') && current < 0) {
                        return 0.6;
                    }
                },
            },
            basic: {
                useful: [7, 5.1, 2],
                value: [7, 5.1, 2],
            },
            result: {
                player: 1,
            },
        },
    },
    扶汉: {
        audio: 'fuhan',
        trigger: {
            player: ['phaseBegin', 'changeHp'],
            source: 'damageSource',
        },
        animationColor: 'orange',
        forced: true,
        content() {
            'step 0';
            var list;
            list = [];
            for (var i = 0; i < _status.characterlist.length; i++) {
                var name = _status.characterlist[i];
                list.push(name);
            }
            list = list.randomGets(5);
            var skills = [];
            for (const i of list) {
                skills.addArray(
                    (lib.character[i][3] || []).filter(function (skill) {
                        var info = get.info(skill);
                        return info && !info.zhuSkill && !info.hiddenSkill && !info.charlotte && !info.dutySkill;
                    })
                );
            }
            if (!list.length || !skills.length) {
                event.finish();
                return;
            }
            if (player.isUnderControl()) {
                game.swapPlayerAuto(player);
            }
            var switchToAuto = function () {
                _status.imchoosing = false;
                event._result = {
                    bool: true,
                    skills: skills.randomGets(2),
                };
                if (event.dialog) {
                    event.dialog.close();
                }
                if (event.control) {
                    event.control.close();
                }
            };
            var chooseButton = function (list, skills) {
                var event = _status.event;
                if (!event._result) {
                    event._result = {};
                }
                event._result.skills = [];
                var rSkill = event._result.skills;
                var dialog = ui.create.dialog('请选择获得一个技能', [list, 'character'], 'hidden');
                event.dialog = dialog;
                var table = document.createElement('div');
                table.classList.add('add-setting');
                table.style.margin = '0';
                table.style.width = '100%';
                table.style.position = 'relative';
                for (var i = 0; i < skills.length; i++) {
                    var td = ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
                    td.link = skills[i];
                    table.appendChild(td);
                    td.innerHTML = `<span>${get.translation(skills[i])}</span>`;
                    td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
                        if (_status.dragged) {
                            return;
                        }
                        if (_status.justdragged) {
                            return;
                        }
                        _status.tempNoButton = true;
                        setTimeout(function () {
                            _status.tempNoButton = false;
                        }, 500);
                        var link = this.link;
                        if (!this.classList.contains('bluebg')) {
                            if (rSkill.length >= 2) {
                                return;
                            }
                            rSkill.add(link);
                            this.classList.add('bluebg');
                        } else {
                            this.classList.remove('bluebg');
                            rSkill.remove(link);
                        }
                    });
                }
                dialog.content.appendChild(table);
                dialog.add('　　');
                dialog.open();
                event.switchToAuto = function () {
                    event.dialog.close();
                    event.control.close();
                    game.resume();
                    _status.imchoosing = false;
                };
                event.control = ui.create.control('ok', function (link) {
                    event.dialog.close();
                    event.control.close();
                    game.resume();
                    _status.imchoosing = false;
                });
                for (var i = 0; i < event.dialog.buttons.length; i++) {
                    event.dialog.buttons[i].classList.add('selectable');
                }
                game.pause();
                game.countChoose();
            };
            if (event.isMine()) {
                chooseButton(list, skills);
            } else {
                switchToAuto();
            }
            ('step 1');
            var map = event.result || result;
            if (map && map.skills && map.skills.length) {
                for (const i of map.skills) {
                    player.addSkillLog(i);
                }
            }
            game.broadcastAll(function (list) {
                game.expandSkills(list);
                for (const i of list) {
                    var info = lib.skill[i];
                    if (!info) {
                        continue;
                    }
                    if (!info.audioname2) {
                        info.audioname2 = {};
                    }
                    info.audioname2.old_yuanshu = 'weidi';
                }
            }, map.skills);
        },
        mark: true,
        init(player, skill) {
            player.storage[skill] = false;
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
    夺锐: {
        trigger: {
            source: 'damageSource',
        },
        filter(event, player) {
            return player != event.player;
        },
        check: (event, player) => event.player.isEnemiesOf(player),
        bannedList: ['刑天破军斧2', 'shiyong', 'yaowu', 'nzry_jieying_1', 'nzry_jieying_2', 'ranshang', 'benghuai', 'lianhuo', 'chouhai', 'dushi', 'wumou', 'kunfen', 'tongji', 'retongji', 'jili', 'jinjiu', 'olbihun', 'wushen', 'spzhuilie', 'oldianjun', 'nzry_zhizheng'],
        content() {
            'step 0';
            var list = trigger.player.getSkills(null, false, false).filter(function (skill) {
                var info = get.info(skill);
                if (!info || lib.skill.夺锐.bannedList.includes(skill)) {
                    return false;
                }
                return info;
            });
            event.skills = list;
            ('step 1');
            if (event.skills.length) {
                player
                    .chooseControl(event.skills)
                    .set('prompt', '请选择要获得的技能')
                    .set('ai', function () {
                        return event.skills.randomGet();
                    });
            } else {
                event.finish();
            }
            ('step 2');
            player.addSkill(result.control);
            player.popup(result.control, 'thunder');
            trigger.player.RS(result.control);
            game.log(player, `获得了技能#g【${get.translation(result.control)}】`);
        },
    },
    发装备: {
        trigger: {
            global: 'gameDrawBefore',
        },
        forced: true,
        content() {
            'step 0';
            event.num = 0;
            ('step 1');
            event.targets = game.players.sortBySeat(player.next);
            var target = event.targets[num];
            if (target.isIn()) {
                var card = get.cardPile2(function (card) {
                    if (get.cardtag(card, 'gifts')) {
                        return false;
                    }
                    var type = get.subtype(card);
                    if (type != 'equip1' && type != 'equip2' && type != 'equip6') {
                        return false;
                    }
                    return target.canUse(card, target, true, true);
                });
                if (card) {
                    target.chooseUseTarget(card, true, false, 'nodistance');
                }
            }
            event.num++;
            if (event.num < targets.length) {
                event.redo();
            }
        },
    },
    据守: {
        mod: {
            playerEnabled(card, player, target) {
                if (player.hujia < 5 && player != target) {
                    return false;
                }
            },
        },
        audio: 'sbjushou',
        trigger: {
            player: 'phaseDiscardBegin',
        },
        forced: true,
        group: ['据守_1', '据守_2'],
        content() {
            var cards = player.getCards('h');
            var num = cards.length;
            player.discard(cards);
            player.turnOver();
            player.changeHujia(num);
        },
        subSkill: {
            1: {
                audio: 'sbjushou',
                trigger: {
                    player: 'damageEnd',
                },
                forced: true,
                content() {
                    player.changeHujia(1);
                },
            },
            2: {
                trigger: {
                    player: 'phaseDrawBegin2',
                },
                forced: true,
                content() {
                    trigger.num += Math.ceil(Math.sqrt(player.hujia));
                },
            },
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
            player: 'useCardToPlayered',
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
            player: 'useCardToPlayered',
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
        skillAnimation: true,
        animationColor: 'wood',
        forced: true,
        async content(event, trigger, player) {
            trigger.cancel();
            trigger.player.side = player.side;
            trigger.player.identity = player.identity;
            trigger.player.setIdentity(player.identity, 'blue');
            trigger.player.boss = player;
            trigger.player.ai.modAttitudeFrom = function (from, to, att) {//这里from是本人
                if (to == from.boss) return 99;
                return att;
            };
            trigger.player.ai.modAttitudeTo = function (from, to, att) {//这里to是本人
                if (to.boss == from) return 99;
                return att;
            };
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
            };
            player.draw(9 * player.storage.暝);
            player.addTempSkill('寄生_1', { player: 'phaseUseEnd' });
            player.when({ player: 'phaseUseAfter' })
                .then(() => {
                    player.die();
                });
            player.clearMark('暝');
            player.removeSkill('QQQ_tonghua');
            game.log(player, '结束了', _status.currentPhase, '的回合');
            var E = _status.event.getParent('phaseUse');
            var T = _status.event.getParent('phase');
            if (E && E.name == 'phaseUse') {
                E.skipped = true;
            } else if (T && T.name == 'phase') {
                T.finish();
            }
            player.when({ global: 'phaseAfter' })
                .then(() => {
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
                async content(event, trigger, player) {//QQQ
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
        content() {
            'step 0';
            player.chooseTarget('令一名其他角色获得一个【寒】', true, function (card, player, target) {
                if (target.countMark('寒') > 3) {
                    return false;
                }
                return target != player;
            }).ai = function (target) {
                return -get.attitude(player, target);
            };
            ('step 1');
            if (result.bool) {
                result.targets[0].addMark('寒', 1);
            }
        },
        group: ['寒_1'],
        subSkill: {
            1: {
                trigger: {
                    player: 'useCardToPlayered',
                },
                forced: true,
                audio: 'ext:温柔一刀/audio:3',
                filter(event, player) {
                    if (event.card.name != 'sha') {
                        return false;
                    }
                    return event.target.countMark('寒') > 0;
                },
                prompt2(event, player) {
                    var str = `额外结算${get.cnNumber(num)}次`;
                    if (event.card.name == 'sha' && event.card.nature) {
                        str += get.translation(event.card.nature);
                    }
                    return str + `【${get.translation(event.card.name)}】`;
                },
                content() {
                    trigger.parent.effectCount += trigger.target.countMark('寒');
                },
                ai: {
                    effect: {
                        target(card, player, target) {
                            if (player.hasSkill('寒_1') && get.attitude(player, target) < 0) {
                                return [-1, 0];
                            }
                        },
                    },
                },
            }
        }
    },
    鸣: {
        enable: 'phaseUse',
        filter(event, player) {
            return player.countCards('h') > 5;
        },
        content() {
            'step 0';
            player.randomDiscard('h', 6);
            ('step 1');
            var list = get.inpile('trick', 'trick').randomGets(3);
            for (var i = 0; i < list.length; i++) {
                list[i] = game.createCard(list[i]);
            }
            player.gain(list, 'draw');
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
    化木: {
        trigger: {
            player: ['useCardAfter', 'respondAfter'],
        },
        forced: true,
        init(player) {
            player.disableEquip('equip1');
        },
        filter(event, player) {
            var color = get.color(event.card);
            if (color == 'none') {
                return false;
            }
            if (get.type(event.card) == 'equip') {
                return false;
            }
            return event.cards && event.cards[0];
        },
        prompt2: (event) => '将' + get.translation(event.cards) + '置于武将牌上',
        content() {
            player.addToExpansion(trigger.cards, 'gain2').gaintag.add('化木');
        },
        ai: {
            reverseOrder: true,
            combo: '前盟',
        },
        mod: {
            aiOrder(player, card, num) {
                if (typeof card == 'object') {
                    var history = game.getGlobalHistory('useCard');
                    if (!history.length) {
                        return;
                    }
                    var evt = history[history.length - 1];
                    if (evt && evt.card && get.color(evt.card) != 'none' && get.color(card) != 'none' && get.color(evt.card) != get.color(card)) {
                        return num + 4;
                    }
                }
            },
        },
        marktext: '木',
        intro: {
            name: '灵杉&玉树',
            markcount(storage, player) {
                var red = [],
                    black = [];
                var cards = player.getExpansions('化木');
                for (const i of cards) {
                    var color = get.color(i, false);
                    (color == 'red' ? red : black).push(i);
                }
                return `${black.length}/${red.length}`;
            },
            content: 'expansion',
            mark(dialog, storage, player) {
                var red = [],
                    black = [];
                var cards = player.getExpansions('化木');
                for (const i of cards) {
                    var color = get.color(i, false);
                    (color == 'red' ? red : black).push(i);
                }
                if (black.length) {
                    dialog.addText('灵杉');
                    dialog.addSmall(black);
                }
                if (red.length) {
                    dialog.addText('玉树');
                    dialog.addSmall(red);
                }
            },
        },
    },
    良缘: {
        enable: 'chooseToUse',
        hiddenCard(player, name) {
            if (name == 'tao') {
                return player.getExpansions('化木').filter((i) => get.color(i) == 'red').length;
            } else if (name == 'jiu') {
                return player.getExpansions('化木').filter((i) => get.color(i) == 'black').length;
            }
            return false;
        },
        filter(event, player) {
            if (event.type == 'wuxie') {
                return false;
            }
            if (event.filterCard && event.filterCard({ name: 'tao' }, player, event) && player.getExpansions('化木').filter((i) => get.color(i) == 'red').length) {
                return true;
            }
            if (event.filterCard && event.filterCard({ name: 'jiu' }, player, event) && player.getExpansions('化木').filter((i) => get.color(i) == 'black').length) {
                return true;
            }
            return false;
        },
        chooseButton: {
            dialog() {
                return ui.create.dialog('良缘', [['tao', 'jiu'], 'vcard'], 'hidden');
            },
            filter(button, player) {
                var evt = _status.event.parent;
                var name = button.link[2],
                    color = name == 'tao' ? 'red' : 'black';
                var cards = player.getExpansions('化木').filter((i) => get.color(i, false) == color);
                if (!cards.length) {
                    return false;
                }
                var card = { name: name };
                return evt.filterCard(card, player, evt);
            },
            check(button) {
                if (_status.event.parent.type != 'phase') {
                    return 1;
                }
                const player = _status.event.player;
                const name = button.link[2],
                    color = name == 'tao' ? 'red' : 'black';
                return number0(player.getUseValue(button.link, null, true)) / 2 + 10;
            },
            backup(links, player) {
                var name = links[0][2],
                    color = name == 'tao' ? 'red' : 'black';
                var cards = player.getExpansions('化木').filter((i) => get.color(i, false) == color);
                if (!cards.length) {
                    return false;
                }
                var card = { name: name };
                return {
                    viewAs: card,
                    color: color,
                    selectCard: -1,
                    filterCard: () => false,
                    precontent() {
                        var color = lib.skill.良缘_backup.color;
                        player.loseToDiscardpile(
                            player
                                .getExpansions('化木')
                                .filter((i) => get.color(i, false) == color)
                                .randomGet()
                        );
                    },
                };
            },
            prompt(links, player) {
                var name = links[0][2],
                    color = name == 'tao' ? '玉树' : '灵杉';
                return `将一枚<${color}>当做【${get.translation(name)}】使用`;
            },
        },
        ai: {
            basic: {
                order: 1,
            },
            order(name, player) {
                return 1;
            },
            result: {
                player(player) {
                    if (_status.event.dying) {
                        return get.attitude(player, _status.event.dying);
                    }
                    return 1;
                },
            },
            combo: '化木',
            tag: {
                recover: 1,
                save: 1,
            },
        },
    },
    前盟: {
        trigger: {
            global: ['loseAfter', 'equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
        },
        filter(event, player) {
            if (event.name == 'addToExpansion') {
                return event.gaintag.includes('化木');
            }
            if (event.name == 'lose' && event.getlx !== false) {
                for (var i in event.gaintag_map) {
                    if (event.gaintag_map[i].includes('化木')) {
                        return true;
                    }
                }
                return false;
            }
            return game.getGlobalHistory('cardMove', function (evt) {
                if (evt.name != 'lose' || event != evt.parent) {
                    return false;
                }
                for (var i in evt.gaintag_map) {
                    if (evt.gaintag_map[i].includes('化木')) {
                        return true;
                    }
                }
                return false;
            }).length;
        },
        forced: true,
        content() {
            player.draw();
        },
        ai: {
            combo: '化木',
        },
    },
    羁肆: {
        trigger: {
            player: 'phaseZhunbeiBegin',
        },
        forced: true,
        limited: true,
        skillAnimation: true,
        animationColor: 'metal',
        content() {
            'step 0';
            player
                .chooseTarget(get.prompt('羁肆'), lib.filter.notMe)
                .set('ai', function (target) {
                    if (!_status.event.goon) {
                        return false;
                    }
                    var att = get.attitude(player, target);
                    if (att < 4) {
                        return false;
                    }
                    return att;
                })
                .set(
                    'goon',
                    (function () {
                        if (player.hasUnknown() || player.identity == 'nei') {
                            return false;
                        }
                        return true;
                    })()
                );
            ('step 1');
            if (result.bool) {
                var target = result.targets[0];
                event.target = target;
                player.awakenSkill('羁肆');
            } else {
                event.finish();
            }
            ('step 2');
            target.addSkill('前盟');
        },
        mark: true,
        intro: {
            content: 'limited',
        },
        init: (player, skill) => (player.storage[skill] = false),
        markimage: 'extension/OLUI/image/player/marks/xiandingji.png',
    },
    奇械: {
        mod: {
            maxHandcard(player, num) {
                var suits = [];
                var es = player.getCards('e');
                for (var i = 0; i < es.length; i++) {
                    suits.add(es[i].suit);
                }
                return num + suits.length;
            },
        },
        enable: 'phaseUse',
        filterCard: {
            suit: 'spade',
        },
        position: 'h',
        prompt: '八卦',
        filter(event, player) {
            return player.countCards('h', { suit: 'spade' });
        },
        content() {
            player.equip(game.createCard('bagua'));
        },
        ai: {
            basic: {
                order: 1,
            },
            result: {
                player(player) {
                    if (!player.isEmpty(2)) {
                        return -1;
                    }
                    return 1;
                },
            },
        },
        group: ['奇械_1', '奇械_2', '奇械_3'],
        subSkill: {
            1: {
                enable: 'phaseUse',
                filterCard: {
                    suit: 'club',
                },
                position: 'h',
                prompt: '诸葛',
                filter(event, player) {
                    return player.countCards('h', { suit: 'club' });
                },
                content() {
                    player.equip(game.createCard('zhuge'));
                },
                ai: {
                    basic: {
                        order: 1,
                    },
                    result: {
                        player(player) {
                            if (!player.isEmpty(1)) {
                                return -1;
                            }
                            return 1;
                        },
                    },
                },
            },
            2: {
                enable: 'phaseUse',
                filterCard: {
                    suit: 'diamond',
                },
                position: 'h',
                prompt: '减一马',
                filter(event, player) {
                    return player.countCards('h', { suit: 'diamond' });
                },
                content() {
                    player.equip(game.createCard('chitu'));
                },
                ai: {
                    basic: {
                        order: 1,
                    },
                    result: {
                        player(player) {
                            if (!player.isEmpty(4)) {
                                return -1;
                            }
                            return 1;
                        },
                    },
                },
            },
            3: {
                enable: 'phaseUse',
                filterCard: {
                    suit: 'heart',
                },
                position: 'h',
                prompt: '加一马',
                filter(event, player) {
                    return player.countCards('h', { suit: 'heart' });
                },
                content() {
                    player.equip(game.createCard('dilu'));
                },
                ai: {
                    basic: {
                        order: 1,
                    },
                    result: {
                        player(player) {
                            if (!player.isEmpty(3)) {
                                return -1;
                            }
                            return 1;
                        },
                    },
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
            game.log(player, '结束了', _status.currentPhase, '的回合');
            var E = _status.event.getParent('phaseUse');
            var T = _status.event.getParent('phase');
            if (E && E.name == 'phaseUse') {
                E.skipped = true;
            } else if (T && T.name == 'phase') {
                T.finish();
            }
        },
        trigger: {
            player: 'judge',
        },
        forced: true,
        content() {
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
                    player: 'loseBefore',
                },
                audio: 'fulin',
                forced: true,
                filter(event, player) {
                    return event.cards.some((card) => player.getCards('j').includes(card));
                },
                content() {
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
        skillAnimation: true,
        animationColor: 'gray',
        filter(event, player) {
            return event.source && event.source.isIn();
        },
        content() {
            trigger.source.changeHp(1 - trigger.source.hp);
            trigger.source.turnOver(true);
            trigger.source.link(true);
            trigger.source.discard(trigger.source.getCards('he'));
            let num = 6;
            while (num-- > 1) {
                trigger.source.disableEquip(`equip${num}`);
            }
            trigger.source.addSkill('天谴');
            var E = _status.event.getParent('phaseUse');
            var T = _status.event.getParent('phase');
            game.log(player, '结束了', _status.currentPhase, '的回合');
            if (E && E.name == 'phaseUse') {
                E.skipped = true;
            } else if (T && T.name == 'phase') {
                T.finish();
            }
        },
        logTarget: 'source',
        ai: {
            threaten() {
                return 9;
            },
        },
    },
    玲珑: {
        trigger: {
            target: 'useCardToTargeted',
        },
        forced: true,
        filter(event, player) {
            return !player.hasSkillTag('unequip2') && !event.player.hasSkillTag('unequip');
        },
        async content(event, trigger, player) {
            if (get.effect(player, trigger.card, trigger.player, player) < 0) {
                var E = get.cards(1);
                game.cardsGotoOrdering(E);
                player.showCards(E, '玲珑');
                if (get.color(E[0]) == 'red') {
                    trigger.parent.excluded.add(player);
                }
            }
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
            player: 'useCard2',
        },
        forced: true,
        filter(event, player) {
            return !lib.card[event.card.name].notarget;
        },
        async content(event, trigger, player) {
            if (['delay', 'equip'].includes(get.type(trigger.card))) {
                player.draw();
            }
            else {
                const { result: { targets } } = await player.chooseTarget(`为${get.translation(trigger.card)}增加或减少一个目标`)
                    .set('ai', function (target) {
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
            if (lib.linked.includes(event.nature)) {
                return false;
            }
            return player.countMark('武德') >= player.maxHp;
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
                    target: 'useCardToTargeted',
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
            player: 'useCardToPlayered',
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
        content() {
            'step 0';
            player.removeMark('武德', 1);
            ('step 1');
            trigger.parent.directHit.add(trigger.target);
            ('step 2');
            var id = trigger.target.playerid;
            var map = trigger.parent.customArgs;
            map[id] = {};
            if (!map[id].extraDamage) {
                map[id].extraDamage = 0;
            }
            map[id].extraDamage++;
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
        content() {
            'step 0';
            player.loseHp();
            game.countPlayer(function (current) {
                if (current != player && current.isEnemiesOf(player)) {
                    player.gainPlayerCard(current, 1, 'he');
                }
            });
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
        //出牌阶段, 你可以摸一张牌并猜测其颜色, 若错误: 你获得一枚 < 赌 > 标记;
        //若正确: 你可以选择移去一枚 < 赌 > 标记或恢复一点体力值.<span class="Qmenu">锁定技,</span> 若你的<赌>标记大于3, 你死亡.\
        //其他角色出牌阶段, 其可以移去一个赌, 视为使用任何一张基本牌或普通锦囊牌
        async content(event, trigger, player) {
            const { result } = await player.chooseControl('red', 'black').set('prompt', '赌:猜测下一张牌的颜色');
            var card = ui.cardPile.firstChild;
            player.showCards(card);
            player.gain(card, 'gain2');
            if (card.color == result.control) {
                var list = ['移除一枚标记', '回复一点体力'];
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
            return boss && boss != player && game.qcard(player).length;
        },
        chooseButton: {
            dialog(event, player) {
                const list = game.qcard(player);
                return ui.create.dialog('赌2', [list, 'vcard']);
            },
            check(button) {
                const num = _status.event.player.getUseValue({
                    name: button.link[2],
                    nature: button.link[3],
                }, null, true);
                return number0(num) / 2 + 10;
            },
            filter(button, player) {
                return _status.event.parent.filterCard({ name: button.link[2] }, player, _status.event.parent);
            },
            backup(links, player) {
                return {
                    filterCard() {
                        return false;
                    },
                    selectCard: -1,
                    popname: true,
                    viewAs: {
                        name: links[0][2],
                        nature: links[0][3],
                        suit: links[0][0],
                        number: links[0][1],
                    },
                    precontent() {
                        'step 0';
                        var target = game.players.find(function (current) {
                            return current.countMark('赌') > 0;
                        });
                        event.target = target;
                        ('step 1');
                        target.removeMark('赌', 1);
                        player.addTempSkill('nzry_juzhany');
                        target.addTempSkill('nzry_juzhanx');
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
    恩怨: {
        trigger: {
            player: ['changeHp'],
            global: ['roundStart'],
        },
        forced: true,
        async content(event, trigger, player) {
            var count = numberq1(trigger.num);
            while (count-- > 0) {
                const { result } = await player.chooseTarget(get.prompt('恩怨'), (card, player, target) => target != player).set('ai', (target) => -get.attitude(player, target));
                if (result.targets && result.targets[0]) {
                    result.targets[0].loseHp();
                    player.gainPlayerCard(result.targets[0], 'hej', true);
                    player.draw();
                }
            }
        },
        ai: {
            maixie: true,
        },
    },
    突袭: {
        trigger: {
            player: 'drawBefore',
        },
        forced: true,
        filter(event, player) {
            return game.hasPlayer((q) => q.countCards('he') && q.isEnemiesOf(player));
        },
        async content(event, trigger, player) {
            var count = trigger.num;
            while (count-- > 0 && game.hasPlayer((q) => q.countCards('he') && q.isEnemiesOf(player))) {
                const { result } = await player.chooseTarget('获得其他角色的一张牌', true, (card, player, target) => target.countCards('he') && target.isEnemiesOf(player)).set('ai', (target) => -get.attitude(player, target));
                if (result.targets && result.targets[0]) {
                    player.gainPlayerCard(result.targets[0], 'he', true);
                    trigger.num--;
                }
            }
        },
    },
    恂恂: {
        trigger: {
            player: ['changeHp'],
            global: ['roundStart'],
        },
        forced: true,
        async content(event, trigger, player) {
            var count = numberq1(trigger.num);
            while (count-- > 0) {
                var cards = get.cards(5);
                game.cardsGotoOrdering(cards);
                player.showCards(cards);
                const { result } = await player.chooseControl('获得两张牌', '使用一张牌');
                if (result.control == '获得两张牌') {
                    const { result: result1 } = await player.chooseButton(['获得两张牌', cards], 2, true).set('ai', function (button) {
                        if (get.tag(button.link, 'recover')) {
                            return 99;
                        }
                        return get.value(button.link, player);
                    });
                    if (result1.links && result1.links[0]) {
                        player.gain(result1.links, 'log', 'gain2');
                        cards.remove(result1.links[0]);
                        while (cards.length) {
                            ui.cardPile.appendChild(cards.shift().fix());
                        }
                    }
                } else {
                    const { result: result1 } = await player.chooseButton(['使用一张牌', cards], 1, true).set('ai', function (button) {
                        const num = player.getUseValue(button.link, null, true);
                        if (get.tag(button.link, 'recover')) {
                            return 99;
                        }
                        return number0(num) / 2 + 10;
                    });
                    if (result1.links && result1.links[0]) {
                        player.chooseUseTarget(result1.links[0], true, false, 'nodistance');
                        cards.remove(result1.links[0]);
                        while (cards.length) {
                            ui.cardPile.appendChild(cards.shift().fix());
                        }
                    }
                }
            }
        },
        ai: {
            maixie: true,
        },
    },
    强命: {
        trigger: {
            player: 'useCard',
        },
        forced: true,
        content() {
            trigger.directHit.addArray(game.players);
        },
        group: ['青锋'],
    },
    慷忾: {
        trigger: {
            global: 'useCardToTargeted',
        },
        check(event, player) {
            return get.attitude(player, event.target) > 0;
        },
        filter(event, player) {
            return event.player != event.target;
        },
        logTarget: 'target',
        async content(event, trigger, player) {
            player.draw(2);
            if (trigger.target != player) {
                const { result: { cards } } = await player.chooseCard(true, 'h', `交给${get.translation(trigger.target)}一张牌`).set('ai', function (card) {
                    if (get.type(card) == 'equip') {
                        return 2;
                    }
                    if (get.type(card) == 'basic') {
                        return 1;
                    }
                    return 0;
                });
                if (cards && cards[0]) {
                    player.give(cards, trigger.target, 'give');
                    if (get.type(cards[0]) == 'equip') {
                        trigger.target.equip(cards[0]);
                    }
                }
            }
        },
        ai: {
            threaten: 1.1,
        },
    },
    诗怨: {
        usable: 1,
        trigger: {
            target: 'useCardToTargeted',
        },
        filter(event, player) {
            if (event.player == player) {
                return false;
            }
            return true;
        },
        forced: true,
        content() {
            player.draw(3);
        },
    },
    镇卫: {
        audioname: ['re_wenpin'],
        trigger: {
            global: 'useCardToTarget',
        },
        filter(event, player) {
            if (player == event.target || player == event.player) {
                return false;
            }
            if (event.targets.length > 1) {
                return false;
            }
            return event.target != event.player;
        },
        check(event, player) {
            return get.effect(event.target, event.card, event.player, player) < 0;
        },
        content() {
            'step 0';
            player
                .chooseControl('转移', '失效', function () {
                    if (get.effect(trigger.target, trigger.card, trigger.player, player) < -6) {
                        return '失效';
                    }
                    return '转移';
                })
                .set('prompt', `将${get.translation(trigger.card)}转移给你,或令其失效`);
            ('step 1');
            if (result.control == '转移') {
                player.draw();
                trigger.parent.targets.remove(trigger.target);
                trigger.parent.targets.push(player);
                trigger.player.line(player);
            } else {
                var cards = trigger.cards.filterInD();
                if (cards.length) {
                    trigger.player.addSkill('zhenwei2');
                    trigger.player.addToExpansion(cards, 'gain2').gaintag.add('zhenwei2');
                }
                trigger.targets.length = 0;
                trigger.parent.triggeredTargets2.length = 0;
            }
        },
        ai: {
            threaten: 1.1,
        },
    },
    凶镬: {
        group: ['凶镬_damage', '凶镬_begin', '凶镬_dying'],
        marktext: '凶镬',
        mark: true,
        intro: {
            name: '凶镬',
            name2: '凶镬',
            content: 'mark',
        },
        init(player) {
            player.addMark('凶镬', 3);
        },
        mod: {
            maxHandcard(player, num) {
                for (const i of game.players) {
                    num += i.countMark('凶镬');
                }
                return num;
            }, //QQQ
        },
        audio: 'xinfu_xionghuo',
        enable: 'phaseUse',
        filter(event, player) {
            return player.countMark('凶镬') > 0;
        },
        filterTarget(card, player, target) {
            return player != target;
        },
        content() {
            player.removeMark('凶镬', 1);
            target.addMark('凶镬', 1);
        },
        subSkill: {
            begin: {
                audio: 'xinfu_xionghuo',
                logTarget: 'player',
                line: false,
                forced: true,
                trigger: {
                    global: 'phaseUseBegin',
                },
                filter(event, player) {
                    return event.player.countMark('凶镬') > 0 && event.player != player;
                },
                async content(event, trigger, player) {
                    event.count = trigger.player.countMark('凶镬');
                    while (event.count > 0) {
                        event.count--;
                        var Q = [1, 2, 3].randomGet();
                        if (Q == 1) {
                            player.line(trigger.player, 'fire');
                            trigger.player.damage('fire');
                            trigger.player.addTempSkill('不能出杀');
                            game.log('#g【凶镬1】');
                        }
                        if (Q == 2) {
                            player.line(trigger.player, 'water');
                            trigger.player.loseHp();
                            trigger.player.addMark('减手牌上限', 1, false);
                            trigger.player.addSkill('减手牌上限');
                            game.log('#g【凶镬2】');
                        }
                        if (Q == 3) {
                            player.line(trigger.player, 'green');
                            var card1 = trigger.player.getCards('h').randomGet();
                            var card2 = trigger.player.getCards('e').randomGet();
                            var list = [];
                            if (card1) {
                                list.push(card1);
                            }
                            if (card2) {
                                list.push(card2);
                            }
                            if (list.length) {
                                await player.gain(list, trigger.player, 'giveAuto', 'bySelf');
                            }
                            game.log('#g【凶镬3】');
                        }
                    }
                },
            },
            damage: {
                audio: 'xinfu_xionghuo',
                forced: true,
                trigger: {
                    source: 'damageBefore',
                },
                filter(event, player) {
                    return event.player.countMark('凶镬') > 0 && event.player != player;
                },
                content() {
                    trigger.num += trigger.player.countMark('凶镬');
                },
            },
            dying: {
                audio: 'xinfu_xionghuo',
                trigger: {
                    global: 'dying',
                },
                forced: true,
                content() {
                    player.addMark('凶镬', 1);
                },
            },
        },
        ai: {
            order: 11,
            result: {
                target(player, target) {
                    if (
                        game.hasPlayer(function (Q) {
                            return Q.countMark('凶镬') < 2 && Q.isEnemiesOf(player);
                        }) &&
                        target.countMark('凶镬') >= 2
                    ) {
                        return 0;
                    }
                    if (target.isEnemiesOf(player) && target.countMark('凶镬') == 1) {
                        return -5;
                    }
                    return -1;
                },
            },
            effect: {
                player(card, player, target) {
                    if (
                        player != target &&
                        get.tag(card, 'damage') &&
                        target &&
                        target.hasMark('凶镬') &&
                        !target.hasSkillTag('filterDamage', null, {
                            player: player,
                            card: card,
                        })
                    ) {
                        return [1, 0, 1, -2 * target.countMark('凶镬')];
                    }
                },
            },
            threaten: 1.6,
        },
    },
    不能出杀: {
        mod: {
            cardEnabled(card) {
                if (card.name == 'sha') {
                    return false;
                }
            },
        },
        charlotte: true,
        mark: true,
        marktext: '禁',
        intro: {
            content: '不能使用【杀】',
        },
    },
    减手牌上限: {
        mod: {
            maxHandcard(player, num) {
                return num - player.countMark('减手牌上限');
            },
        },
        marktext: '减',
        mark: true,
        charlotte: true,
        intro: {
            content: '手牌上限-#',
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
    莲华: {
        trigger: {
            target: 'useCardToTargeted',
        },
        forced: true,
        filter: (event) => event.card.name == 'sha',
        content() {
            'step 0';
            player.draw();
            var eff = get.effect(player, trigger.card, trigger.player, trigger.player);
            trigger.player
                .chooseToDiscard('he', `弃置一张牌,或令${get.translation(trigger.card)}对${get.translation(player)}无效`)
                .set('ai', function (card) {
                    if (_status.event.eff > 0) {
                        return 10 - get.value(card);
                    }
                    return 0;
                })
                .set('eff', eff);
            ('step 1');
            if (result.bool == false) {
                trigger.parent.excluded.add(player);
            } else {
                player
                    .judge(function (result) {
                        return get.color(result) == 'black' ? 1 : -1;
                    })
                    .set('judge2', (result) => result.bool);
            }
            ('step 2');
            if (result.bool) {
                trigger.excluded.add(player);
            }
        },
        ai: {
            effect: {
                target(card, player, target, current) {
                    if (card.name == 'sha' && current < 0) {
                        return 0.7;
                    }
                },
            },
        },
    },
    妙剑: {
        enable: 'phaseUse',
        usable: 1,
        chooseButton: {
            dialog() {
                return ui.create.dialog('妙剑', [
                    [
                        ['基本', '', 'sha', 'stab'],
                        ['锦囊', '', 'wuzhong'],
                    ],
                    'vcard',
                ]);
            },
            check(button) {
                const num = _status.event.player.getUseValue({
                    name: button.link[2],
                    nature: button.link[3],
                }, null, true);
                return number0(num) / 2 + 10;
            },
            backup(links, player) {
                return {
                    audio: 'miaojian',
                    viewAs: [
                        {
                            name: 'sha',
                            nature: 'stab',
                        },
                        {
                            name: 'wuzhong',
                        },
                    ][links[0][2] == 'sha' ? 0 : 1],
                    selectCard: -1,
                    filterCard() {
                        return false;
                    },
                };
            },
            prompt(links, player) {
                var index = links[0][2] == 'sha' ? 0 : 1,
                    level = player.countMark('miaojian');
                return [['请选择刺【杀】的目标'], ['请选择【无中生有】的目标']][index][level];
            },
        },
        ai: {
            order: 7,
            result: {
                player: 1,
            },
        },
    },
    诓人: {
        enable: 'phaseUse',
        usable: 1,
        audio: 'kuangbi',
        filterTarget(card, player, target) {
            return target != player && target.countCards('he') > 0;
        },
        content() {
            'step 0';
            target.chooseCard('he', target.countCards('he'), `匡弼:将牌置于${get.translation(player)}的武将牌上`, true);
            ('step 1');
            player.addToExpansion(result.cards, target, 'give').gaintag.add('诓人');
            if (!player.storage.诓人_draw) {
                player.storage.诓人_draw = [[], []];
            }
            player.storage.诓人_draw[0].push(target);
            player.storage.诓人_draw[1].push(result.cards.length);
            player.addSkill('诓人_draw');
            player.syncStorage('诓人_draw');
            player.updateMarks('诓人_draw');
        },
        intro: {
            content: 'expansion',
            markcount: 'expansion',
        },
        onremove(player, skill) {
            var cards = player.getExpansions(skill);
            if (cards.length) {
                player.loseToDiscardpile(cards);
            }
            delete player.storage[skill];
        },
        ai: {
            order: 15,
            result: {
                target(player, target) {
                    if (get.attitude(player, target) <= 0) {
                        return -target.countCards('he');
                    }
                    return 0;
                },
                player: 1,
            },
        },
        subSkill: {
            draw: {
                trigger: {
                    player: 'phaseZhunbeiBegin',
                },
                forced: true,
                mark: true,
                charlotte: true,
                audio: 'kuangbi',
                filter(event, player) {
                    return player.getExpansions('诓人').length;
                },
                content() {
                    player.gain(player.getExpansions('诓人'), 'gain2');
                    var storage = player.storage.诓人_draw;
                    if (storage.length) {
                        for (var i = 0; i < storage[0].length; i++) {
                            var target = storage[0][i],
                                num = storage[1][i];
                            if (target && target.isIn()) {
                                player.line(target);
                                target.draw(num);
                            }
                        }
                    }
                    player.removeSkill('诓人_draw');
                },
            },
        },
    },
    落宠: {
        trigger: {
            player: ['changeHp'],
            global: ['roundStart'],
        },
        forced: true,
        filter(event, player) {
            return !event.getParent('落宠').name;
        },
        async content(event, trigger, player) {
            var count = numberq1(trigger.num);
            while (count-- > 0) {
                var list = [];
                var choiceList = ['令一名角色回复1点体力', '令一名角色失去1点体力', '令一名角色弃置两张牌', '令一名角色摸两张牌'];
                const { result } = await player
                    .chooseControl('选项一', '选项二', '选项三', '选项四')
                    .set('prompt', get.prompt('落宠'))
                    .set('choiceList', choiceList)
                    .set('ai', function (event, player) {
                        var list = _status.event.controls.slice(0);
                        var gett = function (choice) {
                            var max = 0,
                                func = {
                                    选项一(target) {
                                        max = get.effect(target, { name: 'tao' }, player, player);
                                    },
                                    选项二(target) {
                                        max = get.effect(target, { name: 'losehp' }, player, player);
                                    },
                                    选项三(target) {
                                        max = 1.5 * get.effect(target, { name: 'guohe_copy2' }, player, player);
                                    },
                                    选项四(target) {
                                        max = get.effect(target, { name: 'wuzhong' }, player, player);
                                    },
                                }[choice];
                            game.countPlayer(function (current) {
                                func(current);
                            });
                            return max;
                        };
                        return list.sort(function (a, b) {
                            return gett(b) - gett(a);
                        })[0];
                    });
                var index = ['选项一', '选项二', '选项三', '选项四'].indexOf(result.control);
                var list = [
                    ['令一名角色回复1点体力', (target) => get.recoverEffect(target, player, player)],
                    ['令一名角色失去1点体力', (target) => get.effect(target, { name: 'losehp' }, player, player)],
                    ['令一名角色弃置两张牌', (target) => get.effect(target, { name: 'guohe_copy2' }, player, player) * Math.min(1.5, target.countCards('he'))],
                    ['令一名角色摸两张牌', (target) => get.effect(target, { name: 'wuzhong' }, player, player)],
                ][index];
                const { result: result1 } = await player.chooseTarget(list[0], true).set('ai', list[1]);
                if (result1.targets && result1.targets[0]) {
                    var target = result1.targets[0];
                    switch (index) {
                        case 0:
                            target.recover();
                            break;
                        case 1:
                            target.loseHp();
                            break;
                        case 2:
                            target.chooseToDiscard(true, 'he', 2);
                            break;
                        case 3:
                            target.draw(2);
                            break;
                    }
                }
            }
        },
        ai: {
            maixie: true,
        },
    },
    伏诛: {
        trigger: {
            global: 'roundStart',
        },
        skillAnimation: true,
        animationColor: 'wood',
        forced: true,
        async content(event, trigger, player) {
            while (player.next.isIn()) {
                await player.next.damage();
            }
        },
    },
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
                    return [1, 1.6]; //无脑用牌
                },
            },
            noh: true,
        },
    },
    QQQ_摸牌: {
        init(player) {
            if (player.isUnderControl(true)) {
                var button = document.createElement('div');
                button.innerHTML = `<span style='animation: fairy 20s infinite; -webkit-animation: fairy 20s infinite;'>摸牌</span>`;
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
                var button = document.createElement('div');
                button.className = 'buttonQ';
                button.style.left = '40%';
                button.innerHTML = `<span style='animation: fairy 20s infinite; -webkit-animation: fairy 20s infinite;'>出牌</span>`;
                button.addEventListener('click', async function () {
                    _status.event.goto(0);
                    game.resume();
                    while (true) {
                        const { result } = await player.chooseToUse('出牌').set('filterCard', () => true);
                        if (!result.bool) {
                            break;
                        }
                    }
                });
                document.body.appendChild(button);
            }
        },
    },
    中流: {
        trigger: {
            global: ['useSkillAfter', 'logSkill'],
        },
        forced: true,
        filter(event, player) {
            if (event.type != 'player') {
                return false;
            }
            var skill = event.sourceSkill || event.skill;
            var info = get.info(skill);
            if (info.charlotte) {
                return false;
            }
            var translation = get.skillInfoTranslation(skill, event.player);
            if (!translation) {
                return false;
            }
            var match = translation.match(/<?出牌阶段限一次/g);
            if (!match || match.every((value) => value != '出牌阶段限一次')) {
                return false;
            }
            return event.player.countMark('中流') < 1;
        },
        logTarget: 'player',
        async content(event, trigger, player) {
            var skills = trigger.player.getSkills(null, false, false);
            game.expandSkills(skills);
            var resetSkills = [];
            var suffixs = ['used', 'round', 'block', 'blocker'];
            for (var skill of skills) {
                var info = get.info(skill);
                if (typeof info.usable == 'number') {
                    if (trigger.player.hasSkill('counttrigger') && trigger.player.storage.counttrigger[skill] && trigger.player.storage.counttrigger[skill] >= 1) {
                        delete trigger.player.storage.counttrigger[skill];
                        resetSkills.add(skill);
                    }
                    if (typeof get.skillCount(skill) == 'number' && get.skillCount(skill) >= 1) {
                        delete trigger.player.getStat('skill')[skill];
                        resetSkills.add(skill);
                    }
                }
                if (info.round && trigger.player.storage[skill + '_roundcount']) {
                    delete trigger.player.storage[skill + '_roundcount'];
                    resetSkills.add(skill);
                }
                if (trigger.player.awakenedSkills.includes(skill)) {
                    trigger.player.restoreSkill(skill);
                    resetSkills.add(skill);
                }
                for (var suffix of suffixs) {
                    if (trigger.player.hasSkill(skill + '_' + suffix)) {
                        trigger.player.removeSkill(skill + '_' + suffix);
                        resetSkills.add(skill);
                    }
                }
            }
            if (resetSkills.length) {
                var str = '';
                for (const i of resetSkills) {
                    str += `【${get.translation(i)}】、`;
                }
                game.log(trigger.player, '重置了技能#g' + str.slice(0, -1));
            }
            trigger.player.addMark('中流', 1, false);
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
            global: 'loseAfter',
        },
        filter(event, player) {
            if (event.cards?.length) {
                const card = event.cards[0];
                if (event.cards.length == 1 && ['equip', 'delay'].includes(get.type(card))) {
                    return false;
                }
                return event.player != player && !event.getParent('募集').name;
            }
        },
        check(event, cards, player) {
            if (event.cards.length > 2) {
                return true;
            }
            return get.value(event.cards, player) > 6;
        },
        async content(event, trigger, player) {
            const { result: { cards } } = await player.chooseToDiscard('弃置1张牌或失去一点体力', 'he')
                .set('ai', (c) => 8 - get.value(c));
            if (!cards || !cards.length) {
                player.loseHp();
            }
            if (trigger.cards.length == 1) {
                setTimeout(async function () {
                    player.node.handcards1.appendChild(trigger.cards[0]);
                    ui.updatehl();
                }, 600);
            } else {
                const {
                    result: { links },
                } = await player.chooseButton(['选择要获得的牌', trigger.cards], num, true)
                    .set('ai', function (button) {
                        return get.value(button.link);
                    });
                if (links?.length) {
                    setTimeout(async function () {
                        for (const i of links) {
                            player.node.handcards1.appendChild(i);
                        }
                        ui.updatehl();
                    }, 600);
                }
            }
        },
    },
    治军: {
        trigger: {
            player: ['loseBefore'],
        },
        forced: true,
        filter(event, player) {
            return event.cards.length > 1;
        },
        content() {
            'step 0';
            var num = Math.ceil(trigger.cards.length / 2);
            var cards = [];
            for (var i = 0; i < trigger.cards.length; i++) {
                cards.push(trigger.cards[i]);
            }
            player.chooseButton(['选择防止失去的牌', cards], num, true).set('ai', function (button) {
                return get.value(button.link, _status.event.player, 'raw');
            });
            ('step 1');
            trigger.cards.removeArray(result.links);
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
    博览: {
        audio: 'bolan',
        initList(player) {
            var skills = [];
            for (var i in lib.character) {
                skills.addArray(lib.character[i][3]);
            }
            player.storage.博览 = skills;
        },
        trigger: {
            player: ['phaseBegin', 'changeHp'],
            source: 'damageSource',
        },
        forced: true,
        content() {
            'step 0';
            if (!player.storage.博览) {
                lib.skill.博览.initList(player);
            }
            var list = player.storage.博览.randomGets(3);
            player
                .chooseControl(list)
                .set(
                    'choiceList',
                    list.map(function (i) {
                        return `<div class='skill'>【${get.translation(lib.translate[i + '_ab'] || get.translation(i).slice(0, 2))}】</div><div>${get.skillInfoTranslation(i, player)}</div>`;
                    })
                )
                .set('displayIndex', false)
                .set('prompt', '选择你要获得的技能');
            ('step 1');
            player.addSkill(result.control);
            player.popup(result.control);
            game.log(player, `获得了#g【${get.translation(result.control)}】`);
        },
    },
    无敌: {
        trigger: {
            player: 'damageBegin4',
        },
        forced: true,
        content() {
            trigger.finished = true; //有用
            player.draw(trigger.num);
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
    制衡: {
        mark: true,
        intro: {
            content: 'mark',
        },
        audio: 'rezhiheng',
        enable: 'phaseUse',
        filter(event, player) {
            return player.countMark('制衡');
        },
        group: ['制衡_add'],
        async content(event, trigger, player) {
            player.removeMark('制衡', 1);
            const { result } = await player.chooseToDiscard('hes', [1, Infinity], true).set('ai', function (card) {
                if (get.tag(card, 'recover')) {
                    return 0;
                }
                return 6 - get.value(card);
            });
            if (result.cards && result.cards[0]) {
                player.draw(1 + result.cards.length);
            }
        },
        subSkill: {
            add: {
                audio: 'rezhiheng',
                trigger: {
                    player: ['changeHp'],
                    source: ['damageSource'],
                    global: ['roundStart'],
                },
                forced: true,
                async content(event, trigger, player) {
                    var count = numberq1(trigger.num);
                    while (count-- > 0) {
                        if (player == _status.currentPhase) {
                            player.addMark('制衡');
                        } else {
                            var list = ['增加次数', '发动制衡'];
                            const { result } = await player.chooseControl(list, function (event, player) {
                                if (player.countCards('hes', (card) => get.value(card) < 6)) {
                                    return '发动制衡';
                                }
                                return '增加次数';
                            });
                            if (result.control == '增加次数') {
                                player.addMark('制衡');
                            } else {
                                const { result: result1 } = await player.chooseToDiscard('hes', [1, Infinity], true).set('ai', function (card) {
                                    if (get.tag(card, 'recover')) {
                                        return 0;
                                    }
                                    return 6 - get.value(card);
                                });
                                if (result1.cards && result1.cards[0]) {
                                    player.draw(1 + result1.cards.length);
                                }
                            }
                        }
                    }
                },
            },
        },
        ai: {
            maixie: true,
            order: 1,
            result: {
                player: 1,
            },
        },
    },
    顧曲: {
        trigger: {
            player: 'phaseBegin',
        },
        forced: true,
        filter(event, player) {
            return player.countCards('h') > 0;
        },
        content() {
            'step 0';
            player.chooseCard('h', '选择一张牌作为<律>');
            ('step 1');
            if (result.bool) {
                var card = result.cards[0];
                event.card = card;
                if (player.getExpansions('顧曲_1').length < 1) {
                    player.addToExpansion(card, player, 'give').gaintag.add('顧曲_1');
                } else if (player.getExpansions('顧曲_2').length < 1) {
                    player.addToExpansion(card, player, 'give').gaintag.add('顧曲_2');
                } else if (player.getExpansions('顧曲_3').length < 1) {
                    player.addToExpansion(card, player, 'give').gaintag.add('顧曲_3');
                } else if (player.getExpansions('顧曲_4').length < 1) {
                    player.addToExpansion(card, player, 'give').gaintag.add('顧曲_4');
                } else if (player.getExpansions('顧曲_5').length < 1) {
                    player.addToExpansion(card, player, 'give').gaintag.add('顧曲_5');
                } else {
                    player.chooseControl('顧曲_1', '顧曲_2', '顧曲_3', '顧曲_4', '顧曲_5');
                }
            }
            ('step 2');
            if (result.control) {
                player.gain(player.getExpansions(result.control));
                player.addToExpansion(event.card, player, 'give').gaintag.add(result.control);
            }
        },
        group: ['顧曲_1', '顧曲_2', '顧曲_3', '顧曲_4', '顧曲_5'],
        subSkill: {
            1: {
                trigger: {
                    global: 'useCard',
                },
                intro: {
                    name: '1',
                    content: 'expansion',
                },
                forced: true,
                filter(event, player) {
                    if (event.all_excluded || event.player == player || event.player != _status.currentPhase) {
                        return false;
                    }
                    return event.player.getHistory('useCard').indexOf(event) == 0 && get.color(event.card) == get.color(player.getExpansions('顧曲_1'));
                },
                content() {
                    player.draw();
                },
            },
            2: {
                trigger: {
                    global: 'useCard',
                },
                intro: {
                    name: '2',
                    content: 'expansion',
                },
                forced: true,
                filter(event, player) {
                    if (event.all_excluded || event.player == player || event.player != _status.currentPhase) {
                        return false;
                    }
                    return event.player.getHistory('useCard').indexOf(event) == 1 && get.color(event.card) == get.color(player.getExpansions('顧曲_2'));
                },
                content() {
                    player.draw();
                },
            },
            3: {
                trigger: {
                    global: 'useCard',
                },
                intro: {
                    name: '3',
                    content: 'expansion',
                },
                forced: true,
                filter(event, player) {
                    if (event.all_excluded || event.player == player || event.player != _status.currentPhase) {
                        return false;
                    }
                    return event.player.getHistory('useCard').indexOf(event) == 2 && get.color(event.card) == get.color(player.getExpansions('顧曲_3'));
                },
                content() {
                    player.draw();
                },
            },
            4: {
                trigger: {
                    global: 'useCard',
                },
                intro: {
                    name: '4',
                    content: 'expansion',
                },
                forced: true,
                filter(event, player) {
                    if (event.all_excluded || event.player == player || event.player != _status.currentPhase) {
                        return false;
                    }
                    return event.player.getHistory('useCard').indexOf(event) == 3 && get.color(event.card) == get.color(player.getExpansions('顧曲_4'));
                },
                content() {
                    player.draw();
                },
            },
            5: {
                trigger: {
                    global: 'useCard',
                },
                intro: {
                    name: '5',
                    content: 'expansion',
                },
                forced: true,
                filter(event, player) {
                    if (event.all_excluded || event.player == player || event.player != _status.currentPhase) {
                        return false;
                    }
                    return event.player.getHistory('useCard').indexOf(event) == 4 && get.color(event.card) == get.color(player.getExpansions('顧曲_5'));
                },
                content() {
                    player.draw();
                },
            },
        },
    },
    雅量: {
        charlotte: true,
        trigger: {
            target: 'useCardToTargeted',
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
    英才: {
        trigger: {
            player: 'phaseBefore',
        },
        limited: true,
        skillAnimation: true,
        animationColor: 'gray',
        check: (event, player) => player.getHandcardLimit() > player.countCards('h'),
        content() {
            'step 0';
            player.awakenSkill('英才');
            player.skip('phaseDraw');
            trigger.player.addTempSkill('英才_1', 'roundStart');
            player
                .chooseTarget(function (card, player, target) {
                    return target.countCards('h') < target.getHandcardLimit() && target.isFriendsOf(player);
                })
                .set('ai', function (target) {
                    return Math.max(0, target.getHandcardLimit() - target.countCards('h'));
                });
            ('step 1');
            if (result.bool) {
                result.targets[0].drawTo(result.targets[0].getHandcardLimit());
            }
        },
        subSkill: {
            1: {
                charlotte: true,
                mod: {
                    globalTo(from, to, current) {
                        return current + 1;
                    },
                },
                intro: {
                    content: '其他角色至你的距离+1',
                },
            },
        },
        mark: true,
        intro: {
            content: 'limited',
        },
        init: (player, skill) => (player.storage[skill] = false),
        markimage: 'extension/OLUI/image/player/marks/xiandingji.png',
    },
    徒: {
        charlotte: true,
        mark: true,
        marktext: '徒',
        trigger: {
            player: 'loseAfter',
        },
        forced: true,
        filter(event, player) {
            var evt = event.getParent('徒');
            if (evt && evt.player == player) {
                return false;
            }
            return true;
        },
        content() {
            player.randomDiscard(trigger.cards.length);
        },
        intro: {
            name: '徒',
            content: '<span class="Qmenu">锁定技,</span>当你失去牌后,你随机弃置等量的牌(不嵌套触发)',
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
            content: '<span class="Qmenu">锁定技,</span>结束阶段开始时,你翻面',
        },
    },
    杖: {
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
        charlotte: true,
        mark: true,
        trigger: {
            target: 'useCardToTargeted',
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
        marktext: '杖',
        intro: {
            name: '杖',
            content: '你不能响应其他角色使用的伤害牌',
        },
    },
    神裁: {
        trigger: {
            global: ['gameDrawBefore', 'roundStart'],
        },
        forced: true,
        filter(event, player) {
            return game.hasPlayer(function (current) {
                return !current.hasSkill('徒') && current.isEnemiesOf(player);
            });
        },
        content() {
            'step 0';
            player.chooseTarget('令一名其他角色获得神裁标记', true, function (card, player, target) {
                return !target.hasSkill('徒') && target.isEnemiesOf(player);
            });
            ('step 1');
            if (result.bool) {
                result.targets[0].addSkill('徒');
                result.targets[0].addSkill('流');
            }
        },
    },
    洗牌: {
        trigger: {
            player: ['loseBegin', 'dieBegin', 'changeHpBegin', 'loseMaxHpBefore'],
        },
        forced: true,
        filter(event, player) {
            if (event.name == 'lose' && (event.getParent(2).name == 'recast' || ['useCard', 'respond', 'equip'].includes(event.parent.name))) {
                return false;
            }
            return true;
        },
        content() {
            const num = trigger.num ? numberq1(trigger.num) : trigger.cards ? trigger.cards.length : 1;
            if (trigger.name == 'lose') {
                trigger.cards.removeArray(player.getCards('he'));
            } else {
                trigger.cancel();
            }
            const card = get.cards(num);
            game.cardsGotoOrdering(card);
            player.popup(card, 'thunder');
            game.log('移入弃牌堆', card);
        },
        ai: {
            maixie: true,
        },
        group: ['洗牌_1'],
        subSkill: {
            1: {
                trigger: {
                    global: 'phaseEnd',
                },
                forced: true,
                filter(event, player) {
                    return game.hasGlobalHistory('cardMove', function (evt) {
                        return evt.washCard && evt.shuffleNumber == 1;
                    });
                },
                content() {
                    if (
                        game.hasGlobalHistory('cardMove', function (evt) {
                            return evt.washCard && evt.shuffleNumber == 1;
                        })
                    ) {
                        var next = game.createEvent('diex', false);
                        next.player = player;
                        next._triggered = null;
                        next.setContent(lib.element.content.die);
                    }
                },
            },
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
                return number0(num) / 2 + 10;
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
    往烈: {
        mod: {
            targetInRange(card, player, target, now) {
                if (player.hasMark('往烈_距离')) {
                    return true;
                }
            },
            cardUsable(card, player, target, now) {
                if (player.hasMark('往烈_次数')) {
                    return Infinity;
                }
            },
        },
        trigger: {
            player: ['useCardAfter', 'phaseBegin'],
        },
        forced: true,
        prompt2(event) {
            return '下一张牌特效';
        },
        content() {
            'step 0';
            player.removeMark('往烈_距离');
            player.removeMark('往烈_次数');
            player.removeMark('往烈_响应');
            var list = ['无距离限制', '无次数限制', '不能被响应'];
            player.chooseControl(list);
            ('step 1');
            if (result.control == '无距离限制') {
                player.addMark('往烈_距离');
            }
            if (result.control == '无次数限制') {
                player.addMark('往烈_次数');
            }
            if (result.control == '不能被响应') {
                player.addMark('往烈_响应');
            }
        },
        group: ['往烈_距离', '往烈_次数', '往烈_响应'],
        subSkill: {
            距离: {
                marktext: '距离',
                mark: true,
                intro: {
                    content: '下一张牌无距离限制',
                },
            },
            次数: {
                marktext: '次数',
                mark: true,
                intro: {
                    content: '下一张牌无次数限制',
                },
            },
            响应: {
                marktext: '响应',
                mark: true,
                intro: {
                    content: '下一张牌不能被响应',
                },
                trigger: {
                    player: 'useCard',
                },
                forced: true,
                filter(event, player) {
                    return player.hasMark('往烈_响应');
                },
                content() {
                    trigger.nowuxie = true;
                    trigger.directHit.addArray(game.players);
                },
                ai: {
                    directHit_ai: true,
                    skillTagFilter(player, tag, arg) {
                        return true;
                    },
                },
            },
        },
    },
    武: {
        enable: 'phaseUse',
        usable: 1,
        filter(event, player) {
            return true;
        },
        content() {
            'step 0';
            var list1 = [],
                list2 = [],
                list3 = [];
            for (var i = 0; i < lib.inpile.length; i++) {
                var type = get.type(lib.inpile[i]);
                if (type == 'basic') {
                    list1.push(['基本', '', lib.inpile[i]]);
                } else if (type == 'trick') {
                    list2.push(['锦囊', '', lib.inpile[i]]);
                } else if (type == 'delay') {
                    list3.push(['锦囊', '', lib.inpile[i]]);
                }
            }
            player.chooseButton([[list1.concat(list2).concat(list3), 'vcard']]);
            ('step 1');
            var cardList = Array.from(ui.cardPile.childNodes).concat(Array.from(ui.discardPile.childNodes));
            event.cards.addArray(
                cardList.filter(function (card) {
                    return card.name == result.links[0][2];
                })
            );
            for (var card of cards) {
                ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
            }
        },
        ai: {
            order: 10,
            result: {
                player: 1,
            },
        },
    },
    全装备: {
        trigger: {
            player: ['loseAfter'],
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
    庇护: {
        trigger: {
            player: 'damage',
        },
        forced: true,
        content() {
            'step 0';
            event.card = get.cards()[0];
            game.cardsGotoOrdering(event.card);
            player.showCards(event.card);
            ('step 1');
            if (get.color(event.card) == 'red') {
                player.gainMaxHp();
            } else {
                player.recover();
            }
        },
    },
    隐忍: {
        group: ['隐忍_1', '隐忍_2', '隐忍_3', '隐忍_杀', '隐忍_摸', '隐忍_减', '隐忍_基本', '隐忍_锦囊'],
        mod: {
            cardUsable(card, player, num) {
                if (card.name == 'sha') {
                    return num + player.countMark('隐忍_杀');
                }
            },
            globalFrom(from, to, distance) {
                //from是本人
                if (typeof from.storage.隐忍_减 == 'number') {
                    return distance - from.storage.隐忍_减;
                }
            },
        },
        trigger: {
            player: ['changeHp'],
        },
        forced: true,
        content() {
            var count = numberq1(trigger.num);
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
        subSkill: {
            1: {
                trigger: {
                    player: ['loseMaxHpEnd'],
                },
                forced: true,
                content() {
                    var count = numberq1(trigger.num);
                    while (count-- > 0) {
                        var list = ['隐忍_杀', '隐忍_摸', '隐忍_减', '隐忍_基本', '隐忍_锦囊'];
                        if (player.countMark('隐忍_减') > 4) {
                            list.remove('隐忍_减');
                        }
                        if (player.countMark('隐忍_摸') > 20) {
                            list.remove('隐忍_摸');
                        }
                        if (player.countMark('隐忍_杀') > 20) {
                            list.remove('隐忍_杀');
                        }
                        player.addMark(list.randomGet(), 1);
                    }
                },
            },
            2: {
                trigger: {
                    player: 'phaseDrawBegin2',
                },
                forced: true,
                filter(event, player) {
                    return player.countMark('隐忍_摸') > 0;
                },
                content() {
                    trigger.num += player.countMark('隐忍_摸');
                },
            },
            3: {
                trigger: {
                    player: 'useCard',
                },
                forced: true,
                filter(event, player) {
                    if (get.type(event.card) == 'basic') {
                        return Math.random() < 0.1 * player.countMark('隐忍_基本');
                    }
                    if (get.type(event.card) == 'trick') {
                        return Math.random() < 0.1 * player.countMark('隐忍_锦囊');
                    }
                    return false;
                },
                content() {
                    if (get.type(trigger.card) == 'trick') {
                        trigger.effectCount += Math.ceil(player.countMark('隐忍_锦囊') / 10);
                        game.log('暴击锦囊' + Math.ceil(player.countMark('隐忍_锦囊') / 10));
                        player.popup(`<span class='bluetext' style='color:#B3EE3A'>暴击</span>`);
                    }
                    if (get.type(trigger.card) == 'basic') {
                        trigger.effectCount += Math.ceil(player.countMark('隐忍_基本') / 10);
                        game.log('暴击基本' + Math.ceil(player.countMark('隐忍_锦囊') / 10));
                        player.popup(`<span class='bluetext' style='color:#B3EE3A'>暴击</span>`);
                    }
                },
            },
            杀: {
                marktext: '杀',
                mark: true,
                intro: {
                    name: '杀',
                    content: 'mark',
                },
            },
            摸: {
                marktext: '摸',
                mark: true,
                intro: {
                    name: '摸',
                    content: 'mark',
                },
            },
            减: {
                marktext: '减',
                mark: true,
                intro: {
                    name: '减',
                    content: 'mark',
                },
            },
            基本: {
                marktext: '基本',
                mark: true,
                intro: {
                    name: '基本',
                    content: 'mark',
                },
            },
            锦囊: {
                marktext: '锦囊',
                mark: true,
                intro: {
                    name: '锦囊',
                    content: 'mark',
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
            if (!event.filterCard || !event.filterCard({ name: 'shan' }, player, event)) {
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
        skillAnimation: true,
        animationColor: 'metal',
        trigger: {
            global: 'roundStart',
        },
        forceDie: true,
        forced: true,
        filter(event, player) {
            return game.dead.length;
        },
        async content(event, trigger, player) {//QQQ
            const {
                result: { targets },
            } = await player
                .chooseTarget(true)
                .set('ai', function (target) {
                    return 1;
                })
                .set('deadTarget', true)
                .set('filterTarget', function (card, player, target) {
                    return target.isDead();
                });
            if (targets && targets[0]) {
                player.line(targets[0]);
                targets[0].qrevive();
                player.guhuo(targets[0]);
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
        content() {
            player.swapHandcards(trigger.player);
        },
        group: ['奇取_1'],
        subSkill: {
            1: {
                trigger: {
                    player: ['loseAfter', 'equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
                },
                forced: true,
                filter(event, player) {
                    if (player.countCards('h')) {
                        return false;
                    }
                    var evt = event.getl(player);
                    return evt && evt.player == player && evt.hs && evt.hs.length;
                },
                content() {
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
                    popname: true,
                    selectCard: -1,
                    filterCard() {
                        return false;
                    },
                    precontent() {
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
                    player.popup(`<span class='bluetext' style='color:#B3EE3A'>免伤</span>`);
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
                const { result: result1 } = await player.chooseTarget(true, function (card, player, target) {
                    return target.isEnemiesOf(player);
                });
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
                const list = game.qcard(player, 'trick', false).filter((q) => lib.card[q[2]].selectTarget == 1);
                if (list.length) {
                    var count = 3;
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
            player: 'useCardEnd',
        },
        forced: true,
        usable: 50,
        filter(event, player) {
            game.log(event.targets);
            game.log(player.storage.Q);
            if (event.targets.join() !== player.storage.Q.join()) {
                return true;
            }
            if (get.tag(event.card, 'damage')) {
                return (
                    event.card.nature != 'kami' &&
                    event.targets.some((Q) => {
                        return (
                            Q.isIn() &&
                            !Q.hasHistory('damage', function (Q) {
                                return Q.card == event.card;
                            })
                        );
                    })
                );
            }
            return game.players.filter(
                (E) =>
                    E.hasHistory('useCard', (Q) => {
                        return Q.respondTo && Q.respondTo[1] == event.card;
                    }) ||
                    E.hasHistory('respond', (Q) => {
                        return Q.respondTo && Q.respondTo[1] == event.card;
                    })
            ).length;
        },
        content() {
            if (trigger.targets.length > player.storage.Q.length) {
                player.useCard(
                    trigger.card,
                    trigger.targets.filter((E) => E.isIn()),
                    false
                );
            } else {
                player.useCard(
                    trigger.card,
                    player.storage.Q.filter((E) => E.isIn()),
                    false
                );
            }
        },
        group: ['偏执_1'],
        subSkill: {
            1: {
                trigger: {
                    player: 'useCard',
                },
                forced: true,
                content() {
                    player.storage.Q = trigger.targets.slice();
                },
            },
        },
    },
    乱码: {
        trigger: {
            player: ['phaseZhunbeiBegin', 'phaseJudgeBegin', 'phaseDrawBegin', 'phaseUseBegin', 'phaseDiscardBegin', 'phaseJieshuBegin'],
        },
        forced: true,
        audio: 'dili_chigang',
        filter(event, player) {
            return event.getParent(2).skill != '乱码';
        },
        content() {
            trigger.cancel();
            var num = Math.random();
            if (num < 0.1) {
                var Q = 'phaseJudge';
            } else if (num < 0.5) {
                var Q = 'phaseDraw';
            } else if (num < 0.9) {
                var Q = 'phaseUse';
            } else {
                var Q = 'phaseDiscard';
            }
            event.next.remove(player[Q]());
            trigger.parent.next.push(player[Q]());
        },
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
        content() {
            'step 0';
            player.storage.镶星 += numberq1(trigger.num);
            if (player.storage.镶星 >= 3) {
                player.storage.镶星 -= 3;
                player.updateMarks();
                player.popup('镶星');
                game.log(player, '失去了一枚星');
            } else {
                player.updateMarks();
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
            for (var i = 0; i < 9; i++) {
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
        },
    },
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
            return event.getParent(2).name != '血莲' && event.getParent(3).name != '血莲';
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
                    player.useCard({ name: 'sha' }, E, false).card.Q = true;
                }
            }
        },
        ai: {
            maixie: true,
            unequip: true,
            skillTagFilter(player, tag, arg) {
                if (!arg || !arg.card || arg.card.Q != true) {
                    return false;
                }
            },
        },
    },
    矢北: {
        marktext: '矢北',
        mark: true,
        intro: {
            name: '矢北',
            content: '本回合已受伤#次',
        },
        round: 1,
        forced: true,
        trigger: {
            player: ['damage'],
        },
        content() {
            player.recover(13);
        },
        group: ['矢北_1', '矢北_2', '矢北_3', '矢北_4', '矢北_roundcount'],
        subSkill: {
            1: {
                forced: true,
                trigger: {
                    player: ['damageBegin4'],
                },
                content() {
                    if (!player.storage.矢北) {
                        player.storage.矢北 = 0;
                    }
                    player.storage.矢北++;
                    trigger.num = player.storage.矢北;
                },
            },
            2: {
                forced: true,
                trigger: {
                    player: ['recoverBegin'],
                },
                filter(event, player) {
                    return event.num > player.getDamagedHp();
                },
                content() {
                    player.gainMaxHp(trigger.num - player.getDamagedHp());
                },
            },
            3: {
                forced: true,
                trigger: {
                    player: ['changeHpEnd'],
                },
                filter(event, player) {
                    return player.hp < 4 && player.maxHp > 3;
                },
                content() {
                    player.loseMaxHp(player.maxHp - 3);
                },
            },
            4: {
                forced: true,
                trigger: {
                    global: ['phaseEnd'],
                },
                content() {
                    delete player.storage.矢北;
                },
            },
        },
    },
    渐营: {
        marktext: '渐营',
        mark: true,
        intro: {
            name: '渐营',
            content: '#',
        },
        round: 1,
        forced: true,
        trigger: {
            player: ['useCard1', 'respond1'],
        },
        filter(event, player) {
            if (!player.storage.渐营) {
                player.storage.渐营 = [];
            }
            return !player.storage.渐营.includes(event.card).number;
        },
        content() {
            if (!player.storage.渐营) {
                player.storage.渐营 = [];
            }
            player.storage.渐营.add(trigger.card).number;
        },
        group: ['渐营_1', '渐营_roundcount'],
        subSkill: {
            1: {
                forced: true,
                trigger: {
                    player: ['useCard2', 'respond2'],
                },
                filter(event, player) {
                    return player.storage.渐营.includes(event.card).number;
                },
                content() {
                    player.draw();
                },
            },
        },
    },
    星陨: {
        trigger: {
            player: ['phaseBegin'],
        },
        forced: true,
        content() {
            'step 0';
            var list = game.players;
            list.remove(player);
            list.sort(lib.sort.seat);
            var list2 = [];
            for (var i = 0; i < list.length; i++) {
                list2.push(0);
            }
            for (var i = 0; i < 9; i++) {
                list2[Math.floor(Math.random() * list2.length)]++;
            }
            event.list = list;
            event.list2 = list2;
            ('step 1');
            if (event.list.length) {
                var target = event.list.shift();
                target.damage(event.list2.shift(), 'thunder');
                player.line(target, 'thunder');
                event.redo();
            }
        },
    },
    自废: {
        enable: 'phaseUse',
        content() {
            'step 0';
            player.chooseControl(player.getSkills(null, false, false));
            ('step 1');
            player.RS(result.control);
        },
    },
    哪吒: {
        mod: {
            aiValue(player, card, num) {
                if (get.type(card) == 'equip') {
                    return 99;
                }
            },
            aiUseful(player, card, num) {
                if (get.type(card) == 'equip') {
                    return 99;
                }
            },
        },
        trigger: {
            player: 'useCardToPlayer',
        },
        marktext: '武',
        intro: {
            content: 'expansion',
            markcount: 'expansion',
        },
        forced: true,
        filter(event, player, card) {
            if (!get.info(event.card).skills) {
                return false;
            }
            return event.target == player && get.type(event.card) == 'equip';
        },
        content() {
            player.addToExpansion(trigger.cards, 'gain2').gaintag.add('哪吒');
            player.addAdditionalSkill('哪吒' + Math.random(), get.info(trigger.card).skills, true);
        },
        ai: {
            effect: {
                player(card, player) {
                    if (get.type(card) == 'equip') {
                        return [3, 3];
                    }
                },
            },
        },
    },
    奇兵: {
        trigger: {
            global: 'phaseEnd',
        },
        forced: true,
        content() {
            player.draw();
            player.chooseToUse(
                function (card, player, event) {
                    return lib.filter.cardEnabled.apply(this, arguments);
                },
                '使用一张牌',
                false
            );
        },
    },
    遁世: {
        enable: ['chooseToUse', 'chooseToRespond'],
        usable: 1,
        audio: 'dunshi',
        filter(event, player) {
            if (event.type == 'wuxie') {
                return false;
            }
            for (const i of ['sha', 'shan', 'tao', 'jiu']) {
                var card = { name: i };
                if (event.filterCard(card, player, event)) {
                    return true;
                }
            }
            return false;
        },
        chooseButton: {
            dialog(event, player) {
                var list = [];
                for (const i of ['sha', 'shan', 'tao', 'jiu']) {
                    list.push(['基本', '', i]);
                }
                return ui.create.dialog('遁世', [list, 'vcard'], 'hidden');
            },
            filter(button, player) {
                var evt = _status.event.parent;
                return evt.filterCard({ name: button.link[2] }, player, evt);
            },
            check(button) {
                const num = _status.event.player.getUseValue({
                    name: button.link[2],
                    nature: button.link[3],
                }, null, true);
                return number0(num) / 2 + 10;
            },
            backup(links, player) {
                return {
                    audio: 'dunshi',
                    filterCard() {
                        return false;
                    },
                    popname: true,
                    viewAs: {
                        name: links[0][2],
                        nature: links[0][3],
                        suit: links[0][0],
                        number: links[0][1],
                    },
                    selectCard: -1,
                    precontent() {
                        'step 0';
                        var skill = Object.keys(lib.skill).filter((i) => {
                            return lib.translate[i + '_info'] && /仁|义|礼|智|信/.test(get.translation(i));
                        });
                        var list = skill
                            .filter(function (i) {
                                return !player.hasSkill(i, null, null, false);
                            })
                            .randomGets(3);
                        player.chooseControl(list).set('ai', function () {
                            var C = _status.event.controls;
                            if (C.includes('cslilu')) {
                                return 'cslilu';
                            }
                            return C[0];
                        });
                        ('step 1');
                        player.addSkillLog(result.control);
                    },
                };
            },
            prompt(links, player) {
                return `选择【${get.translation(links[0][2])}】的目标`;
            },
        },
        ai: {
            respondSha: true,
            respondShan: true,
            skillTagFilter(player, tag, arg) {
                if (player.getStat('skill').遁世) {
                    return false;
                }
                switch (tag) {
                    case 'respondSha':
                        return true;
                    case 'respondShan':
                        return true;
                    case 'save':
                        return true;
                }
            },
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
    夺锐属性: {
        audio: 'drlt_duorui',
        trigger: {
            player: 'useCardToPlayered',
        },
        usable: 1,
        filter(event, player) {
            if (event.target == player) {
                return false;
            }
            return event.target.isEnemiesOf(player);
        },
        forced: true,
        logTarget: 'target',
        content() {
            var Q = ['体力上限', '手牌上限', '攻击范围', '摸牌数', '出杀数'].randomGet();
            if (!player.storage.夺锐属性_1) {
                player.storage.夺锐属性_1 = {
                    maxHandcard: 0,
                    attackRange: 0,
                    drawNum: 0,
                    shaUsable: 0,
                };
            }
            if (!trigger.target.storage.夺锐属性_2) {
                trigger.target.storage.夺锐属性_2 = {
                    maxHandcard: 0,
                    attackRange: 0,
                    drawNum: 0,
                    shaUsable: 0,
                };
            }
            if (Q == '体力上限') {
                trigger.target.loseMaxHp();
                player.gainMaxHp();
            }
            if (Q == '手牌上限') {
                player.storage.夺锐属性_1.maxHandcard++;
                trigger.target.storage.夺锐属性_2.maxHandcard++;
            }
            if (Q == '攻击范围') {
                player.storage.夺锐属性_1.attackRange++;
                trigger.target.storage.夺锐属性_2.attackRange++;
            }
            if (Q == '摸牌数') {
                player.storage.夺锐属性_1.drawNum++;
                trigger.target.storage.夺锐属性_2.drawNum++;
            }
            if (Q == '出杀数') {
                player.storage.夺锐属性_1.shaUsable++;
                trigger.target.storage.夺锐属性_2.shaUsable++;
            }
            trigger.target.addSkill('夺锐属性_2');
            game.log(player, '获得了', trigger.target, `的一点#g基础属性(${get.translation(Q)})`);
        },
        group: '夺锐属性_1',
        subSkill: {
            1: {
                trigger: {
                    player: 'phaseDrawBegin2',
                },
                forced: true,
                filter(event, player) {
                    if (!player.storage.夺锐属性_1) {
                        return false;
                    }
                    var info = player.storage.夺锐属性_1;
                    return info.drawNum > 0 && !event.numFixed;
                },
                content() {
                    trigger.num += player.storage.夺锐属性_1.drawNum;
                },
                mod: {
                    maxHandcard(player, num) {
                        if (player.storage.夺锐属性_1) {
                            return (num += player.storage.夺锐属性_1.maxHandcard);
                        }
                    },
                    attackRange(player, num) {
                        if (player.storage.夺锐属性_1) {
                            return (num += player.storage.夺锐属性_1.attackRange);
                        }
                    },
                    cardUsable(card, player, num) {
                        if (player.storage.夺锐属性_1 && card.name == 'sha') {
                            return (num += player.storage.夺锐属性_1.shaUsable);
                        }
                    },
                },
            },
            2: {
                mark: true,
                marktext: '被夺锐',
                intro: {
                    name: '被夺锐',
                    content(storage, player) {
                        var info = player.storage.夺锐属性_2;
                        var str = '已被夺锐的基础属性:';
                        if (info.maxHandcard > 0) {
                            str += '<br>手牌上限-' + get.translation(info.maxHandcard);
                        }
                        if (info.attackRange > 0) {
                            str += '<br>攻击范围-' + get.translation(info.attackRange);
                        }
                        if (info.drawNum > 0) {
                            str += '<br>摸牌阶段的额定摸牌数-' + get.translation(info.drawNum);
                        }
                        if (info.shaUsable > 0) {
                            str += '<br>使用【杀】的次数-' + get.translation(info.shaUsable);
                        }
                        return str;
                    },
                },
                trigger: {
                    player: 'phaseDrawBegin2',
                },
                forced: true,
                filter(event, player) {
                    var info = player.storage.夺锐属性_2;
                    return info.drawNum > 0 && !event.numFixed;
                },
                content() {
                    trigger.num -= player.storage.夺锐属性_2.drawNum;
                },
                mod: {
                    maxHandcard(player, num) {
                        return (num -= player.storage.夺锐属性_2.maxHandcard);
                    },
                    attackRange(player, num) {
                        return (num -= player.storage.夺锐属性_2.attackRange);
                    },
                    cardUsable(card, player, num) {
                        if (card.name == 'sha') {
                            return (num -= player.storage.夺锐属性_2.shaUsable);
                        }
                    },
                },
            },
        },
        mark: true,
        marktext: '夺锐',
        intro: {
            name: '夺锐',
            content(storage, player) {
                if (player.storage.夺锐属性_1) {
                    var storage = player.storage.夺锐属性_1;
                    var str = '已夺锐基础属性:';
                    if (storage.maxHandcard > 0) {
                        str += '<br>手牌上限+' + get.translation(storage.maxHandcard);
                    }
                    if (storage.attackRange > 0) {
                        str += '<br>攻击范围+' + get.translation(storage.attackRange);
                    }
                    if (storage.drawNum > 0) {
                        str += '<br>摸牌阶段的额定摸牌数+' + get.translation(storage.drawNum);
                    }
                    if (storage.shaUsable > 0) {
                        str += '<br>使用【杀】的次数+' + get.translation(storage.shaUsable);
                    }
                } else {
                    var str = '暂未夺锐基础属性';
                }
                return str;
            },
        },
    },
    摸与杀: {
        trigger: {
            global: ['phaseBefore'],
        },
        forced: true,
        content() {
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
                            current.updateMarks();
                        }
                    });
                },
            },
        },
    },
    娴婉: {
        hiddenCard(player, name) {
            return get.type(name) == 'basic' && game.hasPlayer((Q) => !Q.isLinked());
        },
        enable: ['chooseToUse', 'chooseToRespond'],
        filter(event, player) {
            return game.qcard(player, 'basic').length && game.hasPlayer((Q) => !Q.isLinked());
        },
        chooseButton: {
            dialog(event, player) {
                return ui.create.dialog('娴婉', [game.qcard(player, 'basic'), 'vcard'], 'hidden');
            },
            check(button, buttons) {
                const player = _status.event.player;
                const num = player.getUseValue(
                    {
                        name: button.link[2],
                        nature: button.link[3],
                    },
                    null,
                    true
                ); //null是距离限制//true是用牌次数限制
                if (button.link[2] == 'QQQ_灵芝' && player.maxHp < 20) {
                    return number0(num) * 2 + 10;
                }
                if (button.link[3] == 'kami') {
                    return number0(num) + 10;
                } //神杀优先无脑提高会导致出杀默认神杀,碰到对神杀高收益的就会卡死
                return number0(num) / 2 + 10; //不加这行会出现有button返回undefined导致无法判断直接结束回合
                //有些高手写的卡牌返回NAN也会导致无法判断,所以用 Number
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
                        storage: { [_status.event.buttoned]: true },
                    },
                    ignoreMod: true,
                    precontent() {
                        game.log('#g【娴婉】', event.result.card);
                        player.popup(event.result.card, 'thunder');
                        var E = game.players
                            .filter((Q) => {
                                return !Q.isLinked();
                            })
                            .randomGet();
                        player.line(E, 'green');
                        E.link();
                    },
                };
            },
            prompt(links, player) {
                return '将一名角色武将牌横置并视为使用基本牌';
            },
        },
        ai: {
            order: 99,
            //无脑用牌: true,
            respondShan: true,
            respondSha: true,
            save: true,
            basic: {
                useful: 99,
                value: 99,
            },
            result: {
                player(player) {
                    if (_status.event.dying) {
                        return get.attitude(player, _status.event.dying);
                    }
                    return 10;
                },
            },
            effect: {
                player(card, player, target) {
                    if (card.name == 'sha') {
                        return [0, 2, 0, -2];
                    }
                },
            },
        },
        group: ['娴婉_1'],
        subSkill: {
            1: {
                hiddenCard(player, name) {
                    return get.type(name) == 'trick' && game.hasPlayer((Q) => Q.isLinked());
                },
                enable: ['chooseToUse', 'chooseToRespond'],
                filter(event, player) {
                    return game.qcard(player, 'trick').length && game.hasPlayer((Q) => Q.isLinked());
                },
                chooseButton: {
                    dialog(event, player) {
                        return ui.create.dialog('娴婉', [game.qcard(player, 'trick'), 'vcard']);
                    },
                    check(button, buttons) {
                        // if (buttons) {
                        //     const qqq = {};
                        //     for (const i of buttons) {
                        //         qqq[i.link[2]] = Math.ceil(_status.event.player.getUseValue({ name: i.link[2] }, null, true));
                        //     }
                        //     console.log(qqq);
                        // }
                        const player = _status.event.player;
                        const num = player.getUseValue(
                            {
                                name: button.link[2],
                                nature: button.link[3],
                            },
                            null,
                            true
                        );
                        if (button.link[2] == 'juedou' && player.hp > player.maxHp / 2) {
                            return number0(num) * 8 + 10;
                        }
                        if (button.link[2] == 'shunshou') {
                            return number0(num) * 2 + 10;
                        }
                        return number0(num) / 2 + 10;
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
                            precontent() {
                                game.log('#g【娴婉】', event.result.card);
                                player.popup(event.result.card, 'thunder');
                                var E = game.players
                                    .filter((Q) => {
                                        return Q.isLinked();
                                    })
                                    .randomGet();
                                player.line(E, 'green');
                                E.link();
                            },
                        };
                    },
                    prompt(links, player) {
                        return '将一名角色武将牌重置并视为使用锦囊牌';
                    },
                },
                ai: {
                    order: 50,
                    effect: {
                        player(card, player, target) {
                            if (card.name == 'juedou' && player.hp > 2) {
                                return [0, 3, 1, -3];
                            }
                        },
                    },
                    result: {
                        player(player) {
                            return 10;
                        },
                    },
                },
            },
        },
    },
    //①游戏开始时,你随机获得两张未加入游戏的武将牌(称为<幻身>),第一个<幻身>固定为孙策.回合开始与结束时,你弃置任意张<幻身>并获得双倍<幻身>,每弃置一张<幻身>,增加一点体力上限和3点护甲,并获得一张<幻身>上的所有技能.你每次受到和造成伤害时,获得伤害值2倍的<幻身>
    QQQ_huanshen: {
        //①游戏开始时,你随机获得十张未加入游戏的武将牌(均称为<幻身>),第一个<幻身>固定为孙策
        init(player, skill) {
            _status.characterlist = Object.keys(lib.character);
            player.storage.QQQ_huanshen = _status.characterlist.randomGets(2);
            if (lib.character.sunce) {
                player.storage.QQQ_huanshen[0] = 'sunce';
            }
            player.addAdditionalSkill('QQQ_huanshen', lib.character[player.storage.QQQ_huanshen[0]].skills);
        },
        intro: {
            mark(dialog, storage, player) {
                if (storage.length) {
                    dialog.addSmall([storage, 'character']);
                } else {
                    return '没有<幻身>';
                }
            },
            content(storage, _player) {
                return '共有' + storage.length + '张<幻身>';
            },
            markcount(storage, _player) {
                return storage.length;
            },
        },
        audio: 'ext:温柔一刀/audio:2',
        mark: true,
        superCharlotte: true,
        charlotte: true,
        fixed: true,
        forced: true,
        _priority: Infinity,
        trigger: {
            player: ['phaseBefore', 'phaseAfter'],
        },
        filter(_event, player, name) {
            return player.storage.QQQ_huanshen?.length;
        },
        async content(event, trigger, player) {
            const { result: { links } } = await player.chooseButton(['弃置任意张<幻身>', [player.storage.QQQ_huanshen, 'character']], true, [1, player.storage.QQQ_huanshen.length])
                .set('ai', (button) => Math.random() - 0.5);
            if (links && links[0]) {
                let num = links.length;
                game.log(`<span class="greentext">${get.translation(player)}弃置了<幻身>${get.translation(links)}</span>`);
                player.storage.QQQ_huanshen.removeArray(links);
                player.storage.QQQ_huanshen.addArray(_status.characterlist.randomGets(num * 2));
                while (num-- > 0) {
                    player.gainMaxHp();
                    player.changeHujia(3);
                    const { result: { links: links1 } } = await player.chooseButton(['获得一张<幻身>上的所有技能', [player.storage.QQQ_huanshen, 'character']], true)
                        .set('filterButton', (button) => lib.character[button.link].skills.some((q) => !player.hasSkill(q)))
                        .set('ai', (button) => Math.random());
                    if (links1 && links1[0]) {
                        player.addAdditionalSkill('QQQ_huanshen', lib.character[links1[0]].skills, true);
                    }
                }
            }
        },
        group: ['QQQ_huanshen_1'],
        subSkill: {
            1: {
                trigger: {
                    player: ['damageBefore'],
                    source: ['damageBefore'],
                },
                audio: 'ext:温柔一刀/audio:2',
                superCharlotte: true,
                charlotte: true,
                fixed: true,
                forced: true,
                _priority: Infinity,
                async content(event, trigger, player) {
                    player.storage.QQQ_huanshen.addArray(_status.characterlist.randomGets(trigger.num * 2));
                },
            }
        }
    },
    诱言: {
        forced: true,
        trigger: {
            player: ['loseAfter'],
        },
        filter(event, player) {
            if (!event.cards.length) {
                return false;
            }
            return !player.hasSkill('诱言_1', null, null, false);
        },
        content() {
            player.addTempSkill('诱言_1', ['phaseZhunbeiAfter', 'phaseJudgeAfter', 'phaseDrawAfter', 'phaseUseAfter', 'phaseDiscardAfter', 'phaseJieshuAfter']);
            var Q = [];
            var list = [];
            for (const i of trigger.cards) {
                list.add(i.suit);
            }
            for (const i of lib.suits) {
                if (list.includes(i)) {
                    continue;
                }
                var card = get.cardPile2(function (card) {
                    return card.suit == i;
                });
                if (card) {
                    Q.push(card);
                }
            }
            if (Q.length) {
                player.gain(Q, 'gain2');
            }
        },
        ai: {
            effect: {
                player_use(card, player, target) {
                    if (typeof card == 'object' && player.needsToDiscard() == 1 && card.cards && card.cards.filter((i) => get.position(i) == 'h').length) {
                        return 'zeroplayertarget';
                    }
                },
            },
        },
        subSkill: {
            1: {
                charlotte: true,
            },
        },
    },
    宗祚: {
        trigger: {
            global: ['gameDrawBefore'],
        },
        forced: true,
        audio: 'zongzuo',
        content() {
            'step 0';
            player.gainMaxHp(game.countGroup());
            ('step 1');
            player.recover(game.countGroup());
        },
        group: ['宗祚_1'],
        subSkill: {
            1: {
                trigger: {
                    global: 'dieAfter',
                },
                forced: true,
                audio: 'zongzuo',
                filter(event, player) {
                    if (!lib.group.includes(event.player.group)) {
                        return false;
                    }
                    if (
                        game.hasPlayer(function (current) {
                            return current.group == event.player.group;
                        })
                    ) {
                        return false;
                    }
                    return player.maxHp > 3;
                },
                content() {
                    player.loseMaxHp(2);
                },
            },
        },
    },
    while: {
        trigger: {
            player: ['changeHp'],
            source: 'damageSource',
            global: 'roundStart',
        },
        usable: 1, //QQQ
        forced: true,
        content() {
            let count = numberq1(trigger.num);
            while (count-- > 0) {
                player.draw();
            }
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
        skillAnimation: true,
        animationColor: 'wood',
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
                    target: 'useCardToTargeted',
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
                        .chooseToUse((card) => lib.filter.filterCard(card, player, event.getParent(2)) && card.name == 'sha', `对${get.translation(trigger.player)}使用一张杀,使${trigger.card}无效`) //QQQ
                        .set('logSkill', '破釜_1')
                        .set('complexSelect', true)
                        .set('filterTarget', function (card, player, target) {
                            if (target != _status.event.sourcex && !ui.selected.targets.includes(_status.event.sourcex)) {
                                return false;
                            }
                            return lib.filter.targetEnabled.apply(this, arguments);
                        })
                        .set('sourcex', trigger.player);
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
            return game.qcard(player, false, true, false).some((q) => player.countCards('he', (i) => get.cardNameLength(i) == get.cardNameLength(q[2])));
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
                list = game.qcard(player, false, true, false).filter((q) => player.countCards('he', (i) => get.cardNameLength(i) == get.cardNameLength(q[2])));
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
                        if (evt.name == '_wuxie') {
                            return -get.attitude(player, evt.getParent('useCard').player);
                        }
                        const num = player.getUseValue(
                            {
                                name: button.link[2],
                                nature: button.link[3],
                            },
                            null,
                            true
                        );
                        if (['wuzhong', 'dongzhuxianji'].includes(button.link[2])) return number0(num) * 2 + 10;
                        if (['blood', 'kami'].includes(button.link[3])) return number0(num) + 10;
                        return number0(num) / 2 + 10;
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
            respondTao: true,
            respondwuxie: true,
            respondSha: true,
            respondShan: true,
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
    //①当你使用牌指定目标后,你可将目标的一张牌置于你的武将牌上作为<嫕>.②与<嫕>花色相同的牌不占用你手牌上限且无距离次数限制.③每回合结束后或当你体力值变化后,你获得一张<嫕>
    QQQ_wanyi: {
        audio: 'wanyi',
        trigger: {
            player: ['useCardToBefore'],
        },
        filter(event, player) {
            return event.target && event.target != player && event.target.countCards('he');
        },
        forced: true,
        async content(event, trigger, player) {
            const { result } = await player.choosePlayerCard(trigger.target, true, 'he');
            if (result?.links?.length) {
                player.addToExpansion(result.links, trigger.target, 'give').gaintag.add('QQQ_wanyi');
            }
        },
        mod: {
            cardUsable(card, player, num) {
                if (player.getExpansions('QQQ_wanyi').some((q) => q.suit == card.suit)) {
                    return Infinity;
                }
            },
            targetInRange(card, player) {
                if (player.getExpansions('QQQ_wanyi').some((q) => q.suit == card.suit)) {
                    return true;
                }
            },
            ignoredHandcard(card, player) {
                if (player.getExpansions('QQQ_wanyi').some((q) => q.suit == card.suit)) {
                    return true;
                }
            },
        },
        marktext: '嫕',
        intro: {
            markcount: 'expansion',
            content: 'expansion',
        },
        group: ['QQQ_wanyi_1'],
        subSkill: {
            1: {
                audio: 'wanyi',
                trigger: {
                    global: ['phaseAfter'],
                    player: ['changeHp'],
                },
                forced: true,
                filter(event, player) {
                    return player.getExpansions('QQQ_wanyi').length > 0;
                },
                async content(event, trigger, player) {
                    const {
                        result: { links },
                    } = await player.chooseButton(['获得一张<嫕>', player.getExpansions('QQQ_wanyi')], true);
                    if (links && links[0]) {
                        player.gain(links, player, 'give');
                    }
                },
            },
        },
    },
    埋祸: {
        trigger: {
            target: 'useCardToTargeted',
        },
        logTarget: 'player',
        filter(event, player) {
            return event.getParent(2).name != '埋祸_1' && event.cards.filterInD().length && event.player.isIn() && event.player != player;
        },
        prompt2(event) {
            return `令${get.translation(event.card)}暂时对你无效`;
        },
        check(event, player) {
            return get.effect(player, event.card, event.player, player) < 0;
        },
        content() {
            trigger.excluded.add(player);
            var target = trigger.player,
                cards = trigger.cards.filterInD();
            target.addToExpansion('gain2', cards).gaintag.add('埋祸_1');
            target.storage.埋祸_target = player;
            target.addSkill('埋祸_1');
        },
        group: '埋祸_2',
        subSkill: {
            1: {
                trigger: {
                    player: 'phaseUseBegin',
                },
                forced: true,
                charlotte: true,
                filter(event, player) {
                    return player.getExpansions('埋祸_1').length;
                },
                content() {
                    'step 0';
                    var Q = Math.ceil(player.getExpansions('埋祸_1').length / 2);
                    var E = Array.from(player.getExpansions('埋祸_1')).slice(0, Q);
                    player.loseToDiscardpile(E);
                    ('step 1');
                    var target = player.storage.埋祸_target;
                    for (const i of player.getExpansions('埋祸_1')) {
                        if (target.isIn() && player.canUse(i, target, null, true)) {
                            player.useCard(i, target);
                        }
                    }
                    ('step 2');
                    player.removeSkill('埋祸_1');
                },
                marktext: '祸',
                intro: {
                    content: 'expansion',
                    markcount: 'expansion',
                },
                onremove(player, skill) {
                    var cards = player.getExpansions(skill);
                    if (cards.length) {
                        player.loseToDiscardpile(cards);
                    }
                },
            },
            2: {
                trigger: {
                    player: 'useCardToTargeted',
                },
                forced: true,
                filter(event, player) {
                    return event.target.hasSkill('埋祸_1') && event.target.getExpansions('埋祸_1').length;
                },
                content() {
                    trigger.target.loseToDiscardpile(trigger.target.getExpansions('埋祸_1')[0]);
                },
            },
        },
    },
    忍戒: {
        audio: 'renjie2',
        trigger: {
            player: ['changeHp', 'loseAfter'],
        },
        filter(event, player) {
            if (event.name == 'changeHp') {
                return true;
            }
            if (event.getParent('phaseUse').name && _status.currentPhase == player) {
                return false;
            }
            return true;
        },
        forced: true,
        intro: {
            name2: '忍',
            content: 'mark',
        },
        async content(event, trigger, player) {
            const num = trigger.num ? numberq1(trigger.num) : (trigger.cards ? trigger.cards.length : 1);
            player.addMark('忍戒', num);
            if (player.countMark('忍戒') > 3 && !player.hasSkill('极略')) {
                player.gainMaxHp();
                player.recover(2);
                player.draw(2);
                player.addSkill('极略');
            }
        },
    },
    极略: {
        group: ['极略_guicai', '极略_fangzhu', '极略_wansha', '极略_zhiheng'],
        subSkill: {
            guicai: {
                trigger: {
                    global: 'judge',
                },
                forced: true,
                filter(event, player) {
                    return player.countCards('hes') > 0 && player.hasMark('忍戒');
                },
                content() {
                    'step 0';
                    player.chooseCard('是否弃置一枚<忍>,并发动〖鬼才〗？', 'hes', function (card) {
                        var player = _status.event.player;
                        var mod2 = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
                        if (mod2 != 'unchanged') {
                            return mod2;
                        }
                        var mod = game.checkMod(card, player, 'unchanged', 'cardRespondable', player);
                        if (mod != 'unchanged') {
                            return mod;
                        }
                        return true;
                    }).ai = function (card) {
                        var trigger = _status.event.parent._trigger;
                        var player = _status.event.player;
                        var result = trigger.judge(card) - trigger.judge(trigger.player.judging[0]);
                        var attitude = get.attitude(player, trigger.player);
                        if (attitude == 0 || result == 0) {
                            return 0;
                        }
                        if (attitude > 0) {
                            return result - get.value(card) / 2;
                        } else {
                            return -result - get.value(card) / 2;
                        }
                    };
                    ('step 1');
                    if (result.bool) {
                        player.respond(result.cards, 'highlight', 'jilue_guicai', 'noOrdering');
                    } else {
                        event.finish();
                    }
                    ('step 2');
                    if (result.bool) {
                        player.removeMark('忍戒', 1);
                        if (trigger.player.judging[0].clone) {
                            trigger.player.judging[0].clone.delete();
                            game.addVideo('deletenode', player, get.cardsInfo([trigger.player.judging[0].clone]));
                        }
                        game.cardsDiscard(trigger.player.judging[0]);
                        trigger.player.judging[0] = result.cards[0];
                        trigger.orderingCards.addArray(result.cards);
                        game.log(trigger.player, '的判定牌改为', result.cards[0]);
                    }
                },
            },
            fangzhu: {
                trigger: {
                    player: 'damageEnd',
                },
                forced: true,
                filter(event, player) {
                    return player.hasMark('忍戒');
                },
                content() {
                    'step 0';
                    player
                        .chooseTarget('是否弃置一枚<忍>,并发动【放逐】？', function (card, player, target) {
                            return player != target;
                        })
                        .set('ai', (target) => {
                            if (target.hasSkillTag('noturn')) {
                                return 0;
                            }
                            var player = _status.event.player;
                            var current = _status.currentPhase;
                            var dis = current ? get.distance(current, target, 'absolute') : 1;
                            var draw = player.getDamagedHp();
                            var att = get.attitude(player, target);
                            if (att == 0) {
                                return target.hasJudge('lebu') ? Math.random() / 3 : Math.sqrt(get.threaten(target)) / 5 + Math.random() / 2;
                            }
                            if (att > 0) {
                                if (target.isTurnedOver()) {
                                    return att + draw;
                                }
                                if (draw < 4) {
                                    return -1;
                                }
                                if (current && target.getSeatNum() > current.getSeatNum()) {
                                    return att + draw / 3;
                                }
                                return (10 * Math.sqrt(Math.max(0.01, get.threaten(target)))) / (3.5 - draw) + dis / (2 * game.countPlayer());
                            } else {
                                if (target.isTurnedOver()) {
                                    return att - draw;
                                }
                                if (draw >= 5) {
                                    return -1;
                                }
                                if (current && target.getSeatNum() <= current.getSeatNum()) {
                                    return -att + draw / 3;
                                }
                                return (4.25 - draw) * 10 * Math.sqrt(Math.max(0.01, get.threaten(target))) + (2 * game.countPlayer()) / dis;
                            }
                        });
                    ('step 1');
                    if (result.bool) {
                        player.removeMark('忍戒', 1);
                        result.targets[0].draw(player.maxHp - player.hp);
                        result.targets[0].turnOver();
                    }
                },
            },
            wansha: {
                audio: 'wansha',
                audioname: ['shen_simayi'],
                enable: 'phaseUse',
                usable: 1,
                filter(event, player) {
                    return player.hasMark('忍戒');
                },
                async content(event, trigger, player) {
                    player.removeMark('忍戒', 1);
                    player.addTempSkill('rewansha');
                },
                ai: {
                    order(name, player) {
                        if (player.getEnemies().length > 1 && player.getEnemies().some((q) => q.hp < 2)) {
                            return 1;
                        }
                        return 0;
                    },
                    result: {
                        player(player, target, card) {//主动技是否发动
                            if (player.getEnemies().length > 1 && player.getEnemies().some((q) => q.hp < 2)) {
                                return 1;
                            }
                        },
                    },
                },
            },
            zhiheng: {
                mod: {
                    aiOrder(player, card, num) {
                        if (num <= 0 || get.itemtype(card) != 'card' || get.type(card) != 'equip') {
                            return num;
                        }
                        let eq = player.getEquip(get.subtype(card));
                        if (eq && get.equipValue(card) - get.equipValue(eq) < Math.max(1.2, 6 - player.hp)) {
                            return 0;
                        }
                    },
                },
                enable: 'phaseUse',
                filter(event, player) {
                    return player.hasMark('忍戒');
                },
                position: 'he',
                filterCard(card, player, event) {
                    event = event || _status.event;
                    if (typeof event != 'string') {
                        event = event.parent.name;
                    }
                    var mod = game.checkMod(card, player, event, 'unchanged', 'cardDiscardable', player);
                    if (mod != 'unchanged') {
                        return mod;
                    }
                    return true;
                },
                discard: false,
                lose: false,
                delay: false,
                selectCard: [1, Infinity],
                prompt: '弃置一枚<忍>,然后弃置任意张牌并摸等量的牌.若弃置了所有的手牌,则可以多摸一张牌',
                check(card) {
                    if (get.position(card) == 'h') {
                        return 999 - get.value(card);
                    }
                    return 6 - get.value(card);
                },
                content() {
                    'step 0';
                    player.removeMark('忍戒', 1);
                    player.discard(cards);
                    event.num = 1;
                    var hs = player.getCards('h');
                    if (!hs.length) {
                        event.num = 0;
                    }
                    for (var i = 0; i < hs.length; i++) {
                        if (!cards.includes(hs[i])) {
                            event.num = 0;
                            break;
                        }
                    }
                    ('step 1');
                    player.draw(event.num + cards.length);
                },
                ai: {
                    order(name, player) {
                        if (player.countCards('h') == 1 && player.countMark('忍戒') > 0) {
                            return 99;
                        }
                        return 1;
                    },
                    result: {
                        player: 1,
                    },
                    nokeep: true,
                    skillTagFilter(player, tag, arg) {
                        if (tag === 'nokeep') {
                            return player.isPhaseUsing() && !player.getStat().skill.jilue_zhiheng && player.hasCard((card) => card.name !== 'tao', 'h');
                        }
                    },
                },
            },
        },
    },
    QQQ_xianshu: {
        trigger: {
            player: ['dying'],
        },
        forced: true,
        content() {
            'step 0';
            var T = [];
            var E = Array.from(ui.cardPile.childNodes);
            game.countPlayer(function (current) {
                E.addArray(current.getCards('hej'));
            });
            for (const i of E) {
                if (i.name == 'tao' || i.name == 'jiu') {
                    T.push(i);
                }
            }
            if (T.length) {
                var A = T.randomGet();
                player.gain(A, true);
                player.useCard(A, player, false);
            } else {
                event.finish();
            }
            ('step 1');
            if (player.hp < 1) {
                event.goto(0);
            }
        },
    },
    龙威: {
        enable: ['chooseToUse', 'chooseToRespond'],
        filter(event, player) {
            return game.qcard(player, 'basic').length && player.countCards('hes', { type: 'basic' });
        },
        hiddenCard(player, name) {
            return lib.card[name].type == 'basic' && player.countCards('hes', { type: 'basic' });
        },
        chooseButton: {
            dialog(event, player) {
                return ui.create.dialog('龙威', [game.qcard(player, 'basic'), 'vcard'], 'hidden');
            },
            check(button) {
                const num = _status.event.player.getUseValue({
                    name: button.link[2],
                    nature: button.link[3],
                }, null, true);
                return number0(num) / 2 + 10;
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
                    precontent() {
                        game.log('#g【龙威】', event.result.card);
                        player.popup(event.result.card, 'thunder');
                        player.draw();
                    },
                };
            },
            prompt(links, player) {
                return '将一张基本牌当作基本牌使用或打出,然后摸一张牌';
            },
        },
        ai: {
            order: 99,
            respondShan: true,
            respondSha: true,
            save: true,
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
                    return game.qcard(player, 'trick').length && player.countCards('hes', { type: 'trick' });
                },
                chooseButton: {
                    dialog(event, player) {
                        return ui.create.dialog('龙威', [game.qcard(player, 'trick'), 'vcard']);
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
                        return number0(num) / 2 + 10;
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
                            precontent() {
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
    彭羕: {
        mod: {
            wuxieJudgeEnabled: () => false,
            wuxieEnabled: () => false,
            cardUsable() {
                return Infinity;
            },
            targetInRange() {
                return true;
            },
        },
        enable: ['chooseToUse', 'chooseToRespond'],
        hiddenCard(player, name) {
            if (lib.inpile.includes(name)) {
                return true;
            }
        },
        filter(event, player) {
            return game.qcard(player)[0];
        },
        delay: false,
        content() {
            'step 0';
            var evt = event.getParent(2);
            evt.set('彭羕', true);
            var cards = get.bottomCards(3, true);
            player
                .chooseButton(['彭羕:选择要使用的牌', cards])
                .set('filterButton', function (button) {
                    return _status.event.cards.includes(button.link);
                })
                .set(
                    'cards',
                    cards.filter(function (card) {
                        return evt.filterCard(card, evt.player, evt);
                    })
                )
                .set('ai', function (button) {
                    return 1;
                });
            ('step 1');
            var evt = event.getParent(2);
            if (result.bool && result.links && result.links.length) {
                var card = result.links[0];
                var name = card.name;
                if (evt.name == 'chooseToUse') {
                    game.broadcastAll(
                        function (result, name) {
                            lib.skill.彭羕_1.viewAs = { name: name, cards: [result] };
                        },
                        card,
                        name
                    );
                    evt.set('_backupevent', '彭羕_1');
                    evt.set('openskilldialog', `请选择${get.translation(card)}的目标`);
                    evt.backup('彭羕_1');
                } else {
                    evt.result.card = result.links[0];
                    evt.result.cards = [result.links[0]];
                    evt.redo();
                    return;
                }
            }
            evt.goto(0);
        },
        ai: {
            effect: {
                target(card, player, target, effect) {
                    if (get.tag(card, 'respondShan')) {
                        return 0.7;
                    }
                    if (get.tag(card, 'respondSha')) {
                        return 0.7;
                    }
                },
                player(card, player, target, current) {
                    if (card.name != 'wugu') {
                        return [1, 10];
                    }
                },
            },
            order: 12,
            respondShan: true,
            respondSha: true,
            result: {
                player(player) {
                    if (_status.event.dying) {
                        return get.attitude(player, _status.event.dying);
                    }
                    return 1;
                },
            },
        },
        group: ['彭羕_2'],
        subSkill: {
            1: {
                sourceSkill: '彭羕',
                precontent() {
                    var name = event.result.card.name,
                        cards = event.result.card.cards.slice(0);
                    event.result.cards = cards;
                    var rcard = cards[0],
                        card;
                    if (rcard.name == name) {
                        card = rcard;
                    } else {
                        card = { name };
                    }
                    event.result.card = card;
                },
                filterCard() {
                    return false;
                },
                selectCard: -1,
            },
            2: {
                audioname: ['ol_pengyang'],
                trigger: {
                    player: 'drawBegin',
                },
                forced: true,
                content() {
                    trigger.bottom = true;
                },
            },
        },
    },
    缓图: {
        trigger: {
            global: 'phaseDrawBegin2',
        },
        check(event, player) {
            return (event.player.isEnemiesOf(player) && event.num > 2) || (event.player.isFriendsOf(player) && event.num < 2);
        },
        content() {
            game.log(trigger.player, '跳过摸牌');
            trigger.player.draw(2);
            trigger.cancel();
        },
        group: ['缓图_1', '缓图_2'],
    },
    缓图_1: {
        mod: {
            aiEV(card) {
                //QQQ
                if (card.name == 'zhuge') {
                    return 1;
                }
                if (card.name == 'bagua') {
                    return 96;
                }
                if (card.name == 'tengjia') {
                    return 97;
                }
                if (card.name == 'qimenbagua') {
                    return 98;
                }
            },
        },
        trigger: {
            global: 'phaseUseBefore',
        },
        check(event, player) {
            return get.attitude(player, event.player) < 0;
        },
        content() {
            'step 0';
            game.log(trigger.player, '#g【跳过出牌】');
            trigger.cancel();
            ('step 1');
            trigger.player.chooseUseTarget({ name: 'sha' }, '是否视为使用一张【杀】？', true, false, 'nodistance');
        },
    },
    缓图_2: {
        trigger: {
            global: 'phaseDiscardBegin',
        },
        check(event, player) {
            game.log(event.player.needsToDiscard());
            return (event.player.isEnemiesOf(player) && event.player.needsToDiscard() < 2) || (event.player.isFriendsOf(player) && event.player.needsToDiscard() > 2);
        },
        content() {
            game.log(trigger.player, '跳过弃牌');
            trigger.player.chooseToDiscard('he', true, 2);
            trigger.cancel();
        },
    },
    革命: {
        trigger: {
            global: 'useCardToTargeted',
        },
        filter(event, player) {
            if (
                player.countCards('hes', function (i) {
                    return get.color(i) != get.color(event.card);
                }) < 1
            ) {
                return false;
            }
            return event.player != player && ['basic', 'trick'].includes(get.type(event.card)) && (event.target != player) & (event.targets.length == 1);
        },
        forced: true,
        content() {
            'step 0';
            player
                .chooseControl()
                .set('choiceList', [`令其摸一张牌,然后你成为${get.translation(trigger.card)}的使用者`, `令其弃置一张牌,然后你成为${get.translation(trigger.card)}的目标`])
                .set('prompt', `革命:令${get.translation(trigger.player)}执行一项`)
                .set('ai', function () {
                    var player = _status.event.player;
                    if (trigger.player.isFriendsOf(player)) {
                        return 0;
                    }
                    return 1;
                });
            ('step 1');
            if (result.index == 0) {
                player.chooseToDiscard('弃置一张不同颜色的牌', 'hes', true, function (card) {
                    return get.color(card) != get.color(trigger.card);
                });
                trigger.player.draw();
                trigger.parent.player = player;
                game.log(player, '成为了', trigger.card, '的使用者');
            } else {
                player.chooseToDiscard('弃置一张不同颜色的牌', 'hes', true, function (card) {
                    return get.color(card) != get.color(trigger.card);
                });
                trigger.player.chooseToDiscard('he', true, 1);
                trigger.targets.length = 0;
                trigger.all_excluded = true;
                trigger.targets.push(player);
                game.log(player, '成为了', trigger.card, '的目标');
            }
        },
    },
    乾明: {
        group: ['乾明_1', '乾明_2'],
        mark: true,
        zhuanhuanji: true,
        marktext: '☯',
        intro: {
            content(storage, player, skill) {
                if (player.storage.乾明 == true) {
                    return '出牌阶段你可以发动此技能,然后你获得状态神临(每当你结束回合后,立刻进入新的回合).此状态一直持续,直到你杀死角色或过程中累计获得的牌大于20张';
                }
                return '出牌阶段,你可以弃置所有牌';
            },
        },
        subSkill: {
            1: {
                enable: 'phaseUse',
                filter(event, player) {
                    return !player.storage.乾明 && !player.hasSkill('乾明_3') && !player.hasSkill('神临');
                },
                content() {
                    player.discard(player.getCards('he'));
                    player.changeZhuanhuanji('乾明');
                    player.addTempSkill('乾明_3');
                },
                ai: {
                    basic: {
                        order: 1,
                    },
                    result: {
                        player: 1,
                    },
                },
            },
            2: {
                enable: 'phaseUse',
                filter(event, player) {
                    return player.storage.乾明 && !player.hasSkill('乾明_3');
                },
                content() {
                    player.addSkill('神临');
                    player.changeZhuanhuanji('乾明');
                    player.addTempSkill('乾明_3');
                },
                ai: {
                    basic: {
                        order: 10,
                    },
                    result: {
                        player: 1,
                    },
                },
            },
            3: {
                charlotte: true,
            },
        },
    },
    神临: {
        mark: true,
        intro: {
            content(storage, player) {
                return `已摸${player.storage.摸}张牌`;
            },
            markcount(storage, player) {
                return player.storage.摸;
            },
        },
        trigger: {
            player: 'phaseAfter',
        },
        forced: true,
        content() {
            if (!player.storage.神临2) {
                player.insertPhase();
            } else {
                delete player.storage.摸;
                delete player.storage.神临2;
                player.removeSkill('神临');
            }
        },
        group: ['神临_1'],
        subSkill: {
            1: {
                trigger: {
                    global: ['dieAfter', 'washCard'],
                },
                forced: true,//QQQ                
                content() {
                    player.storage.神临2 = true;
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
            player: 'loseAfter',
        },
        forced: true,
        content() {
            if (!player.storage.静气) {
                player.storage.静气 = [];
            }
            player.storage.静气.addArray(trigger.cards);
            for (const i of trigger.cards) {
                I.AQ('静气');
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
                content() {
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
            target: 'useCardToTargeted',
        },
        forced: true,
        content() {
            trigger.player.link(true);
        },
        group: ['连锁_1'],
        subSkill: {
            1: {
                trigger: {
                    player: 'damageBegin4',
                },
                forced: true,
                content() {
                    if (!trigger.nature) {
                        trigger.nature = 'thunder';
                        trigger.num = 2 * trigger.num;
                    }
                    player.recover();
                },
            },
        },
    },
    用: {
        forced: true,
        charlotte: true,
    },
    掠夺: {
        trigger: {
            global: 'roundStart',
        },
        forced: true,
        content() {
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
    比翼: {
        trigger: {
            global: 'gameStart',
        },
        forced: true,
        audio: 'ext:温柔一刀/audio:1',
        content() {
            game.countPlayer(function (Q) {
                if (Q != player && Q.isFriendsOf(player)) {
                    player.line(Q, 'purple');
                    Q.addSkill('比翼_1');
                    Q.addSkill('比翼_2');
                }
            });
        },
        group: ['比翼_1', '比翼_2'],
        subSkill: {
            1: {
                charlotte: true,
                trigger: {
                    global: ['changeHp'],
                },
                forced: true,
                audio: 'ext:温柔一刀/audio:3',
                filter(event, player) {
                    return event.player.hasSkill('比翼_1');
                },
                content() {
                    var W = 0;
                    game.countPlayer(function (Q) {
                        if (Q.hasSkill('比翼_1')) {
                            W += Q.hp;
                        }
                    });
                    var T = game.countPlayer(function (Q) {
                        return Q.hasSkill('比翼_1');
                    });
                    game.countPlayer(function (Q) {
                        if (Q.hasSkill('比翼_1')) {
                            Q.hp = W / T;
                        }
                    });
                    player.line(trigger.player, 'purple');
                    player.draw(Math.ceil(numberq1(trigger.num)));
                },
            },
            2: {
                charlotte: true,
                trigger: {
                    global: ['useCard'],
                },
                forced: true,
                audio: 'ext:温柔一刀/audio:3',
                filter(event, player) {
                    if (event.card.name == 'shan') {
                        return false;
                    }
                    if (get.type(event.card) != 'basic' && get.type(event.card) != 'trick') {
                        return false;
                    }
                    if (event.player == player) {
                        return false;
                    }
                    if (!event.player.hasSkill('比翼_2')) {
                        return false;
                    }
                    return true;
                },
                content() {
                    'step 0';
                    player.line(trigger.player, 'purple');
                    player.chooseToDiscard('hes', `弃置一张牌,令${get.translation(trigger.card)}结算两次`).set('ai', function (card) {
                        var trigger = _status.event.getTrigger();
                        if (trigger.card.name == 'tiesuo') {
                            return 0;
                        }
                        var num = 0;
                        for (const i of trigger.targets) {
                            num += get.effect(i, trigger.card, trigger.player, _status.event.player);
                        }
                        if (num <= 0) {
                            return 0;
                        }
                        return 7 - get.value(card);
                    }).logSkill = '比翼_2';
                    ('step 1');
                    if (result.bool) {
                        trigger.effectCount++;
                    }
                },
            },
        },
    },
    乱世: {
        trigger: {
            global: 'useCardToPlayered',
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
                    const sum = trigger
                        .parent
                        .player.getHistory('sourceDamage', (evt) => evt.card && evt.card == trigger.card)
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
        content() {
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
        content() {
            trigger.addCount = false;
            player.stat[player.stat.length - 1].card[trigger.card.name]--;
            trigger.baseDamage = trigger.baseDamage * 2 || 2;
        },
    },
    乾坤大挪移: {
        trigger: {
            global: 'gameDrawBefore', //游戏开始时
        },
        forced: true,
        content() {
            game.countPlayer(function (Q) {
                if (Q.hasSkill('乾坤大挪移')) {
                    return;
                }
                if (!game.挪移) {
                    game.挪移 = [];
                    game.NY = Q;
                }
                var E = Q.skills.randomGet();
                Q.RS(E);
                Q.addSkill(game.挪移);
                game.挪移 = E;
            });
            game.NY.addSkill(game.挪移);
        },
    },
    合并时间线: {
        trigger: {
            global: 'gameDrawBefore', //游戏开始时
        },
        forced: true,
        content() {
            game.countPlayer(function (Q) {
                if (Q.hasSkill('合并时间线')) {
                    return;
                }
                var E = get.translation(Q).slice(-2);
                game.log(E);
                var T = Object.keys(lib.character).filter((W) => get.translation(W).includes(E));
                game.log(T);
                if (T) {
                    T.filter((i) => {
                        Q.addSkill(lib.character[i][3]);
                    });
                }
            });
        },
    },
    漫卷: {
        trigger: {
            global: ['gainEnd'],
        },
        forced: true,
        firstDo: true,
        silent: true,
        content() {
            if (!_status.漫卷) {
                _status.漫卷 = [];
            }
            game.countPlayer(function (Q) {
                if (Q == player) {
                    return;
                }
                var cardsx = Q.getCards('h')
                    .filter((card) => !_status.漫卷.includes(card))
                    .map((card) => {
                        var cardx = ui.create.card();
                        cardx.init(get.cardInfo(card));
                        cardx._cardid = card.cardid;
                        return cardx;
                    });
                player.directgains(cardsx, null, get.translation(Q));
                _status.漫卷.addArray(Q.getCards('h'));
            });
        },
        group: ['漫卷_1', '漫卷_2'],
        subSkill: {
            1: {
                trigger: {
                    player: ['useCardBefore', 'respondBefore'],
                },
                forced: true,
                firstDo: true,
                filter(event, player) {
                    return (
                        event.cards &&
                        event.cards.some((card) => {
                            return player.getCards('s').includes(card);
                        })
                    );
                },
                content() {
                    game.countPlayer(function (Q) {
                        if (Q == player) {
                            return;
                        }
                        Q.countCards('h', function (E) {
                            for (const i of trigger.cards) {
                                if (E.cardid == i._cardid) {
                                    E.delete();
                                    _status.漫卷.remove(E);
                                }
                            }
                        });
                    });
                },
            },
            2: {
                trigger: {
                    global: ['loseBefore'],
                },
                forced: true,
                firstDo: true,
                filter(event, player) {
                    return event.player != player;
                },
                content() {
                    player.countCards('s', function (E) {
                        for (const i of trigger.cards) {
                            if (i.cardid == E._cardid) {
                                E.delete();
                                _status.漫卷.remove(i);
                            }
                        }
                    });
                },
            },
        },
    },
    门客: {
        trigger: {
            player: 'dieBefore',
        },
        forced: true,
        forcedie: true,
        skillAnimation: true,
        animationColor: 'gray',
        async content(event, trigger, player) {
            var Q;
            if (trigger.source) {
                Q = trigger.source;
            } else {
                Q = player.getEnemies().randomGet();
            }
            if (Q) {
                game.门客秘境 = true;
                const ocheckresult = game.checkResult;
                game.checkResult = function () {
                    if (game.players.some((current) => current.storage.随从)) {
                        return;
                    }
                    if (!game.players.some((current) => current.storage.敌人)) {
                        if (game.players.concat(game.dead).find((Q) => Q.storage.主人).isFriendsOf(game.me)) {
                            game.over(true);
                        }
                        else {
                            game.over(false);
                        }
                    }
                    return ocheckresult();
                };
                ui.arena.setNumber(4);
                Q.dataset.position = 2;
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
                const result = await npc.chooseControl('basic', 'trick', 'equip', function () {
                    return ['basic', 'trick', 'equip'].randomGet();
                }).forResult();
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
        content() {
            Reflect.defineProperty(trigger, 'finished', {
                get: () => trigger.step > 5,
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
        content() {
            player.draw('nodelay');
        },
    },
    贞烈: {
        audio: 'ext:温柔一刀/audio:1',
        trigger: {
            target: 'useCardToTargeted',
        },
        filter(event, player) {
            return event.player != player && event.card;
        },
        check(event, player) {
            let evt = event.parent;
            if (evt.excluded.includes(player)) {
                return false;
            }
            if (event.player.isFriendsOf(player)) {
                return false;
            }
            if (get.effect(player, event.card, event.player, player) > 0) {
                return false;
            }
            if ((evt.nowuxie && get.type(event.card) == 'trick') || (evt.directHit && evt.directHit.includes(player)) || (evt.customArgs && evt.customArgs.default && evt.customArgs.default.directHit2)) {
                return true;
            }
            if (get.tag(event.card, 'respondSha') && player.hasCard((c) => c.name == 'sha', 'h')) {
                return false;
            } else if (get.tag(event.card, 'respondShan') && player.hasCard((c) => c.name == 'shan', 'h')) {
                return false;
            }
            return true;
        },
        logTarget: 'player',
        async content(event, trigger, player) {
            await player.loseHp();
            trigger.parent.excluded.add(player);
            const Q = [];
            let num = player.getDamagedHp();
            while (num > 0) {
                const result = await player
                    .chooseTarget(`获得任意名角色区域内的至多${num}张牌`, (card, player, target) => {
                        return (
                            target != player &&
                            target.hasCard((T) => {
                                const G = _status.event.Q.find((item) => item[0] == target);
                                if (G && G[1].includes(T)) {
                                    return false;
                                }
                                return lib.filter.canBeGained(T, player, target);
                            }, 'hej')
                        );
                    })
                    .set('ai', (target) => {
                        const player = _status.event.player,
                            G = _status.event.Q.find((item) => item[0] == target);
                        if (G && G[1].length >= target.countCards('he')) {
                            return 0;
                        }
                        return get.effect(target, { name: 'shunshou' }, player, player);
                    })
                    .set('Q', Q)
                    .forResult();
                if (result.bool) {
                    const target = result.targets[0];
                    const cards = await player
                        .choosePlayerCard(target, true, 'hej', [1, num], `选择获得${get.translation(target)}区域内的牌`)
                        .set('filterButton', (button) => {
                            const card = button.link,
                                target = _status.event.target,
                                player = get.player();
                            const G = _status.event.Q.find((item) => item[0] == target);
                            if (G && G[1].includes(card)) {
                                return false;
                            }
                            return lib.filter.canBeGained(card, player, target);
                        })
                        .set('Q', Q)
                        .set('ai', (button) => {
                            if (ui.selected.buttons.length) {
                                return false;
                            }
                            var val = get.buttonValue(button, _status.event.target);
                            if (get.attitude(_status.event.player, _status.event.target) > 0) {
                                return -val;
                            }
                            return val;
                        })
                        .forResultCards();
                    num -= cards.length;
                    const index = Q.find((item) => item[0] == target);
                    if (!index) {
                        Q.push([target, cards]);
                    } else {
                        index[1].addArray(cards);
                    }
                } else {
                    break;
                }
            }
            player.draw(num);
            if (Q.length) {
                if (Q[0].length == 1) {
                    player.gain(Q[0][1], 'gain2');
                } else {
                    for (const i of Q) {
                        player.gain(i[1], 'gain2');
                    }
                }
            }
        },
        ai: {
            maixie: true,
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
        content() {
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
                content() {
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
        prompt: '弃置两张牌,并令所有拥有<群起>的角色摸两张牌,然后可以令一名未拥有<群起>的角色获得<群起>',
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
    天启: {
        enable: 'phaseUse', //QQQ
        usable: 9,
        forced: true,
        position: 'he',
        async content(event, trigger, player) {
            var list = Object.keys(lib.card).filter((Q) => {
                var type = get.type(Q);
                return type == 'spell' || type == 'hsshenqi' || type == 'land' || type == 'jiguan' || type == 'food';
            });
            const result = await player
                .chooseButton(['创造一张地图/法术/神器/机关/食物牌,然后获得一个随机正面效果', [list, 'vcard']])
                .set('ai', () => Math.random())
                .forResult();
            const result1 = await player
                .chooseControl([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
                .set('ai', function () {
                    return list.randomGet();
                })
                .forResult();
            const result2 = await player
                .chooseControl('diamond', 'spade', 'heart', 'club')
                .set('ai', function () {
                    return list.randomGet();
                })
                .forResult();
            list = game.players.filter((current) => current.hasSkill('天启'));
            for (const i of list) {
                i.gain(game.createCard(result.links[0][2], result2.control, result1.control, result.links[0][3]), 'gain2');
                i.getBuff();
            }
        }, //QQQ
        ai: {
            order: 8.2,
            result: {
                player: 3,
            },
        },
    },
    蛊惑: {
        mod: {
            targetInRange(card, player, target) {
                if (target.hasSkill('蛊惑_2')) {
                    return true;
                }
            },
            cardUsableTarget(card, player, target) {
                if (target.hasSkill('蛊惑_2')) {
                    return true;
                }
            },
        },
        enable: ['chooseToUse', 'chooseToRespond'],
        usable: 1,
        hiddenCard(player, name) {
            return player.countCards('h') > 0;
        },
        filter(event, player) {
            return game.qcard(player)[0] && player.countCards('hs');
        },
        chooseButton: {
            dialog(event, player) {
                return ui.create.dialog('蛊惑', [game.qcard(player), 'vcard']);
            },
            filter(button, player) {
                var evt = _status.event.parent;
                return evt.filterCard({ name: button.link[2], nature: button.link[3] }, player, evt);
            },
            check(button) {
                const player = _status.event.player;
                const num = player.getUseValue(
                    {
                        name: button.link[2],
                        nature: button.link[3],
                    },
                    null,
                    true
                );
                if (['wuzhong', 'dongzhuxianji'].includes(button.link[2]) && player.countCards('h') < 4) {
                    return number0(num) * 2 + 10;
                }
                return number0(num) / 2 + 10;
            },
            backup(links, player) {
                return {
                    viewAs: {
                        name: links[0][2],
                        nature: links[0][3],
                        suit: links[0][0],
                        number: links[0][1],
                    },
                    filterCard(card, player, target) {
                        var result = true;
                        var suit = card.suit,
                            number = card.number;
                        card.suit = 'none';
                        card.number = null;
                        var mod = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
                        if (mod != 'unchanged') {
                            result = mod;
                        }
                        card.suit = suit;
                        card.number = number;
                        return result;
                    },
                    position: 'hs',
                    ignoreMod: true,
                    check(card) {
                        return 12 - get.value(card);
                    },//加强于吉AI
                    precontent() {
                        player.addTempSkill('蛊惑_1');
                        var card = event.result.cards[0];
                        event.result.card.suit = card.suit;
                        event.result.card.number = card.number;
                    },
                };
            },
            prompt(links, player) {
                return '将一张手牌当做' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '使用';
            },
        },
        ai: {
            fireAttack: true,
            respondShan: true,
            respondSha: true,
            skillTagFilter(player) {
                if (!player.countCards('hs')) {
                    return false;
                }
            },
            order: 120,
            result: {
                player: 1,
            },
            threaten: 1.3,
        },
        group: ['蛊惑_3'],
        subSkill: {
            1: {
                trigger: {
                    player: ['useCardBefore', 'respondBefore'],
                },
                forced: true,
                silent: true,
                popup: false,
                charlotte: true,
                firstDo: true,
                filter(event, player) {
                    return event.skill && event.skill.indexOf('蛊惑_') == 0;
                },
                async content(event, trigger, player, cards) {
                    event.fake = false;
                    var card = trigger.cards[0];
                    if (card.name != trigger.card.name || (card.name == 'sha' && !get.is.sameNature(trigger.card, card))) {
                        event.fake = true;
                    }
                    player.line(trigger.targets, get.nature(trigger.card));
                    event.cardTranslate = get.translation(trigger.card.name);
                    trigger.card.number = card.number;
                    trigger.card.suit = card.suit;
                    trigger.skill = '蛊惑_backup';
                    if (trigger.card.name == 'sha' && get.natureList(trigger.card).length) {
                        event.cardTranslate = get.translation(trigger.card.nature) + event.cardTranslate;
                    }
                    player.popup(event.cardTranslate, trigger.name == 'useCard' ? 'metal' : 'wood');
                    event.prompt = `是否肯定${get.translation(player)}声明的${event.cardTranslate}？`;
                    game.log(`<span class="greentext">${get.translation(player)}声明了${event.cardTranslate}</span>`);
                    event.targets = game
                        .filterPlayer(function (current) {
                            return current != player && !current.hasMark('蛊惑');
                        })
                        .sortBySeat();
                    event.targets2 = event.targets.slice(0);
                    player.lose(card, ui.ordering).relatedEvent = trigger;
                    if (event.targets.length) {
                        event.betrays = [];
                        for (const Q of event.targets) {
                            const result = await Q.chooseButton([event.prompt, [['肯定', '质疑'], 'vcard']], true, function (button) {
                                var ally = (button.link[2] == '肯定');
                                if (ally && (Q.hp <= 1 || get.attitude(Q, player) >= 0)) {
                                    return 1.1;
                                }
                                return Math.random();
                            }).forResult();
                            if (result.links[0][2] == '质疑') {
                                event.betrays.push(Q);
                            }
                        }
                        for (const i of event.targets2) {
                            var b = event.betrays.includes(i);
                            i.popup(b ? '肯定' : '质疑', b ? 'fire' : 'wood');
                            game.log(i, b ? '<span class="greentext">肯定</span>' : '<span class="firetext">质疑</span>');
                        }
                        player.showCards(trigger.cards);
                        if (event.betrays.length) {
                            event.betrays.sortBySeat();
                            if (event.fake) {
                                trigger.cancel();
                                trigger.parent.goto(0);
                                game.log(`<span class="greentext">${get.translation(player)}声明的${event.cardTranslate}作废了</span>`);
                                while (event.betrays.length) {
                                    event.betrays.shift().addTempSkills('蛊惑_2');
                                    lib.skill.蛊惑.usable++;
                                }
                            } else {
                                while (event.betrays.length) {
                                    event.betrays.shift().addMark('蛊惑');
                                }
                            }
                        }
                    }
                },
            },
            2: {
                charlotte: true,
            },
            3: {
                trigger: {
                    global: ['phaseEnd'],
                },
                prompt: '移除惑标记,然后视为使用移除的标记数张任意牌',
                filter: (event, player) => game.countPlayer((Q) => Q.hasMark('蛊惑')),
                forced: true,
                async content(event, trigger, player, cards) {
                    const result = await player.chooseTarget('选择移除惑的角色', (card, player, target) => target.hasMark('蛊惑')).forResult();
                    if (result.bool) {
                        while (result.targets.length) {
                            result.targets.shift().removeMark('蛊惑');
                            const result1 = await player
                                .chooseButton(['视为使用一张牌', [game.qcard(player, false, true, false), 'vcard']])
                                .set('ai', () => Math.random())
                                .forResult();
                            if (result1.bool) {
                                await player.chooseUseTarget(result1.links[0][2], true, false, 'nodistance');
                            }
                        }
                    }
                },
            },
        },
    },
    煽火: {
        trigger: {
            global: ['damageAfter'],
        },
        check: (event) => event.player.isFriendsOf(_status.event.player),
        filter(event, player) {
            return event.source && (event.player == player || !player.hasSkill('煽火_1'));
        },
        async content(event, trigger, player) {
            player.chooseToDebate(game.players).set('callback', async (event) => {
                const result = event.debateResult;
                if (result.bool && result.opinion) {
                    const { opinion, targets } = result;
                    targets.sortBySeat();
                    if (opinion == 'red') {
                        await trigger.source.chooseToGive(trigger.player, 'he', trigger.player.getDamagedHp(), true);
                        trigger.source.loseHp();
                    } else {
                        const result1 = await trigger.source.chooseControl('不能用牌', '翻面').forResult();
                        if (result1.control == '不能用牌') {
                            trigger.source.addTempSkill('drlt_xiongluan2', { global: 'roundStart' });
                        } else {
                            trigger.source.turnOver(true);
                        }
                    }
                }
            });
            player.addTempSkill('煽火_1', { global: 'roundStart' });
        },
        group: ['煽火_2'],
        subSkill: {
            1: {
                charlotte: true,
            },
            2: {
                trigger: {
                    global: 'debateShowOpinion',
                },
                filter: (event, player) => game.countPlayer((Q) => Q.hasMark('蛊惑')) > game.countPlayer((Q) => !Q.hasMark('蛊惑')),
                forced: true,
                async content(event, trigger, player) {
                    let myOpinion, dissent;
                    const colors = ['red', 'black'];
                    for (const color of colors) {
                        if (trigger[color].some((i) => i[0] == player)) {
                            myOpinion = color;
                            dissent = colors.find((i) => i != color);
                            break;
                        }
                    }
                    let dissident = [];
                    for (let i = 0; i < trigger[dissent].length; i++) {
                        const pair = trigger[dissent][i];
                        if (game.players.filter((Q) => Q.hasMark('蛊惑')).includes(pair[0])) {
                            dissident.push(pair[0]);
                            trigger[myOpinion].push(pair);
                            trigger[dissent].splice(i--, 1);
                        }
                    }
                },
            },
        },
    },
    mianze: {
        trigger: {
            global: 'useCard', //QQQ
        },
        charlotte: true,
        fixed: true,
        forced: true,
        filter: (event, player) => get.tag(event.card, 'damage') && event.getParent(2).name != 'mianze',
        async content(event, trigger, player) {
            if (trigger.player != player) {
                player.draw(2);
                player.recover();
                await player.chooseToUse('绵泽:你可以使用一张伤害类牌', (card) => get.tag(card, 'damage'));
            } else {
                player.gainMaxHp();
                const result = await player
                    .chooseTarget('请选择〖绵泽〗的目标', [1, game.countPlayer((current) => current != player)], (card, target, player) => target != player)
                    .set('ai', (target) => target.isFriendsOf(_status.event.player))
                    .forResult();
                if (result.bool) {
                    for (const i of result.targets) {
                        i.draw();
                        await i.chooseToUse('绵泽:你可以使用一张伤害类牌', (card) => get.tag(card, 'damage'));
                    }
                }
            }
        },
    },
    hongmengzhixi: {
        name: '鸿蒙之息',
        forced: true,
        intro: {
            content: 'expansion',
            markcount: 'expansion',
        },
        trigger: {
            global: ['loseAfter'],
        },
        filter(event, player) {
            return event.cards && event.cards.length > 1;
        },
        logTarget: 'player',
        async content(event, trigger, player) {
            //QQQ
            const result = await player
                .chooseButton(['选择一张置于武将牌上', trigger.cards])
                .set('ai', (button) => get.value(button.link))
                .forResult();
            if (result.links && result.links.length) {
                player.addToExpansion(result.links, 'giveAuto', player).gaintag.add('hongmengzhixi');
            }
        },
    },
    求贤若渴: {
        enable: 'phaseUse',
        usable: 1,
        async content(event, trigger, player) {
            player.say('山不厌高,海不厌深,周公吐哺,天下归心.');
            var type = [];
            for (var i in lib.card) {
                if (!type.includes(lib.card[i].type)) {
                    type.push(lib.card[i].type);
                }
            } //QQQ
            const result = await player
                .chooseButton(['声明一个花色和类型,然后亮出牌堆顶三张牌,获得与你描述相符的牌.若有两项皆满足的牌,你回复一点体力', '花色', [lib.suits, 'tdnodes'], '类型', [type, 'tdnodes']], true, 2)
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
                if (player.storage.suit[i][1] && event.filterCard({ name: player.storage.suit[i][0] }, player, event)) {
                    return player.countCards('h', { suit: i });
                }
            }
            return false;
        },
        usable: 1,
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
                    if (player.storage.suit[i][1] && player.countCards('h', { suit: i }) && event.filterCard({ name: player.storage.suit[i][0] }, player, event)) {
                        list.push(player.storage.suit[i][0]);
                    }
                }
                return ui.create.dialog('花招', [list, 'vcard'], 'hidden');
            },
            check(button) {
                const num = _status.event.player.getUseValue({
                    name: button.link[2],
                    nature: button.link[3],
                }, null, true);
                return number0(num) / 2 + 10;
            },
            backup(links, player) {
                return {
                    popname: true,
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
    称象: {
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
    影火: {
        trigger: {
            player: ['chooseToRespondBegin', 'chooseToUseBegin'],
        },
        forced: true,
        silent: true,
        hiddenCard(player, name) {
            return Array.from(ui.cardPile.childNodes)
                .slice(0, 4)
                .some((i) => i.name == name);
        },
        async content(event, trigger, player) {
            //QQQ
            var cardtop = Array.from(ui.cardPile.childNodes).slice(0, 4);
            var Q = player.getCards('h').filter((Q) => Q.HQ('火'));
            var i = 4;
            while (i--) {
                if (Q[i]) {
                    Q[i].init(cardtop[i]);
                }
            }
        },
        ai: {
            respondShan: true,
            respondSha: true,
            save: true,
        },
        group: ['影火_1', '影火_2', '影火_3'],
        subSkill: {
            1: {
                trigger: {
                    global: ['gameStart'],
                },
                forced: true,
                async content(event, trigger, player) {
                    var i = 4;
                    while (i--) {
                        var card = game.createCard2('火', 'heart', 13);
                        card.AQ('火');
                        player.gain(card);
                    }
                },
            },
            2: {
                trigger: {
                    player: ['loseBefore'],
                },
                forced: true,
                silent: true,
                filter: (event, player) => event.cards && event.cards.some((Q) => Q.HQ('火')),
                async content(event, trigger, player) {
                    trigger.cards = trigger.cards.filter((i) => {
                        if (i.HQ('火')) {
                            for (var j of Array.from(ui.cardPile.childNodes).slice(0, 4)) {
                                if (j.name == i.name && trigger.parent.name != 'useCard') {
                                    ui.discardPile.appendChild(j);
                                }
                            }
                            return false;
                        }
                        return true;
                    });
                },
            },
            3: {
                trigger: {
                    player: ['useCardBefore'],
                },
                forced: true,
                silent: true,
                filter: (event, player) => event.cards && event.cards.some((Q) => Q.HQ('火')),
                async content(event, trigger, player) {
                    for (const i of trigger.cards) {
                        if (i.HQ('火')) {
                            for (var j of Array.from(ui.cardPile.childNodes).slice(0, 4)) {
                                if (j.name == i.name) {
                                    trigger.cards.push(j);
                                }
                            }
                        }
                    }
                    trigger.cards = trigger.cards.filter((i) => !i.HQ('火'));
                },
            },
        },
    }, //牌堆顶4张牌始终对你可见;你可如手牌般使用或打出
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
                    content() {
                        if (cards.length && get.position(cards[0], true) == 'o') {
                            target.equip(cards[0]);
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
                    player: ['loseAfter'],
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
    激将: {
        audio: 'jijiang1',
        audioname: ['liushan', 're_liubei', 're_liushan', 'ol_liushan'],
        forced: true,
        enable: ['chooseToUse', 'chooseToRespond'],
        usable: 5, //QQQ
        filter: (event, player) => game.countPlayer((Q) => Q.countCards('h', { name: 'sha' }) && Q.group == 'shu') && event.filterCard({ name: 'sha' }, player, event), //QQQ
        async content(event, trigger, player) {
            var evt = event.getParent(2);
            for (const i of game.players) {
                if (i == player) {
                    continue;
                }
                if (i.countCards('h', { name: 'sha' }) && i.group == 'shu') {
                    const { result } = await i.chooseToRespond(`替${get.translation(player)}打出一张杀`, true, { name: 'sha' });
                    if (result.cards && result.cards[0]) {
                        if (evt.name == 'chooseToUse') {
                            player.when('useCard').then(() => trigger.directHit.addArray(game.players));
                            await player.chooseUseTarget('sha', true, false, 'nodistance');
                        } else {
                            evt.untrigger();
                            evt.set('responded', true);
                            evt.result = { bool: true, card: { name: 'sha' }, cards: [] };
                            evt.redo();
                        }
                    }
                }
            }
        },
        ai: {
            result: {
                player: 1,
                tag: {
                    respond: 1,
                    respondSha: 1,
                },
            },
        },
    },
    QQQ_biaoji: {
        enable: ['chooseToUse', 'chooseToRespond'],
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
                        list = game.qcard(player, false, true, false); //不限类型,限制filtercard,不限距离
                    }
                    if (list.length) {
                        const {
                            result: { links },
                        } = await player.chooseButton(['视为使用或打出对应基本牌/锦囊牌', [list, 'vcard']]).set('ai', (button) => {
                            const num = player.getUseValue({
                                name: button.link[2],
                                nature: button.link[3],
                            }, true, true);
                            if (evt.name == '_wuxie') {
                                //console.log(evt.getParent('useCard').player.name);
                                return -get.attitude(player, evt.getParent('useCard').player);
                            }
                            if (button.link[2] == 'jiu') {
                                return 999 * (99 + num);
                            }
                            return number0(num) / 2 + 10;
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
                        .chooseTarget('诗寇蒂的剪刀:选择一名角色赋予其' + get.translation(i))
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
    雄略: {
        trigger: {
            target: 'useCardToTarget',
        },
        forced: true,
        filter(event, player) {
            return event.card && get.tag(event.card, 'damage') && player.countCards('he');
        },
        async content(event, trigger, player) {
            //QQQ
            var n = trigger.targets.length;
            const { result } = await player.chooseButton([`雄略:你可以弃置${n}张<略>令` + get.translation(trigger.player) + `使用的${get.translation(trigger.card)}交换使用者与目标`, player.getCards('he')], n).set('ai', (card) => trigger.player.isEnemiesOf(player));
            if (result.links && result.links.length) {
                player.discard(result.links);
                for (const i of trigger.targets) {
                    await i.useCard(trigger.card, trigger.player);
                }
                trigger.parent.excluded.addArray(trigger.targets);
            }
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
            let count = numberq1(trigger.num);
            while (count-- > 0) {
                game.log('#g【魔翼开始】');
                while (true) {
                    await player.draw();
                    const { result } = await player
                        .chooseToUse((card) => lib.filter.filterCard(card, player, event.getParent(2)))
                        .set('ai1', (card, arg) => {
                            if (lib.card[card.name]) {
                                return number0(player.getUseValue(card, null, true)) / 2 + 10;
                            }
                        })//card是可选牌和技能名//arg是所有可选牌和技能名的数组且可能不存在
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
                    if (player.getEquips('zhuge') && get.subtype(card) == 'equip1' && card.name != 'zhuge') {
                        return -1;
                    }
                    return [1, 1.6]; //无脑用牌
                },
            },
        },
    },
    QQQ_luanwu: {
        enable: 'phaseUse',
        usable: 1,
        charlotte: true,
        fixed: true,
        async content(event, trigger, player) {
            const list = game.qcard(player, false, false).filter((q) => lib.card[q[2]].ai?.tag?.damage > 0);
            var q = true;
            while (q) {
                var w = {};
                for (const i of game.players.filter((q) => q != player)) {
                    w[i.name] = i.hp;
                }
                for (const i of game.players) {
                    const { result } = await i.chooseButton(['视为使用无距离限制的杀或者伤害类锦囊', [list, 'vcard']]).set('ai', (button) => {
                        const num = i.getUseValue({
                            name: button.link[2],
                            nature: button.link[3],
                        }, null, true);
                        return number0(num) / 2 + 10;
                    });
                    if (result && result.links && result.links[0]) {
                        await i.chooseUseTarget(
                            {
                                suit: result.links[0][0],
                                number: result.links[0][1],
                                name: result.links[0][2],
                                nature: result.links[0][3],
                            },
                            true,
                            false,
                            'nodistance'
                        );
                    }
                }
                q = false;
                for (const i of game.players.filter((q) => q != player)) {
                    if (i.hp >= w[i.name]) {
                        q = true;
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
    QQQ_weimu: {
        mod: {
            targetEnabled(card) {
                if (get.color(card) == 'black') {
                    return false;
                }
            },
        },
        init(player) {
            let qmaxhp = 4;
            Reflect.defineProperty(player, 'maxHp', {
                get() {
                    return qmaxhp;
                },
                set(value) {
                    if (this != _status.currentPhase) {
                        qmaxhp = value;
                    } else {
                        if (value > qmaxhp) {
                            qmaxhp = value;
                        }
                        this.draw(2 * Math.abs(qmaxhp - value));
                    }
                },
            });
            let qhp = 4;
            Reflect.defineProperty(player, 'hp', {
                get() {
                    return qhp;
                },
                set(value) {
                    if (this == _status.currentPhase || (_status.event.parent && _status.event.parent.source == this)) {
                        if (value > qhp) {
                            qhp = value;
                        }
                        this.draw(2 * Math.abs(qhp - value));
                    } else {
                        qhp = value;
                    }
                },
            });
        },
        ai: {
            effect: {
                target(card, player, target) {
                    if (target == _status.currentPhase && get.tag(card, 'damage')) {
                        return [0, 1];
                    }
                },
            },
        },
    },
    QQQ_wansha: {
        trigger: {
            global: ['changeHp'],
        },
        silent: true,
        async content(event, trigger, player) {
            trigger.player.storage.QQQ_wansha = numberq0(trigger.player.storage.QQQ_wansha) + 1;
            if (trigger.player.storage.QQQ_wansha > 1) {
                trigger.player.storage.QQQ_wansha -= 2;
                await player.useCard({ name: 'sha' }, trigger.player, false);
            }
        },
        group: ['QQQ_wansha_1'],
        subSkill: {
            1: {
                trigger: {
                    source: 'damageBefore',
                },
                filter: (event, player) => event.player.hp <= player.hp,
                silent: true,
                async content(event, trigger, player) {
                    trigger.num = trigger.num * 2 || 2;
                },
            },
        },
    },
    QQQ_ranshang: {
        trigger: {
            player: 'damageEnd',
        },
        filter: (event, player) => event.hasNature('fire'),
        forced: true,
        async content(event, trigger, player) {
            //QQQ
            player.addMark('QQQ_ranshang', trigger.num);
        },
        intro: {
            name2: '燃',
            content: 'mark',
        },
        ai: {
            neg: true,
            effect: {
                target(card, player, target, current) {
                    if (card.name == 'sha') {
                        if (game.hasNature(card, 'fire') || player.hasSkill('zhuque_skill')) {
                            return 2;
                        }
                    }
                    if (get.tag(card, 'fireDamage') && current < 0) {
                        return 2;
                    }
                },
            },
        },
        group: ['QQQ_ranshang_1', 'QQQ_ranshang_2', 'QQQ_ranshang_3', 'QQQ_ranshang_4'],
        subSkill: {
            1: {
                trigger: {
                    player: 'phaseJieshuBegin',
                },
                forced: true,
                filter(event, player) {
                    return player.countMark('QQQ_ranshang');
                },
                async content(event, trigger, player) {
                    //QQQ
                    player.damage(player.countMark('QQQ_ranshang'), 'fire');
                },
            },
            2: {
                trigger: {
                    target: ['useCardToBefore', 'shaBegin'],
                },
                forced: true,
                priority: 6,
                filter(event, player, name) {
                    if (name == 'shaBegin') {
                        return !game.hasNature(event.card);
                    }
                    return event.targets.length > 1;
                },
                async content(event, trigger, player) {
                    //QQQ
                    trigger.cancel();
                },
                ai: {
                    effect: {
                        target(card, player, target, current) {
                            if (lib.card[card.name] && game.xunshi(card)) {
                                return 'zerotarget';
                            } //QQQ
                            if (card.name == 'sha') {
                                var equip1 = player.getEquip('zhuque');
                                if (equip1 && equip1.name == 'zhuque') {
                                    return 1.9;
                                }
                                if (!game.hasNature(card)) {
                                    return 'zerotarget';
                                }
                            }
                        },
                    },
                },
            },
            3: {
                trigger: {
                    player: 'damageBegin3',
                },
                filter: (event, player) => event.hasNature('fire'),
                forced: true,
                async content(event, trigger, player) {
                    //QQQ
                    trigger.num = trigger.num * 2 || 2;
                },
                ai: {
                    fireAttack: true,
                    effect: {
                        target(card, player, target, current) {
                            if (card.name == 'sha') {
                                if (game.hasNature(card, 'fire')) {
                                    return 2;
                                }
                                if (player.hasSkill('zhuque_skill')) {
                                    return 1.9;
                                }
                            }
                            if (get.tag(card, 'fireDamage') && current < 0) {
                                return 2;
                            }
                        },
                    },
                },
            },
            4: {
                trigger: {
                    global: ['roundStart'],
                },
                forced: true,
                filter: (event, player) => game.roundNumber > 10,
                async content(event, trigger, player) {
                    //QQQ
                    game.over(player.getFriends(true).includes(game.me));
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
                    const { result: result1 } = await player.chooseTarget('令一名角色根据乐谱执行效果', (c, p, t) => t != p).set('ai', (t) => -get.attitude(player, t));
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
                    const { result } = await player.chooseTarget('令一名角色弃置两张牌,若其中的一个花色牌大于2,你添加该花色对应的乐谱库至你的乐谱库中', (c, p, t) => t != p && t.countCards('he')).set('ai', (t) => -get.attitude(t, player));
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
            player: 'useCardAfter',
        },
        forced: true,
        mark: true,
        intro: {
            content: '$',
        },
        init: (player) => (player.storage.QQQ_taye = 1),
        //当你使用一张牌后,你可以从弃牌堆中选择至多[1]张与此牌类型相同的其他牌,将这些牌置于牌堆底,然后展示牌堆顶等量张牌.
        //然后将与触发技能的牌类型不同的置入弃牌堆,其余牌由你依次分配给场上角色.<br>当有牌不因使用而进入弃牌堆时,你令下次发动此技能时,方括号内的数字+1,至多加至5
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
                    global: ['loseAfter', 'cardsDiscardAfter', 'loseAsyncAfter'],
                },
                filter(event, player) {
                    if (event.name.indexOf('lose') == 0) {
                        if (event.getlx === false || event.position != ui.discardPile) {
                            return false;
                        }
                    } else {
                        var evt = event.parent;
                        if (evt.relatedEvent && evt.relatedEvent.name == 'useCard') {
                            return false;
                        }
                    }
                    return true;
                },
                content() {
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
            return game.qcard(player, 'basic', true, false).length && (player.countCards('ejsx') || player.countCards('h', { name: 'ybsl_107xiaohu' }));
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
        //你可以将【小狐】或非手牌区一张牌当做一张基本牌使用或打出.然后若以此法使用或打出的牌为【小狐】,则在结算完成后插入牌堆随机位置.',
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
                    const list = game.qcard(player, 'basic', true, false);
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
                    var prompt = '将至少一张花色各不相同的牌置入<香>,然后摸等量的牌';
                    if (player.storage.QQQ_xiangyun > 1) {
                        prompt = '将至少一张牌置入<香>,然后摸双倍的牌';
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
                    const { result } = await trigger.player.chooseButton([`获得${get.translation(player)}的一张<香>`, player.getExpansions('QQQ_xiangyun')]);
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
            return game.qcard(player).some((q) => !player.storage.QQQ_kangzou.includes(q[2]));
        },
        chooseButton: {
            dialog(event, player) {
                const list = game.qcard(player).filter((q) => !player.storage.QQQ_kangzou.includes(q[2]));
                return ui.create.dialog('抗揍', [list, 'vcard']);
            },
            check(button) {
                const num = _status.event.player.getUseValue({
                    name: button.link[2],
                    nature: button.link[3],
                }, null, true);
                return number0(num) / 2 + 10;
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
                    precontent() {
                        event.result.cards = [ui.cardPile.firstChild]; //防没有cards[0]
                        player.storage.QQQ_kangzou.add(event.result.card.name);
                        player.storage.QQQ_kangzou.add(event.result.card.nature);
                        player.gainMaxHp();
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
                    player: ['dyingBefore', 'dying'],
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
                    var list = Object.keys(lib.card).filter((q) => !player.storage.QQQ_kangzou.includes(q));
                    if (list.length) {
                        var card = list.randomGet();
                        player.storage.QQQ_kangzou.add(card); //QQQ}
                        player.hp = 1;
                        game.log(get.translation(player), '消耗', get.translation(card), '来恢复体力');
                    }
                },
            },
        },
    },
    QQQ_dongfeng: {
        trigger: {
            global: ['gameStart'],
        },
        silent: true,
        mark: true,
        intro: {
            content: 'expansion',
            markcount: 'expansion',
        },
        async content(event, trigger, player) {
            var cards = Array.from(ui.cardPile.childNodes).filter((q) => q.number == 7);
            player.addToExpansion(cards, 'draw').gaintag = ['QQQ_dongfeng'];
        },
        group: ['QQQ_dongfeng_1'],
        subSkill: {
            1: {
                trigger: {
                    global: ['roundStart'],
                },
                silent: true,
                async content(event, trigger, player) {
                    for (const i of game.players) {
                        if (i.hasSkill('QQQ_dawu')) {
                            i.removeSkill('QQQ_dawu');
                        }
                    }
                    player.addToExpansion(get.cards(), 'draw').gaintag = ['QQQ_dongfeng'];
                    const { result: result2 } = await player
                        .chooseToMove('将你的牌与东风交换')
                        .set('list', [
                            ['东风', player.getExpansions('QQQ_dongfeng')],
                            ['你的牌', player.getCards('hej')],
                        ])
                        .set('filterMove', (from, to) => typeof to != 'number')
                        .set('processAI', function (list) {
                            var card = list[0][1].concat(list[1][1]);
                            card.sort((a, b) => get.value(b) - get.value(a));
                            var cardQ = [],
                                num = list[1][1].length;
                            while (num-- > 0) {
                                cardQ.unshift(card.shift());
                            }
                            return [card, cardQ];
                        });
                    if (result2.moved && result2.moved[0]) {
                        player.addToExpansion(
                            result2.moved[0].filter((q) => !player.getExpansions('QQQ_dongfeng').includes(q)),
                            'draw'
                        ).gaintag = ['QQQ_dongfeng'];
                        player.gain(result2.moved[1], 'gain2');
                        for (const i of result2.moved[1]) {
                            if (!player.getCards('he').includes(i)) {
                                player.node.handcards1.appendChild(i);
                                ui.updatehl();
                            }
                        }
                    }
                    const { result } = await player.chooseTarget('大雾', (c, p, t) => !t.hasSkill('QQQ_dawu'), [1, game.players.length]).set('ai', (t) => get.attitude(player, t));
                    if (result.targets && result.targets[0]) {
                        for (const i of result.targets) {
                            i.addSkill('QQQ_dawu');
                            player.loseToDiscardpile(player.getExpansions('QQQ_dongfeng').randomGet());
                        }
                    }
                    const { result: result1 } = await player.chooseTarget('狂风', (c, p, t) => !t.hasSkill('QQQ_kuangfeng'), [1, game.players.length]).set('ai', (t) => -get.attitude(player, t));
                    if (result1.targets && result1.targets[0]) {
                        for (const i of result1.targets) {
                            i.addTempSkill('QQQ_kuangfeng', { global: 'roundStart' });
                            i.damage(Array.from(lib.nature.keys()).randomGet());
                            player.loseToDiscardpile(player.getExpansions('QQQ_dongfeng').randomGet());
                        }
                    }
                },
            },
        },
    },
    QQQ_dawu: {
        trigger: {
            player: ['damageBegin4'],
        },
        forced: true,
        filter: (event, player) => !(Array.from(lib.nature.keys()).concat(undefined).randomGet() === event.nature),
        async content(event, trigger, player) {
            trigger.finished = true;
        },
    },
    QQQ_kuangfeng: {
        trigger: {
            player: ['damageBefore'],
        },
        forced: true,
        filter: (event, player) => event.nature,
        async content(event, trigger, player) {
            trigger.num = trigger.num * 2 || 2;
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
            player.node.avatar.style.backgroundImage = `url('${lib.assetURL}extension/温柔一刀/image/beijing.jpg')`;
            ui.background.style.backgroundImage = `url('${lib.assetURL}extension/温柔一刀/image/beijing.jpg')`;
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
    QQQ_kurou: {
        trigger: {
            player: ['phaseAfter'],
        },
        forced: true,
        init: (p) => (p.storage.QQQ_kurou = 0),
        filter: (e, p) => p.storage.QQQ_kurou > 0,
        async content(event, trigger, player) {
            player.storage.QQQ_kurou--;
            player.phase();
        },
        group: ['QQQ_kurou_1'],
        1: {
            enable: 'phaseUse',
            prompt: '失去一点体力并增加一个回合',
            async content(event, trigger, player) {
                player.loseHp();
                player.storage.QQQ_kurou++;
            },
            ai: {
                order: 3,
                result: {
                    player(player, target, card) {
                        if (player.storage.QQQ_kurou > 0) {
                            return 0;
                        }
                        return player.hp + player.countCards('h', (c) => get.tag(c, 'recover')) - 1;
                    }, //返回数字而不是true
                },
            },
        },
    },
    QQQ_shuangjia: {
        init(player) {
            player.storage.QQQ_shuangjia = Array.from(ui.cardPile.childNodes).slice(0, 4);
        },
        mod: {
            ignoredHandcard(card, player) {
                if (player.storage.QQQ_shuangjia.includes(card)) {
                    return true;
                }
            },
            cardDiscardable(card, player, name) {
                if (name == 'phaseDiscard' && player.storage.QQQ_shuangjia.includes(card)) {
                    return false;
                }
            },
            globalTo(from, to, distance) {
                return distance + to.countCards('h', (card) => to.storage.QQQ_shuangjia.includes(card));
            },
            cardUsable(card, player) {
                return Infinity;
            },
            targetInRange(card, player) {
                return true;
            },
        },
        mark: true,
        intro: {
            name: '霜笳',
            content: 'cards',
            mark(dialog, storage, player) {
                dialog.addSmall(player.storage.QQQ_shuangjia);
            },
        },
        trigger: {
            player: ['loseBegin'],
        },
        filter(event, player) {
            return event.cards && event.cards.some((q) => player.storage.QQQ_shuangjia.includes(q));
        },
        forced: true,
        async content(event, trigger, player) {
            for (const card of trigger.cards.filter((q) => player.storage.QQQ_shuangjia.includes(q))) {
                const cards = [];
                const suits = lib.suits.filter((q) => q != card.suit);
                for (const suit of suits) {
                    const cardx = get.cardPile((c) => c.suit == suit);
                    if (cardx) {
                        cards.push(cardx);
                    }
                }
                if (cards.length) {
                    await player.gain(cards, 'gain2');//不await的话两次都会检索同一批牌
                }
            }
        },
        group: ['QQQ_shuangjia_1'],
        subSkill: {
            1: {
                trigger: {
                    global: ['phaseBegin'],
                },
                forced: true,
                async content(event, trigger, player) {
                    if (!player.storage.QQQ_shuangjia || player.storage.QQQ_shuangjia.length < 4) {
                        player.storage.QQQ_shuangjia = Array.from(ui.cardPile.childNodes).slice(0, 4);
                    }
                    player.gain(player.storage.QQQ_shuangjia, 'gain2').gaintag = ['QQQ_shuangjia'];
                },
            },
        },
    },
    QQQ_jinfa: {
        trigger: {
            global: ['logSkillBegin'],
        },
        silent: true,
        usable: 1,//silent发动的触发技不会logskill所以就没有round限制
        filter: (event, player) => event.player.isEnemiesOf(player),
        async content(event, trigger, player) {
            const { result } = await player.chooseBool(`终止${get.translation(trigger.skill)}的发动`).set('ai', () => -get.attitude(trigger.player, player) * Number(trigger.skill != 'QQQ_kuangfeng'));
            if (result.bool) {
                trigger.parent.next = trigger.parent.next.filter((q) => q.name != trigger.skill);
                game.log(player, `终止${get.translation(trigger.skill)}的发动`);
            }
        },
    },
    QQQ_tuntian: {
        audio: 'tuntian',
        trigger: {
            player: ['loseAfter'],
        },
        forced: true,
        filter: (event, player) => _status.currentPhase != player,
        async content(event, trigger, player) {
            var num = trigger.cards.length;
            const Q = [];
            while (num > 0) {
                const result = await player
                    .chooseTarget(`获得任意名角色区域内的至多${num}张牌`, (card, player, target) => {
                        return (
                            target != player &&
                            target.hasCard((T) => {
                                const G = _status.event.Q.find((item) => item[0] == target);
                                if (G && G[1].includes(T)) {
                                    return false;
                                }
                                return lib.filter.canBeGained(T, player, target);
                            }, 'hej')
                        );
                    })
                    .set('ai', (target) => {
                        const player = _status.event.player,
                            G = _status.event.Q.find((item) => item[0] == target);
                        if (G && G[1].length >= target.countCards('he')) {
                            return 0;
                        }
                        return get.effect(target, { name: 'shunshou' }, player, player);
                    })
                    .set('Q', Q)
                    .forResult();
                if (result.bool) {
                    const target = result.targets[0];
                    const cards = await player
                        .choosePlayerCard(target, true, 'hej', [1, num], `选择获得${get.translation(target)}区域内的牌`)
                        .set('filterButton', (button) => {
                            const card = button.link,
                                target = _status.event.target,
                                player = get.player();
                            const G = _status.event.Q.find((item) => item[0] == target);
                            if (G && G[1].includes(card)) {
                                return false;
                            }
                            return lib.filter.canBeGained(card, player, target);
                        })
                        .set('Q', Q)
                        .set('ai', (button) => {
                            if (ui.selected.buttons.length) {
                                return false;
                            }
                            var val = get.buttonValue(button, _status.event.target);
                            if (get.attitude(_status.event.player, _status.event.target) > 0) {
                                return -val;
                            }
                            return val;
                        })
                        .forResultCards();
                    num -= cards.length;
                    const index = Q.find((item) => item[0] == target);
                    if (!index) {
                        Q.push([target, cards]);
                    } else {
                        index[1].addArray(cards);
                    }
                } else {
                    break;
                }
            }
            if (num > 0) {
                player.draw(num);
            }
            if (Q.length) {
                if (Q[0].length == 1) {
                    player.gain(Q[0][1], 'gain2');
                } else {
                    for (const i of Q) {
                        player.gain(i[1], 'gain2');
                    }
                }
            }
        },
    },
    QQQ_junlve: {
        audio: 'nzry_junlve',
        intro: {
            content: '当前有#个标记',
        },
        trigger: {
            player: 'damageAfter',
            source: 'damageSource',
        },
        forced: true,
        content() {
            player.addMark('QQQ_junlve', trigger.num);
        },
    },
    QQQ_cuike: {
        audio: 'nzry_cuike',
        trigger: {
            player: 'phaseUseBegin',
        },
        forced: true,
        async content(event, trigger, player) {
            //QQQ
            const num = player.countMark('QQQ_junlve');
            if (num % 2 == 1) {
                const { result } = await player.chooseTarget(`是否发动【摧克】,对一名角色造成${num}点伤害`).set('ai', (target) => -get.attitude(player, target));
                if (result.bool) {
                    result.targets[0].damage(num);
                }
            } else {
                const { result } = await player.chooseTarget(`是否发动【摧克】,横置一名角色并弃置其区域内的${num || 1}张牌`).set('ai', (target) => -get.attitude(player, target));
                if (result.bool) {
                    result.targets[0].link(true);
                    player.discardPlayerCard(result.targets[0], num || 1, 'hej', true);
                }
            }
            if (num > 7) {
                const { result } = await player
                    .chooseBool()
                    .set('ai', function () {
                        return true;
                    })
                    .set('prompt', `是否弃置所有<军略>标记并对所有其他角色造成${num}点伤害`);
                if (result.bool) {
                    for (const i of game.players) {
                        if (i != player) {
                            player.line(i);
                            i.damage(num);
                        }
                    }
                    player.removeMark('QQQ_junlve', num);
                }
            }
        },
    },
    QQQ_dinghuo: {
        audio: 'nzry_dinghuo',
        limited: true,
        intro: {
            content: 'limited',
        },
        mark: true,
        skillAnimation: true,
        animationColor: 'metal',
        enable: 'phaseUse',
        filter(event, player) {
            return player.countMark('QQQ_junlve') > 0;
        },
        check(event, player) {
            return game.players.some((q) => q.isEnemiesOf(player) && q.isLinked() && q.countCards('e') > 1);
        },
        filterTarget(card, player, target) {
            return target.isLinked();
        },
        selectTarget() {
            return [1, _status.event.player.countMark('QQQ_junlve')];
        },
        multiline: true,
        multitarget: true,
        async content(event, trigger, player) {
            //QQQ
            player.awakenSkill('QQQ_dinghuo');
            const num = player.countMark('QQQ_junlve');
            for (const i of event.targets) {
                i.discard(i.getCards('e'));
            }
            const { result } = await player.chooseTarget(true, `对一名目标角色造成${num}点火焰伤害`, function (card, player, target) {
                return event.targets.includes(target);
            });
            if (result.bool) {
                result.targets[0].damage(player.countMark('QQQ_junlve'), 'fire', 'nocard');
                player.removeMark('QQQ_junlve', player.countMark('QQQ_junlve'));
            }
        },
        ai: {
            order: 1,
            fireAttack: true,
            result: {
                target(player, target) {
                    if (target.hasSkillTag('nofire')) return 0;
                    return get.damageEffect(target, player) - target.countCards('e');
                },
            },
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
    //绝情:当你造成/受到伤害时,你可以弃置任意张牌,此伤害改为体力流失.若你弃置超过牌数大于对方体力值,你令此伤害+1/-1.<span class="Qmenu">锁定技,</span>当一名角色进入濒死状态时,若无伤害来源,你增加一点体力上限
    QQQ_jueqing: {
        trigger: {
            player: ['damageBefore'],
            source: ['damageBefore'],
        },
        forced: true,
        async content(event, trigger, player) {
            //QQQ
            const { result: { cards } } = await player.chooseToDiscard('弃置任意张牌,此伤害改为体力流失', 'he', [1, player.countCards('he')]).set('ai', (card) => {
                if (trigger.player == player) {
                    if (get.tag(card, 'recover')) return -1;
                    if (!player.isPhaseUsing() || (player.isPhaseUsing() && !player.hasValueTarget(card, null, true))) return 10;
                    return -1;
                } else {
                    if (get.tag(card, 'recover')) return -1;
                    if (trigger.player.isFriendsOf(player) && (trigger.player.hasSkillTag('maihp') || trigger.player.hasSkillTag('maixie_defend') || trigger.player.hasSkillTag('maixie'))) {
                        return -1;
                    }
                    if (trigger.player.isEnemiesOf(player) && (trigger.player.hasSkillTag('maihp') || trigger.player.hasSkillTag('maixie_defend') || trigger.player.hasSkillTag('maixie'))) {
                        return 10;
                    }
                    if (!player.isPhaseUsing() || (player.isPhaseUsing() && !player.hasValueTarget(card, null, true))) return 10;
                    return -1;
                }
            });
            if (cards?.length) {
                if (trigger.player == player && (!trigger.source || cards.length > trigger.source.hp)) {
                    trigger.num--;
                } else if (trigger.source == player && cards.length > trigger.player.hp) {
                    trigger.num++;
                }
                trigger.cancel();
                trigger.player.loseHp(trigger.num);
            }
        },
        group: ['QQQ_jueqing_1'],
        subSkill: {
            1: {
                trigger: {
                    global: ['dying'],
                },
                forced: true,
                filter(event, player) {
                    if (event.parent.name == 'damage' && event.parent.source) {
                        return false;
                    }
                    return true;
                },
                async content(event, trigger, player) {
                    //QQQ
                    player.gainMaxHp();
                },
            },
        },
    },
    //伤逝:你手牌数始终不小于已损体力值(至少为1),你以此法获得的牌不可被响应且无次数距离限制
    QQQ_shangshi: {
        mod: {
            cardUsable(card, player, num) {
                if (card.cards?.some((q) => q.gaintag?.includes('QQQ_shangshi'))) {
                    return Infinity;
                }
            },
            targetInRange(card, player) {
                if (card.cards?.some((q) => q.gaintag?.includes('QQQ_shangshi'))) {
                    return true;
                }
            },
        },
        trigger: {
            player: ['loseAfter', 'changeHp'],
        },
        forced: true,
        filter: (event, player) => player.countCards('h') < numberq1(player.maxHp - player.hp),
        async content(event, trigger, player) {
            player.drawTo(numberq1(player.maxHp - player.hp)).gaintag = ['QQQ_shangshi'];
        },
        group: ['QQQ_shangshi_1'],
        subSkill: {
            1: {
                trigger: {
                    player: ['useCardToBefore'],
                },
                forced: true,
                filter(event, player) {
                    return event.cards?.some((card) => card.gaintag?.includes('QQQ_shangshi'));
                },
                async content(event, trigger, player) {
                    trigger.directHit = true;
                },
            },
        },
    },
    QQQ_zhuiyi: {
        trigger: {
            global: ['loseAfter'],
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
                    return game.qcard(player, false, true, false).some((q) => player.storage.QQQ_zhuiyi.includes(q[2]));
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
                        list = game.qcard(player, false, true, false).filter((q) => player.storage.QQQ_zhuiyi.includes(q[2]));
                    }
                    if (list.length) {
                        const {
                            result: { links },
                        } = await player.chooseButton(['视为使用或打出对应基本牌/锦囊牌', [list, 'vcard']])
                            .set('ai', (button) => {
                                const num = player.getUseValue({
                                    name: button.link[2],
                                    nature: button.link[3],
                                }, null, true);
                                if (evt.name == '_wuxie') {
                                    return -get.attitude(player, evt.getParent('useCard').player);
                                }
                                return number0(num) / 2 + 10;
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
    //你的手牌上限+x,摸牌阶段你多摸x张牌,x为你的体力上限
    QQQ_yingzi: {
        mod: {
            maxHandcard(player, num) {
                return (num = player.maxHp + player.hp);
            },
        },
        trigger: {
            player: 'phaseDrawBegin2',
        },
        forced: true,
        content() {
            trigger.num += player.maxHp;
        },
    },
    //当你使用红色牌或成为牌的唯一目标后,你摸一张牌,当你于因此摸牌数首次达到X张牌后,将记录值清零,你增加一点体力上限,选择一项:①回满体力;②摸X张牌;③获得<英魂>;④获得<英姿>.x为你的体力上限.
    QQQ_jiang: {
        trigger: {
            global: ['useCardBefore'],
        },
        forced: true,
        init: (player) => (player.storage.QQQ_jiang = 0),
        filter: (event, player) => (event.targets && event.targets.length == 1 && event.targets[0] == player) || (event.player == player && get.color(event.card) == 'red'),
        async content(event, trigger, player) {
            //QQQ
            player.draw();
            player.storage.QQQ_jiang++;
            if (player.storage.QQQ_jiang > player.maxHp) {
                player.storage.QQQ_jiang -= player.maxHp;
                player.maxHp++;
                const control = [`摸${player.maxHp}张牌`];
                if (player.hp < player.maxHp) {
                    control.push('回满体力');
                }
                if (!player.hasSkill('QQQ_yinghun')) {
                    control.push('获得<英魂>');
                }
                if (!player.hasSkill('QQQ_yingzi')) {
                    control.push('获得<英姿>');
                }
                const { result } = await player.chooseControl(control).set('ai', () => {
                    if (player.hp < 3) {
                        return '回满体力';
                    }
                    if (control.includes('获得<英魂>')) {
                        return '获得<英魂>';
                    }
                    if (control.includes('获得<英姿>')) {
                        return '获得<英姿>';
                    }
                    if (player.maxHp > 2 * player.hp) {
                        return '回满体力';
                    }
                    return `摸${player.maxHp}张牌`;
                });
                if (result.control == '回满体力') {
                    player.hp = player.maxHp;
                    game.log(player, '回满体力');
                }
                if (result.control == `摸${player.maxHp}张牌`) {
                    player.draw(Math.min(player.maxHp, 20));
                }
                if (result.control == '获得<英魂>') {
                    player.addSkill('QQQ_yinghun');
                }
                if (result.control == '获得<英姿>') {
                    player.addSkill('QQQ_yingzi');
                }
            }
        },
    },
    //准备阶段,你可以弃置一名角色至多X张牌,令一名角色摸剩余数量张牌
    QQQ_yinghun: {
        trigger: {
            global: ['roundStart'],
        },
        forced: true,
        async content(event, trigger, player) {
            //QQQ
            const { result } = await player.chooseTarget(`弃置一名角色至多${player.maxHp}张牌`, (c, p, t) => t.countCards('he'))
                .set('ai', (target) => -get.attitude(player, target));
            if (result.targets && result.targets[0]) {
                const { result: result1 } = await player.discardPlayerCard(result.targets[0], 'he', [1, Math.min(result.targets[0].countCards('he'), player.maxHp)]);
                if (result1?.cards?.length) {
                    player.draw(player.maxHp - result1.cards.length);
                } else {
                    player.draw(Math.min(player.maxHp, 20));
                }
            } else {
                player.draw(Math.min(player.maxHp, 20));
            }
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
    //裂石:锁定技,你使用的【杀】无视防具,没有防具的角色需要使用两张【闪】来抵消此【杀】.你使用【杀】造成伤害后,本回合你与受伤角色计算与对方的距离+1
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
                    player: ['useCardToPlayered'],
                },
                forced: true,
                filter(event, player) {
                    return event.card.name == 'sha' && !event.parent.directHit.includes(event.target) && !event.target.getEquip(2);
                },
                logTarget: 'target',
                async content(event, trigger, player) {
                    const id = trigger.target.playerid;
                    const map = trigger.parent.customArgs;
                    if (!map[id]) map[id] = {};
                    if (typeof map[id].shanRequired == 'number') {
                        map[id].shanRequired++;
                    } else {
                        map[id].shanRequired = 2;
                    }
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
    '': {
        trigger: {
            source: 'damageBefore',
        },
        _priority: 16,
        check() {
            return false;
        },
        content() {
            trigger.player.hp--;
        },
    },
    QQQ_guanxing: {
        audio: 'guanxing',
        audioname: ['jiangwei', 're_jiangwei', 're_zhugeliang', 'gexuan', 'ol_jiangwei'],
        trigger: {
            player: ['phaseZhunbeiBegin', 'phaseJieshuBegin'],
        },
        forced: true,
        async content(event, trigger, player) {
            //QQQ
            var num = 7;
            var cards = get.cards(num);
            game.cardsGotoOrdering(cards);
            const { result: { moved } } = await player
                .chooseToMove()
                .set('list', [['牌堆顶', cards], ['牌堆底']])
                .set('prompt', '将牌移动到牌堆顶或牌堆底')
                .set('processAI', function (list) {
                    var cards = list[0][1];
                    var target = trigger.name == 'phaseZhunbei' ? player : player.next;
                    var att = get.sgn(get.attitude(player, target));
                    var top = [];
                    if (target.countCards('j')) {
                        for (const i of player.getCards('j')) {
                            var judge = get.judge(i);
                            cards.sort((a, b) => (judge(b) - judge(a)) * att); //态度大于0就把价值高的牌放前面
                            top.push(cards.shift());
                        }
                    } else {
                        cards.sort((a, b) => (get.value(b) - get.value(a)) * att); //态度大于0就把价值高的牌放前面
                        while (cards.length) {
                            if (get.value(cards[0]) < 6 == att > 0) {
                                break;
                            }
                            top.push(cards.shift());
                        }
                    }
                    return [top, cards];
                }); //给别人观星
            if (moved?.length) {
                moved[0].reverse();
                for (const i of moved[0]) {
                    ui.cardPile.insertBefore(i, ui.cardPile.firstChild);
                }
                for (const i of moved[1]) {
                    ui.cardPile.appendChild(i);
                }
                player.popup(get.cnNumber(moved[0].length) + `上${get.cnNumber(moved[1].length)}下`);
                game.log(player, `将${get.cnNumber(moved[0].length)}张牌置于牌堆顶`);
                game.updateRoundNumber();
            }
        },
    },
    QQQ_guanxing1: {
        _priority: 35,
        trigger: {
            player: 'phaseZhunbeiBegin',
        },
        forced: true,
        async content(event, trigger, player) {
            //QQQ
            var cards = get.cards(20);
            game.cardsGotoOrdering(cards);
            const { result: { moved } } = await player
                .chooseToMove()
                .set('list', [['牌堆顶', cards], ['牌堆底']])
                .set('prompt', '将牌移动到牌堆顶或牌堆底')
                .set('processAI', function (list) {
                    var cards = list[0][1];
                    var top = [];
                    if (player.countCards('j')) {
                        for (const i of player.getCards('j')) {
                            var judge = get.judge(i);
                            cards.sort((a, b) => judge(b) - judge(a)); //态度大于0就把价值高的牌放前面//返回正值就是b在a前
                            top.push(cards.shift());
                        }
                    } else {
                        cards.sort((a, b) => get.value(b) - get.value(a)); //态度大于0就把价值高的牌放前面
                        while (cards.length) {
                            if (get.value(cards[0]) < 6) {
                                break;
                            }
                            top.push(cards.shift());
                        }
                    }
                    return [top, cards];
                }); //自己观星
            if (moved?.length) {
                moved[0].reverse();
                for (const i of moved[0]) {
                    ui.cardPile.insertBefore(i, ui.cardPile.firstChild);
                }
                for (const i of moved[1]) {
                    ui.cardPile.appendChild(i);
                }
                player.popup(get.cnNumber(moved[0].length) + `上${get.cnNumber(moved[1].length)}下`);
                game.log(player, `将${get.cnNumber(moved[0].length)}张牌置于牌堆顶`);
                game.updateRoundNumber();
            }
        },
    },
    检测: {
        enable: "phaseUse",
        usable: 1,
        filter(event, player) {
            return Array.from(ui.cardPile.childNodes).slice(0, 6).filter((q) => event.filterCard(q, player, event) && player.hasUseTarget(q, true, true)).length;
        },
        chooseButton: {
            dialog(event, player) {
                const list = get.cards(6).filter((q) => event.filterCard(q, player, event) && player.hasUseTarget(q, true, true));
                return ui.create.dialog("选择一张牌使用", list);
            },
            check(button) {
                return get.value(button.link);
            },
            backup(links, player) {
                return {
                    filterCard() {
                        return false;
                    },
                    selectCard: -1,
                    viewAs: links[0],
                    async precontent(event, trigger, player) {
                        ui.discardPile.appendChild(links[0]);//QQQ
                    },
                };
            },
            prompt(links, player) {
                return "选择" + get.translation(links) + "的目标";
            },
        },
        ai: {
            order: 12,
            result: {
                player: 1,
            },
            threaten: 1.5,
        },
    },
    测试: {
        _priority: 34,
        trigger: {
            global: ['phaseBegin'],
        },
        forced: true,
        init: (player) => game.over = () => game.kong,
        mod: {
            targetEnabled(card, player, target, now) {
                if (card.name == "sha" || card.name == "juedou") return false;
            },
        },
        async content(event, trigger, player) {
            //QQQ
            const {
                result: { targets },
            } = await player.chooseTarget(true).set('ai', (target) => -get.attitude(player, target));
            if (targets && targets[0]) {
                //targets[0].CS();
                targets[0].damage();
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
        get usable() {
            return 2;
        }, //只读
        init(player) {
            game.over = () => game.kong;
            console.log(Object.keys(lib.characterPack));
            player.init = () => game.kong;
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
            game.bug = [];
            var Q = 'scqh'; //mode_extension_xxx///
            for (var j in lib.characterPack[Q]) {
                game.bug.addArray(lib.characterPack[Q][j][3].filter((Q) => Q != 'dualside'));
            }
            game.bug.unique();
            game.log(`当前武将包有${game.bug.length}个技能`);
        },
        _priority: 9,
        async content(event, trigger, player) {
            //QQQ
            var Q = game.bug.slice(300, 400).filter((Q) => Q != 'scqhPcr_duzhuo' && Q != 'radiance_cailin'); //(0, 50)改为要测的区间
            console.log(Q, 'game.bug');
            const {
                result: { bool },
            } = await player.chooseBool().set('ai', () => true); //开局点确认加入技能
            if (bool) {
                //var Q = 'bhzhilin';
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
                content() {
                    if (['phaseUse', 'damage'].includes(trigger.name)) {
                        Reflect.defineProperty(trigger, 'finished', {
                            get: () => trigger.step > 5,
                            set() { },
                        });
                        Reflect.defineProperty(trigger, 'skipped', {
                            get: () => false,
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
                        Reflect.defineProperty(trigger, 'finished', {
                            get: () => trigger.step > 12,
                            set() { },
                        });
                    }
                },
            },
        },
    },
};
const translate1 = {
    QQQ_chuanyang: '穿杨',
    QQQ_chuanyang_info: '出牌阶段,你可以将X字的牌当做无次数限制的【杀】对与你距离为X的角色使用.以此法造成伤害后,你摸X张牌(X为此阶段已使用牌的次数)',
    QQQ_lieshi: '裂石',
    QQQ_lieshi_info: '<span class="Qmenu">锁定技,</span>你使用的【杀】无视防具,没有防具的角色需要使用两张【闪】来抵消此【杀】.你造成伤害后,直到你下回合开始,你与受伤角色计算与对方的距离+1',
    QQQ_hunzi_1: '无敌',
    QQQ_hunzi_1_info: '<span class="Qmenu">锁定技,</span>你的体力值不会减少',
    QQQ_yingzi: '英姿',
    QQQ_yingzi_info: '<span class="Qmenu">锁定技,</span>你的手牌上限+x,摸牌阶段你多摸x张牌,x为你的体力上限',
    QQQ_jiang: '激昂',
    QQQ_jiang_info: '<span class="Qmenu">锁定技,</span>当你使用红色基本牌或成为牌的唯一目标后,你摸一张牌,当你于因此摸牌数首次达到X张牌后,将记录值清零,你增加一点体力上限,选择一项:①回满体力;②摸X张牌;③获得<英魂>;④获得<英姿>.x为你的体力上限',
    QQQ_yinghun: '英魂',
    QQQ_yinghun_info: '准备阶段,你可以弃置一名角色至多X张牌,令一名角色摸剩余数量张牌,x为你的体力上限',
    QQQ_zhuiyi: '追憶',
    QQQ_zhuiyi_info: '<span class="Qmenu">锁定技,</span>当有牌进入弃牌堆时,若未记录此牌名,则记录之.你可以移除一项记录,视为使用或打出此牌(无距离次数限制)',
    QQQ_shenshang: '神傷',
    QQQ_shenshang_info: '<span class="Qmenu">锁定技,</span>其他角色无法使用或打出你记录的牌名',
    QQQ_jueqing: '绝情',
    QQQ_jueqing_info: '当你造成/受到伤害时,你可以弃置任意张牌,此伤害改为体力流失.若你弃置超过牌数大于对方体力值,你令此伤害+1/-1.<span class="Qmenu">锁定技,</span>当一名角色进入濒死状态时,若无伤害来源,你增加一点体力上限',
    QQQ_shangshi: '伤逝',
    QQQ_shangshi_info: '<span class="Qmenu">锁定技,</span>你手牌数始终不小于已损体力值(至少为1),你以此法获得的牌不可被响应且无次数距离限制',
    QQQ_neifa: '内伐',
    QQQ_neifa_info: '出牌阶段开始时,你可以视为对自己使用一张【决斗】;当你为此【决斗】响应:第奇数次后,你摸三张牌;第偶数次后,你本回合获得「挑衅」「无双」「乱击」中的前一个',
    QQQ_junlve: '军略',
    QQQ_junlve_info: '<span class="Qmenu">锁定技,</span>当你受到或造成伤害后,你获得X个<军略>标记(X为伤害点数)',
    QQQ_cuike: '摧克',
    QQQ_cuike_info: '出牌阶段开始时,若<军略>标记的数量为奇数,你可以对一名角色造成军略数点伤害;若<军略>标记的数量为偶数,你可以横置一名角色并弃置其区域内的军略数张牌.然后,若<军略>标记的数量超过7个,你可以移去全部<军略>标记并对所有其他角色造成军略数点伤害.',
    QQQ_dinghuo: '绽火',
    QQQ_dinghuo_info: '限定技,出牌阶段,你可以移去全部<军略>标记,令至多等量的已横置角色弃置所有装备区内的牌.然后,你对其中一名角色造成军略数点火焰伤害.',
    QQQ_tuntian: '屯田',
    QQQ_tuntian_info: '<span class="Qmenu">锁定技,</span>回合外失去x张牌后,你可以获得其他角色的y张牌(y不大于x),然后摸x-y张牌',
    QQQ_jinfa: '禁法',
    QQQ_jinfa_info: '每轮限一次,你可以终止一个触发技的发动',
    QQQ_shuangjia: '霜笳',
    QQQ_shuangjia_info: '<span class="Qmenu">锁定技,</span>①游戏开始,你将牌堆顶四张牌标记为<霜笳>.②你的<霜笳>牌不计入手牌上限.③其他角色至你的距离+<霜笳>数.①当你失去牌后,若这些牌中有<霜笳>牌,你获得与此牌花色均不同牌各一张.②你使用牌无距离和次数限制③每回合开始时你获得所有<霜笳>牌',
    QQQ_kurou: '苦肉',
    QQQ_kurou_info: '出牌阶段你可以失去一点体力增加一个回合',
    QQQ_bianshen: '变身',
    QQQ_bianshen_info: '<span class="Qmenu">锁定技,</span>每回合开始时你随机变为其他一个角色,若你技能数大于36,则你清空技能',
    '': `<input type="button" value="空字符串" onclick="alert('QQQ')">`,
    _info: `<input type="button" value="这是一个空字符串" onclick="alert('QQQ')">`,
    undefined: 'undefined',
    undefined_info: '这是一个undefined',
    QQQ_pianan: '偏安',
    QQQ_pianan_info: '<span class="Qmenu">锁定技,</span>每当你获得牌后,你弃置区域内所有伤害牌,并增加等量手牌上限.当你成为伤害牌的目标后,你将手牌摸至手牌上限,因此获得至少两张牌后,你的手牌上限-1',
    QQQ_tushe: '图射',
    QQQ_tushe_info: '限定技,出牌阶段开始时,若你的手牌数大于等于手牌上限,你可以令你的手牌上限减至0,弃置所有手牌,获得等量无次数限制的【杀】,将<偏安>修改为非<span class="Qmenu">锁定技,</span>本回合你每造成1点伤害,你的手牌上限+1',
    QQQ_dongfeng: '东风',
    QQQ_dongfeng_info: '游戏开始时,你将所有七点数牌当作<东风>置于武将牌上.每轮开始时,你将牌堆顶一张牌置入<东风>,然后你任意交换手牌与<东风>,然后你选择任意名角色,赋予其<大雾>或<狂风>标记,并弃置等量的<东风>',
    QQQ_dongfeng_append: '<大雾><span class="Qmenu">锁定技,</span>当你受到伤害时,若其的属性与随机一种属性不相同,则你防止之<br><狂风><span class="Qmenu">锁定技,</span>你受到的属性伤害翻倍',
    QQQ_dawu: '大雾',
    QQQ_dawu_info: '<span class="Qmenu">锁定技,</span>当你受到伤害时,若其的属性与随机一种属性不相同,则你防止之',
    QQQ_kuangfeng: '狂风',
    QQQ_kuangfeng_info: '<span class="Qmenu">锁定技,</span>你受到的属性伤害翻倍',
    QQQ_kangzou: '抗揍',
    QQQ_kangzou_info: '每回合限x次,当你需使用或打出牌时,若其牌名未记录,则你记录之,并视为使用或打出此牌,而后你增加一点体力上限,并将手牌补至体力上限(x为每回合开始时你的体力上限/因此法使用的牌不记入次数限制).每当你进入濒死时,若你有未记录的牌名,随机记录一个未记录牌名,然后回复体力至一点',
    QQQ_xiangyun: '香陨',
    QQQ_xiangyun_info: '使命技,游戏开始时,你将牌堆顶X张牌置于武将牌上称为<香>,X为场上角色数一半向下取整.<br>①每轮开始时,你需将至少一张花色各不相同的牌(二或更多周目则没有花色限制)置入<香>,然后摸 等量(二或更多周目则改为双倍)的牌.<br>②场上角色的出牌阶段开始时,若其为你或手牌数小于体力值,其可以获得你的一张<香>,<br>③成功:准备阶段,若你的<香>包含三种花色(二或更多周目则改为四种),则你获得所有<香>,并回复一点体力,然后在本轮结束时重新激活并令周目数+1.<br>④失败:准备阶段,若你没有<香>,你失去一点体力并重铸所有手牌,然后在本轮结束时重新激活(不过不增加周目数)',
    QQQ_yaoyi: '妖异',
    QQQ_yaoyi_info: '你可以将【小狐】或非手牌区一张牌当做一张基本牌使用或打出.然后若以此法使用或打出的牌为【小狐】,则在结算完成后插入牌堆随机位置',
    QQQ_taye: '踏野',
    QQQ_taye_info: '当你使用一张牌后,你可以从弃牌堆中选择至多[1]张与此牌类型相同的其他牌,将这些牌置于牌堆底,然后展示牌堆顶等量张牌.然后将与触发技能的牌类型不同的置入弃牌堆,其余牌由你依次分配给场上角色.<br>当有牌不因使用而进入弃牌堆时,你令下次发动此技能时,方括号内的数字+1,至多加至5',
    QQQ_yuepu: '乐谱',
    QQQ_yuepu_info: '<span class="Qmenu">锁定技,</span>每回合限5次,每当你使用一张牌后你摸一张牌,根据该牌花色(♥️1. 升号(♯):表示升高半音.♠️2. 降号(♭):表示降低半音.♣️3. 重升号(×):表示升高一个全音.♦️4. 重降号(♭♭):表示降低一个全音.这是由两个降记号合在一起而成.无花色:5. 还原号(♮):表示将已升高或降低的音还原,也可以叫本位号.)记录在你的乐谱库中,每当你的乐谱库中符号不小于2时,你可选择移除3个乐谱符,令一名角色根据乐谱执行以下效果:升符:依次展示3张牌数递增的牌,否则失去一点体力降符:依次展示3张牌数递减的牌,否则弃置3张牌重升符:展示3张牌这些牌点数和大于其其余牌点数和,否则失去一点体力上限重降符:展示3张牌这些牌点数和小于其其余牌点数和,否则弃置全部装备牌和3张手牌还原符:依次展示3张牌点数相差不大于3的牌,否则令你获得其3张牌并令你获得一张灵芝,你于回合内使用前5张牌无次数距离限制弃牌阶段弃牌后,你可令一名角色弃置两张牌,若其中的一个花色牌大于2,你添加该花色对应的乐谱库至你的乐谱库中',
    QQQ_ranshang: '燃殤',
    QQQ_ranshang_info: '<span class="Qmenu">锁定技,</span>当你受到火属性伤害时,伤害翻倍且获得等同于伤害数量<燃>.你的结束阶段受到<燃>标记数点火属性伤害.多目标牌和普通杀对你无效,当游戏轮数大于10时,你所在阵营获胜',
    QQQ_luanwu: '乱武',
    QQQ_luanwu_info: '回合限一次,你可令所有角色依次选择视为使用一张无距离限制的杀或者伤害锦囊,若存在其他角色在<乱武>之后体力值未减少,则再发动一次<乱武>',
    QQQ_weimu: '帷幕',
    QQQ_weimu_info: '<span class="Qmenu">锁定技,</span>由你自己作为来源或回合内体力值与体力上限变化后,你摸变化值两倍的牌,然后免疫之.你不能成为黑色牌的目标',
    QQQ_wansha: '完杀',
    QQQ_wansha_info: '<span class="Qmenu">锁定技,</span>一名角色体力值每累计变化两次后,你视为对其使用一张杀.你对体力值不大于你的角色造成的伤害翻倍',
    雄略: '雄略',
    雄略_info: '当你成为伤害牌的目标时,你可以弃置x张牌交换此牌使用者与目标',
    温柔一刀: `<a href='https://qm.qq.com/q/SsTlU9gc24'><span style='animation: fairy 20s infinite; -webkit-animation: fairy 20s infinite;'>温柔一刀</span></a>`,
    诗寇蒂的剪刀: '诗寇蒂的剪刀',
    诗寇蒂的剪刀_info: '回合开始时,你可以永久裁剪掉自己的任意个阶段,并将其赋予任意角色,且可以插入任意位置.回合开始时,你摸当前缺失阶段数量的牌',
    QQQ_biaoji: '标记',
    QQQ_biaoji_info: '你可以将你的标记当作任意一张牌使用与打出,当你的标记数变化,你摸一张牌',
    激将: '激将',
    激将_info: '当你需要砍人时,你可令一名有杀的蜀势力角色替你使用与打出',
    武绝: '武绝',
    武绝_info: '五轮限一次,你可以将一名其他角色置入你的装备区三回合',
    影火: `<a href='https://qm.qq.com/q/SsTlU9gc24'><span style='animation: fairy 20s infinite; -webkit-animation: fairy 20s infinite;'>影火</span></a>`,
    影火_info: '<span class="Qmenu">锁定技,</span>牌堆顶4张牌始终对你可见;你可将其如手牌般使用与打出',
    置幻: '置幻',
    置幻_info: '一名角色使用非转化牌时,若【花招】中不含此牌名,你可以令包含此牌花色的选项失效,并交换此牌与【花招】描述中花色相同的选项的牌名.当【花招】没有可用选项时,恢复所有选项',
    称象: '称象',
    称象_info: '出牌阶段限一次,将手牌与场上共计至多四张点数之和不小于牌堆顶四张牌的牌置于牌堆顶并获得牌堆顶四张牌',
    花招: '花招',
    花招_info: '每回合限一次,你可以重铸所有:1.红桃手牌,视为使用【桃】;2.黑桃手牌,视为使用【杀】;3.方块手牌,视为使用【酒】;4.梅花手牌,视为使用【闪】.选择完毕后令该项失效.当【花招】没有可用选项时,恢复所有选项',
    求贤若渴: '求贤若渴',
    求贤若渴_info: '出牌阶段,你声明一个花色及类别,然后亮出牌堆顶3张牌,你获得与你声明相符的牌.若有两项皆满足的牌,你回复一点体力',
    魔翼: '魔翼',
    魔翼_info: '当你体力值变化一点后,你可以摸一张牌并用一张牌,直到你没有使用牌',
    mianze: '绵泽',
    mianze_info: '嵌套用牌',
    bug: 'bug',
    bug_info: '测bug专用',
    蛊惑: '蛊惑',
    蛊惑_info: '出牌阶段限一次,你可以将牌堆底一张牌扣置当任意一张基本牌或普通锦囊牌使用或打出.其他所有角色依次选择是否质疑,有人质疑则翻开此牌:若此牌与你声明的牌相同,质疑者获得一个<惑>标记;反之则此牌作废,你本回合对质疑者使用牌无距离次数限制,每有一个质疑者,你增加一次蛊惑次数;拥有<惑>标记的角色不可质疑你的惑论.每回合结束时你可以移除惑标记,然后视为使用移除的标记数张任意牌',
    煽火: '煽火',
    煽火_info: '每轮限一次,当一名角色受到伤害后,你可以发起一次议事,若结果为红色,伤害来源需交给受伤者X张牌(X为受伤者已损失的体力值)并失去一点体力;若结果为黑色,伤害来源需选择一项:1.不能使用或打出手牌直到本轮结束:2.将武将牌翻至背面:若受伤者为你,则你发动此技能无次数限制.<span class="Qmenu">锁定技,</span>当场上有<惑>的角色数不小于未拥有<惑>角色时,你[议事/拼点!时「拥有<惑>的角色的意见视为与你相同/此牌点数+31',
    天启: '天启',
    天启_info: '出牌阶段限九次,你可以创造一张地图/法术/神器/机关/食物牌,然后你获得一个随机正面效果',
    _append: '',
    _ab: '',
    合包: '合包',
    合包_info: '游戏开始时你获得一条扩展时间线,每个回合开始时你可以选择跳跃时间线或者推进时间线,时间线推进到一定程度会触发合并时间线',
    群起: '群起',
    群起_info: '出牌阶段,你可以弃置两张牌,并令所有拥有<群起>的角色摸两张牌,然后可以令一名未拥有<群起>的角色获得<群起>',
    斩杀: '斩杀',
    斩杀_info: '<span class="Qmenu">锁定技,</span>你的回合内,当有角色体力值小于二时,你获得其所有手牌并且对其使用牌无次数限制和距离',
    自书: '自书',
    自书_info: '<span class="Qmenu">锁定技,</span>当全场角色回合内摸牌后,你摸一张牌',
    贞烈: '贞烈',
    贞烈_info: '当你成为负收益的牌的目标时,你失去一点体力,并可以选择获得场上角色至多x张手牌,若你获得的牌不足x张则摸不足的牌数,x为你已损体力值',
    伤害: '伤害',
    伤害_info: '<span class="Qmenu">锁定技,</span>你的伤害不可阻挡',
    评鉴目标: '评鉴目标',
    评鉴目标_info: '在很多时机,你都可以尝试运行一个对应时机技能的content',
    漫卷: '漫卷',
    漫卷_info: '<span class="Qmenu">锁定技,</span>如手牌般使用别人的手牌',
    GXS_snwushuang: '无双',
    GXS_snwushuang_info: '<span class="Qmenu">锁定技,</span>无双',
    博弈: '博弈',
    博弈_info: '出牌阶段限一次.你选择一张手牌并使全部其他角色猜测该牌的类型.若猜对:你可令你与该角色各摸一张牌:若猜错:你可令你与该角色各弃置一张牌',
    门客: '门客',
    门客_info: '<span class="Qmenu">锁定技,</span>你死亡后,令杀死你的角色进入门客秘境(其他角色暂时移出游戏,进入门客秘境的人需要面对三名门客的夹击,直至一方全部阵亡)',
    安国: '安国',
    安国_info: '出牌阶段限2次,你可以选择一名其他角色,你与其各摸一张牌,回复1点体力,随机使用一张装备牌',
    减伤: '减伤',
    减伤_info: '<span class="Qmenu">锁定技,</span>当你受到伤害时,此伤害减去你已损体力值',
    避乱: '避乱',
    避乱_info: '<span class="Qmenu">锁定技,</span>结束阶段开始时,本局内其他角色计算与你的距离时+X.(X为场上角色数)',
    不动白: '不动白',
    不动白_info: '<span class="Qmenu">锁定技,</span>你跳过出牌阶段',
    摸牌白: '摸牌白',
    摸牌白_info: '<span class="Qmenu">锁定技,</span>你跳过摸牌阶段',
    蛇毒: '蛇毒',
    蛇毒_info: '',
    琼梳: '琼梳',
    琼梳_info: '当你受到伤害时,你弃置X张牌并防止此伤害(X为伤害值)',
    金梳: '金梳',
    金梳_info: '<span class="Qmenu">锁定技,</span>出牌阶段结束时,你将手牌摸至体力上限',
    犀梳: '犀梳',
    犀梳_info: '<span class="Qmenu">锁定技,</span>跳过判定阶段、跳过弃牌阶段',
    黠慧_2: '黠慧',
    黠慧_2_info: '<span class="Qmenu">锁定技,</span>不能使用、打出或弃置获得的黑色牌',
    修罗炼狱戟: '修罗炼狱戟',
    修罗炼狱戟_info: '<span class="Qmenu">锁定技,</span>你使用的正收益牌指定所有友方角色为目标,负收益牌指定所有敌方角色为目标;你造成伤害前令伤害增加x/3,造成伤害后令目标恢复y/4点体力,x为目标体力值与体力上限中的最大值,y为最小值',
    赤焰镇魂琴: '赤焰镇魂琴',
    赤焰镇魂琴_info: '<span class="Qmenu">锁定技,</span>你的伤害视为火属性且无来源',
    禅让诏书: '禅让诏书',
    禅让诏书_info: '其他角色于其回合外获得牌时,你可以选择一项:1.交给其一张牌;2.令其交给你一张牌',
    乌铁锁链: '乌铁锁链',
    乌铁锁链_info: '<span class="Qmenu">锁定技,</span>你使用牌指定目标后,若其未横置,则横置之',
    妆梳: '妆梳',
    妆梳_info: '一名角色的回合开始时,你可以弃置一张牌,将一张<宝梳>置入其宝物区(牌的类别决定<宝梳>种类)',
    贵相: '贵相',
    贵相_info: '<span class="Qmenu">锁定技,</span>你的准备阶段、判定阶段、摸牌阶段、弃牌阶段、结束阶段全部改为出牌阶段',
    移荣: '移荣',
    移荣_info: '出牌阶段你可以将手牌摸到手牌上限,然后令手牌上限加一,回合结束时,你令手牌上限减4',
    国色: '国色',
    国色_info: '出牌阶段,你可弃置一张方块牌赋予一名角色不动白标记并摸一张牌',
    断粮: '断粮',
    断粮_info: '出牌阶段,你可弃置一张黑色牌并赋予一名角色摸牌白标记',
    流离: '流离',
    流离_info: '当你成为其他角色牌的目标时,你可以弃置一张牌将此牌转移给其他角色',
    顺世: '顺世',
    顺世_info: '准备阶段开始时,或当你受到伤害后,你可将一张牌交给一名其他角色并获得如下效果:摸牌阶段的额定摸牌数+1,使用【杀】的次数上限+1,手牌上限+1',
    黠慧: '黠慧',
    黠慧_info: '<span class="Qmenu">锁定技,</span>你的黑色牌不计入手牌上限;其他角色获得你的黑色牌时,其不能使用、打出、弃置这些牌',
    连诛: '连诛',
    连诛_info: '出牌阶段限一次,你可将一张牌正面朝上交给一名其他角色.若此牌为:红色,你摸一张牌;黑色,对方弃置两张牌或令你摸两张牌.’',
    截辎: '截辎',
    截辎_info: '<span class="Qmenu">锁定技,</span>当有人跳过摸牌阶段后,你摸两张牌',
    冲阵: '冲阵',
    冲阵_info:
        '你可以将一张牌的花色按以下规则使用或打出:红桃当【桃】;方块当火【杀】;梅花当【闪】;黑桃当【无懈可击】.\
        当你以此法使用或打出【杀】或【闪】时,你可以获得对方一张牌;当你以此法使用【桃】时,你可以获得一名其他角色的一张牌;当你以此法使用【无懈可击】时,你可以获得你响应普通锦囊牌使用者的一张牌',
    权变: '权变',
    权变_info: '当你于出牌阶段使用或打出一张手牌时,你可以从牌堆顶的X张牌中获得一张牌,并将其余牌以任意顺序置于牌堆顶(X为你的体力上限)',
    恶臭: '恶臭',
    恶臭_info: '<span class="Qmenu">锁定技,</span>除你之外的其他角色使用<桃>或<酒>时,获得1枚<蛇毒>标记',
    毒躯: '毒躯',
    毒躯_info: '<span class="Qmenu">锁定技,</span>你受到伤害时,伤害来源获得1枚<蛇毒>标记;拥有<蛇毒>标记的角色回合开始时,需要选择弃置X张牌或者失去X点体力,然后弃置一枚<蛇毒>标记.X为其拥有的<蛇毒>标记个数',
    绝境: '绝境',
    绝境_info: '<span class="Qmenu">锁定技,</span>你的手牌上限+5;当你进入或脱离濒死状态时,你摸2张牌',
    无双方天戟: '无双方天戟',
    无双方天戟_info: '<span class="Qmenu">锁定技,</span>当你使用牌指定目标后,你可以选择一项:1、你摸一张牌; 2、弃置其一张牌',
    涉猎: '涉猎',
    涉猎_info: '<span class="Qmenu">锁定技,</span>摸牌阶段,你改为获得牌堆中每种花色的牌各一张',
    权计: '权计',
    权计_info: '①<span class="Qmenu">锁定技,</span>当你受到1点伤害后、回合外失去牌后、出牌阶段结束时,你摸一张牌,然后将一张手牌置于武将牌上,称为<权>.②你的手牌上限+X(X为<权>的数量)',
    排异: '排异',
    排异_info: '排异',
    崆峒印: '崆峒印',
    崆峒印_info: '<span class="Qmenu">锁定技,</span>每回合限一次,你受到致命伤害或两点及以上伤害时,防止之',
    东皇钟: `<a href='https://qm.qq.com/q/SsTlU9gc24'><span style='animation: fairy 20s infinite; -webkit-animation: fairy 20s infinite;'>东皇钟</span></a>`,
    东皇钟_info: '出牌阶段限一次,你可以重铸一张牌,并令一名角色武将牌上的所有技能失效直到你的下回合开始,其对你造成伤害后,你摸其技能数张牌并恢复其武将牌上的技能',
    封神榜: '封神榜',
    封神榜_info: '出牌阶段限一次,你可以弃置一张牌并选择一名角色的一个技能,其失去此技能,然后你将一张印有此技能的<封神>置入弃牌堆.＊封神:使用后获得上面印的技能,然后销毁这张卡',
    昊天塔: '昊天塔',
    昊天塔_info: '分为五个碎片牌.<span class="Qmenu">锁定技,</span>你对其他角色造成的伤害+x,若x为5,你令其立即死亡.(x为你昊天塔碎片比其多的数量)',
    炼妖壶: '炼妖壶',
    炼妖壶_info: '<span class="Qmenu">锁定技,</span>其他角色本局游戏造成伤害的总数对你始终可见.每五轮增加一次使用次数,每轮开始时,你可以令累计造成伤害最多的角色获得<炼妖>:准备阶段开始时失去一点体力或减一点体力上限,结束阶段翻面或弃置三张牌',
    炼妖: '炼妖',
    炼妖_info: '<span class="Qmenu">锁定技,</span>准备阶段开始时失去一点体力或减一点体力上限,结束阶段翻面或弃置三张牌',
    昆仑镜: '昆仑镜',
    昆仑镜_info: '每回合限一次,当你受到伤害后,你可以将体力与手牌数调整至此轮开始',
    盘古斧: '盘古斧',
    盘古斧_info: '<span class="Qmenu">锁定技,</span>每回合限三次,你使用牌指定目标后,你复制目标角色区域内的一张牌并获得复制牌,复制牌在进入弃牌堆后销毁',
    女娲石: '女娲石',
    女娲石_info: '每五轮增加一次使用次数,出牌阶段或当你死亡时,你可以选择一名已阵亡的角色,将其复活,体力调整至体力上限、摸四张牌,改为由你操控',
    轩辕剑: '轩辕剑',
    轩辕剑_info: '<span class="Qmenu">锁定技,</span>当你使用杀指定目标时,阳:你令目标恢复一点体力增加一个剑标记,然后摸三张牌令此杀失效;阴:你可以额外指定攻击范围内两名目标,并对目标造成x点伤害(x为目标角色剑标记数)',
    神农鼎: '神农鼎',
    神农鼎_info: '<span class="Qmenu">锁定技,</span>改变你桃的作用,改为可以回血超过上限且回复效果两倍.当有角色使用桃后,你摸一张牌.每回合限一次,你可以将一张牌当桃使用',
    伏羲琴: '伏羲琴',
    伏羲琴_info: '每五轮增加一次使用次数,混乱全场敌对角色,直至你下个出牌阶段开始',
    琴音: '琴音',
    琴音_info: '<span class="Qmenu">锁定技,</span>回合结束时,你令所有友方角色回复一点体力,令所有敌方角色失去一点体力',
    业炎: '业炎',
    业炎_info: '出牌阶段,你可以分配3点火焰伤害给任意角色',
    神威: '神威',
    神威_info: '<span class="Qmenu">锁定技,</span>摸牌阶段,你额外摸X张牌,你的手牌上限+X(X为场上其他角色的数目)',
    QQQ_暴虐: '暴虐',
    QQQ_暴虐_info: '<span class="Qmenu">锁定技,</span>其他角色造成1点伤害后,你进行判定,若为♠,你回复1点体力并获得判定牌',
    落英: '落英',
    落英_info: '<span class="Qmenu">锁定技,</span>黑桃版落英',
    复难: '复难',
    复难_info: '其他角色使用或打出牌响应你使用的牌时,你可获得其使用或打出的牌',
    金乌落日弓: '金乌落日弓',
    金乌落日弓_info: '你一次性失去2张及以上手牌时,你可以选择一名其他角色,并弃置其X张牌,X为你本次失去的牌的数量',
    夷灭: '夷灭',
    夷灭_info: '<span class="Qmenu">锁定技,</span>当你对其他角色造成伤害时,你将伤害值改为Y(Y为其体力值)',
    泰然: '泰然',
    泰然_info: '<span class="Qmenu">锁定技,</span>回合结束时,你将体力回复至体力上限,并将手牌摸至体力上限',
    义从: '义从',
    义从_info: '<span class="Qmenu">锁定技,</span>你计算与其他角色的距离时-X,其他角色计算与你的距离时+Y(X为你的体力值,Y为你的已损失体力值)',
    孙权: '孙权',
    孙权_info: '孙权',
    南蛮: '南蛮',
    南蛮_info: '南蛮',
    三窟: '三窟',
    三窟_info: '<span class="Qmenu">锁定技,</span>当你进入濒死状态时,你减1点体力上限,然后将体力回复至体力上限',
    连营: '连营',
    连营_info: '<span class="Qmenu">锁定技,</span>当手牌数小于6时,你将手牌补至6张',
    持纲4: '持纲4',
    持纲4_info: '<span class="Qmenu">锁定技,</span>结束改出牌',
    擅专: '擅专',
    擅专_info: '<span class="Qmenu">锁定技,</span>当全场有角色受到伤害时,你将其一张牌置于其判定区,黑色视为闪电,红色视为乐不思蜀',
    酉鸡: '酉鸡',
    酉鸡_info: '<span class="Qmenu">锁定技,</span>摸牌阶段,你多摸X张牌(X为游戏轮数)',
    QQQ_wangzun: '妄尊',
    QQQ_wangzun_info: '<span class="Qmenu">锁定技,</span>其他角色准备阶段你可以摸一张牌,然后其本回合只能对你使用牌,且手牌上限减三',
    QQQ_wangzun_1: '被妄尊',
    QQQ_wangzun_1_info: '本回合只能对妄尊技能持有者使用牌,且手牌上限减三',
    改命: '改命',
    改命_info: '观星七张改判定',
    拒战: '拒战',
    拒战_info: '<span class="Qmenu">锁定技,</span>当你成为其他角色牌的目标后,你与其各摸一张牌,然后其本回合内不能再对你使用牌.当你使用牌指定一名角色为目标后,你获得其一张牌',
    卫境: '卫境',
    卫境_info: '每回合一次,当你需要使用【杀】或【闪】时,你可以视为使用一张【杀】或【闪】',
    QQQ_guanxing: '观星',
    QQQ_guanxing_info: '<span class="Qmenu">锁定技,</span>回合开始、结束时,观看牌堆顶七张牌,并任意将这些牌置于牌堆顶或牌堆底',
    QQQ_guanxing1: '观星',
    QQQ_guanxing1_info: '<span class="Qmenu">锁定技,</span>准备阶段开始时,观看牌堆顶七张牌,并任意将这些牌置于牌堆顶或牌堆底',
    慧识: '慧识',
    慧识_info: '出牌阶段限一次.你可进行判定牌不置入弃牌堆的判定.若判定结果与本次发动技能时的其他判定结果的花色均不相同,则你加1点体力上限,且可以重复此流程.然后你将所有位于处理区的判定牌交给一名角色',
    正订: '正订',
    正订_info: '<span class="Qmenu">锁定技,</span>当你于回合外使用或打出牌响应其他角色使用的牌时,你加1点体力上限',
    膂力: '膂力',
    膂力_info: '<span class="Qmenu">锁定技,</span>当你造成、受到伤害后,你可以将手牌摸至与体力值数或将体力回复至手牌数',
    清剿: '清剿',
    清剿_info: '出牌阶段开始时,你可以弃置所有手牌,然后从牌堆或弃牌堆中随机获得八张牌名各不相同且副类别不同的牌.若如此做,结束阶段,你弃置所有手牌',
    冯河: '冯河',
    冯河_info: '<span class="Qmenu">锁定技,</span>当你受到伤害时,你防止之,然后若此伤害有来源且来源不是你,你与伤害来源各减一点体力上限',
    给橘: '给橘',
    给橘_info: '出牌阶段开始时,你可以失去1点体力或移去1个<橘>,令一名其他角色获得2个<橘>',
    橘: '橘',
    橘_info: '<span class="Qmenu">锁定技,</span>游戏开始时,你获得6个<橘>;有<橘>的角色摸牌阶段多摸2张牌;摸牌阶段开始前,你获得2个<橘>.当有<橘>的角色受到伤害时,防止此伤害,然后其移去1个<橘>',
    垂涕: '垂涕',
    垂涕_info: '当牌因弃置而置入弃牌堆后,若你能使用此牌,你可以使用之',
    杀: '杀',
    杀_info: '<span class="Qmenu">锁定技,</span>你的杀无限距离、无限次数、无视防具,且视为神属性',
    杀杀: '杀杀',
    杀杀_info: '你可以将任何一张牌当杀使用或打出',
    QQQ_leiji: '雷击',
    QQQ_leiji_info: '<span class="Qmenu">锁定技,</span>当你回合外使用或打出牌时,你可以进行一次判定.当全场判定结束后,若结果为:♠️,你对一名角色造成2点雷电伤害;♣️,你回复1点体力并对一名角色造成1点雷电伤害',
    鬼道: '鬼道',
    鬼道_info: '当一名角色的判定牌生效前,你可以打出一张牌替换之,然后你摸一张牌',
    伤神: '伤神',
    伤神_info: '<span class="Qmenu">锁定技,</span>全场角色回合开始时进行一次闪电判定',
    QQQ_zhendu: '鸩毒',
    QQQ_zhendu_info: '<span class="Qmenu">锁定技,</span>其他角色回合开始时,你对其造成一点伤害并视为对其使用一张<酒>',
    反间: '反间',
    反间_info: '无限反间',
    洛神: '洛神',
    洛神_info: '洛到红桃为止',
    倾国: '倾国',
    倾国_info: '非红桃牌不计入手牌,可以将黑牌当闪使用或打出',
    扶汉: '扶汉',
    扶汉_info: '准备阶段和受到伤害后,你从四张武将牌中选择一个技能获得',
    持纲1: '持纲1',
    持纲1_info: '<span class="Qmenu">锁定技,</span>准备改摸牌',
    持纲3: '持纲3',
    持纲3_info: '<span class="Qmenu">锁定技,</span>弃牌改出牌',
    持纲2: '持纲2',
    持纲2_info: '<span class="Qmenu">锁定技,</span>判定改摸牌',
    夺锐: '夺锐',
    夺锐_info: '当你造成伤害后,你移除受伤角色一个技能,你获得此技能',
    发装备: '发装备',
    发装备_info: '<span class="Qmenu">锁定技,</span>开局全场发装备',
    据守: '据守',
    据守_info: '<span class="Qmenu">锁定技,</span>弃牌阶段开始时,你翻面并弃置所有手牌并获得等量的<护甲>;当你受到伤害后,若你的武将牌背面朝上,你获得1点<护甲>;当你的武将牌从背面翻至正面时,你摸等同于你<护甲>值的牌',
    慈孝: '慈孝',
    慈孝_info: '<span class="Qmenu">锁定技,</span>准备阶段你令一名未拥有义子标记的其他角色获得一个<义子>标记.(拥有<义子>标记的角色视为拥有技能<叛弑>)',
    叛弑: '叛弑',
    叛弑_info: '<span class="Qmenu">锁定技,</span>准备阶段,你交给拥有技能<慈孝>的角色一张手牌',
    食尸: '食尸',
    食尸_info: '<span class="Qmenu">锁定技,</span>当有角色进入濒死时(每名角色限一次),你增加一点体力上限并恢复一点体力,并获得其所有牌',
    平衡: '平衡',
    平衡_info: '<span class="Qmenu">锁定技,</span>当其他角色非摸牌阶段获得牌、摸牌阶段摸超过两张牌时,你获得其等量的牌',
    QQQ_tonghua: '同化',
    QQQ_tonghua_info: '<span class="Qmenu">锁定技,</span>所有其他角色死亡前将其转变为晦暝,恢复至两点体力',
    寄生: '寄生',
    寄生_info: '<span class="Qmenu">锁定技,</span>当你死亡时,所有晦暝死亡,你每个<暝>标记摸9张牌.你弃置所有<暝>标记,并失去技能<同化>.你结束所有人的出牌阶段,并插入一个出牌阶段,且此阶段内你出杀无次数限制,此阶段结束后,你死亡且永久移出游戏',
    暝: '暝',
    暝_info: '<span class="Qmenu">锁定技,</span>晦暝属于你的阵营.晦暝死亡后你获得一个<暝>标记.每有一个 <暝>标记,摸牌阶段多摸2张牌,出牌阶段出杀次数加一',
    寒: '寒',
    寒_info: '<span class="Qmenu">锁定技,</span>结束阶段,你指定一名角色获得一个<寒>标记.同一个角色最多标记4个.当你使用杀指定拥有<寒>的角色时,此杀效果额外结算x次,x为目标角色拥有<寒>的数量',
    寒_1: '寒',
    寒_1_info: '<span class="Qmenu">锁定技,</span>当你使用杀指定拥有<寒>的角色时,此杀效果额外结算x次,x为目标角色拥有<寒>的数量',
    寄生_1: '寄生_1',
    寄生_1_info: '<span class="Qmenu">锁定技,</span>你出杀无距离次数限制且免疫死亡',
    鸣: '鸣',
    鸣_info: '出牌阶段你可随机弃置六张牌,并随机从牌堆中获得三张锦囊牌',
    化木: '化木',
    化木_info: '<span class="Qmenu">锁定技,</span>当你使用手牌后,你将此牌置于你的武将牌上,黑色牌称为<灵杉>,红色牌称为<玉树>',
    良缘: '良缘',
    良缘_info: '你可以将场上一张<灵杉>/<玉树>当<酒>/<桃>使用',
    前盟: '前盟',
    前盟_info: '<span class="Qmenu">锁定技,</span>当<灵杉>或<玉树>数量变化后,你摸一张牌',
    羁肆: '羁肆',
    羁肆_info: '限定技,准备阶段,你可以令一名其他角色获得前盟',
    奇械: '奇械',
    奇械_info: '你可以将一张手牌当做装备牌使用: 红桃,加一马;方片,减一马;黑桃,八卦阵;梅花,连弩',
    天谴: '天谴',
    天谴_info: '<span class="Qmenu">锁定技,</span>你已被天谴',
    战陨: '战陨',
    战陨_info: '<span class="Qmenu">锁定技,</span>杀死你的角色:废除装备区,翻面并横置,体力值修改为1,弃置所有牌,立刻结束出牌阶段(不是出牌阶段则结束当前回合),不能对自己使用牌,判定牌永远视为黑桃五,手牌上限为0',
    玲珑: '玲珑',
    玲珑_info: '<span class="Qmenu">锁定技,</span>负收益的牌指定你为目标时,你进行一次判定,若结果是红色,则此牌对你无效',
    QQQ_人皇幡: '人皇幡',
    QQQ_人皇幡_info: '<span class="Qmenu">锁定技,</span>使用有目标的牌时,若此牌是装备牌或延时锦囊则你摸一张牌.否则此牌无距离次数限制,且可以增加或减少一个目标',
    武德: '武德',
    武德_info: '<span class="Qmenu">锁定技,</span>当你成为杀的目标时,获得一枚<武德>标记.当你的<武德>标记数大于等于你的体力值时,无属性伤害对你无效.你的手牌上限+X(X为你的<武德>标记数)',
    大意: '大意',
    大意_info: '你可以重铸闪.<span class="Qmenu">锁定技,</span>你无法使用闪来响应杀',
    连鞭: '连鞭',
    连鞭_info: '出牌阶段限一次,你可以横置自己与至多四名其他角色,并对自己造成1点雷电伤害.若如此做,你获得一个<武德>标记',
    偷袭: '偷袭',
    偷袭_info: '当你使用杀指定目标时,你可以弃置一枚<武德>标记,使此杀伤害+1且不可被闪避',
    强夺: '强夺',
    强夺_info: '出牌阶段你可以失去一点体力,并获得所有非友方角色的一张牌',
    赌: '赌',
    赌_info:
        '出牌阶段,你可以摸一张牌并猜测其颜色,若错误:你获得一枚<赌>标记;若正确:你可以选择移去一枚<赌>标记或恢复一点体力值.<span class="Qmenu">锁定技,</span>若你的<赌>标记大于3,你死亡.\
        其他角色出牌阶段,其可以移去一个赌,视为使用一张任意牌',
    赌2: '赌2',
    赌2_info: '其他角色出牌阶段,其可以移去一个赌,视为使用一张任意牌',
    恩怨: '恩怨',
    恩怨_info: '当你体力值变化后、准备阶段、造成伤害后,你可以获得一名角色一张牌并令其失去一点体力,然后你摸一张牌',
    突袭: '突袭',
    突袭_info: '当你摸牌时,你可以少摸任意张牌,并获得其他角色等量张牌',
    恂恂: '恂恂',
    恂恂_info: '<span class="Qmenu">锁定技,</span>当你体力值变化后、准备阶段、造成伤害后,你观看牌堆顶五张牌获得其中两张,其余牌置入牌堆底',
    强命: '强命',
    强命_info: '<span class="Qmenu">锁定技,</span>你使用牌指定目标后,目标无法使用打出手牌直到回合结束.你的牌无法被响应',
    连弩: '连弩',
    连弩_info: '<span class="Qmenu">锁定技,</span>你使用杀无次数限制,当你使用的杀未造成伤害,你弃置此杀目标角色一张牌',
    青锋: '青锋',
    青锋_info: '<span class="Qmenu">锁定技,</span>封手牌',
    青锋2: '青锋2',
    青锋2_info: '<span class="Qmenu">锁定技,</span>你使用牌指定目标后,目标无法使用打出手牌直到回合结束',
    慷忾: '慷忾',
    慷忾_info: '当一名角色成为牌的目标时(使用者不能是其自身),你可以摸两张牌并交给其一张牌',
    诗怨: '诗怨',
    诗怨_info: '<span class="Qmenu">锁定技,</span>当你成为牌的目标时,你摸三张牌',
    镇卫: '镇卫',
    镇卫_info: '当其他角色成为单一目标牌的目标时(使用者不能是其自身和你),你可以将目标转移给你并摸一张牌,也可以将此牌置于使用者武将牌上,此牌失效,使用者回合结束后获得此牌',
    凶镬: '凶镬',
    凶镬_info:
        '1、游戏开始时,你获得3个<暴戾>标记(你对有此标记的其他角色造成的伤害+x,x为其拥有的此标记数);2、出牌阶段,你可以交给一名其他角色1个<暴戾>标记;\
        3、有<暴戾>标记的其他角色的出牌阶段开始时,其随机执行x次以下三项:1.受到1点火焰伤害且本回合不能对你使用【杀】;2.失去1点体力且手牌上限-1;3.令你随机获得其一张手牌和一张装备区里的牌',
    不能出杀: '不能出杀',
    不能出杀_info: '<span class="Qmenu">锁定技,</span>不能出杀',
    减手牌上限: '减手牌上限',
    减手牌上限_info: '<span class="Qmenu">锁定技,</span>减手牌上限',
    设伏: '设伏',
    设伏_info: '回合结束时,你选择任意一种牌名,并将一张牌置于武将牌上.当其他角色使用此牌名时,你可以令其失效',
    莲华: '莲华',
    莲华_info: '<span class="Qmenu">锁定技,</span>当你成为杀的目标后,来源需弃置一张牌使此杀生效,然后你进行判定,若结果为黑则此杀无效',
    妙剑: '妙剑',
    妙剑_info: '出牌阶段你可以视为使用一张无中生有或刺杀',
    杀杀杀: '杀杀杀',
    杀杀杀_info: '<span class="Qmenu">锁定技,</span>你用杀造成伤害时,防止此伤害,让目标减少此伤害数值的体力上限',
    五行鹤翎扇: '五行鹤翎扇',
    五行鹤翎扇_info: '<span class="Qmenu">锁定技,</span>你使用杀时,将此杀转为任意属性(冰、火、雷、雪、毒、金、神、血)',
    诓人: '诓人',
    诓人_info: '出牌阶段你可选择一名角色将其所有牌放于你武将牌上,你与其在你下个准备阶段摸武将牌上数量的牌,并移去武将牌上的牌',
    落宠: '落宠',
    落宠_info: '准备阶段、你体力值改变、造成伤害时,你可以令一名角色:回复一点体力、弃置两张牌、摸两张牌、失去一点体力',
    烈誓: '烈誓',
    烈誓_info: '出牌阶段,你可以选择一项:1.受到1点火焰伤害;2.弃置所有【闪】;3.弃置所有【杀】,然后令一名其他角色选择一项',
    伏诛: '伏诛',
    伏诛_info: '一名角色回合结束时,你可以对其使用牌堆里面所有的杀',
    QQQ_anyue: '暗月',
    QQQ_anyue_info: '<span class="Qmenu">锁定技,</span>你失去牌后摸等量的牌',
    QQQ_摸牌: '摸牌',
    QQQ_摸牌_info: '你可以在任何时候摸一张牌',
    QQQ_出牌: '出牌',
    QQQ_出牌_info: '任何时候,你可以出牌(不能是需要你响应的时机)',
    中流: '中流',
    中流_info: '其他角色出牌阶段限一次,当其使用出牌阶段限一次的技能时,其刷新武将牌上的技能',
    碎甲: '碎甲',
    碎甲_info: '<span class="Qmenu">锁定技,</span>你的防具失效',
    募集: '募集',
    募集_info: '其他角色失去牌时,你可以弃置一张牌或失去一点体力获得这些牌中的一半(向上取整)',
    治军: '治军',
    治军_info: '当你失去牌时,如数量大于1,你可以防止其中一半的牌失去(向上取整)',
    康济: '康济',
    康济_info: '主公技,出牌阶段限一次,你可另其他魏势力武将各摸或随机弃置一张牌',
    博览: '博览',
    博览_info: '准备阶段、你体力值改变、造成伤害时,你可以从全扩技能中抽三个并选择一个获得',
    无敌: '无敌',
    无敌_info: '<span class="Qmenu">锁定技,</span>你无敌',
    驭衡: '驭衡',
    驭衡_info: '<span class="Qmenu">锁定技,</span>准备阶段你弃置所有手牌并随机获得等量技能,结束阶段你摸等量的牌并失去这些技能',
    制蛮: '制蛮',
    制蛮_info: '当你受到伤害时,你可以交给来源一张牌防止之',
    帝力: '帝力',
    帝力_info: '准备阶段,你令你随机一个临时技能变为永久技能',
    制衡: '制衡',
    制衡_info: '准备阶段、你体力值改变、造成伤害时,你可以发动制衡或增加出牌阶段内发动制衡的次数',
    顧曲: '顧曲',
    顧曲_info: '回合开始阶段,你可以将一张手牌置于武将牌,称为<律>或进行更换(<律>至多五张).其他角色于出牌阶段使用牌颜色顺序,若与<律>相符,你摸一张牌',
    雅量: '雅量',
    雅量_info: '<span class="Qmenu">锁定技,</span>当其他角色对你使用唯一目标的非伤害锦囊时,你需给其一张牌,此锦囊不生效(无牌则此技不生效)',
    英才: '英才',
    英才_info: '限定技,回合开始阶段,你可以放弃摸牌,此轮距离+1,随后你可以令一名其他角色补充手牌至手牌上限',
    徒: '徒',
    徒_info: '<span class="Qmenu">锁定技,</span>当你失去牌后,你随机弃置等量的牌(不嵌套触发)',
    流: '流',
    流_info: '<span class="Qmenu">锁定技,</span>结束阶段开始时,你翻面',
    杖: '杖',
    杖_info: '<span class="Qmenu">锁定技,</span>你不能响应其他角色使用的伤害牌',
    神裁: '神裁',
    神裁_info: '游戏开始时,令一名其他角色获得神裁标记',
    洗牌: '洗牌',
    洗牌_info: '<span class="Qmenu">锁定技,</span>当你即将改变体力时,取消之,然后移除牌堆顶X张牌(X为此次改变体力的数值).牌堆第一次洗牌后,你死亡',
    御策: '御策',
    御策_info: '<span class="Qmenu">锁定技,</span>你受到伤害后,除非来源弃置三种不同类型的牌,否则你回复一点体力',
    无矩: '无矩',
    无矩_info: '<span class="Qmenu">锁定技,</span>你使用手牌结算后,重铸所有手牌并摸一张牌,然后你可以令其中任意张牌本回合无法被重铸.当你通过技能弃置的牌数超过x!时,你减一点体力上限,摸两张牌并清空弃牌记录.(x为你发动此技能的次数)',
    往烈: '往烈',
    往烈_info: '准备阶段或你使用一张牌时,你可以令你使用的下一张牌:1.不能被响应;2.无距离限制;3.无次数限制',
    武: '武',
    武_info: '出牌阶段你可以声明一个牌名,你将所有此牌名的牌置于牌堆顶',
    全装备: '全装备',
    全装备_info: '<span class="Qmenu">锁定技,</span>开局铠甲合体',
    自伤: '自伤',
    自伤_info: '使用后减少当前一半体力上限,体力值上限为1时无法使用该技能.<span class="Qmenu">锁定技,</span>体力上限最少1点',
    庇护: '庇护',
    庇护_info: '<span class="Qmenu">锁定技,</span>每次受到伤害进行判定,红色增加1体力上限,黑色回复一体力值,判定结果无法被改变',
    隐忍: '隐忍',
    隐忍_info:
        '<span class="Qmenu">锁定技,</span>当你体力值改变时,你增加等量体力上限并亮出牌堆顶一张牌,若为黑则回复一点体力,若为红则增加一点体力上限.\
        你每失去1点体力上限随机增加以下效果:出杀+1、摸牌+1、喝酒上限+1、距离+1(上限+4)、距离-1(上限-4)、基本牌10%概率重复使用+1、锦囊牌10%概率重复使用+1',
    八卦: '八卦',
    八卦_info: '<span class="Qmenu">锁定技,</span>八卦',
    复活: '复活',
    复活_info: '<span class="Qmenu">锁定技,</span>摸牌阶段若场上有死亡角色,你跳过摸牌阶段令一名死亡角色复活且其转为你阵营',
    奇取: '奇取',
    奇取_info: '<span class="Qmenu">锁定技,</span>当你失去所有的手牌后,你恢复一点体力,其他角色获得你的牌时,你与其交换手牌',
    假意: '假意',
    假意_info: '出牌阶段限一次,你可以交给一名角色一张手牌',
    锥锋: '锥锋',
    锥锋_info: '出牌阶段你可以视为使用决斗',
    天辩: '天辩',
    天辩_info: '<span class="Qmenu">锁定技,</span>当你拼点时,改为用牌堆顶第一张牌,你的红桃拼点牌视为K,你令拼点目标改为随机使用手牌,你拼点输获得你拼点的牌,拼点赢获得对方拼点的牌',
    麻将: '麻将',
    麻将_info:
        '<span class="Qmenu">锁定技,</span>回合结束时,你将麻将牌补至4,可以将一张手牌与一张麻将牌交换.选择一名角色并对其造成0点伤害,麻将牌每满足下列一项,伤害加一:3种花色:4种花色:2张同点数牌:3张同点数牌:4张同点数牌.\
        若上述五项均满足,其立即死亡',
    QQQ_三刀: '三刀',
    QQQ_三刀_info: '回合结束时你可以视为使用三张锦囊',
    偏执: '偏执',
    偏执_info: '<span class="Qmenu">锁定技,</span>当你使用的牌被响应后,你在此牌结算完成后视为再次使用一张同名牌',
    乱码: '乱码',
    乱码_info: '<span class="Qmenu">锁定技,</span>当你一个阶段开始前,你取消之并随机执行一个阶段(准备和结束阶段除外)',
    镶星: '镶星',
    镶星_info: '<span class="Qmenu">锁定技,</span>当你受到三次伤害后,随机对场上其他角色造成九点雷电伤害',
    血莲: '血莲',
    血莲_info: '<span class="Qmenu">锁定技,</span>你每受到四次伤害后,恢复x/2体 力值,摸两张牌,并视为对场上任意名角 色使用一张无视防具的杀.(x为你已损失的 体力值,向上取整)',
    矢北: '矢北',
    矢北_info: '<span class="Qmenu">锁定技,</span>你通过技能恢复的体力值无视体力上限,每轮你首次受到伤害后恢复13点体力,每回合受到的伤害改为x.(x为本回合受伤次数)',
    渐营: '渐营',
    渐营_info: '<span class="Qmenu">锁定技,</span>记录你每轮使用的第一张牌的点数(不覆盖上次记录),当你使用或打出与记录点数相同的牌时,你摸一张牌或弃置其他角色一张牌',
    星陨: '星陨',
    星陨_info: '<span class="Qmenu">锁定技,</span>准备阶段,随机对场上其他角色造成九点雷电伤害',
    自废: '自废',
    自废_info: '出牌阶段发动,你可以失去一个技能',
    哪吒: '哪吒',
    哪吒_info: '<span class="Qmenu">锁定技,</span>你获得所有装备过的装备牌对应的技能',
    奇兵: '奇兵',
    奇兵_info: '一名角色的结束阶段结束时,你摸一张牌,然后可以使用一张牌,此牌无距离限制',
    遁世: '遁世',
    遁世_info: '每回合你可以印一次基本牌,然后获得一个名字中包含仁义礼智信的技能',
    评鉴失去: '评鉴失去',
    评鉴失去_info: '在很多时机,你都可以尝试运行一个对应时机技能的content',
    评鉴使用: '评鉴使用',
    评鉴使用_info: '在很多时机,你都可以尝试运行一个对应时机技能的content',
    夺锐属性: '夺锐属性',
    夺锐属性_info: '当你每回合第一次使用牌指定其他角色为目标时,你随机夺取他的一个属性(体力上限、摸牌阶段摸牌数、攻击范围、出牌阶段使用杀的次数、手牌上限)',
    评鉴伤害: '评鉴伤害',
    评鉴伤害_info: '在很多时机,你都可以尝试运行一个对应时机技能的content',
    测试: '测试',
    测试_info: '测试',
    评鉴阶段: '评鉴阶段',
    评鉴阶段_info: '在很多时机,你都可以尝试运行一个对应时机技能的content',
    检测: '检测',
    检测_info: '检测',
    摸与杀: '摸与杀',
    摸与杀_info: '<span class="Qmenu">锁定技,</span>回合开始时随机获得四个有描述的技能,回合结束时选择失去三分之一的技能(向上取整)',
    娴婉: '娴婉',
    娴婉_info: '你可以横置一名角色,视为使用一张基本牌.你可以重置一名角色,视为使用一张锦囊牌',
    评鉴全场: '评鉴全场',
    评鉴全场_info: '在很多时机,你都可以尝试运行一个对应时机技能的content',
    QQQ_huanshen: '幻身',
    QQQ_huanshen_info: '①游戏开始时,你随机获得两张未加入游戏的武将牌(称为<幻身>),第一个<幻身>固定为孙策.回合开始与结束时,你弃置任意张<幻身>并获得双倍<幻身>,每弃置一张<幻身>,增加一点体力上限和3点护甲,并获得一张<幻身>上的所有技能.你每次受到和造成伤害时,获得伤害值2倍的<幻身>',
    诱言: '诱言',
    诱言_info: '<span class="Qmenu">锁定技,</span>每个阶段限一次,当你失去牌时,你获得和失去牌花色不同的牌各一张',
    宗祚: '宗祚',
    宗祚_info: '<span class="Qmenu">锁定技,</span>游戏开始时你增加x点体力上限和体力,x为势力数.当一名势力最后的角色死亡后,你失去两点体力上限',
    while: 'while',
    while_info: '<span class="Qmenu">锁定技,</span>当你体力变化一点或造成一点伤害后或准备阶段,你摸一张牌',
    隐伏: '隐伏',
    隐伏_info: '<span class="Qmenu">锁定技,</span>当你受到伤害时,改为回复等量体力.当你回复体力时,摸回复量两倍的牌',
    问仇: '问仇',
    问仇_info: '觉醒技,准备阶段若你未受伤,你失去隐伏获得破釜',
    破釜: '破釜',
    破釜_info: '当你成为其他角色牌的目标时,你可以对其使用一张杀令此牌无效.当你造成伤害时,可以失去一点体力令伤害翻倍.你的手牌上限等于已损体力值加上场上死亡人数',
    QQQ_longjing: '龙境',
    QQQ_longjing_info: '你可以将一张牌当成牌名字数相同的牌使用或打出',
    QQQ_wanyi: '婉嫕',
    QQQ_wanyi_info: '<span class="Qmenu">锁定技,</span>①当你使用牌指定目标后,你将目标的一张牌置于你的武将牌上作为<嫕>.②与<嫕>花色相同的牌不占用你手牌上限且无距离次数限制.③每回合结束后或当你体力值变化后,你获得一张<嫕>',
    埋祸: '埋祸',
    埋祸_info:
        '<span class="Qmenu">锁定技,</span>其他角色对你使用牌时,你可以将此牌置于其武将牌上称为<祸>并令其失效.当你对其他角色使用牌时,移去其武将牌上的一张<祸>.\
        其他角色出牌阶段开始时,随机失去一半的<祸>(向上取整),然后对你使用剩余的<祸>',
    忍戒: '忍戒',
    忍戒_info: '<span class="Qmenu">锁定技,</span>当你改变体力值或出牌阶段外失去牌时,你获得等量的忍.当你的忍大于3,你获得<极略>,然后增加一点体力上限,恢复两点体力,摸两张牌',
    极略: '极略',
    极略_info:
        '当一名角色的判定牌生效前,你可以弃1枚<忍>标记并发动〖鬼才〗;每当你受到伤害后,你可以弃1枚<忍>标记并发动〖放逐〗;出牌阶段,你可以弃1枚<忍>标记并发动〖制衡〗;\
        出牌阶段,你可以弃1枚<忍>标记并获得〖完杀〗直到回合结束',
    极略_zhiheng: '制衡',
    极略_zhiheng_info: '你可以弃置一个忍发动一次制衡,无次数限制',
    极略_wansha: '完杀',
    极略_wansha_info: '<span class="Qmenu">锁定技,</span>完杀',
    QQQ_xianshu: '仙术',
    QQQ_xianshu_info: '<span class="Qmenu">锁定技,</span>当你进入濒死时,随机使用牌堆中和场上的<桃>与<酒>',
    龙威: '龙威',
    龙威_info: '你可以将一张基本牌当作任意基本牌使用或打出并摸一张牌,你可以将一张锦囊牌当作任意锦囊牌使用',
    彭羕: '彭羕',
    彭羕_info: '你可以自由使用或打出牌堆底的三张牌,你不能使用无懈',
    缓图: '缓图',
    缓图_info: '当一名角色摸牌阶段开始时,你可以令其摸两张牌并跳过此摸牌阶段',
    缓图_1: '缓图1',
    缓图_1_info: '当一名角色出牌阶段开始时,你可以令其视为使用一张杀并跳过此出牌阶段',
    缓图_2: '缓图2',
    缓图_2_info: ' 当一名角色弃牌阶段开始时,你可以令其弃置两张牌并跳过此弃牌阶段',
    革命: '革命',
    革命_info: '当其他角色使用目标不为你的单目标牌时,你可以令其摸一张牌将使用者改为你,或者令其弃一张牌将目标改为你,然后你弃置一张与此牌颜色不同的牌',
    乾明: '乾明',
    乾明_info: '每回合限一次.阳:出牌阶段,若你没有<神临>,你可以弃置所有牌.阴:出牌阶段你可以发动此技能,然后你获得<神临>',
    神临: '神临',
    神临_info: '<span class="Qmenu">锁定技,</span>每当你结束回合后,立刻进入新的回合.当你杀死角色或在你拥有<神临>过程中,累计获得的牌大于20张,你失去此技能',
    静气: '静气',
    静气_info: '<span class="Qmenu">锁定技,</span>离开你区域的牌对你始终可见,你每使用一张牌,随机获得一半静气牌',
    连锁: '连锁',
    连锁_info: '<span class="Qmenu">锁定技,</span>你始终处于横置状态,其他角色使用牌指定你为目标时,横置其.当你受到无属性伤害,改为受到两倍的属性伤害;受到属性伤害后,恢复一点体力',
    用: '用',
    掠夺: '掠夺',
    掠夺_info: '<span class="Qmenu">锁定技,</span>每轮开始时你获得其他所有角色的方块牌',
    比翼: '比翼',
    比翼_info: '<span class="Qmenu">锁定技,</span>游戏开始时你选中另一名角色,你与其共享且永远平分体力值,任一人体力值变化后,你与其摸已损体力值张牌',
    乱世: '乱世',
    乱世_info: '<span class="Qmenu">锁定技,</span>一名角色使用杀后,你令所有角色成为目标',
    全判定: '全判定',
    全判定_info: '<span class="Qmenu">锁定技,</span>一名角色回合开始时,你将牌堆中所有延时锦囊置入其判定区',
    惠质: '惠质',
    惠质_info: '<span class="Qmenu">锁定技,</span>你使用非你手牌的牌不计入次数限制且伤害翻倍',
    乾坤大挪移: '乾坤大挪移',
    乾坤大挪移_info: '<span class="Qmenu">锁定技,</span>游戏开始时,全场除你之外的角色依次交换一个技能',
    合并时间线: '合并时间线',
    合并时间线_info: '<span class="Qmenu">锁定技,</span>游戏开始时,全场角色获得其同名角色的技能',
};
for (const i in skill) {
    const info = skill[i];
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
Object.assign(lib.skill, skill);
_status.gentle.skill = skill;
Object.assign(lib.translate, translate1);
_status.gentle.translate1 = translate1;