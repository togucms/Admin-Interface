Ext.define('Shared.overrides.CellEditor', {
	override : 'Ext.grid.CellEditor',
	
	realign: function(autoSize) {
	    var me = this,
	        boundEl = me.boundEl,
	        innerCell = boundEl.first(),
	        width = boundEl.getWidth(),
	        offsets = Ext.Array.clone(me.offsets),
	        grid = me.grid,
	        xOffset;
	
	    if (me.isForTree) {
	        // When editing a tree, adjust the width and offsets of the editor to line
	        // up with the tree cell's text element
	        xOffset = me.getTreeNodeOffset(innerCell);
	        width -= Math.abs(xOffset);
	        offsets[0] += xOffset;
	    }
	
	    if (grid && grid.columnLines) {
	        // Subtract the column border width so that the editor displays inside the
	        // borders. The column border could be either on the left or the right depending
	        // on whether the grid is RTL - using the sum of both borders works in both modes. 
	        width -= boundEl.getBorderWidth('rl');
	    }
	
	    if (autoSize === true) {
	        me.field.setWidth(width);
	    }
	
	    me.alignTo(innerCell, me.alignment, offsets);
	}

})