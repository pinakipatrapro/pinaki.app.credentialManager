/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
    "use strict";

    sap.ui.require(["pinaki/app/credentialManager/test/integration/AllJourneys"], function () {
        QUnit.start();
    });
});
