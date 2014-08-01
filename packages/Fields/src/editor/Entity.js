Ext.define('Fields.editor.Entity', {
	extend: 'Ext.form.field.Trigger',
	
	alias: 'widget.fields_editor_entity',
	
	requires: [
	    'Fields.controller.Base'       
	],
	
	controller: 'Fields.controller.Base',
	
	inject: {
		bus: 'bus',
		modelManager: 'entities_modelManager'
	},

	config: {
		bus: null
	},

	editable: false,
	
	isEqual : function(newVal, oldVal) {
		return newVal == oldVal;
	},
	
	valueToRaw : function(value) {
		var me = this;
		if(me.record && me.record.get('id') == value) {
			return me.record.get('id');
//			return me.record.get('name');
		}
		me.modelManager.load(this.entityId, value, {
		    scope: me,
		    failure: function(record, operation) {
		    },
		    success: function(record, operation) {
		    	this.record = record;
		    	this.setRawValue(record.get('id'));
		    }
		});			
		return "";
	},
	
	rawToValue : function(rawValue) {
		var me = this, 
			record = me.record;
			
		if(! record) {
			return "";
		}	
			
		return record.get('id');
	},
	
	onTriggerClick: function(e) {
		var me = this;

		this.getBus().fireEvent('cmf.openapplication', 'entityChooser', {
			entityName: this.entityId,
			listeners : {
				entityselected: {
					fn : me.onEntitySelected,
					scope : me
				}
			}
		});
	},
	onEntitySelected: function(record) {
		var me = this;
		me.record = record;
		me.setValue(record.get('id'));
	}
});
