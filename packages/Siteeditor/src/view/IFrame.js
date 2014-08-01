/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

/**
 * Barebones iframe implementation. For serious iframe work, see the ManagedIFrame extension
 * (http://www.sencha.com/forum/showthread.php?71961).
 *
 * @class Ext.ux.IFrame
 */
Ext.define('Siteeditor.view.IFrame', {
    extend: 'Ext.ux.IFrame',

    alias: 'widget.siteeditor_iframe',

    initComponent: function () {
        this.callParent();

        this.addEvents(
            'mouseEvent'
        );
    },

    onLoad: function() {
        var me = this,
            doc = me.getDoc(),
            fn = me.onRelayedEvent;

        if (doc) {
            try {
                Ext.EventManager.removeAll(doc);

                // These events need to be relayed from the inner document (where they stop
                // bubbling) up to the outer document. This has to be done at the DOM level so
                // the event reaches listeners on elements like the document body. The effected
                // mechanisms that depend on this bubbling behavior are listed to the right
                // of the event.
                Ext.EventManager.on(doc, {
                    mousedown: fn, // menu dismisal (MenuManager) and Window onMouseDown (toFront)
                    mousemove: fn, // window resize drag detection
                    mouseup: fn,   // window resize termination
                    click: fn,     // not sure, but just to be safe
                    dblclick: fn,  // not sure again
                    mouseleave: fn,  // not sure again
                    mouseenter: fn,  // not sure again
                    contextmenu: fn,  // not sure again
                    scope: me
                });
            } catch(e) {
                // cannot do this xss
            }

            // We need to be sure we remove all our events from the iframe on unload or we're going to LEAK!
            Ext.EventManager.on(window, 'unload', me.beforeDestroy, me);

            this.el.unmask();
            this.fireEvent('load', this);

        } else if(me.src && me.src != '') {

            this.el.unmask();
            this.fireEvent('error', this);
        }

    },

    onRelayedEvent: function (event) {
		event.originalTarget = event.target;
		this.fireEvent('mouseEvent', event);
		
		this.callParent(arguments);
    }
});
