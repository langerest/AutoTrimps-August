window.onerror = function catchErrors(msg, url, lineNo, columnNo, error) {
	if (lineNo !== 0) {
		const message = `Message: ${msg} - URL: ${url} - Line: ${lineNo} - Column: ${columnNo} - Error object: ${JSON.stringify(error)}`;
		console.log(`AT logged error: ${message}`);
	}
};

//Loads setting data from localstorage into object
function _loadAutoTrimpsSettings() {
	const settings = JSON.parse(localStorage.getItem('atSettings'));
	if (settings !== null && settings['ATversion'] !== undefined) autoTrimpSettings = settings;
}

//Saves AT settings to localstorage
function safeSetItems(storageName, storageSetting) {
	try {
		localStorage.setItem(storageName, storageSetting);
	} catch (error) {
		if (error.code === 22) debug(`Error: LocalStorage is full, or error. Attempt to delete some portals from your graph or restart browser.`);
	}
}

//Saves AT settings to localstorage
function saveSettings() {
	safeSetItems('atSettings', serializeSettings());
}

function serializeSettings() {
	const settingProperties = {
		boolean: ['enabled', 'enabledU2'],
		value: ['value', 'valueU2'],
		multiValue: ['value', 'valueU2'],
		textValue: ['value', 'valueU2'],
		multiTextValue: ['value', 'valueU2'],
		valueNegative: ['value', 'valueU2'],
		multitoggle: ['value', 'valueU2'],
		mazArray: ['value', 'valueU2'],
		mazDefaultArray: ['value', 'valueU2'],
		dropdown: ['selected', 'selectedU2']
	};

	const settingString = JSON.stringify(
		Object.keys(autoTrimpSettings).reduce((v, item) => {
			const setting = autoTrimpSettings[item];
			let newSetting = { id: v[item] };

			const properties = settingProperties[setting.type];
			if (properties) {
				properties.forEach((property) => (newSetting[property] = setting[property]));
			} else if (setting.type !== 'action' && setting.type !== 'infoclick') {
				newSetting = setting;
			}

			v[item] = newSetting;
			return v;
		}, {})
	);

	return settingString;
}

function dailyModifiersOutput() {
	var daily = game.global.dailyChallenge;
	var dailyMods = dailyModifiers;
	if (!daily) return '';
	var returnText = '';
	for (var item in daily) {
		if (item === 'seed') continue;
		returnText += dailyMods[item].description(daily[item].strength) + '<br>';
	}
	return returnText;
}

//It gets the value of a setting from autoTrimpSettings. If universe isn't set it will return the value relevant for the current universe we're in.
//If universe is set it will return the value from that universe.
//If the setting is not found it will return false.
function getPageSetting(setting, universe = game.global.universe) {
	if (!autoTrimpSettings.hasOwnProperty(setting)) return false;
	const settingType = autoTrimpSettings[setting].type;
	const u2Setting = autoTrimpSettings[setting].universe.indexOf(0) === -1 && setting !== 'universeSetting' && universe === 2;
	const enabled = 'enabled' + (u2Setting ? 'U2' : '');
	const selected = 'selected' + (u2Setting ? 'U2' : '');
	const value = 'value' + (u2Setting ? 'U2' : '');

	if (settingType === 'boolean') return autoTrimpSettings[setting][enabled];
	else if (settingType === 'multiValue') return Array.from(autoTrimpSettings[setting][value]).map((x) => parseFloat(x));
	else if (settingType === 'multiTextValue') return Array.from(autoTrimpSettings[setting][value]).map((x) => String(x));
	else if (settingType === 'textValue' || settingType === 'mazArray' || settingType === 'mazDefaultArray') return autoTrimpSettings[setting][value];
	else if (settingType === 'value' || autoTrimpSettings[setting].type === 'valueNegative') return parseFloat(autoTrimpSettings[setting][value]);
	else if (settingType === 'multitoggle') return parseInt(autoTrimpSettings[setting][value]);
	else if (settingType === 'dropdown') return autoTrimpSettings[setting][selected];
}

