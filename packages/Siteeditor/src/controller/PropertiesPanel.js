Ext.define('Siteeditor.controller.PropertiesPanel', {
	extend: 'Deft.mvc.ViewController',
	
	inject: {
		contentTypeStore : 'entities_contentTypes',
		bus: 'bus'
	},
	
	config : {
		bus : null,
		contentTypeStore: null
	},

	observe : {
		bus : {
			'siteeditor.model.select' : 'onModelSelected',
			'siteeditor.model.deselect' : 'onModelDeselected'
		}
	},

	getPropertiesPanelFields: function() {
		var me = this,
			contentType = me.contentTypeStore.getById(me.model.type),
			fields = contentType.get('fields'),
			i = 0, 
			ln = fields.length,
			field,
			items = [];

		for(; i < ln; i++) {
			field = fields[i];
			
			field.form && items.push(Ext.apply({
				itemId: field.id,
				fieldLabel : field.label,
				name: field.id,
				entityId: me.entityName,
				params: field,
				model: me.model,
				context: 'siteeditor',
				listeners: {
					afterRender: me.onFieldAfterRender,
					scope: me
				}
			}, field.form));
		}
		
		return items;
	},
	
	onFieldAfterRender: function(field) {
		if(field.labelEl) {
			field.labelEl.on('mouseenter', this.onFieldMouseEnter, this, field)
			field.labelEl.on('mouseleave', this.onFieldMouseLeave, this, field)
		}
	},
	
	onFieldMouseEnter: function(event, label, field) {
		this.model && this.model.fireEvent('highlight.' + field.name);
	},
	
	onFieldMouseLeave: function(event, label, field) {
		this.model && this.model.fireEvent('lowlight.' + field.name);
	},

	onModelFieldMouseEnter: function(variable) {
		var field = this.getView().down('#' + variable);
		field && field.labelEl && field.labelEl.addCls('highlited');
	},
	
	onModelFieldMouseLeave: function(variable) {
		var field = this.getView().down('#' + variable);
		field && field.labelEl && field.labelEl.removeCls('highlited');
	},

	onModelSelected : function(node) {
		var me = this,
			model = node.get('modelInstance'),
			propertiesPanel = me.getView();

		me.unbindNode();
		propertiesPanel.removeAll();
			
		me.node = node;
		me.model = model;
		
		model.fireEvent('edit');
		
		model.on('field.mouseenter', me.onModelFieldMouseEnter, me);
		model.on('field.mouseleave', me.onModelFieldMouseLeave, me);
		
		propertiesPanel.add(me.getPropertiesPanelFields());

		if(node.extModel) {
			propertiesPanel.loadRecord(node.extModel);
			node.extModel.on('modified', me.onExtModelModified, me);
		}
		
		propertiesPanel.doLayout();
	},
	
	unbindNode: function() {
		var me = this;
		if(! me.node) {
			return;
		}
		me.node.extModel && me.node.extModel.un('modified', me.onExtModelModified, me);
		
		me.model.fireEvent('endedit');
		me.model.un('field.mouseenter', me.onModelFieldMouseEnter, me);
		me.model.un('field.mouseleave', me.onModelFieldMouseLeave, me);
		
		me.model = undefined;
		me.node = undefined;
	},
	
	onExtModelModified: function() {
		this.getView().loadRecord(this.node.extModel);
	},
	
	onModelDeselected : function(node) {
		var me = this,
			model = node.get('modelInstance'),
			propertiesPanel = me.getView();
		
		me.unbindNode();
		propertiesPanel.removeAll();
	}
});
