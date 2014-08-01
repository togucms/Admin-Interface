Ext.define('Shared.overrides.Model', {
	override: 'Ext.data.Model',
	
	set: function(fieldName, newValue) {
		var modified = this.callParent(arguments); 
		
		if(modified) {
			var i=0,
				ln = modified.length, 
				single = (typeof fieldName == 'string');
			
			if(single) {
				this.fireEvent('modified', fieldName, newValue);
			} else {
				for(; i < ln; i++) {
					this.fireEvent('modified', modified[i], fieldName[modified[i]]);
				}
			}
		}
		return modified;
	},
	join: function(store) {
		this.callParent(arguments);
		this.fireEvent('join', this, store);
	},
	unjoin: function(store) {
		this.callParent(arguments);
		this.fireEvent('unjoin', this, store);
	}
})