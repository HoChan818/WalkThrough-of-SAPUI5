sap.ui.define([
	"sap/ui/core/mvc/Controller"
	],function(Controller){
		"use strict";
		
		return Controller.extend("sap.ui.demo.controller.Detail", {
			onInit: function(){
				var oRouter = this.getOwnerComponent().getRouter();
				//_onObjectMatched that will be executed when the route is hit
				oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
			},
			
			_onObjectMatched: function(oEvent){
				//The arguments parameter will return an object that corresponds 
				//to our navigation parameters from the route pattern
				var sPath = oEvent.getParameter("arguments").invoicePath;
				//Set context on the view
				this.getView().bindElement({
					path: "/" + window.decodeURIComponent(sPath),
					model: "invoice"
				});
			}
		});
	});