/**
 * @author Bedwer
 */
var newValue,oldValue;
var alto=23;

var swClienteModem,swSearchModem,IdElPadreModem,NomElPadreModem,IdClienteModem,NomClienteModem;		//modem
var swDocsisModem,IdDocsisModem,MacDocsisModem;														//DocsisModem
var swAccionModem='',swEditModem=0,IdEditModem=0;															//modem
var swSearchTap,IdElPadreTap,NomElPadreTap;															//tap
var swAccionTap='',swEditTap=0,IdEditTap=0;															//tap
var swSearchAmplificador,IdElPadreAmplificador,NomElPadreAmplificador;								//amplificador
var swAccionAmplif='',swEditAmplif=0,IdEditAmplif=0;												//amplificador
var swSearchNodo,IdElPadreNodo,NomElPadreNodo,swAreaNodo,IdAreaNodo,NomAreaNodo;					//nodo
var swAccionNodo='',swEditNodo=0,IdEditNodo=0;														//nodo
var swSearchHub,IdElPadreHub,NomElPadreHub;															//hub
var swSearchHub2,IdElPadreHub2,NomElPadreHub2;														//hub
var swAccionHub='',swEditHub=0,IdEditHub=0;															//hub
var swAccionCabecera='',swEditCabecera=0,IdEditCabecera=0;

	function limpiar_cabecera(){
		swEditCabecera=0;
		IdEditCabecera=0;
		cboEditCabecera.reset();
		Ext.getCmp("IdfrmCabecera").getForm().reset();
	};

	function nuevoCabecera(){
		cboEditCabecera.setVisible(false);
		item6.collapse();
		Ext.getCmp('btnGrabarCabecera').setVisible(true);
		Ext.getCmp('btnLimpiarCabecera').setVisible(true);
		Ext.getCmp('btnEliminarCabecera').setVisible(false);
		limpiar_cabecera();
		swAccionCabecera='nuevo';
		Ext.getCmp("IdOpcionesCabecera").setText('<b>Nuevo</b>');
		frmCabecera.setDisabled(false);															
		item6.expand();
	};

	function editarCabecera(){
		cboEditCabecera.setVisible(true);
		Ext.getCmp('btnGrabarCabecera').setVisible(true);
		Ext.getCmp('btnLimpiarCabecera').setVisible(true);
		Ext.getCmp('btnEliminarCabecera').setVisible(true);
		frmCabecera.disable();
		limpiar_cabecera();
		swAccionCabecera='editar';
		Ext.getCmp("IdOpcionesCabecera").setText('<b>Editar</b>');
	};

	function limpiar_Hub(){
		swEditHub	= 0;
		IdEditHub	= 0
		cboEditHub.removeClass('ok');
		cboEditHub.reset();

		swSearchHub		= 0;
		IdElPadreHub	= 0;
		NomElPadreHub	= '';
		cboSearchHub.removeClass('ok');
									
		swSearchHub2 	= 0;
		IdElPadreHub2	= 0;
		NomElPadreHub2	= '';
		cboSearchHub2.removeClass('ok');
		Ext.getCmp("IdfrmHub").getForm().reset();
	};

	function nuevoHub(){
		cboEditHub.setVisible(false);
		item5.collapse();
		Ext.getCmp('btnGrabarHub').setVisible(true);
		Ext.getCmp('btnLimpiarHub').setVisible(true);
		Ext.getCmp('btnEliminarHub').setVisible(false);
		limpiar_Hub();
		swAccionHub='nuevo';
		Ext.getCmp("IdOpcionesHub").setText('<b>Nuevo</b>');
		frmHub.setDisabled(false);															
		item5.expand();
	};

	function editarHub(){
		cboEditHub.setVisible(true);
		Ext.getCmp('btnGrabarHub').setVisible(true);
		Ext.getCmp('btnLimpiarHub').setVisible(true);
		Ext.getCmp('btnEliminarHub').setVisible(true);
		frmHub.disable();
		limpiar_Hub();
		swAccionHub='editar';
		Ext.getCmp("IdOpcionesHub").setText('<b>Editar</b>');
	};

	function limpiar_Nodo(){
		swEditNodo	= 0;
		IdEditNodo	= 0
		cboEditNodo.removeClass('ok');
		cboEditNodo.reset();

		swSearchNodo	= 0;
		IdElPadreNodo	= 0;
		NomElPadreNodo	= '';
		cboSearchNodo.removeClass('ok');
									
		swAreaNodo 	= 0;
		IdAreaNodo	= 0;
		NomAreaNodo	= '';
		cboSearchAreaNodo.removeClass('ok');

		Ext.getCmp("IdfrmNodo").getForm().reset();
	};

	function nuevoNodo(){
		cboEditNodo.setVisible(false);
		item4.collapse();
		Ext.getCmp('btnGrabarNodo').setVisible(true);
		Ext.getCmp('btnLimpiarNodo').setVisible(true);
		Ext.getCmp('btnEliminarNodo').setVisible(false);
		limpiar_Nodo();
		swAccionNodo='nuevo';
		Ext.getCmp("IdOpcionesNodo").setText('<b>Nuevo</b>');
		frmNodo.setDisabled(false);															
		item4.expand();
	};

	function editarNodo(){
		cboEditNodo.setVisible(true);
		Ext.getCmp('btnGrabarNodo').setVisible(true);
		Ext.getCmp('btnLimpiarNodo').setVisible(true);
		Ext.getCmp('btnEliminarNodo').setVisible(true);
		frmNodo.disable();
		limpiar_Nodo();
		swAccionNodo='editar';
		Ext.getCmp("IdOpcionesNodo").setText('<b>Editar</b>');
	};

	function limpiar_Amplif(){
		swEditAmplif	= 0;
		IdEditAmplif	= 0
		cboEditAmplif.removeClass('ok');
		cboEditAmplif.reset();

		swSearchAmplificador	= 0;
		IdElPadreAmplificador	= 0;
		NomElPadreAmplificador	= '';
		cboSearchAmplif.removeClass('ok');
									
		/*swAreaAmplif 	= 0;
		IdAreaAmplif	= 0;
		NomAreaAmplif	= '';
		cboSearchAreaAmplif.removeClass('ok');
		*/
		Ext.getCmp("IdfrmAmplif").getForm().reset();
	};

	function nuevoAmplif(){
		cboEditAmplif.setVisible(false);
		item3.collapse();
		Ext.getCmp('btnGrabarAmplif').setVisible(true);
		Ext.getCmp('btnLimpiarAmplif').setVisible(true);
		Ext.getCmp('btnEliminarAmplif').setVisible(false);
		limpiar_Amplif();
		swAccionAmplif='nuevo';
		Ext.getCmp("IdOpcionesAmplif").setText('<b>Nuevo</b>');
		frmAmplif.setDisabled(false);															
		item3.expand();
	};

	function editarAmplif(){
		cboEditAmplif.setVisible(true);
		Ext.getCmp('btnGrabarAmplif').setVisible(true);
		Ext.getCmp('btnLimpiarAmplif').setVisible(true);
		Ext.getCmp('btnEliminarAmplif').setVisible(true);
		frmAmplif.disable();
		limpiar_Amplif();
		swAccionAmplif='editar';
		Ext.getCmp("IdOpcionesAmplif").setText('<b>Editar</b>');
	};

	function limpiar_Tap(){
		swEditTap	= 0;
		IdEditTap	= 0
		cboEditTap.removeClass('ok');
		cboEditTap.reset();

		swSearchTap	= 0;
		IdElPadreTap	= 0;
		NomElPadreTap	= '';
		cboSearchTap.removeClass('ok');
									
		/*swAreaTap 	= 0;
		IdAreaTap	= 0;
		NomAreaTap	= '';
		cboSearchAreaTap.removeClass('ok');
		*/
		Ext.getCmp("IdfrmTap").getForm().reset();
	};

	function nuevoTap(){
		cboEditTap.setVisible(false);
		item2.collapse();
		Ext.getCmp('btnGrabarTap').setVisible(true);
		Ext.getCmp('btnLimpiarTap').setVisible(true);
		Ext.getCmp('btnEliminarTap').setVisible(false);
		limpiar_Tap();
		swAccionTap='nuevo';
		Ext.getCmp("IdOpcionesTap").setText('<b>Nuevo</b>');
		frmTap.setDisabled(false);															
		item2.expand();
	};

	function editarTap(){
		cboEditTap.setVisible(true);
		Ext.getCmp('btnGrabarTap').setVisible(true);
		Ext.getCmp('btnLimpiarTap').setVisible(true);
		Ext.getCmp('btnEliminarTap').setVisible(true);
		frmTap.disable();
		limpiar_Tap();
		swAccionTap='editar';
		Ext.getCmp("IdOpcionesTap").setText('<b>Editar</b>');
	};


	function limpiar_Modem(){
		swEditModem	= 0;
		IdEditModem	= 0
		cboEditModem.removeClass('ok');
		cboEditModem.reset();
		
		swDocsisModem	= 0;
		IdDocsisModem	= 0;
		MacDocsisModem	= '';
		cboDocsisModem.removeClass('ok');

		swSearchModem	= 0;
		IdElPadreModem	= 0;
		NomElPadreModem	= '';
		cboSearchModem.removeClass('ok');
									
		Ext.getCmp("IdfrmModem").getForm().reset();
	};

	function nuevoModem(){
		cboEditModem.setVisible(false);
		item1.collapse();
		Ext.getCmp('btnGrabarModem').setVisible(true);
		Ext.getCmp('btnLimpiarModem').setVisible(true);
		Ext.getCmp('btnEliminarModem').setVisible(false);
		limpiar_Modem();
		swAccionModem='nuevo';
		Ext.getCmp("IdOpcionesModem").setText('<b>Nuevo</b>');
		frmModem.setDisabled(false);															
		item1.expand();
	};

	function editarModem(){
		cboEditModem.setVisible(true);
		Ext.getCmp('btnGrabarModem').setVisible(true);
		Ext.getCmp('btnLimpiarModem').setVisible(true);
		Ext.getCmp('btnEliminarModem').setVisible(true);
		frmModem.disable();
		limpiar_Modem();
		swAccionModem='editar';
		Ext.getCmp("IdOpcionesModem").setText('<b>Editar</b>');
	};


	function graba_cabecera(nro_n){
		var flag=0;
		var lat=trim(Ext.getDom('txtLatitud').value);
		var lon=trim(Ext.getDom('txtLongitud').value);
		if ( checkEstadoCabecera.getValue()==true) flag=1;
		if (lat=='' || lon=='') {alert ('Georeferencia no valida');return;}
		if (trim(txtNomCabecera.getValue())=='' || trim(txtDirCabecera.getValue())=='') {alert ('Datos incompletos');return;}
		if (swAccionCabecera == 'editar' && IdEditCabecera == 0) {alert('Cabecera seleccionada, no es válida');return;}
			
		Ext.Ajax.request({
			url: 'query_procesos.php',
			method: 'POST',
			params: {
						n			: nro_n,
						nom_cabecera: trim(txtNomCabecera.getValue()),
						estado		: flag,
						dir_cabecera: trim(txtDirCabecera.getValue()),
						lat			: lat,
						lon			: lon,
						accion		: swAccionCabecera,
						ideditar	: IdEditCabecera
			},
			success: function(result, request){
					var respuesta = result.responseText;
					alert(respuesta);
					if (swAccionCabecera=='nuevo') nuevoCabecera();
					if (swAccionCabecera=='editar') editarCabecera();
				},
			failure: function(result, request){Ext.MessageBox.alert('Fallo', 'Error al grabar Cabecera');}
		});
	};
		
	function graba_hub(nro_n){
			var flag=0;
			var flagRedundancia=0;
			var lat=trim(Ext.getDom('txtLatitud').value);
			var lon=trim(Ext.getDom('txtLongitud').value);
			if ( checkEstadoHub.getValue()==true) flag=1;
			if ( checkRedundanciaHub.getValue()==true) flagRedundancia=1;
			if (lat=='' || lon=='') {alert ('Georeferencia no valida');return;}
			if (	trim( txtNomHub.getValue())=='' || 
					trim( txtFecInstalHub.getValue())=='' || 
					trim( txtDirHub.getValue())=='' ||
					trim( txtReferenciaDirHub.getValue())=='' ||
					trim( txtUbicacionHub.getValue())=='' ||
					trim( cboERedHub.getValue())=='' ||
					trim( cboSearchHub.getValue())=='') {alert ('Datos incompletos');return;}
			if (txtPuertosRxFHub.isValid()==false || 
				txtPuertosTxFHub.isValid()==false || 
				txtPuertosRxRHub.isValid()==false ||  
				txtPuertosTxRHub.isValid()==false ) {alert ('Numero de puertos no valido');return;}
			if (checkRedundanciaHub.getValue()==true &&	(cboSearchHub2.isValid()==false || cboERedHub2.isValid()==false) ) {alert('Datos de redundancia no valida');return;}
			if (swAccionHub == 'editar' && IdEditHub == 0) {alert('Hub seleccionada, no es válida');return;}
			
			Ext.Ajax.request({
					url: 'query_procesos.php',
					method: 'POST',
					params: {
								n				: nro_n,
								estado			: flag,
								redundancia		: flagRedundancia,
								lat				: lat,
								lon				: lon,
								nom_hub			: trim( txtNomHub.getValue()),
								fec_instal		: Ext.getDom('IdtxtFecInstalHub').value,
								dir_hub			: trim( txtDirHub.getValue()),
								dir_ref_hub		: trim( txtReferenciaDirHub.getValue()),
								dir_ubi_hub		: trim( txtUbicacionHub.getValue()),
								obs				: trim( txtObsHub.getValue()),
								puertos_rxF		: trim( txtPuertosRxFHub.getValue()),
								puertos_txF		: trim( txtPuertosTxFHub.getValue()),
								puertos_rxR		: trim( txtPuertosRxRHub.getValue()),
								puertos_txR		: trim( txtPuertosTxRHub.getValue()),
								id_tipo_padre_sec: trim( cboERedHub2.getValue()),
								id_ered_padre_sec: trim( IdElPadreHub2),
								id_tipo_padre	: trim( cboERedHub.getValue()),
								id_ered_padre	: trim( IdElPadreHub),
								accion			: swAccionHub,
								ideditar		: IdEditHub
							},
					success: function(result, request){
						var respuesta = result.responseText;
						alert(respuesta);
						if (swAccionHub=='nuevo') nuevoHub();
						if (swAccionHub=='editar') editarHub();
					},
					failure: function(result, request){Ext.MessageBox.alert('Fallo', 'Error al grabar Hub');}
				});
		};
		
	function graba_nodo(nro_n){
			var flag=0;
			var lat=trim(Ext.getDom('txtLatitud').value);
			var lon=trim(Ext.getDom('txtLongitud').value);

			if ( checkEstadoNodo.getValue()==true) flag=1;
			if (lat=='' || lon=='') {alert ('Georeferencia no valida');return;}
			if (txtPuertosForwardRetornoNodo.isValid()==false || txtPuertosRxNodo.isValid()==false || txtPuertosTxNodo.isValid()==false) {alert ('Numero de puertos no valido');return;}

			if (	trim( txtNomNodo.getValue())=='' || 
					trim( txtFecInstalNodo.getValue())=='' || 
					trim( txtDirNodo.getValue())=='' ||
					trim( txtReferenciaDirNodo.getValue())=='' ||
					trim( txtUbicacionNodo.getValue())=='' ||
					trim( cboSearchAreaNodo.getValue())=='' ||
					trim( txtSerieNodo.getValue())=='' ||
					trim( cboMarcaNodo.getValue())=='' ||
					trim( cboModeloNodo.getValue())=='' ||
					trim( cboERedNodo.getValue())=='' ||
					trim( cboSearchNodo.getValue())=='') {alert ('Datos incompletos');return;}

			if (txtPuertosForwardRetornoNodo.isValid()==false || 
				txtPuertosRxNodo.isValid()==false || 
				txtPuertosTxNodo.isValid()==false) {alert ('Numero de puertos no valido');return;}

			if (swAccionNodo == 'editar' && IdEditNodo == 0) {alert('Nodos seleccionado, no es válido');return;}

			Ext.Ajax.request({
					url: 'query_procesos.php',
					method: 'POST',
					params: {
								n				: nro_n,
								estado			: flag,
								lat				: lat,
								lon				: lon,
								nom_nodo		: trim( txtNomNodo.getValue()),
								fec_instal		: Ext.getDom('IdtxtFecInstalNodo').value,
								dir_nodo		: trim( txtDirNodo.getValue()),
								dir_ref_nodo	: trim( txtReferenciaDirNodo.getValue()),
								dir_ubi_nodo	: trim( txtUbicacionNodo.getValue()),
								id_area_nodo	: trim( IdAreaNodo ),
								serie_nodo		: trim( txtSerieNodo.getValue()),
								puertos_fr		: trim( txtPuertosForwardRetornoNodo.getValue()),
								puertos_rx		: trim( txtPuertosRxNodo.getValue()),
								puertos_tx		: trim( txtPuertosTxNodo.getValue()),
								id_marca		: trim( cboMarcaNodo.getValue()),
								id_modelo 		: trim( cboModeloNodo.getValue()),
								id_tipo_padre	: trim( cboERedNodo.getValue()),
								id_ered_padre	: trim( IdElPadreNodo),
								accion			: swAccionNodo,
								ideditar		: IdEditNodo
							},
					success: function(result, request){
						var respuesta = result.responseText;
						alert(respuesta);
						if (swAccionNodo=='nuevo') nuevoNodo();
						if (swAccionNodo=='editar') editarNodo();
					},
					failure: function(result, request){Ext.MessageBox.alert('Fallo', 'Error al grabar Nodo');}
			});
				
		};
		
	function graba_amplificador(nro_n){
			var flag=0;
			var lat=trim(Ext.getDom('txtLatitud').value);
			var lon=trim(Ext.getDom('txtLongitud').value);

			if ( checkEstadoAmplif.getValue()==true) flag=1;
			if (lat=='' || lon=='') {alert ('Georeferencia no valida');return;}
				
			if (	trim( txtNomAmplif.getValue())=='' || 
					trim( txtFecInstalAmplif.getValue())=='' || 
					trim( txtDirAmplif.getValue())=='' ||
					trim( txtReferenciaDirAmplif.getValue())=='' ||
					trim( txtUbicacionAmplif.getValue())=='' ||
					trim( txtSerieAmplif.getValue())=='' ||
					trim( cboBorneAmplif.getValue())=='' ||
					trim( cboMarcaAmplif.getValue())=='' ||
					trim( cboModeloAmplif.getValue())=='' ||
					trim( cboERedAmplif.getValue())=='' ||
					trim( cboSearchAmplif.getValue())=='') {alert ('Datos incompletos');return;}
			if (swAccionAmplif == 'editar' && IdEditAmplif == 0) {alert('Amplificador seleccionado, no es válido');return;}
			
			Ext.Ajax.request({
					url: 'query_procesos.php',
					method: 'POST',
					params: {
								n				: nro_n,
								estado			: flag,
								lat				: lat,
								lon				: lon,
								nom_amplif		: trim( txtNomAmplif.getValue()),
								fec_instal		: Ext.getDom('IdtxtFecInstalAmplif').value,
								dir_amplif		: trim( txtDirAmplif.getValue()),
								dir_ref_amplif	: trim( txtReferenciaDirAmplif.getValue()),
								dir_ubi_amplif	: trim( txtUbicacionAmplif.getValue()),
								serie_amplif	: trim( txtSerieAmplif.getValue()),
								num_puertos		: trim( cboBorneAmplif.getValue()),
								id_marca		: trim( cboMarcaAmplif.getValue()),
								id_modelo 		: trim( cboModeloAmplif.getValue()),
								id_tipo_padre	: trim( cboERedAmplif.getValue()),
								id_ered_padre	: trim( IdElPadreAmplificador),
								accion			: swAccionAmplif,
								ideditar		: IdEditAmplif
							},
					success: function(result, request){
						var respuesta = result.responseText;
						alert(respuesta);
						if (swAccionAmplif=='nuevo') nuevoAmplif();
						if (swAccionAmplif=='editar') editarAmplif();
					},
					failure: function(result, request){Ext.MessageBox.alert('Fallo', 'Error al grabar Amplificador');}
				});
		};
		
	function graba_tap(nro_n){
			var flag=0;
			var lat=trim(Ext.getDom('txtLatitud').value);
			var lon=trim(Ext.getDom('txtLongitud').value);

			if ( checkEstadoTap.getValue()==true) flag=1;
			if (lat=='' || lon=='') {alert ('Georeferencia no valida');return;}
				
			if (	trim( txtNomTap.getValue())=='' || 
					trim( txtFecInstalTap.getValue())=='' || 
					trim( txtDirTap.getValue())=='' ||
					trim( txtReferenciaDirTap.getValue())=='' ||
					trim( txtUbicacionTap.getValue())=='' ||
					trim( txtSerieTap.getValue())=='' ||
					trim( cboBorneTap.getValue())=='' ||
					trim( cboMarcaTap.getValue())=='' ||
					trim( cboModeloTap.getValue())=='' ||
					trim( cboERedTap.getValue())=='' ||
					trim( cboSearchTap.getValue())=='') {alert ('Datos incompletos');return;
				}else	alert ('Datos completos');

			Ext.Ajax.request({
					url: 'query_procesos.php',
					method: 'POST',
					params: {
								n				: nro_n,
								estado			: flag,
								lat				: lat,
								lon				: lon,
								nom_tap			: trim( txtNomTap.getValue()),
								fec_instal		: Ext.getDom('IdtxtFecInstalTap').value,
								dir_tap			: trim( txtDirTap.getValue()),
								dir_ref_tap		: trim( txtReferenciaDirTap.getValue()),
								dir_ubi_tap		: trim( txtUbicacionTap.getValue()),
								serie_tap		: trim( txtSerieTap.getValue()),
								num_bornes		: trim( cboBorneTap.getValue()),
								id_marca		: trim( cboMarcaTap.getValue()),
								id_modelo 		: trim( cboModeloTap.getValue()),
								id_tipo_padre	: trim( cboERedTap.getValue()),
								id_ered_padre	: trim( IdElPadreTap),
								accion			: swAccionTap,
								ideditar		: IdEditTap
							},
					success: function(result, request){
						var respuesta = result.responseText;
						alert(respuesta);
						if (swAccionTap=='nuevo') nuevoTap();
						if (swAccionTap=='editar') editarTap();
					},
					failure: function(result, request){Ext.MessageBox.alert('Fallo', 'Error al grabar Tap');}
				});
		};
		
	function graba_modem(nro_n){
			var flag=0;
			var lat=trim(Ext.getDom('txtLatitud').value);
			var lon=trim(Ext.getDom('txtLongitud').value);

			if ( checkEstadoModem.getValue()==true) flag=1;
			if (lat=='' || lon=='') {alert ('Georeferencia no valida');return;}
				
			if (	trim( txtNomModem.getValue())=='' || 
					trim( txtFecInstalModem.getValue())=='' || 
					trim( txtMacModem.getValue())=='' ||
					trim( cboDocsisModem.getValue())=='' ||
					trim( cboMarcaModem.getValue())=='' ||
					trim( cboModeloModem.getValue())=='' ||
					trim( cboERedModem.getValue())=='' ||
					trim( cboSearchModem.getValue())=='') {alert ('Datos incompletos');return;
				}else	alert ('Datos completos');

			Ext.Ajax.request({
					url: 'query_procesos.php',
					method: 'POST',
					params: {
								n				: nro_n,
								estado			: flag,
								lat				: lat,
								lon				: lon,
								nom_modem		: trim( txtNomModem.getValue()),
								fec_instal		: Ext.getDom('IdtxtFecInstalModem').value,
								mac				: trim( txtMacModem.getValue()),
								id_cliente		: trim( IdDocsisModem),
								id_marca		: trim( cboMarcaModem.getValue()),
								id_modelo 		: trim( cboModeloModem.getValue()),
								id_tipo_padre	: trim( cboERedModem.getValue()),
								id_ered_padre	: trim( IdElPadreModem),
								accion			: swAccionModem,
								ideditar		: IdEditModem
							},
					success: function(result, request){
						var respuesta = result.responseText;
						alert(respuesta);
						if (swAccionModem=='nuevo') nuevoModem();
						if (swAccionModem=='editar') editarModem();
					},
					failure: function(result, request){Ext.MessageBox.alert('Fallo', 'Error al grabar Cable Modem');}
				});
		};


