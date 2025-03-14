/**
 * date:2019/08/16
 * author:Mr.Chung
 * description:此处放layui自定义扩展
 * version:2.0.4
 */

//使用方法
window.rootPath = (function (src) {
    src = document.scripts[document.scripts.length - 1].src;
    return src.substring(0, src.lastIndexOf("/") + 1);
})();
layui.config({
    base: rootPath + "lay-module/",
    version: true
}).extend({

    softcore: 'layuimini/softcore', //思南平台核心逻辑
    softevent: 'layuimini/softevent', //思南平台核心逻辑事件
    miniAdmin: "layuimini/miniAdmin", // layuimini后台扩展
    miniMenu: "layuimini/miniMenu", // layuimini菜单扩展
    miniTab: "layuimini/miniTab", // layuimini tab扩展
    miniTheme: "layuimini/miniTheme", // layuimini 主题扩展
    miniTongji: "layuimini/miniTongji", // layuimini 统计扩展
    step: 'step-lay/step', // 分步表单扩展
    tableSelect: 'tableSelect/tableSelect', // table选择扩展
    iconPickerFa: 'iconPicker/iconPickerFa', // fa图标选择扩展
    echarts: 'echarts/echarts', // echarts图表扩展
    echartsTheme: 'echarts/echartsTheme', // echarts图表主题扩展
    wangEditor: 'wangEditor/wangEditor', // wangEditor富文本扩展
    layarea: 'layarea/layarea', //  省市县区三级联动下拉选择器
    cookie:'layuimini/cookie',
    treetable: 'layuimini/treetable', //table树形扩展
    jsplumb:'jsPlumb/jsPlumb',
    autorowsnumbers:'layuimini/autolinenumber',//显示行
    highlighttextarea:"highlighttextarea/highlighttextarea",//高亮显示文本
    jqueryui:'jquery/jqueryui',
    ztree: 'zTree/ztree',
    // ztree: 'zTree/ztreeall',
    inputTags: 'mymodules/inputTags',

});
