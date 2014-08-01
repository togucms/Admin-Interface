Ext.define('Siteeditor.helpers.window.DropZone', {
	mixins: {
		observable : 'Ext.util.Observable'
	},
	
	inject: ['bus', 'linkService', 'imageService'],
	
	config: {
		uxiframe : undefined,
		componentIndex : undefined
	},
	
	requires: [
		'Ext.dd.DropZone'
	],
	
	constructor: function(config) {
		var me = this;
		
		me.callParent(arguments);

		me.mixins.observable.constructor.call(me, config);
		
		me.initImageDropZone();
		me.initEntityDropZone();
		me.initLinkDropZone();
		
		me.bus.on({
			scope: me,
			'siteeditor.controller.startdrag' : me.onControllerStartDrag,
			'siteeditor.controller.enddrag' : me.onControllerEndDrag,
			
			'entities.startdrag' : me.onEntityStartDrag,
			'entities.enddrag' : me.onEntityEndDrag,
			
			'cmf.images.imagebrowser.startdrag' : me.onImageStartDrag,
			'cmf.images.imagebrowser.enddrag' : me.onImageEndDrag
		});
	},
	
	onImageStartDrag : function(view) {
		this.activateImageDropZone();
	},
	
	onImageEndDrag : function(view) {
		this.desactivateImageDropZone();
	},
	
	activateImageDropZone: function() {
		this.imageDropZone.addToGroup('imageViewDD');
	},
	desactivateImageDropZone: function() {
		this.imageDropZone.unreg();
	},
	
	initImageDropZone: function() {
		var me = this,
			iframe = me.getUxiframe(),
			frame = iframe.getFrame(),
			doc = iframe.getDoc(),
			win = iframe.getWin(),
			bus = win.App.Injector.resolve('bus');

		me.imageDropZone = new Ext.dd.DropZone(frame, {
            ddGroup: 'imageViewDD',

            notifyEnter : function(dd, e, data) {
				bus.fireEvent('image.dd.start', data.records[0].getData());
            	Ext.fly(doc.body).addCls('image-drag'); // ????
            	this.callParent(arguments);
            },
            notifyOut : function(dd, e, data) {
            	Ext.fly(doc.body).removeCls('image-drag'); // ????
				bus.fireEvent('image.dd.end');
            	this.callParent(arguments);
            },
		
            onNodeEnter : function(target, dd, e, data){
            	win.$(target).trigger('image.dd.enter');
            },

            onNodeOut : function(target, dd, e, data){
            	win.$(target).trigger('image.dd.out');
            },

            onNodeOver : function(target, dd, e, data){
            	var evt = win.jQuery.Event('image.dd.over');
            	win.$(target).trigger(evt);
            	if(evt.canDrop === true) {
            		return Ext.dd.DropZone.prototype.dropAllowed;
            	}
            	return Ext.dd.DropZone.prototype.dropNotAllowed;
            },
            
            getTargetFromEvent: function(e) {
            	return e.originalTarget;
            },

            onNodeDrop : function(target, dd, e, data){
				Ext.fly(doc.body).removeCls('image-drag'); // ????
				bus.fireEvent('image.dd.end');

            	var evt = win.jQuery.Event('image.dd.over');
            	win.$(target).trigger(evt);
            	if(evt.canDrop !== true) {
            		return false;
            	}
            	
            	win.$(target).trigger('image.dd.drop', data.records[0].getData());
            	
            	return true;
            }
		});
		
		me.desactivateImageDropZone();
	},

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	

	onEntityStartDrag : function(view) {
		this.activateEntityDropZone();
	},
	
	onEntityEndDrag : function(view) {
		this.desactivateEntityDropZone();
	},
	
	activateEntityDropZone: function() {
		this.entityDropZone.addToGroup('entities-group');
	},
	
	desactivateEntityDropZone: function() {
		this.entityDropZone.unreg();
	},

	initEntityDropZone: function() {
		var me = this,
			iframe = me.getUxiframe(),
			frame = iframe.getFrame(),
			doc = iframe.getDoc(),
			win = iframe.getWin(),
			bus = win.App.Injector.resolve('bus');

		me.entityDropZone = new Ext.dd.DropZone(frame, {
            ddGroup: 'entity-group',
            
	        notifyEnter : function(dd, e, data) {
				var record = data.records[0],
					args = record.getData();
					
	        	args.type = record.store.entityName;
	        	
				bus.fireEvent('entity.dd.start', args);
	        	Ext.fly(doc.body).addCls('entity-drag'); // ????
	        	this.callParent(arguments);
	        },
	        notifyOut : function(dd, e, data) {
	        	Ext.fly(doc.body).removeCls('entity-drag'); // ????
				bus.fireEvent('entity.dd.end');
	        	this.callParent(arguments);
	        },
		
	        onNodeEnter : function(target, dd, e, data){
	        	win.$(target).trigger('entity.dd.enter');
	        },
	
	        onNodeOut : function(target, dd, e, data){
	        	win.$(target).trigger('entity.dd.out');
	        },
	
	        onNodeOver : function(target, dd, e, data){
	        	var evt = win.jQuery.Event('entity.dd.over');
	        	console.log(target);
	        	win.$(target).trigger(evt);
	        	if(evt.canDrop === true) {
	        		return Ext.dd.DropZone.prototype.dropAllowed;
	        	}
	        	return Ext.dd.DropZone.prototype.dropNotAllowed;
	        },
	        
	        getTargetFromEvent: function(e) {
	        	return e.originalTarget;
	        },
	
	        onNodeDrop : function(target, dd, e, data){
				var evt = win.jQuery.Event('entity.dd.over'),
					record = data.records[0],
		        	args = {
						id: record.get('id'),
						type: record.store.entityName
		        	};
		        	
				Ext.fly(doc.body).removeCls('entity-drag'); // ????
	
	        	win.$(target).trigger(evt);
				
	        	if(evt.canDrop !== true) {
					bus.fireEvent('entity.dd.end');
	        		return false;
	        	}
	        	
	        	win.$(target).trigger('entity.dd.drop', args);
				bus.fireEvent('entity.dd.end');
	        	
	        	return true;
	        }

		});		
		
		me.desactivateEntityDropZone();
	},

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	onControllerStartDrag : function(view) {
		this.activateLinkDropZone();
	},
	
	onControllerEndDrag : function(view) {
		this.desactivateLinkDropZone();
	},	
	
	initLinkDropZone: function() {
		var me = this,
			iframe = me.getUxiframe(),
			frame = iframe.getFrame(),
			doc = iframe.getDoc(),
			win = iframe.getWin(),
			bus = win.App.Injector.resolve('bus');

		me.linkDropZone = new Ext.dd.DropZone(frame, {
            ddGroup: 'controller-group',
			            
			notifyEnter : function(dd, e, data) {
				bus.fireEvent('link.dd.start', data.records[0].get('linkId'));
				Ext.fly(doc.body).addCls('image-drag'); // ????
				this.callParent(arguments);
			},
			
			notifyOut : function(dd, e, data) {
				Ext.fly(doc.body).removeCls('link-drag'); // ????
				bus.fireEvent('link.dd.end');
				this.callParent(arguments);
			},
			
			onNodeEnter : function(target, dd, e, data){
				win.$(target).trigger('link.dd.enter');
			},
			
			onNodeOut : function(target, dd, e, data){
				win.$(target).trigger('link.dd.out');
			},
			
			onNodeOver : function(target, dd, e, data){
				var evt = win.jQuery.Event('link.dd.over');
				win.$(target).trigger(evt);
				if(evt.canDrop === true) {
					return Ext.dd.DropZone.prototype.dropAllowed;
				}
				return Ext.dd.DropZone.prototype.dropNotAllowed;
			},
			
			getTargetFromEvent: function(e) {
				return e.originalTarget;
			},
			
			onNodeDrop : function(target, dd, e, data){
				Ext.fly(doc.body).removeCls('link-drag'); // ????
				bus.fireEvent('link.dd.end');
			
				var evt = win.jQuery.Event('link.dd.over');
				win.$(target).trigger(evt);
				if(evt.canDrop !== true) {
					return false;
				}
				
				win.$(target).trigger('link.dd.drop', data.records[0].get('linkId'));
				
				return true;
			}
		});
		
		me.desactivateLinkDropZone();
	},
	activateLinkDropZone: function() {
		this.linkDropZone.addToGroup('controller-group');
	},
	desactivateLinkDropZone: function() {
		this.linkDropZone.unreg();
	}
});