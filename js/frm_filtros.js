Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

function filtros(texto1){
		
	Ext.QuickTips.init();
		
	var nfecha1, nfecha2,n1,fs;
	var perfil	=Ext.getDom('perfil').value;
	
  	
	//*****************************************************************************************//
	//	Defino parametros iniciales de acuerdo al perfil
	//*****************************************************************************************//

	if(perfil==2){			// Administrador
		n1=55;
	}

	//definimos las caja de texto y los calendarios
    var xf_ini=new Ext.form.DateField({
        fieldLabel	:'Fecha Ini.',
        id			:'fecha1',
        name		:'fecha1',
        width		:110,
        format		:'d-m-Y',
        renderer	:function(value) { return value ? new Date(value).dateFormat('d.m.Y') : ''; },
        renderTo	:'f_ini',
        allowBlank	:false
    }); 	

    var xf_fin=new Ext.form.DateField({
        fieldLabel	:'Fecha Fin.',
        id			:'fecha2',
        name		:'fecha2',
        width		:110,
        format		:'d-m-Y',        
        renderer	:function(value) { return value ? new Date(value).dateFormat('d.m.Y') : ''; },        
        renderTo	:'f_fin',
        allowBlank	:false
    });     
    
	//*****************************************************************************************//
	//	Definimos las acciones que se ejecutaran al presionar el boton consultar
	//*****************************************************************************************//

	//var acciones1=function(){
	function acciones1(){
	
		if(perfil==2){			// Administrador
			nfecha1			=document.getElementById('fecha1').value;
			nfecha2			=document.getElementById('fecha2').value;					

			if(nfecha1=='' || nfecha2==''){
				Ext.MessageBox.alert('Mensaje','Debe seleccionar todos los criterios del filtro');
			}
		}
		fs.form.reset();

	};
	
	//definimos las acciones a realizar en caso de error 
	var error1=function (result,request) {  
		Ext.MessageBox.alert('Error', 'Falla de Formulario');  
   	};
   	


    //definimos una seccion para mostrar los combos y anotaciones
	var xfiltros=new Ext.form.FieldSet({
        title		:'Filtros',
        autoHeight	:true,
        defaultType	:'textfield',
        items: [
			xf_ini, xf_fin
        ],
        buttonAlign	:'center',
        buttons:[{
            text	:'Consultar',
			id		:'btnconsultar',
            handler	:acciones1,
			failure	:error1,
			hidden	:true    				
		}]

    });    
  
  	
    var xtexto=new Ext.form.FieldSet({
        title		:'Informaci&oacute;n',
        autoHeight	:true,
        defaultType	:'textfield',
        html		:texto1+'<br><br>',
        hidden		:false
	});
	

	var jusuario	=Ext.getDom('usuario').value;
	var jnom_perfil	=Ext.getDom('nom_perfil').value;
	
    var datos_usuario=new Ext.form.FieldSet({
        title		:'Datos de usuario',
        autoHeight	:true,
        defaultType	:'textfield',
        html		:'<table width=200 border=0 ><tr><td width=80>&nbsp;Usuario  </td><td>'+jusuario+'</td></tr><tr><td>&nbsp;Perfil  </td><td>'+jnom_perfil+'</td></tr></table>',
        hidden		:false
	});	
	
	/*
	fs = new Ext.FormPanel({
        frame		:true,        
        labelAlign	:'right',
        labelWidth	:n1,
        width		:200,
        waitMsgTarget: true,
        renderTo	:'filtros',
        items: [
           xfiltros, xtexto,datos_usuario
        ]
        
    });			
*/

    
    //return fs;
 }