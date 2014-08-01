Ext.define('Siteeditor.model.modelTree.Abstract', {
	extend: 'Ext.data.Model',
	
	inject: {
	     modelManager: 'entities_modelManager',
	     bus: 'bus'
	},

	getRootNode: function() {
		var node = this;
		while(node.parentNode) {
			node = node.parentNode;
		}
		return node;
	},
	
	createChildNode: function(className, config) {
		Ext.data.NodeInterface.decorate(Ext.ClassManager.get(className));
		
		return Ext.create(className, config || {});
	},
	highlightComponent: function() {
		
	},
	lowlightComponent: function() {
		
	},
	canAdd: function() {
		return false;
	},
	canRemove: function() {
		return false;
	},
	
	select: function() {
		
	},
	deselect: function() {
		
	},
	addChild: function(button) {
	},
	removeRequested: function(onRemove, scope) {
		
	},
	canDrop: function(model) {
		return false;
	},
	
	insertModel: function() {
	},
	
	handleTooltip: function(tip) {
		return false;
	},
	contextMenu: function(e) {
/*		menu = Ext.create('Ext.menu.Menu', {
		    margin: '0 0 10 0',
		    renderTo: Ext.getBody(),
		    items: items
		});
		
		menu.alignTo(item);
		menu.show();
		
		e.stopEvent();
*/		
	}

	
	

});