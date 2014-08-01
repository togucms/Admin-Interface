Ext.define('Cmf.controller.Main', {
	extend: 'Deft.mvc.ViewController',
	
	inject: ['bus', 'cmfApplicationsStore'],
	
	config : {
		cmfApplicationsStore: null
	},
	
	control: {
		mainpanel : true
	},
	
	observe: {
		bus: {
			'cmf.openapplication': 'openApplication',
			
			'cmf.dragstart': 'onDragStart',
			'cmf.dragenter': 'onDragEnter',
			'cmf.dragover': 'onDragOver',
			'cmf.drop': 'onDrop',
			'cmf.dependency': 'onCmfDependency'
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
		me.promises = [];
		
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
		var me = this;
		
		Ext.Array.each(records, function(record) {
			var apps = record.applications();
			apps.each(function(app){
				this.allAppStore.add(app);
				
				var Class = app.get('class') + '.app.App';
				
				if(! this.controllers[Class]) {
					this.controllers[Class] = Ext.create(Class);
				}
			}, me);
		}, me);
		
		me.bus.fireEvent('cmf.ready');
		Deft.Promise.all(me.promises).then(function() {
			me.openApplication('siteeditor');
		});
	},
	
	onCmfDependency: function(promise) {
		this.promises.push(promise);
	},
	
	openApplicationByRecord : function(record, params) {
		var me = this,
			Class = record.get('class')  + '.app.App',
			instance = me.controllers[Class],
			mainPanel = me.getMainpanel(),
			panel = instance[record.get('method')](params);
		
		if(panel) {
			mainPanel.removeAll();
			mainPanel.add(panel);
		}
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