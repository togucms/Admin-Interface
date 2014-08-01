Ext.define('Cmf.view.TaskBar', {
	extend: 'Ext.toolbar.Toolbar',
	
	requires: [
       "Cmf.controller.TaskBar"	           
	],

	cls: 'cmf-taskbar',
	xtype: 'cmf-taskbar',
	
	controller: "Cmf.controller.TaskBar",
	
	items: [{
			xtype: 'image',
			src: 'resources/Cmf/togu-logo-small.png',
			//<debug>
			src: '../packages/Cmf/resources/togu-logo-small.png',
			//</debug>
			cls: 'togu-logo',
			autoEl: {
				tag: 'a',
				href: 'http://togu.io',
				target: '_blank'
			},
			height: 24
		},
		'->',
		{
			hidden: true,
			xtype: 'button',
			glyph: 'xf007@FontAwesome',
			itemId : 'userButton',
		    text   : '',
            menu: [{
                text:'Login',
                hidden: true,
                glyph: 'xf090@FontAwesome'
            },{
                text:'Change password',
                glyph: 'xf084@FontAwesome',
                itemId: 'changePasswordButton'
            },{
                text:'Logout',
                glyph: 'xf08b@FontAwesome',
                itemId: 'logoutButton'
            }]
		}
	]
})