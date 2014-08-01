Ext.define('Entities.controller.ContentTypesList', {
	extend: 'Deft.mvc.ViewController',
	
	inject: ['bus'],
	
	config: {
		bus: null
	},


	control : {
		view: {
			celldblclick: 'onCellDblClick'
		}
	},
	
	onCellDblClick: function(panel, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		this.getBus().fireEvent('entities.contenttypeslist.opencontenttype', 
									record.get('id'), 
									record.get('label'), 
									record.get('description'), 
									record.get('fields') 
								);
	}
});