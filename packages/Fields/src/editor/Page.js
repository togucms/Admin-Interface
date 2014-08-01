Ext.define('Fields.editor.Page', {
	extend: 'Ext.form.Panel',
	alias: 'widget.fields_editor_page',

	inject: {
		modelManager : 'entities_modelManager',
		bus: 'bus'
	},
	
	requires: ['Fields.editor.Text'],

	fieldDefaults: {
		anchor: '100%',
	    msgTarget: 'side',
	    labelWidth: 75
	},
    defaultType: 'fields_editor_text',
    layout: 'anchor',
    
	items: [{
		fieldLabel: 'Title',
		name: 'title'
	},{
		fieldLabel: 'Description',
		name: 'metaDescription'
	},{
		fieldLabel: 'Keywords',
		name: 'metaKeywords'
	}],
	
	constructor: function(config) {
		this.callParent(arguments);
		
		this.modelManager.load('page', this.model.get('page').id, {
			success: function(record) {
				this.loadRecord(record);
				record.on('modified', this.onModelModified, this);
			},
			scope: this
		});
	},
	onModelModified: function() {
		this.bus.fireEvent('field.changed');
	}
});