/**
 * @author chia
 * @version 1.0.4
 */
var Zerolog = (function (){

    var container = null,
        Z = {};

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
        
    }

    function log(args){
        if(!container) {
            Z.init();
        }

        var div = document.createElement("div");
        div.style["border-top-width"] = "1px";
        div.style["border-top-style"] = "dashed";
        div.style["border-top-color"] = "rgb(226, 226, 226)";
        div.style["padding"] = "10px";
        for (var i = 0; i < args.length; i++) {
            var ele = createArgBox(args[i]);
            div.appendChild(ele);
        }
        var clear = document.createElement("div");
        clear.style["clear"] = "both";
        div.appendChild(clear);
        container.appendChild(div);
    }

    function createArgBox(arg){
        var ele = document.createElement("div");
        matchs.some(function(item, index){
            var result = item.match(arg);
            if(result) {
                ele.appendChild(item.handler(arg));
            }
            return result;
        });
        ele.style["float"] = "left";
        ele.style["margin-right"] = "20px";
        return ele;
    }

    var matchs = [
        { match : isFunction, handler : functionHandler },
        { match : isString, handler : stringHandler },
        { match : isNumber, handler : numberHandler },
        { match : isArray, handler : arrayHandler },
        { match : isObject, handler : objectHandler },
        { match : isOther, handler : otherHandler }
    ];

    function isFunction(value){return typeof(value) == "function";}
    function isArray(value){return value instanceof Array;}
    function isString(value){return typeof(value) == "string";}
    function isNumber(value){return typeof(value) == "number";}
    function isObject(value){return (value && typeof(value) == "object");}
    function isOther(value){return true;}


    function stringHandler(arg){
        var ele = document.createElement('span');
        ele.appendChild(document.createTextNode(arg));
        ele.style["color"] = "#990000";
        return ele;
    }

    function numberHandler(arg){
        var ele = document.createElement('span');
        ele.appendChild(document.createTextNode(arg));
        ele.style["color"] = "#0000FF";
        return ele;
    }

    function functionHandler(arg){
        var ele = document.createElement('span');
        ele.appendChild(document.createTextNode(('' + arg).match(/.*?\)/)));
        return ele;
    }

    var rightArrow = '<svg style="margin-right: 3px;" width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1"> <polygon fill="#909090" points="0,0 8,4 0,8"></polygon> </svg>';
    var downArrow = '<svg style="margin-right: 3px;" width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1"> <polygon fill="#909090" points="0,0 8,0 4,8"></polygon> </svg>';
    
    function arrayHandler(arg){
        var ele = document.createElement('div');
        var title = document.createElement('div');
        var content = document.createElement('div');
        ele.appendChild(title);
        ele.appendChild(content);
        
        var titleArrow = document.createElement('div');
        titleArrow.innerHTML += rightArrow;
        title.appendChild(titleArrow);
        var titleName = document.createElement('div');
        titleName.appendChild(document.createTextNode("Array(" + arg.length + ")"));
        title.appendChild(titleName);
        
        titleArrow.style["float"] = "left";
        titleName.style["float"] = "left";

        title.addEventListener("click", function(){
            if(content.hasChildNodes()){
                titleArrow.innerHTML = rightArrow;
                content.innerHTML = "";
                return;
            }
            titleArrow.innerHTML = downArrow;
            for (var i = 0; i < arg.length; i++) {
                var contentItem = document.createElement('div');
                var itemIndex = document.createElement('div');
                var itemContent = document.createElement('div');
                itemIndex.appendChild(document.createTextNode(i + ":"));
                itemContent.appendChild(createArgBox(arg[i]));
                contentItem.appendChild(itemIndex);
                contentItem.appendChild(itemContent);
                itemIndex.style["float"] = "left";
                itemIndex.style["color"] = "rgb(124, 67, 110)";
                itemContent.style["float"] = "left";
                itemContent.style["margin-left"] = "5px";
                contentItem.style["float"] = "left";
                contentItem.style["clear"] = "both";
                content.appendChild(contentItem);
            }

        });
        
        title.style["float"] = "left";
        content.style["float"] = "left";
        content.style["clear"] = "both";
        content.style["margin-left"] = "20px";

        return ele;
    }

    function objectHandler(arg){
        var ele = document.createElement('div');
        var title = document.createElement('div');
        var content = document.createElement('div');
        ele.appendChild(title);
        ele.appendChild(content);

        var titleArrow = document.createElement('div');
        titleArrow.innerHTML += rightArrow;
        title.appendChild(titleArrow);
        var titleName = document.createElement('div');
        titleName.appendChild(document.createTextNode("Object{...}"));
        title.appendChild(titleName);
        
        titleArrow.style["float"] = "left";
        titleName.style["float"] = "left";

        title.addEventListener("click", function(){
            if(content.hasChildNodes()){
                titleArrow.innerHTML = rightArrow;
                content.innerHTML = "";
                return;
            }
            titleArrow.innerHTML = downArrow;
            for(var key in arg){
                var contentItem = document.createElement('div');
                var itemIndex = document.createElement('div');
                var itemContent = document.createElement('div');
                itemIndex.appendChild(document.createTextNode(key + ":"));
                itemIndex.style["color"] = "rgb(124, 67, 110)";
                itemContent.appendChild(createArgBox(arg[key]));
                contentItem.appendChild(itemIndex);
                contentItem.appendChild(itemContent);
                itemIndex.style["float"] = "left";
                itemContent.style["float"] = "left";
                itemContent.style["margin-left"] = "5px";
                contentItem.style["float"] = "left";
                contentItem.style["clear"] = "both";
                content.appendChild(contentItem);
            }
            
        });

        title.style["float"] = "left";
        content.style["float"] = "left";
        content.style["clear"] = "both";
        content.style["margin-left"] = "20px";

        return ele;
    }

    function otherHandler(arg){
        var ele = document.createElement('span');
        ele.appendChild(document.createTextNode(arg));
        ele.style["color"] = "#666666";
        return ele;
    }


    Z.log = function(){
        log2.apply(console, arguments);
        log(arguments);
    };

    Z.debug = function(){
        debug2.apply(console, arguments);
        log(arguments);
    };

    Z.dir = function(){
        dir2.apply(console, arguments);
        log(arguments);
    };

    Z.trace = function(){
        trace2.apply(console, arguments);
        log(arguments);
    };

    Z.error = function(){
        error2.apply(console, arguments);
        log(arguments);
    };

    window.console === undefined && (window.console = {});
    function empty(){}
    var log2 = (console.log === undefined ? empty : console.log);
    var debug2 = (console.debug === undefined ? empty : console.debug);
    var dir2 = (console.dir === undefined ? empty : console.dir);
    var trace2 = (console.trace === undefined ? empty : console.trace);
    var error2 = (console.error === undefined ? empty : console.error);

    console.log = Z.log;
    console.debug = Z.debug;
    console.dir = Z.dir;
    console.trace = Z.trace;
    console.error = Z.error;
    return Z;
})();