store_marca	= new Ext.data.Store({			
			proxy		: new Ext.data.HttpProxy({url: "query_combos.php?n=1"}),
			reader		: new Ext.data.JsonReader({root: 'marca'}, [
					        {name: 'id_marca', mapping: 'id_marca'},
					        {name: 'desc_marca', mapping: 'desc_marca'}
						    ]),
			autoLoad	:true
});

store_modelo=new Ext.data.Store({			
			proxy		: new Ext.data.HttpProxy({url: "query_combos.php?n=2"}),
			reader		: new Ext.data.JsonReader({root: 'modelo'}, [
					        {name: 'id_modelo', mapping: 'id_modelo'},
					        {name: 'desc_modelo', mapping: 'desc_modelo'}
						    ]),
			autoLoad	:true
});


TplEditCabecera = new Ext.XTemplate(
        '<tpl for="."><div class="search-item">',
            '<h3>{nom_cabecera}</h3>',
        '</div></tpl>'
);
ds_EditCabecera = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'query_combos.php?n=44'}),
        reader: new Ext.data.JsonReader({
            root			: 'results',
            totalProperty	: 'totalCount'
        }, [	{name: 'id_cabecera', mapping: 'id_cabecera'},
            	{name: 'nom_cabecera', mapping: 'nom_cabecera'},
				{name: 'direccion', mapping: 'direccion'},
				{name: 'latitud', mapping: 'latitud'},
				{name: 'longitud', mapping: 'longitud'},
				{name: 'id_ered', mapping: 'id_ered'},
				{name: 'flag', mapping: 'flag'}
        ])
});

ds_EditCabecera.on('beforeload', function() {
		ds_EditCabecera.baseParams = {	query	: cboEditCabecera.getValue(),
										ered	: 6};
   });	



TplEditHub = new Ext.XTemplate(
        '<tpl for="."><div class="search-item">',
            '<h3>{nom_hub}</h3>',
        '</div></tpl>'
);
ds_EditHub = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'query_combos.php?n=44'}),
        reader: new Ext.data.JsonReader({
            root			: 'results',
            totalProperty	: 'totalCount'
        }, [	{name: 'id_hub', mapping: 'id_hub'},
				{name: 'nom_hub', mapping: 'nom_hub'},
				{name: 'direccion', mapping: 'direccion'},
				{name: 'direccion_referencial', mapping: 'direccion_referencial'},
				{name: 'ubicacion_referencial', mapping: 'ubicacion_referencial'},
				{name: 'latitud', mapping: 'latitud'},
				{name: 'longitud', mapping: 'longitud'},
				{name: 'fec_instalacion', mapping: 'fec_instalacion'},
				{name: 'rx_f', mapping: 'rx_f'},
				{name: 'tx_f', mapping: 'tx_f'},
				{name: 'rx_r', mapping: 'rx_r'},
				{name: 'tx_r', mapping: 'tx_r'},
				{name: 'redundancia', mapping: 'redundancia'},
				{name: 'id_ered_redundancia', mapping: 'id_ered_redundancia'},
				{name: 'id_ered_padre_redundancia', mapping: 'id_ered_padre_redundancia'},
				{name: 'id_ered', mapping: 'id_ered'},
				{name: 'id_ered_padre', mapping: 'id_ered_padre'},
				{name: 'nom_padre', mapping: 'nom_padre'},
				{name: 'nom_padre_redun', mapping: 'nom_padre_redun'},
				{name: 'obs', mapping: 'obs'},
				{name: 'flag', mapping: 'flag'}
        ])
});
ds_EditHub.on('beforeload', function() {
		ds_EditHub.baseParams = {	query	: cboEditHub.getValue(),
									ered	: 5};
   });	


