Ext.define('Shared.model.Image', {
	requires: [
      'Ext.data.Model',
      'Ext.data.reader.Json',
      'Ext.data.association.HasOne',
      'Shared.model.ImageDetailsSmall',
      'Shared.model.ImageDetailsBig',
      'Shared.model.ImageDetailsReference'
	],
	
	extend: 'Ext.data.Model',

	fields: [
		{ name : 'id', type: 'int' }
	],

	hasOne: [
	    { model: 'Shared.model.ImageDetailsReference', associationKey: 'reference', name: 'reference', getterName: 'getReference' },
	    { model: 'Shared.model.ImageDetailsSmall', associationKey: 'default_small', foreign_key: 'default_small', name: 'small', getterName: 'getSmall' },
	    { model: 'Shared.model.ImageDetailsBig', associationKey: 'default_big', foreign_key: 'default_big', name: 'big', getterName: 'getBig' }
	],
	
	proxy : {
		type : 'rest',
		url : '../../backoffice/images/media',
		appendId: true,
		reader : {
			type : 'json',
			root : 'records'
		}
	}
	
});
