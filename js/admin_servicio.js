Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

Ext.onReady(function(){
	var visible=true;
	var formulario;
	var Ventana_modal;
	var data;
	var selectedRow;
	var st1;
	var txtServicio,txtDescripcion,txtPrecio,chkTipoServicio;
	
	
	var perfil		=Ext.getDom('perfil').value;
	var idusuario	=Ext.getDom('idusuario').value;
	
	if (perfil==2) visible=false;
	
	var txtBuscado = new Ext.form.TextField({
		emptyText 	:'Buscar Servicio...',
        id			:'v1',
        width		:300,
        allowBlank	:false,
		fieldLabel	:'Buscar Servicio'
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
        handler	:nuevo_servicio,
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
        handler	:actualizar_servicio,
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

		txtServicio = new Ext.form.TextField({
			emptyText 	:'Ingrese servicio...',
        	id			:'txt1',
        	name		:'ntxt1',
        	width		:330,
        	labelAlign	:'right',
        	labelWidth	:100,
        	allowBlank	:false,
			fieldLabel	:'Servicio',
			minLengthText:'El texto debe tener como minimo 3 caracteres',
			maxLengthText:'El texto debe tener como maximo 30 caracteres'
    	});

		txtDescripcion = new Ext.form.TextField({
			emptyText 	:'Ingrese descripcion...',
        	id			:'txt2',
        	name		:'ntxt2',
        	width		:330,
        	allowBlank	:false,
			fieldLabel	:'Descripci&oacute;n'
    	});

		txtPrecio = new Ext.form.NumberField({
			emptyText 	:'Ingrese Precio...',
        	id			:'txt3',
        	name		:'ntxt3',
        	width		:100,
        	allowBlank	:false,
			fieldLabel	:'Precio'
    	});

		txtEstado = new Ext.form.TextField({
			emptyText 	:'Ingrese DNI...',
        	id			:'txt4',
        	name		:'ntxt4',
        	width		:100,
        	allowBlank	:true,
			fieldLabel	:'DNI'
    	});

         // combo tipo servicio
            var store_tiposervicio = new Ext.data.Store({
                proxy: new Ext.data.HttpProxy({
                                url: "php_admin/p_lista_servicio.php"
                            }),
                            baseParams:{
                                n:4
                            },
                            reader: new Ext.data.JsonReader({root: 'lst_tiposervicio'},
                                [{name    :'id_tiposervicio',mapping :'id_tiposervicio'},
                                 {name    :'nom_tiposervicio',mapping :'nom_tiposervicio'}
                            ]),
                            autoLoad:true
            });

            var combo_tiposervicio = new Ext.form.ComboBox({
                store: store_tiposervicio,
                id:'cb_tiposervicio',
                valueField	:'id_tiposervicio',
                displayField:'nom_tiposervicio',
                hiddenName:'nom_tiposervicio',
                fieldLabel: 'Tipo Servicio',
                //name :'id_tiposervicio',
                typeAhead: true,
                mode: 'local',
                triggerAction: 'all',
                emptyText:'Selecciona Tipo Servicio...',
                selectOnFocus:true
            });

            // combo moneda
            var store_moneda = new Ext.data.Store({
                proxy: new Ext.data.HttpProxy({
                                url: "php_admin/p_lista_servicio.php"
                            }),
                            baseParams:{
                                n:5
                            },
                            reader: new Ext.data.JsonReader({root: 'lst_moneda'},
                                [{name    :'id_moneda',mapping :'id_moneda'},
                                 {name    :'nom_moneda',mapping :'nom_moneda'}
                            ]),
                            autoLoad:true
            });

            var combo_moneda = new Ext.form.ComboBox({
                store: store_moneda,
                id:'cb_moneda',
                //name :'id_moneda',
                valueField	:'id_moneda',
                displayField:'nom_moneda',
                hiddenName:'nom_moneda',
                fieldLabel: 'Tipo Moneda',
                typeAhead: true,
                mode: 'local',
                triggerAction: 'all',
                emptyText:'Selecciona Moneda...',
                selectOnFocus:true
            });

        
       
        var btnGraba_nuevo = new Ext.Button({
            text	:'Grabar',
            id		:'btn4',
            width	:150,
            /*handler	:function(){
            	if(accion=='nuevo'){
            		graba_nuevo();
            	}else{
            		graba_modificacion();
            	}
            }*/
            //handler	:graba_nuevo()
            handler : function(){

                    if(formulario.getForm().isValid()){

                        Ext.Msg.show({
                            title:'CONFIRMACION',
                            msg: 'Realmente desea grabar los datos?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn,text){
                                if(btn=='yes'){
                                    formulario.form.submit({
                                        url: 'php_admin/p_admin_servicio.php',
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
	        items		:[{
            	layout	:'column',
            	border	:false,
	        	items	:[{
                	columnWidth:1.0,
                	layout: 'form',
                	border:false,
                	items: [txtServicio]
	        	}]
	        },
            {
            	layout	:'column',
            	border	:false,
	        	items	:[{
                	columnWidth:1.0,
                	layout: 'form',
                	border:false,
                	items: [txtDescripcion]
	        	}]
	        }
            ,{
	            layout:'column',
	            border:false,
	            items:[{
	            	    columnWidth:.50,
	        	        layout: 'form',
	    	            border:false,
		                items: [txtPrecio]
	            	}]
	        }
            ,{
	            layout:'column',
	            border:false,
	            items:[{
	            	    columnWidth:.99,
	        	        layout: 'form',
	    	            border:false,
		                items: [combo_moneda]
	            	}]
	        }
            ,{
	            layout:'column',
	            border:false,
	            items:[{
	            	    columnWidth:.99,
	        	        layout: 'form',
	    	            border:false,
		                items: [combo_tiposervicio]
	            	}]
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

        function nuevo_servicio(){
            llama_formulario('NUEVO SERVICIO','nuevo');
            //Ventana_modal.show();
        }

         /****************************************************************************************************************/
        /*  ACTUALIZAR SERVICIO */
        /****************************************************************************************************************/

        function actualizar_servicio(){
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
            document.location='php_admin/exp_servicio.php?usuario='+login+'&idusuario='+idusuario;
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

                var id_servicio	=selectedRow.get(grid.getColumnModel().getDataIndex(0));

                Ext.Ajax.request({
                    url: 'php_admin/p_admin_servicio.php',
                    params: {
                        action		:'borrar',
                        id_servicio	:id_servicio,
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
                var m_servicio      =selectedRow.get(grid.getColumnModel().getDataIndex(1));
                //alert(m_servicio);
                //var m_descservicio  =selectedRow.get(grid.getColumnModel().getDataIndex(2));
                //var m_precio        =selectedRow.get(grid.getColumnModel().getDataIndex(3));
                //var m_estado    	=selectedRow.get(grid.getColumnModel().getDataIndex(4));
                //var m_moneda    	=selectedRow.get(grid.getColumnModel().getDataIndex(5));
                //var m_tiposervicio    	=selectedRow.get(grid.getColumnModel().getDataIndex(6));

                llama_formulario('MODIFICA SERVICIO','modifica');
                alert("test");
                //Ventana_modal.show();

                
                txtServicio.value           =m_servicio;
                //txtDescripcion.value		=m_descservicio;
                //txtPrecio.value         	=m_precio;
                //txtEstado.value         	=m_estado;
                //optTiposervicio.value       =m_tiposervicio;
                //optMoneda.value             =m_moneda;
                Ventana_modal.show();

        }

     function graba_nuevo(){
    	var j_servicio      =Ext.getCmp("txt1").getValue();
    	var j_descripcion   =Ext.getCmp("txt2").getValue();
    	var j_precio        =Ext.getCmp("txt3").getValue();
    	var j_estado        =Ext.getCmp("txt4").getValue();
    	var j_moneda        =Ext.getCmp("cb_moneda").getValue();
        var j_tiposervicio	=Ext.getCmp("cb_tiposervicio").getValue();


        Ext.Ajax.request({
        	url: 'php_admin/p_admin_servicio.php',
            params: {
                tarea	:'nuevo',
                servicio	:j_servicio,
                descripcion	:j_descripcion,
                precio      :j_precio,
                moneda       :j_moneda,
                tiposervicio :j_tiposervicio,
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
					Ext.MessageBox.alert('Aviso','Se agrego el nuevo Servicio');
					recargar_grid();
            }
		});

    }

    function graba_modificacion(){

        var j_servicio      =Ext.getCmp("txt1").getValue();
    	var j_descripcion   =Ext.getCmp("txt2").getValue();
    	var j_precio        =Ext.getCmp("txt3").getValue();
    	var j_estado        =Ext.getCmp("txt4").getValue();
    	var j_moneda        =Ext.getCmp("cb_moneda").getValue();
        var j_tiposervicio	=Ext.getCmp("cb_tiposervicio").getValue();

    	var id_servicio	=selectedRow.get(grid.getColumnModel().getDataIndex(0));


        Ext.Ajax.request({
        	url: 'php_admin/p_admin_servicio.php',
            params: {
                tarea	:'modificar',
                servicio	:j_servicio,
                descripcion	:j_descripcion,
                precio      :j_precio,
                moneda       :j_moneda,
                tiposervicio :j_tiposervicio,
                estado      :j_estado,
                idusuario   :idusuario,
                id_servicio :id_servicio
            },
            failure:function(response,options){
	            Ext.MessageBox.alert('Error','Problema ingresando datos');
            },
            success:function(response,options){
            	var respuesta=response.responseText;
					
                    Ext.getCmp("frm_inst").getForm().reset();
					Ventana_modal.hide();
					//Ventana_modal.destroy();
					Ext.MessageBox.alert('Aviso','Se modifico el Servicio seleccionado');
					recargar_grid();
                    
            }
        });
    }


    function cancelar(){
    	/*try{
    		Ventana_modal.hide();
    	}catch(e){
    		//no hago nada
    	}*/
        Ext.getCmp("frm_inst").getForm().reset();
		Ventana_modal.hide();
    }
   

		Ventana_modal = new Ext.Window({
			title		:'Servicio',
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
	        url: 'php_admin/p_lista_servicio.php?n=1'
	    }),
	    reader: new Ext.data.JsonReader({
	        root: 'lista',
	        id: 'resourceId',
	        totalProperty: 'total',	 	        
	        fields: [
		            {name:'id_servicio'},
		            {name:'nom_servicio'},
		            {name:'precio_unitario'},
		            {name:'desc_servicio'},
		            {name:'sva'},
                    {name:'estado'},
                    {name:'nom_moneda'},
                    {name:'nom_tiposervicio'}
	        ]
	
	    }),
		   
	    remoteSort: false,
	    sortInfo: {field: 'nom_servicio', direction: 'DESC'}
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
		        { id:'id_servicio',header: "id_servicio",width: 100 ,sortable: false,groupable: false,dataIndex:'id_servicio',hidden:true},
		        { header: "Servicio",width: 150,sortable: true,dataIndex: 'nom_servicio',align:'left'},
                { header: "Descripcion Servicio",width: 600,sortable: true,dataIndex: 'desc_servicio',align:'left'},
                { header: "Tipo Servicio",width: 50,sortable: true,dataIndex: 'nom_tiposervicio',groupable:false},
                { header: "Moneda",width: 50,sortable: true,dataIndex: 'nom_moneda',groupable:false},
		        { header: "Precio Unitario",width: 50,sortable: true,dataIndex: 'precio_unitario',groupable:false},
                { header: "Estado",width: 50,sortable: true,dataIndex: 'estado',groupable:false},
                { header: "Sva",width: 50,sortable: true,dataIndex: 'sva',groupable:false,hidden:true}
                
                
		        
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
	    	store1.proxy= new Ext.data.HttpProxy({url: 'php_admin/p_lista_servicio.php?n=2&buscar='+buscar});
	    	store1.load();
	    	Ext.get("v1").focus();
	    	//view.startCollapsed=false;
    	}else if(buscar.length<1){
			recargar_grid();
    	}
    }	
   
   
   

	function recargar_grid(){
	   	store1.proxy= new Ext.data.HttpProxy({url: 'php_admin/p_lista_servicio.php?n=1'});
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
		title: 'MANTENIMIENTO DE SERVICIO',
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