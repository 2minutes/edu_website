$(function () {
  /* @首页 */
  if ($(".vd-banner-s1").length > 0) {
    new Swiper(".vd-banner-s1", {
      autoplay: 5000,//可选选项，自动滑动
      loop: true,
      prevButton: '.s1-prev',
      nextButton: '.s1-next',
    })
  }
  /* @index-v */
  if ($(".vd-banner-s1-v").length > 0) {
    new Swiper(".vd-banner-s1-v", {
      autoplay: 4000,//可选选项，自动滑动
      /* loop: true, */
      pagination : '.s1-page',
      paginationClickable :true,
      paginationBulletRender: function (swiper, index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
      onInit: function(swiper){
        //Swiper初始化了
        var realCurIndex=swiper.realIndex;//当前轮播真是索引，不包含复制的
        bannerVideo(realCurIndex)
      },
      onSlideChangeEnd: function (swiper) {
        /* console.log(swiper)
        console.log(swiper.realIndex) */
        var realCurIndex=swiper.realIndex;//当前轮播真是索引，不包含复制的
        bannerVideo(realCurIndex)
      },

    })
  }
  bannerVideoHei()
  function bannerVideo(realCurIndex){
    if($('.media').length){
      //暂停所有视频播放
      /* console.log($(".media"+realCurIndex)) */
      allPauseStyle($(".media"))
      if($(".media"+realCurIndex).length){
        /* $(".media"+realCurIndex).get(0).removeAttribute('muted') */
       /*  $(".media"+realCurIndex).get(0).muted=false; */
        $(".media"+realCurIndex).get(0).play()  
        $(".media"+realCurIndex).siblings(".fix-width").find('.playbtn').css('backgroundImage','url(images/icon-banpause.png)')
        $(".media"+realCurIndex).siblings('.bantxt').hide()
        $(".media"+realCurIndex).siblings(".fix-width").find('.playbtn').attr('data-onoff','false')
      }         
    }   
  }
  function bannerVideoHei(){
    //首页首屏banner视频与图片高度保持一致
    /* console.log($(".vd-banner-s1-v .banimg").eq(0).height()) */
    if($('.media').length&&$(".vd-banner-s1-v .banimg").length){
      $('.media').height($(".vd-banner-s1-v .banimg").eq(0).height())
    }
  }
  /* @首屏视频 */
  $('.playbtn').click(function(){
    //视频开关
    var palyOff=$(this).attr('data-onoff');
    allPauseStyle($(this))
    //当前对应视频
    var videL = $(this).parents('.idx-video-wrap').find('video.media');
    //播放
    if(palyOff==='true'){
      $(this).css('backgroundImage','url(images/icon-banpause.png)')
      videL.get(0).play();//jq暂停videL.get(0).play() js暂停videL.play()
      if($(this).parents('.idx-video-wrap').find('.bantxt').length>0){
        $(this).parents('.idx-video-wrap').find('.bantxt').hide()
      }
      $(this).attr('data-onoff','false')
    }else{
      $(this).css('backgroundImage','url(images/icon-banplay.png)')
      videL.get(0).pause();
      if($(this).parents('.idx-video-wrap').find('.bantxt').length>0){
        $(this).parents('.idx-video-wrap').find('.bantxt').show()
      }
      $(this).attr('data-onoff','true')
    }
  })
  function allPauseStyle(_this){

    /* @循环其他视频都暂停 */
    $('video.media').each(function(a,b){
      b.pause();
      /* b.setAttribute('muted','muted') */
      /* b.muted=true; */
    })
    /* @其他视频样式 */
    $('.playbtn').css('backgroundImage','url(images/icon-banplay.png)');
    if($('.idx-video-wrap').find('.bantxt').length>0){
      $('.idx-video-wrap').find('.bantxt').show()
    }
    if(_this.length){
      _this.parents('.idx-video-wrap').siblings('.idx-video-wrap').find('.playbtn').attr('data-onoff','false');
    }
    
  }
  if ($(".vd-banner-s2").length > 0) {
    var s2 = new Swiper(".vd-banner-s2", {
       autoplay: 4000,//可选选项，自动滑动
      loop: true,
      pagination: '.s2-page',
      prevButton: '.s2-prev',
      nextButton: '.s2-next',
      paginationClickable: true,
      /* hashnav:true, */
      paginationBulletRender: function (swiper, index, className) {
        var pageArr = eval(document.querySelectorAll('.vd-banner-s2')[0].getAttribute('data-page'));
        // console.log(pageArr)
        return '<span class="' + className + '">' + pageArr[index] + '</span>';
      },
      onInit: function (swiper) { //Swiper2.x的初始化是onFirstInit
        swiperAnimateCache(swiper); //隐藏动画元素 
        swiperAnimate(swiper); //初始化完成开始动画
      },
      onSlideChangeEnd: function (swiper) {
        swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
      }
    })
  }
  if ($(".vd-banner-s3").length > 0) {
    new Swiper(".vd-banner-s3", {
      autoplay: 4000,//可选选项，自动滑动
      loop: true,
      prevButton: '.s3-prev',
      nextButton: '.s3-next',
    })
  }
  
  /* @视频弹出 腾讯统一播放器javascript调用方法*/
  function btn(vid) {
    var videoWidth = $(".layuiBox1").width();
    var videoHeight = $(".layuiBox1").height() + 55;
    /* console.log(videoWidth)
    console.log(videoHeight) */
    var video = new tvp.VideoInfo(); //初始化视频对象
    video.setVid(vid); //向视频对象传入视频vid ，这个是点播的时候使用

    var player = new tvp.Player(videoWidth, videoHeight - 55); //初始化播放器对象并设置宽、高
    player.setCurVideo(video); //设置播放器初始化时加载的视频
    player.addParam("autoplay", "1"); //是否自动播放
    player.addParam("adplay", "0"); //是否播放广告；1播放，0不播放，默认为1
    player.addParam("wmode", "transparent"); //设置透明化，不设置时，视频为最高级，总是处于页面的最上面，此时设置z-index无效
    player.addParam("player", "html5"); //播放器类别；有4种参数，auto：自动，ocx：控件播放器，flash：flash播放器，html5：html5播放器，默认为auto，程序自动根据操作系统、平台以及浏览器选择最合适的播放器。
    player.addParam("showend", 0); //结束时是否有广告 
    player.write("playpoint"); //输出播放器  

    // var vid = document.getElementById("tenvideo_video_player_0");
    player.onplaying = function (vid) { //在视频/音频（audio/video）开始播放时触发。  
    };
    $('#playpoint').show();
  }
  /* @视频弹出 使用自己网站视频时 */
  function btnself(selfurl){
    $('#playpoint').append('<video style="width:100%" autoplay controls="controls"><source src="'+selfurl+'"></source></video>')
    $('#playpoint').show();
  }

  $(".playvideo-menu").click(function () {
    $('#playpoint').html('')
    $(".layuiBg1").css({
      display: "block",
    });
    $(".layuiBox1").css({
      left: ($("body").width() - $(".layuiBox1").width()) / 2 + "px",
      top: ($(window).height() - $(".layuiBox1").height()) / 2 + "px",
      display: "block",
    })
    /* console.log($(this).attr("data-id"))
    console.log($(this).attr("data-url")) */
    if($(this).attr("data-id")){
      btn($(this).attr("data-id"));
    }else if($(this).attr("data-url")!=''){
      btnself($(this).attr("data-url"))
    }
    $("#videotitle").html($(this).attr("data-title"));
  });
  
  $(".layuiBg1,.layerClose").click(function () {
    $(".layuiBox1 ,.layuiBg1").css({
      display: "none"
    });
    $("#playpoint").html('').hide();
  });
  /* @侧导航 */
  $(".switch-sidenav").click(function () {
    noTransition(".head-wrap");
    $("body,.head-wrap").animate({
      left: '-600px'
    }, 400)
    $(".side-nav-wrap").css({zIndex:100}).animate({
      opacity: 1,
    }, 300)
    $(".side-nav").animate({
      right: 0
    }, 400)
  })
  $(".close,.side-nav-wrap,.idxInnovation").click(function () {
    noTransition(".head-wrap");
    $("body,.head-wrap").animate({
      left: '0'
    }, 400)
    $(".side-nav-wrap").animate({
      opacity: 0,
      zIndex:-1
    }, 300)
    $(".side-nav").animate({
      right: '-600px'
    }, 400)
  })
  function noTransition(ele){
    $(ele).css('-webkit-transition','0s');
  }
  /* @页面动画 */
  window.scrollReveal = new scrollReveal({
    reset: true,
    move: '50px'
  });

  var bodyWidth;
  var idxnewsNum=1;
  window.onresize = function () {
    juageBody();
    bgHeight();
    if ($(".vd-banner-s4-1").length > 0) {
      inits4(idxnewsNum)
    }
    bannerVideoHei();
  }
  juageBody()
  function juageBody() {
    bodyWidth = document.documentElement.clientWidth || document.body.clientWidth;
    /* console.log(bodyWidth) */
    if ($('.tagcloud').length) {
      if (bodyWidth < 1000) {
        /* @标签云 */
        tagcloud({
          selector: ".tagcloud", //元素选择器
          fontsize: 0, //基本字体大小, 单位px
          radius: 80, //滚动半径, 单位px
          mspeed: "normal", //滚动最大速度, 取值: slow, normal(默认), fast
          ispeed: "normal", //滚动初速度, 取值: slow, normal(默认), fast
          direction: 135, //初始滚动方向, 取值角度(顺时针360): 0对应top, 90对应left, 135对应right-bottom(默认)...
          keep: false //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
        });
      } else {
        tagcloud({
          selector: ".tagcloud", 
          fontsize: 0, 
          radius: 120, 
          mspeed: "normal",
          ispeed: "normal", 
          direction: 135, 
          keep: false 
        });
      }
    }
    /* @社会责任页面 */
    if ($(".report-vd").length > 0) {
      if (bodyWidth < 560) {
        new Swiper('.report-vd', {
          autoplay: 3000,//可选选项，自动滑动
          loop:true,
          slidesPerView: 1,
          nextButton: '.report-next',
          prevButton: '.report-prev',
          spaceBetween: 0,
        })
      } else {
        reportVd()
      }

    }
    
    /* @战略投资页 */
    if ($(".advantage-vd").length > 0) {
      if (bodyWidth < 860 && bodyWidth > 600) {
        advantageVd(3)
      } else if (bodyWidth < 600 && bodyWidth > 460) {
        advantageVd(2)
      } else if (bodyWidth < 460) {
        advantageVd(1)
      } else {
        advantageVd(4)
      }

    }
  }
  
  if ($(".vd-banner-s4-1").length > 0) {
    inits4(idxnewsNum)
    $(".s4-tab span").click(function () {
      var idx = $(this).index();
      /* console.log(idx) */
      $(this).addClass('active').siblings('span').removeClass('active')
      $(this).parents('.s4-tab').siblings('.s4-tabcon').find(".s4-con").hide().eq(idx).show();
      idxnewsNum=idx + 1
      inits4(idxnewsNum)
    })
  }
  function inits4(idxi){
    if(window.innerWidth<=860){/*包含滚动条的浏览器宽度，中小屏17\19*/
      new Swiper('.vd-banner-s4-' + idxi, {
        autoplay: 4000,//可选选项，自动滑动
        loop: true,
        slidesPerView : 1,
        slidesPerGroup : 1,
        spaceBetween : 15,
        nextButton: '.s4-next-' + idxi,
        prevButton: '.s4-prev-' + idxi,
        observer:true,
        observeParents:true,
      });
    }else{
      new Swiper('.vd-banner-s4-' + idxi, {
        autoplay: 5000,//可选选项，自动滑动
        loop: true,
        slidesPerView : 2,
        slidesPerGroup : 2,
        spaceBetween : 40,
        nextButton: '.s4-next-' + idxi,
        prevButton: '.s4-prev-' + idxi,
        observer:true,
        observeParents:true,
       
      });
    }
  }
  function reportVd() {
    new Swiper('.report-vd', {
      autoplay: 3000,//可选选项，自动滑动
      loop:true,
      slidesPerView: 3,
      nextButton: '.report-next',
      prevButton: '.report-prev',
      spaceBetween: 10,
    })
  }

  function advantageVd(view) {
    new Swiper('.advantage-vd', {
      autoplay: 5000,//可选选项，自动滑动
      slidesPerView: view,
      nextButton: '.advantage-next',
      prevButton: '.advantage-prev',
    })
  }
  //@m menu
  var menuBtn = $('.nav-menu'),
    menuBg = $('.hwl-menu-bg'),
    menulist = $('.hwl-menu-list'),
    menuD = $('.menu-list li span .ico'),
    mson = $('.menuson');
  menuBtn.click(function () {
    switchMenu($(this));
  });
  menuD.click(function () {
    var sonBtn = $(this).siblings('a.mn');
    if (sonBtn.hasClass('msq')) {
      sonBtn.removeClass('msq');
      $(this).parent('span').next('.menuson').slideUp();

    } else {
      sonBtn.addClass('msq');
      $(this).parent('span').next('.menuson').slideDown();
    }
    return false;
  });
  $('.hwl-menu-bg,.hwl-menu-list').click(function () {
    menuBtn.removeClass('menuClose');
    menuBg.fadeOut();
    menulist.removeClass('open');
    $('body,html').removeClass('limibody');
    $('.idx-video').show()
  });

  function switchMenu(_this) {
    if (_this.hasClass('menuClose')) {
      _this.removeClass('menuClose');
      menuBg.fadeOut();
      menuBg.css({
        'visibility': 'hidden'
      });
      menulist.removeClass('open');
      $('body,html').removeClass('limibody');
      if($('.idx-video').length>0){
        $('.idx-video').show()
      }
    } else {
      _this.addClass('menuClose');
      if($('.idx-video').length>0){
        $('.idx-video').hide()
      }
      menuBg.fadeIn();
      menuBg.css({
        'visibility': 'visible'
      });
      menulist.addClass('open');
      $('body,html').addClass('limibody');
    }
  }

  function bgHeight() {
    var winh = $(window).height();
    menuBg.height(winh - $('.head-wrap').innerHeight());
    menulist.height(winh - $('.head-wrap').innerHeight());
    menuBg.css({
      'top': $('.head-wrap').innerHeight() + 'px'
    });
    menulist.css({
      'top': $('.head-wrap').innerHeight() + 'px',
      'overflow-y': 'scroll'
    });
  }
  bgHeight();

  var timeJump = true;
  var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  var options = {
      useEasing : false, 	
      useGrouping : true, 
      separator : '', 
      decimal : '.', 
      prefix : '', 
      suffix : '' 
  };
  /* console.log(scrollTop) */
  jugeScrollNum(scrollTop) 
  navScroll(scrollTop)
  $(document).scroll(function () {
    var s = $(window).scrollTop();
    jugeScrollNum(s)
    navScroll(s)
    
  })
  function navScroll(s){
    if(bodyWidth>860){
      if(s>0){
        $(".head-wrap").css({
          height: '70px',
          transition: '.5s',
        })
        $(".head-wrap .logo").css({
          width: '170px',
          paddingTop: '14px'
        })
        $(".head-ltool").css({
          paddingTop: '14px'
        })
        $(".nav-wrap").css({
          height: '70px',
          lineHeight: '70px'
        })
      }else{
        $(".head-wrap").css({
          height: '100px',
        })
        $(".head-wrap .logo").css({
          width: '212px',
          paddingTop: '23px'
        })
        $(".head-ltool").css({
          paddingTop: '28px'
        })
        $(".nav-wrap").css({
          height: '100px',
          lineHeight: '100px'
        })
      }
    }
  }
  $('.nav-wrap li').hover(
    function(){
      $(this).find(".second-nav-wrap").stop().slideDown("fast")
    },function(){
      $(".second-nav-wrap").stop().slideUp("fast")
    }
  )
  /* @内页锚点 */
  if(location.hash){
    $('body,html').animate({
      scrollTop: $(location.hash)[0].offsetTop-100
    }, 800);
  }
  
  $(".idxInnovation").click(function () {
    location.reload()
  })
  function jugeScrollNum(s) {
    /* @首页 数字 */
    if ($("#timer1").length && s > 400 && s < 1200 && timeJump) {

      for (var idxi = 1; idxi < 4; idxi++) {
        new CountUp("timer"+idxi, 0, $("#timer"+idxi).attr('data-num'), 0, 2, options).start();
      }

      timeJump = false;
    }
    /* @关于我们页 数字 */
    /* console.log(s)*/
    if ($("#abouttimer1").length && s > ($(".about-cpc")[0].offsetTop - 500) && timeJump) {
      options.separator=","
      for (var abouti = 1; abouti < 5; abouti++) {
        new CountUp("abouttimer"+abouti, 0, $("#abouttimer"+abouti).attr('data-num'), 0, 2, options).start();
      }
        
      timeJump = false;
    }

    /* @社会责任页 数字 */
    if ($("#socialtimer1").length && $(".module4-numdistance").length && s > ($(".module4-numdistance")[0].offsetTop - 700) && timeJump) {
      for (var sociali = 1; sociali < 3; sociali++) {
        new CountUp("socialtimer"+sociali, 0, $("#socialtimer"+sociali).attr('data-num'), 0, 2, options).start();
      }
      timeJump = false;
    }
  }
  /* @返回顶部 */
  totop();

  function totop(min_height) {
    min_height ? min_height = min_height : min_height = 600;
    $(window).scroll(function () {
      var s = $(window).scrollTop();
      if (s > min_height) {
        $(".gotop").fadeIn(100)
      } else {
        $(".gotop").fadeOut(200)
      }
    })
  };
  $(".gotop").click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  })

  /* @关于我们页 */
  if ($(".about-timeline").length > 0) {
    new Swiper('.about-timeline .swiper-container', {
      autoplay: 4000,//可选选项，自动滑动
      loop: false,
      speed: 1600,
      pagination: '.about-timeline-page',
      paginationBulletRender: function (swiper, index, className) {
        var year = document.querySelectorAll('.swiper-slide')[index].getAttribute('data-year');
        return '<span class="' + className + '">' + year + '</span>';
      },
      paginationClickable: true,
      nextButton: '.about-timeline-next',
      prevButton: '.about-timeline-prev',
    });

  }
  if ($(".value-worth-vd").length > 0) {
    new Swiper('.value-worth-vd', {
      autoplay: 5000,//可选选项，自动滑动
      effect: 'fade',
      pagination: '.value-worth-page',
      paginationClickable: true,
      paginationBulletRender: function (swiper, index, className) {
        var txt = document.querySelectorAll('.swiper-slide')[index].getAttribute('data-txt');
        return '<span class="' + className + '"><i></i>' + txt + '</span>';
      },
    })
  }
  if ($(".brands-vd").length > 0) {
    new Swiper('.brands-vd', {
      autoplay: 3000,//可选选项，自动滑动
      nextButton: '.brands-next',
      prevButton: '.brands-prev',
    })
  }
  /* @社会责任页 */

  if ($(".social-timeline").length > 0) {
    new Swiper('.social-timeline .swiper-container', {
      autoplay: 5000,//可选选项，自动滑动
      loop: false,
      speed: 1600,
      pagination: '.social-timeline-page',
      paginationBulletRender: function (swiper, index, className) {
        var year = document.querySelectorAll('.swiper-slide')[index].getAttribute('data-year');
        return '<span class="' + className + '">' + year + '</span>';
      },
      paginationClickable: true,
      nextButton: '.social-timeline-next',
      prevButton: '.social-timeline-prev',
    });
  }
  if ($(".social-timeline2").length > 0) {
    new Swiper('.social-timeline2 .swiper-container', {
      autoplay: 5000,//可选选项，自动滑动
      loop: false,
      pagination: '.social-timeline-page2',
      paginationBulletRender: function (swiper, index, className) {
        var year = document.querySelectorAll('.swiper-slide')[index].getAttribute('data-year');
        return '<span class="' + className + '">' + year + '</span>';
      },
      paginationClickable: true,
      nextButton: '.social-timeline-next2',
      prevButton: '.social-timeline-prev2',
    });
  }
  if ($(".social-timeline3").length > 0) {//移动
    if (bodyWidth <860) {
      // alert(1)
      new Swiper('.social-timeline3 .swiper-container', {
        /* autoplay: 5000,//可选选项，自动滑动 */
        loop: true,
        pagination: '.social-timeline-page3',
        paginationClickable: true,
        onSlideChangeStart: function (swiper) {
          /* console.log(swiper)
          console.log(swiper.realIndex) */
          $('.social-timeline3').height($('.social-timeline3 .swiper-slide-active').height())
        },
        observer:true,
        observeParents:true,
      });  
    }
    
  }
  if($(".spirit-vd").length > 0){
    
    new Swiper('.spirit-vd',{
      autoplay: 5000,//可选选项，自动滑动
      loop:true,
      prevButton:'.spirit-prev',
      nextButton:'.spirit-next',
    })
  }
  /* @教育科技页 */
  if ($(".bigdata-vd").length > 0) {
    for (var bigdatai = 1; bigdatai < 3; bigdatai++) {
      new Swiper('.bigdata-vd' + bigdatai, {
        autoplay: 5000,//可选选项，自动滑动
        loop:true,
        nextButton: '.bigdata-next' + bigdatai,
        prevButton: '.bigdata-prev' + bigdatai,
      })
    }
  }
  /* @progress页面 */
  if($(".progress-wrap").length > 0){
    new WOW().init();
  }
  if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    $(".newsvideo-btn").click(function(){
      $(".newsvideo-wrap").show();
    });
  } else {
    $(".newsvideo-btn,.newsvideo-wrap-pc").hover(
      function(){
        $(".newsvideo-wrap-pc").show();
      },
      function(){
        $(".newsvideo-wrap-pc").hide();
      }
    );
    /* $(".newsvideo-wrap-pc").mouseleave(
      function(){
        $(".newsvideo-wrap-pc").hide();
      }
    ); */
  }
  $(".newsvideo-wrap").click(function(){
    $(".newsvideo-wrap").hide();
  })
})
