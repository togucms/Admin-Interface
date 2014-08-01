Ext.define('Fields.editor.Image', {
	extend: 'Ext.form.field.Trigger',
	
	alias: 'widget.fields_editor_image',
	
	requires: [
	    'Fields.controller.Base'       
	],
	
	controller: 'Fields.controller.Base',
	
	inject: ['bus', 'imageService'],
	
	config: {
		bus: null
	},

	editable: false,
	
	initComponent: function() {
		this.callParent(arguments);
		this.model.on('image.dblclick.' + this.itemId, this.onImageDblClick, this);
	},
	
	afterRender: function() {
		this.callParent(arguments);
		this.inputEl.on('click', this.onTriggerClick, this);
	},
	
	isEqual : function(newVal, oldVal) {
		return newVal == oldVal;
	},
	
	getValue: function() {
		var value = this.callParent(arguments); 
		if(value == "") {
			return;
		}
		return value;
	},
	
	valueToRaw : function(value) {
		var me = this, name="";
		if(me.record && me.record.get('id') == value) {
			return me.record.getReference().get('name');
		}
		me.imageService.get(value, {
		    scope: me,
		    failure: function(record, operation) {
		    },
		    success: function(record, operation) {
		    	this.record = record;
		    	name = record.getReference().get('name');
		    	this.setRawValue(name);
		    }
		});
		return name;
	},
	
	rawToValue : function(rawValue) {
		var me = this, 
			record = me.record;
			
		if(! record) {
			return "";
		}	
			
		return record.get('id');
	},
	
	onImageDblClick: function(updater, event, element) {
		this.onTriggerClick();
	},
	
	onTriggerClick: function(e) {
		var me = this;

		this.getBus().fireEvent('cmf.openapplication', 'imageChooser', {
			handler : {
				fn : me.onImageSelected,
				scope : me
			}
		});
	},
	onImageSelected: function(record) {
		var me = this;
		me.record = record;
		me.setValue(record.get('id'));
	}
	
});
