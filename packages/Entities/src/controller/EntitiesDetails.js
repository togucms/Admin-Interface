Ext.define('Entities.controller.EntitiesDetails', {
	extend: 'Deft.mvc.ViewController',
	
	inject: [ 'bus' ],
	
	config: {
		bus: null
	},
	
	observe: {
		bus: {
			'entities.entitiesgrid.select': 'onEntitySelected',
			'entities.entitiesgrid.edit': 'onEntityEdited'
		}
	},
	
	control: {
		saveEntityButton: {
			selector: '#saveEntity',
			listeners: {
				click: "onSaveClick"
			}
		},		
		resetEntityButton: {
			selector: '#resetEntity',
			listeners: {
				click: "onResetClick"
			}
		}
	},

	init: function() {
		this.getView().hide();
	},

	onEntitySelected: function(record, index) {
		var view = this.getView();
		view.loadRecord(record);
		view[record ? "show" : "hide"]();
	},
	
	onEntityEdited: function(record) {
		var view = this.getView();
		view.loadRecord(record);
	},
	
	onSaveClick: function() {
		this.getView().updateRecord();
		this.getBus().fireEvent('entities.entitiesdetails.saveclick');
	},
	
	onResetClick: function() {
		var view = this.getView();
		view.loadRecord(view.getRecord());
	}
});