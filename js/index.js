var pintu = {
    order:3,
    photo: 9,
    number:[],
    init:function(){
        var hash = location.hash;
        this.order = parseInt(hash.substring(hash.indexOf("=")+1,hash.length));
        this.photo = this.order * this.order;
        this.initBtn();
        this.randomNum();
        this.img();
        this.translate();
    },
    initBtn:function(){
        $(".whole").click(function(){
            $(".mask").show();
            $(".view").show();
            $(".whole").hide();
        });
        $(".view").click(function(){
            $(".mask").hide();
            $(".view").hide();
            $(".whole").show();
        })
    },
    randomNum:function(){
        var me=this;
        for(var i=0;i<me.photo-1;i++){
            var option = Math.ceil(Math.random()*(me.photo-1));
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
            var li = '<li class="img'+me.number[i]+'"><img src="../images/'+me.order+'_'+me.number[i]+'.jpg" alt=""/></li>';
            $("#main ul").append(li);
        }
        $("#main ul").append('<li><img src="" alt=""/></li>');
        $("li").css({width:90/me.order+"vw",height:90/me.order+"vw"});

    },
    translate:function(){
        var me=this;
        $("li").bind("touchstart",function(){
            var index = $(this).index();
            if($(this).hasClass("")){
                return;
            }
            else{
                if(index-me.order>=0 && $("li").eq(index-me.order).hasClass("")){
                    me.transClass(index-me.order ,this);
                }
                else if(index%me.order!==0 && index-1>=0 && $("li").eq(index-1).hasClass("")){
                    me.transClass(index-1 ,this);
                }
                else if(index%me.order !== me.order-1 && index+1<me.photo && $("li").eq(index+1).hasClass("")){
                    me.transClass(index+1 ,this);
                }
                else if(index+me.order<me.photo && $("li").eq(index+me.order).hasClass("")){
                    me.transClass(index+me.order ,this);
                }
            }
        })
    },
    transClass:function(num, self){
        var me=this;
        $("li").eq(num).addClass(self.className).find("img").attr("src",$(self).find("img").attr("src"));
        self.className = "";
        $(self).find("img").attr("src","");
        me.win();
    },
    win:function(){
        var me=this;
        var rex = /\d$/;
        var count = 0;
        for(var i=1;i<me.photo;i++){
            var res = rex.exec($("li").eq(i-1).attr("class"));
            if(res && res[0] == i){
                count++;
            }
            else{
                return;
            }
        }
        if(count === me.photo-1){
            $("#main li:last").addClass("img"+me.photo).find("img").attr("src","../images/"+me.order+"_"+me.photo+".jpg");
        }
    }
};
pintu.init();
