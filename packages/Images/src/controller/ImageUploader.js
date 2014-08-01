Ext.define('Images.controller.ImageUploader', {
	extend: 'Deft.mvc.ViewController',
	
	requires: ['Shared.util.FileUpload'],


	control: {
    	DnDRegion : {
    		selector : '#dndRegion',
    		listeners : {
    			render : 'onDnDRegionRender'
			}
    	},
    	imageDetails : {
    		selector : 'cmf_images_imageuploaderdetails'
    	},
    	imageTable : {
    		selector : 'cmf_images_dndimagetable', 
    		listeners : {
				selectionchange : 'onDnDImageSelect',
				beforeselect : 'onBeforeSelect',
				columnresize : 'onColumnResize',
				afterrender : 'onDnDImageTableAfterRender'
    		}
    	},
    	uploadFilesButton : {
    		selector : '#uploadFiles',
    		listeners : {
    			click : 'addImages'
    		}
    	},
    	clearCompletedButton : {
    		selector : '#clearCompleted',
    		listeners : {
    			click : 'clearCompleted'
    		}
    	},
    	clearAllButton : {
    		selector : '#clearAll',
    		listeners : {
    			click : 'clearAll'
    		}
    	},
    	imageTree : {
    		selector : 'cmf_images_imagetree',
    		listeners : {
    			startImageTransfer : 'onStartImageTransfer'
    		}
    	},
    	view : {
    		show : "checkRootExpanded",
    		close : 'onWindowClose'
    	}
	},
	
    init : function() {
    	var me = this;
    	
    	me.callParent(arguments);

		me.getDnDRegion().hide();
		
		Ext.getDoc().on("dragenter", me.showDropZone, me);
		Ext.getDoc().on("drop", me.hideDropZone, me);
    },
	destroy : function() {
		var me = this;

		me.callParent(arguments);
		
		Ext.getDoc().un('dragenter', me.showDropZone, me);
		Ext.getDoc().un("drop", me.hideDropZone, me);
		
    	return true;
	},    
	onStartImageTransfer: function(record, parentNode) {
		var me = this,
			imageUploader = me.view,
			dndImageTable = me.getImageTable(); 
	
		dndImageTable.getSelectionModel().deselect(record);
		Ext.fly(dndImageTable.view.getNode(record)).addCls('cmf-grid-row-disabled');
	
		record.progressbar.updateProgress(0, 'Uploading...');
		
		record.store.suspendEvents();
		record.set('uploading', true);
		record.store.resumeEvents();
			
		var formData = new FormData();
		formData.append('context', 'default');
		formData.append('binaryContent', record.get('file'));
		
		Shared.util.FileUpload.request({
			url : "../../backoffice/images/media/sonata.media.provider.image",
			data : formData,
			progress: function(e) {
				record.progressbar.updateProgress(e.loaded / e.total);
			},
			success: function(response, opts) {
		        var imageProperties = Ext.decode(response.responseText);
				if(imageProperties.success === false) {
					record.store.suspendEvents();
					record.set('Failed', true);
					record.store.resumeEvents();
					return;
				}
				Ext.fly(dndImageTable.view.getNode(record)).addCls('cmf-grid-row-completed');
				
				record.progressbar.updateProgress(1, 'Complete');
				
				parentNode.appendChild({
					leaf: true,
					text : record.get('label'),
					imageId: imageProperties.records[0].id
				});
				parentNode.store.sync();
			},
			error : function() {
				record.progressbar.updateProgress(1, 'Error');
				Ext.fly(dndImageTable.view.getNode(record)).addCls('cmf-grid-row-error');
			}
		});
		
	},    
	checkRootExpanded : function() {
		var me = this,
			imageUploader = me.view;
		
		if(imageUploader.checkRootExpandedTest !== true && me.getDnDRegion().isHidden()) {
			me.getImageTree().store.getRootNode().expand();
			imageUploader.checkRootExpandedTest = true;
		}
		
	},

	onWindowClose: function(window) {
		var me = this;
		
		this.getImageTable().store.removeAll();
		this.getImageDetails().removeAll();
	},
	
	hideDropZone : function() {
		var me = this;
		
		me.getDnDRegion().hide();
		me.checkRootExpanded();
	},
	
	
	showDropZone : function(event) {
		var me = this,
			imageUploader = me.view,
			dndRegion = me.getDnDRegion(),
			box = imageUploader.body.getBox();
		
		dndRegion.show();
		dndRegion.toFront();
	
		dndRegion.setPosition(0,0);
		
		dndRegion.setWidth(box.width);
		dndRegion.setHeight(box.height);
	},
		
	onDnDRegionRender : function() {
		var me = this,
			dndRegion = me.getDnDRegion();
			
		if(dndRegion.hasDnDListener === true) {
			return;
		}
		dndRegion.hasDnDListener = true;
		dndRegion.getEl().on("drop", me.onFileDrop, me);
	},

	onDnDImageSelect : function(rowModel, record, index, eOpts) {
		if(record.length > 0) {
			this.getImageDetails(rowModel.view).loadRecord(record[0]);
		}
	},
    onBeforeSelect: function(rowModel, record, index, eOpts) {
    	return ! record.get('uploading');
    },
    onColumnResize : function(ct, column, width, eOpts) {
    	var me = this, parent;
    	if(column.dataIndex == "progress") {
	    	me.getImageTable().store.each(function(record) {
	    		if(record.progressbar) {
	    			parent = record.progressbar.getEl().parent();
	    			record.progressbar.setWidth(parent.getWidth());
	    		}
	    	});
    	}
    },
	onDnDImageTableAfterRender : function(component) {
    	var me = this,
    		view = component.view;

    	view.tip = Ext.create('Ext.tip.ToolTip', {
	        target: view.el,
	        delegate: view.itemSelector,
            tpl : '<img src="{src}" class="cmf-dndimagetable-tooltip"/>',	        
	        trackMouse: true,
	        renderTo: Ext.getBody(),
	        listeners: {
	            beforeshow: function updateTipBody(tip) {
	            	var record = view.getRecord(tip.triggerElement);
	            	if(! record) {
	            		return;
	            	}
	                tip.update({src : record.get('preview')});
	                tip.setWidth(record.get('previewWidth') + 12);
	                tip.setHeight(record.get('previewHeight') + 12);
	            }
	        }
	    });
    },
	
    addImages : function() {
		Ext.Msg.show({
		     title:'To be done',
		     msg: 'This function has to be implemented',
		     buttons: Ext.Msg.OK,
		     icon: Ext.Msg.WARNING
		});
    	
    },
    
    clearCompleted : function(button) {
    	var me = this, store = me.getImageTable().store, records = [], i = 0, ln;
    	
    	store.each(function(record) {
			if(record.get('uploaded') === true) {
				records.push(record);
			}
    	});
    	
    	for(ln = records.length; i < ln; i++) {
    		store.remove(records[i]);
    	}
    },
    
    clearAll: function(button) {
    	var me = this, store = me.getImageTable().store, records = [], i = 0, ln;
	
		store.each(function(record) {
			records.push(record);
		});
		
		for(ln = records.length; i < ln; i++) {
			store.remove(records[i]);
		}
    },
	
	createThumbnail: function(image, maxWidth, maxHeight, callback) {
	
		var me = this,
			canvas = document.createElement('canvas'),
			ctx = canvas.getContext('2d'),
			img = new Image(),
			canvasRatio = maxWidth / maxHeight;
		
		img.onload = function() {
			var imageRatio, scaledSize, size = {
				imageWidth: img.width,
				imageHeight : img.height
			};
			
			imageRatio = size.imageWidth / size.imageHeight;

			if(canvasRatio > imageRatio) {
				// Image is taller
				scaledSize = Math.round(maxWidth * imageRatio);

				canvas.width = size.thumbWidth = scaledSize;
				canvas.height = size.thumbHeight = maxHeight;

				ctx.drawImage(img, 0, 0, scaledSize, maxHeight); 
			} else {
				// Image is wider
				scaledSize = Math.round(maxHeight / imageRatio);

				canvas.width = size.thumbWidth = maxWidth;
				canvas.height = size.thumbHeight = scaledSize;

				ctx.drawImage(img, 0, 0, maxWidth, scaledSize ); 
			}
			
			callback(canvas.toDataURL("image/png"), size);
		}

		img.src = image;
	},	
	onFileDrop: function(evt) {
	
		var me = this,
			imageUploader = me.view,
			dataTransfer = evt.browserEvent.dataTransfer,
			files = dataTransfer.files,
			reader = new FileReader(),
			acceptedFiles = [],
			i = 0, 
			ln = files.length,
			file;
		
		for(; i < ln; i++) {
			if(files[i].type.match(/^image\//)) {
				acceptedFiles.push(files[i]);
			}
		}
		
		i = 0;
		ln = acceptedFiles.length;

		reader.onloadend = function(evt) {
			file = acceptedFiles[i++];
			
			me.createThumbnail(evt.target.result, 40, 40, function(thumb, thumbSize) {
				me.createThumbnail(evt.target.result, 180, 180, function(bigthumb, size) {
					var fileData = {
						file : file,
						preview : bigthumb,
						thumb : thumb,
						type : file.type.replace('image/', ''),
						label : file.name,
						alt : file.name,
						width: size.imageWidth,
						height: size.imageHeight,
						previewWidth : size.thumbWidth,
						previewHeight : size.thumbHeight,
						thumbWidth : thumbSize.thumbWidth,
						thumbHeight : thumbSize.thumbHeight,
						progress : 0
					};
					me.addNewFiles(imageUploader, fileData);
					
					if(i < ln) {
			        	return reader.readAsDataURL(files[i]);
					}
				});
			});
        };
        
        if(i < ln) {
        	reader.readAsDataURL(files[i]);
        }
		me.hideDropZone();
		
		evt.preventDefault();
		evt.stopPropagation();
		return false;
	},
	addNewFiles: function(imageUploader, fileList) {
		this.getImageTable().store.add(fileList);
	}   	

});