Ext.define('Siteeditor.model.SectionTree', {
	extend: 'Ext.data.Model',
	
	fields : [
		{ name : 'index', type: 'int', defaultValue: null, persist: true },
		{ name : 'text', type: 'string' },
		{ name : 'type', type: 'string' },
		{ name : 'urlPrefix', type: 'string' }
	],

	proxy : {
		type : 'rest',
		url : '/backoffice/admin/sectiontrees',
		reader : {
			type : 'json',
			root : 'records'
		}
	},
	
	getUrl: function() {
		var prefix = "",
			parent = this.parentNode;
		
		while(parent) {
			prefix += parent.get('urlPrefix');
			parent = parent.parentNode;
		}
		
		return prefix + this.get('text');
	}
});