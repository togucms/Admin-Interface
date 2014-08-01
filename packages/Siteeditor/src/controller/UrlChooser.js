Ext.define('Siteeditor.controller.UrlChooser', {
	extend: 'Deft.mvc.ViewController',
	
	control : {
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
		tree : {
			selector : 'cmf_siteeditor_controllertree',
			listeners : {
				selectionchange : 'onSelectionChange'
			}
		}
	},
	
	inject: {
		linkService: 'linkService'
	},
	
	onSelectionChange : function(selectionModel, selected, eOpts) {
		this.getOkButton().setDisabled(this.isOkDisabled(selected));
	},
	
	isOkDisabled: function(selected) {
		if(selected.length <= 0) {
			return true
		}
		return ! selected[0].isLeaf();
	},
	
	onOkClick : function() {
		var me = this,
			selected = me.getTree().getSelectionModel().getSelection();
			
		if(me.isOkDisabled(selected)) {
			return;
		}
		selected = selected[0];
		
		me.linkService.get(selected.get('linkId'), {
			scope : me,
		    success: function(record, operation) {
				this.getView().fireEvent('urlselected', record);
				this.getView().close();
		    }
		});
	},
	onCancelClick : function() {
		this.getView().close();
	}
});