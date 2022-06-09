sap.ui.define([
    "sap/dm/dme/podfoundation/control/PropertyEditor"
], function (PropertyEditor) {
    "use strict";

    var oPropertyEditor = PropertyEditor.extend("<%= namespace %>.asynchExecutionPluginTemplate.builder.PropertyEditor", {
        constructor: function (sId, mSettings) {
            PropertyEditor.apply(this, arguments);
            this.setI18nKeyPrefix("asynchExecutionPluginTemplate.");
            this.setResourceBundleName("<%= namespace %>.asynchExecutionPluginTemplate.i18n.builder");
            this.setPluginResourceBundleName("<%= namespace %>.asynchExecutionPluginTemplate.i18n.i18n");
        },
        getTitle: function () {
            return this.getI18nText("title");
        },

        hasConfigurationProperties: function () {
            return false;
        }

    });

    return oPropertyEditor;
});