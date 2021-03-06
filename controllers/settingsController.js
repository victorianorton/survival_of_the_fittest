/*****************
Sends information to the settings file
*****************/

function settingsController(){
	console.log("Creating Settings Controller");


	/* DECLARATIONS */
	this.settingsView = new settingsView();
	this.settingsView.addObserver(this);

	/*	OBSERVABLE METHODS */
	this.observers = [];
	this.addObserver = function(observer){
		this.observers.push(observer);	};
	this.removeObserver = function(observer){
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			if (this.observers[i] === observer){
				this.observers.splice(i,1);	}}};
	this.notifyObservers = function(msg){
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			this.observers[i].receiveMessage(this, msg);
		}};

	/*	OBSERVER METHODS */
	/* parses the message passed and decides how to handle it */
	this.receiveMessage = function(observable, msg){
		if (msg.substring(0,15) == "UserToggleBirth"){
			var birthVal = parseInt(msg.substring(15,msg.length));
			this.settings.toggleBirthArrayVal(birthVal);
			this.updateSettingsView();
		} else if (msg.substring(0,17) == "UserToggleSustain"){
			var susVal = parseInt(msg.substring(17,msg.length));
			this.settings.toggleSustainArrayVal(susVal);
			this.updateSettingsView();
		} else if (msg.substring(0,9) == "UserSpeed"){
			var speedVal = parseInt(msg.substring(9,msg.length));
			this.settings.setSpeed(speedVal);
			this.updateSettingsView();
		} else if (msg.substring(0,10) == "spawnWidth"){
			var sWidth = parseInt(msg.substring(10, msg.length));
			this.settings.setSpawnWidth(sWidth);
			this.updateSettingsView();
		} else if (msg.substring(0,11) == "spawnHeight"){
			var sHeight = parseInt(msg.substring(11, msg.length));
			this.settings.setSpawnHeight(sHeight);
			this.updateSettingsView();
		} else if (msg.substring(0,12) == "spawnDensity"){
			var sDensity = parseInt(msg.substring(12, msg.length));
			this.settings.setSpawnDensity(sDensity);
			this.updateSettingsView();
		} else if (msg.substring(0,12) == "spawnCenterX"){
			var sCenterX = parseInt(msg.substring(12, msg.length));
			this.settings.setSpawnCenterX(sCenterX);
			this.updateSettingsView();
		} else if (msg.substring(0,12) == "spawnCenterY"){
			var sCenterY = parseInt(msg.substring(12, msg.length));
			this.settings.setSpawnCenterY(sCenterY);
			this.updateSettingsView();
		} else if (msg.substring(0,8) == "lifetime"){
			var sLifetime = parseInt(msg.substring(8, msg.length));
			this.settings.setLifetime(sLifetime);
			this.updateSettingsView();
		} else if (msg.substring(0,7) == "mutRate"){
			var sMutation = parseInt(msg.substring(7, msg.length));
			this.settings.setMutRate(sMutation);
			this.updateSettingsView();
		} else if (msg.substring(0,12) == "fitnessBirth"){
			var sFitBirth = parseInt(msg.substring(12, msg.length));
			this.settings.setFitScalerB(sFitBirth);
			this.updateSettingsView();
		} else if (msg.substring(0,12) == "fitnessDeath"){
			var sFitDeath = parseInt(msg.substring(12, msg.length));
			this.settings.setFitScalerD(sFitDeath);
			this.updateSettingsView();
		} else if (msg.substring(0,14) == "fitnessSustain"){
			var sFitSustain = parseInt(msg.substring(14, msg.length));
			this.settings.setFitScalerS(sFitSustain);
			this.updateSettingsView();
		} else if (msg.substring(0,14) == "fitnessExplore"){
			var sFitExplore = parseInt(msg.substring(14, msg.length));
			this.settings.setFitScalerE(sFitExplore);
			this.updateSettingsView();
		}
	};

	/* Setter */
	this.setSettings = function(settings){
		this.settings = settings;
		this.updateSettingsView();
	};

	this.updateSettingsView = function(){
		var ba = this.settings.getBirthArray();
		var sa = this.settings.getSustainArray();
		var len = ba.length;
		for (var i = 0; i < len; i++){
			this.settingsView.setBirthArrayVal(i, ba[i]==1);
			this.settingsView.setSustainArrayVal(i, sa[i]==1);
		}

		var wv = this.settings.getSpawnWidth();
		var hv = this.settings.getSpawnHeight();
		var dv = this.settings.getSpawnDensity();
		var yv = this.settings.getSpawnCenterY();
		var xv = this.settings.getSpawnCenterX();
		var lv = this.settings.getLifetime();
		var mv = this.settings.getMutRate();
		var fbv = this.settings.getFitScalerB();
		var fdv = this.settings.getFitScalerD();
		var fsv = this.settings.getFitScalerS();
		var fev = this.settings.getFitScalerE();

		this.settingsView.setWidthVal(wv);
		this.settingsView.setHeightVal(hv);
		this.settingsView.setDensityVal(dv);
		this.settingsView.setSpawnCenterYVal(yv);
		this.settingsView.setSpawnCenterXVal(xv);
		this.settingsView.setLifetimeVal(lv);
		this.settingsView.setMutRateVal(mv);
		this.settingsView.setFitnessBirthVal(fbv);
		this.settingsView.setFitnessDeathVal(fdv);
		this.settingsView.setFitnessSustainVal(fsv);
		this.settingsView.setFitnessExploredVal(fev);


	};
}