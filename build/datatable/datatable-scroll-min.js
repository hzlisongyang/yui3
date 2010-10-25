YUI.add("datatable-scroll",function(E){var A=E.Do,Q=E.Node,F=E.Lang,O=E.UA,P=E.StyleSheet,G=E.ClassNameManager.getClassName,H="datatable",L=G(H,"hd"),J=G(H,"bd"),I=G(H,"liner"),B=G(H,"scrollable"),R='<div class="'+L+'"></div>',D='<div class="'+J+'"></div>',K='<th id="{id}" rowspan="{rowspan}" colspan="{colspan}"><div class="'+I+'" style="width:100px">{value}</div></th>',N='<td headers="{headers}"><div class="'+I+'" style="width:100px">{value}</div></td>',M="<table></table>";function C(){C.superclass.constructor.apply(this,arguments);}E.mix(C,{NS:"scroll",NAME:"dataTableScroll",ATTRS:{width:{value:undefined},height:{value:undefined},scroll:{value:"y"},COLOR_COLUMNFILLER:{value:"#f2f2f2",validator:F.isString,setter:function(S){if(this._headerContainerNode){this._headerContainerNode.setStyle("backgroundColor",S);}}}}});E.extend(C,E.Plugin.Base,{tdTemplate:N,thTemplate:K,_parentTableNode:null,_parentTheadNode:null,_parentTbodyNode:null,_parentMsgNode:null,_parentContainer:null,_bodyContainerNode:null,_headerContainerNode:null,initializer:function(S){var T=this.get("host");this._parentContainer=T.get("contentBox");this._parentContainer.addClass(B);this._setUpNodes();},_setUpNodes:function(){var S=this.get("host");this.afterHostMethod("_addTableNode",this._setUpParentTableNode);this.afterHostMethod("_addTheadNode",this._setUpParentTheadNode);this.afterHostMethod("_addTbodyNode",this._setUpParentTbodyNode);this.afterHostMethod("_addMessageNode",this._setUpParentMessageNode);this.afterHostMethod("renderUI",this.renderUI);this.afterHostMethod("syncUI",this.syncUI);if(this.get("scroll")==="y"){this.afterHostMethod("_attachTheadThNode",this._attachTheadThNode);this.afterHostMethod("_attachTbodyTdNode",this._attachTbodyTdNode);}},_setUpParentTableNode:function(){this._parentTableNode=this.get("host")._tableNode;},_setUpParentTheadNode:function(){this._parentTheadNode=this.get("host")._theadNode;},_setUpParentTbodyNode:function(){this._parentTbodyNode=this.get("host")._tbodyNode;},_setUpParentMessageNode:function(){this._parentMsgNode=this.get("host")._msgNode;},renderUI:function(){this._createBodyContainer();this._createHeaderContainer();this._setContentBoxDimensions();},syncUI:function(){this._syncWidths();this._syncScroll();},_syncWidths:function(){var T=Q.all("#"+this._parentContainer.get("id")+" .yui3-datatable-hd table thead th"),U=Q.one("#"+this._parentContainer.get("id")+" .yui3-datatable-bd table .yui3-datatable-data").get("firstChild").get("children"),V,Y,a,X,Z,W,S=O.ie;for(V=0,Y=T.size();V<Y;V++){Z=T.item(V).get("firstChild");W=U.item(V).get("firstChild");if(!S){a=Z.get("clientWidth");X=U.item(V).get("clientWidth");}else{a=Z.get("offsetWidth");X=U.item(V).get("offsetWidth");}if(a>X){W.setStyle("width",(a-20+"px"));}else{if(X>a){Z.setStyle("width",(X-20+"px"));}}}if(S&&this.get("scroll")==="y"){this._headerContainerNode.setStyle("width",this._parentContainer.get("offsetWidth")+15+"px");}},_attachTheadThNode:function(T){var S=T.column.get("width")||"auto";if(S!=="auto"){T.th.get("firstChild").setStyles({"width":S,"overflow":"hidden"});}return T;},_attachTbodyTdNode:function(T){var S=T.column.get("width")||"auto";if(S!=="auto"){T.td.get("firstChild").setStyles({"width":S,"overflow":"hidden"});}return T;},_createBodyContainer:function(){var T=Q.create(D),S=E.bind("_onScroll",this);this._bodyContainerNode=T;this._setStylesForTbody();T.appendChild(this._parentTableNode);this._parentContainer.appendChild(T);T.on("scroll",S);},_createHeaderContainer:function(){var T=Q.create(R),S=Q.create(M);this._headerContainerNode=T;this._setStylesForThead();S.appendChild(this._parentTheadNode);T.appendChild(S);this._parentContainer.prepend(T);},_setStylesForTbody:function(){var T=this.get("scroll"),S=this.get("width")||"",V=this.get("height")||"",U=this._bodyContainerNode,W={"width":"","height":V};if(T==="x"){W["overflowY"]="hidden";W["width"]=S;}else{if(T==="y"){W["overflowX"]="hidden";}else{W["width"]=S;}}U.setStyles(W);return U;},_setStylesForThead:function(){var T=this.get("scroll"),S=this.get("width")||"",U=this._headerContainerNode;if(T!=="y"){U.setStyles({"width":S,"overflow":"hidden"});}},_setContentBoxDimensions:function(){if(this.get("scroll")==="y"||(!this.get("width"))){this._parentContainer.setStyle("width","auto");}},_onScroll:function(){this._headerContainerNode.set("scrollLeft",this._bodyContainerNode.get("scrollLeft"));},_syncScroll:function(){this._syncScrollX();this._syncScrollY();this._syncScrollOverhang();if(O.opera){this._headerContainerNode.set("scrollLeft",this._bodyContainerNode.get("scrollLeft"));if(!this.get("width")){document.body.style+="";}}},_syncScrollY:function(){var S=this._parentTbodyNode,U=this._bodyContainerNode,T;if(!this.get("width")){T=(U.get("scrollHeight")>U.get("clientHeight"))?(S.get("parentNode").get("clientWidth")+19)+"px":(S.get("parentNode").get("clientWidth")+2)+"px";this._parentContainer.setStyle("width",T);}},_syncScrollX:function(){var S=this._parentTbodyNode,U=this._bodyContainerNode,T;this._headerContainerNode.set("scrollLeft",this._bodyContainerNode.get("scrollLeft"));if(!this.get("height")&&(O.ie)){T=(U.get("scrollWidth")>U.get("offsetWidth"))?(S.get("parentNode").get("offsetHeight")+18)+"px":S.get("parentNode").get("offsetHeight")+"px";U.setStyle("height",T);}if(S.get("rows").length===0){this._parentMsgNode.get("parentNode").setStyle("width",this._parentTheadNode.get("parentNode").get("offsetWidth")+"px");}else{this._parentMsgNode.get("parentNode").setStyle("width","");}},_syncScrollOverhang:function(){var S=this._bodyContainerNode,T=1;if((S.get("scrollHeight")>S.get("clientHeight"))||(S.get("scrollWidth")>S.get("clientWidth"))){T=18;}this._setOverhangValue(T);},_setOverhangValue:function(T){var V=this.get("host"),X=V.get("columnset").get("definitions"),S=X.length,W=T+"px solid "+this.get("COLOR_COLUMNFILLER"),U=Q.all("#"+this._parentContainer.get("id")+" ."+L+" table thead th");U.item(S-1).setStyle("borderRight",W);}});E.namespace("Plugin").DataTableScroll=C;
},"@VERSION@",{requires:["plugin","datatable-base","stylesheet"]});