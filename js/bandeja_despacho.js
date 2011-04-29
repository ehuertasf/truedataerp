Ext.onReady(function(){
Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif";

    Ext.QuickTips.init();
        var xid_pedido,xid_tecnico,xf_movimiento,cbo_tecnico,grid;
        var today = new Date().clearTime();
        Ext.DatePicker.prototype.minDate = today;
        Ext.form.DateField.prototype.minValue = today;
        //*******************************************************************************************************//
        //DATA STORE'S
        //*******************************************************************************************************//

        var dbCliPrg=new Ext.data.Store({			// Data de Clientes en estado Programado
            proxy: new Ext.data.HttpProxy({
                url: "php_procesos/p_programados.php"
            }),
            baseParams:{
                f:1
            },
            reader: new Ext.data.JsonReader({root: 'lst_programados'},
                [{name    :'id_pedido',mapping :'id_pedido'},
                 {name    :'id_estado',mapping :'id_estado' },
                 {name    :'desc_estado',mapping :'desc_estado' },
                 {name    :'f_reg_ped',mapping :'f_reg_ped' },
                 {name    :'nombre',mapping :'nombre',type: 'string' },
                 {name    :'direccion',mapping :'direccion',type: 'string' },
                 {name    :'id_tecnico',mapping :'id_tecnico' },
                 {name    :'nom_tecnico',type: 'string'},
                 {name    :'dato',type: 'string'},
                 {name    :'f_movimiento',mapping :'f_movimiento', type: 'date', dateFormat: 'd-m-Y' },
                 {name    :'f_prg_ped',mapping :'f_prg_ped' },
                 {name    :'nom_servicio',mapping :'nom_servicio' }
            ]),
            autoLoad:true
        });

        //*******************************************************************************************************//
        //GRID
        //*******************************************************************************************************//

        var checkColumn = new Ext.grid.CheckboxSelectionModel({
            header       :' ',
            singleSelect :false
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
                header	:'IdEstado',
                dataIndex:'id_estado',
                align	:'left',
                hidden  :true,
                width	:20
            },{
                header	:'Estado',
                dataIndex:'desc_estado',
                align	:'center',
                hidden  :false,
                width	:100
            },{
               header	:'Fec.Reg.Pedido',
               dataIndex:'f_reg_ped',
               align	:'center',
               type		:'datetime',
               width	:140
            },{
                id		:'xnombre',
                header	:'Cliente',
                renderer	:Ext.util.Format.uppercase,
                dataIndex:'nombre',
                align	:'center',
                width	:270
            },{
                header	:'Direcci&oacute;n de Instalaci&oacute;n',
                renderer	:Ext.util.Format.uppercase,
                dataIndex:'direccion',
                align	:'left',
                width	:280
            },{
                header	:'IdTecnico',
                dataIndex:'id_tecnico',
                align	:'left',
                hidden  :true,
                width	:20
            },{
                header	:'T&eacute;cnico Programado',
                dataIndex:'nom_tecnico',
                width	:150,
                align	:'center'
            },{
                header	:'Servicio Contratado',
                dataIndex:'nom_servicio',
                width	:150,
                align	:'center'
            },{
               header   : "F.Programada",
               dataIndex:'f_prg_ped',
               align	:'center',
               width	:100
            }
        ]);

        cm.defaultSortable = true;

        grid = new Ext.grid.EditorGridPanel({
            store	:dbCliPrg,
            cm		:cm,
            width	:900,
            height	:400,
            loadMask:true,
            clicksToEdit	:1,
            selModel: new Ext.grid.RowSelectionModel({
                singleSelect:true
            }),
            viewConfig: {
                forceFit: false
            },
            sm      :checkColumn,
            frame	:true,
            view: new Ext.grid.GridView({
                emptyText:'<div style="text-align:center;">No se encontro informaci&oacute;n</div>'
            }),
            tbar: [{
                    text: '&nbsp;Imprimir',
                    iconCls:'imprimir',
                    handler : function(){
//                        var seleccion = grid.getSelections();
                        var selectedKeys = grid.selModel.selections.keys;

                        var ids=[];
                        for(var i=0;i<selectedKeys.length;i++){
                            var record = grid.getStore().getById(selectedKeys[i]);
                            var fieldName1 = grid.getColumnModel().getDataIndex(1);  //id_pedido
                            var fieldName2 = grid.getColumnModel().getDataIndex(2);  //id_estado

                            var data1 = record.get(fieldName1);
                            var data2 = record.get(fieldName2);
                            if(data2==4){
                                ids.push(data1);
                            }else{
                                Ext.MessageBox.alert('Atencion','Solo se pueden imprimir Pedidos Despachados');
                            }

                        }
                        
                        if(ids.length==0){
                            Ext.MessageBox.alert('Cuidado','Debe seleccionar uno o varios pedidos Despachados');
                        }else{
                            window.open("php_procesos/imp_despacho_pedidos.php?ids="+ids,"","toolbar=0,location=no,status=no,menubar=no,resizable=no,scrollbars=yes,width=750,height=470,left=0,top=0");
                        }                        
                    }
                },'-',{
                    text: '&nbsp;Despachar',
                    iconCls:'validar',
                    handler : function(){

//                        var seleccion = grid.getSelections();
                        var selectedKeys = grid.selModel.selections.keys;
                        var j_valores=new Array();

                        for(var i=0;i<selectedKeys.length;i++){
                            var record = grid.getStore().getById(selectedKeys[i]);
                            var fieldName1 = grid.getColumnModel().getDataIndex(1);  //id_pedido
                            var fieldName2 = grid.getColumnModel().getDataIndex(2);  //id_estado
                            var fieldName7 = grid.getColumnModel().getDataIndex(7);  //id_tecnico

                            var data1 = record.get(fieldName1);
                            var data2 = record.get(fieldName2);
                            var data7 = record.get(fieldName7);

                            if(data2){
                                if(data2!=4){
                                    var data=data1+"|"+data7;
                                    j_valores.push(data);
                                    
                                    Ext.Msg.show({
                                        title:'CONFIRMACION',
                                        msg: 'Desea despachar la(s) orden(es)?.',
                                        buttons: Ext.Msg.YESNO,
                                        fn: function(btn,text){
                                            if(btn=='yes'){
                                                Ext.Ajax.request({
                                                    url: 'php_procesos/p_programados.php',
                                                    method: 'POST',
                                                    params: {
                                                        f:      2,
                                                        iduser: Ext.getDom('iduser').value,
                                                        datos:  j_valores.join()
                                                    },
                                                    failure:function(response,options){
                                                        Ext.MessageBox.alert('Error','Problemas al actualizar datos');
                                                    },
                                                    success:function(response,options){
                                                        var rpta=response.responseText;
                                                        if(rpta==1){
                                                            Ext.MessageBox.alert('Confirmacion', 'Se Actualizo la(s) orden(es) seleccionada(s)');
                                                            dbCliPrg.proxy= new Ext.data.HttpProxy({
                                                                url: 'php_procesos/p_programados.php',
                                                                baseParams:{
                                                                    f:1
                                                                }
                                                            });

                                                            dbCliPrg.load();
                                                        }

                                                    }
                                                });
                                            }else if(btn=='no'){
                                                //no hago nada
                                            }
                                        },
                                        animEl: 'elId',
                                        icon: Ext.MessageBox.QUESTION
                                    });
                                }
                            }else{
                                Ext.MessageBox.alert('Alerta', 'Debe seleccionar como minimo un pedido de la lista.');
                                return
                            }
                        }



                    }
                },'-',{
                    text: '&nbsp;Exportar',
                    iconCls:'excel',
                    handler:xls_bandeja
                }]
        });

        function xls_bandeja(){
            document.location = 'php_reportes/p_xls_despacho.php';
        }

        //*******************************************************************************************************//
        //VENTANA
        //*******************************************************************************************************//
        var ventana = new Ext.Window({
            title       :'DESPACHO DE PEDIDOS',
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





