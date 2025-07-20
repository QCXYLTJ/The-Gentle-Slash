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
const character = {
    QQQ_测试: {
        sex: 'male',
        hp: 10,
        maxHp: 10,
        skills: ['bug', '测试', 'yinyueqiang'],
    },
    QQQ_距离掌控者: {
        sex: 'male',
        skills: ['olzhuiji', 'xinkuanggu', 'reduanbing', 'reanjian', 'xinbenxi', 'kaikang', '义从', '避乱'],
        isBoss: true,
        isBossAllowed: true,
    },
    QQQ_装备: {
        sex: 'female',
        skills: ['ganlu', 'xiaoji', 'olqizhou', 'qiangxix', 'qiaoli', 'olshengong', 'olqisi', 'gzjili', 'olxuanfeng'],
        isBoss: true,
        isBossAllowed: true,
    },
    QQQ_反面: {
        sex: 'male',
        skills: ['refangzhu', 'rejunxing', 'oldaili', 'xinshensu', 'shebian', 'dcjiushi', 'renxin', 'lulve', 'lxzhuixi', 'xinfuli', 'lihun', 'xinjushou', 'xinjiewei'],
        isBoss: true,
        isBossAllowed: true,
    },
    QQQ_体力上限: {
        sex: 'male',
        hp: 2,
        maxHp: 2,
        skills: ['慧识', '正订', 'tianren', '三窟'],
        isBoss: true,
        isBossAllowed: true,
    },
    QQQ_体力游戏: {
        sex: 'male',
        skills: ['luochong', 'huituo', 'gzbuqu', 'gzbuqu_recover', 'buqu', 'yuce', 'xinenyuan', 'qingxian'],
        isBoss: true,
        isBossAllowed: true,
    },
    QQQ_天妒: {
        sex: 'male',
        skills: ['chouce', 'dctianji', 'reganglie', 'dcanzhi', 'dcxialei', 'olbeige', 'xinleiji', 'huituo', 'bagua_skill'],
        isBoss: true,
        isBossAllowed: true,
    },
    QQQ_高达: {
        sex: 'female',
        skills: ['连营', '冲阵'],
        isBoss: true,
        isBossAllowed: true,
    },
    QQQ_祭风: {
        sex: 'male',
        hp: 81,
        maxHp: 81,
        skills: ['镶星', '星陨'],
        isBoss: true,
        isBossAllowed: true,
    },
    QQQ_拼点: {
        sex: 'male',
        skills: ['lieren', 'zhuandui', 'tianbian', 'tianyi', 'hanzhan', 'rezhuikong', 'gushe', 'reqiaoshui', 'jyzongshi', 'quhu', 'shuimeng', 'dcshuangren', 'clanliuju', 'decadexianzhen'],
    },
    QQQ_南蛮: {
        sex: 'male',
        skills: ['mansi', 'juxiang', 'spmanwang', 'huoshou'],
    },
    QQQ_反伤: {
        sex: 'male',
        hp: 6,
        maxHp: 6,
        skills: ['冯河', '杀', '杀杀', '杀杀杀'],
    },
    QQQ_判定: {
        sex: 'male',
        skills: ['改命', '伤神', '擅专'],
    },
    QQQ_夫子: {
        sex: 'female',
        hp: 7,
        maxHp: 7,
        skills: ['无矩'],
    },
    QQQ_西素惊鸿: {
        sex: 'female',
        maxHp: 5,
        skills: ['自伤', '隐忍'],
    },
    QQQ_东苍孤煞: {
        sex: 'male',
        hp: 9,
        maxHp: 9,
        skills: ['血莲'],
    },
    QQQ_吴懿关张: {
        sex: 'male',
        skills: ['xinbenxi', 'fuhun'],
    },
    QQQ_longwei: {
        sex: 'male',
        skills: ['龙威', '连锁'],
    },
    QQQ_北绝玄冥: {
        sex: 'female',
        skills: ['乱世', '全判定'],
    },
    QQQ_食尸鬼: {
        sex: 'male',
        skills: ['食尸', 'QQQ_zhendu'],
    },
    QQQ_超级乌龟: {
        sex: 'male',
        hp: 3,
        maxHp: 3,
        skills: ['慈孝', '减伤'],
    },
    QQQ_势力: {
        sex: 'male',
        skills: ['zongzuo', 'sptunjiang', 'rezishou', 'zongshi', 'xinfuli', 'yongsi'],
    },
    QQQ_平衡: {
        sex: 'male',
        skills: ['平衡'],
    },
    QQQ_南殷崇岳: {
        sex: 'male',
        skills: ['酉鸡', '御策'],
    },
    QQQ_剑宝: {
        sex: 'female',
        skills: ['QQQ_tonghua', '寄生', '暝', '寒'],
    },
    QQQ_晦暝: {
        sex: 'male',
        hp: 2,
        maxHp: 2,
        skills: ['寒_1'],
    },
    QQQ_归终: {
        sex: 'female',
        skills: ['奇械', '战陨'],
    },
    QQQ_马保国: {
        sex: 'male',
        hp: 3,
        maxHp: 3,
        skills: ['武德', '大意', '连鞭', '偷袭'],
    },
    QQQ_赌徒: {
        sex: 'male',
        skills: ['赌'],
    },
    QQQ_强夺: {
        sex: 'female',
        skills: ['强夺', '设伏'],
    },
    QQQ_关张刘焉: {
        sex: 'male',
        skills: ['fuhun', 'xinfu_tushe'],
    },
    QQQ_莫逍遥: {
        sex: 'male',
        skills: ['募集', '治军', '康济'],
    },
    QQQ_驭衡: {
        sex: 'male',
        skills: ['帝力', '驭衡'],
    },
    QQQ_顾曲: {
        sex: 'male',
        skills: ['顧曲', '雅量', '英才'],
    },
    QQQ_神裁: {
        sex: 'male',
        skills: ['神裁'],
    },
    QQQ_哦哦: {
        sex: 'female',
        skills: ['QQQ_xipai', 'QQQ_zhang'],
    },
    QQQ_全装备: {
        sex: 'male',
        skills: ['全装备', 'xiaoji', 'olqizhou', 'xuanfeng', 'ganlu'],
    },
    QQQ_复活: {
        sex: 'female',
        skills: ['复活', '奇取', '假意'],
    },
    QQQ_穆穆: {
        sex: 'female',
        skills: ['锥锋', 'QQQ_三刀'],
    },
    QQQ_莫莫: {
        sex: 'female',
        skills: ['天辩', 'regushe'],
    },
    QQQ_古木: {
        sex: 'male',
        skills: ['偏执', '乱码', 'olluanji'],
    },
    QQQ_不疑曹轶: {
        sex: 'male',
        skills: ['dcyinjun', 'dcsilun'],
    },
    QQQ_天师马师: {
        sex: 'male',
        skills: ['zlshoufu', 'yimie'],
    },
    QQQ_伤逝约俭: {
        sex: 'female',
        skills: ['shangshi', 'spyuejian'],
    },
    QQQ_贾诩王凌: {
        sex: 'male',
        skills: ['reluanwu', 'clanzhongliu'],
    },
    QQQ_灵毓陈宫: {
        sex: 'male',
        skills: ['dcxinyou', 'sbzhichi'],
    },
    QQQ_满宠芳兰: {
        sex: 'male',
        skills: ['dcluochong', 'junxing'],
    },
    QQQ_太后朱然: {
        sex: 'male',
        skills: ['olddanshou', 'zhendu'],
    },
    QQQ_花鬘张飞: {
        sex: 'male',
        skills: ['spfangzong', 'shencai'],
    },
    QQQ_关羽管宁: {
        sex: 'male',
        skills: ['sbwusheng', 'dunshi'],
    },
    QQQ_笮融陈宫: {
        sex: 'male',
        skills: ['dccansi', 'sbzhichi'],
    },
    QQQ_卢弈辛毗: {
        sex: 'male',
        skills: ['dcyaoyi', 'spyinju'],
    },
    QQQ_沮授陈宫: {
        sex: 'male',
        skills: ['dcshibei', 'sbzhichi'],
    },
    QQQ_摸与杀: {
        sex: 'female',
        skills: ['摸与杀'],
    },
    QQQ_隐伏: {
        sex: 'male',
        hp: 1,
        maxHp: 6,
        skills: ['隐伏', '问仇'],
    },
    QQQ_马克思: {
        sex: 'male',
        skills: ['革命', '静气'],
    },
    QQQ_乾明: {
        sex: 'male',
        skills: ['乾明'],
    },
    QQQ_污染: {
        sex: 'male',
        skills: ['掠夺', '卫境'],
    },
    QQQ_燃灯古佛: {
        sex: 'male',
        skills: ['合并时间线'],
    },
    QQQ_许天: {
        sex: 'male',
        skills: ['乾坤大挪移', '漫卷'],
    },
    QQQ_许贡: {
        sex: 'male',
        skills: ['门客', '博弈'],
    },
    QQQ_伤害: {
        sex: 'female',
        skills: ['伤害', '自书'],
    },
    QQQ_斩杀: {
        sex: 'female',
        skills: ['斩杀', '群起'],
    },
    QQQ_潜水的火: {
        sex: 'female',
        skills: ['合包'],
    },
    QQQ_SB: {
        sex: 'female',
        skills: ['魔翼'],
    },
    QQQ_花招: {
        sex: 'female',
        skills: ['花招', '置幻'],
    },
    QQQ_影火: {
        sex: 'female',
        skills: ['影火'],
    },
    QQQ_祝融: {
        sex: 'female',
        skills: ['求贤若渴', '武绝'],
    },
    QQQ_biaoji: {
        sex: 'female',
        skills: ['QQQ_biaoji'],
    },
    QQQ_诗寇蒂: {
        sex: 'female',
        skills: ['诗寇蒂的剪刀'],
    },
    QQQ_祢衡: {
        sex: 'male',
        skills: ['QQQ_yuepu', 'QQQ_taye', 'QQQ_yaoyi'],
    },
    QQQ_香陨: {
        sex: 'female',
        skills: ['QQQ_xiangyun'],
    },
    QQQ_抗揍: {
        sex: 'male',
        skills: ['QQQ_kangzou'],
    },
    QQQ_liuyan: {
        sex: 'male',
        skills: ['QQQ_pianan', 'QQQ_tushe'],
    },
    QQQ_eryuan: {
        sex: 'male',
        skills: ['QQQ_neifa'],
    },
    QQQ_mengwanqing: {
        sex: 'female',
        skills: ['QQQ_zhuiyi', 'QQQ_shenshang'],
    },
    QQQ_huangzhong: {
        sex: 'male',
        skills: ['QQQ_chuanyang', 'QQQ_lieshi'],
    },
    QQQ_Q: {
        sex: 'female',
        skills: ['QQQ_摸牌', 'QQQ_出牌'],
    },
    QQQ_普通卖血: {
        sex: 'female',
        hp: 10,
        maxHp: 10,
        skills: ['普通卖血'],
    },
    QQQ_摸六三刀: {
        sex: 'male',
        skills: ['持纲1', '持纲2', '持纲3', '持纲4'],
    },
    QQQ_qianbian: {
        sex: 'female',
        skills: ['QQQ_bianshen'],
    },
    QQQ_longjing: {
        sex: 'male',
        skills: ['QQQ_longjing'],
    },
};
const characterIntro = {
    QQQ_许天: '设计者:秋(1138146139)<br>编写者:潜在水里的火(1476811518)<br>许天没有回头,而在他背后混沌与火的狂潮中,那撕裂时间的恶魔对着他狂笑.<br>世界在这一刻步入终结,就像怀表摔碎在石面.<br>聆听,那最后一声回响.<br>三十五亿光年的黑暗将他吞噬,星空,近在咫尺',
    QQQ_祝融: '在掠过高塔之侧的微湿海风吹拂下,少女长直的发丝飘扬到空中<br>一些顽皮的发丝从她的面前拂过,扰乱了她的视野<br>她急忙用手拨开发丝,继续从窗口处探出头去,紧盯着西面的海域<br>因她的动作过于猛烈,停在窗口处的海鸥受惊,高鸣一声便远远飞开<br>浮在海面上的落日将这片海域映衬成极亮的红色,反射到立于海上的高塔的狭窄窗口之中<br>在一天中,仅有这一点时间,这个背光的塔室才会进入一点阳光<br>少女紧盯着那灿红的海面,不知是何故,连她的瞳孔也同时变成了那灿红,就像熔金流淌在她的眼中<br>无形的魔法元素正在虚空中聚集,被一个巨型魔力阵召唤而来,只等待被引导,爆发<br>她等待此刻,已经等了一百二十七年<br>落日继续下沉,这一刹的光辉即将被收走<br>天地间忽然暗了一瞬,一种压倒万物的光绽放了出来,<br>那禁锁神明的高塔,被炸得四分五裂,<br>在其中沐光升起的少女,金芒璀璨,如神临世',
    QQQ_乾明: '天启之诗第十四条,当命途虚幻离常,誓者从梦中惊醒,开始谱写永生的篇章',
    QQQ_污染: '设计者:秋(1138146139)<br>编写者:潜在水里的火(1476811518)<br>他听得见火焰的咆哮,那一刻,毕加索的阿尔及尔女人再一次用她闪亮裸露的胸部盯住了他的双眼.<br>波形图在分崩离析,只有无规律的音波持续穿透他的鼓膜.<br>世界随着目光陨灭,而后是新的黎明.<br>他睁开眼,面前一片洁白.<br>是熟悉的天花板.<br><环康工业区于昨天下午发生一起爆炸事件.....><br>滋滋作响的电流声穿插在主持人的普通话里,那台电视着实有些老旧.<br>许天动了动手臂,尝试着翻身坐起来.可惜失败了.<br>他仍然保持着歪曲的姿势躺在沙发上.<br>宿醉加嗑药的后遗症仍在控制着他的躯体',
    QQQ_燃灯古佛: '无量岂因劫故,永生只在无量前',
    QQQ_斩杀: '设计者:终日羽禁(2071396668)<br>编写者:潜在水里的火(1476811518)<br>三界之内,并没有真正的避世之所.<br>而斩杀,就是那收割亿万浑浑噩噩生灵的刀刃,他所过之处,所有圈地自萌的美梦都会破灭.<br>他会用刀锋和烈火,让苟且偷生的芸芸众生,重新回忆起宇宙真实的残酷.<br>而在劫火重重之中,行将焚烬者觳觫呻吟,临近涅槃者怀炎于身.<br>弱者唯一的价值,就是化作他飞仙路上与万族天骄争霸的底蕴',
    QQQ_伤害: '在世界的尖端,那翘曲的边缘,振动着的,是弦.<br>不可计数的色彩在弦上涌动,大基数的超平面在一个瞬时中折叠翻转,奏成了这多元宇宙末梢永恒的乐曲.<br>层层叠叠的光影漩涡试图吞噬每一个通过星界航线跃迁而来的旅者,但力场膜忠实的保卫着它的乘客.<br><哇!好壮观啊!>一个穿着银领风衣的人透过流线型的舷窗看着那流光溢彩.<br><壮观?>他的同伴摇了摇头,<即使是那最小的漩涡,也能够轻松撕碎吞噬掉一个小型星系',
    QQQ_潜水的火: '十二州的月,始终照耀暗夜中的行者,默默地做那唯一又沉默的观众.<br>它的确是个完美的观众,既不会惊恐尖叫,也不会慌乱逃跑.<br>那皎洁如一的月光,温柔的抚慰着逐渐僵冷的尸体和凝固的鲜血.<br>许天借着月光从地上捡起来一幅镶金的地图,地图已经被血浸染,辨认起来十分困难.<br>也许,接下来要向东走?<br><我觉得你应该向北,一路向北,直至大地都被冰雪封锁,万里皆白.><br>一个沙哑的声音穿透了重重林海传入许天的耳中.<br>下一刻,松风如浪,万木皆倾.<br>有一股气势磅礴如天般压了下来.<br>许天冷哼一声,收起来染血的地图,重新抽出了漆黑如墨的长剑:<装神弄鬼,出来受死!><br>一声轻叹就在他耳边响起:<我已经来了,只是凡人一叶障目,不见世上真佛.><br>话音刚落,那一片缓缓在他耳边飘落的竹叶翻转,璀璨至极的金莲佛光席卷而出,将这片竹林照耀的如同一轮大日坠落在此.<br>那漫天佛光逐渐收敛,金丝如线勾勒出一个人形.<br>许天见此做派,挑了挑眉:<秃驴,你说我要向北而去?理由是什么?><br>金光人形略施一礼:<阿弥陀佛,施主一路行来,多造杀业,实乃苍生不幸.不过我知施主跟脚,所以我并非是来与施主为敌,只是来告知施主,此事唯有北极仙宫可解,施主可速去,莫要再造杀业.><br><北极仙宫?>许天将这个词在记忆中盘旋了一会,并未找到任何相关记忆.<br>此时那道金光人形正在缓缓隐去.<br>许天突然狂笑起来:<秃驴!我杀这众生刍狗,难道不是应了天道?且吃我一剑,让你看看何为天锋无情,哈哈哈!><br>许天一剑斩出,天地色变.<br>那金光被斩的扭了一扭,直接遁入了地底<br>',
    QQQ_xiangyun: '设计者:夜白神略扩展作者(2581926759)<br>编写者:潜在水里的火(1476811518)',
    QQQ_mengwanqing: '设计者:梦婉清(3541725571)<br>编写者:潜在水里的火(1476811518)',
    QQQ_huangzhong: '设计者:裸睡天依(2847826324)<br>编写者:潜在水里的火(1476811518)',
    QQQ_liuyan: '设计者:裸睡天依(2847826324)<br>编写者:潜在水里的火(1476811518)',
    QQQ_祢衡: '设计者:平西镇北征南破东定中拢左揽右震天憾地司马(2782283582)<br>编写者:潜在水里的火(1476811518)',
    QQQ_biaoji: '设计者:苏见笑(1061505348)<br>编写者:潜在水里的火(1476811518)',
    QQQ_花招: '设计者:海国图志扩展作者(2082429501)<br>编写者:潜在水里的火(1476811518)',
    QQQ_归终: '设计者:秋(1138146139)<br>编写者:潜在水里的火(1476811518)',
    QQQ_剑宝: '设计者:名号已不可考,但是是第一个单主,但是最后没给钱<br>编写者:潜在水里的火(1476811518)',
    QQQ_马保国: '设计者:第二个单主,给钱了<br>编写者:潜在水里的火(1476811518)',
    QQQ_赌徒: '设计者:第二个单主,给钱了<br>编写者:潜在水里的火(1476811518)',
    QQQ_强夺: '设计者:第二个单主,给钱了<br>编写者:潜在水里的火(1476811518)',
    QQQ_莫逍遥: '设计者:第三个单主,给钱了<br>编写者:潜在水里的火(1476811518)',
    QQQ_顾曲: '设计者:第四个单主,给钱了<br>编写者:潜在水里的火(1476811518)',
    QQQ_夫子: '设计者:秋(1138146139)<br>编写者:潜在水里的火(1476811518)',
    QQQ_西素惊鸿: '设计者:第五个单主,给钱了<br>编写者:潜在水里的火(1476811518)',
    QQQ_复活: '设计者:秋(1138146139)<br>编写者:潜在水里的火(1476811518)',
    QQQ_东苍孤煞: '设计者:秋(1138146139)<br>编写者:潜在水里的火(1476811518)',
    QQQ_隐伏: '设计者:秋(1138146139)<br>编写者:潜在水里的火(1476811518)',
    QQQ_longwei: '设计者:风羽/wn(1092917020)<br>编写者:潜在水里的火(1476811518)',
    QQQ_马克思: '设计者:YaTes(601902458)<br>编写者:潜在水里的火(1476811518)',
}; //武将简介
const characterTitle = {
    QQQ_距离掌控者: `<b style='color: #00FFFF; font-size: 25px;'>秣馬厲兵  枕戈待戰</b>`,
    QQQ_装备: `<b style='color: #00FFFF; font-size: 25px;'>劍戟崢嶸  斧鉞湯鑊</b>`,
    QQQ_反面: `<b style='color: #00FFFF; font-size: 25px;'>翻手為雲  覆手為雨</b>`,
    QQQ_体力上限: `<b style='color: #00FFFF; font-size: 25px;'>倚星折月  天輝易逝</b>`,
    QQQ_体力游戏: `<b style='color: #00FFFF; font-size: 25px;'>撫琴撥弦  悠然自得</b>`,
    QQQ_天妒: `<b style='color: #00FFFF; font-size: 25px;'>天衍四九  人遁其一</b>`,
    QQQ_高达: `<b style='color: #00FFFF; font-size: 25px;'>千里一怒  紅蓮燦世</b>`,
    QQQ_祭风: `<b style='color: #00FFFF; font-size: 25px;'>霆霓飄霖  星隕如雨</b>`,
    QQQ_判定: `<b style='color: #00FFFF; font-size: 25px;'>雷霆之誅  滅軍毀城</b>`,
    QQQ_无极: `<b style='color: #00FFFF; font-size: 25px;'>燭淚堆紅  幾人歌吹</b>`,
    QQQ_影火: `<b style='color: #00FFFF; font-size: 25px;'>紅蓮業火  燔燼須彌</b>`,
    QQQ_诗寇蒂: `<b style='color: #00FFFF; font-size: 25px;'>霧熒風曜  星灼九霄</b>`,
    QQQ_哦哦: `<b style='color: #00FFFF; font-size: 25px;'>風雨晦暝  不動如山</b>`,
    QQQ_花招: `<b style='color: #00FFFF; font-size: 25px;'>芒昇而掩朗月  道彰而移群星</b>`,
    QQQ_北绝玄冥: `<b style='color: #00FFFF; font-size: 25px;'>星河瀾雨,若淚繽紛  北斗傷風,亦墮凡塵</b>`,
    QQQ_mengwanqing: '婉清挽情挽不住情',
}; //武将绰号
const translate2 = {
    技能堆叠: '技能堆叠',
    惊艳一枪: '惊艳一枪(狂)',
    温柔一刀: `温柔一刀(龙)`,
    伤心一箭: '伤心一箭(啸)',
    朝天一棍: '朝天一棍(天)',
    QQQ_longjing: '龙境',
    QQQ_huangzhong: '✫黄忠',
    QQQ_mengwanqing: '梦婉清',
    QQQ_eryuan: '二袁',
    QQQ_qianbian: '千变',
    QQQ_liuyan: '刘焉',
    QQQ_抗揍: '抗揍',
    QQQ_香陨: '香陨',
    QQQ_祢衡: '祢衡',
    QQQ_诗寇蒂: '诗寇蒂',
    QQQ_biaoji: '标记',
    QQQ_祝融: '祝融',
    QQQ_影火: '影火',
    QQQ_花招: '花招',
    QQQ_SB: 'SB',
    QQQ_潜水的火: '潜水的火',
    QQQ_斩杀: '斩杀',
    QQQ_贾诩王凌: '贾诩王凌',
    QQQ_天师马师: '天师马师',
    QQQ_伤逝约俭: '伤逝约俭',
    QQQ_关羽管宁: '关羽管宁',
    QQQ_沮授陈宫: '沮授陈宫',
    QQQ_伤害: '伤害',
    QQQ_食尸鬼: '食尸鬼',
    QQQ_装备: '装备',
    QQQ_拼点: '拼点',
    QQQ_南蛮: '南蛮',
    QQQ_距离掌控者: '距离掌控者',
    QQQ_超级乌龟: '超级乌龟',
    QQQ_势力: '势力',
    QQQ_反面: '反面',
    QQQ_关张刘焉: '关张刘焉',
    QQQ_平衡: '平衡',
    QQQ_南殷崇岳: '南殷崇岳',
    QQQ_摸六三刀: '摸六三刀',
    QQQ_体力上限: '体力上限',
    QQQ_反伤: '反伤',
    QQQ_体力游戏: '体力游戏',
    QQQ_天妒: '天妒',
    QQQ_剑宝: '剑宝',
    QQQ_晦暝: '晦暝',
    QQQ_归终: '归终',
    QQQ_马保国: '马保国',
    QQQ_赌徒: '赌徒',
    QQQ_强夺: '强夺',
    QQQ_判定: '判定',
    QQQ_高达: '高达',
    QQQ_莫逍遥: '莫逍遥',
    QQQ_Q: 'Q',
    QQQ_驭衡: '驭衡',
    QQQ_顾曲: '顾曲',
    QQQ_神裁: '神裁',
    QQQ_哦哦: '哦哦',
    QQQ_夫子: '夫子',
    QQQ_全装备: '全装备',
    QQQ_西素惊鸿: '西素惊鸿',
    QQQ_复活: '复活',
    QQQ_穆穆: '穆穆',
    QQQ_莫莫: '莫莫',
    QQQ_古木: '古木',
    QQQ_祭风: '祭风',
    QQQ_东苍孤煞: '东苍孤煞',
    QQQ_测试: '测试',
    QQQ_吴懿关张: '吴懿关张',
    QQQ_笮融陈宫: '笮融陈宫',
    QQQ_不疑曹轶: '不疑曹轶',
    QQQ_灵毓陈宫: '灵毓陈宫',
    QQQ_满宠芳兰: '满宠芳兰',
    QQQ_太后朱然: '太后朱然',
    QQQ_花鬘张飞: '花鬘张飞',
    QQQ_卢弈辛毗: '卢弈辛毗',
    QQQ_摸与杀: '摸与杀',
    QQQ_普通卖血: '普通卖血',
    QQQ_隐伏: '隐伏',
    QQQ_longwei: '龙威',
    QQQ_马克思: '马克思',
    QQQ_乾明: '乾明',
    QQQ_污染: '污染',
    QQQ_燃灯古佛: '燃灯古佛',
    QQQ_北绝玄冥: '北绝玄冥',
    QQQ_许天: '许天',
    QQQ_许贡: '许贡',
};
const sort = {
    技能堆叠: ['QQQ_距离掌控者', 'QQQ_装备', 'QQQ_反面', 'QQQ_体力上限', 'QQQ_体力游戏', 'QQQ_天妒', 'QQQ_拼点', 'QQQ_南蛮', 'QQQ_判定', 'QQQ_吴懿关张', 'QQQ_食尸鬼', 'QQQ_势力', 'QQQ_关张刘焉', 'QQQ_驭衡', 'QQQ_全装备', 'QQQ_不疑曹轶', 'QQQ_天师马师', 'QQQ_伤逝约俭', 'QQQ_贾诩王凌', 'QQQ_灵毓陈宫', 'QQQ_满宠芳兰', 'QQQ_太后朱然', 'QQQ_花鬘张飞', 'QQQ_关羽管宁', 'QQQ_笮融陈宫', 'QQQ_卢弈辛毗', 'QQQ_沮授陈宫', 'QQQ_摸与杀', 'QQQ_潜水的火', 'QQQ_qianbian'],
    惊艳一枪: [],
    温柔一刀: [],
    伤心一箭: [],
    朝天一棍: [],
}; //155
const num = Math.ceil(Object.keys(character).length / 4);
var num1 = 0;
for (const i in character) {
    const info = character[i];
    if (info.isBoss) {
        QQQ.boss.push(i);
    }
    num1++;
    if (0 < num1 && num1 <= num) {
        info.group = '狂';
        if (!sort.技能堆叠.includes(i)) {
            sort.惊艳一枪.add(i);
        }
    } else if (num < num1 && num1 <= num * 2) {
        info.group = '龙';
        if (!sort.技能堆叠.includes(i)) {
            sort.温柔一刀.add(i);
        }
    } else if (num * 2 < num1 && num1 <= num * 3) {
        info.group = '啸';
        if (!sort.技能堆叠.includes(i)) {
            sort.伤心一箭.add(i);
        }
    } else if (num * 3 < num1 && num1 <= num * 4) {
        info.group = '天';
        if (!sort.技能堆叠.includes(i)) {
            sort.朝天一棍.add(i);
        }
    }
    if (!info.hp) {
        info.hp = 4;
    }
    if (!info.maxHp) {
        info.maxHp = 4;
    }
    info.isZhugong = true;
    info.trashBin = [`ext:温柔一刀/image/${i}.jpg`];
    info.dieAudios = [`ext:温柔一刀/die/${i}.mp3`];
    translate2[i] = `<span class="flame">火</span>${translate2[i]}`;
    if (QQQ.config.AI禁用) {
        lib.config.forbidai.add(i); //将包仅点将可用
        info.isAiForbidden = true; //之前的单将Forbidai
    }
}
lib.characterSort.温柔一刀 = sort;
Object.assign(lib.translate, translate2);
Object.assign(lib.character, character); //不管game.import导入的或者package导入的,都会仅点将可用forbidai_user加入forbidai里面,但是直接导入lib.character不会,所以不能AI禁用
Object.assign(lib.characterIntro, characterIntro);
Object.assign(lib.characterTitle, characterTitle);
lib.characterPack.温柔一刀 = character;
lib.translate.温柔一刀_character_config = `<img src="extension/温柔一刀/other/The-Gentle-Slash.png"width="120"height="30">`;
lib.config.all.characters.add('温柔一刀');
lib.config.characters.add('温柔一刀');
_status.gentle.character = character;
_status.gentle.translate2 = translate2;
