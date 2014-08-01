Ext.define('Entities.controller.EntitiesPanel', {
	extend: 'Deft.mvc.ViewController',
	
	inject: ['bus'],
	
	config: {
		bus: null
	},


	control : {
		view: {
//			celldblclick: 'onCellDblClick'
		}
	}
	
});