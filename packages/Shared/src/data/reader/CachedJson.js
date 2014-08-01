Ext.define('Shared.data.reader.CachedJson', {
	extend: 'Ext.data.reader.Json',
	
	alias: 'reader.cachedjson',
	
	constructor: function() {
		this.callParent(arguments);
		this.cache = {};
	},

    extractData: function(root) {
        var data = this.loadCachedData(root);
        return this.callParent([data]);
    },

    getModelInstance: function(node, modelName) {
    	var me = this,
	    	Model = me.model,
	    	convertedValues,
	    	record,
    		id = me.getId(node);
    	
    	if(! me.cache[modelName][id]) {
		    // Create a record with an empty data object.
		    // Populate that data object by extracting and converting field values from raw data.
		    // Must pass the ID to use because we pass no data for the constructor to pluck an ID from
		    record = new Model(undefined, me.getId(node), node, convertedValues = {});
		
		    // If the server did not include an id in the response data, the Model constructor will mark the record as phantom.
		    // We  need to set phantom to false here because records created from a server response using a reader by definition are not phantom records.
		    record.phantom = false;
		
		    // Use generated function to extract all fields at once
		    me.convertRecordData(convertedValues, node, record);
		
		    if (me.implicitIncludes && record.associations.length) {
		        me.readAssociated(record, node);
		    }

		    record.on('unjoin', me.onRecordUnjoin, me, {
		    	modelName: modelName,
		    	id: id
		    });

    		me.cache[modelName][id] = record;
    	}
    	
    	return me.cache[modelName][id];
    },
    
    onRecordUnjoin: function(record, store, eOpts) {
    	if(record.locked || record.stores.length > 0) {
    		return;
    	}
    	
		delete this.cache[eOpts.modelName][eOpts.id];
		record.un('unjoin', this.onRecordUnjoin, this);
	},

    loadCachedData: function(data) {
		var me = this,
			modelName = me.model.getName(),
			i = 0, ln = data.length;
		
		me.cache[modelName] = me.cache[modelName] || {};
		
		for(; i < ln; i++) {
			data[i] = me.getModelInstance(data[i], modelName);
		}
		
		return data;
	}
})