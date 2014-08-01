Ext.define('Images.app.App', {
	extend: 'Ext.app.Controller',

	requires: [
		'Shared.util.FileUpload',
		'Images.store.DnDImageTable',

		'Images.store.ImageTree',
		'Images.store.Images',
		'Images.store.DnDImageTable',

		'Images.view.ImageBrowser',
		'Images.view.ImageChooser',
		'Images.view.SystemStatus',
		'Images.view.ImageUploader'
	],
	
	constructor : function() {
		var me = this;
		
		me.callParent(arguments);
		
		Deft.Injector.configure({
			imageQuery : 'Images.store.Images',
			imageTreeStore: "Images.store.ImageTree",
			imageTableStore: {
				className : "Images.store.DnDImageTable",
				singleton: false
			}
		});
		
		me.imageUploader = null;
	},

	showImageListWindow : function() {
		var me = this,
			view = me.getView('Images.view.ImageBrowser'),
			imageBrowser = view.create();
		
		imageBrowser.show();
	},
	
	showImageChooser : function(params) {
		var me = this,
			view = me.getView('Images.view.ImageChooser'),
			imageChooser = view.create(params);
		
		imageChooser.show();
	},
	showSystemStatus : function() {
		var me = this,
			view = me.getView('Images.view.SystemStatus'),
			imageBrowser = view.create();
	
		imageBrowser.show();
	},
	
	
	showImageUploader : function(params) {
		var me = this,
			view = me.getView('Images.view.ImageUploader'); 
		// Change this!
		if(me.imageUploader === null || me.imageUploader.isDestroyed) {
			me.imageUploader = view.create();
		}
		
		me.imageUploader.show();
	}

});