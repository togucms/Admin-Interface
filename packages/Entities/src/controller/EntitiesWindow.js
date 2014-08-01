Ext.define('Entities.controller.EntitiesWindow', {
	extend: 'Deft.mvc.ViewController',
	
	requires: [
	    "Entities.store.Entities"
	],

	control : {
		tabPanel: true
	},
	
	inject: ['bus'],
	
	config: {
		bus: null
	},
	
	observe: {
		bus: {
			'entities.contenttypeslist.opencontenttype': 'openContentType'
		}
	},
	
	openContentType: function(name, label, description) {
		var me = this,
			tabPanel = me.getTabPanel(),
			newTab = tabPanel.queryById(name);
		
		if(! newTab) {
			newTab = tabPanel.add({
				itemId : name,
				xtype: 'entities_entitiespanel',
				title: label || name,
				tooltip: description,
				entityName: name
			});
		}
		
		tabPanel.setActiveTab(newTab);
	}

});