TplEditNodo = new Ext.XTemplate(
        '<tpl for="."><div class="search-item">',
            '<h3>{nom_nodo}</h3>',
        '</div></tpl>'
);
ds_EditNodo = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'query_combos.php?n=44'}),
        reader: new Ext.data.JsonReader({
            root			: 'results',
            totalProperty	: 'totalCount'
        }, [	{name: 'id_nodo', mapping: 'id_nodo'},
				{name: 'nom_nodo', mapping: 'nom_nodo'},
				{name: 'direccion', mapping: 'direccion'},
				{name: 'direccion_referencial', mapping: 'direccion_referencial'},
				{name: 'ubicacion_referencial', mapping: 'ubicacion_referencial'},
				{name: 'latitud', mapping: 'latitud'},
				{name: 'longitud', mapping: 'longitud'},
				{name: 'fec_instalacion', mapping: 'fec_instalacion'},
				{name: 'num_serie', mapping: 'num_serie'},
				{name: 'num_puertos_fr', mapping: 'num_puertos_fr'},
				{name: 'rx', mapping: 'rx'},
				{name: 'tx', mapping: 'tx'},
				{name: 'id_modelo', mapping: 'id_modelo'},
				{name: 'id_marca', mapping: 'id_marca'},
				{name: 'id_ered', mapping: 'id_ered'},
				{name: 'id_ered_padre', mapping: 'id_ered_padre'},
				{name: 'id_area_nodo', mapping: 'id_area_nodo'},
				{name: 'nom_padre', mapping: 'nom_padre'},
				{name: 'flag', mapping: 'flag'},
				{name: 'desc_area_nodo', mapping: 'desc_area_nodo'},
				{name: 'color_area', mapping: 'color_area'},
				{name: 'transparencia_area', mapping: 'transparencia_area'},
				{name: 'color_linea', mapping: 'color_linea'},
				{name: 'transparencia_linea', mapping: 'transparencia_linea'},
				{name: 'ancho_linea', mapping: 'ancho_linea'},
				{name: 'puntos', mapping: 'puntos'},
        ])
});
ds_EditNodo.on('beforeload', function() {
		ds_EditNodo.baseParams = {	query	: cboEditNodo.getValue(),
									ered	: 4};
   });	

TplEditAmplif = new Ext.XTemplate(
        '<tpl for="."><div class="search-item">',
            '<h3>{nom_amplificador}</h3>',
        '</div></tpl>'
);
ds_EditAmplif = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'query_combos.php?n=44'}),
        reader: new Ext.data.JsonReader({
            root			: 'results',
            totalProperty	: 'totalCount'
        }, [	{name: 'id_amplificador', mapping: 'id_amplificador'},
				{name: 'nom_amplificador', mapping: 'nom_amplificador'},
				{name: 'direccion', mapping: 'direccion'},
				{name: 'direccion_referencial', mapping: 'direccion_referencial'},
				{name: 'ubicacion_referencial', mapping: 'ubicacion_referencial'},
				{name: 'latitud', mapping: 'latitud'},
				{name: 'longitud', mapping: 'longitud'},
				{name: 'fec_instalacion', mapping: 'fec_instalacion'},
				{name: 'num_serie', mapping: 'num_serie'},
				{name: 'num_puertos', mapping: 'num_puertos'},
				{name: 'id_modelo', mapping: 'id_modelo'},
				{name: 'id_marca', mapping: 'id_marca'},
				{name: 'id_ered', mapping: 'id_ered'},
				{name: 'id_ered_padre', mapping: 'id_ered_padre'},
				{name: 'flag', mapping: 'flag'},
				{name: 'nom_padre', mapping: 'nom_padre'}
        ])
});
ds_EditAmplif.on('beforeload', function() {
		ds_EditAmplif.baseParams = {	query	: cboEditAmplif.getValue(),
										ered	: 3};
});	


TplEditTap = new Ext.XTemplate(
        '<tpl for="."><div class="search-item">',
            '<h3>{nom_tap}</h3>',
        '</div></tpl>'
);
ds_EditTap = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'query_combos.php?n=44'}),
        reader: new Ext.data.JsonReader({
            root			: 'results',
            totalProperty	: 'totalCount'
        }, [	{name: 'id_tap', mapping: 'id_tap'},
				{name: 'nom_tap', mapping: 'nom_tap'},
				{name: 'cant_borne', mapping: 'cant_borne'},
				{name: 'direccion', mapping: 'direccion'},
				{name: 'direccion_referencial', mapping: 'direccion_referencial'},
				{name: 'ubicacion_referencial', mapping: 'ubicacion_referencial'},
				{name: 'longitud', mapping: 'longitud'},
				{name: 'latitud', mapping: 'latitud'},
				{name: 'fec_instalacion', mapping: 'fec_instalacion'},
				{name: 'num_serie', mapping: 'num_serie'},
				{name: 'id_modelo', mapping: 'id_modelo'},
				{name: 'id_marca', mapping: 'id_marca'},
				{name: 'id_ered', mapping: 'id_ered'},
				{name: 'id_ered_padre', mapping: 'id_ered_padre'},
				{name: 'flag', mapping: 'flag'},
				{name: 'nom_padre', mapping: 'nom_padre'}
        ])
});
ds_EditTap.on('beforeload', function() {
		ds_EditTap.baseParams = {	query	: cboEditTap.getValue(),
									ered	: 2};
   });	


TplEditModem = new Ext.XTemplate(
        '<tpl for="."><div class="search-item">',
            '<h3>{nom_cable_modem}</h3>',
        '</div></tpl>'
);
ds_EditModem = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'query_combos.php?n=44'}),
        reader: new Ext.data.JsonReader({
            root			: 'results',
            totalProperty	: 'totalCount'
        }, [	{name: 'id_cable_modem', mapping: 'id_cable_modem'},
				{name: 'nom_cable_modem', mapping: 'nom_cable_modem'},
				{name: 'num_mac', mapping: 'num_mac'},
				{name: 'latitud', mapping: 'latitud'},
				{name: 'longitud', mapping: 'longitud'},
				{name: 'fec_instalacion', mapping: 'fec_instalacion'},
				{name: 'id_cliente', mapping: 'id_cliente'},
				{name: 'id_modelo', mapping: 'id_modelo'},
				{name: 'id_marca', mapping: 'id_marca'},
				{name: 'id_ered', mapping: 'id_ered'},
				{name: 'id_ered_padre', mapping: 'id_ered_padre'},
				{name: 'flag', mapping: 'flag'},
				{name: 'nom_padre', mapping: 'nom_padre'}
        ])
});
ds_EditModem.on('beforeload', function() {
		ds_EditModem.baseParams = {	query	: cboEditModem.getValue(),
									ered	: 1};
   });	


ds_AreaNodo = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'query_combos.php?n=6'}),
        reader: new Ext.data.JsonReader({
            root			: 'area_nodo',
            totalProperty	: 'totalCount',
            id				: 'id'
        }, [	{name: 'id', mapping: 'id'},
            	{name: 'id_area_nodo', mapping: 'id_area_nodo'},
				{name: 'desc_area_nodo', mapping: 'desc_area_nodo'},
				{name: 'color_area', mapping: 'color_area'},
				{name: 'transparencia_area', mapping: 'transparencia_area'},
				{name: 'color_linea', mapping: 'color_linea'},
				{name: 'transparencia_linea', mapping: 'transparencia_linea'},
				{name: 'ancho_linea', mapping: 'ancho_linea'},
				{name: 'puntos', mapping: 'puntos'}
        ])
});

ds_AreaNodo.on('beforeload', function() {
		ds_Nodo.baseParams = {	query	: cboSearchAreaNodo.getValue()};
});	

ds_Hub = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'query_combos.php?n=4'}),
        reader: new Ext.data.JsonReader({
            root			: 'results',
            totalProperty	: 'totalCount',
            id				: 'id'
        }, [	{name: 'id', mapping: 'id'},
            	{name: 'descripcion', mapping: 'descripcion'}
        ])
});

ds_Hub.on('beforeload', function() {
		ds_Hub.baseParams = {	query	: cboSearchHub.getValue(),
								ered	: cboERedHub.getValue()};
   });	

ds_Hub2 = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'query_combos.php?n=4'}),
        reader: new Ext.data.JsonReader({
            root			: 'results',
            totalProperty	: 'totalCount',
            id				: 'id'
        }, [	{name: 'id', mapping: 'id'},
            	{name: 'descripcion', mapping: 'descripcion'}
        ])
});

ds_Hub2.on('beforeload', function() {
		ds_Hub2.baseParams = {	query	: cboSearchHub2.getValue(),
								ered	: cboERedHub2.getValue()};
   });	

ds_Nodo = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'query_combos.php?n=4'}),
        reader: new Ext.data.JsonReader({
            root			: 'results',
            totalProperty	: 'totalCount',
            id				: 'id'
        }, [	{name: 'id', mapping: 'id'},
            	{name: 'descripcion', mapping: 'descripcion'}
        ])
});

ds_Nodo.on('beforeload', function() {
		ds_Nodo.baseParams = {	query	: cboSearchNodo.getValue(),
								ered	: cboERedNodo.getValue()};
   });	

ds_Amplif = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'query_combos.php?n=4'}),
        reader: new Ext.data.JsonReader({
            root			: 'results',
            totalProperty	: 'totalCount',
            id				: 'id'
        }, [	{name: 'id', mapping: 'id'},
            	{name: 'descripcion', mapping: 'descripcion'}
        ])
});

ds_Amplif.on('beforeload', function() {
		ds_Amplif.baseParams = {	query	: cboSearchAmplif.getValue(),
									ered	: cboERedAmplif.getValue()};
   });	
   
ds_Tap = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'query_combos.php?n=4'}),
        reader: new Ext.data.JsonReader({
            root			: 'results',
            totalProperty	: 'totalCount',
            id				: 'id'
        }, [	{name: 'id', mapping: 'id'},
            	{name: 'descripcion', mapping: 'descripcion'}
        ])
});

ds_Tap.on('beforeload', function() {
		ds_Tap.baseParams = {	query	: cboSearchTap.getValue(),
								ered	: cboERedTap.getValue()};
   });	
   
ds_Modem = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'query_combos.php?n=4'}),
        reader: new Ext.data.JsonReader({
            root			: 'results',
            totalProperty	: 'totalCount',
            id				: 'id'
        }, [	{name: 'id', mapping: 'id'},
            	{name: 'descripcion', mapping: 'descripcion'}
        ])
});

ds_Modem.on('beforeload', function() {
		ds_Modem.baseParams = {	query	: cboSearchModem.getValue(),
								ered	: cboERedModem.getValue()};
   });	

ds_Cliente = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'query_combos.php?n=5'}),
        reader: new Ext.data.JsonReader({
            root			: 'cliente',
            totalProperty	: 'totalCount',
            id				: 'id_cliente'
        }, [	{name: 'id_cliente', mapping: 'id_cliente'},
            	{name: 'nom', mapping: 'nom'},
				{name: 'desc_tipo_doc', mapping: 'desc_tipo_doc'},
				{name: 'num_documento', mapping: 'num_documento'},
				{name: 'desc_distrito', mapping: 'desc_distrito'}
        ])
});

ds_Cliente.on('beforeload', function() {
		ds_Cliente.baseParams = {	query	: cboClienteModem.getValue()};
   });
   
ds_DocsisModem = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'query_combos.php?n=55'}),
        reader: new Ext.data.JsonReader({
            root			: 'docsis_modem',
            totalProperty	: 'totalCount'
        }, [	{name: 'serialnum', mapping: 'serialnum'},
            	{name: 'modem_macaddr', mapping: 'modem_macaddr'}
        ])
});



ds_DocsisModem.on('beforeload', function() {
		ds_DocsisModem.baseParams = {	query	: cboDocsisModem.getValue()};
   });


   
   
   
TplCliente = new Ext.XTemplate(
        '<tpl for="."><div class="search-item">',
            '<h3><span>{desc_distrito}</span>{desc_tipo_doc} : {num_documento}</h3>',
            '{nom}',
        '</div></tpl>'
    );
TplDocsisModem = new Ext.XTemplate(
        '<tpl for="."><div class="search-item">',
            '<h3><span>{modem_macaddr}</span>{desc_tipo_doc}{serialnum}</h3>',
        '</div></tpl>'
    );


resultTpl = new Ext.XTemplate(
        '<tpl for="."><div class="search-item">',
            '<h3>{descripcion}</h3>',
        '</div></tpl>'
);

TplAreaNodo = new Ext.XTemplate(
        '<tpl for="."><div class="search-item">',
            '<h3>{desc_area_nodo}</h3>',
        '</div></tpl>'
);


