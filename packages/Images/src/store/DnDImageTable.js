Ext.define('Images.store.DnDImageTable', {
	extend : 'Ext.data.Store',
	
    autoDestroy: true,
    
    model: 'Images.model.ImageUpload',
    
    proxy: {
        type: 'memory'
    }
});
