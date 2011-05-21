/*
 * Grover Ramirez Salazar
 */

Ext.onReady(function(){
    Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif";
    Ext.QuickTips.init();

    // turn on validation errors beside the field globally
    Ext.form.Field.prototype.msgTarget = 'side';

    var bd = Ext.getBody();
    

    //Store pedidos despachados
    var ds=new Ext.data.Store({			// Data de Clientes en estado Registrado
        proxy: new Ext.data.HttpProxy({
            url: "php_procesos/p_despachados.php"
        }),
        baseParams:{
            f:1
        },
        reader: new Ext.data.JsonReader({
            root: 'lst_programados'
        },
        [{
            name    :'id_pedido',
            mapping :'id_pedido'
        },

        {
            name    :'f_reg_ped',
            mapping :'f_reg_ped'
        },
{
            name    :'f_prg_ped',
            mapping :'f_prg_ped'
        },
{
            name    :'id_tecnico',
            mapping :'id_tecnico'
        },
{
            name    :'nom_tecnico',
            mapping :'nom_tecnico'
        },

        {
            name    :'nombre',
            mapping :'nombre'
        },

        {
            name    :'codcli',
            mapping :'codcli'
        },

        {
            name    :'direccion',
            mapping :'direccion'
        },

        {
            name    :'id_cliente',
            mapping :'codcli'
        },

        {
            name    :'telefono_casa',
            mapping :'telefono_casa'
        },

        {
            name    :'ref_familiar',
            mapping :'ref_familiar'
        }
                 
        ]),
        autoLoad:true
    });

    function recargar_grid(){
        ds.proxy= new Ext.data.HttpProxy({
            url: 'php_procesos/p_despachados.php'
        });
        ds.load();
    //Ext.get("v1").focus();
    //view.startCollapsed=true;
    }

    // example of custom renderer function
    function italic(value){
        return '' + value + '';
    }

    // example of custom renderer function
    function change(val){
        if(val > 0){
            return '' + val + '';
        }else if(val < 0){
            return '' + val + '';
        }
        return val;
    }
    // example of custom renderer function
    function pctChange(val){
        if(val > 0){
            return '' + val + '%';
        }else if(val < 0){
            return '' + val + '%';
        }
        return val;
    }

    function hideField(field){       
        field.disable();
        field.hide();
        field.getEl().up('.x-form-item').setDisplayed(false); // hide label .x-form-item
    };

    function showField(field){
        field.enable();
        field.show();
        field.getEl().up('.x-form-item').setDisplayed(true);// show label
    };

    

    //Declaracion de elementos para el formulario
    var btn_materiales = new Ext.Button({
        text:		'Agregar Materiales',
        id:			'btn2',
        width:		150,
        handler: 	ver_materiales,
        iconCls:	'productos'

    });

    var txtFecEjecucion = new Ext.form.DateField({

        id			:'v_fecejecucion',
        name        :'txtFecEjecucion',
        fieldLabel	:'Fec. Ejecucion',
        format      :'Y-m-d'

    });

    var txtFecDevolucion = new Ext.form.DateField({

        id			:'v_fecdevolucion',
        name        :'txtFecDevolucion',
        fieldLabel	:'Fec. Devolucion',
        format      :'Y-m-d'

    });

   

    // combo nodo
    var store_nodo = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: "p_data_combos_georeferencia.php.php?n=20"
        }),
        /*baseParams:{
                        n:20
                    },*/
        reader: new Ext.data.JsonReader({
            root: 'lst_nodo'
        },
        [{
            name    :'id_area_nodo',
            mapping :'id_area_nodo'
        },

        {
            name    :'desc_area_nodo',
            mapping :'desc_area_nodo'
        }
        ]),
        autoLoad:true
    });

    var combo_nodo = new Ext.form.ComboBox({
        store: store_nodo,
        id:'cb_nodo',
        displayField:'desc_area_nodo',
        valueField	:'id_area_nodo',
        fieldLabel: 'Zona',
        typeAhead: true,
        mode: 'local',
        triggerAction: 'all',
        emptyText:'Selecciona zona...',
        selectOnFocus:true
    });

    var txtBorne= new Ext.form.TextField({
        emptyText 	:'Ingresar Borne...',
        id			:'v_borne',
        width		:50,
        allowBlank	:false,
        fieldLabel	:'Nro.Borne'
    });

  

    // combo tap
    var store_tap = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: "p_data_combos_georeferencia.php.php?n=21"
        }),
        /*baseParams:{
                        n:21
                    },*/
        reader: new Ext.data.JsonReader({
            root: 'lst_tap'
        },
        [{
            name    :'id_tap',
            mapping :'id_tap'
        },

        {
            name    :'nom_tap',
            mapping :'nom_tap'
        }
        ]),
        autoLoad:true
    });

    //combo tap
    var combo_tap = new Ext.form.ComboBox({
        id:'cb_tap',
        store: store_tap,
        displayField:'nom_tap',
        valueField	:'id_tap',
        fieldLabel: 'Tap',
        typeAhead: true,
        mode: 'local',
        triggerAction: 'all',
        emptyText:'Selecciona tap...',
        selectOnFocus:true
    });

    var txtPoste = new Ext.form.TextField({
        emptyText 	:'Ingresar Poste...',
        id			:'v_poste',
        width		:50,
        allowBlank	:false,
        fieldLabel	:'Nro.Poste'
    });

    var txtBorneOcupado = new Ext.form.TextField({
        emptyText 	:'Ingresar Bornes Ocupados...',
        id			:'v_borneocupado',
        width		:50,
        allowBlank	:false,
        fieldLabel	:'Bornes Ocupados'
    });

    var txtBorneLibre = new Ext.form.TextField({
        emptyText 	:'Ingresar Bornes Libres...',
        id			:'v_bornelibre',
        width		:50,
        allowBlank	:false,
        fieldLabel	:'Bornes Libres'
    });

    var txtDireccionTap = new Ext.form.TextField({
        emptyText 	:'Ingresar Direccion TAP...',
        id			:'v_direcciontap',
        width		:150,
        readOnly    :true,
        allowBlank	:true,
        fieldLabel	:'Direccion TAP'
    });

    var txtHoraInicio = new Ext.form.TextField({
        emptyText 	:'Ingresar Hora Inicio...',
        id			:'v_hinicio',
        width		:150,
        allowBlank	:false,
        fieldLabel	:'Inicio'
    });

    var txtHoraFin = new Ext.form.TextField({
        emptyText 	:'Ingresar Hora Fin...',
        id			:'v_hfin',
        width		:150,
        allowBlank	:false,
        fieldLabel	:'Fin'
    });

    var txtPersonaContacto = new Ext.form.TextField({
        emptyText 	:'Ingresar Persona Contacto...',
        id			:'v_pcontacto',
        width		:150,
        allowBlank	:false,
        fieldLabel	:'Contacto'
    });

    var txtTelefonoContacto = new Ext.form.TextField({
        emptyText 	:'Ingresar Telefono Contacto...',
        id			:'v_tcontacto',
        width		:150,
        allowBlank	:false,
        fieldLabel	:'Telf. Contacto'
    });

    var txtDocumentoContacto = new Ext.form.TextField({
        emptyText 	:'Ingresar Documente Contacto...',
        id			:'v_dcontacto',
        width		:150,
        allowBlank	:false,
        fieldLabel	:'Dcto Contacto'
    });

    
    var txtObsTecnica = new Ext.form.TextField({
        emptyText 	:'Ingresar Observacion Tecnica...',
        id			:'v_observaciontecnica',
        width		:150,
        allowBlank	:false,
        fieldLabel	:'Observacion'
    });

    var txtObsDevolucion = new Ext.form.TextField({
        emptyText 	:'Ingresar Observacion Devolucion...',
        id			:'v_observaciondevolucion',
        width		:150,
        allowBlank	:false,
        fieldLabel	:'Observacion'
    });

    var optConforme = new Ext.form.RadioGroup({
        //id			:'rbtdoc',
        xtype: 'radiogroup',
        fieldLabel: 'Conformidad',
        allowBlank  :false,
        anchor: '91%',
        //hidden:true,
        items: [
        {
            boxLabel: 'SI', 
            name: 'rbtdoc', 
            inputValue: 1
        },

        {
            boxLabel: 'NO', 
            name: 'rbtdoc', 
            inputValue: 2
        }
        ]


    });

    // combo acciones
    var store_acciones = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: "php_procesos/p_acciones.php"
        }),
        baseParams:{
            f:1
        },
        reader: new Ext.data.JsonReader({
            root: 'lst_accion'
        },
        [{
            name    :'id_estado',
            mapping :'id_estado'
        },

        {
            name    :'desc_estado',
            mapping :'desc_estado'
        }
        ]),
        autoLoad:true
    });

    var btn_grabar = new Ext.Button({
        text:		'Liquidar',
        id:			'btn3',
        width:		150,
        handler: function(){
            //*******************************************************************************************************//
            // PROCESO DE GRABACION
            //*******************************************************************************************************//
            if(gridForm.getForm().isValid()){
                /*
                        Ext.Msg.alert('Confirmacion', 'Desea grabar los datos?: <br />'+
                            formulario.getForm().getValues(true).replace(/&/g,', '));
                        */
                Ext.Msg.show({
                    title:'CONFIRMACION',
                    msg: 'Realmente desea grabar los datos?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn,text){
                        if(btn=='yes'){
                            gridForm.form.submit({
                                url: 'php_procesos/p_graba_liquidacion.php',
                                method: 'POST',
                                params: {
                                    action: 'liquidar',
                                    //iduser: Ext.getDom('iduser').value
                                    iduser: 1
                                },
                                waitTitle: 'Conectando',
                                waitMsg: 'Guardando datos...',
                                success: function(form, action){
                                    Ext.MessageBox.alert('Mensaje', 'Los datos han sido grabados.');
                                    recargar_grid();
                                    gridForm.getForm().reset();
  
                                },
                                failure: function(form, action){
                                    if (action.failureType == 'server') {
                                        var obj = Ext.util.JSON.decode(action.response.responseText);
                                        Ext.Msg.alert('Mensaje', obj.errors.reason);
                                    }
                                    else {
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

            }else{
                Ext.Msg.alert('ALERTA','Hay datos obligatorios que estan vacios. Verifique');
            }
        }

    });

    var btn_devolver = new Ext.Button({
        text:		'Devolver',
        id:			'btn5',
        width:		150,
        handler: function(){
            //*******************************************************************************************************//
            // PROCESO DE DEVOLUCION
            //*******************************************************************************************************//
            if(gridForm.getForm().isValid()){
                /*
                        Ext.Msg.alert('Confirmacion', 'Desea grabar los datos?: <br />'+
                            formulario.getForm().getValues(true).replace(/&/g,', '));
                        */
                Ext.Msg.show({
                    title:'DEVOLUCION',
                    msg: 'Realmente desea Devolver el Pedido?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn,text){
                        if(btn=='yes'){
                            gridForm.form.submit({
                                url: 'php_procesos/p_graba_liquidacion.php',
                                method: 'POST',
                                params: {
                                    action: 'devolver',
                                    iduser: Ext.getDom('iduser').value
                                //iduser: 1
                                },
                                waitTitle: 'Conectando',
                                waitMsg: 'Guardando datos...',
                                success: function(form, action){
                                    Ext.MessageBox.alert('Mensaje', 'Los datos han sido grabados.');
                                    recargar_grid();
                                    gridForm.getForm().reset();
                                            
                                },
                                failure: function(form, action){
                                    if (action.failureType == 'server') {
                                        var obj = Ext.util.JSON.decode(action.response.responseText);
                                        Ext.Msg.alert('Mensaje', obj.errors.reason);
                                    }
                                    else {
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

            }else{
                Ext.Msg.alert('ALERTA','Hay datos obligatorios que estan vacios. Verifique');
            }
        }

    });

    var btn_cancelar = new Ext.Button({
        text:		'Cancelar',
        id:			'btn4',
        width:		150,
        handler: function(){
            gridForm.getForm().reset();
        }


    });

    var combo_acciones = new Ext.form.ComboBox({
        id:'cb_acciones',
        store: store_acciones,
        displayField:'desc_estado',
        valueField	:'id_estado',
        fieldLabel: 'Accion',
        typeAhead: true,
        mode: 'local',
        triggerAction: 'all',
        emptyText:'Selecciona una accion...',
        selectOnFocus:true,
        listeners: {
            select: function(f,r,i){
                if (r.data.id_estado == 5){
         
                    btn_materiales.hide();
                    hideField(combo_nodo);
                    hideField(txtBorne);
                    hideField(combo_tap);
                    hideField(txtPoste);
                    hideField(txtBorneLibre);
                    hideField(txtBorneOcupado);
                    hideField(txtDireccionTap);
                    hideField(txtPersonaContacto);
                    hideField(txtTelefonoContacto);
                    hideField(txtDocumentoContacto);
                    hideField(optConforme);
                    hideField(txtObsTecnica);
                    hideField(txtFecEjecucion);
                    hideField(txtHoraInicio);
                    hideField(txtHoraFin);

                    showField(txtObsDevolucion);
                    showField(txtFecDevolucion);
                    btn_grabar.hide();
                    btn_devolver.show();
                    btn_cancelar.show();
                }
                if (r.data.id_estado == 6){

                    btn_materiales.show();
                    showField(combo_nodo);
                    showField(txtBorne);
                    showField(combo_tap);
                    showField(txtPoste);
                    showField(txtBorneLibre);
                    showField(txtBorneOcupado);
                    showField(txtDireccionTap);
                    showField(txtPersonaContacto);
                    showField(txtTelefonoContacto);
                    showField(txtDocumentoContacto);
                    showField(optConforme);
                    showField(txtObsTecnica);
                    showField(txtFecEjecucion);
                    showField(txtHoraInicio);
                    showField(txtHoraFin);
                    hideField(txtObsDevolucion);
                    hideField(txtFecDevolucion);
                    btn_grabar.show();
                    btn_devolver.hide();
                    btn_cancelar.hide();

                }
            }
        }
    });

    



    function ver_materiales(){

        var dn=Ext.get("id_pedido").getValue();
        //var dt=formulario.getForm().getValues()['rb-tdoc'];
        var fm = Ext.form;

        //Store pedidos despachados
        var ds1=new Ext.data.Store({			// Data de Materiales
            proxy: new Ext.data.HttpProxy({
                url: "php_procesos/p_materiales.php"
            }),
            baseParams:{
                f:1,
                dn:dn
            },
            reader: new Ext.data.JsonReader({
                root: 'lst_material'
            },
            [{
                name    :'id_material',
                mapping :'id_material'
            },

            {
                name    :'nom_material',
                mapping :'nom_material'
            },
{
                name    :'unidad',
                mapping :'unidad'
            },
{
                name    :'estandar',
                mapping :'estandar'
            },
{
                name    :'adicional',
                mapping :'adicional'
            },

            {
                name    :'otro',
                mapping :'otro'
            }
            ]),
            autoLoad:true
        });



        // the column model has information about grid columns
        // dataIndex maps the column to the specific data field in
        // the data store (created below)
        var cm1 = new Ext.grid.ColumnModel([{
            id:'id_material',
            header: "Cod. Material",
            dataIndex: 'id_material',
            width: 100
        },{
            header: "Material",
            dataIndex: 'nom_material',
            width: 130
        },{
            header: "Unidad",
            dataIndex: 'unidad',
            width: 70,
            align: 'right'
        },{
            header: "Estandar",
            dataIndex: 'estandar',
            width: 95,
            editor: new fm.TextField({
                allowBlank: false
            })
        },{
            header: "Adicional",
            dataIndex: 'adicional',
            width: 95,
            editor: new fm.TextField({
                allowBlank: false
            })
        },{
            header: "Otro",
            dataIndex: 'otro',
            width: 95,
            editor: new fm.TextField({
                allowBlank: false
            })
        }
        ]);

        // by default columns are sortable
        cm1.defaultSortable = true;

        var Material = Ext.data.Record.create([
        // the "name" below matches the tag name to read, except "availDate"
        // which is mapped to the tag "availability"
        {
            name: 'nom_material', 
            type: 'string'
        },

        {
            name: 'estandar', 
            type: 'number'
        },

        {
            name: 'adicional', 
            type: 'number'
        },

        {
            name: 'otro',  
            type: 'number'
        }
        ]);



        // create the editor grid
        var grid1 = new Ext.grid.EditorGridPanel({
            store: ds1,
            cm: cm1,
            id:'grid1',
            //renderTo: 'editor-grid',
            //width:700,
            autoWidth:true,
            autoHeight:true,
            //height:300,
            //autoExpandColumn:'common',
            //title:'Materiales',
            frame:true,
            clicksToEdit:1
        /*
        ,tbar: [{
            text: 'Agregar Materiales',
            handler : function(){
                var p = new Material({
                    common: 'Nuevo Material',
                    light: 'Mostly Shade',
                    price: 0,
                    availDate: (new Date()).clearTime(),
                    indoor: false
                });
                grid1.stopEditing();
                ds1.insert(0, p);
                grid1.startEditing(0, 0);
            }
            }]
         */
        });
       
        var ventana2=new Ext.Window({
            title	:'Materiales del pedido'+dn,
            width	:676,
            modal	:false,
            resizable:false,
            height	:280,
            bodyStyle	:'padding:5px;',
            items	:grid1
        });
        ventana2.show();

    }

    // the DefaultColumnModel expects this blob to define columns. It can be extended to provide
    // custom or reusable ColumnModels
    var colModel = new Ext.grid.ColumnModel([
    {
        id:'id_pedido',
        header: "Pedido", 
        width: 60, 
        sortable: true, 
        locked:false, 
        dataIndex: 'id_pedido'
    },

    {
        header: "Fec. Inscripcion", 
        width: 110, 
        sortable: true,
        dataIndex: 'f_reg_ped'
    },

    {
        header: "Fec. Programacion", 
        width: 110, 
        sortable: true,
        dataIndex: 'f_prg_ped'
    },

    {
        header: "Tecnico", 
        width: 160, 
        sortable: true, 
        dataIndex: 'nom_tecnico'
    }
    ]);

    var gridForm = new Ext.FormPanel({
        id: 'form-pedido',
        frame: true,
        labelAlign: 'left',
        title: 'Pedidos por Instalar',
        bodyStyle:'padding:5px',
        width: 950,
        layout: 'column',	// Specifies that the items will now be arranged in columns
        items: [{
            columnWidth: 0.5,
            layout: 'fit',
            items: {
                xtype: 'grid',
                ds: ds,
                cm: colModel,
                sm: new Ext.grid.RowSelectionModel({
                    singleSelect: true,
                    listeners: {
                        rowselect: function(sm, row, rec) {
                            Ext.getCmp("form-pedido").getForm().loadRecord(rec);
                        }
                    }
                }),
                //autoExpandColumn: 'Tecnico',
                height: 350,
                title:'Instalacion de Pedidos',
                border: true,
                listeners: {
                    render: function(g) {
                        g.getSelectionModel().selectRow(0);
                    },
                    delay: 10 // Allow rows to be rendered.
                }
            }
        },{
            columnWidth: 0.5,
            xtype: 'fieldset',
            //bodyStyle: 'padding:0 10px 0;',
            border:true,
            title:'Detalle de Pedido',
            defaultType: 'textfield',
            frame:true,
            autoHeight: true,
            bodyStyle: Ext.isIE ? 'padding:0 0 5px 15px;' : 'padding:10px 15px;',
            style: {
                "margin-left": "10px", // when you add custom margin in IE 6...
                "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0"  // you have to adjust for it somewhere else
            },
            items: [{
                fieldLabel: 'Pedido',
                name: 'id_pedido',
                id: 'id_pedido',
                readOnly:true,
                width	:70
            },
            {
                fieldLabel: 'Fec.Inscripcion',
                name: 'f_reg_ped',
                readOnly:true,
                width	:150
            },
            {
                fieldLabel: 'Fec.Programacion',
                name: 'f_prg_ped',
                readOnly:true,
                width	:150
            },
            {
                fieldLabel: 'C\u00F3digo Cliente',
                name: 'id_cliente',
                readOnly:true,
                width	:70
            },{
                fieldLabel: 'Nombre Cliente',
                name: 'nombre',
                readOnly:true,
                width	:300,
                columnWidth:.50
            },
            {
                fieldLabel: 'Telefono Casa',
                name: 'telefono_casa',
                readOnly:true,
                width	:70,
                columnWidth:.50
            }
            ,{
                fieldLabel: 'Direccion',
                name: 'direccion',
                readOnly:true,
                width	:300
            }
            ,{
                fieldLabel: 'Observacion',
                name: 'ref_familiar',
                readOnly:true,
                width	:300
            },
            combo_acciones,
            btn_materiales,
            combo_nodo,
            combo_tap,
            txtBorne,
            txtBorneOcupado,
            txtBorneLibre,
            txtPoste,
            txtDireccionTap,
            txtPersonaContacto,
            txtTelefonoContacto,
            txtDocumentoContacto,
            optConforme,
            txtObsTecnica,
            txtFecEjecucion,
            txtObsDevolucion,
            txtFecDevolucion,
            txtHoraInicio,
            txtHoraFin,
            btn_grabar,
            btn_devolver,
            btn_cancelar
            
            ]
        }]
        ,
        renderTo: bd
    });
    btn_materiales.hide();
    hideField(combo_nodo);
    hideField(txtBorne);
    hideField(combo_tap);
    hideField(txtPoste);
    hideField(txtBorneOcupado);
    hideField(txtBorneLibre);
    hideField(txtDireccionTap);
    hideField(txtPersonaContacto);
    hideField(txtTelefonoContacto);
    hideField(txtDocumentoContacto);
    hideField(optConforme);
    hideField(txtObsTecnica);
    hideField(txtObsDevolucion);
    hideField(txtFecEjecucion);
    hideField(txtFecDevolucion);
    hideField(txtHoraInicio);
    hideField(txtHoraFin);
    btn_grabar.hide();
    btn_devolver.hide();
    btn_cancelar.hide();
});

