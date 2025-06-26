import { lib, game, ui, get, ai, _status } from '../../noname.js';
export { config };
const config = {
    群聊: {
        name: '<a href="https://qm.qq.com/q/SsTlU9gc24"><span class=Qmenu>【温柔一刀】群聊: 771901025</span></a>',
        clear: true,
    },
    报错: {
        name: '<span class=Qmenu>报错</span>',
        intro: '开启后,会报出很多存在的bug(测试用,勿开)',
        init: false,
    },
    扩展修改: {
        name: '<span class=Qmenu>扩展修改</span>',
        intro: '开启后,直接修改游戏存储的扩展(测试用,勿开)',
        init: false,
    },
    属性杀: {
        name: '<span class=Qmenu>属性杀</span>',
        intro: '开启后,会启用本扩展火/雷/神/冰/血/金/毒/雪属性,并对这些属性进行加强',
        init: true,
    },
    AI禁用: {
        name: '<span class=Qmenu>AI禁用</span>',
        intro: '开启后,AI禁用本扩展角色',
        init: false,
    },
    一主多反: {
        name: '<span class=Qmenu>一主多反</span>',
        intro: '我要打三十个!!!',
        init: false,
    },
    死亡移除: {
        name: '<span class=Qmenu>死亡移除</span>',
        intro: '死亡后移出游戏',
        init: true,
        onclick(result) {
            game.saveConfig('dieremove', result);
        },
    },
    动态背景: {
        name: '<span class=Qmenu>动态背景</span>',
        intro: '开启后,会启用温柔一刀专属动态背景',
        init: true,
    },
    界面修改: {
        name: '<span class=Qmenu>界面修改</span>',
        intro: '开启后,拉长角色立绘以及右置手牌上限标志防止被挡住',
        init: false,
    },
    文字闪烁: {
        name: '<span class=Qmenu>文字闪烁</span>',
        intro: '开启后,部分文字会附加闪烁动画效果',
        init: true,
    },
    禁止延迟: {
        name: '<span class=Qmenu>禁止延迟</span>',
        intro: '开启后,将置空game.delay',
        init: false,
        onclick(result) {
            var cfg = this._link.config;
            game.saveConfig(cfg._name, result);
            if (result) {
                Reflect.defineProperty(game, 'delay', {
                    get: () => () => true,
                    set() { },
                    configurable: false,
                });
                lib.configMenu.general.config.game_speed.item = 'vvfast';
                Reflect.defineProperty(lib.config, 'game_speed', {
                    get: () => 'vvfast',
                    set() { },
                    configurable: false,
                });
                game.saveConfig('game_speed', 'vvfast');
            }
        },
    },
    神武再世: {
        name: '<span class=Qmenu>神武再世</span>',
        intro: '开启后,将挑战模式武将/卡牌/技能全部添加入普通模式',
        init: false,
    },
    扩展导入: {
        name: '<span class=Qmenu>扩展导入</span>',
        intro: '开启后,导入目录内全部扩展',
        init: false,
    },
    扩展全开: {
        name: '<span class=Qmenu>扩展全开</span>',
        intro: '开启后,打开全部已存储扩展',
        init: false,
    },
    卡牌全开: {
        name: '<span class=Qmenu>卡牌全开</span>',
        intro: '开启后,打开全部扩展卡牌,并将卡牌全部添加进联机卡牌,并且给未有按钮的卡牌包添加开关按钮',
        init: false,
    },
    武将全开: {
        name: '<span class=Qmenu>武将全开</span>',
        intro: '开启后,打开全部武将包,并将武将全部添加进联机武将',
        init: false,
    },
    扩展全关: {
        name: '<span class=Qmenu>扩展全关</span>',
        intro: '开启后,关闭全部已存储扩展',
        init: false,
    },
    醉酒模式: {
        name: '<span class=Qmenu>醉酒模式</span>',
        intro: '开启后,所有武将喝的酒不会消失直到杀造成伤害',
        init: true,
    },
    加倍模式: {
        name: '<span class=Qmenu>加倍模式</span>',
        intro: '开启后,所有限一次的技能都会变成限两次',
        init: true,
    },
    卖血模式: {
        name: '<span class=Qmenu>卖血模式</span>',
        intro: '开启后,所有卖血武将的桃酒都不会被弃置和获得,卖血武将吸收所有友方角色的伤害牌',
        init: true,
    },
    主公加强: {
        name: '<span class=Qmenu>主公加强</span>',
        intro: '开启后,主公根据游戏人数获得享乐、天命、傲才',
        init: true,
    },
    回血加强: {
        name: '<span class=Qmenu>回血加强</span>',
        intro: '开启后,回血可以超过上限',
        init: true,
    },
    优化判定: {
        name: '<span class=Qmenu>优化判定</span>',
        intro: '开启后,判定区中若有多个同名牌,在每个判定阶段只判定其中一个',
        init: true,
    },
    神器牌堆: {
        name: '<span class=Qmenu>神器牌堆</span>',
        intro: '开启后,牌堆中加入上古神器',
        init: false,
    },
    右键简介: {
        name: '<span class=Qmenu>右键简介</span>',
        intro: '开启后,会增加右键武将详细信息内容,显示子技能和临时技能和各种buff',
        init: true,
    },
    取消小游戏: {
        name: '<span class=Qmenu>取消小游戏</span>',
        intro: '开启后,取消小游戏评才、冲虚、御风、整经',
        init: true,
    },
    武将卡牌加强: {
        name: '<span class=Qmenu>武将卡牌加强</span>',
        intro: '开启后,加强部分武将与部分卡牌',
        init: true,
    },
    单机禁官服将: {
        name: '<span class=Qmenu>单机禁官服将</span>',
        intro: '开启后,单机时候禁用全部官服将',
        init: true,
    },
    联机禁官服将: {
        name: '<span class=Qmenu>联机禁官服将</span>',
        intro: '开启后,联机时候禁用全部官服将',
        init: true,
    },
    还原初始牌堆: {
        name: '<span class=Qmenu>还原初始牌堆</span>',
        intro: '开启后,会锁定牌堆为161张的军争牌堆',
        init: true,
    },
    卡牌加入牌堆: {
        name: '<span class=Qmenu>卡牌加入牌堆</span>',
        intro: '开启后,将每种牌名的牌加入牌堆一张',
        init: false,
    },
    收藏武将修改: {
        name: '<span class=Qmenu>收藏武将修改</span>',
        intro: '开启后,修改收藏武将为三服单挑榜前二十五',
        init: false,
    },
    武将全部可选: {
        name: '<span class=Qmenu>武将全部可选</span>',
        intro: '开启后,任何禁将、隐藏武将、BOSS武将都会变得可选,你甚至可以在BOSS模式用BOSS自己打自己',
        init: false,
    },
    禁止摸牌平局: {
        name: '<span class=Qmenu>禁止摸牌平局</span>',
        intro: '开启后,禁止因摸牌导致的平局,防止空摸,防止摸非整数牌,防止摸光牌堆,牌堆加弃牌堆的牌数少于初始牌堆的一半时,将初始牌堆的牌全部放回牌堆',
        init: true,
    },
    禁止多次触发: {
        name: '<span class=Qmenu>禁止多次触发</span>',
        intro: '开启后,将会修改全场技能的使用次数为最多每回合1次',
        init: false,
    },
    禁止循环触发: {
        name: '<span class=Qmenu>禁止循环触发</span>',
        intro: '开启后,禁止所有左脚踩右脚上天的循环触发技能',
        init: true,
    },
    禁止封禁技能: {
        name: '<span class=Qmenu>禁止封禁技能</span>',
        intro: '开启后,所有封禁技能的效果将会无效(并不阻止移除技能)',
        init: true,
    },
    禁止封禁出牌: {
        name: '<span class=Qmenu>禁止封禁出牌</span>',
        intro: '开启后,所有封禁出牌的效果将会无效',
        init: false,
    },
    飞扬跋扈模式: {
        name: '<span class=Qmenu>飞扬跋扈</span>',
        intro: '开启后,将会添加全局性效果:游戏开始时获得两点护甲.按数值增加准备阶段摸牌数、每回合出杀与酒的次数,并减少与其他角色的距离.在判定阶段开始时,可以弃置两张牌,移除判定区的一张牌',
        init: '0',
        item: {
            0: '<span class=Qmenu>关闭</span>',
            1: '<span class=Qmenu>1</span>',
            2: '<span class=Qmenu>2</span>',
            3: '<span class=Qmenu>3</span>',
            4: '<span class=Qmenu>4</span>',
            5: '<span class=Qmenu>5</span>',
            6: '<span class=Qmenu>6</span>',
        },
    },
    平衡: {
        name: '<span class=Qmenu>全场手牌上限</span>',
        init: 999,
        intro: '手牌超出预设上限则禁止获得牌',
        item: {
            10: '<span class=Qmenu>10</span>',
            15: '<span class=Qmenu>15</span>',
            20: '<span class=Qmenu>20</span>',
            25: '<span class=Qmenu>25</span>',
            30: '<span class=Qmenu>30</span>',
            35: '<span class=Qmenu>35</span>',
            40: '<span class=Qmenu>40</span>',
            45: '<span class=Qmenu>45</span>',
            50: '<span class=Qmenu>50</span>',
            55: '<span class=Qmenu>55</span>',
            60: '<span class=Qmenu>60</span>',
            999: '<span class=Qmenu>999</span>',
        },
    },
    滚轮速度: {
        name: '<span class=Qmenu>滚轮速度</span>',
        init: '10',
        intro: '滚轮速度',
        item: {
            5: '<span class=Qmenu>5</span>',
            10: '<span class=Qmenu>10</span>',
            15: '<span class=Qmenu>15</span>',
            20: '<span class=Qmenu>20</span>',
            25: '<span class=Qmenu>25</span>',
        },
    },
    界面比例: {
        name: '<span class=Qmenu>界面比例</span>',
        init: '1',
        item: {
            0.4: '<span class=Qmenu>40%</span>',
            0.5: '<span class=Qmenu>50%</span>',
            0.6: '<span class=Qmenu>60%</span>',
            0.7: '<span class=Qmenu>70%</span>',
            0.8: '<span class=Qmenu>80%</span>',
            0.9: '<span class=Qmenu>90%</span>',
            1: '<span class=Qmenu>100%</span>',
            1.1: '<span class=Qmenu>110%</span>',
            1.2: '<span class=Qmenu>120%</span>',
            1.3: '<span class=Qmenu>130%</span>',
            1.4: '<span class=Qmenu>140%</span>',
            1.5: '<span class=Qmenu>150%</span>',
            1.6: '<span class=Qmenu>160%</span>',
            1.7: '<span class=Qmenu>170%</span>',
            1.8: '<span class=Qmenu>180%</span>',
            1.9: '<span class=Qmenu>190%</span>',
            2: '<span class=Qmenu>200%</span>',
            2.1: '<span class=Qmenu>210%</span>',
            2.2: '<span class=Qmenu>220%</span>',
            2.3: '<span class=Qmenu>230%</span>',
            2.4: '<span class=Qmenu>240%</span>',
            2.5: '<span class=Qmenu>250%</span>',
            2.6: '<span class=Qmenu>260%</span>',
            2.7: '<span class=Qmenu>270%</span>',
            2.8: '<span class=Qmenu>280%</span>',
            2.9: '<span class=Qmenu>290%</span>',
            3: '<span class=Qmenu>300%</span>',
        },
        onclick(v) {
            game.documentZoom = game.deviceZoom * Number(v);
            ui.updatez();
            game.saveConfig('extension_温柔一刀_界面比例', v);
        },
    },
    右键宽度修改: {
        name: '<span class=Qmenu>右键宽度修改</span>',
        init: '40%',
        intro: '开启后,会增加右键武将详细信息的宽度',
        item: {
            '30%': '<span class=Qmenu>30%</span>',
            '40%': '<span class=Qmenu>40%</span>',
            '50%': '<span class=Qmenu>50%</span>',
        },
    },
};