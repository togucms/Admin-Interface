Ext.define('Entities.proxy.Entity', {
	extend: 'Ext.data.proxy.Rest',
	
	require: [
        'Shared.data.reader.CachedJson'
	],
	
	alias: 'proxy.entity',

	url: '../../backoffice/admin/entities',
	
	appendId: true,
	batchActions: false,
	
	reader: {
	    type: 'cachedjson',
	    root: 'records'
	}
});