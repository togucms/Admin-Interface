Ext.define('Shared.util.TreeEditing', {
    extend: 'Ext.grid.plugin.CellEditing',
    alias: 'plugin.treeediting',
    
    requires : [
       'Shared.util.TreeColumn'         
    ],
    
    getEditor: function(record, column) {
        var me = this,
            editors = me.editors,
            editorId = column.getEditorId(record),
            editor = editors.getByKey(editorId);

        if (editor) {
            return editor;
        } 
        editor = column.getEditor(record);
        if (!editor) {
            return false;
        }

        // Allow them to specify a CellEditor in the Column
        // Either way, the Editor is a floating Component, and must be attached to an ownerCt
        // which it uses to traverse upwards to find a ZIndexManager at render time.
        if (!(editor instanceof Ext.grid.CellEditor)) {
            editor = new Ext.grid.CellEditor({
                editorId: editorId,
                field: editor,
                ownerCt: me.grid
            });
        } else {
            editor.ownerCt = me.grid;
        }
        editor.editingPlugin = me;
        editor.isForTree = me.grid.isTree;
        editor.on({
            scope: me,
            specialkey: me.onSpecialKey,
            complete: me.onEditComplete,
            canceledit: me.cancelEdit
        });
        editors.add(editor);
        return editor;
    }
});
