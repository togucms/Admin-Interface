Ext.define('Cmf.controller.TaskBar', {
	extend : 'Deft.mvc.ViewController',

	inject: [ 'bus' ],
	
	requires: [
		'Ext.util.Cookies'
	],

	control: {
		userButton: {
			selector: '#userButton'
		},
		logoutButton: {
			selector: '#logoutButton',
			listeners: {
				'click': 'onLogoutClick'
			}
		},
		changePasswordButton: {
			selector: '#changePasswordButton',
			listeners: {
				'click': 'onChangePasswordClick'
			}
		}
		
	},
	
	observe: {
		bus: {
			'cmf.loginsuccess': 'onLoginSuccess',
			'cmf.logout': 'onLogout'
		}
	},

	config: {
		bus: null
	},

	init: function() {
		this.onLoginSuccess();
	},
	
	onLoginSuccess: function() {
		var user = Ext.util.Cookies.get('username');
		user && this.getUserButton().show();
		this.getUserButton().setText(Ext.util.Cookies.get('username'));
	},
	
	onLogout: function() {
		this.getUserButton().hide();
		this.getUserButton().setText('');
	},
	
	onLogoutClick: function() {
		this.getBus().fireEvent('cmf.openapplication', 'logout')
	},
	
	onChangePasswordClick: function() {
		this.getBus().fireEvent('cmf.openapplication', 'changePassword')
	}
	
});
