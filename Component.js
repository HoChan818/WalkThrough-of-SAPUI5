sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"./controller/HelloDialog",
	"sap/ui/Device"
	],function(UIComponent,JSONModel,HelloDialog,Device){
	"use strict";
	
	return UIComponent.extend("sap.ui.demo.Component",{
		metadata: {
			manifest: "json"
		},
		
		init: function(){
			// call the init function of the parent
			UIComponent.prototype.init.apply(this,arguments);
			
			//set data model
			var oData = { recipient : { 
				name : "World"
			}};
			var oModel = new JSONModel(oData);
			this.setModel(oModel);
			//make most properties of the SAPUI5 device API available as a JSON model
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel,"device");
			
			// initiate the reuse Dialog
			this._helloDialog = new HelloDialog(this.getRootControl());
			
			// create the view basd on the URL/HASH
			this.getRouter().initialize();
		},
		
		exit: function(){
			//clean up the helper class and end its lifecycle
			this._helloDialog.destroy();
			//delete our reference to the HelloDialog instance
			delete this._helloDialog;
		},
		
		openHelloDialog: function(){
			// open the reuse Dialog
			this._helloDialog.open();
		}
	});
});