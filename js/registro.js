Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"
Ext.onReady(function(){

    Ext.QuickTips.init();
    
    //*******************************************************************************************************//
    //CAJAS DE TEXTO
    //*******************************************************************************************************//
    var txt_apellido_pa = new Ext.form.TextField({
        id          :'idtxt_apellido_pa',
        fieldLabel  :'Apellido Paterno',
        disabled    :false,
        name        :'idtxt_apellido_pa',
        allowBlank  :false,
        anchor      :'92%',
        emptyText   :'Ingrese solo texto...',
        maskRe      : /[A-Za-z ]/,
        validator: function(v) {        
            return /[A-Za-z][. -]{0}/.test(v)? true : 'Solo puede ingresar texto';
        }
    });

    var txt_apellido_ma = new Ext.form.TextField({
        id          :'idtxt_apellido_ma',
        fieldLabel  :'Apellido Materno',
        disabled    :false,
        name        :'idtxt_apellido_ma',
        allowBlank  :false,
        anchor      :'92%',
        emptyText   :'Ingrese solo texto...',
        maskRe      : /[A-Za-z ]/,
        validator: function(v) {
            return /[A-Za-z][. -]{0}/.test(v)? true : 'Solo puede ingresar texto';
        }
    });

    var txt_nombres = new Ext.form.TextField({
        id          :'idtxt_nombres',
        fieldLabel  :'Nombres',
        disabled    :false,
        name        :'idtxt_nombres',
        allowBlank  :false,
        anchor      :'93%',
        emptyText   :'Ingrese solo texto...',
        maskRe      : /[A-Za-z ]/,
        validator: function(v) {
            return /[A-Za-z][. -]{0}/.test(v)? true : 'Solo puede ingresar texto';
        }
    });

    var txt_num_doc = new Ext.form.NumberField({
        id : 'idtxt_num_doc',
        name        :'idtxt_num_doc',
        fieldLabel: 'N&uacute;m. Documento',
        decimalPrecision : 0,
        allowNegative: false,
        allowBlank  :false,
        emptyText   :'Ingrese solo numeros...',
        anchor:'90%'
    });

    var txt_telef_fijo = new Ext.form.TextField({
        id          :'idtxt_telef_fijo',
        fieldLabel  :'Tel&eacute;fono Fijo',
        disabled    :false,
        name        :'idtxt_telef_fijo',
        anchor      :'90%',
        maskRe      : /[0-9. -]/,
        validator: function(v) {
            return /[0-9 -]/.test(v)? true : 'Solo puede ingresar numeros';
        }
    });

    var txt_telef_movil = new Ext.form.TextField({
        id          :'idtxt_telef_movil',
        fieldLabel  :'Tel&eacute;fono Celular',
        disabled    :false,
        name        :'idtxt_telef_movil',
        anchor      :'90%',
        maskRe      : /[0-9. -]/,
        validator: function(v) {
            return /[0-9 -]/.test(v)? true : 'Solo puede ingresar numeros';
        }
    });

    var txt_email = new Ext.form.TextField({
        id          :'idtxt_email',
        fieldLabel  :'Correo Electr&oacute;nico',
        disabled    :false,
        name        :'idtxt_email',
        anchor      :'90%',
        vtype       :'email',
        emptyText   :'usuario@dominio.com'
    });

    var txt_profesion = new Ext.form.TextField({
        id          :'idtxt_profesion',
        fieldLabel  :'Profesi&oacute;n',
        disabled    :false,
        name        :'idtxt_profesion',
        anchor      :'95%'
    });

    var txt_empresa = new Ext.form.TextField({
        id          :'idtxt_empresa',
        fieldLabel  :'Empresa',
        disabled    :false,
        name        :'idtxt_empresa',
        anchor      :'95%'
    });

    var txt_cargo = new Ext.form.TextField({
        id          :'idtxt_cargo',
        fieldLabel  :'Cargo',
        disabled    :false,
        name        :'idtxt_cargo',
        anchor      :'100%'
    });

    var txt_direccion_inst_postal = new Ext.form.TextField({
        id          :'idtxt_direccion_inst_postal',
        fieldLabel  :'Direcci&oacute;n',
        disabled    :false,
        name        :'idtxt_direccion_inst_postal',
        anchor      :'90%',
        allowBlank  :false
    });

    var txt_num_inst_postal = new Ext.form.NumberField({
        id : 'idtxt_num_inst_postal',
        name        :'idtxt_num_inst_postal',
        fieldLabel: 'N&uacute;mero',
        decimalPrecision : 0,
        allowNegative: false,
        allowBlank  :false,
        emptyText   :'Ingrese solo numeros...',
        anchor:'90%'
    });

    var txt_mza_inst_postal = new Ext.form.TextField({
        id          :'idtxt_mza_inst_postal',
        fieldLabel  :'Mza/Lte',
        disabled    :false,
        name        :'idtxt_mza_inst_postal',
        anchor      :'90%',
        allowBlank  :true
    });



    //*******************************************************************************************************//
    //DATA STORE'S
    //*******************************************************************************************************//  

	var dbZonal=new Ext.data.Store({			// Data de Departamentos - Instalacion
		proxy: new Ext.data.HttpProxy({
            url: "php_procesos/p_data_combos.php"
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
            url: "php_procesos/p_data_combos.php"
        }),
		reader: new Ext.data.JsonReader({root: 'ciudades'},
            [{name    :'id_ciudad',mapping :'id_ciudad'},
             {name    :'desc_ciudad',mapping :'desc_ciudad' }
        ]),
        autoLoad:false
	});

	var dbDistrito=new Ext.data.Store({			// Data de Ciudades - Instalacion
		proxy: new Ext.data.HttpProxy({
            url: "php_procesos/p_data_combos.php"
        }),
		reader: new Ext.data.JsonReader({root: 'distritos'},
            [{name    :'id_distrito',mapping :'id_distrito'},
             {name    :'desc_distrito',mapping :'desc_distrito' }
        ]),
        autoLoad:false
	});

    //*******************************************************************************************************//
    //COMBO BOX'S
    //*******************************************************************************************************//

    var cbo_Distrito_postal = new Ext.form.ComboBox({
        fieldLabel	:'Distrito',
        id			:'idcbo_distrito_postal',
        store       :dbDistrito,
        displayField:'desc_distrito',
		valueField	:'id_distrito',
		hiddenName	:'id_distrito',
        typeAhead   :true,
        mode        :'remote',
        forceSelection: true,
        readOnly    :true,
        allowBlank	:false,
        triggerAction: 'all',
        emptyText   :'Seleccione Distrito...',
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
        mode        :'remote',
        forceSelection: true,
        readOnly    :true,
        allowBlank	:false,
        triggerAction: 'all',
        emptyText   :'Seleccione Ciudad...',
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

    //*******************************************************************************************************//
    //FORMULARIO
    //*******************************************************************************************************//

    Ext.form.Field.prototype.msgTarget = 'side';
    var formulario = new Ext.FormPanel({
        bodyStyle: 'padding:0 10px 0;',
        width: 750,
        renderTo:'form-ct',
        frame:true,
        items: [{
            xtype:'fieldset',
            labelAlign: 'top',
            title: 'Datos de Cliente',
            autoHeight: true,
            items: [{
                layout:'column',
                border:false,
                items:[{
                    columnWidth:.30,
                    layout: 'form',
                    border:false,
                    items: [txt_apellido_pa]
                },{
                    columnWidth:.30,
                    layout: 'form',
                    border:false,
                    items: [txt_apellido_ma]
                },{
                    columnWidth:.35,
                    layout: 'form',
                    border:false,
                    items: [txt_nombres]
                }]
            },{
                layout:'column',
                border:false,
                items:[{
                    columnWidth:.30,
                    layout: 'form',
                    bodyStyle: 'padding-right:5px;',
                    border:false,
                    items: [{
                        xtype: 'radiogroup',
                        fieldLabel: 'Tipo de Documento',
                        allowBlank  :false,
                        anchor: '91%',
                        items: [
                            {boxLabel: 'DNI', name: 'rb-tdoc', inputValue: 1},
                            {boxLabel: 'RUC', name: 'rb-tdoc', inputValue: 2}
                        ]
                    }]
                },{
                    columnWidth:.30,
                    layout: 'form',
                    border:false,
                    items: [txt_num_doc]
                }]
            },{
                layout:'column',
                border:false,
                items:[{
                    columnWidth:.30,
                    layout: 'form',
                    border:false,
                    items: [txt_telef_fijo]
                },{
                    columnWidth:.30,
                    layout: 'form',
                    border:false,
                    items: [txt_telef_movil]
                },{
                    columnWidth:.40,
                    layout: 'form',
                    border:false,
                    items: [txt_email]
                }]
            },{
                layout:'column',
                border:false,
                items:[{
                    columnWidth:.60,
                    layout: 'form',
                    bodyStyle: 'padding-right:5px;',
                    border:false,
                    items: [{
                        xtype: 'radiogroup',
                        fieldLabel: 'Tipo de Vivienda',
                        allowBlank  :false,
                        anchor: '90%',
                        items: [
                            {boxLabel: 'Propia', name: 'rb-tvivienda', inputValue: 1},
                            {boxLabel: 'Familiar', name: 'rb-tvivienda', inputValue: 2},
                            {boxLabel: 'Alquilada', name: 'rb-tvivienda', inputValue: 3},
                            {boxLabel: 'Multifamiliar', name: 'rb-tvivienda', inputValue: 4}
                        ]
                    }]
                },{
                    columnWidth:.30,
                    layout: 'form',
                    border:false,
                    bodyStyle: 'padding-right:5px;',
                    items: [{
                        xtype: 'radiogroup',
                        fieldLabel: 'Sexo',
                        allowBlank  :false,
                        anchor: '90%',
                        items: [
                            {boxLabel: 'M', name: 'rb-tsexo', inputValue: 'M'},
                            {boxLabel: 'F', name: 'rb-tsexo', inputValue: 'F'}
                        ]
                    }]
                }]
            },{
                layout:'column',
                border:false,
                items:[{
                    columnWidth:.30,
                    layout: 'form',
                    border:false,
                    items: [txt_profesion]
                },{
                    columnWidth:.30,
                    layout: 'form',
                    border:false,
                    items: [txt_empresa]
                },{
                    columnWidth:.35,
                    layout: 'form',
                    border:false,
                    items: [txt_cargo]
                }]
            },{
                layout:'column',
                border:false,
                items:[{
                    columnWidth:.48,
                    layout: 'form',
                    bodyStyle: 'padding-right:5px;',
                    border:false,
                    items: [{
                        xtype: 'radiogroup',
                        fieldLabel: 'Relaci&oacute;n Laboral',
                        allowBlank  :false,
                        anchor: '90%',
                        items: [
                            {boxLabel: 'Dependiente', name: 'rb-trlaboral', inputValue: 1},
                            {boxLabel: 'Independiente', name: 'rb-trlaboral', inputValue: 2}
                        ]
                    }]
                },{
                    columnWidth:.48,
                    layout: 'form',
                    bodyStyle: 'padding-right:5px;',
                    border:false,
                    items: [{
                        xtype: 'radiogroup',
                        fieldLabel: 'Estado Civil',
                        allowBlank  :false,
                        anchor: '90%',
                        items: [
                            {boxLabel: 'Soltero', name: 'rb-testadocivil', inputValue: 1},
                            {boxLabel: 'Casado', name: 'rb-testadocivil', inputValue: 2}
                        ]
                    }]
                }]
            }]
        },{
            xtype:'fieldset',
            labelAlign: 'top',
            title: 'Direci&oacute;n',
            autoHeight: true,
            items: [{
                layout:'column',
                border:false,
                items:[{
                            columnWidth:.30,
                            layout: 'form',
                            border:false,
                            items: [cbo_Zonal_postal]
                        },{
                            columnWidth:.30,
                            layout: 'form',
                            border:false,
                            items: [cbo_Ciudad_postal]
                        },{
                            columnWidth:.35,
                            layout: 'form',
                            border:false,
                            items: [cbo_Distrito_postal]
                    }]
            },{
                layout:'column',
                border:false,
                items:[{
                            columnWidth:.30,
                            layout: 'form',
                            border:false,
                            items: [txt_direccion_inst_postal]
                        },{
                            columnWidth:.30,
                            layout: 'form',
                            border:false,
                            items: [txt_num_inst_postal]
                        },{
                            columnWidth:.35,
                            layout: 'form',
                            border:false,
                            items: [txt_mza_inst_postal]
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
                                        url: 'php_procesos/p_graba_registro_cliente.php',
                                        method: 'POST',
                                        params: {
                                            action: 'nuevo',
                                            iduser: Ext.getDom('iduser').value
                                        },
                                        waitTitle: 'Conectando',
                                        waitMsg: 'Guardando datos...',
                                        success: function(form, action){
                                            Ext.MessageBox.alert('Mensaje', 'Los datos han sido grabados.');
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
            width       :850,
            height      :620,
            minWidth    :750,
            minHeight   :450,
            layout      :'fit',
            plain       :true,
            y           :180,
            bodyStyle   :'padding:5px;',
            items       :formulario

        });
        ventana.show();




});
