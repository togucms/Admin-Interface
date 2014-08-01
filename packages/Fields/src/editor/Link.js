Ext.define('Fields.editor.Link', {
	extend: 'Ext.form.field.Trigger',
	
	alias: 'widget.fields_editor_link',
	
	inject: ['bus', 'linkService'],
	
	requires: [
	    'Fields.controller.Base'       
	],
	
	controller: 'Fields.controller.Base',
	
	config: {
		bus: null
	},
	
	editable: false,
	validator : function(value) {
		return true;
	},
	
	isEqual : function(newVal, oldVal) {
		return newVal == oldVal;
	},
	
	valueToRaw : function(value) {
		var me = this;
		if(me.record && me.record.get('id') == value) {
			return me.record.get('url');
		}
		
		me.linkService.get(value, {
			scope : me,
		    failure: function(record, operation) {
		    },
		    success: function(record, operation) {
		    	this.record = record;
		    	this.setRawValue(record.get('url'));
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
	onTriggerClick: function() {
		var me = this;
		
		this.getBus().fireEvent('cmf.openapplication', 'urlChooser', {
			listeners : {
				urlselected : {
					fn : me.onLinkSelected,
					scope : me
				}		
			}
		});
	},
	onLinkSelected: function(record) {
		var me = this;
		me.record = record;
		me.setValue(record.get('id'));
	}
	
});