//It sets the value of a setting, and then saves the settings.
function setPageSetting(setting, newValue, universe = game.global.universe) {
	if (autoTrimpSettings.hasOwnProperty(setting) === false) return false;

	const settingType = autoTrimpSettings[setting].type;
	const u2Setting = setting !== 'universeSetting' && universe === 2 ? 'U2' : '';
	const enabled = 'enabled' + u2Setting;
	const selected = 'selected' + u2Setting;
	const value = 'value' + u2Setting;

	const enabledIndex = ['boolean'];
	const valueIndex = ['value', 'valueNegative', 'textValue', 'multiTextValue', 'mazArray', 'mazDefaultArray', 'multiValue', 'multitoggle'];
	const selectedIndex = ['dropdown'];

	if (enabledIndex.indexOf(settingType) !== -1) autoTrimpSettings[setting][enabled] = newValue;
	else if (valueIndex.indexOf(settingType) !== -1) autoTrimpSettings[setting][value] = newValue;
	else if (selectedIndex.indexOf(settingType) !== -1) autoTrimpSettings[setting][selected] = newValue;

	//Update button values if necessary
	if (settingType !== 'mazArray' && settingType !== 'mazDefaultArray') updateAutoTrimpSettings(true);
	saveSettings();
}

//Looks at the spamMessages setting and if the message is enabled, it will print it to the message log & console.
function debug(message, messageType, icon) {
	if (!atSettings.initialise.loaded) return;
	const settingArray = getPageSetting('spamMessages');
	let sendMessage = true;

	if (messageType in settingArray) sendMessage = settingArray[messageType];

	if (sendMessage) {
		console.log(`${timeStamp()} ${message}`);
		message_AT(message, messageType, icon);
	}
}

function timeStamp() {
	for (var a = new Date(), b = [a.getHours(), a.getMinutes(), a.getSeconds()], c = 1; 3 > c; c++) 10 > b[c] && (b[c] = '0' + b[c]);
	return b.join(':');
}

function setTitle() {
	const world = game.global.world;
	const versionNumber = document.getElementById('versionNumber').innerHTML;
	document.title = `(${world}) Trimps ${versionNumber}`;
}

function message_AT(message, messageType, icon) {
	const log = document.getElementById('log');
	const needsScroll = log.scrollTop + 10 > log.scrollHeight - log.clientHeight;
	const displayType = getPageSetting('spamMessages').show ? 'block' : 'none';

	const iconPrefix = icon && icon.charAt(0) === '*' ? 'icomoon icon-' : 'glyphicon glyphicon-';
	icon = icon ? icon.replace('*', '') : icon;

	if (game.options.menu.timestamps.enabled) {
		message = `${game.options.menu.timestamps.enabled === 1 ? getCurrentTime() : updatePortalTimer(true)} ${message}`;
	}

	if (icon) message = `<span class="${iconPrefix}${icon}"></span> ${message}`;

	message = `<span class="glyphicon glyphicon-superscript"></span> ${message}`;
	message = `<span class="icomoon icon-text-color"></span>${message}`;

	const messageHTML = `<span class="AutoTrimpsMessage message ${messageType}" style="display: ${displayType}">${message}</span>`;
	const messages = document.getElementsByClassName(`AutoTrimpsMessage`);
	const lastMessageElement = messages.length > 1 ? messages[messages.length - 1] : null;

	if (lastMessageElement && lastMessageElement.innerHTML.includes(message)) {
		const lastMessage = lastMessageElement.innerHTML;
		const countIndex = lastMessage.lastIndexOf(' x');
		const lastMessageWithoutCount = countIndex !== -1 ? lastMessage.slice(0, countIndex) : lastMessage;
		const lastMessageCount = countIndex !== -1 ? parseInt(lastMessage.slice(countIndex + 2)) : 1;
		lastMessageElement.innerHTML = `${lastMessageWithoutCount} x${lastMessageCount + 1}`;
	} else {
		log.innerHTML += messageHTML;
	}

	// Scroll the log if needed
	if (needsScroll) log.scrollTop = log.scrollHeight;

	trimMessages('AutoTrimps');
}

function filterMessage_AT() {
	const logElement = document.getElementById('log');
	const messageElements = document.getElementsByClassName(`AutoTrimpsMessage`);
	const filterElement = document.getElementById(`AutoTrimpsFilter`);
	let messageSetting = getPageSetting('spamMessages');
	const isDisplayed = !getPageSetting('spamMessages').show;
	const displayStyle = isDisplayed ? 'block' : 'none';
	messageSetting.show = isDisplayed;
	saveSettings();
	filterElement.className = getTabClass(isDisplayed);

	Array.from(messageElements).forEach((messageElement) => {
		messageElement.style.display = displayStyle;
	});
	logElement.scrollTop = logElement.scrollHeight;
}

