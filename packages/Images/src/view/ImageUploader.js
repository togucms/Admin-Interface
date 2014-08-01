Ext.define('Images.view.ImageUploader', {
	extend : 'Shared.view.Window',

	requires : [
	    'Images.view.ImageTreeEditor',
		'Images.view.DnDImageTable',
		'Images.view.ImageUploaderDetails',
		
		'Images.controller.ImageUploader'
	],
	
	controller : 'Images.controller.ImageUploader',

	alias : 'widget.cmf_image_imageuploader',
	title : 'Upload images',
	width : 900,
	height : 400,
    iconCls: 'cmf-imageuploader-icon',
	animCollapse : false,
	constrainHeader : true,
	
	layout: 'border',
	
	glyph: 'xf093@FontAwesome',
	
	closeAction : 'hide',
	
	items : [{
		region : 'center',
		xtype : 'cmf_images_dndimagetable'
	}, {
		width: 200,
		region : 'west',
		split: true,
		xtype : 'cmf_images_imagetreeeditor'
	}, {
		width: 200,
		split: true,
		collapsible: true, 
		region : 'east',
		xtype : 'cmf_images_imageuploaderdetails'
	}, {
		xtype : 'component',
		itemId: 'dndRegion',
		floating : true,
		cls : 'cmf-dnd-region',
		html : '<div class="cmf-content">Drop files here</div>'
	}]
});
