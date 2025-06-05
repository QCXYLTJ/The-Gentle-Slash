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
export { content };
const content = async function () {
    console.time('温柔一刀content');
    //—————————————————————————————————————————————————————————————————————————————添加新势力/加入lib.boss/修改checkresult等
    const group = function () {
        game.addGroup('狂', '<span style="color: #FF0000">狂</span>', '狂', {
            color: ' #FF0000',
        });
        game.addGroup('龙', '<span style="color: rgb(218, 188, 18)">龙</span>', '龙', {
            color: 'rgb(218, 188, 18)',
        });
        game.addGroup('啸', '<span style="color: rgb(11, 235, 142)">啸</span>', '啸', {
            color: 'rgb(11, 235, 142)',
        });
        game.addGroup('天', '<span style="color: rgb(96, 13, 151)">天</span>', '天', {
            color: 'rgb(96, 13, 151)',
        });
        if (['single', 'QQQ'].includes(lib.config.mode)) {
            game.checkResult = function () {
                if (game.players.length > 1) return;
                game.over((game.me._trueMe || game.me).isAlive());
            };
        }
        if (lib.boss) {
            for (const i of QQQ.boss) {
                lib.boss[i] = {
                    chongzheng: false, //所有人死后几轮复活,填0不会复活//boss不会自动添加重整
                    loopFirst() {
                        return game.boss;
                    }, //每轮第一个回合是谁的
                    checkResult(player) {
                        if (player == game.boss && player.fuhuo > 0) {
                            return false;
                        }
                    },
                    init() {
                        game.boss.fuhuo = 3;
                        game.boss.storage.boss_chongzheng = 0; //boss不会自动添加重整
                    },
                };
            }
            lib.skill._qboss = {
                mode: ['boss'],
                trigger: {
                    global: ['gameStart'],
                },
                forced: true,
                silent: true,
                filter: (event, player) => game.boss == player && player.fuhuo,
                async content(event, trigger, player) {
                    for (const npc of game.players) {
                        npc.maxHp = 4;
                        npc.hp = npc.maxHp;
                        npc.hujia = 0;
                    }
                    player.maxHp = 20;
                    player.hp = player.maxHp;
                    player.hujia = player.maxHp;
                },
            }; //挑战模式加血
            lib.skill._qboss1 = {
                mode: ['boss'],
                trigger: {
                    player: ['dieEnd'],
                },
                forced: true,
                forceDie: true,
                silent: true,
                filter: (event, player) => game.boss == player && player.fuhuo > 0,
                async content(event, trigger, player) {
                    player.fuhuo--;
                    player.storage.boss_chongzheng = 0; //boss不会自动添加重整
                    player.qrevive();
                },
            }; //挑战模式死后减掉复活标记
        }
        // lib.skill._wuxie = {
        //     trigger: { player: ['useCardToBegin', 'phaseJudge'] },
        //     priority: 5,
        //     popup: false,
        //     forced: true,
        //     silent: true,
        //     filter(event, player) {
        //         if (event.card.storage && event.card.storage.nowuxie) return false;
        //         var card = event.card;
        //         if (event.name == 'phaseJudge' && card.viewAs) card = { name: card.viewAs };
        //         var info = get.info(card);
        //         if (info.wuxieable === false) return false;
        //         if (event.name != 'phaseJudge') {
        //             if (event.parent.nowuxie) return false;
        //             if (event.player.hasSkillTag('playernowuxie', false, event.card)) return false;
        //             if (get.type(event.card) != 'trick' && !info.wuxieable) return false;
        //         }
        //         return event.card.name != 'wuxie';
        //     },
        //     forceLoad: true,
        //     forceDie: true,
        //     async content(event, trigger, player) {
        //         var bool = true,
        //             boolean = true;
        //         event.wuxie = trigger.player;
        //         while (boolean) {
        //             boolean = false;
        //             for (const current of game.players.filter((q) => q.hasWuxie())) {
        //                 const { result } = await current.chooseToUse(`${get.translation(trigger.player)}使用的${get.translation(trigger.card)}即将${bool ? '生效' : '失效'}`, (card) => card.name == 'wuxie').set('ai1', (card) => -get.attitude(current, event.wuxie));
        //                 if (result && result.bool) {
        //                     event.wuxie = current;
        //                     bool = !bool;
        //                     boolean = true;
        //                     break;
        //                 }
        //             }
        //         }
        //         if (bool == false) {
        //             if (trigger.name == 'phaseJudge') {
        //                 trigger.untrigger('currentOnly');
        //                 trigger.cancelled = true;
        //             } else {
        //                 trigger.cancel();
        //             }
        //         }
        //     },
        // };
        // lib.card.wuxie = {
        //     audio: true,
        //     fullskin: true,
        //     type: 'trick',
        //     ai: {
        //         basic: {
        //             useful: [6, 4, 3],
        //             value: [6, 4, 3],
        //         },
        //         result: { player: 1 },
        //         expose: 0.2,
        //     },
        //     notarget: true,
        //     finalDelay: false,
        //     defaultYingbianEffect: 'draw',
        //     content() { },
        // };
    }; //添加新势力
    group();
    //—————————————————————————————————————————————————————————————————————————————本体函数增添、复制与修改
    const xiufu = function () {
        lib.element.card.init = function (card) {
            //花色/点数/牌名/属性/应变
            if (Array.isArray(card)) {
                if (card[2] == 'huosha') {
                    card[2] = 'sha';
                    card[3] = 'fire';
                } else if (card[2] == 'leisha') {
                    card[2] = 'sha';
                    card[3] = 'thunder';
                } else if (card[2] == 'cisha') {
                    card[2] = 'sha';
                    card[3] = 'stab';
                } else if (card[2].length > 3) {
                    let prefix = card[2].slice(0, card[2].lastIndexOf('sha'));
                    if (lib.nature.has(prefix)) {
                        if (prefix.length + 3 == card[2].length) {
                            card[2] = 'sha';
                            card[3] = prefix;
                        }
                    }
                    if (card[2].startsWith('sha_')) {
                        let suffix = card[2].slice(4);
                        let natureList = suffix.split('_');
                        card[2] = 'sha';
                        card[3] = get.nature(natureList);
                    }
                }
            } else if (typeof card == 'object') {
                card = [card.suit, card.number, card.name, card.nature];
            }
            var cardnum = card[1] || '';
            if (Number(cardnum) == cardnum) cardnum = Number(cardnum);
            if (!lib.card[card[2]]) {
                lib.card[card[2]] = {};
            }
            var info = lib.card[card[2]];
            if (info.global && !this.classList.contains('button')) {
                if (Array.isArray(info.global)) {
                    while (info.global.length) {
                        game.addGlobalSkill(info.global.shift());
                    }
                } else if (typeof info.global == 'string') {
                    game.addGlobalSkill(info.global);
                }
                delete info.global;
            }
            this.suit = card[0];
            this.number = numberq0(card[1]);
            this.name = card[2];
            this.type = lib.card[card[2]].type;
            if (this.suit == 'heart' || this.suit == 'diamond') this.color = 'red';
            if (this.suit == 'club' || this.suit == 'spade') this.color = 'black'; //QQQ
            if (info.destroy && typeof info.destroy != 'boolean' && !lib.skill[info.destroy]) {
                this.destroyed = info.destroy;
            }
            if (_status.connectMode && !game.online && lib.cardOL && !this.cardid) {
                this.cardid = get.id();
                lib.cardOL[this.cardid] = this;
            }
            if (!_status.connectMode && !_status.video) {
                this.cardid = get.id();
            }
            this.$init(card);
            if (this.inits) {
                for (var i = 0; i < this.inits.length; i++) {
                    this.inits[i](this);
                }
            }
            if (typeof info.init == 'function') info.init();
            return this;
        }; //卡牌生成时自带类型、颜色属性
        lib.element.card.willBeDestroyed = function (targetPosition, player, event) {
            const destroyed = this.destroyed;
            if (!destroyed) return false; //防止销毁
            if (typeof destroyed == 'function') {
                return destroyed(this, targetPosition, player, event);
            } else if (lib.skill[destroyed]) {
                if (player) {
                    if (player.hasSkill(destroyed)) {
                        delete this.destroyed;
                        return false;
                    }
                }
                return true;
            } else if (typeof destroyed == 'string') {
                return destroyed == targetPosition;
            }
            return destroyed;
        }; //card.destroyed是默认的undefined,lib.skill里面又存在undefined键名,无论怎么摸牌都会销毁
        lib.element.player.addSkill = async function (skill, checkConflict, nobroadcast, addToSkills) {
            if (Array.isArray(skill)) {
                _status.event.clearStepCache();
                for (var i = 0; i < skill.length; i++) {
                    this.addSkill(skill[i]);
                }
            } else {
                if (this.skills.includes(skill)) return;
                _status.event.clearStepCache();
                var info = lib.skill[skill];
                if (!info) {
                    if (QQQ.config.报错 && get.mode() != 'boss') {
                        if (skill) {
                            console.log(skill, '是一个不存在的技能名addskill');
                            alert(skill + '没有对应lib.skill1');
                            throw new Error();
                        }
                    }
                    return;
                }
                if (!addToSkills) {
                    this.skills.add(skill);
                    if (!nobroadcast) {
                        game.broadcast(
                            function (player, skill) {
                                player.skills.add(skill);
                            },
                            this,
                            skill
                        );
                    }
                }
                if (this.playerid) {
                    this.addSkillTrigger(skill); //加入钩子时候才init,要在这之后运行entergame的content //bosslist时候就不必init和加全局了
                    if (this.awakenedSkills.includes(skill)) {
                        this.awakenSkill(skill);
                        return;
                    }
                    if (info.init2 && !_status.video) {
                        info.init2(this, skill);
                    } //加入钩子时候才init,要在这之后运行entergame的content
                    if (info.mark) {
                        if (info.mark == 'card' && get.itemtype(this.storage[skill]) == 'card') {
                            this.markSkill(skill, null, this.storage[skill], nobroadcast);
                        } else if (info.mark == 'card' && get.itemtype(this.storage[skill]) == 'cards') {
                            this.markSkill(skill, null, this.storage[skill][0], nobroadcast);
                        } else if (info.mark == 'image') {
                            this.markSkill(skill, null, ui.create.card(null, 'noclick').init([null, null, skill]), nobroadcast);
                        } else if (info.mark == 'character') {
                            var intro = info.intro.content;
                            if (typeof intro == 'function') {
                                intro = intro(this.storage[skill], this);
                            } else if (typeof intro == 'string') {
                                intro = intro.replace(/#/g, this.storage[skill]);
                                intro = intro.replace(/&/g, get.cnNumber(this.storage[skill]));
                                intro = intro.replace(/\$/g, get.translation(this.storage[skill]));
                            }
                            var caption;
                            if (typeof info.intro.name == 'function') {
                                caption = info.intro.name(this.storage[skill], this);
                            } else if (typeof info.intro.name == 'string') {
                                caption = info.name;
                            } else {
                                caption = get.translation(skill);
                            }
                            if (!this.storage[skill]) {
                            }
                            this.markSkillCharacter(skill, this.storage[skill], caption, intro, nobroadcast);
                        } else {
                            this.markSkill(skill, null, null, nobroadcast);
                        }
                    } //bosslist时候就不必加标记
                    if (_status.roundStart && _status.currentPhase) {
                        var Q = [];
                        if (lib.skill[skill].group) {
                            if (Array.isArray(lib.skill[skill].group)) Q = lib.skill[skill].group.slice();
                            else Q.push(lib.skill[skill].group);
                        }
                        Q.push(skill);
                        for (const i of Q) {
                            if (!lib.skill[i] || !lib.skill[i].trigger || !lib.skill[i].trigger.player) continue;
                            if (lib.skill[i].trigger.player == 'enterGame' || (Array.isArray(lib.skill[i].trigger.player) && lib.skill[i].trigger.player.includes('enterGame'))) {
                                if (!this.游戏开始技能) this.游戏开始技能 = [];
                                if (!this.游戏开始技能.includes(i)) {
                                    this.游戏开始技能.push(i);
                                    game.log(i + '是游戏开始时技能');
                                    if (typeof lib.skill[i].cost === 'function') {
                                        const next = game.createEvent(`${i}_cost`, false);
                                        next.player = this;
                                        next._trigger = _status.event;
                                        next.skill = i;
                                        const result1 = await next.setContent(lib.skill[i].cost).forResult();
                                        if (result1.bool) {
                                            var next1 = game.createEvent(i, false);
                                            next1.skill = i;
                                            next1.player = this;
                                            next1._trigger = _status.event;
                                            if (result1.targets) next1.targets = result1.targets;
                                            if (result1.cards) next1.cards = result1.cards;
                                            if (result1.cost_data) next1.cost_data = result1.cost_data;
                                            await next1.setContent(lib.skill[i].content);
                                        }
                                    } else {
                                        var next = game.createEvent(i, false);
                                        next.skill = i;
                                        next.player = this;
                                        next._trigger = _status.event;
                                        await next.setContent(lib.skill[i].content);
                                    }
                                }
                            }
                        }
                    } //运行进入游戏时机的content
                }
            }
            if (checkConflict) this.checkConflict();
            return skill;
        }; //运行进入游戏时机的content
        lib.element.player.removeVirtualEquip = function (VCard) {
            if (lib.card[VCard.name].artifact) return;
            const player = this;
            game.addVideo('removeVirtualEquip', player, get.vcardInfo(VCard));
            game.broadcast(
                (VCard, player) => {
                    const cards = player.vcardsMap?.equips;
                    if (cards && cards.includes(VCard)) {
                        cards.remove(VCard);
                    }
                },
                VCard,
                player
            );
            const cards = player.vcardsMap?.equips;
            if (cards && cards.includes(VCard)) {
                player.removeEquipTrigger(VCard, true);
                cards.remove(VCard);
            }
            if (lib.config.equip_span) player.$handleEquipChange();
        }; //防止NL标记的装备丢失
        lib.element.player.addVirtualEquip = function (card, cards) {
            if (card.node) {
                card = new lib.element.VCard(card);
                throw new Error();
            } //防止直接装备卡牌节点
            card.initID();
            const player = this;
            game.broadcast(
                (player, card, cards) => {
                    player.addVirtualEquip(card, cards);
                },
                player,
                card,
                cards
            );
            game.addVideo('addVirtualEquip', player, [get.vcardInfo(card), get.cardsInfo(cards)]);
            player.vcardsMap?.equips.push(card);
            player.vcardsMap?.equips.sort((a, b) => {
                return get.equipNum(a) - get.equipNum(b);
            });
            player.$addVirtualEquip(card, cards);
            var info = get.info(card, false);
            if (info.skills) {
                for (var i = 0; i < info.skills.length; i++) {
                    player.addSkillTrigger(info.skills[i]);
                }
            }
        }; //防止直接装备卡牌节点//directequip老扩展的问题
        lib.element.content.chooseToUse = function () {
            'step 0';
            if (event.responded) return;
            if (game.modeSwapPlayer && !_status.auto && player.isUnderControl() && !lib.filter.wuxieSwap(event)) {
                game.modeSwapPlayer(player);
            }
            var skills = player.getSkills('invisible').concat(lib.skill.global);
            game.expandSkills(skills);
            for (var i = 0; i < skills.length; i++) {
                var info = lib.skill[skills[i]];
                if (info && info.onChooseToUse) {
                    info.onChooseToUse(event);
                }
            }
            if (_status.noclearcountdown !== 'direct') _status.noclearcountdown = true;
            if (event.type == 'phase') {
                if (event.isMine()) {
                    event.endButton = ui.create.control('结束回合', 'stayleft', function () {
                        var evt = _status.event;
                        if (evt.name != 'chooseToUse' || evt.type != 'phase') return;
                        if (evt.skill) {
                            ui.click.cancel();
                        }
                        ui.click.cancel();
                    });
                    event.fakeforce = true;
                } else {
                    if (event.endButton) {
                        event.endButton.close();
                        delete event.endButton;
                    }
                    event.fakeforce = false;
                }
            }
            if (event.player.isUnderControl() && !_status.auto) {
                event.result = {
                    bool: false,
                };
                return;
            } else if (event.isMine()) {
                if (event.hsskill && !event.forced && _status.prehidden_skills.includes(event.hsskill)) {
                    ui.click.cancel();
                    return;
                }
                if (event.type == 'wuxie') {
                    if (ui.tempnowuxie) {
                        var triggerevent = event.getTrigger();
                        if (triggerevent && triggerevent.targets && triggerevent.num == triggerevent.targets.length - 1) {
                            ui.tempnowuxie.close();
                        }
                    }
                    if (lib.filter.wuxieSwap(event)) {
                        event.result = {
                            bool: false,
                        };
                        return;
                    }
                }
                var ok = game.check();
                if (!ok || !lib.config.auto_confirm) {
                    game.pause();
                    if (lib.config.enable_vibrate && player._noVibrate) {
                        delete player._noVibrate;
                        game.vibrate();
                    }
                    if (typeof event.prompt == 'string') {
                        if (event.openskilldialog) {
                            event.skillDialog = ui.create.dialog(event.openskilldialog);
                            delete event.openskilldialog;
                            event.dialog = event.prompt;
                        } else {
                            event.dialog = ui.create.dialog(event.prompt);
                            if (event.prompt2) {
                                event.dialog.addText(event.prompt2);
                            }
                        }
                    } else if (typeof event.prompt == 'function') {
                        event.dialog = ui.create.dialog(event.prompt(event));
                    } else if (event.prompt == undefined) {
                        var str;
                        if (typeof event.filterCard == 'object') {
                            var filter = event.filterCard;
                            str = '请使用' + get.cnNumber(event.selectCard[0]) + '张';
                            if (filter.name) {
                                str += get.translation(filter.name);
                            } else {
                                str += '牌';
                            }
                        } else {
                            str = '请选择要使用的牌';
                        }
                        if (event.openskilldialog) {
                            event.skillDialog = ui.create.dialog(event.openskilldialog);
                            delete event.openskilldialog;
                            event.dialog = str;
                        } else if (typeof event.skillDialog != 'string') {
                            event.dialog = ui.create.dialog(str);
                        } //出牌在这里
                        else {
                            event.dialog = str;
                        }
                    } //出牌在这里
                } //出牌在这里
                else {
                    delete event.openskilldialog;
                }
            } //出牌在这里
            else if (event.isOnline()) {
                event.send();
            } else {
                event.result = 'ai';
            }
            ('step 1');
            if (event.result == 'ai') {
                var ok = game.check();
                if (ok) {
                    ui.click.ok();
                } else if (ai.basic.chooseCard(event.ai1) || forced) {
                    if ((ai.basic.chooseTarget(event.ai2) || forced) && (!event.filterOk || event.filterOk())) {
                        ui.click.ok();
                        event._aiexcludeclear = true;
                    } else {
                        if (!event.norestore) {
                            if (event.skill) {
                                var skill = event.skill;
                                ui.click.cancel();
                                event._aiexclude.add(skill);
                                if (skill.endsWith('_backup')) {
                                    event._aiexclude.add(skill.slice(0, -7));
                                } //转化牌的概率卡死修复
                                var info = get.info(skill);
                                if (info.sourceSkill) {
                                    event._aiexclude.add(info.sourceSkill);
                                }
                            } else {
                                get.card(true).aiexclude();
                                game.uncheck();
                            }
                            event.redo();
                            game.resume();
                        } else {
                            ui.click.cancel();
                        }
                    }
                } else if (event.skill && !event.norestore) {
                    var skill = event.skill;
                    ui.click.cancel();
                    event._aiexclude.add(skill);
                    if (skill.endsWith('_backup')) {
                        event._aiexclude.add(skill.slice(0, -7));
                    } //转化牌的概率卡死修复
                    var info = get.info(skill);
                    if (info.sourceSkill) {
                        event._aiexclude.add(info.sourceSkill);
                    }
                    event.redo();
                    game.resume();
                } //skill是jsrgzhendan_viewas_backup,sourceskill是jsrgzhendan,_aiexclude没有加入jsrgzhendan_viewas,导致所有在子技能的backup里面转化牌的都会概率卡死
                else {
                    ui.click.cancel();
                }
                if (event.aidelay && event.result && event.result.bool) {
                }
            } //转化牌的概率卡死修复
            ('step 2');
            if (event.endButton) {
                event.endButton.close();
                delete event.endButton;
            }
            event.resume();
            if (event.result) {
                if (event.result._sendskill) {
                    lib.skill[event.result._sendskill[0]] = event.result._sendskill[1];
                }
                if (event.result.skill) {
                    var info = get.info(event.result.skill);
                    if (info && info.chooseButton) {
                        if (event.dialog && typeof event.dialog == 'object') event.dialog.close();
                        var dialog = info.chooseButton.dialog(event, player);
                        if (info.chooseButton.chooseControl) {
                            var next = player.chooseControl(info.chooseButton.chooseControl(event, player));
                            if (dialog.direct) next.direct = true;
                            if (dialog.forceDirect) next.forceDirect = true;
                            next.dialog = dialog;
                            next.set(
                                'ai',
                                info.chooseButton.check ||
                                function () {
                                    return 0;
                                }
                            );
                            if (event.id) next._parent_id = event.id;
                            next.type = 'chooseToUse_button';
                        } else {
                            var next = player.chooseButton(dialog);
                            if (dialog.direct) next.direct = true;
                            if (dialog.forceDirect) next.forceDirect = true;
                            next.set(
                                'ai',
                                info.chooseButton.check ||
                                function () {
                                    return 1;
                                }
                            );
                            next.set(
                                'filterButton',
                                info.chooseButton.filter ||
                                function () {
                                    return true;
                                }
                            );
                            next.set('selectButton', info.chooseButton.select || 1);
                            next.set('complexSelect', info.chooseButton.complexSelect !== false);
                            next.set('filterOk', info.chooseButton.filterOk || (() => true));
                            if (event.id) next._parent_id = event.id;
                            next.type = 'chooseToUse_button';
                        }
                        event.buttoned = event.result.skill;
                    } else if (info && info.precontent && !game.online && !event.nouse) {
                        var next = game.createEvent('pre_' + event.result.skill);
                        next.setContent(info.precontent);
                        next.set('result', event.result);
                        next.set('player', player);
                    }
                }
            }
            ('step 3');
            if (event.buttoned) {
                if (result.bool || (result.control && result.control != 'cancel2')) {
                    var info = get.info(event.buttoned).chooseButton;
                    lib.skill[event.buttoned + '_backup'] = info.backup(info.chooseControl ? result : result.links, player);
                    lib.skill[event.buttoned + '_backup'].sourceSkill = lib.skill[event.buttoned].sourceSkill ? lib.skill[event.buttoned].sourceSkill : event.buttoned;
                    if (game.online) {
                        event._sendskill = [event.buttoned + '_backup', lib.skill[event.buttoned + '_backup']];
                    } else {
                        game.broadcast(
                            (skill, audio) => {
                                if (!lib.skill[skill]) lib.skill[skill] = {};
                                lib.skill[skill].audio = audio;
                            },
                            event.buttoned + '_backup',
                            lib.skill[event.buttoned + '_backup'].audio
                        );
                    }
                    event.backup(event.buttoned + '_backup');
                    if (info.prompt) {
                        event.openskilldialog = info.prompt(info.chooseControl ? result : result.links, player);
                    }
                } else {
                    ui.control.addTempClass('nozoom', 100);
                    event._aiexclude.add(event.buttoned);
                }
                event.goto(0);
                delete event.buttoned;
            }
            ('step 4');
            if (event._aiexcludeclear) {
                delete event._aiexcludeclear;
                event._aiexclude.length = 0;
            }
            delete _status.noclearcountdown;
            if (event.skillDialog && get.objtype(event.skillDialog) == 'div') {
                event.skillDialog.close();
            }
            if (event.result && event.result.bool && !game.online && !event.nouse) {
                player.useResult(event.result, event);
            } else if (event._sendskill) {
                event.result._sendskill = event._sendskill;
            }
            if ((!event.result || !event.result.bool || event.result._noHidingTimer) && (event.result?.skill || event.logSkill)) {
                var info = get.info(event.result.skill || (Array.isArray(event.logSkill) ? event.logSkill[0] : event.logSkill));
                if (info.direct && !info.clearTime) {
                    _status.noclearcountdown = 'direct';
                }
            }
            if (event.dialog && typeof event.dialog == 'object') event.dialog.close();
            if (!_status.noclearcountdown) {
                game.stopCountChoose();
            }
            ('step 5');
            if (event._result && event.result) {
                event.result.result = event._result;
            }
        }; //转化牌的概率卡死修复
        lib.element.content.chooseToRespond = function () {
            'step 0';
            if (event.responded) {
                delete event.dialog;
                return;
            }
            var skills = player.getSkills('invisible').concat(lib.skill.global);
            game.expandSkills(skills);
            for (var i = 0; i < skills.length; i++) {
                var info = lib.skill[skills[i]];
                if (info && info.onChooseToRespond) {
                    info.onChooseToRespond(event);
                }
            }
            if (_status.noclearcountdown !== 'direct') _status.noclearcountdown = true;
            if (!_status.connectMode && lib.config.skip_shan && event.autochoose && event.autochoose()) {
                event.result = { bool: false };
            } else {
                if (game.modeSwapPlayer && !_status.auto && player.isUnderControl()) {
                    game.modeSwapPlayer(player);
                }
                if (event.isMine()) {
                    if (event.hsskill && !event.forced && _status.prehidden_skills.includes(event.hsskill)) {
                        ui.click.cancel();
                        return;
                    }
                    var ok = game.check();
                    if (!ok || !lib.config.auto_confirm) {
                        game.pause();
                        if (event.openskilldialog) {
                            event.skillDialog = ui.create.dialog(event.openskilldialog);
                            delete event.openskilldialog;
                            event.dialog = event.prompt;
                        } else {
                            if (event.prompt) event.dialog = ui.create.dialog(event.prompt);
                            if (event.prompt2) event.dialog.addText(event.prompt2);
                        }
                    } else {
                        delete event.openskilldialog;
                    }
                } else if (event.isOnline()) {
                    event.send();
                } else {
                    event.result = 'ai';
                }
            }
            ('step 1');
            if (event.result == 'ai') {
                var ok = game.check();
                if (ok) {
                    ui.click.ok();
                } else if (ai.basic.chooseCard(event.ai1 || event.ai) || forced) {
                    if ((ai.basic.chooseTarget(event.ai2) || forced) && (!event.filterOk || event.filterOk())) {
                        ui.click.ok();
                        event._aiexcludeclear = true;
                    } else {
                        if (!event.norestore) {
                            if (event.skill) {
                                var skill = event.skill;
                                ui.click.cancel();
                                event._aiexclude.add(skill);
                                if (skill.endsWith('_backup')) {
                                    event._aiexclude.add(skill.slice(0, -7));
                                } //转化牌的概率卡死修复
                                var info = get.info(skill);
                                if (info.sourceSkill) {
                                    event._aiexclude.add(info.sourceSkill);
                                }
                            } //转化牌的概率卡死修复
                            else {
                                get.card(true).aiexclude();
                                game.uncheck();
                            }
                            event.redo();
                            game.resume();
                        } else {
                            ui.click.cancel();
                        }
                    } //转化牌的概率卡死修复
                } //转化牌的概率卡死修复
                else if (event.skill && !event.norestore) {
                    var skill = event.skill;
                    ui.click.cancel();
                    event._aiexclude.add(skill);
                    if (skill.endsWith('_backup')) {
                        event._aiexclude.add(skill.slice(0, -7));
                    } //转化牌的概率卡死修复
                    var info = get.info(skill);
                    if (info.sourceSkill) {
                        event._aiexclude.add(info.sourceSkill);
                    }
                    event.redo();
                    game.resume();
                } //转化牌的概率卡死修复
                else {
                    ui.click.cancel();
                }
                if (event.aidelay && event.result && event.result.bool) {
                }
            } //转化牌的概率卡死修复
            ('step 2');
            event.resume();
            if (event.result) {
                if (event.result._sendskill) {
                    lib.skill[event.result._sendskill[0]] = event.result._sendskill[1];
                }
                if (event.result.skill) {
                    var info = get.info(event.result.skill);
                    if (info && info.chooseButton) {
                        if (event.dialog && typeof event.dialog == 'object') event.dialog.close();
                        var dialog = info.chooseButton.dialog(event, player);
                        if (info.chooseButton.chooseControl) {
                            var next = player.chooseControl(info.chooseButton.chooseControl(event, player));
                            if (dialog.direct) next.direct = true;
                            if (dialog.forceDirect) next.forceDirect = true;
                            next.dialog = dialog;
                            next.set(
                                'ai',
                                info.chooseButton.check ||
                                function () {
                                    return 0;
                                }
                            );
                        } else {
                            var next = player.chooseButton(dialog);
                            if (dialog.direct) next.direct = true;
                            if (dialog.forceDirect) next.forceDirect = true;
                            next.set(
                                'ai',
                                info.chooseButton.check ||
                                function () {
                                    return 1;
                                }
                            );
                            next.set(
                                'filterButton',
                                info.chooseButton.filter ||
                                function () {
                                    return true;
                                }
                            );
                            next.set('selectButton', info.chooseButton.select || 1);
                            next.set('filterOk', info.chooseButton.filterOk || (() => true));
                        }
                        event.buttoned = event.result.skill;
                    } else if (info && info.precontent && !game.online) {
                        var next = game.createEvent('pre_' + event.result.skill);
                        next.setContent(info.precontent);
                        next.set('result', event.result);
                        next.set('player', player);
                    }
                }
            }
            ('step 3');
            if (event.buttoned) {
                if (result.bool || (result.control && result.control != 'cancel2')) {
                    var info = get.info(event.buttoned).chooseButton;
                    lib.skill[event.buttoned + '_backup'] = info.backup(info.chooseControl ? result : result.links, player);
                    lib.skill[event.buttoned + '_backup'].sourceSkill = lib.skill[event.buttoned].sourceSkill ? lib.skill[event.buttoned].sourceSkill : event.buttoned;
                    if (game.online) {
                        event._sendskill = [event.buttoned + '_backup', lib.skill[event.buttoned + '_backup']];
                    } else {
                        game.broadcast(
                            (skill, audio) => {
                                if (!lib.skill[skill]) lib.skill[skill] = {};
                                lib.skill[skill].audio = audio;
                            },
                            event.buttoned + '_backup',
                            lib.skill[event.buttoned + '_backup'].audio
                        );
                    }
                    event.backup(event.buttoned + '_backup');
                    if (info.prompt) {
                        event.openskilldialog = info.prompt(info.chooseControl ? result : result.links, player);
                    }
                } else {
                    ui.control.addTempClass('nozoom', 100);
                    event._aiexclude.add(event.buttoned);
                }
                event.goto(0);
                delete event.buttoned;
            }
            ('step 4');
            delete _status.noclearcountdown;
            if (event.skillDialog && get.objtype(event.skillDialog) == 'div') {
                event.skillDialog.close();
            }
            if (event.result.bool && !game.online) {
                if (event.result._sendskill) {
                    lib.skill[event.result._sendskill[0]] = event.result._sendskill[1];
                }
                if (event.onresult) {
                    event.onresult(event.result);
                }
                if ((!event.result || !event.result.bool || event.result._noHidingTimer) && (event.result?.skill || event.logSkill)) {
                    var info = get.info(event.result.skill || (Array.isArray(event.logSkill) ? event.logSkill[0] : event.logSkill));
                    if (info.direct && !info.clearTime) {
                        _status.noclearcountdown = 'direct';
                    }
                }
                if (event.logSkill) {
                    if (typeof event.logSkill == 'string') {
                    } else if (Array.isArray(event.logSkill)) {
                        player.logSkill.apply(player, event.logSkill);
                    }
                }
                if (!event.result.card && event.result.skill) {
                    event.result.used = event.result.skill;
                    player.useSkill(event.result.skill, event.result.cards, event.result.targets);
                } else {
                    if (info && info.prerespond) {
                        info.prerespond(event.result, player);
                    }
                    var next = player.respond(event.result.cards, event.result.card, event.animate, event.result.skill, event.source);
                    if (event.result.noanimate) next.animate = false;
                    if (event.parent.card && event.parent.type == 'card') {
                        next.set('respondTo', [event.parent.player, event.parent.card]);
                    }
                    if (event.noOrdering) next.noOrdering = true;
                }
            } else if (event._sendskill) {
                event.result._sendskill = event._sendskill;
            }
            if (event.dialog && event.dialog.close) event.dialog.close();
            if (!_status.noclearcountdown) {
                game.stopCountChoose();
            }
        }; //转化牌的概率卡死修复
        lib.element.player.chooseToCompare = function (target, check) {
            var next = game.createEvent('chooseToCompare');
            next.player = this;
            if (Array.isArray(target)) {
                next.targets = target;
                if (check) {
                    next.ai = check;
                } else {
                    next.ai = function (card) {
                        if (typeof card == 'string' && lib.skill[card]) {
                            var ais =
                                lib.skill[card].check ||
                                function () {
                                    return 0;
                                };
                            return ais();
                        }
                        var addi = get.value(card) >= 8 && get.type(card) != 'equip' ? -3 : 0;
                        if (card.name == 'du') addi -= 3;
                        var source = _status.event.source;
                        var player = _status.event.player;
                        var event = _status.event.parent;
                        var getn = function (card) {
                            //会赢吗？会赢的!
                            if (player.hasSkillTag('forceWin', null, { card })) return 13 * (Boolean(event.small) ? -1 : 1);
                            return card.number * (Boolean(event.small) ? -1 : 1);
                        };
                        if (source && source != player) {
                            if (get.attitude(player, source) > 1) {
                                if (Boolean(event.small)) return getn(card) - get.value(card) / 3 + addi;
                                return -getn(card) - get.value(card) / 3 + addi;
                            }
                            if (Boolean(event.small)) return -getn(card) - get.value(card) / 5 + addi;
                            return getn(card) - get.value(card) / 5 + addi;
                        } else {
                            if (Boolean(event.small)) return -getn(card) - get.value(card) / 5 + addi;
                            return getn(card) - get.value(card) / 5 + addi;
                        }
                    };
                }
                next.setContent('chooseToCompareMultiple');
            } else {
                next.target = target;
                if (check) {
                    next.ai = check;
                } else {
                    next.ai = function (card) {
                        if (get.attitude(next.player, target) > 0) {
                            return 6 - get.value(card);
                        }
                        return card.number;
                    };
                }
                next.setContent('chooseToCompare');
            }
            next.forceDie = true;
            next._args = Array.from(arguments);
            return next;
        }; //_status.event是choosecard,然而parent事件是choosecardol
        lib.element.dialog.add = function (item, noclick, zoom) {
            if (typeof item == 'string') {
                if (item.startsWith('###')) {
                    const items = item.slice(3).split('###');
                    this.add(items[0], noclick, zoom);
                    this.addText(items[1], items[1].length <= 20, zoom);
                } else if (noclick) {
                    const strstr = item;
                    item = ui.create.div('', this.content);
                    item.innerHTML = strstr;
                } else {
                    item = ui.create.caption(item, this.content);
                }
            }
            // @ts-ignore
            else if (['div', 'fragment'].includes(get.objtype(item))) {
                // @ts-ignore
                this.content.appendChild(item);
            }
            // @ts-ignore
            else if (get.itemtype(item) == 'cards') {
                const buttons = ui.create.div('.buttons', this.content);
                if (zoom) buttons.classList.add('smallzoom');
                // @ts-ignore
                this.buttons = this.buttons.concat(ui.create.buttons(item, 'card', buttons, noclick));
            }
            // @ts-ignore
            else if (get.itemtype(item) == 'players') {
                var buttons = ui.create.div('.buttons', this.content);
                if (zoom) buttons.classList.add('smallzoom');
                // @ts-ignore
                this.buttons = this.buttons.concat(ui.create.buttons(item, 'player', buttons, noclick));
            } else if (item && item[1] == 'textbutton') {
                ui.create.textbuttons(item[0], this, noclick);
            } else {
                var buttons = ui.create.div('.buttons', this.content);
                if (zoom) buttons.classList.add('smallzoom');
                // @ts-ignore
                if (item && item[0] && item[0].length) {
                    this.buttons = this.buttons.concat(ui.create.buttons(item[0], item[1], buttons, noclick)); //QQQ
                } else if (QQQ.config.报错) {
                    console.log(this, item);
                    alert(item + item[0] + '不是合法dialog');
                    throw new Error();
                }
            }
            if (this.buttons.length) {
                if (this.forcebutton !== false) this.forcebutton = true;
                if (this.buttons.length > 3 || (zoom && this.buttons.length > 5)) {
                    this.classList.remove('forcebutton-auto');
                } else if (!this.noforcebutton) {
                    this.classList.add('forcebutton-auto');
                }
            }
            ui.update();
            return item;
        }; //dialog空数组报错减少
        lib.element.content.playVideoContent = function () {
            'step 0';
            ('step 1');
            if (!game.chess) {
                ui.control.innerHTML = '';
                var nodes = [];
                for (var i = 0; i < ui.arena.childNodes.length; i++) {
                    nodes.push(ui.arena.childNodes[i]);
                }
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i] == ui.canvas) continue;
                    if (nodes[i] == ui.control) continue;
                    if (nodes[i] == ui.mebg) continue;
                    if (nodes[i] == ui.me) continue;
                    if (nodes[i] == ui.roundmenu) continue;
                    nodes[i].remove();
                }
                ui.sidebar.innerHTML = '';
                ui.cardPile.innerHTML = '';
                ui.discardPile.innerHTML = '';
                ui.special.innerHTML = '';
                ui.ordering.innerHTML = '';
            }
            ui.system.firstChild.innerHTML = '';
            ui.system.lastChild.innerHTML = '';
            ui.system.firstChild.appendChild(ui.config2);
            if (ui.updateVideoMenu) {
                ui.updateVideoMenu();
            }
            _status.videoDuration = 1 / parseFloat(lib.config.video_default_play_speed.slice(0, -1));
            ui.create.system('返回', function () {
                var mode = localStorage.getItem(lib.configprefix + 'playbackmode');
                if (mode) {
                    game.saveConfig('mode', mode);
                }
                game.reload();
            });
            ui.create.system('重播', function () {
                _status.replayvideo = true;
                game.playVideo(_status.playback, lib.config.mode);
            });
            ui.create.system('暂停', ui.click.pause, true).id = 'pausebutton';
            var atempo = ui.create.system(
                '原速',
                function () {
                    _status.videoDuration = 1;
                    updateDuration();
                },
                true
            );
            var slow = ui.create.system(
                '减速',
                function () {
                    _status.videoDuration *= 1.5;
                    updateDuration();
                },
                true
            );
            var fast = ui.create.system(
                '加速',
                function () {
                    _status.videoDuration /= 1.5;
                    updateDuration();
                },
                true
            );
            var updateDuration = function () {
                atempo.innerHTML = `原速(当前${Math.round(100 / _status.videoDuration) / 100}倍速)`;
                if (_status.videoDuration > 1) {
                    slow.classList.add('glow');
                } else {
                    slow.classList.remove('glow');
                }
                if (_status.videoDuration < 1) {
                    fast.classList.add('glow');
                } else {
                    fast.classList.remove('glow');
                }
            };
            updateDuration();
            ui.system.style.display = '';
            ui.refresh(ui.system);
            ui.system.show();
            ui.window.show();
            if (lib.config.mode != 'versus' && lib.config.mode != 'boss') {
                ui.arena.style.display = '';
                ui.refresh(ui.arena);
                ui.arena.show();
            }
            if (!game.chess) {
                game.playerMap = {};
            }
            game.finishCards();
            ('step 2');
            if (event.video.length) {
                var content = event.video.shift();
                if (content.type == 'delay') {
                } else if (content.type == 'play') {
                    window.play = {};
                    if (!event.playtoload) {
                        event.playtoload = 1;
                    } else {
                        event.playtoload++;
                    }
                    var script = lib.init.js('play', content.name);
                    script.addEventListener('load', function () {
                        var play = window.play[content.name];
                        if (play && play.video) {
                            play.video(content.init);
                        }
                        event.playtoload--;
                        if (event.playtoload == 0) {
                            delete window.play;
                        }
                    });
                } else if (typeof content.player == 'string' && game.playerMap[content.player] && game.playerMap[content.player].classList && !game.playerMap[content.player].classList.contains('obstacle')) {
                    if (game.videoContent[content.type]) game.videoContent[content.type](game.playerMap[content.player], content.content);
                } else {
                    if (game.videoContent[content.type]) game.videoContent[content.type](content.content);
                } //QQQ
                if (event.video.length) {
                    game.delay(0, _status.videoDuration * Math.min(2000, event.video[0].delay));
                }
                event.redo();
            } else {
                _status.over = true;
                ui.system.lastChild.hide();
                setTimeout(function () {
                    ui.system.lastChild.innerHTML = '';
                }, 500);
            }
        }; //录像播放修复
    }; //修复本体函数
    xiufu();
    //—————————————————————————————————————————————————————————————————————————————技能相关自创函数
    const jineng = function () {
        lib.element.player.GS = function () {
            const skills = this.skills.slice();
            for (const i of Array.from(this.node.equips.childNodes)) {
                if (Array.isArray(lib.card[i.name].skills)) {
                    skills.addArray(lib.card[i.name].skills);
                }
            }
            for (const i in this.additionalSkills) {
                if (Array.isArray(this.additionalSkills[i])) {
                    skills.addArray(this.additionalSkills[i]);
                } else if (typeof this.additionalSkills[i] == 'string') {
                    skills.add(this.additionalSkills[i]);
                }
            }
            skills.addArray(Object.keys(this.tempSkills));
            skills.addArray(this.hiddenSkills);
            skills.addArray(this.invisibleSkills);
            return skills;
        }; //获取武将所有技能函数
        lib.element.player.GAS = function () {
            const skills = this.skills.slice();
            for (const i in this.additionalSkills) {
                if (Array.isArray(this.additionalSkills[i])) {
                    skills.addArray(this.additionalSkills[i]);
                } else if (typeof this.additionalSkills[i] == 'string') {
                    skills.add(this.additionalSkills[i]);
                }
            }
            return skills;
        }; //获取武将的武将牌上技能函数
        lib.element.player.GES = function () {
            const skills = [];
            for (const i of Array.from(this.node.equips.childNodes)) {
                if (Array.isArray(lib.card[i.name].skills)) {
                    skills.addArray(lib.card[i.name].skills);
                }
            }
            return skills;
        }; //获取武将装备技能函数
        lib.element.player.GTS = function () {
            return Object.keys(this.tempSkills);
        }; //获取武将临时技能函数
        lib.element.player.RS = function (Q) {
            if (Array.isArray(Q)) {
                for (const i of Q) {
                    this.RS(i);
                }
            } else {
                this.skills.remove(Q);
                this.hiddenSkills.remove(Q);
                this.invisibleSkills.remove(Q);
                delete this.tempSkills[Q];
                for (var i in this.additionalSkills) {
                    this.additionalSkills[i].remove(Q);
                }
                this.checkConflict(Q);
                this.RST(Q);
                if (lib.skill.global.includes(Q)) {
                    lib.skill.global.remove(Q);
                    delete lib.skill.globalmap[Q];
                    for (var i in lib.hook.globalskill) {
                        lib.hook.globalskill[i].remove(Q);
                    }
                }
            }
            return Q;
        }; //移除技能函数
        lib.element.player.RST = function (skills) {
            if (typeof skills == 'string') skills = [skills];
            game.expandSkills(skills);
            for (const Q of skills) {
                this.initedSkills.remove(Q);
                for (var i in lib.hook) {
                    if (Array.isArray(lib.hook[i]) && lib.hook[i].includes(Q)) {
                        try {
                            delete lib.hook[i];
                        } catch (e) {
                            console.log(i + 'lib.hook不能delete');
                        }
                    }
                }
                for (var i in lib.hook.globalskill) {
                    if (lib.hook.globalskill[i].includes(Q)) {
                        lib.hook.globalskill[i].remove(Q);
                        if (lib.hook.globalskill[i].length == 0) {
                            delete lib.hook.globalskill[i];
                        }
                    }
                }
            }
            return this;
        }; //移除技能时机函数
        lib.element.player.CS = function () {
            const skill = this.GS();
            game.expandSkills(skill);
            this.skills = [];
            this.tempSkills = {};
            this.initedSkills = [];
            this.invisibleSkills = [];
            this.hiddenSkills = [];
            this.additionalSkills = {};
            for (const key in lib.hook) {
                if (key.startsWith(this.playerid)) {
                    try {
                        delete lib.hook[key];
                    } catch (e) {
                        console.log(key + 'lib.hook不能delete');
                    }
                }
            }
            for (const hook in lib.hook.globalskill) {
                for (const i of skill) {
                    if (lib.hook.globalskill[hook].includes(i)) {
                        lib.hook.globalskill[hook].remove(i);
                    }
                }
            }
            return this.skills;
        }; //清空所有技能函数
        lib.element.player.DS = function () {
            const skill = this.GS();
            game.expandSkills(skill);
            this._hookTrigger = ['QQQ_fengjin'];
            this.storage.skill_blocker = ['QQQ_fengjin'];
            for (const i of skill) {
                this.disabledSkills[i] = 'QQQ';
                this.storage[`temp_ban_${i}`] = true;
            }
            return this.skills;
        }; //失效所有技能函数
        lib.skill.QQQ_fengjin = {
            hookTrigger: {
                block: (event, player, triggername, skill) => true,
            },
            skillBlocker: (skill, player) => true,
        };
    }; //技能相关自创函数
    jineng();
    //—————————————————————————————————————————————————————————————————————————————一些杂乱自创函数
    const zawu = function () {
        lib.element.card.AQ = function (tag) {
            if (!this.qdiv) {
                this.qdiv = ui.create.div('.qtag', this);
            }
            if (!this.qdiv.list) {
                this.qdiv.list = [];
            }
            this.qdiv.list.add(tag);
            let str = '';
            for (const i of this.qdiv.list) {
                str += `${i}<br>`;
            }
            this.qdiv.innerHTML = str;
            return this;
        }; //添加卡牌永久标记,失去牌不会消失
        lib.element.card.HQ = function (tag) {
            return this.qtag && this.qtag.includes(tag);
        }; //检测卡牌标记
        lib.element.player.D = function () {
            _status.roundStart = game.me;
            if (ui.land && ui.land.player == this) {
                game.addVideo('destroyLand');
                ui.land.destroy();
            }
            game.log(this, '阵亡');
            this.classList.add('dead');
            this.node.count.innerHTML = '0';
            this.node.hp.hide();
            this.node.equips.hide();
            this.node.count.hide();
            this.previous.next = this.next;
            this.next.previous = this.previous;
            game.players.remove(this);
            game.dead.push(this);
        }; //简化死亡函数
        lib.element.player.fanwei = function (num) {
            const players = [];
            let next = this.next,
                previous = this.previous;
            while (num-- > 0) {
                if (next != this && next) {
                    players.add(next);
                    next = next.next;
                }
                if (previous != this && previous) {
                    players.add(previous);
                    previous = previous.previous;
                }
            }
            return players;
        }; //获取相邻角色以便范围伤害
        lib.element.content.QQQ = game.kongfunc; //空事件
        lib.element.player.nengliangtiao = function () {
            const player = this;
            const nengliangtiao = ui.create.div('.nengliangtiao', player);
            const jindutiao = ui.create.div('.jindutiao', nengliangtiao);
            return jindutiao;
        };
    }; //杂乱自创函数
    zawu();
    //—————————————————————————————————————————————————————————————————————————————解构魔改本体函数
    const mogai = function () {
        lib.element.player.dyingResult = async function () {
            game.log(this, '濒死');
            _status.dying.unshift(this);
            for (const i of game.players) {
                const { result } = await i.chooseToUse({
                    filterCard: (card, player, event) => lib.filter.cardSavable(card, player, _status.dying[0]),
                    filterTarget(card, player, target) {
                        if (target != _status.dying[0]) return false;
                        if (!card) return false;
                        var info = get.info(card);
                        if (!info.singleCard || ui.selected.targets.length == 0) {
                            var mod = game.checkMod(card, player, target, 'unchanged', 'playerEnabled', player);
                            if (mod == false) return false;
                            var mod = game.checkMod(card, player, target, 'unchanged', 'targetEnabled', target);
                            if (mod != 'unchanged') return mod;
                        }
                        return true;
                    },
                    prompt: get.translation(_status.dying[0]) + '濒死,是否帮助？',
                    ai1: () => 1,
                    ai2() {
                        return get.attitude(_status.dying[0], i);
                    }, //QQQ
                    type: 'dying',
                    targetRequired: true,
                    dying: _status.dying[0],
                });
                if (result?.bool) {
                    _status.dying.remove(this);
                    break;
                }
            }
            if (_status.dying.includes(this)) {
                await this.die();
            }
            return this;
        }; //濒死结算
        lib.element.player.yinni = function () {
            const name = this.name;
            this.storage.rawHp = this.hp;
            this.storage.rawMaxHp = this.maxHp;
            if (name && lib.character[name]) {
                const skill = lib.character[name][3];
                if (!this.hiddenSkills) {
                    this.hiddenSkills = [];
                }
                if (skill[0]) {
                    for (const i of skill) {
                        this.removeSkill(i);
                    }
                    this.hiddenSkills.addArray(skill);
                }
            }
            this.classList.add('unseen');
            this.name = 'unknown';
            this.sex = 'male';
            this.storage.nohp = true;
            this.node.hp.hide();
            this.addSkill('g_hidden_ai');
            this.hp = 1;
            this.maxHp = 1;
            this.update();
        }; //隐匿函数
        lib.element.player.qreinit = function (name) {
            const info = lib.character[name];
            this.name1 = name;
            this.name = name;
            this.sex = info.sex;
            this.changeGroup(info.group, false);
            for (const i of info.skills) {
                this.addSkill(i);
            }
            this.maxHp = get.infoMaxHp(info.maxHp);
            this.hp = this.maxHp;
            game.addVideo('reinit3', this, {
                name: name,
                hp: this.maxHp,
                avatar2: this.name2 == name,
            });
            this.smoothAvatar(false);
            this.node.avatar.setBackground(name, 'character');
            this.node.name.innerHTML = get.translation(name);
            this.update();
            return this;
        }; //变身
        lib.element.player.quseCard = async function (card, targets, cards) {
            const player = this;
            if (typeof card == 'string') {
                card = { name: card };
            }
            const name = card.name;
            const info = lib.card[name];
            if (!cards) {
                cards = [card];
            }
            const skill = _status.event.skill;
            if (info.contentBefore) {
                const next = game.createEvent(name + 'ContentBefore', false);
                if (next.parent) {
                    next.parent.stocktargets = targets;
                }
                next.targets = targets;
                next.card = card;
                next.cards = cards;
                next.player = player;
                next.skill = skill;
                next.type = 'precard';
                next.forceDie = true;
                await next.setContent(info.contentBefore);
            }
            if (!info.multitarget) {
                for (const target of targets) {
                    if (target && target.isDead()) return;
                    if (info.notarget) return;
                    const next = game.createEvent(name, false);
                    if (next.parent) {
                        next.parent.directHit = [];
                    }
                    next.targets = targets;
                    next.target = target;
                    next.card = card;
                    if (info.type == 'delay') {
                        next.card = {
                            name: name,
                            cards: cards,
                        };
                    }
                    next.cards = cards;
                    next.player = player;
                    next.type = 'card';
                    next.skill = skill;
                    next.baseDamage = Math.max(numberq1(info.baseDamage));
                    next.forceDie = true;
                    next.directHit = true;
                    await next.setContent(info.content);
                }
            } else {
                if (info.notarget) return;
                const next = game.createEvent(name, false);
                if (next.parent) {
                    next.parent.directHit = [];
                }
                next.targets = targets;
                next.target = targets[0];
                next.card = card;
                if (info.type == 'delay') {
                    next.card = {
                        name: name,
                        cards: cards,
                    };
                }
                next.cards = cards;
                next.player = player;
                next.type = 'card';
                next.skill = skill;
                next.baseDamage = Math.max(numberq1(info.baseDamage));
                next.forceDie = true;
                next.directHit = true;
                await next.setContent(info.content);
            }
            if (info.contentAfter) {
                const next = game.createEvent(name + 'ContentAfter', false);
                next.targets = targets;
                next.card = card;
                next.cards = cards;
                next.player = player;
                next.skill = skill;
                next.type = 'postcard';
                next.forceDie = true;
                await next.setContent(info.contentAfter);
            }
        }; //解构用牌
        lib.element.player.qrevive = function () {
            if (this.parentNode != ui.arena) {
                ui.arena.appendChild(this);
            } //防止被移除节点
            this.classList.remove('removing');
            this.classList.remove('hidden');
            this.classList.remove('dead');
            game.log(this, '复活');
            if (this.maxHp < 1) this.maxHp = 1;
            this.hp = this.maxHp;
            game.addVideo('revive', this);
            this.removeAttribute('style');
            this.node.avatar.style.transform = '';
            this.node.avatar2.style.transform = '';
            this.node.hp.show();
            this.node.equips.show();
            this.node.count.show();
            this.update();
            game.players.add(this);
            game.dead.remove(this);
            this.draw(Math.min(this.maxHp, 20));
            return this;
        }; //复活函数
        lib.element.player.zhenshang = function (num, source, nature) {
            const player = this;
            let str = '受到了';
            if (source) {
                str += `来自<span class='bluetext'>${source == player ? '自己' : get.translation(source)}</span>的`;
            }
            str += get.cnNumber(num) + '点';
            if (nature) {
                str += get.translation(nature) + '属性';
            }
            str += '伤害';
            game.log(player, str);
            if (player.stat[player.stat.length - 1].damaged == undefined) {
                player.stat[player.stat.length - 1].damaged = num;
            } else {
                player.stat[player.stat.length - 1].damaged += num;
            }
            if (source) {
                if (source.stat[source.stat.length - 1].damage == undefined) {
                    source.stat[source.stat.length - 1].damage = num;
                } else {
                    source.stat[source.stat.length - 1].damage += num;
                }
            }
            player.hp -= num;
            player.update();
            player.$damage(source);
            var natures = (nature || '').split(lib.natureSeparator);
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
            if (player.hp <= 0 && player.isAlive()) {
                player.dying({ source: source });
            }
        }; //真实伤害
    }; //解构魔改本体函数
    mogai();
    //—————————————————————————————————————————————————————————————————————————————一些全局技能
    const quanju = function () {
        lib.skill._huocard = {
            trigger: {
                player: ['gainEnd', 'loseEnd'],
            },
            forced: true,
            filter(event, player, card) {
                return event.cards?.some((q) => q.name == '火');
            },
            async content(event, trigger, player) {
                player.damage();
            },
        };
        lib.skill._手牌上限与补充牌堆 = {
            trigger: {
                player: ['gainBefore'],
            },
            silent: true,
            fixed: true,
            charlotte: true,
            filter(event, player) {
                if (event.cards?.length + player.countCards('h') >= Number(QQQ.config.平衡)) {
                    event.cancel();
                }
                if (!QQQ.cardList) {
                    QQQ.cardList = Array.from(ui.cardPile.childNodes);
                } //记录牌堆中牌
                if (ui.cardPile.childNodes.length + ui.discardPile.childNodes.length < QQQ.cardList.length / 2) {
                    for (const i of QQQ.cardList) {
                        const card = game.createCard(i);
                        ui.cardPile.appendChild(card);
                    }
                } //当牌堆与弃牌堆中牌少于记录一半的时候将记录的牌创造并加入
            },
            content() { },
        };
        _status.jieduan = {};
        lib.skill._jieduan = {
            trigger: {
                global: ['phaseEnd', 'phaseZhunbeiEnd', 'phaseJudgeEnd', 'phaseDrawEnd', 'phaseUseEnd', 'phaseDiscardEnd', 'phaseJieshuEnd'],
            },
            silent: true,
            async content(event, trigger, player) {
                for (const i in _status.jieduan) {
                    delete _status.jieduan[i];
                }
            },
        }; //阶段限一次技能计数清空
        if (QQQ.config.卖血模式) {
            lib.skill._卖血模式 = {
                mod: {
                    ignoredHandcard(card, player) {
                        const maixie = ['maihp', 'maixie_defend', 'maixie'].some((q) => player.hasSkillTag(q));
                        if (maixie) {
                            return get.tag(card, 'recover');
                        }
                    },
                },
                trigger: {
                    global: ['useCard'],
                },
                filter(event, player) {
                    const maixie = ['maihp', 'maixie_defend', 'maixie'].some((q) => player.hasSkillTag(q));
                    if (maixie) {
                        return get.tag(event.card, 'damage') && event.targets?.some((i) => player.getFriends().includes(i));
                    }
                },
                forced: true,
                silent: true,
                async content(event, trigger, player) {
                    trigger.targets = trigger.targets.filter((i) => player.getEnemies().includes(i));
                    trigger.targets.push(player);
                    trigger.player.line(player);
                    game.log(get.translation(player), `将${get.translation(trigger.card)}由${get.translation(trigger.targets)}转移给自己`);
                },
                group: ['_卖血模式_1'], //QQQ
                subSkill: {
                    1: {
                        trigger: {
                            player: ['loseBefore'],
                        },
                        forced: true,
                        silent: true,
                        filter(event, player) {
                            if ('useCard' == event.parent.name) return false;
                            const maixie = ['maihp', 'maixie_defend', 'maixie'].some((q) => player.hasSkillTag(q));
                            if (maixie) {
                                return event.cards && event.cards.some((card) => get.tag(card, 'recover')); //QQQ
                            }
                        },
                        async content(event, trigger, player) {
                            trigger.cards = trigger.cards.filter((i) => !get.tag(i, 'recover'));
                        },
                    },
                },
            }; //卖血模式
        }
        if (QQQ.config.一主多反) {
            lib.skill._qunou = {
                trigger: {
                    global: ['gameStart'],
                },
                firstDo: true,
                forced: true,
                mode: ['identity'],
                filter(event, player, card) {
                    return player == game.me;
                },
                async content(event, trigger, player) {
                    for (const i of game.players) {
                        if (i == player) {
                            game.zhu = i;
                            i.identity = 'zhu';
                            i.setIdentity('zhu');
                        } else {
                            i.identity = 'fan';
                            i.setIdentity('fan');
                        }
                    }
                },
            };
        }
        if (QQQ.config.主公加强) {
            lib.skill._主公 = {
                trigger: {
                    global: ['reviveEnd', 'dieEnd'],
                },
                forced: true,
                silent: true,
                filter(event, player, card) {
                    return player == game.zhu && ['identity'].includes(get.mode());
                },
                async content(event, trigger, player) {
                    lib.skill._主公.init(player, '_主公');
                },
                derivation: ['zongzuo', 'aocai', 'tianming', 'xiangle'],
                init(player, skill) {
                    player.removeAdditionalSkill(skill);
                    if (game.players.length >= 3) player.addAdditionalSkill(skill, ['aocai'], true);
                    if (game.players.length >= 5) player.addAdditionalSkill(skill, ['tianming'], true);
                    if (game.players.length >= 7) player.addAdditionalSkill(skill, ['xiangle'], true);
                },
                group: ['_主公_1'],
                subSkill: {
                    1: {
                        trigger: {
                            global: 'gameDrawBefore',
                        },
                        forced: true,
                        silent: true,
                        filter(event, player, card) {
                            return player == game.zhu && ['identity'].includes(get.mode());
                        },
                        async content(event, trigger, player) {
                            player.addSkill('zongzuo');
                            lib.skill._主公.init(player, '_主公');
                        },
                    },
                },
            }; //身份场主公加强
        }
        if (Number(QQQ.config.飞扬跋扈模式)) {
            lib.skill._飞扬 = {
                trigger: {
                    player: 'phaseJudgeBegin',
                },
                forced: true,
                silent: true,
                filter(event, player) {
                    return player.countCards('j') && player.countCards('he') > 1;
                },
                async content(event, trigger, player) {
                    //QQQ
                    var { result } = await player.chooseToDiscard('he', 2, '弃置两张牌并弃置判定区里的一张牌').set('ai', function (card) {
                        var Q = player.getCards('j');
                        let E = {};
                        if (Q.some((i) => i.name == 'yanxiao_card')) return false; //QQQ
                        if (Q.length == 1 && Q[0].viewAs == 'shandian') return 1 - get.value(card);
                        if (
                            Q.some((i) => {
                                if (E[i.name]) {
                                    return true;
                                } else {
                                    E[i.name] = true;
                                    return false;
                                }
                            })
                        )
                            return 1 - get.value(card);
                        var value = 0;
                        for (const i of Q) {
                            if (!i.viewAs) var name = i.name;
                            else var name = i.viewAs;
                            if (!lib.card[name].ai || !lib.card[name].ai.result) continue;
                            var W = lib.card[name].ai.result.target;
                            if (typeof W == 'function') value += W(player, player, { name: name });
                            value += W;
                        }
                        return -6 * value - get.value(card);
                    });
                    if (result.cards && result.cards[0] && player.countCards('j')) {
                        //QQQ
                        var { result } = await player.chooseButton(['弃置判定区里的一张牌', player.getCards('j')], true).set('ai', function (button) {
                            var Q = player.getCards('j');
                            if (Q.some((i) => i.name == button.link.name && i != button.link)) return 0;
                            if (!button.link.viewAs) var name = button.link.name;
                            else var name = button.link.viewAs;
                            if (!lib.card[name].ai || !lib.card[name].ai.result) return 0;
                            var W = lib.card[name].ai.result.target;
                            if (typeof W == 'function') return -W(player, player, { name: name });
                            return -W;
                        });
                        if (result && result.links && result.links[0]) {
                            ui.discardPile.appendChild(result.links[0]);
                        }
                    }
                },
            }; //所有武将添加飞扬
            lib.skill._跋扈 = {
                trigger: {
                    player: 'phaseZhunbeiBegin',
                },
                forced: true,
                silent: true,
                async content(event, trigger, player) {
                    var numx = Number(QQQ.config.飞扬跋扈模式);
                    game.log(player, '跋扈摸' + numx);
                    player.draw(numx);
                },
                mod: {
                    cardUsable(card, player, num) {
                        var numx = Number(QQQ.config.飞扬跋扈模式);
                        if (numx) {
                            if (card.name == 'sha' || card.name == 'jiu') return num + numx;
                        }
                    },
                    globalFrom(from, to, distance) {
                        var numx = Number(QQQ.config.飞扬跋扈模式);
                        if (numx) {
                            return distance - numx;
                        }
                    },
                },
            }; //所有武将添加跋扈
            lib.skill._跋扈1 = {
                trigger: {
                    global: ['gameStart'],
                },
                silent: true,
                _priority: -9,
                async content(event, trigger, player) {
                    player.changeHujia(2);
                },
            }; //全体触发
        }
    }; //全局技能
    quanju();
    //—————————————————————————————————————————————————————————————————————————————卡牌AI修改
    const card = function () {
        //————————————————————————————————————————————————————————————————————————————————————————————————————直接替换
        const zhijie = function () {
            lib.card.bagua = {
                fullskin: true,
                type: 'equip',
                subtype: 'equip2',
                ai: {
                    basic: {
                        equipValue: 7.5,
                        order(card, player) {
                            const equipValue = get.equipValue(card, player) / 20;
                            return player && player.hasSkillTag('reverseEquip') ? 8.5 - equipValue : 8 + equipValue;
                        },
                        useful: 2,
                        value(card, player, index, method) {
                            if (!player.getCards('e').includes(card) && !player.canEquip(card, true)) return 0.01;
                            const info = get.info(card),
                                current = player.getEquip(info.subtype),
                                value = current && card != current && get.value(current, player);
                            let equipValue = info.ai.equipValue || info.ai.basic.equipValue;
                            if (typeof equipValue == 'function') {
                                if (method == 'raw') return equipValue(card, player);
                                if (method == 'raw2') return equipValue(card, player) - value;
                                return Math.max(0.1, equipValue(card, player) - value);
                            }
                            if (typeof equipValue != 'number') equipValue = 0;
                            if (method == 'raw') return equipValue;
                            if (method == 'raw2') return equipValue - value;
                            return Math.max(0.1, equipValue - value);
                        },
                    },
                    result: {
                        target: (player, target, card) => get.equipResult(player, target, card.name),
                    },
                },
                skills: ['八卦'],
                enable: true,
                selectTarget: -1,
                filterTarget: (card, player, target) => player == target && target.canEquip(card, true),
                modTarget: true,
                allowMultiple: false,
                content() {
                    if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
                },
                toself: true,
            }; //八卦改为锁定技
            lib.card.huxinjing = {
                fullskin: true,
                type: 'equip',
                subtype: 'equip2',
                cardcolor: 'club',
                skills: ['huxinjing'],
                filter: () => true,
                filterTarget: (card, player, target) => player == target && target.canEquip(card, true),
                selectTarget() {
                    return [-1, -1]; //QQQ
                },
                toself: false,
                ai: {
                    basic: {
                        equipValue: 6,
                    },
                },
            };
            lib.card.jiguanshu = {
                fullskin: true,
                type: 'jiguan',
                wuxieable: true,
                modTarget: true,
                enable(card, player) {
                    for (const i of player.getCards('e')) {
                        if (lib.card[i.name].type == 'equip') return true;
                    }
                    return false;
                },
                filterTarget(card, player, target) {
                    return target == player;
                },
                selectTarget: -1,
                //出牌阶段对自己使用,用随机祭器强化装备区内的一张随机装备,用随机零件强化其余的装备
                content() {
                    'step 0';
                    var es = target.getCards('e').filter((q) => lib.card[q.name].type == 'equip'); //QQQ
                    var list = get.typeCard('hslingjian');
                    var list2 = get.typeCard('jiqi');
                    var list3 = [];
                    var list4 = [];
                    for (var i = 0; i < list2.length; i++) {
                        if (list2[i].indexOf('yuchan') == 0) {
                            list4.push(list2[i]);
                        } else {
                            list3.push(list2[i]);
                        }
                    }
                    if (Math.random() < 1 / 3) {
                        list2 = list4;
                    } else {
                        list2 = list3;
                    }
                    var cards = [];
                    var time = 0;
                    for (var i = 0; i < es.length; i++) {
                        if (!lib.inpile.includes(es[i].name) || lib.card[es[i].name].nopower || lib.card[es[i].name].unique || es[i].nopower) {
                            es.splice(i--, 1);
                        }
                    }
                    if (!es.length) {
                        event.finish();
                        return;
                    }
                    if (!list.length && !list2.length) {
                        event.finish();
                        return;
                    }
                    var num = get.rand(es.length);
                    var card;
                    target.removeEquipTrigger();
                    var delayed = 0;
                    for (var i = 0; i < es.length; i++) {
                        if (i == num) {
                            card = game.createCard(list2.randomGet());
                        } else {
                            card = game.createCard(list.randomGet());
                        }
                        if (!card) {
                            delayed++;
                            continue;
                        }
                        cards.push(card);
                        time += 200;
                        setTimeout(
                            (function (card, name, last) {
                                return function () {
                                    game.createCard(card).discard();
                                    card.init([card.suit, card.number, name, card.nature]);
                                    card.style.transform = 'scale(1.1)';
                                    card.classList.add('glow');
                                    if (last) game.resume();
                                    setTimeout(function () {
                                        card.style.transform = '';
                                        card.classList.remove('glow');
                                    }, 500);
                                };
                            })(es[i], lib.skill.lingjianduanzao.process([card, es[i]]), i == es.length - 1),
                            (i - delayed) * 200
                        );
                    }
                    target.$gain2(cards);
                    game.pause();
                    ('step 1');
                    target.addEquipTrigger();
                },
                ai: {
                    value: 7,
                    order: 7.5,
                    result: {
                        target: 1,
                    },
                },
            }; //和零件锻造配合,必须类型是装备不然会报错没有name
            lib.card.tao = {
                fullskin: true,
                type: 'basic',
                cardcolor: 'red',
                toself: true,
                enable(card, player) {
                    if (player.getEquip('神农鼎')) return true;
                    return player.hp < player.maxHp;
                },
                savable: true,
                selectTarget: -1,
                filterTarget(card, player, target) {
                    if (player.getEquip('神农鼎')) return target == player;
                    return target == player && target.hp < target.maxHp;
                },
                modTarget(card, player, target) {
                    if (player.getEquip('神农鼎')) return true;
                    return target.hp < target.maxHp;
                },
                content() {
                    if (player.getEquip('神农鼎')) {
                        target.hp += 2;
                        if (target.maxHp < target.hp) {
                            target.maxHp = target.hp;
                        }
                    } else {
                        target.recover();
                    }
                },
                ai: {
                    basic: {
                        order: 94,
                        useful(card, i) {
                            let player = _status.event.player;
                            if (!game.checkMod(card, player, 'unchanged', 'cardEnabled2', player)) return 2 / (1 + i);
                            let fs = game.filterPlayer((current) => {
                                return get.attitude(player, current) > 0 && current.hp <= 2;
                            }),
                                damaged = 0,
                                needs = 0;
                            fs.forEach((f) => {
                                if (f.hp > 3 || !lib.filter.cardSavable(card, player, f)) return;
                                if (f.hp > 1) damaged++;
                                else needs++;
                            });
                            if (needs && damaged) return 5 * needs + 3 * damaged;
                            if (needs + damaged > 1 || player.hasSkillTag('maixie')) return 8;
                            if (player.hp / player.maxHp < 0.7) return 7 + Math.abs(player.hp / player.maxHp - 0.5);
                            if (needs) return 7;
                            if (damaged) return Math.max(3, 7.8 - i);
                            return Math.max(1, 7.2 - i);
                        },
                        value(card, player) {
                            let fs = game.filterPlayer((current) => {
                                return get.attitude(_status.event.player, current) > 0;
                            }),
                                damaged = 0,
                                needs = 0;
                            fs.forEach((f) => {
                                if (!player.canUse('tao', f)) return;
                                if (f.hp <= 1) needs++;
                                else if (f.hp == 2) damaged++;
                            });
                            if ((needs && damaged) || player.hasSkillTag('maixie')) return Math.max(9, 5 * needs + 3 * damaged);
                            if (needs || damaged > 1) return 8;
                            if (damaged) return 7.5;
                            return Math.max(5, 9.2 - player.hp);
                        },
                    },
                    result: {
                        target(player, target) {
                            if (target.hasSkillTag('maixie')) return 4;
                            return 3;
                        },
                    },
                    tag: {
                        recover: 1,
                        save: 1,
                    },
                },
            };
        };
        zhijie();
        //————————————————————————————————————————————————————————————————————————————————————————————————————浅层检测
        const qianceng = function () {
            if (lib.card.lizhengshangyou) {
                lib.card.lizhengshangyou.ai = {
                    basic: {
                        order: 9,
                        useful: [3, 1],
                        value: 0,
                    },
                    result: {
                        target(player, target) {
                            if (game.players.some((q) => q.side == target.side && q.storage.longchuanzhibao)) {
                                return 1.5;
                            }
                            return -1;
                        },
                    },
                    tag: {
                        recover: 0.5,
                        multitarget: 1,
                    },
                };
            }
            if (lib.card.diaobingqianjiang) {
                //结算后，你可以将剩余的牌中的任意张以任意顺序置于牌堆顶
                lib.card.diaobingqianjiang.contentAfter = function () {
                    'step 0';
                    event.dialog = get.idDialog(event.preResult);
                    if (!event.dialog) {
                        event.finish();
                        return;
                    }
                    var nextSeat = player.next; //QQQ
                    var att = get.attitude(player, nextSeat);
                    if (player.isUnderControl(true) && !_status.auto) {
                        event.dialog.setCaption('将任意张牌以任意顺序置于牌堆顶（先选择的在上）');
                    }
                    var next = player.chooseButton([1, event.dialog.buttons.length], event.dialog);
                    next.ai = function (button) {
                        if (att > 0) {
                            return get.value(button.link, nextSeat) - 5;
                        } else {
                            return 5 - get.value(button.link, nextSeat);
                        }
                    };
                    next.set('closeDialog', false);
                    next.set('dialogdisplay', true);
                    ('step 1');
                    if (result && result.bool && result.links && result.links.length) {
                        for (var i = 0; i < result.buttons.length; i++) {
                            event.dialog.buttons.remove(result.buttons[i]);
                        }
                        var cards = result.links.slice(0);
                        while (cards.length) {
                            ui.cardPile.insertBefore(cards.pop(), ui.cardPile.firstChild);
                        }
                        game.log(player, '将' + get.cnNumber(result.links.length) + '张牌置于牌堆顶');
                    }
                    for (var i = 0; i < event.dialog.buttons.length; i++) {
                        event.dialog.buttons[i].link.discard();
                    }
                    ('step 2');
                    var dialog = event.dialog;
                    dialog.close();
                    _status.dieClose.remove(dialog);
                    game.addVideo('cardDialog', null, event.preResult);
                };
            }
            if (lib.card.gw_dieyi_judge) {
                lib.card.gw_dieyi_judge.ai = {
                    result: {
                        target: (player, target) => -1, //QQQ
                    },
                };
            }
            if (lib.card.yanjiadan_heart) {
                lib.card.yanjiadan_heart.content = async function (event, trigger, player) {
                    var choice = null;
                    var targets = game.players.filter(function (current) {
                        return get.attitude(player, current) > 0;
                    });
                    for (var i = 0; i < targets.length; i++) {
                        if (targets[i].hp == 1) {
                            if (targets[i].hasSkill('yunvyuanshen_skill')) {
                                choice = 'ziyangdan';
                            } else {
                                choice = 'yunvyuanshen';
                                break;
                            }
                        }
                    }
                    if (
                        !choice &&
                        game.hasPlayer(function (current) {
                            return current.hp == 1 && get.attitude(player, current) < 0 && get.damageEffect(current, player, player, 'fire') > 0;
                        })
                    ) {
                        choice = 'shatang';
                    }
                    if (!choice) {
                        for (var i = 0; i < targets.length; i++) {
                            if (!targets[i].hasSkill('yunvyuanshen_skill')) {
                                choice = 'yunvyuanshen';
                                break;
                            }
                        }
                    }
                    if (!choice) {
                        choice = 'ziyangdan';
                    }
                    const {
                        result: { links },
                    } = await player
                        .chooseVCardButton('选择一张牌视为使用之', ['yunvyuanshen', 'ziyangdan', 'shatang'])
                        .set('ai', function (button) {
                            if (button.link[2] == _status.event.choice) return 2;
                            return Math.random();
                        })
                        .set('choice', choice)
                        .set('filterButton', function (button) {
                            return _status.event.player.hasUseTarget(button.link[2]);
                        });
                    if (links && links[0]) {
                        player.chooseUseTarget(true, links[0][2]);
                    }
                };
            }
            if (lib.card.yanjiadan_diamond) {
                lib.card.yanjiadan_diamond.content = async function (event, trigger, player) {
                    var choice = 'liufengsan';
                    if (
                        game.hasPlayer(function (current) {
                            var eff = get.effect(current, { name: 'shenhuofeiya' }, player, player);
                            if (eff >= 0) return false;
                            if (current.hp == 1 && eff < 0) return true;
                            if (get.attitude(player, current) < 0 && get.attitude(player, current.next) < 0 && get.attitude(player, current.previous) < 0) {
                                return true;
                            }
                            return false;
                        })
                    ) {
                        choice = 'shenhuofeiya';
                    }
                    const {
                        result: { links },
                    } = await player
                        .chooseVCardButton('选择一张牌视为使用之', ['liufengsan', 'shujinsan', 'shenhuofeiya'])
                        .set('ai', function (button) {
                            if (button.link[2] == _status.event.choice) return 2;
                            return Math.random();
                        })
                        .set('choice', choice)
                        .set('filterButton', function (button) {
                            return _status.event.player.hasUseTarget(button.link[2]);
                        });
                    if (links && links[0]) {
                        player.chooseUseTarget(true, links[0][2]);
                    }
                };
            }
            if (lib.card.yanjiadan_club) {
                lib.card.yanjiadan_club.content = async function (event, trigger, player) {
                    var choice = 'liutouge';
                    const {
                        result: { links },
                    } = await player
                        .chooseVCardButton('选择一张牌视为使用之', ['bingpotong', 'liutouge', 'mianlijinzhen'])
                        .set('ai', function (button) {
                            if (button.link[2] == _status.event.choice) return 2;
                            return Math.random();
                        })
                        .set('choice', choice)
                        .set('filterButton', function (button) {
                            return _status.event.player.hasUseTarget(button.link[2]);
                        });
                    if (links && links[0]) {
                        player.chooseUseTarget(true, links[0][2]);
                    }
                };
            }
            if (lib.card.yanjiadan_spade) {
                lib.card.yanjiadan_spade.content = async function (event, trigger, player) {
                    var choice = null;
                    if (player.getUseValue('longxugou', null, true) > 0) {
                        choice = 'longxugou';
                    } else if (player.getUseValue('qiankunbiao', null, true) > 0) {
                        choice = 'qiankunbiao';
                    } else if (player.getUseValue('feibiao', null, true) > 0) {
                        choice = 'qiankunbiao';
                    }
                    const {
                        result: { links },
                    } = await player
                        .chooseVCardButton('选择一张牌视为使用之', ['feibiao', 'qiankunbiao', 'longxugou'])
                        .set('ai', function (button) {
                            if (button.link[2] == _status.event.choice) return 2;
                            return Math.random();
                        })
                        .set('choice', choice)
                        .set('filterButton', function (button) {
                            return _status.event.player.hasUseTarget(button.link[2]);
                        });
                    if (links && links[0]) {
                        player.chooseUseTarget(true, links[0][2]);
                    }
                };
            }
            if (lib.card.fudichouxin) {
                lib.card.fudichouxin.content = function () {
                    'step 0';
                    player.chooseToCompare(target).set('preserve', 'win').clear = false;
                    ('step 1');
                    if (result.bool) {
                        player.gain([result.player, result.target]);
                    }
                };
            }
            if (lib.card.hstianqi_suolasi) {
                lib.card.hstianqi_suolasi.onLose = function () {
                    if (player.isDamaged()) {
                        player.recover();
                    }
                };
            }
            if (lib.card.sha.ai) {
                lib.card.sha.ai.tag = {
                    respond: 1,
                    respondShan: 1,
                    damage(card) {
                        if (card.nature == 'kami') return false;
                        return true;
                    },
                    natureDamage(card) {
                        if (game.hasNature(card, 'linked')) return 1;
                    },
                    fireDamage(card, nature) {
                        if (game.hasNature(card, 'fire')) return 1;
                    },
                    thunderDamage(card, nature) {
                        if (game.hasNature(card, 'thunder')) return 1;
                    },
                }; //杀的伤害标签
            }
            if (lib.card.zhuge) {
                lib.card.zhuge.ai = {
                    equipValue: 100,
                    order: 100,
                    basic: {
                        useful: 2,
                        value: 100,
                        order: 100,
                    },
                    tag: {
                        valueswap: 1,
                    },
                    result: {
                        target: 10, //无脑上
                    },
                }; //诸葛连弩AI修改
            }
            if (lib.card.diaobingqianjiang) {
                lib.card.diaobingqianjiang.contentAfter = function () {
                    'step 0';
                    event.dialog = get.idDialog(event.preResult);
                    if (!event.dialog) {
                        event.finish();
                        return;
                    }
                    if (_status.currentPhase)
                        var nextSeat = _status.currentPhase.next; //QQQ
                    else var nextSeat = player;
                    var att = get.attitude(player, nextSeat);
                    if (player.isUnderControl(true) && !_status.auto) {
                        event.dialog.setCaption('将任意张牌以任意顺序置于牌堆顶(先选择的在上)');
                    }
                    var next = player.chooseButton([1, event.dialog.buttons.length], event.dialog);
                    next.ai = function (button) {
                        if (att > 0) {
                            return get.value(button.link, nextSeat) - 5;
                        } else {
                            return 5 - get.value(button.link, nextSeat);
                        }
                    };
                    next.set('closeDialog', false);
                    next.set('dialogdisplay', true);
                    ('step 1');
                    if (result && result.bool && result.links && result.links.length) {
                        for (var i = 0; i < result.buttons.length; i++) {
                            event.dialog.buttons.remove(result.buttons[i]);
                        }
                        var cards = result.links.slice(0);
                        while (cards.length) {
                            ui.cardPile.insertBefore(cards.pop(), ui.cardPile.firstChild);
                        }
                        game.log(player, `将${get.cnNumber(result.links.length)}张牌置于牌堆顶`);
                    }
                    for (var i = 0; i < event.dialog.buttons.length; i++) {
                        event.dialog.buttons[i].link.discard();
                    }
                    ('step 2');
                    var dialog = event.dialog;
                    dialog.close();
                    _status.dieClose.remove(dialog);
                    game.addVideo('cardDialog', null, event.preResult);
                };
            }
            if (lib.card.jingxiangshengshi) {
                lib.card.jingxiangshengshi.selectTarget = function () {
                    return [game.countGroup(), game.countGroup()];
                };
            }
            if (lib.card.lianjunshengyan) {
                lib.card.lianjunshengyan.selectTarget = function () {
                    return get.mode() == 'guozhan' ? [1, 1] : [-1, -1]; //QQQ
                };
            }
            if (lib.card.yonglv) {
                lib.card.yonglv.ai = {
                    order: 9,
                    equipValue: -1,
                    value(card, player) {
                        if (player.getEquips(2).includes(card)) return 0;
                        return 0.5;
                    },
                    basic: {
                        equipValue: -1,
                    },
                };
            }
            if (lib.card.fengyinzhidan) {
                lib.card.fengyinzhidan.content = function () {
                    'step 0';
                    event.num = 2;
                    var list = [];
                    event.list = list;
                    for (const i of lib.inpile) {
                        //QQQ
                        if (lib.filter.filterCard({ name: i }, target)) {
                            var info = lib.card[i];
                            if (info.type == 'trick' && !info.multitarget && !info.notarget) {
                                if (Array.isArray(info.selectTarget)) {
                                    if (info.selectTarget[0] > 0 && info.selectTarget[1] >= info.selectTarget[0]) {
                                        list.push(i);
                                    }
                                } else if (typeof info.selectTarget == 'number') {
                                    list.push(i);
                                }
                            }
                        }
                    }
                    ('step 1');
                    var list = event.list;
                    while (list.length) {
                        var card = { name: list.randomRemove() };
                        var info = get.info(card);
                        var targets = game.players.filter(function (current) {
                            return lib.filter.filterTarget(card, target, current);
                        });
                        if (targets.length) {
                            targets.sort(lib.sort.seat);
                            if (info.selectTarget == -1) {
                                target.useCard(card, targets, 'noai');
                            } else {
                                var num = info.selectTarget;
                                if (Array.isArray(num)) {
                                    if (targets.length < num[0]) continue;
                                    num = num[0] + Math.floor(Math.random() * (num[1] - num[0] + 1));
                                } else {
                                    if (targets.length < num) continue;
                                }
                                target.useCard(card, targets.randomGets(num), 'noai');
                            }
                            if (--event.num > 0) {
                                event.redo();
                            }
                            break;
                        }
                    }
                };
            }
            if (lib.card.hsfashu_buwendingyibian) {
                lib.card.hsfashu_buwendingyibian.enable = function (card, player) {
                    return get.cardCount('hsfashu_buwendingyibian', player) < Math.min(player.hp, 5);
                };
            } //防止高体力值无限用不稳定异变
            if (lib.card.mtg_shuimomuxue) {
                lib.card.mtg_shuimomuxue.content = function () {
                    'step 0';
                    game.changeLand('mtg_shuimomuxue', player);
                    if (player.countDiscardableCards(player, 'he')) {
                        player.chooseToDiscard('是否弃置一张牌并摸两张牌？', 'he').set('ai', function (card) {
                            return 8 - get.value(card);
                        });
                    } else {
                        event.finish();
                    }
                    ('step 1');
                    if (result.bool) {
                        player.draw(2);
                    }
                };
            }
            if (lib.card.jiguanyuan) {
                lib.card.jiguanyuan.content = function () {
                    'step 0';
                    if (player.countCards('he')) {
                        player.chooseCard(true, 'he').set('prompt2', '你将' + get.translation(cards) + '和选择牌置于' + get.translation(target) + '的武将牌上,摸一张牌;' + get.translation(target) + '于下一结束阶段获得武将牌上的牌');
                    } else {
                        event.finish();
                    }
                    ('step 1');
                    player.$throw(result.cards);
                    player.lose(result.cards, ui.special);
                    if (cards[0]) {
                        ui.special.appendChild(cards[0]);
                        event.togive = [cards[0], result.cards[0]];
                    } else {
                        event.togive = result.cards;
                    } //虚拟牌修复
                    ('step 2');
                    // target.gain(event.togive).delay=false;
                    target.$gain2(event.togive);
                    target.storage.jiguanyuan = event.togive;
                    target.addSkill('jiguanyuan');
                    game.log(target, '从', player, '获得了', event.togive);
                    player.draw();
                };
            }
            if (lib.card.gubuzifeng) {
                lib.card.gubuzifeng.ai = {
                    order: 12,
                    result: {
                        target(player, target) {
                            var skills = target.getSkills(null, false).filter((q) => {
                                return !lib.skill[q].charlotte && !Object.keys(target.disabledSkills).includes(q);
                            });
                            return -skills.length;
                        },
                    },
                };
            }
        };
        qianceng();
        //————————————————————————————————————————————————————————————————————————————————————————————————————深层检测
        const shenceng = function () {
            if (QQQ.DEEP('lib.card.linghunzhihuo.ai')) {
                lib.card.linghunzhihuo.ai.result = {
                    player: -1,
                    target: -2,
                };
            }
            if (QQQ.DEEP('lib.card.tuixinzhifu.ai')) {
                lib.card.tuixinzhifu.ai.result = {
                    target: -1,
                };
            }
            if (QQQ.DEEP('lib.card.ziyangdan.ai')) {
                lib.card.ziyangdan.ai.result = {
                    target: 3,
                };
            }
            if (QQQ.DEEP('lib.card.shandianjian.ai')) {
                lib.card.shandianjian.ai.result = {
                    target: -1,
                };
            }
            if (QQQ.DEEP('lib.card.bingpotong.ai')) {
                lib.card.bingpotong.ai.result = {
                    target: -1,
                };
            }
            if (QQQ.DEEP('lib.card.wangmeizhike.ai')) {
                lib.card.wangmeizhike.ai.result = {
                    target: 2,
                };
            }
            if (QQQ.DEEP('lib.card.diaobingqianjiang.ai')) {
                lib.card.diaobingqianjiang.ai.result = {
                    player: 1,
                    target: 0.3,
                };
            }
            if (QQQ.DEEP('lib.card.dujian.ai')) {
                lib.card.dujian.ai.result = {
                    target: -1,
                };
            }
            if (QQQ.DEEP('lib.card.shunshou.ai.basic')) {
                lib.card.shunshou.ai.basic.value = function (card, player) {
                    let max = 0;
                    game.countPlayer((cur) => {
                        if (cur != player) {
                            //QQQ
                            max = Math.max(max, lib.card.shunshou.ai.result.target(player, cur) * get.attitude(player, cur));
                        }
                    });
                    if (max <= 0) return 2;
                    return 0.53 * max;
                };
                lib.card.shunshou.ai.result = {
                    player(player, target) {
                        const hs = target.getGainableCards(player, 'h');
                        const es = target.getGainableCards(player, 'e');
                        const js = target.getGainableCards(player, 'j');
                        const att = get.attitude(player, target);
                        if (att < 0) {
                            if (
                                !hs.length &&
                                !es.some((card) => {
                                    return get.type(card) == 'equip' && get.value(card, target) > 0 && card != target.getEquip('jinhe');
                                }) &&
                                !js.some((card) => {
                                    var cardj = card.viewAs ? { name: card.viewAs } : card;
                                    if (cardj.name == 'xumou_jsrg') return true;
                                    return get.effect(target, cardj, target, player) < 0;
                                })
                            )
                                return 0;
                        } else if (att > 1) {
                            return es.some((card) => {
                                return get.type(card) == 'equip' && get.value(card, target) <= 0;
                            }) ||
                                js.some((card) => {
                                    var cardj = card.viewAs ? { name: card.viewAs } : card;
                                    if (cardj.name == 'xumou_jsrg') return false;
                                    return get.effect(target, cardj, target, player) < 0;
                                })
                                ? 1.5
                                : 0;
                        }
                        return 1;
                    },
                    target(player, target) {
                        const hs = target.getGainableCards(player, 'h');
                        const es = target.getGainableCards(player, 'e');
                        const js = target.getGainableCards(player, 'j');

                        if (get.attitude(player, target) <= 0) {
                            if (hs.length > 0) return -1.5;
                            return es.some((card) => {
                                return get.type(card) == 'equip' && get.value(card, target) > 0 && card != target.getEquip('jinhe');
                            }) ||
                                js.some((card) => {
                                    var cardj = card.viewAs ? { name: card.viewAs } : card;
                                    if (cardj.name == 'xumou_jsrg') return true;
                                    return get.effect(target, cardj, target, player) < 0;
                                })
                                ? -1.5
                                : 1.5;
                        }
                        return es.some((card) => {
                            return get.type(card) == 'equip' && get.value(card, target) <= 0;
                        }) ||
                            js.some((card) => {
                                var cardj = card.viewAs ? { name: card.viewAs } : card;
                                if (cardj.name == 'xumou_jsrg') return false;
                                return get.effect(target, cardj, target, player) < 0;
                            })
                            ? 1.5
                            : -1.5;
                    },
                };
            }
            if (QQQ.DEEP('lib.card.guohe.ai.basic')) {
                lib.card.guohe.ai.basic.value = function (card, player) {
                    let max = 0;
                    game.countPlayer((cur) => {
                        if (cur != player) {
                            max = Math.max(max, lib.card.guohe.ai.result.target(player, cur) * get.attitude(player, cur));
                        } //QQQ
                    });
                    if (max <= 0) return 5;
                    return 0.42 * max;
                };
                lib.card.guohe.ai.result = {
                    target(player, target) {
                        const att = get.attitude(player, target);
                        const hs = target.getDiscardableCards(player, 'h');
                        const es = target.getDiscardableCards(player, 'e');
                        const js = target.getDiscardableCards(player, 'j');
                        if (!hs.length && !es.length && !js.length) return 0;
                        if (att > 0) {
                            if (
                                js.some((card) => {
                                    const cardj = card.viewAs ? { name: card.viewAs } : card;
                                    if (cardj.name == 'xumou_jsrg') return false;
                                    return get.effect(target, cardj, target, player) < 0;
                                })
                            )
                                return 3;
                            if (target.isDamaged() && es.some((card) => card.name == 'baiyin') && get.recoverEffect(target, player, player) > 0) {
                                if (target.hp == 1 && !target.hujia) return 1.6;
                            }
                            if (
                                es.some((card) => {
                                    return get.type(card) == 'equip' && get.value(card, target) < 0;
                                }) //AAA
                            )
                                return 1;
                            return -1.5;
                        } else {
                            const noh = hs.length == 0 || target.hasSkillTag('noh');
                            const noe = es.length == 0 || target.hasSkillTag('noe');
                            const noe2 =
                                noe ||
                                !es.some((card) => {
                                    return get.type(card) == 'equip' && get.value(card, target) > 0;
                                });
                            const noj =
                                js.length == 0 ||
                                !js.some((card) => {
                                    const cardj = card.viewAs ? { name: card.viewAs } : card;
                                    if (cardj.name == 'xumou_jsrg') return true;
                                    return get.effect(target, cardj, target, player) < 0;
                                });
                            if (noh && noe2 && noj) return 1.5;
                            return -1.5;
                        }
                    },
                };
            }
            if (QQQ.DEEP('lib.card.xujiu.ai')) {
                lib.card.xujiu.ai.result = {
                    target(player, target) {
                        return -player.countCards('hs', (card) => get.tag(card, 'damage') && player.canUse(card, target, true, true));
                    },
                };
            }
            if (QQQ.DEEP('lib.card.sha.ai.result')) {
                lib.card.sha.ai.result.target = function (player, target, card, isLink) {
                    let eff = -1.5,
                        odds = 1.35,
                        num = 1;
                    if (card.nature) {
                        odds += 0.5;
                        if (card.nature == 'kami') odds += 0.5;
                    }
                    if (isLink) {
                        let cache = _status.event.getTempCache('sha_result', 'eff');
                        if (typeof cache !== 'object' || cache.card !== get.translation(card)) {
                            return eff;
                        }
                        if (cache.odds < 1.35 && cache.bool) {
                            return 1.35 * cache.eff;
                        }
                        return cache.odds * cache.eff;
                    }
                    if (target) {
                        //QQQ
                        if (player.hasSkill('jiu') || player.hasSkillTag('damageBonus', true, { target: target, card: card })) {
                            if (target.hasSkillTag('filterDamage', null, { player: player, card: card, jiu: true })) {
                                eff = -0.5;
                            } else {
                                num = 2;
                                if (get.attitude(player, target) > 0) eff = -7;
                                else eff = -4;
                            }
                        }
                        if (!player.hasSkillTag('directHit_ai', true, { target: target, card: card }, true)) {
                            odds -= target.countCards('h', 'shan') ? 0.7 : 0; //QQQ
                        }
                        _status.event.putTempCache('sha_result', 'eff', {
                            bool: target.hp > num && get.attitude(player, target) > 0,
                            card: get.translation(card),
                            eff: eff,
                            odds: odds,
                        });
                    }
                    return odds * eff;
                }; //属性杀提高价值
                lib.card.sha.ai.result.target = () => -5;
            }
            if (QQQ.DEEP('lib.card.nanman.ai')) {
                lib.card.nanman.ai.result = {
                    target_use() {
                        return -1.5;
                    },
                    target: -1.5,
                    player(player) {
                        if (
                            game.countPlayer(function (Q) {
                                return Q != player && Q.isFriendsOf(player);
                            }) <
                            game.countPlayer(function (Q) {
                                return Q.isEnemiesOf(player);
                            })
                        ) {
                            return 0.5;
                        }
                        if (
                            game.countPlayer(function (Q) {
                                return Q != player && Q.isFriendsOf(player);
                            }) >=
                            game.countPlayer(function (Q) {
                                return Q.isEnemiesOf(player);
                            })
                        ) {
                            return 0;
                        }
                    },
                }; //南蛮AI修改
            }
            if (QQQ.DEEP('lib.card.wanjian.ai')) {
                lib.card.wanjian.ai.result = {
                    target_use() {
                        return -1.5;
                    },
                    target: -1.5,
                    player(player) {
                        if (
                            game.countPlayer(function (Q) {
                                return Q != player && Q.isFriendsOf(player);
                            }) <
                            game.countPlayer(function (Q) {
                                return Q.isEnemiesOf(player);
                            })
                        ) {
                            return 0.5;
                        }
                        if (
                            game.countPlayer(function (Q) {
                                return Q != player && Q.isFriendsOf(player);
                            }) >=
                            game.countPlayer(function (Q) {
                                return Q.isEnemiesOf(player);
                            })
                        ) {
                            return 0;
                        }
                    },
                }; //万箭AI修改
            }
            if (QQQ.DEEP('lib.card.juedou.ai')) {
                lib.card.juedou.ai.result = {
                    target(player, target, card) {
                        if (
                            player.hasSkillTag(
                                'directHit_ai',
                                true,
                                {
                                    target: target,
                                    card: card,
                                },
                                true
                            )
                        )
                            return -2;
                        if (target.countCards('h', { name: 'sha' }) <= player.countCards('h', { name: 'sha' })) return -2;
                        return -0.1;
                    },
                    player(player, target, card) {
                        if (
                            player.hasSkillTag(
                                'directHit_ai',
                                true,
                                {
                                    target: target,
                                    card: card,
                                },
                                true
                            )
                        )
                            return 0;
                        if (target.countCards('h', { name: 'sha' }) <= player.countCards('h', { name: 'sha' })) return -0.1;
                        return -2;
                    },
                }; //决斗AI修改
            }
            if (QQQ.DEEP('lib.card.tiesuo.ai')) {
                lib.card.tiesuo.ai.result = {
                    target(player, target) {
                        if (target.hasSkillTag('link')) return -0.1;
                        let curs = game.players.filter((current) => {
                            if (current.hasSkillTag('nodamage')) return false;
                            return !current.hasSkillTag('nofire') || !current.hasSkillTag('nothunder');
                        });
                        if (curs.length < 2) return -0.1;
                        let f = target.hasSkillTag('nofire'),
                            t = target.hasSkillTag('nothunder'),
                            res = 0.9;
                        if ((f && t) || target.hasSkillTag('nodamage')) return -0.1;
                        if (f || t) res = 0.45;
                        if (!f && target.getEquip('tengjia')) res *= 2;
                        if (!target.isLinked()) res = -res;
                        if (ui.selected.targets.length) return res;
                        let fs = 0,
                            es = 0,
                            att = get.attitude(player, target),
                            linkf = false,
                            alink = true;
                        curs.forEach((i) => {
                            let atti = get.attitude(player, i);
                            if (atti > 0) {
                                fs++;
                                if (i.isLinked()) linkf = true;
                            } else if (atti < 0) {
                                es++;
                                if (!i.isLinked()) alink = false;
                            }
                        });
                        if (es < 2 && !alink) {
                            if (att <= 0 || (att > 0 && linkf && fs < 2)) return -0.1;
                        }
                        return res;
                    },
                };
            }
            if (QQQ.DEEP('lib.card.taoyuan.ai')) {
                lib.card.taoyuan.ai.result = {
                    target(player, target) {
                        return target.hp < target.maxHp ? 2 : 0.1;
                    },
                };
            }
            if (QQQ.DEEP('lib.card.jiejia.ai')) {
                lib.card.jiejia.ai.result = {
                    target(player, target) {
                        var e5 = target.getEquip('muniu');
                        if (e5 && e5.name == 'muniu' && e5.cards && e5.cards.length > 1) return -1;
                        if (
                            target.countCards('e', function (card) {
                                return get.value(card, target) <= 0;
                            }) ||
                            target.hasSkillTag('noe')
                        )
                            return 1;
                        return -0.1;
                    },
                };
            }
            if (QQQ.DEEP('lib.card.dongzhuxianji.ai')) {
                lib.card.dongzhuxianji.ai.order = 98; //洞烛先机AI修改
            }
            if (QQQ.DEEP('lib.card.yuanjiao.ai')) {
                lib.card.yuanjiao.ai.order = 98; //远交近攻AI修改
            }
            if (QQQ.DEEP('lib.card.wuzhong.ai')) {
                lib.card.wuzhong.ai.order = 94; //无中AI修改
            }
            if (QQQ.DEEP('lib.card.zhujinqiyuan.ai')) {
                lib.card.zhujinqiyuan.ai.order = 92; //逐近弃远AI修改
            }
            if (QQQ.DEEP('lib.card.shunshou.ai')) {
                lib.card.shunshou.ai.order = 92; //顺手牵羊AI修改
            }
            if (QQQ.DEEP('lib.card.yiyi.ai.result')) {
                lib.card.yiyi.ai.result.target = function (player, target) {
                    var hs = target.getCards('h');
                    if (hs.length <= 1) {
                        if (target == player && (hs.length == 0 || hs[0].name == 'yiyi')) {
                            return 0;
                        }
                        return 0.3;
                    }
                    return Math.min(Math.pow(target.countCards('he'), 1 / 4), 1.9);
                }; //以逸待劳价值降低
            }
            if (QQQ.DEEP('lib.card.wangmeizhike.ai')) {
                lib.card.wangmeizhike.ai.order = function () {
                    let player = _status.event.player,
                        nan = player.hasCard((card) => {
                            return card.name === 'nanman';
                        }, 'hs'),
                        wan = player.hasCard((card) => {
                            return card.name === 'wanjian';
                        }, 'hs'),
                        aoe = 0,
                        max = 0;
                    game.countPlayer((current) => {
                        if (get.attitude(player, current) <= 0) return false;
                        let hp = current.isMinHp(),
                            hc = current.isMinHandcard();
                        if ((nan || wan) && (hp || hc)) aoe = 1;
                        if (hp && hc && max !== 1) max = current === player ? 1 : -1;
                    });
                    if (aoe) {
                        if (nan) aoe = Math.max(aoe, get.order({ name: 'nanman' }));
                        if (wan) aoe = Math.max(aoe, get.order({ name: 'wanjian' }));
                        return aoe + 0.2;
                    }
                    if (max) return 5.8;
                    if (player.isDamaged() && player.isMinHp() && player.countCards('hs', 'tao')) return get.order({ name: 'tao' }) + 0.2;
                    return 0.5;
                };
            }
            if (QQQ.DEEP('lib.card.boss_mengpohuihun.ai')) {
                lib.card.boss_mengpohuihun.ai.result = {
                    player(player, target) {
                        if (player == game.boss) {
                            return -2;
                        } else {
                            for (const npc of game.players) {
                                for (const i in npc.disabledSkills) {
                                    if (npc.disabledSkills[i].includes('boss_wanghun')) {
                                        return 5;
                                    }
                                }
                            }
                            return 0;
                        }
                    },
                };
            }
            if (QQQ.DEEP('lib.card.wy_xiaolicangdao.ai')) {
                lib.card.wy_xiaolicangdao.ai.result = {
                    target(player, target) {
                        return -2 + Math.min(5, player.getDamagedHp());
                    },
                };
            } //本体笑里藏刀价值过高
            if (QQQ.DEEP('lib.card.baiyin.ai')) {
                lib.card.baiyin.ai.basic = {
                    equipValue: 5,
                    useful(card, i) {
                        let player = get.event().player,
                            num;
                        if (player.isDamaged() && player.hp < 2 && get.recoverEffect(player, player, player) > 0) return -10;
                        num = player.hasSkillTag(
                            'filterDamage',
                            null,
                            {
                                card: new lib.element.VCard('sha'),
                                jiu: true,
                            },
                            true
                        )
                            ? 0.6
                            : 1.2;
                        if (player.canAddJudge({ name: 'shandian' }) && get.effect(player, { name: 'shandian' }, player, player) < 0 && !player.hasSkillTag('rejudge')) {
                            if (game.hasPlayer((cur) => cur.hasJudge('shandian'))) num += 2;
                            else num++;
                        }
                        num += game.countPlayer((cur) => {
                            if (get.attitude(cur, player) <= 0) return cur.hasSkillTag('damageBonus');
                        });
                        if (player.isDamaged()) num /= player.getDamagedHp();
                        return num;
                    },
                };
            }
        };
        shenceng();
    }; //卡牌AI修改
    card();
    //—————————————————————————————————————————————————————————————————————————————武将技能AI修改
    const wujiiang = function () {
        //————————————————————————————————————————————————————————————————————————————————————————————————————直接替换
        const zhijie = function () {
            lib.skill.ayato_zonghuan = {
                enable: 'phaseUse',
                usable: 1,
                filterTarget(card, player, target) {
                    return target != player && target.countCards('h') > 0;
                },
                content() {
                    'step 0';
                    player.chooseButton(['请选择' + get.translation(target) + '的一张手牌', target.getCards('h')], true).set('ai', get.buttonValue);
                    ('step 1');
                    if (result.bool) {
                        var card = result.links[0];
                        event.card = card;
                        if (!lib.filter.cardEnabled(card, target)) event._result = { bool: false };
                        else {
                            var targets = game.players.slice(0);
                            var info = get.info(card);
                            var range;
                            if (!info.notarget) {
                                var select = get.copy(info.selectTarget);
                                if (select == undefined) {
                                    range = [1, 1];
                                } else if (typeof select == 'number') range = [select, select];
                                else if (get.itemtype(select) == 'select') range = select;
                                else if (typeof select == 'function') range = select(card, player);
                                game.checkMod(card, target, range, 'selectTarget', target);
                            }
                            if (info.notarget || range[1] == -1) {
                                if (range && range[1] == -1) {
                                    //QQQ
                                    for (var i = 0; i < targets.length; i++) {
                                        if (!target.canUse(card, targets[i])) {
                                            targets.splice(i--, 1);
                                        }
                                    }
                                    if (targets.length) {
                                        event.targets2 = targets;
                                    } else {
                                        event.finish();
                                        return;
                                    }
                                } else event.targets2 = [];
                                var next = player.chooseBool();
                                next.set('prompt', event.prompt || '是否令' + get.translation(target) + (event.targets2.length ? '对' : '') + get.translation(event.targets2) + '使用' + get.translation(card) + '?');
                                next.set('prompt2', '或点「取消」,令其将此牌置入弃牌堆');
                                next.ai = function () {
                                    var eff = 0;
                                    for (var i = 0; i < event.targets2.length; i++) {
                                        eff += get.effect(event.targets2[i], card, target, player);
                                    }
                                    return eff > 0;
                                };
                            } else {
                                var next = player.chooseTarget();
                                next.set('_get_card', card);
                                next.set('source', target);
                                next.set('filterTarget', function (card, player, target) {
                                    return lib.filter.filterTarget(_status.event._get_card, _status.event.source, target);
                                });
                                next.set('ai', function (target) {
                                    var evt = _status.event;
                                    return get.effect(target, evt._get_card, evt.source, evt.player);
                                });
                                next.set('selectTarget', function () {
                                    var card = get.card(),
                                        player = _status.event.source;
                                    if (card == undefined) return;
                                    var range;
                                    var select = get.copy(get.info(card).selectTarget);
                                    if (select == undefined) {
                                        if (get.info(card).filterTarget == undefined) return [0, 0];
                                        range = [1, 1];
                                    } else if (typeof select == 'number') range = [select, select];
                                    else if (get.itemtype(select) == 'select') range = select;
                                    else if (typeof select == 'function') range = select(card, player);
                                    game.checkMod(card, player, range, 'selectTarget', player);
                                    return range;
                                });
                                next.set('prompt', event.prompt || '选择' + get.translation(target) + '使用' + get.translation(card) + '的目标');
                                next.set('prompt2', '或点「取消」令其将此牌置入弃牌堆');
                            }
                        }
                    } else event.finish();
                    ('step 2');
                    if (result.bool) {
                        target.useCard(card, event.targets2 || result.targets, false, 'noai');
                        player.draw();
                    } else {
                        target.lose(card, ui.discardPile);
                        target.$throw(card);
                        game.log(target, '将', card, '置入了弃牌堆');
                    }
                },
                ai: {
                    order: 10,
                    result: {
                        target: -1,
                    },
                },
            };
            lib.skill.zhendu = {
                audio: 2,
                trigger: {
                    global: 'phaseUseBegin',
                },
                filter(event, player) {
                    return event.player.isIn() && player.countCards('h') > 0 && event.player.hasUseTarget({ name: 'jiu' }, null, true);
                },
                forced: true,
                preHidden: true,
                content() {
                    'step 0';
                    var nono = Math.abs(get.attitude(player, trigger.player)) < 3;
                    if (player == trigger.player || get.damageEffect(trigger.player, player, player) <= 0 || !trigger.player.hasUseTarget({ name: 'jiu' }, null, true)) {
                        nono = true;
                    } else if (trigger.player.hp > 2) {
                        nono = true;
                    } else if (trigger.player.hp > 1 && player.countCards('h') < 3 && trigger.player.canUse('sha', player, true, true) && !player.countCards('h', 'shan') && trigger.player.countCards('h') >= 3) {
                        nono = true;
                    }
                    var next = player.chooseToDiscard(get.prompt2('zhendu', trigger.player));
                    next.set('ai', function (card) {
                        var Q = player;
                        if (Q.hasSkill('olddanshou') && trigger.player.isEnemiesOf(Q)) return 20 - get.useful(card);
                        if (_status.event.nono) return -1;
                        return 7 - get.useful(card);
                    });
                    next.set('nono', nono);
                    next.setHiddenSkill('zhendu');
                    ('step 1');
                    if (result.bool) {
                        trigger.player.chooseUseTarget({ name: 'jiu' }, true, 'noTargetDelay', 'nodelayx');
                    } else {
                        event.finish();
                    }
                    ('step 2');
                    if (result.bool && trigger.player != player) trigger.player.damage();
                },
                ai: {
                    threaten: 2,
                    expose: 0.3,
                },
            }; //鸩毒AI
            lib.skill.dcluochong = {
                audio: 2,
                trigger: {
                    global: 'roundStart',
                },
                filter(event, player) {
                    return game.hasPlayer((current) => current.countDiscardableCards(player, 'hej') > 0);
                },
                forced: true,
                async content(event, trigger, player) {
                    const Q = [];
                    let num = 4;
                    while (num > 0) {
                        const result = await player
                            .chooseTarget(get.prompt('dcluochong'), `弃置任意名角色区域内的4张牌`, (card, player, target) => {
                                return target.hasCard((T) => {
                                    const discarded = _status.event.Q.find((item) => item[0] == target);
                                    if (discarded && discarded[1].includes(T)) return false;
                                    return lib.filter.canBeDiscarded(T, player, target, 'dcluochong');
                                }, 'hej');
                            })
                            .set('ai', (target) => {
                                const player = _status.event.player,
                                    discarded = _status.event.Q.find((item) => item[0] == target);
                                if (target == player && ui.cardPile.childNodes.length > 80 && player.hasSkill('dcaichen') && !discarded) return 20;
                                if (discarded && discarded[1].length >= target.countCards('he')) return 0;
                                if (discarded && discarded[1].length > 1 && player.getEnemies().length >= 2) return 0;
                                return get.effect(target, { name: 'guohe' }, player, player);
                            })
                            .set('Q', Q)
                            .forResult();
                        if (result.bool) {
                            const target = result.targets[0];
                            const cards = await player
                                .choosePlayerCard(target, true, 'hej', [1, num], `选择弃置${get.translation(target)}区域内的牌`)
                                .set('filterButton', (button) => {
                                    const card = button.link,
                                        target = _status.event.target,
                                        player = get.player();
                                    const discarded = _status.event.Q.find((item) => item[0] == target);
                                    if (discarded && discarded[1].includes(card)) return false;
                                    return lib.filter.canBeDiscarded(card, player, target, 'dcluochong');
                                })
                                .set('Q', Q)
                                .set('ai', (button) => {
                                    if (ui.selected.buttons.length) return false;
                                    var val = get.buttonValue(button, _status.event.target);
                                    if (get.attitude(_status.event.player, _status.event.target) > 0) return -val;
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
                    if (Q.length) {
                        lib.tempSortSeat = trigger.player;
                        Q.sort((a, b) => {
                            return lib.sort.seat(a[0], b[0]);
                        });
                        delete lib.tempSortSeat;
                        if (Q[0].length == 1) {
                            Q[0][0].discard(Q[0][1]);
                        } else {
                            game.loseAsync({
                                lose_list: Q,
                                discarder: player,
                            }).setContent('discardMultiple');
                        }
                    }
                },
                ai: {
                    threaten: 2.5,
                    effect: {
                        target(card, player, target, current) {
                            if (get.type(card) == 'delay' && current < 0) {
                                var current = _status.currentPhase;
                                if (current && current.seatNum > target.seatNum) return 'zerotarget';
                            }
                        },
                    },
                },
            }; //落宠AI
            lib.skill.jdsbguose = {
                audio: 'sbguose',
                inherit: 'sbguose',
                usable: 1,
                filterTarget(card, player, target) {
                    if (!ui.selected.cards.length) {
                        if (!target.hasJudge('lebu')) return false;
                        return game.hasPlayer((current) => current != target && current.canAddJudge({ name: 'lebu' }));
                    }
                    if (player == target) return false;
                    return player.canUse({ name: 'lebu' }, target, true, true);
                },
                async content(event, trigger, player) {
                    const target = event.targets[0];
                    if (target.hasJudge('lebu')) {
                        await player
                            .moveCard(true, (card) => (card.viewAs || card.name) == 'lebu')
                            .set('sourceTargets', [target])
                            .set(
                                'aimTargets',
                                game.players.filter((current) => current != target && current.canAddJudge({ name: 'lebu' }))
                            )
                            .set('prompt', `移动${get.translation(target)}的一张【乐不思蜀】`);
                    } else {
                        const next = player.useCard({ name: 'lebu' }, target, event.cards);
                        next.audio = false;
                        await next;
                    }
                },
            };
            lib.skill.dchuace = {
                mod: {
                    aiValue(player, card, num) {
                        if (get.subtype(card) == 'equip5') return 0;
                    },
                    aiUseful(player, card, num) {
                        if (get.subtype(card) == 'equip5') return 0;
                    },
                    aiOrder(player, card, num) {
                        if (get.subtype(card) == 'equip5') return 0;
                    },
                },
                audio: 2,
                enable: 'phaseUse',
                usable: 1,
                filter(event, player) {
                    return event.dchuace && event.dchuace.length && player.countCards('hs') > 0;
                },
                onChooseToUse(event) {
                    if (game.online || event.dchuace) return;
                    var list = lib.inpile.filter(function (i) {
                        return get.type(i) == 'trick' && lib.filter.filterCard({ name: i }, event.player, event);
                    });
                    if (!list.length) {
                        event.set('dchuace', list);
                        return;
                    }
                    var history = _status.globalHistory;
                    var stop = false;
                    for (var i = history.length - 1; i >= 0; i--) {
                        var evt = history[i];
                        if (!stop) {
                            if (evt.isRound) stop = true;
                            continue;
                        } else {
                            for (var j of evt.useCard) list.remove(j.card.name);
                            if (evt.isRound) break;
                        }
                    }
                    event.set('dchuace', list);
                },
                chooseButton: {
                    dialog(event, player) {
                        return ui.create.dialog('画策', [event.dchuace, 'vcard'], 'hidden');
                    },
                    check(button) {
                        const num = _status.event.player.getUseValue({ name: button.link[2] }, null, true);
                        return number0(num) + 10;
                    },
                    backup(links, player) {
                        return {
                            audio: 'dchuace',
                            viewAs: { name: links[0][2] },
                            ai1: (card) => 10 - get.value(card),
                            filterCard: true,
                            position: 'hs',
                        };
                    },
                    prompt(links, player) {
                        return `将一张手牌当做【${get.translation(links[0][2])}】使用`;
                    },
                },
                ai: {
                    order(name, player) {
                        if (player.countCards('h') < 3) return 99;
                        return 2;
                    },
                    result: {
                        player: 1,
                    },
                },
                subSkill: {
                    backup: {},
                },
            }; //修复霹雳车ai
            lib.skill.suijiyingbian_skill = {
                mod: {
                    cardname(card, player) {
                        if (card.name == 'suijiyingbian' && player.storage.suijiyingbian) return player.storage.suijiyingbian;
                    },
                    cardnature(card, player) {
                        if (card.name == 'suijiyingbian' && player.storage.suijiyingbian_nature) return player.storage.suijiyingbian_nature;
                    },
                },
                trigger: {
                    player: ['useCard1', 'respond'],
                },
                silent: true,
                firstDo: true,
                filter(event, player, name) {
                    var type = get.type(event.card);
                    return (type == 'basic' || type == 'trick') && game.players.some((Q) => Q.countCards('h', { name: 'suijiyingbian' }));
                },
                content() {
                    player.storage.suijiyingbian = trigger.card.name;
                    player.storage.suijiyingbian_nature = trigger.card.nature;
                },
            };
            lib.skill.nagisa_fuxin = {
                trigger: {
                    global: ['gainAfter', 'loseEnd', 'damageEnd'],
                },
                filter(event, player) {
                    return _status.currentPhase && event.player && event.player != _status.currentPhase && !event.getParent('nagisa_fuxin', true);
                },
                check: (event, player) => get.attitude(player, event.player) - get.attitude(player, _status.currentPhase),
                async content(event, trigger, player) {
                    const { result } = await trigger.player.judge();
                    if (result.color === 'red') await trigger.player.draw();
                    else {
                        if (_status.currentPhase.countCards('h')) _status.currentPhase.chooseToDiscard('he', true);
                    }
                },
                ai: { expose: 0.2 },
            }; //唯一一个getindex选目标
            lib.skill.dcsilun = {
                mod: {
                    aiOrder(player, card, num) {
                        if (get.type(card) == 'equip') return 1;
                    },
                    aiValue(player, card, num) {
                        if (get.type(card) == 'equip') return 20;
                    },
                },
                audio: 2,
                trigger: {
                    player: ['phaseZhunbeiBegin', 'damageEnd'],
                },
                forced: true,
                content() {
                    'step 0';
                    player.draw(4);
                    event.count = 0;
                    event.equipCount = {};
                    game.countPlayer((current) => {
                        event.equipCount[current.playerid] = current.countCards('e');
                    }, true);
                    ('step 1');
                    if (!player.countCards('he')) event.finish();
                    else
                        player.chooseCard(`四论:选择一张牌(${event.count + 1}/4)`, '选择将此牌置于场上或牌堆的两端', true, 'he').set('ai', (card) => {
                            var player = _status.event.player;
                            if (get.type(card) == 'equip' && !player.getEquips(get.subtype(card)).length) return 40;
                            if (get.position(card) == 'e') return 90 - get.value(card);
                            if (['equip', 'delay'].includes(get.type(card)) && player.hasValueTarget(card)) return 20;
                            return 20 - get.value(card);
                        });
                    ('step 2');
                    if (result.bool) {
                        var card = result.cards[0];
                        event.card = card;
                        event.count++;
                        var choices = ['牌堆顶', '牌堆底'];
                        var type = get.type(card);
                        if (
                            (type == 'equip' &&
                                game.hasPlayer((current) => {
                                    return current.canEquip(card);
                                })) ||
                            (type == 'delay' &&
                                game.hasPlayer((current) => {
                                    return current.canAddJudge(card);
                                }))
                        )
                            choices.unshift('场上');
                        player
                            .chooseControl(choices)
                            .set('prompt', `请选择要将${get.translation(card)}置于的位置`)
                            .set('ai', () => {
                                return _status.event.choice;
                            })
                            .set(
                                'choice',
                                (function () {
                                    if (card.name == 'shandian' && choices.includes('场上')) return '场上';
                                    if (['equip', 'delay'].includes(get.type(card)) && player.hasValueTarget(card) && choices.includes('场上')) return '场上';
                                    if (get.type(card) == 'equip') return '牌堆顶';
                                    var val = get.value(card);
                                    var next = _status.currentPhase;
                                    if (next) {
                                        if (trigger.name == 'damage') next = next.next;
                                        if ((get.attitude(player, next) > 0 && val >= 6) || (get.attitude(player, next) < 0 && val <= 4.5)) return '牌堆顶';
                                    }
                                    return '牌堆底';
                                })()
                            );
                    }
                    ('step 3');
                    if (result.control == '场上') {
                        var type = get.type(card);
                        player
                            .chooseTarget(`将${get.translation(card)}置于一名角色的场上`, true, (card, player, target) => {
                                return _status.event.targets.includes(target);
                            })
                            .set(
                                'targets',
                                game.players.filter((current) => {
                                    if (type == 'equip') return current.canEquip(card);
                                    if (type == 'delay') return current.canAddJudge(card);
                                    return false;
                                })
                            )
                            .set('ai', (target) => {
                                var player = _status.event.player;
                                var card = _status.event.card;
                                return (
                                    get.attitude(player, target) *
                                    (get.type(card) == 'equip'
                                        ? get.value(card, target)
                                        : get.effect(
                                            target,
                                            {
                                                name: card.viewAs || card.name,
                                                cards: [card],
                                            },
                                            target,
                                            target
                                        ))
                                );
                            })
                            .set('card', card);
                    } else {
                        player.$throw(card, 1000);
                        var next = player.lose(card, ui.cardPile, 'visible');
                        if (result.control == '牌堆顶') next.insert_card = true;
                        game.log(`<span class="greentext">${get.translation(player)}将${get.translation(card)}置于了${result.control}</span>`);
                    }
                    ('step 4');
                    if (result.bool && result.targets && result.targets.length) {
                        var target = result.targets[0];
                        player.line(target);
                        player.$give(card, target, false);
                        if (get.type(card) == 'equip') {
                            target.equip(card);
                        } else {
                            target.addJudge(card);
                        }
                    }
                    ('step 5');
                    game.countPlayer((current) => {
                        var count = current.countCards('e');
                        var prevCount = numberq0(event.equipCount[current.playerid]);
                        if (count != prevCount) {
                            current.link(false);
                            current.turnOver(false);
                        }
                        event.equipCount[current.playerid] = count;
                    });
                    if (event.count < 4) event.goto(1);
                },
                ai: {
                    maixie: true,
                    effect: {
                        player_use(card, player, target) {
                            if (typeof card == 'object' && player == _status.currentPhase && player.needsToDiscard() < 1 && get.type(card) == 'equip') return 'zeroplayertarget';
                        },
                    },
                },
            }; //周不疑四论AI修改
            lib.skill.chixueqingfeng = {
                equipSkill: true,
                trigger: {
                    player: 'useCardToPlayer',
                },
                filter(event, player) {
                    return event.card.name == 'sha';
                },
                logTarget: 'target',
                forced: true,
                charlotte: true,
                _priority: -25,
                content() {
                    trigger.target.addSkill('chixueqingfeng2');
                    player.when('useCardAfter').then(() => game.players.forEach((Q) => Q.removeSkill('chixueqingfeng2')));
                },
                ai: {
                    unequip: true,
                    directHit_ai: true,
                    skillTagFilter(player, tag, arg) {
                        if (arg && arg.card && arg.card.name == 'sha') return true;
                        return false;
                    },
                },
            };
            lib.skill.g_baishouzhihu = {
                trigger: { player: 'discardEnd' },
                forced: true,
                filter(event, player) {
                    return player.countCards('h', 'baishouzhihu') > 0;
                },
                content() {
                    'step 0';
                    player.chooseTarget([1, 1], get.prompt('baishouzhihu'), function (card, player, target) {
                        if (player == target) return false;
                        return target.countCards('he') > 0;
                    }).ai = function (target) {
                        return -get.attitude(player, target);
                    };
                    ('step 1');
                    if (result.bool) {
                        player.showCards(get.translation(player) + '发动了【白兽之琥】', player.getCards('h', 'baishouzhihu'));
                        result.targets[0].randomDiscard();
                    } else {
                        event.finish();
                    }
                },
            };
            lib.skill.jsrgjuelie = {
                audio: 2,
                trigger: { player: 'useCardToPlayer' },
                filter(event, player) {
                    return player.countCards('he') && event.card.name == 'sha';
                },
                forced: true,
                content() {
                    'step 0';
                    player
                        .chooseToDiscard(get.prompt('jsrgjuelie', trigger.target), '当你使用【杀】指定一名角色为目标后,你可以弃置任意张牌,弃置其等量的牌', [1, Infinity], 'he')
                        .set('ai', (card) => {
                            if (ui.selected.cards.length >= _status.event.max) return 0;
                            if (_status.event.goon) return 4.5 - get.value(card);
                            return 0;
                        })
                        .set('max', trigger.target.countDiscardableCards(player, 'he'))
                        .set(
                            'goon',
                            get.attitude(player, trigger.target) < 0
                        )('step 1');
                    if (result.bool) {
                        var num = result.cards.length;
                        if (trigger.target.countDiscardableCards(player, 'he')) player.discardPlayerCard(`平讨:弃置${get.translation(trigger.target) + get.cnNumber(num)}张牌`, num, 'he', trigger.target, true);
                    }
                },
                shaRelated: true,
                ai: {
                    unequip: true,
                    skillTagFilter(player, tag, arg) {
                        if (!arg || !arg.name || arg.name != 'sha') return false;
                        if (!arg.target) return false;
                        var card = arg.target.getEquip(2);
                        return (
                            card &&
                            get.value(card) > 0 &&
                            player.hasCard((cardx) => {
                                return lib.filter.cardDiscardable(cardx, player, 'jsrgjuelie') && get.value(cardx) < 5;
                            })
                        );
                    },
                },
                group: 'jsrgjuelie_pojun',
                subSkill: {
                    pojun: {
                        trigger: { source: 'damageBegin1' },
                        filter(event, player) {
                            if (!player.isMinHandcard() && !player.isMinHp()) return false;
                            return event.parent.name == 'sha';
                        },
                        forced: true,
                        logTarget: 'player',
                        content() {
                            trigger.num++;
                        },
                    },
                },
            };
            lib.skill.tongwei = {
                audio: 2,
                enable: 'phaseUse',
                usable: 1,
                filter(event, player) {
                    return player.countCards('he', (card) => lib.skill.tongwei.filterCard(card, player)) > 1 && game.hasPlayer((i) => i != player);
                },
                filterTarget: lib.filter.notMe,
                filterCard: lib.filter.cardRecastable,
                selectCard: 2,
                position: 'he',
                discard: false,
                lose: false,
                delay: false,
                check(card) {
                    if (ui.selected.cards.length) {
                        return 30 - get.value(card) + card.number;
                    }
                    return 30 - get.value(card) - card.number;
                }, //QQQ
                content() {
                    'step 0';
                    player.recast(cards);
                    ('step 1');
                    var numbers = cards.map((c) => c, player.number).sort((a, b) => a - b);
                    target.when('useCard1').then(() => {
                        trigger._tongwei_checked = true;
                    });
                    target
                        .when('useCardAfter')
                        .assign({
                            numbers: numbers,
                            playerx: player,
                            mod: {
                                aiOrder(player, card, num) {
                                    var number = card.number;
                                    if (typeof number != 'number' || number <= numbers[0] || number >= numbers[1]) return num + 10;
                                },
                            },
                        })
                        .filter((event, player) => {
                            return event._tongwei_checked;
                        })
                        .then(() => {
                            var number = trigger.card.number;
                            var numbers = get.info(event.name).numbers;
                            event.playerx = get.info(event.name).playerx;
                            if (typeof number != 'number' || number <= numbers[0] || number >= numbers[1]) event.finish();
                        })
                        .then(() => {
                            //QQQ
                            var playerx = event.playerx;
                            var names = ['sha', 'guohe'].filter((name) => playerx.canUse({ name: name }, player, false));
                            if (!names.length) event.finish();
                            else if (names.length == 1) event._result = { links: [[null, null, names[0]]] };
                            else
                                playerx
                                    .chooseButton([`请选择要视为对${get.translation(player)}使用的牌`, [names, 'vcard']], true)
                                    .set('ai', (button) => button.link[2] == _status.event.choice)
                                    .set(
                                        'choice',
                                        (function () {
                                            var list = names
                                                .map((name) => {
                                                    return [name, get.effect(player, { name: name }, playerx, playerx)];
                                                })
                                                .sort((a, b) => {
                                                    return b[1] - a[1];
                                                });
                                            return list[0][0];
                                        })()
                                    );
                        })
                        .then(() => {
                            var name = result.links[0][2];
                            var card = { name: name },
                                playerx = event.playerx;
                            if (playerx.canUse(card, player, false)) playerx.useCard(card, player, 'tongwei');
                        });
                },
                ai: {
                    expose: 0.2,
                    order: 7,
                    threaten: 2.2,
                    result: {
                        target: -1,
                    },
                },
            };
            lib.skill.g_cangchizhibi = {
                trigger: { player: 'phaseBegin' },
                forced: true,
                filter(event, player) {
                    return player.countCards('h', 'cangchizhibi') > 0;
                },
                content() {
                    'step 0';
                    player.chooseTarget([1, 3], get.prompt('cangchizhibi')).ai = function (target) {
                        var att = get.attitude(player, target);
                        if (target.isLinked()) {
                            return att;
                        }
                        return -att;
                    };
                    ('step 1');
                    if (result.bool) {
                        player.showCards(get.translation(player) + '发动了【苍螭之璧】', player.getCards('h', 'cangchizhibi'));
                        //QQQ
                        for (var i = 0; i < result.targets.length; i++) {
                            result.targets[i].link();
                        }
                    }
                },
            };
            lib.skill.reshuishi = {
                audio: 2,
                enable: 'phaseUse',
                usable: 1,
                async content(event, trigger, player) {
                    var cards = [];
                    var suits = [];
                    while (true) {
                        const { result } = await player.judge('慧识', (card) => (suits.includes(card.suit) ? 2 : 1));
                        player.gainMaxHp();
                        cards.push(result.card);
                        if (suits.includes(result.card.suit)) break;
                        suits.push(result.card.suit);
                    }
                    player.gain(cards, 'gain2');
                },
                ai: {
                    order: 9,
                    result: {
                        player: 3,
                    },
                },
            };
        };
        zhijie();
        //————————————————————————————————————————————————————————————————————————————————————————————————————浅层检测
        const qianceng = function () {
            if (lib.skill.decadepojun) {
                lib.skill.decadepojun.ai = {
                    unequip: true,
                    directHit_ai: true,
                    skillTagFilter(player, tag, arg) {
                        if (arg) {
                            if (get.attitude(player, arg.target) > 0) return false;
                            if (tag == 'directHit_ai') return arg.target.hp >= Math.max(1, arg.target.countCards('h') - 1);
                            if (arg && arg.name == 'sha' && arg.target.getEquip(2)) return true;
                            return false;
                        }
                    },
                };
            }
            if (lib.skill.misuzu_nongyin) {
                lib.skill.misuzu_nongyin.ai = {
                    order: 5,
                    result: {
                        player: 1,
                    },
                };
            }
            if (lib.skill.zhucheng) {
                lib.skill.zhucheng.ai = {
                    result: {
                        target(card, player, target, current) {
                            if (card.name == 'sha' && player.storage.zhucheng && player.storage.zhucheng.length) {
                                if (player.storage.zhucheng.length >= 2) {
                                    if (!player.hasFriend() && player.countCards('he') - 2 < player.storage.zhucheng.length) return 'zeroplayertarget';
                                    return 0.1;
                                } else {
                                    var he = player.getCards('he');
                                    var sha = false;
                                    for (var i = 0; i < he.length; i++) {
                                        if (he[i] == 'sha' && !sha) {
                                            sha = true;
                                        } else {
                                            if (get.value(he[i]) <= 6) {
                                                return [1, 0, 1, -0.5];
                                            }
                                        }
                                    }
                                    return 'zeroplayertarget';
                                }
                            }
                        },
                    },
                };
            }
            if (lib.skill.zhijian) {
                lib.skill.zhijian.check = function (card) {
                    const player = _status.currentPhase;
                    if (player && player.countCards('he', { subtype: get.subtype(card) }) > 1) {
                        return 11 - get.equipValue(card);
                    }
                    return 6 - get.value(card);
                };
            }
            if (lib.skill.xinfu_falu) {
                lib.skill.xinfu_falu_none = {
                    marktext: '🃏',
                    intro: {
                        name: '虚无',
                        content: 'mark',
                    },
                }; //QQQ
                lib.skill.xinfu_zhenyi.group = ['zhenyi_spade', 'zhenyi_club', 'zhenyi_heart', 'zhenyi_none'];
                lib.skill.zhenyi_none = {
                    trigger: {
                        global: ['gainBefore'],
                    },
                    audio: 'xinfu_zhenyi',
                    sourceSkill: 'xinfu_zhenyi',
                    filter(event, player) {
                        return player.hasMark('xinfu_falu_none');
                    },
                    check(event, player) {
                        return event.player.isEnemiesOf(player);
                    },
                    prompt2(event) {
                        return '弃置「玉清🃏」标记,取消' + get.translation(event.player) + '摸牌,并对其造成一点无来源伤害';
                    },
                    logTarget: 'player',
                    content() {
                        player.removeMark('xinfu_falu_none');
                        trigger.cancel();
                        trigger.player.damage('nosource');
                    },
                };
            }
            if (lib.skill.fenji) {
                lib.skill.fenji.cost = async function (event, trigger, player) {
                    const target = event.indexedData;
                    event.result = await player
                        .chooseBool(get.prompt('fenji', target), '失去1点体力,令该角色摸两张牌')
                        .set('ai', function () {
                            if (get.attitude(player, target) <= 0) return false;
                            return 2 * get.effect(target, { name: 'draw' }, player, player) + get.effect(player, { name: 'losehp' }, player, player) > 0;
                        })
                        .forResult();
                };
            }
            if (lib.skill.tomoya_wangjin) {
                lib.skill.tomoya_wangjin.content = function () {
                    'step 0';
                    event.bool = player.inRange(trigger.player);
                    player.addTempSkill('tomoya_wangjin_' + event.bool, 'roundStart');
                    if (event.bool) {
                        trigger.player.draw();
                    } else player.draw(2);
                    ('step 1');
                    if (event.bool) {
                        if (trigger.player.hp < player.hp) player.draw();
                        else event.finish();
                    } else {
                        if (player.countDiscardableCards(trigger.player, 'h') > 0) trigger.player.discardPlayerCard(player, 'h', true);
                        else event.finish();
                    }
                    ('step 2');
                    if (event.bool) {
                        player.chooseCard('h', '是否交给' + get.translation(trigger.player) + '一张牌？');
                    } else {
                        event.finish();
                        if (player.hp >= trigger.player.hp) return;
                        var card = { name: 'sha' };
                        if (player.canUse(card, trigger.player, false)) player.useCard(card, trigger.player, false);
                    }
                    ('step 3');
                    if (result.bool) player.give(result.cards, trigger.player); //QQQ
                };
            }
            if (lib.skill.qixingbaodao) {
                lib.skill.qixingbaodao.filter = function (event, player) {
                    if (event.card && event.card.name == 'qixingbaodao') {
                        return (
                            event.cards.length > 0 &&
                            player.hasCard((card) => {
                                return !event.cards.includes(card) && lib.filter.cardDiscardable(card, player, 'qixingbaodao');
                            }, 'ej')
                        );
                    }
                };
            }
            if (lib.skill.hstianqi) {
                lib.skill.hstianqi.ai = {
                    threaten(player, target) {
                        if (target.storage.hstianqi && target.storage.hstianqi.length == 4) return 20;
                        if (target.storage.hstianqi && target.storage.hstianqi.length == 3) return 2; //QQQ
                        return 1;
                    },
                    order: 9,
                    result: {
                        player: 1,
                    },
                };
            }
            if (lib.skill.g_shencaojie) {
                lib.skill.g_shencaojie.filter = function (event, player) {
                    return event.card && get.type(event.card) == 'trick' && player.hasCard('shencaojie', 'hes');
                };
            }
            if (lib.skill.chuaili) {
                lib.skill.chuaili.content = function () {
                    if (player.storage.piaoping == true) {
                        player.changeZhuanhuanji('piaoping');
                    } else {
                        player.addMark('tuoxian', 1, false);
                        if (player.countMark('tuoxian') > 3) player.tempBanSkill('chuaili');
                    }
                };
            }
            if (lib.skill.shouna) {
                lib.skill.shouna.content = async function (event, trigger, player) {
                    const card = event.target.getCards('h').randomGet();
                    const hu = player.getEquip('lianyaohu');
                    if (card && hu) {
                        if (!hu.storage.shouna) {
                            hu.storage.shouna = [];
                        }
                        event.target.$give(card, player);
                        event.target.lose(card, ui.special);
                        if (!card._selfDestroyed) {
                            hu.storage.shouna.push(card);
                        }
                    }
                };
            }
            if (lib.skill.wufengjian_skill) {
                lib.skill.wufengjian_skill.content = function () {
                    player.chooseToDiscard(true, 'he', (card) => card.name != 'wufengjian');
                };
            }
            if (lib.skill.jishe) {
                lib.skill.jishe.ai = {
                    order: 1,
                    result: {
                        player(player) {
                            return 1;
                        },
                    },
                };
            } //极奢AI
            if (lib.skill.kurou) {
                lib.skill.kurou.ai = {
                    effect: {
                        player(card, player, target) {
                            if (card.name == 'jiu' && !target.isDying()) return [0, -1, 0, -1];
                        },
                    },
                    basic: {
                        order(item, player) {
                            if (player.hasSkill('buyi') && player.hasCard((card) => get.type(card) != 'basic', 'h')) return 96;
                            return 1;
                        },
                    },
                    result: {
                        player(player) {
                            return 1;
                        },
                    },
                };
            } //苦肉AI
            if (lib.skill.olbeige) {
                lib.skill.olbeige.check = function (event, player) {
                    let att = get.attitude(player, event.player);
                    if (event.player.hasSkill('xinleiji') || event.player.hasSkill('tiandu')) return event.player.isFriendsOf(player);
                    if (game.hasPlayer((Q) => Q.hasSkill('dctianji') && Q.isFriendsOf(player))) return true;
                    if (game.hasPlayer((Q) => Q.hasSkill('dctianji') && Q.isEnemiesOf(player))) return false;
                    if (att > 0 || event.player.isHealthy()) return true;
                    if (!event.source) return true;
                    att = get.attitude(player, event.source);
                    return att <= 0 || event.source.isTurnedOver();
                };
            } //悲歌AI
            if (lib.skill.oljiuchi) {
                lib.skill.oljiuchi.check = function (E) {
                    if (_status.event.type == 'dying') return 1;
                    if (
                        !_status.event.player.countCards('h', function (Q) {
                            return Q != E && Q.name == 'sha';
                        })
                    )
                        return -1;
                    return 8 - get.value(E);
                };
            } //酒池AI
            if (lib.skill.retieji) {
                lib.skill.retieji.mod = {
                    aiOrder(player, card, num) {
                        if (card.name == 'sha') return 30;
                    },
                };
            } //铁骑AI优化,优先出杀
            if (lib.skill.dcshoutan) {
                lib.skill.dcshoutan.ai = {
                    order: 2,
                    result: {
                        player(player) {
                            var Q = game.countPlayer((Q) => lib.skill.dcyaoyi.getZhuanhuanji(Q, true) == lib.skill.dcyaoyi.getZhuanhuanji(player, true) && Q.isEnemiesOf(player));
                            //不能对你用牌的敌人数
                            var W = game.countPlayer((Q) => lib.skill.dcyaoyi.getZhuanhuanji(Q, true) != lib.skill.dcyaoyi.getZhuanhuanji(player, true) && Q.isEnemiesOf(player));
                            //能对你用牌的敌人数
                            if (W > Q) return 1;
                            var base = 0;
                            if (ui.selected.cards.length) base = get.value(ui.selected.cards[0]);
                            var status = player.storage.dcshoutan;
                            var cards = player.getCards('hs', function (card) {
                                return !ui.selected.cards.includes(card);
                            });
                            for (var card of cards) {
                                var val1 = player.getUseValue(card, null, true);
                                player.storage.dcshoutan = !status;
                                var val2 = 0;
                                try {
                                    val2 = player.getUseValue(card, null, true);
                                } catch (e) {
                                    player.storage.dcshoutan = status;
                                }
                                player.storage.dcshoutan = status;
                                if (val2 > val1) base -= val2 - val1;
                            }
                            if (base < 0) return 1;
                            return 0;
                        },
                    },
                };
            } //手谈AI修改
            if (lib.skill.qiangxix) {
                lib.skill.qiangxix.check = function (card) {
                    if (_status.event.player.hasSkill('olxuanfeng') && get.position(card) == 'e') return 85 - get.value(card);
                    return 10 - get.value(card);
                };
            } //强袭AI修改
            if (lib.skill.olxuanfeng) {
                lib.skill.olxuanfeng.mod = {
                    aiOrder(player, card, num) {
                        if (get.type(card) == 'equip') return 80;
                    },
                    aiValue(player, card, num) {
                        if (get.type(card) == 'equip') return 80;
                    },
                };
            } //旋风AI优化,优先出装备
            if (lib.skill.xinbenxi) {
                lib.skill.xinbenxi.trigger = {
                    player: 'useCard1',
                }; //奔袭AI优化
                lib.skill.xinbenxi.content = function () {
                    'step 0';
                    var list = ['为XXX多选择一个目标', '　令XXX无视防具牌　', '　令XXX不可被抵消　', '当XXX造成伤害时摸牌'],
                        card = get.translation(trigger.card);
                    for (var i = 0; i < list.length; i++) {
                        list[i] = [i, list[i].replace(/XXX/g, card)];
                    }
                    var next = player.chooseButton(['奔袭:请选择一至两项', [list.slice(0, 2), 'tdnodes'], [list.slice(2, 4), 'tdnodes']]);
                    next.set('forced', true);
                    next.set('selectButton', [1, 2]);
                    next.set('filterButton', function (button) {
                        if (button.link == 0) {
                            return _status.event.bool1;
                        }
                        return true;
                    });
                    next.set('bool1', lib.skill.xinbenxi.filterx(trigger, player));
                    next.set('ai', function (button) {
                        var player = _status.event.player;
                        var event = _status.event.getTrigger();
                        switch (button.link) {
                            case 0: {
                                if (
                                    game.hasPlayer(function (current) {
                                        return lib.filter.targetEnabled2(event.card, player, current) && !event.targets.includes(current) && get.effect(current, event.card, player, player) > 0;
                                    })
                                )
                                    return 99;
                                return 0;
                            }
                            case 1: {
                                if (event.card.name != 'sha') return 0;
                                if (
                                    event.targets.filter(function (current) {
                                        var eff1 = get.effect(current, event.card, player, player);
                                        player._xinbenxi_ai = true;
                                        var eff2 = get.effect(current, event.card, player, player);
                                        delete player._xinbenxi_ai;
                                        return eff1 > eff2;
                                    }).length
                                )
                                    return 1.9 + Math.random();
                                return Math.random();
                            }
                            case 2: {
                                if (!get.tag(event.card, 'damage') && get.type(event.card) == 'trick' && game.hasPlayer((Q) => Q.countCards('h', { name: 'wuxie' }) > 0 && Q.isEnemiesOf(player))) return 99;
                                var num = 1.3;
                                if (
                                    event.card.name == 'sha' &&
                                    event.targets.filter(function (current) {
                                        if (current.countCards('h', { name: 'shan' }) > 0 && current.isEnemiesOf(player)) {
                                            if (current.hasSkillTag('useShan')) num = 1.9;
                                            return true;
                                        }
                                        return false;
                                    }).length
                                )
                                    return num + Math.random();
                                return 2.5 + Math.random();
                            }
                            case 3: {
                                if (get.tag(event.card, 'damage')) return 99;
                                return 0;
                            }
                        }
                    });
                    ('step 1');
                    var map = [
                        function (trigger, player, event) {
                            player
                                .chooseTarget(`请选择${get.translation(trigger.card)}的额外目标`, true, function (card, player, target) {
                                    var player = _status.event.player;
                                    if (_status.event.targets.includes(target)) return false;
                                    return lib.filter.targetEnabled2(_status.event.card, player, target);
                                })
                                .set('targets', trigger.targets)
                                .set('card', trigger.card)
                                .set('ai', function (target) {
                                    var trigger = _status.event.getTrigger();
                                    var player = _status.event.player;
                                    return get.effect(target, trigger.card, player, player);
                                });
                        },
                        function (trigger, player, event) {
                            player.storage.xinbenxi_unequip.add(trigger.card);
                        },
                        function (trigger, player, event) {
                            player.storage.xinbenxi_directHit.add(trigger.card);
                            trigger.nowuxie = true;
                            trigger.customArgs.default.directHit2 = true;
                        },
                        function (trigger, player, event) {
                            player.storage.xinbenxi_damage.add(trigger.card);
                        },
                    ];
                    for (var i = 0; i < result.links.length; i++) {
                        game.log(`<span class="greentext">${get.translation(player)}选择了【奔袭】的选项${result.links[i] + 1}</span>`);
                        map[result.links[i]](trigger, player, event);
                    }
                    if (!result.links.includes(0)) event.finish();
                    ('step 2');
                    if (result.targets) {
                        player.line(result.targets);
                        trigger.targets.addArray(result.targets);
                    }
                };
            } //奔袭AI优化
            if (lib.skill.buyi) {
                lib.skill.buyi.content = function () {
                    'step 0';
                    var check;
                    if (trigger.player.isUnderControl(true, player)) {
                        check = player.hasCard(function (card) {
                            return get.type(card) != 'basic';
                        });
                    } else {
                        check = get.attitude(player, trigger.player) > 0;
                    }
                    player
                        .choosePlayerCard(trigger.player, get.prompt('buyi', trigger.player), 'h')
                        .set('ai', function (button) {
                            if (!_status.event.check) return 0;
                            if (_status.event.target.isUnderControl(true, _status.event.player)) {
                                if (get.type(button.link) != 'basic') {
                                    return 99 - get.value(button.link);
                                }
                                return 0;
                            } else {
                                return Math.random();
                            }
                        })
                        .set('check', check)
                        .set('filterButton', function (button) {
                            if (_status.event.player == _status.event.target) {
                                return lib.filter.cardDiscardable(button.link, _status.event.player);
                            }
                            return true;
                        });
                    ('step 1');
                    if (result.bool) {
                        event.card = result.links[0];
                        player.showCards([event.card], get.translation(player) + '展示的手牌');
                    } else {
                        event.finish();
                    }
                    ('step 2');
                    if (get.type(event.card) != 'basic') {
                        trigger.player.recover();
                        trigger.player.discard(event.card);
                    }
                };
            } //适配黄盖
            if (lib.skill.dczhifou) {
                lib.skill.dczhifou.content = function* (event, map) {
                    var player = map.player,
                        cards = player.getExpansions('dclingxi');
                    var num = player.getHistory('useSkill', (evt) => evt.skill == 'dczhifou').length + 1;
                    var result = yield player
                        .chooseButton(['###' + get.prompt('dczhifou') + `###移去至少${get.cnNumber(num)}张武将牌上的<翼>`, cards], [num, cards.length])
                        .set('ai', (button) => {
                            if (!_status.event.res.bool) return 0;
                            if (_status.event.res.cards.includes(button.link)) return 1;
                            return 0;
                        })
                        .set('num', num)
                        .set(
                            'res',
                            (() => {
                                if (
                                    player.isPhaseUsing() &&
                                    player.hasCard((i) => {
                                        return player.hasValueTarget(i, null, true);
                                    }, 'h')
                                )
                                    return false;
                                let suits = [],
                                    cs = player.getExpansions('dclingxi'),
                                    cards = [],
                                    temp = num;
                                for (let i = 0; i < cs.length; i++) {
                                    if (!temp) break;
                                    let suit = cs[i].suit;
                                    if (suits.includes(suit)) {
                                        cards.push(cs.splice(i--, 1)[0]);
                                        temp--;
                                    } else suits.push(suit);
                                }
                                while (temp > 0) {
                                    cards.push(cs.pop());
                                    temp--;
                                }
                                temp = suits.length * 2 - player.countCards('h');
                                if (temp > 0 && num < 3) cs = true;
                                else cs = false;
                                return {
                                    bool: cs,
                                    cards: cards,
                                };
                            })()
                        );
                    if (result.bool) {
                        player.loseToDiscardpile(result.links);
                        var list = [],
                            choiceList = ['将一张牌称为<翼>置于你的武将牌上', '弃置两张牌', '失去1点体力'];
                        if (!player.hasSkill('dczhifou_0') && game.hasPlayer((target) => target.countCards('he'))) list.push('置入<翼>');
                        else choiceList[0] = `<span style='opacity:0.5'>${choiceList[0]}</span>`;
                        if (
                            !player.hasSkill('dczhifou_1') &&
                            game.hasPlayer((target) => {
                                return target == player ? target.countDiscardableCards(target, 'he') : target.countCards('he');
                            })
                        )
                            list.push('弃置卡牌');
                        else choiceList[1] = `<span style='opacity:0.5'>${choiceList[1]}</span>`;
                        if (!player.hasSkill('dczhifou_2')) list.push('失去体力');
                        else choiceList[2] = `<span style='opacity:0.5'>${choiceList[2]}</span>`;
                        if (!list.length) return;
                        var str = '';
                        for (const i of list) {
                            str += i;
                            str += '、';
                        }
                        str = str.slice(0, -1);
                        var result2 = yield player
                            .chooseTarget(
                                '知否:令一名角色执行以下一项',
                                str,
                                (card, player, target) => {
                                    if (!player.hasSkill('dczhifou_2')) return true;
                                    if (!player.hasSkill('dczhifou_0') && target.countCards('he')) return true;
                                    return target == player ? target.countDiscardableCards(target, 'he') : target.countCards('he');
                                },
                                true
                            )
                            .set('ai', (target) => {
                                var player = _status.event.player,
                                    list = [];
                                if (!player.hasSkill('dczhifou_0')) list.push(get.effect(target, { name: 'guohe_copy2' }, target, player) / 2);
                                if (!player.hasSkill('dczhifou_1')) list.push(get.effect(target, { name: 'guohe_copy2' }, target, player));
                                if (!player.hasSkill('dczhifou_2')) list.push(get.effect(target, { name: 'losehp' }, player, player));
                                return list.sort((a, b) => b - a)[0];
                            });
                        if (result2.bool) {
                            var target = result2.targets[0];
                            player.line(target);
                            list = list.filter((control) => {
                                if (control == '失去体力') return true;
                                if (control == '置入<翼>' && target.countCards('he')) return true;
                                return target.countDiscardableCards(target, 'he');
                            });
                            var result3;
                            if (!list.length) {
                                game.log(target, '没有可执行项');
                                return;
                            } else if (list.length == 1) result3 = { control: list[0] };
                            else
                                result3 = yield player
                                    .chooseControl(list)
                                    .set('prompt', '知否:请选择一项')
                                    .set(
                                        'choiceList',
                                        choiceList.map((str) => '令' + get.translation(target) + str)
                                    )
                                    .set('ai', () => {
                                        var player = _status.event.player;
                                        var target = _status.event.target;
                                        if (player.getExpansions('dclingxi').length < 3) return '置入<翼>';
                                        var getNum = function (control) {
                                            return [get.effect(target, { name: 'guohe_copy2' }, target, player) / 2, get.effect(target, { name: 'guohe_copy2' }, target, player), get.effect(target, { name: 'losehp' }, target, player)][['置入<翼>', '弃置卡牌', '失去体力'].indexOf(control)];
                                        };
                                        var controls = _status.event.controls.slice();
                                        return controls.sort((a, b) => getNum(b) - getNum(a))[0];
                                    })
                                    .set('target', target);
                            switch (result3.control) {
                                case '置入<翼>':
                                    player.addTempSkill('dczhifou_0');
                                    var result4 = yield target.chooseCard('he', choiceList[0], true);
                                    if (result4.bool) player.addToExpansion(result4.cards, target, 'give').gaintag.add('dclingxi');
                                    break;
                                case '弃置卡牌':
                                    player.addTempSkill('dczhifou_1');
                                    target.chooseToDiscard('he', 2, true);
                                    break;
                                case '失去体力':
                                    player.addTempSkill('dczhifou_2');
                                    target.loseHp();
                                    break;
                            }
                        }
                    }
                };
            } //知否AI修改
            if (lib.skill.dclingxi) {
                lib.skill.dclingxi.content = function* (event, map) {
                    var player = map.player,
                        num = player.maxHp;
                    var result = yield player
                        .chooseCard(get.prompt('dclingxi'), `将至多${get.cnNumber(num)}张牌称为<翼>置于武将牌上`, 'he', [1, num])
                        .set('ai', (card) => {
                            const player = _status.event.player;
                            let dis = player.needsToDiscard(0, (i, player) => {
                                return !player.canIgnoreHandcard(i) && !ui.selected.cards.includes(i);
                            });
                            if (card.name == 'shan' && !player.hasCard((Q) => !ui.selected.cards.includes(Q) && Q.name == 'shan', 'h')) return -1;
                            if (_status.event.triggerName === 'phaseUseEnd') return (dis ? 8 : 3) - get.useful(card);
                            const num = player.getUseValue(card, null, true);
                            return 20 - number0(num);
                        })
                        .set('complexCard', true)
                        .set('triggerName', event.triggername);
                    if (result.bool) {
                        player.addToExpansion(result.cards, player, 'give').gaintag.add('dclingxi');
                    }
                };
            } //灵犀AI修改
            if (lib.skill.jiebing) {
                lib.skill.jiebing.content = function () {
                    'step 0';
                    player
                        .chooseTarget('借兵:选择一名其他角色', get.skillInfoTranslation('jiebing'), true, (card, player, target) => {
                            return player != target && target != _status.event.getTrigger().source && target.countGainableCards(player, 'he');
                        })
                        .set('ai', (target) => get.effect(target, { name: 'shunshou_copy2' }, _status.event.player, _status.event.player));
                    ('step 1');
                    if (result.bool) {
                        var target = result.targets[0];
                        if (target.ai.shown > 0) player.addExpose(0.15);
                        var cards = target.getGainableCards(player, 'he').randomGets(1);
                        event.cards = cards;
                        player.gain(target, cards, 'give', 'bySelf');
                        player.showCards(cards, '借兵');
                    } else event.finish();
                    ('step 2');
                    for (var card of cards) {
                        if (get.type(card) == 'equip' && player.hasUseTarget(card, true, true) && get.owner(card) == player) {
                            player.chooseUseTarget(card, true);
                        }
                    }
                };
            } //借兵bug修改
            if (lib.skill.rewangzu) {
                lib.skill.rewangzu.cost = async function (event, trigger, player) {
                    var num = player.getFriends().length;
                    if (
                        !game.hasPlayer(function (current) {
                            return current != player && current.getFriends().length > num;
                        })
                    ) {
                        event.result = await player
                            .chooseCard('h', '弃置一张牌并令伤害-1')
                            .set('ai', function (card) {
                                return 7 - get.value(card);
                            })
                            .forResult();
                    } else {
                        event.result = await player.chooseBool('随机弃置一张牌并令伤害-1').forResult();
                    }
                };
            } //望族bug修改
            if (lib.skill.rejianxiong_old) {
                lib.skill.rejianxiong_old.cost = async function (event, trigger, player) {
                    let list = ['摸牌'];
                    if (get.itemtype(trigger.cards) == 'cards' && trigger.cards.filterInD().length) {
                        list.push('拿牌');
                    }
                    list.push('cancel2');
                    const {
                        result: { control },
                    } = await player
                        .chooseControl(list)
                        .set('prompt', get.prompt2('rejianxiong_old'))
                        .set('ai', () => {
                            const player = get.event('player'),
                                trigger = get.event().getTrigger();
                            if (get.event().controls.includes('拿牌')) {
                                const cards = trigger.cards.filterInD();
                                if (
                                    cards.reduce((sum, card) => {
                                        return sum + (card.name == 'du' ? -1 : 1);
                                    }, 0) > 1 ||
                                    player.getUseValue(cards[0]) > 6
                                )
                                    return '拿牌';
                            }
                            return '摸牌';
                        });
                    event.result = { bool: control != 'cancel2', cost_data: control };
                };
            } //奸雄bug修改
            if (lib.skill.dddzhishu) {
                lib.skill.dddzhishu.content = function* (event, map) {
                    const player = map.player;
                    let result = yield player.moveCard();
                    if (result.targets) {
                        const targets = result.targets;
                        const guohe = new lib.element.VCard({
                            name: 'guohe',
                        });
                        if (targets[0].canUse(guohe, targets[1])) targets[0].useCard(guohe, targets[1], 'noai');
                    }
                };
            }
            if (lib.skill.jinglve2) {
                lib.skill.jinglve2.filter = function (event, player) {
                    if (event.name != 'gain' && event.player != player.storage.jinglve2) return false;
                    return event.name == 'die' || (event.cards && event.cards.includes(player.storage.jinglve3) && (event.name == 'gain' || (event.position != ui.ordering && event.position != ui.discardPile)));
                };
            }
            if (lib.skill.jojiro_shunying) {
                lib.skill.jojiro_shunying.content = function () {
                    'step 0';
                    var num = player.getHistory('skipped').length;
                    event.num = num;
                    if (player.chooseToMoveChess) player.chooseToMoveChess(num, `瞬影:移动至多${get.cnNumber(num)}格或失去1点体力`);
                    ('step 1');
                    if (!result.bool) player.loseHp();
                    else player.draw(num);
                };
            }
            if (lib.skill.new_qingjian) {
                lib.skill.new_qingjian.content = function () {
                    'step 0';
                    player.chooseCardTarget({
                        position: 'he',
                        filterCard: true,
                        selectCard: [1, Infinity],
                        filterTarget(card, player, target) {
                            return player != target;
                        },
                        ai1(card) {
                            if (card.name != 'du' && _status.currentPhase && get.attitude(_status.event.player, _status.currentPhase) < 0 && _status.currentPhase.needsToDiscard()) return -1; //QQQ
                            for (var i = 0; i < ui.selected.cards.length; i++) {
                                if (get.type(ui.selected.cards[i]) == get.type(card) || (ui.selected.cards[i].name == 'du' && card.name != 'du')) return -1;
                            }
                            if (card.name == 'du') return 20;
                            return _status.event.player.countCards('h') - _status.event.player.hp;
                        },
                        ai2(target) {
                            if (_status.currentPhase && get.attitude(_status.event.player, _status.currentPhase) < 0) return -1;
                            var att = get.attitude(_status.event.player, target);
                            if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') {
                                if (target.hasSkillTag('nodu')) return 0;
                                return 1 - att;
                            }
                            if (target.countCards('h') > _status.event.player.countCards('h')) return 0;
                            return att - 4;
                        },
                        prompt: get.prompt2('new_qingjian'),
                    });
                    ('step 1');
                    if (result.bool) {
                        var target = result.targets[0];
                        var cards = result.cards;
                        var type = [];
                        for (var i = 0; i < cards.length; i++) {
                            type.add(get.type2(cards[i]));
                        }
                        player.give(cards, target);
                        var current = _status.currentPhase;
                        if (current) {
                            current.addTempSkill('qingjian_add');
                            current.addMark('qingjian_add', type.length);
                        }
                    } else player.storage.counttrigger.new_qingjian--;
                };
            }
            if (lib.skill.clandaojie) {
                lib.skill.clandaojie.content = function () {
                    'step 0';
                    var skills = player.getSkills(null, false, false).filter((skill) => {
                        var info = get.info(skill);
                        if (!info || info.charlotte || !get.is.locked(skill) || get.skillInfoTranslation(skill, player).length == 0) return false;
                        return true;
                    });
                    player
                        .chooseControl(skills, 'cancel2')
                        .set(
                            'choiceList',
                            skills.map((i) => {
                                return `<div class='skill'>【' +
                            get.translation(
                                lib.translate[i + '_ab'] || get.translation(i).slice(0, 2)
                            ) +
                            '】</div><div>' +
                            get.skillInfoTranslation(i, player) +
                            '</div>`;
                            })
                        )
                        .set('displayIndex', false)
                        .set('prompt', '蹈节:失去一个锁定技,或点<取消>失去1点体力')
                        .set('ai', () => {
                            var player = _status.event.player,
                                choices = _status.event.controls.slice().remove('cancel2');
                            var negs = choices.filter((i) => {
                                var info = get.info(i); //QQQ
                                if (!info || !info.ai) return false;
                                return info.ai.neg || info.ai.halfneg;
                            });
                            if (negs.length) return negs.randomGet();
                            if (get.effect(player, { name: 'losehp' }, player, player) >= 0) return 'cancel2';
                            if (player.hp > 3) return 'cancel2';
                            return Math.random() < 0.75 ? 'clandaojie' : choices.randomGet();
                        });
                    ('step 1');
                    if (result.control != 'cancel2') {
                        player.removeSkills(result.control);
                    } else {
                        player.loseHp();
                    }
                    ('step 2');
                    var targets = game.players.filter((current) => current == player || current.hasClan('颍川荀氏'));
                    if (targets.length == 1) event._result = { bool: true, targets: targets };
                    else
                        player
                            .chooseTarget('蹈节:将' + get.translation(trigger.cards.filterInD()) + '交给一名颍川荀氏角色', true, (card, player, target) => {
                                return target == player || target.hasClan('颍川荀氏');
                            })
                            .set('ai', (target) => get.attitude(_status.event.player, target));
                    ('step 3');
                    if (result.bool) {
                        var target = result.targets[0];
                        player.line(target, 'green');
                        target.gain(trigger.cards.filterInD(), player, 'gain2');
                    }
                };
            }
            if (lib.skill.twqiaosi) {
                lib.skill.twqiaosi.content = async function (event, trigger, player) {
                    const cards = get.info('twqiaosi').getCards(player);
                    if (cards && cards[0]) await player.gain(cards, 'gain2'); //QQQ
                    if (cards.length < player.getHp()) await player.loseHp();
                };
            }
            if (lib.skill.kiyu_rexianyu) {
                lib.skill.kiyu_rexianyu.content = async function (event, trigger, player) {
                    player.addTempSkill('kiyu_rexianyu_round', 'roundStart');
                    const tabito = event.targets[0]; //QQQ
                    tabito.storage.kiyu_rexianyu_lastrun = event.cost_data.list;
                    tabito.storage.amamiya_kiyu = player;
                    tabito.addTempSkill('kiyu_rexianyu_lastrun', {
                        player: ['phaseUseAfter'],
                        global: ['roundStart'],
                    });
                    await game.asyncDelayx();
                };
            }
            if (lib.skill.pingjian) {
                lib.skill.pingjian.init = function (player) {
                    player.addSkill('pingjian_check');
                    player.storage.pingjian_check = {};
                };
            }
            if (lib.skill.pingjian_use) {
                lib.skill.pingjian_use.init = function (player) {
                    player.addSkill('pingjian_check');
                    player.storage.pingjian_check = {};
                };
            }
            if (lib.skill.dcsilve) {
                lib.skill.dcsilve.content = function () {
                    'step 0';
                    player
                        .chooseTarget('私掠:请选择一名其他角色', '选择一名其他角色(暂时仅你可见),称为<私掠>角色,且你获得后续效果', true, (card, player, target) => target != player)
                        .set('ai', (target) => {
                            var att = get.attitude(_status.event.player, target);
                            if (att > 0) return att + 1;
                            if (att == 0) return Math.random();
                            return att;
                        })
                        .set('animate', false);
                    ('step 1');
                    if (result.bool) {
                        var target = result.targets[0];
                        player.markAuto('dcsilve', [target]);
                        player.addSkill('dcsilve_rob');
                        player.addSkill('dcsilve_revenge');
                        target.addSkill('dcsilve_target');
                        if (!target.storage.dcsilve_target) target.storage.dcsilve_target = [];
                        target.storage.dcsilve_target.push(player);
                    }
                };
            }
            if (lib.skill.dddduanbing) {
                lib.skill.dddduanbing.filter = function (event, player) {
                    return player.canAddJudge({ name: 'bingliang' }) && player.hasCard((card) => lib.skill.dddduanbing.filterCard(card, player), 'he');
                };
            }
            if (lib.skill.dczixi) {
                lib.skill.dczixi.content = async function (event, trigger, player) {
                    game.addVideo('skill', player, ['dczixi', []]);
                    const names = lib.skill.dczixi.zixiList.filter((name) => {
                        return player.countCards('h', (card) => {
                            return card.hasGaintag('dcqiqin_tag') && game.hasPlayer((target) => target.canAddJudge({ name: 'dczixi_' + name }));
                        });
                    });
                    let map = {};
                    for (const name of names) {
                        map[get.translation(name)] = name;
                    }
                    const {
                        result: { bool, links },
                    } = await player
                        .chooseButton(2, [`###${get.prompt('dczixi')}###<div class='text center'>将一张<琴>以你选择的牌名置于一名角色的判定区</div>`, player.getCards('h'), [Object.keys(map), 'tdnodes']])
                        .set('filterButton', (button) => {
                            const type = typeof button.link,
                                card = button.link;
                            if (ui.selected.buttons.length && type == typeof ui.selected.buttons[0].link) return false;
                            if (type == 'string') return true;
                            return (
                                card.hasGaintag('dcqiqin_tag') &&
                                lib.skill.dczixi.zixiList.some((name) => {
                                    return game.hasPlayer((target) => target.canAddJudge({ name: 'dczixi_' + name }));
                                })
                            );
                        })
                        .set('ai', (button) => {
                            const player = get.event('player'),
                                list = Object.keys(get.event('map'));
                            if (typeof button.link == 'string') {
                                const card = player
                                    .getCards('h', (card) => {
                                        if (get.value(card) >= 7) return false;
                                        return card.hasGaintag('dcqiqin_tag') && game.hasPlayer((target) => target.canAddJudge(card)); //QQQ
                                    })
                                    .sort((a, b) => get.value(a) - get.value(b))[0];
                                if (
                                    game.hasPlayer((current) => {
                                        return get.attitude(player, current) < 0 && lib.skill.dczixi.zixiList.some((name) => current.canAddJudge({ name: 'dczixi_' + name }));
                                    })
                                )
                                    return list.indexOf(button.link) + 1;
                                return 1 / (list.indexOf(button.link) + 1);
                            }
                            return 7 - get.value(button.link);
                        })
                        .set('map', map);
                    if (bool) {
                        const name = links.find((i) => typeof i == 'string'),
                            card = links.find((j) => j != name),
                            cardname = map[name];
                        const {
                            result: { bool, targets },
                        } = await player
                            .chooseTarget(
                                `请选择【${name}(${get.translation(card)})】置入的目标`,
                                (cardx, player, target) => {
                                    return target.canAddJudge({ name: 'dczixi_' + get.event('cardname') });
                                },
                                true
                            )
                            .set('ai', (target) => {
                                const player = get.event('player'),
                                    card = get.event('card');
                                if (
                                    game.hasPlayer((current) => {
                                        return get.attitude(player, current) < 0 && current.canAddJudge({ name: 'dczixi_' + get.event('cardname') });
                                    })
                                )
                                    return -target.countCards('j') - 1;
                                return target.countCards('j') + 1;
                            })
                            .set('card', card)
                            .set('cardname', cardname);
                        if (bool) {
                            const target = targets[0];
                            player.$give(card, target, false);
                            await game.asyncDelay(0.5);
                            target.addJudge({ name: 'dczixi_' + cardname }, [card]);
                        }
                    }
                };
            }
            if (lib.skill.wlcuorui) {
                lib.skill.wlcuorui = {
                    audio: 2,
                    trigger: { player: 'phaseUseBegin' },
                    filter(event, player) {
                        return game.hasPlayer((current) => current.isFriendsOf(player) && current.countDiscardableCards(player, 'hej') > 0);
                    },
                    async cost(event, trigger, player) {
                        event.result = await player
                            .chooseTarget(function (card, player, target) {
                                return target.isFriendsOf(player) && target.countDiscardableCards(player, 'hej') > 0;
                            }, get.prompt2('wlcuorui'))
                            .set('ai', function (target) {
                                if (
                                    target.countCards('e', function (card) {
                                        return card.name != 'tengjia' && get.value(card, target) <= 0;
                                    })
                                )
                                    return 10;
                                if (
                                    target.countCards('j', function (card) {
                                        return get.effect(target, { name: card.viewAs || card.name }, target, target) < 0;
                                    })
                                )
                                    return 10;
                                return game.countPlayer((current) => current.isEnemiesOf(player) && current.countCards('he'));
                            })
                            .forResult();
                    },
                    async content(event, trigger, player) {
                        var target = event.targets[0];
                        const { result } = await player.discardPlayerCard(target, 'hej', true).set('ai', (button) => game.countPlayer((current) => current.isEnemiesOf(player) && current.countCards('he', (card) => get.color(card) == get.color(button.link))));
                        if (result.cards && result.cards[0]) {
                            event.color = get.color(result.cards[0]);
                            var list = [];
                            if (game.hasPlayer((current) => current.isEnemiesOf(player) && current.countCards('h'))) list.push('展示手牌');
                            if (game.hasPlayer((current) => current.isEnemiesOf(player) && current.countCards('e', (card) => get.color(card) == event.color))) list.push('弃置装备');
                            if (list.length) {
                                if (list.length == 1) {
                                    const result1 = { control: list[0] };
                                    if (result1.control == '弃置装备') {
                                        var dialog = ['请选择要弃置的牌'];
                                        var list = game.players.filter((current) => current.isEnemiesOf(player) && current.countCards('e', (card) => get.color(card) == event.color));
                                        for (const i of list) {
                                            dialog.push(`<div class='text center'>${get.translation(i)}</div>`);
                                            dialog.push(
                                                i.getCards('e', function (card) {
                                                    return get.color(card) == event.color;
                                                })
                                            );
                                        }
                                        const { result: result2 } = await player
                                            .chooseButton([1, 2], true)
                                            .set('createDialog', dialog)
                                            .set('ai', (button) => get.value(button.link));
                                        var map = {};
                                        for (const i of result2.links) {
                                            if (get.color(i) != event.color) continue;
                                            var id = get.owner(i).playerid;
                                            if (!map[id]) map[id] = [];
                                            map[id].push(i);
                                        }
                                        for (var i in map) {
                                            (_status.connectMode ? lib.playerOL : game.playerMap)[i].discard(map[i], 'notBySelf').discarder = player;
                                        }
                                        event.next.sort(function (a, b) {
                                            return lib.sort.seat(a.player, b.player);
                                        });
                                    } else {
                                        var dialog = ['请选择要展示的牌'];
                                        var list = game.players.filter((current) => current.isEnemiesOf(player) && current.countCards('h'));
                                        for (const i of list) {
                                            dialog.push(`<div class='text center'>${get.translation(i)}</div>`);
                                            if (player.hasSkillTag('viewHandcard', null, i, true)) dialog.push(i.getCards('h'));
                                            else dialog.push([i.getCards('h'), 'blank']);
                                        }
                                        const { result: result2 } = await player
                                            .chooseButton([1, 2], true)
                                            .set('createDialog', dialog)
                                            .set('ai', (button) => get.color(button.link) == event.color);
                                        player.showCards(result2.links);
                                        var map = {};
                                        var map2 = {};
                                        for (const i of result2.links) {
                                            var id = get.owner(i).playerid;
                                            if (!map[id]) map[id] = [];
                                            map[id].push(i);
                                            if (get.color(i) != event.color) continue;
                                            if (!map2[id]) map2[id] = [];
                                            map2[id].push(i);
                                        }
                                        for (var i in map) {
                                            var source = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
                                            if (map2[i]) player.gain(map2[i], source, 'bySelf', 'give');
                                            player.line(source);
                                            game.log(player, '展示了', source, '的', map[i]);
                                        }
                                        event.next.sort(function (a, b) {
                                            return lib.sort.seat(a.source || a.player, b.source || b.player);
                                        });
                                    }
                                } else {
                                    const { result: result1 } = await player
                                        .chooseControl(list)
                                        .set('prompt', `挫锐:展示对手的至多两张手牌,或弃置对手装备区内至多两张${get.translation(event.color)}牌`)
                                        .set('ai', function () {
                                            if (game.countPlayer((current) => current.isEnemiesOf(player) && current.countCards('e', (card) => get.color(card) == event.color && get.value(card) > 0))) return 1;
                                            return 0;
                                        });
                                    if (result1.control == '弃置装备') {
                                        var dialog = ['请选择要弃置的牌'];
                                        var list = game.players.filter((current) => current.isEnemiesOf(player) && current.countCards('e', (card) => get.color(card) == event.color));
                                        for (const i of list) {
                                            dialog.push(`<div class='text center'>${get.translation(i)}</div>`);
                                            dialog.push(
                                                i.getCards('e', function (card) {
                                                    return get.color(card) == event.color;
                                                })
                                            );
                                        }
                                        const { result: result2 } = await player
                                            .chooseButton([1, 2], true)
                                            .set('createDialog', dialog)
                                            .set('ai', (button) => get.value(button.link));
                                        var map = {};
                                        for (const i of result2.links) {
                                            if (get.color(i) != event.color) continue;
                                            var id = get.owner(i).playerid;
                                            if (!map[id]) map[id] = [];
                                            map[id].push(i);
                                        }
                                        for (var i in map) {
                                            (_status.connectMode ? lib.playerOL : game.playerMap)[i].discard(map[i], 'notBySelf').discarder = player;
                                        }
                                        event.next.sort(function (a, b) {
                                            return lib.sort.seat(a.player, b.player);
                                        });
                                    } else {
                                        var dialog = ['请选择要展示的牌'];
                                        var list = game.players.filter((current) => current.isEnemiesOf(player) && current.countCards('h'));
                                        for (const i of list) {
                                            dialog.push(`<div class='text center'>${get.translation(i)}</div>`);
                                            if (player.hasSkillTag('viewHandcard', null, i, true)) dialog.push(i.getCards('h'));
                                            else dialog.push([i.getCards('h'), 'blank']);
                                        }
                                        const { result: result2 } = await player
                                            .chooseButton([1, 2], true)
                                            .set('createDialog', dialog)
                                            .set('ai', (button) => get.color(button.link) == event.color);
                                        player.showCards(result2.links);
                                        var map = {};
                                        var map2 = {};
                                        for (const i of result2.links) {
                                            var id = get.owner(i).playerid;
                                            if (!map[id]) map[id] = [];
                                            map[id].push(i);
                                            if (get.color(i) != event.color) continue;
                                            if (!map2[id]) map2[id] = [];
                                            map2[id].push(i);
                                        }
                                        for (var i in map) {
                                            var source = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
                                            if (map2[i]) player.gain(map2[i], source, 'bySelf', 'give');
                                            player.line(source);
                                            game.log(player, '展示了', source, '的', map[i]);
                                        }
                                        event.next.sort(function (a, b) {
                                            return lib.sort.seat(a.source || a.player, b.source || b.player);
                                        });
                                    }
                                }
                            }
                        }
                    },
                };
            }
            if (lib.skill.fenxing) {
                lib.skill.fenxing.filter = function (event, player) {
                    return Math.random() < 0.5 && [player.name1, player.name2].includes('pal_longkui');
                };
            }
            if (lib.skill.xinfu_zuilun) {
                lib.skill.xinfu_zuilun.content = function () {
                    'step 0';
                    event.num = 0;
                    event.cards = get.cards(3);
                    game.cardsGotoOrdering(cards);
                    if (
                        player.hasHistory('lose', function (evt) {
                            return evt.type == 'discard';
                        })
                    )
                        event.num++;
                    if (!player.isMinHandcard()) event.num++;
                    if (!player.getStat('damage')) event.num++;
                    ('step 1');
                    if (event.num == 0) {
                        player.gain(event.cards, 'draw');
                        event.finish();
                    } else {
                        var prompt = `罪论:将${get.cnNumber(num)}张牌置于牌堆顶`;
                        if (num < 3) prompt += '并获得其余的牌';
                        var next = player.chooseToMove(prompt, true);
                        if (num < 3) {
                            next.set('list', [['牌堆顶', cards], ['获得']]);
                            next.set('filterMove', function (from, to, moved) {
                                if (to == 1 && moved[0].length <= _status.event.num) return false;
                                return true;
                            });
                            next.set('filterOk', function (moved) {
                                return moved[0].length == _status.event.num;
                            });
                        } else {
                            next.set('list', [['牌堆顶', cards]]);
                        }
                        next.set('num', num);
                        next.set('processAI', function (list) {
                            var check = function (card) {
                                var player = _status.event.player;
                                var next = player.next;
                                var att = get.attitude(player, next);
                                var judge = next.getCards('j')[tops.length];
                                if (judge) {
                                    return get.judge(judge)(card) * att;
                                }
                                return number0(next.getUseValue(card, null, true)) * att;
                            };
                            var cards = list[0][1].slice(0),
                                tops = [];
                            while (tops.length < _status.event.num) {
                                cards.sort((a, b) => check(b) - check(a)); //QQQ
                                tops.push(cards.shift());
                            }
                            return [tops, cards];
                        });
                    }
                    ('step 2');
                    if (result.bool) {
                        var list = result.moved[0];
                        var num = list.length - 1;
                        for (var i = 0; i < list.length; i++) {
                            event.cards.remove(list[num - i]);
                            ui.cardPile.insertBefore(list[num - i], ui.cardPile.firstChild);
                        }
                    }
                    ('step 3');
                    game.updateRoundNumber();
                    if (event.cards.length) {
                        player.gain(event.cards, 'draw');
                        event.finish();
                    } else {
                        player.chooseTarget('请选择一名角色,与其一同失去1点体力', true, function (card, player, target) {
                            return target != player;
                        }).ai = function (target) {
                            return -get.attitude(_status.event.player, target);
                        };
                    }
                    ('step 4');
                    player.line(result.targets[0], 'fire');
                    player.loseHp();
                    result.targets[0].loseHp();
                };
            }
            if (lib.skill.dddlangzhi) {
                lib.skill.dddlangzhi.filter = function (event, player) {
                    return game.countPlayer((current) => player.inRange(current) && current.countCards('he'));
                };
            }
            if (lib.skill.gx_chongyingshenfu) {
                lib.skill.gx_chongyingshenfu.filter = function (event, player) {
                    if (!event.card || !event.card.name || player.getStorage('gx_chongyingshenfu_effect').includes(event.card.name)) return false;
                    if (player.hasSkillTag('unequip2')) return false;
                    if (
                        event.source &&
                        event.source.hasSkillTag('unequip', false, {
                            name: event.card.name,
                            target: player,
                            card: event.card,
                        })
                    )
                        return false;
                    return true;
                };
            }
            if (lib.skill.sbguose) {
                lib.skill.sbguose.filterCard = function (card, player) {
                    if (card.suit != 'diamond') return false;
                    if (ui.selected.cards[0]) var mod = game.checkMod(ui.selected.cards[0], player, 'unchanged', 'cardEnabled2', player);
                    if (!mod) return false;
                    return true;
                };
            }
            if (lib.skill.gongji) {
                lib.skill.gongji.check = function (card) {
                    if (get.type(card) != 'equip') return 0;
                    var player = _status.event.player;
                    if (player.countCards('he', { subtype: get.subtype(card) }) > 1) {
                        return 11 - get.equipValue(card);
                    }
                    return 6 - get.equipValue(card);
                };
            }
            if (lib.skill.dcjiexing) {
                lib.skill.dcjiexing.check = () => true;
            }
            if (lib.skill.qianxi) {
                lib.skill.qianxi.content = async function (event, trigger, player) {
                    await player.draw();
                    if (player.countCards('he')) {
                        const { result } = await player.chooseToDiscard('he', true);
                        if (result && result.cards && result.cards[0]) {
                            const { result: result1 } = await player
                                .chooseTarget(function (card, player, target) {
                                    return player != target && get.distance(player, target) <= 1;
                                }, true)
                                .set('ai', function (target) {
                                    return -get.attitude(_status.event.player, target);
                                });
                            if (result1.targets && result1.targets[0]) {
                                result1.targets[0].storage.qianxi2 = get.color(result.cards[0]);
                                result1.targets[0].addTempSkill('qianxi2');
                                player.line(result1.targets, 'green');
                                game.addVideo('storage', result1.targets[0], ['qianxi2', get.color(result.cards[0])]);
                            }
                        }
                    }
                };
            }
            if (lib.skill.lingjianduanzao) {
                lib.skill.lingjianduanzao.process = function (cards) {
                    var equip;
                    for (var i = 0; i < cards.length; i++) {
                        if (get.type(cards[i]) == 'equip') {
                            equip = cards[i];
                            cards.splice(i--, 1);
                            break;
                        }
                    }
                    if (equip) {
                        //QQQ
                        var name = equip.name;
                        var type = get.type(cards[0]);
                        var equipname = equip.name;
                        if (type == 'hslingjian') {
                            name += cards[0].name.slice(10);
                        } else {
                            name += '_' + cards[0].name;
                        }
                        if (lib.card[name]) return name;
                        lib.card[name] = get.copy(lib.card[equip.name]);
                        lib.card[name].cardimage = lib.card[name].cardimage || equip.name;
                        lib.card[name].vanish = true;
                        lib.card[name].source = [equip.name, cards[0].name];
                        if (type == 'jiqi') {
                            lib.card[name].legend = true;
                        } else {
                            lib.card[name].epic = true;
                        }
                        var dvalue = type == 'jiqi' ? 3 : 1;
                        var getValue = function (value, dvalue) {
                            if (dvalue == 1) return Math.min(10, value + dvalue);
                            value += dvalue;
                            if (value > 10) return 10 + (value - 10) / 10;
                            if (value < 9) return 8 + value / 10;
                            return value;
                        };
                        if (typeof lib.card[name].ai.equipValue == 'number') {
                            lib.card[name].ai.equipValue = getValue(lib.card[name].ai.equipValue, dvalue);
                        } else if (typeof lib.card[name].ai.equipValue == 'function') {
                            lib.card[name].ai.equipValue = function () {
                                return getValue(lib.card[equipname].ai.equipValue.apply(this, arguments), dvalue);
                            };
                        } else if (lib.card[name].ai.basic && typeof lib.card[name].ai.basic.equipValue == 'number') {
                            lib.card[name].ai.basic.equipValue = getValue(lib.card[name].ai.basic.equipValue, dvalue);
                        } else if (lib.card[name].ai.basic && typeof lib.card[name].ai.basic.equipValue == 'function') {
                            lib.card[name].ai.basic.equipValue = function () {
                                return getValue(lib.card[equipname].ai.basic.equipValue.apply(this, arguments), dvalue);
                            };
                        } else {
                            if (dvalue == 3) {
                                lib.card[name].ai.equipValue = 7;
                            } else {
                                lib.card[name].ai.equipValue = dvalue;
                            }
                        }
                        if (Array.isArray(lib.card[name].skills)) {
                            lib.card[name].skills = lib.card[name].skills.slice(0);
                        } else {
                            lib.card[name].skills = [];
                        }
                        // lib.card[name].filterTarget=function(card,player,target){
                        // 	return !target.isMin();
                        // };
                        // lib.card[name].selectTarget=1;
                        // lib.card[name].range={global:1};
                        var str = lib.translate[cards[0].name + '_duanzao'];
                        var str2 = get.translation(equip.name, 'skill');
                        lib.translate[name] = str + str2;
                        str2 = lib.translate[equip.name + '_info'] || '';
                        if (str2[str2.length - 1] == '.' || str2[str2.length - 1] == '.') {
                            str2 = str2.slice(0, str2.length - 1);
                        }
                        for (var i = 0; i < cards.length; i++) {
                            for (var j = 1; j <= 5; j++) {
                                lib.translate[cards[i].name + '_equip' + j] = lib.translate[cards[i].name + '_duanzao'];
                            }
                            var name2 = cards[i].name + '_' + get.subtype(equip);
                            if (lib.skill[name2]) {
                                lib.card[name].skills.add(name2);
                                str2 += `;${lib.translate[name2 + '_info']}`;
                            } //QQQ防止其他位置如equip6装备出错
                        }
                        lib.translate[name + '_info'] = str2;
                        try {
                            game.addVideo('newcard', null, {
                                name: name,
                                translate: lib.translate[name],
                                info: str2,
                                card: equip.name,
                                legend: type == 'jiqi',
                                epic: type == 'hslingjian',
                            });
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    return name;
                };
            }
            if (lib.skill._gifting) {
                lib.skill._gifting.usable = 5;
            }
            if (lib.skill.woxue) {
                lib.skill.woxue.filter = function (event, player) {
                    if (_status.currentPhase && _status.currentPhase != player && !_status.currentPhase.hasSkill('gw_ciguhanshuang')) {
                        return true;
                    }
                    return false;
                };
            }
            if (lib.skill.twzhian) {
                lib.skill.twzhian.content = function () {
                    'step 0';
                    var str = get.translation(trigger.cards[0]),
                        owner = get.owner(trigger.cards[0]);
                    var choiceList = [`弃置${owner ? get.translation(owner) + '区域内的' : ''}${str}`, '弃置一张手牌并获得' + str, `对${get.translation(trigger.player)}造成1点伤害`];
                    var choices = [];
                    if (owner && lib.filter.canBeDiscarded(trigger.cards[0], player, owner)) {
                        //QQQ
                        choices.push('选项一');
                    } else {
                        choiceList[0] = `<span style='opacity:0.5'>${choiceList[0]}</span>`;
                    }
                    if (
                        owner &&
                        player.hasCard(function (card) {
                            return lib.filter.cardDiscardable(card, player, 'twzhian');
                        }, 'h') &&
                        lib.filter.canBeGained(trigger.cards[0], player, owner)
                    ) {
                        choices.push('选项二');
                    } else choiceList[1] = `<span style='opacity:0.5'>${choiceList[1]}</span>`;
                    if (trigger.player.isIn()) choices.push('选项三');
                    else choiceList[2] = `<span style='opacity:0.5'>${choiceList[2]}</span>`;
                    player
                        .chooseControl(choices, 'cancel2')
                        .set('choiceList', choiceList)
                        .set('prompt', get.prompt('twzhian'))
                        .set('ai', function () {
                            var player = _status.event.player,
                                choices = _status.event.controls.slice(0);
                            var card = _status.event.getTrigger().cards[0],
                                owner = get.owner(card);
                            var getEffect = function (choice) {
                                if (choice == 'cancel2') return 0.1;
                                if (choice == '选项三') {
                                    return get.damageEffect(_status.event.getTrigger().player, player, player);
                                }
                                var result;
                                if (get.position(card) == 'j') {
                                    result =
                                        -get.effect(
                                            player,
                                            {
                                                name: card.viewAs || card.name,
                                                cards: [card],
                                            },
                                            player,
                                            player
                                        ) * get.sgn(get.attitude(player, owner));
                                } else result = -(get.value(card, owner) - 0.01) * get.sgn(get.attitude(player, owner));
                                if (choice == '选项一') return result;
                                if (
                                    player.hasCard(function (cardx) {
                                        return lib.filter.cardDiscardable(cardx, player, 'twzhian') && get.value(cardx, player) < get.value(card, player);
                                    }, 'h')
                                )
                                    return result * 1.2;
                                return 0;
                            };
                            choices.sort(function (a, b) {
                                return getEffect(b) - getEffect(a);
                            });
                            return choices[0];
                        });
                    ('step 1');
                    if (result.control != 'cancel2') {
                        var card = trigger.cards[0],
                            owner = get.owner(card);
                        switch (result.control) {
                            case '选项一':
                                owner.discard(card, 'notBySelf');
                                event.finish();
                                break;
                            case '选项二':
                                player.chooseToDiscard('h', true);
                                event.target = owner;
                                break;
                            case '选项三':
                                trigger.player.damage();
                                event.finish();
                                break;
                        }
                    } else player.storage.counttrigger.twzhian--;
                    ('step 2');
                    if (result.bool && target.getCards('ej').includes(trigger.cards[0])) player.gain(trigger.cards, target, 'give', 'bySelf');
                };
            }
            if (lib.skill.xunbao2) {
                lib.skill.xunbao2.filter = function (event, player) {
                    if (!player.storage.xunbao2) return false;
                    for (const i of player.getCards('he')) {
                        if (i.number == player.storage.xunbao2.number) return true;
                    }
                    return false;
                };
            }
            if (lib.skill.rexiahui) {
                lib.skill.rexiahui.audio = 'xiahui'; //QQQ
            }
            if (!lib.skill.yigui) {
                lib.skill.yigui = { audio: 2 };
            }
            if (!lib.skill.gzshilu) {
                lib.skill.gzshilu = { audio: 2 };
            }
            if (!lib.skill.gzxiongnve) {
                lib.skill.gzxiongnve = { audio: 2 };
            }
            if (lib.skill.liangji) {
                lib.skill.liangji.audio = 2;
            }
            if (lib.skill.hiroto_huyu_gain) {
                lib.skill.hiroto_huyu_gain.content = game.kongfunc;
            }
            if (lib.skill.spxizhan) {
                lib.skill.spxizhan.content = async function (event, trigger, player) {
                    const { result } = await player.chooseToDiscard('he', '嬉战:弃置一张牌或失去1点体力', `根据弃置的牌对${get.translation(trigger.player)}视为使用如下牌:<br>♠️️,其使用【酒】;♥️️,你使用【无中生有】<br>♣️️,对其使用【铁索连环】;♦️️:对其使用火【杀】`).set('ai', function (card) {
                        var player = _status.event.player,
                            target = _status.event.getTrigger().player;
                        var suit = card.suit,
                            list;
                        switch (suit) {
                            case 'spade':
                                list = [{ name: 'jiu' }, target, target];
                                break;
                            case 'heart':
                                list = [{ name: 'wuzhong' }, player, player];
                                break;
                            case 'club':
                                list = [{ name: 'tiesuo' }, player, target];
                                break;
                            case 'diamond':
                                list = [{ name: 'sha', nature: 'fire' }, player, target];
                                break;
                            default:
                                return 0;
                        } //QQQ
                        list[0].isCard = true;
                        var eff = 0;
                        if (list[1].canUse(list[0], list[2], false)) eff = get.effect(list[2], list[0], list[1], player);
                        if (eff >= 0 || suit == 'club') eff = Math.max(eff, 5);
                        return eff * 1.5 - get.value(card);
                    });
                    if (result.cards && result.cards[0]) {
                        //QQQ
                        player.addTempSkill('spxizhan_spfangzong');
                        var target = trigger.player,
                            card = result.cards[0],
                            suit = card.suit;
                        if (!lib.suit.includes(suit) || ((!target || !target.isIn()) && suit != 'heart')) return;
                        game.broadcastAll(function (suit) {
                            if (lib.config.background_speak) game.playAudio('skill', 'spxizhan' + [null, 'spade', null, 'heart', 'club', 'diamond'].indexOf(suit));
                        }, suit);
                        switch (suit) {
                            case 'spade':
                                target.chooseUseTarget('jiu', true);
                                break;
                            case 'heart':
                                player.chooseUseTarget('wuzhong', true);
                                break;
                            case 'club':
                                if (player.canUse('tiesuo', target))
                                    player.useCard(
                                        {
                                            name: 'tiesuo',
                                        },
                                        target
                                    );
                                break;
                            case 'diamond':
                                if (
                                    player.canUse(
                                        {
                                            name: 'sha',
                                            nature: 'fire',
                                        },
                                        target,
                                        false
                                    )
                                )
                                    player.useCard(
                                        {
                                            name: 'sha',
                                            nature: 'fire',
                                        },
                                        target,
                                        false
                                    );
                                break;
                        }
                    } else {
                        game.broadcastAll(function () {
                            if (lib.config.background_speak) game.playAudio('skill', 'spxizhan2');
                        });
                        player.loseHp();
                    }
                };
            }
            if (lib.skill.clanshengmo) {
                lib.skill.clanshengmo.content = async function (event, trigger, player) {
                    const evt = event.getParent(2);
                    const names = lib.inpile.filter((name) => get.type(name) == 'basic' && !player.getStorage('clanshengmo').includes(name)),
                        cards = evt.clanshengmo_cards;
                    const links = await player
                        .chooseButton(['剩墨:获得其中一张牌', cards], true)
                        .set('ai', (button) => {
                            return get.value(button.link);
                        })
                        .forResultLinks();
                    if (!links || !links.length) return;
                    const list = [];
                    for (const name of names) {
                        const card = { name };
                        if (evt.filterCard(card, player, evt)) {
                            list.push(['基本', '', name]);
                        }
                        if (name == 'sha') {
                            for (const nature of lib.inpile_nature) {
                                card.nature = nature;
                                if (evt.filterCard(card, player, evt)) {
                                    list.push(['基本', '', name, nature]);
                                }
                            }
                        }
                    }
                    if (!list.length) return;
                    const links2 = await player
                        .chooseButton(['视为使用一张未以此法使用过的基本牌', [list, 'vcard']], true)
                        .set('ai', (button) => {
                            return number0(get.player().getUseValue({ name: button.link[2] }, null, true)) + 1; //QQQ
                        })
                        .forResultLinks();
                    const name = links2[0][2],
                        nature = links2[0][3];
                    game.broadcastAll(
                        (name, nature, toGain) => {
                            lib.skill.clanshengmo_backup.viewAs = {
                                name,
                                nature,
                            };
                            lib.skill.clanshengmo_backup.prompt = `选择${get.translation(nature)}【${get.translation(name)}】的目标`;
                            lib.skill.clanshengmo_backup.cardToGain = toGain;
                        },
                        name,
                        nature,
                        links[0]
                    );
                    evt.set('_backupevent', 'clanshengmo_backup');
                    evt.backup('clanshengmo_backup');
                    evt.set('openskilldialog', `选择${get.translation(nature)}【${get.translation(name)}】的目标`);
                    evt.set('norestore', true);
                    evt.set('custom', {
                        add: {},
                        replace: { window() { } },
                    });
                    evt.goto(0);
                };
            }
            if (lib.skill.qinggang_skill) {
                lib.skill.qinggang_skill.content = function () {
                    trigger.target.addTempSkill('qinggang2');
                    if (!trigger.target.storage.qinggang2) {
                        trigger.target.storage.qinggang2 = [];
                    }
                    trigger.target.storage.qinggang2.add(trigger.card);
                    trigger.target.markSkill('qinggang2');
                };
            }
            if (lib.skill.xunshi) {
                lib.skill.xunshi.filter = function (event, player) {
                    return event.card.suit == 'none' || lib.skill.xunshi.isXunshi(event.card);
                }; //card.init给卡牌加了个color的自带属性,get.color就会不检测mod技能,直接调用自带属性,导致巡使使用的牌颜色没有变为无
            }
        };
        qianceng();
        //————————————————————————————————————————————————————————————————————————————————————————————————————深层检测
        const shenceng = function () {
            if (QQQ.DEEP('lib.skill.reqice.chooseButton')) {
                lib.skill.reqice.chooseButton.check = function (button) {
                    var player = _status.event.player;
                    var effect = number0(player.getUseValue({ name: button.link[2] }, null, true));
                    if (player.countCards('hs', button.link[2]) > 0) return 0;
                    if ((player.getStat('skill').reqice || 0) < player.countMark('reqice_mark') + 1) {
                        if (['draw', 'gain'].some((i) => get.tag({ name: button.link[2] }, i) >= 1)) return effect * 5;
                    }
                    if (effect > 0) return effect;
                    return 0;
                };
            }
            if (QQQ.DEEP('lib.skill.twchunlao.subSkill')) {
                lib.skill.twchunlao.subSkill.sha = {
                    trigger: { global: 'useCard' },
                    forced: true,
                    filter(event, player) {
                        return event.card.name == 'sha' && event.player.countCards('he') > 0 && event.player.getExpansions('twchunlao').length > 0;
                    },
                    content() {
                        'step 0';
                        event.target = trigger.player;
                        event.target
                            .chooseCard('he', '醇醪:是否交给' + get.translation(player) + '一张牌,令' + get.translation(trigger.card) + '的伤害值基数+1？')
                            .set('ai', function (card) {
                                if (!_status.event.goon) return 3.5 - get.value(card);
                                return 7 - get.value(card);
                            })
                            .set(
                                'goon',
                                (function () {
                                    for (var target of trigger.targets) {
                                        if (get.attitude(target, player) < 0) return false;
                                        if (
                                            !target.mayHaveShan(
                                                player,
                                                'use',
                                                target.getCards('h', (i) => {
                                                    return i.hasGaintag('sha_notshan');
                                                })
                                            ) ||
                                            trigger.player.hasSkillTag(
                                                'directHit_ai',
                                                true,
                                                {
                                                    target: target,
                                                    card: trigger.card,
                                                },
                                                true
                                            )
                                        ) {
                                            if (
                                                get.attitude(player, target) < 0 &&
                                                !trigger.player.hasSkillTag('jueqing', false, target) &&
                                                !target.hasSkillTag('filterDamage', null, {
                                                    player: trigger.player,
                                                    card: trigger.card,
                                                })
                                            )
                                                return true;
                                        }
                                    }
                                    return false;
                                })()
                            );
                        if (!event.target.isUnderControl(true) && !event.target.isOnline()) game.delayx();
                        ('step 1');
                        if (result.bool) {
                            if (!target.hasSkill('twchunlao')) game.trySkillAudio('twchunlao', player);
                            if (player != target) target.give(result.cards, player, 'giveAuto');
                            trigger.baseDamage++;
                        }
                    },
                };
            }
            if (QQQ.DEEP('lib.skill.repindi.subSkill.clear.trigger')) {
                delete lib.skill.repindi.subSkill.clear.trigger;
            }
            if (QQQ.DEEP('lib.skill.zuoxing.chooseButton')) {
                lib.skill.zuoxing.chooseButton.check = function (button) {
                    const num = _status.event.player.getUseValue({ name: button.link[2] }, null, true);
                    if (get.tag({ name: button.link[2] }, 'recover')) {
                        return 99 * number0(num) + 10;
                    } //6刮骨疗毒
                    return number0(num) + 10;
                };
            } //佐幸优先回血
            if (QQQ.DEEP('lib.skill.changandajian_destroy')) {
                lib.skill.changandajian_destroy.getEffect = function (player, target) {
                    if (player == target) return 0;
                    if (target.countCards('j') && get.attitude(player, target) > 0) return 2;
                    if (target.countCards('e') && get.attitude(player, target) < 0) return 2;
                    return 0;
                };
            } //爆栈
            if (QQQ.DEEP('lib.skill.luanwu.ai.result')) {
                lib.skill.luanwu.ai.result.player = function (player) {
                    if (player.hasSkill('clanzhongliu')) return 99;
                    if (lib.config.mode == 'identity' && game.zhu.isZhu && player.identity == 'fan') {
                        if (game.zhu.hp == 1 && game.zhu.countCards('h') <= 2) return 1;
                    }
                    var num = 0;
                    var players = game.players;
                    for (var i = 0; i < players.length; i++) {
                        var att = get.attitude(player, players[i]);
                        if (att > 0) att = 1;
                        if (att < 0) att = -1;
                        if (players[i] != player && players[i].hp <= 3) {
                            if (players[i].countCards('h') == 0) num += att / players[i].hp;
                            else if (players[i].countCards('h') == 1) num += att / 2 / players[i].hp;
                            else if (players[i].countCards('h') == 2) num += att / 4 / players[i].hp;
                        }
                        if (players[i].hp == 1) num += att * 1.5;
                    }
                    if (player.hp == 1) {
                        return -num;
                    }
                    if (player.hp == 2) {
                        return -game.players.length / 4 - num;
                    }
                    return -game.players.length / 3 - num;
                };
            }
            if (QQQ.DEEP('lib.skill.dunshi.intro')) {
                lib.skill.dunshi.init = function (player, skill) {
                    player.storage.dunshi = [['sha', 'shan', 'tao', 'jiu'], 0];
                };
                lib.skill.dunshi.intro.markcount = function (storage, player) {
                    return player.storage.dunshi[1];
                };
            }
            if (QQQ.DEEP('lib.skill.drlt_jieying.subSkill.2')) {
                lib.skill.drlt_jieying.subSkill['2'].content = function () {
                    'step 0';
                    player.chooseTarget(get.prompt('drlt_jieying'), '将<营>交给一名角色;其摸牌阶段多摸一张牌,出牌阶段使用【杀】的次数上限+1且手牌上限+1.该角色回合结束后,其移去<营>标记,你获得其所有手牌.', function (card, player, target) {
                        return target != player;
                    }).ai = function (target) {
                        let th = target.countCards('h'),
                            att = get.attitude(_status.event.player, target);
                        for (let i of target.skills) {
                            //QQQ
                            let info = get.info(i);
                            if (info && info.shaRelated) return Math.abs(att);
                        }
                        if (att > 0) {
                            if (th > 3 && target.hp > 2) return 0.6 * th;
                        }
                        if (att < 1) {
                            if (target.countCards('j', { name: 'lebu' })) return 1 + Math.min((1.5 + th) * 0.8, target.getHandcardLimit() * 0.7);
                            if (!th || target.getEquip('zhangba') || target.getEquip('guanshi')) return 0;
                            if (!target.inRange(player) || player.countCards('hs', { name: 'shan' }) > 1) return Math.min((1 + th) * 0.3, target.getHandcardLimit() * 0.2);
                        }
                        return 0;
                    };
                    ('step 1');
                    if (result.bool) {
                        var target = result.targets[0];
                        player.line(target);
                        var mark = player.countMark('drlt_jieying_mark');
                        player.removeMark('drlt_jieying_mark', mark);
                        target.addMark('drlt_jieying_mark', mark);
                    }
                };
            }
            if (QQQ.DEEP('lib.skill.olhuiyun.ai.effect')) {
                lib.skill.olhuiyun.ai.effect.player = function (card, player, target) {
                    if (card && card.name == 'huogong' && card.storage && card.storage.olhuiyun && !player.hasSkill('olhuiyun_3') && target && get.attitude(player, target) > 0) return [0, 0.5, 0, 0.5];
                };
            } //QQQ
            if (QQQ.DEEP('lib.skill.dczhaowen.subSkill.draw.ai.effect')) {
                lib.skill.dczhaowen.subSkill.draw.ai.effect.player = (card, player, target) => {
                    if (get.itemtype(card) === 'card' && card.hasGaintag('dczhaowen_tag') && get.color(card, player) === 'red') return [1, 1];
                };
            }
            if (QQQ.DEEP('lib.skill.dcyixian.ai.result')) {
                lib.skill.dcyixian.ai.result.player = (player) => {
                    const enemies = game.players.filter((current) => {
                        return get.rawAttitude && get.rawAttitude(player, current) < 0 && get.attitude(player, current) >= 0;
                    }), //QQQ
                        knownEnemies = game.players.filter((current) => {
                            return get.attitude(player, current) < 0;
                        });
                    if ((!knownEnemies.length && player.countCards('e') > 1) || (player.getHp() > 3 && enemies.length && knownEnemies.length < 2 && knownEnemies.length < enemies.length && !knownEnemies.some((enemy) => get.attitude(player, enemy) <= -9))) return 0;
                    const val1 = game
                        .filterPlayer()
                        .map((current) => {
                            const cards = current.getCards('e'),
                                att = get.sgnAttitude(player, current);
                            return cards
                                .map((card) => {
                                    return Math.max(player.hasSkill('dcjuewu') ? 5 : 0, get.value(card, player)) - get.value(card, current) * att;
                                })
                                .reduce((p, c) => p + c, 0);
                        })
                        .reduce((p, c) => p + c, 0);
                    const val2 = Array.from(ui.discardPile.childNodes)
                        .filter((card) => {
                            return get.type(card) === 'equip';
                        })
                        .map((card) => {
                            return Math.max(player.hasSkill('dcjuewu') ? 5 : 0, get.value(card, player));
                        })
                        .reduce((p, c) => p + c, 0);
                    return Math.max(val1, val2) > 20 ? 4 : 0;
                };
            }
            if (QQQ.DEEP('lib.skill.sbfenwei.ai.result')) {
                lib.skill.sbfenwei.ai.result.target = function (player, target) {
                    return 1; //QQQ
                };
            }
            if (QQQ.DEEP('lib.skill.dualside.subSkill')) {
                lib.skill.dualside.subSkill.init = {
                    trigger: { global: 'gameStart', player: 'enterGame' },
                    silent: true,
                    content() {
                        if (player.name1 && player.name2) {
                            var list = [player.name1, player.name2];
                            for (var i = 0; i < list.length; i++) {
                                if (list[i] && lib.character[list[i]]) {
                                    var info = lib.character[list[i]];
                                    if (info.skills.includes('dualside') && info.dualSideCharacter) {
                                        player.storage.dualside = [list[i], player.hp, player.maxHp];
                                        var name2 = info.dualSideCharacter;
                                        var info2 = lib.character[name2];
                                        player.storage.dualside.push(name2);
                                        player.storage.dualside.push(info2.hp);
                                        player.storage.dualside.push(info2.maxHp);
                                    }
                                    break;
                                }
                            }
                            var cfg = player.storage.dualside;
                            if (cfg) {
                                if (get.mode() == 'guozhan') {
                                    if (player.name1 == cfg[0]) {
                                        player.showCharacter(0);
                                    } else {
                                        player.showCharacter(1);
                                    }
                                }
                                player.markSkillCharacter('dualside', { name: cfg[3] }, '背面', `当前体力:${cfg[4]}/` + cfg[5]);
                            }
                        }
                    },
                };
            }
            if (QQQ.DEEP('lib.skill.dili.subSkill.yuanlv')) {
                lib.skill.dili.subSkill.yuanlv.content = function () {
                    var cards = trigger.cards.filterInD();
                    if (cards.length) game.cardsDiscard(cards);
                    var type = get.subtype(trigger.card);
                    if (!['equip1', 'equip2', 'equip3', 'equip4', 'equip5', 'equip6'].includes(type)) type = 'equip1'; //QQQ
                    var card = game.createCard('changandajian_' + type, Math.random() < 0.5 ? 'spade' : 'heart', 10);
                    player.useCard(card, player);
                };
            }
            if (QQQ.DEEP('lib.skill.qice.ai.result')) {
                lib.skill.qice.ai.result.player = function (player) {
                    if (player.hasSkill('kongcheng')) return 1;
                    var num = 0;
                    var cards = player.getCards('h');
                    if (cards.length >= 3 && player.hp >= 3) return 0;
                    for (var i = 0; i < cards.length; i++) {
                        num += Math.max(0, get.value(cards[i], player, 'raw'));
                    }
                    num /= cards.length;
                    num *= Math.min(cards.length, player.hp);
                    return 12 - num;
                };
                lib.skill.qice.ai.order = function (player) {
                    player = _status.event.player;
                    if (player.countCards('h') == 1) return 99;
                    return 2;
                }; //奇策AI修改
            } //奇策AI修改
            if (QQQ.DEEP('lib.skill.sbwusheng.ai')) {
                lib.skill.sbwusheng.ai.effect = {
                    player(card, player, target) {
                        if (card.name == 'sha') return [1, 5]; //无脑用牌
                    },
                };
            }
            if (QQQ.DEEP('lib.skill._recasting.ai')) {
                lib.skill._recasting.ai.order = function (player) {
                    player = _status.event.player;
                    if (game.countPlayer((Q) => Q.isEnemiesOf(player)) < 2) return 99;
                    return 1;
                }; //铁索重铸AI修改
            }
            if (QQQ.DEEP('lib.skill.junxing.ai')) {
                lib.skill.junxing.check = function (card) {
                    if (ui.selected.cards.length) return -1;
                    if (game.hasPlayer((Q) => Q.countCards('h') == 0 && Q.isEnemiesOf(_status.event.player) && !Q.isTurnedOver())) return 20 - get.value(card);
                    if (get.type(card) == 'basic') return 8 - get.value(card);
                    return 5 - get.value(card);
                }; //峻刑AI修改
                lib.skill.junxing.ai.order = function (player) {
                    player = _status.event.player;
                    if (game.hasPlayer((Q) => Q.countCards('h') == 0 && Q.isEnemiesOf(player) && !Q.isTurnedOver())) return 99;
                    return 1;
                };
            } //峻刑AI修改
            if (QQQ.DEEP('lib.skill.spyinju.ai.result')) {
                lib.skill.spyinju.ai.order = function (player) {
                    player = _status.event.player;
                    if (player.hasSkill('dcyaoyi') && game.hasPlayer((Q) => lib.skill.dcyaoyi.getZhuanhuanji(Q, true) == lib.skill.dcyaoyi.getZhuanhuanji(player, true) && Q.isEnemiesOf(player))) return 99;
                    return 1;
                }; //引裾AI修改
                lib.skill.spyinju.ai.result.player = function (player, target) {
                    if (player.hasSkill('dcyaoyi') && game.hasPlayer((Q) => lib.skill.dcyaoyi.getZhuanhuanji(Q, true) == lib.skill.dcyaoyi.getZhuanhuanji(player, true) && Q.isEnemiesOf(player))) return 1;
                    if (!target.canUse('sha', player)) return 1;
                    if (target.countCards('h', { name: 'sha' }) == 0) return 1;
                    return -0.5;
                };
            } //引裾AI修改
            if (QQQ.DEEP('lib.skill.fuhun.ai')) {
                lib.skill.fuhun.mod = {
                    aiOrder(player, card, num) {
                        if (card.name == 'sha') return 20;
                        if (get.tag(card, 'damage')) return 25;
                    },
                }; //父魂AI优化,优先出杀和伤害锦囊
                lib.skill.fuhun.ai.effect = {
                    player(card, player, target, current) {
                        if (card.name == 'sha') return [1, 10];
                    },
                }; //父魂AI优化,出杀收益提高
                lib.skill.fuhun.check = function (card) {
                    if (!_status.event.player.hasSkill('new_rewusheng') && (card.name == 'sha' || get.color(card) == 'red')) return (9 - get.value(card)) / 9;
                    if (card.name == 'sha' || get.color(card) == 'red') return 0;
                    if (_status.event.name == 'chooseToRespond') {
                        return 6 - get.useful(card);
                    }
                    if (_status.event.player.hasSkill('xinbenxi')) return 999 - get.value(card);
                    return 7 - get.useful(card);
                };
                lib.skill.fuhun.ai.order = 22; //父魂AI优化,适配奔袭和武圣
            } //父魂AI优化,适配奔袭和武圣
            if (QQQ.DEEP('lib.skill.new_rewusheng.ai')) {
                lib.skill.new_rewusheng.check = function (card) {
                    if (card.name == 'sha') return 0;
                    if (_status.event.player.hasSkill('xinbenxi')) return 99 - get.value(card);
                    if (_status.event.name == 'chooseToRespond') return 1 / Math.max(0.1, get.value(card));
                    return 5 - get.value(card);
                }; //武圣AI优化,适配奔袭
                lib.skill.new_rewusheng.ai.order = 30; //武圣AI优化,适配父魂
            }
            if (QQQ.DEEP('lib.skill.olshengong.ai')) {
                lib.skill.olshengong.check = function (card) {
                    if (_status.event.player.hasSkill('olxuanfeng') && get.position(card) == 'e') return 99 - get.value(card);
                    var val = 7.52 - get.value(card);
                    if (val <= 0) return 0;
                    var player = _status.event.player;
                    if (player.getStorage('olshengong_destroy').includes(card)) val += 2;
                    return val;
                }; //神工AI修改
                lib.skill.olshengong.ai.order = 70;
            }
            if (QQQ.DEEP('lib.skill.xuanying.subSkill.shan')) {
                lib.skill.xuanying.subSkill.shan.ai = {
                    respondShan: true,
                    result: {
                        target(card, player, target, current) {
                            if (!player.isLinked() && current < 0) return 1.5;
                            if (!target.hasFriend()) return;
                            if (get.tag(card, 'loseCard') && _status.currentPhase != target && target.countCards('he')) {
                                return [0.5, Math.max(2, target.countCards('h'))];
                            }
                            if (get.tag(card, 'respondSha') || get.tag(card, 'respondShan')) {
                                if (get.attitude(player, target) > 0 && card.name == 'juedou') return;
                                return [0.5, target.countCards('h', 'sha') + target.countCards('h', 'shan')];
                            }
                        },
                    },
                };
            }
        };
        shenceng();
    }; //本体技能修改
    wujiiang();
    //—————————————————————————————————————————————————————————————————————————————按钮控制技能添加与修改
    const config = function () {
        if (QQQ.config.醉酒模式) {
            lib.skill.jiu = {
                marktext: '酒',
                mark: true,
                intro: {
                    name: '酒',
                    content(storage, player) {
                        return '下一张杀伤害加' + player.storage.jiu;
                    },
                    markcount(storage, player) {
                        return player.storage.jiu;
                    },
                },
            }; //酒无限持续直到命中
            lib.skill._jiudying = {
                trigger: {
                    player: 'dying',
                },
                firstDo: true,
                equipSkill: false,
                forced: true,
                ruleSkill: true,
                filter(event, player) {
                    return player.storage.jiu;
                },
                async content(event, trigger, player) {
                    while (player.storage.jiu > 0 && player.hp <= 0) {
                        player.storage.jiu--;
                        await player.recover();
                    }
                },
            }; //--------濒死喝酒
            lib.card.jiu.content = function () {
                if (typeof event.baseDamage != 'number') event.baseDamage = 1;
                if (target.isDying() || event.getParent(2).type == 'dying') {
                    target.recover();
                    if (_status.currentPhase == target) {
                        target.getStat().card.jiu--;
                    }
                } else {
                    game.addVideo('jiuNode', target, true);
                    if (cards && cards.length) {
                        card = cards[0];
                    }
                    if (!target.storage.jiu) target.storage.jiu = 0;
                    target.storage.jiu += event.baseDamage;
                    target.markSkill('jiu');
                    game.broadcastAll(
                        function (target, card, gain2) {
                            if (!target.node.jiu && lib.config.jiu_effect) {
                                target.node.jiu = ui.create.div('.playerjiu', target.node.avatar);
                                target.node.jiu2 = ui.create.div('.playerjiu', target.node.avatar2);
                            }
                        },
                        target,
                        card,
                        target == targets[0] && cards.length == 1
                    );
                    if (target == targets[0] && cards.length == 1) {
                        if (card.clone && (card.clone.parentNode == target.parentNode || card.clone.parentNode == ui.arena)) {
                            game.addVideo('gain2', target, get.cardsInfo([card]));
                        }
                    }
                }
            }; //酒无限持续直到命中
            lib.card.jiu.ai.result = {
                target(player, target, card) {
                    if (target && target.isDying()) return 2;
                    return 1;
                },
                player: 1,
            }; //酒AI修改
            lib.card.jiu.ai.order = () => {
                return get.order({ name: 'sha' }) + 0.2;
            }; //酒AI修改
        } //酒无限持续直到命中//濒死喝酒
        if (QQQ.config.回血加强) {
            lib.element.player.getDamagedHp = function () {
                return Math.abs(this.maxHp - this.hp);
            }; //已损体力值修改,加强春哥、孙坚
            lib.element.player.getHp = function () {
                return this.hp;
            }; //当前体力值修改,可以负血
            Reflect.defineProperty(lib.element.player, 'recover', {
                get() {
                    return function () {
                        var next = game.createEvent('recover');
                        next.player = this;
                        var nocard, nosource;
                        var event = _status.event;
                        for (var i = 0; i < arguments.length; i++) {
                            if (get.itemtype(arguments[i]) == 'cards') {
                                next.cards = arguments[i].slice(0);
                            } else if (get.itemtype(arguments[i]) == 'card') {
                                next.card = arguments[i];
                            } else if (get.itemtype(arguments[i]) == 'player') {
                                next.source = arguments[i];
                            } else if (typeof arguments[i] == 'object' && arguments[i] && arguments[i].name) {
                                next.card = arguments[i];
                            } else if (typeof arguments[i] == 'number') {
                                next.num = arguments[i];
                            } else if (arguments[i] == 'nocard') {
                                nocard = true;
                            } else if (arguments[i] == 'nosource') {
                                nosource = true;
                            }
                        }
                        if (next.card == undefined && !nocard) next.card = event.card;
                        if (next.cards == undefined && !nocard) next.cards = event.cards;
                        if (next.source == undefined && !nosource) next.source = event.customSource || event.player;
                        if (next.num == undefined) next.num = numberq1(event.baseDamage) + numberq0(event.extraDamage);
                        next.filterStop = function () {
                            if (this.num <= 0) {
                                delete this.filterStop;
                                this.finish();
                                this._triggered = null;
                                return true;
                            }
                        };
                        next.setContent('recoverQ');
                        return next;
                    };
                },
                set() { },
                configurable: false,
            }); //血量可以超上限
            lib.element.content.recoverQ = function () {
                if (lib.config.background_audio) {
                    game.playAudio('effect/recover');
                }
                game.broadcast(function () {
                    if (lib.config.background_audio) {
                        game.playAudio('effect/recover');
                    }
                });
                if (num > 0) {
                    player.changeHp(num, false);
                    game.broadcastAll(function (player) {
                        if (lib.config.animation && !lib.config.low_performance) {
                            player.$recover();
                        }
                    }, player);
                    player.$damagepop(num, 'wood');
                    game.log(player, `回复了${get.cnNumber(num)}点体力`);
                }
            }; //回血可以超上限
            lib.element.content.changeHp = function () {
                //add to GlobalHistory
                game.getGlobalHistory().changeHp.push(event);
                //changeHujia moved here
                event.Q = event.num;
                if (num < 0 && player.hujia > 0 && event.parent.name == 'damage' && !player.hasSkillTag('nohujia')) {
                    event.hujia = Math.min(-num, player.hujia);
                    event.parent.hujia = event.hujia;
                    event.num += event.hujia;
                    game.log(player, `的护甲抵挡了${get.cnNumber(event.hujia)}点伤害`);
                    player.changeHujia(-event.hujia).type = 'damage';
                }
                //old part
                num = event.num;
                player.hp += num;
                player.update();
                if (event.popup !== false) {
                    player.$damagepop(num, 'water');
                }
                if (_status.dying.includes(player) && player.hp > 0) {
                    _status.dying.remove(player);
                    game.broadcast(function (list) {
                        _status.dying = list;
                    }, _status.dying);
                    var evt = event.getParent('_save');
                    if (evt && evt.finish) evt.finish();
                    evt = event.getParent('dying');
                    if (evt && evt.finish) evt.finish();
                }
                if (QQQ.config.卖血模式) {
                    event.num = Math.abs(event.Q);
                }
                if (!event.card) event.card = event.parent.card;
                if (!event.cards) event.cards = event.parent.cards;
                if (!event.source) event.source = event.parent.source;
                event.trigger('changeHp');
            }; //血量可以超上限
            lib.element.player.update = function () {
                if (isNaN(this.hp)) {
                    this.hp = 0;
                }
                if (_status.video && arguments.length == 0) return;
                var hp = this.node.hp;
                hp.style.transition = 'none';
                game.broadcast(
                    function (player, hp, maxHp, hujia) {
                        player.hp = hp;
                        player.maxHp = maxHp;
                        player.hujia = hujia;
                        player.update();
                    },
                    this,
                    this.hp,
                    this.maxHp,
                    this.hujia
                );
                if (!_status.video) {
                    if (this.hujia) {
                        this.markSkill('ghujia');
                    } else {
                        this.unmarkSkill('ghujia');
                    }
                }
                if (!this.storage.nohp) {
                    if (this.maxHp == Infinity) {
                        hp.innerHTML = '∞';
                    } else {
                        hp.innerHTML = this.hp + `<br>/<br>${this.maxHp}<div></div>`;
                        if (this.hp == 0) {
                            hp.lastChild.classList.add('lost');
                        }
                        hp.classList.add('textstyle');
                    }
                    if (hp.classList.contains('room')) {
                        hp.dataset.condition = 'high';
                    } else if (this.hp == 0) {
                        hp.dataset.condition = '';
                    } else if (this.hp > Math.round(this.maxHp / 2) || this.hp === this.maxHp) {
                        hp.dataset.condition = 'high';
                    } else if (this.hp > Math.floor(this.maxHp / 3)) {
                        hp.dataset.condition = 'mid';
                    } else {
                        hp.dataset.condition = 'low';
                    }
                    setTimeout(function () {
                        hp.style.transition = '';
                    });
                }
                var numh = this.countCards('h');
                if (_status.video) {
                    numh = arguments[0];
                }
                if (numh > 5) {
                    this.node.count.dataset.condition = 'higher';
                } else if (numh > 2) {
                    this.node.count.dataset.condition = 'high';
                } else if (numh > 0) {
                    this.node.count.dataset.condition = 'mid';
                } else {
                    this.node.count.dataset.condition = 'none';
                }
                this.node.count.innerHTML = numh; //QQQ
                if (this.updates) {
                    for (var i = 0; i < lib.element.player.updates.length; i++) {
                        lib.element.player.updates[i](this);
                    }
                }
                if (!_status.video) {
                    game.addVideo('update', this, [this.countCards('h'), this.hp, this.maxHp, this.hujia]);
                }
                return this;
            }; //体力条样式修改
        } //血量可以超上限//已损体力值修改//体力条样式修改
        if (QQQ.config.武将卡牌加强) {
            lib.card.huogong = {
                audio: true,
                fullskin: true,
                type: 'trick',
                enable: true,
                filterTarget(card, player, target) {
                    return target.countCards('h') > 0;
                },
                async content(event, trigger, player) {
                    if (event.target.countCards('h')) {
                        const card = event.target.getCards('h').randomGet();
                        event.target.showCards(card);
                        const cards = get.cards(4);
                        game.cardsGotoOrdering(cards);
                        player.showCards(cards, '火攻');
                        let num = 0;
                        for (const i of cards) {
                            if (i.suit == card.suit) {
                                event.target.damage('fire');
                                num++;
                            }
                        }
                        if (num == 0) player.$skill('粉饰太平');
                        else if (num == 1) player.$skill('火星燎原');
                        else if (num == 2) player.$skill('炎山煮海');
                        else if (num == 3) player.$skill('焱天覆云');
                        else if (num == 4) player.$skill('燚烬苍穹');
                    }
                },
                ai: {
                    basic: {
                        order: 10,
                        value: 4,
                        useful: 2,
                    },
                    wuxie(target, card, player, viewer, status) {
                        if (get.attitude(viewer, player._trueMe || player) > 0) return 0;
                        if (status * get.attitude(viewer, target) * get.effect(target, card, player, target) >= 0) return 0;
                        if (_status.event.getRand('huogong_wuxie') * 4 > player.countCards('h')) return 0;
                    },
                    result: {
                        target: -2,
                    },
                    tag: {
                        damage: 1,
                        fireDamage: 1,
                        natureDamage: 1,
                        norepeat: 1,
                    },
                },
                selectTarget: 1,
            }; //火攻加强
            lib.skill.huoji.check = function (card) {
                return 8 - get.value(card);
            }; //火攻加强对应火计AI修改
            lib.skill.rehuoji.check = function (card) {
                return 8 - get.value(card);
            }; //火攻加强对应火计AI修改
            lib.skill.qilin_skill = {
                equipSkill: true,
                trigger: {
                    source: 'damageBefore',
                },
                filter(event, player) {
                    return event.card && event.card.name == 'sha' && event.notLink();
                },
                forced: true,
                audio: true,
                content() {
                    'step 0';
                    var att = get.attitude(player, trigger.player) <= 0;
                    var Q = ['equip3', 'equip4', 'equip6'].randomGet();
                    if (trigger.player.getCards('e', { subtype: ['equip3', 'equip4', 'equip6'] }).length) {
                        var next = player.chooseButton();
                        next.set('att', att);
                        next.set('createDialog', [`是否发动【麒麟弓】,弃置${get.translation(trigger.player)}的一张坐骑牌？`, trigger.player.getCards('e', { subtype: ['equip3', 'equip4', 'equip6'] })]);
                        next.set('ai', function (button) {
                            if (_status.event.att) return get.buttonValue(button);
                            return 0;
                        });
                    } else trigger.player.disableEquip(Q);
                    ('step 1');
                    if (result.bool) {
                        trigger.player.discard(result.links[0]);
                    }
                },
            }; //麒麟弓加强
            lib.skill.qinglong_skill = {
                equipSkill: true,
                trigger: {
                    player: ['shaMiss', 'eventNeutralized'],
                },
                forced: true,
                filter(event, player) {
                    return event.card && event.card.name == 'sha';
                },
                async content(event, trigger, player) {
                    player.addSkill('olpaoxiao2');
                    player.addMark('olpaoxiao2', 1);
                    if (trigger.target.isIn() && player.canUse('sha', trigger.target, false) && player.hasSha()) {
                        player.chooseToUse(get.prompt('qinglong', trigger.target), (c) => c.name == 'sha' && player.filterCardx(c), trigger.target, -1).set('addCount', false);
                    }
                },
            }; //青龙刀加强
            lib.card.wutiesuolian = {
                audio: true,
                fullskin: true,
                type: 'equip',
                subtype: 'equip1',
                distance: {
                    attackFrom: -2,
                },
                ai: {
                    equipValue: 20,
                    basic: {
                        equipValue: 20,
                        useful: 2,
                        value: 20,
                        order: 20,
                    },
                    result: {
                        target(player, target, card) {
                            return get.equipResult(player, target, card.name);
                        },
                    },
                },
                skills: ['乌铁锁链'],
                enable: true,
                selectTarget: -1,
                filterTarget(card, player, target) {
                    if (player != target) return false;
                    return target.canEquip(card, true);
                },
                modTarget: true,
                allowMultiple: false,
                content() {
                    if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
                },
                toself: true,
            }; //乌铁锁链加强
            lib.card.wuxinghelingshan = {
                audio: true,
                fullskin: true,
                type: 'equip',
                subtype: 'equip1',
                distance: {
                    attackFrom: -3,
                },
                ai: {
                    equipValue: 80,
                    basic: {
                        equipValue: 80,
                        useful: 2,
                        value: 80,
                        order: 80,
                    },
                    result: {
                        target: (player, target, card) => get.equipResult(player, target, card.name),
                    },
                },
                skills: ['五行鹤翎扇'],
                enable: true,
                selectTarget: -1,
                filterTarget(card, player, target) {
                    if (player != target) return false;
                    return target.canEquip(card, true);
                },
                modTarget: true,
                allowMultiple: false,
                content() {
                    if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
                },
                toself: true,
            }; //五行鹤翎扇加强
            lib.card.zhuge = {
                distance: {
                    attackFrom: -2,
                },
                fullskin: true,
                type: 'equip',
                subtype: 'equip1',
                ai: {
                    equipValue: 90,
                    basic: {
                        useful: 2,
                        value: 90,
                        order: 90,
                    },
                    tag: {
                        valueswap: 1,
                    },
                    result: {
                        target: (player, target, card) => get.equipResult(player, target, card.name),
                    },
                },
                skills: ['连弩'],
                enable: true,
                selectTarget: -1,
                filterTarget: (card, player, target) => player == target && target.canEquip(card, true),
                modTarget: true,
                allowMultiple: false,
                content() {
                    if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
                },
                toself: true,
            }; //连弩加强
            lib.skill.dcjincui = {
                audio: 2,
                trigger: {
                    player: 'phaseZhunbeiBegin',
                },
                filter(event, player) {
                    return true;
                },
                forced: true,
                group: 'dcjincui_advent',
                async content(event, trigger, player) {
                    //QQQ
                    const num = Math.min(player.hp, 36);
                    const cardx = get.cards(num);
                    game.cardsGotoOrdering(cardx);
                    const { result } = await player
                        .chooseToMove()
                        .set('list', [['牌堆顶', cardx], ['牌堆底']])
                        .set('prompt', '将牌移动到牌堆顶或牌堆底')
                        .set('processAI', function (list) {
                            const cards = list[0][1];
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
                                    if (get.value(cards[0]) < 6) break;
                                    top.push(cards.shift());
                                }
                            }
                            return [top, cards];
                        }); //自己观星
                    result.moved[0].reverse();
                    for (const i of result.moved[0]) {
                        ui.cardPile.insertBefore(i, ui.cardPile.firstChild);
                    }
                    for (const i of result.moved[1]) {
                        ui.cardPile.appendChild(i);
                    }
                    player.popup(get.cnNumber(result.moved[0].length) + `上${get.cnNumber(result.moved[1].length)}下`);
                    game.log(player, `将${get.cnNumber(result.moved[0].length)}张牌置于牌堆顶`);
                    game.updateRoundNumber();
                },
                ai: {
                    guanxing: true,
                    effect: {
                        target(card, player, target) {
                            if (!get.tag(card, 'damage')) return;
                            var num = 0,
                                bool = false;
                            for (var i = 0; i < ui.cardPile.childNodes.length; i++) {
                                var card = ui.cardPile.childNodes[i];
                                if (card.number == 7) {
                                    num++;
                                    if (num >= target.hp) {
                                        bool = true;
                                        break;
                                    }
                                }
                            }
                            if (bool) return 0.8;
                        },
                    },
                },
                subSkill: {
                    advent: {
                        audio: 'dcjincui',
                        trigger: {
                            global: 'roundStart',
                        },
                        forced: true,
                        content() {
                            player.drawTo(7);
                            let num = 0;
                            for (var i = 0; i < ui.cardPile.childNodes.length; i++) {
                                var card = ui.cardPile.childNodes[i];
                                if (card.number == 7) {
                                    num++;
                                }
                            }
                            if (num < 1) num = 1;
                            player.maxHp = num;
                            player.hp = num;
                            player.update();
                        },
                    },
                },
            }; //修复ai不攻击武诸葛的bug,且加强回血
            lib.skill.dcxiongmu = {
                audio: 2,
                mod: {
                    ignoredHandcard(card, player) {
                        if (card.number == 8) return true;
                    },
                    cardDiscardable(card, player, name) {
                        if (card.number == 8) return false;
                    },
                    canBeDiscarded(card) {
                        if (card.number == 8) return false;
                    },
                    canBeGained(card) {
                        if (card.number == 8) return false;
                    },
                },
                trigger: {
                    global: 'phaseBefore',
                },
                group: 'dcxiongmu_minus',
                prompt2(event, player) {
                    return (player.countCards('h') < player.maxHp ? `将手牌摸至${get.cnNumber(player.maxHp)}张,` : '') + '将任意张牌随机置入牌堆并从牌堆或弃牌堆中获得等量点数为8的牌.';
                },
                content() {
                    'step 0';
                    player.drawTo(player.maxHp);
                    ('step 1');
                    event.cards = player.getCards('he');
                    game.log(player, `将${get.cnNumber(event.cards.length)}张牌置入了牌堆`);
                    player.loseToDiscardpile(event.cards, ui.cardPile, 'blank').set('log', false).insert_index = function () {
                        return ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length - 1)];
                    };
                    ('step 2');
                    var list = [],
                        shown = [];
                    var piles = ['cardPile', 'discardPile'];
                    for (var pile of piles) {
                        for (var i = 0; i < ui[pile].childNodes.length; i++) {
                            var card = ui[pile].childNodes[i];
                            var number = card.number;
                            if (!list.includes(card) && number == 8) {
                                list.push(card);
                                if (pile == 'discardPile') shown.push(card);
                                if (list.length >= cards.length) break;
                            }
                        }
                        if (list.length >= cards.length) break;
                    }
                    if (list.length) {
                        var next = player.gain(list);
                        next.shown_cards = shown;
                        next.set('animate', function (event) {
                            var player = event.player,
                                cards = event.cards,
                                shown = event.shown_cards;
                            if (shown.length < cards.length) {
                                var num = cards.length - shown.length;
                                player.$draw(num);
                                game.log(player, '从牌堆获得了', get.cnNumber(num), '张点数为8的牌');
                            }
                            if (shown.length) {
                                player.$gain2(shown, false);
                                game.log(player, '从弃牌堆获得了', shown);
                            }
                            return 500;
                        });
                    }
                },
                ai: {
                    effect: {
                        target(card, player, target) {
                            if (target.countCards('h') > target.getHp() || player.hasSkillTag('jueqing')) return;
                            if (player._dcxiongmu_temp) return;
                            if (_status.event.getParent('useCard', true) || _status.event.getParent('_wuxie', true)) return;
                            if (get.tag(card, 'damage')) {
                                if (target.getHistory('damage').length) {
                                    return [1, -2];
                                } else {
                                    if (get.attitude(player, target) > 0 && target.hp > 1) {
                                        return 0;
                                    }
                                    if (get.attitude(player, target) < 0 && !player.hasSkillTag('damageBonus')) {
                                        if (card.name == 'sha') return;
                                        var sha = false;
                                        player._dcxiongmu_temp = true;
                                        var num = player.countCards('h', function (card) {
                                            if (card.name == 'sha') {
                                                if (sha) {
                                                    return false;
                                                } else {
                                                    sha = true;
                                                }
                                            }
                                            return get.tag(card, 'damage') && player.canUse(card, target, true, true) && get.effect(target, card, player, player) > 0;
                                        });
                                        delete player._dcxiongmu_temp;
                                        if (player.hasSkillTag('damage')) {
                                            num++;
                                        }
                                        if (num < 2) {
                                            var enemies = player.getEnemies();
                                            if (enemies.length == 1 && enemies[0] == target && player.needsToDiscard()) {
                                                return;
                                            }
                                            return 0;
                                        }
                                    }
                                }
                            }
                        },
                    },
                },
                subSkill: {
                    minus: {
                        audio: 'dcxiongmu',
                        trigger: {
                            player: 'damageBegin4',
                        },
                        filter(event, player) {
                            return (
                                player.countCards('h') <= player.getHp() &&
                                game
                                    .getGlobalHistory(
                                        'everything',
                                        (evt) => {
                                            return evt.name == 'damage' && evt.player == player;
                                        },
                                        event
                                    )
                                    .indexOf(event) == 0
                            );
                        },
                        forced: true,
                        content() {
                            trigger.num--;
                        },
                    },
                },
            }; //加强武陆逊
        }
        if (QQQ.config.优化判定) {
            lib.element.content.phaseJudge = function () {
                'step 0';
                game.log(player, '进入了判定阶段');
                event.cards = player.getCards('j');
                if (!event.cards.length) event.finish();
                ('step 1');
                if (cards.length && player.getCards('j').includes(cards[0])) {
                    event.card = cards.shift();
                    if (event.card.classList.contains('removing')) {
                        event.card.remove();
                        delete event.card;
                        event.redo();
                    } else if (event.card.classList.contains('feichu')) {
                        event.finish();
                        return;
                    } else {
                        player.lose(event.card, 'visible', ui.ordering);
                        player.$phaseJudge(event.card);
                        event.cancelled = false;
                        event.trigger('phaseJudge');
                        var name = event.card.viewAs || event.card.name;
                        player.popup(name, 'thunder');
                        if (!lib.card[name].effect) {
                            event.redo();
                        } else if (!lib.card[name].judge) {
                            event.nojudge = true;
                        }
                    }
                } else event.finish();
                ('step 2');
                if (!event.cancelled && !event.nojudge) player.judge(event.card).set('type', 'phase');
                ('step 3');
                var name = event.card.viewAs || event.card.name;
                if (event.excluded) {
                    delete event.excluded;
                } else if (event.cancelled && !event.direct) {
                    if (lib.card[name].cancel) {
                        var next = game.createEvent(name + 'Cancel');
                        next.setContent(lib.card[name].cancel);
                        next.cards = [event.card];
                        if (!event.card.viewAs) next.card = event.card;
                        else next.card = { name: name };
                        next.player = player;
                    }
                } else {
                    if (result.bool == false)
                        event.cards = event.cards.filter((card) => {
                            return card.name != name;
                        });
                    var next = game.createEvent(name);
                    next.setContent(lib.card[name].effect);
                    next._result = result;
                    next.cards = [event.card];
                    if (!event.card.viewAs) next.card = event.card;
                    else next.card = { name: name };
                    next.player = player;
                }
                ui.clear();
                event.goto(1);
            }; //判定阶段每个牌名只判一次
        } //优化判定
        if (QQQ.config.禁止延迟) {
            Reflect.defineProperty(lib.config, 'sync_speed', {
                get() {
                    return false;
                },
                set() { },
            }); //取消限制结算速度
            Reflect.defineProperty(game, 'delay', {
                get() {
                    return () => true;
                },
                set() { },
                configurable: false,
            });
            lib.configMenu.general.config.game_speed.item = 'vvfast';
            Reflect.defineProperty(lib.config, 'game_speed', {
                get() {
                    return 'vvfast';
                },
                set() { },
                configurable: false,
            });
            game.saveConfig('game_speed', 'vvfast');
        } //禁止延迟
        if (QQQ.config.报错) {
            lib.skill._出牌计数 = {
                trigger: {
                    player: 'phaseUseBegin',
                },
                silent: true,
                lastDo: true,
                filter: (e, p) => p == game.me,
                async content(event, trigger, player) {
                    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    const randomBorderColor = '#' + Math.floor(Math.random() * 16777215).toString(16); // 随机边框颜色
                    player.USE = numberq0(player.USE) + 1;
                    if (game.USE) game.USE.remove();
                    game.USE = window.document.createElement('div');
                    game.USE.style.cssText = `right: 60px; top: 60px; height: 50px; width: 50px; z-index: 999; background-color:${randomBorderColor}; border-radius: 50%; display: flex; justify-content: center; align-items: center;`;
                    game.USE.innerHTML = `<font color='${randomColor}' style='font-size: 40px;'>${player.USE}</font>`;
                    document.body.appendChild(game.USE);
                },
                _priority: -999,
            }; //出牌计数
            lib.skill._轮次计数 = {
                trigger: {
                    global: 'roundStart',
                },
                silent: true,
                lastDo: true,
                filter: (e, p) => p == game.me,
                async content(event, trigger, player) {
                    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    const randomBorderColor = '#' + Math.floor(Math.random() * 16777215).toString(16); // 随机边框颜色
                    player.ROUND = numberq0(player.ROUND) + 1;
                    if (game.ROUND) game.ROUND.remove();
                    game.ROUND = window.document.createElement('div');
                    game.ROUND.style.cssText = `right: 120px; top: 60px; height: 60px; width: 60px; z-index: 999; background-color: ${randomBorderColor}; border-radius: 50%; display: flex; justify-content: center; align-items: center;`;
                    game.ROUND.innerHTML = `<font color='${randomColor}' style='font-size: 40px;'>${player.ROUND}</font>`;
                    document.body.appendChild(game.ROUND);
                },
                _priority: -999,
            }; //轮次计数
        } //出牌轮次计数
        if (QQQ.config.取消小游戏) {
            lib.skill.chongxu = {
                enable: 'phaseUse',
                usable: 1,
                async content(event, trigger, player) {
                    //QQQ
                    game.log(`<span class="greentext">${get.translation(player)}的演奏评级为神话,获得5分</span>`);
                    var list = [];
                    if (player.countMark('miaojian') < 2 && player.hasSkill('miaojian')) list.push('修改【妙剑】');
                    if (player.countMark('shhlianhua') < 2 && player.hasSkill('shhlianhua')) list.push('修改【莲华】');
                    if (list.length) {
                        list.push('全部摸牌');
                        const { result } = await player.chooseControl(list).set('prompt', '冲虚:修改技能并摸1张牌;或摸2张牌');
                        if (result.control != '全部摸牌') {
                            var skill = result.control == '修改【妙剑】' ? 'miaojian' : 'shhlianhua';
                            player.addMark(skill, 1, false);
                            game.log(`<span class="greentext">${get.translation(player)}修改了技能${get.translation(skill)}</span>`);
                            player.draw(1);
                        } else {
                            player.draw(2);
                        }
                    } else {
                        player.draw(2);
                    }
                },
                ai: {
                    order: 10,
                    result: {
                        player: 1,
                    },
                },
            }; /*冲虚*/
            lib.skill.xinfu_pingcai = {
                audio: true,
                enable: 'phaseUse',
                usable: 1,
                async content(event, trigger, player) {
                    //QQQ
                    const link = [];
                    const list = ['wolong', 'fengchu', 'xuanjian', 'shuijing'];
                    for (const i of list) {
                        link.push([i, get.translation(i)]);
                    }
                    const { result } = await player.chooseButton(['请选择要擦拭的宝物', [link, 'tdnodes']], true).set('ai', function (button) {
                        if (button.link.name == 'xuanjian') {
                            if (game.hasPlayer((current) => current.isDamaged() && current.hp < 3 && get.attitude(player, current) > 1)) {
                                return 1 + Math.random();
                            }
                            return 1;
                        }
                        if (button.link.name == 'wolong') {
                            if (game.hasPlayer((current) => get.damageEffect(current, player, player, 'fire') > 0)) {
                                return 1.2 + Math.random();
                            }
                            return 0.5;
                        }
                        return 0.6;
                    });
                    if (result.links && result.links[0]) {
                        switch (result.links[0]) {
                            case 'wolong':
                                {
                                    var ingame = game.hasPlayer((current) => ['sp_zhugeliang', 're_sp_zhugeliang', 'ol_sp_zhugeliang', 'prp_zhugeliang'].includes(current.name)) ? true : false;
                                    var range = ingame ? [1, 2] : [1, 1];
                                    const { result: result1 } = await player.chooseTarget(`请选择${ingame ? '至多两名' : '一名'}角色,对其造成1点火焰伤害`, range).set('ai', (target) => get.damageEffect(target, player, player, 'fire'));
                                    if (result1.targets && result1.targets[0]) {
                                        for (const i of result1.targets) {
                                            i.damage('fire');
                                        }
                                    }
                                }
                                break;
                            case 'fengchu':
                                {
                                    var ingame = game.hasPlayer((current) => ['re_pangtong', 'pangtong', 'ol_pangtong'].includes(current.name)) ? true : false;
                                    var prompt = `请选择${ingame ? '至多四名' : '至多三名'}要横置的角色`;
                                    var range = ingame ? [1, 4] : [1, 3];
                                    const { result: result1 } = await player.chooseTarget(prompt, range).set('ai', (target) => get.effect(target, { name: 'tiesuo' }, player, player));
                                    if (result1.targets && result1.targets[0]) {
                                        for (const i of result1.targets) {
                                            i.link();
                                        }
                                    }
                                }
                                break;
                            case 'xuanjian':
                                {
                                    var ingame = game.hasPlayer((current) => ['re_xushu', 'xin_xushu', 'xushu', 'dc_xushu'].includes(current.name)) ? true : false;
                                    var prompt = `请选择一名角色,令其回复1点体力并摸一张牌${ingame ? ',你摸一张牌.' : '.'}`;
                                    const { result: result1 } = await player.chooseTarget(prompt).set('ai', (target) => get.attitude(player, target) * (target.isDamaged() ? 2 : 1));
                                    if (result1.targets && result1.targets[0]) {
                                        result1.targets[0].draw();
                                        result1.targets[0].recover();
                                        if (ingame) player.draw();
                                    }
                                }
                                break;
                            case 'shuijing':
                                {
                                    var ingame = game.hasPlayer((current) => current.name == 'simahui') ? true : false;
                                    var prompt = `将一名角色装备区中的${ingame ? '一张牌' : '防具牌'}移动到另一名角色的装备区中`;
                                    const { result: result1 } = await player
                                        .chooseTarget(2, function (card, player, target) {
                                            if (ui.selected.targets.length) {
                                                return true;
                                            } else {
                                                if (!ingame) {
                                                    return target.getEquips(2).length;
                                                }
                                                return target.countCards('e');
                                            }
                                        })
                                        .set('ai', function (target) {
                                            var att = get.attitude(player, target);
                                            if (ui.selected.targets.length == 0) {
                                                if (att < 0) {
                                                    if (
                                                        game.hasPlayer(function (current) {
                                                            if (get.attitude(player, current) > 0) {
                                                                var es = target.getCards('e');
                                                                for (var i = 0; i < es.length; i++) {
                                                                    if (current.canEquip(es[i])) return true;
                                                                }
                                                                return false;
                                                            }
                                                        })
                                                    )
                                                        return -att;
                                                }
                                                return 0;
                                            }
                                            if (att > 0) {
                                                var es = ui.selected.targets[0].getCards('e');
                                                var i;
                                                for (i = 0; i < es.length; i++) {
                                                    if (target.canEquip(es[i])) break;
                                                }
                                                if (i == es.length) return 0;
                                            }
                                            return -att * get.attitude(player, ui.selected.targets[0]);
                                        })
                                        .set('multitarget', true)
                                        .set('targetprompt', ['被移走', '移动目标'])
                                        .set('prompt', prompt);
                                    if (result1.targets && result1.targets[0]) {
                                        if (result1.targets.length == 2) {
                                            if (!ingame) {
                                                var cards = result1.targets[0].getEquips(2);
                                                if (cards.length == 1) {
                                                    result1.targets[1].equip(cards[0]);
                                                } else {
                                                    const { result: result2 } = await player.choosePlayerCard('e', true, (button) => get.equipValue(button.link), result1.targets[0]).set('filterButton', (button) => get.subtypes(button.link, false).includes('equip2'));
                                                    if (result2.links && result2.links[0]) {
                                                        result1.targets[1].equip(result2.links[0]);
                                                    }
                                                }
                                            } else {
                                                const { result: result2 } = await player.choosePlayerCard('e', true, (button) => get.equipValue(button.link), result1.targets[0]);
                                                if (result2.links && result2.links[0]) {
                                                    result1.targets[1].equip(result2.links[0]);
                                                }
                                            }
                                        }
                                    }
                                }
                                break;
                        }
                    }
                },
                ai: {
                    order: 7,
                    fireAttack: true,
                    threaten: 1.7,
                    result: {
                        player: 1,
                    },
                },
            }; /*评才*/
            lib.skill.yufeng = {
                audio: 2,
                enable: 'phaseUse',
                usable: 1,
                async content(event, trigger, player) {
                    //QQQ
                    game.log(`<span class="greentext">${get.translation(player)}御风飞行成功,获得了3分</span>`);
                    const { result } = await player
                        .chooseTarget('请选择【御风】的目标', [1, 3], (card, player, target) => target != player && !target.hasSkill('yufeng2'))
                        .set('ai', function (target) {
                            var att = -get.attitude(player, target),
                                attx = att * 2;
                            if (att <= 0 || target.hasSkill('xinfu_pdgyingshi')) return 0;
                            if (target.hasJudge('lebu')) attx -= att;
                            if (target.hasJudge('bingliang')) attx -= att;
                            return attx / Math.max(2.25, Math.sqrt(target.countCards('h') + 1));
                        });
                    if (result.targets && result.targets[0]) {
                        game.log(`<span class="greentext">${get.translation(result.targets)}获得了<御风>效果</span>`);
                        for (const i of result.targets) {
                            i.addSkill('yufeng2');
                        }
                        if (3 > result.targets.length) {
                            player.draw(3 - result.targets.length);
                        }
                    } else {
                        player.draw(3);
                    }
                },
                ai: {
                    order: 10,
                    result: {
                        player: 1,
                    },
                    threaten: 3.2,
                },
            }; /*御风*/
            lib.skill.zhengjing = {
                audio: 2,
                enable: 'phaseUse',
                usable: 1,
                filter(event, player) {
                    return !player.hasSkill('zhengjing3');
                },
                async content(event, trigger, player) {
                    //QQQ
                    var cards = Array.from(ui.cardPile.childNodes).randomGets(5);
                    if (cards.length) {
                        player.showCards(cards, get.translation(player) + '整理出了以下经典');
                        const { result } = await player.chooseTarget('将整理出的经典置于一名角色的武将牌上').set('ai', (target) => {
                            if (target.hasSkill('zhengjing2')) return get.attitude(player, target);
                            return get.attitude(player, target) * (0.3 * target.countCards('j') - 1);
                        }); //对目标正价值就乘get.att,负价值就乘-get.att
                        if (result.targets && result.targets[0]) {
                            const { result: result1 } = await player.chooseButton(['将整理出的经典置于一名角色的武将牌上', cards]).set('ai', (button) => 6 - get.value(button.link));
                            if (result1.links && result1.links[0]) {
                                cards.remove(result1.links[0]);
                                result.targets[0].addSkill('zhengjing2');
                                result.targets[0].addToExpansion(result1.links, 'gain2').gaintag.add('zhengjing2');
                                player.gain(cards, 'gain2');
                            } else {
                                player.gain(cards, 'gain2');
                            }
                        } else {
                            player.gain(cards, 'gain2');
                        }
                    }
                },
                ai: {
                    order: 10,
                    result: {
                        player: 1,
                    },
                    threaten: 3.2,
                },
            }; /*整经*/
            lib.element.player.throwDice = function () {
                _status.event.num = get.rand(6) + 1;
            }; //骰子取消延迟
        } //取消小游戏
        if (QQQ.config.禁止摸牌平局) {
            get.cards = function (num, putBack) {
                if (_status.waitingForCards) {
                    ui.create.cards.apply(ui.create, _status.waitingForCards);
                    delete _status.waitingForCards;
                }
                var list = [];
                var card = false;
                if (!(num > 0)) num = 1;
                num = Math.min(30, num);
                while (num-- > 0) {
                    //先比较数值再减少,加上大于零判断防止num非整数无限循环
                    if (ui.cardPile.hasChildNodes() == false) {
                        game.washCard();
                    }
                    if (ui.cardPile.firstChild) {
                        var cardx = ui.cardPile.removeChild(ui.cardPile.firstChild);
                        cardx.original = 'c';
                        list.push(cardx);
                    } //QQQ
                }
                if (putBack) {
                    for (let i = list.length - 1; i >= 0; i--) {
                        ui.cardPile.insertBefore(list[i], ui.cardPile.firstChild);
                    }
                }
                game.updateRoundNumber();
                if (card) return list[0];
                return list;
            }; //修复摸牌平局
            get.bottomCards = function (num, putBack) {
                if (_status.waitingForCards) {
                    ui.create.cards.apply(ui.create, _status.waitingForCards);
                    delete _status.waitingForCards;
                }
                var list = [];
                var card = false;
                if (!(num > 0)) num = 1;
                num = Math.min(30, num);
                while (num-- > 0) {
                    //先比较数值再减少,加上大于零判断防止num非整数无限循环
                    if (ui.cardPile.hasChildNodes() == false) {
                        game.washCard();
                    }
                    if (ui.cardPile.lastChild) {
                        var cardx = ui.cardPile.removeChild(ui.cardPile.lastChild);
                        cardx.original = 'c';
                        list.push(cardx);
                    }
                }
                if (putBack) {
                    for (let i = list.length - 1; i >= 0; i--) {
                        ui.cardPile.appendChild(list[i]);
                    }
                }
                game.updateRoundNumber();
                if (card) return list[0];
                return list;
            }; //修复摸牌平局
            game.washCard = function () {
                if (!ui.cardPile.hasChildNodes() && !ui.discardPile.hasChildNodes()) return false;
                if (_status.maxShuffle != undefined) {
                    _status.maxShuffle--;
                }
                game.shuffleNumber++;
                const cards = Array.from(ui.cardPile.childNodes);
                if (_status.discarded) {
                    _status.discarded.length = 0;
                }
                for (let i = 0; i < ui.discardPile.childNodes.length; i++) {
                    var currentcard = ui.discardPile.childNodes[i];
                    currentcard.vanishtag.length = 0;
                    currentcard.clearKnowers();
                    if (get.info(currentcard).vanish || currentcard.storage.vanish) {
                        currentcard.remove();
                        continue;
                    }
                    cards.push(currentcard);
                }
                cards.randomSort();
                return game.cardsGotoPile(cards, 'triggeronly', 'washCard', ['shuffleNumber', game.shuffleNumber]);
            }; //洗牌修改
            lib.element.player.drawTo = function (num, args) {
                var num2 = Math.floor(num - this.countCards('h'));
                if (num2) {
                    //QQQ
                    var next = this.draw(num2);
                    if (Array.isArray(args)) {
                        for (var i = 0; i < args.length; i++) {
                            if (get.itemtype(args[i]) == 'player') {
                                next.source = args[i];
                            } else if (typeof args[i] == 'boolean') {
                                next.animate = args[i];
                            } else if (args[i] == 'nodelay') {
                                next.animate = false;
                                next.$draw = true;
                            } else if (args[i] == 'visible') {
                                next.visible = true;
                            } else if (args[i] == 'bottom') {
                                next.bottom = true;
                            } else if (typeof args[i] == 'object' && args[i] && args[i].drawDeck != undefined) {
                                next.drawDeck = args[i].drawDeck;
                            }
                        }
                    }
                } else var next = ui.cardPile.firstChild;
                return next;
            }; //防止空摸
        } //修复摸非整数牌平局
        if (QQQ.config.禁止封禁技能) {
            game.filterSkills = function (skills) {
                return skills;
            };
            lib.element.player.awakenSkill = lib.element.player.RS; //修改觉醒技
        } //禁止封禁技能
        if (QQQ.config.禁止循环触发) {
            lib.element.event.trigger = function (name) {
                // if (this.getParent(this.name).name == this.name) {
                //     var e = this.parent;
                //     console.log(this.name + '循环终点');
                //     while (e.name != this.name) {
                //         console.log(e.name);
                //         e = e.parent;
                //     }
                //     console.log(this.name + '循环起点');
                //     return;
                // }
                if (_status.video) return;
                if (!_status.gameDrawed && ['lose', 'gain', 'loseAsync', 'equip', 'addJudge', 'addToExpansion'].includes(this.name)) return;
                if (name === 'gameDrawEnd') _status.gameDrawed = true;
                if (name === 'gameStart') {
                    lib.announce.publish('Noname.Game.Event.GameStart', {});
                    lib.announce.publish('gameStart', {});
                    if (_status.brawl && _status.brawl.gameStart) _status.brawl.gameStart();
                    if (lib.config.show_cardpile) ui.cardPileButton.style.display = '';
                    _status.gameStarted = true;
                    game.showHistory();
                }
                if (!lib.hookmap[name]) return;
                if (!game.players || !game.players.length) return;
                const event = this;
                if (event.filterStop && event.filterStop()) return;
                let start = [_status.currentPhase, event.source, event.player, game.me, game.players[0]].find((i) => get.itemtype(i) == 'player');
                if (!start) return;
                if (!game.players.includes(start) && !game.dead.includes(start)) start = game.findNext(start);
                const firstDo = {
                    player: 'firstDo',
                    todoList: [],
                    doneList: [],
                };
                const lastDo = {
                    player: 'lastDo',
                    todoList: [],
                    doneList: [],
                };
                const doingList = [];
                const roles = ['player', 'source', 'target', 'global'];
                const playerMap = game.players.concat(game.dead).sortBySeat(start);
                let player = start;
                let allbool = false;
                do {
                    const doing = {
                        player: player,
                        todoList: [],
                        doneList: [],
                        listAdded: {},
                        addList(skill) {
                            if (!skill) return;
                            if (Array.isArray(skill)) return skill.forEach((i) => this.addList(i));
                            if (this.listAdded[skill]) return;
                            this.listAdded[skill] = true;
                            const info = lib.skill[skill];
                            const list = info.firstDo ? firstDo.todoList : info.lastDo ? lastDo.todoList : this.todoList;
                            if (typeof info.getIndex === 'function') {
                                const indexedResult = info.getIndex(event, player, name);
                                if (Array.isArray(indexedResult)) {
                                    indexedResult.forEach((indexedData) => {
                                        list.push({
                                            skill: skill,
                                            player: this.player,
                                            priority: get.priority(skill),
                                            indexedData,
                                        });
                                    });
                                } else if (typeof indexedResult === 'number' && indexedResult > 0) {
                                    for (let i = 0; i < indexedResult; i++) {
                                        list.push({
                                            skill: skill,
                                            player: this.player,
                                            priority: get.priority(skill),
                                            indexedData: true,
                                        });
                                    }
                                }
                            } else {
                                list.push({
                                    skill: skill,
                                    player: this.player,
                                    priority: get.priority(skill),
                                });
                            }
                            if (typeof list.player == 'string') list.sort((a, b) => b.priority - a.priority || playerMap.indexOf(a) - playerMap.indexOf(b));
                            else list.sort((a, b) => b.priority - a.priority);
                            allbool = true;
                        },
                    };
                    const notemp = player.skills.slice();
                    for (const j in player.additionalSkills) {
                        if (!j.startsWith('hidden:')) notemp.addArray(player.additionalSkills[j]);
                    }
                    Object.keys(player.tempSkills)
                        .filter((skill) => {
                            if (notemp.includes(skill)) return false;
                            const expire = player.tempSkills[skill];
                            if (typeof expire === 'function') return expire(event, player, name);
                            if (get.objtype(expire) === 'object')
                                return roles.some((role) => {
                                    if (role !== 'global' && player !== event[role]) return false;
                                    if (Array.isArray(expire[role])) return expire[role].includes(name);
                                    return expire[role] === name;
                                });
                        })
                        .forEach((skill) => {
                            delete player.tempSkills[skill];
                            player.removeSkill(skill);
                        });
                    roles.forEach((role) => {
                        doing.addList(lib.hook.globalskill[role + '_' + name]);
                        doing.addList(lib.hook[player.playerid + `_${role}_` + name]);
                    });
                    delete doing.listAdded;
                    delete doing.addList;
                    doingList.push(doing);
                    player = player.nextSeat;
                } while (player && player !== start);
                doingList.unshift(firstDo);
                doingList.push(lastDo);
                if (allbool) {
                    const next = game.createEvent('arrangeTrigger', false, event);
                    next.setContent('arrangeTrigger');
                    next.doingList = doingList;
                    next._trigger = event;
                    next.triggername = name;
                    next.playerMap = playerMap;
                    event._triggering = next;
                    return next;
                }
                return null;
            }; //禁止循环触发
        } //禁止循环触发
        if (QQQ.config.右键简介) {
            get.nodeintro = function (node, simple, evt) {
                var uiintro = ui.create.dialog('hidden', 'notouchscroll');
                if (node.classList.contains('player') && !node.name) {
                    return uiintro;
                }
                var i, TS, intro, str;
                if (node._nointro) return;
                if (typeof node._customintro == 'function') {
                    if (node._customintro(uiintro, evt) === false) return;
                    if (evt) lib.placePoppedDialog(uiintro, evt);
                } else if (Array.isArray(node._customintro)) {
                    var caption = node._customintro[0];
                    var content = node._customintro[1];
                    if (typeof caption == 'function') {
                        caption = caption(node);
                    }
                    if (typeof content == 'function') {
                        content = content(node);
                    }
                    uiintro.add(caption);
                    uiintro.add(`<div class='text center' style='padding-bottom:5px'>${content}</div>`);
                } else if (node.classList.contains('player') || node.linkplayer) {
                    if (node.linkplayer) {
                        node = node.link;
                    }
                    let capt = get.translation(node.name);
                    const characterInfo = get.character(node.name),
                        sex = node.sex || characterInfo[0];
                    if (sex && sex != 'unknown' && lib.config.show_sex) capt += `&nbsp;&nbsp;${sex == 'none' ? '无' : get.translation(sex)}`;
                    const group = node.group;
                    if (group && group != 'unknown' && lib.config.show_group) capt += `&nbsp;&nbsp;${get.translation(group)}`;
                    uiintro.add(capt);
                    if (lib.characterTitle[node.name]) {
                        uiintro.addText(get.colorspan(lib.characterTitle[node.name]));
                    }
                    if (!node.noclick) {
                        const allShown = node.isUnderControl() || (!game.observe && game.me && game.me.hasSkillTag('viewHandcard', null, node, true));
                        const shownHs = node.getShownCards();
                        if (shownHs.length) {
                            uiintro.add(`<div class='text center'>明置的手牌</div>`);
                            uiintro.addSmall(shownHs);
                            if (allShown) {
                                var hs = node.getCards('h');
                                hs.removeArray(shownHs);
                                if (hs.length) {
                                    uiintro.add(`<div class='text center'>其他手牌</div>`);
                                    uiintro.addSmall(hs);
                                }
                            }
                        } else if (allShown) {
                            var hs = node.getCards('h');
                            if (hs.length) {
                                uiintro.add(`<div class='text center'>手牌</div>`);
                                uiintro.addSmall(hs);
                            }
                        }
                    }
                    //右键技能修改,同时显示所有隐藏技能
                    var skills = node.GS().slice(0);
                    game.expandSkills(skills); //展开
                    var skills2 = game.filterSkills(skills, node);
                    for (const skill of skills) {
                        const info = lib.skill[skill];
                        if (!info) {
                            alert(skill + '没有info');
                            continue;
                        } //QQQ
                        if (lib.translate[skill + '_ab']) {
                            TS = lib.translate[skill + '_ab'];
                        } else {
                            if (lib.translate[skill + '_info']) {
                                TS = get.translation(skill);
                            } else {
                                TS = skill;
                                lib.translate[skill + '_info'] = lib.translate[skill];
                            }
                        } //右键技能修改,同时显示所有隐藏技能
                        if (node.forbiddenSkills[skill]) {
                            var forbidstr = `<div style='opacity:0.5'><div class='skill'>${TS}</div><div>`;
                            if (node.forbiddenSkills[skill].length) {
                                forbidstr += `(与${get.translation(node.forbiddenSkills[skill])}冲突)<br>`;
                            } else {
                                forbidstr += '(双将禁用)<br>';
                            }
                            forbidstr += get.skillInfoTranslation(skill, node) + '</div></div>';
                            uiintro.add(forbidstr);
                        } //失效技能
                        else if (!skills2.includes(skill)) {
                            if (info.preHidden && get.mode() == 'guozhan') {
                                uiintro.add(`<div><div class='skill' style='opacity:0.5'>${TS}</div><div><span style='opacity:0.5'>${get.skillInfoTranslation(skill, node)}</span><br><div class='underlinenode on gray' style='position:relative;padding-left:0;padding-top:7px'>预亮技能</div></div></div>`);
                                var underlinenode = uiintro.content.lastChild.querySelector('.underlinenode');
                                if (_status.prehidden_skills.includes(skill)) {
                                    underlinenode.classList.remove('on');
                                }
                                underlinenode.link = skill;
                                underlinenode.listen(ui.click.hiddenskill);
                            } else uiintro.add(`<div style='opacity:0.5'><div class='skill'>${TS}</div><div>${get.skillInfoTranslation(skill, node)}</div></div>`);
                        } else if (info.temp || !node.skills.includes(skill) || info.thundertext) {
                            if (info.frequent || info.subfrequent) {
                                uiintro.add(`<div><div class='skill thundertext thunderauto'>${TS}</div><div class='thundertext thunderauto'>${get.skillInfoTranslation(skill, node)}<br><div class='underlinenode on gray' style='position:relative;padding-left:0;padding-top:7px'>自动发动</div></div></div>`);
                                var underlinenode = uiintro.content.lastChild.querySelector('.underlinenode');
                                if (info.frequent) {
                                    if (lib.config.autoskilllist.includes(skill)) {
                                        underlinenode.classList.remove('on');
                                    }
                                }
                                if (info.subfrequent) {
                                    for (var j = 0; j < info.subfrequent.length; j++) {
                                        if (lib.config.autoskilllist.includes(skill + '_' + info.subfrequent[j])) {
                                            underlinenode.classList.remove('on');
                                        }
                                    }
                                }
                                if (lib.config.autoskilllist.includes(skill)) {
                                    underlinenode.classList.remove('on');
                                }
                                underlinenode.link = skill;
                                underlinenode.listen(ui.click.autoskill2);
                            } else {
                                uiintro.add(`<div><div class='skill thundertext thunderauto'>${TS}</div><div class='thundertext thunderauto'>${get.skillInfoTranslation(skill, node)}</div></div>`);
                            }
                        } //临时技能
                        else if (info.frequent || info.subfrequent) {
                            uiintro.add(`<div><div class='skilln'>${TS}</div><div>${get.skillInfoTranslation(skill, node)}<br><div class='underlinenode on gray' style='position:relative;padding-left:0;padding-top:7px'>自动发动</div></div></div>`);
                            var underlinenode = uiintro.content.lastChild.querySelector('.underlinenode'); //取消括号
                            if (info.frequent) {
                                if (lib.config.autoskilllist.includes(skill)) {
                                    underlinenode.classList.remove('on');
                                }
                            }
                            if (info.subfrequent) {
                                for (var j = 0; j < info.subfrequent.length; j++) {
                                    if (lib.config.autoskilllist.includes(skill + '_' + info.subfrequent[j])) {
                                        underlinenode.classList.remove('on');
                                    }
                                }
                            }
                            if (lib.config.autoskilllist.includes(skill)) {
                                underlinenode.classList.remove('on');
                            }
                            underlinenode.link = skill;
                            underlinenode.listen(ui.click.autoskill2);
                        } else if (info.clickable && node.isIn() && node.isUnderControl(true)) {
                            var intronode = uiintro.add(`<div><div class='skilln'>${TS}</div><div>${get.skillInfoTranslation(skill, node)}<br><div class='menubutton skillbutton' style='position:relative;margin-top:5px'>点击发动</div></div></div>`).querySelector('.skillbutton');
                            if (!_status.gameStarted || (info.clickableFilter && !info.clickableFilter(node))) {
                                intronode.classList.add('disabled');
                                intronode.style.opacity = 0.5;
                            } //取消括号
                            else {
                                intronode.link = node;
                                intronode.func = info.clickable;
                                intronode.classList.add('pointerdiv');
                                intronode.listen(ui.click.skillbutton);
                            }
                        } else {
                            uiintro.add(`<div><div class='skilln'>${TS}</div><div>${get.skillInfoTranslation(skill, node)}</div></div>`);
                        } //取消括号
                        if (lib.translate[skill + '_append']) {
                            uiintro._place_text = uiintro.add(`<div class='text'>${lib.translate[skill + '_append']}</div>`);
                        }
                    } //右键技能修改,同时显示所有隐藏技能
                    if (lib.config.right_range && _status.gameStarted) {
                        uiintro.add(ui.create.div('.placeholder'));
                        var table, tr, td;
                        table = document.createElement('table');
                        tr = document.createElement('tr');
                        table.appendChild(tr);
                        td = document.createElement('td');
                        td.innerHTML = '距离';
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.innerHTML = '手牌';
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.innerHTML = '行动';
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.innerHTML = '伤害';
                        tr.appendChild(td);
                        tr = document.createElement('tr');
                        table.appendChild(tr);
                        td = document.createElement('td');
                        if (node == game.me || !game.me || !game.me.isIn()) {
                            td.innerHTML = '-';
                        } else {
                            var dist1 = get.numStr(Math.max(1, game.me.distanceTo(node)));
                            var dist2 = get.numStr(Math.max(1, node.distanceTo(game.me)));
                            if (dist1 == dist2) {
                                td.innerHTML = dist1;
                            } else {
                                td.innerHTML = dist1 + '/' + dist2;
                            }
                        }
                        tr.appendChild(td);
                        td = document.createElement('td');
                        let handcardLimit = node.getHandcardLimit();
                        td.innerHTML = `${node.countCards('h')}/${handcardLimit >= 999 ? '∞' : handcardLimit}`;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.innerHTML = node.phaseNumber;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        (function () {
                            num = 0;
                            for (var j = 0; j < node.stat.length; j++) {
                                if (typeof node.stat[j].damage == 'number') num += node.stat[j].damage;
                            }
                            td.innerHTML = num;
                        })();
                        tr.appendChild(td);
                        table.style.width = 'calc(100% - 20px)';
                        table.style.marginLeft = '10px';
                        uiintro.content.appendChild(table);
                        if (!lib.config.show_favourite) {
                            table.style.paddingBottom = '5px';
                        }
                    }
                    if (!simple || get.is.phoneLayout()) {
                        var es = node.getCards('e');
                        for (var i = 0; i < es.length; i++) {
                            var cardinfo = lib.card[es[i].name];
                            if (cardinfo && cardinfo.cardPrompt) uiintro.add(`<div><div class='skill'>${es[i].outerHTML}</div><div>${cardinfo.cardPrompt(es[i])}</div></div>`);
                            else uiintro.add(`<div><div class='skill'>${es[i].outerHTML}</div><div>${lib.translate[es[i].name + '_info']}</div></div>`);
                            uiintro.content.lastChild.querySelector('.skill>.card').style.transform = '';
                            if (lib.translate[es[i].name + '_append']) {
                                uiintro.add(`<div class='text'>${lib.translate[es[i].name + '_append']}</div>`);
                            }
                        }
                        var js = node.getCards('j');
                        for (var i = 0; i < js.length; i++) {
                            if (js[i].viewAs && js[i].viewAs != js[i].name) {
                                uiintro.add(`<div><div class='skill'>${js[i].outerHTML}</div><div>${lib.translate[js[i].viewAs]}:${lib.translate[js[i].viewAs + '_info']}</div></div>`);
                            } else {
                                uiintro.add(`<div><div class='skill'>${js[i].outerHTML}</div><div>${lib.translate[js[i].name + '_info']}</div></div>`);
                            }
                            uiintro.content.lastChild.querySelector('.skill>.card').style.transform = '';
                        }
                        if (get.is.phoneLayout()) {
                            var markCoutainer = ui.create.div('.mark-container.marks');
                            for (var i in node.marks) {
                                var nodemark = node.marks[i].cloneNode(true);
                                nodemark.classList.add('pointerdiv');
                                nodemark.link = node.marks[i];
                                nodemark.style.transform = '';
                                markCoutainer.appendChild(nodemark);
                                nodemark.listen(function () {
                                    uiintro.noresume = true;
                                    var rect = this.link.getBoundingClientRect();
                                    ui.click.intro.call(this.link, {
                                        clientX: rect.left + rect.width,
                                        clientY: rect.top + rect.height / 2,
                                    });
                                    if (lib.config.touchscreen) {
                                        uiintro._close();
                                    }
                                });
                            }
                            if (markCoutainer.childElementCount) {
                                uiintro.addText('标记');
                                uiintro.add(markCoutainer);
                            }
                        }
                    }
                    if (!game.observe && _status.gameStarted && game.me && node != game.me) {
                        ui.throwEmotion = [];
                        uiintro.addText('发送交互表情');
                        var click = function () {
                            if (_status.dragged) return;
                            if (_status.justdragged) return;
                            if (_status.throwEmotionWait) return;
                            var emotion = this.link;
                            if (game.online) {
                                game.send('throwEmotion', node, emotion);
                            } else game.me.throwEmotion(node, emotion);
                            uiintro._close();
                            _status.throwEmotionWait = true;
                            setTimeout(
                                function () {
                                    _status.throwEmotionWait = false;
                                    if (ui.throwEmotion) {
                                        for (const i of ui.throwEmotion) i.classList.remove('exclude');
                                    }
                                },
                                emotion == 'flower' || emotion == 'egg' ? 500 : 5000
                            );
                        };
                        var td;
                        var table = document.createElement('div');
                        table.classList.add('add-setting');
                        table.style.margin = '0';
                        table.style.width = '100%';
                        table.style.position = 'relative';
                        var listi = ['flower', 'egg'];
                        for (var i = 0; i < listi.length; i++) {
                            td = ui.create.div('.menubutton.reduce_radius.pointerdiv.tdnode');
                            ui.throwEmotion.add(td);
                            if (_status.throwEmotionWait) td.classList.add('exclude');
                            td.link = listi[i];
                            table.appendChild(td);
                            td.innerHTML = `<span>${get.translation(listi[i])}</span>`;
                            td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', click);
                        }
                        uiintro.content.appendChild(table);
                        table = document.createElement('div');
                        table.classList.add('add-setting');
                        table.style.margin = '0';
                        table.style.width = '100%';
                        table.style.position = 'relative';
                        var listi = ['wine', 'shoe'];
                        if (game.me.storage.zhuSkill_shanli) listi = ['yuxisx', 'jiasuo'];
                        for (var i = 0; i < listi.length; i++) {
                            td = ui.create.div('.menubutton.reduce_radius.pointerdiv.tdnode');
                            ui.throwEmotion.add(td);
                            if (_status.throwEmotionWait) td.classList.add('exclude');
                            td.link = listi[i];
                            table.appendChild(td);
                            td.innerHTML = `<span>${get.translation(listi[i])}</span>`;
                            td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', click);
                        }
                        uiintro.content.appendChild(table);
                    }
                    var modepack = lib.characterPack['mode_' + get.mode()];
                    if (lib.config.show_favourite && lib.character[node.name] && game.players.includes(node) && (!modepack || !modepack[node.name]) && (!simple || get.is.phoneLayout())) {
                        var addFavourite = ui.create.div('.text.center.pointerdiv');
                        addFavourite.link = node.name;
                        if (lib.config.favouriteCharacter.includes(node.name)) {
                            addFavourite.innerHTML = '移除收藏';
                        } else {
                            addFavourite.innerHTML = '添加收藏';
                        }
                        addFavourite.listen(ui.click.favouriteCharacter);
                        uiintro.add(addFavourite);
                    }
                    if (!simple || get.is.phoneLayout()) {
                        if ((lib.config.change_skin || lib.skin) && !node.isUnseen()) {
                            var num = 1;
                            var introadded = false;
                            var createButtons = function (num, avatar2) {
                                if (!introadded) {
                                    introadded = true;
                                    uiintro.add(`<div class='text center'>更改皮肤</div>`);
                                }
                                var buttons = ui.create.div('.buttons.smallzoom.scrollbuttons');
                                lib.setMousewheel(buttons);
                                var nameskin = avatar2 ? node.name2 : node.name1;
                                var nameskin2 = nameskin;
                                var gzbool = false;
                                if (nameskin.startsWith('gz_shibing')) {
                                    nameskin = nameskin.slice(3, 11);
                                } else if (nameskin.startsWith('gz_')) {
                                    nameskin = nameskin.slice(3);
                                    gzbool = true;
                                }
                                for (var i = 0; i <= num; i++) {
                                    var button = ui.create.div('.button.character.pointerdiv', buttons, function () {
                                        if (this._link) {
                                            if (avatar2) {
                                                lib.config.skin[nameskin] = this._link;
                                                node.node.avatar2.style.backgroundImage = this.style.backgroundImage;
                                            } else {
                                                lib.config.skin[nameskin] = this._link;
                                                node.node.avatar.style.backgroundImage = this.style.backgroundImage;
                                            }
                                        } else {
                                            delete lib.config.skin[nameskin];
                                            if (avatar2) {
                                                if (gzbool && lib.character[nameskin2][4].includes('gzskin') && lib.config.mode_config.guozhan.guozhanSkin) node.node.avatar2.setBackground(nameskin2, 'character');
                                                else node.node.avatar2.setBackground(nameskin, 'character');
                                            } else {
                                                if (gzbool && lib.character[nameskin2][4].includes('gzskin') && lib.config.mode_config.guozhan.guozhanSkin) node.node.avatar.setBackground(nameskin2, 'character');
                                                else node.node.avatar.setBackground(nameskin, 'character');
                                            }
                                        }
                                        game.saveConfig('skin', lib.config.skin);
                                    });
                                    button._link = i;
                                    if (i) {
                                        button.setBackgroundImage(`image/skin/${nameskin}/${i}.jpg`);
                                    } else {
                                        if (gzbool && lib.character[nameskin2][4].includes('gzskin') && lib.config.mode_config.guozhan.guozhanSkin) button.setBackground(nameskin2, 'character', 'noskin');
                                        else button.setBackground(nameskin, 'character', 'noskin');
                                    }
                                }
                                uiintro.add(buttons);
                            };
                            var loadImage = function (avatar2) {
                                var img = new Image();
                                img.onload = function () {
                                    num++;
                                    loadImage(avatar2);
                                };
                                img.onerror = function () {
                                    num--;
                                    if (num > 0) {
                                        createButtons(num, avatar2);
                                    }
                                    if (!avatar2) {
                                        if (!node.classList.contains('unseen2') && node.name2) {
                                            num = 1;
                                            loadImage(true);
                                        }
                                    }
                                };
                                var nameskin = avatar2 ? node.name2 : node.name1;
                                var nameskin2 = nameskin;
                                var gzbool = false;
                                if (nameskin.startsWith('gz_shibing')) {
                                    nameskin = nameskin.slice(3, 11);
                                } else if (nameskin.startsWith('gz_')) {
                                    nameskin = nameskin.slice(3);
                                    gzbool = true;
                                }
                                img.src = `image/skin/${nameskin}/${num}.jpg`;
                            };
                            if (lib.config.change_skin) {
                                if (!node.isUnseen(0)) {
                                    loadImage();
                                } else if (node.name2) {
                                    loadImage(true);
                                }
                            } else {
                                setTimeout(function () {
                                    var nameskin1 = node.name1;
                                    var nameskin2 = node.name2;
                                    if (nameskin1 && nameskin1.startsWith('gz_')) {
                                        nameskin1 = nameskin1.slice(3);
                                    }
                                    if (nameskin2 && nameskin2.startsWith('gz_')) {
                                        nameskin2 = nameskin2.slice(3);
                                    }
                                    if (!node.isUnseen(0) && lib.skin[nameskin1]) {
                                        createButtons(lib.skin[nameskin1]);
                                    }
                                    if (!node.isUnseen(1) && lib.skin[nameskin2]) {
                                        createButtons(lib.skin[nameskin2], true);
                                    }
                                });
                            }
                        }
                    }
                    uiintro.add(ui.create.div('.placeholder.slim'));
                } //右键技能修改,同时显示所有隐藏技能
                else if (node.classList.contains('mark') && node.info && node.parentNode && node.parentNode.parentNode && node.parentNode.parentNode.classList.contains('player')) {
                    var info = node.info;
                    var player = node.parentNode.parentNode;
                    if (info.name) {
                        if (typeof info.name == 'function') {
                            var named = info.name(player.storage[node.skill], player);
                            if (named) {
                                uiintro.add(named);
                            }
                        } else {
                            uiintro.add(info.name);
                        }
                    } else if (info.name !== false) {
                        uiintro.add(get.translation(node.skill));
                    }
                    if (typeof info.id == 'string' && info.id.startsWith('subplayer') && player.isUnderControl(true) && player.storage[info.id] && !_status.video) {
                        var storage = player.storage[info.id];
                        uiintro.addText(`当前体力:${player.hp}/` + player.maxHp);
                        if (storage.hs.length) {
                            uiintro.addText('手牌区');
                            uiintro.addSmall(storage.hs);
                        }
                        if (storage.es.length) {
                            uiintro.addText('装备区');
                            uiintro.addSmall(storage.es);
                        }
                    }
                    if (typeof info.mark == 'function') {
                        var stint = info.mark(uiintro, player.storage[node.skill], player);
                        if (stint) {
                            var placetext = uiintro.add(`<div class='text' style='display:inline'>${stint}</div>`);
                            if (!stint.startsWith(`<div class='skill'`)) {
                                uiintro._place_text = placetext;
                            }
                        }
                    } else {
                        var stint = get.storageintro(info.content, player.storage[node.skill], player, uiintro, node.skill);
                        if (stint) {
                            if (stint[0] == '@') {
                                uiintro.add(`<div class='caption'>${stint.slice(1)}</div>`);
                            } else {
                                var placetext = uiintro.add(`<div class='text' style='display:inline'>${stint}</div>`);
                                if (!stint.startsWith(`<div class='skill'`)) {
                                    uiintro._place_text = placetext;
                                }
                            }
                        }
                    }
                    uiintro.add(ui.create.div('.placeholder.slim'));
                } else if (node.classList.contains('card')) {
                    //卡牌长按介绍
                    if (ui.arena.classList.contains('observe') && node.parentNode.classList.contains('handcards')) {
                        return;
                    }
                    var name = node.name;
                    if (node.parentNode.cardMod) {
                        var moded = false;
                        for (var i in node.parentNode.cardMod) {
                            var item = node.parentNode.cardMod[i](node);
                            if (Array.isArray(item)) {
                                moded = true;
                                uiintro.add(item[0]);
                                uiintro._place_text = uiintro.add(`<div class='text' style='display:inline'>${item[1]}</div>`);
                            }
                        }
                        if (moded) return uiintro;
                    }
                    if (node.link && node.link.name && lib.card[node.link.name]) {
                        name = node.link.name;
                    }
                    if (get.position(node) == 'j' && node.viewAs && node.viewAs != name) {
                        uiintro.add(get.translation(node.viewAs));
                        uiintro.add(`<div class='text center'>(${get.translation(get.translation(node))})</div>`);
                        // uiintro.add(get.translation(node.viewAs)+`<br><div class='text center' style='padding-top:5px;'>(${get.translation(node)})</div>`);
                        uiintro.nosub = true;
                        name = node.viewAs;
                    } else {
                        uiintro.add(get.translation(node));
                    }
                    if (node._banning) {
                        var clickBanned = function () {
                            var banned = lib.config[this.bannedname] || [];
                            if (banned.includes(name)) {
                                banned.remove(name);
                            } else {
                                banned.push(name);
                            }
                            game.saveConfig(this.bannedname, banned);
                            this.classList.toggle('on');
                            if (node.updateBanned) {
                                node.updateBanned();
                            }
                        };
                        var modeorder = lib.config.modeorder || [];
                        for (var i in lib.mode) {
                            modeorder.add(i);
                        }
                        var list = [];
                        uiintro.contentContainer.listen(function (e) {
                            ui.click.touchpop();
                            e.stopPropagation();
                        });
                        for (var i = 0; i < modeorder.length; i++) {
                            if (node._banning == 'online') {
                                if (!lib.mode[modeorder[i]].connect) continue;
                            } else if (modeorder[i] == 'connect' || modeorder[i] == 'brawl') {
                                continue;
                            }
                            if (lib.config.all.mode.includes(modeorder[i])) {
                                list.push(modeorder[i]);
                            }
                        }
                        if (lib.card[name] && lib.card[name].type == 'trick') list.push('zhinang_tricks');
                        var page = ui.create.div('.menu-buttons.configpopped', uiintro.content);
                        var banall = false;
                        for (var i = 0; i < list.length; i++) {
                            var cfg = ui.create.div('.config', list[i] == 'zhinang_tricks' ? '设为智囊' : lib.translate[list[i]] + '模式', page);
                            cfg.classList.add('toggle');
                            if (list[i] == 'zhinang_tricks') {
                                cfg.bannedname = (node._banning == 'offline' ? '' : 'connect_') + 'zhinang_tricks';
                            } else if (node._banning == 'offline') {
                                cfg.bannedname = list[i] + '_bannedcards';
                            } else {
                                cfg.bannedname = `connect_${list[i]}_bannedcards`;
                            }
                            cfg.listen(clickBanned);
                            ui.create.div(ui.create.div(cfg));
                            var banned = lib.config[cfg.bannedname] || [];
                            if (banned.includes(name) == (list[i] == 'zhinang_tricks')) {
                                cfg.classList.add('on');
                                banall = true;
                            }
                        }
                        ui.create.div('.menubutton.pointerdiv', banall ? '全部禁用' : '全部启用', uiintro.content, function () {
                            if (this.innerHTML == '全部禁用') {
                                for (var i = 0; i < page.childElementCount; i++) {
                                    if (page.childNodes[i].bannedname.indexOf('zhinang_tricks') == -1 && page.childNodes[i].bannedname && page.childNodes[i].classList.contains('on')) {
                                        clickBanned.call(page.childNodes[i]);
                                    }
                                }
                                this.innerHTML = '全部启用';
                            } else {
                                for (var i = 0; i < page.childElementCount; i++) {
                                    if (page.childNodes[i].bannedname.indexOf('zhinang_tricks') == -1 && page.childNodes[i].bannedname && !page.childNodes[i].classList.contains('on')) {
                                        clickBanned.call(page.childNodes[i]);
                                    }
                                }
                                this.innerHTML = '全部禁用';
                            }
                        }).style.marginTop = '-10px';
                        ui.create.div('.placeholder.slim', uiintro.content);
                    } else {
                        if (lib.translate[name + '_info']) {
                            if (!uiintro.nosub) {
                                if (lib.card[name] && lib.card[name].derivation) {
                                    if (typeof lib.card[name].derivation == 'string') {
                                        uiintro.add(`<div class='text center'>来源:${get.translation(lib.card[name].derivation)}</div>`);
                                    } else if (lib.card[name].derivationpack) {
                                        uiintro.add(`<div class='text center'>来源:${get.translation(lib.card[name].derivationpack + '_card_config')}包</div>`);
                                    }
                                }
                                let typeinfo = '';
                                if (lib.card[name].unique) {
                                    typeinfo += `特殊${get.translation(lib.card[name].type)}牌`;
                                } else if (lib.card[name].type && lib.translate[lib.card[name].type]) {
                                    typeinfo += get.translation(lib.card[name].type) + '牌';
                                }
                                if (get.subtype(name, false)) {
                                    typeinfo += '-' + get.translation(get.subtype(name, false));
                                }
                                if (typeinfo) {
                                    uiintro.add(`<div class='text center'>${typeinfo}</div>`);
                                }
                                if (lib.card[name].unique && lib.card[name].type == 'equip') {
                                    if (lib.cardPile.guozhan && lib.cardPack.guozhan.includes(name)) {
                                        uiintro.add(`<div class='text center'>专属装备</div>`).style.marginTop = '-5px';
                                    } else {
                                        uiintro.add(`<div class='text center'>特殊装备</div>`).style.marginTop = '-5px';
                                    }
                                }
                                if (lib.card[name] && lib.card[name].addinfomenu) {
                                    uiintro.add(`<div class='text center'>${lib.card[name].addinfomenu}</div>`);
                                }
                                if (get.subtype(name, false) == 'equip1') {
                                    var added = false;
                                    if (lib.card[node.name] && lib.card[node.name].distance) {
                                        var dist = lib.card[node.name].distance;
                                        if (dist.attackFrom) {
                                            added = true;
                                            uiintro.add(`<div class='text center'>攻击范围:${-dist.attackFrom + 1}</div>`);
                                        }
                                    }
                                    if (!added) {
                                        uiintro.add(`<div class='text center'>攻击范围:1</div>`);
                                    }
                                }
                            }
                            if (lib.card[name].cardPrompt) {
                                var str = lib.card[name].cardPrompt(node.link || node),
                                    placetext = uiintro.add(`<div class='text' style='display:inline'>${str}</div>`);
                                if (!str.startsWith(`<div class='skill'`)) {
                                    uiintro._place_text = placetext;
                                }
                            } else if (lib.translate[name + '_info']) {
                                var placetext = uiintro.add(`<div class='text' style='display:inline'>${lib.translate[name + '_info']}</div>`);
                                if (!lib.translate[name + '_info'].startsWith(`<div class='skill'`)) {
                                    uiintro._place_text = placetext;
                                }
                            }
                            if (get.is.yingbianConditional(node.link || node)) {
                                const yingbianEffects = get.yingbianEffects(node.link || node);
                                if (!yingbianEffects.length) {
                                    const defaultYingbianEffect = get.defaultYingbianEffect(node.link || node);
                                    if (lib.yingbian.prompt.has(defaultYingbianEffect)) yingbianEffects.push(defaultYingbianEffect);
                                }
                                if (yingbianEffects.length) uiintro.add(`<div class='text' style='font-family: yuanli'>应变:${yingbianEffects.map((value) => lib.yingbian.prompt.get(value)).join(';')}</div>`);
                            }
                            if (lib.translate[name + '_append']) {
                                uiintro.add(`<div class='text' style='display:inline'>${lib.translate[name + '_append']}</div>`);
                            }
                        }
                        uiintro.add(ui.create.div('.placeholder.slim'));
                    }
                } else if (node.classList.contains('character')) {
                    const character = node.link,
                        characterInfo = get.character(node.link);
                    let capt = get.translation(character);
                    if (characterInfo) {
                        const infoSex = characterInfo[0];
                        if (infoSex && lib.config.show_sex) capt += `&nbsp;&nbsp;${infoSex == 'none' ? '无' : lib.translate[infoSex]}`;
                        const infoGroup = characterInfo[1];
                        if (infoGroup && lib.config.show_group) {
                            const group = get.is.double(character, true);
                            if (group) capt += `&nbsp;&nbsp;${group.map((value) => get.translation(value)).join('/')}`;
                            else capt += `&nbsp;&nbsp;${lib.translate[infoGroup]}`;
                        }
                    }
                    uiintro.add(capt);
                    if (lib.characterTitle[node.link]) {
                        uiintro.addText(get.colorspan(lib.characterTitle[node.link]));
                    }
                    if (node._banning) {
                        var clickBanned = function () {
                            var banned = lib.config[this.bannedname] || [];
                            if (banned.includes(character)) {
                                banned.remove(character);
                            } else {
                                banned.push(character);
                            }
                            game.saveConfig(this.bannedname, banned);
                            this.classList.toggle('on');
                            if (node.updateBanned) {
                                node.updateBanned();
                            }
                        };
                        var modeorder = lib.config.modeorder || [];
                        for (var i in lib.mode) {
                            modeorder.add(i);
                        }
                        var list = [];
                        uiintro.contentContainer.listen(function (e) {
                            ui.click.touchpop();
                            e.stopPropagation();
                        });
                        for (var i = 0; i < modeorder.length; i++) {
                            if (node._banning == 'online') {
                                if (!lib.mode[modeorder[i]].connect) continue;
                                if (!lib.config[`connect_${modeorder[i]}_banned`]) {
                                    lib.config[`connect_${modeorder[i]}_banned`] = [];
                                }
                            } else if (modeorder[i] == 'connect' || modeorder[i] == 'brawl') {
                                continue;
                            }
                            if (lib.config.all.mode.includes(modeorder[i])) {
                                list.push(modeorder[i]);
                            }
                        }
                        var page = ui.create.div('.menu-buttons.configpopped', uiintro.content);
                        var banall = false;
                        for (var i = 0; i < list.length; i++) {
                            var cfg = ui.create.div('.config', lib.translate[list[i]] + '模式', page);
                            cfg.classList.add('toggle');
                            if (node._banning == 'offline') {
                                cfg.bannedname = list[i] + '_banned';
                            } else {
                                cfg.bannedname = `connect_${list[i]}_banned`;
                            }
                            cfg.listen(clickBanned);
                            ui.create.div(ui.create.div(cfg));
                            var banned = lib.config[cfg.bannedname] || [];
                            if (!banned.includes(character)) {
                                cfg.classList.add('on');
                                banall = true;
                            }
                        }
                        if (node._banning == 'offline') {
                            var cfg = ui.create.div('.config', '随机选将可用', page);
                            cfg.classList.add('toggle');
                            cfg.listen(function () {
                                this.classList.toggle('on');
                                if (this.classList.contains('on')) {
                                    lib.config.forbidai_user.remove(character);
                                } else {
                                    lib.config.forbidai_user.add(character);
                                }
                                game.saveConfig('forbidai_user', lib.config.forbidai_user);
                            });
                            ui.create.div(ui.create.div(cfg));
                            if (!lib.config.forbidai_user.includes(character)) {
                                cfg.classList.add('on');
                            }
                        }
                        ui.create.div('.menubutton.pointerdiv', banall ? '全部禁用' : '全部启用', uiintro.content, function () {
                            if (this.innerHTML == '全部禁用') {
                                for (var i = 0; i < page.childElementCount; i++) {
                                    if (page.childNodes[i].bannedname && page.childNodes[i].classList.contains('on')) {
                                        clickBanned.call(page.childNodes[i]);
                                    }
                                }
                                this.innerHTML = '全部启用';
                            } else {
                                for (var i = 0; i < page.childElementCount; i++) {
                                    if (page.childNodes[i].bannedname && !page.childNodes[i].classList.contains('on')) {
                                        clickBanned.call(page.childNodes[i]);
                                    }
                                }
                                this.innerHTML = '全部禁用';
                            }
                        }).style.marginTop = '-10px';
                        ui.create.div('.placeholder.slim', uiintro.content);
                    } else {
                        var infoitem = get.character(character);
                        const skills = infoitem[3].slice();
                        game.expandSkills(skills); //展开
                        for (const skill of skills) {
                            if (lib.translate[skill + '_ab']) {
                                TS = lib.translate[skill + '_ab'];
                            } else {
                                if (lib.translate[skill + '_info']) {
                                    TS = get.translation(skill);
                                } //右键显示技能为全部
                                else {
                                    TS = skill;
                                    lib.translate[skill + '_info'] = lib.translate[skill];
                                }
                            }
                            uiintro.add(`<div><div class='skilln'>${TS}</div><div>${get.skillInfoTranslation(skill)}</div></div>`);
                            //取消括号
                            if (lib.translate[skill + '_append']) {
                                uiintro._place_text = uiintro.add(`<div class='text'>${lib.translate[skill + '_append']}</div>`);
                            }
                        }
                        var modepack = lib.characterPack['mode_' + get.mode()];
                        if (lib.config.show_favourite && lib.character[node.link] && (!modepack || !modepack[node.link]) && (!simple || get.is.phoneLayout())) {
                            var addFavourite = ui.create.div('.text.center.pointerdiv');
                            addFavourite.link = node.link;
                            addFavourite.style.marginBottom = '15px';
                            if (lib.config.favouriteCharacter.includes(node.link)) {
                                addFavourite.innerHTML = '移除收藏';
                            } else {
                                addFavourite.innerHTML = '添加收藏';
                            }
                            addFavourite.listen(ui.click.favouriteCharacter);
                            uiintro.add(addFavourite);
                        } else {
                            uiintro.add(ui.create.div('.placeholder.slim'));
                        }
                        var addskin = false;
                        if (node.parentNode.classList.contains('menu-buttons')) {
                            addskin = !lib.config.show_charactercard;
                        } else {
                            addskin = lib.config.change_skin || lib.skin;
                        }
                        if (addskin && (!simple || get.is.phoneLayout())) {
                            var num = 1;
                            var introadded = false;
                            var nameskin = node.link;
                            var nameskin2 = nameskin;
                            var gzbool = false;
                            if (nameskin.startsWith('gz_shibing')) {
                                nameskin = nameskin.slice(3, 11);
                            } else if (nameskin.startsWith('gz_')) {
                                nameskin = nameskin.slice(3);
                                gzbool = true;
                            }
                            var createButtons = function (num) {
                                if (!num) return;
                                if (!introadded) {
                                    introadded = true;
                                    uiintro.add(`<div class='text center'>更改皮肤</div>`);
                                }
                                var buttons = ui.create.div('.buttons.smallzoom.scrollbuttons');
                                lib.setMousewheel(buttons);
                                for (var i = 0; i <= num; i++) {
                                    var button = ui.create.div('.button.character.pointerdiv', buttons, function () {
                                        if (this._link) {
                                            lib.config.skin[nameskin] = this._link;
                                            node.style.backgroundImage = this.style.backgroundImage;
                                            game.saveConfig('skin', lib.config.skin);
                                        } else {
                                            delete lib.config.skin[nameskin];
                                            if (gzbool && lib.character[nameskin2][4].includes('gzskin') && lib.config.mode_config.guozhan.guozhanSkin) node.setBackground(nameskin2, 'character');
                                            else node.setBackground(nameskin, 'character');
                                            game.saveConfig('skin', lib.config.skin);
                                        }
                                    });
                                    button._link = i;
                                    if (i) {
                                        button.setBackgroundImage(`image/skin/${nameskin}/${i}.jpg`);
                                    } else {
                                        if (gzbool && lib.character[nameskin2][4].includes('gzskin') && lib.config.mode_config.guozhan.guozhanSkin) button.setBackground(nameskin2, 'character', 'noskin');
                                        else button.setBackground(nameskin, 'character', 'noskin');
                                    }
                                }
                                uiintro.add(buttons);
                            };
                            var loadImage = function () {
                                var img = new Image();
                                img.onload = function () {
                                    num++;
                                    loadImage();
                                };
                                img.onerror = function () {
                                    num--;
                                    createButtons(num);
                                };
                                img.src = `image/skin/${nameskin}/${num}.jpg`;
                            };
                            if (lib.config.change_skin) {
                                loadImage();
                            } else {
                                setTimeout(function () {
                                    createButtons(lib.skin[nameskin]);
                                });
                            }
                        }
                    }
                } else if (node.classList.contains('equips') && ui.arena.classList.contains('selecting')) {
                    (function () {
                        uiintro.add('选择装备');
                        uiintro.addSmall(
                            Array.from(node.childNodes).filter((node) => !node.classList.contains('feichu')),
                            true
                        );
                        uiintro.clickintro = true;
                        ui.control.hide();
                        uiintro._onclose = function () {
                            ui.control.show();
                        };
                        var confirmbutton;
                        for (var i = 0; i < uiintro.buttons.length; i++) {
                            var button = uiintro.buttons[i];
                            button.classList.add('pointerdiv');
                            if (button.link.classList.contains('selected')) {
                                button.classList.add('selected');
                            }
                            button.listen(function (e) {
                                ui.click.card.call(this.link, 'popequip');
                                ui.click.window.call(ui.window, e);
                                if (this.link.classList.contains('selected')) {
                                    this.classList.add('selected');
                                } else {
                                    this.classList.remove('selected');
                                }
                                if (ui.confirm && ui.confirm.str && ui.confirm.str.includes('o')) {
                                    confirmbutton.classList.remove('disabled');
                                } else {
                                    confirmbutton.classList.add('disabled');
                                }
                            });
                        }
                        var buttoncontainer = uiintro.add(ui.create.div());
                        buttoncontainer.style.display = 'block';
                        confirmbutton = ui.create.div(
                            '.menubutton.large.pointerdiv',
                            '确定',
                            function () {
                                if (ui.confirm && ui.confirm.str && ui.confirm.str.includes('o')) {
                                    uiintro._clickintro();
                                    ui.click.ok(ui.confirm.firstChild);
                                }
                            },
                            buttoncontainer
                        );
                        confirmbutton.style.position = 'relative';
                        setTimeout(function () {
                            if (ui.confirm && ui.confirm.str && ui.confirm.str.includes('o')) {
                                confirmbutton.classList.remove('disabled');
                            } else {
                                confirmbutton.classList.add('disabled');
                            }
                        }, 300);
                    })();
                } else if (node.classList.contains('identity') && node.dataset.career) {
                    var career = node.dataset.career;
                    uiintro.add(get.translation(career));
                    uiintro.add(`<div class='text center' style='padding-bottom:5px'>${lib.translate['_' + career + '_skill_info']}</div>`);
                } else if (node.classList.contains('skillbar')) {
                    if (node == ui.friendBar) {
                        uiintro.add('友方怒气值');
                        uiintro.add(`<div class='text center' style='padding-bottom:5px'>${_status.friendRage}/100</div>`);
                    } else if (node == ui.enemyBar) {
                        uiintro.add('敌方怒气值');
                        uiintro.add(`<div class='text center' style='padding-bottom:5px'>${_status.enemyRage}/100</div>`);
                    }
                } else if (node.parentNode == ui.historybar) {
                    if (node.dead) {
                        if (!node.source || node.source == node.player) {
                            uiintro.add(`<div class='text center'>${get.translation(node.player)}阵亡</div>`);
                            uiintro.addSmall([node.player]);
                        } else {
                            uiintro.add(`<div class='text center'>${get.translation(node.player)}被${get.translation(node.source)}杀害</div>`);
                            uiintro.addSmall([node.source]);
                        }
                    }
                    if (node.skill) {
                        uiintro.add(`<div class='text center'>${get.translation(node.skill, 'skill')}</div>`);
                        uiintro._place_text = uiintro.add(`<div class='text' style='display:inline'>${get.translation(node.skill, 'info')}</div>`);
                    }
                    if (node.targets && get.itemtype(node.targets) == 'players') {
                        uiintro.add(`<div class='text center'>目标</div>`);
                        uiintro.addSmall(node.targets);
                    }
                    if (node.players && node.players.length > 1) {
                        uiintro.add(`<div class='text center'>使用者</div>`);
                        uiintro.addSmall(node.players);
                    }
                    if (node.cards && node.cards.length) {
                        uiintro.add(`<div class='text center'>卡牌</div>`);
                        uiintro.addSmall(node.cards);
                    }
                    for (var i = 0; i < node.added.length; i++) {
                        uiintro.add(node.added[i]);
                    }
                    if (node.added.length) {
                        uiintro.add(ui.create.div('.placeholder.slim'));
                    }
                    if (uiintro.content.firstChild) {
                        uiintro.content.firstChild.style.paddingTop = '3px';
                    }
                }
                if (lib.config.touchscreen) {
                    lib.setScroll(uiintro.contentContainer);
                }
                uiintro.style.width = QQQ.config.右键宽度修改;
                return uiintro;
            }; //技能右键简介
        } //技能右键简介增加信息
        if (QQQ.config.属性杀) {
            game.addNature('snow', '雪', {
                linked: true,
                order: 1000,
            }); //添加杀的属性
            game.addNature('blood', '血', {
                linked: true,
                order: 1000,
            }); //添加杀的属性
            game.addNature('poison', '毒', {
                linked: true,
                order: 1000,
            }); //添加杀的属性
            game.addNature('gold', '金', {
                linked: true,
                order: 1000,
            }); //添加杀的属性
            game.addNature('water', '水', {
                linked: true,
                order: 1000,
            }); //添加杀的属性
            game.addNature('ScarletRot', '猩红腐败', {
                linked: true,
                order: 1000,
            }); //添加杀的属性
            for (const i of ['gold', 'poison', 'blood', 'snow', 'kami', 'water', 'ice', 'ScarletRot']) {
                lib.card.sha.ai.tag[i + 'Damage'] = eval(` (card, nature) => {
                    if (game.hasNature(card, '${i}')) return 1;
                }`);
                lib.card.sha.nature.add(i);
            }
            for (const i of Array.from(lib.nature.keys())) {
                var j = 9;
                while (j--) {
                    lib.card.list.push([lib.suits.randomGet(), lib.number.randomGet(), 'sha', i]);
                }
            }
            lib.skill._goldsha = {
                trigger: {
                    player: 'useCard0',
                },
                equipSkill: false,
                forced: true,
                ruleSkill: true,
                shaRelated: true,
                filter(event, player) {
                    return event.card && event.card.nature == 'gold';
                },
                async content(event, trigger, player) {
                    for (const i of trigger.targets) {
                        i.randomDiscard(1);
                    }
                    trigger.directHit.addArray(trigger.targets);
                },
            }; //--------金杀/指定目标后
            lib.skill.icesha_skill = {
                trigger: {
                    source: 'damageBegin',
                },
                equipSkill: false,
                forced: true,
                ruleSkill: true,
                shaRelated: true,
                filter(event, player) {
                    return event.nature == 'ice';
                },
                content() {
                    var Q = trigger.player.countCards('he');
                    if (Q >= 4 * trigger.num) {
                        trigger.cancel();
                        player.discardPlayerCard(trigger.player, 'he', 4 * trigger.num, true);
                    }
                    if (Q < 4 * trigger.num) trigger.player.discard(trigger.player.getCards('he'));
                },
            }; //--------冰杀/造成伤害前
            lib.skill._kamisha = {
                trigger: {
                    player: 'damageBegin',
                },
                equipSkill: false,
                forced: true,
                ruleSkill: true,
                shaRelated: true,
                filter(event, player) {
                    return event.nature == 'kami';
                },
                content() {
                    player.loseMaxHp(trigger.num).source = trigger.source;
                    trigger.cancel();
                },
            }; //--------神杀/造成伤害前
        } //属性杀全局技能
        if (QQQ.config.收藏武将修改) {
            lib.config.favouriteCharacter = [
                'wu_zhugeliang',
                'shen_huangzhong',
                'dc_zhouxuān',
                'yue_caiwenji',
                'shen_zhangfei', //5
                'wu_luxun',
                'star_caoren',
                'dc_zhangmancheng',
                'yue_xiaoqiao',
                'ol_feiyi', //10
                'dc_liuye',
                'caoxian',
                'dc_zhaoyǎn',
                'tenggongzhu',
                'zhoubuyi', //15
                'chenshi',
                'dc_huangwudie',
                'wu_guanyu',
                'dc_wangjun',
                'zhugejing', //20
                'dc_sunchen',
                're_sunyi',
                'clan_zhongyan',
                're_liuzan',
                'dc_tengfanglan', //25
                'wupu',
                'xuelingyun',
                'dc_simashi',
                'yj_sb_guojia',
                'mengyou', //30
                'niufu',
                'zerong',
                'shen_guojia',
                'yue_daqiao',
                'yue_miheng', //35
                'dc_sb_jushou',
                'QQQ_哦哦',
                'QQQ_测试',
            ]; //收藏武将修改
            game.saveConfig('favouriteCharacter', lib.config.favouriteCharacter);
            Reflect.defineProperty(lib.config, 'image_background', {
                get() {
                    return 'ol_bg';
                },
                set() { },
                configurable: false,
            });
            game.saveConfig('image_background', 'ol_bg');
            Reflect.defineProperty(lib.config, 'theme', {
                get() {
                    return 'simple';
                },
                set() { },
                configurable: false,
            });
            game.saveConfig('theme', 'simple');
            Reflect.defineProperty(lib.config, 'recent_character_number', {
                get() {
                    return '30';
                },
                set() { },
                configurable: false,
            });
            game.saveConfig('recent_character_number', '30');
            game.saveConfig('connect_avatar', 'QQQ_jiananfeng');
            Reflect.defineProperty(lib.config, 'show_log', {
                get() {
                    return 'left';
                },
                set() { },
                configurable: false,
            });
            game.saveConfig('show_log', 'left');
            Reflect.defineProperty(lib.config, 'layout', {
                get() {
                    return 'mobile';
                },
                set() { },
                configurable: false,
            });
            game.saveConfig('layout', 'mobile');
        } //收藏武将修改
    }; //按钮控制技能添加与修改
    config();
    console.timeEnd('温柔一刀content');
};
