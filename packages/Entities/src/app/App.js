Ext.define('Entities.app.App', {
	extend: 'Ext.app.Controller',

	requires: [
		'Entities.view.EntitiesWindow',
		'Entities.service.EntityModelManager',
		'Entities.view.EntityChooser',
		
		'Entities.store.ContentTypes',
		
		'Fields.editor.*',
		'Fields.filters.*',
		'Fields.grid.*'
	],
	inject: ['bus'],
	
	constructor : function(config) {
		var me = this;
		
		me.callParent(arguments);
		
		Deft.Injector.configure({
			entities_contentTypes : 'Entities.store.ContentTypes',
			entities_modelManager: 'Entities.service.EntityModelManager',
			
			entities_entityStore: {
				singleton: false,
				fn: function(target, config) {
					var modelManager = Deft.Injector.resolve('entities_modelManager'),
						store = new Entities.store.Entities({
							model: modelManager.getName(config.entityName),
							entityName : config.entityName
						});
					
					store.load();
					
					return store;
				}
			}
		});
		this.bus.on('cmf.ready', this.onCmfReady, this);
	},
	
	onCmfReady: function() {
		var store = Deft.Injector.resolve('entities_contentTypes'),
			deferred = Ext.create('Deft.Deferred');
			
		store.load({
			callback: function(records, operation, success) {
				if(success) {
					deferred.resolve();	
				} else {
					deferred.reject('Siteeditor');
				}
			},
			scope: this
		});
		
		this.bus.fireEvent('cmf.dependency', deferred);
	},

	showEntitiesWindow : function() {
		var me = this,
			view = me.getView('Entities.view.EntitiesWindow'),
			instance = view.create();
		
		instance.show();
	},
	
	showEntityChooser : function(params) {
		var me = this,
			entityChooserView = this.getView('Entities.view.EntityChooser'),
			entityChooser = entityChooserView.create(params);
			
		entityChooser.show();
	}

});