Ext.define('Cmf.view.ApplicationList', {
	extend : 'Ext.panel.Panel',
	
	xtype : 'cmf-application-list',
	
	margin : 10,
	
	frame: true,

	initComponent: function() {
		this.items = [{
			xtype: 'dataview',
			itemId : 'cmfApplicationList',
			cls: 'cmf-application-list',
			store: this.store,
						
			plugins: [
				Ext.create('Ext.ux.DataView.Animated', {
		            duration  : 550,
		            idProperty: 'id'
		        })
			],
			
			tpl : [
		       '<tpl for=".">',
		       		'<div class="application">',
		                '<img width="96" height="96" src="{icon}" />',
		                '<strong>{name}</strong>',
		            '</div>',
		        '</tpl>'
			],
			
		    itemSelector: 'div.application',
		    overItemCls : 'application-hover',
		    multiSelect : false,
		    autoScroll  : true
		}];
		
		this.callParent(arguments);
	}

});
