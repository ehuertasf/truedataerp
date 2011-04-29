Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

Ext.onReady(function(){
	var visible=true;
	var formulario;
	var Ventana_modal;
	var data;
	var selectedRow;
	var st1, st2, st3, store_cbo;
	var txtNombre,txtMac,txtCliente;
	var xcbo_modelo,xcbo_marca;
	
	var perfil		=Ext.getDom('perfil').value;
	var idusuario	=Ext.getDom('idusuario').value;
	
	if (perfil==2) visible=false;
	
	var txtBuscado = new Ext.form.TextField({
		emptyText 	:'Buscar Cable Modem...',
        id			:'v1',
        width		:300,
        allowBlank	:false,
		fieldLabel	:'Buscar Cable Modem'
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
        handler	:actualizar_producto,
		iconCls	:'update_item'
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
		document.location='exp_cable_modem.php?usuario='+login+'&idusuario='+idusuario;
	}	
	
	var store1= new Ext.data.GroupingStore({
	    proxy: new Ext.data.HttpProxy({
	        url: 'p_lista_cable_modem.php?n=1'
	    }),
	    reader: new Ext.data.JsonReader({
	        root: 'lista',
	        id: 'resourceId',
	        totalProperty: 'total',	 	        
	        fields: [
		            {name:'id_cable_modem'},
		            {name:'nom_cable_modem'},
		            {name:'num_mac'},
		            {name:'id_cliente'},
		            {name:'id_modelo'},
                    {name:'id_marca'}
		            
	        ]
	
	    }),
		   
	    //groupField:'departamento',
	    remoteSort: false,
	    sortInfo: {field: 'nom_cable_modem', direction: 'DESC'}
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
	    columns:[
		        { id:'id_cable_modem',header: "id_cable_modem",width: 100 ,sortable: false,groupable: false,dataIndex:'id_tap',hidden:true},
		        { header: "Nombre Cable Modem",width: 80,sortable: true,dataIndex: 'nom_cable_modem',align:'left'},
		        { header: "Numero Mac",width: 80,sortable: true,dataIndex: 'num_mac',groupable:false},
                { header: "Cliente",width: 80,sortable: true,dataIndex: 'id_cliente',groupable:false},
                { header: "Modelo",width: 80,sortable: true,dataIndex: 'id_modelo',groupable:false},
		        { header: "Marca",width: 120,sortable: true,dataIndex:'id_marca',groupable:false}
		        
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
			
            var m_nombre	=selectedRow.get(grid.getColumnModel().getDataIndex(1));
			var m_mac		=selectedRow.get(grid.getColumnModel().getDataIndex(2));
			var m_cliente	=selectedRow.get(grid.getColumnModel().getDataIndex(3));
			var m_modelo	=selectedRow.get(grid.getColumnModel().getDataIndex(4));
			var m_marca	=selectedRow.get(grid.getColumnModel().getDataIndex(5));
			
	
								
			
			llama_formulario('MODIFICA CABLE MODEM','modifica');
			
			txtNombre.value			=m_nombre;
			txtMac.value			=m_mac;
			txtCliente.value		=m_cliente;
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
			var id_cable_modem	=selectedRow.get(fieldName);
			
	        Ext.Ajax.request({
	        	url: 'p_admin_cable_modem.php',
	            params: {
	                tarea		:'borrar',
					id_cable_modem	:id_cable_modem,
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
		llama_formulario('NUEVO CABLE MODEM','nuevo');
		Ventana_modal.show();			
	}
	
	function llama_formulario(titulo,accion){
		
		/*********** componentes del formulario *******************/
		
		store_modelo=new Ext.data.JsonStore({		//	Data de modelos
			url		:"p_data_combos.php?n=6",
	 	   	root	:'modelo',
	       	fields: [
	           	{name:'id_modelo'},
	           	{name:'desc_modelo'}
	       	]
		});

		store_marca=new Ext.data.JsonStore({		//	Data de marca
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

		txtMac = new Ext.form.TextField({
			emptyText 	:'Ingrese mac...',
        	id			:'txt2',
        	name		:'ntxt2',
        	width		:100,
        	allowBlank	:false,
			fieldLabel	:'Mac',
			minLength	:3,
			maxLength 	:10			
    	});     	
		
		txtCliente = new Ext.form.TextField({
			emptyText 	:'Ingrese Cliente...',
        	id			:'txt3',
        	name		:'ntxt3',
        	width		:100,
        	allowBlank	:false,
			fieldLabel	:'Cliente',
			minLength	:3,
			maxLength 	:10				
    	});    

        xcbo_modelo = new Ext.form.ComboBox(Ext.applyIf({
			fieldLabel	:'Modelo',
			id			:'id_modelo',
			store		:store_modelo,
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
						store_modelo.proxy= new Ext.data.HttpProxy({url: 'p_data_combos.php?n=6&idmodelo='+xmodelo});
						store_modelo.load();
			   		}
	   		}
		}));

		xcbo_marca = new Ext.form.ComboBox(Ext.applyIf({
			fieldLabel	:'Marca',
			id			:'id_marca',
			store		:store_marca,
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
						store_marca.proxy= new Ext.data.HttpProxy({url: 'p_data_combos.php?n=7&idmarca='+xmarca});
						store_marca.load();
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
	        items		:[{
            	layout	:'column',
            	border	:false,	        	
	        	items	:[{
                	columnWidth:1.0,
                	layout: 'form',
                	border:false,
                	items: [txtNombre]	        		
	        	}]
	        },{
	            layout:'column',
	            border:false,
	            items:[{
	            	    columnWidth:.50,
	        	        layout: 'form',
	    	            border:false,
		                items: [txtMac]
	            	},{
		                columnWidth:.50,
		                layout: 'form',
		                border:false,
		                items: [txtCliente]
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
	        }
        ]
		
	
		
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
			y			:150,
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
	    	store1.proxy= new Ext.data.HttpProxy({url: 'p_lista_cable_modem.php?n=2&buscar='+buscar});
	    	store1.load();
	    	Ext.get("v1").focus();
	    	view.startCollapsed=false;
    	}else if(buscar.length<1){
			recargar_grid;
    	}
    }	
    
   
    function graba_nuevo(){
    	var j_nombre=Ext.getCmp("txt1").getValue();
    	var j_mac=Ext.getCmp("txt2").getValue();
    	var j_cliente	=Ext.getCmp("txt3").getValue();
    	var j_modelo=Ext.getCmp("id_modelo").getValue();
    	var j_marca=Ext.getCmp("id_marca").getValue();
    	
    	
        	
        Ext.Ajax.request({
        	url: 'p_admin_cable_modem.php',
            params: {
                tarea	:'nuevo',
                nombre	:j_nombre,
                mac     :j_mac,
                cliente		:j_cliente,
                modelo		:j_modelo,
                marca	:j_marca,
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
					Ext.MessageBox.alert('Aviso','Se agrego el nuevo Cliente');
					recargar_grid();				
    			}
    			
            }
		});    	
    
    }
    
    function graba_modificacion(){
    	var j_nombre=Ext.getCmp("txt1").getValue();
    	var j_mac   =Ext.getCmp("txt2").getValue();
    	var j_cliente	=Ext.getCmp("txt3").getValue();
    	var j_modelo	=Ext.getCmp("id_modelo").getValue();
    	var j_marca=Ext.getCmp("id_marca").getValue();
    	
    	
    	var id_cable_modem	=selectedRow.get(grid.getColumnModel().getDataIndex(0));

       
        Ext.Ajax.request({
        	url: 'p_admin_cable_modem.php',
            params: {
                tarea	:'modificar',
                id_cable_modem	:id_cable_modem,
                nombre	:j_nombre,
                cliente	:j_cliente,
                modelo		:j_modelo,
                marca		:j_marca,
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
	   	store1.proxy= new Ext.data.HttpProxy({url: 'p_lista_cable_modem.php?n=1'});
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
		title: 'MANTENIMIENTO DE CABLE MODEM',
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