!function(n){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(e){return n(e,window,document)}):"object"==typeof exports?module.exports=function(e,t){return e=e||window,t&&t.fn.dataTable||(t=require("datatables.net")(e,t).$),n(t,e,e.document)}:n(jQuery,window,document)}(function(f,p,o,h){"use strict";var s=f.fn.dataTable,r=function(e,t){if(!s.versionCheck||!s.versionCheck("1.10.10"))throw"DataTables Responsive requires DataTables 1.10.10 or newer";this.s={dt:new s.Api(e),columns:[],current:[]},this.s.dt.settings()[0].responsive||(t&&"string"==typeof t.details?t.details={type:t.details}:t&&!1===t.details?t.details={type:!1}:t&&!0===t.details&&(t.details={type:"inline"}),this.c=f.extend(!0,{},r.defaults,s.defaults.responsive,t),(e.responsive=this)._constructor())};f.extend(r.prototype,{_constructor:function(){var i=this,r=this.s.dt,e=r.settings()[0],t=f(p).width();r.settings()[0]._responsive=this,f(p).on("resize.dtr orientationchange.dtr",s.util.throttle(function(){var e=f(p).width();e!==t&&(i._resize(),t=e)})),e.oApi._fnCallbackReg(e,"aoRowCreatedCallback",function(e,t,n){-1!==f.inArray(!1,i.s.current)&&f(">td, >th",e).each(function(e){var t=r.column.index("toData",e);!1===i.s.current[t]&&f(this).css("display","none")})}),r.on("destroy.dtr",function(){r.off(".dtr"),f(r.table().body()).off(".dtr"),f(p).off("resize.dtr orientationchange.dtr"),f.each(i.s.current,function(e,t){!1===t&&i._setColumnVis(e,!0)})}),this.c.breakpoints.sort(function(e,t){return e.width<t.width?1:e.width>t.width?-1:0}),this._classLogic(),this._resizeAuto();var n=this.c.details;!1!==n.type&&(i._detailsInit(),r.on("column-visibility.dtr",function(){i._timer&&clearTimeout(i._timer),i._timer=setTimeout(function(){i._timer=null,i._classLogic(),i._resizeAuto(),i._resize(),i._redrawChildren()},100)}),r.on("draw.dtr",function(){i._redrawChildren()}),f(r.table().node()).addClass("dtr-"+n.type)),r.on("column-reorder.dtr",function(e,t,n){i._classLogic(),i._resizeAuto(),i._resize()}),r.on("column-sizing.dtr",function(){i._resizeAuto(),i._resize()}),r.on("preXhr.dtr",function(){var e=[];r.rows().every(function(){this.child.isShown()&&e.push(this.id(!0))}),r.one("draw.dtr",function(){i._resizeAuto(),i._resize(),r.rows(e).every(function(){i._detailsDisplay(this,!1)})})}),r.on("init.dtr",function(e,t,n){i._resizeAuto(),i._resize(),f.inArray(!1,i.s.current)&&r.columns.adjust()}),this._resize()},_columnsVisiblity:function(n){var e,t,i=this.s.dt,r=this.s.columns,s=r.map(function(e,t){return{columnIdx:t,priority:e.priority}}).sort(function(e,t){return e.priority!==t.priority?e.priority-t.priority:e.columnIdx-t.columnIdx}),o=f.map(r,function(e,t){return!1===i.column(t).visible()?"not-visible":(!e.auto||null!==e.minWidth)&&(!0===e.auto?"-":-1!==f.inArray(n,e.includeIn))}),a=0;for(e=0,t=o.length;e<t;e++)!0===o[e]&&(a+=r[e].minWidth);var d=i.settings()[0].oScroll,l=d.sY||d.sX?d.iBarWidth:0,c=i.table().container().offsetWidth-l-a;for(e=0,t=o.length;e<t;e++)r[e].control&&(c-=r[e].minWidth);var u=!1;for(e=0,t=s.length;e<t;e++){var h=s[e].columnIdx;"-"===o[h]&&!r[h].control&&r[h].minWidth&&(u||c-r[h].minWidth<0?(u=!0,o[h]=!1):o[h]=!0,c-=r[h].minWidth)}var p=!1;for(e=0,t=r.length;e<t;e++)if(!r[e].control&&!r[e].never&&!1===o[e]){p=!0;break}for(e=0,t=r.length;e<t;e++)r[e].control&&(o[e]=p),"not-visible"===o[e]&&(o[e]=!1);return-1===f.inArray(!0,o)&&(o[0]=!0),o},_classLogic:function(){function a(e,t){var n=u[e].includeIn;-1===f.inArray(t,n)&&n.push(t)}function d(e,t,n,i){var r,s,o;if(n){if("max-"===n)for(r=l._find(t).width,s=0,o=c.length;s<o;s++)c[s].width<=r&&a(e,c[s].name);else if("min-"===n)for(r=l._find(t).width,s=0,o=c.length;s<o;s++)c[s].width>=r&&a(e,c[s].name);else if("not-"===n)for(s=0,o=c.length;s<o;s++)-1===c[s].name.indexOf(i)&&a(e,c[s].name)}else u[e].includeIn.push(t)}var l=this,c=this.c.breakpoints,s=this.s.dt,u=s.columns().eq(0).map(function(e){var t=this.column(e),n=t.header().className,i=s.settings()[0].aoColumns[e].responsivePriority;if(i===h){var r=f(t.header()).data("priority");i=r!==h?+r:1e4}return{className:n,includeIn:[],auto:!1,control:!1,never:!!n.match(/\bnever\b/),priority:i}});u.each(function(e,s){for(var t=e.className.split(" "),o=!1,n=0,i=t.length;n<i;n++){var a=f.trim(t[n]);if("all"===a)return o=!0,void(e.includeIn=f.map(c,function(e){return e.name}));if("none"===a||e.never)return void(o=!0);if("control"===a)return o=!0,void(e.control=!0);f.each(c,function(e,t){var n=t.name.split("-"),i=new RegExp("(min\\-|max\\-|not\\-)?("+n[0]+")(\\-[_a-zA-Z0-9])?"),r=a.match(i);r&&(o=!0,r[2]===n[0]&&r[3]==="-"+n[1]?d(s,t.name,r[1],r[2]+r[3]):r[2]!==n[0]||r[3]||d(s,t.name,r[1],r[2]))})}o||(e.auto=!0)}),this.s.columns=u},_detailsDisplay:function(e,t){var n=this,i=this.s.dt,r=this.c.details;if(r&&!1!==r.type){var s=r.display(e,t,function(){return r.renderer(i,e[0],n._detailsObj(e[0]))});!0!==s&&!1!==s||f(i.table().node()).triggerHandler("responsive-display.dt",[i,e,s,t])}},_detailsInit:function(){var i=this,r=this.s.dt,e=this.c.details;"inline"===e.type&&(e.target="td:first-child, th:first-child"),r.on("draw.dtr",function(){i._tabIndexes()}),i._tabIndexes(),f(r.table().body()).on("keyup.dtr","td, th",function(e){13===e.keyCode&&f(this).data("dtr-keyboard")&&f(this).click()});var s=e.target,t="string"==typeof s?s:"td, th";f(r.table().body()).on("click.dtr mousedown.dtr mouseup.dtr",t,function(e){if(f(r.table().node()).hasClass("collapsed")&&-1!==f.inArray(f(this).closest("tr").get(0),r.rows().nodes().toArray())){if("number"==typeof s){var t=s<0?r.columns().eq(0).length+s:s;if(r.cell(this).index().column!==t)return}var n=r.row(f(this).closest("tr"));"click"===e.type?i._detailsDisplay(n,!1):"mousedown"===e.type?f(this).css("outline","none"):"mouseup"===e.type&&f(this).blur().css("outline","")}})},_detailsObj:function(n){var i=this,r=this.s.dt;return f.map(this.s.columns,function(e,t){if(!e.never&&!e.control)return{title:r.settings()[0].aoColumns[t].sTitle,data:r.cell(n,t).render(i.c.orthogonal),hidden:r.column(t).visible()&&!i.s.current[t],columnIndex:t,rowIndex:n}})},_find:function(e){for(var t=this.c.breakpoints,n=0,i=t.length;n<i;n++)if(t[n].name===e)return t[n]},_redrawChildren:function(){var n=this,i=this.s.dt;i.rows({page:"current"}).iterator("row",function(e,t){i.row(t);n._detailsDisplay(i.row(t),!0)})},_resize:function(){var e,t,n=this,i=this.s.dt,r=f(p).width(),s=this.c.breakpoints,o=s[0].name,a=this.s.columns,d=this.s.current.slice();for(e=s.length-1;0<=e;e--)if(r<=s[e].width){o=s[e].name;break}var l=this._columnsVisiblity(o);this.s.current=l;var c=!1;for(e=0,t=a.length;e<t;e++)if(!1===l[e]&&!a[e].never&&!a[e].control&&!1==!i.column(e).visible()){c=!0;break}f(i.table().node()).toggleClass("collapsed",c);var u=!1,h=0;i.columns().eq(0).each(function(e,t){!0===l[t]&&h++,l[t]!==d[t]&&(u=!0,n._setColumnVis(e,l[t]))}),u&&(this._redrawChildren(),f(i.table().node()).trigger("responsive-resize.dt",[i,this.s.current]),0===i.page.info().recordsDisplay&&f("td",i.table().body()).eq(0).attr("colspan",h))},_resizeAuto:function(){var n=this.s.dt,i=this.s.columns;if(this.c.auto&&-1!==f.inArray(!0,f.map(i,function(e){return e.auto}))){f.isEmptyObject(u)||f.each(u,function(e){var t=e.split("-");c(n,+t[0],+t[1])});n.table().node().offsetWidth,n.columns;var e=n.table().node().cloneNode(!1),t=f(n.table().header().cloneNode(!1)).appendTo(e),r=f(n.table().body()).clone(!1,!1).empty().appendTo(e),s=n.columns().header().filter(function(e){return n.column(e).visible()}).to$().clone(!1).css("display","table-cell").css("min-width",0);f(r).append(f(n.rows({page:"current"}).nodes()).clone(!1)).find("th, td").css("display","");var o=n.table().footer();if(o){var a=f(o.cloneNode(!1)).appendTo(e),d=n.columns().footer().filter(function(e){return n.column(e).visible()}).to$().clone(!1).css("display","table-cell");f("<tr/>").append(d).appendTo(a)}f("<tr/>").append(s).appendTo(t),"inline"===this.c.details.type&&f(e).addClass("dtr-inline collapsed"),f(e).find("[name]").removeAttr("name"),f(e).css("position","relative");var l=f("<div/>").css({width:1,height:1,overflow:"hidden",clear:"both"}).append(e);l.insertBefore(n.table().node()),s.each(function(e){var t=n.column.index("fromVisible",e);i[t].minWidth=this.offsetWidth||0}),l.remove()}},_setColumnVis:function(e,t){var n=this.s.dt,i=t?"":"none";f(n.column(e).header()).css("display",i),f(n.column(e).footer()).css("display",i),n.column(e).nodes().to$().css("display",i),f.isEmptyObject(u)||n.cells(null,e).indexes().each(function(e){c(n,e.row,e.column)})},_tabIndexes:function(){var e=this.s.dt,t=e.cells({page:"current"}).nodes().to$(),n=e.settings()[0],i=this.c.details.target;t.filter("[data-dtr-keyboard]").removeData("[data-dtr-keyboard]"),"number"==typeof i?e.cells(null,i,{page:"current"}).nodes().to$().attr("tabIndex",n.iTabIndex).data("dtr-keyboard",1):("td:first-child, th:first-child"===i&&(i=">td:first-child, >th:first-child"),f(i,e.rows({page:"current"}).nodes()).attr("tabIndex",n.iTabIndex).data("dtr-keyboard",1))}}),r.breakpoints=[{name:"desktop",width:1/0},{name:"tablet-l",width:1024},{name:"tablet-p",width:768},{name:"mobile-l",width:480},{name:"mobile-p",width:320}],r.display={childRow:function(e,t,n){return t?f(e.node()).hasClass("parent")?(e.child(n(),"child").show(),!0):void 0:e.child.isShown()?(e.child(!1),f(e.node()).removeClass("parent"),!1):(e.child(n(),"child").show(),f(e.node()).addClass("parent"),!0)},childRowImmediate:function(e,t,n){return!t&&e.child.isShown()||!e.responsive.hasHidden()?(e.child(!1),f(e.node()).removeClass("parent"),!1):(e.child(n(),"child").show(),f(e.node()).addClass("parent"),!0)},modal:function(s){return function(e,t,n){if(t)f("div.dtr-modal-content").empty().append(n());else{var i=function(){r.remove(),f(o).off("keypress.dtr")},r=f('<div class="dtr-modal"/>').append(f('<div class="dtr-modal-display"/>').append(f('<div class="dtr-modal-content"/>').append(n())).append(f('<div class="dtr-modal-close">&times;</div>').click(function(){i()}))).append(f('<div class="dtr-modal-background"/>').click(function(){i()})).appendTo("body");f(o).on("keyup.dtr",function(e){27===e.keyCode&&(e.stopPropagation(),i())})}s&&s.header&&f("div.dtr-modal-content").prepend("<h2>"+s.header(e)+"</h2>")}}};var u={};function c(e,t,n){var i=t+"-"+n;if(u[i]){for(var r=e.cell(t,n).node(),s=u[i][0].parentNode.childNodes,o=[],a=0,d=s.length;a<d;a++)o.push(s[a]);for(var l=0,c=o.length;l<c;l++)r.appendChild(o[l]);u[i]=h}}r.renderer={listHiddenNodes:function(){return function(n,e,t){var i=f('<ul data-dtr-index="'+e+'" class="dtr-details"/>'),r=!1;f.each(t,function(e,t){t.hidden&&(f('<li data-dtr-index="'+t.columnIndex+'" data-dt-row="'+t.rowIndex+'" data-dt-column="'+t.columnIndex+'"><span class="dtr-title">'+t.title+"</span> </li>").append(f('<span class="dtr-data"/>').append(function(e,t,n){var i=t+"-"+n;if(u[i])return u[i];for(var r=[],s=e.cell(t,n).node().childNodes,o=0,a=s.length;o<a;o++)r.push(s[o]);return u[i]=r}(n,t.rowIndex,t.columnIndex))).appendTo(i),r=!0)});return!!r&&i}},listHidden:function(){return function(e,t,n){var i=f.map(n,function(e){return e.hidden?'<li data-dtr-index="'+e.columnIndex+'" data-dt-row="'+e.rowIndex+'" data-dt-column="'+e.columnIndex+'"><span class="dtr-title">'+e.title+'</span> <span class="dtr-data">'+e.data+"</span></li>":""}).join("");return!!i&&f('<ul data-dtr-index="'+t+'" class="dtr-details"/>').append(i)}},tableAll:function(r){return r=f.extend({tableClass:""},r),function(e,t,n){var i=f.map(n,function(e){return'<tr data-dt-row="'+e.rowIndex+'" data-dt-column="'+e.columnIndex+'"><td>'+e.title+":</td> <td>"+e.data+"</td></tr>"}).join("");return f('<table class="'+r.tableClass+' dtr-details" width="100%"/>').append(i)}}},r.defaults={breakpoints:r.breakpoints,auto:!0,details:{display:r.display.childRow,renderer:r.renderer.listHidden(),target:0,type:"inline"},orthogonal:"display"};var e=f.fn.dataTable.Api;return e.register("responsive()",function(){return this}),e.register("responsive.index()",function(e){return{column:(e=f(e)).data("dtr-index"),row:e.parent().data("dtr-index")}}),e.register("responsive.rebuild()",function(){return this.iterator("table",function(e){e._responsive&&e._responsive._classLogic()})}),e.register("responsive.recalc()",function(){return this.iterator("table",function(e){e._responsive&&(e._responsive._resizeAuto(),e._responsive._resize())})}),e.register("responsive.hasHidden()",function(){var e=this.context[0];return!!e._responsive&&-1!==f.inArray(!1,e._responsive.s.current)}),e.registerPlural("columns().responsiveHidden()","column().responsiveHidden()",function(){return this.iterator("column",function(e,t){return!!e._responsive&&e._responsive.s.current[t]},1)}),r.version="2.2.3",f.fn.dataTable.Responsive=r,f.fn.DataTable.Responsive=r,f(o).on("preInit.dt.dtr",function(e,t,n){if("dt"===e.namespace&&(f(t.nTable).hasClass("responsive")||f(t.nTable).hasClass("dt-responsive")||t.oInit.responsive||s.defaults.responsive)){var i=t.oInit.responsive;!1!==i&&new r(t,f.isPlainObject(i)?i:{})}}),r});
