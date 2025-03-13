/**
 * date:2021/05/20
 * author:刘图川
 * version:1.0
 * description:思南设计平台 核心softevent js
 */
layui.define(["element", "laytpl", "jquery", 'miniAdmin', 'jsplumb', 'autorowsnumbers', 'highlighttextarea', 'table', 'upload'], function (exports) {
    var element = layui.element,
        $ = layui.$,
        laytpl = layui.laytpl,
        dropdown = layui.dropdown,
        miniAdmin = layui.miniAdmin,
        jsPlumb = layui.jsplumb,
        table = layui.table,
        upload = layui.upload,
        layer = layui.layer;

    //日志输出
    var timelogconsole;

    //自动保存
    var AutoSavePlan;

    var isDisEvent = false;// 是否开启快捷方式

    var ranges = new Array();
    var markranges = new Array();
    var mark = new Array();
    //基本连接线样式
    var connectorPaintStyle = {
        lineWidth: 2,
        strokeStyle: "#61b8d0",
    };

    // 鼠标悬浮在连接线上的样式
    var connectorHoverStyle = {
        lineWidth: 2,
        strokeStyle: "green",
    };

    //端点的颜色样式
    var paintStyle = {
        fillStyle: "#ccc",
        radius: 10,
        lineWidth: 6,
    }

    // 鼠标悬浮在端点上的样式
    var hoverPaintStyle = {
        fillStyle: "#aaa",
    }

    //设置连接端点和连接线
    var hollowCircle = {
        endpoint: ["Dot", {radius: 5}],  //端点的形状
        connectorStyle: connectorPaintStyle,
        connectorHoverStyle: connectorHoverStyle,
        paintStyle: paintStyle,
        hoverPaintStyle: hoverPaintStyle,
        isSource: true,    //是否可以拖动（作为连线起点）
        connector: ["Bezier", {stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true}],  //连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
        isTarget: true,    //是否可以放置（连线终点）
        maxConnections: 4,    // 设置连接点最多可以连接几条线
        connectorOverlays: []
    };


    var nodesindex = 0;

    var softevent = {

            extendAllMenu: function () {

                $(".layui-nav-item.menu-li").each(function () {
                    if (!$(this).hasClass("layui-nav-itemed")) {
                        $(this).addClass("layui-nav-itemed")
                    }
                });
                $(".layui-left-nav-tree .layui-nav-child dd").each(function () {
                    if (!$(this).hasClass("layui-nav-itemed")) {
                        $(this).addClass("layui-nav-itemed")
                    }
                });
            },
            hexToRgba: function (hex, opacity) {
                let RGBA = "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")";
                return {
                    red: parseInt("0x" + hex.slice(1, 3)),
                    green: parseInt("0x" + hex.slice(3, 5)),
                    blue: parseInt("0x" + hex.slice(5, 7)),
                    rgba: RGBA
                }
            },

            /***
             * 获取字体颜色，根据背景颜色自
             * @param rgbvalue
             * @returns {string}
             * @constructor
             */
            GetFontColor: function (rgbvalue) {

                var $grayLevel = rgbvalue.red * 0.299 + rgbvalue.green * 0.587 + rgbvalue.blue * 0.114;
                var fontcolor = "color:#fff";
                if ($grayLevel >= 192) {
                    fontcolor = "color:#000"
                }
                return fontcolor;
            },

            /***
             * 绑定事件
             */
            bindLeftMenuEvent: function () {
                dropdown.render({
                    elem: '.projectlist'//也可绑定到 document，从而重置整个右键
                    , trigger: 'contextmenu' //contextmenu
                    , isAllowSpread: false //禁止菜单组展开收缩
                    , style: 'width: 200px' //定义宽度，默认自适应
                    , id: 'leftMenu' //定义唯一索引
                    , data: [{
                        title: '删除项目'
                        , id: 'DelProject'
                    }, {
                        title: '编辑项目'
                        , id: 'EditProject'
                    }]
                    , click: function (obj, othis) {
                        var elem = this.elem;
                        var id = elem[0].id.replace("id_", "")
   debugger;

                        eval('softevent.' + obj.id + '(' + id + ',this)');

                    }
                });

                dropdown.render({
                    elem: '.menulist'//也可绑定到 document，从而重置整个右键
                    , trigger: 'contextmenu' //contextmenu
                    , isAllowSpread: false //禁止菜单组展开收缩
                    , style: 'width: 200px' //定义宽度，默认自适应
                    , id: 'leftMenu' //定义唯一索引
                    , data: [{
                        title: '刷新'
                        , id: 'Reflush'
                    }, {
                        title: '重命名'
                        , id: 'UpdatePlan'
                    }, {
                        title: '复制'
                        , id: 'CopyPlan'
                    }, {
                        title: '运行'
                        , id: 'RunPlan'
                    }, {
                        title: '停止'
                        , id: 'StopPlan'
                    }, {
                        title: '删除方案'
                        , id: 'DelPlan'
                    }]
                    , click: function (obj, othis) {
                        var elem = this.elem;
                        var id = elem[0].id

                        eval('softevent.' + obj.id + '("' + id + '",this)');
                    }
                });

                //更新监听事件
                element.init('nav')
                //element.render('nav')
            },
            bindDocMentEvent: function () {
                dropdown.render({
                    elem: '#workContent'//也可绑定到 document，从而重置整个右键
                    , trigger: 'contextmenu' //contextmenu
                    , isAllowSpread: false //禁止菜单组展开收缩
                    , style: 'width: 200px' //定义宽度，默认自适应
                    , id: 'documentRightMenu' //定义唯一索引
                    , data: [{
                        title: '新建项目(Shift+N)'
                        , id: 'CreateProject'
                    },
                    // {
                    //     title: '运行项目(ctrl+X)'
                    //     , id: 'RunProject'
                    // }, {
                    //     title: '停止运行项目(ctrl+Q)'
                    //     , id: 'SotpProject'
                    // },
                        //     {
                        //     title: '刷新项目(ctrl+F)'
                        //     , id: 'FlushProject(ctrl+F)'
                        // },
                        // {
                        //     title: '重命名项目(ctrl+U)'
                        //     , id: 'ReProjectName'
                        // },
                        //     {
                        //     title: '复制项目(ctrl+C)'
                        //     , id: 'CopyName'
                        // },
                        // {
                        //     title: '删除项目(Shift+D)'
                        //     , id: 'DelProject'
                        // },
                        {type: '-'},
                        {
                            title: '新建方案(Alt+N)'
                            , id: "CreatePlan"
                        },
                        {
                            title: '运行方案(Alt+X)'
                            , id: "RunPlan"
                        },
                        {
                            title: '停止方案(Alt+S)'
                            , id: "StopPlan"
                        },
                        {
                            title: '复制方案(Alt+C)'
                            , id: "CopyPlan"
                        },
                        {
                            title: '修改方案(Alt+U)'
                            , id: "UpdatePlan"
                        },
                        {
                            title: '删除方案(Alt+D)'
                            , id: "DelPlan"
                        }, {type: '-'}, {
                            title: '展开所有项(Ctrl+E)'
                            , id: 'ExpendProject'
                        }, {
                            title: '收起所有项'
                            , id: 'CloseProjectPlan'
                        }, {type: '-'}, {
                            title: '任务列表'
                            , id: 'joblist'
                        }]
                    , click: function (obj, othis) {
                        if (obj.id === 'ExpendProject') {
                            softevent.extendAllMenu()
                        } else if (obj.id === 'CloseProjectPlan') {
                            var rootNode = $(".rootproject").parents(".layui-nav-item.menu-li");
                            if ($(rootNode).hasClass("layui-nav-itemed")) {
                                $(rootNode).removeClass("layui-nav-itemed")
                            }

                        }
                        else if(obj.id==="RunPlan")
                        {

                              var ids=operproject.projectid+"_"+operproject.planid;
                              eval("softevent." + obj.id + "('"+ids+"')");

                        }
                        else if(obj.id==="StopPlan")
                        {

                              var ids=operproject.projectid+"_"+operproject.planid;
                              eval("softevent." + obj.id + "('"+ids+"')");

                        }
                        else {
                            eval("softevent." + obj.id + "()");
                        }

                    }
                });
            },
            /***
             * 节点事件绑定
             */
            bindNodeEvent: function (id) {
                dropdown.render({
                    elem: '#' + id//也可绑定到 document，从而重置整个右键
                    , trigger: 'contextmenu' //contextmenu
                    , isAllowSpread: false //禁止菜单组展开收缩
                    , style: 'width: 200px' //定义宽度，默认自适应
                    , id: 'documentRightMenu' //定义唯一索引
                    , data: [{
                        title: '重命名'
                        , id: 'ReName'
                    }, {
                        title: '运行'
                        , id: 'RunNode'
                    }, {
                        title: '停止'
                        , id: 'SotpNode'
                    }, {
                        type: '-'
                    }, {
                        title: '笔记'
                        , id: 'Note'
                    }
                    ]
                    , click: function (obj, othis) {
                        debugger;
                        //调用节点执行方法
                        eval("softevent." + obj.id + "(id,this)");
                    }
                });
            },
            Reflush:function (id) {
                softevent.LoadSysProjectPlanJson(operproject.projectid,operproject.planid)
            },
            joblist:function (){

                // miniAdmin.getAjax({
                //     url: "/channelsoftfile",
                //     data: {
                //         id: data.relyonfileid
                //     },
                //     posttype: "",
                //     callback: function (data) {
                //         if (data.status != 200) {
                //             if (data.msg) {
                //                 layer.msg(data.msg)
                //             }
                //             return;
                //         } else {
                //             var info = data.result;
                //             $("#SetEditInfo").val(info)
                //             $("#SetEditInfo").setTextareaCount({
                //                 width: "42px",
                //                 bgColor: "#000",
                //                 color: "#FFF",
                //                 display: "inline-block"
                //             });
                //
                //         }
                //     },
                //     loginCallback: function () {
                //     }
                // })

                var loading = layer.load(0, {shade: false, time: 2 * 1000});
                var clientHeight = (document.documentElement.clientHeight) - 60;
                laytpl($("#joblistthtml").html()).render(ranges, function (htmlcontent) {
                    var html = '<div class="layuimini-color">\n' +
                        '<div class="color-title">\n' +
                        '<span>任务列表</span>\n' +
                        '</div>\n' +
                        '<div class="color-content">\n' +
                        '\n' + htmlcontent + '\n' +
                        '</div>\n' +
                        '</div>';
                    layer.open({
                        type: 1,
                        title: false,
                        closeBtn: 1,
                        shade: 0,
                        anim: 2,
                        shadeClose: false,
                        id: 'layuiminiJobList',
                        area: ['640px', clientHeight + 'px'],
                        offset: 'rb',
                        content: html,
                        success: function (index, layero) {
                            //绑定标记删除事件
            debugger;
            table.render({
                elem: '#currentTableFilter',
                url: '/workContent?planid=' + operproject.planid,
                // url: '/channelsoftmark?softid=' + operproject.nodeid.split("_")[1] + "&planid=" + operproject.planid,
                request: {
                    pageName: 'pageindex', //页码的参数名称，默认：page
                    limitName: 'pagesize', //每页数据量的参数名，默认：limit
                },
                parseData: function (res) {  //与后端数据交互，需要传固定格式，转换为下面所示
                 //判断登录是否失效
                    if (res.status==100) {
                        miniAdmin.loginTools({
                            loginCallback: function () {
                                miniAdmin.flshPage()
                            }
                        }, "tabpage")
                        return;
                    }
                    return {
                        "code": res.status, //解析接口状态
                        "msg": res.msg, //解析提示文本
                        "count": res.count, //解析数据长度
                        "data": res.data //解析数据列表
                    };

                },
                height: 'full-200', cellMinWidth: 100,
                limits: [10, 15, 20, 25, 50, 100],
            limit: 15,
            page: true,

                cols: [
                    [
                      //表头》》》指定的对应字段
                      { field: 'jobid', title: 'ID', sort: true, width: 60, align: 'center'},
                      { field: 'projectid_id', title: '项目/方案',sort: true, align: 'center' },
                      { field: 'nodeid', title: '软件', sort: true, align: 'center' },
                      {
                        field: 'createdate', title: '创建日期', sort: true, align: 'center', templet: function (d) {
                            return layui.util.toDateString(d.createdate, 'yyyy-MM-dd HH:mm:ss');
                        }
                      },
                      { field: 'status', title: '状态', sort: true, width:90, align: 'center'},
                      // { field: 'overdate', title: '结束日期', sort: true},
                      { field: '操作',title: "操作", toolbar:'#barDemo', width:60, align: 'center'}
                    ],
                  ],
                        // document.getElementById("")
            });
            // $("#barDemo").click(function(){
            //         layer.msg("点击事件");
            //     });
            // 监听行事件
            table.on('tool(currentTableFilter)',function (obj){
                debugger
                 if (obj.event === 'taskedit')
                 {
                     $("#workConsole").html("");
                     miniAdmin.getAjax({
                    url: "/taskshow",
                    data: {

                        jobid:obj.data.jobid,
                        projectid:obj.data.projectid_id,
                        nodeid:obj.data.nodeid
                    },
                    callback: function (data) {

                        if (data.status == 200)
                        {
                            $("#workConsole").html('<span class="layui-text layui-font-red  layui-show">'+data.tasklog+'</span>');
                        }

                    },
                    loginCallback: function () {
                    }
                })
                 }
                console.log(obj.data.status)
                var status = obj.data.status
                layer.msg(status);
            })
                        },
                        end: function () {
                            $("#workConsole").html("");
                            $('.layuimini-select-bgcolor').removeClass('layui-this');
                        }
                    });
                    layer.close(loading);

                });
                
            },
            /*
              绑定思南平台快捷键处理
              */
            bindMenuEvent: function () {
                //绑定页面菜单头部事件
                $(".btntools  button ").on("click", function () {

                    var filter = $(this).attr("filter")
                    if (filter == "saveplan") {
                        softevent.SaveProjectPlanJson(1)
                    } else if (filter == "copymodel") {
                        softevent.SaveModel()
                    } else if (filter == "loadplan") {
                        softevent.LoadProjectPlanJson()
                    } else if (filter == "DelPlan") {

                  if (!(operproject && operproject.planid > 0)) {
                    layer.msg("请先选择项目方案，然后保存当前数据", {icon: 5});
                       return;
                   }
                 var id=operproject.projectid+"_"+operproject.planid;
                 layer.confirm('真的要删除项目方案吗？', function (index) {
                    layer.close(index);
                    miniAdmin.delAjax({
                        url: "/plane",
                        data: {id:operproject.planid},
                        callback: function (result) {
                            layer.msg("删除成功")
                            $("#"+id).parent().remove();
                            softevent.resetChooseProPlanInfo();//重置项目方案信息
                        },
                        loginCallback: function () {
                            layer.msg("登录成功，请重新删除")
                        }
                    })
                });


                    }  else {
                        eval('softevent.' + filter + '()');
                    }

                    //layer.msg(JSON.stringify(operproject));

                })
                //绑定左侧软件是否显示
                $(".softlist").click(function () {
                    $(this).siblings().find(".soft").toggle()
                })
                //绑定平台右键菜单处理

                /**/
                softevent.bindDocMentEvent();//初始化绑定文档右键
                dropdown.render({
                    elem: '#workConsole'//也可绑定到 document，从而重置整个右键
                    , trigger: 'contextmenu' //contextmenu
                    , isAllowSpread: false //禁止菜单组展开收缩
                    , style: 'width: 200px' //定义宽度，默认自适应
                    , id: 'documentConsoleMenu' //定义唯一索引
                    , data: [{
                        title: '清除所有'
                        , id: 'Clear'
                    }]
                    , click: function (obj, othis) {
                        if (obj.id === 'Clear') {
                            $("#workConsole").html('<span class="layui-text layui-font-gray layui-show">欢迎使用多学科司南设计平台</span>');
                            layer.msg('已清空控制台输出');
                        }
                    }
                });

                softevent.bindLeftMenuEvent();

                var keyshiftevent = {
                    "78": 'CreateProject',
                    '68': 'DelProject'
                }
                var keyaltevent = {
                    '78': "CreatePlan",
                    "88": "RunPlan",
                    "67": "CopyPlan",
                    "85": "UpdatePlan",
                    "68": "DelPlan"
                }
                var keyctrlKeyevent = {
                    '88': 'OperartePorject',
                    '81': 'SotpProject',
                    // '85': 'ReProjectName'
                };
                $(document).keydown(function (event) {


                    if (isDisEvent)
                        return;

                    var evt = event || window.event; //获取event对象

                    if (event.ctrlKey && event.keyCode == 69) {
                        if (evt.preventDefault) {
                            evt.preventDefault(); //非IE浏览器
                        } else {
                            evt.returnValue = false; //在早期的IE版本中
                        }
                        softevent.extendAllMenu()
                        event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true); //阻止事件冒泡
                    } else {

                        //layer.msg(event.keyCode);
                        if (keyshiftevent[event.keyCode] && event.shiftKey) {

                            if (evt.preventDefault) {
                                evt.preventDefault(); //非IE浏览器
                            } else {
                                evt.returnValue = false; //在早期的IE版本中
                            }
                            eval("softevent." + keyshiftevent[event.keyCode] + "()")
                            event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true); //阻止事件冒泡
                        } else if (keyctrlKeyevent[event.keyCode] && event.ctrlKey) {

                            if (evt.preventDefault) {
                                evt.preventDefault(); //非IE浏览器
                            } else {
                                evt.returnValue = false; //在早期的IE版本中
                            }
                            eval("softevent." + keyctrlKeyevent[event.keyCode] + "()");
                            event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true); //阻止事件冒泡
                        } else if (keyaltevent[event.keyCode] && event.altKey) {
                            if (evt.preventDefault) {
                                evt.preventDefault(); //非IE浏览器
                            } else {
                                evt.returnValue = false; //在早期的IE版本中
                            }
                            eval("softevent." + keyaltevent[event.keyCode] + "()");
                            event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true); //阻止事件冒泡
                        }

                    }

                });

                //处理事件监听：拖拽通道软件设计
                $(".softinfo").parent().find(".soft ").draggable({
                    helper: "clone",
                    scope: "zlg",
                });

                jsPlumb.setContainer("workContent")

                //连线监听
                jsPlumb.bind("connection", function (info) {
                        let sourceId = info.sourceId;
                        let connId = info.connection.id;

                    }
                );

                //设置右侧为拖拽存放区

                $("#workContent").droppable({
                    scope: "zlg",
                    drop: function (event, ui) {
                        var left = parseInt((ui.offset.left - $(this).offset().left) / zoomNum);
                        var top = parseInt((ui.offset.top - $(this).offset().top) / zoomNum);
                        var color = ui.draggable[0].dataset.color;
                        var softid = ui.draggable[0].dataset.id;

                        nodesindex++;
                        var id = "soft_" + softid + "_" + nodesindex;
                        var title = $(ui.helper).text();
                        softevent.AddNode(id, color, title, left, top, '单击输入', this)

                    }
                });

                //鼠标进入增加一个删除的小图标
                $("#workContent").on("mouseenter", ".node", function () {
                    $(this).append('<img src="./static/images/close2.png"  style="position:absolute;" />');
                    var widthnum = $(this).css("width").substr(0, 5);
                    if (widthnum <48) {
                        $("img").css("left", 190).css("top", -6);
                    } else {
                        $("img").css("left", 38).css("top", 3);
                    }
                });
                //鼠标离开小图标消失
                $("#workContent").on("mouseleave", ".node", function () {
                    $("img").remove();
                });
                //节点小图标的单击事件
                $("#workContent").on("click", "img", function () {

                    var obj = $(this).parent();
                    var index = layer.open({
                        title: '操作提示',
                        content: '确定要删除此节点吗?',
                        yes: function (index, layero) {
                            jsPlumb.removeAllEndpoints($(obj).attr("id"));
                            $(obj).remove();
                            layer.close(index)
                        }
                    });
                });

                //连接线中的文字双击事件
                $("#workContent").on("click", "._jsPlumb_overlay", function () {
                    var that = $(this)
                    that.removeClass('_jsPlumb_overlay')
                    var text = that.text();
                    that.html("");
                    that.append('<input type="text" id="myDropDown" value="' + text + '" />');
                    $('#myDropDown').blur(function () {
                        that.html($("#myDropDown").val());
                        that.addClass('_jsPlumb_overlay')
                    });
                    return false
                });


                //连接线的双击事件
                jsPlumb.bind("dblclick", function (conn, originalEvent) {

                    var index = layer.open({
                        title: '操作提示',
                        content: '确定删除此连线吗?',
                        yes: function (index, layero) {
                            jsPlumb.detach(conn);
                            layer.close(index)
                        }
                    });


                });


                // 当连线建立前
                jsPlumb.bind('beforeDrop', function (info) {

                    if (info.sourceId == info.targetId) {//判断当开始和终点为一个节点时，不连线。
                        return false
                    }

                    //判断是否已经关联节点，如果关联则无法继续关联
                    var hasConnection = true;
                    line = jsPlumb.getConnections();
                    for (var i = 0; i < line.length; i++) {
                        if (line[i].sourceId == info.sourceId && line[i].targetId == info.targetId) {
                            hasConnection = false;
                            break;
                        }
                    }
                    if (!hasConnection) {
                        layer.msg("已经关联", {icon: 5});
                    }

                    return hasConnection;

                })


                //对事件限制条件
                // $("#workContent").on("mouseleave", function () {
                //     $('#workContent').off("contextmenu");//解绑事件
                // })
                // $("#workContent").on("mouseover", function () {
                //     softevent.bindDocMentEvent();//绑定事件
                // })


            },
            doubleclick: function (id) {
                //参数设置
                $(id).dblclick(function () {
                    var text = $(this).text().trim();
                    var obj = $(this);

                    debugger;
                    softevent.SetParams($(obj).attr("id"));


                });
            },
            /**
             * 测试项目内容
             */
            test: function () {

                layer.alert(JSON.stringify(localStorage.getItem("saveplan")));

            },
            color16: function () {//十六进制颜色随机
                var r = Math.floor(Math.random() * 256);
                var g = Math.floor(Math.random() * 256);
                var b = Math.floor(Math.random() * 256);
                var color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
                return color;
            },

            /**
             * 运行节点
             * @constructor
             */
            RunNode: function (id,obj) {
                debugger
                softevent.SaveProjectPlanJson(0)
                miniAdmin.postAjax({
                    url: "/softnode",
                    data: {
                        projectid: operproject.projectid,
                        planid: operproject.planid,
                        nodeid: id
                    },
                    posttype: "form",
                    callback: function (data) {
                        debugger
                        if (data.status != 200) {
                            if (data.msg) {
                                layer.msg(data.msg)
                            }
                            return;
                        } else{
                            layer.msg(data.msg, {icon: 1})
                            if(data.jobid)
                           {
                              softevent.LogConsole(data.jobid);
                           }
                        }
                    },
                    loginCallback: function () {
                    }
                })
            },

            /**
             * 停止节点
             * @constructor
             */

            SotpNode: function (id,obj) {
                debugger
                miniAdmin.postAjax({
                    url: "/stopnode",
                    data: {
                        projectid: operproject.projectid,
                        planid: operproject.planid,
                        nodeid: id
                    },
                    posttype: "form",
                    callback: function (data) {
                        debugger
                        if (data.status != 200) {
                            if (data.msg) {
                                layer.msg(data.msg)
                            }
                            return;
                        } else
                            layer.msg(data.msg, {icon: 1});
                    },
                    loginCallback: function () {
                    }
                })
            },
            /**
             * 重命名
             * @param obj
             * @constructor
             */
            ReName: function (id,obj) {

                isDisEvent = true;
                debugger;
                var text = $(obj.elem).text().trim();
                var index = layer.open({
                    type: 1,
                    btn: ["确定"],
                    area: ['300px', '200px'],
                    resize: false,
                    title: '修改节点名称',
                    content: '<div style="padding:12px"><input type="text" class="layui-input" id="updatePoint" value="' + text + '" /></div>',
                    yes: function (index, layero) {

                        isDisEvent = false;
                        var SetValue = $("#updatePoint").val().trim();
                        if (SetValue.length == 0) {
                            layer.msg("名称必须填写");
                            return false;
                        } else {

                            $(obj.elem).find("span").replaceWith('<span class="softName">' + SetValue + '</span>');
                            layer.close(index)

                        }
                    }
                });
            },
            /**
             * 设置参数：输入，输出，以及标定
             * @constructor
             */
            SetParams: function (id) {

                //判断是否选择了项目方案
                if (!(operproject && operproject.planid)) {
                    layer.msg("请确认选择了方案,然后编辑");
                    return;
                }

                operproject.nodeid = id //获取nodeid

                isDisEvent = true;
                var index = layer.open({
                        type: 1,
                        shade: 0.2,
                        maxmin: false,
                        resize: false,
                        shadeClose: true,
                        area: ['100%', '100%'],
                        title: '软件通道参数设置',
                        content: $("#edithtml").html(),
                        // yes: function (index, layero) {
                        //
                        //     isDisEvent = false;
                        //     layer.close(index)
                        //
                        // },
                        // btn2: function () {
                        //     isDisEvent = false;
                        // },
                        cancel: function () {
                            //右上角关闭回调
                            isDisEvent = false;
                            //return false 开启该代码可禁止点击该按钮关闭
                        }
                    }
                );

                softevent.loadPlanCardParams(operproject.planid, operproject.nodeid.split("_")[1], operproject.nodeid);

                ranges = new Array();
                markranges = new Array();
                mark = new Array();

                //保存
                $("#dosave").click(function (e) {
                    if ($("#tabcards tr[class*='activeTr']").length == 0) {
                        layer.tips('Tip:请先(双击表格行)选择输入/输出卡后,编辑保存', '#tabcards', {
                            tips: [2, ' #139ff0']
                        })
                        return;
                    }
                    //保存通道参数文件
                    content = $("#EditInfo").val().trim();
                    if (content.length == 0) {
                        layer.tips('Tip:文件内容必须填写', '#EditInfo', {
                            tips: [1, ' #139ff0']
                        })
                        return;
                    }

                    var id = $("#tabcards tr[class*='activeTr']").attr("data-id");

                    miniAdmin.postAjax({
                        url: "/channelsoftfile",
                        data: {
                            id: id,
                            content: content
                        },
                        posttype: "",
                        callback: function (data) {
                            if (data.status != 200) {
                                if (data.msg) {
                                    layer.msg(data.msg)
                                }
                                return;
                            } else
                                layer.msg("保存成功", {icon: 1});
                        },
                        loginCallback: function () {
                        }
                    })


                })

                //添加输入输出卡文件
                $("#addInput").click(function () {
                    softevent.operateCardParams(0)
                })
                $("#addOutput").click(function () {
                    softevent.operateCardParams(1)
                })
                $("#test1").click(function () {
                    softevent.operateCardParams(2)
                })


                //事件监听操作划词:
                $("#EditInfo").on('select', function (e) {

                    textera = document.getElementById("EditInfo");
                    var start = textera.selectionStart;
                    var end = textera.selectionEnd;
                    if (ranges.length > 0) {

                        var listrange = [];
                        var length = ranges.length;
                        var isadd = true;
                        for (var i = 0; i < length; i++) {
                            try {
                                if (ranges[i].position[0] == start && ranges[i].position[1] == end) {
                                    ranges.splice(i, 1)

                                    markranges.splice(i, 1)

                                    layer.msg("划线内容已取消！")
                                    isadd = false;
                                    break;
                                } else if (start >= ranges[i].position[1] || end <= ranges[i].position[0]) {
                                    isadd = true;
                                } else {
                                    layer.msg("划线无效！")
                                    isadd = false;
                                    break;
                                }

                            } catch (e) {
                                console.log(ranges)
                            }
                        }
                        if (isadd) {
                            str = textera.value.substring(start, end);
                            markranges.push([start, end])
                            ranges.push({
                                position: [start, end],
                                length: str.length,
                                content: str
                            })
                        }

                    } else {
                        markranges.push([start, end])
                        str = textera.value.substring(start, end);
                        ranges.push({
                            position: [start, end],
                            length: str.length,
                            content: str
                        })
                    }
                    if (ranges.length > 0) {
                        try {
                            $('#EditInfo').highlightTextarea('destroy');
                            $('#EditInfo').highlightTextarea({
                                // id: 'demo5-wrap',
                                ranges: [{
                                    color: '#FFFF00',
                                    ranges: markranges
                                }]
                            });

                        } catch (e) {
                        }
                    } else {
                        $('#EditInfo').highlightTextarea('destroy');
                    }

                })
                $("#SetEditInfo").on('select', function (e) {

                    debugger;
                    textera = document.getElementById("SetEditInfo");
                    var start = textera.selectionStart;
                    var end = textera.selectionEnd;
                    if (ranges.length > 0) {

                        var listrange = [];
                        var length = ranges.length;
                        var isadd = true;
                        for (var i = 0; i < length; i++) {
                            try {
                                if (ranges[i].position[0] == start && ranges[i].position[1] == end) {
                                    ranges.splice(i, 1)

                                    markranges.splice(i, 1)

                                    layer.msg("划线内容已取消！")
                                    isadd = false;
                                    break;
                                } else if (start >= ranges[i].position[1] || end <= ranges[i].position[0]) {
                                    isadd = true;
                                } else {
                                    layer.msg("划线无效！")
                                    isadd = false;
                                    break;
                                }

                            } catch (e) {
                                console.log(ranges)
                            }
                        }
                        if (isadd) {
                            str = textera.value.substring(start, end);
                            markranges.push([start, end])
                            ranges.push({
                                position: [start, end],
                                length: str.length,
                                content: str
                            })
                        }

                    } else {
                        markranges.push([start, end])
                        str = textera.value.substring(start, end);
                        ranges.push({
                            position: [start, end],
                            length: str.length,
                            content: str
                        })
                    }
                    if (ranges.length > 0) {
                        try {
                            // $('#SetEditInfo').highlightTextarea('destroy');
                            // $('#SetEditInfo').highlightTextarea({
                            //     // id: 'demo5-wrap',
                            //     ranges: [{
                            //         color: '#FFFF00',
                            //         ranges: markranges
                            //     }]
                            // });

                        } catch (e) {
                        }
                    } else {
                        // $('#SetEditInfo').highlightTextarea('destroy');
                    }

                })

                element.on('tab(tabscards)', function () {

                    softevent.ClearCurrentMarklist();//重置变量值


                    var id = this.getAttribute('lay-id');
                    if (id == "viewparams") {
                        //判断是否选中行
                        // var relyonfileid = $("#tabcards .activeTr").attr("data-id");
                        // if ($("#tabcards .activeTr").length == 0) {
                        //     layer.msg("请先选择要编辑的输入/输出卡片", {icon: 5});
                        //     relyonfileid = 0
                        // }


                        var tables = table.render({
                            elem: '#currentTableId',
                            url: '/channelsoftmark?softid=' + operproject.nodeid.split("_")[1] + "&planid=" + operproject.planid,
                            request: {
                                pageName: 'pageindex', //页码的参数名称，默认：page
                                limitName: 'pagesize' //每页数据量的参数名，默认：limit
                            },
                            autoSort: false,
                            parseData: function (res) { //res 即为原始返回的数据
                                //判断登录是否失效
                                if (res.status == 100) {
                                    miniAdmin.loginTools({
                                        loginCallback: function () {

                                        }
                                    }, "tabpage")
                                    return;
                                }
                                return {
                                    "code": res.status, //解析接口状态
                                    "msg": res.msg, //解析提示文本
                                    "count": res.count, //解析数据长度
                                    "data": res.data //解析数据列表
                                };
                            },

                            defaultToolbar: ['filter', 'exports', 'print', {
                                title: '提示',
                                layEvent: 'LAYTABLE_TIPS',
                                icon: 'layui-icon-tips'
                            }],
                            height: 'full-200', cellMinWidth: 80,
                            cols: [[
                                {
                                    field: 'variablevalue', title: '变量值', templet: function (d) {
                                        return '<input class="layui-input" type="text" value="' + d.variablevalue + '" />'
                                    }, sort: true
                                },
                                {field: 'variablename', title: '变量名称', sort: true},
                                {field: 'filename', title: '文件名称', sort: true},
                                {
                                    field: 'content', title: '修改位置', templet: function (d) {
                                        if (d.content && d.content.length > 0) {
                                            var job = JSON.parse(d.content);
                                            var html = "<p>";
                                            for (var i = 0; i < job.length; i++) {

                                                html += "<span>位置：" + JSON.stringify(job[i].position) + ";值:" + job[i].content + "</span></br>"

                                            }
                                            html += "</p>"
                                            return html

                                        } else {

                                            return "";
                                        }


                                    }
                                },
                                {title: '操作', minWidth: 150, toolbar: '#currentTableBar', align: "center"}
                            ]],
                            limits: [10, 15, 20, 25, 50, 100],
                            limit: 15,
                            page: true,
                            done: function (res, curr, count) {

                                $("#tablelistparams tbody input[type='text']").on("change", function (e) {
                                    var rows = layui.table.cache["currentTableId"][$(this).parents("tr").index()];
                                    if ($(this).val().length > 0) {

                                        softevent.upValiabelInfo(rows.variableid, rows.relyonfileid, rows.variablename, $(this).val().trim(), rows.content, 0, function () {
                                            //加载列表
                                            layer.msg("操作成功", {icon: 1});
                                            table.reload('currentTableId');

                                        })

                                    } else {
                                        layer.msg("修改值不能为空");
                                    }


                                });

                                $("#dosearchvaliable").click(function () {

                                    debugger;
                                    var valinfo = $("#searchValue").val()
                                    table.reload('currentTableId', {
                                        page: {
                                            pageindex: 1
                                        }
                                        , where: {
                                            searchParams:JSON.stringify({"variablename":valinfo})
                                        }
                                    }, 'data');

                                })

                            }
                        });


                        table.resize('#currentTableId');
                        // $('#SetEditInfo').highlightTextarea('destroy');
                        // $("#SetEditInfo").setTextareaCount({
                        //     width: "42px",
                        //     bgColor: "#000",
                        //     color: "#FFF",
                        //     display: "inline-block"
                        // });


                        var currentid=0;

                        dropdown.render({
                            elem: '#SetEditInfo'//也可绑定到 document，从而重置整个右键
                            , trigger: 'contextmenu' //contextmenu
                            , isAllowSpread: false //禁止菜单组展开收缩
                            , style: 'width: 200px' //定义宽度，默认自适应
                            , id: 'documentRightMenu' //定义唯一索引
                            , data: [{
                                title: '标定'
                                , id: 'MarkPoint'
                            }, {
                                title: '标定到变量'
                                , id: 'MarkToValiablePoint'
                            },
                                {
                                    title: '清空标记'
                                    , id: 'ClearMarkPoint'
                                },
                                {
                                    title: '标记管理'
                                    , id: 'MarkPointMange'
                                }
                            ]
                            , click: function (obj, othis) {

                                if (obj.id == "MarkPoint") {
                                    var index = layer.open({
                                        type: 1,
                                        btn: ["确定"],
                                        area: ['300px', '200px'],
                                        resize: false,
                                        title: '输入变量名称',
                                        content: '<div style="padding:12px"><input type="text" class="layui-input" id="Params" value="" /></div>',
                                        yes: function (index, layero) {
                                            var SetValue = $("#Params").val().trim();
                                            if (SetValue.length == 0) {
                                                layer.msg("必须填写");
                                                return false;
                                            } else {
                                                var values = [];
                                                const replaceStr2 = (str, index, char, end) => {
                                                    return str.substring(0, index) + char + str.substring(end);
                                                }
                                                const replaceTempStr = (length) => {
                                                    str = "⭐";
                                                    var temp = "";
                                                    for (var i = 0; i < length; i++) {
                                                        temp += str;
                                                    }
                                                    return temp;
                                                }
                                                var contenttempl = textera.value;
                                                miniAdmin.postAjax({
                                                    url: "/channelsoftmark",
                                                    data: {
                                                        id: 0,
                                                        relyonfileid: currentid,
                                                        variablename: SetValue,
                                                        variablevalue: 0,
                                                        content: JSON.stringify(ranges)
                                                    },
                                                    posttype: "",
                                                    callback: function (data) {
                                                        if (data.status != 200) {
                                                            if (data.msg) {
                                                                layer.msg(data.msg)
                                                            }
                                                            return;
                                                        } else
                                                            layer.close(index)
                                                        //加载列表
                                                        layer.msg("操作成功", {icon: 1});
                                                        // $('#SetEditInfo').highlightTextarea('destroy');
                                                        ranges = [];
                                                        markranges = [];

                                                        table.reload('currentTableId');
                                                    },
                                                    loginCallback: function () {
                                                    }
                                                })
                                                layer.close(index)

                                            }
                                        }
                                    });
                                } else if (obj.id == 'MarkToValiablePoint') {


                                    softevent.MarkToValiablePoint(currentid,function (index) {
                                        //加载列表
                                        layer.msg("操作成功", {icon: 1});
                                        // $('#SetEditInfo').highlightTextarea('destroy');
                                        ranges = [];
                                        markranges = [];
                                        table.reload('currentTableId');
                                        layer.close(index)
                                    })


                                } else if (obj.id == "ClearMarkPoint") {
                                    softevent.ClearCurrentMarklist();
                                } else if (obj.id == "MarkPointMange") {
                                    var loading = layer.load(0, {shade: false, time: 2 * 1000});
                                    var clientHeight = (document.documentElement.clientHeight) - 60;
                                    laytpl($("#softMarklistthtml").html()).render(ranges, function (htmlcontent) {
                                        var html = '<div class="layuimini-color">\n' +
                                            '<div class="color-title">\n' +
                                            '<span>标记列表</span>\n' +
                                            '</div>\n' +
                                            '<div class="color-content">\n' +
                                            '\n' + htmlcontent + '\n' +
                                            '</div>\n' +
                                            '</div>';
                                        layer.open({
                                            type: 1,
                                            title: false,
                                            closeBtn: 0,
                                            shade: 0.2,
                                            anim: 2,
                                            shadeClose: true,
                                            id: 'layuiminiMarkPoint',
                                            area: ['340px', clientHeight + 'px'],
                                            offset: 'rb',
                                            content: html,
                                            success: function (index, layero) {
                                                //绑定标记删除事件
                                                softevent.bindeventdel2();
                                            },
                                            end: function () {
                                                $('.layuimini-select-bgcolor').removeClass('layui-this');
                                            }
                                        });
                                        layer.close(loading);

                                    });

                                }
                            }
                        });

                        //触发排序事件
                        table.on('sort(currentTableFilter)', function (obj) {
                            //注：sort 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
                            console.log(obj.field); //当前排序的字段名
                            console.log(obj.type); //当前排序类型：desc（降序）、asc（升序）、null（空对象，默认排序）
                            console.log(this); //当前排序的 th 对象
                            //尽管我们的 table 自带排序功能，但并没有请求服务端。
                            //有些时候，你可能需要根据当前排序的字段，重新向服务端发送请求，从而实现服务端排序，如：
                            table.reload('currentTableId', {
                                initSort: obj //记录初始排序，如果不设的话，将无法标记表头的排序状态。
                                , where: { //请求参数（注意：这里面的参数可任意定义，并非下面固定的格式）
                                    field: obj.field //排序字段
                                    , order: obj.type //排序方式
                                }
                            });
                            //layer.msg('服务端排序。order by '+ obj.field + ' ' + obj.type);
                        });


                        table.on('tool(currentTableFilter)', function (obj) {
                            var data = obj.data;
                            if (obj.event === 'edit') {

                                currentid=data.relyonfileid;
                                miniAdmin.getAjax({
                                    url: "/channelsoftfile",
                                    data: {
                                        id: data.relyonfileid
                                    },
                                    posttype: "",
                                    callback: function (data) {
                                        if (data.status != 200) {
                                            if (data.msg) {
                                                layer.msg(data.msg)
                                            }
                                            return;
                                        } else {
                                            var info = data.result;
                                            $("#SetEditInfo").val(info)
                                            // $("#SetEditInfo").setTextareaCount({
                                            //     width: "42px",
                                            //     bgColor: "#000",
                                            //     color: "#FFF",
                                            //     display: "inline-block"
                                            // });

                                        }
                                    },
                                    loginCallback: function () {
                                    }
                                })

                                manageranges = JSON.parse(data.content);
                                var loading = layer.load(0, {shade: false, time: 2 * 1000});
                                var clientHeight = (document.documentElement.clientHeight) - 60;
                                laytpl($("#softMarklistthtml").html()).render(manageranges, function (htmlcontent) {
                                    var html = '<div class="layuimini-color">\n' +
                                        '<div class="color-title">\n' +
                                        '<span>标记列表</span>\n' +
                                        '</div>\n' +
                                        '<div class="color-content">\n' +
                                        '\n' + htmlcontent + '\n' +
                                        '</div>\n' +
                                        '</div>';
                                    layer.open({
                                        type: 1,
                                        title: false,
                                        closeBtn: 0,
                                        shade: 0.2,
                                        anim: 2,
                                        shadeClose: true,
                                        id: 'layuiminiMarkPoint',
                                        area: ['340px', clientHeight + 'px'],
                                        offset: 'rb',
                                        content: html,
                                        success: function (index, layero) {
                                            //绑定标记删除事件

                                            softevent.bindeventdel3(manageranges, data);
                                            //layer.close(index)
                                        },
                                        end: function () {
                                            $('.layuimini-select-bgcolor').removeClass('layui-this');
                                        }
                                    });
                                    layer.close(loading);

                                });


                                return false;
                            } else if (obj.event === 'delete') {
                                layer.confirm('真的删除行么', function (index) {
                                    layer.close(index);
                                    miniAdmin.delAjax({
                                        url: "/channelsoftmark",
                                        data: {id: data.variableid},
                                        callback: function (result) {
                                            obj.del();
                                        },
                                        loginCallback: function () {

                                            layer.alert("登录成功，请重新删除")

                                        }
                                    })
                                });
                            }
                        });

                    }

                });

                //行插件
                $("#EditInfo").setTextareaCount({
                    width: "42px",
                    bgColor: "#000",
                    color: "#FFF",
                    display: "inline-block"
                });

                dropdown.render({
                    elem: '#EditInfo'//也可绑定到 document，从而重置整个右键
                    , trigger: 'contextmenu' //contextmenu
                    , isAllowSpread: false //禁止菜单组展开收缩
                    , style: 'width: 200px' //定义宽度，默认自适应
                    , id: 'documentRightMenu' //定义唯一索引
                    , data: [{
                        title: '标定'
                        , id: 'MarkPoint'
                    }, {
                        title: '标定到变量'
                        , id: 'MarkToValiablePoint'
                    },
                        {
                            title: '清空标记'
                            , id: 'ClearMarkPoint'
                        },
                        {
                            title: '标记管理'
                            , id: 'MarkPointMange'
                        }
                    ]
                    , click: function (obj, othis) {

                        if (obj.id == "MarkPoint") {
                            var index = layer.open({
                                type: 1,
                                btn: ["确定"],
                                area: ['300px', '200px'],
                                resize: false,
                                title: '输入变量名称',
                                content: '<div style="padding:12px"><input type="text" class="layui-input" id="Params" value="" /></div>',
                                yes: function (index, layero) {
                                    var SetValue = $("#Params").val().trim();
                                    if (SetValue.length == 0) {
                                        layer.msg("必须填写");
                                        return false;
                                    } else {
                                        var values = [];
                                        const replaceStr2 = (str, index, char, end) => {
                                            return str.substring(0, index) + char + str.substring(end);
                                        }
                                        const replaceTempStr = (length) => {
                                            str = "⭐";
                                            var temp = "";
                                            for (var i = 0; i < length; i++) {
                                                temp += str;
                                            }
                                            return temp;
                                        }
                                        var contenttempl = textera.value;
                                        var id = $("#tabcards .activeTr").attr("data-id");
                                        miniAdmin.postAjax({
                                            url: "/channelsoftmark",
                                            data: {
                                                id: 0,
                                                relyonfileid: id,
                                                variablename: SetValue,
                                                variablevalue: 0,
                                                content: JSON.stringify(ranges)
                                            },
                                            posttype: "",
                                            callback: function (data) {
                                                if (data.status != 200) {
                                                    if (data.msg) {
                                                        layer.msg(data.msg)
                                                    }
                                                    return;
                                                } else
                                                    layer.close(index)
                                                //加载列表
                                                layer.msg("操作成功", {icon: 1});
                                                $('#EditInfo').highlightTextarea('destroy');
                                                ranges = [];
                                                markranges = [];
                                            },
                                            loginCallback: function () {
                                            }
                                        })


                                        // layer.alert(JSON.stringify(mark));

                                        // var replaceStr="";
                                        // for (var i = 0; i < ranges.length; i++) {
                                        //     var value = contenttempl.substring(ranges[i][0], ranges[i][1]);
                                        //     var tempstr=replaceTempStr(value.length)
                                        //     contenttempl=replaceStr2(contenttempl,ranges[i][0],tempstr,ranges[i][1])
                                        // }
                                        // replaceStr=contenttempl.replace(/⭐+/g,'【'+SetValue+'】')
                                        // textera.value=replaceStr;


                                        layer.close(index)

                                    }
                                }
                            });
                        } else if (obj.id == "MarkToValiablePoint") {
                            var id = $("#tabcards .activeTr").attr("data-id");
                            softevent.MarkToValiablePoint(id,function (index) {
                                //加载列表
                                layer.msg("操作成功", {icon: 1});
                                $('#EditInfo').highlightTextarea('destroy');
                                ranges = [];
                                markranges = [];
                                layer.close(index)
                            })
                        } else if (obj.id == "ClearMarkPoint") {
                            softevent.ClearCurrentMarklist();
                        } else if (obj.id == "MarkPointMange") {
                            var loading = layer.load(0, {shade: false, time: 2 * 1000});
                            var clientHeight = (document.documentElement.clientHeight) - 60;
                            laytpl($("#softMarklistthtml").html()).render(ranges, function (htmlcontent) {
                                var html = '<div class="layuimini-color">\n' +
                                    '<div class="color-title">\n' +
                                    '<span>标记列表</span>\n' +
                                    '</div>\n' +
                                    '<div class="color-content">\n' +
                                    '\n' + htmlcontent + '\n' +
                                    '</div>\n' +
                                    '</div>';
                                layer.open({
                                    type: 1,
                                    title: false,
                                    closeBtn: 0,
                                    shade: 0.2,
                                    anim: 2,
                                    shadeClose: true,
                                    id: 'layuiminiMarkPoint',
                                    area: ['340px', clientHeight + 'px'],
                                    offset: 'rb',
                                    content: html,
                                    success: function (index, layero) {
                                        //绑定标记删除事件

                                        softevent.bindeventdel();

                                    },
                                    end: function () {
                                        $('.layuimini-select-bgcolor').removeClass('layui-this');
                                    }
                                });
                                layer.close(loading);

                            });

                        }
                    }
                });
            },
            MarkToValiablePoint: function (id,callback) {


                //读取最新变量列表名称
                miniAdmin.getAjax({
                    url: "/channelmarkvaliable",
                    data: {
                        relyonfileid: id,
                    },
                    posttype: "",
                    callback: function (data) {
                        if (data.status != 200) {
                            if (data.msg) {
                                layer.msg(data.msg)
                            }
                            return;
                        } else {
                            var data = data.result;
                            laytpl($("#cardValiableselecthtml").html()).render(data, function (html) {

                                var index = layer.open({
                                    type: 1,
                                    btn: ["确定"],
                                    area: ['300px', '200px'],
                                    resize: false,
                                    title: '选择变量名称',
                                    content: html,
                                    yes: function (index, layero) {
                                        var valiable = $("#selectValiable").val()
                                        if (valiable == "") {
                                            layer.msg("必须选择");
                                            return false;
                                        } else {

                                            valiable = JSON.parse(valiable);
                                            valiableid = valiable.variableid;
                                            var Content = JSON.parse(valiable.content);
                                            for (var i = 0; i < ranges.length; i++) {
                                                var hasexist = false;
                                                for (var j = 0; j < Content.length; j++) {
                                                    if (Content[j].position[0] == ranges[i].position[0] && Content[j].position[1] == ranges[i].position[1]) {
                                                        hasexist = true;
                                                        break;
                                                    }
                                                }
                                                if (!hasexist) {
                                                    Content.push(ranges[i]);
                                                }
                                            }
                                            softevent.upValiabelInfo(valiableid, id, valiable.variablename, valiable.variablevalue, JSON.stringify(Content), index, callback)

                                        }
                                    }
                                });

                            });
                        }
                    },
                    loginCallback: function () {
                    }
                })

            },
            upValiabelInfo: function (valiableid, id, variablename, variablevalue, content, index, callback) {

                miniAdmin.postAjax({
                    url: "/channelsoftmark",
                    data: {
                        id: valiableid,
                        relyonfileid: id,
                        variablename: variablename,
                        variablevalue: variablevalue,
                        content: content
                    },
                    posttype: "",
                    callback: function (data) {
                        if (data.status != 200) {
                            if (data.msg) {
                                layer.msg(data.msg)
                            }
                            return;
                        } else {
                            callback(index);

                        }

                    },
                    loginCallback: function () {
                    }
                })
            },

            /**
             * 显示标定
             * @constructor
             */
            DisplayPosition: function () {

            },
            /**
             * 此算法用于模板替换值，演示用于查看替换后的效果
             * @constructor
             */
            SoftMtlSetValue: function () {

                textera = document.getElementById("EditInfo");
                var char = textera.value;

                //第一步生成字符数组
                var arraychar = [];
                for (var i = 0; i < char.length; i++) {
                    arraychar.push(char[i]);
                }
                //第二步 根据变量做替换
                for (var i = 0; i < mark.length; i++) {

                    var name = Math.random();
                    for (j = 0; j < mark[i].range.length; j++) {
                        var p = mark[i].range[j].position;
                        var length = mark[i].range[j].length;
                        for (pindex = p[0]; pindex < p[1]; pindex++) {
                            arraychar[pindex] = '';
                        }
                        arraychar[p[0]] = '替换变量' + name
                        //把字符所在索引到结束索引字符替换成空，然后起始索引赋值 ，暂时随机数
                    }
                }
                layer.alert(arraychar.join(''));
            },
            bindeventdel3: function (manageranges, data) {
                $("#marklist button").on("click", function () {
                    var id = $(this).attr("data-index");
                    manageranges.splice(id, 1)
                    //修改当前内容
                    softevent.upValiabelInfo(data.variableid, data.relyonfileid, data.variablename, data.variablevalue, JSON.stringify(manageranges), 0, function () {
                        //加载列表
                        layer.msg("操作成功", {icon: 1});
                        table.reload('currentTableId');

                        laytpl($("#softMarklistthtml").html()).render(manageranges, function (htmlcontent) {
                            $("#marklist").replaceWith(htmlcontent)
                            softevent.bindeventdel3(manageranges, data);
                        })
                    })
                });
            },
            bindeventdel2: function () {
                $("#marklist button").on("click", function () {
                    var id = $(this).attr("data-index");
                    ranges.splice(id, 1)
                    markranges.splice(id, 1)
                    // $('#SetEditInfo').highlightTextarea('destroy');
                    // $('#SetEditInfo').highlightTextarea({
                    //     ranges: [{
                    //         color: '#FFFF00',
                    //         ranges: markranges
                    //     }]
                    // });
                    laytpl($("#softMarklistthtml").html()).render(ranges, function (htmlcontent) {
                        $("#marklist").replaceWith(htmlcontent)
                        softevent.bindeventdel2();
                    })

                });
            },
            bindeventdel: function () {
                $("#marklist button").on("click", function () {
                    var id = $(this).attr("data-index");
                    ranges.splice(id, 1)
                    markranges.splice(id, 1)
                    $('#EditInfo').highlightTextarea('destroy');
                    $('#EditInfo').highlightTextarea({
                        ranges: [{
                            color: '#FFFF00',
                            ranges: markranges
                        }]
                    });
                    laytpl($("#softMarklistthtml").html()).render(ranges, function (htmlcontent) {
                        $("#marklist").replaceWith(htmlcontent)
                        softevent.bindeventdel();
                    })

                });
            },
            /***
             * 删除卡片文件id
             * @param id
             */
            doDelCardFile: function (id, obj) {
                layer.confirm('真的要删除吗？', function (index) {
                    layer.close(index);
                    miniAdmin.delAjax({
                        url: "/channelfile",
                        data: {id: id},
                        callback: function (result) {
                            layer.msg("删除成功")
                            $(obj).parents("tr").remove();

                        },
                        loginCallback: function () {
                            layer.msg("登录成功，请重新删除")
                        }
                    })
                });

            },
            loadPlanCardParams: function (planid, softid, nodeid) {
                miniAdmin.getAjax({
                    url: "/channelfile",
                    data: {
                        softid: softid,
                        planid: planid,
                        nodeid: nodeid
                    },
                    posttype: "",
                    callback: function (data) {
                        if (data.status != 200) {
                            if (data.msg) {
                                layer.msg(data.msg)
                            }
                            return;
                        } else {
                            var data = data;
                            laytpl($("#softfilelistthtml").html()).render(data.list, function (html) {
                                $("#tabcards tbody").html(html);

                                //绑定卡片 按钮事件
                                $("#tabcards  button ").on("click", function () {

                                    var filter = $(this).attr("filter");
                                    var id = $(this).attr("data-id");
                                    if (filter == "delSoftfilebtn") {
                                        softevent.doDelCardFile(id, this)
                                    } else if (filter == "editSoftfilebtn") {
                                        var text = $(this).attr("data-text");
                                        var type = $(this).attr("data-type");
                                        softevent.operateCardParams(type, id, text)
                                    }
                                })

                                //表格双击事件绑定
                                $("#tabcards tbody  tr").dblclick(function () {

                                    $("#tabcards .activeTr").removeClass("activeTr");
                                    $(this).addClass("activeTr");
                                    //清空销毁标记内容
                                    softevent.ClearCurrentMarklist();

                                    var id = $(this).attr("data-id")
                                    //加载卡片参数内容：
                                    miniAdmin.getAjax({
                                        url: "/channelsoftfile",
                                        data: {
                                            id: id
                                        },
                                        posttype: "",
                                        callback: function (data) {
                                            if (data.status != 200) {
                                                if (data.msg) {
                                                    layer.msg(data.msg)
                                                }
                                                return;
                                            } else {
                                                debugger
                                                if (data.type == "picture"){
                                                    var pic_path = data.result;
                                                    var pic_json = {
                                                          "title": "123", //相册标题
                                                          "id": 123, //相册id
                                                          "start": 0, //初始显示的图片序号，默认0
                                                          "data": [   //相册包含的图片，数组格式
                                                            {
                                                              "alt": "图片名",
                                                              "pid": 666, //图片id
                                                              "src": pic_path , //原图地址
                                                              "thumb": "" //缩略图地址
                                                            }
                                                          ]
                                                        };
                                                    layer.photos({
                                                            photos: pic_json
                                                            ,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
                                                          });
                                                }else if(data.type == "word") {
                                                    // $("#EditInfo").val()
                                                    layer.open({
                                                        title: '文件下载',
                                                        content: '<span class="layui-text layui-font-red  layui-show">' + data.result + '</span>'
                                                    });
                                                }
                                                else if(data.type == "load") {
                                                    // $("#EditInfo").val()
                                                    layer.open({
                                                        title: '文件下载',
                                                        content: '<span class="layui-text layui-font-red  layui-show">' + data.result + '</span>'
                                                    });
                                                }
                                            else {
                                                    var info = data.result;
                                                    var tt = data.filename;
                                                    $("#EditInfo").val(info);
                                                    $("#cardname").text(tt);
                                                    // $("#EditInfo").setTextareaCount({
                                                    //     width: "42px",
                                                    //     bgColor: "#000",
                                                    //     color: "#FFF",
                                                    //     display: "inline-block"
                                                    // });
                                                }
                                            }
                                        },
                                        loginCallback: function () {
                                        }
                                    })


                                });

                            });
                        }
                    },
                    loginCallback: function () {
                    }
                })

            },
            ClearCurrentMarklist: function () {
                // $('#SetEditInfo').highlightTextarea('destroy');
                // $('#EditInfo').highlightTextarea('destroy');
                ranges = new Array();
                markranges = new Array();
                mark = new Array();

            },
            /**
             * 输出，输入卡 添加
             * @param type
             * @param id
             * @text ""
             */
            operateCardParams: function (type, id = 0, text = "") {

                isDisEvent = true;//编辑的时候禁用掉快捷键

                typetile = "输出卡编辑";
                if (type == 0) {
                    typetile = "输入卡编辑"
                }
                if (type==2){
                    layer.open({
                    type: 1,
                    btn: ["确定"],
                    area: ['1000px', '500px'],
                    resize: false,
                    title: "上传文件",
                    anim: 1,
                    content: '<div class="layui-upload">\
                                      <button type="button" class="layui-btn layui-btn-normal" id="testList">选择多文件</button> \
                                      <div class="layui-upload-list" style="max-width: 1000px;">\
                                        <table class="layui-table">\
                                          <colgroup>\
                                            <col>\
                                            <col width="150">\
                                            <col width="260">\
                                            <col width="150">\
                                          </colgroup>\
                                          <thead>\
                                            <tr><th>文件名</th>\
                                            <th>大小</th>\
                                            <th>上传进度</th>\
                                            <th>操作</th>\
                                          </tr></thead>\
                                          <tbody id="demoList"></tbody>\
                                        </table>\
                                      </div>\
                                      <button type="button" class="layui-btn" id="testListAction">开始上传</button>\
                                    </div> ',


                });

                    //演示多文件列表
                    debugger
                    var uploaderr = [];
                  var uploadListIns = upload.render({
                    elem: '#testList'
                    ,elemList: $('#demoList') //列表元素对象
                    ,url: '/upload' //此处用的是第三方的 http 请求演示，实际使用时改成您自己的上传接口即可。
                    ,accept: 'file'
                    ,data:{
                                    id: id,
                                    filetype: 0,
                                    nodeid: operproject.nodeid,
                                    projectid: operproject.projectid,
                                    planid: operproject.planid,
                                    softid: operproject.nodeid.split("_")[1]
                                }
                    ,multiple: true
                    ,number: 3
                    ,auto: false
                    ,bindAction: '#testListAction'
                    ,choose: function(obj){
                      var that = this;
                      var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                      //读取本地文件
                      obj.preview(function(index, file, result){
                        var tr = $(['<tr id="upload-'+ index +'">'
                          ,'<td>'+ file.name +'</td>'
                          ,'<td>'+ (file.size/1014).toFixed(1) +'kb</td>'
                          ,'<td><div class="layui-progress" lay-filter="progress-demo-'+ index +'"><div class="layui-progress-bar" lay-percent=""></div></div></td>'
                          ,'<td>'
                            ,'<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                            ,'<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
                          ,'</td>'
                        ,'</tr>'].join(''));

                        //单个重传
                        tr.find('.demo-reload').on('click', function(){
                          obj.upload(index, file);
                        });

                        //删除
                        tr.find('.demo-delete').on('click', function(){
                          delete files[index]; //删除对应的文件
                          tr.remove();
                          uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                        });

                        that.elemList.append(tr);
                        element.render('progress'); //渲染新加的进度条组件
                      });
                    }

                    ,done: function(res, index, upload){ //成功的回调
                      debugger
                          var that = this;
                      if(res.status == 200){ //上传成功
                        var tr = that.elemList.find('#upload-'+ index)
                        ,tds = tr.children();
                        tds.eq(3).html(''); //清空操作
                        delete this.files[index]; //删除文件队列已经上传成功的文件
                        return;
                      }

                      uploaderr.push({"filename": res.filename, "msg": res.msg});
                      this.error(index, upload);
                    }
                    ,allDone: function(obj){ //多文件上传完毕后的状态回调
                          debugger
                          softevent.loadPlanCardParams(operproject.planid, operproject.nodeid.split("_")[1], operproject.nodeid);
                          if (uploaderr.length==0){
                              layer.msg("上传成功");
                          }else{
                              var allerr = "";
                              for(var i=0;i<uploaderr.length;i++){
                                  allerr += "文件"+uploaderr[i].filename+"，错误信息："+uploaderr[i].msg+"<br/>";
                              }
                              layer.msg(allerr);
                              uploaderr = [];
                          }

                    }
                    ,error: function(index, upload){ //错误回调
                      var that = this;
                      var tr = that.elemList.find('#upload-'+ index)
                      ,tds = tr.children();
                      tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
                    }
                    ,progress: function(n, elem, e, index){ //注意：index 参数为 layui 2.6.6 新增
                      element.progress('progress-demo-'+ index, n + '%'); //执行进度条。n 即为返回的进度百分比
                    }
                  });

                }else{
                layer.open({
                    type: 1,
                    btn: ["确定"],
                    area: ['300px', '200px'],
                    resize: false,
                    title: typetile,
                    anim: 1,
                    content: '<div style="padding:12px"><input type="text" maxlength="50"  class="layui-input" placeholder="文件名称最多50字符" id="CardParams" value="' + text + '" /></div>',
                    yes: function (index, layero) {
                        isDisEvent = false;
                        var SetValue = $("#CardParams").val().trim();
                        if (SetValue.length == 0) {
                            layer.msg("名称必须填写");
                        } else {
                            //ajax 添加文件
                            miniAdmin.postAjax({
                                url: "/channelfile",
                                data: {
                                    id: id,
                                    filename: SetValue,
                                    filetype: type,
                                    nodeid: operproject.nodeid,
                                    pojectid: operproject.projectid,
                                    planid: operproject.planid,
                                    softid: operproject.nodeid.split("_")[1]
                                },
                                posttype: "",
                                callback: function (data) {
                                    if (data.status != 200) {
                                        if (data.msg) {
                                            layer.msg(data.msg)
                                        }
                                        return;
                                    } else
                                        layer.close(index)

                                    softevent.loadPlanCardParams(operproject.planid, operproject.nodeid.split("_")[1], operproject.nodeid);

                                    //加载列表

                                    layer.msg("操作成功", {icon: 1});

                                },
                                loginCallback: function () {
                                }
                            })


                        }

                    }
                });}
            },
            /**
             * 重置视图尺寸
             */
            resetview: function () {
                zoomNum = 1;
                jsPlumb.setZoom(zoomNum);
                jsPlumb.repaintEverything();
                $(".scaleinfo .datainfo").text(zoomNum)
                $("#workContent").attr("style", "width:" + boxwidth + "px;height:" + boxheight + "px");
            }
            ,
            /***
             * 重置项目选中信息
             */
            resetChooseProInfo() {
                var icon = '<i class="layui-icon layui-icon-location"></i> ';
                operproject = {}//清空项目方案信息;
                $(".projectTitle h1").html(icon)

                //继续重置视图
                softevent.resetview();
                softevent.resetcanvas();

                element.render('nav')
            }
            ,
            resetChooseProPlanInfo() {
                var icon = '<i class="layui-icon layui-icon-location"></i> ';
                operproject.planid = 0;//清空项目方案信息;
                operproject.planname = "";
                $(".projectTitle h1").html(icon + operproject.projectname)

                //继续重置视图
                softevent.resetview();
                softevent.resetcanvas();

                element.render('nav')

            }
            ,
            resetcanvas: function () {

                var obj = $("#workContent")
                jsPlumb.deleteEveryEndpoint();
                $(obj).find(".nodes").html("");
                $(obj).find("._jsPlumb_endpoint").remove();
                $(obj).find("._jsPlumb_overlay").remove();
                $(obj).find("._jsPlumb_connector").remove();

                return obj;
            }
            ,
            /**
             * 创建项目
             * @constructor
             */
            CreateProject: function () {
                miniAdmin.showConfirm({
                    url: '/preproject',
                    data: {
                        id: 0,
                        callfunc: "CallEditProject"
                    },
                    title: "添加项目",

                    style: {
                        maxmin: false,
                        area: ['40%', '40%']
                    }
                });
            }
            ,
            /**
             * 编辑项目
             * @constructor
             */
            EditProject: function (id) {

                if (!(operproject && operproject.projectid) && id.length == 0) {
                    layer.msg("请确认选择了项目");
                    return;
                } else {
                    if (id == 0) {
                        id = operproject.projectid;
                    }
                }
                miniAdmin.showConfirm({
                    url: '/projectedit',
                    data: {
                        id: id,
                        callfunc: "CallEditProject"
                    },
                    title: "编辑项目",

                    style: {
                        maxmin: false,
                        area: ['50%', '60%']
                    }
                });
            }
            ,
            /**
             * 运行项目
             * @constructor
             */
            OperartePorject: function () {
                if (operproject && operproject.projectid > 0) {

                    layer.msg("运行项目");

                } else {

                    layer.msg("请先选择项目");
                }

            }
            ,
            /**
             * 停止运行项目
             * @constructor
             */
            SotpProject: function () {
                layer.msg("停止项目");
            }
            ,
