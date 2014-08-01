Ext.define('Shared.model.ImageDetails', {
	requires: [
      'Ext.data.Model'
	],
	
	extend: 'Ext.data.Model',

	fields: [
		{ name : 'name', type: 'string', mapping: 'title' },
		{ name : 'width', type: 'int', mapping: 'width' },
		{ name : 'height', type: 'int', mapping: 'height' },
		{ name : 'src', type: 'string', mapping: 'src' },
		{ name : 'alt', type: 'string', mapping: 'alt' }
	]
});
