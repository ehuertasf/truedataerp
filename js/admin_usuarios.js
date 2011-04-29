Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

Ext.onReady(function(){
    Ext.QuickTips.init();
    Ext.namespace('Ext.exampledata');

	Ext.exampledata.states = [
			['Inactivo'],
			['Activo']
		];    
	    
	var store_cbo = new Ext.data.SimpleStore({
		fields: ['estado'],
		data : Ext.exampledata.states 
	}); 

    var fm = Ext.form;
    
	var txtBuscado = new Ext.form.TextField({
		emptyText : 'Buscar Login...',
        id:'v1',
        width:100,
        allowBlank: true,
		fieldLabel: 'Buscar Login'
    });
	
	var btnbuscar = new Ext.Button({
            text:		'Consultar',
            id:			'btn1',
            width:		150,
            handler: 	Buscar,
			iconCls:	'search'
		});
   
    
    var dsPerfiles = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'p_data_combos.php?n=5', waitMsg: 'Buscando...'}),
        reader: new Ext.data.JsonReader({root: 'perfil'},['idperfil','desc_perfil','opciones'])
    });    

    var cm = new Ext.grid.ColumnModel([{
           id:'usuario',
           header: 'Usuario',
           dataIndex: 'login',
           width: 90,
           align:'center',
           editor: new fm.TextField({
               allowBlank: false
           })
        },{
           id:'clave',
           header: 'Clave',
           dataIndex: 'clave',
           width: 90,
           align:'center',
           renderer: function (val) { 
           		var str=val.replace(val,"******");
           		return str;
           },
           editor: new fm.TextField({
		   		inputType:'password', 
                allowBlank: false
           })
        },{
           id:'nombre',
           header: 'Nombre',
           dataIndex: 'nombre_usuario',
           width: 150,
           editor: new fm.TextField({
               allowBlank: false
           })
		},{       
           header: 'Apellido paterno',
           dataIndex: 'ap_paterno_usuario',
           width: 150,
           editor: new fm.TextField({
               allowBlank: false
           })
        },{        
           header: 'Apellido materno',
           dataIndex: 'ap_materno_usuario',
           width: 150,
           editor: new fm.TextField({
               allowBlank: false
           })        	   			    
        },{
           header: 'Perfil',
           dataIndex: 'desc_perfil',
           width: 120,
           align:'center',
           editor: new Ext.form.ComboBox({
                store: dsPerfiles,
                displayField: 'desc_perfil',
                valueField: 'idperfil',
                hiddenName: 'idperfil',
                triggerAction: 'all',
                forceSelection:true,
                mode:'remote', 
                editable: false,
                allowBlank: false
            }) 
		},{      
		   header: 'F. creaci&oacute;n',
           dataIndex: 'f_creacion_usuario',
           width: 150,
           type:'datetime',
           renderer: new Ext.util.Format.dateRenderer('d-m-Y h:m:s'), 
           align: 'center',
           hidden: false 
        },{        	
           header: 'Ultimo ingreso',
           dataIndex: 'f_ultimo_ingreso',
           width: 150,
           type:'datetime',
           renderer: new Ext.util.Format.dateRenderer('d-m-Y h:m:s'), 
           align: 'center',
           hidden: false        	
        },{
           header: 'Estado',
           dataIndex: 'flag',
           width: 100,
           align:'center',
           editor: new Ext.form.ComboBox({
                store: store_cbo,
                displayField: 'estado',
                valueField: 'estado',
                hiddenName: 'estado',
                triggerAction: 'all',
                forceSelection:true,
                mode:'local', 
                editable: false,
                allowBlank: false
            })       	
        },{   
           header: 'idusuario',
           dataIndex: 'idusuario',
           width: 95,
           hidden: true,
           editor: new fm.TextField({
                allowBlank: false,
                readOnly: true
            })
        }
    ]);

    cm.defaultSortable = true;
    

            
    var Usuario = Ext.data.Record.create([
           {name: 'login'},
           {name: 'clave'},
           {name: 'nombre_usuario', type: 'string'},
           {name: 'ap_paterno_usuario', type: 'string'},
           {name: 'ap_materno_usuario', type: 'string'},
           {name: 'desc_perfil'},
           {name: 'flag'}
      ]);

    // create the Data Store
    var store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'p_lista_usuarios.php?caso=1', waitMsg: 'Buscando...'}),
        reader: new Ext.data.JsonReader({root: 'lista',totalProperty: 'total'},[
	        {name:'idusuario'},
	        {name:'login'},
	        {name:'clave'},
	        {name:'nombre_usuario'},
	        {name:'ap_paterno_usuario'},
	        {name:'ap_materno_usuario'},
	        {name:'f_creacion_usuario', type: 'date', dateFormat: 'Y-m-d H:i:s'},
	        {name:'f_ultimo_ingreso', type: 'date', dateFormat: 'Y-m-d H:i:s'},
	        {name:'desc_perfil'},
	        {name:'flag'}	        
        ]),
        remoteSort: false
    });

    var grid = new Ext.grid.EditorGridPanel({
        store: store,
        cm: cm,
        width:900,
        height:350,
        //autoExpandColumn:'desc_grupo',
        frame:false,
        loadMask: true,
        clicksToEdit:1,
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false}),    
        tbar: [{
            text: 'Agregar',
            iconCls:'add',
            handler : function(){
                var p = new Usuario({                       	
                    login:'',
                    clave	:'',
                    nombre_usuario	:'',
                    ap_paterno_usuario: '',
                    ap_materno_usuario:'',
                    desc_perfil	:'',
                    flag	:'', 
                    nuevo	:'si'
                });
                grid.stopEditing();
                store.insert(0, p);
                grid.startEditing(0, 0);
            }
        },'-',{
            text:'Eliminar',
            iconCls:'del',
            handler: handleDelete
        },'-','  ',txtBuscado,'  ',btnbuscar]
    });

	store.load({params:{n:1}}); 	

    function handleDelete() {
        var selectedKeys = grid.selModel.selections.keys;
        if(selectedKeys.length > 0) {
            Ext.Msg.confirm('ALERTA!','Realmente desea eliminar el registro?', deleteRecord);
        } else {
            Ext.Msg.alert('ALERTA!','Seleccione un registro para eliminar');
        }
    };

    function deleteRecord(btn) {
        if (btn=='yes') {
        	var j_idusuario =$F('idusuario'); 
        	var m = grid.getSelections();
			var selectedKeys=m[0].get("idusuario"); 	     	
        	
            var selectedRow = grid.getSelectionModel().getSelected();
			
            if(selectedRow){
                store.remove(selectedRow);
            }

            Ext.Ajax.request({
                url: 'p_mtto_usuarios.php',
                params: {
                    idusuario	:selectedKeys,
                    idusuario_logeado:j_idusuario,	
                    tarea		:'borrar'
                },
                callback: function (options, success, response) {
                    if (success) {}
                    else {
                        Ext.MessageBox.alert('Intentelo nuevamente. [Q304]',response.responseText);
                    }
                },

                success:function(response,options){
                	if(response.responseText==2) Ext.MessageBox.alert('AVISO','Este producto no puede ser eliminado porque ya registra movimiento en los almacenes.');
                    store.reload();
                }
            });
        };
    };
    
    function handleEdit(editEvent) {
        isNew = editEvent.record.data.nuevo;
        var j_idusuario_logeado =$F('idusuario'); 
        if(isNew == 'si'){        	     	        	
            var NewUsuario  	= editEvent.record.data.login;
            var NewClave		= editEvent.record.data.clave;
            var NewNombre       = editEvent.record.data.nombre_usuario;
            var NewApellidop  	= editEvent.record.data.ap_paterno_usuario;
            var NewApellidom	= editEvent.record.data.ap_materno_usuario;
            var NewPerfil		= editEvent.record.data.desc_perfil;
            var NewEstado		= editEvent.record.data.flag;
            
            if(NewUsuario != '' && NewClave != '' && NewNombre != '' && NewApellidop != '' && NewApellidom != '' && NewPerfil != '' && NewEstado != ''){
                Ext.Ajax.request({
                    url: 'p_mtto_usuarios.php',
                    method: 'POST',
                       params: {
                       	tarea:		'nuevo',
                        usuariox:	NewUsuario,
                        clavex: 	NewClave,
                        nombrex:	NewNombre,
                        apellidopx:	NewApellidop,
                        apellidomx:	NewApellidom,
                        perfilx:	NewPerfil,
                        estadox: 	NewEstado,
                        idusuario_logeado:j_idusuario_logeado
                    },
                    success:function(response,options){
                    	if(response.responseText!=2){
		                      if(response.responseText!=2){
		                        var newID = Ext.util.JSON.decode(newID);
		                        editEvent.record.id = newID;
		                        editEvent.record.set('nuevo','no');
		                        editEvent.record.set('id',newID);
		                        store.commitChanges();
		                        store.reload(); 
		                        Ext.Msg.alert('Ok','Registro Ingresado');
		                      }else{
		                        Ext.Msg.alert('ALERTA','No se pudo agregar el usuario. Por favor verifique que no se repita el Usuario');
		                      }
                    	}else{
                    			Ext.Msg.alert('ALERTA','No se pudo agregar el usuario. Por favor verifique que no se repita el Usuario');
                    			
                    	}	                      
                    }
                });
            }
        }else{
            var NewId        	= editEvent.record.data.idusuario;
            var NewUsuario  	= editEvent.record.data.login;
            var NewClave		= editEvent.record.data.clave;
            var NewNombre       = editEvent.record.data.nombre_usuario;
            var NewApellidop  	= editEvent.record.data.ap_paterno_usuario;
            var NewApellidom	= editEvent.record.data.ap_materno_usuario;
            var NewPerfil		= editEvent.record.data.desc_perfil;
            var NewEstado		= editEvent.record.data.flag;

            if(NewUsuario != '' && NewClave != '' && NewNombre != '' && NewApellidop != '' && NewApellidom != '' && NewPerfil != '' && NewEstado != ''){
                Ext.Ajax.request({
                    url: 'p_mtto_usuarios.php',
                    method: 'POST',
                       params: {
                       	tarea:'modificar',
                        idusuariox:	NewId,
                        usuariox:	NewUsuario,
                        clavex: 	NewClave,
                        nombrex:	NewNombre,
                        apellidopx:	NewApellidop,
                        apellidomx:	NewApellidom,
                        perfilx:	NewPerfil,
                        estadox: 	NewEstado,
                        idusuario_logeado:j_idusuario_logeado
                    },
                    failure:function(response,options){
                        Ext.Msg.alert('Error','Problemas cargando datos.');
                    },
                    success:function(response,options){
                    	if(response.responseText==1){
                        	store.commitChanges();
                        	store.reload();
                        	Ext.Msg.alert('Ok','Registro Actualizado');
                    	}else if(response.responseText==2){
                    		Ext.Msg.alert('ALERTA','El dato usuario es incorrecto, esta vacio o esta ingresando caracteres no permitidos. Recuerde la longitud del dato esde minimo 3 caracteres y maximo 10');
                    		
                    	}else if(response.responseText==3){
                    		Ext.Msg.alert('ALERTA','El dato clave es incorrecto, esta vacio o esta ingresando caracteres no permitidos. Recuerde la longitud del dato esde minimo 3 caracteres y maximo 15');
                    		
                    	}else if(response.responseText==4){
                    		Ext.Msg.alert('ALERTA','El dato nombre es incorrecto, esta vacio o esta ingresando caracteres no permitidos. Recuerde la longitud del dato esde minimo 3 caracteres y maximo 30');
                    		
                    	}else if(response.responseText==5){
                    		Ext.Msg.alert('ALERTA','El dato apellido paterno es incorrecto, esta vacio o esta ingresando caracteres no permitidos. Recuerde la longitud del dato esde minimo 3 caracteres y maximo 30');
                    		
                    	}else if(response.responseText==6){
                    		Ext.Msg.alert('ALERTA','El dato apellido materno es incorrecto, esta vacio o esta ingresando caracteres no permitidos. Recuerde la longitud del dato esde minimo 3 caracteres y maximo 30');
                    		
                    	}else if(response.responseText==9){
                    		Ext.Msg.alert('ALERTA','Hay un error grave, comuniquese con el administrador del sistema');
                    		
                    	}
                    }
                });
            }
        }
    }
    
    grid.on('afteredit', handleEdit);
    
	txtBuscado.on('change', Buscar);
	function Buscar(){
    	var buscar=Ext.get("v1").getValue();
		if(txtBuscado.validate()==true){
	    	store.proxy= new Ext.data.HttpProxy({url: 'p_lista_usuarios.php?n=2&buscar='+buscar});
	    	store.load();
    	}else{
	    	store.proxy= new Ext.data.HttpProxy({url: 'p_lista_usuarios.php?n=1'});
	    	store.load();    		
    		Ext.get("v1").focus();
    	}
    }
    
    /* *************************************************************************************************** */
    /* Datos para la visualizacion en el viewport
    /* *************************************************************************************************** */

	var panel = new Ext.Panel({
	    id:'images-view',
	    frame:true,
	    width:1200,
	    height:350,
	    collapsible:false,
	    layout:'fit',
	    title:'MODULO -> MANTENIMIENTO DE USUARIOS',
	    items: grid
	});	     
    
    
        
	elemento=Ext.getDom('contenido');
	panel.render(elemento) ;	
         
});