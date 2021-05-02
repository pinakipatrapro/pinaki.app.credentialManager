sap.ui.define(["pinaki/app/credentialManager/controller/BaseController"], function (Controller) {
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

        onAfterRendering : function(){
            this.loadFromLocal();
        }
    });
});