// /**
//  * 刷新项目
//  * @constructor
//  */
// FlushProject:function (){
//     layer.msg("刷新项目");
// },
            /**
             * 重命名项目
             * @constructor
             */
            ReProjectName: function () {
                //layer.msg("项目重命名");
            }
            ,
            /**
             *  删除项目
             * @constructor
             */
            DelProject: function (id = 0, obj) {

                if (!(operproject && operproject.projectid) && id.length == 0) {
                    layer.msg("请确认选择了项目");
                    return;
                } else {
                    if (id == 0) {
                        id = operproject.projectid;
                    }
                }
                layer.confirm('真的要删除项目吗？', function (index) {
                    layer.close(index);
                    miniAdmin.delAjax({
                        url: "/preproject",
                        data: {id: id},
                        callback: function (result) {
                            layer.msg("删除成功")
                            $(obj.elem).parent().remove()

                            softevent.resetChooseProInfo();//重置项目方案信息
                        },
                        loginCallback: function () {
                            layer.msg("登录成功，请重新删除")
                        }
                    })
                });
            }
            ,

            /**
             * 创建方案
             * @constructor
             */
            CreatePlan: function () {
                if (!(operproject && operproject.projectid)) {
                    layer.msg("请确认选择了项目，然后添加方案");
                    return;
                }
                miniAdmin.showConfirm({
                    url: '/planedit',
                    data: {
                        id: 0,
                        projectid: operproject.projectid,
                        callfunc: "CallEditPlan"
                    },
                    title: "添加方案",

                    style: {
                        maxmin: false,
                        area: ['30%', '30%']
                    }
                });
            }
            ,
            /**
             * 运行方案
             * @constructor
             */
            RunPlan: function (id) {
                softevent.SaveProjectPlanJson(0)
                var data=id.split('_');
                  miniAdmin.postAjax({
                    url: "/runplan",
                    data: {
                        projectid: data[0],
                        planid:data[1]
                    },
                    posttype: "form",
                    callback: function (data) {
                        if (data.status != 200) {
                            if (data.msg) {
                                layer.msg(data.msg)
                            }
                        } else {
                            layer.msg(data.msg, {icon: 1});
                           if(data.jobid)
                           {
                              softevent.LogConsole(data.jobid);
                           }
                        }

                    },
                    loginCallback: function () {
                    }
                })



            },
            /**
             * 日志输出
             * @param id
             * @constructor
             */
            LogConsole:function(id){

               var logid=0;
               var jobid=id;
                $("#workConsole").html("");

                if (timelogconsole){
                    clearInterval(timelogconsole);
                }

              timelogconsole= setInterval(function (args) {
                //  clearInterval(timelogconsole);

                miniAdmin.getAjax({
                    url: "/LogConsole",
                    data: {
                        logid:logid ,
                        jobid:id
                    },
                    posttype: "",
                    callback: function (data) {
                        debugger;
                        if (data.status != 200) {
                            if (data.msg) {
                                layer.msg(data.msg)
                            }
                            clearInterval(timelogconsole);
                            return;
                        } else
                            {
                                var loglist=data.taskloglist;
                                console.log(loglist)
                                var arraylogid=[];
                                for(var i=0;i<loglist.length;i++)
                                {   //todo
                                    arraylogid.push(loglist[i].id);
                                  $("#workConsole").append('<span class="layui-text layui-font-red  layui-show">'+loglist[i].note+'</span>')

                              }

                                if(arraylogid.length>0)
                                {
                                   logid= Math.max.apply(null,arraylogid);
                                }



                        }
                        if (data.endstatus ==2 || data.endstatus ==3 || data.endstatus ==4)
                        {
                            clearInterval(timelogconsole);
                        }
                    },
                    loginCallback: function () {
                        clearInterval(timelogconsole);
                    }
                })


              },3000);


            },
            /**
             * 停止运行方案
             * @constructor
             */
            StopPlan: function (id) {
                var data=id.split('_');
                  miniAdmin.postAjax({
                    url: "/stopplan",
                    data: {
                        projectid: data[0],
                        planid:data[1]
                    },
                    posttype: "form",
                    callback: function (data) {
                        if (data.status != 200) {
                            if (data.msg) {
                                layer.msg(data.msg)
                            }
                            return;
                        } else {
                            layer.msg(data.msg, {icon: 1});

                        }

                    },
                    loginCallback: function () {
                    }
                })



            }
            ,
            /**
             * 复制方案
             * @constructor
             */
            CopyPlan: function () {
                layer.msg("复制方案");


            }
            ,
            /**
             * 编辑方案
             * @constructor
             */
            UpdatePlan: function (id = '') {

                projectid = 0;
                if (!(operproject && operproject.planid) && id.length == 0) {
                    layer.msg("请确认选择了方案,然后编辑方案");
                    return;
                } else {
                    if (id == 0) {
                        id = operproject.planid;
                        projectid = operproject.projectid;
                    } else {

                        var ids = id.split('_');
                        projectid = ids[0];
                        id = ids[1];

                    }
                }
                miniAdmin.showConfirm({
                    url: '/planedit',
                    data: {
                        id: id,
                        projectid: projectid,
                        callfunc: "CallEditPlan"
                    },
                    title: "方案重命名",
                    style: {
                        maxmin: false,
                        area: ['30%', '30%']
                    }
                });
            }
            ,
            /**
             * 删除方案
             * @constructor
             */
            DelPlan: function (id, obj) {


                layer.confirm('真的要删除项目方案吗？', function (index) {
debugger;
                    layer.close(index);
                    miniAdmin.delAjax({
                        url: "/plane",
                        data: {id: id.split('_')[1]},
                        callback: function (result) {
                            layer.msg("删除成功")
                            $(obj.elem).parent().remove();
                            softevent.resetChooseProPlanInfo();//重置项目方案信息
                        },
                        loginCallback: function () {
                            layer.msg("登录成功，请重新删除")
                        }
                    })
                });
            }
            ,
            /**
             * 分享方案
             * @constructor
             */
            SharePlan: function () {

            }
            ,
            CheckHasChooseProject: function () {
                if (operproject && operproject.projectid)
                    return operproject;
                else
                    layer.msg("请确认选择了项目，然后添加方案");
                return {};
            }
            ,
            transDate: function (list, idstr, pidstr) {
                var result = [], temp = {};
                for (i = 0; i < list.length; i++) {
                    temp[list[i][idstr]] = list[i];//将nodes数组转成对象类型
                }
                for (j = 0; j < list.length; j++) {
                    tempVp = temp[list[j][pidstr]]; //获取每一个子对象的父对象
                    if (tempVp) {//判断父对象是否存在，如果不存在直接将对象放到第一层
                        if (!tempVp["nodes"]) tempVp["nodes"] = [];//如果父元素的nodes对象不存在，则创建数组
                        tempVp["nodes"].push(list[j]);//将本对象压入父对象的nodes数组
                    } else {
                        result.push(list[j]);//将不存在父对象的对象直接放入一级目录
                    }
                }
                return result;
            }
            ,


            /***
             * 添加流程节点
             * @param id
             * @param color
             * @param text
             * @param left
             * @param top
             * @param overlays
             * @param obj
             * @param ispass 0 1 -1
             * @param linestyle 0 1 -1
             * @constructor
             */
            AddNode: function (id, color, text, left, top, overlays, obj, ispass = 0, linestyle = 0) {

                var rgbvalue = softevent.hexToRgba(color, 1);
                var fontcolor = softevent.GetFontColor(rgbvalue);
                $(obj).find(".nodes").append('<div class="node wave node1css server" style="position: absolute;' + fontcolor + ' " id="' + id + '" data-color="' + color + '"  data-pass="' + ispass + '"  ><span class="softName">' + text + '</span></div>');
                $("#" + id).css("left", left).css("top", top);
                document.styleSheets[0].addRule("#" + id + '::before', "background: " + 'rgb(' + rgbvalue.red + ',' + rgbvalue.green + ',' + rgbvalue.blue + ',0.7)' + " ;");
                var customeoverlayid = "customeoverlay_" + id;
                var currentline = connectorPaintStyle;
                if (linestyle == -1) {
                    currentline = {
                        lineWidth: 2,
                        strokeStyle: "#ff0023"
                    }

                }
                hollowCircle.connectorStyle = currentline;
                hollowCircle.connectorOverlays = [
                    ["Arrow", {width: 10, length: 20, location: 1, id: "arrow_" + id}],
                    ["Custom", {
                        create: function (component) {
                            return $('<span style="background:#fff;position:relative;z-index:9;cursor:pointer;" >' + overlays + '</span>');
                        },
                        location: 0.5,
                        // id: customeoverlayid,
                    }],
                ];
                jsPlumb.addEndpoint(id, {anchors: "Top", uuid: id + 'Top'}, hollowCircle);
                jsPlumb.addEndpoint(id, {anchors: "Right", uuid: id + 'Right'}, hollowCircle);
                jsPlumb.addEndpoint(id, {anchors: "Bottom", uuid: id + 'Bottom'}, hollowCircle);
                jsPlumb.addEndpoint(id, {anchors: "Left", uuid: id + 'Left'}, hollowCircle);
                var click = {
                    x: 0,
                    y: 0
                };
                //jsPlumb.draggable(id);
                $('#' + id).draggable(
                    {
                        start: function (event, ui) {
                            click.x = event.clientX;
                            click.y = event.clientY;
                        }, drag: function (event, ui) {
                            var zoom = zoomNum;
                            var original = ui.originalPosition;
                            // jQuery will simply use the same object we alter here
                            var left = (event.clientX - click.x + original.left) / zoom;
                            var top = (event.clientY - click.y + original.top) / zoom;
                            var limistheght = $("#workContent").height() - 80;
                            var limitwidth = $("#workContent").width() - 80;
                            if (left < 0) {
                                left = 0;
                            } else if (left > limitwidth) {
                                left = limitwidth;
                            }
                            if (top < 0) {
                                top = 0;
                            } else if (top > limistheght) {
                                top = limistheght;
                            }
                            ui.position = {
                                left: left,
                                top: top
                            };
                            jsPlumb.repaint($(this));

                        }
                    });

                jsPlumb.makeTarget(id, {
                    dropOptions: {hoverClass: "dragHover"},
                    anchor: "Continuous",
                    allowLoopback: true
                });
                softevent.doubleclick("#" + id);

                $("#" + id).on("mouseover", function () {
                    $('#workContent').off("contextmenu");//解绑事件
                    softevent.bindNodeEvent(id);
                })
                $("#" + id).on("mouseleave", function () {
                    $('#workContent').off("contextmenu");//解绑事件
                    softevent.bindDocMentEvent();
                })

            },

            /***
             * 缓存模型
             * @returns {string}
             * @constructor
             */
            SaveModel: function (type = 1) {

                if ($("#workContent .node").length == 0) {
                    layer.msg("您还未添加任何数据呢？", {icon: 5});
                    return;
                }
                //导出json
                var ojson = {
                    canvas: {
                        width: $("#workContent").width(),
                        height: $("#workContent").height()
                    },
                    nodes: [],
                    line: [],
                    logistictree: []
                }
                //服务器
                $("#workContent .node").each(function (idx, elem) {

                    var $elem = $(elem);
                    var param = {
                        id: $elem.attr('id'),
                        divId: $elem.attr('id'),
                        name: $elem[0].innerText,
                        positionX: parseInt($elem.css("left"), 10),
                        positionY: parseInt($elem.css("top"), 10),
                        color: $elem.data('color'),
                        overlays: $("#customeoverlay_" + $elem.attr('id')).text(),
                        ispass: $elem.data('pass')//0 默认状态  1 通过 -1 未通过
                    }
                    ojson.nodes.push(param)
                });
                //线
                $.each(jsPlumb.getConnections(), function (idx, connection) {

                    var param = {
                        connectionId: connection.id,
                        pid: connection.sourceId,
                        id: connection.targetId,
                        PaintStyle: connection.getPaintStyle(),
                        overlays: $(connection.getOverlays()[1].canvas).text(),
                        otherPros: {
                            uuids: $.map(connection.endpoints, function (endpoint) {
                                let uuid = ""
                                if (endpoint.anchor.type == "Continuous") {

                                    var dir = endpoint._continuousAnchorEdge;
                                    dir = dir.substring(0, 1).toUpperCase() + dir.substring(1)
                                    uuid = endpoint.elementId + dir
                                } else
                                    uuid = endpoint._jsPlumb.uuid
                                return [uuid]
                            })
                        }

                    }
                    ojson.line.push(param)
                });


                var line = JSON.parse(JSON.stringify(ojson.line));
                ojson.logistictree = softevent.transDate(line, "id", "pid");

                //打印json
                ojson = JSON.stringify(ojson)
                console.log(ojson)
                if (type == 1) {
                    localStorage.setItem("saveplan", ojson)
                    layer.msg("复制成功", {icon: 1})
                }
                return ojson;
            }
            ,
            /**
             * 保存项目方案的流程建模关系
             * @constructor
             */
            SaveProjectPlanJson: function (param) {

                if (!(operproject && operproject.planid > 0)) {
                    layer.msg("请先选择项目方案，然后保存当前数据", {icon: 5});
                    return;
                }

                //缓存模型
                var ojson = softevent.SaveModel(0);

                //保存到服务器
                miniAdmin.postAjax({
                    url: "/proplannodes",
                    data: {
                        operproject: JSON.stringify(operproject),
                        nodesinfo: ojson
                    },
                    posttype: "",
                    callback: function (data) {
                        if (param == 1) {
                            if (data.status != 200) {
                                if (data.msg) {
                                    layer.msg(data.msg)
                                    }
                            }else {
                                    layer.msg("保存成功", {icon: 1});
                            }
                        }else{
                        if (data.status != 200) {
                            if (data.msg) {
                                layer.msg(data.msg)
                            }
                            return;
                        } else {
$("#tips").show();
setTimeout(function (args) {

    $("#tips").hide();

},2000)}
                        }
                    },
                    loginCallback: function () {
                    }
                })

            }
            ,

            /***
             * 加载流程模型  初始化节点与画线
             * @constructor
             */
            LoadProjectPlanJson: function () {

                var obj = softevent.resetcanvas();
                var data = JSON.parse(localStorage.getItem("saveplan"));

                $("#workContent").css({
                    "width": data.canvas.width + "px",
                    "height": data.canvas.height + "px"
                })
                boxwidth = data.canvas.width;
                boxheight = data.canvas.height;

                //重新赋予id起始值；
                nodesindex = data.nodes.length;

                //遍历节点
                for (var i = 0; i < data.nodes.length; i++) {
                    var item = data.nodes[i];
                    softevent.AddNode(item.divId, item.color, item.name, item.positionX, item.positionY, item.overlays || "点击输入", obj, item.ispass);
                }
                //遍历线
                for (var i = 0; i < data.line.length; i++) {
                    var line = data.line[i];
                    softevent.UpdateLineStyle(line);
                }
                layer.msg("已成功加载缓存");



            },
            /**
             * 从服务器加载 建模流程关系
             * @param projectid
             * @param planid
             * @constructor
             */
            LoadSysProjectPlanJson: function (projectid, planid) {
                var obj = softevent.resetcanvas();
                $("#workConsole").html("");
                miniAdmin.getAjax({
                    url: "/proplannodes",
                    data: {
                        proid: projectid,
                        planid: planid
                    },
                    posttype: "form",
                    callback: function (data) {
                        if (data.status != 200) {
                            if (data.msg) {
                                layer.msg(data.msg)
                            }
                            return;
                        } else {

                            //localStorage.getItem("saveplan")
                            var jobidlist = data.jobidlist;
                            var data = data.data;

                            $("#workContent").css({
                                "width": data.canvas.width + "px",
                                "height": data.canvas.height + "px"
                            })
                            boxwidth = data.canvas.width;
                            boxheight = data.canvas.height;

                            //重新赋予id起始值；
                            nodesindex = data.nodes.length;

                            //遍历节点
                            for (var i = 0; i < data.nodes.length; i++) {
                                var item = data.nodes[i];
                                softevent.AddNode(item.divId, item.color, item.name, item.positionX, item.positionY, item.overlays || "点击输入", obj, item.ispass);
                            }
                            //遍历线
                            for (var i = 0; i < data.line.length; i++) {
                                var line = data.line[i];
                                softevent.UpdateLineStyle(line);
                            }
                            layer.msg("已成功加载模型");
                            debugger
                            if(jobidlist.length != 0){
                                for (var i = 0; i < jobidlist.length; i++){
                                    softevent.LogConsole(jobidlist[i]);
                                }
                            }else{
                                $("#workConsole").append('<span class="layui-text layui-font-red  layui-show">当前没有运行的任务</span>')
                            }

                $(".layui-footer").resizable({
                handles: 'n',
                minHeight: 100,
                maxHeight:600,
                autoHide: true
            });

                 if(AutoSavePlan)
                    clearInterval(AutoSavePlan);

                softevent.AuotSave();

                           // {
                           //    softevent.LogConsole(data.jobid);
                           // }
                           //      if (loglist.length != 0) {
                           //          for (var i = 0; i < loglist.length; i++) {
                           //              $("#workConsole").append('<span class="layui-text layui-font-red  layui-show">' + loglist[i] + '</span>')
                           //
                           //          }
                           //      }else{
                           //       $("#workConsole").append('<span class="layui-text layui-font-red  layui-show">当前没有运行的任务</span>')
                           //      }



                        }
                    },
                    loginCallback: function () {
                    }
                })


            }
            ,

            /***
             * 根据线条数据设置更新样式
             * @param line
             * @constructor
             */
            UpdateLineStyle: function (line) {
                c = jsPlumb.connect(line.otherPros, true)

                let setting = {
                    paintStyle: line.PaintStyle,
                    connectorStyle: line.PaintStyle,
                    connectorHoverStyle: connectorHoverStyle,
                    overlays: [['Arrow', {width: 10, length: 10, location: 1}], ["Custom", {
                        create: function (component) {
                            return $('<span style="background:#fff;position:relative;z-index:9;cursor:pointer;" >' + (line.overlays || "点击编辑") + '</span>');
                        },
                        location: 0.5,
                        id: '',
                    }]],
                    anchor: ['Left', 'Top', 'Bottom', 'Right'],
                    connector: ["Bezier", {stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true}]
                }
                // 应用新样式
                jsPlumb.registerConnectionType('custom', setting)
                c.setType('custom')
            },
            /**
             * 自动保存
             * @constructor
             */
        AuotSave:function ()
         {

          AutoSavePlan=setInterval(function (args) {
               softevent.SaveProjectPlanJson(0)

             },5000)

        }
        }
    ;
    exports("softevent", softevent);
})
;
