/**
 * date:2020/02/27
 * author:Mr.Chung
 * version:2.0
 * description:layuimini 主体框架扩展
 */
layui.define(["jquery", "miniMenu", "element", "miniTab", "miniTheme", 'table'], function (exports) {
    var $ = layui.$,
        layer = layui.layer,
        miniMenu = layui.miniMenu,
        miniTheme = layui.miniTheme,
        element = layui.element,
        miniTab = layui.miniTab;
        table = layui.table;

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = $.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }



    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    /*token 失效与重新登录赋值的问题 */
    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            var csrftoken = getCookie('csrftoken');
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

    if (!/http(s*):\/\//.test(location.href)) {
        var tips = "请先将项目部署至web容器（Apache/Tomcat/Nginx/IIS/等），否则部分数据将无法显示";
        return layer.alert(tips);
    }

    var miniAdmin = {

        /**
         * 快速生成树形组件
         *
         */

        CZtable : function(a, setting, k) {
            var href = ''
            if (k === 0) {
                href = 'getdata?k=' + k
            }
            else {
                href = 'getdata'
            }
            $.get({
            type:'GET',
            url:href,
            success: function (data) {
                var zNodes =[
			{id:1, pid_id:0, classificationname:"北京"},
			{id:2, pid_id:1, classificationname:"天津"},
			{id:3, pid_id:0, classificationname:"上海"},
			{id:6, pid_id:0, classificationname:"重庆"},
			{id:4, pid_id:0, classificationname:"河北省"}, // open表示直接展开
			{id:41, pid_id:4, classificationname:"石家庄"},
			{id:42, pid_id:4, classificationname:"保定"},
			{id:43, pid_id:4, classificationname:"邯郸"},
			{id:44, pid_id:4, classificationname:"承德"},
			{id:5, pid_id:0, classificationname:"广东省", open:true},
			{id:51, pid_id:5, classificationname:"广州"},
			{id:52, pid_id:5, classificationname:"深圳"},
			{id:53, pid_id:5, classificationname:"东莞"},
			{id:54, pid_id:5, classificationname:"佛山"},
			{id:6, pid_id:0, classificationname:"福建省", open:true},
			{id:61, pid_id:6, classificationname:"福州"},
			{id:62, pid_id:6, classificationname:"厦门"},
			{id:63, pid_id:6, classificationname:"泉州"},
			{id:64, pid_id:6, classificationname:"三明"}
		 ];


                if (data.code === 200) {
                    // layer.msg(data.msg)

                    console.log(zNodes)
                    console.log(data.data)
                    $.fn.zTree.init($(a), setting, data.data);
                } else {
                    layer.msg('分类数据获取失败')
                }
            }
        })
        },

        /**
         * 表单错误提交信息，返回表单信息
         * @param formid
         * @param form
         * @param errors
         */
        formerrsinfo: function (formid,form, errors) {
            for (var err in errors) {
                var errspan= $('form[lay-filter="'+formid+'"]').find("input[name='"+err+"'],select[name='"+err+"'],textarea[name='"+err+"'] ").parent().find("span[class='error']")
                $(errspan).text(errors[err]);
                $("textarea[name='"+err+"']").on("change",function (data){
                    if($(this).val().length>0)
                    {
                        $(this).parent().find("span[class='error']").text("");
                    }
                })
            }

            $("form[lay-filter='"+formid+"'] input[type='text']").on("input",function (data){
                if($(this).val().length>0)
                {
                    $(this).parent().find("span[class='error']").text("");
                }
            })

            form.on("select(formfilter)",function (data){
                if(data.value.length>0)
                {
                    $(data.elem).parent().find("span[class='error']").text("");
                }
            })
        },
        /**
         * 刷新页面
         */
        flshPage: function () {

            var cotentid = $(".layui-tab-item.layui-show>div").attr("id");
            var getCurrentTabId = $(".layui-tab-title .layui-this").attr("lay-id");
            var getCurrentTabTitle = $(".layui-tab-title .layui-this").html();

            var href = getCurrentTabId

            if (getCurrentTabId === 'checkexr' || getCurrentTabId === 'addexr' || getCurrentTabId === 'editexr' || getCurrentTabId === 'checkexrs') {
                var parid = sessionStorage.getItem(getCurrentTabId + '_id')
                var title = sessionStorage.getItem(getCurrentTabId + '_title')

                if (getCurrentTabId === 'checkexr'){
                    href = '/exrecord?id=' + parid
                } else if (getCurrentTabId === 'addexr'  || getCurrentTabId === 'editexr' || getCurrentTabId === 'checkexrs') {
                    var event = sessionStorage.getItem(getCurrentTabId + '_event')
                    href = '/exrecordedit?event=' + event + '&id=' + parid
                }
            }
            miniTab.create({
                tabId: getCurrentTabId,
                href: href,
                title: getCurrentTabTitle,
                flush: true,
            })
        },

        /**
         * ajax 提交参数
         * @param options.url   访问地址
         * @param options.data   传递ajax 数据
         * @param options.callback 回调方法
         * @param options.posttype 提交类型  form
         */
        postAjax: function (options) {

            $.ajaxSettings.async = true;
            $.post(options.url, options.data, function (data, status) {


                if (data.status == 200) {

                    if(options.posttype=="form")
                    {
                        var pageindex = $(".layui-layer-page").attr("times");
                        layer.close(pageindex)
                    }
                    options.callback(data)
                } else {
                    if (data.status == 100) {

                        miniAdmin.loginTools(options, 'ajaxpost');
                        return;
                    }
                    if (options.posttype == "form") {
                        options.callback(data)
                    } else
                        layer.alert(data.msg)
                }
            }, "json")
        },
        /**
         * ajax 提交参数
         * @param options.url   访问地址
         * @param options.data   传递ajax 数据
         * @param options.callback 回调方法
         * @param options.posttype 提交类型  form
         */
        getAjax: function (options) {
            $.get(options.url, options.data, function (data, status) {

                if (data.status == 200) {

                    if(options.posttype=="form")
                    {
                        var pageindex = $(".layui-layer-page").attr("times");
                        layer.close(pageindex)
                    }
                    options.callback(data)
                } else {
                    if (data.status == 100) {

                        miniAdmin.loginTools(options, 'ajaxpost');
                        return;
                    }
                    if (options.posttype == "form") {
                        options.callback(data)
                    } else
                        layer.msg(data.msg)
                }
            }, "json")
        },
        delAjax: function (options) {
            $.ajax({
                url: options.url,
                type: "DELETE",
                data: options.data,
                success: function (result) {

                    if (result.status == 200) {
                        options.callback(result)
                    } else {
                        if (result.status == 100) {

                            miniAdmin.loginTools(options, 'ajaxpost');
                            return;
                        }
                        layer.alert(result.msg)
                    }
                }
            });
        },
        loginTools: function (options, type = 'confirm') {
            $.get("/ajaxlogin", function (data, status) {
                var index = layer.open({
                    title: '用户登录',
                    btn: ['登录', '取消'],
                    type: 1,
                    shade: 0.2,
                    maxmin: false,
                    resize: false,
                    shadeClose: true,
                    area: ['25%', '35%'],
                    content: data,
                    yes: function (index, layero) {
                        var uname = $("#ajaxformlogin input[name='username']").val();
                        var password = $("#ajaxformlogin input[name='password']").val();

                        $.post("/ajaxlogin", {
                            username: uname,
                            password: password,
                            csrfmiddlewaretoken: $('#ajaxformlogin input[name="csrfmiddlewaretoken"]').val()
                        }, function (data, status) {
                            if (data.status != 200) {

                                if(data.errs)
                                {
                                    for(var item in data.errs)
                                    {
                                        layer.tips( data.errs[item], $("#ajaxformlogin input[name='"+item+"']"), {
                                            tipsMore: true
                                        })
                                    }
                                }
                                else
                                {
                                    layer.alert("登录失败:"+data.msg )
                                }

                            } else {
                                layer.close(index)
                                if (type == "confirm")
                                    miniAdmin.showConfirm(options);
                                else if (type == "ajaxpost") {
                                    // miniAdmin.postAjax(options, "ajaxpost")
                                    options.loginCallback();
                                } else {
                                    //刷新
                                    options.loginCallback();
                                }


                            }
                        }, "json")

                        return false;

                    }, btn2: function (index, layero) {
                        location.href = '/login'
                    }
                });

            })
        },
        /**
         * 弹出模态框修改
         * @param options.url   访问地址
         * @param options.data   传递ajax 数据
         * @param options.title 标题
         * @param options.style 样式
         */
        showConfirm: function (options) {

            $.get(options.url, options.data, function (result) {

                if (result == "loginerror") {

                    //判断是否登录
                    miniAdmin.loginTools(options)
                    return;
                }
                else if(result == "limiterror")
                {


                }

                var setstyle = {
                    title: options.title,
                    type: 1,
                    shade: 0.2,
                    maxmin: true,
                    resize:false,
                    shadeClose: true,
                    area: ['50%', '60%'],
                    content: result,
                };

                if (options.style) {
                    for (item in options.style) {
                        setstyle[item] = options.style[item];
                    }
                }
                layer.open(setstyle);

            });
        },

        /**
         * 后台框架初始化
         * @param options.iniUrl   后台初始化接口地址
         * @param options.clearUrl   后台清理缓存接口
         * @param options.urlHashLocation URL地址hash定位
         * @param options.bgColorDefault 默认皮肤
         * @param options.multiModule 是否开启多模块
         * @param options.menuChildOpen 是否展开子菜单
         * @param options.loadingTime 初始化加载时间
         * @param options.pageAnim iframe窗口动画
         * @param options.maxTabNum 最大的tab打开数量
         * @param options.bindMenu 是否开启右键菜单
         */
        render: function (options) {


            options.iniUrl = options.iniUrl || null;
            options.clearUrl = options.clearUrl || null;
            options.urlHashLocation = options.urlHashLocation || false;
            options.bgColorDefault = options.bgColorDefault || 1;
            options.multiModule = options.multiModule || false;
            options.menuChildOpen = options.menuChildOpen || false;
            options.loadingTime = options.loadingTime || 1;
            options.pageAnim = options.pageAnim || false;
            options.maxTabNum = options.maxTabNum || 20;
            $.get(options.iniUrl, function (data) {

                if (data == null) {
                    miniAdmin.error('暂无菜单信息')
                } else {

                    miniAdmin.renderLogo(data.logoInfo);
                    miniAdmin.renderClear(options.clearUrl);
                    miniAdmin.renderHome(data.homeInfo);
                    miniAdmin.renderAnim(options.pageAnim);
                    miniAdmin.listen();

                    miniMenu.render({
                        menuList: data.menuInfo,
                        premenuList: data.premenuInfo,
                        multiModule: options.multiModule,
                        menuChildOpen: options.menuChildOpen,
                        isrenderForemenu:options.isrenderForemenu,
                        callbackfun:options.callbackfun
                    });


                    if(options.userCenter)
                    {
                        var href=location.href.substr(location.href.lastIndexOf('/'));
                        $(".layuimini-header-content li a[layuimini-href='"+href+"']").parents("li").addClass("layui-this")

                    }

                    miniTab.render({
                        filter: 'layuiminiTab',
                        urlHashLocation: options.urlHashLocation,
                        multiModule: options.multiModule,
                        menuChildOpen: options.menuChildOpen,
                        maxTabNum: options.maxTabNum,
                        menuList: data.menuInfo,
                        homeInfo: data.homeInfo,
                        listenSwichCallback: function () {
                            miniAdmin.renderDevice();
                        }
                    });
                    miniTheme.render({
                        bgColorDefault: options.bgColorDefault,
                        listen: true,
                    });
                    miniAdmin.deleteLoader(options.loadingTime);
                }
            }).fail(function () {
                miniAdmin.error('菜单接口有误');
            });
        },

        /**
         * 初始化logo
         * @param data
         */
        renderLogo: function (data) {


            var html = '<a href="' + data.href + '"><img src="' + data.image + '" alt="logo"><h1>' + data.title + '</h1></a>';
            $('.layuimini-logo').html(html);
            //var html = '<a href="' + data.href + '"><h1>' + data.title + '</h1></a>';
            $('.layuimini-logo').html(html);
        },

        /**
         * 初始化首页
         * @param data
         */
        renderHome: function (data) {
            sessionStorage.setItem('layuiminiHomeHref', data.href);
            $('#layuiminiHomeTabId').html('<span class="layuimini-tab-active"></span><span class="disable-close">' + data.title + '</span><i class="layui-icon layui-unselect layui-tab-close">ဆ</i>');
            $('#layuiminiHomeTabId').attr('lay-id', data.href);
            //首屏渲染
            // $('#layuiminiHomeTabIframe').html('<div width="100%" height="100%" >aaa</div>');
        },

        /**
         * 初始化缓存地址
         * @param clearUrl
         */
        renderClear: function (clearUrl) {
            $('.layuimini-clear').attr('data-href', clearUrl);
        },

        /**
         * 初始化iframe窗口动画
         * @param anim
         */
        renderAnim: function (anim) {
            if (anim) {
                $('#layuimini-bg-color').after('<style id="layuimini-page-anim">' +
                    '.layui-tab-item.layui-show {animation:moveTop 1s;-webkit-animation:moveTop 1s;animation-fill-mode:both;-webkit-animation-fill-mode:both;position:relative;height:100%;-webkit-overflow-scrolling:touch;}\n' +
                    '@keyframes moveTop {0% {opacity:0;-webkit-transform:translateY(30px);-ms-transform:translateY(30px);transform:translateY(30px);}\n' +
                    '    100% {opacity:1;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0);}\n' +
                    '}\n' +
                    '@-o-keyframes moveTop {0% {opacity:0;-webkit-transform:translateY(30px);-ms-transform:translateY(30px);transform:translateY(30px);}\n' +
                    '    100% {opacity:1;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0);}\n' +
                    '}\n' +
                    '@-moz-keyframes moveTop {0% {opacity:0;-webkit-transform:translateY(30px);-ms-transform:translateY(30px);transform:translateY(30px);}\n' +
                    '    100% {opacity:1;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0);}\n' +
                    '}\n' +
                    '@-webkit-keyframes moveTop {0% {opacity:0;-webkit-transform:translateY(30px);-ms-transform:translateY(30px);transform:translateY(30px);}\n' +
                    '    100% {opacity:1;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0);}\n' +
                    '}' +
                    '</style>');
            }
        },

        fullScreen: function () {
            var el = document.documentElement;
            var rfs = el.requestFullScreen || el.webkitRequestFullScreen;
            if (typeof rfs != "undefined" && rfs) {
                rfs.call(el);
            } else if (typeof window.ActiveXObject != "undefined") {
                var wscript = new ActiveXObject("WScript.Shell");
                if (wscript != null) {
                    wscript.SendKeys("{F11}");
                }
            } else if (el.msRequestFullscreen) {
                el.msRequestFullscreen();
            } else if (el.oRequestFullscreen) {
                el.oRequestFullscreen();
            } else if (el.webkitRequestFullscreen) {
                el.webkitRequestFullscreen();
            } else if (el.mozRequestFullScreen) {
                el.mozRequestFullScreen();
            } else {
                miniAdmin.error('浏览器不支持全屏调用！');
            }
        },

        /**
         * 退出全屏
         */
        exitFullScreen: function () {
            var el = document;
            var cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.exitFullScreen;
            if (typeof cfs != "undefined" && cfs) {
                cfs.call(el);
            } else if (typeof window.ActiveXObject != "undefined") {
                var wscript = new ActiveXObject("WScript.Shell");
                if (wscript != null) {
                    wscript.SendKeys("{F11}");
                }
            } else if (el.msExitFullscreen) {
                el.msExitFullscreen();
            } else if (el.oRequestFullscreen) {
                el.oCancelFullScreen();
            } else if (el.mozCancelFullScreen) {
                el.mozCancelFullScreen();
            } else if (el.webkitCancelFullScreen) {
                el.webkitCancelFullScreen();
            } else {
                miniAdmin.error('浏览器不支持全屏调用！');
            }
        },

        /**
         * 初始化设备端
         */
        renderDevice: function () {
            if (miniAdmin.checkMobile()) {
                $('.layuimini-tool i').attr('data-side-fold', 1);
                $('.layuimini-tool i').attr('class', 'fa fa-outdent');
                $('.layui-layout-body').removeClass('layuimini-mini');
                $('.layui-layout-body').addClass('layuimini-all');
            }
        },


        /**
         * 初始化加载时间
         * @param loadingTime
         */
        deleteLoader: function (loadingTime) {
            setTimeout(function () {
                $('.layuimini-loader').fadeOut();
            }, loadingTime * 1000)
        },

        /**
         * 成功
         * @param title
         * @returns {*}
         */
        success: function (title) {
            return layer.msg(title, {icon: 1, shade: this.shade, scrollbar: false, time: 2000, shadeClose: true});
        },

        /**
         * 失败
         * @param title
         * @returns {*}
         */
        error: function (title) {
            return layer.msg(title, {icon: 2, shade: this.shade, scrollbar: false, time: 3000, shadeClose: true});
        },

        /**
         * 判断是否为手机
         * @returns {boolean}
         */
        checkMobile: function () {
            var ua = navigator.userAgent.toLocaleLowerCase();
            var pf = navigator.platform.toLocaleLowerCase();
            var isAndroid = (/android/i).test(ua) || ((/iPhone|iPod|iPad/i).test(ua) && (/linux/i).test(pf))
                || (/ucweb.*linux/i.test(ua));
            var isIOS = (/iPhone|iPod|iPad/i).test(ua) && !isAndroid;
            var isWinPhone = (/Windows Phone|ZuneWP7/i).test(ua);
            var clientWidth = document.documentElement.clientWidth;
            if (!isAndroid && !isIOS && !isWinPhone && clientWidth > 1024) {
                return false;
            } else {
                return true;
            }
        },

        /**
         * 监听
         */
        listen: function () {

            /**
             * 清理
             */
            $('body').on('click', '[data-clear]', function () {
                var loading = layer.load(0, {shade: false, time: 2 * 1000});
                sessionStorage.clear();

                // 判断是否清理服务端
                var clearUrl = $(this).attr('data-href');
                if (clearUrl != undefined && clearUrl != '' && clearUrl != null) {
                    $.getJSON(clearUrl, function (data, status) {
                        layer.close(loading);
                        if (data.code != 1) {
                            return miniAdmin.error(data.msg);
                        } else {
                            return miniAdmin.success(data.msg);
                        }
                    }).fail(function () {
                        layer.close(loading);
                        return miniAdmin.error('清理缓存接口有误');
                    });
                } else {
                    layer.close(loading);
                    return miniAdmin.success('清除缓存成功');
                }
            });

            /**
             * 刷新
             */
            $('body').on('click', '[data-refresh]', function () {

                var cotentid = $(".layui-tab-item.layui-show>div").attr("id");
                var getCurrentTabId = $(".layui-tab-title .layui-this").attr("lay-id");
                var getCurrentTabTitle = $(".layui-tab-title .layui-this").html();
                var cuttenthref = getCurrentTabId


                if (getCurrentTabId === '/admin') {
                    cuttenthref = '/material'
                }

                miniTab.create({
                    tabId: getCurrentTabId,
                    href: cuttenthref,
                    title: getCurrentTabTitle,
                    flush: true,
                })
            });

            /**
             * 监听提示信息
             */
            $("body").on("mouseenter", ".layui-nav-tree .menu-li", function () {
                if (miniAdmin.checkMobile()) {
                    return false;
                }
                var classInfo = $(this).attr('class'),
                    tips = $(this).prop("innerHTML"),
                    isShow = $('.layuimini-tool i').attr('data-side-fold');
                if (isShow == 0 && tips) {
                    tips = "<ul class='layuimini-menu-left-zoom layui-nav layui-nav-tree layui-this'><li class='layui-nav-item layui-nav-itemed'>" + tips + "</li></ul>";
                    window.openTips = layer.tips(tips, $(this), {
                        tips: [2, '#2f4056'],
                        time: 300000,
                        skin: "popup-tips",
                        success: function (el) {
                            var left = $(el).position().left - 10;
                            $(el).css({left: left});
                            element.render();

                            //绑定事件
                            //miniMenu.bindMenu()
                        }
                    });
                }
            });

            $("body").on("mouseleave", ".popup-tips", function () {
                if (miniAdmin.checkMobile()) {
                    return false;
                }
                var isShow = $('.layuimini-tool i').attr('data-side-fold');
                if (isShow == 0) {
                    try {
                        layer.close(window.openTips);
                    } catch (e) {
                        console.log(e.message);
                    }
                }
            });


            /**
             * 全屏
             */
            $('body').on('click', '[data-check-screen]', function () {
                var check = $(this).attr('data-check-screen');
                if (check == 'full') {
                    miniAdmin.fullScreen();
                    $(this).attr('data-check-screen', 'exit');
                    $(this).html('<i class="fa fa-compress"></i>');
                } else {
                    miniAdmin.exitFullScreen();
                    $(this).attr('data-check-screen', 'full');
                    $(this).html('<i class="fa fa-arrows-alt"></i>');
                }
            });

            /**
             * 点击遮罩层
             */
            $('body').on('click', '.layuimini-make', function () {
                miniAdmin.renderDevice();
            });

        }
    };


    exports("miniAdmin", miniAdmin);
});
