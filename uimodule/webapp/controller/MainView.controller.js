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
            var expectedState = !oEvent.getSource().getBindingContext().getObject().editMode;
            this.getView().getModel().getProperty('/aCreds').forEach((e)=>{
                e.editMode = false;
            });
            oEvent.getSource().getBindingContext().getObject().editMode = expectedState;
            oEvent.getSource().getBindingContext().getObject().lastChanged = new Date();
            oEvent.getSource().getModel().updateBindings();
            oEvent.getSource().getModel().firePropertyChange();
            oEvent.getSource().getModel().refresh();
        },
        onDeleteCredPress : function(oEvent){
            var path = oEvent.getSource().getBindingContext().getPath();
            var index =  path.split('/').pop();
            let aCreds = this.getView().getModel().getProperty('/aCreds');
            aCreds.splice(index,1);
            this.getView().getModel().setProperty('/aCreds',aCreds);
            oEvent.getSource().getModel().updateBindings();
            oEvent.getSource().getModel().firePropertyChange();
            sap.m.MessageToast.show("Credentials Deleted Successfully", {
                duration: 10000, 
            });
            
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
            sap.m.MessageToast.show("Tap on an item to view, edit", {
                duration: 10000, 
            });
        },
        changeTheme : function(oEvent){
            sap.ui.getCore().getConfiguration().getTheme() == "sap_fiori_3_dark"? 
            sap.ui.getCore().applyTheme('sap_fiori_3') : sap.ui.getCore().applyTheme('sap_fiori_3_dark');
        },
        reload : function(){
            location.reload();
        },
        downloadCSV : function(){
            downloadCSVFromJson(`CredentialManager.csv`,this.getView().getModel().getProperty('/aCreds'))
        }
    });
});
