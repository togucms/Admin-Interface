Ext.define('Fields.controller.Base', {
	extend: "Deft.mvc.ViewController", 

	control: {
		view: {
			change: "onFieldChange",
			update: "onFieldUpdate"
		}
	},
	
	onFieldChange: function() {
		this.updateModel();
	},
	
	onFieldUpdate: function() {
		this.updateModel();
	},
	
	updateModel: function() {
		var field = this.getView(),
			form = field.up('form'),
			record = form.getRecord();
		
		record.set(field.name, field.getValue());
	}

})