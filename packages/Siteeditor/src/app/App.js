Ext.define('Siteeditor.app.App', {
	
	extend: 'Ext.app.Controller',
	
	requires: [
	    'Deft.Promise',
	    'Deft.Deferred',

	    'Siteeditor.view.EditorWindow',
		'Siteeditor.view.UrlChooser',

		'Siteeditor.store.ModelTree',
		'Siteeditor.store.SectionTree'
	],
	
	inject: ['bus'],

	constructor: function() {
		var me = this;
		
		me.callParent(arguments);
		me.instances = [];
		
		window.SiteeditorInstance = this;
		
		Deft.Injector.configure({
			'siteeditor.modelTree' : 'Siteeditor.store.ModelTree',
			'siteeditor.sectionTreeStore' : 'Siteeditor.store.SectionTree'
		});
		
		this.bus.on('siteeditor.destroy', this.onEditorDestroy, this);
		this.bus.on('cmf.ready', this.onCmfReady, this);
	},
	
	onCmfReady: function() {
		var store = Deft.Injector.resolve('siteeditor.modelTree'),
			deferred = Ext.create('Deft.Deferred');
			
		!store.isLoading() && store.load({
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
	
	showEditor: function(params) {
		var me = this, win, view;
		
		view = me.getView('Siteeditor.view.EditorWindow');
		win = view.create(params);

		me.instances.push(win);
		
		return win;
	},
	onEditorDestroy : function(view) {
		Ext.Array.remove(this.instances, view);
	},
	
	showUrlChooser : function(params) {
		var me = this,
			urlChooserView = this.getView('Siteeditor.view.UrlChooser'),
			urlChooser = urlChooserView.create(params);
			
		urlChooser.show();
	},
	
	register : function(win) {
		var me = this;
		
		Ext.Array.each(me.instances, function(instance, idx) {
			instance.getController().register(win);
		}, this);
	}
});