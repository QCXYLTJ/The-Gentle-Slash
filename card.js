import { lib, game, ui, get, ai, _status } from '../../noname.js'
export { card, translate3 }
const card = {
    QQQ_baota: {
        fullskin: true,
        type: 'equip',
        subtype: 'equip5',
        skills: ['QQQ_baota'],
        ai: {
            equipValue: 90,
            basic: {
                equipValue: 90,
                useful: 0.1,
                value: 90,
                order: 50,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        enable: true,
        selectTarget: -1,
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        modTarget: true,
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
        toself: true,
    },
    QQQ_灵芝: {
        fullskin: true,
        vanish: true,
        type: 'basic',
        enable: true,
        filterTarget: function (card, player, target) {
            return true;
        },
        content: function () {
            'step 0'
            target.gainMaxHp();
            'step 1'
            target.recover(player.maxHp - player.hp);
        },
        ai: {
            order: 10,
            result: {
                target: 4,
            },
        },
    },
    火: {
        audio: true,
        fullskin: true,
        type: 'basic',
        enable: false,
        destroy: 'discardPile',
        ai: {
            basic: {
                useful: 0,
                value: 0,
            },
        },
    },
    国风玉袍: {
        type: 'equip',
        fullskin: true,
        subtype: 'equip2',
        skills: ['guofengyupao'],
        ai: {
            equipValue: 90,
            basic: {
                equipValue: 90,
                useful: 0.1,
                value: 90,
                order: 10,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        enable: true,
        selectTarget: -1,
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        modTarget: true,
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
        toself: true,
    },
    奇门八卦: {
        type: 'equip',
        fullskin: true,
        subtype: 'equip2',
        skills: ['qimenbagua'],
        ai: {
            equipValue: 80,
            basic: {
                equipValue: 80,
                useful: 0.1,
                value: 80,
                order: 10,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        enable: true,
        selectTarget: -1,
        filterTarget: (card, player, target) => player == target && target.canEquip(card, true),
        modTarget: true,
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
        toself: true,
    },
    霹雳投石车: {
        fullskin: true,
        derivation: 'dc_liuye',
        cardimage: 'ly_piliche',
        type: 'equip',
        subtype: 'equip5',
        skills: ['pilitoushiche'],
        ai: {
            equipValue: 90,
            basic: {
                equipValue: 90,
                useful: 0.1,
                value: 90,
                order: 50,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        enable: true,
        selectTarget: -1,
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        modTarget: true,
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
        toself: true,
    },
    禅让诏书: {
        type: 'equip',
        subtype: 'equip5',
        skills: ['禅让诏书'],
        fullskin: true,
        enable: true,
        selectTarget: -1,
        modTarget: true,
        toself: true,
        ai: {
            equipValue: 70,
            basic: {
                equipValue: 70,
                useful: 0.1,
                value: 70,
                order: 10,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
    },
    赤血青锋: {
        type: 'equip',
        fullskin: true,
        subtype: 'equip1',
        distance: {
            attackFrom: -1,
        },
        skills: ['青锋'],
        ai: {
            equipValue: 80,
            basic: {
                equipValue: 80,
                useful: 0.1,
                value: 80,
                order: 50,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        enable: true,
        selectTarget: -1,
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        modTarget: true,
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
        toself: true,
    },
    赤焰镇魂琴: {
        type: 'equip',
        subtype: 'equip1',
        skills: ['赤焰镇魂琴'],
        fullskin: true,
        enable: true,
        selectTarget: -1,
        modTarget: true,
        toself: true,
        distance: {
            attackFrom: -3,
        },
        ai: {
            equipValue: 60,
            basic: {
                equipValue: 60,
                useful: 0.1,
                value: 60,
                order: 50,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
    },
    金乌落日弓: {
        type: 'equip',
        subtype: 'equip1',
        skills: ['金乌落日弓'],
        fullskin: true,
        enable: true,
        selectTarget: -1,
        modTarget: true,
        toself: true,
        distance: {
            attackFrom: -8,
        },
        ai: {
            equipValue: 60,
            basic: {
                equipValue: 60,
                useful: 0.1,
                value: 60,
                order: 10,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
    },
    三略: {
        derivation: 'ol_puyuan',
        type: 'equip',
        subtype: 'equip5',
        ai: {
            equipValue: 70,
            basic: {
                equipValue: 70,
                useful: 0.1,
                value: 70,
                order: 10,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        skills: ['sanlve_skill'],
        fullskin: true,
        enable: true,
        selectTarget: -1,
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        modTarget: true,
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
        toself: true,
    },
    束发紫金冠: {
        derivation: 'ol_puyuan',
        type: 'equip',
        subtype: 'equip5',
        modeimage: 'boss',
        ai: {
            equipValue: 85,
            basic: {
                equipValue: 85,
                useful: 0.1,
                value: 85,
                order: 10,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        skills: ['shufazijinguan_skill'],
        fullskin: true,
        enable: true,
        selectTarget: -1,
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        modTarget: true,
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
        toself: true,
    },
    修罗炼狱戟: {
        type: 'equip',
        subtype: 'equip1',
        skills: ['修罗炼狱戟'],
        fullskin: true,
        enable: true,
        selectTarget: -1,
        modTarget: true,
        toself: true,
        distance: {
            attackFrom: -3,
        },
        ai: {
            equipValue: 70,
            basic: {
                equipValue: 70,
                useful: 0.1,
                value: 70,
                order: 50,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
    },
    虚妄之冕: {
        type: 'equip',
        fullskin: true,
        subtype: 'equip5',
        enable: true,
        selectTarget: -1,
        modTarget: true,
        toself: true,
        skills: ['xuwangzhimian'],
        ai: {
            equipValue: 80,
            basic: {
                equipValue: 80,
                useful: 0.1,
                value: 80,
                order: 10,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
    },
    红棉百花袍: {
        type: 'equip',
        subtype: 'equip2',
        ai: {
            equipValue: 60,
            basic: {
                equipValue: 60,
                useful: 0.1,
                value: 60,
                order: 10,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        skills: ['hongmianbaihuapao_skill'],
        fullskin: true,
        enable: true,
        selectTarget: -1,
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        modTarget: true,
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
        toself: true,
    },
    妆梳_trick: {
        type: 'equip',
        fullskin: true,
        subtype: 'equip5',
        enable: true,
        selectTarget: -1,
        modTarget: true,
        toself: true,
        skills: ['犀梳'],
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
        ai: {
            equipValue: 80,
            basic: {
                equipValue: 80,
                useful: 0.1,
                value: 80,
                order: 10,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
    },
    妆梳_basic: {
        type: 'equip',
        fullskin: true,
        subtype: 'equip5',
        enable: true,
        selectTarget: -1,
        modTarget: true,
        toself: true,
        skills: ['琼梳'],
        ai: {
            equipValue: 70,
            basic: {
                equipValue: 70,
                useful: 0.1,
                value: 70,
                order: 10,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
    },
    妆梳_equip: {
        type: 'equip',
        fullskin: true,
        subtype: 'equip5',
        enable: true,
        selectTarget: -1,
        modTarget: true,
        toself: true,
        skills: ['金梳'],
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
        ai: {
            equipValue: 70,
            basic: {
                equipValue: 70,
                useful: 0.1,
                value: 70,
                order: 10,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
    },
    玲珑: {
        type: 'equip',
        subtype: 'equip2',
        ai: {
            equipValue: 80,
            basic: {
                equipValue: 80,
                useful: 0.1,
                value: 80,
                order: 10,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        skills: ['玲珑'],
        fullskin: true,
        enable: true,
        selectTarget: -1,
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        modTarget: true,
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
        toself: true,
    },
    无双方天戟: {
        type: 'equip',
        subtype: 'equip1',
        skills: ['无双方天戟'],
        fullskin: true,
        enable: true,
        selectTarget: -1,
        modTarget: true,
        toself: true,
        distance: {
            attackFrom: -2,
        },
        ai: {
            equipValue: 85,
            basic: {
                equipValue: 85,
                useful: 0.1,
                value: 85,
                order: 50,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
    },
    崆峒印: {
        fullskin: true,
        type: 'equip',
        subtype: 'equip2',
        enable: true,
        selectTarget: -1,
        toself: false,
        modTarget: true,
        equipDelay: false,
        loseDelay: false,
        skills: ['崆峒印'],
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        NL: true,
        ai: {
            equipValue: 70,
            basic: {
                equipValue: 70,
                useful: 2,
                value: 70,
                order: 10,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
    },
    东皇钟: {
        fullskin: true,
        type: 'equip',
        subtype: 'equip5',
        enable: true,
        selectTarget: -1,
        toself: false,
        modTarget: true,
        equipDelay: false,
        loseDelay: false,
        skills: ['东皇钟'],
        mode: ['boss'],
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        destroy: true,
        NL: true,
        ai: {
            equipValue: 70,
            basic: {
                equipValue: 70,
                useful: 2,
                value: 70,
                order: 50,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
    },
    封神榜: {
        fullskin: true,
        type: 'equip',
        subtype: 'equip5',
        enable: true,
        selectTarget: -1,
        toself: false,
        modTarget: true,
        equipDelay: false,
        loseDelay: false,
        skills: ['封神榜'],
        mode: ['boss'],
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        destroy: true,
        NL: true,
        ai: {
            equipValue: 70,
            basic: {
                equipValue: 70,
                useful: 2,
                value: 70,
                order: 50,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
    },
    封神: {
        fullskin: true,
        type: 'basic',
        enable: true,
        selectTarget: -1,
        cardcolor: 'red',
        toself: true,
        filterTarget: function (card, player, target) {
            return target == player;
        },
        modTarget: true,
        mode: ['boss'],
        async content(event, trigger, player) {//QQQ
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
        fullskin: true,
        type: 'equip',
        subtype: 'equip4',
        enable: true,
        selectTarget: -1,
        toself: false,
        modTarget: true,
        equipDelay: false,
        loseDelay: false,
        skills: ['昊天塔'],
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        destroy: true,
        NL: true,
        NR: true,
        ai: {
            equipValue: 70,
            basic: {
                equipValue: 70,
                useful: 2,
                value: 70,
                order: 50,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
    },
    炼妖壶: {
        fullskin: true,
        type: 'equip',
        subtype: 'equip3',
        enable: true,
        selectTarget: -1,
        toself: false,
        modTarget: true,
        equipDelay: false,
        loseDelay: false,
        skills: ['炼妖壶'],
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        destroy: true,
        NL: true,
        ai: {
            equipValue: 70,
            basic: {
                equipValue: 70,
                useful: 2,
                value: 70,
                order: 10,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
    },
    昆仑镜: {
        fullskin: true,
        type: 'equip',
        subtype: 'equip2',
        enable: true,
        selectTarget: -1,
        toself: false,
        modTarget: true,
        equipDelay: false,
        loseDelay: false,
        skills: ['昆仑镜'],
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        destroy: true,
        NL: true,
        ai: {
            equipValue: 70,
            basic: {
                equipValue: 70,
                useful: 2,
                value: 70,
                order: 10,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
    },
    盘古斧: {
        fullskin: true,
        type: 'equip',
        subtype: 'equip1',
        enable: true,
        selectTarget: -1,
        toself: false,
        modTarget: true,
        equipDelay: false,
        loseDelay: false,
        skills: ['盘古斧'],
        distance: {
            attackFrom: -2,
        },
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        destroy: true,
        NL: true,
        ai: {
            equipValue: 70,
            basic: {
                equipValue: 70,
                useful: 2,
                value: 70,
                order: 50,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
    },
    女娲石: {
        fullskin: true,
        type: 'equip',
        subtype: 'equip3',
        enable: true,
        selectTarget: -1,
        toself: false,
        modTarget: true,
        equipDelay: false,
        loseDelay: false,
        skills: ['女娲石'],
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        destroy: true,
        NL: true,
        ai: {
            equipValue: 70,
            basic: {
                equipValue: 70,
                useful: 2,
                value: 70,
                order: 10,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
    },
    轩辕剑: {
        fullskin: true,
        type: 'equip',
        subtype: 'equip1',
        enable: true,
        selectTarget: -1,
        toself: false,
        modTarget: true,
        equipDelay: false,
        loseDelay: false,
        skills: ['轩辕剑'],
        distance: {
            attackFrom: -1,
            attackRange: (card, player) => {
                if (player.storage.轩辕剑) return 4;
                return 2;
            },
        },
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        destroy: true,
        NL: true,
        ai: {
            equipValue: 70,
            basic: {
                equipValue: 70,
                useful: 2,
                value: 70,
                order: 50,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
    },
    神农鼎: {
        fullskin: true,
        type: 'equip',
        subtype: 'equip3',
        enable: true,
        selectTarget: -1,
        toself: false,
        modTarget: true,
        equipDelay: false,
        loseDelay: false,
        skills: ['神农鼎'],
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        destroy: true,
        NL: true,
        ai: {
            equipValue: 70,
            basic: {
                equipValue: 70,
                useful: 2,
                value: 70,
                order: 50,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
    },
    伏羲琴: {
        fullskin: true,
        type: 'equip',
        subtype: 'equip5',
        enable: true,
        selectTarget: -1,
        toself: false,
        modTarget: true,
        equipDelay: false,
        loseDelay: false,
        skills: ['伏羲琴'],
        filterTarget: function (card, player, target) {
            if (player != target) return false;
            return target.canEquip(card, true);
        },
        destroy: true,
        NL: true,
        ai: {
            equipValue: 70,
            basic: {
                equipValue: 70,
                useful: 2,
                value: 70,
                order: 10,
            },
            result: {
                target: (player, target, card) => get.equipResult(player, target, card.name),
            },
        },
        content: function () {
            if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
        },
    },
    //毒爆:将全场所有角色随机一半牌变成毒,然后弃置所有毒
    QQQ_dubao: {
        audio: true,
        fullskin: true,
        type: "trick",
        enable: true,
        selectTarget: -1,
        defaultYingbianEffect: "remove",
        filterTarget: function (card, player, target) {
            return true;
        },
        reverseOrder: true,
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
                player: function (player, target, card) {//主动技是否发动
                    var num1 = game.players.filter(q => !q.isFriendsOf(player))
                        .reduce((acc, curr) => acc + curr.countCards('he'), 0);
                    var num2 = game.players.filter(q => q.isFriendsOf(player))
                        .reduce((acc, curr) => acc + curr.countCards('he'), 0);
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
    //尸爆:对一名已死亡的角色使用,将其炸掉（移出游戏）,然后对其相邻角色造成一点伤害
    QQQ_shibao: {
        audio: true,
        fullskin: true,
        type: "trick",
        enable: true,
        selectTarget: -1,
        filterTarget: function (card, player, target) {
            return player == target && game.dead.length;
        },
        async content(event, trigger, player) {
            const { result: { targets } } = await player.chooseTarget('对一名已死亡的角色使用,将其炸掉', (c, p, t) => t.isDead())
                .set('deadTarget', true)
                .set('ai', (target) => {
                    var num = 0;
                    const next = target.getNext();
                    const previous = target.getPrevious();
                    if (next) {
                        num -= get.attitude(player, next);
                    }
                    if (previous) {
                        num -= get.attitude(player, previous);
                    }
                    return get.attitude(player, target) * num;
                });
            if (targets && targets[0]) {
                const next = targets[0].getNext();
                const previous = targets[0].getPrevious();
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
                player: function (player, target, card) {//主动技是否发动
                    return game.dead.filter((target) => {
                        var num = 0;
                        const next = target.getNext();
                        const previous = target.getPrevious();
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
};
for (var i in card) {
    card[i].image = `ext:温柔一刀/card/${i}.jpg`;
}
const translate3 = {
    QQQ_baota: '玲珑宝塔',
    QQQ_baota_info: '每轮游戏开始时,你可以选择一名角色(不能是上次选择的角色),其被镇压于塔内(镇压效果:造成或受到伤害-1,摸牌数-1,跳过回合然后你令其回复或失去一点体力)',
    QQQ_dubao: '毒爆',
    QQQ_dubao_info: '将全场所有角色随机一半牌变成毒,然后弃置所有毒',
    QQQ_shibao: '尸爆',
    QQQ_shibao_info: '对一名已死亡的角色使用,将其炸掉,然后对其相邻角色造成一点伤害',
    QQQ_灵芝: '灵芝',
    QQQ_灵芝_info: '出牌阶段对一名角色使用,其增加一点体力上限回复全部体力',
    国风玉袍: '国风玉袍',
    国风玉袍_info: '<span class="Qmenu">锁定技,</span>你不是其他角色使用普通锦囊牌的合法目标',
    奇门八卦: '奇门八卦',
    奇门八卦_info: '<span class="Qmenu">锁定技,</span>【杀】对你无效',
    霹雳投石车: '霹雳投石车',
    霹雳投石车_info: '<span class="Qmenu">锁定技,</span>①你于回合内使用基本牌无距离限制,且当你于回合内使用基本牌时你令此牌的牌面数值t1.@当你于回合外使用或打出基本牌时,你摸一张牌',
    禅让诏书: '禅让诏书',
    禅让诏书_info: '其他角色于其回合外获得牌时,你可以选择一项:1.交给其一张牌;2.令其交给你一张牌',
    赤血青锋: '赤血青锋',
    赤血青锋_info: '赤血青锋',
    赤焰镇魂琴: '赤焰镇魂琴',
    赤焰镇魂琴_info: '你的伤害视为火属性且无来源',
    金乌落日弓: '金乌落日弓',
    金乌落日弓_info: '你一次性失去2张及以上手牌时,你可以选择一名其他角色,并弃置其X张牌,X为你本次失去的牌的数量',
    三略: '三略',
    三略_info: '出杀加1,攻击范围加1,手牌上限加1',
    束发紫金冠: '束发紫金冠',
    束发紫金冠_info: '准备阶段,你可以对一名其他角色造成1点伤害',
    修罗炼狱戟: '修罗炼狱戟',
    修罗炼狱戟_info: '你使用牌可以额外指定任意名其他角色为目标(除酒、桃、无中、装备、延时锦囊);你对可以斩杀的角色造成的伤害+1,然后令受到伤害的角色回复1点体力.你对不能斩杀的角色造成伤害时,先令其回复一点体力,然后令伤害加一',
    虚妄之冕: '虚妄之冕',
    虚妄之冕_info: '摸牌阶段摸牌数+2;手牌上限-1',
    红棉百花袍: '红棉百花袍',
    红棉百花袍_info: '防止属性伤害',
    妆梳_trick: '犀梳',
    妆梳_trick_info: '跳过判定和弃牌阶段',
    妆梳_basic: '琼梳',
    妆梳_basic_info: '当你受到伤害时,你弃置X张牌并防止此伤害(X为伤害值)',
    妆梳_equip: '金梳',
    妆梳_equip_info: '出牌阶段结束时,你将手牌摸至体力上限',
    玲珑: '玲珑',
    玲珑_info: '别人对你用牌时,你可以判定,若不为红色.此牌无效',
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
    女娲石_info: '出牌阶段或当你死亡时,你可以选择一名已阵亡的角色,将其复活,体力调整至体力上限、摸四张牌,改为由你操控,然后本局永久移除女娲石',
    轩辕剑: '轩辕剑',
    轩辕剑_info: '当你使用杀指定目标时,阳:你令其恢复一点体力,令此杀失效,你摸三张牌;阴:你可以额外指定两名目标,对目标之一造成一点伤害',
    神农鼎: '神农鼎',
    神农鼎_info: '改变你桃的作用,改为可以回血超过上限且回复效果两倍且获得两点护甲.当有角色使用桃后,你摸一张牌.每回合限一次,你可以将一张牌当桃使用',
    伏羲琴: '伏羲琴',
    伏羲琴_info: '限定技:混乱全场敌对角色,直至你下个出牌阶段开始',
};

