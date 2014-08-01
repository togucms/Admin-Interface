Ext.define('Cmf.controller.LogoutWindow', {
	extend: 'Deft.mvc.ViewController',
	
	inject: ['bus'],
	
	config : {
		bus: null
	},

	control: {
		logoutButton : {
			click: 'onLogoutClick'
		},
		cancelButton : {
			click: 'onCancelClick'
		}
	},
	onCancelClick: function() {
		this.getView().close();
	},
	onLogoutClick: function() {
		Togu.UserBundle.Logout.logout(function() {
			Ext.util.Cookies.set('username', '');
			this.getBus().fireEvent('cmf.logout');
		}, this);
		this.getView().close();
	}
})