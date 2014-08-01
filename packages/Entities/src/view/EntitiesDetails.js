Ext.define('Entities.view.EntitiesDetails', {
	extend: 'Ext.form.Panel',
	
	xtype: 'entities_entitiesdetails',
	
	requires: [
        'Entities.controller.EntitiesDetails'
	],
	
	controller: 'Entities.controller.EntitiesDetails',

	inject: {
		contentTypeStore : 'entities_contentTypes'
	},

	defaultType: 'textfield',

	bodyPadding: 5,
	
	autoScroll: true,
	
	title: 'Details',

	fieldDefaults: {
		anchor: '100%',
	    msgTarget: 'side',
	    labelWidth: 75
	},

	bbar: ['->', {
		text: "Reset",
//		iconCls: 'icon-reset',
		itemId: 'resetEntity'
	},{
		text: "Save",
//		iconCls: 'icon-save',
		itemId: 'saveEntity'
	}],
	
	formatItems: function() {
		var me = this,
			contentType = me.contentTypeStore.getById(me.entityName),
			fields = contentType.get('fields'),
			i = 0, 
			ln = fields.length,
			field,
			items = [];

		for(; i < ln; i++) {
			field = fields[i];
			
			if(field.name != "nextSection") {
				items.push(Ext.apply({
					fieldLabel : field.label,
					name: field.id,
					entityId: me.entityName,
					params: field
				}, field.form));
			}
		}
		return items;
	},

	initComponent: function() {
		Ext.apply(this, {
			items: this.formatItems()
		});
		
		this.callParent(arguments);
	}
});