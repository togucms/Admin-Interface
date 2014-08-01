Ext.define('Siteeditor.store.SectionTree', {
	extend : 'Ext.data.TreeStore',
	
	requires: [
	    'Siteeditor.model.SectionTree'
	],
	
	model: 'Siteeditor.model.SectionTree',
	
//	autoSync: true,
	
	root : {
		text : 'Website',
		id : '/data/rootModel',
		type: 'rootModel',
		expanded : true
	}	
});
