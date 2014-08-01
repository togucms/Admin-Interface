Ext.define('Entities.store.ContentTypes', {
    extend: 'Ext.data.Store',

    model: 'Entities.model.ContentTypes',

    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        url: '../../backoffice/models',
        reader: {
            type: 'json',
            root: 'models'
        }
    },
    
    constructor: function() {
    	this.callParent(arguments);
    	this.entityModels = {};
	},
    
	remoteFilter: false,
	filters: [{
		property: "hiddenInGrid",
		value: false
	}]
});