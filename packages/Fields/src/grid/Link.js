Ext.define('Fields.grid.Link', {
	
	extend: 'Ext.grid.column.Column',
	
	requires : [
		'Shared.model.Link'
	],
	
	alias: ['widget.fields_grid_link'],
	
	renderer: function(value) {
		var id = Ext.id(),
			linkService = Deft.Injector.resolve('linkService');
		
		Ext.defer(function () {
			linkService.get(value, {
				scope : this,
			    failure: function(record, operation) {
			    },
			    success: function(record, operation) {
					var el = Ext.get(id);
					if(el) {
						el.setHTML(record.get('url'));
					}
			    }
			});
		},10, this);
		
		return Ext.String.format('<div id="{0}"></div>', id);
	}


});