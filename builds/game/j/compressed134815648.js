gws=this.gws||{};gws.components=[];gws.components["entity-controller"]=(function(){var e=function(){this.current=false;this.last=false;this.state=false},g=["left-button","middle-button","right-button"],c=function(h){return function(i){h.state=false}},b=function(h){return function(i){h.current=true;h.state=true;if(i&&(typeof(i.over)!=="undefined")){h.over=i.over}}},a=function(h,j){var i="",k=undefined;this.owner=h;this.listeners=[];this.addListeners(["load","controller","controller:load","controller:tick"]);this.acceptMouseInput=false;this.acceptTouchInput=false;if(j&&j.controlMap){this.actions={};for(i in j.controlMap){k=this.actions[j.controlMap[i]];if(!k){k=this.actions[j.controlMap[i]]=new e()}d[i+":up"]=c(k);d[i+":down"]=b(k);this.addListener(i+":up");this.addListener(i+":down");if(i.indexOf("mouse")>-1){this.acceptMouseInput=true}if(i.indexOf("touch")>-1){this.acceptTouchInput=true}}}},f=e.prototype,d=a.prototype;f.update=function(){this.last=this.current;this.current=this.state};f.isPressed=function(){return this.current};f.isTriggered=function(){return this.current&&!this.last};f.isReleased=function(){return !this.current&&this.last};d.load=function(){self=this;if(this.acceptMouseInput){this.owner.trigger("controller:input-handler",{mousedown:function(h,i){self.owner.trigger("mouse:"+g[h.button]+":down",{over:i})},mouseup:function(h,i){self.owner.trigger("mouse:"+g[h.button]+":up",{over:i})},mousemove:function(h,i){self.owner.trigger("mouse:move",{over:i})}})}if(this.acceptTouchInput){this.owner.trigger("controller:input-handler",{touchdown:function(h,i){self.owner.trigger("touch:down",{over:i})},touchup:function(h,i){self.owner.trigger("touch:up",{over:i})},touchmove:function(h,i){self.owner.trigger("touch:move",{over:i})}})}};d["mouse:move"]=function(h){if(this.actions["mouse:left-button"]&&(this.actions["mouse:left-button"].over!==h.over)){this.actions["mouse:left-button"].over=h.over}if(this.actions["mouse:middle-button"]&&(this.actions["mouse:middle-button"].over!==h.over)){this.actions["mouse:middle-button"].over=h.over}if(this.actions["mouse:right-button"]&&(this.actions["mouse:right-button"].over!==h.over)){this.actions["mouse:right-button"].over=h.over}};d["touch:move"]=function(h){if(this.actions.touch&&(this.actions.touch.over!==h.over)){this.actions.touch.over=h.over}};d.controller=function(){};d["controller:load"]=function(){};d["controller:tick"]=function(j){var i=undefined,h="";if(this.actions){for(h in this.actions){i=this.actions[h];if(i.current||i.last){this.owner.trigger(h,{pressed:i.current,released:!i.current&&i.last,triggered:i.current&&!i.last,over:i.over})}i.update()}}};d.destroy=function(){this.removeListeners(this.listeners)};d.addListeners=function(i){for(var h in i){this.addListener(i[h])}};d.removeListeners=function(i){for(var h in i){this.removeListener(h,i[h])}};d.addListener=function(i,k){var h=this,j=k||function(l){h[i](l)};this.owner.bind(i,j);this.listeners[i]=j};d.removeListener=function(h,i){this.owner.unbind(h,i)};return a})();gws.components["layer-controller"]=(function(){var c={kc0:"unknown",kc8:"backspace",kc9:"tab",kc12:"numpad-5-shift",kc13:"enter",kc16:"shift",kc17:"ctrl",kc18:"alt",kc19:"pause",kc20:"caps-lock",kc27:"esc",kc32:"space",kc33:"page-up",kc34:"page-down",kc35:"end",kc36:"home",kc37:"left-arrow",kc38:"up-arrow",kc39:"right-arrow",kc40:"down-arrow",kc42:"numpad-multiply",kc43:"numpad-add",kc44:"print-screen",kc45:"insert",kc46:"delete",kc47:"numpad-division",kc48:"0",kc49:"1",kc50:"2",kc51:"3",kc52:"4",kc53:"5",kc54:"6",kc55:"7",kc56:"8",kc57:"9",kc59:"semicolon",kc61:"equals",kc65:"a",kc66:"b",kc67:"c",kc68:"d",kc69:"e",kc70:"f",kc71:"g",kc72:"h",kc73:"i",kc74:"j",kc75:"k",kc76:"l",kc77:"m",kc78:"n",kc79:"o",kc80:"p",kc81:"q",kc82:"r",kc83:"s",kc84:"t",kc85:"u",kc86:"v",kc87:"w",kc88:"x",kc89:"y",kc90:"z",kc91:"left-windows-start",kc92:"right-windows-start",kc93:"windows-menu",kc96:"back-quote",kc106:"numpad-multiply",kc107:"numpad-add",kc109:"numpad-minus",kc110:"numpad-period",kc111:"numpad-division",kc112:"f1",kc113:"f2",kc114:"f3",kc115:"f4",kc116:"f5",kc117:"f6",kc118:"f7",kc119:"f8",kc120:"f9",kc121:"f10",kc122:"f11",kc123:"f12",kc144:"num-lock",kc145:"scroll-lock",kc186:"semicolon",kc187:"equals",kc188:"comma",kc189:"hyphen",kc190:"period",kc191:"forward-slash",kc192:"back-quote",kc219:"open-bracket",kc220:"back-slash",kc221:"close-bracket",kc222:"quote"},a=function(d,e){this.owner=d;this.entities=[];this.listeners=[];this.tickMessages=["check-inputs"];this.addListeners(["entity-added","check-inputs","keydown","keyup","mousedown","mousemove","mouseup","touchstart","touchmove","touchend","touchcancel"])},b=a.prototype;b.keydown=function(e){for(var d=0;d<this.entities.length;d++){this.entities[d].trigger("key:"+(c["kc"+e.keyCode]||("key-code-"+e.keyCode))+":down",e)}};b.keyup=function(e){for(var d=0;d<this.entities.length;d++){this.entities[d].trigger("key:"+(c["kc"+e.keyCode]||("key-code-"+e.keyCode))+":up",e)}};b.mousedown=function(e){for(var d=0;d<this.entities.length;d++){this.entities[d].trigger("mouse:"+mouseMap[e.button]+":down",e)}};b.mouseup=function(e){for(var d=0;d<this.entities.length;d++){this.entities[d].trigger("mouse:"+mouseMap[e.button]+":up",e)}};b.touchstart=function(e){for(var d=0;d<this.entities.length;d++){this.entities[d].trigger("touch:down",e)}};b.touchend=function(e){for(var d=0;d<this.entities.length;d++){this.entities[d].trigger("touch:up",e)}};b.touchmove=b.touchcancel=b.mousemove=function(e){for(var d=0;d<this.entities.length;d++){this.entities[d].trigger(e.type,e)}};b["check-inputs"]=function(e){for(var d=0;d<this.entities.length;d++){this.entities[d].trigger("controller:tick")}};b["entity-added"]=function(e){var f=e.getMessageIds();for(var d=0;d<f.length;d++){if(f[d]=="controller"){this.entities.push(e);e.trigger("controller:load");break}}};b.destroy=function(){this.removeListeners(this.listeners);this.entities.length=0};b.addListeners=function(e){for(var d in e){this.addListener(e[d])}};b.removeListeners=function(e){for(var d in e){this.removeListener(d,e[d])}};b.addListener=function(e,g){var d=this,f=g||function(h){d[e](h)};this.owner.bind(e,f);this.listeners[e]=f};b.removeListener=function(d,e){this.owner.unbind(d,e)};return a})();gws.components["tiled-loader"]=(function(){var a=function(c,d){this.owner=c;this.entities=[];this.listeners=[];this.addListeners(["load"]);this.level=gws.settings.levels[d.level];this.tileEntityId=d.tileEntityId||"tile"},b=a.prototype;b.load=function(){var c=0;for(;c<this.level.layers.length;c++){this.setupLayer(this.level.layers[c],this.level)}this.owner.removeComponent(this)};b.setupLayer=function(k,c){var d=k.width,r=k.height,n=[],e=c.tilesets,q=c.tilewidth,l=c.tileheight,p=0,o=0,j=0,i=undefined,h="",f=undefined,m=undefined,g=gws.settings.entities[this.tileEntityId];g.properties=g.properties||{};g.properties.width=q;g.properties.height=l;for(p=0;p<e.length;p++){if(gws.assets[e[p].name]){n.push(gws.assets[e[p].name])}else{n.push(e[p].image)}}for(p=0;p<g.components.length;p++){if(g.components[p].spritesheet=="import"){g.components[p].spritesheet={images:n,frames:{width:q,height:l}}}}if(k.type=="tilelayer"){for(o=0;o<r;o++){for(p=0;p<r;p++){g.components[0].spritesheet.animations={tile:+k.data[p+o*d]-1};this.owner.addEntity(new gws.classes.entity(g,{properties:{x:p*q,y:o*l}}))}}}else{if(k.type=="objectgroup"){for(j=0;j<k.objects.length;j++){i=k.objects[j];for(p=0;p<e.length;p++){if(e[p].firstgid>i.gid){break}else{f=e[p]}}h="";if(i.type!==""){h=i.type}else{if(f.tileproperties[i.gid-1]){if(f.tileproperties[i.gid-1].entity){h=f.tileproperties[i.gid-1].entity}else{if(f.tileproperties[i.gid-1].type){h=f.tileproperties[i.gid-1].type}}}}if(h!==""){m={};for(p in i.properties){m[p]=i.properties[p]}m.x=i.x;m.y=i.y;m.width=i.width||q;m.height=i.height||l;this.owner.addEntity(new gws.classes.entity(gws.settings.entities[h],{properties:m}))}}}}};b.destroy=function(){this.removeListeners(this.listeners);this.entities.length=0};b.addListeners=function(d){for(var c in d){this.addListener(d[c])}};b.removeListeners=function(d){for(var c in d){this.removeListener(c,d[c])}};b.addListener=function(d,f){var c=this,e=f||function(g){c[d](g)};this.owner.bind(d,e);this.listeners[d]=e};b.removeListener=function(c,d){this.owner.unbind(c,d)};return a})();gws.components["lc-render"]=(function(){var a=function(c,d){this.owner=c;this.entities=[];this.listeners=[];this.tickMessages=["render"];this.addListeners(["entity-added","render"]);this.canvas=document.createElement("canvas");this.owner.rootElement.appendChild(this.canvas);this.canvas.style.width="100%";this.canvas.style.height="100%";this.canvas.width=1024;this.canvas.height=768;this.stage=new createjs.Stage(this.canvas)};var b=a.prototype;b["entity-added"]=function(e){var d=this,f=e.getMessageIds();for(var c=0;c<f.length;c++){if(f[c]=="layer:render"){this.entities.push(e);e.trigger("layer:render-load",{stage:this.stage,parentElement:this.owner.rootElement});break}}};b.render=function(){for(var c=0;c<this.entities.length;c++){this.entities[c].trigger("layer:render")}this.stage.update()};b.destroy=function(){this.removeListeners(this.listeners);this.stage=undefined;this.owner.rootElement.removeChild(this.canvas);this.canvas=undefined;this.entities.length=0};b.addListeners=function(d){for(var c in d){this.addListener(d[c])}};b.removeListeners=function(d){for(var c in d){this.removeListener(c,d[c])}};b.addListener=function(d,f){var c=this,e=f||function(g){c[d](g)};this.owner.bind(d,e);this.listeners[d]=e};b.removeListener=function(c,d){this.owner.unbind(c,d)};return a})();gws.components["lc-logic"]=(function(){var a=function(c,d){this.owner=c;this.entities=[];this.listeners=[];this.tickMessages=["logic"];this.addListeners(["entity-added","logic"])};var b=a.prototype;b["entity-added"]=function(e){var d=this,f=e.getMessageIds();for(var c=0;c<f.length;c++){if(f[c]=="layer:logic"){this.entities.push(e);break}}};b.logic=function(){for(var c=0;c<this.entities.length;c++){this.entities[c].trigger("layer:logic")}};b.destroy=function(){this.removeListeners(this.listeners)};b.addListeners=function(d){for(var c in d){this.addListener(d[c])}};b.removeListeners=function(d){for(var c in d){this.removeListener(c,d[c])}};b.addListener=function(d,f){var c=this,e=f||function(g){c[d](g)};this.owner.bind(d,e);this.listeners[d]=e};b.removeListener=function(c,d){this.owner.unbind(c,d)};return a})();gws.components["render-debug"]=(function(){var a=function(c,d){this.owner=c;this.controllerEvents=undefined;this.listeners=[];this.addListeners(["layer:render","layer:render-load","controller:input-handler"])};var b=a.prototype;b["layer:render"]=function(c){this.shape.x=this.owner.x;this.shape.y=this.owner.y;this.txt.x=this.owner.x+(this.owner.width/2);this.txt.y=this.owner.y+(this.owner.height/2)};b["layer:render-load"]=function(h){var d=this.owner.x=this.owner.x||0,k=this.owner.y=this.owner.y||0,f=this.owner.width=this.owner.width||300,c=this.owner.height=this.owner.height||100,j=gws.settings.entities[this.owner.entityType]?(gws.settings.entities[this.owner.entityType].components||[]):[],g=[];for(var e in j){g[e]=j[e].id}this.stage=h.stage;this.txt=new createjs.Text(this.owner.entityType+"\n("+g.join(", ")+")");this.txt.x=d+f/2;this.txt.y=k+c/2;this.txt.textAlign="center";this.txt.textBaseline="middle";this.shape=new createjs.Shape((new createjs.Graphics()).beginStroke("#880").rect(0,0,f,c));this.stage.addChild(this.shape);this.stage.addChild(this.txt);if(this.controllerEvents){this["controller:input-handler"](this.controllerEvents)}};b["controller:input-handler"]=function(d){var f=false,c=d.mousedown,g=d.mouseup,e=d.mousemove;if(this.stage){if(c||g||e){this.stage.enableMouseOver();this.shape.onPress=function(h){if(c){c(h.nativeEvent,f,h.stageX,h.stageY)}if(g){h.onMouseUp=function(i){g(i.nativeEvent,f,i.stageX,i.stageY)}}if(e){h.onMouseMove=function(i){e(i.nativeEvent,f,i.stageX,i.stageY)}}};this.shape.onMouseOut=function(){f=false};this.shape.onMouseOver=function(){f=true}}}else{this.controllerEvents=d}};b.destroy=function(){this.removeListeners(this.listeners)};b.addListeners=function(d){for(var c in d){this.addListener(d[c])}};b.removeListeners=function(d){for(var c in d){this.removeListener(c,d[c])}};b.addListener=function(d,f){var c=this,e=f||function(g){c[d](g)};this.owner.bind(d,e);this.listeners[d]=e};b.removeListener=function(c,d){this.owner.unbind(c,d)};return a})();gws.components["render-tile"]=(function(){var a=function(c,d){this.owner=c;this.controllerEvents=undefined;this.spriteSheet=new createjs.SpriteSheet(d.spritesheet);this.state=d.state||"tile";this.listeners=[];this.addListeners(["layer:render","layer:render-load"])};var b=a.prototype;b["layer:render"]=function(c){this.shape.x=this.owner.x;this.shape.y=this.owner.y};b["layer:render-load"]=function(c){this.stage=c.stage;this.shape=new createjs.BitmapAnimation(this.spriteSheet);this.stage.addChild(this.shape);this.shape.gotoAndPlay(this.state);if(this.controllerEvents){this["controller:input-handler"](this.controllerEvents)}};b.destroy=function(){this.removeListeners(this.listeners)};b.addListeners=function(d){for(var c in d){this.addListener(d[c])}};b.removeListeners=function(d){for(var c in d){this.removeListener(c,d[c])}};b.addListener=function(d,f){var c=this,e=f||function(g){c[d](g)};this.owner.bind(d,e);this.listeners[d]=e};b.removeListener=function(c,d){this.owner.unbind(c,d)};return a})();gws.components["render-button"]=(function(){var a=function(c,d){this.owner=c;this.listeners=[];this.addListeners(["layer:render-load","layer:render","controller:input"]);this.stage=undefined;this.upBitmap=new createjs.Bitmap(gws.assets[d.upImg]);this.downBitmap=new createjs.Bitmap(gws.assets[d.downImg])};var b=a.prototype;b["controller:input-handler"]=function(c){};b["layer:render-load"]=function(c){this.stage=c.stage;this.stage.addChild(this.upBitmap);this.stage.addChild(this.downBitmap);this.upBitmap.x=this.owner.x;this.downBitmap.x=this.owner.x;this.upBitmap.y=this.owner.y;this.downBitmap.y=this.owner.y};b["layer:render"]=function(){this.upBitmap.x=this.owner.x;this.downBitmap.x=this.owner.x;if(this.owner.state){this.downBitmap.alpha=0}else{this.downBitmap.alpha=1}};b.destroy=function(){this.removeListeners(this.listeners);this.stage.removeChild(this.shape)};b.addListeners=function(d){for(var c in d){this.addListener(d[c])}};b.removeListeners=function(d){for(var c in d){this.removeListener(c,d[c])}};b.addListener=function(d,f){var c=this,e=f||function(g){c[d](g)};this.owner.bind(d,e);this.listeners[d]=e};b.removeListener=function(c,d){this.owner.unbind(c,d)};return a})();gws.components["logic-button"]=(function(){var a=function(c,d){this.owner=c;this.listeners=[];this.addListeners(["layer:logic","go-left","go-right"]);this.leftMax=10;this.rightMax=100;this.direction=0};var b=a.prototype;b["go-left"]=function(c){if(c.pressed){this.direction=-1}else{this.direction=0}};b["go-right"]=function(c){if(c.pressed){this.direction=1}else{this.direction=0}};b["layer:logic"]=function(c){if(this.direction){this.owner.x+=this.direction}};b.destroy=function(){this.removeListeners(this.listeners)};b.addListeners=function(d){for(var c in d){this.addListener(d[c])}};b.removeListeners=function(d){for(var c in d){this.removeListener(c,d[c])}};b.addListener=function(d,f){var c=this,e=f||function(g){c[d](g)};this.owner.bind(d,e);this.listeners[d]=e};b.removeListener=function(c,d){this.owner.unbind(c,d)};return a})();gws.classes={};gws.classes.game=(function(){var a=function(d){this.currentScene=undefined;this.settings=d;this.rootElement=document.createElement("div");this.rootElement.id=gws.settings.global.rootElement;document.getElementsByTagName("body")[0].appendChild(this.rootElement);this.loadScene(d.global.initialScene);var c=this;this.input=new gws.classes.input(function(e,f){c.currentScene.triggerInputEvent(e,f)})},b=a.prototype;b.tick=function(){if(this.currentScene){this.currentScene.tick()}};b.loadScene=function(c){this.currentScene=new gws.classes.scene(this.settings.scenes[c],this.rootElement)};return a})();gws.classes.input=(function(){var c=function(d,e){return function(f){e(d,f)}},a=function(g){this.mouseX=0;this.mouseY=0;var f=this.element=window,d=this,e=["keydown","keyup"],h=this.bindings=[];for(eventIndex in e){h[e[eventIndex]]=c(e[eventIndex],g);f.addEventListener(e[eventIndex],h[e[eventIndex]],true)}},b=a.prototype;b.destroy=function(){var d=this.element;for(binding in this.bindings){d.removeEventListener(binding,this.bindings[binding],true)}};return a})();gws.classes.entity=(function(){var a=function(f,d){var l=this,i=undefined,h=undefined,e=f||{},c=e.components||[],k=e.properties||{},j=d||{},g=j.properties||{};l.components=[];l.messages=[];l.entityType=e.id;for(i in k){l[i]=k[i]}for(i in g){l[i]=g[i]}for(i in c){h=c[i];if(gws.components[h.id]){l.addComponent(new gws.components[h.id](l,h))}else{console.warn("Component '"+h.id+"' is not defined.",h)}}l.trigger("load")};var b=a.prototype;b.addComponent=function(c){this.components.push(c);return c};b.removeComponent=function(d){for(var c in this.components){if(this.components[c]===d){this.components.splice(c,1);d.destroy();return d}}return false};b.bind=function(c,d){if(!this.messages[c]){this.messages[c]=[]}this.messages[c].push(d)};b.unbind=function(d,e){if(!this.messages[d]){this.messages[d]=[]}for(var c in this.messages[d]){if(this.messages[d][c]===e){this.messages[d].splice(c,1);break}}};b.trigger=function(d,f){if(this["debug-events"]){for(var e in this["debug-events"]){if(this["debug-events"][e]==d){console.log(d,f)}}}if(this.messages[d]){for(var c in this.messages[d]){this.messages[d][c](f)}}};b.getMessageIds=function(){var d=[];for(var c in this.messages){d.push(c)}return d};b.destroy=function(){for(var c in this.components){this.removeComponent(this.components[c])}};return a})();gws.classes.layer=(function(){var a=function(f,d){var h=f.components,g=undefined;this.rootElement=d;this.components=[];this.tickMessages=[];this.messages=[];this.entities=[];for(var e in h){g=h[e];this.addComponent(new gws.components[g.type||g.id](this,g))}if(f.entities){for(var c=0;c<f.entities.length;c++){this.addEntity(new gws.classes.entity(gws.settings.entities[f.entities[c].type],f.entities[c]))}}this.trigger("load")},b=a.prototype;b.tick=function(){for(var c in this.tickMessages){this.trigger(this.tickMessages[c])}};b.addComponent=function(d){var f=false,e=0,c=0;this.components.push(d);if(d.tickMessages){for(e in d.tickMessages){f=false;for(c in this.tickMessages){if(d.tickMessages[e]===this.tickMessages[c]){f=true}}if(!f){this.tickMessages.push(d.tickMessages[e])}}}return d};b.removeComponent=function(d){for(var c in this.components){if(this.components[c]===d){this.components.splice(c,1);d.destroy();return d}}return false};b.bind=function(d,c){if(!this.messages[d]){this.messages[d]=[]}this.messages[d].push(c)};b.unbind=function(d,c){if(!this.messages[d]){this.messages[d]=[]}for(var e in this.messages[d]){if(this.messages[d][e]===c){this.messages[d].splice(e,1);break}}};b.trigger=function(c,d){if(this.messages[c]){for(messageIndex in this.messages[c]){this.messages[c][messageIndex](d)}}};b.addEntity=function(c){this.entities.push(c);this.trigger("entity-added",c)};b.removeEntity=function(d){for(var c=0;c<this.entities.length;c++){if(this.entities[c]===d){this.entities.splice(c,1);d.destroy();return d}}return false};return a})();gws.classes.scene=(function(){var b=function(e,c){var f=e.layers;this.rootElement=c;this.layers=[];for(var d in f){this.layers.push(new gws.classes.layer(f[d],this.rootElement))}},a=b.prototype;a.tick=function(){for(var c in this.layers){this.layers[c].tick()}};a.triggerInputEvent=function(d,e){for(var c in this.layers){this.layers[c].trigger(d,e)}};return b})();window.addEventListener("load",function(){var a=this;loader=new createjs.PreloadJS();loader.onProgress=function(b){console.log("Progress:",b)};loader.onFileLoad=function(f){var e=0,c=0,g=f.data,b=f.result,d=undefined;console.log("Load:",f);if((f.type=="image")&&g){if(g.rows&&g.columns){d=new createjs.SpriteSheet({images:[b],frames:{width:b.width/g.columns,height:b.height/g.rows}});for(c=0;c<g.rows;c++){for(e=0;e<g.columns;e++){if(g.ids&&g.ids[e]&&g.ids[e][c]){gws.assets[g.ids[e][c]]=createjs.SpriteSheetUtils.extractFrame(d,+c+(e*g.rows))}else{gws.assets[f.id+"-"+e+"_"+c]=createjs.SpriteSheetUtils.extractFrame(d,+c+(e*g.rows))}}}return}}gws.assets[f.id]=b};loader.onError=function(b){console.log("Your stuff broke!")};loader.onComplete=function(b){a.game=new gws.classes.game(gws.settings);createjs.Ticker.setFPS(gws.settings.global.fps);createjs.Ticker.addListener(a.game)};loader.loadManifest(gws.settings.assets);gws.assets=[]});gws.settings={global:{initialScene:"scene-1",fps:60,rootElement:"root"},assets:[{id:"alpha",src:"i/test.png",data:{rows:2,columns:2,ids:[["horizon","sky"],["ground","rock"]]}},{id:"beta",src:"i/mookie.png"},{id:"tilemap",src:"i/tile-map.png"}],entities:{tile:{id:"tile",components:[{id:"render-tile",spritesheet:"import"}]},button:{id:"button",assets:[{id:"mookie-standing",src:"i/mookie.png"}],components:[{id:"entity-controller"},{id:"logic-button"},{id:"render-button"},{id:"render-debug"}],properties:{"debug-events":["go-left","go-right"],state:false,x:10,y:10,width:24,height:24},settings:{controlMap:{"key:a":"go-left","key:left-arrow":"go-left","key:d":"go-right","key:right-arrow":"go-right","mouse:left-button":"go-left","mouse:right-button":"go-right"}}},hero:{id:"hero",properties:{"debug-events":["go-left","go-right"],width:24,height:24},components:[{id:"entity-controller",controlMap:{"key:a":"go-left","key:left-arrow":"go-left","key:d":"go-right","key:right-arrow":"go-right","mouse:left-button":"go-left","mouse:right-button":"go-right"}},{id:"logic-button"},{id:"render-tile",state:"standing",spritesheet:{images:["i/tile-map.png"],frames:{width:24,height:24,regY:24},animations:{standing:18}}}]}},scenes:{"scene-menu":{layers:[{id:"buttons",components:[{id:"lc-logic"},{id:"lc-render"},{id:"layer-controller"}],entities:[{type:"button",properties:{},settings:{upImg:"sky",downImg:"ground"}}]}]},"scene-1":{layers:[{id:"action",components:[{id:"lc-logic"},{type:"lc-render"},{id:"layer-controller"},{type:"tiled-loader",level:"level-1"}]}]}},levels:{"level-1":{height:20,layers:[{data:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20],height:20,name:"background",opacity:1,type:"tilelayer",visible:true,width:20,x:0,y:0},{data:[17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21,22,16,16,16,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21,23,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,21,23,0,15,16,16,16,16,16,17,0,15,17,10,0,15,16,16,16,16,22,23,0,0,0,0,0,0,0,0,0,0,23,10,0,0,0,0,0,0,21,23,0,0,0,0,0,0,0,0,0,0,22,17,0,0,0,0,0,0,21,23,0,0,0,10,0,0,0,0,0,0,0,22,17,0,0,0,0,0,21,22,16,16,16,17,0,0,0,0,10,0,0,0,22,16,16,16,17,0,21,23,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,21,5,0,0,0,0,0,10,9,9,10,10,0,0,0,0,0,0,0,0,21,23,0,0,0,0,0,10,9,10,10,10,10,0,0,0,0,0,0,0,21,5,0,0,0,0,0,3,3,15,17,3,3,3,0,0,0,0,0,0,4,5,0,0,0,0,0,3,3,21,23,9,9,9,17,0,0,0,0,0,4,23,10,0,10,10,0,3,3,21,23,9,9,15,22,17,9,9,9,9,21,22,16,16,16,16,16,16,16,22,22,16,16,22,22,22,16,16,16,16,22],height:20,name:"map",opacity:1,type:"tilelayer",visible:true,width:20,x:0,y:0},{height:20,name:"guys",objects:[{gid:19,height:0,name:"",properties:{},type:"hero",width:0,x:49,y:144},{gid:6,height:0,name:"",properties:{},type:"",width:0,x:257,y:156},{gid:6,height:0,name:"",properties:{},type:"",width:0,x:281,y:142},{gid:6,height:0,name:"",properties:{},type:"",width:0,x:306,y:152},{gid:6,height:0,name:"",properties:{},type:"",width:0,x:363,y:266},{gid:6,height:0,name:"",properties:{},type:"",width:0,x:47,y:272},{gid:6,height:0,name:"",properties:{},type:"",width:0,x:142,y:328},{gid:6,height:0,name:"",properties:{},type:"",width:0,x:251,y:449},{gid:6,height:0,name:"",properties:{},type:"",width:0,x:424,y:428},{gid:12,height:0,name:"",properties:{},type:"",width:0,x:167,y:192},{gid:18,height:0,name:"",properties:{},type:"",width:0,x:409,y:191},{gid:18,height:0,name:"",properties:{},type:"",width:0,x:409,y:166},{gid:24,height:0,name:"",properties:{},type:"",width:0,x:364,y:193},{gid:28,height:0,name:"",properties:{},type:"",width:0,x:96,y:262},{height:37,name:"",properties:{},type:"",width:35,x:419,y:64},{height:29,name:"",properties:{},type:"",width:46,x:73,y:402}],opacity:1,type:"objectgroup",visible:true,width:20,x:0,y:0}],orientation:"orthogonal",properties:{timer:"12"},tileheight:24,tilesets:[{firstgid:1,image:"i/tile-map.png",imageheight:96,imagewidth:144,margin:0,name:"tilemap",properties:{},spacing:0,tileheight:24,tileproperties:{"11":{entity:"sign"},"17":{entity:"enemy"},"18":{entity:"mookie"},"23":{entity:"flower"},"5":{entity:"gem"}},tilewidth:24},{firstgid:25,image:"i/test.png",imageheight:48,imagewidth:48,margin:0,name:"test",properties:{},spacing:0,tileheight:24,tileproperties:{"3":{a:"b"}},tilewidth:24}],tilewidth:24,version:1,width:20}}};