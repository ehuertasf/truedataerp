Ext.onReady(function(){
Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif";

    Ext.QuickTips.init();
        var dbCliReg;
        var grid;
        var Ventana_modal4,formulario,xf_ini,cbo_tecnico,dbTecnico;
        var j_idpedido;
        var today = new Date().clearTime();
        Ext.DatePicker.prototype.minDate = today;
        Ext.form.DateField.prototype.minValue = today;
        //*******************************************************************************************************//
        //DATA STORE'S
        //*******************************************************************************************************//

        dbTecnico=new Ext.data.Store({			// Data de Tecnicos
            proxy: new Ext.data.HttpProxy({
                url: "php_procesos/p_data_combos_comercial.php"
            }),
            baseParams:{
              f:6
            },
            reader: new Ext.data.JsonReader({root: 'tecnicos'},
                [{name    :'id_tecnico',mapping :'id_tecnico'},
                 {name    :'dni',mapping :'dni'},
                 {name    :'nom_tecnico',mapping :'nom_tecnico'}
             ]),
             autoLoad:true
        });

        dbCliReg=new Ext.data.Store({			// Data de Clientes en estado Registrado
            proxy: new Ext.data.HttpProxy({
                url: "php_procesos/p_formulados.php"
            }),
            baseParams:{
                f:1
            },
            reader: new Ext.data.JsonReader({root: 'lst_registrados'},
                [{name    :'id_pedido',mapping :'id_pedido'},
                 {name    :'f_reg_ped',mapping :'f_reg_ped' },
                 {name    :'nombre',mapping :'nombre',type: 'string' },
                 {name    :'direccion',mapping :'direccion',type: 'string' },
                 {name    :'id_tecnico',mapping :'id_tecnico' },
                 {name    :'nom_tecnico',type: 'string'},
                 {name    :'dato',type: 'string'},
                 {name    :'f_movimiento',mapping :'f_movimiento', type: 'date', dateFormat: 'd-m-Y' }
            ]),
            autoLoad:true
        });

        //*******************************************************************************************************//
        //GRID
        //*******************************************************************************************************//

        var cm = new Ext.grid.ColumnModel([{
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
                width	:350
            },{
                header	:'IdT',
                dataIndex:'dato',
                align	:'left',
                hidden  :true,
                width	:20
            }
        ]);


        cm.defaultSortable = true;

        grid = new Ext.grid.EditorGridPanel({
            store	:dbCliReg,
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
            tbar: [{
                text: 'Exportar',
                iconCls:'excel',
                handler : function(){
                    document.location = 'php_reportes/p_xls_programacion.php';
                }
            }]
        });


        grid.on('rowclick', function(grid, rowIndex, e) {
            var record_1 	=grid.getStore().getAt(rowIndex);
            var fieldName_1	=grid.getColumnModel().getDataIndex(0);
            j_idpedido 		=record_1.get(fieldName_1);
            
             xf_ini=new Ext.form.DateField({
                fieldLabel	:'Fecha',
                id			:'idfecha',
                name		:'idfecha1',
                width		:110,
                format		:'d-m-Y',
                allowBlank	:false,
                renderer	:function(value) { return value ? new Date(value).dateFormat('d.m.Y') : ''; }
            });

            cbo_tecnico= new Ext.form.ComboBox({
                store		:dbTecnico,
                id          :'idcbo_tecnico',
                name        :'idcbo_tecnico',
                displayField:'nom_tecnico',
                fieldLabel  :'T&eacute;cnico',
                valueField	:'id_tecnico',
                hiddenName	:'id_tecnico',
                mode		:'remote',
                editable	:false,
                allowBlank	:false,
                triggerAction:'all',
                forceSelection:true,
                listClass: 'x-combo-list-small'
            });

            var btnGraba_nuevo = new Ext.Button({
                text	:'Grabar',
                minWidth:90,
                handler	:function(){
                    if(formulario.getForm().isValid()){
                        Ext.Msg.show({
                            title:'CONFIRMACION',
                            msg: 'Realmente desea grabar los datos?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn,text){
                                if(btn=='yes'){
                                    formulario.form.submit({
                                        url: 'php_procesos/p_formulados.php',
                                        method: 'POST',
                                        params: {
                                            f:2,
                                            iduser: Ext.getDom('iduser').value
                                        },
                                        waitTitle: 'Conectando',
                                        waitMsg: 'Guardando datos...',
                                        success: function(form, action){
                                            Ext.MessageBox.alert('Mensaje', 'Los datos han sido grabados.');
                                            formulario.getForm().reset();
                                            Ventana_modal4.close();
                                            dbCliReg.load();
                                        },
                                        failure: function(form, action){
                                               if (action.failureType == 'server') {
                                                    var obj = Ext.util.JSON.decode(action.response.responseText);
                                                    Ext.Msg.alert('Mensaje', obj.errors.reason);
                                                } else {
                                                    Ext.Msg.alert('Cuidado!', 'Ha ocurrido un error : ' + action.response.responseText);
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
                    
                }
            });

            var btnCancelar = new Ext.Button({
                text    :'Cancelar',
                minWidth:90,
                handler: function(){
                    formulario.getForm().reset();
                    Ventana_modal4.close();
                }
            });

            var xTxt_pedido = new Ext.form.NumberField({
                id          :'idxTxt_pedido',
                fieldLabel  :'Nro. Pedido',
                disabled    :false,
                name        :'idxTxt_pedido',
                anchor      :'95%',
                allowBlank	:false,
                readOnly    :true,
                style       :'background-color:#DFE8F6;',
                value       :j_idpedido
            });

            formulario = new Ext.FormPanel({
                frame		:true,
                labelAlign	:'right',
                labelWidth	:90,
                autoWidth	:true,
                waitMsgTarget:true,
                items		:[{
                    layout	:'column',
                    border	:false,
                    items	:[{
                        columnWidth:1.0,
                        layout: 'form',
                        border:false,
                        items: [xTxt_pedido]
                    }]
                },{
                    layout	:'column',
                    border	:false,
                    items	:[{
                        columnWidth:1.0,
                        layout: 'form',
                        border:false,
                        items: [xf_ini]
                    }]
                },{
                    layout	:'column',
                    border	:false,
                    items	:[{
                        columnWidth:1.0,
                        layout: 'form',
                        border:false,
                        items: [cbo_tecnico]
                    }]
                }],
                buttons: [btnGraba_nuevo,btnCancelar]
            });

            Ventana_modal4 = new Ext.Window({
                title		:'Programar visita y t&eacute;cnico',
                width		:300,
                modal		:true,
                frame		:true,
                closable	:false,
                minHeight	:150,
                plain		:true,
                y			:200,
                id			:'LoginWin21',
                bodyStyle	:'padding:5px;',
                items		:[formulario]
            });

            Ventana_modal4.show();

        });


        //*******************************************************************************************************//
        //VENTANA
        //*******************************************************************************************************//
        var ventana = new Ext.Window({
            title       :'PROGRAMACION DE PEDIDOS',
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





