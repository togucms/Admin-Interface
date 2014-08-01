Ext.define('Siteeditor.model.Route', {
	requires: 'Ext.data.Model',
	
	extend: 'Ext.data.Model',

	fields: [
		{ name : 'id', type: 'auto' },
		{ name : 'forbidden', type: 'bool', defaultValue: false },
		{ name : 'available', type: 'bool', defaultValue: false }
	],
	
	proxy : {
		type : 'rest',
		appendId : true,
		url : '/backoffice/admin/isurlavailables'
	}

});
