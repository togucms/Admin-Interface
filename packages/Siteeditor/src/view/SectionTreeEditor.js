Ext.define('Siteeditor.view.SectionTreeEditor', {
	extend : 'Siteeditor.view.SectionTree',

	requires : [
		'Shared.util.TreeEditing',
		'Siteeditor.view.UrlField',
		'Shared.util.TypedTreeColumn',
		'Ext.tree.plugin.TreeViewDragDrop',
		"Siteeditor.controller.ControllerTreeEditor"
	],
	
	controller : "Siteeditor.controller.ControllerTreeEditor",

	alias : 'widget.cmf_siteeditor_sectiontreeeditor',
	
    viewConfig: {
	    plugins: { ptype: 'treeviewdragdrop', ddGroup: 'controller-group' }
	},
	
	tools : [{
		itemId : 'addButton',
		type : 'plus',
		tooltip : 'Add',
		disabled : true
	}, {
		itemId : 'removeButton',
		type : 'minus',
		tooltip : 'Remove',
		disabled : true
	},{
		margin: '0 0 0 6',
		itemId : 'goToPageButton',
		type : 'next',
		tooltip : 'Go to the page',
		disabled : true
	}],

	constructor: function() {
		this.plugins = [ Ext.create('Shared.util.TreeEditing' , {clicksToEdit: 2, pluginId : 'treeEditing'}) ];

		this.callParent(arguments);
	}

});
