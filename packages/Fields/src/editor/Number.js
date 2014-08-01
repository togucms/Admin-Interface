Ext.define('Fields.editor.Number', {
	extend: 'Ext.form.field.Number',
	
	alias: 'widget.fields_editor_number',

	requires: [
	    'Fields.controller.Base'       
	],
	
	controller: 'Fields.controller.Base'
});
