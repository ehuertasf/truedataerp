Ext.onReady(function(){
Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

    Ext.QuickTips.init();
        var xid_pedido,xid_tecnico,xf_movimiento,cbo_tecnico,grid;
        var today = new Date().clearTime();
        //*******************************************************************************************************//
        //DATA STORE'S
        //*******************************************************************************************************//

   

        var dbCliReg=new Ext.data.GroupingStore({			// Data de Clientes en estado Registrado
            proxy: new Ext.data.HttpProxy({
                url: "php_procesos/p_comisiones.php"
            }),
            baseParams:{
                f:1
            },


            reader: new Ext.data.JsonReader
            ({root: 'lst_comisiones',
                id: 'resourceId',
                fields:
                [
                 {name    :'id_pedido'},
                 {name    :'f_reg_ped'},
                 {name    :'f_movimiento'},
                 {name    :'nombre'},
                 {name    :'id_tecnico'},
                 {name    :'nom_tecnico'},
                 {name    :'id_vendedor'},
                 {name    :'nom_vendedor'},
                 {name    :'id_estado'},
                 {name    :'desc_estado'}
                ],
                groupField:'id_vendedor',
                remoteSort: false,
                sortInfo: {field: 'nom_vendedor', direction: 'DESC'}
            //,
            //autoLoad:true
            })
        });

        //*******************************************************************************************************//
        //GRID
        //*******************************************************************************************************//

        var checkColumn = new Ext.grid.CheckboxSelectionModel({
            header  :' ',
            singleSelect :true
		});

       

        var view = new Ext.grid.GroupingView({
	    forceFit		:true,
	    emptyText		:'<div style="text-align:center;">No se encontrar&oacute;n registros</div>',
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

        view.startCollapsed=false;




        //cm.defaultSortable = true;

        grid = new Ext.grid.GridPanel({

            width	:900,
            height	:400,
            frame	:true,
            loadMask:true,
            collapsible: true,
            store	:dbCliReg,
            view:view,
           
            sm: new Ext.grid.RowSelectionModel({
                singleSelect:true
            }),
            
            // sm      :checkColumn,
            columns:[
                    //checkColumn,
                    { id:'id_pedido',header: "Pedido",width: 100 ,sortable: false,groupable: false,dataIndex:'id_pedido'},
		        	{ header: "Fec.Reg.Pedido",width: 200,sortable: true,dataIndex: 'f_reg_ped',align:'left'},
		        	{ header: "F.Ejecuci&oacute;n",width: 100,sortable: true,dataIndex: 'f_movimiento',groupable:false},
		        	{ header: "Cliente",width: 200,sortable: true,dataIndex: 'nombre',groupable:false},
		        	{ header: "Estado",width: 50,sortable: true,dataIndex: 'desc_estado',groupable:false},
		        	{ header: "T&eacute;cnico",width: 100,sortable: true,dataIndex:'nom_tecnico', align:'center',groupable:false},
                    { header: "ID Vendedor",width: 100,sortable: true,dataIndex:'id_vendedor', align:'left'},
                    { header: "Vendedor",width: 100,sortable: true,dataIndex:'nom_vendedor', align:'left'}
                   ],
            tbar: [{
                    text: 'Imprimir',
                    iconCls:'validar'/*,
                    handler : function(){                       
                        var seleccion = grid.getSelections();
                        var selectedKeys = grid.selModel.selections.keys;
                        
                        for(var i=0;i<selectedKeys.length;i++){
                            var record = grid.getStore().getById(selectedKeys[i]);
                            var fieldName1 = grid.getColumnModel().getDataIndex(1);  //id_pedido
                            var fieldName2 = grid.getColumnModel().getDataIndex(5);  //id_tecnico
                            var fieldName3 = grid.getColumnModel().getDataIndex(7);  //f_programacion

                            var data1 = record.get(fieldName1);
                            var data2 = record.get(fieldName2);
                            var data3 = record.get(fieldName3);

                            if(data2){
                                if(selectedKeys.length==1){
                                    if(data3){
                                        var data=data1+'|'+data2+'|'+data3;
                                    }else{
                                        Ext.MessageBox.alert('Alerta', 'Debe seleccionar una fecha de programaci&oacute;n');
                                    }
                                }else{
                                    Ext.MessageBox.alert('Alerta', 'Solo puede programar una Orden a la vez.');
                                }
                            }else{
                                Ext.MessageBox.alert('Alerta', 'Debe seleccionar un Tecnico de la Lista.');
                                return
                            }
                        }
                       
                        Ext.Ajax.request({
                            url: 'php_procesos/p_formulados.php',
                            method: 'POST',
                            params: {
                                f:2,
                                iduser: Ext.getDom('iduser').value,
                                datos:data
                            },
                            failure:function(response,options){
                                Ext.MessageBox.alert('Error','Problemas al actualizar datos');
                            },
                            success:function(response,options){
                                var rpta=response.responseText;

                                if(rpta==1){
                                    Ext.MessageBox.alert('Confirmacion', 'Se Actualizo la(s) orden(es) seleccionada(s)');
                                    dbCliReg.proxy= new Ext.data.HttpProxy({
                                        url: 'php_procesos/p_formulados.php',
                                        baseParams:{
                                            f:1
                                        }
                                    });

                                    dbCliReg.load();
                                }

                            }
                        });
                       
                    }*/
                }]
        });

        dbCliReg.load();

        var panel = new Ext.Panel({
	    id:'images-view',
	    frame:false,
	    width:950,
	    autoHeight:true,
	    collapsible:false,
	    layout:'fit',
	    items: grid
        });
        //*******************************************************************************************************//
        //VENTANA
        //*******************************************************************************************************//
        var ventana = new Ext.Window({
            title       :'COMISION DE VENDEDORES',
            width       :1100,
            minWidth    :750,
            minHeight   :450,
            layout      :'fit',
            plain       :true,
            y           :180,
            bodyStyle   :'padding:5px;',
            items       :panel
        });
        ventana.show();


});





