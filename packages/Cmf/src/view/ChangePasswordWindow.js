Ext.define('Cmf.view.ChangePasswordWindow', {
	extend: 'Shared.view.Window',
	
	xtype: 'cmf_logout',
	
	requires: [
       'Cmf.controller.ChangePasswordWindow'	           
	],

	controller: 'Cmf.controller.ChangePasswordWindow',

	modal : true,
	
	title : 'Change password',
	width : 350,
	
	minimizable : false,
	maximizable : false,
	resizable: false,
	
	iconCls: 'cmf-icon',
	glyph: 'xf084@FontAwesome',
	
	items : [{
		xtype : "form",
		
	    layout: {
	        type: 'vbox',
	        align: 'stretch'
	    },
	    border: false,
	    bodyPadding: 10,
	
	    fieldDefaults: {
	        labelWidth: 120,
	        minLength: 4
	    },		
		items: [{
			xtype : 'textfield',
			name : 'currentPassword',
			fieldLabel : 'Current Password'
		},{
			xtype : 'textfield',
			name : 'password',
			fieldLabel : 'New Password',
			inputType : 'password'
		},{
			xtype : 'textfield',
			name : 'verification',
			fieldLabel : 'Verification',
			inputType : 'password'
		},{
			itemId : 'errorField',
			xtype : 'component',
			hidden : true,
			html : '',
			style : {
				color : 'red'
			}
		}]
	}],
	
	buttons : ['->',{
		text : 'Cancel',
		itemId : 'cancelButton'
	},{
		text : 'Change Password',
		itemId : 'changeButton'
	}]

});