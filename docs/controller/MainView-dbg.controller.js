sap.ui.define([
    "pinaki/app/credentialManager/controller/BaseController",
    "sap/ui/model/Filter"
], function (Controller,Filter) {
    "use strict";

    return Controller.extend("pinaki.app.credentialManager.controller.MainView", {
        onAddCredentialpress: function () {
            let aCreds = this.getView().getModel().getProperty('/aCreds');
            let template = JSON.parse(JSON.stringify(this.getView().getModel().getProperty('/crendentialTemplate')));
            template.lastChanged = new Date();
            aCreds = [...aCreds,template];
            this.getView().getModel().setProperty('/aCreds',aCreds);
            this.getView().getModel().updateBindings();
            this.getView().getModel().firePropertyChange();
        },
        toggleEditMode : function(oEvent){
            oEvent.getSource().getBindingContext().getObject().editMode = !oEvent.getSource().getBindingContext().getObject().editMode;
            oEvent.getSource().getBindingContext().getObject().lastChanged = new Date();
            oEvent.getSource().getModel().updateBindings();
            oEvent.getSource().getModel().firePropertyChange();
        },
        onDeleteCredPress : function(oEvent){
            var path = oEvent.getSource().getBindingContext().getPath();
            var index =  path.split('/').pop();
            let aCreds = this.getView().getModel().getProperty('/aCreds');
            aCreds.splice(index,1);
            this.getView().getModel().setProperty('/aCreds',aCreds);
            oEvent.getSource().getModel().updateBindings();
            oEvent.getSource().getModel().firePropertyChange();
            
        },
        onCredSearch : function(oEvent){
            var list  = this.getView().byId('credList');
            list.getBinding('items').filter(new Filter({
                filters: [
                    new Filter({
                      path: 'name',
                      operator: "Contains",
                      value1: oEvent.getParameter('newValue')
                    }),
                    new Filter({
                      path: 'username',
                      operator: "Contains",
                      value1: oEvent.getParameter('newValue')
                    })
                  ],
                  and: false
            }))
        },
        onAfterRendering : function(){
            this.loadFromLocal();
        },
        changeTheme : function(oEvent){
            sap.ui.getCore().getConfiguration().getTheme() == "sap_fiori_3_dark"? 
            sap.ui.getCore().applyTheme('sap_fiori_3') : sap.ui.getCore().applyTheme('sap_fiori_3_dark');
        }
    });
});
