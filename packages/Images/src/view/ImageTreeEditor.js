Ext.define('Images.view.ImageTreeEditor', {
	extend : 'Images.view.ImageTree',

	requires : [
		'Shared.util.TreeEditing',
		'Images.controller.ImageTreeEditor',
		
		'Images.controller.ImageTreeEditor'
	],

	controller : 'Images.controller.ImageTreeEditor',
	
	alias : 'widget.cmf_images_imagetreeeditor',

	viewConfig : {
		plugins : {
	        ddGroup: 'image-group',
			ptype : 'treeviewdragdrop',
			appendOnly : true
		}
	},
	tools : [{
		itemId: 'addButton',
		type : 'plus',
		tooltip : 'Add',
		disabled : true
	}, {
		itemId: 'removeButton',
		type : 'minus',
		tooltip : 'Remove',
		disabled : true
	}],

	hideHeaders: true,
	
    columns: [{
	    dataIndex: 'text',
	    editor: {
	        allowBlank: false,
	        xtype: 'textfield'
	    },
	    margin: '0 2 0 0',
	    flex: 1,
	    xtype: 'treecolumn'
	}],
	
	constructor: function() {
		this.plugins = [Ext.create('Shared.util.TreeEditing' , {clicksToEdit: 2, pluginId : 'treeEditing'})];
		this.callParent(arguments);
	}


	
	/* TODO: implement multi select and keyboard navigation */

});
