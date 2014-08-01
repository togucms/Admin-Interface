Ext.define('Shared.util.TypedTreeColumn', {
	extend : 'Ext.tree.Column',
	alias : 'widget.cmf_typedtreecolumn',
	
	getEditorId : function(record) {
		return this.getItemId() + '-' + record.get(this.typeIndex);
	},

	getEditor : function(record) {
		return Ext.ComponentManager.create(this.editors[record.get(this.typeIndex)], this.defaultFieldXType);
	}

});