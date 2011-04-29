Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

Ext.onReady(function(){

	/***********************************************************************************************************/
	/*	CLIENTES	*/
	/***********************************************************************************************************/		
	var data;
		
	var txtBuscado = new Ext.form.TextField({
		emptyText 	:'Buscar Cliente...',
        id			:'v1',
        width		:300,
        allowBlank	:false,
		fieldLabel	:'Buscar Cliente'
    });
	
	var btnbuscar = new Ext.Button({
        text	:'Consultar',
        id		:'btn1',
        width	:150,
        handler	:Buscar,
		iconCls	:'search'
	});
 	
	var store1= new Ext.data.GroupingStore({
	    proxy: new Ext.data.HttpProxy({
	        url: 'p_lista_clientes.php?n=1'
	    }),
	    reader: new Ext.data.JsonReader({
	        root: 'lista',
	        id: 'resourceId',
	        totalProperty: 'total',	 	        
	        fields: [
		            {name:'idcliente'},
		            {name:'codigo_cliente'},
		            {name:'departamento'},
		            {name:'ciudad'},
		            {name:'distrito'},
		            {name:'nombre'},
		            {name:'ruc'},
		            {name:'dni'},
		            {name:'telefono_1'},
		            {name:'telefono_2'},
		            {name:'email'},
		            {name:'direccion'},
		            {name:'direccion2'},
		            {name:'direccion3'},
		            {name:'direccion4'},
		            {name:'contacto'},
		            {name:'flag'}
	        ]
	
	    }),
		   
	    remoteSort: false,
	    sortInfo: {field: 'nombre', direction: 'DESC'}
	});

	var grid = new Ext.grid.GridPanel({
	    height		:350,
	    frame		:true,
	    collapsible	:true,
	    loadMask	:true,
	    store		:store1,
	    columns:[
		        	{ id:'idcliente',header: "idcliente",width: 100 ,sortable: false,groupable: false,dataIndex:'idcliente',hidden:true}, 	
		        	{ header: "C&oacute;d Cliente",	width: 90,	sortable: true,dataIndex: 'codigo_cliente',align:'left'},
		        	{ header: "Nombres y Apellidos / Raz&oacute;n Social",width: 280,sortable: true,dataIndex:'nombre', align:'left',hidden:false},		        	
		        	{ header: "Direcci&oacute;n 1",	width: 280,	sortable: true,dataIndex:'direccion', 	align:'left',	hidden:false},
		        	{ header: "Direcci&oacute;n 2",	width: 200,	sortable: true,dataIndex:'direccion2', 	align:'left',	hidden:true},
		        	{ header: "Direcci&oacute;n 3",	width: 200,	sortable: true,dataIndex:'direccion3', 	align:'left',	hidden:true},
		        	{ header: "Direcci&oacute;n 4",	width: 200,	sortable: true,dataIndex:'direccion4',	align:'left',	hidden:true},
		        	{ header: "Departamento",		width: 80,	sortable: true,dataIndex:'departamento',align:'left',	hidden:true},
		        	{ header: "Ciudad",				width: 60,	sortable: true,dataIndex:'ciudad',		align:'left',	hidden:true},
		        	{ header: "Distrito",			width: 90,	sortable: true,dataIndex:'distrito',	align:'center',	hidden:true},		        	
		        	{ header: "RUC",				width: 70,	sortable: true,dataIndex:'ruc', 		align:'center',	hidden:false},
		        	{ header: "DNI",				width: 70,	sortable: true,dataIndex:'dni', 		align:'center',	hidden:false},
		        	{ header: "Tel&eacute;fono I",	width: 100,	sortable: true,dataIndex:'telefono_1', 	align:'center',	hidden:false},
		        	{ header: "Tel&eacute;fono II",	width: 100,	sortable: true,dataIndex:'telefono_2', 	align:'center',	hidden:true},
		        	{ header: "E-mail",				width: 90,	sortable: true,dataIndex:'email', 		align:'center',	hidden:true},
		        	{ header: "Contacto",			width: 120,	sortable: true,dataIndex:'contacto', 	align:'center',	hidden:true},
		        	{ header: "Estado",				width: 50,	sortable: true,dataIndex:'flag', 		align:'center',	hidden:true}
	    ],
	    sm: new Ext.grid.RowSelectionModel({
	        singleSelect:true
	    }),
	    tbar: [txtBuscado,'  ',btnbuscar]  
	});	

	store1.load({params:{n:1,start:0, limit:17}}); 	
	
    function toggleDetails(btn, pressed){
        grid.refresh();
    }	
    
    /***************************************************************************************************************/

	grid.on('rowdblclick', function(grid, rowIndex, e) {
	  
	    var record 		=grid.getStore().getAt(rowIndex);
	    var fieldName 	=grid.getColumnModel().getDataIndex(0);
	    data			=record.get(fieldName);
	    
        Ext.Ajax.request({
            url		:'p_lista_clientes.php',
            method	:'POST',
            params	:{
                   	n	:3,
                    id	:data
            },
            failure:function(response,options){
	            Ext.Msg.alert('Error','Problemas cargando datos.');
            },
            success:function(response,options){
            	var stringData	=response.responseText;
				var jsonData 	=Ext.util.JSON.decode(stringData);
				var idcliente	=jsonData.idcliente;
				var cod_cliente	=jsonData.codigo_cliente;
				var departamento=jsonData.departamento;
				var ciudad		=jsonData.ciudad;
				var distrito	=jsonData.distrito;
				var nombre		=jsonData.nombre;
				var ruc			=jsonData.ruc;
				var dni			=jsonData.dni;
				var telefono_1	=jsonData.telefono_1;
				var telefono_2	=jsonData.telefono_2;
				var email		=jsonData.email;
				var observacion	=jsonData.observaciones;
				var contacto	=jsonData.contacto;
				var flag		=jsonData.flag;
				var direccion	=jsonData.direccion;
				var direccion2	=jsonData.direccion2;
				var direccion3	=jsonData.direccion3;
				var direccion4	=jsonData.direccion4;
				
				var Ventana_modal = new Ext.Window({
					title		:'DATOS DEL CLIENTE',
					width		:650,
					modal		:true,
					autoHeight	:550,
					minWidth	:400,
					html		:'<table width=620>'+ 
									'<tr>'+
										'<td align=left height=25><b>Cliente</b></td><td align=left>'+nombre+'</td>'+
										'<td align=left><b>R.U.C</b></td><td align=left>'+ruc+'</td>'+
									'</tr>'+
									'<tr>'+
										'<td align=left height=25><b>C&oacute;d. Cliente</b></td><td align=left>'+cod_cliente+'</td>'+
										'<td align=left><b>D.N.I</b></td><td align=left>'+dni+'</td>'+
									'</tr>'+
									'<tr>'+
										'<td align=left height=25><b>Direcci&oacute;n 1</b></td><td align=left>'+direccion+'</td>'+
										'<td align=left><b>Direcci&oacute;n 2</b></td><td align=left>'+direccion2+'</td>'+
									'</tr>'+
									'<tr>'+																											
										'<td align=left height=25><b>Direcci&oacute;n 3</b></td><td align=left>'+direccion3+'</td>'+
										'<td align=left><b>Direcci&oacute;n 4</b></td><td align=left>'+direccion4+'</td>'+
									'</tr>'+
										'<td align=left height=25><b>Departamento</b></td><td align=left>'+departamento+'</td>'+
										'<td align=left><b>Ciudad</b></td><td align=left>'+ciudad+'</td>'+
									'</tr>'+	
									'</tr>'+
										'<td align=left height=25><b>Distrito</b></td><td align=left>'+distrito+'</td>'+
										'<td align=left><b>E-Mail</b></td><td align=left>'+email+'</td>'+
									'</tr>'+
									'</tr>'+
										'<td align=left height=25><b>Tel&eacute;fono 1</b></td><td align=left>'+telefono_1+'</td>'+
										'<td align=left><b>Tel&eacute;fono 2</b></td><td align=left>'+telefono_2+'</td>'+
									'</tr>'+
									'</tr>'+
										'<td align=left height=25><b>Contacto</b></td><td align=left>'+contacto+'</td>'+
										'<td align=left><b>Estado</b></td><td align=left>'+flag+'</td>'+
									'</tr>'+
									'</tr>'+
										'<td align=left height=25><b>Observaciones</b></td><td align=left colspan=3>'+observacion+'</td>'+
									'</tr>'+									
								'</table>',
					minHeight	:150,
					layout		:'fit',
					plain		:true,
					y			:230,
					id			:'LoginWin3',
					bodyStyle	:'padding:5px;'
				}); 	    
				Ventana_modal.show();				
            }
		});	    
	    
	
	});    
    

	/***************************************************************************************************************/
	txtBuscado.on('change', Buscar);
	function Buscar(){
    	var buscar=Ext.get("v1").getValue();
		if(txtBuscado.validate()==true){
	    	store1.proxy= new Ext.data.HttpProxy({url: 'p_lista_clientes.php?n=2&buscar='+buscar});
	    	store1.load();
	    	Ext.get("v1").focus();
    	}else if(buscar.length<1){
	    	store1.proxy= new Ext.data.HttpProxy({url: 'p_lista_clientes.php?n=1&start=0&limit=17'});
	    	store1.load();    		
    		Ext.get("v1").focus();
    	}
    }	
	
	var panel = new Ext.Panel({
	    id			:'images-view',
	    frame		:false,
	    width		:820,
	    autoHeight	:true,
	    collapsible	:false,
	    collapsed	:false,
	    layout		:'fit',	    
	    items		:grid
	});	    
    
			
	var Ventana = new Ext.Window({
		title		:'LISTA DE CLIENTES',
		width		:950,
		autoHeight	:450,
		minWidth	:300,
		minHeight	:150,
		layout		:'fit',
		plain		:true,
		y			:180,
		id			:'LoginWin4',
		bodyStyle	:'padding:5px;',
		items		:panel
	}); 	

	Ventana.show();	
 	


});