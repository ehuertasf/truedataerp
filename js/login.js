
Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

Ext.onReady(function(){
	var Formulario = new Ext.form.FormPanel({
		baseCls: 'x-plain',
		labelWidth: 55,
		id: 'frm1',
		defaultType: 'textfield',	
		items: [{
				fieldLabel:'Usuario',
				id		:'usr1',
				name	:'login_usuario',				
				anchor	:'90%'
			},{
				fieldLabel: 'Clave',
				id: 'clv1',
				inputType :'password',
				name: 'pwd_clave',		
				anchor: '90%' 
		}]
	});   
	

	window.onload=function(){
		document.getElementById('usr1').focus();	
	}
	
	var Ventana = new Ext.Window({
		title: 'TrueData ERP',
		width: 300,
		height:150,
		minWidth: 300,
		minHeight: 150,
		layout: 'fit',
		plain:true,
		id: 'LoginWin',
		bodyStyle:'padding:5px;',
		buttonAlign:'center',
		items: Formulario,
		buttons: [{
				text: 'Ingresar',
				handler: Ingresar
			},{
				text: 'Cancelar',
				handler: function(){
				Ventana.close();
			}
		}]
	});

	Ventana.show();
	


	function Ingresar(oBtn, oObj) {
        try{
            var j_usuario	=Ext.getCmp("usr1").getValue();
            var j_clave		=Ext.getCmp("clv1").getValue();

            Ext.Ajax.request({
                waitMsg: 'Login...',
                url: 'php_procesos/p_valida_usuario.php',
                method: 'POST',
                params: {
                    usuario	: j_usuario,
                    clave	: j_clave
                },
                failure:function(response,options){
                    Ext.MessageBox.alert('Error al logearse','No se pudo conectar con el servidor...');
                },
                success:function(response,options){
                    var Id=response.responseText;
                    if(Id!=2){
                        document.location='home.php?idsess='+Id;
                    }else{
                        document.location='login.php';
                    }

                }
            });
        }catch(e){

        }
	}
	
});