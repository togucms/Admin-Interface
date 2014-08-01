Ext.define('Shared.service.Link', {
	
	require: ['Shared.model.Link'],

	constructor: function() {
		this.cache = {};
	},

	get: function(id, options) {
		options = options || {};
		
		if(this.cache[id]) {
			options.success && options.success.apply(options.scope || window, [this.cache[id]]);
		}
		
		Shared.model.Link.load(id, {
			scope : this,
		    failure: function(record, operation) {
				options.failure && options.failure.apply(options.scope || window, arguments);
		    },
		    success: function(record, operation) {
		    	this.cache[id] = record;
		    	options.success && options.success.apply(options.scope || window, arguments);
		    }
		});
	}
});