Ext.define('Images.view.ImageBrowser', {
	extend: 'Shared.view.Window',
	
	requires: [
		'Images.view.DraggableImageView',
		'Ext.form.field.*',
		'Images.controller.ImageBrowser',
		
		'Images.controller.ImageBrowser'
	],
	
	controller : 'Images.controller.ImageBrowser',

	alias : 'widget.cmf_images_imagebrowser',
	title : 'Images',
	width : 800,
	height : 400,
	animCollapse : false,
	
    iconCls: 'cmf-icon',
	glyph:'xf03e@FontAwesome',
	
	pinnable: true,
	
	layout: 'border',

	items : [{
		width: 200,
		region : 'west',
		split: true,
		xtype : 'cmf_images_imagetree'
	},{
	    tbar : [{
		    	itemId: 'openUploaderButton',
		    	text: 'Upload...',
		    	glyph: 'xf093@FontAwesome',
		    	padding: '3 10'
		    },
	    	'->',
	    	{
	    		xtype: 'container',
	    		width: 220,
	    		height: 25,
	    		cls: 'cmf-search-field',
	    		items: [{
		    		itemId: 'searchField',
		    		enableKeyEvents : true,
		    		xtype : 'trigger',
		    		width: 180,
		    		onTriggerClick: function() {
		    			this.setValue('');
		    		},
		    		triggerCls: 'cmf-reset-button'
	    		}]
	    	}],
        region : 'center',
        listeners: {
        	resize: function(panel, width, height) {
        		var size = panel.body.getSize(true);
        		panel.items.getAt(0).setSize(size.width, size.height);
        	}
        },
	    autoScroll: true,
		items : [{
			xtype : 'cmf_images_draggableimageview'
		}]
	}]
});
