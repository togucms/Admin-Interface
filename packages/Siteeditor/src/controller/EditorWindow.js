Ext.define('Siteeditor.controller.EditorWindow', {
	extend : 'Deft.mvc.ViewController',

	requires : [
		'Siteeditor.helpers.Window'
	],
	
    mixins: {
        observable: 'Ext.util.Observable'
    },
    
	inject : {
		bus : 'bus',
		modelManager: 'entities_modelManager'
	},

	config : {
		bus : null,
		windowHelper: null,
		changeHandlers : null,
		modelManager: null
	},

	control : {
		previousButton : {
			selector : '#previous',
			listeners : {
				click : 'onHistoryPrevious'
			}
		},
		nextButton: {
			selector: '#next',
			listeners : {
				click : 'onHistoryNext'
			}
		},
		saveButton : {
			selector : '#save',
			listeners : {
				click : 'onSave'
			}
		},
		iframe : {
			selector : 'uxiframe'
		},		
		openPageButton: {
			selector: '#openPage'
		}
		
	},

	observe : {
		bus : {
			'siteeditor.iframe.history.beforeChange' : 'onHistoryBeforeChange',
			'siteeditor.iframe.history.change' : 'onHistoryChange',
			
			'siteeditor.iframe.resource.initcache' : 'onResourceManagerInitCache',
			
			'field.changed' : 'enableSaveButton',
			
			'siteeditor.pageCreated' : 'goToPage',
			'siteeditor.pageChanged' : 'goToPage',
			
			'entities.saved': 'onDataSaved'
		}
	},
	
	init: function() {
	},

	enableSaveButton: function() {
		this.getSaveButton().setDisabled(false);
	},
	
	onHistoryBeforeChange : function(component, newUrl) {
	},
	
	onHistoryChange : function(url, pageInfo) {
		var me = this,
			openPageButton = me.getOpenPageButton();
		
		openPageButton.href = url;
		openPageButton.setParams({});
	},
	
	onHistoryPrevious : function() {
		var me = this,
			win = me.getIframe().getWin();
		
		win.history.go(-1);
	},
	
	onHistoryNext : function(component) {
		var me = this,
			win = me.getIframe().getWin();
		
		win.history.go(1);
	},
	
	goToPage : function(treeEditor, url) {
		var me = this,
			win = me.getIframe().getWin();
			
		win.History.add(url);
	},
	
	destroy : function() {
		this.callParent(arguments);
		this.getBus().fireEvent('siteeditor.destroy', this.getView());
	},

	register : function(win) {
		var me = this,
			framePanel = me.getIframe(),
			doc = Ext.fly(framePanel.getDoc());
			
		if (win.__id === framePanel.getWin().__id) {
			me.mon(doc, 'dragstart', me.propagateEvent, me);
			me.mon(doc, 'dragenter', me.propagateEvent, me);
			me.mon(doc, 'dragover', me.propagateEvent, me);
			me.mon(doc, 'drop', me.propagateEvent, me);
			
			me.windowHelper = Ext.create('Siteeditor.helpers.Window',{
				'uxiframe' : framePanel
			});
		}
	},
	
	propagateEvent: function(event, target, eOpts) {
		this.getBus().fireEvent('cmf.' + event.type, event, target, eOpts);
	},
	
	onSave: function(component) {
		this.getModelManager().save();
/*		var me = this,
			changeHandlers = me.getChangeHandlers(),
			k;
		
		for(k in changeHandlers) {
			if(! changeHandlers[k].isValid()) {
				Ext.Msg.show({
				     title:'Warning',
				     msg: 'Some components have errors. Continue',
				     buttons: Ext.Msg.YESNO,
				     icon: Ext.Msg.WARNING,
				     fn : function(btn) {
						if(btn != "yes") {
							return;
						}
						me.doSave();
					}
				});
				return;
			}
		}
		
		me.doSave();
*/		
	},
	
	onDataSaved : function(response) {
/*		var me = this,
			objects = Ext.JSON.decode(response.responseText),
			resourceMgr = this.getWindowHelper().getResourceMgr(),
			changeHandlers = me.getChangeHandlers(),
			k;
		
		for(k in objects) {
			if(objects[k].oldId) {
				changeHandlers[k] = changeHandlers[objects[k].oldId];
				delete(changeHandlers[objects[k].oldId]);
			}
			changeHandlers[k].onDataSaved(objects[k]);
		}
		
		resourceMgr.reloadData();
*/		
		this.getSaveButton().setDisabled(true);
	}
});
