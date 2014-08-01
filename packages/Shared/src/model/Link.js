Ext.define('Shared.model.Link', {
	requires: [
      'Ext.data.Model',
      'Ext.data.reader.Json'
	],
	
	extend: 'Ext.data.Model',

	fields: [
		{ name : 'id', type: 'auto' },
		{ name : 'url', type: 'string' }
	],
	
	proxy : {
		type : 'rest',
		url : '/Backoffice/Url/link'
	}

});
