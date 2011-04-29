Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

Ext.onReady(function(){
	var visible=true;
	var formulario;
	var Ventana_modal;
	var data;
	var selectedRow;
	var st1, st2, st3, store_cbo;
	var txtNombre,txtCodI,txtRUC,txtDNI,txtDireccionI,txtDireccionII,txtDireccionIII,txtDireccionIV,txtContacto,txtObservaciones,txtTelefonoI,txtTelefonoII,txtEmail;
	var xcbo_departamento,xcbo_ciudad,xcbo_distrito,xcbo_estado;
	
	var perfil		=Ext.getDom('perfil').value;
	var idusuario	=Ext.getDom('idusuario').value;
	
	if (perfil==2) visible=false;
	
	var txtBuscado = new Ext.form.TextField({
		emptyText 	:'Buscar Usuario...',
        id			:'v1',
        width		:300,
        allowBlank	:false,
		fieldLabel	:'Buscar Usuario'
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
		document.location='exp_usuario.php?usuario='+login+'&idusuario='+idusuario;
	}	
	
	var store1= new Ext.data.GroupingStore({
	    proxy: new Ext.data.HttpProxy({
	        url: 'p_lista_usuario.php?n=1'
	    }),
	    reader: new Ext.data.JsonReader({
	        root: 'lista',
	        id: 'resourceId',
	        totalProperty: 'total',	 	        
	        fields: [
		            {name:'id_user'},
		            {name:'ap_paterno'},
                    {name:'ap_materno'},
                    {name:'nombre'},
                    {name:'usuario'},
                    {name:'clave'},
                    {name:'dni'},
                    {name:'fec_ultimo_ingreso'},
                    {name:'idsess'},
                    {name:'estado'}
	        ]
	
	    }),
		   
	    //groupField:'departamento',
	    remoteSort: false,
	    sortInfo: {field: 'nombre', direction: 'DESC'}
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
		        { id:'id_user',header: "id_user",width: 100 ,sortable: false,groupable: false,dataIndex:'id_user',hidden:true},
		        { header: "Ap. Paterno",width: 80,sortable: true,dataIndex: 'ap_paterno',groupable:false},
                { header: "Ap. Materno",width: 80,sortable: true,dataIndex: 'ap_materno',groupable:false},
                { header: "Nombres",width: 80,sortable: true,dataIndex: 'nombre',groupable:false},
                { header: "Usuario",width: 80,sortable: true,dataIndex: 'usuario',groupable:false},
                { header: "Clave",width: 80,sortable: true,dataIndex: 'clave',groupable:false},
                { header: "Dni",width: 80,sortable: true,dataIndex: 'dni',groupable:false},
                { header: "Fecha Ultimo Ingreso",width: 80,sortable: true,dataIndex: 'fec_ultimo_ingreso',groupable:false},
                { header: "Sesion",width: 80,sortable: true,dataIndex: 'idsess',groupable:false},
                { header: "Estado",width: 80,sortable: true,dataIndex: 'estado',groupable:false}
                
		        
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
			
			var m_codigo	=selectedRow.get(grid.getColumnModel().getDataIndex(1));			
			var m_dpto		=selectedRow.get(grid.getColumnModel().getDataIndex(2));
			var m_ciudad	=selectedRow.get(grid.getColumnModel().getDataIndex(3));
			var m_distri	=selectedRow.get(grid.getColumnModel().getDataIndex(4));			
			var m_nombre	=selectedRow.get(grid.getColumnModel().getDataIndex(5));			
			var m_ruc		=selectedRow.get(grid.getColumnModel().getDataIndex(6));
			var m_dni		=selectedRow.get(grid.getColumnModel().getDataIndex(7));			
			var m_telef1	=selectedRow.get(grid.getColumnModel().getDataIndex(8));
			var m_telef2	=selectedRow.get(grid.getColumnModel().getDataIndex(9));			
			var m_email		=selectedRow.get(grid.getColumnModel().getDataIndex(10));
			var m_estado	=selectedRow.get(grid.getColumnModel().getDataIndex(13));
			var m_dirI		=selectedRow.get(grid.getColumnModel().getDataIndex(11));
			var m_dirII		=selectedRow.get(grid.getColumnModel().getDataIndex(14));					
			var m_dirIII	=selectedRow.get(grid.getColumnModel().getDataIndex(15));
			var m_dirIV		=selectedRow.get(grid.getColumnModel().getDataIndex(16));
			var m_contacto	=selectedRow.get(grid.getColumnModel().getDataIndex(12));
			var m_observ	=selectedRow.get(grid.getColumnModel().getDataIndex(17));
								
			
			llama_formulario('MODIFICA USUARIO','modifica');
			
			txtNombre.value			=m_nombre;
			txtCodI.value			=m_codigo;				
			txtRUC.value			=m_ruc;
			txtDNI.value			=m_dni;
			txtTelefonoI.value		=m_telef1;
			txtTelefonoII.value		=m_telef2;
			xcbo_departamento.value	=m_dpto;
			xcbo_ciudad.value		=m_ciudad;
			xcbo_distrito.value		=m_distri;			
			xcbo_estado.value		=m_estado;
			txtEmail.value			=m_email;
			txtDireccionI.value		=m_dirI;
			txtDireccionII.value	=m_dirII;
			txtDireccionIII.value	=m_dirIII;
			txtDireccionIV.value	=m_dirIV;
			txtContacto.value		=m_contacto;
			txtObservaciones.value	=m_observ;			
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
			var idcliente	=selectedRow.get(fieldName);
			
	        Ext.Ajax.request({
	        	url: 'p_admin_usuario.php',
	            params: {
	                tarea		:'borrar',
					idcliente	:idcliente,
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
		llama_formulario('NUEVO USUARIO','nuevo');
		Ventana_modal.show();			
	}
	
	function llama_formulario(titulo,accion){
		
		/*********** componentes del formulario *******************/
		
		st1=new Ext.data.JsonStore({		//	Data de departamentos
			url		:"p_data_combos.php?n=6",
	 	   	root	:'departamento',
	       	fields: [
	           	{name:'iddepartamento'},
	           	{name:'departamento'}
	       	]
		});		
		
		st2=new Ext.data.JsonStore({		//	Data de ciudades
			url		:"p_data_combos.php?n=7",
	 	   	root	:'ciudad',
	       	fields: [
	           	{name:'idciudad'},
	           	{name:'ciudad'}
	       	]
		});		
		
		st3=new Ext.data.JsonStore({		//	Data de distritos
			url		:"p_data_combos.php?n=8",
	 	   	root	:'distrito',
	       	fields: [
	           	{name:'iddistrito'},
	           	{name:'distrito'}
	       	]
		});	
		
	    Ext.namespace('Ext.exampledata');
	
		Ext.exampledata.states = [
				['0','Inactivo'],
				['1','Activo']
			];    
		    
		store_cbo = new Ext.data.SimpleStore({
			fields: [
				{name: 'idestado'},
				{name: 'estado'}
			],
			data : Ext.exampledata.states 
		});		

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

		txtCodI = new Ext.form.TextField({
			emptyText 	:'Ingrese codigo...',
        	id			:'txt2',
        	name		:'ntxt2',
        	width		:100,
        	allowBlank	:false,
			fieldLabel	:'C&oacute;digo',
			minLength	:3,
			maxLength 	:10			
    	});     	
		
		txtRUC = new Ext.form.TextField({
			emptyText 	:'Ingrese RUC...',
        	id			:'txt3',
        	name		:'ntxt3',
        	width		:100,
        	allowBlank	:false,
			fieldLabel	:'RUC',
			minLength	:3,
			maxLength 	:10				
    	});    
    	
		txtDNI = new Ext.form.TextField({
			emptyText 	:'Ingrese DNI...',
        	id			:'txt4',
        	name		:'ntxt4',
        	width		:100,
        	allowBlank	:true,
			fieldLabel	:'DNI'
    	});    
    	
		txtDireccionI = new Ext.form.TextField({
			emptyText 	:'Ingrese Direccion 1...',
        	id			:'txt5',
        	name		:'ntxt5',
        	width		:330,
        	allowBlank	:false,
			fieldLabel	:'Direcci&oacute;n 1'
    	});  
    	
		txtDireccionII = new Ext.form.TextField({
			emptyText 	:'Ingrese Direccion 2...',
        	id			:'txt6',
        	name		:'ntxt6',
        	width		:330,
        	allowBlank	:true,
			fieldLabel	:'Direcci&oacute;n 2'
    	});   
    	
		txtDireccionIII = new Ext.form.TextField({
			emptyText 	:'Ingrese Direccion 3...',
        	id			:'txt7',
        	name		:'ntxt7',
        	width		:330,
        	allowBlank	:true,
			fieldLabel	:'Direcci&oacute;n 3'
    	});
    	
		txtDireccionIV = new Ext.form.TextField({
			emptyText 	:'Ingrese Direccion 4...',
        	id			:'txt8',
        	name		:'ntxt8',
        	width		:330,
        	allowBlank	:true,
			fieldLabel	:'Direcci&oacute;n 4'
    	});    	
    	
		txtContacto = new Ext.form.TextField({
			emptyText 	:'Ingrese Contacto...',
        	id			:'txt9',
        	name		:'ntxt9',
        	width		:330,
        	allowBlank	:true,
			fieldLabel	:'Contacto'
    	});      	
    	
		txtObservaciones = new Ext.form.TextField({
			emptyText 	:'Ingrese Observaciones...',
        	id			:'txt10',
        	name		:'ntxt10',
        	width		:330,
        	allowBlank	:true,
			fieldLabel	:'Observaciones'
    	});      	
    	
		txtTelefonoI = new Ext.form.TextField({
			emptyText 	:'Ingrese Telefono I...',
        	id			:'txt11',
        	name		:'ntxt11',
        	width		:100,
        	allowBlank	:true,
			fieldLabel	:'Tel&eacute;fono 1'
    	});    
    	
		txtTelefonoII = new Ext.form.TextField({
			emptyText 	:'Ingrese Telefono II...',
        	id			:'txt12',
        	name		:'ntxt12',
        	width		:100,
        	allowBlank	:true,
			fieldLabel	:'Tel&eacute;fono 2'
    	});    

		txtEmail = new Ext.form.TextField({
			emptyText 	:'Ingrese E-Mail...',
        	id			:'txt13',
        	name		:'ntxt13',
        	width		:330,
        	allowBlank	:true,
			fieldLabel	:'E-mail'
    	}); 
    	
		xcbo_departamento = new Ext.ux.Andrie.Select(Ext.applyIf({
			fieldLabel	:'Departamento',
			id			:'idcbo_departamento',
			store		:st1,		
			multiSelect	:false,
			minLength	:1,
			emptyText	:'Seleccionar...', 
			valueField	:'iddepartamento',
			width		:100,
			mode		:'remote',		
			displayField :'departamento',
			triggerAction:'all',
		   	listeners: {
		   		select: function (){
		   				xdpto= xcbo_departamento.value;
						st2.proxy= new Ext.data.HttpProxy({url: 'p_data_combos.php?n=7&idDpto='+xdpto}); 
						st2.load();
			   		}  
	   		}	
		}));    
		 
		xcbo_ciudad = new Ext.ux.Andrie.Select(Ext.applyIf({
			fieldLabel	:'Ciudad',
			id			:'idcbo_ciudad',
			store		:st2,		
			multiSelect	:false,
			minLength	:1,
			emptyText	:'Seleccionar...', 
			valueField	:'idciudad',
			width		:100,
			mode		:'remote',		
			displayField :'ciudad',
			triggerAction:'all',
		   	listeners: {
		   		select: function (){
		   				xciudad= xcbo_ciudad.value;
						st3.proxy= new Ext.data.HttpProxy({url: 'p_data_combos.php?n=8&idciudad='+xciudad}); 
						st3.load();
			   		}  
	   		}	
		})); 	

		xcbo_distrito = new Ext.ux.Andrie.Select(Ext.applyIf({
			fieldLabel	:'Distrito',
			id			:'idcbo_distrito',
			store		:st3,		
			multiSelect	:false,
			minLength	:1,
			emptyText	:'Seleccionar...', 
			valueField	:'iddistrito',
			width		:100,
			mode		:'remote',		
			displayField :'distrito',
			triggerAction:'all'		
		})); 
		
		xcbo_estado = new Ext.ux.Andrie.Select(Ext.applyIf({
			fieldLabel	:'Estado',
			id			:'idcbo_estado',
			store		:store_cbo,		
			multiSelect	:false,
			minLength	:1,
			emptyText	:'Seleccionar...', 
			valueField	:'idestado',
			width		:100,
			mode		:'local',		
			displayField :'estado',
			triggerAction:'all'		
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
		                items: [txtCodI]
	            	},{
		                columnWidth:.50,
		                layout: 'form',
		                border:false,
		                items: [txtRUC]
		            }]	        			       
	        },{
	            layout:'column',
	            border:false,
	            items:[{
	            	    columnWidth:.50,
	        	        layout: 'form',
	    	            border:false,
		                items: [txtTelefonoI]
	            	},{
		                columnWidth:.50,
		                layout: 'form',
		                border:false,
		                items: [txtTelefonoII]
		            }]		        	
	        },{
	            layout:'column',
	            border:false,
	            items:[{
	            	    columnWidth:.50,
	        	        layout: 'form',
	    	            border:false,
		                items: [xcbo_departamento]
	            	},{
		                columnWidth:.50,
		                layout: 'form',
		                border:false,
		                items: [txtDNI]
		            }]		        	
	        },{
	            layout:'column',
	            border:false,
	            items:[{
	            	    columnWidth:.50,
	        	        layout	:'form',
	    	            border	:false,
		                items	:[xcbo_ciudad]
	            	},{
		                columnWidth:.50,
		                layout	:'form',
		                border	:false,
		                items	:[xcbo_distrito]
		            }]		        	
	        },{
	            layout:'column',
	            border:false,
	            items:[{
	            	    columnWidth:.50,
	        	        layout	:'form',
	    	            border	:false,
	    	            items	:[xcbo_estado]		                
	            	},{
		                columnWidth:.50,
		                layout	:'form',
		                border	:false,
		                html	:'&nbsp;'
		            }]	 	        	
	        },{
	            layout:'column',
	            border:false,
	            items:[{
	            	    columnWidth:1.0,
	        	        layout	:'form',
	    	            border	:false,
		                items	:txtEmail
	            	}]		        	
	        },{
	            layout:'column',
	            border:false,
	            items:[{
	            	    columnWidth:1.0,
	        	        layout	:'form',
	    	            border	:false,
		                items	:[txtDireccionI]
	            	}]	       	
	        },{
	            layout:'column',
	            border:false,
	            items:[{
		                columnWidth:1.0,
		                layout	:'form',
		                border	:false,
		                items	:[txtDireccionII]
		            }]	        	
	        },{
            	layout	:'column',
            	border	:false,	        	
	        	items	:[{
	                columnWidth:1.0,
	                layout	:'form',
	                border	:false,
	                items	:[txtDireccionIII]		        		
	        	}]	        	
	        },{
            	layout	:'column',
            	border	:false,	        	
	        	items	:[{
                	columnWidth:1.0,
                	layout	:'form',
                	border	:false,
                	items	:[txtDireccionIV]	        		
	        	}]		        	
	        },{
            	layout	:'column',
            	border	:false,	        	
	        	items	:[{
                	columnWidth:1.0,
                	layout	:'form',
                	border	:false,
                	items	:txtContacto
	        	}]		        	
	        },{
            	layout	:'column',
            	border	:false,	        	
	        	items	:[{
                	columnWidth:1.0,
                	layout	:'form',
                	border	:false,
                	items	:txtObservaciones
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
	    	store1.proxy= new Ext.data.HttpProxy({url: 'p_lista_usuario.php?n=2&buscar='+buscar});
	    	store1.load();
	    	Ext.get("v1").focus();
	    	view.startCollapsed=false;
    	}else if(buscar.length<1){
			recargar_grid;
    	}
    }	
    
   
    function graba_nuevo(){
    	var j_nombre=Ext.getCmp("txt1").getValue();
    	var j_codigo=Ext.getCmp("txt2").getValue();
    	var j_ruc	=Ext.getCmp("txt3").getValue();	
    	var j_dni	=Ext.getCmp("txt4").getValue();	
    	var j_dirI	=Ext.getCmp("txt5").getValue();	
    	var j_dirII	=Ext.getCmp("txt6").getValue();	
    	var j_dirIII=Ext.getCmp("txt7").getValue();	
    	var j_dirIV	=Ext.getCmp("txt8").getValue();	
    	var j_contac=Ext.getCmp("txt9").getValue();
    	var j_observ=Ext.getCmp("txt10").getValue();
    	var j_telefI=Ext.getCmp("txt11").getValue();
    	var j_telefII=Ext.getCmp("txt12").getValue();
    	var j_email	=Ext.getCmp("txt13").getValue();
    	var j_dpto	=Ext.getCmp("idcbo_departamento").getValue();
    	var j_ciudad=Ext.getCmp("idcbo_ciudad").getValue();	
    	var j_distri=Ext.getCmp("idcbo_distrito").getValue();	
    	var j_estado=Ext.getCmp("idcbo_estado").getValue();
    	
        	
        Ext.Ajax.request({
        	url: 'p_admin_usuario.php',
            params: {
                tarea	:'nuevo',
                nombre	:j_nombre,
                codigo	:j_codigo,
                ruc		:j_ruc,
                dni		:j_dni,
                dirI	:j_dirI,
                dirII	:j_dirII,
                dirIII	:j_dirIII,
                dirIV	:j_dirIV,
                contacto:j_contac,
                observ	:j_observ,
                telefI	:j_telefI,
                telefII	:j_telefII,
                email	:j_email,
                dpto	:j_dpto,
                ciudad	:j_ciudad,
                distri	:j_distri,
                estado	:j_estado,
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
    	var j_codigo=Ext.getCmp("txt2").getValue();
    	var j_ruc	=Ext.getCmp("txt3").getValue();	
    	var j_dni	=Ext.getCmp("txt4").getValue();	
    	var j_dirI	=Ext.getCmp("txt5").getValue();	
    	var j_dirII	=Ext.getCmp("txt6").getValue();	
    	var j_dirIII=Ext.getCmp("txt7").getValue();	
    	var j_dirIV	=Ext.getCmp("txt8").getValue();	
    	var j_contac=Ext.getCmp("txt9").getValue();
    	var j_observ=Ext.getCmp("txt10").getValue();
    	var j_telefI=Ext.getCmp("txt11").getValue();
    	var j_telefII=Ext.getCmp("txt12").getValue();
    	var j_email	=Ext.getCmp("txt13").getValue();
    	var j_dpto	=Ext.getCmp("idcbo_departamento").getValue();
    	var j_ciudad=Ext.getCmp("idcbo_ciudad").getValue();	
    	var j_distri=Ext.getCmp("idcbo_distrito").getValue();	
    	var j_estado=Ext.getCmp("idcbo_estado").getValue();
    	
    	var idcliente	=selectedRow.get(grid.getColumnModel().getDataIndex(0));

       
        Ext.Ajax.request({
        	url: 'p_admin_usuario.php',
            params: {
                tarea	:'modificar',
                idcli	:idcliente,
                nombre	:j_nombre,
                codigo	:j_codigo,
                ruc		:j_ruc,
                dni		:j_dni,
                dirI	:j_dirI,
                dirII	:j_dirII,
                dirIII	:j_dirIII,
                dirIV	:j_dirIV,
                contacto:j_contac,
                observ	:j_observ,
                telefI	:j_telefI,
                telefII	:j_telefII,
                email	:j_email,
                dpto	:j_dpto,
                ciudad	:j_ciudad,
                distri	:j_distri,
                estado	:j_estado,
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
	   	store1.proxy= new Ext.data.HttpProxy({url: 'p_lista_usuario.php?n=1'});
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
		title: 'MANTENIMIENTO DE USUARIO',
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