Ext.define('Entities.data.Image', {
	requires: ['Ext.data.Types']
}, function() {
	Ext.apply(Ext.data.Types, {
		IMAGE: {
			sortType: Ext.data.SortTypes.none,
			type: "image",
			convert: Ext.data.Types.INT.convert
		}
	});
});