Ext.define('Cmf.view.Main', {
    extend: 'Ext.container.Container',
    
	requires : [
		'Cmf.view.MainPanel',
		'Cmf.view.TaskBar',
		'Ext.layout.container.Border',
		'Cmf.controller.Main'
	],
	
    xtype: 'cmf-main',
    
    controller: "Cmf.controller.Main", 

    layout: {
        type: 'border'
    },

    items: [{
    	id: 'mainpanel',
		region: 'center',
		xtype : 'panel',
		layout: 'fit'
	}, {
		region : 'north',
		xtype: 'cmf-taskbar'
	}]	
});