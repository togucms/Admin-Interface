Ext.define('Siteeditor.helpers.Window', {
	requires: [
		'Siteeditor.helpers.window.*'
	],
	
	mixins: {
		observable : 'Ext.util.Observable'
	},
	
	inject : ['bus'],
	config : {
		uxiframe : null,
		bus : null
	},
	
	constructor: function(config) {
		var me = this;
		
		me.initConfig(config);
		me.callParent(arguments);
		
		var iframe = me.getUxiframe(),
			App = iframe.getWin().App;

		me.mixins.observable.constructor.call(this, config);
		
		me.addEvents(
			'conponentschanged'
		);
		
		me.pages = {};
		me.currentPage = '';
		
		me.historyManager = Ext.create('Siteeditor.helpers.window.History',{
			uxiframe : iframe
		});
		me.getBus().relayEvents(me.historyManager, Ext.Object.getKeys(me.historyManager.events), 'siteeditor.iframe.history.');
		
		me.eventsManager = Ext.create('Siteeditor.helpers.window.Events',{
			uxiframe : iframe
		});
		me.getBus().relayEvents(me.eventsManager, Ext.Object.getKeys(me.eventsManager.events), 'siteeditor.iframe.event.');

		me.mouseManager = Ext.create('Siteeditor.helpers.window.Mouse',{
			uxiframe : iframe,
			componentIndex : me.componentIndex
		});
		me.getBus().relayEvents(me.mouseManager, Ext.Object.getKeys(me.mouseManager.events), 'siteeditor.iframe.mouse.');
		
		me.ddManager = Ext.create('Siteeditor.helpers.window.DropZone',{
			uxiframe : iframe,
			componentIndex : me.componentIndex
		});
		me.getBus().relayEvents(me.ddManager, Ext.Object.getKeys(me.ddManager.events), 'siteeditor.iframe.ddmanager.');

		App.Template.debug = true;
		App.Injector.resolve('bus').on({
			'sitecontroller.rootmodel': function(siteController, model) {
				this.getBus().fireEvent('siteeditor.iframe.bus.sitecontroller.rootmodel', siteController, model);
			},
			scope: me
		});
		
/*		var dbg = '',
			win = me.getUxiframe().getWin(),
			doc = me.getUxiframe().getDoc(),
			head = doc.getElementsByTagName('head')[0],
			script = doc.createElement( "script" ),
			onload = function() {
				win.Ext4.Loader.setPath({
		            Cmf : 'js/backoffice'
		        });
				win.Ext4.Loader.setConfig({enabled:true});
			};
		
		//<debug>
		dbg = '-debug';
		//</debug>
		
		Ext.DomHelper.insertFirst(head, {
			tag : 'link',
			href : '/admin/ext/resources/css/ext-sandbox' + dbg + '.css',
			rel : 'stylesheet',
			type: "text/css"
		});

		Ext.DomHelper.append(head, {
			tag : 'link',
			href : '/css/site.css',
			rel : 'stylesheet',
			type: "text/css"
		});

		script.onreadystatechange= function () {
     		if (this.readyState == 'complete') {
     			onload()
     		};
   		}
   		script.onload = onload;
		script.src = '/admin/ext/builds/ext-all-sandbox' + dbg + '.js';
		head.appendChild(script);
*/		
	},
	
	setEvents: function() {
		var me = this;
		
		me.mon(me.historyManager, 'beforeChange', me.beforeHistoryChange, me);
		me.mon(me.historyManager, 'change', me.historyChange, me);
	},
	
	beforeHistoryChange: function(uxiframe, url) {
		var me = this;

		me.currentUrl = url;
	},

	historyChange: function(url) {
		return;
		var me = this,
			rootController = me.getUxiframe().getWin().App.SectionMgr.getSiteController().getRootController(),
			controller = rootController,
			rootComponents = [];
		
		while(controller) {
			rootComponents.push(controller.getRootComponent());
			controller = controller.childController;
		}
		me.getBus().fireEvent('siteeditor.iframe.componentschanged', rootComponents, rootController.pageInfo);
	},
	getCurrentPage: function() {
		return this.currentPage;
	},
	getComponentIndex : function() {
		return this.componentIndex;
	}
})