function addAnS(num) {
	return num === 1 ? '' : 's';
}

//Check if the gameUser setting has been set to a valid user.
function gameUserCheck(skipTest) {
	const user = autoTrimpSettings.gameUser.value.trim().toLowerCase();
	const allowedUsers = ['sadaugust', 'kyotie', 'charles'];
	if (!skipTest) allowedUsers.push('test');
	return allowedUsers.includes(user);
}

//DO NOT RUN CODE BELOW THIS LINE -- PURELY FOR TESTING PURPOSES

//Will activate a 24 hour timewarp.
function _getTimeWarpHours(inputHours) {
	let timeWarpHours = 24; // default value

	if (inputHours) {
		timeWarpHours = inputHours;
	} else {
		try {
			timeWarpHours = parseNum(document.getElementById('setSettingsNameTooltip').value.replace(/[\n\r]/gm, ''));
			if (!timeWarpHours) {
				debug(`Time Warp input is invalid. Defaulting to 24 hours.`, 'test');
			}
		} catch (err) {
			debug(`Time Warp input is invalid. Defaulting to 24 hours.`, 'test');
		}
	}

	return timeWarpHours;
}

//Will activate a 24 hour timewarp.
function testTimeWarp(hours) {
	const timeWarpHours = _getTimeWarpHours(hours);
	const timeToRun = timeWarpHours * 3600000;

	const keys = ['lastOnline', 'portalTime', 'zoneStarted', 'lastSoldierSentAt', 'lastSkeletimp', 'lastChargeAt'];
	_adjustGlobalTimers(keys, -timeToRun);

	offlineProgress.start();
}

function testSpeedX(interval) {
	//Game uses 100ms for 1 second, so 5ms is 20x speed;
	if (game.options.menu.pauseGame.enabled) {
		setTimeout(testSpeedX, interval, interval);
		return;
	}
	const date = new Date();
	const now = date.getTime();
	let tick = 100;

	game.global.lastOnline = now;
	game.global.start = now;

	game.global.zoneStarted -= tick;
	game.global.portalTime -= tick;
	game.global.lastSoldierSentAt -= tick;
	game.global.lastSkeletimp -= tick;
	game.permaBoneBonuses.boosts.lastChargeAt -= tick;
	if (game.global.mapsActive) game.global.mapStarted -= tick;

	mainLoop();
	gameLoop(null, now);
	setTimeout(testSpeedX, interval);

	if (date.getSeconds() % 3 === 0) updateLabels();
}

function testChallenge() {
	//read the name in from tooltip
	const challengeName = document.getElementById('setSettingsNameTooltip').value.replace(/[\n\r]/gm, '');
	try {
		if (challengeName === null || game.challenges[challengeName] === undefined) {
			debug(`Challenge name didn't match one ingame.`, 'test');
			return;
		}
	} catch (err) {
		debug(`Challenge name didn't match one ingame.`, 'test');
		return;
	}
	debug(`Setting challenge to ${challengeName}`, 'test');
	game.global.challengeActive = challengeName;
}

function testRunningC2() {
	game.global.runningChallengeSquared = !game.global.runningChallengeSquared;
}

function testMetalIncome() {
	const secondsPerMap = (trimpStats.hyperspeed2 ? 6 : 8) / maxOneShotPower(true);
	const mapsPerHour = 3600 / secondsPerMap;
	const mapsPerDay = mapsPerHour * 24;
	//Factors in large cache + chronoimp
	let mapTimer = mapsPerDay * 25;
	//Adding avg jestimps into mapTimer calculation
	if (mapsPerDay > 4) mapTimer += Math.floor(mapsPerDay / 5) * 45;
	const mapLevel = game.global.mapsActive ? getCurrentMapObject().level - game.global.world : 0;
	const resourcesGained = scaleToCurrentMap_AT(simpleSeconds_AT('metal', mapTimer, '0,0,1'), false, true, mapLevel);
	debug(`Metal gained from 1 day ${prettify(resourcesGained)}`, 'test');
}

