Ext.define('Fields.grid.Image', {
	
	extend: 'Ext.grid.column.Column',
	
	alias: ['widget.fields_grid_image'],
	
	
	initComponent: function() {
		this.callParent(arguments);
		
		this.tipTemplate = new Ext.Template(this.tipTemplate);
		this.tipTemplate.compile();
		
		this.on('tooltip.beforeshow', this.onTooltipBeforeShow, this);
	},
	
	tipTemplate: '<img src="{src}" class="fields-grid-image-tooltip"/>',
	
	onTooltipBeforeShow: function(tip, record, value) {
		var imageService = Deft.Injector.resolve('imageService');
		
		imageService.get(value, {
			scope : this,
		    failure: function(record, operation) {
		    },
		    success: function(imageRecord, operation) {
		    	var big = imageRecord.getBig();
				tip.update(this.tipTemplate.apply({
			    	src : big.get('src')
			    }));
				tip.setWidth(big.get('width') + 12);
			    tip.setHeight(big.get('height') + 12);
		    }
		});
    
    	return false;
	},

	renderer: function(value) {
		var id = Ext.id(),
			imageService = Deft.Injector.resolve('imageService');

		Ext.defer(function () {
			imageService.get(value, {
				scope : this,
			    failure: function(record, operation) {
			    },
			    success: function(record, operation) {
					var el = Ext.get(id);
					if(el) {
						el.setHTML(record.getReference().get('name'));
					}
			    }
			});
		},10, this);
		
		return Ext.String.format('<div id="{0}"></div>', id);
	}


});