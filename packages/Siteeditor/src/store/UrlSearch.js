Ext.define('Siteeditor.store.UrlSearch', {
	extend : 'Ext.data.Store',
	
	requires : ['Siteeditor.model.UrlQuery'],
	
	model : 'Siteeditor.model.UrlQuery',
	proxy : {
		type : 'rest',
		url : '/backoffice/Url/search'
	}	
});
