Ext.define('Fields.filters.like', {
	extend: 'Ext.ux.grid.filter.StringFilter',
	alias: 'gridfilter.cmf_like',
	
	getSerialArgs : function () {
	    return {type: 'string', comparison: 'like', value: this.getValue() + '%' };
	}
});