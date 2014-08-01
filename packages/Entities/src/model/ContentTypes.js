Ext.define('Entities.model.ContentTypes', {
    extend: 'Ext.data.Model',

    requires : [
        'Entities.data.Reference',
        'Entities.data.Link',
        'Entities.data.Image'
    ],
	fields: [
		{ name : "id", type : 'string' },
		{ name: "model", type: 'string' },
		{ name : "label", type : 'string' },
		{ name : "description", type : 'string' },
		{ name : "extend", type : 'string' },
		{ name: 'fields', type: 'auto' },
		{ name: 'section', type: 'auto' },
		{ name: 'hiddenInGrid', type: 'boolean', defaultValue: false },
		{ name: 'modelTree', type: 'auto', defaultValue: { } }
	]

});
