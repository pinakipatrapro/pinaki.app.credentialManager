sap.ui.define(["sap/ui/test/Opa5"], function (Opa5) {
    "use strict";

    return Opa5.extend("pinaki.app.credentialManager.test.integration.arrangements.Startup", {
        iStartMyApp: function () {
            this.iStartMyUIComponent({
                componentConfig: {
                    name: "pinaki.app.credentialManager",
                    async: true,
                    manifest: true
                }
            });
        }
    });
});
