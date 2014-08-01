Ext.define('Siteeditor.view.UrlChooser', {
	extend : 'Ext.window.Window',
	requires : [
	  'Siteeditor.controller.UrlChooser',
	  
	  'Siteeditor.controller.UrlChooser'
	],
	            
	controller : 'Siteeditor.controller.UrlChooser',

	modal : true,
	
	alias : 'widget.siteeditor_urlchooser',
	layout: {
	    type: 'vbox',
	    align: 'stretch'
	},

	constrain: true,
	title : 'Choose the url',
	
	items : [{
		width: 250,
		height : 350,
		xtype : 'cmf_siteeditor_sectiontree'
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