// build time:Wed Nov 25 2020 04:47:24 GMT+0000 (Coordinated Universal Time)
$.BLOG={init:function(){this.basic();this.menu();setTimeout(function(o){o.toc().scroll($(window).scrollTop());o.toc().go()},500,this);this.scroll();this.resize();this.goTop().active();this.share();this.header();this.search().init();this.reward();this.waves();this.mask();this.waterfall();this.tabBar()},basic:function(){$.fixedClick();$.page().loaded()},menu:function(){$.toggleMenu().init()},header:function(o){if(!o){var o=$(window).scrollTop()}$.fixedHeader(o)},toc:function(){var o=$("#post-toc");var t=$("#repo");return{scroll:function(t){if(!o.length)return;$.toc().fixed(t);$.toc().actived(t)},go:function(){if(!o.length&&!t.length){$(".post-article").css("width","100%");return}$.toc().go()}}},goTop:function(){return{active:function(){$.toggleGoTop().active()},scroll:function(o){$.toggleGoTop().scroll(o)}}},share:function(){$.share()},search:function(){return{init:function(){$.search().init();$.search().zoom()},zoom:function(){$.search().zoom()}}},waves:function(){$.waves()},reward:function(){$.reward()},mask:function(){$.mask()},waterfall:function(){$.waterfall()},tabBar:function(){$.tabBar()},scroll:function(){$(window).scroll(function(){var o=$(window).scrollTop();$.BLOG.toc().scroll(o);$.BLOG.header(o);$.BLOG.goTop().scroll(o);$.BLOG.waterfall()})},resize:function(){$(window).resize(function(){var o=$(window).scrollTop();$.BLOG.toc().scroll(o);$.BLOG.search().zoom()})}};$.BLOG.init();
//rebuild by neat 