Ext.define('Siteeditor.store.ModelTree', {
	extend: 'Ext.data.TreeStore',
	
	requires: [
	    'Siteeditor.model.modelTree.Model'
	],
	
	proxy: 'memory',
	
	model: 'Siteeditor.model.modelTree.Model'
});