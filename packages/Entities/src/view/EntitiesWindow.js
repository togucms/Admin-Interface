Ext.define('Entities.view.EntitiesWindow', {
	extend: 'Shared.view.Window',
	
	requires: [
		'Entities.controller.EntitiesWindow',
		
		'Ext.tab.Panel',
		'Entities.view.EntitiesPanel',
		'Entities.view.ContentTypesList'
	],
	
	controller : 'Entities.controller.EntitiesWindow',

	alias : 'widget.entities_entitieswindow',
	title : 'Entities',
	
	width : '90%',
	height : '90%',
	
//    iconCls: 'cmf-imagebrowser-icon',
	animCollapse : false,
	
	pinnable: true,
	
	layout: 'fit',
	
	items: [{
		 xtype: 'tabpanel',
		 itemId : 'tabPanel',
		 activeTab: 0,
		 items: [{
			 xtype: 'cmf_entities_contenttypeslist'
		 }]
	}]
});
