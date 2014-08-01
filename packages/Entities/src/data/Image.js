Ext.define('Entities.data.Link', {
	requires: ['Ext.data.Types']
}, function() {
	Ext.apply(Ext.data.Types, {
		LINK: {
			sortType: Ext.data.SortTypes.none,
			type: "link",
			convert: Ext.data.Types.INT.convert
		}
	});
});