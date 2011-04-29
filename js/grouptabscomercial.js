/*!
 * Ext JS Library 3.0.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif";

Ext.onReady(function() {
    Ext.QuickTips.init();
    
    // create some portlet tools using built in Ext tool ids
    var tools = [{
        id:'gear',
        handler: function(){
            Ext.Msg.alert('Message', 'The Settings tool was clicked.');
        }
    },{
        id:'close',
        handler: function(e, target, panel){
            panel.ownerCt.remove(panel, true);
        }
    }];

    var viewport = new Ext.Viewport({
        layout:'fit',
        items:[{
            xtype: 'grouptabpanel',
            tabWidth: 130,
            activeGroup: 0,
            items: [{
                mainItem: 1,
                items: [{
                    title: 'Clientes',
                    layout: 'fit',
                    iconCls: 'x-icon-tickets',
                    tabTip: 'Registro de Clientes',
                    style: 'padding: 10px;',
                    items:[{
                        defaultSrc :  'registro_venta.php'
                    }]
                },
                {
                    xtype: 'portal',
                    title: 'Comercial',
                    tabTip: 'Registro de Clientes',
                    items:[{
                        columnWidth:.99,
                        style:'padding:10px 0 10px 10px',
                        items:[{
														
                            columnWidth:.99,
                            style:{
                                padding:'10px 0 10px 10px'
                            },
                            defaultType:'iframeportlet',
                            defaults:{
                                height:600
                                ,
                                loadMask:false
                                ,
                                tools: tools
                            },
                            items:[{
                                title:'Clientes',
                                defaultSrc :  'registro_venta.php'
                            }]

                        }
                    
                    
                        ]

                    }]                    
                },
                {
                    xtype: 'portal',
                    title: 'Servicios',
                    layout: 'fit',
                    iconCls: 'x-icon-tickets',
                    tabTip: 'Servicios',
                    style: 'padding: 10px;',	
                    items:[{
                        columnWidth:.99,
                        style:'padding:10px 0 10px 10px',
                        items:[{

                            columnWidth:.99,
                            style:{
                                padding:'10px 0 10px 10px'
                            },
                            defaultType:'iframeportlet',
                            defaults:{
                                height:600
                                ,
                                loadMask:false
                                ,
                                tools: tools
                            },
                            items:[{
                                title:'Venta Productos'
                                ,
                                defaultSrc :  'venta_productos.php'
                            }]

                        }


                        ]

                    }]
                },
                {
                    xtype: 'portal',
                    title: 'Asignaciones',
                    layout: 'fit',
                    iconCls: 'x-icon-tickets',
                    tabTip: 'Asignaciones',
                    style: 'padding: 10px;',
                    items:[{
                        columnWidth:.99,
                        style:'padding:10px 0 10px 10px',
                        items:[{

                            columnWidth:.99,
                            style:{
                                padding:'10px 0 10px 10px'
                            },
                            defaultType:'iframeportlet',
                            defaults:{
                                height:600
                                ,
                                loadMask:false
                                ,
                                tools: tools
                            },
                            items:[{
                                title:'Asignaciones'
                                ,
                                defaultSrc :  'bandeja_asignaciones.php'
                            }]

                        }


                        ]

                    }]
                },
                {
                    xtype: 'portal',
                    title: 'Programaciones',
                    layout: 'fit',
                    iconCls: 'x-icon-tickets',
                    tabTip: 'Programaciones',
                    style: 'padding: 10px;',
                    items:[{
                        columnWidth:.99,
                        style:'padding:10px 0 10px 10px',
                        items:[{

                            columnWidth:.99,
                            style:{
                                padding:'10px 0 10px 10px'
                            },
                            defaultType:'iframeportlet',
                            defaults:{
                                height:600
                                ,
                                loadMask:false
                                ,
                                tools: tools
                            },
                            items:[{
                                title:'Programaciones'
                                ,
                                defaultSrc :  'bandeja_programacion.php'
                            }]

                        }


                        ]

                    }]
                },
                {
                    xtype: 'portal',
                    title: 'Despacho',
                    layout: 'fit',
                    iconCls: 'x-icon-tickets',
                    tabTip: 'Despacho de ordenes',
                    style: 'padding: 10px;',
                    items:[{
                        columnWidth:.99,
                        style:'padding:10px 0 10px 10px',
                        items:[{

                            columnWidth:.99,
                            style:{
                                padding:'10px 0 10px 10px'
                            },
                            defaultType:'iframeportlet',
                            defaults:{
                                height:600
                                ,
                                loadMask:false
                                ,
                                tools: tools
                            },
                            items:[{
                                title:'Despacho'
                                ,
                                defaultSrc :  'bandeja_despacho.php'
                            }]

                        }


                        ]

                    }]
                },
                {
                    xtype: 'portal',
                    title: 'Instalaciones',
                    layout: 'fit',
                    iconCls: 'x-icon-tickets',
                    tabTip: 'Pedidos de Instalaciones',
                    style: 'padding: 10px;',
                    items:[{
                        columnWidth:.99,
                        style:'padding:10px 0 10px 10px',
                        items:[{

                            columnWidth:.99,
                            style:{
                                padding:'10px 0 10px 10px'
                            },
                            defaultType:'iframeportlet',
                            defaults:{
                                height:600
                                ,
                                loadMask:false
                                ,
                                tools: tools
                            },
                            items:[{
                                title:'Instalaciones'
                                ,
                                defaultSrc :  'bandeja_instalacion.php'
                            }]

                        }


                        ]

                    }]
                },
                {
                    xtype: 'portal',
                    title: 'Observados',
                    layout: 'fit',
                    iconCls: 'x-icon-tickets',
                    tabTip: 'Ordenes Observadas',
                    style: 'padding: 10px;',
                    items:[{
                        columnWidth:.99,
                        style:'padding:10px 0 10px 10px',
                        items:[{

                            columnWidth:.99,
                            style:{
                                padding:'10px 0 10px 10px'
                            },
                            defaultType:'iframeportlet',
                            defaults:{
                                height:600
                                ,
                                loadMask:false
                                ,
                                tools: tools
                            },
                            items:[{
                                title:'Observados'
                                ,
                                defaultSrc :  'bandeja_rechazados.php'
                            }]

                        }


                        ]

                    }]
                }
                ,
                {
                    xtype: 'portal',
                    title: 'Comisiones',
                    layout: 'fit',
                    iconCls: 'x-icon-tickets',
                    tabTip: 'Comisiones',
                    style: 'padding: 10px;',
                    items:[{
                        columnWidth:.99,
                        style:'padding:10px 0 10px 10px',
                        items:[{

                            columnWidth:.99,
                            style:{
                                padding:'10px 0 10px 10px'
                            },
                            defaultType:'iframeportlet',
                            defaults:{
                                height:600
                                ,
                                loadMask:false
                                ,
                                tools: tools
                            },
                            items:[{
                                title:'Comisiones'
                                ,
                                defaultSrc :  'rpte_comisiones.php'
                            }]

                        }


                        ]

                    }]
                },
                {
                    xtype: 'portal',
                    title: 'Facturaci\u00F3n',
                    layout: 'fit',
                    iconCls: 'x-icon-tickets',
                    tabTip: 'Facturaci\u00F3n',
                    style: 'padding: 10px;',
                    items:[{
                        columnWidth:.99,
                        style:'padding:10px 0 10px 10px',
                        items:[{

                            columnWidth:.99,
                            style:{
                                padding:'10px 0 10px 10px'
                            },
                            defaultType:'iframeportlet',
                            defaults:{
                                height:600
                                ,
                                loadMask:false
                                ,
                                tools: tools
                            },
                            items:[{
                                title:'Facturacion'
                                ,
                                defaultSrc :  'bandeja_facturacion.php'
                            }]

                        }


                        ]

                    }]
                },
                {
                    xtype: 'portal',
                    title: 'Aviso Pago',
                    layout: 'fit',
                    iconCls: 'x-icon-tickets',
                    tabTip: 'Aviso de Pago',
                    style: 'padding: 10px;',
                    items:[{
                        columnWidth:.99,
                        style:'padding:10px 0 10px 10px',
                        items:[{

                            columnWidth:.99,
                            style:{
                                padding:'10px 0 10px 10px'
                            },
                            defaultType:'iframeportlet',
                            defaults:{
                                height:600
                                ,
                                loadMask:false
                                ,
                                tools: tools
                            },
                            items:[{
                                title:'Aviso Pago'
                                ,
                                defaultSrc :  'avisos_pago.php'
                            }]

                        }


                        ]

                    }]
                },
                {
                    xtype: 'portal',
                    title: 'Cortes',
                    layout: 'fit',
                    iconCls: 'x-icon-tickets',
                    tabTip: 'Cortes',
                    style: 'padding: 10px;',
                    items:[{
                        columnWidth:.99,
                        style:'padding:10px 0 10px 10px',
                        items:[{

                            columnWidth:.99,
                            style:{
                                padding:'10px 0 10px 10px'
                            },
                            defaultType:'iframeportlet',
                            defaults:{
                                height:600
                                ,
                                loadMask:false
                                ,
                                tools: tools
                            },
                            items:[{
                                title:'Cortes'
                                ,
                                defaultSrc :  'cortes_deuda.php'
                            }]

                        }


                        ]

                    }]
                },
                {
                    xtype: 'portal',
                    title: 'Reconexiones',
                    layout: 'fit',
                    iconCls: 'x-icon-tickets',
                    tabTip: 'Reconexiones',
                    style: 'padding: 10px;',
                    items:[{
                        columnWidth:.99,
                        style:'padding:10px 0 10px 10px',
                        items:[{

                            columnWidth:.99,
                            style:{
                                padding:'10px 0 10px 10px'
                            },
                            defaultType:'iframeportlet',
                            defaults:{
                                height:600
                                ,
                                loadMask:false
                                ,
                                tools: tools
                            },
                            items:[{
                                title:'Reconexiones'
                                ,
                                defaultSrc :  'reconexiones_deuda.php'
                            }]

                        }


                        ]

                    }]
                }

                ]
            }
            ]
        }]
    });
});


