Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"
function salir(){
	window.location="login.php";
}

function creditos(){

	var ventana=new Ext.Window({
		title: 'Acerca de ...',
		html:
		'<p align=center style=color:#15428B;><b>Sistema Web</b></p><br>' +
		'&nbsp;&nbsp;<font style=color:#15428B;>Versi&oacute;n Beta 1.0</font><br>' +
		'<p align=center style=color:#15428B;>Lima - Per&uacute; 2008</p>',
		width:400,
		modal:true,
		resizable:false,
		height:250
	});
	ventana.show();
}

Ext.onReady(function(){	
	var idsess=Ext.getDom('idsess').value;
	var usuario=Ext.getDom('usuario').value;
	
	var FullMenuBar;
	
	FullMenuBar = new Ext.ux.Menubar({
    	orientation: "horizontal"
	});

    FullMenuBar.add(
        new Ext.menu.Item( {
            text: 'Inicio', href:"/automotriz/home.php?idsess="+idsess }
            ),        
        new Ext.menu.Item( {
        	hidden: false,
            text: 'Cat&aacute;logos', level: 1, menu : {items: [
                {href:"/automotriz/lista_materiales.php?idsess="+idsess,text:"Productos"},
                {href:"/automotriz/lista_vendedores.php?idsess="+idsess,text:"Vendedores"},
                {href:"/automotriz/lista_clientes.php?idsess="+idsess,text:"Clientes"}                
            ]}}),                  
        new Ext.menu.Item( {
            text: 'Almac&eacute;n', level: 1, menu : {items: [
                {href:"/automotriz/ingreso_almacen.php?idsess="+idsess,text:"Ingreso almac&eacute;n"},
                {href:"/automotriz/entrega_vendedor.php?idsess="+idsess,text:"Entrega de Muestras"},                
             
		{href:"/automotriz/bandeja_muestras.php?idsess="+idsess,text:"Bandeja de Muestras Entregadas"},
		{href:"/automotriz/nota_pedido.php?idsess="+idsess,text:"Nota de Pedido"},
                {href:"/automotriz/bandeja_pedido.php?idsess="+idsess,text:"Bandeja de Pedido Facturacion"},
                {href:"/automotriz/bandeja_pedido_almacen.php?idsess="+idsess,text:"Bandeja de Pedido Almacen"},
		{href:"/automotriz/nota_debito.php?idsess="+idsess,text:"Nota de D&eacute;bito"},
		{href:"/automotriz/cobranzas.php?idsess="+idsess,text:"Cobranzas"},
		{href:"/automotriz/amortizacion.php?idsess="+idsess,text:"Amoritizaciones"}


                
            ]}}),		            
        new Ext.menu.Item( {
            hidden: false,
            text: 'Reportes',menu : new Ext.menu.Menu({id:'m4', items: [
                {href:"/automotriz/consulta_stock.php?idsess="+idsess,text:"Consulta Stock"},
                {href:"/automotriz/consulta_kardex.php?idsess="+idsess,text:"Kardex"},
                {href:"/automotriz/lista_reportes.php?idsess="+idsess,text:"Consolidados"}	                			                
            ]})}),         
        new Ext.menu.Item( {
            hidden: false,
            text: 'Administraci&oacute;n',menu : new Ext.menu.Menu({id:'m5', items:[
		{href:"/automotriz/admin_ciudad.php?idsess="+idsess,text:"Ciudades"},
		{href:"/automotriz/admin_clientes.php?idsess="+idsess,text:"Clientes"},
		{href:"/automotriz/admin_distrito.php?idsess="+idsess,text:"Distritos"},
		{href:"/automotriz/admin_empaque.php?idsess="+idsess,text:"Empaques"},
		{href:"/automotriz/admin_marca.php?idsess="+idsess,text:"Marca"},
                {href:"/automotriz/admin_productos.php?idsess="+idsess,text:"Productos"},
		{href:"/automotriz/admin_unidad_medida.php?idsess="+idsess,text:"Unidades de Medida"},
		{href:"/automotriz/admin_usuarios.php?idsess="+idsess,text:"Usuarios"},
                {href:"/automotriz/admin_vendedores.php?idsess="+idsess,text:"Vendedores"}
            ]})})         	            
     
    );

    //Agregamos el menu de ayuda
	
    FullMenuBar.add(
        new Ext.menu.Item({
            hideOnClick :false,
            text		:'Ayuda',
            menu 		:new Ext.menu.Menu({
            	id		:'m5',
            	items	:[
		{
    			href:"/automotriz/mtto_cambio_clave.php?idsess="+idsess,
			text:"Cambio de Clave"
		},{
            		text:'Acerca de ...', 
            		href:"javascript:creditos()"
            	}]
            })
        })
	);
	
	//Agregamos el menu cerrar sesion
	FullMenuBar.add(
        new Ext.menu.Item( {
            text:'Cerrar Sesi&oacute;n', 
            href:"javascript:salir()" 
            }
        ),
        new Ext.menu.Item( {
            text	:'<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Loo Import SAC</b>',
            align	:'right',
            href	:"#"
        }) 			
	);

            
		            
	FullMenuBar.show(Ext.getDom("menu"), "tl-tl"); 
  
 
});	
