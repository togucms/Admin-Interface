Ext.define('Images.controller.DraggableImageView',{
	extend: 'Deft.mvc.ViewController',
	
	inject : ['bus'],
	
	config : {
		bus: null
	},
	
	control: {
	    view: {
			startdrag : 'onViewStartDrag',
			enddrag : 'onViewEndDrag'
		}
	},
	onViewStartDrag : function(view) {
		this.getBus().fireEvent('cmf.images.imagebrowser.startdrag', view);
	},
	onViewEndDrag : function(view) {
		this.getBus().fireEvent('cmf.images.imagebrowser.enddrag', view);
	}


});