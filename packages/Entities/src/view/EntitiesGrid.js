Ext.define('Entities.view.EntitiesGrid', {
	extend : 'Ext.grid.Panel',
	
	xtype: 'entities_entitiesgrid',
	
	requires: [
	    'Fields.filters.*',
	    'Ext.ux.grid.FiltersFeature',
	    'Ext.toolbar.Paging',
	    
	    'Entities.controller.EntitiesGrid'
	],
	
	controller: 'Entities.controller.EntitiesGrid',
	
	inject: {
		store : 'entities_entityStore',
		contentTypeStore : 'entities_contentTypes'
	},

	features: [{
		ftype: 'filters',
		encode: true,
        paramPrefix: 'gridFilter'
	}],
	
    viewConfig: {
        plugins: {
            ddGroup: 'entities-group',
            ptype: 'gridviewdragdrop',
            enableDrop: false
        }
    },
    
    enableDragDrop: true,

	tbar: [{
		text: "Add Entity",
		//iconCls: '',
		itemId: 'addEntity'
	},{
		text: "Remove Entity",
		//iconCls: '',
		itemId: 'removeEntity',
		disabled: true
	}, '->',
	{
		text: "Save changes",
		//iconCls: '',
		itemId: 'save'
	}],

	formatColumns: function() {
		var me = this,
			contentType = me.contentTypeStore.getById(me.entityName),
			fields = contentType.get('fields'),
			i = 0, 
			ln = fields.length,
			field,
			editor,
			columns = [{
				"text" : "Id",
				"dataIndex": "id",
				"width": 150
			}];
		
		for(; i < ln; i++) {
			field = fields[i];
			
			if(field.gridColumn) {
				editor = Ext.Object.merge({},field.form);
				delete editor.fieldLabel;
				columns.push(Ext.apply({
					text : field.label,
					dataIndex: field.id,
					editor: editor 
				}, field.gridColumn));
			}
		}

		return columns;
	},

	initComponent: function() {
		var me = this;

    	Ext.apply(me, {
    		columns: me.formatColumns(),
    		plugins: [Ext.create('Ext.grid.plugin.RowEditing', {
    			pluginId: 'rowEditing',
    	        clicksToMoveEditor: 1,
	            autoCancel: false
	        })],
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