Ext.define('Fields.editor.Hidden', {
	extend: 'Ext.form.field.Hidden',
	
	alias: 'widget.fields_editor_hidden',

	requires: [
	    'Fields.controller.Base'       
	],
	
	controller: 'Fields.controller.Base'
});
