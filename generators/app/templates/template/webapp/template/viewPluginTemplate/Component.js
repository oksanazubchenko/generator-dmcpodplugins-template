sap.ui.define([
    "sap/dm/dme/podfoundation/component/production/ProductionUIComponent"
], function(ProductionUIComponent) {
    "use strict";

    /**
     * 
     */
    var Component = ProductionUIComponent.extend("<%= namespace %>.viewPluginTemplate.Component", {
        metadata : {
            manifest : "json"
        }
    });

    return Component;
});