import { lib, game, ui, get, ai, _status } from '../../noname.js'
export { config }
const config = {
    群聊: {
        name: '<a href="https://qm.qq.com/q/SsTlU9gc24"><span class="Qmenu">【温柔一刀】群聊: 771901025</span></a>',
        clear: true,
    },
    全部关闭: {
        name: '<span class="Qmenu">全部关闭</span>',
        intro: '开启后,会一键关闭全部按钮',
        init: false,
        onclick: function (result) {
            const cfg = this._link.config;
            game.saveConfig(cfg._name, result);
            if (result) {
                for (const i in lib.extensionMenu.extension_温柔一刀) {
                    if (config[i].init && i != '全部关闭' && lib.config[`extension_温柔一刀_${i}`]) {
                        game.saveConfig(`extension_温柔一刀_${i}`, false);
                    }
                }
            }
        },
    },
    托管: {
        name: '<span class="Qmenu">托管</span>',
        intro: '开启后,会进入托管模式',
        init: false,
    },
    报错: {
        name: '<span class="Qmenu">报错</span>',
        intro: '开启后,会进入开发者模式,报出很多存在的bug',
        init: false,
    },
    记录: {
        name: '<span class="Qmenu">记录</span>',
        intro: '开启后,会记录每个触发的时机名称',
        init: false,
    },
    BGM: {
        name: '<span class="Qmenu">BGM</span>',
        intro: '开启后,会启用温柔一刀专属BGM',
        init: false,
    },
    BOSS: {
        name: '<span class="Qmenu">BOSS</span>',
        intro: '开启后,会将BOSS加入挑战模式',
        init: false,
    },
    AI禁用: {
        name: '<span class="Qmenu">AI禁用</span>',
        intro: '开启后,AI禁用本扩展角色',
        init: false,
    },
    全时机: {
        name: '<span class="Qmenu">全时机</span>',
        intro: '开启后,会启用全时机,用来查询都触发了哪些时机',
        init: false,
    },
    属性杀: {
        name: '<span class="Qmenu">属性杀</span>',
        intro: '开启后,会启用本扩展火/雷/神/冰/血/金/毒/雪属性,并对这些属性进行加强',
        init: true,
    },
    动态背景: {
        name: '<span class="Qmenu">动态背景</span>',
        intro: '开启后,会启用温柔一刀专属动态背景',
        init: true,
    },
    界面修改: {
        name: '<span class="Qmenu">界面修改</span>',
        intro: '开启后,拉长角色立绘以及右置手牌上限标志防止被挡住',
        init: false,
    },
    文字闪烁: {
        name: '<span class="Qmenu">文字闪烁</span>',
        intro: '开启后,部分文字会附加闪烁动画效果',
        init: true,
    },
    切入动画: {
        name: '<span class="Qmenu">切入动画</span>',
        intro: '开启后,游戏开始时将会切入一段动画',
        init: false,
    },
    禁止延迟: {
        name: '<span class="Qmenu">禁止延迟</span>',
        intro: '开启后,将置空game.delay',
        init: false,
        onclick: function (result) {
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
    轮次计数: {
        name: '<span class="Qmenu">轮次计数</span>',
        intro: '开启后,将统计并显示玩家的轮次数以及出牌阶段次数',
        init: false,
    },
    神武再世: {
        name: '<span class="Qmenu">神武再世</span>',
        intro: '开启后,将挑战模式武将/卡牌/技能全部添加入普通模式',
        init: false,
    },
    扩展导入: {
        name: '<span class="Qmenu">扩展导入</span>',
        intro: '开启后,导入目录内全部扩展',
        init: false,
    },
    扩展全开: {
        name: '<span class="Qmenu">扩展全开</span>',
        intro: '开启后,打开全部已存储扩展',
        init: false,
    },
    卡牌全开: {
        name: '<span class="Qmenu">卡牌全开</span>',
        intro: '开启后,打开全部扩展卡牌,并将卡牌全部添加进联机卡牌,并且给未有按钮的卡牌包添加开关按钮',
        init: false,
    },
    武将全开: {
        name: '<span class="Qmenu">武将全开</span>',
        intro: '开启后,打开全部武将包,并将武将全部添加进联机武将',
        init: false,
    },
    扩展全关: {
        name: '<span class="Qmenu">扩展全关</span>',
        intro: '开启后,关闭全部已存储扩展',
        init: false,
    },
    醉酒模式: {
        name: '<span class="Qmenu">醉酒模式</span>',
        intro: '开启后,所有武将喝的酒不会消失直到杀造成伤害',
        init: true,
    },
    抹杀模式: {
        name: '<span class="Qmenu">抹杀模式</span>',
        intro: '开启后,所有武将死后都会移出游戏,且游戏重新排位置',
        init: false,
    },
    加倍模式: {
        name: '<span class="Qmenu">加倍模式</span>',
        intro: '开启后,所有限一次的技能都会变成限两次',
        init: true,
    },
    卖血模式: {
        name: '<span class="Qmenu">卖血模式</span>',
        intro: '开启后,所有卖血武将的桃酒都不会被弃置和获得,卖血武将吸收所有友方角色的伤害牌',
        init: true,
    },
    主公加强: {
        name: '<span class="Qmenu">主公加强</span>',
        intro: '开启后,主公根据游戏人数获得享乐、天命、傲才',
        init: true,
    },
    回血加强: {
        name: '<span class="Qmenu">回血加强</span>',
        intro: '开启后,回血可以超过上限',
        init: true,
    },
    火攻加强: {
        name: '<span class="Qmenu">火攻加强</span>',
        intro: '开启后,火攻改为:目标展示一张牌之后,亮出牌堆顶四张牌,并对目标造成亮出牌与其展示牌花色相同数的伤害',
        init: true,
    },
    卡牌加强: {
        name: '<span class="Qmenu">卡牌加强</span>',
        intro: '开启后,加强青龙刀、麒麟弓、五行鹤翎扇、诸葛连弩、乌铁锁链',
        init: true,
    },
    武将加强: {
        name: '<span class="Qmenu">武将加强</span>',
        intro: '开启后,加强武诸葛、武陆逊、朱桓等',
        init: true,
    },
    优化判定: {
        name: '<span class="Qmenu">优化判定</span>',
        intro: '开启后,判定区中若有多个同名牌,在每个判定阶段只判定其中一个',
        init: true,
    },
    神器牌堆: {
        name: '<span class="Qmenu">神器牌堆</span>',
        intro: '开启后,牌堆中加入上古神器',
        init: false,
    },
    右键简介: {
        name: '<span class="Qmenu">右键简介</span>',
        intro: '开启后,会增加右键武将详细信息内容,显示子技能和临时技能和各种buff',
        init: true,
    },
    透明标记: {
        name: '<span class="Qmenu">透明标记</span>',
        intro: '开启后,会将标记背景图透明显示,防止遮挡其他元素',
        init: false,
    },
    技能失效: {
        name: '<span class="Qmenu">技能失效</span>',
        intro: '开启后,描述长度超过99的小作文技能将会失效',
        init: false,
    },
    癫狂杀戮: {
        name: '<span class="Qmenu">癫狂杀戮</span>',
        intro: '抗性？开了这个按钮,李白将会杀人不留影',
        init: false,
    },
    技能拦截: {
        name: '<span class="Qmenu">技能拦截</span>',
        intro: '开启后,置空全部技能',
        init: false,
    },
    取消小游戏: {
        name: '<span class="Qmenu">取消小游戏</span>',
        intro: '开启后,取消小游戏评才、冲虚、御风、整经',
        init: true,
    },
    禁止多回合: {
        name: '<span class="Qmenu">禁止多回合</span>',
        intro: '开启后,每轮每个人只能进行一个回合',
        init: false,
    },
    联机禁官服将: {
        name: '<span class="Qmenu">联机禁官服将</span>',
        intro: '开启后,联机时候禁用全部官服将',
        init: true,
    },
    还原初始牌堆: {
        name: '<span class="Qmenu">还原初始牌堆</span>',
        intro: '开启后,会锁定牌堆为161张的军争牌堆',
        init: true,
    },
    温柔一刀牌堆: {
        name: '<span class="Qmenu">温柔一刀牌堆</span>',
        intro: '开启后,将会加入温柔一刀的专属卡牌',
        init: false,
    },
    卡牌加入牌堆: {
        name: '<span class="Qmenu">卡牌加入牌堆</span>',
        intro: '开启后,将每种牌名的牌加入牌堆一张',
        init: false,
    },
    收藏武将修改: {
        name: '<span class="Qmenu">收藏武将修改</span>',
        intro: '开启后,修改收藏武将为三服单挑榜前二十五',
        init: false,
    },
    武将全部可选: {
        name: '<span class="Qmenu">武将全部可选</span>',
        intro: '开启后,任何禁将、隐藏武将、BOSS武将都会变得可选,你甚至可以在BOSS模式用BOSS自己打自己',
        init: false,
    },
    禁止摸牌平局: {
        name: '<span class="Qmenu">禁止摸牌平局</span>',
        intro: '开启后,禁止因摸牌导致的平局,防止空摸,防止摸非整数牌,防止摸光牌堆,牌堆加弃牌堆的牌数少于初始牌堆的一半时,将初始牌堆的牌全部放回牌堆',
        init: true,
    },
    禁止多次触发: {
        name: '<span class="Qmenu">禁止多次触发</span>',
        intro: '开启后,将会修改全场技能的使用次数为最多每回合五次',
        init: false,
    },
    禁止循环触发: {
        name: '<span class="Qmenu">禁止循环触发</span>',
        intro: '开启后,禁止所有左脚踩右脚上天的循环触发技能',
        init: true,
    },
    禁止封禁技能: {
        name: '<span class="Qmenu">禁止封禁技能</span>',
        intro: '开启后,所有封禁技能的效果将会无效(并不阻止移除技能)',
        init: true,
    },
    禁止封禁出牌: {
        name: '<span class="Qmenu">禁止封禁出牌</span>',
        intro: '开启后,所有封禁出牌的效果将会无效',
        init: false,
    },
    全局技能拦截: {
        name: '<span class="Qmenu">全局技能拦截</span>',
        intro: '开启后,将会拦截非本体和非本扩展全局技能的添加',
        init: false,
    },
    飞扬跋扈模式: {
        name: '<span class="Qmenu">飞扬跋扈</span>',
        intro: '开启后,将会添加全局性效果:游戏开始时获得两点护甲.按数值增加准备阶段摸牌数、每回合出杀与酒的次数,并减少与其他角色的距离.在判定阶段开始时,可以弃置两张牌,移除判定区的一张牌',
        init: 0,
        item: {
            0: '<span class="Qmenu">关闭</span>',
            1: '<span class="Qmenu">1</span>',
            2: '<span class="Qmenu">2</span>',
            3: '<span class="Qmenu">3</span>',
            4: '<span class="Qmenu">4</span>',
            5: '<span class="Qmenu">5</span>',
            6: '<span class="Qmenu">6</span>',
        },
    },
    平衡: {
        name: '<span class="Qmenu">全场手牌上限</span>',
        init: 999,
        intro: '手牌超出预设上限则禁止获得牌',
        item: {
            10: '<span class="Qmenu">10</span>',
            15: '<span class="Qmenu">15</span>',
            20: '<span class="Qmenu">20</span>',
            25: '<span class="Qmenu">25</span>',
            30: '<span class="Qmenu">30</span>',
            35: '<span class="Qmenu">35</span>',
            40: '<span class="Qmenu">40</span>',
            45: '<span class="Qmenu">45</span>',
            50: '<span class="Qmenu">50</span>',
            55: '<span class="Qmenu">55</span>',
            60: '<span class="Qmenu">60</span>',
            999: '<span class="Qmenu">999</span>',
        },
    },
    滚轮速度: {
        name: '<span class="Qmenu">滚轮速度</span>',
        init: 10,
        intro: '滚轮速度',
        item: {
            5: '<span class="Qmenu">5</span>',
            10: '<span class="Qmenu">10</span>',
            15: '<span class="Qmenu">15</span>',
            20: '<span class="Qmenu">20</span>',
            25: '<span class="Qmenu">25</span>',
        },
    },
    右键宽度修改: {
        name: '<span class="Qmenu">右键宽度修改</span>',
        init: '600px',
        intro: '开启后,会增加右键武将详细信息的宽度,一般适合电脑端使用',
        item: {
            '400px': '<span class="Qmenu">400px</span>',
            '500px': '<span class="Qmenu">500px</span>',
            '600px': '<span class="Qmenu">600px</span>',
            '700px': '<span class="Qmenu">700px</span>',
            '800px': '<span class="Qmenu">800px</span>',
        },
    },
    彩蛋: {
        name: '<span class=/"firetext/" style="font-size: 20px;">彩蛋</span>',
        clear: true,
        onclick: function () {
            if (this.innerHTML != '<span class=/"firetext/" style="font-size: 20px;">确认彩蛋</span>' && this.innerHTML != '<span class=/"firetext/" style="font-size: 20px;">是否开启无双模式</span>') {
                this.innerHTML = '<span class=/"firetext/" style="font-size: 20px;">确认彩蛋</span>';
                new Promise(resolve => setTimeout(resolve, 400)).then(() => this.innerHTML = '<span class=/"firetext/" style="font-size: 20px;">彩蛋</span>');
                return;
            }
            if (this.innerHTML != '<span class=/"firetext/" style="font-size: 20px;">是否开启无双模式</span>') {
                this.innerHTML = '<span class=/"firetext/" style="font-size: 20px;">是否开启无双模式</span>';
                return;
            }
            game.log('<span style="color:#ED0A41;"font-size: 30px;">画戟饮尽神佛血,再乘赤兔踏乾坤</span>');
            game.players.filter((Q) => { if (Q == game.me) Q.reinit('Q', 'QQQ_神吕布') });
        },
    },
    QQQ: {
        name: '<span class="Qmenu">QQQ</span>',
        clear: true,
        onclick: function () {
            if (this.previousSibling) {
                this.parentNode.insertBefore(this, this.previousSibling);
            }
            // if (this.parentNode.previousSibling) {
            //     this.parentNode.parentNode.insertBefore(this.parentNode, this.parentNode.previousSibling);
            // }
        },
    },
    扩展清空: {
        name: '<span class="Qmenu">扩展清空</span>',
        intro: '开启后,直接清空游戏存储的扩展',
        init: false,
    },
    扩展恢复: {
        name: '<span class="Qmenu">扩展恢复</span>',
        intro: '开启后,恢复游戏存储的扩展',
        init: false,
    },
    扩展修改: {
        name: '<span class="Qmenu">扩展修改</span>',
        intro: '开启后,直接修改游戏存储的扩展',
        init: false,
    },
};
if (lib.config.extension_温柔一刀_全部关闭) {
    for (const i in config) {
        if (config[i].init && i != '全部关闭' && lib.config[`extension_温柔一刀_${i}`]) {
            game.saveConfig(`extension_温柔一刀_${i}`, false);
        }
    }
}