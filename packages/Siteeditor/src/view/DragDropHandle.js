Ext.define('Siteeditor.view.DragDropHandle', {
	alias : 'widget.cmf_siteeditor_dragdrophandle',
	extend : 'Ext.container.Container',

	floating : true,
	html : '<div style="width: 100%;height:100%;"class="resizr"></div>',

	style : {
		zIndex : 100000
	},
	draggable: {
        delegate: 'div'
	},
	resizable: {
		dynamic : true,
		pinned : true
	},
	resizableMapping : {
		left : 'w',
		right : 'e',
		top : 'n',
		bottom : 's'
	},
	initComponent : function() {
		var me = this; 

		me.callParent(arguments);

		me.initSize();
		me.initHandles();
		
		me.on('boxready', me.initResizeEvents, me);
	},
	initHandles : function() {
		var me = this,
			variable,
			handleModel,
			handlesStore,
			handles = [];
		
		me.dragDirections = {};
		me.inverseResizing = {};
		me.halfSize = {};
		me.variableMapping = {};
		
		for(variable in me.dragDropModels) {
			handlesStore = me.dragDropModels[variable].handles();
			
			me.variableMapping[variable] = me.variableMapping[variable] || {};
			
			handlesStore.each(function(record) {
				var direction = record.get('direction');
				if(record.get('type') == "resize") {
					
					me.variableMapping[variable].resize = me.variableMapping[variable].resize || []; 
					me.variableMapping[variable].resize.push(direction);
					
					handles.push(me.resizableMapping[direction]);

					if(record.get('inverse') === true) {
						me.inverseResizing[direction] = true;
					}
					if(record.get('halfSize') === true) {
						me.halfSize[direction] = true;
					}
				} else if(record.get('type') == "drag") {
					me.variableMapping[variable].drag = me.variableMapping[variable].drag || []; 
					me.variableMapping[variable].drag.push(direction);

					me.draggable = true;
					me.dragDirections[direction] = true;
				}
			});
		}
		
		me.resizeHandles = handles.join(' ');
	},
	initSize : function() {
		var me = this, 
			position = me.node.offset(),
			width = me.node.outerWidth(),
			height = me.node.outerHeight();

		me.setPosition(position.left, position.top);
		me.setWidth(width);
		me.setHeight(height);
		
		me.lastPosition = [position.left, position.top];
		me.lastWidth = width;
		me.lastHeight = height;
	},
	initResizeEvents: function(component, width, height, eOpts) {
		var me = this;

		me.resizer && me.resizer.on('resizedrag', me.onResizeDrag, me);
		me.dd && me.dd.on('mousemove', me.onDrag, me);
	},
	onResizeDrag: function(resizer, width, height, e, eOpts) {
		var me = this,
			currentPosition = me.getPosition(),
			resizing = {}, k, variable, i,ln, changes = {};
			
		resizing.left = currentPosition[0] - me.lastPosition[0];
		resizing.top = currentPosition[1] - me.lastPosition[1];
		resizing.right = width - me.lastWidth + resizing.left;
		resizing.bottom = height - me.lastHeight + resizing.top;  
		
		me.lastWidth = width;
		me.lastHeight = height;
		me.lastPosition = currentPosition;

		for(k in resizing) {
			if(me.inverseResizing[k] === true) {
				resizing[k] = -resizing[k];
			}
			if(me.halfSize[k] === true) {
				resizing[k] = resizing[k] * 2;
			}

		}
		
		for(variable in me.variableMapping) {
			changes[variable] = changes[variable] || [];
			for(i = 0, ln = me.variableMapping[variable].resize.length; i < ln; i++) {
				changes[variable].push(resizing[me.variableMapping[variable].resize[i]]);
			} 
		}
		
		return me.framePanel.fireEvent('drag', me.framePanel, me.component, changes);
	},
	onDrag: function(dragger, e, eOpts) {
		var me = this,
			currentPosition = me.getPosition(),
			left = currentPosition[0] - me.lastPosition[0],
			top = currentPosition[1] - me.lastPosition[1],
			variable, i,ln, changes = {};
			
		me.lastPosition = currentPosition;

		for(variable in me.variableMapping) {
			changes[variable] = changes[variable] || [];
			for(i = 0, ln = me.variableMapping[variable].drag.length; i < ln; i++) {
				changes[variable].push(resizing[me.variableMapping[variable].drag[i]]);
			} 
		}

		me.framePanel.fireEvent('drag', me.framePanel, changes);
	}
});
