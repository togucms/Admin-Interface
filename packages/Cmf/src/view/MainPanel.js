Ext.define('Cmf.view.MainPanel', {
	extend: 'Ext.panel.Panel',
	
	requires : [
		'Cmf.view.ApplicationList',
		'Ext.ux.GroupTabPanel',
		'Ext.ux.DataView.Animated',
		
		'Cmf.controller.MainPanel'
	],
	
	xtype : 'cmf-mainpanel',
	
	layout : 'fit',
	
	controller: 'Cmf.controller.MainPanel',
	
	setItems : function(records) {
		var me = this,
			i = 0, ln = records.length,
			group, applications, allApplicationItems = [], items = [], applicationList;
		
		for(; i < ln; i++) {
			group = records[i];
			
			applications = group.applications();
			
			applications.filter('hidden', false);
			
			applicationList = {
				title : group.get('name'),
                xtype: 'cmf-application-list',
                store : applications
			};
			
			allApplicationItems.push(applicationList);
						
			items.push({
				title : group.get('name'),
				tabTip: group.get('tabTip'),
				border: false,
				items: [ applicationList ]
			});
		}
		
		items.unshift({
            title: 'All Applications',
            tabTip: 'All Applications',
            border: false,
            layout: 'auto',
            items: allApplicationItems
        });

		me.add({
			cls: 'cmf-mainpanel-grouptab',
			xtype: 'grouptabpanel',
	    	activeGroup: 0,
	    	items: [{
                mainItem: 0,
    			items: items
    		}]
		})
	}
})
