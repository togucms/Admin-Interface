Ext.define('Shared.store.DefaultLinks', {
	extend : 'Ext.data.Store',

	requires : ['Shared.model.Link'],
	
	model : 'Shared.model.Link',
	
	autoLoad : true,
	
	proxy : {
		type : 'rest',
		url : '/backoffice/Url/defaultLinks',
		reader : {
			type : 'json'
		}
	}
});
