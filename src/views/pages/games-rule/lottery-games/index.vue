<template>
    <div class="lottery-games">
        <main-container-title class="big-title">
                时时彩玩法规则
            </main-container-title>
        <div class="lottery-games-article">
            <main-container-title>
                两面玩法
            </main-container-title>
            <main-container-content>
                <div class="main-container-content__text"> 大小<br>开奖结果万位、千位、百位、十位或个位数字为5、6、7、8、9时为“大”，若为0、1、2、3、4时为“小”，当投注位数大小与开奖结果的位数大小相符时，即为中奖。<br>※举例：投注者购买百位小，当期开奖结果如为20352（3为小），则视为中奖。</div>
                <div class="main-container-content__text">单双<br>开奖结果万位、千位、百位、十位或个位数字为1、3、5、7、9时为“单”，若为0、2、4、6、8时为“双”，当投注位数单双与开奖结果的位数单双相符时，即为中奖。<br>※举例:投注者购买百位单，当期开奖结果如为20130（1为单），则视为中奖。</div>
                <div class="main-container-content__text">总和</div>
                <div class="main-container-content__text">总大：开奖结果5个号码加起的总和，大于等于23为总大。<br>※举例：投注者购买总和大，当期开奖结果如为总数为28，则视为中奖。 </div>
                <div class="main-container-content__text">总小：开奖结果5个号码加起的总和，小于等于22为总小。<br>※举例：投注者购买总和小，当期开奖结果如为总数为18，则视为中奖。</div>
                <div class="main-container-content__text">总单：开奖结果5个号码加起的总和为单数。<br>※举例：投注者购买总和单，当期开奖结果如为总数为29，则视为中奖。 </div>
                <div class="main-container-content__text">总双：开奖结果5个号码加起的总和为双数。<br>※举例：投注者购买总和双，当期开奖结果如为总数为18，则视为中奖。</div>
            </main-container-content>
        </div>
        <div class="lottery-games-article">
            <main-container-title>
                龙虎
            </main-container-title>
            <main-container-content>
                <div class="main-container-content__text">龙：开出之号码第一球(万位)的中奖号码大于第五球(个位)的中奖号码，如出和局为打和。如：第一球开出4，第五球开出2； 第一球开出9，第五球开出8； 第一球开出5，第五球开出1...中奖为龙。</div>
                <div class="main-container-content__text">虎：开出之号码第一球(万位)的中奖号码小于第五球(个位)的中奖号码，如出和局为打和。如：第一球开出7，第五球开出9； 第一球开出3，第五球开出5； 第一球开出5，第五球开出8...中奖为虎。 </div>
                <div class="main-container-content__text">和：开出之号码第一球(万位)的中奖号码等于第五球(个位)的中奖号码 如：2***2则投注和局者视为中奖，其他视为不中奖。</div>
            </main-container-content>
        </div>
        <div class="lottery-games-article">
            <main-container-title>
                趣味玩法
            </main-container-title>
            <main-container-content>
                <div class="main-container-content__text">豹子：三个位置对应的中奖号码都相同。如：中奖号码为000、111、999等，则投注豹子者视为中奖，其它视为不中奖。</div>
                <div class="main-container-content__text">顺子：三个位置对应的中奖号码数字相连（不分顺序）。如：中奖号码为012、123、234、345等，则投注顺子者视为中奖，其它视为不中奖。</div>
                <div class="main-container-content__text">对子：三个位置对应的中奖号码中有且仅有两个号码相同（不包括豹子）。如：中奖号码为001，112、696等，则投注对子者视为中奖，其它视为不中奖。</div>
                <div class="main-container-content__text">杂六：不包括豹子、对子、顺子的其他中奖号码。如：中奖号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。</div>
            </main-container-content>
        </div>
        <div class="lottery-games-article">
            <main-container-title>
                数字盘玩法
            </main-container-title>
            <main-container-content>
                <div class="main-container-content__text">于万千百十个任选一位，自0~9任选1个号进行投注，当开奖结果与所选的定位与号码相同且顺序一致时，即为中奖。</div>
            </main-container-content>
        </div>
        <div class="lottery-games-article">
            <main-container-title>
                龙虎斗玩法
            </main-container-title>
            <main-container-content>
                <div class="main-container-content__text">龙虎游戏规则：龙虎是以开奖结果的五个数字作为基准，取任意位置（万、千、百、十、个）的数字进行组合大小比对的一种玩法； </div>
                <div class="main-container-content__text">当投注龙/虎时，开奖结果为和局，那么押注龙/虎视为不中奖；</div>
                <div class="main-container-content__text"> 当投注"和"时，开奖结果为龙/虎，投注“和”视为不中奖；</div>
                <div class="main-container-content__text">举例：开奖结果为：2,1,3,5,2 万为龙、千为龙虎时：结果 龙(2）大于虎（1），即为开龙；如万为龙，个为虎时，结果一样大，即为开和局！</div>
                <div class="main-container-content__text"> 说明：龙1 VS 虎2 即为万为龙，千为虎；龙2 VS 虎4 即为千为龙，十为虎；</div>
            </main-container-content>
        </div>
        <div class="lottery-games-article">
             <main-container-title class="big-title">
                PK10玩法规则
            </main-container-title>
            <main-container-title>
                单码/双面规则说明
            </main-container-title>
            <main-container-content>
                <div class="main-container-content__text">定位<br>指冠军、亚军、季军、第四、第五、第六、第七、第八、第九、第十名出现的顺序与号码为派彩依据 如第一个开奖号码为3号，投注冠军为3则视为中奖，其它号码视为不中奖。</div>
                <div class="main-container-content__text">大小</div>
                <div class="main-container-content__text">开出的号码大于或等于6为大，小于或等于5为小 。</div>
                <div class="main-container-content__text">单双</div>
                <div class="main-container-content__text"> 号码为双数叫双，如4、6；号码为单数叫单，如3、5。</div>
            </main-container-content>
        </div>
        <div class="lottery-games-article">
       
            <main-container-title>
                龙虎
            </main-container-title>
            <main-container-content>
                <div class="main-container-content__text">冠军龙虎 <br>* 龙：冠军号码大于第十名号码视为“龙”中奖，如冠军开出07，第十名开出03。</div>
                <div class="main-container-content__text">虎：冠军号码小于第十名号码视为“虎”中奖，如冠军开出03，第十名开出07。 </div>
                <div class="main-container-content__text">亚军龙虎<br> * 龙：亚军号码大于第九名号码视为“龙”中奖，如亚军开出07，第九名开出03。 </div>
                <div class="main-container-content__text">虎：亚军号码小于第九名号码视为“虎”中奖，如亚军开出03，第九名开出07。 </div>
                <div class="main-container-content__text">季军龙虎<br> * 龙：季军号码大于第八名号码视为“龙”中奖，如季军开出07，第八名开出03。</div>
                <div class="main-container-content__text">虎：季军号码小于第八名号码视为“虎”中奖，如季军开出03，第八名开出07。</div>
                <div class="main-container-content__text">第四名龙虎 <br>* 龙：第四名号码大于第七名号码视为“龙”中奖，如第四名开出07，第七名开出03。 </div>
                <div class="main-container-content__text">* 虎：第四名号码小于第七名号码视为“虎”中奖，如第四名开出03，第七名开出07。</div>
                <div class="main-container-content__text">第五名龙虎 <br>* 龙：第五名号码大于第六名号码视为“龙”中奖，如第五名开出07，第六名开出03。</div>
                <div class="main-container-content__text"> * 虎：第五名号码小于第六名号码视为“虎”中奖，如第五名开出03，第六名开出07。</div>
                <div class="main-container-content__text">冠亚军和<br>冠军号码与亚军号码的和值区间为3~19，当投注组合符合冠亚军和值，即视为中奖</div>
                <div class="main-container-content__text">冠亚军和大小<br>当开奖结果冠军号码与亚军号码的和值大于11为大，投注“和大”则视为中奖；小于等于11为小，投注“和小”则视为中奖。 </div>
                <div class="main-container-content__text">冠亚军和单双<br>当开奖结果冠军号码与亚军号码的和值为单数如9、13，投注“和单”则视为中奖；为双数如12、16，投注“和双”则视为中奖。</div>
            </main-container-content>
        </div>
          <div class="lottery-games-article">
             <main-container-title class="big-title">
                六合彩玩法规则
            </main-container-title>
            <main-container-title>
                特码玩法
            </main-container-title>
            <main-container-content>
                <div class="main-container-content__text">当期开出的最后一位号码为特码。当开出特码与投注号码一致、即视为中奖（其余情形视为不中奖）。</div>
                <div class="main-container-content__text">双面<br>对特码的大、小、单、双等形态进行投注，当开出特码对应形态与投注内容一致，即视为中奖（其余情形视为不中奖）。</div>
                <div class="main-container-content__text">大小：开出之特码大于或等于25为特码大，小于或等于24为特码小，开出49为和。</div>
                <div class="main-container-content__text">单双：特码为双数叫特双，如8、16；特码为单数叫特单，如21、35，开出49为和。</div>
                <div class="main-container-content__text">和大小：以特码个位和十位数字总和来判断胜负，和数大于或等于7为大，小于或等于6为小，开出49为和。</div>
                <div class="main-container-content__text">和单双：以特码个位和十位数字总和来判断单双，如01，12，32为和单，02，11，33为和双，开出49为和。</div>
                <div class="main-container-content__text"> 尾数大小：以特码个位数小于等于4时为尾小，大于等于5时为尾大；如01、32、44为特尾小；如05、18、19为特尾大，开出49为和。</div>
                <div class="main-container-content__text"> 尾数<br>对特码的个位数（即尾数）进行投注。当开出特码的尾数与投注内容一致，即视为中奖（其余情形视为不中奖）。</div>
                <div class="main-container-content__text">1尾 ：01，11，21，31，41</div>
                <div class="main-container-content__text">2尾 ：02，12，22，32，42</div>
                <div class="main-container-content__text">3尾 ：03，13，23，33，43 </div>
                <div class="main-container-content__text">4尾 ：04，14，24，34，44</div>
                <div class="main-container-content__text">5尾 ：05，15，25，35，45</div>
                <div class="main-container-content__text">6尾 ：06，16，26，36，46 </div>
                <div class="main-container-content__text">7尾 ：07，17，27，37，47</div>
                <div class="main-container-content__text">8尾 ：08，18，28，38，48 </div>
                <div class="main-container-content__text">9尾 ：09，19，29，39，49</div>
                <div class="main-container-content__text">0尾 ：10，20，30，40 </div>
                <div class="main-container-content__text">例如 ：开奖结果特别号码是21则 "1"尾为中奖，其他尾数都不中奖</div>
            </main-container-content>
        </div>
        <div class="lottery-games-article">
       
            <main-container-title>
                生肖玩法
            </main-container-title>
            <main-container-content>
                <div class="main-container-content__text">生肖顺序为 鼠 >牛 >虎 >兔 >龙 >蛇 >马 >羊 >猴 >鸡 >狗 >猪。 </div>
                <div class="main-container-content__text"> 如今年是狗年，就以狗为开始，依顺序将49个号码分为12个生肖(如下)，再以生肖下注。 </div>
                <div class="main-container-content__text">狗 01 , 13 , 25 , 37 , 49 </div>
                <div class="main-container-content__text">猪 12 , 24 , 36 , 48</div>
                <div class="main-container-content__text">鼠 11 , 23 , 35 , 47</div>
                <div class="main-container-content__text">牛 10 , 22 , 34 , 46 </div>
                <div class="main-container-content__text">虎 09 , 21 , 33 , 45 </div>
                <div class="main-container-content__text">兔 08 , 20 , 32 , 44 </div>
                <div class="main-container-content__text">龙 07 , 19 , 31 , 43</div>
                <div class="main-container-content__text">蛇 06 , 18 , 30 , 42 </div>
                <div class="main-container-content__text">马 05 , 17 , 29 , 41 </div>
                <div class="main-container-content__text">羊 04 , 16 , 28 , 40 </div>
                <div class="main-container-content__text">猴 03 , 15 , 27 , 39</div>
                <div class="main-container-content__text">鸡 02 , 14 , 26 , 38 </div>
                <div class="main-container-content__text">特肖<br>当期开奖的特别号，落在下注生肖范围内，视为中奖。 </div>
                <div class="main-container-content__text">一肖<br>当期开奖的全部号码，包含前6个号码及特别号，只要其中1个号码在下注的生肖范围即算中奖。不论同生肖的号码出现一个或多个，派彩只派一次。</div>
                </main-container-content>
        </div>
        <div class="lottery-games-article">
       
            <main-container-title>
                不中玩法
            </main-container-title>
            <main-container-content>
                <div class="main-container-content__text">
                    五不中<br>挑选5个号码为一投注组合进行下注，若5个号码中没有当期开奖的所有7个号码中的任意一个，即视为中奖（其余情形视为不中奖）。<br> 例如开奖号码是：06,07,08,09,10,11,12，若你投的是<br>01,02,03,04,05则中奖，而投01,02,03,04,06则不中奖。
                </div>
                <div class="main-container-content__text">
                    六不中<br>挑选6个号码为一投注组合进行下注，若6个号码中没有当期开奖的所有7个号码中的任意一个，即视为中奖（其余情形视为不中奖）。<br>例如开奖号码是：06,07,08,09,10,11,12，若你投的是<br>01,02,03,04,05,13则中奖，而投01,02,03,04,06,13则不中奖。 
                </div>
                <div class="main-container-content__text">
                    七不中<br>挑选7个号码为一投注组合进行下注，若7个号码中没有当期开奖的所有7个号码中的任意一个，即视为中奖（其余情形视为不中奖）。<br>例如开奖号码是：06,07,08,09,10,11,12，若你投的是<br>01,02,03,04,05,13,14则中奖，而投01,02,03,04,06,13,14则不中奖。 
                </div>
                <div class="main-container-content__text">
                    八不中<br>挑选8个号码为一投注组合进行下注，若8个号码中没有当期开奖的所有7个号码中的任意一个，则视为中奖（其余情形视为不中奖）。<br>例如开奖号码是：06,07,08,09,10,11,12，若你投的是<br>01,02,03,04,05,13,14,15则中奖，而投01,02,03,04,06,13,14,15则不中奖。
                </div>
                <div class="main-container-content__text">
                    九不中<br>挑选9个号码为一投注组合进行下注，若9个号码中没有当期开奖的所有7个号码中的任意一个，则视为中奖（其余情形视为不中奖）。<br>例如开奖号码是：06,07,08,09,10,11,12，若你投的是<br>01,02,03,04,05,13,14,15,16则中奖，而投01,02,03,04,06,13,14,15,16则不中。 
                </div>
                <div class="main-container-content__text">
                    对所有七个开奖号码的数值总和的大、小、单、双等形态进行投注。当所有开奖号码和值对应形态与投注内容一致，即视为中奖（其余情形视为不中奖）。
                </div>
                <div class="main-container-content__text">
                    总和大小：所有七个开奖号码的分数总和大于或等于175为总和大；分数总和小于或等于174为总和小。如开奖号码为01、07、15、29、38、46、24，分数总和是160，为总和小。
                </div>
                <div class="main-container-content__text">
                    总和单双：所有七个开奖号码的分数总和是单数叫总和单(总单)，如分数总和是103、193；分数总和是双数叫总和双(总双)，如分数总和是108、160。
                </div>
             
                </main-container-content>
        </div>
  
      
      
     
      

    </div>
</template>

<script>
export default {
  name: "lottery-games"
};
</script>

<style lang="scss" scoped>
.lottery-games-article {
  margin-bottom: 50px;
  .main-container-content__text {
    margin-bottom: 30px;
  }
}
</style>

