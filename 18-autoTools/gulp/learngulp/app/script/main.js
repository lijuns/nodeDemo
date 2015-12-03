$(function () {

    $('.news-btn a').on('click', function (e) {
        e.preventDefault();
        layer.msg('该功能正在开发中~', {
            time: 1000
        });
    });

    jQuery(".news-notice").slide({titCell: '.hd li', mainCell: '.bd', effect: "left"});
    jQuery(".news-group").slide({titCell: '.hd li', mainCell: '.bd', effect: "left"});
    jQuery(".news-and-tag").slide({titCell: '.hd li', mainCell: '.bd', effect: "fade"});
    jQuery(".ads").slide({mainCell: ".bd ul", effect: "left", scroll: 1, vis: 4, pnLoop: false, autoPage: true});
    jQuery(".short-menu").slide({mainCell: '.bd', effect: 'fold'});


    var current = $('.menu li.on');

    $('.menu li').each(function () {
        var $this = $(this);
        $(this).hover(function () {
            $(this).addClass('on').siblings().removeClass('on');
            $('.menu .cur').stop().animate({'left': $this.position().left + $this.width() / 2 + 'px'});
            $(this).find('dl').stop().slideDown();
        }, function () {
            current.addClass('on').siblings().removeClass('on');
            $('.menu .cur').stop().animate({'left': current.position().left + current.width() / 2 + 'px'});
            $(this).find('dl').stop().slideUp();
        });
    });


    /*
     * @通知公告
     * */
    var oList = $('.m-notice .bd');
    var oCtrl = $('.m-notice .hd');
    var oPage = oCtrl.find('.pageState');
    var oPrev = oCtrl.find('.prev');
    var oNext = oCtrl.find('.next');
    var iNow = 0;
    var time = null;

    function pageState() {
        oPage.html('<i>' + (iNow + 1) + '</i>/' + oList.find('li').length);
    }

    function play() {
        pageState();
        oList.find('ul').stop().animate({'marginTop': -iNow * oList.height() + 'px'});

    }

    function autoPlay() {
        iNow++;
        iNow >= oList.find('li').length && (iNow = 0);
        play();
    }

    oPrev.on('click', function () {
        iNow--;
        iNow < 0 && (iNow = oList.find('li').length - 1);
        play();
    });

    oNext.on('click', function () {
        iNow++;
        iNow >= oList.find('li').length && (iNow = 0);
        play();
    });

    time = setInterval(function () {
        autoPlay();
    }, 2000);

    $('.m-notice').hover(function () {
        clearInterval(time);
    }, function () {
        time = setInterval(function () {
            autoPlay();
        }, 2000);
    });

    /*
     * @banner
     * */
    var iCurrent = 0;
    var oBannerList = $('.banner .bd');
    var oBannerDesc = $('.banner .bd-desc');
    var oBannerSmall = $('.banner .hd');
    var oBannerPrev = $('.banner .prev');
    var oBannerNext = $('.banner .next');

    var len = oBannerList.find('li').length;

    $('.banner .bd ul').width(oBannerList.width() * oBannerList.find('li').length + 'px');

    function bannerPlay() {
        $('.banner .bd ul').stop().animate({'marginLeft': -oBannerList.width() * iCurrent + 'px'});
        oBannerDesc.find('ul').stop().animate({'marginTop': -oBannerDesc.find('li').height() * iCurrent + 'px'});
        oBannerSmall.find('.cur').stop().animate({'left': oBannerSmall.find('li').eq(iCurrent).position().left + 'px'});
    }

    oBannerPrev.on('click', function () {
        iCurrent--;
        iCurrent < 0 && (iCurrent = len - 1);
        bannerPlay();
    });

    oBannerNext.on('click', function () {
        iCurrent++;
        iCurrent >= len && (iCurrent = 0);
        bannerPlay();
    });

    oBannerSmall.find('li').on('click', function () {
        iCurrent = $(this).index();
        bannerPlay();
    });

    /*--go-top--*/
    $('.go-top').on('click', function (e) {
        $('html,body').stop().animate({'scrollTop': 0});
        e.preventDefault();
    });

    /*---developList-*/
    $(".de-title").slide({
        mainCell: ".bd ul",
        autoPage: true,
        effect: "left",
        vis: 8,
        scroll: 3,
        pnLoop: false
    });

    $('.time-line li').on('click', function (e) {
        e.preventDefault();
        $(this).addClass('on').siblings().removeClass();
        $('.de-con-item').hide().eq($(this).index()).show();
    });

    /*--imgList2--*/
    $('.img-list2 li').hover(function () {
        $(this).find('span').css({
            'background': 'rgba(0,0,0,.7)'
        });
        $(this).find('span em').animate({
            "top": "50%"
        });
    }, function () {
        $(this).find('span').css({
            'background': 'rgba(0,0,0,0)'
        });
        $(this).find('span em').animate({
            "top": '-15%'
        });
    });

    $('.img-list2 li').on('click', function (e) {
        e.preventDefault();
        $('.img-desc').show(200, function () {
            $('.img-desc').stop().animate({
                'top': 0,
                'opacity': 1
            })
        })
    });

    /*--imgViewer--*/
    function imgSlide(obj) {
        var $list = obj.find('li');
        var $prev = $('.big-show').find('.prev');
        var $next = $('.big-show').find('.next');
        var $page = obj.find('.page-state');
        var $desc = $('.img-wrap').find('.big-desc');
        var $i = 0;
        var $limit = 5;

        $('.img-desc').hover(function () {
            $prev.stop().animate({'opacity': 1});
            $next.stop().animate({'opacity': 1});
        }, function () {
            $prev.stop().animate({'opacity': 0});
            $next.stop().animate({'opacity': 0});
        });

        var $bigImg = $('.big-show img');
        var $span = obj.find('.active-btn');

        var W = $list.eq(0).outerWidth(true);

        //初始化
        $page.html('<span>1</span>/' + $list.length);
        $desc.html($list.eq(0).find('img').attr('alt'));

        obj.find('ul').width($list.length * $list.eq(0).outerWidth(true) + 'px');

        function showSlide(sortIndex) {
            if (sortIndex > $limit) {
                obj.find('ul').stop().animate({'marginLeft': '-' + (sortIndex % $limit) * W + 'px'}, function () {
                    $span.stop().css({'left': $list.eq(sortIndex).position().left + 'px'});
                });
            } else if (sortIndex == 0) {
                obj.find('ul').stop().animate({'marginLeft': 0});
                $span.stop().animate({'left': 0});
            } else {
                $span.stop().animate({'left': $list.eq(sortIndex).position().left + 'px'});
            }

            $bigImg.stop().animate({'opacity': '.8'}, function () {
                $(this).attr('src', $list.eq(sortIndex).find('img').attr('src')).animate({'opacity': 1});
            });

            $page.html('<span>' + (sortIndex + 1) + '</span>/' + $list.length);
            $desc.html($list.eq(sortIndex).find('img').attr('alt'));
        }

        $list.each(function () {
            $(this).on('click', function () {
                $i = $(this).index();
                showSlide($i);
            });
        });

        $prev.on('click', function () {
            $i--;

            ($i < 0) && ($i = $list.length - 1);
            showSlide($i);
            return false;
        });

        $next.on('click', function () {
            $i++;
            ($i > $list.length - 1) && ($i = 0);
            showSlide($i);
            return false;
        });

        $('.img-desc-close a').on('click', function (e) {
            e.preventDefault();
            $('.img-desc').stop().animate({
                'top': -$('.img-desc').outerHeight(true) + 'px',
                'opacity': 0
            }, function () {
                $('.img-desc').hide();
            })
        })
    }

    imgSlide($('.img-list'));

});