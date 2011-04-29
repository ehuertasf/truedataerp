Ext.onReady(function(){
Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif";

    Ext.QuickTips.init();

        //*******************************************************************************************************//
        //DATA STORE'S
        //*******************************************************************************************************//


        var dbCliRec=new Ext.data.Store({			// Data de Clientes en estado Rechazado
            proxy: new Ext.data.HttpProxy({
                url: "php_procesos/p_rechazados.php"
            }),
            baseParams:{
                f:1
            },
            reader: new Ext.data.JsonReader({root: 'lst_rechazados',totalProperty: 'tlt_rechazados'},
                [{name    :'id_pedido',mapping :'id_pedido'},
                 {name    :'f_reg_ped',mapping :'f_reg_ped' },
                 {name    :'nombre',mapping :'nombre',type: 'string' },
                 {name    :'direccion',mapping :'direccion',type: 'string' },
                 {name    :'nom_servicio',mapping :'nom_servicio' }
            ])
        });
        
        dbCliRec.load({params:{start:0, limit:15}});

        //*******************************************************************************************************//
        //GRID
        //*******************************************************************************************************//

        var cm = new Ext.grid.ColumnModel([
            {
               id		:'xid_pedido',
               header	:'N&uacute;m. Pedido',
               dataIndex:'id_pedido',
               width	:80,
               align	:'center'
            },{
               header	:'Fec.Reg.Pedido',
               dataIndex:'f_reg_ped',
               align	:'center',
               type		:'datetime',
               width	:140
            },{
                id		:'xnombre',
                header	:'Nombre',
                renderer	:Ext.util.Format.uppercase,
                dataIndex:'nombre',
                align	:'center',
                width	:270
            },{
                header	:'Direcci&oacute;n',
                renderer	:Ext.util.Format.uppercase,
                dataIndex:'direccion',
                align	:'left',
                width	:280
            },{
                header	:'Producto',
                dataIndex:'nom_servicio',
                align	:'left',
                hidden  :false,
                width	:200
            }
        ]);


        cm.defaultSortable = true;

        var grid = new Ext.grid.EditorGridPanel({
            store	:dbCliRec,
            cm		:cm,
            width	:900,
            height	:400,
            loadMask:true,
            clicksToEdit	:1,
            selModel: new Ext.grid.RowSelectionModel({singleSelect:true}),
            viewConfig: {
                forceFit: false
            },
            frame	:true,
            view: new Ext.grid.GridView({
                emptyText:'<div style="text-align:center;">No se encontro informaci&oacute;n</div>'
            }),
            bbar: new Ext.PagingToolbar({
                pageSize: 15,
                store: dbCliRec,
                displayInfo: true,
                emptyMsg: "No hay datos para mostrar"
            }),
            tbar: [{
                text: 'Exportar',
                iconCls:'excel',
                handler : function(){
                    document.location = 'php_reportes/p_xls_rechazados.php';
                }
            }]
        });

        
        //*******************************************************************************************************//
        //VENTANA
        //*******************************************************************************************************//
        var ventana = new Ext.Window({
            title       :'BANDEJA DE CLIENTES RECHAZADOS POR FF.TT',
            autoWidth   :true,
            minWidth    :750,
            minHeight   :450,
            layout      :'fit',
            plain       :true,
            y           :10,
            bodyStyle   :'padding:5px;',
            items       :grid
        });
        ventana.show();


});





