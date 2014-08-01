Ext.define('Cmf.store.ApplicationGroups', {
	extend : 'Ext.data.Store',
	
	requires : [
	     'Cmf.model.ApplicationGroups',
	     'Ext.data.reader.Json'
	],
	
	model : 'Cmf.model.ApplicationGroups',
	
	proxy : {
		type : 'ajax',
		url : '/backoffice/applications',
		reader : {
			type : 'json',
			root : 'groups'
		}
	}
})
