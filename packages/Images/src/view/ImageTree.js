Ext.define('Images.view.ImageTree', {
	extend : 'Ext.tree.Panel',

	alias : 'widget.cmf_images_imagetree',

	title : 'Folders',
	
	inject : {
		store : 'imageTreeStore'
	},
	
	useArrows: true
});
