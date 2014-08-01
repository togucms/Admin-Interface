Ext.define('Images.view.DnDImageTable', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.cmf_images_dndimagetable',
	
	requires: [
	    'Ext.grid.plugin.DragDrop',
	    'Images.controller.DnDImageTable',
	    
	    'Images.controller.DnDImageTable'
	],
	
	inject : {
		store : 'imageTableStore'
	},

	controller : 'Images.controller.DnDImageTable',

	sortableColumns: false,
	
	simpleSelect : false,
	multiSelect : true,
	cls : 'cmf-dndimagetable',
	
	viewConfig: {
	    plugins: {
	        ddGroup: 'image-group',
	        ptype: 'gridviewdragdrop',
	        enableDrop: false
		}
    },
	
	columns : [{
		header : 'Preview',
		dataIndex : 'thumb',
		width : 60,
		renderer: function(value, metadata, record, rowIndex, colIndex, store, view) { 
			if(! record.preview) {
				record.preview = Ext.widget('image', {
                    renderTo: Ext.getBody(),
                    width: 60,
                    height: 40,
                    autoEl: 'div',
                    listeners : {
                    	render: function(component) {
                    		var img = component.getEl().down('img');
                    		
                    		img.dom.draggable = false;
                    		
                    		img.on('mousedown', function(e) {
                    			e.preventDefault();
                    		});

            				img.setWidth(record.get('thumbWidth'));
            				img.setHeight(record.get('thumbHeight'));

            				img.setStyle('margin-top', Math.floor((40 - record.get('thumbHeight')) / 2) + "px");
                    	}
                    }
                });
			}
			var id = Ext.id();
			Ext.defer(function () {
				var el = Ext.get(id);
				if(el) {
					record.preview.getEl().appendTo(el);
					record.preview.setSrc(record.get('preview'));
				}
			},10);
			return Ext.String.format('<div id="{0}"></div>', id);
		}
	}, {
		header : 'File name',
		dataIndex : 'file',
		width : 200,
		renderer: function(value, metadata, record, rowIndex, colIndex, store, view) { 
			return value.name;
		}		
	}, {
		header : 'File size',
		dataIndex : 'file',
		width : 80,
		renderer: function(value, metadata, record, rowIndex, colIndex, store, view) { 
			return Ext.util.Format.fileSize(value.size);
		}		
	}, {
		header : 'Progress',
		dataIndex : 'progress',
		flex : 1,
		renderer: function(value, metadata, record, rowIndex, colIndex, store, view) { 
			if(! record.progressbar) {
				record.progressbar = Ext.widget('progressbar', {
					animate: true,
	                value: 0,
	                renderTo: Ext.getBody(),
	                text : 'Drag to a folder'
	            }); 
			}
			var id = Ext.id();
			Ext.defer(function () {
				var el = Ext.get(id);
				if(el) {
					record.progressbar.getEl().appendTo(el);
					record.progressbar.setWidth(el.getWidth());
				}
			},10);
			return Ext.String.format('<div id="{0}"></div>', id);
        }
	}],

	dockedItems : [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
        {
        	itemId: 'uploadFiles',
        	text : 'Upload files...'
        },
        '->',
        {
        	itemId: 'clearCompleted',
            text: 'Clear completed'
        }, {
        	itemId: 'clearAll',
            text: 'Clear all'
        }]
    }]
    
    

});