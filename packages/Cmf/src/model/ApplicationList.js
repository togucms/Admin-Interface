Ext.define('Cmf.model.ApplicationList', {
	extend: 'Ext.data.Model',
	fields: [
		{ name : 'id', type: 'string' },
		{ name : 'name', type: 'string' },
		{ name : 'path', type: 'string' },
		{ name : 'class', type: 'string' },
		{ name : 'icon', type: 'string' },
		{ name : 'method', type : 'string' },
		{ name: 'hidden', type : 'boolean' }
	],
    belongsTo: 'Cmf.model.ApplicationGroups'
});
