Ext.define('Images.model.ImageUpload', {
	extend: 'Ext.data.Model',
	fields: [
		{ name : 'file', type : 'auto' },
		{ name : 'preview', type: 'string', defaultValue : "" },
		{ name : 'thumb', type: 'string', defaultValue : "" },
		{ name : 'type', type: 'string' },
		{ name : 'label', type: 'string' },
		{ name : 'alt', type : 'string' },
		{ name : 'transferId', type : "string" },
		{ name : 'width', type : "number" },
		{ name : 'height', type : "number" },
		{ name : 'previewWidth', type : "number" },
		{ name : 'previewHeight', type : "number" },
		{ name : 'thumbWidth', type : "number" },
		{ name : 'thumbHeight', type : "number" },
		{ name : 'uploading', type : "boolean", defaultValue : false },
		{ name : 'uploaded', type : "boolean", defaultValue : false },
		{ name : 'progress', type : 'number', persist : false },
		{ name : 'progressText', type : 'string', defaultValue : 'Drag to a folder' }
	]
});
