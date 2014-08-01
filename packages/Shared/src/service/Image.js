Ext.define('Shared.service.Image', {
	
	require: ['Shared.model.Image'],
	
	constructor: function() {
		this.cache = {};
	},

	get: function(id, options) {
		options = options || {};
		
		if(id === undefined) {
			return;
		}
		if(this.cache[id]) {
			options.success && options.success.apply(options.scope || window, [this.cache[id]]);
			return;
		}
		Shared.model.Image.load(id, {
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