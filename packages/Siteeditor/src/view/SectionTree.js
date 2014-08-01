Ext.define('Siteeditor.view.SectionTree', {
	extend : 'Ext.tree.Panel',

	inject : {
		store : 'siteeditor.sectionTreeStore'
	},

	alias : 'widget.cmf_siteeditor_sectiontree',
	
	hideHeaders: true,
	
	useArrows: true,
	
    columns: [{
	    dataIndex: 'text',
	    typeIndex : 'leaf',
	    editors: {
    		'true': {
				allowBlank: false,
				xtype: 'cmf_urlfield'
			},
			'false' : {
				allowBlank: false,
				xtype: 'textfield'
			}
    	},
	    margin: '0 2 0 0',
	    flex: 1,
	    xtype: 'cmf_typedtreecolumn'
	}]

});