function registro_ered(flag){
		switch (flag){
		case 'cabecera'	: 
			txtNomCabecera = new Ext.form.TextField({
				id				: 'IdtxtNomCabecera',
				name			: 'nom_cabecera',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Nombre',
				labelSeparator	: '',
				height			: 18,
				anchor			: '99%'
			});
			
			txtDirCabecera = new Ext.form.TextField({
				id				:'IdtxtDirCabecera',
				name			: 'direccion',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Direcci&oacute;n',
				labelSeparator	: '',
				height			: 18,
				anchor			: '99%'
			});
			
			checkEstadoCabecera = new Ext.form.Checkbox({
				name		:'flag',
				boxLabel :'Estado',
				hideLabel: true,
				checked:true,
				disabled:true
			});
			
			cboEditCabecera = new Ext.form.ComboBox({
			 	id				: 'IdcboEditCabecera',
				name			: 'IdcboEditCabecera',
		        store			: ds_EditCabecera,
				fieldLabel		: 'ddd',
		        loadingText		: 'Searching...',
		        anchor			: '99%',
		        pageSize		: 10,
				hidden 			: true,
		        tpl				: TplEditCabecera,
		        itemSelector	: 'div.search-item',
		        onSelect		: function(record){
									item6.collapse();
									Ext.getCmp("IdfrmCabecera").getForm().loadRecord(record);
									swEditCabecera=1;
									IdEditCabecera	= record.data.id_cabecera;
									cboEditCabecera.setValue(record.data.nom_cabecera);
									cboEditCabecera.collapse();
									cboEditCabecera.addClass('ok');
									frmCabecera.enable();
									punto(record.data.latitud,record.data.longitud);
									item6.expand();
							      },
				forceSelection	: true,
				lazyRender 		: true,
		        selectOnFocus	: true,
				hideTrigger		: false,
				typeAhead		: true
		    });
				
			cboEditCabecera.on('blur',function(obj){
				newValue=obj.getValue();
				if (swEditCabecera==1){	obj.addClass('ok');	}
	
				if (newValue==oldValue && newValue!=''){
					obj.addClass('ok');swEditCabecera=1;
				}
	
				if (obj.getValue()=='' || swEditCabecera!=1 ) {
					obj.setValue('');
					IdEditCabecera	= '';
					obj.removeClass('ok');
				}
				swEditCabecera=0;
			});
	
			cboEditCabecera.on('focus',function(obj){
					obj.removeClass('ok');
					oldValue=obj.getValue();
			});
	
			cboEditCabecera.on('beforequery',function(obj){
				if (trim(obj.query) == '' ) {
					cboEditCabecera.collapse();
					return false;
				}
			});	
			
			frmCabecera = new Ext.FormPanel({
				id				: 'IdfrmCabecera',
				frame			: false,        
				autoWidth		: true,
				autoHeight		: true,
				labelAlign		: 'top',
				labelWidth		: 55,
				waitMsgTarget	: true,
				border			: false,
				disabled 		: true,
				 bodyStyle 			: 'margin: 5px 5px 5px 5px',
				items			: [{	layout:'column',
						            	border:false,
										height:alto,
						                items:[{	columnWidth	: .40,
									                layout		: 'form',
													border		: false,
													labelAlign	: 'left',
									                defaults	: {height:18},
									                defaultType	: 'textfield'
												},{	columnWidth	: .44,
									                layout		: 'form',
													border		: false,
									                labelAlign	: 'left',
													defaults	: {height:18},
									                defaultType	: 'textfield'
												},{	columnWidth	: .16,
									                layout		: 'form',
													border		: false,
									                labelAlign	: 'left',
									                items		: [ checkEstadoCabecera]
												}]},txtNomCabecera,txtDirCabecera]
			});
			return frmCabecera ;break;

	case 'hub'	: 
			
			cboEditHub = new Ext.form.ComboBox({
			 	id				: 'IdcboEditHub',
				name			: 'IdcboEditHub',
		        store			: ds_EditHub,
				fieldLabel		: 'ddd',
		        loadingText		: 'Searching...',
		        anchor			: '99%',
		        pageSize		: 10,
				hidden 			: true,
		        tpl				: TplEditHub,
		        itemSelector	: 'div.search-item',
		        onSelect		: function(record){
									item5.collapse();
									Ext.getCmp("IdfrmHub").getForm().loadRecord(record);
									swEditHub=1;
									IdEditHub	= record.data.id_hub;
									cboEditHub.setValue(record.data.nom_hub);
									cboEditHub.collapse();
									cboEditHub.addClass('ok');
									
									swSearchHub=1;
									IdElPadreHub	= record.data.id_ered_padre;
									NomElPadreHub	= record.data.nom_padre;
									cboSearchHub.addClass('ok');
									
									swSearchHub2 =1;
									IdElPadreHub2	= record.data.id_ered_padre_redundancia;
									NomElPadreHub2	= record.data.nom_padre_redun;
									cboSearchHub2.addClass('ok');
									
									frmHub.enable();
									punto(record.data.latitud,record.data.longitud);
									item5.expand();
							      },
				forceSelection	: true,
				lazyRender 		: true,
		        selectOnFocus	: true,
				hideTrigger		: false,
				typeAhead		: true
		    });
				
	
			cboEditHub.on('blur',function(obj){
				newValue=obj.getValue();
				if (swEditHub==1){	obj.addClass('ok');	}
	
				if (newValue==oldValue && newValue!=''){
					obj.addClass('ok');swEditHub=1;
				}
	
				if (obj.getValue()=='' || swEditHub!=1 ) {
					obj.setValue('');
					IdEditHub	= '';
					obj.removeClass('ok');
				}
				swEditHub=0;
			});
	
			cboEditHub.on('focus',function(obj){
					obj.removeClass('ok');
					oldValue=obj.getValue();
			});
	
	
			cboEditHub.on('beforequery',function(obj){
				if (trim(obj.query) == '' ) {
					cboEditHub.collapse();
					return false;
				}
			});	
			
			txtNomHub = new Ext.form.TextField({
				id				: 'IdtxtNomHub',
				name			: 'nom_hub',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Nombre',
				labelSeparator	: '',
				anchor			: '99%'
			});
			
			txtFecInstalHub = new Ext.form.DateField({
				id			: 'IdtxtFecInstalHub',
				name		: 'fec_instalacion',
				fieldLabel  : 'Fec.Inst.',
				//format		: 'd-m-Y',
				format		: 'Y-m-d',
				anchor		: '95%',
				readOnly  	:true
		    });
		
			txtDirHub = new Ext.form.TextField({
				id				: 'IdtxtDirHub',
				name			: 'direccion',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Direcci&oacute;n',
				labelSeparator	: '',
				anchor			: '99%'
			});

			txtReferenciaDirHub = new Ext.form.TextField({
				id				: 'IdtxtReferenciaDirHub',
				name			: 'direccion_referencial',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Referencia',
				labelSeparator	: '',
				anchor			: '99%'

			});

			txtUbicacionHub = new Ext.form.TextField({
				id				: 'IdtxtUbicacionHub',
				name			: 'ubicacion_referencial',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Ubicaci&oacute;n',
				labelSeparator	: '',
				anchor			: '99%'
			});			

			txtObsHub = new Ext.form.TextArea({
				id				: 'IdtxtObsHub',
				name			: 'obs',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Observaciones',
				labelSeparator	: '',
				anchor			: '99%'
			});

 			Ext.namespace('Ext.rxF_Hub');
			Ext.rxF_Hub.states = [['1'],['2']];    
			store_rxF_Hub = new Ext.data.SimpleStore({fields: ['rxF_Hub'],data : Ext.rxF_Hub.states});
			
			txtPuertosRxFHub	= new Ext.form.ComboBox({
				id				: 'IdtxtPuertosRxFHub',
				name			: 'rx_f',
				store			: store_rxF_Hub,		
				fieldLabel		: 'Rx(F)',
				labelSeparator	: '',
				editable		: false,
				allowBlank		: false,
				minLength		: 1,
				//emptyText		: 'Seleccionar...', 
				valueField		: 'rxF_Hub',
				anchor			: '99%',
				mode			: 'local',		
				displayField	: 'rxF_Hub',
				triggerAction	: 'all',
				forceSelection	: true,
				hideTrigger 	: false, 
				lazyRender 		: true,
		        selectOnFocus	: true,
				typeAhead		: true
			});

			Ext.namespace('Ext.txF_Hub');
			Ext.txF_Hub.states = [['1'],['2'],['3'],['4'],['5'],['6'],['7'],['8'],['9'],['10'],['11'],['12'],['13'],['14']];    
			store_txF_Hub = new Ext.data.SimpleStore({fields: ['txF_Hub'],data : Ext.txF_Hub.states});
			
			txtPuertosTxFHub	= new Ext.form.ComboBox({
				id				: 'IdtxtPuertosTxFHub',
				name			: 'tx_f',
				store			: store_txF_Hub,		
				fieldLabel		: 'Tx(F)',
				labelSeparator	: '',
				editable		: false,
				allowBlank		: false,
				minLength		: 1,
				//emptyText		: 'Seleccionar...', 
				valueField		: 'txF_Hub',
				anchor			: '99%',
				mode			: 'local',		
				displayField	: 'txF_Hub',
				triggerAction	: 'all',
				forceSelection	: true,
				hideTrigger 	: false, 
				lazyRender 		: true,
		        selectOnFocus	: true,
				typeAhead		: true
			});
			
			Ext.namespace('Ext.rxR_Hub');
			Ext.rxR_Hub.states = [['1'],['2'],['3'],['4'],['5'],['6'],['7'],['8'],['9'],['10'],['11'],['12'],['13'],['14'],
								  ['15'],['16'],['17'],['18'],['19'],['20'],['21'],['22'],['23'],['24'],['25'],['26'],['27'],['28']];    
			store_rxR_Hub = new Ext.data.SimpleStore({fields: ['rxR_Hub'],data : Ext.rxR_Hub.states});
			
			txtPuertosRxRHub	= new Ext.form.ComboBox({
				id				: 'IdtxtPuertosRxRHub',
				name			: 'rx_r',
				store			: store_rxR_Hub,		
				fieldLabel		: 'Rx(R)',
				labelSeparator	: '',
				editable		: false,
				allowBlank		: false,
				minLength		: 1,
				//emptyText		: 'Seleccionar...', 
				valueField		: 'rxR_Hub',
				anchor			: '99%',
				mode			: 'local',		
				displayField	: 'rxR_Hub',
				triggerAction	: 'all',
				forceSelection	: true,
				hideTrigger 	: false, 
				lazyRender 		: true,
		        selectOnFocus	: true,
				typeAhead		: true
			});

			Ext.namespace('Ext.txR_Hub');
			Ext.txR_Hub.states = [['1'],['2'],['3'],['4'],['5'],['6'],['7'],['8'],['9'],['10'],['11'],['12'],['13'],['14']];    
			store_txR_Hub = new Ext.data.SimpleStore({fields: ['txR_Hub'],data : Ext.txR_Hub.states});
			
			txtPuertosTxRHub	= new Ext.form.ComboBox({
				id				: 'IdtxtPuertosTxRHub',
				name			: 'tx_r',
				store			: store_txR_Hub,		
				fieldLabel		: 'Tx(R)',
				labelSeparator	: '',
				editable		: false,
				allowBlank		: false,
				minLength		: 1,
				//emptyText		: 'Seleccionar...', 
				valueField		: 'txR_Hub',
				anchor			: '99%',
				mode			: 'local',		
				displayField	: 'txR_Hub',
				triggerAction	: 'all',
				forceSelection	: true,
				hideTrigger 	: false, 
				lazyRender 		: true,
		        selectOnFocus	: true,
				typeAhead		: true
			});

			store_eredHub	= new Ext.data.Store({			
				proxy		: new Ext.data.HttpProxy({url: "query_combos.php?n=3&idered=5,6"}),
				reader		: new Ext.data.JsonReader({root: 'ered'}, [
						        {name: 'id_ered', mapping: 'id_ered'},
						        {name: 'desc_ered', mapping: 'desc_ered'}
							    ]),
				autoLoad	: true
				});
			
			cboERedHub2	= new Ext.form.ComboBox({
				id				: 'IdcboERedHub2',
				name			: 'id_ered_redundancia',
				store			: store_eredHub,
				allowBlank		: false,		
				fieldLabel		: 'Elemento Padre Sec.',
				labelSeparator	: '',
				editable		: false,
				minLength		: 1,
				emptyText		: 'Seleccionar...', 
				valueField		: 'id_ered',
				anchor			: '99%',
				mode			: 'remote',		
				displayField	: 'desc_ered',
				triggerAction	: 'all'
			});

		cboSearchHub2 = new Ext.form.ComboBox({
		 	id				: 'IdcboSearchHub2',
			name			: 'nom_padre_redun',
	        store			: ds_Hub2,
			allowBlank		: false,
			fieldLabel		: 'Id elememto padre sec.',
	        loadingText		: 'Searching...',
	        anchor			: '99%',
	        pageSize		: 10,
	        tpl				: resultTpl,
	        itemSelector	: 'div.search-item',
	        onSelect		: function(record){
								swSearchHub2=1;
								IdElPadreHub2	= record.data.id;
								NomElPadreHub2	= record.data.descripcion;
								cboSearchHub2.setValue(record.data.descripcion);
								cboSearchHub2.collapse();
								cboSearchHub2.addClass('ok');
						      },
			forceSelection	: true,
			lazyRender 		: true,
	        selectOnFocus	: true,
			typeAhead		: true,
			hideTrigger		: true,
			typeAhead		: true
	    });
			
		cboSearchHub2.on('blur',function(obj){
			newValue=obj.getValue();
			if (swSearchHub2==1){	obj.addClass('ok');	}

			if (newValue==oldValue && newValue!=''){
				obj.addClass('ok');swSearchHub2=1;
			}

			if (obj.getValue()=='' || swSearchHub2!=1 ) {
				obj.setValue('');
				IdElPadreHub2	= '';
				NomElPadreHub2	= '';
				obj.removeClass('ok');
			}
			swSearchHub2=0;
		});

		cboSearchHub2.on('focus',function(obj){
				obj.removeClass('ok');
				oldValue=obj.getValue();
		});

		cboSearchHub2.on('beforequery',function(obj){
			if (trim(obj.query) == '' || cboERedHub2.getValue()=='') {
				cboSearchHub2.collapse();
				return false;
			}
		});		
		
		cboERedHub2.on('select',function(combo,record,index){
			cboSearchHub2.setValue('');
			IdElPadreHub2	= '';
			NomElPadreHub2	= '';
			cboSearchHub2.removeClass('ok');
			ds_Hub.removeAll();
		});
			
			cboModeloHub	= new Ext.form.ComboBox({
				id				: 'IdcboModeloHub',
				store			: store_modelo,		
				fieldLabel		: 'Modelo',
				labelSeparator	: '',
				editable		: false,
				minLength		: 1,
				emptyText		: 'Seleccionar...', 
				valueField		: 'id_modelo',
				anchor			: '99%',
				mode			: 'remote',		
				displayField	: 'desc_modelo',
				triggerAction	: 'all'
			});
			
		
		
			cboERedHub	= new Ext.form.ComboBox({
				id				: 'IdcboERedHub',
				name			: 'id_ered',
				store			: store_eredHub,		
				fieldLabel		: 'Elemento Padre',
				labelSeparator	: '',
				editable		: false,
				minLength		: 1,
				emptyText		: 'Seleccionar...', 
				valueField		: 'id_ered',
				anchor			: '99%',
				mode			: 'remote',		
				displayField	: 'desc_ered',
				triggerAction	: 'all'
			});
		
		cboSearchHub = new Ext.form.ComboBox({
		 	id				: 'IdcboSearchHub',
	        name			: 'nom_padre',
			store			: ds_Hub,
			allowBlank		: false,
			fieldLabel		: 'Id elememto padre',
	        loadingText		: 'Searching...',
	        anchor			: '99%',
	        pageSize		: 10,
	        tpl				: resultTpl,
	        itemSelector	: 'div.search-item',
	        onSelect		: function(record){
								swSearchHub=1;
								IdElPadreHub	= record.data.id;
								NomElPadreHub	= record.data.descripcion;
								cboSearchHub.setValue(record.data.descripcion);
								cboSearchHub.collapse();
								cboSearchHub.addClass('ok');
						      },
			forceSelection	: true,
			lazyRender 		: true,
	        selectOnFocus	: true,
			typeAhead		: true,
			hideTrigger		: true,
			typeAhead		: true
	    });
			
		cboSearchHub.on('blur',function(obj){
			newValue=obj.getValue();
			if (swSearchHub==1){	obj.addClass('ok');	}

			if (newValue==oldValue && newValue!=''){
				obj.addClass('ok');swSearchHub=1;
			}

			if (obj.getValue()=='' || swSearchHub!=1 ) {
				obj.setValue('');
				IdElPadreHub	= '';
				NomElPadreHub	= '';
				obj.removeClass('ok');
			}
			swSearchHub=0;
		});

		cboSearchHub.on('focus',function(obj){
				obj.removeClass('ok');
				oldValue=obj.getValue();
		});

		cboSearchHub.on('beforequery',function(obj){
			if (trim(obj.query) == '' || cboERedHub.getValue()=='') {
				cboSearchHub.collapse();
				return false;
			}
		});		
		
		cboERedHub.on('select',function(combo,record,index){
			cboSearchHub.setValue('');
			IdElPadreHub	= '';
			NomElPadreHub	= '';
			cboSearchHub.removeClass('ok');
			ds_Hub.removeAll();
		});		

		 checkEstadoHub = new Ext.form.Checkbox({
			name		: 'flag',
			boxLabel 	: 'Estado',
			hideLabel	: true,
			checked		: true,
			labelAlign	: 'left',
			disabled	: true
		});
		
		checkRedundanciaHub = new Ext.form.Checkbox({
			name		: 'redundancia',
			boxLabel 	: 'Redundancia',
			hideLabel	: true,
			checked		: false,
			listeners	: {
				check: function(obj,checked){
					if (checked == true) 
						Ext.getCmp('IdDatosRedundancia').expand();
					else {
						swSearchHub2	= 0;
						IdElPadreHub2	= '';
						NomElPadreHub2	= '';
						cboSearchHub2.reset();
						cboERedHub2.reset();
						cboSearchHub2.removeClass('ok');
						Ext.getCmp('IdDatosRedundancia').collapse();
					}
				}
			},
			labelAlign:'left'
		});	
		
		frmHub = new Ext.FormPanel({
			id				: 'IdfrmHub',
			frame			: false,        
			autoWidth		: true,
			autoHeight		: true,
			labelWidth		: 55,
			waitMsgTarget	: true,
			border			: false,
			disabled 		: true,
			style			: 'padding:5px 5px 5px 5px',
			items		: [{	layout:'column',
				            	border:false,
								height:alto,
				                items:[{	columnWidth	: .40,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'left',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [txtNomHub]
										},{	columnWidth	: .44,
							                layout		: 'form',
											border		: false,
							                labelAlign	: 'left',
											defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [txtFecInstalHub]
										},{	columnWidth	: .16,
							                layout		: 'form',
											border		: false,
							                labelAlign	: 'left',
							                items		: [ checkEstadoHub]
										}]	
            				},{	layout		: 'column',
				                border		: false,
								height		: alto,
								labelAlign	: 'left',
				                items:[{	columnWidth	: .99,
							                layout		: 'form',
											border		: false,
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [txtDirHub]
										}]	
		            		},{	layout		: 'column',
				                border		: false,
								height		: alto,
								labelAlign	: 'left',
				                items:[{	columnWidth	: .99,
						                	layout		: 'form',
											border		: false,
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [txtReferenciaDirHub]
										}]	
		            		},{	layout		: 'column',
				                border		: false,
								height		: alto,
								labelAlign	: 'left',
				                items:[{	columnWidth	: .99,
							                layout		: 'form',
											border		: false,
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ txtUbicacionHub ]
										}]	
		            		},{	layout	: 'column',
				                border	: false,
								height	: alto+15,
				                items:[{
											columnWidth	: .25,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ txtPuertosRxFHub]
										},{
											columnWidth	: .25,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ txtPuertosTxFHub]
										},{
											columnWidth	: .25,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ txtPuertosRxRHub]
										},{
											columnWidth	: .25,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ txtPuertosTxRHub]
										}]	
			            	},{	layout	: 'column',
				                border	: false,
								height	: alto+15,
				                items	:[{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ cboERedHub]
										},{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ cboSearchHub]
										}]	
			            	},{	layout	: 'column',
				                border	: false,
								height	: alto+30,
				                items	:[{	columnWidth	: .99,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:36},
							                defaultType	: 'textarea',
							                items		: [ txtObsHub]
										}]	
			            	},{	layout		: 'column',
				                border		: false,
								height		: alto,
								labelAlign	: 'left',
				                items:[{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
							                labelAlign	: 'left',
							                items		: [ checkRedundanciaHub]
										}]	
		            		},{
					            xtype:'fieldset',
					            id:'IdDatosRedundancia',
					            title: 'Datos de Redundancia',
					            autoHeight:true,
					            collapsed: true,
					            items :[{	layout	: 'column',
							                border	: false,
											height	: alto+15,
							                items	:[{	columnWidth	: .50,
										                layout		: 'form',
														border		: false,
														labelAlign	: 'top',
										                defaults	: {height:18},
										                defaultType	: 'textfield',
										                items		: [ cboERedHub2]
													},{	columnWidth	: .50,
										                layout		: 'form',
														border		: false,
														labelAlign	: 'top',
										                defaults	: {height:18},
										                defaultType	: 'textfield',
										                items		: [ cboSearchHub2]
													}]	
						            	}
					            ]
					        }
		]
			});
			return frmHub ;break;

			
		case 'nodo'	: 

			cboEditNodo = new Ext.form.ComboBox({
			 	id				: 'IdcboEditNodo',
				name			: 'IdcboEditNodo',
		        store			: ds_EditNodo,
				fieldLabel		: 'ddd',
		        loadingText		: 'Searching...',
		        anchor			: '99%',
		        pageSize		: 10,
				hidden 			: true,
		        tpl				: TplEditNodo,
		        itemSelector	: 'div.search-item',
		        onSelect		: function(record){
									item4.collapse();
									Ext.getCmp("IdfrmNodo").getForm().loadRecord(record);
									swEditNodo=1;
									IdEditNodo	= record.data.id_nodo;
									cboEditNodo.setValue(record.data.nom_nodo);
									cboEditNodo.collapse();
									cboEditNodo.addClass('ok');
									
									swSearchNodo=1;
									IdElPadreNodo	= record.data.id_ered_padre;
									NomElPadreNodo	= record.data.nom_padre;
									cboSearchNodo.addClass('ok');
									
									swAreaNodo =1;
									IdAreaNodo	= record.data.id_area_nodo;
									NomAreaNodo	= record.data.desc_area_nodo;
									cboSearchAreaNodo.addClass('ok');
									
									frmNodo.enable();
									item4.expand();
									var puntosArea = record.data.puntos.split('|');
									if (polygon) map.removeOverlay(polygon);
									punto(record.data.latitud,record.data.longitud);
									area(puntosArea,record.data.color_linea, record.data.ancho_linea, record.data.transparencia_linea, record.data.color_area, record.data.transparencia_area,0,NomAreaNodo,1)
							      },
				forceSelection	: true,
				lazyRender 		: true,
		        selectOnFocus	: true,
				hideTrigger		: false,
				typeAhead		: true
		    });
				
			cboEditNodo.on('blur',function(obj){
				newValue=obj.getValue();
				if (swEditNodo==1){	obj.addClass('ok');	}
	
				if (newValue==oldValue && newValue!=''){
					obj.addClass('ok');swEditNodo=1;
				}
	
				if (obj.getValue()=='' || swEditNodo!=1 ) {
					obj.setValue('');
					IdEditNodo	= '';
					obj.removeClass('ok');
				}
				swEditNodo=0;
			});
	
			cboEditNodo.on('focus',function(obj){
					obj.removeClass('ok');
					oldValue=obj.getValue();
			});
	
			cboEditNodo.on('beforequery',function(obj){
				if (trim(obj.query) == '' ) {
					cboEditNodo.collapse();
					return false;
				}
			});	
		
			txtNomNodo = new Ext.form.TextField({
				id				: 'IdtxtNomNodo',
				name			: 'nom_nodo',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Nombre',
				labelSeparator	: '',
				anchor			: '99%'
			});
			
			txtFecInstalNodo = new Ext.form.DateField({
				id			: 'IdtxtFecInstalNodo',
				name		: 'fec_instalacion',
				fieldLabel  : 'Fec.Inst.',
				format		: 'Y-m-d',
				anchor		: '95%',
				readOnly  	:true
		    });
		
			txtDirNodo = new Ext.form.TextField({
				id				: 'IdtxtDirNodo',
				name			: 'direccion',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Direcci&oacute;n',
				labelSeparator	: '',
				anchor			: '99%'
			});

			txtReferenciaDirNodo = new Ext.form.TextField({
				id				: 'IdtxtReferenciaDirNodo',
				name			: 'direccion_referencial',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Referencia',
				labelSeparator	: '',
				anchor			: '99%'

			});

			txtUbicacionNodo = new Ext.form.TextField({
				id				: 'IdtxtUbicacionNodo',
				name			: 'ubicacion_referencial',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Ubicaci&oacute;n',
				labelSeparator	: '',
				anchor			: '99%'
			});			
			
			txtSerieNodo = new Ext.form.TextField({
				id				: 'IdtxtSerieNodo',
				name			: 'num_serie',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Serie',
				labelSeparator	: '',
				anchor			: '99%'
			});			
			
			Ext.namespace('Ext.PuertosRFNodo');
			Ext.PuertosRFNodo.states = [['1'],['2'],['3'],['4']];    
			store_PuertosRFNodo = new Ext.data.SimpleStore({fields: ['PuertosRFNodo'],data : Ext.PuertosRFNodo.states});
			
			txtPuertosForwardRetornoNodo	= new Ext.form.ComboBox({
				id				: 'IdtxtPuertosForwardRetornoNodo',
				name			: 'num_puertos_fr',
				store			: store_PuertosRFNodo,		
				fieldLabel		: 'Puertos RF',
				labelSeparator	: '',
				editable		: false,
				allowBlank		: false,
				minLength		: 1,
				valueField		: 'PuertosRFNodo',
				anchor			: '99%',
				mode			: 'local',		
				displayField	: 'PuertosRFNodo',
				triggerAction	: 'all',
				forceSelection	: true,
				hideTrigger 	: false, 
				lazyRender 		: true,
		        selectOnFocus	: true,
				typeAhead		: true
			});			
			
