Ext.define('Entities.view.EntityChooser', {
	extend : 'Ext.window.Window',
	
	requires : [
	  'Entities.controller.EntityChooser'
	],
	            
	controller : 'Entities.controller.EntityChooser',

	modal : true,
	
	alias : 'widget.entities_entitychooser',
	
	layout: 'fit',
	
	constrain: true,
	
	width: '70%',
	height : '70%',
	
	title : 'Choose the Entity',
	
	initComponent: function() {
		var me = this;

    	Ext.apply(me, {
    		items : [{
    			itemId: 'entitiesList',
    			xtype : 'entities_entitylist',
    			entityName: me.entityName
    		}]
    	});
    	
    	this.callParent(arguments);
	},
    	
    	
	buttons : [{
		disabled : true,
		text : 'OK',
		itemId : 'okButton'
	}, {
		text: 'Cancel',
		itemId : 'cancelButton'
	}]
	

});