function testEquipmentMetalSpent() {
	const equipMult = getEquipPriceMult();
	let levelCost = 0;
	let prestigeCost = 0;

	function getTotalPrestigeCost(what, prestigeCount) {
		let actualCost = 0;
		for (var i = 1; i <= prestigeCount; i++) {
			const equipment = game.equipment[what];
			let prestigeMod;
			const nextPrestigeCount = i + 1;
			if (nextPrestigeCount >= 4) prestigeMod = (nextPrestigeCount - 3) * 0.85 + 2;
			else prestigeMod = nextPrestigeCount - 1;
			let prestigeCost = Math.round(equipment.oc * Math.pow(1.069, prestigeMod * game.global.prestige.cost + 1)) * equipMult;
			actualCost += prestigeCost;

			//Calculate cost of current equip levels
			if (prestigeCount === i && equipment.level > 1) {
				let finalCost = prestigeCost;

				for (var j = 2; j <= equipment.level; j++) {
					levelCost += finalCost * Math.pow(1.2, j - 1);
				}
			}
		}

		return actualCost;
	}

	for (let i in MODULES.equipment) {
		if (game.equipment[i].locked) continue;
		prestigeCost += getTotalPrestigeCost(i, game.equipment[i].prestige - 1);
	}

	debug(`Cost of all prestiges: ${prettify(prestigeCost)}`, 'test');
	debug(`Cost of all equip levels: ${prettify(levelCost)}`, 'test');
	debug(`Cost of all equipment: ${prettify(prestigeCost + levelCost)}`, 'test');
}

function testMaxMapBonus() {
	game.global.mapBonus = 10;
}

function testMaxTenacity() {
	game.global.zoneStarted -= 7.2e6;
}

function testWorldCell() {
	if (game.global.mapsActive || game.global.preMapsActive) return;

	game.global.lastClearedCell = game.global.gridArray.length - 2;
	game.global.gridArray[game.global.lastClearedCell + 1].health = 0;
	game.global.gridArray[game.global.gridArray.length - 1].health = 0;
}

function testMapCell() {
	if (!game.global.mapsActive) return;

	game.global.lastClearedMapCell = getCurrentMapObject().size - 2;
	game.global.mapGridArray[game.global.lastClearedMapCell + 1].health = 0;
	game.global.mapGridArray[getCurrentMapObject().size - 2].health = 0;
}

function testTrimpStats() {
	game.global.soldierCurrentAttack *= 1e100;
	game.global.soldierHealth *= 1e100;
	game.global.soldierHealthMax *= 1e100;
}

function getAncientTreasureName() {
	return game.global.universe === 2 ? 'Atlantrimp' : 'Trimple Of Doom';
}

function resourcesFromMap(resource, cache, jobRatio, mapLevel, mapCount) {
	let mapTime = cache[0] === 'l' ? 20 : cache[0] === 's' ? 10 : 0;
	if (game.unlocks.imps.Chronoimp) mapTime += 5;
	mapTime = mapTime > 0 ? (mapTime *= mapCount) : mapCount;
	if (game.unlocks.imps.Jestimp) mapTime += Math.floor(mapCount / 5) * 45;

	return scaleToCurrentMap_AT(simpleSeconds_AT(resource, mapTime, jobRatio), false, true, mapLevel);
}

// Factor in the resource reduction from spending time farming during Decay or Melt
function decayLootMult(mapCount) {
	const challengeName = game.global.universe === 2 ? 'Melt' : 'Decay';
	if (!challengeActive(challengeName)) return 1;

	const mapClearTime = (trimpStats.hyperspeed2 ? 6 : 8) / maxOneShotPower(true);
	const stackCap = game.challenges[challengeName].maxStacks;
	let lootMult = 1;
	let decayStacks = game.challenges[challengeName].stacks;
	for (let x = 0; x < mapCount; x++) {
		lootMult /= Math.pow(game.challenges[challengeName].decayValue, Math.floor(decayStacks));
		decayStacks = Math.min(decayStacks + mapClearTime, stackCap);
		lootMult *= Math.pow(game.challenges[challengeName].decayValue, Math.floor(decayStacks));
	}
	return lootMult;
}

function hypothermiaBonfireCost() {
	if (!challengeActive('Hypothermia')) return 0;
	let cost = game.challenges.Hypothermia.bonfirePrice();
	if (cost > game.resources.wood.owned) return 0;
	let bonfiresOwned = game.challenges.Hypothermia.totalBonfires;
	while (game.resources.wood.owned > cost + Math.pow(100, bonfiresOwned + 1) * 1e10) {
		bonfiresOwned++;
		cost += Math.pow(100, bonfiresOwned) * 1e10;
	}
	return cost;
}

