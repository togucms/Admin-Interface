Ext.define('Images.controller.ImageBrowser',{
	extend: 'Deft.mvc.ViewController',
	
	control: {
		searchField : {
			selector : '#searchField',
			listeners : {
				keydown : {
					fn : 'onSearchKeyDown'
				}
			}
		},
		imageTree : {
			selector : 'cmf_images_imagetree',
			listeners : {
				select : {
					fn : 'onTreeSelect'
				}
			}
		},
		openUploaderButton: {
			selector: '#openUploaderButton',
			listeners : {
				click : 'onOpenUploaderClick'
			}
		},
		
		imageView : {
			selector: 'cmf_images_draggableimageview'
		}
	},
	
    inject: {
		imageQueryStore : 'imageQuery',
		bus: 'bus'
    },
    
    init : function() {
    	var me = this;
    	
    	me.callParent(arguments);
    	me.getImageTree().store.getRootNode().expand();
    },

	
	search : function() {
		var me = this;

		me.imageSelected = null;
		me.imageQueryStore.load({
			params: {
				query : me.getSearchField().getValue()
			}
		});

	},
	onSearchKeyDown : function(field, e) {
		if (e.getKey() == e.ENTER) {
			this.search();
		}
	},
	selectImage : function() {
		var me = this,
			imageView = me.getImageView(),
			firstRecord = imageView.store.getAt(0),
			selected = firstRecord && firstRecord.images().getById(me.imageSelected);
		
		selected && imageView.getSelectionModel().select(selected);
	},
	
	onTreeSelect : function(model, record, index, eOpts) {
		var me = this;

		if(record.isLeaf()) {
			me.imageSelected = record.get('imageId');
			record = record.parentNode;
		} else {
			me.imageSelected = null;
			record.expand();
		}
		
		if(me.pathLoaded == record.get('id')) {
			me.selectImage();
			return;
		}
		
		me.pathLoaded = record.get('id');
		me.imageQueryStore.load({
			params: {
				nodeId : record.get('id')
			},
			callback : function(record, operation, success) {
				if(success) {
					me.selectImage();
				}
			}
		});
	},
	
	onOpenUploaderClick: function() {
		this.bus.fireEvent('cmf.openapplication', 'imageUploader');
	}
	
});