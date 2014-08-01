Ext.define('Images.view.ImageChooser', {
	extend : 'Images.view.ImageBrowser',

	alias : 'widget.cmf_images_imagechooser',

	control : {
		imageView : {
			selector : 'cmf_images_draggableimageview'
		}
	},

	inject: ['imageService'],

	initComponent : function() {
		var me = this;
		me.buttons = [{
			text : 'OK',
			scope : me,
			handler : me.fireImageSelected
		}, {
			text : 'Cancel',
			scope : me,
			handler : function() {
				me.hide();
			}
		}]

		me.callParent(arguments);
	},
	fireImageSelected : function() {
		var me = this,
			selectedImage = me.down('cmf_images_imageview').getSelectionModel().getSelection()[0];

		if (selectedImage) {
			me.imageService.get(selectedImage.get('id'), {
				scope: me,
				success: function(record) {
					me.close();
					if(me.handler) {
						return me.handler.fn.call(me.handler.scope,record);
					}
					me.fireEvent('selected', record);
				}
			});
		}
	}
});
