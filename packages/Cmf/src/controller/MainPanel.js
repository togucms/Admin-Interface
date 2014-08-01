Ext.define('Cmf.controller.MainPanel', {
	extend: 'Deft.mvc.ViewController',
	
	inject: ['bus', 'cmfApplicationsStore'],
	
	config : {
		bus: null,
		cmfApplicationsStore: null
	},
	
	control: {
		applicationList : {
			selector: '#cmfApplicationList',
			listeners: {
				itemclick: 'handleItemClick'
			}
		}
	},
	
	observe: {
		bus: {
			'cmf.openapplication': 'openApplication',
			
			'cmf.dragstart': 'onDragStart',
			'cmf.dragenter': 'onDragEnter',
			'cmf.dragover': 'onDragOver',
			'cmf.drop': 'onDrop'
		}
	},
	
	init: function() {
		var me = this;

		me.allAppStore = Ext.create('Ext.data.Store', {
			model : 'Cmf.model.ApplicationList',
			proxy: {
		        type: 'memory',
		        reader: {
		            type: 'json',
		            root: 'users'
		        }
		    }			
		});
		
		me.getCmfApplicationsStore().load({
			callback: me.onApplicationsLoad,
			scope: me
		});
		
		me.controllers = {};
		
		this.setupDnD();
	},
	
    setupDnD : function() {
    	var me = this,
    		doc = Ext.getDoc();
    	
		doc.on('dragstart', me.onDragStart, me);
		doc.on("dragenter", me.onDragEnter, me);
		doc.on("dragover", me.onDragOver, me);
		doc.on("drop", me.onDrop, me);
    },

    onDragStart : function(event) {
		event.stopPropagation();
		event.preventDefault();
	},
    
    onDragEnter : function(event) {
    	this.openApplication('imageUploader');
	},
    
    onDragOver : function(event) {
		event.stopPropagation();
		event.preventDefault();
	},
    
    onDrop : function(event) {
		event.stopPropagation();
		event.preventDefault();
	},
    
	onApplicationsLoad: function(records, operation, success) {
		if(! success) {
			return;
		}
		var me = this,
			mainPanel = me.getView();
		
		Ext.Array.each(records, function(record) {
			var apps = record.applications();
			apps.each(function(app){
				me.allAppStore.add(app);
				
				var Class = app.get('class') + '.app.App',
					instance = me.controllers[Class];
				
				if(! instance) {
					instance = me.controllers[Class] = Ext.create(Class);
					instance.init();
				}
			});
		});
		
		mainPanel.setItems(records);
	},
	
	handleItemClick : function(view, record, item, index, e, eOpts) {
		view.deselect(record);
		this.openApplicationByRecord(record);
	},
	
	openApplicationByRecord : function(record, params) {
		var me = this,
			Class = record.get('class')  + '.app.App',
			instance = me.controllers[Class];
		
/*		if(! instance) {
			instance = me.controllers[Class] = Ext.create(Class);
			instance.init();
		}
*/			
		instance[record.get('method')](params);
	},
	
	openApplication: function(id, params) {
		var me = this,
			record = me.allAppStore.getById(id);
		
		if(! record) {
			Deft.Logger.error('wrong application');
			return;
		}
		me.openApplicationByRecord(record, params);
	}
});