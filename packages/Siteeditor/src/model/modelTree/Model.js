Ext.define('Siteeditor.model.modelTree.Model', {
	extend: 'Siteeditor.model.modelTree.Abstract',
	
	requires: [
	    'Siteeditor.model.modelTree.List',
	    'Siteeditor.model.modelTree.SectionList'
	],

	inject: {
		imageService: 'imageService'
	},

	fields : [
		{ name : 'text', type : 'string', persist : false },
		{ name : 'modelInstance', type : 'auto', persist : false },
		{ name : 'leaf', type : 'bool', persist : false, defaultValue: true }
	],
	
	init: function() {
		var me = this,
			modelInstance = me.get('modelInstance');
		
		if(! modelInstance) {
			return;
		}
		
		this.initialized = true;
		
		me.modelConfig = me.modelManager.get(modelInstance.type);
		
		modelInstance.type != "rootModel" && me.modelManager.wrap(modelInstance, {
			scope: this,
			success: function(record, operation) {
				this.extModel = record;
				record.on('idchanged', this.onExtModelIdChanged, this);
				record.on('modified', this.onExtModelModified, this);
			}
		})
		
		modelInstance.on('destroy', me.removeFromList, me);
		
		modelInstance.on('mouseenter', me.onMouseEnter, me);
		modelInstance.on('mouseleave', me.onMouseLeave, me);
		
		modelInstance.on('set', me.onInstanceSet, me);
		modelInstance.on('component.click', me.onComponentClick, me);
		
		modelInstance.fireEvent('listenmouseover');
		modelInstance.fireEvent('listenclick');
	},

	buildTree: function() {
		var me = this, 
			fields, 
			model = me.get('modelInstance'),
			i, 
			ln, 
			field,
			className,
			childNode;

		fields = me.modelConfig.get('fields');
		
		me.updateText();
		
		for(i = 0, ln = fields.length; i < ln; i++) {
			field = fields[i];
			
			if(field.model.type == "reference") {
				if(field.form && field.form.exclude === true) {
					continue
				}
				
				className = 'Siteeditor.model.modelTree.List';
				if(field.id == "nextSection") {
					className = 'Siteeditor.model.modelTree.SectionList';
				}
				
				childNode = me.createChildNode(className, {
					expanded: true,
					leaf: false
				});
				
				childNode.on('listchanged', this.onListChanged, this);
				
				childNode.initialize(me, field, model.getModel(field.id));
			}
		}
	},
	
	appendToList: function(list) {
		var config = this.modelConfig.get('modelTree');
		if(config.hidden === true) {
			this.parentNode = list;
			return;
		}
		list.appendChild(this);
	},

	insertToList: function(index, list) {
		var config = this.modelConfig.get('modelTree');
		if(config.hidden === true) {
			this.parentNode = list;
			return;
		}
		list.insertChild(index, this);
	},
	
	removeFromList: function() {
		this.remove();
	},
	
	updateText: function() {
		var config = this.modelConfig.get('modelTree'),
			label = config.label || [ this.modelConfig.get('label') ],
			modelInstance = this.get('modelInstance'),
			i = 0,
			ln = label.length,
			txt = "";
		
		for(; i < ln; i++) {
			if(label[i][0] == "$") {
				txt += modelInstance.get(label[i].substring(1));
			} else {
				txt += label[i];
			}
		}
		
		txt = Ext.String.ellipsis(txt, 30);
		this.set('text', txt);
	},
	
	highlightComponent: function() {
		this.initialized && this.get('modelInstance').fireEvent('highlight');
	},
	
	lowlightComponent: function() {
		this.initialized && this.get('modelInstance').fireEvent('lowlight');
	},
	
	select: function() {
		this.bus.fireEvent('siteeditor.model.select', this);
	},
	
	deselect: function() {
		this.bus.fireEvent('siteeditor.model.deselect', this);
	},
	
	canRemove: function() {
		return true;
	},
	
	removeRequested: function(onRemove, scope) {
		onRemove.call(scope || window);
		this.parentNode.removeModel(this.get('modelInstance'))
	},
	
	imageTipTpl : '<img src="{src}" class="cmf-dndimagetable-tooltip"/>',

	handleTooltip: function(tip) {
		if(! this.initialized) {
			return false;
		}
		
		var me = this,
			treeConfig = me.modelConfig.get('modelTree'),
			toolTipConfig = treeConfig.tooltip || {},
			field = toolTipConfig.field,
			type = toolTipConfig.type,
			resource;
			
		if(type == "image") {
			resource = me.get('modelInstance').get(field);
			me.imageService.get(resource, {
			    scope: me,
			    failure: function(record, operation) {
			    },
			    success: function(record, operation) {
				    if(! this.imageTipTemplate) {
			    		this.imageTipTemplate = new Ext.Template(this.imageTipTpl);
			    		this.imageTipTemplate.compile();
				    }
				    
					tip.update(this.imageTipTemplate.apply({
				    	src : record.get('thumb')
				    }));
					tip.setWidth(104 + 12);
				    tip.setHeight(78 + 12);
			    }
			});
			return true;
		}
		
		return false;
	},
	
	onMouseEnter: function(component) {
		this.bus.fireEvent('siteeditor.model.mouseenter', this);
	},
	
	onMouseLeave: function(component) {
		this.bus.fireEvent('siteeditor.model.mouseleave', this);
	},
	
	onComponentClick: function(component, event, elmenet) {
		this.bus.fireEvent('siteeditor.model.click', this, event);
	},
	
	onInstanceSet: function(variable, newValue, oldValue) {
		this.extModel && this.extModel.set(variable, newValue);
		this.updateText();
	},
	
	onExtModelIdChanged: function(model, oldId, newId, eOpts) {
		this.get('modelInstance').setId(newId);
	},

	onExtModelModified: function(variable, newValue) {
		if(! this.initialized) {
			return;
		}
		
		this.initialized && this.get('modelInstance').set(variable, newValue);
		this.extModel.dirty && this.bus.fireEvent('field.changed');
	},
	
	onListChanged: function(field, value) {
		this.extModel.suspendEvents(false);
		this.extModel.set(field, value);
		this.extModel.resumeEvents();
		this.extModel.dirty && this.bus.fireEvent('field.changed');
	}

});