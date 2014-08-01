Ext.define('Siteeditor.view.UrlCreator', {
	extend : 'Ext.window.Window',
	
	requires : [
        'Siteeditor.controller.UrlCreator',
	    'Siteeditor.view.UrlField',
	    
	    'Siteeditor.controller.UrlCreator'
	],


	controller : 'Siteeditor.controller.UrlCreator',

	
	modal: true,
	
    resizable: false,
    constrain: true,
    
	title : 'URL',
	
	initComponent: function() {
		this.addEvents('urlvalidated');
		this.callParent(arguments);
	},

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

	items : [{
		margin: 10,
		xtype : 'cmf_urlfield',
		labelAlign: 'top',
		value : '/',
		width: 300,
		fieldLabel: 'Please choose an URL for the new page'
	}],
	
	buttons : [{
		disabled : true,
		text : 'OK',
		itemId : 'okButton'
	}, {
		text: 'Cancel',
		itemId : 'cancelButton'
	}]
	
});