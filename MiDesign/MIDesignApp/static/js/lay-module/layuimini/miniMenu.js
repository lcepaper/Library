/**
 * date:2020/02/27
 * author:Mr.Chung
 * version:2.0
 * description:layuimini 菜单框架扩展
 */
layui.define(["element", "laytpl", "jquery", 'dropdown'], function (exports) {
    var element = layui.element,
        $ = layui.$,
        laytpl = layui.laytpl,
        dropdown = layui.dropdown,
        layer = layui.layer;

    var miniMenu = {

        /**
         * 菜单初始化
         * @param options.menuList   菜单数据信息
         * @param options.multiModule 是否开启多模块
         * @param options.premenuList
         * @param options.menuChildOpen 是否展开子菜单
         * @param options.isrenderForemenu 是否渲染左侧菜单
         */
        render: function (options) {
            options.menuList = options.menuList || [];
            options.premenuList = options.premenuList || [];
            options.multiModule = options.multiModule || false;
            options.menuChildOpen = options.menuChildOpen || false;

            //
            if (options.isrenderForemenu) {
                miniMenu.renderForeModule(options.menuList, options.premenuList, options.menuChildOpen);
            } else {
                miniMenu.renderSingleModule(options.menuList, options.premenuList, options.menuChildOpen);
            }
            miniMenu.listen();

            if(options.callbackfun)
            {

            options.callbackfun();
            }


        },

        /**
         * 单模块
         * @param menuList 菜单数据
         * @param premenulist 前端菜单数据
         * @param menuChildOpen 是否默认展开
         */
        renderSingleModule: function (menuList, premenulist, menuChildOpen) {
            menuList = menuList || [];
            var leftMenuHtml = '',
                childOpenClass = '',
                leftMenuCheckDefault = 'layui-this';
            var me = this;
            if (menuChildOpen) childOpenClass = ' layui-nav-itemed';
            leftMenuHtml = this.renderLeftMenu(menuList, {childOpenClass: childOpenClass});
            $('.layui-layout-body').addClass('layuimini-single-module'); //单模块标识
            //$('.layuimini-header-menu').remove();
            $('.layuimini-menu-left').html(leftMenuHtml);
            var headerMenuHtml = '', headerMobileMenuHtml = "", headerMenuCheckDefault = '';
            headerMenuHtml = this.each(premenulist, function (index, val) { //顶部菜单渲染
                var menu = 'multi_module_' + index;
                var id = menu + "HeaderId";
                var topMenuItemHtml = "";
                topMenuItemHtml = me.compileHeadMenu({
                    className: headerMenuCheckDefault,
                    menu: menu,
                    id: id,
                    title: val.title,
                    href: val.href,
                    target: val.target,
                    children: ""
                });
                headerMobileMenuHtml += me.compileMenu({
                    id: id,
                    menu: menu,
                    id: id,
                    icon: val.icon,
                    title: val.title,
                }, true);
                headerMenuCheckDefault = "";
                leftMenuCheckDefault = "layui-hide";
                return topMenuItemHtml;
            }).join("");
            $('.layui-layout-body').addClass('layuimini-multi-module'); //多模块标识
            $('.layuimini-menu-header-pc').html(headerMenuHtml); //电脑
            $('.layuimini-menu-header-mobile').html(headerMobileMenuHtml); //手机
            element.init();
        },

        /**
         * 渲染一级菜单
         */
        compileMenu: function (menu, isSub) {
            var selfclass = "";
            var menuHtml = "";
            if (menu.title == "软件") {
                menu.selfclass = "softroot";
                menuHtml = '<li {{#if( d.menu){ }}  data-menu="{{d.menu}}" {{#}}} class="layui-nav-item menu-li {{d.childOpenClass}} {{d.selfclass}} "  {{#if( d.id){ }}  id="{{d.id}}" {{#}}}> <a class="{{ d.className }}"  {{#if( d.href){ }} layuimini-href="{{d.href}}" {{#}}} {{#if( d.target){ }}  target="{{d.target}}" {{#}}} href="javascript:;">{{#if( d.icon){ }}  <i class="{{d.icon}}"></i> {{#}}} <span class="layui-left-nav">{{d.title}}</span></a>{{# if(d.children){}} {{d.children}} {{#}}} </li>';
                if (isSub) {
                    menuHtml = '<a class="{{ d.className }}"  style="background:{{d.color}}" data-color="{{d.color}}"   href="javascript:;"  {{#if( d.menu){ }}  data-menu="{{d.menu}}" {{#}}} {{#if( d.id){ }}  id="{{d.id}}" {{#}}} {{#if(( !d.child || !d.child.length ) && d.href){ }} layuimini-href="{{d.href}}" {{#}}} {{#if( d.target){ }}  target="{{d.target}}" {{#}}}> {{#if( d.icon){ }}  <i class="{{d.icon}}"></i> {{#}}} <span class="layui-left-nav"> {{d.title}}</span></a><div class="listsoft"> {{# if(d.children){}} {{d.children}} {{#}}}</div>'
                }
            } else {

                menuHtml = '<li {{#if( d.menu){ }}  data-menu="{{d.menu}}" {{#}}} class="layui-nav-item menu-li {{d.childOpenClass}} {{d.selfclass}} "  {{#if( d.id){ }}  id="{{d.id}}" {{#}}}> <a class="{{ d.className }}"  {{#if( d.href){ }} layuimini-href="{{d.href}}" {{#}}} {{#if( d.target){ }}  target="{{d.target}}" {{#}}} href="javascript:;">{{#if( d.icon){ }}  <i class="{{d.icon}}"></i> {{#}}} <span class="layui-left-nav">{{d.title}}</span></a>  {{# if(d.children){}} {{d.children}} {{#}}} </li>';
                if (isSub) {
                    menuHtml = '<dd class="menu-dd {{d.childOpenClass}} "> <a class="{{ d.className }}"  style="background:{{d.color}}" data-color="{{d.color}}" href="javascript:;"  {{#if( d.menu){ }}  data-menu="{{d.menu}}" {{#}}} {{#if( d.id){ }}  id="{{d.id}}" {{#}}} {{#if(( !d.child || !d.child.length ) && d.href){ }} layuimini-href="{{d.href}}" {{#}}} {{#if( d.target){ }}  target="{{d.target}}" {{#}}}> {{#if( d.icon){ }}  <i class="{{d.icon}}"></i> {{#}}} <span class="layui-left-nav"> {{d.title}}</span></a> {{# if(d.children){}} {{d.children}} {{#}}}</dd>'
                }
            }


            return laytpl(menuHtml).render(menu);
        },
        compileSoftMenu: function (menu, isSub) {
            var selfclass = "";
            var menuHtml = "";
            menu.selfclass = "softroot";
            menuHtml = '<li {{#if( d.menu){ }}  data-menu="{{d.menu}}" {{#}}} class=" {{d.childOpenClass}} {{d.selfclass}} "  {{#if( d.id){ }}  id="{{d.id}}" {{#}}}> <a class="{{ d.className }}" style="background: {{d.color}}"  {{#if( d.href){ }} layuimini-href="{{d.href}}" {{#}}} {{#if( d.target){ }}  target="{{d.target}}" {{#}}} href="javascript:;">{{#if( d.icon){ }}  <i class="{{d.icon}}"></i> {{#}}} <span class="layui-left-nav">{{d.title}}</span></a> <div class="listsoft">  {{# if(d.children){}} {{d.children}} {{#}}}</div></li>';
            if (isSub) {

                if (menu.className == "soft") {
                    menu.baccolor ='';
                    menu.borderstyle=";border-left-bottom-radius:3px;border-left:8px solid "+menu.color;
                }
                else {
                    menu.baccolor =menu.color;

                }
                menuHtml = '<child> <a class="{{ d.className }}"  style="background:{{d.baccolor}};{{d.borderstyle}}" data-color="{{d.color}}" data-id="{{d.id}}" href="javascript:;"  {{#if( d.menu){ }}  data-menu="{{d.menu}}" {{#}}} {{#if( d.id){ }}  id="{{d.id}}" {{#}}} {{#if(( !d.child || !d.child.length ) && d.href){ }} layuimini-href="{{d.href}}" {{#}}} {{#if( d.target){ }}  target="{{d.target}}" {{#}}}> {{#if( d.icon){ }}  <i class="{{d.icon}}"></i> {{#}}} <span class="layui-left-nav"> {{d.title}}</span></a> {{# if(d.children){}} {{d.children}} {{#}}}</child>'
            }

            return laytpl(menuHtml).render(menu);
        },
        compileHeadMenu: function (menu, isSub) {
            var menuHtml = '<li {{#if( d.menu){ }}  data-headmenu="{{d.menu}}" {{#}}} class="layui-nav-item menu-li {{d.childOpenClass}} {{d.className}}"  {{#if( d.id){ }}  id="{{d.id}}" {{#}}}> <a {{#if( d.href){ }} data-color="{{d.color}}" data-id="{{d.id}}" style="background:{{d.color}}" layuimini-href="{{d.href}}" {{#}}} {{#if( d.target){ }}  target="{{d.target}}" {{#}}} href="javascript:;">{{#if( d.icon){ }}  <i class="{{d.icon}}"></i> {{#}}} <span class="layui-left-nav">{{d.title}}</span></a>  {{# if(d.children){}} {{d.children}} {{#}}} </li>';
            if (isSub) {
                menuHtml = '<dd class="menu-dd {{d.childOpenClass}} {{ d.className }}"> <a href="javascript:;"  {{#if( d.menu){ }}  data-menu="{{d.menu}}" {{#}}} {{#if( d.id){ }}  id="{{d.id}}" {{#}}} {{#if(( !d.child || !d.child.length ) && d.href){ }} layuimini-href="{{d.href}}" {{#}}} {{#if( d.target){ }}  target="{{d.target}}" {{#}}}> {{#if( d.icon){ }}  <i class="{{d.icon}}"></i> {{#}}} <span class="layui-left-nav"> {{d.title}}</span></a> {{# if(d.children){}} {{d.children}} {{#}}}</dd>'
            }
            return laytpl(menuHtml).render(menu);
        },
        compileMenuContainer: function (menu, isSub) {
            var wrapperHtml = '<ul lay-filter="navmenu" class="layui-nav layui-nav-tree layui-left-nav-tree {{d.className}}" id="{{d.id}}">{{d.children}}</ul>';
            if (isSub) {
                wrapperHtml = '<dl class="layui-nav-child ">{{d.children}}</dl>';
            }
            if (!menu.children) {
                return "";
            }
            return laytpl(wrapperHtml).render(menu);
        },
        compileSoftMenuContainer: function (menu, isSub) {
            var wrapperHtml = '<ul lay-filter="navmenu" class=" {{d.className}}" id="{{d.id}}">{{d.children}}</ul>';
            if (isSub) {
                wrapperHtml = '{{d.children}}';
            }
            if (!menu.children) {
                return "";
            }
            return laytpl(wrapperHtml).render(menu);
        },
        each: function (list, callback) {
            var _list = [];
            for (var i = 0, length = list.length; i < length; i++) {
                _list[i] = callback(i, list[i]);
            }
            return _list;
        },
        renderChildrenMenu: function (menuList, options) {
            var me = this;
            menuList = menuList || [];
            var html = this.each(menuList, function (idx, menu) {
                if (menu.child && menu.child.length) {
                    menu.children = me.renderChildrenMenu(menu.child, {childOpenClass: options.childOpenClass || ''});
                }
                menu.className = menu.className;
                menu.childOpenClass = options.childOpenClass || ''
                return me.compileMenu(menu, true)
            }).join("");
            return me.compileMenuContainer({children: html}, true)
        },
        renderSoftChildrenMenu: function (menuList, options) {
            var me = this;
            menuList = menuList || [];
            var html = this.each(menuList, function (idx, menu) {
                if (menu.child && menu.child.length) {
                    menu.children = me.renderSoftChildrenMenu(menu.child, {childOpenClass: options.childOpenClass || ''});
                }
                menu.className = menu.className;
                menu.childOpenClass = options.childOpenClass || ''
                return me.compileSoftMenu(menu, true)
            }).join("");
            return me.compileSoftMenuContainer({children: html}, true)
        },
        renderLeftMenu: function (leftMenus, options) {
            options = options || {};
            var me = this;

            var leftMenusHtml = me.each(leftMenus || [], function (idx, leftMenu) { // 左侧菜单遍历
                var children;
                var leftMenuHtml = "";
                if (leftMenu.title == "软件") {
                    children = me.renderSoftChildrenMenu(leftMenu.child, {childOpenClass: options.childOpenClass});
                    leftMenuHtml = me.compileSoftMenu({
                        href: leftMenu.href,
                        target: leftMenu.target,
                        childOpenClass: options.childOpenClass,
                        icon: leftMenu.icon,
                        title: leftMenu.title,
                        children: children,
                        className: leftMenu.className,
                    });



                } else {
                    children = me.renderChildrenMenu(leftMenu.child, {childOpenClass: options.childOpenClass});
                    leftMenuHtml = me.compileMenu({
                        href: leftMenu.href,
                        target: leftMenu.target,
                        childOpenClass: options.childOpenClass,
                        icon: leftMenu.icon,
                        title: leftMenu.title,
                        children: children,
                        className: leftMenu.className,
                    });
                }


                return leftMenuHtml;
            }).join("");

            leftMenusHtml = me.compileMenuContainer({
                id: options.parentMenuId,
                className: options.leftMenuCheckDefault,
                children: leftMenusHtml
            });
            return leftMenusHtml;
        },
        /**
         * 单模块
         * @param menuList 菜单数据
         * @param premenulist 前端菜单数据
         * @param menuChildOpen 是否默认展开
         * @param  isrendermenu
         */
        renderForeModule: function (menuList, premenulist, menuChildOpen) {
            menuList = menuList || [];
            var leftMenuHtml = '',
                childOpenClass = '',
                leftMenuCheckDefault = 'layui-this';
            var me = this;
            if (menuChildOpen) childOpenClass = ' layui-nav-itemed';
            leftMenuHtml = this.renderLeftMenu(menuList, {childOpenClass: childOpenClass});
            $('.layui-layout-body').addClass('layuimini-single-module'); //单模块标识
            //$('.layuimini-header-menu').remove();
            $('.layuimini-menu-left').html(leftMenuHtml);
            var headerMenuHtml = '', headerMobileMenuHtml = "", headerMenuCheckDefault = '';
            headerMenuHtml = this.each(premenulist, function (index, val) { //顶部菜单渲染
                var menu = 'multi_module_' + index;
                var id = menu + "HeaderId";
                var topMenuItemHtml = "";
                topMenuItemHtml = me.compileHeadMenu({
                    className: headerMenuCheckDefault,
                    menu: menu,
                    id: id,
                    title: val.title,
                    target:val.target,
                    href: val.href,
                    color: val.color,
                    children: ""
                });
                headerMobileMenuHtml += me.compileHeadMenu({
                    id: id,
                    menu: menu,
                    id: id,
                    icon: val.icon,
                    title: val.title,
                    color: val.color,
                }, true);
                headerMenuCheckDefault = "";
                leftMenuCheckDefault = "layui-hide";
                return topMenuItemHtml;
            }).join("");
            $('.layui-layout-body').addClass('layuimini-multi-module'); //多模块标识
            $('.layuimini-menu-header-pc').html(headerMenuHtml); //电脑
            $('.layuimini-menu-header-mobile').html(headerMobileMenuHtml); //手机
            element.init();
        },


        /**
         * 监听
         */
        listen: function () {

            /**
             * 菜单模块切换
             */
            $('body').on('click', '[data-menu]', function () {
                var loading = layer.load(0, {shade: false, time: 2 * 1000});
                var menuId = $(this).attr('data-menu');
                // header
                $(".layuimini-header-menu .layui-nav-item.layui-this").removeClass('layui-this');
                $(this).addClass('layui-this');
                // left
                $(".layuimini-menu-left .layui-nav.layui-nav-tree.layui-this").addClass('layui-hide');
                $(".layuimini-menu-left .layui-nav.layui-nav-tree.layui-this.layui-hide").removeClass('layui-this');
                $("#" + menuId).removeClass('layui-hide');
                $("#" + menuId).addClass('layui-this');
                layer.close(loading);
            });


            /**
             * 菜单缩放
             */
            $('body').on('click', '.layuimini-site-mobile', function () {

                var loading = layer.load(0, {shade: false, time: 2 * 1000});
                var isShow = $('.layuimini-tool [data-side-fold]').attr('data-side-fold');
                if (isShow == 1) { // 缩放
                    $('.layuimini-tool [data-side-fold]').attr('data-side-fold', 0);
                    $('.layuimini-tool [data-side-fold]').attr('class', 'fa fa-indent');
                    $('.layui-layout-body').removeClass('layuimini-all');
                    $('.layui-layout-body').addClass('layuimini-mini');
                } else { // 正常
                    $('.layuimini-tool [data-side-fold]').attr('data-side-fold', 1);
                    $('.layuimini-tool [data-side-fold]').attr('class', 'fa fa-outdent');
                    $('.layui-layout-body').removeClass('layuimini-mini');
                    $('.layui-layout-body').addClass('layuimini-all');
                    layer.close(window.openTips);
                }
                element.init();
                layer.close(loading);
            });
            /**
             * 菜单缩放
             */
            $('body').on('click', '[data-side-fold]', function () {

    var loading = layer.load(0, {shade: false, time: 2 * 1000});
    var isShow = $('.layuimini-tool [data-side-fold]').attr('data-side-fold');
    if (isShow == 1) { // 缩放
        $('.layuimini-tool [data-side-fold]').attr('data-side-fold', 0);
        $('.layuimini-tool [data-side-fold]').attr('class', 'fa fa-indent');
        // $('.layui-layout-body').removeClass('layuimini-all');
        // $('.layui-layout-body').addClass('layuimini-mini');
        $('.layuimini-menu-left').css('display', 'none')
        $('.layui-body').css('left', '0')
        // $(".menu-li").each(function (idx,el) {
        //     $(el).addClass("hidden-sub-menu");
        // });
        $(".layui-footer ").addClass("sidefoot");
        $('.layui-layout-admin .layui-footer.sidefoot').css('left', '0px')
    } else { // 正常
        $('.layuimini-tool [data-side-fold]').attr('data-side-fold', 1);
        $('.layuimini-tool [data-side-fold]').attr('class', 'fa fa-outdent');
        // $('.layui-layout-body').removeClass('layuimini-mini');
        // $('.layui-layout-body').addClass('layuimini-all');
        $('.layuimini-menu-left').css('display', '')
        $('.layui-body').css('left', '200px')
        $('.layui-layout-admin .layui-footer.sidefoot').css('left', '200px')

        $(".layui-footer").removeClass("sidefoot")
        // $(".menu-li").each(function (idx,el) {
        //     $(el).removeClass("hidden-sub-menu");
        // });
        layer.close(window.openTips);
    }
    element.init();
    layer.close(loading);
});
            // $('body').on('click', '[data-side-fold]', function () {
            //     var loading = layer.load(0, {shade: false, time: 2 * 1000});
            //     var isShow = $('.layuimini-tool [data-side-fold]').attr('data-side-fold');
            //     if (isShow == 1) { // 缩放
            //         $('.layuimini-tool [data-side-fold]').attr('data-side-fold', 0);
            //         $('.layuimini-tool [data-side-fold]').attr('class', 'fa fa-indent');
            //         $('.layui-layout-body').removeClass('layuimini-all');
            //         $('.layui-layout-body').addClass('layuimini-mini');
            //         // $(".menu-li").each(function (idx,el) {
            //         //     $(el).addClass("hidden-sub-menu");
            //         // });
            //         $(".layui-footer ").addClass("sidefoot");
            //
            //     } else { // 正常
            //         $('.layuimini-tool [data-side-fold]').attr('data-side-fold', 1);
            //         $('.layuimini-tool [data-side-fold]').attr('class', 'fa fa-outdent');
            //         $('.layui-layout-body').removeClass('layuimini-mini');
            //         $('.layui-layout-body').addClass('layuimini-all');
            //
            //         $(".layui-footer").removeClass("sidefoot")
            //         // $(".menu-li").each(function (idx,el) {
            //         //     $(el).removeClass("hidden-sub-menu");
            //         // });
            //         layer.close(window.openTips);
            //     }
            //     element.init();
            //     layer.close(loading);
            // });

            /**
             * 手机端点开模块
             */
            $('body').on('click', '.layuimini-header-menu.layuimini-mobile-show dd', function () {
                var loading = layer.load(0, {shade: false, time: 2 * 1000});
                var check = $('.layuimini-tool [data-side-fold]').attr('data-side-fold');
                if (check === "1") {
                    $('.layuimini-site-mobile').trigger("click");
                    element.init();
                }
                layer.close(loading);
            });


        },

    };


    exports("miniMenu", miniMenu);
});
