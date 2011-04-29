Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

Ext.onReady(function(){
	var visible=true;
	var formulario;
	var Ventana_modal;
	var data,st1,st2;
	var selectedRow;
	var txtNombre,txtDireccionI,txtDireccionII,txtLatitud,txtLongitud,txtFecInstalacion,txtSerie;
	var xcbo_modelo,xcbo_marca;
	
	var perfil		=Ext.getDom('perfil').value;
	var idusuario	=Ext.getDom('idusuario').value;
	
	if (perfil==2) visible=false;
	
	var txtBuscado = new Ext.form.TextField({
		emptyText 	:'Buscar Amplificador...',
        id			:'v1',
        width		:300,
        allowBlank	:false,
		fieldLabel	:'Buscar Amplificador'
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
        handler	:nuevo_producto,
		iconCls	:'agregar_item'
	});

    var btnActualizar = new Ext.Button({
        text	:'Modificar',
        id		:'btn4',
        width	:150,
        handler	:actualizar_producto,
		iconCls	:'update_item'
	});		

	var btnBorrar = new Ext.Button({
        text	:'Eliminar',
        id		:'btn3',
        width	:150,
        handler	:handleDelete,
		iconCls	:'eliminar_item'
	});		
	
	
	
	var btn_xls = new Ext.Button({
        text	:'Exportar XLS',
        id		:'btn5',
        width	:150,
        handler	:exportar_xls,
		iconCls	:'excel'
	});	

	function exportar_xls(){
		var login		=Ext.getDom('usuario').value;
		var idusuario	=Ext.getDom('idusuario').value;
		document.location='exp_amplificador.php?usuario='+login+'&idusuario='+idusuario;
	}	
	
	var store1= new Ext.data.GroupingStore({
	    proxy: new Ext.data.HttpProxy({
	        url: 'p_lista_amplificador.php?n=1'
	    }),
	    reader: new Ext.data.JsonReader({
	        root: 'lista',
	        id: 'resourceId',
	        totalProperty: 'total',	 	        
	        fields: [
		            {name:'id_amplificador'},
		            {name:'nom_amplificador'},
		            {name:'direccion'},
		            {name:'direccion_referencial'},
		            {name:'latitud'},
		            {name:'longitud'},
		            {name:'fec_instalacion'},
		            {name:'num_serie'},
		            {name:'id_modelo'},
		            {name:'id_marca'}
		            
	        ]
	
	    }),
		   
	    //groupField:'departamento',
	    remoteSort: false,
	    sortInfo: {field: 'nom_amplificador', direction: 'DESC'}
	});
	
	store1.load(); 

	var view = new Ext.grid.GroupingView({
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
	
	view.startCollapsed=true;
	
	var grid = new Ext.grid.GridPanel({
	    height:400,
	    frame: true,
	    collapsible: true,
	    loadMask: true,
	    store: store1,
	    view: view,
        //renderTo: 'test',
	    columns:[
		        { id:'id_amplificador',header: "id_amplificador",width: 100 ,sortable: false,groupable: false,dataIndex:'id_amplificador',hidden:true},
		        { header: "Nombre Amplificador",width: 80,sortable: true,dataIndex: 'nom_amplificador',align:'left'},
		        { header: "Direccion",width: 80,sortable: true,dataIndex: 'direccion',groupable:false},
		        { header: "Direccion Referencial",width: 80,sortable: true,dataIndex: 'direccion_referencial',groupable:false,hidden:true},
		        { header: "Latitud",width: 120,sortable: true,dataIndex:'latitud',groupable:false},
		        { header: "Longitud",width: 200,sortable: true,dataIndex: 'longitud',groupable:true,align:'left'},
		        { header: "Fecha Instalacion",width: 100,sortable: true,dataIndex:'fec_instalacion', align:'center',groupable:true},
		        { header: "Numero Serie",width: 60,sortable: true,dataIndex:'numero_serie', align:'center',groupable:true,hidden:true},
		        { header: "Modelo",width: 60,sortable: true,dataIndex: 'id_modelo',groupable:false,align:'center'},
		        { header: "Marca",width: 60,sortable: true,dataIndex: 'id_marca',groupable:false,align:'center',hidden:true}
		        
	    ],
	    sm: new Ext.grid.RowSelectionModel({
	        singleSelect:true
	    }),
	    tbar: [txtBuscado,'  ',btnbuscar,'  ',btnAgregar,'  ',btnActualizar,'  ',btnBorrar,'  ',btn_xls]   
	});	

	/****************************************************************************************************************/
	/*  ACTUALIZAR CLIENTE */
	/****************************************************************************************************************/	
	
	function actualizar_producto(){
		var selectedKeys = grid.selModel.selections.keys;
	    if(selectedKeys.length > 0) {
	    	muestra_datos();
		}else{
			Ext.Msg.alert('Aviso','Seleccione un registro para modificar');
		}
				
	}
	
	function muestra_datos(){
			selectedRow	= grid.getSelectionModel().getSelected();
			
			var m_nombre        =selectedRow.get(grid.getColumnModel().getDataIndex(1));
			var m_direccion		=selectedRow.get(grid.getColumnModel().getDataIndex(2));
			var m_direccion2	=selectedRow.get(grid.getColumnModel().getDataIndex(3));
			var m_latitud       =selectedRow.get(grid.getColumnModel().getDataIndex(4));
			var m_longitud      =selectedRow.get(grid.getColumnModel().getDataIndex(5));
			var m_fecinstalacion=selectedRow.get(grid.getColumnModel().getDataIndex(6));
			var m_serie     	=selectedRow.get(grid.getColumnModel().getDataIndex(7));
			var m_modelo        =selectedRow.get(grid.getColumnModel().getDataIndex(8));
			var m_marca         =selectedRow.get(grid.getColumnModel().getDataIndex(9));
		
								
			
			llama_formulario('MODIFICA AMPLIFICADOR','modifica');
			
			txtNombre.value			=m_nombre;
			txtDireccionI.value     =m_direccion;
			txtDireccionII.value	=m_direccion2;
			txtLatitud.value		=m_latitud;
			txtLongitud.value		=m_longitud;
			txtFecInstalacion.value	=m_fecinstalacion;
            txtSerie                =m_serie;
			xcbo_modelo.value       =m_modelo;
			xcbo_marca.value		=m_marca;

					
			Ventana_modal.show();
			
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
			var id_amplificador	=selectedRow.get(fieldName);
			
	        Ext.Ajax.request({
	        	url: 'p_admin_amplificador.php',
	            params: {
	                tarea		:'borrar',
					id_amplificador	:id_amplificador,
	                idusuario	:idusuario
	            },
	            failure:function(response,options){
		            Ext.MessageBox.alert('Error','Problema eliminando datos');
	            },
	            success:function(response,options){
	            	var respuesta=response.responseText;
	            	if(respuesta==1){
	            		if (selectedRow) store1.remove(selectedRow);
	            		Ext.Msg.alert('Confirmacion','El cliente ha sido eliminado');	
	            	}else if(respuesta==3){
	            		Ext.Msg.alert('ALERTA!','El cliente seleccionado no puede ser eliminado por tener movimientos asociados');	
	            	}else if(respuesta==4){
	            		Ext.Msg.alert('CUIDADO!','No se puede borrar este registro por ser usado en documentos internos');	
	            	}
	            }
			});   			
			
		}	
	};	
	

	/****************************************************************************************************************/
	/*  VENTANA PARA AGREGAR NUEVO CLIENTE */
	/****************************************************************************************************************/
	function nuevo_producto(){		
		llama_formulario('NUEVO AMPLIFICADOR','nuevo');
		Ventana_modal.show();			
	}
	
	function llama_formulario(titulo,accion){
		
		/*********** componentes del formulario *******************/
		
		xcbo_modelo=new Ext.data.JsonStore({		//	Data de modelos
			url		:"p_data_combos.php?n=6",
	 	   	root	:'modelo',
	       	fields: [
	           	{name:'id_modelo'},
	           	{name:'desc_modelo'}
	       	]
		});		
		
		xcbo_marca=new Ext.data.JsonStore({		//	Data de marca
			url		:"p_data_combos.php?n=7",
	 	   	root	:'marca',
	       	fields: [
	           	{name:'id_marca'},
	           	{name:'desc_marca'}
	       	]
		});		
		
	
	    Ext.namespace('Ext.exampledata');
	
		Ext.exampledata.states = [
				['0','Inactivo'],
				['1','Activo']
			];    
		    
		

		txtNombre = new Ext.form.TextField({
			emptyText 	:'Ingrese nombre...',
        	id			:'txt1',
        	name		:'ntxt1',
        	width		:330,
        	labelAlign	:'right',
        	labelWidth	:100,        	
        	allowBlank	:false,
			fieldLabel	:'Nombre',
			minLength	:3,
			maxLength 	:30,
			minLengthText:'El texto debe tener como minimo 3 caracteres',
			maxLengthText:'El texto debe tener como maximo 30 caracteres' 
    	}); 

		txtDireccionI = new Ext.form.TextField({
			emptyText 	:'Ingrese direccion...',
        	id			:'txt2',
        	name		:'ntxt2',
        	width		:330,
        	allowBlank	:false,
			fieldLabel	:'Direcci&oacute;n',
			minLength	:3,
			maxLength 	:10			
    	});     	
		
		txtDireccionII = new Ext.form.TextField({
			emptyText 	:'Ingrese Direcci&oacute;n Referencial...',
        	id			:'txt3',
        	name		:'ntxt3',
        	width		:330,
        	allowBlank	:false,
			fieldLabel	:'Direcci&oacute;n Referencial',
			minLength	:3,
			maxLength 	:10				
    	});    
    	
		txtLatitud = new Ext.form.TextField({
			emptyText 	:'Ingrese Latitud...',
        	id			:'txt4',
        	name		:'ntxt4',
        	width		:100,
        	allowBlank	:true,
			fieldLabel	:'Latitud'
    	});    
    	
		txtLongitud = new Ext.form.TextField({
			emptyText 	:'Ingrese Longitud...',
        	id			:'txt5',
        	name		:'ntxt5',
        	width		:100,
        	allowBlank	:false,
			fieldLabel	:'Longitud'
    	});  
    	
		txtFecInstalacion = new Ext.form.TextField({
			emptyText 	:'Ingrese Fecha de Instalaci&oacute;n...',
        	id			:'txt6',
        	name		:'ntxt6',
        	width		:100,
        	allowBlank	:true,
			fieldLabel	:'Fecha de Instalaci&oacute;n'
    	});   
    	
		txtSerie= new Ext.form.TextField({
			emptyText 	:'Ingrese N&uacute;mero Serie...',
        	id			:'txt7',
        	name		:'ntxt7',
        	width		:100,
        	allowBlank	:true,
			fieldLabel	:'N&uacute;mero Serie'
    	});
    	
		
		xcbo_modelo = new Ext.form.ComboBox(Ext.applyIf({
			fieldLabel	:'Modelo',
			id			:'id_modelo',
			store		:xcbo_modelo,
			multiSelect	:false,
			minLength	:1,
			emptyText	:'Seleccionar...', 
			valueField	:'id_modelo',
			width		:100,
			mode		:'remote',		
			displayField :'desc_modelo',
			triggerAction:'all',
		   	listeners: {
		   		select: function (){
		   				xmodelo= xcbo_modelo.value;
						xcbo_modelo.proxy= new Ext.data.HttpProxy({url: 'p_data_combos.php?n=7&idDpto='+xmodelo});
						xcbo_modelo.load();
			   		}  
	   		}	
		}));


        xcbo_marca = new Ext.form.ComboBox(Ext.applyIf({
			fieldLabel	:'Marca',
			id			:'id_marca',
			store		:xcbo_marca,
			multiSelect	:false,
			minLength	:1,
			emptyText	:'Seleccionar...',
			valueField	:'id_marca',
			width		:100,
			mode		:'remote',
			displayField :'desc_marca',
			triggerAction:'all',
		   	listeners: {
		   		select: function (){
		   				xmarca= xcbo_marca.value;
						xcbo_marca.proxy= new Ext.data.HttpProxy({url: 'p_data_combos.php?n=7&idDpto='+xmarca});
						xcbo_marca.load();
			   		}
	   		}
		}));

		 
			
		

		
		var btnGraba_nuevo = new Ext.Button({
            text	:'Grabar',
            id		:'btn4',
            width	:150,
            handler	:function(){
            	if(accion=='nuevo'){
            		graba_nuevo();
            	}else{
            		graba_modificacion();
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
                	items: [txtDireccionI]	        		
                         }]
                },
                {
            	layout	:'column',
            	border	:false,	        	
	        	items	:[{
                	columnWidth:1.0,
                	layout: 'form',
                	border:false,
                	items: [txtDireccionII]	        		
                         }]
                },

                {
	            layout:'column',
	            border:false,
	            items:[{
	            	    columnWidth:.50,
	        	        layout: 'form',
	    	            border:false,
		                items: [txtLatitud]
	            	},{
		                columnWidth:.50,
		                layout: 'form',
		                border:false,
		                items: [txtLongitud]
		            }]	        			       
	        },{
	            layout:'column',
	            border:false,
	            items:[{
	            	    columnWidth:.50,
	        	        layout: 'form',
	    	            border:false,
		                items: [txtFecInstalacion]
	            	},{
		                columnWidth:.50,
		                layout: 'form',
		                border:false,
		                items: [txtSerie]
		            }]		        	
	        },{
	            layout:'column',
	            border:false,
	            items:[{
	            	    columnWidth:.50,
	        	        layout: 'form',
	    	            border:false,
		                items: [xcbo_modelo]
	            	},{
		                columnWidth:.50,
		                layout: 'form',
		                border:false,
		                items: [xcbo_marca]
		            }]		        	
	        },{
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
    	
		Ventana_modal = new Ext.Window({
			title		:titulo,
			width		:500,
			modal		:true,
			frame		:true,
			autoHeight	:650,
			minWidth	:400,
			minHeight	:150,
			plain		:true,
			y			:180,
			id			:'LoginWin1',
			bodyStyle	:'padding:5px;',
			items		:formulario
		}); 		
	}
	
	/****************************************************************************************************************/
	
	
	txtBuscado.on('change', Buscar);
	
	function Buscar(){
    	var buscar=Ext.get("v1").getValue();
		if(txtBuscado.validate()==true){
	    	store1.proxy= new Ext.data.HttpProxy({url: 'p_lista_amplificador.php?n=2&buscar='+buscar});
	    	store1.load();
	    	Ext.get("v1").focus();
	    	view.startCollapsed=false;
    	}else if(buscar.length<1){
			recargar_grid;
    	}
    }	
    
   
    function graba_nuevo(){
    	var j_nombre    =Ext.getCmp("txt1").getValue();
    	var j_direccion =Ext.getCmp("txt2").getValue();
    	var j_direccion2=Ext.getCmp("txt3").getValue();
    	var j_latitud	=Ext.getCmp("txt4").getValue();
    	var j_longitud	=Ext.getCmp("txt5").getValue();
    	var j_fecinstalacion=Ext.getCmp("txt6").getValue();
        var j_serie=Ext.getCmp("txt7").getValue();
    	var j_modelo=Ext.getCmp("id_modelo").getValue();
        var j_marca=Ext.getCmp("id_marca").getValue();
    	
        	
        Ext.Ajax.request({
        	url: 'p_admin_amplificador.php',
            params: {
                tarea       :'nuevo',
                nombre      :j_nombre,
                direccion	:j_direccion,
                longitud    :j_longitud,
                latitud     :j_latitud,
                fec_instalacion:j_fecinstalacion,
                serie       :j_serie,
                modelo      :j_modelo,
                marca      :j_marca,
                idusuario   :idusuario
            },
            failure:function(response,options){
	            Ext.MessageBox.alert('Error','Problema ingresando datos');
            },
            success:function(response,options){
            	var respuesta=response.responseText;
                Ext.MessageBox.alert(respuesta);
                /*
    			if(respuesta==2){
    				Ext.MessageBox.alert('Cuidado','Esta ingresando caracteres no validos en el nombre del cliente o en el codigo');
    			}else if(respuesta==5){
    				Ext.MessageBox.alert('Cuidado','El campo RUC es obligatorio y debe ser solo numerico');
    			}else if(respuesta==6){	
    				Ext.MessageBox.alert('Cuidado','Debe seleccionar un Departamento');
    			}else if(respuesta==7){		
    				Ext.MessageBox.alert('Cuidado','Debe seleccionar una Ciudad');
    			}else if(respuesta==8){
    				Ext.MessageBox.alert('Cuidado','Debe seleccionar una Distrito');
    			}else if(respuesta==9){
    				Ext.MessageBox.alert('Cuidado','Hay un error de ingreso. Hay campos vacios o el codigo esta duplicado');
				}else if(respuesta==10){
					Ext.MessageBox.alert('Cuidado','Como minimo debe ingresar la Direccion 1');
				}else if(respuesta==11){
					Ext.MessageBox.alert('Cuidado','Esta ingresando caracteres no validos en el campo de Direccion 1. La logitud es de 2 hasta 80 caracteres');
				}else if(respuesta==12){	
					Ext.MessageBox.alert('Cuidado','Esta ingresando caracteres no validos en el campo Contacto. Solo puede ingresar letras y la logitud es de 2 hasta 80 caracteres');
				}else if(respuesta==13){
					Ext.MessageBox.alert('Cuidado','Debe seleccionar el Estado (Activo/Inactivo)');
				}else if(respuesta==14){
					Ext.MessageBox.alert('Cuidado','La Direccion de E-Mail no es correcta');
				}else if(respuesta==15){
					Ext.MessageBox.alert('Cuidado','Esta ingresando caracteres no validos en el campo de Direccion 2. La logitud es de 2 hasta 80 caracteres');
				}else if(respuesta==16){
					Ext.MessageBox.alert('Cuidado','Esta ingresando caracteres no validos en el campo de Direccion 3. La logitud es de 2 hasta 80 caracteres');
				}else if(respuesta==17){
					Ext.MessageBox.alert('Cuidado','Esta ingresando caracteres no validos en el campo de Direccion 4. La logitud es de 2 hasta 80 caracteres');										
    			}else*/ if(respuesta==1){
					Ventana_modal.hide();
					Ventana_modal.destroy();
					Ext.MessageBox.alert('Aviso','Se agrego el nuevo Cliente');
					recargar_grid();				
    			}
    			
            }
		});    	
    
    }
    
    function graba_modificacion(){
    	var j_nombre        =Ext.getCmp("txt1").getValue();
    	var j_direccion     =Ext.getCmp("txt2").getValue();
    	var j_direccion2	=Ext.getCmp("txt3").getValue();
    	var j_longitud      =Ext.getCmp("txt4").getValue();
        var j_latitud       =Ext.getCmp("txt5").getValue();
    	var j_fecinstalacion=Ext.getCmp("txt6").getValue();
    	var j_serie         =Ext.getCmp("txt7").getValue();
    	var j_modelo        =Ext.getCmp("id_modelo").getValue();
        var j_marca        =Ext.getCmp("id_marca").getValue();
    	
    	var id_amplificador	=selectedRow.get(grid.getColumnModel().getDataIndex(0));

       
        Ext.Ajax.request({
        	url: 'p_admin_amplificador.php',
            params: {
                tarea           :'modificar',
                id_amplificador	:id_amplificador,
                nombre          :j_nombre,
                direccion       :j_direccion,
                direccion2      :j_direccion2,
                longitud		:j_longitud,
                latitud 		:j_latitud,
                fec_instalacion	:j_fecinstalacion,
                serie           :j_serie,
                modelo          :j_modelo,
                marca          :j_marca,
                idusuario:idusuario
            },
            failure:function(response,options){
	            Ext.MessageBox.alert('Error','Problema ingresando datos');
            },
            success:function(response,options){
            	var respuesta=response.responseText;
    			if(respuesta==2){
    				Ext.MessageBox.alert('Cuidado','Esta ingresando caracteres no validos en el nombre del cliente o en el codigo');
    			}else if(respuesta==5){
    				Ext.MessageBox.alert('Cuidado','El campo RUC es obligatorio y debe ser solo numerico');
    			}else if(respuesta==6){	
    				Ext.MessageBox.alert('Cuidado','Debe seleccionar un Departamento');
    			}else if(respuesta==7){		
    				Ext.MessageBox.alert('Cuidado','Debe seleccionar una Ciudad');
    			}else if(respuesta==8){
    				Ext.MessageBox.alert('Cuidado','Debe seleccionar una Distrito');
    			}else if(respuesta==9){
    				Ext.MessageBox.alert('Cuidado','Hay un error de ingreso. Hay campos vacios o el codigo esta duplicado');
				}else if(respuesta==10){
					Ext.MessageBox.alert('Cuidado','Como minimo debe ingresar la Direccion 1');
				}else if(respuesta==11){
					Ext.MessageBox.alert('Cuidado','Esta ingresando caracteres no validos en el campo de Direccion 1. La logitud es de 2 hasta 80 caracteres');
				}else if(respuesta==12){	
					Ext.MessageBox.alert('Cuidado','Esta ingresando caracteres no validos en el campo Contacto. Solo puede ingresar letras y la logitud es de 2 hasta 80 caracteres');
				}else if(respuesta==13){
					Ext.MessageBox.alert('Cuidado','Debe seleccionar el Estado (Activo/Inactivo)');
				}else if(respuesta==14){
					Ext.MessageBox.alert('Cuidado','La Direccion de E-Mail no es correcta');
				}else if(respuesta==15){
					Ext.MessageBox.alert('Cuidado','Esta ingresando caracteres no validos en el campo de Direccion 2. La logitud es de 2 hasta 80 caracteres');
				}else if(respuesta==16){
					Ext.MessageBox.alert('Cuidado','Esta ingresando caracteres no validos en el campo de Direccion 3. La logitud es de 2 hasta 80 caracteres');
				}else if(respuesta==17){
					Ext.MessageBox.alert('Cuidado','Esta ingresando caracteres no validos en el campo de Direccion 4. La logitud es de 2 hasta 80 caracteres');	
    			}else if(respuesta==1){    				
					Ventana_modal.hide();
					Ventana_modal.destroy();
					Ext.MessageBox.alert('Aviso','Se modifico el Producto seleccionado');
					recargar_grid();				
    			}
    			
            }
        });
    }
    
	function recargar_grid(){
	   	store1.proxy= new Ext.data.HttpProxy({url: 'p_lista_amplificador.php?n=1'});
	  	store1.load();    		
		Ext.get("v1").focus();
		view.startCollapsed=true;			
	}
    
    function cancelar(){
    	try{    		
    		Ventana_modal.hide();  		
    	}catch(e){
    		//no hago nada
    	}
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
		title: 'MANTENIMIENTO DE AMPLIFICADORES',
		width: 1000,
		autoHeight:450,
		minWidth: 300,
		minHeight: 150,
		layout: 'fit',
		plain:true,
		y:180,
		id: 'LoginWin2',
		bodyStyle:'padding:5px;',
		items: panel
	}); 	

	Ventana.show();
    
});