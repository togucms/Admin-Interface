Ext.define('Siteeditor.controller.ComponentTree', {
	extend: 'Deft.mvc.ViewController',

	inject: {
		bus : 'bus'
	},
	
	config : {
		bus : null
	},

	observe : {
		bus : {
			'siteeditor.iframe.mouse.mousemove': 'onMouseMove',
			'siteeditor.iframe.mouse.mouseout': 'onMouseMove',
			
			'siteeditor.model.mouseenter': 'onNodeMouseEnter',
			'siteeditor.model.mouseleave': 'onNodeMouseLeave',
			
			'siteeditor.model.click': 'onModelClick',
			
			'siteeditor.iframe.bus.sitecontroller.rootmodel' : 'setRoot'
		}
	},
	
	control : {
		addButton : {
			selector: '#add-component',
			listeners : {
				click : 'onAddComponent'	
			}
		},
		removeButton : {
			selector: '#remove-component',
			listeners : {
				click : 'onRemoveComponent'	
			}
		},
		treeView : {
			selector: 'treeview',
			listeners : {
				beforedrop : 'onBeforeDrop',
				isvaliddroppoint : 'onIsValidDropPoint',
				afterrender : 'onTreeViewAfterRender'
			}
		},
		view : {
			select : 'onSelect',
			deselect : 'onDeselect',
			itemmousedown: 'onItemClick',
			itemmouseenter : 'onItemMouseEnter',
			itemmouseleave : 'onItemMouseLeave',
			itemcontextmenu : 'onItemContextMenu'
		}

	},
	
	init: function() {
		this.highlitedNodes = {};
	},
	
	getSelected: function() {
		return this.getView().getSelectionModel().getSelection()[0];
	},

	onItemContextMenu: function (view, record, item, index, e, eOpts) {
		record.contextMenu(e);
	},
	
	onItemMouseEnter : function(view, record, item, idx, evt) {
		record.highlightComponent();
	},
	
	onItemMouseLeave : function(view, record, item, idx, evt) {
		record.lowlightComponent();
	},
	
	canAdd : function(record) {
		return record.canAdd();
	},
	
	canRemove : function(record) {
		return record.canRemove();
	},
	
	deselectAll: function() {
		this.getView().getSelectionModel().deselectAll();
	},
	
	onItemClick: function(view, record, item, index, e, eOpts) {
		if(this.getSelected() == record) {
			Ext.defer(this.deselectAll, 1, this);
		}
	},
	
	onSelect : function(view, record, item, idx, evt) {
		var me = this, 
			addButton = me.getAddButton(),
			removeButton = me.getRemoveButton();
			
		addButton.setDisabled(!me.canAdd(record));
		removeButton.setDisabled(!me.canRemove(record));
		
		me.lowLightAllNodes();
		
		record.select();
	},	
	
	onDeselect : function(view, record, item, idx, evt) {
		var me = this, 
			addButton = me.getAddButton(),
			removeButton = me.getRemoveButton();
			
		addButton.setDisabled(true);
		removeButton.setDisabled(true);
		
		record.deselect();
	},	
	onIsValidDropPoint : function(treeview, node, position, dragZone, e, data) {
		var me = this,
			targetNode = treeview.getRecord(node),
			draggedNode = data.records[0];
		
		targetNode = position == "append" ? targetNode : targetNode.parentNode;
		
		if(! targetNode) {
			return false;
		}
		
		return targetNode.canDrop(draggedNode);
	},	

	onBeforeDrop: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
		var me = this,
		
			oldParentListen, newParentListen,
			
			draggedNode = data.records[0],
			modelInstance = draggedNode.get('modelInstance'),
			
			oldParent = draggedNode.parentNode,
			newParent = dropPosition == "append" ? overModel : overModel.parentNode,
					
			newPosition = dropPosition == "before" ? overModel.get('index') : overModel.get('index') + 1,
			
			isSameParent = oldParent.id == newParent.id;
		
		if(isSameParent && draggedNode.get('index') < newPosition) {
			newPosition--;
		}
		dropHandlers.cancelDrop();

		oldParent.removeModel(modelInstance);
		newParent.insertModel(newPosition, modelInstance);
	},
	
	setRoot: function(siteController, rootModel) {
		var me = this,
			treePanel = me.getView(), 
			rootNode = treePanel.setRootNode({
				expanded: true,
				modelInstance: rootModel,
				leaf: false
		});
			
		rootNode.buildTree();
	},
	
	onAddComponent : function(button) {
		var selected = this.getSelected();
		
		selected && selected.addChild(button);
	},
	
	onRemoveComponent : function() {
		var selectionModel = this.getView().getSelectionModel(),
			selected = this.getSelected();
		
		selected && selected.removeRequested(function() {
			selectionModel.select(selected.nextSibling || selected.previousSibling || selected.parentNode);
		}, this);
	},
	
	onNodeMouseEnter: function(record) {
		var selected = this.getSelected(),
			node = this.getView().getView().getNode(record),
			element = node && Ext.get(node).down('.x-grid-cell-inner');
			
		if(! selected && element) {	
			element.addCls('highlited');
			this.highlitedNodes[element.id] = true;
		}
	},
	
	onNodeMouseLeave: function(record) {
		var node = this.getView().getView().getNode(record),
			element = node && Ext.get(node).down('.x-grid-cell-inner');
			
		if(element) {	
			element.removeCls('highlited');
			
			this.highlitedNodes[element.id] = undefined;
			delete this.highlitedNodes[element.id];
		}
	},
	
	onModelClick: function(record, event) {
		if(event.originalEvent && event.originalEvent.handled === true) {
			return;
		}
		if(event.originalEvent) {
			event.originalEvent.handled = true;
		}
			
		var selected = this.getSelected();
		if(selected && selected.id == record.id) {
			event.stopPropagation();
			return;
		}
		this.getView().getSelectionModel().select(record);
	},
	
	lowLightAllNodes: function() {
		var k, el;
		for(k in this.highlitedNodes) {
			el = Ext.fly(k);
			el && el.removeCls('highlited');
		}
		this.highlitedNodes = {};
	},
	
	onTreeViewAfterRender : function(treeView) {
    	var me = this;

		treeView.tip = Ext.create('Ext.tip.ToolTip', {
	        target: treeView.el,
	        delegate: treeView.itemSelector,
	        trackMouse: true,
	        renderTo: Ext.getBody(),
	        listeners: {
	            beforeshow: function updateTipBody(tip) {
	            	var record = treeView.getRecord(tip.triggerElement);
	            	
	            	return record.handleTooltip(tip);
	            }
	        }
	    });
	}

});
