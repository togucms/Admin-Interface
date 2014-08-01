Ext.define('Images.controller.DnDImageTable', {
	extend: 'Deft.mvc.ViewController',

	control: {
		view: {
			observe : {
				store : [{
					event : "remove",
					fn : "onRecordRemoved"
				}]
			}
		}
	},
	
	onRecordRemoved : function(store, record, idx, eOpts) {
		if(record.progressbar) {
			record.progressbar.destroy();
			record.progressbar = undefined;
		}
		if(record.preview) {
			record.preview.destroy();
			record.preview = undefined;
		}
	}

});

