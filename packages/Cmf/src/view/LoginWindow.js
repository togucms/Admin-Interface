Ext.define('Cmf.view.LoginWindow', {
	extend: 'Shared.view.Window',
	
	xtype: 'cmf_login',
	
	requires: [
       'Cmf.controller.LoginWindow'	           
	],

	controller: 'Cmf.controller.LoginWindow',

	modal : true,
	
	title : 'Login',

	width : 300,
	
    minimizable : false,
    maximizable : false,
	resizable: false,
	closable: false,
	
/*	loader: {
		target: 'formWin',
		renderer: 'component',
	},
*/	
	items : [{
		xtype : "form",
		
	    layout: {
	        type: 'vbox',
	        align: 'stretch'
	    },
	    border: false,
	    bodyPadding: 10,
	
	    fieldDefaults: {
	        labelWidth: 100,
	        minLength: 4
	    },		
		items: [{
			xtype : 'textfield',
			name : '_username',
			// <debug>
			value : 'test@test.com',
			// </debug>
			fieldLabel : 'Username'
		},{
			xtype : 'textfield',
			name : '_password',
			fieldLabel : 'Password',
		// <debug>
			value : 'test',
		// </debug>
			inputType : 'password'
		}]
	}],

	buttons : [{
		itemId : 'errorLogin',
		xtype : 'component',
		hidden : true,
		html : 'Error logging in',
		style : {
			color : 'red'
		}
	},'->',{
		text : 'Login',
		itemId : 'loginButton'
	}]
	
});