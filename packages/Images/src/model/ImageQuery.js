Ext.define('Images.model.ImageQuery', {
	extend: 'Ext.data.Model',
	
	requires : [ 'Shared.model.Image' ],
	
	fields: [
		{ name : 'query', type: 'string', defaultValue : "" },
		{ name : 'queryType', type: 'string', defaultValue : "id" },
		{ name : 'folderName', type: 'string' }
	],
	
	hasMany : { name : "images", model : 'Shared.model.Image', associationKey : "images" }
});
