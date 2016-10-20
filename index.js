//function img(){
//    for(var i=0;i<8;i++){
//        $("li").eq(i).find("img").attr("src","images/"+(i+1)+".png");
//    }
//}
//img();
var pintu = {
    photo: 9,
    number:[],
    init:function(){
        this.randomNum();
        this.img();
        this.translate();
    },
    randomNum:function(){
        var me=this;
        for(var i=0;i<me.photo-1;i++){
            var option = Math.floor(Math.random()*(me.photo-1));
            if(me.number.indexOf(option)<0){
                me.number.push(option);
            }
            else{
                i--;
            }
        }
    },
    img:function(){
        var me=this;
        for(var i= 0;i<me.photo-1;i++){
            $("li").eq(i).addClass("img"+(me.number[i]+1));
        }
    },
    translate:function(){
        var me=this;
        $("li").click(function(){
            var index = $(this).index();
            if($(this).hasClass("")){
                return;
            }
            else{
                if(index-3>=0 && $("li").eq(index-3).hasClass("")){
                    me.transClass(index-3 ,this);
                }
                else if(index%3!==0 && index-1>=0 && $("li").eq(index-1).hasClass("")){
                    me.transClass(index-1 ,this);
                }
                else if(index%3 !== 2 && index+1<9 && $("li").eq(index+1).hasClass("")){
                    me.transClass(index+1 ,this);
                }
                else if(index+3<9 && $("li").eq(index+3).hasClass("")){
                    me.transClass(index+3 ,this);
                }
            }
        })
    },
    transClass:function(num, self){
        var me=this;
        $("li").eq(num).addClass(self.className);
        self.className = "";
        me.win();
    },
    win:function(){
        var me=this;
        var rex = /\d$/;
        var count = 0;
        for(var i=0;i<me.photo-1;i++){
            var res = rex.exec($("li").eq(i).attr("class"));
            if(res && res[0] == i+1){
                count++;
            }
            else{
                return;
            }
        }
        if(count === me.photo-1){
            $("li").eq(me.photo-1).attr("class","img"+me.photo);
        }
    }
};
pintu.init();
