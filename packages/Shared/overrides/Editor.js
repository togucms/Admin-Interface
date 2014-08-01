Ext.define('Shared.overrides.Editor', {
	override : 'Ext.Editor',
	
	startEdit : function() {
		delete this.field.editCompleted;
		delete this.field.editCanceled;
		
		if(this.editingPlugin && this.editingPlugin.activeRecord) {
			this.field.activeRecord = this.editingPlugin.activeRecord;
		}
		
		this.callParent(arguments);
	},

	completeEdit : function() {
		if(this.editing) {
			this.field.editCompleted = true;
		}
		this.callParent(arguments);
		this.editing && delete this.field.activeRecord;
	},

	cancelEdit : function() {
		if(this.editing) {
			this.field.editCanceled = true;
		}
		this.callParent(arguments);
		this.editing && delete this.field.activeRecord;
	}

})