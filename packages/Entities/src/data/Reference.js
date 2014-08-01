Ext.define('Entities.data.Reference', {
	requires: ['Ext.data.Types']
}, function() {
	Ext.apply(Ext.data.Types, {
		REFERENCE: {
			sortType: Ext.data.SortTypes.none,
			type: "reference"
		}
	});
});