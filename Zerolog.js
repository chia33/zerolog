/**
 * @author chia
 * @version 0.1.2
 */
var Zerolog = (function (){

    var container = null;

    function isFunction(value){return typeof(value) == "function";}
    function isArray(value){return value instanceof Array;}
    function isString(value){return typeof(value) == "string";}
    function isNumber(value){return typeof(value) == "number";}
    function isObject(value){return typeof(value) == "object";}

    var template = {};
    template.box = '<div style="border-top-width: 1px; border-top-style: dashed; border-top-color: rgb(153, 153, 153); padding: 10px;">XXX<div style="clear: both;"></div></div>';
    template.argBox = '<div style="float: left; margin-right: 20px;">XXX</div>';
    template.str = '<span style="color: rgb(124, 67, 110);">XXX</span>';
    template.num = '<span>XXX</span>';
    template.func = '<div>XXX</div>';
    template.arr = '<div><div class="title">Array(XXX)</div><div style="margin-left: 10px;display: none;">YYY</div></div>';
    template.obj = '<div><div class="title">Object{...}</div><div style="margin-left: 10px;display: none;">XXX</div></div>';
    template.param = '<div style="float: left;clear: both;"><div style="float:left;">XXX:</div><div style="float:left;margin-left: 5px;">YYY</div></div>';


    //转换文本中的特殊字符："<", ">"等
    function transformText(text){
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(text));
        return div.innerHTML;
    }
    var Z = {};

    Z.init = function (id){
        id = id || 'Zerolog';
        container = document.querySelector('#' + id);
        if(!container){
            var body = document.querySelector("body");
            container = document.createElement("div");
            body.appendChild(container);
        }
        container.style["background-color"] = "#fff";
        container.style["cursor"] = "default";
        container.addEventListener("click", function(e){
            if(e.target.className == 'title'){
                var content = e.target.nextElementSibling;
                if(content.style.display == 'none'){
                    content.style.display = 'block';
                }
                else{
                    content.style.display = 'none';
                }
            }
        });
    }

    Z.log = function(){
        console.log2.apply(console, arguments);
        log(arguments);
    };

    Z.debug = function(){
        console.debug2.apply(console, arguments);
        log(arguments);
    };

    Z.dir = function(){
        console.dir2.apply(console, arguments);
        log(arguments);
    };

    Z.trace = function(){
        console.trace2.apply(console, arguments);
        log(arguments);
    };

    Z.error = function(){
        console.error2.apply(console, arguments);
        log(arguments);
    };

    function log(args){
        if(!container) {
            Z.init();
        }
        var argBoxs = '';
        for (var i = 0; i < args.length; i++) {
            argBoxs += createArgBox(args[i]);
        }
        container.innerHTML += template.box.replace('XXX', argBoxs);
    }

    function createArgBox(arg){
        var content = '';
        var handlers = [functionHandler, stringHandler, numberHandler, 
            arrayHandler, objectHandler];
        var matchs = [isFunction, isString, isNumber, 
            isArray, isObject];

        var result = matchs.some(function(value, index){
            var result = value(arg);
            if(result) content = handlers[index](arg);
            return result;
        });
        if(!result) content = arg;

        return template.argBox.replace('XXX', content);
    }

    function stringHandler(arg){
        return template.str.replace('XXX', transformText(arg));
    }

    function numberHandler(arg){
        return template.num.replace('XXX', arg);
    }

    function functionHandler(arg){
        return template.func.replace('XXX', ('' + arg).match(/.*?\)/));
    }

    function arrayHandler(arg){
        var params = '';
        for (var i = 0; i < arg.length; i++) {
            params += template.param.replace('XXX', i).replace('YYY', createArgBox(arg[i]));
        };
        return template.arr.replace('XXX', arg.length).replace('YYY', params);
    }

    function objectHandler(arg){
        var params = '';
        for(var key in arg){
            params += template.param.replace('XXX', key).replace('YYY', createArgBox(arg[key]));
        }
        return template.obj.replace('XXX', params);
    }

    window.console === undefined && (window.console = {});
    function empty(){}
    console.log2 = (console.log === undefined ? empty : console.log);
    console.debug2 = (console.debug === undefined ? empty : console.debug);
    console.dir2 = (console.dir === undefined ? empty : console.dir);
    console.trace2 = (console.trace === undefined ? empty : console.trace);
    console.error2 = (console.error === undefined ? empty : console.error);

    console.log = Z.log;
    console.debug = Z.debug;
    console.dir = Z.dir;
    console.trace = Z.trace;
    console.error = Z.error;
    return Z;
})();
