sap.ui.define(["sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "pinaki/app/credentialManager/api/LocalStore"
], function (JSONModel, Device, LocalStorage) {
    "use strict";

    return {
        createDeviceModel: function () {
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            return oModel;
        }
    };
});
