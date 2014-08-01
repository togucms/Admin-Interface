Ext.define('Shared.util.TreeColumn', {
	override : 'Ext.tree.Column',
	
	getEditorId : function(record) {
		return this.getItemId();
	}

});