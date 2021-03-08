sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/demo/model/formatter"
	],function(Controller,JSONModel,formatter){
		"use strict";
		
		return Controller.extend("sap.ui.demo.controller.InvoiceList", {
			//define a local property to store the loaded formatter functions
			formatter: formatter,
			
			onInit: function(){
				var oViewModel = new JSONModel({
					currency: "EUR"
				});
				
				this.getView().setModel(oViewModel,"view");
			}
		});
	});