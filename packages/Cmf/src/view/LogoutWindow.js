Ext.define('Cmf.view.LogoutWindow', {
	extend: 'Shared.view.Window',
	
	xtype: 'cmf_logout',
	
	requires: [
       'Cmf.controller.LogoutWindow'	           
	],

	controller: 'Cmf.controller.LogoutWindow',

	modal : true,
	
	title : 'Logout',

	width : 300,
	
    
    maximizable : false,
	resizable: false,
	iconCls: 'cmf-icon',
    glyph: 'xf08b@FontAwesome',

	items : [{
		xtype: 'text',
		text: 'Are you sure you want to logout ?',
		margin: '40 50' 
	}],

	buttons : ['->',{
		text : 'Cancel',
		itemId : 'cancelButton'
	},{
		text : 'Logout',
		itemId : 'logoutButton'
	}]
});