Ext.define('Images.controller.ImageTreeEditor', {
	extend: 'Deft.mvc.ViewController',

	mixins: {
	    observable: 'Ext.util.Observable'
	},	          
	
	control: {
		addButton : {
			selector : '#addButton',
			listeners : {
				click : 'addChild'
			}
		},
		removeButton : {
			selector : '#removeButton',
			listeners : {
				click : 'removeChild'
			}
		},
		treeView : {
			selector : 'treeview',
			listeners : {
				beforedrop : 'onBeforeDrop',
				drop : 'onDrop'
			}
		},
		
		view : {
			listeners: { 
				selectionchange : 'onSelectionChange',
				edit: 'onEdit'
			}
		}
	},
	
	onSelectionChange: function(selectionModel, selected, eOpts) {
		var me = this;
	
		me.getAddButton().setDisabled(! me.canAddChild(selected));		
		me.getRemoveButton().setDisabled(! me.canRemoveChild(selected));		
	},
	
	canRemoveChild : function(selected) {
		if(selected.length > 0 && ! selected[0].isRoot()) {
			return true;
		}
		return false;
	},
	
	canAddChild : function(selected) {
		if(selected.length > 0 && ! selected[0].isLeaf()) {
			return true;
		}
		return false;
	},
	
	onBeforeDrop: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
		var me = this,
			newRecords = [], 
			i = 0, 
			ln = data.records.length, 
			record;
		
		if(! data.records[0].get('label')) {
			return;
		}
		for(; i < ln; i++) {
			me.view.fireEvent('startImageTransfer', data.records[i], overModel);
		}	
		data.records = [];
	},
	onDrop: function(node, data, overModel, dropPosition, eOpts) {
		overModel.expand(false, function() {
			// Insure that the handler is called as last
			Ext.defer(function() {
				this.view.store.sync()
			},1,this);
		}, this);
	},
	
	addChild : function(button) {
		var me = this,
			selectedNode = me.view.getSelectionModel().getSelection()[0],
			treeEditor = me.view,
			newNode;
		
		if(! selectedNode) {
			return;
		}
		
		selectedNode.expand(false, function() {
			var node = selectedNode.createNode({
				cls : "file",
				leaf: false,
				text : "New folder"
			});
			
			newNode = selectedNode.appendChild(node);
			
			Ext.defer(function() {
				treeEditor.getSelectionModel().select(newNode);

				treeEditor.getPlugin('treeEditing').startEdit(newNode, 0);
			}, 300, me);
		});
	},
	
	removeChild : function(button) {
		var me = this,
			selectedNode = me.view.getSelectionModel().getSelection()[0],
			leaf, resourceType;
		
		if(! selectedNode) {
			return;
		}

		leaf = selectedNode.isLeaf();
		resourceType = leaf ? "image?" : "folder?";

		Ext.Msg.show({
		     title:'Remove ' + resourceType,
		     msg: 'Do you want to remove the selected ' + resourceType,
		     buttons: Ext.Msg.OKCANCEL,
		     icon: Ext.Msg.QUESTION,
		     fn : function(btn) {
				if(btn != "ok") {
					return;
				}
				selectedNode.remove(true);
			},
			scope: this
		});
	},
	onEdit: function(editor, event) {
		this.getView().store.sync();
	}

});