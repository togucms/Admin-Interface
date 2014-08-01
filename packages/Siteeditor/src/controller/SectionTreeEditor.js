Ext.define('Siteeditor.controller.ControllerTreeEditor', {
	extend: 'Deft.mvc.ViewController',

	control: {
		addButton : {
			selector : "#addButton",
			listeners : {
				click : "onAddChild"
			}
		},
		removeButton : {
			selector : "#removeButton",
			listeners : {
				click : "onRemoveChild"
			}
		},
		goToPageButton : {
			selector : "#goToPageButton",
			listeners : {
				click : "goToPage"
			}
		},
		treeView : {
			selector: 'treeview',
			listeners : {
				isvaliddroppoint : 'onIsValidDropPoint',
				startdrag : 'onStartDrag',
				enddrag : 'onEndDrag',
				drop: 'onDrop',
				afterrender : 'onTreeViewAfterRender',
				edit: 'onEdit'
			}
		},
		view : {
			listeners: {
				selectionchange : 'onSelectionChange'
			}
		}

	},

	requires : [
        'Siteeditor.view.UrlCreator'
	],
	
	inject : {
		bus : 'bus',
		sectionTreeStore : 'siteeditor.sectionTreeStore',
		contentTypeStore : 'entities_contentTypes'
	},
	
	config : {
		sectionTreeStore : null,
		contentTypeStore: null,
		bus : null
	},
	
	observe : {
		bus : {
			'siteeditor.iframe.history.change' : 'onHistoryChange'
		}
	},
	
	/* TODO: verify that it is not a leaf!!! */
	onStartDrag : function(view) {
		this.getBus().fireEvent('siteeditor.controller.startdrag', view);
	},
	
	/* TODO: verify that it is not a leaf!!! */
	onEndDrag : function(view) {
		this.getBus().fireEvent('siteeditor.controller.enddrag', view);
	},
	
	onDrop: function(node, data, overModel, dropPosition, eOpts) {
		overModel.expand(false, function() {
			// Insure that the handler is called as last
			Ext.defer(function() {
				this.getSectionTreeStore().sync();
			},1,this);
		}, this);
	},
	
	goToPage : function(button) {
		var me = this,
			selectedNode = me.getView().getSelectionModel().getSelection()[0],
			url = selectedNode.getUrl();
		
		if(! url) {
			return;
		}
		this.getBus().fireEvent('siteeditor.pageChanged', this.getView(), url);
	},
	
	onIsValidDropPoint: function(treeview, node, position, dragZone, e, data) {
		var me = this,
			targetNode = treeview.getRecord(node),
			type = data.records[0].get('type');
		
		targetNode = position == "append" ? targetNode : targetNode.parentNode;
		
		return me.canAdd(type, targetNode);
	},
	onSelectionChange: function(selectionModel, selected, eOpts) {
		var me = this;
		
		me.getAddButton().setDisabled(! me.canAddChild(selected));		
		me.getRemoveButton().setDisabled(! me.canRemove(selected));
		me.getGoToPageButton().setDisabled(! me.isLeaf(selected));
	},
	
	isLeaf: function(selected) {
		return selected.length > 0 && selected[0].isLeaf();
	},
	
	canRemove: function(selected) {
		/* TODO: Evaluate constraints */
		return selected && ! selected[0].isRoot();
	},
	
	canAddChild : function(selected) {
		if(selected.length <= 0 || selected[0].isLeaf()) {
			return false;
		}
		
		var config = this.getNodeConfig(selected[0]),
			children = config.children,
			type;
			
		for(type in children) {
			if(this.canAdd(type, selected[0])) {
				return true;
			}
		}
		
		return false;
	},
	getConfig: function(type) {
		var store = this.getContentTypeStore();
		if(store.isLoading()) {
			return {};
		}
		return store.getById(type).get('section');
	},
	getNodeConfig: function(node) {
		return this.getConfig(node.get('type'));
	},
	
	canAdd: function(type, parent) {
		var parentConfig = this.getNodeConfig(parent),
			constraints = parentConfig.constraints;
			
		if(parentConfig.leaf === true) {
			return false;
		}
		if(! constraints) {
			return true;
		}
		/* TODO: Evaluate constraints */
		return true;
	},

	onAddChild : function() {
		var me = this,
			selectedNode = me.getView().getSelectionModel().getSelection()[0];
		
		if(! selectedNode) {
			return;
		}
		
		selectedNode.expand(false, function(){
			this.showAddMenu(selectedNode);
		}, this);
		
	},
	
	showAddMenu: function(node) {
		var config = this.getNodeConfig(node),
			children = config.children,
			button = this.getAddButton(),
			type,
			menuItems = [];

		for(type in children) {
			if(this.canAdd(type, node)) {
				menuItems.push({
					type : type,
					text : children[type].label,
					iconCls : children[type].iconCls
				});
			}
		}
	
		if(menuItems.length <= 0) {
			return;
		}
		
		var menu = Ext.create('Ext.menu.Menu', {
		    margin: '0 0 10 0',
		    renderTo: Ext.getBody(),
		    items: menuItems,
		    listeners : {
		    	click : function(menu, item, e, eOpts) {
					if(! item) {
						return;
					}
					this.addChild(item.type, node);
			    },
			    scope: this
			}
		});
	
		Ext.defer(menu.showBy, 1, menu, [button]);
	},
	
	addChild: function(type, node) {
		node.expand(false, function() {
			var config = this.getConfig(type),
				parentContig = this.getNodeConfig(node),
				newNode = node.appendChild({
					leaf: config.leaf,
					text: config.leaf ? "/" : parentConfig.children[type].defaultText,
					type: type
				}),
				treeEditor = this.getView();

			Ext.defer(function() {
				treeEditor.getSelectionModel().select(newNode);

				treeEditor.getPlugin('treeEditing').startEdit(newNode, 0);
			}, 300, this);
		}, this);
	},
	
	onEdit: function(editor, event) {
		this.view.store.sync({
			callback: function(batch, options) {
				var op = batch.operations, i = 0, ln = op.length, record; 
				for(; i < ln; i++) {
					if(op[i].action == "create") {
						record = op[i].records[0];
						if(record.isLeaf()) {
							this.getBus().fireEvent('siteeditor.pageCreated', this.getView(), record.getUrl());
						}
						return;
					}
				}
			},
			scope: this
		});
	},

	onRemoveChild : function(button) {
		var me = this,
			selectedNode = me.getView().getSelectionModel().getSelection()[0],
			resourceType;
		
		if(! selectedNode) {
			return;
		}

		selectedNode.expand(true);
		resourceType = selectedNode.isLeaf() ? "page?" : "group of pages?";

		Ext.Msg.show({
		     title:'Remove ' + resourceType,
		     msg: 'Do you want to remove the selected ' + resourceType,
		     buttons: Ext.Msg.OKCANCEL,
		     icon: Ext.Msg.QUESTION,
		     fn : function(btn) {
				if(btn != "ok") {
					return;
				}
				me.getView(button).getSelectionModel().select(selectedNode.parentNode);
				selectedNode.remove(true);
			}
		});
	},
/*
	findChildNodeById : function(childNodes, controllerId) {
		var me = this,
			i = 0,
			ln = childNodes.length;
		
		for(; i < ln; i++) {
			if(childNodes[i].get('id') == controllerId) {
				return childNodes[i];
			}
		}
	},
	
	onHistoryChange: function(url, pageInfo) {
		return;
		var me = this,
			controllers = [],
			i = 0, 
			ln = pageInfo.controller.length,
			treeEditor = me.getView(),
			selectController = function(childNodes) {
				var node = me.findChildNodeById(childNodes, controllers[i++]);
				
				if(! node) {
					return;
				}
				if(i < ln) {
					return node.expand(false, selectController, me);
				}
				treeEditor.getSelectionModel().select(node);
			};
		
		for(; i < ln; i++) {
			controllers.push(pageInfo.controller[i].id);
		}
		i = 0;
		treeEditor.getRootNode().expand(false, selectController, me);
	},
	*/
	onTreeViewAfterRender : function(treeview) {
    	var me = this;
/*		treeview.tip = Ext.create('Ext.tip.ToolTip', {
	        target: treeview.el,
	        delegate: treeview.itemSelector,
	        tpl : '{url}',	        
	        trackMouse: true,
	        renderTo: Ext.getBody(),
	        listeners: {
	            beforeshow: function updateTipBody(tip) {
	            	var record = treeview.getRecord(tip.triggerElement),
	            		linkId = record.get('linkId');
	            	
	            	if(! record.isLeaf() || ! linkId ) {
	            		return false;
	            	}
	            	
					Siteeditor.model.Link.load(linkId, {
						scope : me,
					    failure: function(record, operation) {
					    },
					    success: function(record, operation) {
					    	tip.update({url : record.get('url')});
					    }
					});
	            	
	            }
	        }
	    });
	    */
	}
	
});