Ext.define('Cmf.app.App', {
	extend: 'Ext.app.Controller',

	requires: [
	      "Cmf.view.LogoutWindow",
	      "Cmf.view.ChangePasswordWindow"
	],
	
	initialize : function(config) {
		var me = this;
		
		me.initConfig(config);
	},

	logout : function() {
		var view = this.getView('Cmf.view.LogoutWindow'),
			instance = view.create();

		instance.show();
	},
	
	changePassword : function() {
		var view = this.getView('Cmf.view.ChangePasswordWindow'),
			instance = view.create();

		instance.show();
	}
});