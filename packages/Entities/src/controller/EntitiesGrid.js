Ext.define('Entities.controller.EntitiesGrid', {
	extend: 'Deft.mvc.ViewController',
	
	inject: ['bus'],
	
	config: {
		bus: null
	},

	control : {
		addEntityButton: {
			selector: '#addEntity',
			listeners: {
				click: 'onAddEntityClick'
			}
		},
		removeEntityButton: {
			selector: '#removeEntity',
			listeners: {
				click: 'onRemoveEntityClick'
			}
		},
		saveButton: {
			selector: '#save',
			listeners: {
				click: 'onSaveClick'
			}
		},
		gridView : {
			selector: 'gridview',
			listeners : {
				startdrag : 'onStartDrag',
				enddrag : 'onEndDrag',
				afterrender : 'onGridAfterRender'
			}
		},
		view: {
			listeners: {
				select: 'onSelect',
				edit: 'onEdit'
			},
			observe: {
				store: {
					datachanged: 'onDataChanged',
					update: 'onDataChanged'
				}
			}
		}
	},
	
	observe: {
		bus: {
			'entities.entitiesdetails.saveclick': 'onDetailsSaveClick'
		}
	},
	
	onStartDrag : function(view) {
		this.getBus().fireEvent('entities.startdrag', view);
	},
	
	onEndDrag : function(view) {
		this.getBus().fireEvent('entities.enddrag', view);
	},
	
	onAddEntityClick: function() {
		var me = this,
			view = me.getView(),
			rowEditing = view.getPlugin('rowEditing'),
			store = view.getStore();
		
		rowEditing.cancelEdit();
		store.insert(0, {
			id: ''
		});
		
		rowEditing.startEdit(0, 1);
	},
	
	onDetailsSaveClick: function() {
		var me = this,
			view = me.getView(),
			rowEditing = view.getPlugin('rowEditing');
			
		rowEditing.cancelEdit();
	},
	
	onSelect: function(grid, record, index, eOpts) {
		this.selectedIndex = index;
		this.getRemoveEntityButton().setDisabled(false);
		this.getBus().fireEvent('entities.entitiesgrid.select', record, index);
	},
	
	onRemoveEntityClick: function() {
		var me = this,
			view = me.getView(),
			rowEditing = view.getPlugin('rowEditing'),
			store = view.getStore(),
			selectionModel = view.getSelectionModel();

		rowEditing.cancelEdit();
		store.remove(selectionModel.getSelection());
		
	    if (store.getCount() > 0) {
	        selectionModel.select(Math.max(0, this.selectedIndex - 1));
	    }
	},
	
	onSaveClick: function() {
		var store = this.getView().getStore();
		
		store.sync();
	},
	
	onDataChanged: function(store, eOpts) {
		var modified = store.getModifiedRecords().length > 0 || store.getRemovedRecords().length > 0; 
		
		this.getSaveButton().setDisabled(! modified);
	},
	
	onEdit: function(editor, context, eOpts) {
		this.getBus().fireEvent('entities.entitiesgrid.edit', context.record);
	},
	
	onGridAfterRender: function(view) {
		var me = this;
		
		view.tip = Ext.create('Ext.tip.ToolTip', {
		    target: view.el,
		    delegate: view.cellSelector,
		    trackMouse: true,
		    renderTo: Ext.getBody(),
		    listeners: {
		        beforeshow: function updateTipBody(tip) {
					var column = view.getGridColumns()[tip.triggerElement.cellIndex],
		        		record = view.getRecord(tip.triggerElement.parentNode),
		        		value = record.get(column.dataIndex);
		        	
					return ! column.fireEvent('tooltip.beforeshow', tip, record, value);
		        }
		    }
		});
			
	}
});