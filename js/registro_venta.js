Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

Ext.onReady(function(){

    Ext.QuickTips.init();
    var ocultar_fieldLabel=true;
    var rdo_dni,rdo_ruc,rdo_tdocumento;
    //*******************************************************************************************************//
    //CAJAS DE TEXTO
    //*******************************************************************************************************//
    var txt_apellido_pa = new Ext.form.TextField({
        id          :'idtxt_apellido_pa',
        fieldLabel  :'Primer Apellido',
        hideLabel   :ocultar_fieldLabel,
        disabled    :false,
        name        :'idtxt_apellido_pa',
        allowBlank  :false,
        anchor      :'90%',
        emptyText   :'Primer Apellido...',
        itemCls     :'sinpadding',
        maskRe      : /[A-Za-z ]/,
        validator: function(v) {
            return /[A-Za-z][. -]{0}/.test(v)? true : 'Solo puede ingresar texto';
        }
    });

    var txt_apellido_ma = new Ext.form.TextField({
        id          :'idtxt_apellido_ma',
        fieldLabel  :'Segundo Apellido',
        hideLabel   :ocultar_fieldLabel,
        disabled    :false,
        name        :'idtxt_apellido_ma',
        allowBlank  :false,
        anchor      :'90%',
        emptyText   :'Segundo Apellido...',
        itemCls     :'sinpadding',
        maskRe      : /[A-Za-z ]/,
        validator: function(v) {
            return /[A-Za-z][. -]{0}/.test(v)? true : 'Solo puede ingresar texto';
        }
    });

    var txt_nombres = new Ext.form.TextField({
        id          :'idtxt_nombres',
        fieldLabel  :'Nombres',
        hideLabel   :ocultar_fieldLabel,
        disabled    :false,
        name        :'idtxt_nombres',
        allowBlank  :false,
        anchor      :'90%',
        emptyText   :'Nombres...',
        itemCls     :'sinpadding',
        maskRe      : /[A-Za-z ]/,
        validator: function(v) {
            return /[A-Za-z][. -]{0}/.test(v)? true : 'Solo puede ingresar texto';
        }
    });

    var txt_num_doc = new Ext.form.NumberField({
        id          :'idtxt_num_doc',
        name        :'idtxt_num_doc',
        fieldLabel: 'N&uacute;m. Documento',
        hideLabel   :ocultar_fieldLabel,
        decimalPrecision :0,
        allowNegative:false,
        allowBlank  :false,
        emptyText   :'Ingrese numero...',
        itemCls     :'sinpadding',
        anchor      :'40%',
        listeners   :{
            focus: function (obj){
                if(rdo_dni.checked){
                    obj.minLength=8;
                    obj.maxLength=8;
                }
                
                if(rdo_ruc.checked){
                    obj.minLength=11;
                    obj.maxLength=11;
                }

            }      
        }
    });

    var txt_telef_fijo = new Ext.form.TextField({
        id          :'idtxt_telef_fijo',
        fieldLabel  :'T. Fijo',
        disabled    :false,
        name        :'idtxt_telef_fijo',
        itemCls     :'sinpadding',
        anchor      :'90%',
        maskRe      :/[0-9. -]/,
        validator: function(v) {
            return /[0-9 -]/.test(v)? true : 'Ingrese solo numeros...';
        }
    });

    var txt_telef_movil = new Ext.form.TextField({
        id          :'idtxt_telef_movil',
        fieldLabel  :'T. Movil',
        disabled    :false,
        name        :'idtxt_telef_movil',
        itemCls     :'sinpadding',
        anchor      :'90%',
        maskRe      : /[0-9. -]/,
        validator: function(v) {
            return /[0-9 -]/.test(v)? true : 'Ingrese solo numeros...';
        }
    });

    var txt_email = new Ext.form.TextField({
        id          :'idtxt_email',
        fieldLabel  :'E-mail',
        disabled    :false,
        name        :'idtxt_email',
        itemCls     :'sinpadding',
        anchor      :'90%',
        vtype       :'email',
        emptyText   :'usuario@dominio.com'
    });

    var txt_profesion = new Ext.form.TextField({
        id          :'idtxt_profesion',
        fieldLabel  :'Profesi&oacute;n',
        disabled    :false,
        name        :'idtxt_profesion',
        itemCls     :'sinpadding',
        anchor      :'95%'
    });

    var txt_empresa = new Ext.form.TextField({
        id          :'idtxt_empresa',
        fieldLabel  :'Empresa',
        disabled    :false,
        name        :'idtxt_empresa',
        itemCls     :'sinpadding',
        anchor      :'95%'
    });

    var txt_cargo = new Ext.form.TextField({
        id          :'idtxt_cargo',
        fieldLabel  :'Cargo',
        disabled    :false,
        name        :'idtxt_cargo',
        itemCls     :'sinpadding',
        anchor      :'90%'
    });

    var txt_direccion_inst_postal = new Ext.form.TextField({
        id          :'idtxt_direccion_inst_postal',
        fieldLabel  :'Direcci&oacute;n',
        disabled    :false,
        name        :'idtxt_direccion_inst_postal',
        itemCls     :'sinpadding',
        anchor      :'94%',
        allowBlank  :false,
        maskRe      : /[A-Za-z ]/,
        validator: function(v) {
            return /[A-Za-z][. -]{0}/.test(v)? true : 'Solo puede ingresar texto';
        }
    });

    var txt_num_inst_postal = new Ext.form.NumberField({
        id : 'idtxt_num_inst_postal',
        name        :'idtxt_num_inst_postal',
        fieldLabel: 'N&uacute;mero',
        hideLabel   :ocultar_fieldLabel,
        decimalPrecision : 0,
        allowNegative: false,
        width       :100,
        allowBlank  :false,
        emptyText   :'Numero...',
        itemCls     :'sinpadding'
    });

    var txt_mza_inst_postal = new Ext.form.TextField({
        id          :'idtxt_mza_inst_postal',
        fieldLabel  :'Mza/Lte',
        disabled    :false,
        hideLabel   :ocultar_fieldLabel,
        name        :'idtxt_mza_inst_postal',
        itemCls     :'sinpadding',
        emptyText   :'Mza/Lte...',
        width       :100
    });

    var txt_piso = new Ext.form.TextField({
        id          :'idtxt_piso',
        fieldLabel  :'Piso',
        disabled    :false,
        hideLabel   :ocultar_fieldLabel,
        name        :'idtxt_piso',
        itemCls     :'sinpadding',
        emptyText   :'Piso...',
        width       :100
    });

    var txt_datos_vendedor = new Ext.form.TextField({
        id          :'idtxt_datos_vendedor',
        fieldLabel  :'',
        hideLabel   :ocultar_fieldLabel,
        disabled    :false,
        readOnly    :true,
        name        :'idtxt_datos_vendedor',
        allowBlank  :true,
        itemCls     :'sinpadding',
        style       :'background-color:#DFE8F6;',
        anchor      :'92%'
    });

    var fecha= new Ext.form.DateField({
        format		:'d-m-Y',
        allowBlank	:false,
        readOnly    :true,
        name        :'txt_fecha',
        itemCls     :'sinpadding',
        selectOnFocus:true,
        fieldLabel  :'Fecha'
    })

    var txt_cod_cliente = new Ext.form.TextField({
        id          :'idtxt_cod_cliente',
        fieldLabel  :'C. Cliente.',
        disabled    :false,
        name        :'idtxt_cod_cliente',
        anchor      :'100%',
        allowBlank  :true,
        hidden      :true,
        hideLabel   :true,
        itemCls     :'sinpadding',
        style       :'background-color:#DFE8F6;'
    });

    var txt_oficina = new Ext.form.TextField({
        id          :'idtxt_oficina',
        fieldLabel  :'Oficina',
        disabled    :false,
        name        :'idtxt_oficina',
        anchor      :'90%',
        allowBlank  :true,
        itemCls     :'sinpadding'
    });

    var txt_telef_oficina = new Ext.form.TextField({
        id          :'idtxt_telef_oficina',
        fieldLabel  :'T. Oficina',
        disabled    :false,
        name        :'idtxt_telef_oficina',
        anchor      :'90%',
        allowBlank  :true,
        itemCls     :'sinpadding'
    });


    var txt_conyuge = new Ext.form.TextField({
        id          :'idtxt_conyuge',
        fieldLabel  :'Conyuge',
        disabled    :false,
        name        :'idtxt_conyuge',
        anchor      :'95%',
        allowBlank  :true,
        itemCls     :'sinpadding'
    });

    var txt_nom_familiar = new Ext.form.TextField({
        id          :'idtxt_nom_familiar',
        fieldLabel  :'',
        disabled    :false,
        name        :'idtxt_nom_familiar',
        hideLabel   :ocultar_fieldLabel,
        anchor      :'98%',
        allowBlank  :true,
        itemCls     :'sinpadding'
    });

    //*******************************************************************************************************//
    //RADIOS
    //*******************************************************************************************************//
    rdo_dni=new Ext.form.Radio({
        boxLabel    :'D.N.I', 
        name        :'rb-tdoc', 
        inputValue  :1
    });
    
    rdo_ruc=new Ext.form.Radio({
        boxLabel    :'R.U.C', 
        name        :'rb-tdoc', 
        inputValue  :2
    });

    rdo_tdocumento=new Ext.form.RadioGroup({
        fieldLabel  :'Tipo de Documento',
        itemCls     :'sinpadding',
        hideLabel   :ocultar_fieldLabel,
        allowBlank  :false,
        heigth      :20,
        anchor      :'91%',
        items: [rdo_dni,rdo_ruc]
    });

    //*******************************************************************************************************//
    //DATA STORE'S
    //*******************************************************************************************************//

	var dbVendedor=new Ext.data.Store({			// Data de Vendedores
		proxy: new Ext.data.HttpProxy({
            url: "php_procesos/p_data_combos_comercial.php"
        }),
        baseParams:{
          f:4
        },
        reader: new Ext.data.JsonReader({root: 'vendedores'},
            [{name    :'id_vendedor',mapping :'id_vendedor'},
             {name    :'cod_vendedor',mapping :'cod_vendedor'},
             {name    :'nom_completo',mapping :'nom_completo'}])
	});

	var dbZonal=new Ext.data.Store({			// Data de Departamentos - Instalacion
		proxy: new Ext.data.HttpProxy({
            url: "php_procesos/p_data_combos_comercial.php"
        }),
        baseParams:{
          f:1
        },
		reader: new Ext.data.JsonReader({root: 'zonales'},
            [{name    :'id_zonal',mapping :'id_zonal'},
             {name    :'desc_zonal',mapping :'desc_zonal'}])
	});

	var dbCiudad=new Ext.data.Store({			// Data de Ciudades - Instalacion
		proxy: new Ext.data.HttpProxy({
            url: "php_procesos/p_data_combos_comercial.php"
        }),
        baseParams:{
            f:2,
            id_zonal:  Ext.getDom('idzonal').value
        },
		reader: new Ext.data.JsonReader({root: 'ciudades'},
            [{name    :'id_ciudad',mapping :'id_ciudad'},
             {name    :'desc_ciudad',mapping :'desc_ciudad'}
        ]),
        autoLoad:false
	});

	var dbDistrito=new Ext.data.Store({			// Data de Ciudades - Instalacion
		proxy: new Ext.data.HttpProxy({
            url: "php_procesos/p_data_combos_comercial.php"
        }),
        baseParams:{
            f:3
        },
		reader: new Ext.data.JsonReader({root: 'distritos'},
            [{name    :'id_distrito',mapping :'id_distrito'},
             {name    :'desc_distrito',mapping :'desc_distrito'}
        ]),
        autoLoad:false
	});

	var dbTipo_Cliente=new Ext.data.Store({		// Data Tipos de Clientes
		proxy: new Ext.data.HttpProxy({
            url: "php_procesos/p_data_combos_comercial.php"
        }),
        baseParams:{
            f:7
        },
		reader: new Ext.data.JsonReader({root: 'tipo_clientes'},
            [{name    :'id_tipo_cliente',mapping :'id_tipo_cliente'},
             {name    :'tipo_cliente',mapping :'tipo_cliente'}
        ]),
        autoLoad:false
	});

    //*******************************************************************************************************//
    //COMBO BOX'S
    //*******************************************************************************************************//

    var cbo_Vendedor = new Ext.form.ComboBox({
        fieldLabel	:'C. Ven.',
        hideLabel   :false,
        id			:'idcbo_vendedor',
        store       :dbVendedor,
        displayField:'cod_vendedor',
        valueField	:'id_vendedor',
        width       :100,
        hiddenName	:'id_vendedor',
        typeAhead   :true,
        mode        :'remote',
        emptyText   :'Seleccione...',
        selectOnFocus:true,
        allowBlank	:false,
        readOnly    :true,
        triggerAction   :'all',
        forceSelection  :true,
        listeners: {
            select: function (cbo,datos,idx){
                var jn=datos.data.nom_completo;

                txt_datos_vendedor.setValue(jn);
            }
        }
    });

    var cbo_Distrito_postal = new Ext.form.ComboBox({
        fieldLabel	:'Distrito',
        id			:'idcbo_distrito_postal',
        store       :dbDistrito,
        displayField:'desc_distrito',
		valueField	:'id_distrito',
		hiddenName	:'id_distrito',
        hideLabel   :true,
        width       :170,
        typeAhead   :true,
        mode        :'remote',
        forceSelection: true,
        readOnly    :true,
        allowBlank	:false,
        triggerAction: 'all',
        emptyText   :'Distrito...',
        selectOnFocus:true
    });

    var cbo_Ciudad_postal = new Ext.form.ComboBox({
        fieldLabel	:'Ciudad',
        id			:'idcbo_ciudad_postal',
        store       :dbCiudad,
        displayField:'desc_ciudad',
		valueField	:'id_ciudad',
		hiddenName	:'id_ciudad',
        typeAhead   :true,
        width       :100,
        mode        :'remote',        
        forceSelection: true,
        readOnly    :true,
        allowBlank	:false,
        triggerAction: 'all',
        emptyText   :'Seleccione...',
        selectOnFocus:true,
        listeners: {
            select: function (){
                cbo_Distrito_postal.setValue('');
               	dbDistrito.baseParams = {
                    f:3,
                    id_ciudad:Ext.getCmp("idcbo_ciudad_postal").getValue()
                };
				dbDistrito.load();
            }
        }
    });

    var cbo_Zonal_postal = new Ext.form.ComboBox({
        fieldLabel	:'Departamento',
        id			:'idcbo_zonal_postal',
        store       :dbZonal,
        displayField:'desc_zonal',
		valueField	:'id_zonal',
		hiddenName	:'id_zonal',
        typeAhead   :true,
        mode        :'remote',
        forceSelection: true,
        hidden      :true,
        readOnly    :true,
        triggerAction: 'all',
        emptyText   :'Seleccione Dpto...',
        selectOnFocus:true,
        allowBlank	:false,
        listeners: {
            select: function (){
                cbo_Ciudad_postal.setValue('');
               	dbCiudad.baseParams = {
                    f:2,
                    id_zonal:Ext.getCmp("idcbo_zonal_postal").getValue()
                };
				dbCiudad.load();
            }
        }
    });

    var cbo_Tipo_Cliente = new Ext.form.ComboBox({
        fieldLabel	:'Tipo Cliente',
        id		:'idcbo_tipo_cliente',
        store           :dbTipo_Cliente,
        displayField    :'tipo_cliente',
        valueField	:'id_tipo_cliente',
        hiddenName	:'id_tipo_cliente',
        typeAhead   :true,
        hideLabel   :true,
        mode        :'remote',
        forceSelection: true,
        hidden      :false,
        readOnly    :true,
        triggerAction: 'all',
        emptyText   :'Seleccione Tipo...',
        selectOnFocus:true,
        allowBlank	:false
    });


    
    var alto_fila1=22;
    var alto_fila2=30;
    var alto_fila3=27;
    var ancho_ventana_form=900;



    //*******************************************************************************************************//
    //FORMULARIO
    //*******************************************************************************************************//

    Ext.form.Field.prototype.msgTarget = 'side';
    var formulario = new Ext.FormPanel({
        bodyStyle   :'padding:0px 0px 0px 0px;',
        width       :ancho_ventana_form,
        renderTo    :'form-ct',
        frame       :true,
        items: [{
           xtype        :'fieldset',
           title        :'Vendedor',
           labelAlign   :'left',
           labelWidth   :50,
           collapsible  :true,
           hidden       :false,
           autoHeight   :true,
           items:[{
                layout:     'column',
                border      :false,
                autoHeight  :false,
                height      :alto_fila1,
                items: [{
                    columnWidth :.40,
                    layout      :'form',
                    border      :false,
                    items: [{
                        xtype       :'radiogroup',
                        frame       :true,
                        itemCls     :'sinpadding',
                        fieldLabel  :'Seleccione',
                        hideLabel   :ocultar_fieldLabel,
                        allowBlank  :false,
                        anchor      :'91%',                        
                        autoHeight  :false,
                        height      :20,
                        items: [
                           {boxLabel: 'Directo', name: 'rb-tventa', inputValue: 1},
                           {boxLabel: 'Oficina', name: 'rb-tventa', inputValue: 2},
                           {boxLabel: 'Otro', name: 'rb-tventa', inputValue: 3}
                        ]
                    }]
                },{
                    columnWidth :.30,
                    layout      :'form',
                    border      :false,
                    defaults    :{height:20},
                    items       :[cbo_Vendedor]
                },{
                    columnWidth :.30,
                    layout      :'form',
                    border      :false,
                    defaults    :{height:20},
                    items       :[txt_datos_vendedor]
                }]
           }]
        },{
            layout      :'column',
            border      :false,
            autoHeight  :false,
            labelWidth  :80,
            height      :alto_fila2,
            items:[{
                columnWidth:.37,
                layout      :'form',
                border      :false,
                defaults    :{height:20},
                items       :[cbo_Ciudad_postal]
            },{
                columnWidth:.30,
                layout      :'form',
                border      :false,
                defaults    :{height:20},
                items       :[fecha]
            },{
                columnWidth :.32,
                layout      :'form',
                border      :false,
                defaults    :{height:20}, 
                items       :[txt_cod_cliente]
            }]
        },{
            xtype       :'fieldset',
            labelAlign  :'left',
            title       :'Iinformaci&oacute;n del Abonado',
            collapsible :true,
            labelWidth  :60,
            autoHeight  :true,
            items: [{
                layout:'column',
                border:false,
                height:alto_fila3,
                items:[{
                    columnWidth:.15,
                    layout  :'form',
                    border  :false,
                    html    :'<b>Nombre o<br>Raz&oacute;n Social</b>'
                },{
                    columnWidth :.25,
                    layout      :'form',
                    border      :false,
                    defaults    :{height:20},
                    items       :[txt_apellido_pa]
                },{
                    columnWidth:.30,
                    layout      :'form',
                    border      :false,
                    defaults    :{height:20},
                    items       :[txt_apellido_ma]
                },{
                    columnWidth:.30,
                    layout      :'form',
                    border      :false,
                    defaults    :{height:20},
                    items       :[txt_nombres]
                }]
            },{
                layout:'column',
                border:false,
                height:alto_fila3,
                items:[{
                    columnWidth:.15,
                    layout  :'form',
                    border  :false,
                    style   :'padding-top: 6px;',
                    html    :'<b>Persona</b>'
                },{
                    columnWidth :.25,
                    layout      :'form',
                    bodyStyle   :'padding-right:5px;',
                    border      :false,
                    items: [{
                        xtype       :'radiogroup',
                        fieldLabel: 'Persona',
                        hideLabel   :ocultar_fieldLabel,
                        allowBlank  :false,
                        itemCls     :'sinpadding',
                        heigth      :20,
                        anchor      :'91%',
                        items: [
                            {boxLabel: 'Natural', name: 'rb-tpersona', inputValue: 1},
                            {boxLabel: 'Jur&iacute;dica', name: 'rb-tpersona', inputValue: 2}
                        ]
                    }]
                },{
                    columnWidth :.30,
                    layout      :'form',
                    bodyStyle   :'padding-right:5px;',
                    border      :false,
                    items: [rdo_tdocumento]
                },{
                    columnWidth :.30,
                    layout      :'form',
                    border      :false,
                    defaults    :{height:20},
                    items       :[txt_num_doc]
                }]
            },{
                layout:'column',
                border:false,
                height:alto_fila3,
                items:[{
                    columnWidth:.15,
                    layout  :'form',
                    border  :false,
                    style   :'padding-top: 6px;',
                    html    :'<b>Tel&eacute;fonos</b>'
                },{
                    columnWidth :.25,
                    layout      :'form',
                    border      :false,
                    defaults    :{height:20},
                    items       :[txt_telef_fijo]
                },{
                    columnWidth:.30,
                    layout      :'form',
                    defaults    :{height:20},
                    border      :false,
                    items       :[txt_telef_movil]
                },{
                    columnWidth:.30,
                    layout      :'form',
                    defaults    :{height:20},
                    border      :false,
                    items       :[txt_email]
                }]
            },{
                layout:'column',
                border:false,
                height:alto_fila3,
                items:[{
                    columnWidth:.15,
                    layout  :'form',
                    border  :false,
                    style   :'padding-top: 6px;',
                    html    :'<b>Dir. Inst.</b>'
                },{
                    columnWidth :.30,
                    layout      :'form',
                    border      :false,
                    items       :[cbo_Distrito_postal]
                },{
                    columnWidth:.55,
                    layout: 'form',
                    border:false,
                    items: [txt_direccion_inst_postal]
                }]
            },{
                layout:'column',
                border:false,
                height:alto_fila3,
                items:[{
                    columnWidth:.15,
                    layout  :'form',
                    border  :false,
                    style   :'padding-top: 6px;',
                    html    :'&nbsp;'
                },{
                    columnWidth :.25,
                    layout      :'form',
                    border      :false,
                    items       :[txt_num_inst_postal]
                },{
                    columnWidth :.25,
                    layout      :'form',
                    border      :false,
                    items       :[txt_mza_inst_postal]
                },{
                    columnWidth :.25,
                    layout      :'form',
                    border      :false,
                    items       :[txt_piso]
                }]
            },{
                layout:'column',
                border:false,
                height:alto_fila3,
                items:[{
                    columnWidth:.15,
                    layout  :'form',
                    border  :false,
                    style   :'padding-top: 6px;',
                    html    :'<b>Vivienda</b>'
                },{
                    columnWidth:.55,
                    layout      :'form',
                    bodyStyle   :'padding-right:5px;',
                    border      :false,                    
                    items: [{
                        xtype       :'radiogroup',
                        fieldLabel  :'Tipo de Vivienda',
                        hideLabel   :ocultar_fieldLabel,
                        allowBlank  :false,
                        itemCls     :'sinpadding',
                        heigth      :20,
                        anchor      :'90%',
                        items: [
                            {boxLabel: 'Propia', name: 'rb-tvivienda', inputValue: 1},
                            {boxLabel: 'Familiar', name: 'rb-tvivienda', inputValue: 2},
                            {boxLabel: 'Alquilada', name: 'rb-tvivienda', inputValue: 3},
                            {boxLabel: 'Multifamiliar', name: 'rb-tvivienda', inputValue: 4}
                        ]
                    }]
                },{
                    columnWidth:.30,
                    layout      :'form',
                    border      :false,
                    bodyStyle   :'padding-right:5px;',
                    items: [{
                        xtype       :'radiogroup',
                        fieldLabel: 'Sexo',
                        allowBlank  :false,
                        itemCls     :'sinpadding',
                        heigth      :20,
                        anchor      :'90%',
                        items: [
                            {boxLabel: 'M', name: 'rb-tsexo', inputValue: 'M'},
                            {boxLabel: 'F', name: 'rb-tsexo', inputValue: 'F'}
                        ]
                    }]
                }]

            },{
                layout  :'column',
                border  :false,
                height  :alto_fila3,
                items:[{
                    columnWidth:.15,
                    layout  :'form',
                    border  :false,
                    style   :'padding-top: 6px;',
                    html    :'&nbsp;'
                },{
                    columnWidth :.30,
                    layout      :'form',
                    border      :false,
                    defaults    :{height:20},
                    items       :[txt_profesion]
                },{
                    columnWidth :.30,
                    layout      :'form',
                    border      :false,
                    defaults    :{height:20},
                    items       :[txt_empresa]
                },{
                    columnWidth:.25,
                    layout      :'form',
                    border      :false,
                    defaults    :{height:20},
                    items       :[txt_cargo]
                }]
            },{
                layout  :'column',
                border  :false,
                height  :alto_fila3,
                items:[{
                    columnWidth:.15,
                    layout  :'form',
                    border  :false,
                    style   :'padding-top: 6px;',
                    html    :'<b>R. Laboral</b>'
                },{
                    columnWidth :.30,
                    layout      :'form',
                    bodyStyle   : 'padding-right:5px;',
                    border      :false,
                    itemCls     :'sinpadding',
                    items: [{
                        xtype       :'radiogroup',
                        fieldLabel: 'Relaci&oacute;n Laboral',
                        allowBlank  :false,
                        hideLabel   :ocultar_fieldLabel,
                        heigth      :20,
                        anchor      :'100%',
                        items: [
                            {boxLabel: 'Dependiente', name: 'rb-trlaboral', inputValue: 1},
                            {boxLabel: 'Independiente', name: 'rb-trlaboral', inputValue: 2}
                        ]
                    }]
                },{
                    columnWidth:.30,
                    layout      :'form',
                    border      :false,
                    defaults    :{height:20},
                    items       :[txt_oficina]
                },{
                    columnWidth:.25,
                    layout      :'form',
                    border      :false,
                    defaults    :{height:20},
                    items       :[txt_telef_oficina]
                }]
            },{
                layout  :'column',
                border  :false,
                height  :alto_fila3,
                items:[{
                    columnWidth:.15,
                    layout  :'form',
                    border  :false,
                    style   :'padding-top: 6px;',
                    html    :'<b>Estado Civil</b>'
                },{
                    columnWidth :.50,
                    layout      :'form',
                    bodyStyle   :'padding-right:5px;',
                    border      :false,
                    itemCls     :'sinpadding',
                    items: [{
                        xtype       :'radiogroup',
                        fieldLabel  :'Est. Civil',
                        heigth      :20,
                        allowBlank  :false,
                        hideLabel   :ocultar_fieldLabel,
                        anchor      :'95%',
                        items: [
                            {boxLabel: 'Soltero', name: 'rb-testadocivil', inputValue: 1},
                            {boxLabel: 'Casado', name: 'rb-testadocivil', inputValue: 2},
                            {boxLabel: 'Viudo', name: 'rb-testadocivil', inputValue: 3},
                            {boxLabel: 'Divorciado', name: 'rb-testadocivil', inputValue: 4}
                        ]
                    }]
                },{
                    columnWidth:.35,
                    layout      :'form',
                    border      :false,
                    defaults    :{height:20},
                    items       :[txt_conyuge]
                }]
            },{
                layout  :'column',
                border  :false,
                height  :alto_fila3,
                items:[{
                    columnWidth:.15,
                    layout  :'form',
                    border  :false,
                    style   :'padding-top: 0px;',
                    html    :'<b>Nombre y<br>Direcci&oacute;n Familiar</b>'
                },{
                    columnWidth :.85,
                    layout      :'form',
                    border      :false,
                    defaults    :{height:20},
                    items       :[txt_nom_familiar]
                }]
            },{
                layout:'column',
                border:false,
                height:alto_fila3,
                items:[{
                    columnWidth:.15,
                    layout  :'form',
                    border  :false,
                    style   :'padding-top: 6px;',
                    html    :'<b>Tipo Cliente</b>'
                },{
                    columnWidth :.30,
                    layout      :'form',
                    border      :false,
                    items       :[cbo_Tipo_Cliente]
                }]
            }]
        }],
            buttons: [{
                text: 'Grabar',
                handler: function(){

                    //*******************************************************************************************************//
                    // PROCESO DE GRABACION
                    //*******************************************************************************************************//
                    if(formulario.getForm().isValid()){
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
                                    formulario.form.submit({
                                        url: 'php_procesos/p_graba_registro_venta.php',
                                        method: 'POST',
                                        params: {
                                            action: 'nuevo',
                                            iduser: Ext.getDom('iduser').value
                                        },
                                        waitTitle: 'Conectando',
                                        waitMsg: 'Guardando datos...',
                                        success: function(form, action){

                                            Ext.MessageBox.alert('CONFIRMACION', 'LOS DATOS HAN SIDO GRABADOS. SE HA REGISTRADO EL CLIENTE CON CODIGO '+action.result.codcli);
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
                text: 'Cancelar',
                handler: function(){
                    formulario.getForm().reset();
                }
            }]
        });


        //*******************************************************************************************************//
        //VENTANA
        //*******************************************************************************************************//

        var ventana = new Ext.Window({
            title       :'REGISTRO DE CLIENTES',
            width       :ancho_ventana_form,
            minWidth    :750,
            autoHeight  :true,
            layout      :'fit',
            plain       :true,
            y           :10,
            bodyStyle   :'padding:5px;',
            items       :formulario

        });
        ventana.show();




});
