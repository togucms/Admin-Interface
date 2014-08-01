Ext.define('Entities.view.ContentTypesList', {
	extend : 'Ext.grid.Panel',
	
	xtype: 'cmf_entities_contenttypeslist',

    requires: [
        'Ext.selection.RowModel',
        
        'Entities.controller.ContentTypesList'
    ],
    
    inject : {
		store: 'entities_contentTypes'
	},

	controller: 'Entities.controller.ContentTypesList',

    layout: {
        type: 'fit'
    },
    
    title: 'Content Types',
    
    selType: 'rowmodel',
    
	columns: [{
	    xtype: 'gridcolumn',
	    dataIndex: 'id',
	    text: 'Id',
	    width: 150
	},{
	    xtype: 'gridcolumn',
		dataIndex: 'label',
		text: 'Name',
		width: 150
	},{
	    xtype: 'gridcolumn',
	    dataIndex: 'description',
	    text: 'Description',
	    flex: 1
	}]
	
});