/*			txtPuertosRxNodo = new Ext.form.NumberField({
				id				: 'IdtxtPuertosRxNodo',
				emptyText 		: '',
				allowBlank		: false,
				allowDecimals 	: false,
				allowNegative 	: false,
				fieldLabel		: 'Rx Optico',
				labelSeparator	: '',
				maxLength 		: 4,
				minLength 		: 4,
				anchor			: '99%'
			});			
*/
			Ext.namespace('Ext.PuertosRxNodo');
			Ext.PuertosRxNodo.states = [['1'],['2']];    
			store_PuertosRxNodo = new Ext.data.SimpleStore({fields: ['PuertosRxNodo'],data : Ext.PuertosRxNodo.states});
			
			txtPuertosRxNodo	= new Ext.form.ComboBox({
				id				: 'IdtxtPuertosRxNodo',
				name			: 'rx',
				store			: store_PuertosRxNodo,		
				fieldLabel		: 'Rx Optico',
				labelSeparator	: '',
				editable		: false,
				allowBlank		: false,
				minLength		: 1,
				valueField		: 'PuertosRxNodo',
				anchor			: '99%',
				mode			: 'local',		
				displayField	: 'PuertosRxNodo',
				triggerAction	: 'all',
				forceSelection	: true,
				hideTrigger 	: false, 
				lazyRender 		: true,
		        selectOnFocus	: true,
				typeAhead		: true
			});

			Ext.namespace('Ext.PuertosTxNodo');
			Ext.PuertosTxNodo.states = [['0'],['1'],['2']];    
			store_PuertosTxNodo = new Ext.data.SimpleStore({fields: ['PuertosTxNodo'],data : Ext.PuertosTxNodo.states});
			
			txtPuertosTxNodo	= new Ext.form.ComboBox({
				id				: 'IdtxtPuertosTxNodo',
				name			: 'tx',
				store			: store_PuertosTxNodo,		
				fieldLabel		: 'Tx Optico',
				labelSeparator	: '',
				editable		: false,
				allowBlank		: false,
				minLength		: 1,
				//emptyText		: 'Seleccionar...', 
				valueField		: 'PuertosTxNodo',
				anchor			: '99%',
				mode			: 'local',		
				displayField	: 'PuertosTxNodo',
				triggerAction	: 'all',
				forceSelection	: true,
				hideTrigger 	: false, 
				lazyRender 		: true,
		        selectOnFocus	: true,
				typeAhead		: true
			});	

			cboMarcaNodo	= new Ext.form.ComboBox({
				id				: 'IdcboMarcaNodo',
				name			: 'id_marca',
				store			: store_marca,		
				fieldLabel		: 'Marca',
				labelSeparator	: '',
				editable		: true,
				minLength		: 1,
				emptyText		: 'Seleccionar...', 
				valueField		: 'id_marca',
				anchor			: '99%',
				mode			: 'remote',		
				displayField	: 'desc_marca',
				triggerAction	: 'all',
				forceSelection	: true,
				hideTrigger 	: false, 
				lazyRender 		: true,
		        selectOnFocus	: true,
				typeAhead		: true
			});

			cboModeloNodo	= new Ext.form.ComboBox({
				id				: 'IdcboModeloNodo',
				name			: 'id_modelo',
				store			: store_modelo,		
				fieldLabel		: 'Modelo',
				labelSeparator	: '',
				editable		: false,
				minLength		: 1,
				emptyText		: 'Seleccionar...', 
				valueField		: 'id_modelo',
				anchor			: '99%',
				mode			: 'remote',		
				displayField	: 'desc_modelo',
				triggerAction	: 'all'
			});
			
			store_eredNodo	= new Ext.data.Store({			
				proxy		: new Ext.data.HttpProxy({url: "query_combos.php?n=3&idered=5,6"}),
				reader		: new Ext.data.JsonReader({root: 'ered'}, [
						        {name: 'id_ered', mapping: 'id_ered'},
						        {name: 'desc_ered', mapping: 'desc_ered'}
							    ]),
				autoLoad	:true				
			});
			
			
			cboERedNodo	= new Ext.form.ComboBox({
				id				: 'IdcboERedNodo',
				name			: 'id_ered',
				store			: store_eredNodo,		
				fieldLabel		: 'Elemento Padre',
				labelSeparator	: '',
				editable		: false,
				minLength		: 1,
				emptyText		: 'Seleccionar...', 
				valueField		: 'id_ered',
				anchor			: '99%',
				mode			: 'remote',		
				displayField	: 'desc_ered',
				triggerAction	: 'all'
			});
			
			cboSearchAreaNodo = new Ext.form.ComboBox({
			 	id				: 'IdcboSearchAreaNodo',
				name			: 'desc_area_nodo',
		        store			: ds_AreaNodo,
				fieldLabel		: 'Area del Nodo',
		        loadingText		: 'Searching...',
		        anchor			: '99%',
		        pageSize		: 10,
		        tpl				: TplAreaNodo,
		        itemSelector	: 'div.search-item',
		        onSelect		: function(record){
									swAreaNodo=1;
									IdAreaNodo	=	record.data.id_area_nodo;
									NomAreaNodo	=	record.data.desc_area_nodo;
									cboSearchAreaNodo.setValue(record.data.desc_area_nodo);
									cboSearchAreaNodo.collapse();
									cboSearchAreaNodo.addClass('ok');
									var puntosArea = record.data.puntos.split('|');
									if (polygon) map.removeOverlay(polygon);
									area(puntosArea,record.data.color_linea, record.data.ancho_linea, record.data.transparencia_linea, record.data.color_area, record.data.transparencia_area,0,NomAreaNodo,1)
									
							      },
				forceSelection	: true,
				lazyRender 		: true,
		        selectOnFocus	: true,
				typeAhead		: true,
				hideTrigger		: true,
				typeAhead		: true
		    });
		
		 cboSearchAreaNodo.on('blur',function(obj){
				newValue=obj.getValue();
				if (swAreaNodo==1){	obj.addClass('ok');	}
	
				if (newValue==oldValue && newValue!=''){
					obj.addClass('ok'); swAreaNodo=1;
				}

				if (obj.getValue()=='' || swAreaNodo!=1 ) {
					obj.setValue('');
					IdAreaNodo	= '';
					NomAreaNodo	= '';
					obj.removeClass('ok');
				}
				swAreaNodo=0;
			});
	
			cboSearchAreaNodo.on('focus',function(obj){
					obj.removeClass('ok');
					oldValue=obj.getValue();
			});
			
		 cboSearchNodo = new Ext.form.ComboBox({
		 	id				: 'IdcboSearchNodo',
			name			: 'nom_padre',
	        store			: ds_Nodo,
			fieldLabel		: 'Id elememto padre',
	        loadingText		: 'Searching...',
	        anchor			: '99%',
	        pageSize		: 10,
	        tpl				: resultTpl,
	        itemSelector	: 'div.search-item',
	        onSelect		: function(record){
								swSearchNodo=1;
								IdElPadreNodo	= record.data.id;
								NomElPadreNodo	= record.data.descripcion;
								cboSearchNodo.setValue(record.data.descripcion);
								cboSearchNodo.collapse();
								cboSearchNodo.addClass('ok');
						      },
			forceSelection	: true,
			lazyRender 		: true,
	        selectOnFocus	: true,
			typeAhead		: true,
			hideTrigger		: true,
			typeAhead		: true
	    });
			

		cboSearchNodo.on('blur',function(obj){
			newValue=obj.getValue();
			if (swSearchNodo==1){	obj.addClass('ok');	}

			if (newValue==oldValue && newValue!=''){
				obj.addClass('ok');swSearchNodo=1;
			}

			if (obj.getValue()=='' || swSearchNodo!=1 ) {
				obj.setValue('');
				IdElPadreNodo	= '';
				NomElPadreNodo	= '';
				obj.removeClass('ok');
			}
			swSearchNodo=0;
		});

		cboSearchNodo.on('focus',function(obj){
				obj.removeClass('ok');
				oldValue=obj.getValue();
		});

		cboSearchNodo.on('beforequery',function(obj){
			if (trim(obj.query) == '' || cboERedNodo.getValue()=='') {
				cboSearchNodo.collapse();
				return false;
			}
		});		
		
		cboERedNodo.on('select',function(combo,record,index){
			cboSearchNodo.setValue('');
			IdElPadreNodo	= '';
			NomElPadreNodo	= '';
			cboSearchNodo.removeClass('ok');
			ds_Nodo.removeAll();
		});		
		
		checkEstadoNodo = new Ext.form.Checkbox({
			name		: 'flag',
			boxLabel 	: 'Estado',
			hideLabel	: true,
			checked		: true,
			labelAlign	: 'left',
			disabled	: true
		});
		
		frmNodo = new Ext.FormPanel({
			id				: 'IdfrmNodo',
			frame			: false,        
			autoWidth		: true,
			autoHeight		: true,
			labelWidth		: 55,
			waitMsgTarget	: true,
			border			: false,
			disabled 		: true,
			style			: 'padding:5px 5px 5px 5px',
			items		: [{	layout:'column',
				            	border:false,
								height:alto,
				                items:[{	columnWidth	: .40,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'left',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [txtNomNodo]
										},{	columnWidth	: .44,
							                layout		: 'form',
											border		: false,
							                labelAlign	: 'left',
											defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [txtFecInstalNodo]
										},{	columnWidth	: .16,
							                layout		: 'form',
											border		: false,
							                labelAlign	: 'left',
							                items		: [ checkEstadoNodo]
										}]	
            				},{	layout		: 'column',
				                border		: false,
								height		: alto,
								labelAlign	: 'left',
				                items:[{	columnWidth	: .99,
							                layout		: 'form',
											border		: false,
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [txtDirNodo]
										}]	
		            		},{	layout		: 'column',
				                border		: false,
								height		: alto,
								labelAlign	: 'left',
				                items:[{	columnWidth	: .99,
						                	layout		: 'form',
											border		: false,
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [txtReferenciaDirNodo]
										}]	
		            		},{	layout		: 'column',
				                border		: false,
								height		: alto,
								labelAlign	: 'left',
				                items:[{	columnWidth	: .99,
							                layout		: 'form',
											border		: false,
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ txtUbicacionNodo ]
										}]	
		            		},{	layout		: 'column',
				                border		: false,
								height		: alto,
								labelAlign	: 'left',
				                items:[{	columnWidth	: .99,
							                layout		: 'form',
											labelWidth	: 90,
											border		: false,
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ cboSearchAreaNodo ]
										}]	
		            		},{	layout	: 'column',
				                border	: false,
								height	: alto+15,
				                items:[{	columnWidth	: .34,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ txtSerieNodo]
										},{
											columnWidth	: .22,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ txtPuertosForwardRetornoNodo]
										},{
											columnWidth	: .22,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ txtPuertosRxNodo]
										},{
											columnWidth	: .22,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ txtPuertosTxNodo]
										}]	
			            	},{	layout	: 'column',
				                border	: false,
								height	: alto+15,
				                items	:[{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ cboMarcaNodo]
										},{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ cboModeloNodo]
										}]	
			            	},{	layout	: 'column',
				                border	: false,
								height	: alto+15,
				                items	:[{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ cboERedNodo]
										},{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ cboSearchNodo]
										}]	
			            	}]
			});
			return frmNodo ;break;
		case 'amplificador'	: 

			cboEditAmplif = new Ext.form.ComboBox({
			 	id				: 'IdcboEditAmplif',
				name			: 'IdcboEditAmplif',
		        store			: ds_EditAmplif,
				fieldLabel		: 'ddd',
		        loadingText		: 'Searching...',
		        anchor			: '99%',
		        pageSize		: 10,
				hidden 			: true,
		        tpl				: TplEditAmplif,
		        itemSelector	: 'div.search-item',
		        onSelect		: function(record){
									item3.collapse();
									Ext.getCmp("IdfrmAmplif").getForm().loadRecord(record);
									swEditAmplif=1;
									IdEditAmplif	= record.data.id_amplificador;
									cboEditAmplif.setValue(record.data.nom_amplificador);
									cboEditAmplif.collapse();
									cboEditAmplif.addClass('ok');
									
									swSearchAmplificador=1;
									IdElPadreAmplificador	= record.data.id_ered_padre;
									NomElPadreAmplificador	= record.data.nom_padre;
									cboSearchAmplif.addClass('ok');
									
									/*swAreaAmplif =1;
									IdAreaAmplif	= record.data.id_area_amplif;
									NomAreaAmplif	= record.data.desc_area_amplif;
									cboSearchAreaAmplif.addClass('ok');
									*/
									
									frmAmplif.enable();
									item3.expand();
									punto(record.data.latitud,record.data.longitud);							
									/*var puntosArea = record.data.puntos.split('|');
									if (polygon) map.removeOverlay(polygon);
									area(puntosArea,record.data.color_linea, record.data.ancho_linea, record.data.transparencia_linea, record.data.color_area, record.data.transparencia_area,0,NomAreaAmplif,1)
										*/
								
							      },
				forceSelection	: true,
				lazyRender 		: true,
		        selectOnFocus	: true,
				hideTrigger		: false,
				typeAhead		: true
		    });
				
			cboEditAmplif.on('blur',function(obj){
				newValue=obj.getValue();
				if (swEditAmplif==1){	obj.addClass('ok');	}
	
				if (newValue==oldValue && newValue!=''){
					obj.addClass('ok');swEditAmplif=1;
				}
	
				if (obj.getValue()=='' || swEditAmplif!=1 ) {
					obj.setValue('');
					IdEditAmplif	= '';
					obj.removeClass('ok');
				}
				swEditAmplif=0;
			});
	
			cboEditAmplif.on('focus',function(obj){
					obj.removeClass('ok');
					oldValue=obj.getValue();
			});
	
	
			cboEditAmplif.on('beforequery',function(obj){
				if (trim(obj.query) == '' ) {
					cboEditAmplif.collapse();
					return false;
				}
			});	

			txtNomAmplif = new Ext.form.TextField({
				id				: 'IdtxtNomAmplif',
				name			: 'nom_amplificador',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Nombre',
				labelSeparator	: '',
				anchor			: '99%'
			});
			
			txtFecInstalAmplif = new Ext.form.DateField({
				id				: 'IdtxtFecInstalAmplif',
				name			: 'fec_instalacion',
				fieldLabel  	: 'Fec.Inst.',
				format			: 'Y-m-d',
				anchor			: '95%',
				readOnly  		: true
		    });
		
			txtDirAmplif = new Ext.form.TextField({
				id				: 'IdtxtDirAmplif',
				name			: 'direccion',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Direcci&oacute;n',
				labelSeparator	: '',
				anchor			: '99%'
			});

			txtReferenciaDirAmplif = new Ext.form.TextField({
				id				: 'IdtxtReferenciaDirAmplif',
				name			: 'direccion_referencial',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Referencia',
				labelSeparator	: '',
				anchor			: '99%'

			});

			txtUbicacionAmplif = new Ext.form.TextField({
				id				: 'IdtxtUbicacionAmplif',
				name			: 'ubicacion_referencial',				
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Ubicaci&oacute;n',
				labelSeparator	: '',
				anchor			: '99%'
			});			
			
			txtSerieAmplif = new Ext.form.TextField({
				id				: 'IdtxtSerieAmplif',
				name			: 'num_serie',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Serie',
				labelSeparator	: '',
				anchor			: '99%'
			});			
			
		    Ext.namespace('Ext.borneAmplif');
			Ext.borneAmplif.states = [['2'],['3'],['4'],['5']];    
			store_borneAmplif = new Ext.data.SimpleStore({fields: ['num_borne'],data : Ext.borneAmplif.states});
			
			cboBorneAmplif	= new Ext.form.ComboBox({
				id				: 'IdcboBorneAmplif',
				name			: 'num_puertos',
				store			: store_borneAmplif,		
				fieldLabel		: 'Puertos RF',
				labelSeparator	: '',
				editable		: true,
				minLength		: 1,
				emptyText		: 'Seleccionar...', 
				valueField		: 'num_borne',
				anchor			: '99%',
				mode			: 'local',		
				displayField	: 'num_borne',
				triggerAction	: 'all',
				forceSelection	: true,
				hideTrigger 	: false, 
				lazyRender 		: true,
		        selectOnFocus	: true,
				typeAhead		: true
			});
			
			
			
			cboMarcaAmplif	= new Ext.form.ComboBox({
				id				: 'IdcboMarcaAmplif',
				name			: 'id_marca',
				store			: store_marca,		
				fieldLabel		: 'Marca',
				labelSeparator	: '',
				editable		: true,
				minLength		: 1,
				emptyText		: 'Seleccionar...', 
				valueField		: 'id_marca',
				anchor			: '99%',
				mode			: 'remote',		
				displayField	: 'desc_marca',
				triggerAction	: 'all',
				forceSelection	: true,
				hideTrigger 	: false, 
				lazyRender 		: true,
		        selectOnFocus	: true,
				typeAhead		: true
			});

			cboModeloAmplif	= new Ext.form.ComboBox({
				id				: 'IdcboModeloAmplif',
				name			: 'id_modelo',
				store			: store_modelo,		
				fieldLabel		: 'Modelo',
				labelSeparator	: '',
				editable		: false,
				minLength		: 1,
				emptyText		: 'Seleccionar...', 
				valueField		: 'id_modelo',
				anchor			: '99%',
				mode			: 'remote',		
				displayField	: 'desc_modelo',
				triggerAction	: 'all'
			});
			
			
			store_eredAmplif	= new Ext.data.Store({			
				proxy		: new Ext.data.HttpProxy({url: "query_combos.php?n=3&idered=3,4"}),
				reader		: new Ext.data.JsonReader({root: 'ered'}, [
					        {name: 'id_ered', mapping: 'id_ered'},
					        {name: 'desc_ered', mapping: 'desc_ered'}
						    ]),
				autoLoad	:true
			});

			cboERedAmplif	= new Ext.form.ComboBox({
				id				: 'IdcboERedAmplif',	
				name			: 'id_ered',				
				store			: store_eredAmplif,		
				fieldLabel		: 'Elemento Padre',
				labelSeparator	: '',
				editable		: false,
				minLength		: 1,
				emptyText		: 'Seleccionar...', 
				valueField		: 'id_ered',
				anchor			: '99%',
				mode			: 'remote',		
				displayField	: 'desc_ered',
				triggerAction	: 'all'
			});
			
			
		 cboSearchAmplif = new Ext.form.ComboBox({
	        id				: 'IdcboSearchAmplif',
			name			: 'nom_padre',			
			store			: ds_Amplif,
			fieldLabel		: 'Id elememto padre',
	        loadingText		: 'Searching...',
	        anchor			: '99%',
	        pageSize		: 10,
	        tpl				: resultTpl,
	        itemSelector	: 'div.search-item',
	        onSelect		: function(record){
								swSearchAmplificador=1;
								IdElPadreAmplificador = record.data.id;
								NomElPadreAmplificador = record.data.descripcion;
								cboSearchAmplif.setValue(record.data.descripcion);
								cboSearchAmplif.collapse();
								cboSearchAmplif.addClass('ok');
						      },
			forceSelection	: true,
			lazyRender 		: true,
	        selectOnFocus	: true,
			typeAhead		: true,
			hideTrigger		: true,
			typeAhead		: true
	    });


		cboSearchAmplif.on('blur',function(obj){
			newValue=obj.getValue();
			if (swSearchAmplificador==1){	obj.addClass('ok');	}

			if (newValue==oldValue && newValue!=''){
				obj.addClass('ok');swSearchAmplificador=1;
			}

			if (obj.getValue()=='' || swSearchAmplificador!=1 ) {
				obj.setValue('');
				IdElPadreAmplificador = '';
				NomElPadreAmplificador = '';
				obj.removeClass('ok');
			}
			swSearchAmplificador=0;
		});

		cboSearchAmplif.on('focus',function(obj){
				obj.removeClass('ok');
				oldValue=obj.getValue();
		});

		cboSearchAmplif.on('beforequery',function(obj){
			if (trim(obj.query) == '' || cboERedAmplif.getValue()=='') {
				cboSearchAmplif.collapse();
				return false;
			}
		});		
		cboERedAmplif.on('select',function(combo,record,index){
			cboSearchAmplif.setValue('');
			IdElPadreAmplificador = '';
			NomElPadreAmplificador = '';
			cboSearchAmplif.removeClass('ok');
			ds_Amplif.removeAll();
		});		

		
		
		 checkEstadoAmplif = new Ext.form.Checkbox({
			name			: 'flag',
			boxLabel :'Estado',
			hideLabel: true,
			checked:true,
			disabled:true
		});

		frmAmplif = new Ext.FormPanel({
			id				: 'IdfrmAmplif',
			frame			: false,        
			autoWidth		: true,
			autoHeight		: true,
			labelWidth		: 55,
			waitMsgTarget	: true,
			border			: false,
			disabled 		: true,
			style			: 'padding:5px 5px 5px 5px',
			items		: [{	layout:'column',
				            	border:false,
								height:alto,
				                items:[{	columnWidth	: .40,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'left',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [txtNomAmplif]
										},{	columnWidth	: .44,
							                layout		: 'form',
											border		: false,
							                labelAlign	: 'left',
											defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [txtFecInstalAmplif]
										},{	columnWidth	: .16,
							                layout		: 'form',
											border		: false,
							                labelAlign	: 'left',
							                items		: [ checkEstadoAmplif]
										}]	
            				},{	layout		: 'column',
				                border		: false,
								height		: alto,
								labelAlign	: 'left',
				                items:[{	columnWidth	: .99,
							                layout		: 'form',
											border		: false,
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [txtDirAmplif]
										}]	
		            		},{	layout		: 'column',
				                border		: false,
								height		: alto,
								labelAlign	: 'left',
				                items:[{	columnWidth	: .99,
						                	layout		: 'form',
											border		: false,
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [txtReferenciaDirAmplif]
										}]	
		            		},{	layout		: 'column',
				                border		: false,
								height		: alto,
								labelAlign	: 'left',
				                items:[{	columnWidth	: .99,
							                layout		: 'form',
											border		: false,
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ txtUbicacionAmplif]
										}]	
		            		},{	layout	: 'column',
				                border	: false,
								height	: alto,
				                items:[{	columnWidth	: .60,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'left',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ txtSerieAmplif]
										},{	columnWidth	: .40,
							                layout		: 'form',
											border		: false,
											labelWidth	: 65,
											labelAlign	: 'left',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ cboBorneAmplif]
										}]	
			            	},{	layout	: 'column',
				                border	: false,
								height	: alto+15,
				                items	:[{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ cboMarcaAmplif]
										},{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ cboModeloAmplif]
										}]	
			            	},{	layout	: 'column',
				                border	: false,
								height	: alto+15,
				                items	:[{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ cboERedAmplif]
										},{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items	: [ cboSearchAmplif]
										}]	
			            	}]
			});
			return frmAmplif ;break;
		
		case 'tap'	: 

			cboEditTap = new Ext.form.ComboBox({
			 	id				: 'IdcboEditTap',
				name			: 'IdcboEditTap',
		        store			: ds_EditTap,
				fieldLabel		: 'ddd',
		        loadingText		: 'Searching...',
		        anchor			: '99%',
		        pageSize		: 10,
				hidden 			: true,
		        tpl				: TplEditTap,
		        itemSelector	: 'div.search-item',
		        onSelect		: function(record){
									item2.collapse();
									Ext.getCmp("IdfrmTap").getForm().loadRecord(record);
									swEditTap=1;
									IdEditTap	= record.data.id_tap;
									cboEditTap.setValue(record.data.nom_tap);
									cboEditTap.collapse();
									cboEditTap.addClass('ok');
									
									swSearchTap=1;
									IdElPadreTap	= record.data.id_ered_padre;
									NomElPadreTap	= record.data.nom_padre;
									cboSearchTap.addClass('ok');
									
									frmTap.enable();
									item2.expand();
									punto(record.data.latitud,record.data.longitud);							
							      },
				forceSelection	: true,
				lazyRender 		: true,
		        selectOnFocus	: true,
				hideTrigger		: false,
				typeAhead		: true
		    });
				
	
			cboEditTap.on('blur',function(obj){
				newValue=obj.getValue();
				if (swEditTap==1){	obj.addClass('ok');	}
	
				if (newValue==oldValue && newValue!=''){
					obj.addClass('ok');swEditTap=1;
				}
	
				if (obj.getValue()=='' || swEditTap!=1 ) {
					obj.setValue('');
					IdEditTap	= '';
					obj.removeClass('ok');
				}
				swEditTap=0;
			});
	
			cboEditTap.on('focus',function(obj){
					obj.removeClass('ok');
					oldValue=obj.getValue();
			});
	
	
			cboEditTap.on('beforequery',function(obj){
				if (trim(obj.query) == '' ) {
					cboEditTap.collapse();
					return false;
				}
			});	


			txtNomTap = new Ext.form.TextField({
				id				: 'IdtxtNomTap',
				name			: 'nom_tap',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Nombre',
				labelSeparator	: '',
				anchor			: '99%'
			});
			
			txtFecInstalTap = new Ext.form.DateField({
				id				: 'IdtxtFecInstalTap',
				name			: 'fec_instalacion',
				fieldLabel  	: 'Fec.Inst.',
				format			: 'Y-m-d',
				anchor			: '95%',
				readOnly  		: true
		    });
		
			txtDirTap = new Ext.form.TextField({
				id				: 'IdtxtDirTap',
				name			: 'direccion',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Direcci&oacute;n',
				labelSeparator	: '',
				anchor			: '99%'
			});

			txtReferenciaDirTap = new Ext.form.TextField({
				id				: 'IdtxtReferenciaDirTap',
				name			: 'direccion_referencial',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Referencia',
				labelSeparator	: '',
				anchor			: '99%'

			});

			txtUbicacionTap = new Ext.form.TextField({
				id				: 'IdtxtUbicacionTap',
				name			: 'ubicacion_referencial',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Ubicaci&oacute;n',
				labelSeparator	: '',
				anchor			: '99%'
			});			
			
			txtSerieTap = new Ext.form.TextField({
				id				: 'IdtxtSerieTap',
				name			: 'num_serie',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Serie',
				labelSeparator	: '',
				anchor			: '99%'
			});
				
			Ext.namespace('Ext.borneTap');
			Ext.borneTap.states = [['2'],['4'],['8']];    
			store_borneTap = new Ext.data.SimpleStore({fields: ['num_borne'],data : Ext.borneTap.states});
			
			cboBorneTap	= new Ext.form.ComboBox({
				id				: 'IdcboBorneTap',
				name			: 'cant_borne',
				store			: store_borneTap,		
				fieldLabel		: 'Nro. Bornes',
				labelSeparator	: '',
				editable		: true,
				minLength		: 1,
				emptyText		: 'Seleccionar...', 
				valueField		: 'num_borne',
				anchor			: '99%',
				mode			: 'local',		
				displayField	: 'num_borne',
				triggerAction	: 'all',
				forceSelection	: true,
				hideTrigger 	: false, 
				lazyRender 		: true,
		        selectOnFocus	: true,
				typeAhead		: true
			});

			
			
			
			
			cboMarcaTap	= new Ext.form.ComboBox({
				id				: 'IdcboMarcaTap',
				name			: 'id_marca',
				store			: store_marca,		
				fieldLabel		: 'Marca',
				labelSeparator	: '',
				editable		: true,
				minLength		: 1,
				emptyText		: 'Seleccionar...', 
				valueField		: 'id_marca',
				anchor			: '99%',
				mode			: 'remote',		
				displayField	: 'desc_marca',
				triggerAction	: 'all',
				forceSelection	: true,
				hideTrigger 	: false, 
				lazyRender 		: true,
		        selectOnFocus	: true,
				typeAhead		: true
			});

			cboModeloTap	= new Ext.form.ComboBox({
				id				: 'IdcboModeloTap',
				name			: 'id_modelo',
				store			: store_modelo,		
				fieldLabel		: 'Modelo',
				labelSeparator	: '',
				editable		: false,
				minLength		: 1,
				emptyText		: 'Seleccionar...', 
				valueField		: 'id_modelo',
				anchor			: '99%',
				mode			: 'remote',		
				displayField	: 'desc_modelo',
				triggerAction	: 'all'
			});
			
			
			store_eredTap	= new Ext.data.Store({			
				proxy		: new Ext.data.HttpProxy({url: "query_combos.php?n=3&idered=2,3,4"}),
				reader		: new Ext.data.JsonReader({root: 'ered'}, [
					        {name: 'id_ered', mapping: 'id_ered'},
					        {name: 'desc_ered', mapping: 'desc_ered'}
						    ]),
				autoLoad	:true			
			});
			
			cboERedTap	= new Ext.form.ComboBox({
				id				: 'IdcboERedTap',	
				name			: 'id_ered',
				store			: store_eredTap,		
				fieldLabel		: 'Elemento Padre',
				labelSeparator	: '',
				editable		: false,
				minLength		: 1,
				emptyText		: 'Seleccionar...', 
				valueField		: 'id_ered',
				anchor			: '99%',
				mode			: 'remote',		
				displayField	: 'desc_ered',
				triggerAction	: 'all'
			});
			
			
		 cboSearchTap = new Ext.form.ComboBox({
	        id				: 'IdcboSearchTap',
			name			: 'nom_padre',
			store			: ds_Tap,
			fieldLabel		: 'Id elememto padre',
	        loadingText		: 'Searching...',
	        anchor			: '99%',
	        pageSize		: 10,
	        tpl				: resultTpl,
	        itemSelector	: 'div.search-item',
	        onSelect		: function(record){
								swSearchTap=1
								IdElPadreTap = record.data.id;
								NomElPadreTap = record.data.descripcion;
								cboSearchTap.setValue(record.data.descripcion);
								cboSearchTap.collapse();
								cboSearchTap.addClass('ok');
						      },
			forceSelection	: true,
			lazyRender 		: true,
	        selectOnFocus	: true,
			typeAhead		: true,
			hideTrigger		: true,
			typeAhead		: true
	    });
		
		
		cboSearchTap.on('blur',function(obj){
			newValue=obj.getValue();
			if (swSearchTap==1){	obj.addClass('ok');	}

			if (newValue==oldValue && newValue!=''){
				obj.addClass('ok');swSearchTap=1;
			}

			if (obj.getValue()=='' || swSearchTap!=1 ) {
				obj.setValue('');
				IdElPadreTap = '';
				NomElPadreTap = '';
				obj.removeClass('ok');
			}
			swSearchTap=0;
		});

		cboSearchTap.on('focus',function(obj){
				obj.removeClass('ok');
				oldValue=obj.getValue();
		});
		
		cboSearchTap.on('beforequery',function(obj){
			if (trim(obj.query) == '' || cboERedTap.getValue()=='') {
				cboSearchTap.collapse();
				return false;
			}
		});		
		cboERedTap.on('select',function(combo,record,index){
			cboSearchTap.setValue('');
			IdElPadreTap = '';
			NomElPadreTap = '';
			cboERedTap.removeClass('ok');
			ds_Tap.removeAll();
		});		

		 checkEstadoTap = new Ext.form.Checkbox({
			name		: 'flag',
			boxLabel 	: 'Estado',
			hideLabel	: true,
			checked		: true,
			disabled	: true
		});
			
		frmTap= new Ext.FormPanel({
			id				: 'IdfrmTap',
			frame			: false,        
			autoWidth		: true,
			autoHeight		: true,
			labelWidth		: 55,
			waitMsgTarget	: true,
			border			: false,
			disabled 		: true,
			style			: 'padding:5px 5px 5px 5px',
			items		: [{	layout:'column',
				            	border:false,
								height:alto,
				                items:[{	columnWidth	: .40,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'left',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [txtNomTap]
										},{	columnWidth	: .44,
							                layout		: 'form',
											border		: false,
							                labelAlign	: 'left',
											defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [txtFecInstalTap]
										},{	columnWidth	: .16,
							                layout		: 'form',
											border		: false,
							                labelAlign	: 'left',
							                items		: [ checkEstadoTap]
										}]	
            				},{	layout		: 'column',
				                border		: false,
								height		: alto,
								labelAlign	: 'left',
				                items:[{	columnWidth	: .99,
							                layout		: 'form',
											border		: false,
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [txtDirTap]
										}]	
		            		},{	layout		: 'column',
				                border		: false,
								height		: alto,
								labelAlign	: 'left',
				                items:[{	columnWidth	: .99,
						                	layout		: 'form',
											border		: false,
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [txtReferenciaDirTap]
										}]	
		            		},{	layout		: 'column',
				                border		: false,
								height		: alto,
								labelAlign	: 'left',
				                items:[{	columnWidth	: .99,
							                layout		: 'form',
											border		: false,
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ txtUbicacionTap]
										}]	
		            		},{	layout	: 'column',
				                border	: false,
								height	: alto,
				                items:[{	columnWidth	: .60,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'left',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ txtSerieTap]
										},{	columnWidth	: .40,
							                layout		: 'form',
											border		: false,
											labelWidth	: 67,
											labelAlign	: 'left',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ cboBorneTap]
										}]	
			            	},{	layout	: 'column',
				                border	: false,
								height	: alto+15,
				                items	:[{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ cboMarcaTap]
										},{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ cboModeloTap]
										}]	
			            	},{	layout	: 'column',
				                border	: false,
								height	: alto+15,
				                items	:[{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ cboERedTap]
										},{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items	: [ cboSearchTap]
										}]	
			            	}]
			});
			return frmTap ;break;
		case 'modem'		: 

			cboEditModem = new Ext.form.ComboBox({
			 	id				: 'IdcboEditModem',
				name			: 'IdcboEditModem',
		        store			: ds_EditModem,
				fieldLabel		: 'ddd',
		        loadingText		: 'Searching...',
		        anchor			: '99%',
		        pageSize		: 10,
				hidden 			: true,
		        tpl				: TplEditModem,
		        itemSelector	: 'div.search-item',
		        onSelect		: function(record){
									item1.collapse();
									Ext.getCmp("IdfrmModem").getForm().loadRecord(record);
									swEditModem=1;
									IdEditModem	= record.data.id_cable_modem;
									cboEditModem.setValue(record.data.nom_cable_modem);
									cboEditModem.collapse();
									cboEditModem.addClass('ok');
									
									swSearchModem=1;
									IdElPadreModem	= record.data.id_ered_padre;
									NomElPadreModem	= record.data.nom_padre;
									cboSearchModem.addClass('ok');
									
									swDocsisModem	= 1;
									IdDocsisModem	= record.data.nom_cable_modem;
									MacDocsisModem	= record.data.num_mac;
									cboDocsisModem.setValue(IdDocsisModem);
									//txtNomModem.setValue(IdDocsisModem);
									//txtMacModem.setValue(MacDocsisModem);
									cboDocsisModem.addClass('ok');
									
									frmModem.enable();
									item1.expand();
									punto(record.data.latitud,record.data.longitud);							
							      },
				forceSelection	: true,
				lazyRender 		: true,
		        selectOnFocus	: true,
				hideTrigger		: false,
				typeAhead		: true
		    });
				
	
			cboEditModem.on('blur',function(obj){
				newValue=obj.getValue();
				if (swEditModem==1){	obj.addClass('ok');	}
	
				if (newValue==oldValue && newValue!=''){
					obj.addClass('ok');swEditModem=1;
				}
	
				if (obj.getValue()=='' || swEditModem!=1 ) {
					obj.setValue('');
					IdEditModem	= '';
					obj.removeClass('ok');
				}
				swEditModem=0;
			});
	
			cboEditModem.on('focus',function(obj){
					obj.removeClass('ok');
					oldValue=obj.getValue();
			});
	
	
			cboEditModem.on('beforequery',function(obj){
				if (trim(obj.query) == '' ) {
					cboEditModem.collapse();
					return false;
				}
			});	


			 
			txtNomModem = new Ext.form.TextField({
				id				: 'IdtxtNomModem',
				name			: 'nom_cable_modem',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Nombre',
				labelSeparator	: '',
				disabled		: true,
				readOnly		: true,
				anchor			: '99%'
			});
			
			txtFecInstalModem = new Ext.form.DateField({
				id				: 'IdtxtFecInstalModem',
				name			: 'fec_instalacion',
				fieldLabel  	: 'Fec.Inst.',
				format			: 'Y-m-d',
				anchor			: '95%',
				readOnly  		: true
		    });
		
			txtMacModem = new Ext.form.TextField({
				id				: 'IdtxtMacModem',
				name			: 'num_mac',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'MAC',
				labelSeparator	: '',
				disabled		: true,
				readOnly		: true,
				anchor			: '99%'
			});

			cboDocsisModem = new Ext.form.ComboBox({
		        id				: 'IdcboDocsisModem',
				store			: ds_DocsisModem,//ds_Cliente,
				fieldLabel		: 'Modem',
		        loadingText		: 'Searching...',
		        anchor			: '99%',
		        pageSize		: 10,
		        tpl				: TplDocsisModem,//TplCliente,
		        itemSelector	: 'div.search-item',
		 	  	listWidth		: 250,
		        onSelect		: function(record){
									swDocsisModem	= 1;
									IdDocsisModem	= record.data.serialnum;
									MacDocsisModem	= record.data.modem_macaddr;
									cboDocsisModem.setValue(IdDocsisModem);
									txtNomModem.setValue(IdDocsisModem);
									txtMacModem.setValue(MacDocsisModem);
									cboDocsisModem.collapse();
									cboDocsisModem.addClass('ok');
							      },
				forceSelection	: true,
				lazyRender 		: true,
		        selectOnFocus	: true,
				typeAhead		: true,
				hideTrigger		: true,
				typeAhead		: true
		    });
			
			
			cboDocsisModem.on('blur',function(obj){
				newValue=obj.getValue();
				if (swDocsisModem==1){	obj.addClass('ok');	}
	
				if (newValue==oldValue && newValue!=''){
					obj.addClass('ok');swDocsisModem=1;
				}

				if (obj.getValue()=='' || swDocsisModem!=1 ) {
					obj.setValue('');
					IdDocsisModem	= '';
					MacDocsisModem	= '';
					obj.removeClass('ok');
					txtNomModem.setValue('');
					txtMacModem.setValue('');
				}
				swDocsisModem=0;
			});
	
			cboDocsisModem.on('focus',function(obj){
					obj.removeClass('ok');
					oldValue=obj.getValue();
			});
				
			cboMarcaModem	= new Ext.form.ComboBox({
				id				: 'IdcboMarcaModem',
				name			: 'id_marca',
				store			: store_marca,		
				fieldLabel		: 'Marca',
				labelSeparator	: '',
				editable		: true,
				minLength		: 1,
				emptyText		: 'Seleccionar...', 
				valueField		: 'id_marca',
				anchor			: '99%',
				mode			: 'remote',		
				displayField	: 'desc_marca',
				triggerAction	: 'all',
				forceSelection	: true,
				hideTrigger 	: false, 
				lazyRender 		: true,
		        selectOnFocus	: true,
				typeAhead		: true
			});

			cboModeloModem	= new Ext.form.ComboBox({
				id				: 'IdcboModeloModem',
				name			: 'id_modelo',
				store			: store_modelo,		
				fieldLabel		: 'Modelo',
				labelSeparator	: '',
				editable		: false,
				minLength		: 1,
				emptyText		: 'Seleccionar...', 
				valueField		: 'id_modelo',
				anchor			: '99%',
				mode			: 'remote',		
				displayField	: 'desc_modelo',
				triggerAction	: 'all'
			});
			
			store_eredModem	= new Ext.data.Store({			
				proxy		: new Ext.data.HttpProxy({url: "query_combos.php?n=3&idered=2"}),
				reader		: new Ext.data.JsonReader({root: 'ered'}, [
					        {name: 'id_ered', mapping: 'id_ered'},
					        {name: 'desc_ered', mapping: 'desc_ered'}
						    ]),
				autoLoad	: true
			});
			
			cboERedModem	= new Ext.form.ComboBox({
				id				: 'IdcboERedModem',	
				name			: 'id_ered',
				store			: store_eredModem,		
				fieldLabel		: 'Elemento Padre',
				labelSeparator	: '',
				editable		: false,
				minLength		: 1,
				emptyText		: 'Seleccionar...', 
				valueField		: 'id_ered',
				anchor			: '99%',
				mode			: 'remote',		
				displayField	: 'desc_ered',
				triggerAction	: 'all'
			});
			
		 cboSearchModem = new Ext.form.ComboBox({
	        id				: 'IdcboSearchModem',
			name			: 'nom_padre',
			store			: ds_Modem,
			fieldLabel		: 'Id elememto padre',
	        loadingText		: 'Searching...',
	        anchor			: '99%',
	        pageSize		: 10,
	        tpl				: resultTpl,
	        itemSelector	: 'div.search-item',
	        onSelect		: function(record){
								swSearchModem=1;
								IdElPadreModem	= record.data.id;
								NomElPadreModem	= record.data.descripcion;
								cboSearchModem.setValue(record.data.descripcion);
								cboSearchModem.collapse();
								cboSearchModem.addClass('ok');
						      },
			forceSelection	: true,
			lazyRender 		: true,
	        selectOnFocus	: true,
			hideTrigger		: true,
			typeAhead		: false
	    });

		cboSearchModem.on('blur',function(obj){
			newValue=obj.getValue();
			if (swSearchModem==1){	obj.addClass('ok');	}

			if (newValue==oldValue && newValue!=''){
				obj.addClass('ok');swSearchModem=1;
			}

			if (obj.getValue()=='' || swSearchModem!=1 ) {
				obj.setValue('');
				IdElPadreModem	= '';
				NomElPadreModem	= '';
				obj.removeClass('ok');
			}
			swSearchModem=0;
		});

		cboSearchModem.on('focus',function(obj){
				obj.removeClass('ok');
				oldValue=obj.getValue();
		});
			
		cboSearchModem.on('beforequery',function(obj){
			if (trim(obj.query) == '' || cboERedModem.getValue()=='') {
				cboSearchModem.collapse();
				return false;
			}
		});		
		cboERedModem.on('select',function(combo,record,index){
			cboSearchModem.setValue('');
			cboSearchModem.removeClass('ok');
			IdElPadreModem	= '';
			NomElPadreModem	= '';
			ds_Modem.removeAll();
		});		

		
		
		 checkEstadoModem = new Ext.form.Checkbox({
			name		: 'flag',
			boxLabel 	: 'Estado',
			hideLabel	: true,
			checked		: true,
			disabled	: true
		});
			
		frmModem= new Ext.FormPanel({
			id				: 'IdfrmModem',
			frame			: false,        
			autoWidth		: true,
			autoHeight		: true,
			labelWidth		: 55,
			waitMsgTarget	: true,
			border			: false,
			disabled 		: true,
			style			: 'padding:5px 5px 5px 5px',
			/*buttonAlign 	: 'right',
			buttons 		: [	
								{	text		: 'Grabar',
									handler		: function(){graba_modem(9);},
				                 	disabled	: false },
								{	text		: 'Limpiar',
									handler		: function(){
										Ext.getCmp("IdfrmModem").getForm().reset();
										IdElPadreModem = '';
										NomElPadreModem = '';
										cboDocsisModem.removeClass('ok');
										cboSearchModem.removeClass('ok');
										LimpiaMapa();
										}
								}],
			*/
			items		: [{	layout:'column',
				            	border:false,
								height:alto,
				                items:[{	columnWidth	: .40,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'left',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [cboDocsisModem]
										},{	columnWidth	: .44,
							                layout		: 'form',
											border		: false,
							                labelAlign	: 'left',
											defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [txtFecInstalModem]
										},{	columnWidth	: .16,
							                layout		: 'form',
											border		: false,
							                labelAlign	: 'left',
							                items		: [ checkEstadoModem]
										}]	
            				},{	layout		: 'column',
				                border		: false,
								height		: alto+15,
								labelAlign	: 'top',
				                items:[{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
											//labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [txtNomModem]
										},{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ txtMacModem]
										}]	
		            		}/*,{	layout		: 'column',
				                border		: false,
								height		: alto,
								labelAlign	: 'left',
				                items:[{	columnWidth	: .99,
						                	layout		: 'form',
											border		: false,
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ cboClienteModem]
										}]	
		            		}*/,{	layout	: 'column',
				                border	: false,
								height	: alto+15,
				                items	:[{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ cboMarcaModem]
										},{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ cboModeloModem]
										}]	
			            	},{	layout	: 'column',
				                border	: false,
								height	: alto+15,
				                items	:[{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ cboERedModem]
										},{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                defaults	: {height:18},
							                defaultType	: 'textfield',
							                items	: [ cboSearchModem]
										}]	
			            	}]
			});
			return frmModem ;break;
	}

		

	
}