Ext.define('Siteeditor.model.modelTree.SectionList', {
	extend: 'Siteeditor.model.modelTree.List',
	
	appendToParent: function() {
		this.parentNode = this.getRootNode();
	},

	onListAdd: function(elements, position) {
		if(elements.length > 0) {
			console.error('This should never happen!');
		}
	},
	
	onListRemove: function(elements, position) {
		console.error('This should never happen!');
	},
	
	onListSet: function(index, newValue, oldValue) {
		var me = this,
			childNode = me.createChildNode('Siteeditor.model.modelTree.Model', {
				text: newValue.type,
				modelInstance: newValue,
				expanded: true
			});

		childNode.appendToList(me.parentNode);

		childNode.buildTree();
		
		childNode.expand(true);
	},
	
	onListRearrange: function(elements) {
		console.error('This should never happen!');
	},
	
	onListChanged: function() {
	}
});