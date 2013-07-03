(function(win) {
    var Q = QST;
    Q.add('imgSelect',function(elem,config){
        if ( this.QST ) {
            return new Q.imgSelect( elem , config );
        }







    var drag = function(elem,setting){
        var self = this,Bind = function(object, fun) {
	    return function() {
		    return fun.apply(object, arguments);
	    }
        },bindAsEventListener = function(object, fun) {
            return function(event) {
                return fun.call(object, (event || window.event));
            }
        }
        this.destroy = function(){
            this._handle.unbind("touchstart");
            this._fM = this._fS = null;
        }
        this.init = function(){
            this.drag =  $(elem);
            this._x = this._y = 0;
            this.dw = this.drag.width();
            this.dh = this.drag.height();
            this._marginLeft = this._marginTop = 0;
            this.setoption();
            this._handle = this.option.handle || this.drag;
            this._handle.css({'cursor':'move'})
            this.drag.css({'position':'absolute'});
            this._handle.bind("touchstart",function(e){self.start(e);});
            //event object
            this._fM = bindAsEventListener(this, this.move);
            this._fS = Bind(this, this.stop);
        }
        this.setoption = function(){
            this.option =Q.extend({
                handle : "" ,
                lockx : false ,
                locky : false ,
                maxl : 0 ,
                maxt : 0 ,
                maxr : $('body').width() ,
                maxb : $('body').height() ,
                lock : false ,
                grid : null,
                comcontainer : null ,
                container : "",
                onstart : function(){},
                onmove : function(){},
                onstop : function(){}
            },setting);
        }
        this.start = function(e){
            if(this.option.lock){
                return;
            }
            this._x = e.clientX - this.drag.offset().left;
            this._y = e.clientY - this.drag.offset().top;
            $(document).bind("touchmove",this._fM).bind("touchend",this._fS);
            window.addEventListener("blur",this._fS, false);
            event.preventDefault();
            this.option.onstart();
        }
        this.move = function(e){
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            var l = e.clientX - this._x,t = e.clientY - this._y,ml = this.option.maxl,mt = this.option.maxt,mb = this.option.maxb , mr = this.option.maxr;
            if(this.option.comcontainer){
                l = l - parseInt(this.option.comcontainer.offset().left);
                t = l - parseInt(this.option.comcontainer.offset().top);
            }
            if(this.option.container){
                var c = this.option.container;
                ml = Math.max(ml, 0);
                mt = Math.max(mt, 0);
                mr = Math.min(mr, c.width());
                mb = Math.min(mb, c.height());
            }
            //else{
                l = Math.max(Math.min(l,mr-this.dw),ml);
                t = Math.max(Math.min(t,mb-this.dh),mt);
            //}
            dump(l)
            if(!this.option.lockx){
                if(this.option.grid){
                    var rl = parseInt(this.drag.css('left') == "auto" ? 0 : this.drag.css('left'));
                    if(l-rl>=this.option.grid[0]||l-rl<=-this.option.grid[0]){
                        var gl = this.option.grid[0];
                        if(l - rl >= gl){
                            ll = rl+gl;
                        }
                        if(l - rl <= -gl){
                            ll = rl-gl;
                        }
                         console.log("ll: " + ll);
                        this.drag.css({left:ll});
                    }
                }else{
                    this.drag.css({left:l});
                }
            }if(!this.option.locky){
                if(this.option.grid){
                    var rt = parseInt(this.drag.css('top'));
                    if(t-rt>=this.option.grid[1]||t-rt<=-this.option.grid[1]){
                        this.drag.css({top:t});
                    }
                }else{
                    this.drag.css({top:t});
                }
            }
            this.option.onmove();
        }
        this.stop = function(){
            this.option.onstop();
            $(document).unbind("mousemove",this._fM).unbind("mouseup",this._fS);
            window.removeEventListener("blur",this._fS, false);
        }
        this.init();
    }


































        elem = elem.length ? elem[0] : elem ;
        config = Q.extend({
            'index' : null,
            sWidth : 140 ,
            sHeight : 226
        },config);
        var self = this,
            $img = $(elem),
            $wrap = $img.wrap('<div class="QST_imgselect_wrap"></div>').parent().css({
                'width' : $img.outerWidth() ,
                'height' : $img.outerHeight()
            }),
            $drag = $('<div class="QST_imgselect_drag"></div>').appendTo($wrap),
            canvas = $('<canvas class="QST_imgselect_canvas" width="'+$img.outerWidth()+'" height="'+$img.outerHeight()+'" ></canvas>').appendTo($wrap).hide()[0];
        this.init = function(){
            //$img.hide();
            //if (canvas.getContext)
            //{
            //    var ctx = canvas.getContext("2d");
            //    if (elem.complete == true){
            //         ctx.drawImage(elem,0,0);
            //         this.bind();
            //     }
            //}

            var ISDg = new drag($drag,{
                container:$wrap
            })
        }
        this.bind = function(){

        }
        this.init();
        return self;
    },true)
})(this);