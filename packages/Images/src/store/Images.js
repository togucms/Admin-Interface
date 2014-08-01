Ext.define('Images.store.Images', {
	extend : 'Ext.data.Store',
	
	requires : ['Images.model.ImageQuery'],
	
	model : 'Images.model.ImageQuery',
	proxy : {
		type : 'rest',
		url : '/backoffice/images/query'
	},
	
	getRange: function(start, end) {
		var me = this,
			collector = new Ext.util.MixedCollection();;
			
		me.data.each(function(record) {
			collector.addAll(record.images().getRange());
		});
		
		return collector.getRange(start, end);
	}
})
