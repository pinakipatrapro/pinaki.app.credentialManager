//@ui5-bundle pinaki/app/credentialManager/Component-preload.js
sap.ui.require.preload({
	"pinaki/app/credentialManager/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","pinaki/app/credentialManager/model/models"],function(e,i,t){"use strict";return e.extend("pinaki.app.credentialManager.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(t.createDeviceModel(),"device")}})});
},
	"pinaki/app/credentialManager/api/LocalStore.js":function(){(function(e,t){if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports){exports=module.exports=t(e,exports)}}else if(typeof define==="function"&&define.amd){define(["exports"],function(r){e.Lockr=t(e,r)})}else{e.Lockr=t(e,{})}})(this,function(e,t){"use strict";if(!Array.prototype.indexOf){Array.prototype.indexOf=function(e){var t=this.length>>>0;var r=Number(arguments[1])||0;r=r<0?Math.ceil(r):Math.floor(r);if(r<0)r+=t;for(;r<t;r++){if(r in this&&this[r]===e)return r}return-1}}t.prefix="";t._getPrefixedKey=function(e,t){t=t||{};if(t.noPrefix){return e}else{return this.prefix+e}};t.set=function(e,t,r){var o=this._getPrefixedKey(e,r);try{localStorage.setItem(o,JSON.stringify({data:t}))}catch(r){if(console)console.warn("Lockr didn't successfully save the '{"+e+": "+t+"}' pair, because the localStorage is full.")}};t.get=function(e,t,r){var o=this._getPrefixedKey(e,r),n;try{n=JSON.parse(localStorage.getItem(o))}catch(e){if(localStorage[o]){n={data:localStorage.getItem(o)}}else{n=null}}if(!n){return t}else if(typeof n==="object"&&typeof n.data!=="undefined"){return n.data}};t.sadd=function(e,r,o){var n=this._getPrefixedKey(e,o),i;var f=t.smembers(e);if(f.indexOf(r)>-1){return null}try{f.push(r);i=JSON.stringify({data:f});localStorage.setItem(n,i)}catch(t){console.log(t);if(console)console.warn("Lockr didn't successfully add the "+r+" to "+e+" set, because the localStorage is full.")}};t.smembers=function(e,t){var r=this._getPrefixedKey(e,t),o;try{o=JSON.parse(localStorage.getItem(r))}catch(e){o=null}return o&&o.data?o.data:[]};t.sismember=function(e,r,o){return t.smembers(e).indexOf(r)>-1};t.keys=function(){var e=[];var r=Object.keys(localStorage);if(t.prefix.length===0){return r}r.forEach(function(r){if(r.indexOf(t.prefix)!==-1){e.push(r.replace(t.prefix,""))}});return e};t.getAll=function(e){var r=t.keys();if(e){return r.reduce(function(e,r){var o={};o[r]=t.get(r);e.push(o);return e},[])}return r.map(function(e){return t.get(e)})};t.srem=function(e,r,o){var n=this._getPrefixedKey(e,o),i,f;var a=t.smembers(e,r);f=a.indexOf(r);if(f>-1)a.splice(f,1);i=JSON.stringify({data:a});try{localStorage.setItem(n,i)}catch(t){if(console)console.warn("Lockr couldn't remove the "+r+" from the set "+e)}};t.rm=function(e){var t=this._getPrefixedKey(e);localStorage.removeItem(t)};t.flush=function(){if(t.prefix.length){t.keys().forEach(function(e){localStorage.removeItem(t._getPrefixedKey(e))})}else{localStorage.clear()}};return t});
},
	"pinaki/app/credentialManager/controller/BaseController.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/core/UIComponent","pinaki/app/credentialManager/model/formatter"],function(e,r,a,t){"use strict";return e.extend("pinaki.app.credentialManager.controller.BaseController",{loadFromLocal:function(){this.getView().getModel().attachPropertyChange(function(e){Lockr.set("pinaki.app.credentialManager",e.getSource().getProperty("/aCreds"))});if(!Lockr.get("pinaki.app.credentialManager")){return}this.getView().getModel().setProperty("/aCreds",Lockr.get("pinaki.app.credentialManager"))}})});
},
	"pinaki/app/credentialManager/controller/MainView.controller.js":function(){sap.ui.define(["pinaki/app/credentialManager/controller/BaseController","sap/ui/model/Filter"],function(e,t){"use strict";return e.extend("pinaki.app.credentialManager.controller.MainView",{onAddCredentialpress:function(){let e=this.getView().getModel().getProperty("/aCreds");let t=JSON.parse(JSON.stringify(this.getView().getModel().getProperty("/crendentialTemplate")));t.lastChanged=new Date;e=[...e,t];this.getView().getModel().setProperty("/aCreds",e);this.getView().getModel().updateBindings();this.getView().getModel().firePropertyChange()},toggleEditMode:function(e){e.getSource().getBindingContext().getObject().editMode=!e.getSource().getBindingContext().getObject().editMode;e.getSource().getBindingContext().getObject().lastChanged=new Date;e.getSource().getModel().updateBindings();e.getSource().getModel().firePropertyChange()},onDeleteCredPress:function(e){var t=e.getSource().getBindingContext().getPath();var i=t.split("/").pop();let r=this.getView().getModel().getProperty("/aCreds");r.splice(i,1);this.getView().getModel().setProperty("/aCreds",r);e.getSource().getModel().updateBindings();e.getSource().getModel().firePropertyChange()},onCredSearch:function(e){var i=this.getView().byId("credList");i.getBinding("items").filter(new t({filters:[new t({path:"name",operator:"Contains",value1:e.getParameter("newValue")}),new t({path:"username",operator:"Contains",value1:e.getParameter("newValue")})],and:false}))},onAfterRendering:function(){this.loadFromLocal()},changeTheme:function(e){sap.ui.getCore().getConfiguration().getTheme()=="sap_fiori_3_dark"?sap.ui.getCore().applyTheme("sap_fiori_3"):sap.ui.getCore().applyTheme("sap_fiori_3_dark")}})});
},
	"pinaki/app/credentialManager/fragment/Info.fragment.xml":'<core:FragmentDefinition\r\n   xmlns="sap.m"\r\n   xmlns:core="sap.ui.core" ><Dialog  class="sapUiSizeCompact"\r\n        resizable= "true"\r\n        stretch= "true"\r\n        title="Add Credential "><Input placeholder="Credential Name" value="{/crendentialTemplate/name}" class="sapUiTinyMargin sapUiForceWidthAuto"/></Dialog></core:FragmentDefinition>',
	"pinaki/app/credentialManager/i18n/i18n.properties":'title=pinaki.app.credentialManager\nappTitle=pinaki.app.credentialManager\nappDescription=App Description\n',
	"pinaki/app/credentialManager/i18n/i18n_en.properties":'title=Credential Manager\nappTitle=Credential Manager\nappDescription=Credential Manager\n',
	"pinaki/app/credentialManager/manifest.json":'{"_version":"1.21.0","sap.app":{"id":"pinaki.app.credentialManager","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"dataSources":{"JSONModelData":{"uri":"model/Constant.json","type":"JSON"}},"title":"{{appTitle}}","description":"{{appDescription}}"},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"rootView":{"viewName":"pinaki.app.credentialManager.view.MainView","type":"XML","async":true,"id":"idAppControl"},"dependencies":{"minUI5Version":"1.60.0","libs":{"sap.ui.core":{},"sap.m":{},"sap.ui.layout":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"":{"type":"sap.ui.model.json.JSONModel","dataSource":"JSONModelData"},"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"pinaki.app.credentialManager.i18n.i18n"}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"pinaki.app.credentialManager.view","controlId":"idAppControl","controlAggregation":"pages","async":true},"routes":[{"name":"RouteMainView","pattern":"RouteMainView","target":["TargetMainView"]}],"targets":{"TargetMainView":{"viewType":"XML","viewLevel":1,"viewId":"idAppControl","viewName":"MainView"}}}}}',
	"pinaki/app/credentialManager/model/formatter.js":function(){sap.ui.define([],function(){"use strict";return{}});
},
	"pinaki/app/credentialManager/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device","pinaki/app/credentialManager/api/LocalStore"],function(e,i,n){"use strict";return{createDeviceModel:function(){var n=new e(i);n.setDefaultBindingMode("OneWay");return n}}});
},
	"pinaki/app/credentialManager/view/MainView.view.xml":' <mvc:View controllerName="pinaki.app.credentialManager.controller.MainView"\n  displayBlock="true"\n  xmlns="sap.m"\n  xmlns:mvc="sap.ui.core.mvc"><App id="idAppControl" ><pages><Page title="{i18n>title}"><Toolbar design="Transparent" style="Clear"><ToolbarSpacer/><Button type="Transparent" icon="sap-icon://lightbulb" press="changeTheme" tooltip="Toggle Dark mode"/></Toolbar><List class="sapUiSmallMargin sapUiForceWidthAuto sapUiSizeCompact" backgroundDesign="Translucent" id="credList"\n          items="{\n            path:\'/aCreds\',\n            sorter : {\n              path : \'lastChanged\',\n              descending  : true\n            }\n          }"\n         ><headerToolbar><OverflowToolbar><Title text="My Credentials" titleStyle="H2"/><ToolbarSpacer/><SearchField width="30%" liveChange="onCredSearch"/><Button type="Accept" icon="sap-icon://add" press="onAddCredentialpress"/></OverflowToolbar></headerToolbar><items><CustomListItem><HBox justifyContent="SpaceBetween" class="sapUiTinyMargin"><VBox width="70%"><Label text="{name}" visible="{=!${editMode}}"/><Input value="{name}" placeholder="Credential Name" visible="{editMode}"/><Input value="{username}" placeholder="User Name" visible="{editMode}"/><Input value="{password}" placeholder="Credential" visible="{editMode}"/><Text  text="{username} | {password}" visible="{=!${editMode}}"/></VBox><HBox><Button type="Transparent" icon="{=${editMode}?\'sap-icon://save\':\'sap-icon://edit\'}" press="toggleEditMode"/><Button type="Reject" icon="sap-icon://delete" press="onDeleteCredPress"/></HBox></HBox></CustomListItem></items></List></Page></pages></App></mvc:View>'
});
