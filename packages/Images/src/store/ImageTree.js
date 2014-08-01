Ext.define('Images.store.ImageTree', {
	extend : 'Ext.data.TreeStore',
	
	fields : [
		{ name : 'text', type: 'string' },
		{ name : 'imageId', type : 'int' }
	],

	autoSync : false,
	
	proxy : {
		type : 'rest',
		appendId: true,
		batchActions: false,
		url : '/backoffice/images/galleries',
		reader: {
			type: 'json',
			root: 'records'
		}
	},
	root : {
		text : 'Images',
		id : '/media/root',
		expanded : false
	},
	folderSort : true,
	sorters : [{
		property : 'text',
		direction : 'ASC'
	}]
});
