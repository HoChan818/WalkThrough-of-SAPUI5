sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/demo/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
	],function(Controller,JSONModel,formatter,Filter,FilterOperator){
		"use strict";
		
		return Controller.extend("sap.ui.demo.controller.InvoiceList", {
			//define a local property to store the loaded formatter functions
			formatter: formatter,
			
			onInit: function(){
				var oViewModel = new JSONModel({
					currency: "EUR"
				});
				
				this.getView().setModel(oViewModel,"view");
			},
			
			onFilterInvoices: function(oEvent){
				//build filter array
				var aFilter = [];
				var sQuery = oEvent.getParameter("query");
				if(sQuery){
					aFilter.push(new Filter("ProductName",FilterOperator.Contains,sQuery));
				}
				
				//filter binding
				var oList = this.byId("invoiceList");
				var oBinding = oList.getBinding("items");
				oBinding.filter(aFilter);
			},
			
			onNav: function(oEvent){
				var oRouter = this.getOwnerComponent().getRouter();
				//get selected ObjectListItem
				var oSeletedItem = oEvent.getSource();
				//get binding context information with model name
				var oBindingContext = oSeletedItem.getBindingContext("invoice");
				//get navigation parameters which remove the first / from the binding path
				var sPath = oBindingContext.getPath().substr(1);
				//fill the navigation parameter invoicePath
				//then goto detail view
				oRouter.navTo("detail",{
					invoicePath: window.encodeURIComponent(sPath)
				});
			}
		});
	});