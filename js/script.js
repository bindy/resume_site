var SiteJc = (function() {

    function init() {

        banOthers();
        //获取窗口宽高
        var mWidth = $(document).width();
        var mHeight = $(document).height();
        var indexHome = 0;
        var indexWork = 1;
        var indexContact = 2;
        var currentIndex = 0;
        var $body = $('#ID_body');
        var $sections = $('#ID_section section');
        var sectionLength = $sections.length;
        var $section = $('#ID_section');
        var $nav = $('#ID_nav');
        var $navLink = $('#ID_nav li');
        var $tab = $('#ID_tab');
        var $letter = $('#ID_contact .letter');
        var $workWrap = $('#ID_work_wrap .work');
        var $photoWrap = $('#ID_work_wrap .photo');
        var $workList = $('#ID_workList');
        var $photoList = $('#ID_photoList');
        var $workLists = $('#ID_work_wrap li');
        var $pageWrap = $('#ID_page');
        var $scrollbar = $pageWrap.find('.scrollbar');
        var pageWidth = $pageWrap.width();
        var workWrapWidth = $workWrap.width();
        var photoWrapWidth = $photoWrap.width();

        var workListLength = $workLists.length;
        var workHandListMargin = 16;
        var workPhotoListMargin = 60;
        var pageOffset = $pageWrap.offset();


        var $overlay = '<div class="overlay"></div>';

        $section.height(mHeight * sectionLength);
        $sections.height(mHeight);

        $(window).resize(function() {
            pageOffset = $pageWrap.offset();

        })
        var delta_before = 0;
        var delta_after = 0;
        $(window).on('mousewheel', function(e) {
            var _delta = e.wheelDelta;
            if (_delta > 120)
                _delta = 120;
            else if (_delta < -120)
                _delta = -120;
            console.log(_delta)
            delta_after += _delta;
            if (delta_before - delta_after == 240) {
                currentIndex += 1;

                delta_before = delta_after;
            } else if (delta_after - delta_before == 240) {
                currentIndex -= 1;
                delta_before = delta_after;

            }
            if (currentIndex == 3) {

                currentIndex = 0;
            } else if (currentIndex == -1) {
                currentIndex = 2;
            }
            if (currentIndex == 2) {
                $letter.forEach(function(item, index) {

                    $(item).addClass('bg-le' + index);
                })
                $('#ID_plane').addClass('appear');
                $('.arrow .ico-arrow').css('-webkit-transform', 'rotate(180deg)');


            } else {
                $('.arrow .ico-arrow').css('-webkit-transform', 'rotate(0)');
            }

            if ($(".popup").html() == null) {
                $section.css('-webkit-transform', 'translateY(' + -(currentIndex) * mHeight + 'px)');

                // console.log(currentIndex)

                $navLink.siblings().removeClass('current');
                $navLink.eq(currentIndex).addClass('current');
            }
        })


        getWorkData($workList);

        getPhotoData($photoList);





        $body.on('keydown', function(e) {
            var keyCode = e.keyCode;
            var $scrollbar = $pageWrap.find('.scrollbar');
            var scrollbarcW = $scrollbar.width();
            var currentType = ($tab.find('.current').hasClass('item-hand')) ? "hand" : "photo";
            var keyLength = 80;
            if ($nav.find('.current ico-work')) {

                if (keyCode == '39') {
                    if (scrollbarcW + keyLength > pageWidth) {
                        $scrollbar.width(pageWidth)
                    } else {
                        $scrollbar.width(scrollbarcW + keyLength);
                    }

                } else if (keyCode == '37') {
                    if (scrollbarcW - keyLength < 20) {
                        $scrollbar.width(20)
                    } else {

                        $scrollbar.width((scrollbarcW - keyLength));
                    }


                }
                var _scrollbarcW = parseInt($scrollbar.css('width'));
                if (currentType == 'hand') {
                    var workListWidth = $workList.width();
                    var listOffset = workListWidth - workWrapWidth;
                    var deg = listOffset / pageWidth;
                    var listLeft = deg * _scrollbarcW;
                    $workList.css('left', -listLeft + 'px');
                } else if (currentType == 'photo') {
                    var workListWidth = $photoList.width();
                    var listOffset = workListWidth - photoWrapWidth;
                    var deg = listOffset / mWidth;
                    var listLeft = deg * _scrollbarcW;
                    $photoList.css('left', -listLeft + 'px');
                    if (_scrollbarcW <= 20) {
                        $photoList.css('left', '140px');
                    }


                }
            }

        })


        $body.on('click', function(e) {
            var targetClass = e.target.className;
            var targetTag = e.target.tagName;
            var $target = $(e.target);
            var targetX = e.x;
            var currentX = targetX - pageOffset.left;
            // console.log($target)


            //底部箭头
            if (targetClass == 'arrow' || targetClass == 'ico-arrow') {

                var $arrow = targetClass == 'arrow' ? $target.find('.ico-arrow') : $target;
                currentIndex += 1;

                if (currentIndex == sectionLength - 1) {

                    $arrow.css('-webkit-transform', 'rotate(180deg)');
                    $letter.forEach(function(item, index) {

                        $(item).addClass('bg-le' + index);
                    })
                    var $line = $('#ID_line').get(0);

                    $('#ID_plane').addClass('appear');

                    validForm();



                } else if (currentIndex == sectionLength) {
                    currentIndex = 0;
                    $arrow.css('-webkit-transform', 'rotate(0)');

                }


                $section.css('-webkit-transform', 'translateY(' + -(currentIndex) * mHeight + 'px)');

                $navLink.siblings().removeClass('current');
                $navLink.eq(currentIndex).addClass('current');


            }
            //右侧导航
            else if (targetClass == 'btn-nav' || targetClass.slice(0, 3) == 'ico') {

                var $arrow = $('#ID_btn_play .ico-arrow');
                if (targetClass.slice(4) == 'ico-home') {
                    currentIndex = indexHome;
                } else if (targetClass.slice(4) == 'ico-work') {
                    currentIndex = indexWork;
                } else if (targetClass.slice(4) == 'ico-contact') {
                    currentIndex = indexContact;
                    $('#ID_plane').addClass('appear');
                    validForm();

                }
                if (currentIndex == sectionLength - 1) {

                    $arrow.css('-webkit-transform', 'rotate(180deg)');
                    $letter.forEach(function(item, index) {

                        $(item).addClass('bg-le' + index);
                    })



                } else {
                    $arrow.css('-webkit-transform', 'rotate(0)');

                }


                $section.css('-webkit-transform', 'translateY(' + -(currentIndex) * mHeight + 'px)');
                $navLink.siblings().removeClass('current');
                $navLink.eq(currentIndex).addClass('current');
            }
            //作品tab
            else if (targetClass.indexOf('item') >= 0 && (targetTag == 'A' || targetTag == 'SPAN')) {

                $target.parents('li').siblings().removeClass('current');
                $target.parents('li').addClass('current');

                var workType = targetClass.slice(5);

                $scrollbar.width(20);

                if (workType == 'hand') {
                    currentX = 0;
                    $workWrap.removeClass('hide').addClass('show');
                    $photoWrap.removeClass('show').addClass('hide');

                    $workList.css('left', '0');
                    $scrollbar.attr('data-type', 'c_hand');

                } else if (workType == 'photo') {
                    $workWrap.removeClass('show').addClass('hide');
                    $photoWrap.removeClass('hide').addClass('show');
                    $photoList.css('left', '140px');
                    $scrollbar.attr('data-type', 'c_photo');
                }

            }
            //滑动条
            else if (targetClass == 'page-wrap' || targetClass == 'scrollbar') {
                var handType;
                var photoType;
                var _bar;
                if (targetClass == 'page-wrap') {
                    _bar = $target.find('.scrollbar');
                    currentX = targetX - pageOffset.left;
                    _bar.width(currentX);
                    if (currentX < 20) {
                        _bar.width(20);
                    }
                } else if (targetClass == 'scrollbar') {
                    _bar = $target;

                    _bar.width(currentX);
                    if (currentX < 20) {
                        _bar.width(20);
                    }

                }

                if (_bar.attr('data-type') == 'c_photo') {
                    photoType = 'true';
                    handType = 'false';
                } else if (_bar.attr('data-type') == 'c_hand') {
                    handType = 'true';
                    photoType = 'false';
                }
                if (handType == 'true') {

                    var workListWidth = $workList.width();
                    var listOffset = workListWidth - workWrapWidth;
                    var deg = listOffset / pageWidth;
                    var listLeft = deg * currentX;
                    $workList.css('left', -listLeft + 'px');
                } else if (photoType == 'true') {
                    var workListWidth = $photoList.width();
                    var listOffset = workListWidth - photoWrapWidth;
                    var deg = listOffset / mWidth;
                    var listLeft = deg * currentX;
                    $photoList.css('left', -listLeft + 'px');
                    if (currentX < 20) {
                        $photoList.css('left', '140px');
                    }

                }

            }
            //作品详细页
            else if (targetClass == 'item-work') {
                var $popup = null;

                if ($('.popup').get(0) == undefined) {
                    if ($target.attr('data-type') == 'photo') {
                        $popup =
                            '<div class="popup">\
			<div class="current-photo">\
			<img src="' + $target.attr('src') + '" alt="">\
			</div>\
			<a href="#" class="btn-next" title="下一页"></a>\
			<a href="#" class="btn-prev" title="上一页"></a>\
			<a href="#" class="btn-close" title="关闭"></a>\
			</div>';
                        $body.append($popup);
                        var currentPic = $target.parent().index();
                        var picAllLength = $target.parents('ul').children().length;


                        $('.popup .btn-next').on('click', function() {
                            if (++currentPic > picAllLength)
                                currentPic = 1;
                            $('.current-photo img').attr('src', 'photos/photo' + (currentPic) + '.jpg');
                        })
                        $('.popup .btn-prev').on('click', function() {
                            if (--currentPic == '0')
                                currentPic = picAllLength;
                            $('.current-photo img').attr('src', 'photos/photo' + (currentPic) + '.jpg');
                        })

                    } else if ($target.attr('data-type') == 'work') {
                        var workDirector = $target.attr('data-work');
                        var workNum = $target.attr('data-num');
                        var $popup =
                            '<div class="popup">\
			<ul class="list-photo"></ul>\
			<div class="current-photo"></div>\
			<a href="#" class="btn-close" title="关闭"></a>\
			</div>';
                        $body.append($popup);
                        var workDOM = '';
                        var currentDom = '<img src="images/' + workDirector + '/01.jpg" alt="">';
                        for (var i = 1; i <= workNum; i++) {
                            workDOM += '<li><a href="#"><img src="images/' + workDirector + '/0' + i + '.jpg" alt="" data-index="' + i + '"></a></li>'
                        }

                        $('.popup .list-photo').append(workDOM);
                        $('.popup .current-photo').append(currentDom);

                        $('.popup .list-photo img').on('click', function() {
                            var _index = $(this).attr('data-index');
                            $('.popup .current-photo img').attr('src', 'images/' + workDirector + '/0' + _index + '.jpg')
                        })

                    }


                } else {
                    $body.find('.popup').removeClass('hide-scale').addClass('show-scale');

                }
                $body.append($overlay);
            }
            //关闭弹kuang
            else if (targetClass.indexOf('overlay') >= 0 || targetClass == 'btn-close') {
                $body.find('.popup').removeClass('show-scale').addClass('hide-scale')
                setTimeout(function() {
                    $body.find('.popup').remove();
                }, 500)
                $body.find('.overlay').remove()

            }

        })






    }

    function validForm() {

        // $('.form-item').find('label').css('background-color','#f8f8f8');

        // target.parent().css('background-color','#fff');
        $('#ID_form').on('keyup', function() {
            var regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            // $('.form-item').find('label').css('background-color','#f8f8f8');

            $('.form-item').find('[data-func="valid"]').forEach(function(item) {
                if ($(item).val() !== '') {
                    $(item).parent().siblings('.ico').addClass('ico-correct');
                    $(item).parent().removeClass('error');
                    if (($(item).attr('name') == 'email') && (regEmail.test($(item).val()) == false)) {
                        console.log(1)
                        $(item).parent().addClass('error');
                        $(item).parent().siblings('.ico').removeClass('ico-correct');
                    }

                } else {


                    $(item).parent().addClass('error');
                    $(item).parent().siblings('.ico').removeClass('ico-correct');
                }
            })
            if ($('#ID_form').find('.ico-correct').length == 3) {
                $('#ID_form .btn-submit').removeClass('false');
            } else {
                $('#ID_form .btn-submit').addClass('false');

            }

        })

        $('#ID_form .btn-submit').on('click', function() {
            var name = $('.name_cont').val();
            var email = $('.email_cont').val();
            var comment = $('.comment_cont').val();
            var fb = new Firebase('https://sitejc.firebaseio.com/');
            console.log([name, email, comment]);
            fb.push({
                name: name,
                email: email,
                comment: comment
            });

            $('#ID_form').remove();
            $('#ID_feedback').removeClass('hide').addClass('show');
        })



    }


    function getWorkData(workWrap) {

        $.ajax({
            url: 'http://localhost:8888/site_jc/workdata.json',
            dataType: 'json',
            success: function(data) {
                var workColumnNum = Object.getOwnPropertyNames(data).length;
                var img = new Image();
                var workWidth;
                var workListMargin = 16;
                var _type = "work";


                for (var i in data) {
                    for (var j in data[i]) {
                        img.src = 'http://localhost:8888/site_jc/' + data[i][j].src;
                    }
                    var _pathIndex = data[i][0].src.indexOf('.jpg');
                    var _src = data[i][0].src.slice(0, _pathIndex) + '_s' + '.jpg';
                    var _workIndex = data[i][0].src.indexOf('work');
                    var _workLast = data[i][0].src.indexOf('/0');
                    var _work = data[i][0].src.slice(_workIndex, _workLast);
                    var _workNum = data[i].length;
                    var $item = '<li><img class="item-work" src="' + _src + '" alt="" data-work="' + _work + '" data-type="' + _type + '" data-num="' + _workNum + '"></li>';

                    workWrap.append($item);
                }
                if (workWrap.html() !== '') {
                    workWidth = workWrap.children('li').width();
                }
                workColumnNum = Math.ceil(workColumnNum / 2);

                var workColumnOffset = workWidth + workListMargin;
                workWrap.width(workColumnOffset * workColumnNum);
            },
            error: function() {
                console.log('error get data');
            }
        })


    }

    function getPhotoData(workWrap) {

        $.ajax({
            url: 'http://localhost:8888/site_jc/photodata.json',
            dataType: 'json',
            success: function(data) {
                var workColumnNum = Object.getOwnPropertyNames(data).length;
                var img = new Image();
                var workWidth;
                var workColumnOffset = 384;
                var _type = 'photo';

                for (var i in data) {
                    for (var j in data[i]) {
                        img.src = 'http://localhost:8888/site_jc/' + data[i][j].src;
                    }
                    var _path = data[i][0].src.indexOf('.jpg');
                    var _src = data[i][0].src.slice(0, _path) + '' + '.jpg';

                    var $item = '<li><img class="item-work" src="' + _src + '" alt="" data-work="' + _src + '" data-type="' + _type + '"></li>';
                    workWrap.append($item);

                }
                if (workWrap.html() !== '') {

                    workWidth = workWrap.children('li');
                }
                workWrap.width(workColumnOffset * workColumnNum);

            },
            error: function() {
                console.log('error get data');
            }
        })


    }

    function drawPath(path) {
        var length = path.getTotalLength();
        // Clear any previous transition
        path.style.transition = path.style.WebkitTransition =
            'none';
        // Set up the starting positions
        path.style.strokeDasharray = length + ' ' + length;
        path.style.strokeDashoffset = length;
        path.style.strokeMiterlimit = 10;
        // Trigger a layout so styles are calculated & the browser
        // picks up the starting position before animating
        path.getBoundingClientRect();
        // Define our transition
        path.style.transition = path.style.WebkitTransition =
            'stroke-dashoffset 2s ease-in-out';
        // Go!
        path.style.strokeDashoffset = '0';
    }

    function banOthers() {
        var rshell = /(maxthon|360se|360ee|theworld|se|theworld|greenbrowser|qqbrowser|tencenttraveler)[\/]?[\w.]*/,
            rchrome = /(chrome)[ \/]([\w.]+)/,
            rmsie = /(msie) ([\w.]+)/,
            rmsafari = /(safari) ([\w.]+)/,
            noneDouble = ["", ""],
            noneTriple = ["", "", ""];

        var $banHTML = '<div class="ban-others">\
			<div class="face">\
			<div class="eyeL"></div>\
			<div class="eyeR"></div>\
			<div class="tearL"></div>\
			<div class="tearR"></div>\
			<p class="ban-text" id="banText"></p>\
			<div class="avatar-bg"></div>\
			</div>\
			</div>';

        var browserDetect = function(ua) {
            var info = {};
            var core = rchrome.exec(ua) ||
                rmsie.exec(ua);
            var shell = rshell.exec(ua) || noneTriple,
                the360se = function() {
                    try {

                        var is360se = external.twGetRunPath.toLowerCase().indexOf('360se') > -1 ? true : false;
                        if (is360se) {
                            try {
                                var version = external.twGetRunVersion(external.twGetSecurityID(window));
                                return ['360se', version];
                            } catch (e) {
                                return ['360se', '-'];
                            }
                        }
                        return noneDouble;
                    } catch (e) {
                        return noneDouble;
                    }
                }(),
                theMaxthon = function() {
                    try {

                        if (/(\d+\.\d)/.test(external.max_version)) {
                            return ["maxthon", parseFloat(RegExp['\x241'])];
                        }
                        return noneDouble;
                    } catch (e) {
                        return noneDouble;
                    }
                }();

            if (core !== null) {
                info.core = [core[1], core[2]];
                info.shell = [shell[1], shell[2]];
            }
            if (the360se[0]) {
                info.shell = the360se;
            } else if (theMaxthon[0]) {
                info.shell = theMaxthon;
            }
            return info
        };

        var ua = navigator.userAgent.toLowerCase();
        var info = browserDetect(ua);

        if (info.core !== undefined) {
            var core = info.core.join('/');
            var shell = info.shell.join('/');
            var versionIndex = core.indexOf('/');
            var versionIndex = core.indexOf('chrome/');
            if (versionIndex >= 0) {
                core = core.replace('chrome/', '');
                var version = core.substr(0, 2);
                if (version < 32) {

                    document.body.innerHTML = $banHTML;
                    document.getElementById('banText').innerHTML = '您的浏览器需要更新了TT';
                } else {
                    $('.preload').remove();
                }
            } else if (versionIndex < 0) {
                document.body.innerHTML = $banHTML;
                document.getElementById('banText').innerHTML = '只有Chrome才能看到我TT，<a target="_blank" href="https://www.google.com/intl/zh-CN/chrome/browser/thankyou.html?statcb=1&installdataindex=defaultbrowser#">马上去下载</a>';
            }

        } else {
            document.body.innerHTML = $banHTML;
            document.getElementById('banText').innerHTML = '只有Chrome才能看到我TT，<a target="_blank" href="https://www.google.com/intl/zh-CN/chrome/browser/thankyou.html?statcb=1&installdataindex=defaultbrowser#">马上去下载</a>';
        }
    }

    return {
        init: init
    }
})();

SiteJc.init();