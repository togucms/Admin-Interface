Ext.define('Cmf.controller.ChangePasswordWindow', {
	extend: 'Deft.mvc.ViewController',
	
	inject: ['bus'],
	
	config : {
		bus: null
	},

	control: {
		currentPassword: {
			selector: 'textfield[name="currentPassword"]',
			listeners: {
				afterrender: 'focusField',
				specialkey : 'onSpecialKey'
			}
		},
		password: {
			selector: 'textfield[name="password"]',
			listeners: {
				specialkey : 'onSpecialKey'
			}
		},
		verification: {
			selector: 'textfield[name="verification"]',
			listeners: {
				specialkey : 'onSpecialKey'
			}
		},
		form: {
			selector: 'form'
		},
		changeButton : {
			click: 'onChangeClick'
		},
		cancelButton : {
			click: 'onCancelClick'
		},
		errorField: true
	},

	focusField : function() {
		var field = this.getCurrentPassword();
		field.focus(false, 100);
	},
	
	onSpecialKey : function(component, e) {
		if(e.getKey() == e.ENTER) {
			this.onLoginClick();
		}
	},
	
	onChangeClick : function() {
		var me = this,
			form = me.getForm().getForm(),
			view = me.getView(),
			errorField = me.getErrorField();
		
		if(! form.isValid()) {
			return;
		}
		errorField.hide();
		
		view.setLoading({
			msg : 'Loading...'
		}, true);
		
		Togu.UserBundle.ChangePassword.changePassword({
			params: {
				current_password: me.getCurrentPassword().getValue(),
				plainPassword: {
					first: me.getPassword().getValue(),
					second: me.getVerification().getValue()
				}
			}
		}, function(response) {
			view.setLoading(false);
			if(response.success === false) {
				errorField.update(response.errors[0]);
				errorField.show();
				return;
			}
			Ext.Msg.show({
			    title: 'Success',
			    msg: 'Your password has been successfully changed',
			    width: 300,
			    buttons: Ext.Msg.OK,
			    icon: Ext.window.MessageBox.INFO
			});
			view.close();
		});
	},
	
	onCancelClick: function() {
		this.getView().close();
	}
})