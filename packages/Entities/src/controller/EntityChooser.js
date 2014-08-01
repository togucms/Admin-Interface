Ext.define('Entities.controller.EntityChooser', {
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
		grid : {
			selector : '#entitiesList',
			listeners : {
				selectionchange : 'onSelectionChange'
			}
		}
	},
	
	inject: {
		modelManager: 'entities_modelManager'
	},
	
	onSelectionChange : function(selectionModel, selected, eOpts) {
		this.getOkButton().setDisabled(this.isOkDisabled(selected));
	},
	
	isOkDisabled: function(selected) {
		return ! selected || selected.length <= 0;
	},
	
	onOkClick : function() {
		var me = this,
			grid = me.getGrid(),
			selected = grid.getSelectionModel().getSelection();
			
		if(me.isOkDisabled(selected)) {
			return;
		}
		selected = selected[0];
		
		me.modelManager.load(grid.entityName, selected.get('id'), {
			scope : me,
		    success: function(record, operation) {
				this.getView().fireEvent('entityselected', record);
				this.getView().close();
		    }
		});
	},
	onCancelClick : function() {
		this.getView().close();
	}
});