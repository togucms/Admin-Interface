Ext.define('Fields.editor.Reference', {
	extend: 'Ext.form.field.Base',
	
	alias: 'widget.fields_editor_reference',
	
	inject: {
		bus: 'bus',
		modelManager: 'entities_modelManager'
	},

	requires: [
	    'Fields.controller.Base'       
	],
	
	controller: 'Fields.controller.Base',
	
	config: {
		bus: null
	},
	
	inputType: 'hidden',
	
	editable: false,
	
	constructor: function(config) {
		if(config.context == "siteeditor") {
			delete config.fieldLabel;
		}
		this.callParent(arguments);
	},
		
	afterRender: function() {
		var me = this;
		
		me.callParent(arguments);
		
		if(this.context == "siteeditor") {
			return;
		}
		
		me.on('resize', me.onFieldResize, me);
		
		me.treeStore = Ext.create('Ext.data.TreeStore', {
		    root: {
		        expanded: true
		    },
		    fields: [
                { name : 'text', type: 'string', persist: false },
                { name: 'record', type: 'auto', persist: false }      
		    ]
		});
		
		me.treeStore.on('append', me.updateField, me);
		me.treeStore.on('insert', me.updateField, me);
		me.treeStore.on('move', me.updateField, me);
		me.treeStore.on('remove', me.updateField, me);
		
		me.treePanel = Ext.create('Ext.tree.Panel', {
			store: me.treeStore,
		    rootVisible: false,
		    viewConfig: {
			    plugins: { ptype: 'treeviewdragdrop', ddGroup: 'entities-group-' + me.entityId }
			}			
		});
		
		me.panel = Ext.create('Ext.panel.Panel', {
			layout: 'fit',
			border: true,
		    width: 300,
		    height: 200,
		    renderTo: me.bodyEl,
		    title: 'Drag to reorder',
		    tools: [{
		    	type: 'plus',
		    	tooltip: "Add",
		    	callback: me.addEntityClick,
		    	scope: me
		    }, {
		    	type: 'minus',
		    	tooltip: "Remove",
		    	callback: me.removeEntity,
		    	scope: me
		    }],
			items: [ me.treePanel ]
		});
	},

	onFieldResize: function(component, width, height, oldWidth, oldHeight, eOpts) {
		this.panel.setWidth(width - this.labelWidth - this.labelPad);
	},
	
	addEntityClick: function(panel, button) {
		var menu = Ext.create('Ext.menu.Menu', {
		    renderTo: Ext.getBody(),
		    items: this.addMenu,
		    listeners: {
				click: function(menu, item, e, eOpts) {
					item.model && this.addEntity(item.model);
				},
				scope: this
			}
		});
		menu.showBy(button);
	},

	addEntity: function(entity) {
		this.getBus().fireEvent('cmf.openapplication', 'entityChooser', {
			entityName: entity,
			listeners : {
				entityselected: {
					fn : this.onEntitySelected,
					scope : this
				}
			}
		});
	},
	
	/*
	 * TODO: change this! use primary key value
	 */
	getNodeText: function(record) {
		return record.get('id') + " - " + record.get('text');
	},

	onEntitySelected: function(record) {
		this.treeStore.getRootNode().appendChild({ id: record.get('id'), text: this.getNodeText(record), leaf: true});
	},
	
	removeEntity: function() {
		var selected = this.treePanel.getSelectionModel().getSelection()[0];
		if(! selected) {
			return;
		}
		selected.remove(true);
	},

	buildTree: function(records) {
		if(! this.treeStore) {
			return;
		}
		
		var rootNode = this.treeStore.getRootNode(),
			i = 0, ln = records.length;
			
		rootNode.removeAll(true);
		for(; i < ln; i++) {
			rootNode.appendChild({
				id: records[i].id,
				leaf: true,
				record: records[i],
				text: records[i].id
			});
			this.modelManager.load(records[i].type, records[i].id, {
			    scope: this,
			    failure: function(record, operation) {
			    },
			    success: function(record, operation) {
			    	var node = this.treeStore.getRootNode().findChild('id', record.get('id'));
			    	node.set('text', this.getNodeText(record));
			    }
			});		
		}
	},
	
	updateField: function() {
		var rootNode = this.treeStore.getRootNode(),
			childList = [];
		
		rootNode.eachChild(function(child) {
			childList.push(child.get('record'));
		}, this);
		
		this.setRawValue(childList);
	},


	isEqual: function(newVal, oldVal) {
		if(newVal.length != oldVal) {
			return false;
		}
		
		var i = 0, ln = newVal.length;
		for(; i < ln; i++) {
			if(newVal[i].id != oldVal[i].id || newVal[i].type != oldVal[i].type) {
				return false;
			}
		}
		
		return true;
	},

	valueToRaw: Ext.identityFn,

	setRawValue: function(value) {
		this.rawValue = value;
		return value;
	},

	getRawValue: function() {
		return this.rawValue;
	},
	
	rawToValue : function(rawValue) {
		this.buildTree(rawValue);
		return this.callParent(arguments);
	}
});