function hypothermiaEndZone() {
	if (!challengeActive('Hypothermia')) return Infinity;
	const hypoDefaultSettings = getPageSetting('hypothermiaSettings')[0];
	if (!hypoDefaultSettings) return Infinity;
	const hypoEndZone = hypoDefaultSettings.frozencastle;
	if (!hypoEndZone) return Infinity;
	return parseInt(hypoEndZone[0]);
}

function getPriorityOrder() {
	let order = [];
	let settingsList = [];

	//U1
	if (game.global.universe === 1) settingsList = ['Prestige Raiding', 'Bionic Raiding', 'Map Farm', 'HD Farm', 'Void Maps', 'Map Bonus', 'Toxicity'];
	//U2
	if (game.global.universe === 2) settingsList = ['Desolation Gear Scum', 'Prestige Raiding', 'Smithy Farm', 'Map Farm', 'Tribute Farm', 'Worshipper Farm', 'Quagmire', 'Insanity', 'Alchemy', 'Hypothermia', 'HD Farm', 'Void Maps', 'Map Bonus'];

	const settingNames = {
		'Prestige Raiding': { settingName: 'raiding' },
		'Bionic Raiding': { settingName: 'bionicRaiding' },
		'Map Farm': { settingName: 'mapFarm' },
		'HD Farm': { settingName: 'hdFarm' },
		'Void Maps': { settingName: 'voidMap' },
		'Map Bonus': { settingName: 'mapBonus' },
		Toxicity: { settingName: 'toxicity', challenge: 'Toxicity' },
		'Desolation Gear Scum': { settingName: 'desolation', challenge: 'Desolation' },
		'Smithy Farm': { settingName: 'smithyFarm' },
		'Tribute Farm': { settingName: 'tributeFarm' },
		'Worshipper Farm': { settingName: 'worshipperFarm' },
		Quagmire: { settingName: 'quagmire', challenge: 'Quagmire' },
		Insanity: { settingName: 'insanity', challenge: 'Insanity' },
		Alchemy: { settingName: 'alchemy', challenge: 'Alchemy' },
		Hypothermia: { settingName: 'hypothermia', challenge: 'Hypothermia' }
	};

	for (let i = 0; i < settingsList.length; i++) {
		const setting = settingNames[settingsList[i]];
		const settingName = setting.settingName + 'Settings';
		//Skip settings that have a challenge and the challenge isn't active
		if (setting.challenge && !challengeActive(setting.challenge)) continue;
		const settingData = getPageSetting(settingName);
		for (let y = 1; y < settingData.length; y++) {
			if (typeof settingData[y].runType !== 'undefined' && settingData[y].runType !== 'All') {
				//Dailies
				if (trimpStats.isDaily) {
					if (settingData[y].runType !== 'Daily') continue;
				}
				//C2/C3 runs + special challenges
				else if (trimpStats.isC3) {
					if (settingData[y].runType !== 'C3') continue;
					else if (settingData[y].challenge3 !== 'All' && !challengeActive(settingData[y].challenge3)) continue;
				} else if (trimpStats.isOneOff) {
					if (settingData[y].runType !== 'One Off') continue;
					else if (settingData[y].challengeOneOff !== 'All' && !challengeActive(settingData[y].challengeOneOff)) continue;
				}
				//Fillers (non-daily/c2/c3) and One off challenges
				else {
					if (settingData[y].runType === 'Filler') {
						var currChallenge = settingData[y].challenge === 'No Challenge' ? '' : settingData[y].challenge;
						if (settingData[y].challenge !== 'All' && !challengeActive(currChallenge)) continue;
					} else continue;
				}
			}
			settingData[y].name = settingsList[i];
			settingData[y].index = i;
			order.push(settingData[y]);
		}
	}
	order.sort(function (a, b) {
		if (a.priority === b.priority) return a.index === b.index ? (a.world === b.world ? (a.cell > b.cell ? 1 : -1) : a.world > b.world ? 1 : -1) : a.index > b.index ? 1 : -1;
		return a.priority > b.priority ? 1 : -1;
	});
	return order;
}

function getPerkModifier(what) {
	return game.portal[what].modifier || 0;
}
