Ext.define('Siteeditor.view.EditorWindow', {
	extend: 'Ext.panel.Panel',

	requires : [
		'Siteeditor.view.Properties',
		'Siteeditor.view.ComponentTree',
		'Siteeditor.view.SectionTreeEditor',
		'Siteeditor.view.IFrame',
		'Ext.form.*',
		
		"Siteeditor.controller.EditorWindow"
	],

	controller: "Siteeditor.controller.EditorWindow",
	
	alias : 'widget.cmf_siteeditor_editorwindow',
	
    width:1300,
    height:500,
    border: false,

    layout: 'border',
	items : [
        {
        	region: 'west',
        	width: 200,
		    split: true,
//			collapsible: true,
//			animCollapse: true,
		    layout: 'fit',
			items: [{
				title: 'Pages',
//				region: 'center',
	        	xtype: 'cmf_siteeditor_sectiontreeeditor'
			}]
        }, {
        	xtype: 'siteeditor_iframe',
        	region: 'center',
        	src: 'http://' + window.location.host + '/?admin=true'
        }, {
        	width: 300,
        	region: 'east',
		    split: true,
//			collapsible: true,
//			animCollapse: true,
			
		    layout: 'border',
			tbar : [{
				hidden : true,
				itemId : 'previous',
				xtype : 'button',
				text : 'Previous'
			}, {
				hidden : true,
				itemId : 'next',
				xtype : 'button',
				text : 'Next'
			}, {
				xtype : 'button',
				text : 'Open',
				href : 'http://' + window.location.hostname,
				target: '_blank',
				glyph: 'xf08e@FontAwesome',
				itemId : 'openPage',
				width: "50%"
			},{
				hidden : true,
				xtype : 'button',
				text : 'Undo'
			},{
				hidden : true,
				xtype : 'button',
				text : 'Redo'
			}, {
				itemId : 'save',
				xtype : 'button',
				glyph: 'xf0c7@FontAwesome',
				text : 'Save',
				disabled : true,
				width: "50%"
			}],
		    
			items: [{
				flex : 2,
				region: 'center',
				xtype: 'cmf_siteeditor_componenttree',
				minHeight: 150
			},{
				flex : 1,
				region: 'south',
				xtype: 'cmf_siteeditor_properties',
				split: true,
				collapsible: true,
				animCollapse: true,
				minHeight: 150
			}]
        }
    ],
    
	getWindowHelper: function() {
		return this.windowHelper;
	},
    getComponentIndex : function() {
    	return this.windowHelper.getComponentIndex();
    }
})
