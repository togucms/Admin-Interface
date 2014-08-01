Ext.define('Cmf.model.ApplicationGroups', {
	requires: ['Cmf.model.ApplicationList'],
	
	extend: 'Ext.data.Model',
	
	fields: [
		{ name : 'id', type: 'int' },
		{ name : 'name', type: 'string' },
		{ name : 'icon', type: 'string' }
	],
	hasMany: { model: 'Cmf.model.ApplicationList', name: 'applications', associationKey: 'applications' }
});
