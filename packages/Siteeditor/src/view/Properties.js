Ext.define('Siteeditor.view.Properties', {
	alias: 'widget.cmf_siteeditor_properties',
	extend: 'Ext.form.Panel',
    requires: [
		"Siteeditor.controller.PropertiesPanel"
	],
	
	controller : "Siteeditor.controller.PropertiesPanel",
	
	waitMsgTarget: true,
    title: 'Properties',
    bodyPadding: 5,
    width: 350,

	defaultType: 'textfield',
	
	cls: 'cmf-properties-panel',

	fieldDefaults: {
		anchor: '100%',
	    msgTarget: 'side',
	    labelWidth: 75
	},
    
    autoScroll: true
});
