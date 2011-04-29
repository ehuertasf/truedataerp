Ext.onReady(function(){
Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif";

    Ext.QuickTips.init();
        var dbCliReg=new Ext.data.Store({			// Data de Clientes en estado Registrado
            proxy: new Ext.data.HttpProxy({
                url: "php_procesos/p_registrados.php"
            }),
            baseParams:{
                f:1
            },
            reader: new Ext.data.JsonReader({root: 'lst_registrados'},
                [{name    :'id_pedido',mapping :'id_pedido'},
                 {name    :'f_reg_ped',mapping :'f_reg_ped' },
                 {name    :'nombre',mapping :'nombre' },
                 {name    :'direccion',mapping :'direccion' },
                 {name    :'desc_distrito',mapping :'desc_distrito' },
                 {name    :'desc_ciudad',mapping :'desc_ciudad' },
                 {name    :'desc_zonal',mapping :'desc_zonal' }
            ]),
            autoLoad:true
        });

        var checkColumn = new Ext.grid.CheckboxSelectionModel({
            singleSelect : false
		});

        var cm = new Ext.grid.ColumnModel([
            checkColumn,
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
                width	:250
            },{
                header	:'Distrito',
                renderer	:Ext.util.Format.uppercase,
                dataIndex:'desc_distrito',
                align	:'center',
                width	:100
            },{
                header	:'Ciudad',
                renderer	:Ext.util.Format.uppercase,
                dataIndex:'desc_ciudad',
                align	:'center',
                width	:70
            },{
                header	:'Departamento',
                renderer	:Ext.util.Format.uppercase,
                dataIndex:'desc_zonal',
                align	:'center',
                width	:90
            }
        ]);

        cm.defaultSortable = true;

        var grid = new Ext.grid.EditorGridPanel({
            store	:dbCliReg,
            cm		:cm,
            width	:900,
            height	:400,
            loadMask: true,
            viewConfig: {
                forceFit: false
            },
            sm      :checkColumn,
            frame	:true,
            view: new Ext.grid.GridView({
                emptyText:'<div style="text-align:center;">No se encontro informaci&oacute;n</div>'
            }),
            tbar: [{
                    text: 'Validar',
                    iconCls:'validar',
                    handler : function(){
                        var arreglo = [];
//                        var seleccion = grid.getSelections();
                        var selectedKeys = grid.selModel.selections.keys;
                       
                        for(var i=0;i<selectedKeys.length;i++){
                                var record = grid.getStore().getById(selectedKeys[i]);
                                var fieldName = grid.getColumnModel().getDataIndex(1);  //id_pedido
                                var data = record.get(fieldName);
                                arreglo.push(data);
                        }
                        var arreglotexto=arreglo.join(',');

                        Ext.Ajax.request({
                            url: 'php_procesos/p_registrados.php',
                            method: 'POST',
                            params: {
                                f:2,
                                iduser: Ext.getDom('iduser').value,
                                idpedidos:arreglotexto
                            },
                            failure:function(response,options){
                                Ext.MessageBox.alert('Error','Problemas al actualizar datos');
                            },
                            success:function(response,options){
                                var rpta=response.responseText;
                                
                                if(rpta==1){
                                    Ext.MessageBox.alert('Confirmacion', 'Se Actualizo la(s) orden(es) seleccionada(s)');
                                    dbCliReg.proxy= new Ext.data.HttpProxy({
                                        url: 'php_procesos/p_registrados.php',
                                        baseParams:{
                                            f:1
                                        }
                                    });

                                    dbCliReg.load();
                                }

                            }
                        });
                    }
                },{
                    text: 'Rechazar',
                    iconCls:'rechazar',
                    handler : function(){
                        var arreglo = [];
//                        var seleccion = grid.getSelections();
                        var selectedKeys = grid.selModel.selections.keys;

                        for(var i=0;i<selectedKeys.length;i++){
                                var record = grid.getStore().getById(selectedKeys[i]);
                                var fieldName = grid.getColumnModel().getDataIndex(1);  //id_pedido
                                var data = record.get(fieldName);
                                arreglo.push(data);
                        }
                        var arreglotexto=arreglo.join(',');

                        Ext.Ajax.request({
                            url: 'php_procesos/p_registrados.php',
                            method: 'POST',
                            params: {
                                f:3,
                                iduser: Ext.getDom('iduser').value,
                                idpedidos:arreglotexto
                            },
                            failure:function(response,options){
                                Ext.MessageBox.alert('Error','Problemas al actualizar datos');
                            },
                            success:function(response,options){
                                var rpta=response.responseText;

                                if(rpta==1){
                                    Ext.MessageBox.alert('Confirmacion', 'Se actualizo la(s) orden(es) seleccionada(s)');
                                    dbCliReg.proxy= new Ext.data.HttpProxy({
                                        url: 'php_procesos/p_registrados.php',
                                        baseParams:{
                                            f:1
                                        }
                                    });

                                    dbCliReg.load();
                                }

                            }
                        });
                    }
                },{
                    text: 'Exportar',
                    iconCls:'excel',
                    handler : function(){
                        document.location = 'php_reportes/p_xls_asignaciones.php';
                    }
                }]
        });

        //*******************************************************************************************************//
        //VENTANA
        //*******************************************************************************************************//
        var ventana = new Ext.Window({
            title       :'VALIDAR FACILIDADES TECNICAS',
            width       :1080,
            //height      :700,
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





