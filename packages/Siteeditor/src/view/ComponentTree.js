Ext.define('Siteeditor.view.ComponentTree', {
	alias: 'widget.cmf_siteeditor_componenttree',
	extend: 'Ext.tree.Panel',
	
	inject: {
		store: 'siteeditor.modelTree'
	},

	requires: [
		'Ext.util.Point',
		'Ext.tree.plugin.TreeViewDragDrop',
		"Siteeditor.controller.ComponentTree"
	],
	
	controller : "Siteeditor.controller.ComponentTree",
	
	title: 'Components',
	
    rootVisible: true,
    
	cls: 'siteeditor-componenttree',
    
    viewConfig: {
	    plugins: { ptype: 'treeviewdragdrop', ddGroup: 'componentTreeDD' }
	},
	
	useArrows: true,
    
    root : {
    	text: 'loading'
    },
	tools: [{
        type: 'plus',
		tooltip: 'Add',
		disabled: true,
    	itemId : 'add-component'
    },{
        type: 'minus',
		tooltip: 'Remove',
		disabled: true,
    	itemId: 'remove-component'
    }]
});
