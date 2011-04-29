Ext.onReady(function(){
Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif";

    Ext.QuickTips.init();
        var grid,txtBuscar,formulario6,Ventana_modal9;
        var dbCliFac,vista;
        var j_idpedido, j_idcliente, j_idfacturacion;
        var j_cliente;
        var Ventana_modal8;
        var formulario5, j_txtMonto;
        var j_montototal,j_prefmoneda,j_tipo_cliente, mostrar_monto;
        var checking1,checking2;
        
        var today = new Date().clearTime();
        Ext.DatePicker.prototype.minDate = today;
        Ext.form.DateField.prototype.minValue = today;
        //*******************************************************************************************************//
        //DATA STORE'S
        //*******************************************************************************************************//

        dbCliFac=new Ext.data.GroupingStore({			// Data de Clientes para facturar
            proxy: new Ext.data.HttpProxy({
                url: "php_procesos/p_facturacion.php"
            }),
            baseParams:{
                f:1
            },
            reader: new Ext.data.JsonReader(
            {
                root: 'lst_facturados',
                totalProperty: 'total'
            },
                [{name    :'id_facturacion',mapping :'id_facturacion'},
                 {name    :'id_pedido',mapping :'id_pedido' },
                 {name    :'nom_cliente',mapping :'nom_cliente' },
                 {name    :'id_estado_pago',mapping :'id_estado_pago' },
                 {name    :'estado_pago',mapping :'estado_pago',type: 'string' },
                 {name    :'num_recibo',mapping :'num_recibo',type: 'string' },
                 {name    :'monto',mapping :'monto',type:'float' },
                 {name    :'f_pago',mapping :'f_pago'},
                 {name    :'dias_facturados',mapping :'dias_facturados'},
                 {name    :'cant_eq',mapping :'cant_eq'},
                 {name    :'id_servicio',mapping :'id_servicio' },
                 {name    :'nom_servicio',mapping :'nom_servicio' },
                 {name    :'nom_moneda',mapping :'nom_moneda' },
                 {name    :'f_alta',mapping :'f_alta' },
                 {name    :'periodo',mapping:'periodo'},
                 {name    :'pref_moneda',mapping:'pref_moneda'},
                 {name    :'id_cliente',mapping:'id_cliente'},
                 {name    :'id_tipo_doc',mapping:'id_tipo_doc'}
            ]),
            autoLoad:true,
            groupField:'nom_cliente',
            remoteSort: false,
            sortInfo: {field: 'id_pedido', direction: 'DESC'}
        });

        var summary = new Ext.grid.GroupSummary();

        function numero(val){
            return parseFloat(val).toFixed(2);
        }

        var btnbuscar = new Ext.Button({
            text:		'Consultar',
            id:			'btn1',
            width:		150,
            handler: 	buscar,
            iconCls:    'search'
        });

        //*******************************************************************************************************//
        //GRID
        //*******************************************************************************************************//
        var checkColumn = new Ext.grid.CheckboxSelectionModel({
            header       :' ',
            singleSelect :false
		});

        var cm = new Ext.grid.ColumnModel([
            {
                id		:'xid_facturacion',
                header	:'ID Facturacion',
                dataIndex:'id_facturacion',
                width	:20,
                hidden  :true,
                align	:'center',
                groupable:false
            },{
                id		:'xid_pedido',
                header	:'N&uacute;m. Pedido',
                dataIndex:'id_pedido',
                width	:100,
                align	:'center',
                groupable:false
            },{
                id		:'xnombre',
                header	:'Cliente',
                renderer	:Ext.util.Format.uppercase,
                dataIndex:'nom_cliente',
                align	:'center',
                width	:270
            },{
                header	:'IdEstado_pago',
                dataIndex:'id_estado_pago',
                align	:'left',
                hidden  :true,
                width	:20,
                groupable:false
            },{
                header	:'Estado',
                dataIndex:'estado_pago',
                align	:'center',
                hidden  :false,
                width	:100,
                groupable:false
            },{
                header	:'N&uacute;m. Recibo',
                dataIndex:'num_recibo',
                align	:'center',
                hidden  :false,
                width	:100,
                groupable:false
            },{
                header	:'',
                dataIndex:'pref_moneda',
                align	:'center',
                hidden  :false,
                width	:10,
                groupable:false
            },{
                header	:'Monto',
                dataIndex:'monto',
                align	:'center',
                hidden  :false,
                width	:80,
                groupable:false,
                summaryType:'sum',
                renderer:numero
            },{
                header	:'Moneda',
                dataIndex:'nom_moneda',
                align	:'center',
                hidden  :false,
                width	:120,
                groupable:false
            },{
               header	:'Fec.Vencimiento',
               dataIndex:'f_pago',
               align	:'center',
               width	:120,
               groupable:false
            },{
               header	:'Fec.Alta',
               dataIndex:'f_alta',
               align	:'center',
               width	:100,
               groupable:false
            },{
                header	:'Periodo Facturado',
                dataIndex:'periodo',
                align	:'center',
                hidden  :false,
                width	:180,
                groupable:false
            },{
                header	:'D&iacute;as Facturados',
                dataIndex:'dias_facturados',
                align	:'center',
                hidden  :false,
                width	:120,
                groupable:false
            },{
                header	:'Cant. Eq. Adic',
                dataIndex:'cant_eq',
                width	:100,
                align	:'center',
                groupable:false
            },{
                header	:'ID_Servicio',
                dataIndex:'id_servicio',
                width	:20,
                hidden  :true,
                align	:'center',
                groupable:false
            },{
                header	:'Servicio Contratado',
                dataIndex:'nom_servicio',
                width	:150,
                align	:'center',
                groupable:false
            },{
                header	:'ID Cliente',
                dataIndex:'id_cliente',
                width	:40,
                align	:'center',
                groupable:false,
                hidden:true
            },{
                header	:'ID Tipo Doc',
                dataIndex:'id_tipo_doc',
                width	:40,
                align	:'center',
                groupable:false,
                hidden:true
            }
        ]);

        cm.defaultSortable = true;

        vista= new Ext.grid.GroupingView({
        forceFit		:true,
        emptyText		:'<div style="text-align:center;">Lista vacia</div>',
        groupTextTpl	:'<span class="groupHeader">{text}</span>',
        enableRowBody	:true,
        showGroupName	:false,
        enableNoGroups	:false,
        showPreview		:true,
        startCollapsed	:false,
        hideGroupedColumn: true,
        getRowClass : function(record, rowIndex, p, store){
            if(this.showPreview){
                //p.body = '<p>'+record.get('nom_tipo')+'</p>';
                return 'x-grid3-row-expanded';
            }
            return 'x-grid3-row-collapsed';
        }
    });

        grid = new Ext.grid.GridPanel({
            store       :dbCliFac,
            cm          :cm,
            width       :'900',
            height      :400,
            collapsible :true,
            loadMask    :true,
            clicksToEdit:1,
            selModel    : new Ext.grid.RowSelectionModel({
                singleSelect:true
            }),
            view        :vista,
            plugins		:summary,
            frame       :true,
            tbar        :[btnbuscar]
        });

        grid.on('rowclick', function(grid, rowIndex, e) {
            var record_0 	=grid.getStore().getAt(rowIndex);
            var fieldName_0	=grid.getColumnModel().getDataIndex(0);
            j_idfacturacion	=record_0.get(fieldName_0);

            var record_1 	=grid.getStore().getAt(rowIndex);
            var fieldName_1	=grid.getColumnModel().getDataIndex(1);
            j_idpedido 		=record_1.get(fieldName_1);

            var record_2 	=grid.getStore().getAt(rowIndex);
            var fieldName_2	=grid.getColumnModel().getDataIndex(16);
            j_idcliente		=record_2.get(fieldName_2);

            var record_3 	=grid.getStore().getAt(rowIndex);
            var fieldName_3	=grid.getColumnModel().getDataIndex(2);
            j_cliente		=record_3.get(fieldName_3);

            var record_5 	=grid.getStore().getAt(rowIndex);
            var fieldName_5	=grid.getColumnModel().getDataIndex(6);
            j_prefmoneda	=record_5.get(fieldName_5);

            var record_6 	=grid.getStore().getAt(rowIndex);
            var fieldName_6	=grid.getColumnModel().getDataIndex(17);
            j_tipo_cliente	=record_5.get(fieldName_6);
            
            if(j_tipo_cliente==1){
              checking1=true;  
              checking2=false;
            }else{
              checking1=false;  
              checking2=true;                
            }


            var j_txtCliente = new Ext.form.TextField({
                id			:'txtc1',
                name		:'ntxtc1',
                width		:300,
                labelAlign	:'right',
                readOnly    :true,                
                style       :'background-color:#DFE8F6;',
                labelWidth	:70,
                allowBlank	:false,
                fieldLabel	:'Cliente'
            });

            j_txtMonto = new Ext.form.TextField({
                id			:'txtc2',
                name		:'ntxtc2',
                width		:100,
                labelAlign	:'right',
                readOnly    :true,
                style       :"background-color:#DFE8F6; text-align: right",
                labelWidth	:70,
                allowBlank	:false,
                fieldLabel	:'Monto Total'
            });

            Ext.Ajax.request({
                url: 'php_procesos/p_consulta_monto.php',
                params: {
                    f:1,
                    idcliente:j_idcliente
                },
                failure:function(response,options){
                    Ext.MessageBox.alert('Error','Se detecto un problema de retorno ');
                },
                success:function(response,options){
                    j_montototal=response.responseText;
                    mostrar_monto=j_prefmoneda+' '+j_montototal;
                    j_txtMonto.setValue(mostrar_monto);
                    j_txtCliente.setValue(j_cliente);
                    Ventana_modal8.show();
                }
            });

            var btn_grabar=new Ext.Button({
                text    : 'Grabar',
                minWidth:90,
                handler: function(){
                    /** ENVIAMOS LOS DATOS A P_FACTURACION.PHP PARA GRABAR LOS DATOS DE LA CANCELACION DEL RECIBO   **/

                    /*************************************************************************************************/
                    btn_imprimir.enable();
                    btn_grabar.disable();
                    btn_cancelar.disable();
                }
            });

            var btn_imprimir=new Ext.Button({
                text    :'Imprimir',
                disabled:true,
                minWidth:90,
                handler :function(){
                    /** ENVIAMOS LOS DATOS PARA IMPRIMIR LA BOLETA O FACTURA *****************************************/
                    window.open("/truedataerp/php_impresos/i_boleta.php?idfacturacion="+j_idfacturacion,"ventana1" , "width=850,height=650,scrollbars=YES,resizable=YES");
                    /*************************************************************************************************/
                    btn_imprimir.disable();
                    Ventana_modal8.close();
                }
            });

            var btn_cancelar=new Ext.Button({
                text    :'Cancelar',
                minWidth:90,
                handler: function(){
                    formulario5.getForm().reset();
                    Ventana_modal8.close();
                }
            });

            formulario5 = new Ext.FormPanel({
                frame		:true,
                labelAlign	:'right',
                labelWidth	:100,
                autoWidth	:true,
                waitMsgTarget:true,
                items		:[{
                    layout	:'column',
                    border	:false,
                    items	:[{
                        columnWidth :1.0,
                        layout      :'form',
                        border      :false,
                        items       :[j_txtCliente]
                    }]
                },{
                    layout	:'column',
                    border	:false,
                    items	:[{
                        columnWidth :.6,
                        layout      :'form',
                        border      :false,
                        items       :[j_txtMonto]
                    }]
                    
                },{
                    xtype: 'radiogroup',
                    fieldLabel: 'Imprimir',
                    allowBlank  :false,
                    anchor: '91%',
                    items: [
                        {boxLabel: 'Boleta',  name: 'rb-tdocumento', inputValue: 1, checked:checking1},
                        {boxLabel: 'Factura', name: 'rb-tdocumento', inputValue: 2, checked:checking2}
                    ]
                }],
                buttons: [btn_grabar,btn_imprimir,btn_cancelar]
            });

            Ventana_modal8 = new Ext.Window({
                title		:'CANCELACION DE RECIBO',
                width		:550,
                modal		:true,
                frame		:true,
                closable	:false,
                minHeight	:150,
                plain		:true,
                y			:200,
                id			:'LoginWin21',
                bodyStyle	:'padding:5px;',
                items		:formulario5
            });

            
        });
        //*******************************************************************************************************//
        //VENTANA
        //*******************************************************************************************************//
        var ventana = new Ext.Window({
            title       :'GESTION DE RECIBOS',
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

        //*******************************************************************************************************//
        //VENTANA PARA BUSCAR CLIENTES
        //*******************************************************************************************************//
        function buscar(){
            txtBuscar = new Ext.form.TextField({
                emptyText 	:'Ingrese Nombre/DNI/RUC',
                id			:'txtb1',
                name		:'ntxtb1',
                width		:355,
                labelAlign	:'right',
                labelWidth	:50,
                allowBlank	:false,
                fieldLabel	:'Buscar',
                minLength	:3,
                maxLength 	:30,
                minLengthText:'El texto debe tener como minimo 3 caracteres',
                maxLengthText:'El texto debe tener como maximo 30 caracteres'
            });

            var btnEjecuta_busqueda = new Ext.Button({
                text	:'Buscar',
                id		:'btn21',
                width	:150,
                handler	:ejecuta_busqueda
            });

            formulario6 = new Ext.FormPanel({
                frame		:true,
                labelAlign	:'right',
                labelWidth	:70,
                autoWidth	:true,
                waitMsgTarget:true,
                items		:[{
                    layout	:'column',
                    border	:false,
                    items	:[{
                        columnWidth:.8,
                        layout: 'form',
                        border:false,
                        items: [txtBuscar]
                    },{
                        columnWidth:.2,
                        layout: 'form',
                        border:false,
                        items: [btnEjecuta_busqueda]
                    }]
                }]
            });

            Ventana_modal9 = new Ext.Window({
                title		:'Buscador',
                width		:600,
                modal		:true,
                frame		:true,
                autoHeight	:550,
                closable	:true,
                minWidth	:500,
                minHeight	:150,
                plain		:true,
                y			:200,
                id			:'LoginWin21',
                bodyStyle	:'padding:5px;',
                items		:formulario6
            });

            Ventana_modal9.show();

        }
        
        function ejecuta_busqueda(){
            var valor_buscado=Ext.get("txtb1").getValue();

            if(txtBuscar.validate()==true){
                dbCliFac.proxy= new Ext.data.HttpProxy({url: 'php_procesos/p_facturacion.php'});
                dbCliFac.baseParams={
                    f       :3,
                    valor   :valor_buscado
                }
                dbCliFac.load();
                vista.startCollapsed=false;
                Ventana_modal9.hide();
                Ventana_modal9.destroy();
            }else{
                Ext.Msg.alert('Aviso','Debe ingresar un dato para realizar una busqueda');
            }

        }
});





