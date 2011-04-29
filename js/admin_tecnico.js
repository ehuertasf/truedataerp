Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

Ext.onReady(function(){
	var visible=true;
	var formulario;
	var Ventana_modal;
	var data;
	var selectedRow;
	var st1;
	var txtCodTecnico,txtApPaterno,txtApMaterno,txtNombres,txtDni,txtFonoCelular,txtFonoFijo,chkEstado;



    var perfil		=Ext.getDom('perfil').value;
	var idusuario	=Ext.getDom('idusuario').value;
	
	if (perfil==2) visible=false;
	
	var txtBuscado = new Ext.form.TextField({
		emptyText 	:'Buscar Tecnico...',
        id			:'v1',
        width		:300,
        allowBlank	:false,
		fieldLabel	:'Buscar Tecnico'
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
        handler	:nuevo_tecnico,
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
        handler	:actualizar_tecnico,
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

		txtCodTecnico = new Ext.form.TextField({
			emptyText 	:'Ingrese Codigo Tecnico...',
        	id			:'txt1',
        	name		:'ntxt1',
        	width		:100,
        	labelAlign	:'right',
        	labelWidth	:100,
        	allowBlank	:false,
			fieldLabel	:'Cod. Tecnico',
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

        txtNombres = new Ext.form.TextField({
			emptyText 	:'Ingrese Nombres...',
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

      

        txtFonoCelular = new Ext.form.NumberField({
			emptyText 	:'Ingrese Telefono Celular...',
        	id			:'txt6',
        	name		:'ntxt6',
        	width		:100,
        	labelAlign	:'right',
        	labelWidth	:100,
        	allowBlank	:false,
			fieldLabel	:'Celular'
    	});

     

        txtFonoFijo = new Ext.form.NumberField({
			emptyText 	:'Ingrese Telefono Fijo...',
        	id			:'txt7',
        	name		:'ntxt7',
        	width		:100,
        	labelAlign	:'right',
        	labelWidth	:100,
        	allowBlank	:false,
			fieldLabel	:'Fijo'
    	});

       

        chkEstado = new Ext.form.Checkbox({
                    
                    id			:'txt8',
                    name		:'ntxt8',
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
                                        url: 'php_admin/p_admin_tecnico.php',
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
                	items: [txtCodTecnico]
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
                	items: [txtNombres]
	        	}]
	        },
           // //txtCodTecnico,txtApPaterno,txtApMaterno,txtNombres,txtDni,txtFonoCelular,txtFonoFijo,chkEstado;
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
                	items: [txtFonoFijo]
	        	},
                {
                	columnWidth:0.5,
                	layout: 'form',
                	border:false,
                	items: [chkEstado]
	        	}
                ]
	        },
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

        function nuevo_tecnico(){
            llama_formulario('NUEVO VENDEDOR','nuevo');
            //Ventana_modal.show();
        }

         /****************************************************************************************************************/
        /*  ACTUALIZAR SERVICIO */
        /****************************************************************************************************************/

        function actualizar_tecnico(){
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
            document.location='php_admin/exp_tecnico.php?usuario='+login+'&idusuario='+idusuario;
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

                var id_tecnico	=selectedRow.get(grid.getColumnModel().getDataIndex(0));

                Ext.Ajax.request({
                    url: 'php_admin/p_admin_tecnico.php',
                    params: {
                        action		:'borrar',
                        id_tecnico	:id_tecnico,
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
                var m_tecnico      =selectedRow.get(grid.getColumnModel().getDataIndex(1));
                //alert(m_servicio);
                //var m_descservicio  =selectedRow.get(grid.getColumnModel().getDataIndex(2));
                //var m_precio        =selectedRow.get(grid.getColumnModel().getDataIndex(3));
                //var m_estado    	=selectedRow.get(grid.getColumnModel().getDataIndex(4));
                //var m_moneda    	=selectedRow.get(grid.getColumnModel().getDataIndex(5));
                //var m_tiposervicio    	=selectedRow.get(grid.getColumnModel().getDataIndex(6));

                llama_formulario('MODIFICA TECNICO','modifica');
                //alert("test");
                //Ventana_modal.show();

                
                txtTecnico.value           =m_tecnico;
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
			title		:'Tecnico',
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
	        url: 'php_admin/p_lista_tecnico.php?n=1'
	    }),
	    reader: new Ext.data.JsonReader({
	        root: 'lista',
	        id: 'resourceId',
	        totalProperty: 'total',	 	        
	        fields: [
		            {name:'id_tecnico'},
		            {name:'cod_tecnico'},
                    {name:'ap_paterno'},
                    {name:'ap_materno'},
                    {name:'nombres'},
                    {name:'telefono_casa'},
                    {name:'telefono_celular'},
                    {name:'dni'},
                    {name:'estado'}
	        ]
	
	    }),
		   
	    remoteSort: false,
	    sortInfo: {field: 'cod_tecnico', direction: 'DESC'}
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
		        { id:'id_tecnico',header: "id_tecnico",width: 100 ,sortable: false,groupable: false,dataIndex:'id_tecnico',hidden:true},
		        { header: "Cod.Tecnico",width: 150,sortable: true,dataIndex: 'cod_tecnico',align:'left'},
                { header: "Apellido Paterno",width: 150,sortable: true,dataIndex: 'ap_paterno',align:'left'},
                { header: "Apellido Materno",width: 150,sortable: true,dataIndex: 'ap_materno',align:'left'},
                { header: "Nombre",width: 150,sortable: true,dataIndex: 'nombres',align:'left'},
                { header: "Telefono Casa",width: 150,sortable: true,dataIndex: 'telefono_casa',align:'left'},
                { header: "Telefono Celular",width: 150,sortable: true,dataIndex: 'telefono_celular',align:'left'},
                { header: "Dni",width: 150,sortable: true,dataIndex: 'dni',align:'left'},
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
	    	store1.proxy= new Ext.data.HttpProxy({url: 'php_admin/p_lista_tecnico.php?n=2&buscar='+buscar});
	    	store1.load();
	    	Ext.get("v1").focus();
	    	//view.startCollapsed=false;
    	}else if(buscar.length<1){
			recargar_grid();
    	}
    }	
   
   
   

	function recargar_grid(){
	   	store1.proxy= new Ext.data.HttpProxy({url: 'php_admin/p_lista_tecnico.php?n=1'});
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
		title: 'MANTENIMIENTO DE TECNICOS',
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