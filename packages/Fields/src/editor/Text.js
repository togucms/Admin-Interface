Ext.define('Fields.editor.Text', {
	extend: 'Ext.form.field.Text',
	
	alias: 'widget.fields_editor_text',

	requires: [
	    'Fields.controller.Base'       
	],
	
	controller: 'Fields.controller.Base'
});
