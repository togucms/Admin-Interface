Ext.define('Siteeditor.model.modelTree.List', {
	extend: 'Siteeditor.model.modelTree.Abstract',
	
	fields : [
		{ name : 'text', type : 'string', persist : false }
	],
	
	initialize: function(parent, config, list) {
		var me = this, 
			list;
		
		me.parentNode = parent;
		me.listConfig = config;
		me.list = list;
		
		me.set('text', config.label || config.name);
		
		me.appendToParent();
		
		me.setEvents();
		
		me.createNewNodes(me.list, 0);
	},
		
	appendToParent: function() {
		if(this.parentNode.isLeaf()) {
			this.parentNode.set('leaf', false);
		}
		this.parentNode.appendChild(this);
	},

	setEvents: function() {
		var me = this,
			list = me.list;
		
		list.on('add', me.onListAdd, me);
		list.on('remove', me.onListRemove, me);
		list.on('set', me.onListSet, me);
		list.on('rearrange', me.onListRearrange, me);
		list.on('destroy', me.onListDestroy, me);
		list.on('changed', me.onListChanged, me);
	},
	
	createNewNodes: function(elements, position) {
		var me = this,
			i = 0,
			ln = elements.length,
			childNode,
			newNodes = [],
			parent = me;

		for(; i < ln; i++) {
			childNode = me.createChildNode('Siteeditor.model.modelTree.Model',{
				modelInstance: elements[i]
			});
			
			childNode.insertToList(position + i, parent);

			childNode.buildTree();
			
			newNodes.push(childNode);
		}
		return newNodes;
	},

	onListAdd: function(elements, position) {
		var newNodes = this.createNewNodes(elements, position),
			i = 0, ln = newNodes.length;
			
		for(; i < ln; i++) {
			newNodes[i].expand(true);
		}
	},
	
	onListRemove: function(elements, position) {
	},
	
	onListSet: function(index, newValue, oldValue) {
		var me = this,
			oldNode = me.getChildAt(index);
			
		oldNode && oldNode.removeFromList();
		me.createNewNodes([newValue], index);
	},
	
	onListRearrange: function(elements) {
		console.error('rearrange', elements);
	},
	
	onListDestroy: function() {
		this.remove();
	},
	
	onListChanged: function() {
		var me = this,
			list = me.list,
			i = 0, 
			ln = list.length, 
			newList = [];

		for(; i < ln; i++) {
			newList.push({
				id: list[i].id,
				type: list[i].type
			});
		}
		this.fireEvent('listchanged', this.listConfig.id, newList);
	},
	
	canAdd: function() {
		return this.listConfig.addMenu && this.listConfig.addMenu.items && this.listConfig.addMenu.items.length > 0 
	},

	addChild: function(button) {
		if(! this.canAdd()) {
			return;
		}
		
		var menu = Ext.create('Ext.menu.Menu', {
		    margin: '0 0 10 0',
		    renderTo: Ext.getBody(),
		    items: this.listConfig.addMenu.items,
			listeners : {
				click :  function(menu, item, e, eOpts) {
					item.value && this.list.push(item.value);
			    },
			    scope : this
			}

		});
		menu.showBy(button);
	},
	
	removeModel: function(model) {
		this.list.remove(model);
	},
	
	insertModel: function(index, model) {
		this.list.splice(index, 0, model);
	},
	
	canDrop: function(model) {
		var addMenu = this.listConfig.form.addMenu,
			modelInstance = model.get('modelInstance'),
			modelType = modelInstance && modelInstance.type,
			i = 0, ln;
		if(! addMenu || ! modelType) {
			return false;
		}
		for(ln = addMenu.length; i < ln; i++) {
			if(addMenu[i].model == modelType) {
				return true;
			}
		}
		return false;
	}
});