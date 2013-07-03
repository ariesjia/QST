(function(win) {
    var Q = QST;
    Q.add('viewModsNet',function(elem,config){
        if ( this.QST ) {
            return new Q.viewModsNet( elem , config );
        }
        elem = elem.length ? elem[0] : elem ;
        var self = this,
            $slider = $(elem).addClass('view_mod_slider').wrap('<div class="view_mod_wrapper"></div>'),VM = [],
            viewMod = $slider.children().addClass('view_mod'),
            rellist = [] ,
            viewModobj = function(elem){
                var m = this,
                    myindex = rellist.indexOf(Q.dom.attr(elem,'rel')),
                    clickevent = function(e){
                        var index = rellist.indexOf(this.rel);
                        m.onleave();
                        if(index){
                            VM[index].goto();
                        }
                        e.stopPropagation();
                        e.preventDefault();
                    },
                    backevent = function(e){
                        m.back();
                    };
                this.elem = elem;
                this.back = function(){
                    var tstr = rellist[myindex],
                        goto = rellist.indexOf(tstr.slice(0,tstr.lastIndexOf('_')));
                    m.onleave();
                    VM[goto].goto();
                }
                this.goto = function(){
                    var cheakleft = function(){
                        var mynum = rellist[myindex],
                            lastnum = rellist[self.lastindex],left,
                            mylen = mynum.length , lalen = lastnum.length;
                        if(mylen  == lalen){
                            left = mynum[mylen-1] > lastnum[mylen-1] ?  true : false;
                        }
                        else if(mylen > lalen){
                            var tempstr = mynum.slice(0,lalen);
                            left = tempstr[lalen-1] >= lastnum[lalen-1] ? true : false;
                        }else if(mylen < lalen ){
                            var tempstr = lastnum.slice(0,mylen);
                            left = tempstr[mylen-1] > lastnum[mylen-1] ? true : false;
                        }
                        return left == true ? ['+','-'] : ['-','+'];
                    }
                    var isleft = cheakleft();
                    Q.css.css($slider,{
                        '-webkit-transform' : "translate3d(0,0,0)"
                    });
                    Q.each(VM,function(i,o){
                        if(i  == self.lastindex ){
                            Q.css.css(o,{
                                '-webkit-transform' : "translate3d(0, 0, 0)"
                            });
                        }else if(i  == myindex ){
                            Q.css.css(o,{
                                '-webkit-transform' : "translate3d("+isleft[0]+config.scrWidth+",0,0)"
                            });
                        }else{
                            Q.css.css(o,{
                                '-webkit-transform' : "translate3d(-1000px,0, 0)"
                            });
                        }
                    })
                    window.setTimeout(function(){
                        Q.effect.animate($slider,{
                            '-webkit-transform' : "translate3d("+isleft[1]+config.scrWidth+",0,0)"
                        },300,'ease-in-out',function(){
                            m.onshow();
                        });
                    },0);
                }
                this.bind = function(){
                    $('.back',elem).click(backevent);
                    $('.goto',elem).click(clickevent);
                }
                this.unbind = function(){
                    $(elem).find('.goto').unbind('click',clickevent);
                }
                this.onshow = function(){
                    self.lastindex = myindex;
                    this.bind();
                }
                this.onleave = function(){
                    this.unbind();
                }
                this.config = function(config){

                }
            }

        config = Q.extend({
            'index' : null,
            'gobtnClass' : 'goto',
            'backClass' : 'back' ,
            'scrWidth' : viewMod.width()
        },config);
        Q.each(viewMod,function(i,o){
            rellist.push(Q.dom.attr(o,'rel'))
            VM.push(new viewModobj(o));
        })
        this.viewMod = VM;
        this.init = function(){
            if(!config.index){
                config.index = viewMod.eq(0).attr('rel');
            }
            this.index = this.lastindex = rellist.indexOf(config.index);
            QST.css.css(Q.dom.query('.view_mod[rel="'+config.index+'"]',this.$slider),'-webkit-transform','translate3d(0,0,0)');
            VM[rellist.indexOf(config.index)].onshow();
        }
        this.bind = function(selector,pot){
            var potindex = rellist.indexOf(pot)
            if(potindex > -1)
            $(selector,$slider).click(function(){
                VM[potindex].goto();
            })
        }
        this.init();
        return self;
    },true)
})(this);