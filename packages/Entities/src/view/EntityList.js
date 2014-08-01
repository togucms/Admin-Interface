Ext.define('Entities.view.EntityList', {
	extend : 'Ext.grid.Panel',
	
	xtype: 'entities_entitylist',
	
	requires: [
	    'Ext.ux.grid.FiltersFeature',
	    'Ext.toolbar.Paging'
	    
//	    'Entities.controller.EntitiesGrid'
	],
	
//	controller: 'Entities.controller.EntitiesGrid',
	
	inject: {
		store : 'entities_entityStore',
		contentTypeStore : 'entities_contentTypes'
	},

	features: [{
		ftype: 'filters'
	}],
	

/*
 * TODO: create association in the model and get the fields by the association, not injecting the store
 */
	formatColumns: function() {
		var me = this,
			contentType = me.contentTypeStore.getById(me.entityName),
			fields = contentType.get('fields'),
			i = 0, 
			ln = fields.length,
			field,
			columns = [{
				"text" : "Id",
				"dataIndex": "id"
			}];
		
		for(; i < ln; i++) {
			field = fields[i];
			
			if(field.gridColumn) {
				columns.push(Ext.apply({
					text : field.label,
					dataIndex: field.name
				}, field.gridColumn));
			}
		}
		
		return columns;
	},

	initComponent: function() {
		var me = this;

    	Ext.apply(me, {
    		columns: me.formatColumns(),
    		bbar: Ext.create('Ext.PagingToolbar', {
    		    store: this.store,
    		    displayInfo: true,
    		    displayMsg: 'Displaying entities {0} - {1} of {2}',
    		    emptyMsg: "No entities to display"
    		})
    	});
    		
		me.callParent(arguments);
	}

});