Ext.BLANK_IMAGE_URL = "librerias/ext-2.2/resources/images/default/s.gif"
Ext.onReady(function(){

    Ext.QuickTips.init();


    var jr,jx,ja,ju;
    var panwin;

    var mapa_ubicacion;
    var txt_coordX, txt_coordY;

    //*******************************************************************************************************//
    //CAJAS DE TEXTO
    //*******************************************************************************************************//

    var txt_num_doc = new Ext.form.TextField({
        id : 'idtxt_num_doc',
        name        :'idtxt_num_doc',
        decimalPrecision : 0,
        allowNegative: false,
        allowBlank  :true,
        anchor:'99%'
    });

    var txt_nom_ape = new Ext.form.TextField({
        id          :'idtxt_nom_ape',
        fieldLabel  :'Apellidos y Nombres',
        disabled    :false,
        name        :'idtxt_nom_ape',
        allowBlank  :false,
        readOnly    :true,
        style       :'background-color:#DFE8F6;',
        anchor      :'90%'
    });

    var txt_tdoc = new Ext.form.TextField({
        id          :'idtdoc',
        fieldLabel  :'T.Documento',
        disabled    :false,
        readOnly    :true,
        name        :'idtdoc',
        allowBlank  :true,
        style       :'background-color:#DFE8F6;',
        anchor      :'50%'
    });

    var txt_ndoc = new Ext.form.TextField({
        id          :'idndoc',
        fieldLabel  :'N&uacute;m. Documento',
        disabled    :false,
        readOnly    :true,
        name        :'idndoc',
        allowBlank  :true,
        style       :'background-color:#DFE8F6;',
        anchor      :'97%'
    });

    var txt_domicilio = new Ext.form.TextField({
        id          :'idtxt_domicilio',
        fieldLabel  :'Domicilio',
        disabled    :false,
        readOnly    :true,
        name        :'idtxt_domicilio',
        allowBlank  :true,
        style       :'background-color:#DFE8F6;',
        anchor      :'99%'
    });

    var txt_direccion_inst = new Ext.form.TextField({
        id          :'idtxt_direccion_inst',
        fieldLabel  :'Direcci&oacute;n',
        disabled    :false,
        name        :'idtxt_direccion_inst',
        anchor      :'90%',
        allowBlank  :true
    });

    var txt_num_inst = new Ext.form.NumberField({
        id : 'idtxt_num_inst',
        name        :'idtxt_num_inst',
        fieldLabel: 'N&uacute;mero',
        decimalPrecision : 0,
        allowNegative: false,
        allowBlank  :true,
        emptyText   :'Ingrese solo numeros...',
        anchor:'90%'
    });

    var txt_cantidad = new Ext.form.NumberField({
        id          :'idtxt_cantidad',
        name        :'idtxt_cantidad',
        fieldLabel  :'Cant. Eq. Adic.',
        decimalPrecision : 0,
        allowNegative: false,
        allowBlank  :true,
        anchor      :'60%',
        enableKeyEvents:true,
        listeners   :{
            keyup : function(obj,n_valor)  {
                var j_tv_adic=document.getElementById('idtxt_cantidad').value;
                var j_total_tv=j_tv_adic*jr;
                var j_mostrar=ja+' '+j_total_tv;
                txt_pago_equipos.setValue(j_mostrar);
                var j_pago_total=(ju*1)+(j_total_tv*1);
                var j_mostrar_total=ja+' '+j_pago_total;
                txt_total_pago.setValue(j_mostrar_total);
            }
        }
    });

    var txt_pago_inicial = new Ext.form.TextField({
        id          :'idtxt_monto_inicial',
        name        :'idtxt_monto_inicial',
        fieldLabel  :'Pago Mensual por el Servicio',
        allowBlank  :true,
        readOnly    :true,
        anchor      :'60%'
    });

    var txt_pago_equipos = new Ext.form.TextField({
        id          :'idtxt_monto_equipos',
        name        :'idtxt_monto_equipos',
        fieldLabel  :'Pago Mensual por TVs Adic.',
        allowBlank  :true,
        readOnly    :true,
        anchor      :'80%'
    });

    var txt_total_pago = new Ext.form.TextField({
        id          :'idtxt_pago_inicial',
        name        :'idtxt_pago_inicial',
        fieldLabel  :'Pago Inicial',
        allowBlank  :true,
        readOnly    :true,
        anchor      :'80%'
    });

    var txt_mza_inst = new Ext.form.TextField({
        id          :'idtxt_mza_inst',
        fieldLabel  :'Mza/Lte',
        disabled    :false,
        name        :'idtxt_mza_inst',
        anchor      :'90%',
        emptyText   :'Dato opcional...',
        allowBlank  :true
    });


    var txt_datos_vendedor = new Ext.form.TextField({
        id          :'idtxt_datos_vendedor',
        fieldLabel  :'Datos Vendedor',
        disabled    :false,
        readOnly    :true,
        name        :'idtxt_datos_vendedor',
        anchor      :'95%'
    });

    txt_coordX = new Ext.form.TextField({
        id          :'idtxt_coordx',        
        fieldLabel  :'Coord. X',
        disabled    :true,
        readOnly    :true,
        name        :'idtxt_coordx',
        anchor      :'50%'
    });

    txt_coordY = new Ext.form.TextField({
        id          :'idtxt_coordy',        
        fieldLabel  :'Coord. Y',
        disabled    :true,
        readOnly    :true,
        name        :'idtxt_coordy',
        anchor      :'50%'
    });

    txt_cantidad.disable();
    txt_pago_equipos.disable();
    
    //*******************************************************************************************************//
    //BOTONES
    //*******************************************************************************************************//



    var btn_ver_productos = new Ext.Button({
        text:		'Ver Productos Adquiridos',
        id:			'btn2',
        width:		150,
        handler: 	ver_productos,
        iconCls:	'productos'

    });

    //*******************************************************************************************************//
    //DATA STORE'S
    //*******************************************************************************************************//
    
    var dbVendedor=new Ext.data.Store({             // Data de Vendedores
        proxy: new Ext.data.HttpProxy({
            url: "php_procesos/p_data_combos_comercial.php"
        }),
        baseParams:{
            f:4
        },
        reader: new Ext.data.JsonReader({
            root: 'vendedores'
        },
        [{
            name    :'id_vendedor',
            mapping :'id_vendedor'
        },

        {
            name    :'cod_vendedor',
            mapping :'cod_vendedor'
        },

        {
            name    :'nom_completo',
            mapping :'nom_completo'
        }])
    });

    var dbServicios=new Ext.data.Store({			// Data de Servicios
        proxy: new Ext.data.HttpProxy({
            url: "php_procesos/p_data_combos_comercial.php"
        }),
        baseParams:{
            f:5
        },
        reader: new Ext.data.JsonReader({
            root: 'servicios'
        },
        [{
            name    :'id_servicio',
            mapping :'id_servicio'
        },

        {
            name    :'nom_servicio',
            mapping :'nom_servicio'
        },

        {
            name    :'desc_servicio',
            mapping :'desc_servicio'
        },

        {
            name    :'habilita_cantidad',
            mapping :'habilita_cantidad'
        },

        {
            name    :'precio_unitario',
            mapping :'precio_unitario'
        },

        {
            name    :'precio_por_dia',
            mapping :'precio_por_dia'
        },

        {
            name    :'monto_por_tv_adicional',
            mapping :'monto_por_tv_adicional'
        },

        {
            name    :'id_moneda',
            mapping :'id_moneda'
        },

        {
            name    :'id_tiposervicio',
            mapping :'id_tiposervicio'
        },

        {
            name    :'monto',
            mapping :'monto'
        },

        {
            name    :'monto_tv',
            mapping :'monto_tv'
        },

        {
            name    :'pref_moneda',
            mapping :'pref_moneda'
        }
        ])
    });


    var dbZonal=new Ext.data.Store({			// Data de Departamentos - Instalacion
        proxy: new Ext.data.HttpProxy({
            url: "php_procesos/p_data_combos_comercial.php"
        }),
        baseParams:{
            f:1
        },
        reader: new Ext.data.JsonReader({
            root: 'zonales'
        },
        [{
            name    :'id_zonal',
            mapping :'id_zonal'
        },

        {
            name    :'desc_zonal',
            mapping :'desc_zonal'
        }])
    });

    var dbCiudad=new Ext.data.Store({			// Data de Ciudades - Instalacion
        proxy: new Ext.data.HttpProxy({
            url: "php_procesos/p_data_combos_comercial.php"
        }),
        reader: new Ext.data.JsonReader({
            root: 'ciudades'
        },
        [{
            name    :'id_ciudad',
            mapping :'id_ciudad'
        },

        {
            name    :'desc_ciudad',
            mapping :'desc_ciudad'
        }
        ]),
        autoLoad:false
    });

    var dbDistrito=new Ext.data.Store({			// Data de Ciudades - Instalacion
        proxy: new Ext.data.HttpProxy({
            url: "php_procesos/p_data_combos_comercial.php"
        }),
        reader: new Ext.data.JsonReader({
            root: 'distritos'
        },
        [{
            name    :'id_distrito',
            mapping :'id_distrito'
        },

        {
            name    :'desc_distrito',
            mapping :'desc_distrito'
        }
        ]),
        autoLoad:false
    });

    //*******************************************************************************************************//
    //COMBO BOX'S
    //*******************************************************************************************************//

    var cbo_Vendedor = new Ext.form.ComboBox({
        fieldLabel	:'Vendedor',
        id			:'idcbo_vendedor',
        store       :dbVendedor,
        displayField:'cod_vendedor',
        valueField	:'id_vendedor',
        hiddenName	:'id_vendedor',
        typeAhead   :true,
        mode        :'remote',
        forceSelection: true,
        allowBlank	:false,
        readOnly    :true,
        triggerAction: 'all',
        emptyText   :'Seleccione Vendedor...',
        selectOnFocus:true,
        listeners: {
            select: function (cbo,datos,idx){
                var jn=datos.data.nom_completo;

                txt_datos_vendedor.setValue(jn);
            }
        }
    });

    var cbo_Servicios = new Ext.form.ComboBox({
        fieldLabel	:'Productos',
        id			:'idcbo_servicios',
        store       :dbServicios,
        displayField:'nom_servicio',
        valueField	:'id_servicio',
        hiddenName	:'id_servicio',
        typeAhead   :true,
        mode        :'remote',
        forceSelection: true,
        allowBlank	:false,
        readOnly    :true,
        triggerAction: 'all',
        emptyText   :'Seleccione Producto...',
        selectOnFocus:true,
        listeners: {
            select: function (cbo,datos,idx){
                var jn=datos.data.desc_servicio;
                var jv=datos.data.habilita_cantidad;
                ju=datos.data.precio_unitario;
                jr=datos.data.monto_por_tv_adicional;
                var jw=datos.data.id_tiposervicio;
                var jz=datos.data.monto;
                jx=datos.data.monto_tv;
                ja=datos.data.pref_moneda;

                document.getElementById('idmensaje').value=jn;
                if(jv==1) {     //Servicio Cable
                    txt_cantidad.enable();
                }
                if(jv!=1){      //Otros Sservicios
                    txt_cantidad.disable();
                    txt_cantidad.setValue(' ');
                    txt_pago_equipos.setValue(' ');
                    txt_total_pago.setValue(' ');
                }

                document.getElementById('idtxt_monto_inicial').value=jz;
                document.getElementById('idtxt_pago_inicial').value=jz;
                
                if(jw!=1){              //Otros Servicios
                    txt_pago_equipos.disable();
                }else if(jw==1){        //Servicio Cable
                    txt_pago_equipos.enable();
                    txt_total_pago.enable();
                }


            }
        }
    });

    var cbo_Distrito = new Ext.form.ComboBox({
        fieldLabel	:'Distritos',
        id			:'idcbo_distrito',
        store       :dbDistrito,
        displayField:'desc_distrito',
        valueField	:'id_distrito',
        hiddenName	:'id_distrito',
        typeAhead   :true,
        mode        :'remote',
        forceSelection: false,
        allowBlank	:true,
        readOnly    :true,
        triggerAction: 'all',
        emptyText   :'Seleccione Distrito...',
        selectOnFocus:true
    });

    var cbo_Ciudad = new Ext.form.ComboBox({
        fieldLabel	:'Ciudades',
        id			:'idcbo_ciudad',
        store       :dbCiudad,
        displayField:'desc_ciudad',
        valueField	:'id_ciudad',
        hiddenName	:'id_ciudad',
        typeAhead   :true,
        mode        :'remote',
        forceSelection: true,
        allowBlank	:true,
        readOnly    :true,
        triggerAction: 'all',
        emptyText   :'Seleccione Ciudad...',
        selectOnFocus:true,
        listeners: {
            select: function (){
                cbo_Distrito.setValue('');
                dbDistrito.baseParams = {
                    f:3,
                    id_ciudad:Ext.getCmp("idcbo_ciudad").getValue()
                };
                dbDistrito.load();
            }
        }
    });

    var cbo_Zonal = new Ext.form.ComboBox({
        fieldLabel	:'Departamentos',
        id			:'idcbo_zonal',
        store       :dbZonal,
        displayField:'desc_zonal',
        valueField	:'id_zonal',
        hiddenName	:'id_zonal',
        typeAhead   :true,
        mode        :'remote',
        forceSelection: true,
        readOnly    :true,
        triggerAction: 'all',
        emptyText   :'Seleccione Dpto...',
        selectOnFocus:true,
        allowBlank	:true,
        listeners: {
            select: function (){
                cbo_Ciudad.setValue('');
                dbCiudad.baseParams = {
                    f:2,
                    id_zonal:Ext.getCmp("idcbo_zonal").getValue()
                };
                dbCiudad.load();
            }
        }
    });

    //*******************************************************************************************************//
    //VENTANA DEL MAPA
    //*******************************************************************************************************//

    mapa_ubicacion=new Ext.ux.GMapPanel({
        id          :'id_mapa',
        zoomLevel: 14,
        gmapType: 'map',
        mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
        mapControls: ['GSmallMapControl','GMapTypeControl','NonExistantControl'],
        setCenter: {
            lat: -11.90119926,
            lng: -77.03969478
        }
    });

    panwin = new Ext.Window({
        layout: 'fit',
        title   : 'Seleccionar ubicaci&oacute;n de la instalaci\u00F3n',
        closeAction: 'hide',
        width   :500,
        height  :450,
        x       :480,
        items   :mapa_ubicacion,
        listeners:{
            activate :function(){
                var map=mapa_ubicacion.gmap;
                GEvent.addListener(map, "click", function(overlay,point){
                    var latitud_g = point.lat().toFixed(6);
                    var longitud_g= point.lng().toFixed(6);
                    txt_coordX.setValue(latitud_g);
                    txt_coordY.setValue(longitud_g);
                    panwin.hide();

                });

            }
        }
    });

    //*******************************************************************************************************//
    //BUSCA CLIENTE
    //*******************************************************************************************************//

    var ds = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'php_procesos/p_consultas.php'
        }),
        baseParams:{
            f:1
        },
        reader: new Ext.data.JsonReader({
            root: 'consulta',
            id: 'idconsulta'
        },[{
            name: 'CODCLI',
            mapping: 'CODCLI'
        }, {
            name: 'NOMAPE',
            mapping: 'NOMAPE'
        }, {
            name: 'NRODOC',
            mapping: 'NRODOC'
        }, {
            name: 'TIPODOC',
            mapping: 'TIPODOC'
        }, {
            name: 'DOMICILIO',
            mapping: 'DOMICILIO'
        }
        ])
    });

    var resultTpl = new Ext.XTemplate(
        '<tpl for="."><div class="search-item">',
        '<b>TIPODOC</b> {TIPODOC}</span>&nbsp;<b>NRODOC:</b> {NRODOC}</br>',
        '<b>CODCLI:</b> {CODCLI}</br>',
        '{NOMAPE}<br/>',
        '</div></tpl>'
        );

    var nrodoc;

    var search = new Ext.form.ComboBox({
        store: ds,
        id:'idsearch',
        fieldLabel: 'Buscar',
        displayField: 'NOMAPE',
        typeAhead: false,
        loadingText: 'Buscando...',
        emptyText: 'Ingrese Nro Doc/NomApe/Cod. Cliente',
        width: 285,
        pageSize: 10,
        hideTrigger: true,
        tpl: resultTpl,
        itemSelector: 'div.search-item',
        onSelect: function(record){
            nrodoc=record.data.NRODOC;
            search.collapse();
            search.setValue(record.data.NOMAPE);
            txt_nom_ape.setValue(record.data.NOMAPE);
            txt_tdoc.setValue(record.data.TIPODOC);
            txt_ndoc.setValue(record.data.NRODOC);
            txt_domicilio.setValue(record.data.DOMICILIO);
        }
    });

    //*******************************************************************************************************//
    //FORMULARIO
    //*******************************************************************************************************//

    Ext.form.Field.prototype.msgTarget = 'side';
    var formulario = new Ext.FormPanel({
        bodyStyle   :'padding:0 10px 0;',
        width       :750,
        frame       :true,
        renderTo    :'form-ct',
        items: [{
            xtype:'fieldset',
            title: 'Consultar Cliente',
            labelAlign: 'left',
            labelWidth:0,
            hidden:false,
            autoHeight: true,
            items: [{
                layout:'column',
                border:false,
                items:[{
                    columnWidth:.90,
                    layout: 'form',
                    border:false,
                    items: [search]
                }]
            }]
        },{
            xtype:'fieldset',
            title: 'Cliente',
            labelAlign: 'top',
            hidden:false,
            autoHeight: true,
            items: [{
                layout:'column',
                border:false,
                anchor:'100%',
                items:[{
                    columnWidth:.50,
                    layout: 'form',
                    border:false,
                    items: [txt_nom_ape]
                },{
                    columnWidth:.23,
                    layout: 'form',
                    border:false,
                    items: [txt_tdoc]
                },{
                    columnWidth:.27,
                    layout: 'form',
                    border:false,
                    items: [txt_ndoc]
                }]
            },{
                columnWidth:.70,
                layout: 'form',
                border:false,
                items: [txt_domicilio]
            },{
                columnWidth:.70,
                layout: 'form',
                border:false,
                items: [btn_ver_productos]
            }]
        },{
            xtype:'fieldset',
            title: 'Aquirir productos',
            labelAlign: 'top',
            hidden:false,
            autoHeight: true,
            items: [{
                layout:'column',
                border:false,
                anchor:'100%',
                items:[{
                    columnWidth:.30,
                    layout: 'form',
                    border:false,
                    items: [cbo_Servicios]
                },{
                    columnWidth:.20,
                    layout: 'form',
                    border:false,
                    items: [txt_cantidad]
                },{
                    columnWidth:.45,
                    layout: 'form',
                    border:false,
                    items: [{
                        xtype: 'textarea',
                        hideLabel: true,
                        name: 'idmensaje',
                        id:'idmensaje',
                        readOnly :true,
                        style:'background-color:#DFE8F6;',
                        anchor: '100%'
                    }]

                }]
            },{
                layout:'column',
                border:false,
                anchor:'100%',
                items:[{
                    columnWidth:.30,
                    layout: 'form',
                    border:false,
                    items: [txt_pago_inicial]
                },{
                    columnWidth:.30,
                    layout: 'form',
                    border:false,
                    items: [txt_pago_equipos]
                },{
                    columnWidth:.20,
                    layout: 'form',
                    border:false,
                    items: [txt_total_pago]
                }]
            },{
                columnWidth:.90,
                layout: 'form',
                border:false,
                items: [{
                    xtype: 'textarea',
                    hideLabel: false,
                    fieldLabel  :'Observaciones',
                    name: 'idobservaciones',
                    id:'idobservaciones',
                    readOnly :false,
                    anchor: '99%'
                }]
            }]
        },{
            xtype:'fieldset',
            labelAlign: 'top',
            title: 'La Direci&oacute;n de Instalaci&oacute;n es diferente a la registrada por el Cliente',
            autoHeight: true,
            checkboxToggle:true,
            id:'idfld_direccion',
            hidden  :false,
            items: [{
                layout:'column',
                border:false,
                items:[{
                    columnWidth:.30,
                    layout: 'form',
                    border:false,
                    items: [cbo_Zonal]
                },{
                    columnWidth:.30,
                    layout: 'form',
                    border:false,
                    items: [cbo_Ciudad]
                },{
                    columnWidth:.35,
                    layout: 'form',
                    border:false,
                    items: [cbo_Distrito]
                }]
            },{
                layout:'column',
                border:false,
                items:[{
                    columnWidth:.30,
                    layout: 'form',
                    border:false,
                    items: [txt_direccion_inst]
                },{
                    columnWidth:.30,
                    layout: 'form',
                    border:false,
                    items: [txt_num_inst]
                },{
                    columnWidth:.35,
                    layout: 'form',
                    border:false,
                    items: [txt_mza_inst]
                }]
            }]
        },{
            xtype:'fieldset',
            title: 'Datos de la Venta',
            labelAlign: 'top',
            hidden:false,
            autoHeight: true,
            items: [{
                columnWidth:.95,
                layout:'column',
                border:false,
                bodyStyle: 'padding-right:5px;',
                items:[{
                    xtype: 'radiogroup',
                    fieldLabel: 'Seleccione',
                    allowBlank  :false,
                    anchor: '70%',
                    items: [
                    {
                        boxLabel: 'Directo',
                        name: 'rb-tventa',
                        inputValue: 1
                    },

                    {
                        boxLabel: 'Oficina',
                        name: 'rb-tventa',
                        inputValue: 2
                    },

                    {
                        boxLabel: 'Otro',
                        name: 'rb-tventa',
                        inputValue: 3
                    }
                    ]
                }]
            },{
                layout:'column',
                border:false,
                items:[{
                    columnWidth:.30,
                    layout: 'form',
                    border:false,
                    items: [cbo_Vendedor]
                },{
                    columnWidth:.30,
                    layout: 'form',
                    border:false,
                    items: [txt_datos_vendedor]
                }]
            }]
        },{
            xtype        :'fieldset',
            title        :'Georeferencia',
            labelAlign   :'left',
            hidden       :false,
            autoHeight   :true,
            items: [{
                layout  :'column',
                border  :false,
                items   :[{
                    columnWidth :.5,
                    layout      :'form',
                    border      :false,
                    items       :[txt_coordX]
                },{
                    columnWidth :.5,
                    layout      :'form',
                    border      :false,
                    items       :[txt_coordY]
                }]
            },{
                layout  :'column',
                border  :false,
                items   :[{
                    columnWidth :1,
                    layout      :'form',
                    border      :false,
                    html        :'<br>- La ubicaci&oacute;n geogr&aacute;fica tiene que hacer referencia a la direcci&oacute;n de instalaci&oacute;n.<br>- Utilice el mapa para encontrar los puntos X,Y.'
                }]
            }]
        }],
        buttons: [{
            text    :'Ubicar en Mapa',
            minWidth:100,
            handler :function(){
                panwin.show();
            }
        },{
            text    :'Grabar',
            minWidth:100,
            handler :function(){

                //*******************************************************************************************************//
                // PROCESO DE GRABACION
                //*******************************************************************************************************//


                if(formulario.getForm().isValid()){
                    /*
                        Ext.Msg.alert('Confirmacion', 'Desea grabar los datos?: <br />'+
                            formulario.getForm().getValues(true).replace(/&/g,', '));
                        
                        var x=Ext.getCmp('idfld_direccion').checkbox.dom.checked;
                        alert(x);
                        */

                    if(Ext.getCmp('idfld_direccion').checkbox.dom.checked){
                        var a=Ext.getCmp("idcbo_zonal").getValue();
                        var b=Ext.getCmp("idcbo_ciudad").getValue();
                        var c=Ext.getCmp("idcbo_distrito").getValue();
                        var d=Ext.get("idtxt_direccion_inst").getValue();
                        var e=Ext.get("idtxt_num_inst").getValue();

                        if(a<1 || b<1 || c<1 || d.length==0){
                            Ext.Msg.alert('Cuidado!', 'Debe completar los datos de la direccion');
                            return;
                        }
                        if(e.length==0 || e=='Ingrese solo numeros...'){
                            Ext.Msg.alert('Cuidado!', 'Debe completar los datos de la direccion');
                            return;
                        }

                    }
                       
                    Ext.Msg.show({
                        title:'CONFIRMACION',
                        msg: 'Realmente desea grabar los datos?',
                        buttons: Ext.Msg.YESNO,
                        fn: function(btn,text){
                            if(btn=='yes'){
                                Ext.Msg.show({
                                    title:'CONFIRMACION',
                                    msg: 'Cliente realizo pago de un mes por adelantado?',
                                    buttons: Ext.Msg.YESNO,
                                    fn: function(btn,text){
                                        if(btn=='yes'){
                                            formulario.form.submit({
                                                url: 'php_procesos/p_graba_venta_productos.php',
                                                method: 'POST',
                                                params: {
                                                    action: 'nuevo',
                                                    iduser  :Ext.getDom('iduser').value,
                                                    coord_x :Ext.get("idtxt_coordx").getValue(),
                                                    coord_y :Ext.get("idtxt_coordy").getValue()
                                                },
                                                waitTitle: 'Conectando',
                                                waitMsg: 'Guardando datos...',
                                                success: function(form, action){
                                                    Ext.MessageBox.alert('MENSAJE', 'LOS DATOS HAN SIDO GRABADOS. SE HA REGISTRADO EL PEDIDO '+action.result.codped+' PARA EL CLIENTE '+action.result.codcli);
                                                    formulario.getForm().reset();
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
                                            Ext.Msg.alert('Cuidado!', 'El Cliente debe realizar el primer pago por adelantado');
                                        }
                                    },
                                    animEl: 'elId',
                                    icon: Ext.MessageBox.QUESTION
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
        },{
            text    :'Cancelar',
            minWidth:100,
            handler :function(){
                formulario.getForm().reset();
            }
        }]
    });

    //*******************************************************************************************************//
    // FUNCIONES
    //*******************************************************************************************************//


    function ver_productos(){

        var dn=Ext.get("idndoc").getValue();
        var dt=Ext.get("idtdoc").getValue();
        if(dt=="DNI") dt=1;
        if(dt=="RUC") dt=2;
        

        var dbServCli=new Ext.data.Store({			// Data de Servicios del Cliente
            proxy: new Ext.data.HttpProxy({
                url: "php_procesos/p_consulta_productos_cliente.php"
            }),
            baseParams:{
                f:1,
                num_doc:dn,
                tdoc:dt
            },
            reader: new Ext.data.JsonReader({
                root: 'lst_productos'
            },
            [{
                name    :'id_pedido',
                mapping :'id_pedido'
            },

            {
                name    :'nom_servicio',
                mapping :'nom_servicio'
            },

            {
                name    :'cant_eq',
                mapping :'cant_eq'
            },

            {
                name    :'f_reg_ped',
                mapping :'f_reg_ped'
            },

            {
                name    :'desc_estado',
                mapping :'desc_estado'
            },

            {
                name    :'f_liq_ped',
                mapping :'f_liq_ped'
            }
            ]),
            autoLoad:false
        });

        var cm = new Ext.grid.ColumnModel([{
            id		:'xid_pedido',
            header	:'Pedido',
            dataIndex:'id_pedido',
            width	:90,
            align	:'center'
        },{
            id		:'xnom_servicio',
            header	:'Servicio',
            renderer	:Ext.util.Format.uppercase,
            dataIndex:'nom_servicio',
            align	:'center',
            width	:200
        },{
            header	:'Cant. Eq.',
            dataIndex:'cant_eq',
            width	:75,
            align	:'center'
        },{
            header	:'Fec.Reg.Pedido',
            dataIndex:'f_reg_ped',
            align	:'center',
            type		:'datetime',
            width	:140
        },{
            header	:'Fec.Liq.Pedido',
            dataIndex:'f_liq_ped',
            align	:'center',
            type		:'datetime',
            width	:140
        },{
            header	:'Est. Pedido',
            dataIndex:'desc_estado',
            align	:'center',
            width	:100
        }
        ]);

        cm.defaultSortable = true;

        var grid = new Ext.grid.EditorGridPanel({
            store	:dbServCli,
            cm		:cm,
            width	:780,
            height	:240,
            frame	:true,
            view: new Ext.grid.GridView({
                emptyText:'<div style="text-align:center;">No se encontro informaci&oacute;n</div>'
            })
        });

        dbServCli.load();

        var ventana2=new Ext.Window({
            title	:'Productos adquiridos por el Cliente',
            width	:800,
            modal	:true,
            resizable:false,
            height	:280,
            bodyStyle	:'padding:5px;',
            items	:grid
        });
        ventana2.show();
            
    }
        



    //*******************************************************************************************************//
    //VENTANA
    //*******************************************************************************************************//
    var ventana = new Ext.Window({
        title       :'PRODUCTOS Y SERVICIOS',
        width       :850,
        minWidth    :750,
        minHeight   :450,
        layout      :'fit',
        plain       :true,
        y           :2,
        bodyStyle   :'padding:5px;',
        items       :formulario
    });
    ventana.show();
});

