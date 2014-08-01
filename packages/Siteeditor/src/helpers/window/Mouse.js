Ext.define('Siteeditor.helpers.window.Mouse', {
	mixins : {
		observable : 'Ext.util.Observable'
	},
	
	inject: ['bus'],

	config : {
		traceEvents : true,
		uxiframe : undefined,
		componentIndex : undefined
	},

	constructor : function(config) {
		var me = this;

		me.callParent(arguments);

		me.mixins.observable.constructor.call(this, config);

		me.addEvents(
			'mousedown',
			'mousemove',
			'mouseup',
			'click',
			'dblclick',
			'mouseenter',
			'mouseout'
		);
		
		me.uxiframe.on('mouseEvent', me.onMouseEvent, me);
		
		me.bus.on({
			scope: me,
			'siteeditor.iframe.tpl.htmlfocus'  : me.onHtmlFocus,
			'siteeditor.iframe.tpl.htmlblur'   : me.onHtmlBlur,
			'siteeditor.controller.startdrag' : me.onControllerStartDrag,
			'siteeditor.controller.enddrag' : me.onControllerEndDrag,
			'cmf.images.imagebrowser.startdrag' : me.onImageStartDrag,
			'cmf.images.imagebrowser.enddrag' : me.onImageEndDrag
		});
	},
	
	onImageStartDrag : function(view) {
		this.setTraceEvents(false);
	},
	onImageEndDrag : function(view) {
		this.setTraceEvents(true);
	},
	onControllerStartDrag : function(view) {
		this.setTraceEvents(false);
	},
	onControllerEndDrag : function(view) {
		this.setTraceEvents(true);
	},	
	onHtmlFocus : function(view, node) {
		if(Ext.isIE) {
			this.setTraceEvents(false);
		}
	},
	onHtmlBlur : function(view, node) {
		if(Ext.isIE) {
			this.setTraceEvents(true);
		}
	},
	
	onMouseEvent : function(evt) {
		if(this.getTraceEvents() !== true) {
			return;
		}
		var me = this,
			nodeInfo = me.findNodesByXY(evt);

		me.fireEvent(evt.type, me.getComponentIndex(), nodeInfo.nodeIds, nodeInfo.nodes, evt);
	},
	findNodesByXY : function(e) {
		var me = this, 
			componentIndex = me.getComponentIndex(),
			node,
			nodes = [],
			nodeIds = [],
			elements = [],
			xy = e.getXY(), 
			parent, 
			i, ln,
			findParent = true,
			doc = me.getUxiframe().getDoc();

		element = Ext.get(doc.elementFromPoint(xy[0], xy[1]));
		
		while (findParent && element) {
			id = element.getAttribute('data-cmf-id');
			if(id !== null) {
				node = componentIndex.getNode(id);
				if(node && node[0]) {
					nodeIds.push(id);
					nodes.push(node);
				}
			}
			
			elements.push(element);
			element.setVisible(false);

			parent = Ext.get(doc.elementFromPoint(xy[0], xy[1]));
			
			findParent = parent && parent.id != element.id;
			
			element = parent;
		}

		for (i=0, ln = elements.length; i < ln; i++) {
			elements[i].setVisible(true);
		}

		return {
			nodes : nodes,
			nodeIds : nodeIds
		};
	}
}); 