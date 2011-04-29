Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

Ext.onReady(function(){
	var visible=true;
	var formulario;
	var Ventana_modal;
	var data;
	var selectedRow;
	var st1;
	var txtCodVendedor,txtApPaterno,txtApMaterno,txtNombre,txtDni,txtFecNacimiento,txtFecIngreso,txtDireccion,txtFonoCelular,txtFonoCelular1,txtFonoFijo,chkEstado;

    var perfil		=Ext.getDom('perfil').value;
	var idusuario	=Ext.getDom('idusuario').value;
	
	if (perfil==2) visible=false;
	
	var txtBuscado = new Ext.form.TextField({
		emptyText 	:'Buscar Vendedor...',
        id			:'v1',
        width		:300,
        allowBlank	:false,
		fieldLabel	:'Buscar Vendedor'
    });
	
	var btnbuscar = new Ext.Button({
        text	:'Consultar',
        id		:'btn1',
        width	:150,
        handler	:Buscar,
		iconCls	:'search'
	});

	var btnAgregar = new Ext.Button({
        text	:'Nuevo',
        id		:'btn2',
        width	:150,
        handler	:nuevo_vendedor,
		iconCls	:'agregar_item'
	});	

	var btnBorrar = new Ext.Button({
        text	:'Eliminar',
        id		:'btn3',
        width	:150,
        handler	:handleDelete,
		iconCls	:'eliminar_item'
	});		
	
	var btnActualizar = new Ext.Button({
        text	:'Modificar',
        id		:'btn4',
        width	:150,
        handler	:actualizar_vendedor,
		iconCls	:'update_item'
	});		
	
	var btn_xls = new Ext.Button({
        text	:'Exportar XLS',
        id		:'btn5',
        width	:150,
        handler	:exportar_xls,
		iconCls	:'excel'
	});

   


         /*********** componentes del formulario *******************/



	    Ext.namespace('Ext.exampledata');

		Ext.exampledata.states = [
				['0','Inactivo'],
				['1','Activo']
			];

		txtCodVendedor = new Ext.form.TextField({
			emptyText 	:'Ingrese Codigo Vendedor...',
        	id			:'txt1',
        	name		:'ntxt1',
        	width		:100,
        	labelAlign	:'right',
        	labelWidth	:100,
        	allowBlank	:false,
			fieldLabel	:'Cod. Vendedor',
			minLengthText:'El texto debe tener como minimo 3 caracteres',
			maxLengthText:'El texto debe tener como maximo 30 caracteres'
    	});

        txtApPaterno = new Ext.form.TextField({
			emptyText 	:'Ingrese Apellido Paterno...',
        	id			:'txt2',
        	name		:'ntxt2',
        	width		:300,
        	labelAlign	:'right',
        	labelWidth	:100,
        	allowBlank	:false,
			fieldLabel	:'Apellido Paterno'
    	});
        
        txtApMaterno = new Ext.form.TextField({
			emptyText 	:'Ingrese Apellido Materno...',
        	id			:'txt3',
        	name		:'ntxt3',
        	width		:300,
        	labelAlign	:'right',
        	labelWidth	:100,
        	allowBlank	:false,
			fieldLabel	:'Apellido Materno'
    	});

        txtNombre = new Ext.form.TextField({
			emptyText 	:'Ingrese Nombre...',
        	id			:'txt4',
        	name		:'ntxt4',
        	width		:300,
        	labelAlign	:'right',
        	labelWidth	:100,
        	allowBlank	:false,
			fieldLabel	:'Nombres'
    	});

        txtDni = new Ext.form.NumberField({
			emptyText 	:'Ingrese Dni...',
        	id			:'txt5',
        	name		:'ntxt5',
        	width		:100,
        	labelAlign	:'right',
        	labelWidth	:100,
        	allowBlank	:false,
			fieldLabel	:'DNI'
    	});

        txtDireccion = new Ext.form.TextField({
			emptyText 	:'Ingrese Direccion...',
        	id			:'txt6',
        	name		:'ntxt6',
        	width		:300,
        	labelAlign	:'right',
        	labelWidth	:100,
        	allowBlank	:false,
			fieldLabel	:'Direccion'
    	});

        txtFonoCelular = new Ext.form.NumberField({
			emptyText 	:'Ingrese Telefono Celular...',
        	id			:'txt7',
        	name		:'ntxt7',
        	width		:100,
        	labelAlign	:'right',
        	labelWidth	:100,
        	allowBlank	:false,
			fieldLabel	:'Celular 1'
    	});

        txtFonoCelular1 = new Ext.form.NumberField({
			emptyText 	:'Ingrese Telefono Celular...',
        	id			:'txt8',
        	name		:'ntxt8',
        	width		:100,
        	labelAlign	:'right',
        	labelWidth	:100,
        	allowBlank	:false,
			fieldLabel	:'Celular 2'
    	});

        txtFonoFijo = new Ext.form.NumberField({
			emptyText 	:'Ingrese Telefono Fijo...',
        	id			:'txt9',
        	name		:'ntxt9',
        	width		:100,
        	labelAlign	:'right',
        	labelWidth	:100,
        	allowBlank	:false,
			fieldLabel	:'Fijo'
    	});

        txtFecNacimiento = new Ext.form.DateField({
        	id			:'txt10',
        	name		:'ntxt10',
        	width		:100,
        	labelAlign	:'right',
        	labelWidth	:100,
            format      :'Y-m-d',
        	allowBlank	:false,
			fieldLabel	:'Fecha Nacimiento'
    	});

        txtFecIngreso = new Ext.form.DateField({
			id			:'txt11',
        	name		:'ntxt11',
        	width		:100,
        	labelAlign	:'right',
        	labelWidth	:100,
            format      :'Y-m-d',
        	allowBlank	:false,
			fieldLabel	:'Fecha Ingreso'
    	});

        
        chkEstado = new Ext.form.Checkbox({
                    
                    id			:'txt12',
                    name		:'ntxt12',
                    checked     : true,
                    boxLabel    : 'Estado',
                    fieldLabel	:'Estado',
                    inputValue :'1'
                });
        

        
       
        var btnGraba_nuevo = new Ext.Button({
            text	:'Grabar',
            id		:'btn4',
            width	:150,
            handler : function(){

                    if(formulario.getForm().isValid()){

                        Ext.Msg.show({
                            title:'CONFIRMACION',
                            msg: 'Realmente desea grabar los datos?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn,text){
                                if(btn=='yes'){
                                    formulario.form.submit({
                                        url: 'php_admin/p_admin_vendedor.php',
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
                                            recargar_grid();
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

                    }

            }

		});

		var btnCancelar = new Ext.Button({
            text	:'Cancelar',
            id		:'btn5',
            width	:150,
            handler	:cancelar
		});
        /********************************************************/

		formulario = new Ext.FormPanel({
            id          :'frm_inst',
	        frame		:true,
	        labelAlign	:'right',
	        labelWidth	:90,
	        autoWidth	:true,
	        waitMsgTarget:true,
	        items		:[
            {
            	layout	:'column',
            	border	:false,
	        	items	:[{
                	columnWidth:1.0,
                	layout: 'form',
                	border:false,
                	items: [txtCodVendedor]
	        	}]
	        },
            {
            	layout	:'column',
            	border	:false,
	        	items	:[{
                	columnWidth:1.0,
                	layout: 'form',
                	border:false,
                	items: [txtApPaterno]
	        	}]
	        },
            {
            	layout	:'column',
            	border	:false,
	        	items	:[{
                	columnWidth:1.0,
                	layout: 'form',
                	border:false,
                	items: [txtApMaterno]
	        	}]
	        },
            {
            	layout	:'column',
            	border	:false,
	        	items	:[{
                	columnWidth:1.0,
                	layout: 'form',
                	border:false,
                	items: [txtNombre]
	        	}]
	        },
            {
            	layout	:'column',
            	border	:false,
	        	items	:[{
                	columnWidth:1.0,
                	layout: 'form',
                	border:false,
                	items: [txtDireccion]
	        	}]
	        },
            {
            	layout	:'column',
            	border	:false,
	        	items	:[{
                	columnWidth:0.5,
                	layout: 'form',
                	border:false,
                	items: [txtDni]
	        	},
                {
                	columnWidth:0.5,
                	layout: 'form',
                	border:false,
                	items: [txtFonoCelular]
	        	}
                ]
	        },
            {
            	layout	:'column',
            	border	:false,
	        	items	:[{
                	columnWidth:0.5,
                	layout: 'form',
                	border:false,
                	items: [txtFonoCelular1]
	        	},
                {
                	columnWidth:0.5,
                	layout: 'form',
                	border:false,
                	items: [txtFonoFijo]
	        	}
                ]
	        },
            {
            	layout	:'column',
            	border	:false,
	        	items	:[{
                	columnWidth:0.5,
                	layout: 'form',
                	border:false,
                	items: [txtFecNacimiento]
	        	},
                {
                	columnWidth:0.5,
                	layout: 'form',
                	border:false,
                	items: [txtFecIngreso]
	        	}
                ]                
	        },
            {
            	layout	:'column',
            	border	:false,
	        	items	:[{
                	columnWidth:1.0,
                	layout: 'form',
                	border:false,
                	items: [chkEstado]
	        	}]
	        }
            ,
            {
            	layout	:'column',
            	border	:false,
	        	items	:[{
	                columnWidth:.20,
	                layout	:'form',
	                border	:false,
	                html	:'&nbsp;'
	        	},{
	                columnWidth:.20,
	                layout	:'form',
	                border	:false,
	                items	:btnGraba_nuevo
	        	},{
	                columnWidth:.25,
	                layout	:'form',
	                border	:false,
	                html	:'&nbsp;'
	        	},{
	                columnWidth:.20,
	                layout	:'form',
	                border	:false,
	                items	:btnCancelar
	        	},{
	                columnWidth:.20,
	                layout	:'form',
	                border	:false,
	                html	:'&nbsp;'
	        	}]
	        }]



	    });

        function llama_formulario(titulo,accion){
            Ventana_modal.show();

        }

        function nuevo_vendedor(){
            llama_formulario('NUEVO VENDEDOR','nuevo');
            //Ventana_modal.show();
        }

         /****************************************************************************************************************/
        /*  ACTUALIZAR SERVICIO */
        /****************************************************************************************************************/

        function actualizar_vendedor(){
            var selectedKeys = grid.selModel.selections.keys;
            if(selectedKeys.length > 0) {

                //Ext.Msg.alert('Aviso','Entro');
                //llama_formulario('ACTUALIZAR SERVICIO','actualizar');
                //Ventana_modal.show();
                muestra_datos();
            }else{
                Ext.Msg.alert('Aviso','Seleccione un registro para modificar');
            }

        }

         
    	

        function exportar_xls(){
            var login		=Ext.getDom('usuario').value;
            var idusuario	=Ext.getDom('idusuario').value;
            document.location='php_admin/exp_vendedor.php?usuario='+login+'&idusuario='+idusuario;
        }

       



        /****************************************************************************************************************/
        /*  BORRAR CLIENTE */
        /****************************************************************************************************************/

        function handleDelete(){
            var selectedKeys = grid.selModel.selections.keys;
            if(selectedKeys.length > 0) {
                Ext.Msg.confirm('ALERTA!','Realmente desea eliminar el registro?', deleteRecord);
            }else{
                Ext.Msg.alert('Aviso','Seleccione un registro para eliminar');
            }

        }

        function deleteRecord(btn) {
            if (btn == 'yes') {
                var selectedRow	=grid.getSelectionModel().getSelected();
                var fieldName 	=grid.getColumnModel().getDataIndex(0);

                var id_vendedor	=selectedRow.get(grid.getColumnModel().getDataIndex(0));

                Ext.Ajax.request({
                    url: 'php_admin/p_admin_vendedor.php',
                    params: {
                        action		:'borrar',
                        id_vendedor	:id_vendedor,
                        idusuario	:idusuario
                    },
                     success: function(form, action){
                          Ext.MessageBox.alert('Mensaje', 'Los datos han sido grabados.');
                          formulario.getForm().reset();
                          recargar_grid();
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

            }
        };


        /****************************************************************************************************************/
        /*  VENTANA PARA AGREGAR NUEVO CLIENTE */
        /****************************************************************************************************************/
    
        

        function muestra_datos(){
                selectedRow	= grid.getSelectionModel().getSelected();

                //var m_idservicio    =selectedRow.get(grid.getColumnModel().getDataIndex(0));
                //alert(m_idservicio);
                var m_vendedor      =selectedRow.get(grid.getColumnModel().getDataIndex(1));
                //alert(m_servicio);
                //var m_descservicio  =selectedRow.get(grid.getColumnModel().getDataIndex(2));
                //var m_precio        =selectedRow.get(grid.getColumnModel().getDataIndex(3));
                //var m_estado    	=selectedRow.get(grid.getColumnModel().getDataIndex(4));
                //var m_moneda    	=selectedRow.get(grid.getColumnModel().getDataIndex(5));
                //var m_tiposervicio    	=selectedRow.get(grid.getColumnModel().getDataIndex(6));

                llama_formulario('MODIFICA VENDEDOR','modifica');
                //alert("test");
                //Ventana_modal.show();

                
                txtVendedor.value           =m_material;
                //txtDescripcion.value		=m_descservicio;
                //txtPrecio.value         	=m_precio;
                //txtEstado.value         	=m_estado;
                //optTiposervicio.value       =m_tiposervicio;
                //optMoneda.value             =m_moneda;
                Ventana_modal.show();

        }

     function graba_nuevo(){
        /*
        var j_material         =Ext.getCmp("txt1").getValue();
    	var j_descmodelo     =Ext.getCmp("txt2").getValue();
    	var j_estado        =Ext.getCmp("txt3").getValue();
        var j_estado        =Ext.getCmp("txt4").getValue();
        var j_estado        =Ext.getCmp("txt5").getValue();
        var j_estado        =Ext.getCmp("txt6").getValue();
        var j_estado        =Ext.getCmp("txt7").getValue();
        var j_estado        =Ext.getCmp("txt").getValue();

        var txtMaterial,txtPrecio,txtCantidad,txtUnidad,txtEstandar,txtAdicional,txtOtro,chkEstado;
        

        Ext.Ajax.request({
        	url: 'php_admin/p_admin_modelo.php',
            params: {
                tarea	:'nuevo',
                modelo       :j_modelo,
                descripcion	:j_descmodelo,
                estado      :j_estado,
                idusuario   :idusuario
            },
            failure:function(response,options){
	            Ext.MessageBox.alert('Error','Problema ingresando datos');
            },
            success:function(response,options){
            	var respuesta=response.responseText;

                    Ext.getCmp("frm_inst").getForm().reset();
					Ventana_modal.hide();
					//Ventana_modal.destroy();
					Ext.MessageBox.alert('Aviso','Se agrego el nuevo Modelo');
					recargar_grid();
            }
		});
        */
    }

    function graba_modificacion(){
        /*
        var j_modelo         =Ext.getCmp("txt1").getValue();
    	var j_descmodelo     =Ext.getCmp("txt2").getValue();
    	var j_estado        =Ext.getCmp("txt3").getValue();
    	

    	var id_modelo	=selectedRow.get(grid.getColumnModel().getDataIndex(0));


        Ext.Ajax.request({
        	url: 'php_admin/p_admin_modelo.php',
            params: {
                tarea       :'modificar',
                modelo      :j_modelo,
                descripcion	:j_descmodelo,
                estado      :j_estado,
                id_modelo   :id_modelo
            },
            failure:function(response,options){
	            Ext.MessageBox.alert('Error','Problema ingresando datos');
            },
            success:function(response,options){
            	var respuesta=response.responseText;
					
                    Ext.getCmp("frm_inst").getForm().reset();
					Ventana_modal.hide();
					//Ventana_modal.destroy();
					Ext.MessageBox.alert('Aviso','Se modifico el Modelo seleccionado');
					recargar_grid();
                    
            }
        });
        */
    }


    function cancelar(){
    	
        Ext.getCmp("frm_inst").getForm().reset();
		Ventana_modal.hide();
    }
   

		Ventana_modal = new Ext.Window({
			title		:'Vendedor',
			width		:500,
			modal		:true,
			frame		:true,
			autoHeight	:650,
			minWidth	:400,
			minHeight	:150,
            closable    :false,
			plain		:true,
			y			:130,
			id			:'LoginWin1',
			bodyStyle	:'padding:5px;',
			items		:formulario
		}); 	

	
	var store1= new Ext.data.Store({
	    proxy: new Ext.data.HttpProxy({
	        url: 'php_admin/p_lista_vendedor.php?n=1'
	    }),
	    reader: new Ext.data.JsonReader({
	        root: 'lista',
	        id: 'resourceId',
	        totalProperty: 'total',	 	        
	        fields: [
		            {name:'id_vendedor'},
		            {name:'cod_vendedor'},
                    {name:'ap_paterno'},
                    {name:'ap_materno'},
                    {name:'nombre'},
                    {name:'dni'},
                    {name:'fec_nacimiento'},
                    {name:'fec_ingreso'},
                    {name:'direccion'},
                    {name:'telefono_celular'},
                    {name:'telefono_celular_1'},
                    {name:'telefono_fijo'},
                    {name:'estado'}
	        ]
	
	    }),
		   
	    remoteSort: false,
	    sortInfo: {field: 'cod_vendedor', direction: 'DESC'}
	});
	
	store1.load(); 

	
	
	//view.startCollapsed=true;
	
	var grid = new Ext.grid.GridPanel({
	    height:400,
	    frame: true,
	    collapsible: true,
	    loadMask: true,
	    store: store1,
	    columns:[
		        { id:'id_vendedor',header: "id_vendedor",width: 100 ,sortable: false,groupable: false,dataIndex:'id_vendedor',hidden:true},
		        { header: "Cod.Vendedor",width: 150,sortable: true,dataIndex: 'cod_vendedor',align:'left'},
                { header: "Apellido Paterno",width: 150,sortable: true,dataIndex: 'ap_paterno',align:'left'},
                { header: "Apellido Materno",width: 150,sortable: true,dataIndex: 'ap_materno',align:'left'},
                { header: "Nombre",width: 150,sortable: true,dataIndex: 'nombre',align:'left'},
                { header: "Dni",width: 150,sortable: true,dataIndex: 'dni',align:'left'},
                { header: "Direccion",width: 150,sortable: true,dataIndex: 'direccion',align:'left'},
                { header: "Celular 1",width: 150,sortable: true,dataIndex: 'telefono_celular',align:'left'},
                { header: "Celular 2",width: 150,sortable: true,dataIndex: 'telefono_celular_1',align:'left'},
                { header: "Fijo",width: 150,sortable: true,dataIndex: 'telefono_fijo',align:'left'},
                { header: "Fec. Nacimiento",width: 150,sortable: true,dataIndex: 'fec_nacimiento',align:'left'},
                { header: "Fec. Ingreso",width: 150,sortable: true,dataIndex: 'fec_ingreso',align:'left'},
                { header: "Activo",width: 600,sortable: true,dataIndex: 'estado',align:'left'}
	    ],
        
	    sm: new Ext.grid.RowSelectionModel({
	        singleSelect:true
	    }),
	    tbar: [txtBuscado,'  ',btnbuscar,'  ',btnAgregar,'  ',btnActualizar,'  ',btnBorrar,'  ',btn_xls]   
	});	

	/****************************************************************************************************************/
	
	
	txtBuscado.on('change', Buscar);
	
	function Buscar(){
    	var buscar=Ext.get("v1").getValue();
		if(txtBuscado.validate()==true){
	    	store1.proxy= new Ext.data.HttpProxy({url: 'php_admin/p_lista_vendedor.php?n=2&buscar='+buscar});
	    	store1.load();
	    	Ext.get("v1").focus();
	    	//view.startCollapsed=false;
    	}else if(buscar.length<1){
			recargar_grid();
    	}
    }	
   
   
   

	function recargar_grid(){
	   	store1.proxy= new Ext.data.HttpProxy({url: 'php_admin/p_lista_vendedor.php?n=1'});
	  	store1.load();    		
        //Ext.get("v1").focus();
		//view.startCollapsed=true;
	}
   
	
	var panel = new Ext.Panel({
	    id:'images-view',
	    frame:false,
	    width:1000,
	    autoHeight:true,
	    collapsible:false,
        layout:'fit',
	    items: grid
	});	    
    
			
	var Ventana = new Ext.Window({
		title: 'MANTENIMIENTO DE VENDEDORES',
		width: 1000,
		autoHeight:450,
		//minWidth: 300,
		//minHeight: 150,
        closable:false,
		layout: 'fit',
		plain:true,
		y:130,
		id: 'LoginWin2',
		bodyStyle:'padding:5px;',
		items: panel
	}); 	

	Ventana.show();

});