Ext.define('Cmf.controller.LoginWindow', {
	extend: 'Deft.mvc.ViewController',
	
	requires: [
	   'Ext.util.Cookies'
	],

	inject: ['bus'],
	
	config : {
		bus: null
	},

	control: {
		username: {
			selector: 'textfield[name="_username"]',
			listeners: {
				afterrender: 'focusField',
				specialkey : 'onSpecialKey'
			}
		},
		password: {
			selector: 'textfield[name="_password"]',
			listeners: {
				specialkey : 'onSpecialKey'
			}
		},
		loginForm: {
			selector: 'form'
		},
		loginButton : {
			click: 'onLoginClick'
		},
		errorLogin: true
	},

	focusField : function() {
		var field = this.getUsername();
		field.focus(false, 100);
	},
	
	onSpecialKey : function(component, e) {
		if(e.getKey() == e.ENTER) {
			this.onLoginClick();
		}
	},
	
	onLoginClick : function() {
		var me = this,
			form = me.getLoginForm().getForm(),
			loginWindow = me.getView(),
			errorLogin = me.getErrorLogin();
		
		if(! form.isValid()) {
			return;
		}
		errorLogin.hide();
		
		loginWindow.setLoading({
			msg : 'Logging in...'
		}, true);
		
		form.submit({
			url : '/backoffice/login',
			
			success: function(form, action) {
				Ext.util.Cookies.set('username',  me.getUsername().getValue());
				this.getBus().fireEvent('cmf.loginsuccess');
				loginWindow.setLoading(false);
				loginWindow.close();
			},
			failure : function(form, action) {
				loginWindow.setLoading(false);
				errorLogin.show();
			},
			
			scope : me
		});
	}

})