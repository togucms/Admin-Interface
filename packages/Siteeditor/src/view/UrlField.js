Ext.define('Siteeditor.view.UrlField', {
	extend : "Ext.form.field.Text",
	alias : 'widget.cmf_urlfield',
	
	requires : [
        'Siteeditor.model.Route'
	],
	
	regex : /^\/(?:(?!\/\/|\.\.).)*$/,
	
	regexText : "The URL must begin with / and can't contain \/\/ or ..", 
		
	enableKeyEvents: true,
	stripCharsRe : /([^a-zA-Z0-9._\-\/])/,
	allowBlank : false,
	
	errorMessage : 'The URL {0} has been already assigned!',
	
	isValid  : function() {
		var me = this, fieldValid = me.callParent();
		
		if(me.editCanceled || ! fieldValid) {
			return false;
		}
		Siteeditor.model.Route.load(me.getRawValue(), {
			success: function(record, operation) {
				var me = this,
					valid = record.get('available'), 
					errorMessage, context;
					
				if(operation.activeRecord) {
					valid = valid || record.get('id') == operation.activeRecord.get('id')
				}
				this.fireEndEdit(valid, operation);
				
				if(me.getRawValue() != operation.text) {
					if(operation.commitValue) {
						me.fireEvent('urlValidated', me, operation.text, valid);
					}
					return;
				}
				
				me.fireEvent('urlValid', me, operation.text, valid);
				operation.commitValue && me.fireEvent('urlValidated', me, operation.text, valid);
				
				if(valid) {
					me.clearInvalid();
					return;
				}
				
				errorMessage = Ext.String.format(me.errorMessage, operation.text);
				me.markInvalid(errorMessage);
				if(operation.commitValue) {
					Ext.MessageBox.show({
						title: 'Error',
						msg: errorMessage,
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.ERROR
				    });
				}
			},
			scope : me,
			activeRecord : me.activeRecord,
			commitValue : me.editCompleted,
			text : me.getRawValue()
		});

		return false;
	},
	fireEndEdit: function(valid, operation) {
		if(! valid || ! operation.commitValue) {
			return;
		}
		var me = this, context;
		operation.activeRecord && operation.activeRecord.set('text', operation.text);
		if(me.ownerCt && me.ownerCt.editingPlugin) {
			context = me.ownerCt.editingPlugin.context;
			context.view.fireEvent('edit', me.ownerCt.editingPlugin, context);
		}
	}
})