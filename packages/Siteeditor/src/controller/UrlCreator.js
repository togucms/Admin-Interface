Ext.define('Siteeditor.controller.UrlCreator', {
	extend: 'Deft.mvc.ViewController',
	
	control : {
		urlField : {
			selector: 'cmf_urlfield',
			listeners : {
				specialkey : 'onSpecialKey',
				urlValid : 'onUrlValid',
				urlValidated : 'onUrlValidated'
			}
		},
		okButton : {
			selector: '#okButton',
			listeners : {
				click : 'onOkClick'
			}
		},
		cancelButton : {
			selector: '#cancelButton',
			listeners : {
				click : 'onCancelClick'
			}
		},
		view : {
			show : 'onShow'
		}
		
	},
	onSpecialKey : function(field, event) {
        var me = this,
            key = event.getKey();
        
        if(key == event.ENTER) {
        	me.onOkClick();
        	return;
        }
	},
	
	
	onShow : function() {
		this.getUrlField().focus(false, 200);
	},
	
	onUrlValid : function(field, url, valid) {
		this.getOkButton().setDisabled(! valid);
	},
	
	onUrlValidated : function(field, url, valid) {
		var me = this; 
		if(! valid) {
			urlField = me.getUrlField();
			urlField.editCompleted = false;
			urlField.setDisabled(false);
			return;
		}
		me.view.fireEvent('urlvalidated', url);
		me.view.close();
	},
	onOkClick : function() {
		var me = this,
			urlField = me.getUrlField();
		
		urlField.setDisabled(true);
		urlField.editCompleted = true;
		urlField.isValid();
	},
	onCancelClick : function() {
		this.view.close();
	}

});