Ext.define('Entities.view.EntitiesPanel', {
	extend: 'Ext.panel.Panel',
	
	layout: 'border',
	
	requires: [
	    'Entities.controller.EntitiesPanel',
	    
	    'Entities.view.EntitiesGrid'
	],

	xtype: 'entities_entitiespanel',

	closable: true,
	
	initComponent: function() {
		Ext.apply(this, {
			items: [{
				entityName: this.entityName,
				xtype: 'entities_entitiesgrid',
				itemId: 'grid',
				region: 'center'
			}, {
				entityName: this.entityName,
				xtype: 'entities_entitiesdetails',
				itemId: 'details',
				width: '30%',
			    split: true,
				collapsible: true,
				animCollapse: true,
				region: 'east'
			}]
		});
		
		this.callParent(arguments);
	}
});