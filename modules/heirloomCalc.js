if (typeof MODULES === 'undefined') MODULES = {};

if (typeof $$ !== 'function') {
    $$ = function (a) {
        return document.querySelector(a);
    };
    $$$ = function (a) {
        return [].slice.apply(document.querySelectorAll(a));
    };

    function legalizeInput(settingID) {
        if (!settingID) return;
        settingID = document.getElementById(settingID);
        var defaultValue = settingID.placeholder;
        var minValue = settingID.min;
        var maxValue = settingID.max;
        var val = 0;

        val = parseFloat(settingID.value);
        var badNum = isNaN(val);
        if (badNum) {
            val = defaultValue;
        }
        if (minValue !== null && val < minValue) {
            settingID.value = minValue;
        } else if (maxValue !== null && val > maxValue) {
            settingID.value = maxValue;
        } else {
            settingID.value = val;
        }
    }
}

//Lists name of all mods and their step amounts, soft caps, and hard caps.
function heirloomInfo(type) {
    var heirloomMods = {};
    if (type === 'Shield')
        heirloomMods = {
            breedSpeed: {
                name: 'Breed Speed',
                type: 'Shield',
                get weighable() {
                    return game.global.universe !== 2;
                },
                stepAmounts: [1, 1, 1, 1, 3, 3, 3, 3, 3, 5, 10, 10],
                softCaps: [10, 10, 10, 20, 100, 130, 160, 190, 220, 280, 360, 400]
            },
            critChance: {
                name: 'Crit Chance',
                type: 'Shield',
                weighable: true,
                stepAmounts: [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.3, 0.5, 0.5, 0.25, 0.3],
                softCaps: [2.6, 2.6, 2.6, 5, 7.4, 9.8, 12.2, 15.9, 30, 50, 80, 95],
                hardCaps: [30, 30, 30, 30, 30, 30, 30, 30, 100, 125, 200, 260],
                heirloopy: true
            },
            critDamage: {
                name: 'Crit Damage',
                type: 'Shield',
                weighable: true,
                stepAmounts: [5, 5, 5, 5, 10, 10, 10, 10, 15, 20, 25, 50],
                softCaps: [60, 60, 60, 100, 200, 300, 400, 500, 650, 850, 1100, 1700]
            },
            plaguebringer: {
                name: 'Plaguebringer',
                type: 'Shield',
                weighable: true,
                stepAmounts: [0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0.5, 0.5, 0.5],
                softCaps: [0, 0, 0, 0, 0, 0, 0, 0, 15, 30, 45, 50],
                hardCaps: [0, 0, 0, 0, 0, 0, 0, 0, 75, 100, 125, 150],
                heirloopy: true
            },
            playerEfficiency: {
                name: 'Player Efficiency',
                type: 'Shield',
                weighable: false,
                stepAmounts: [1, 1, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
                softCaps: [16, 16, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192]
            },
            storageSize: {
                name: 'Storage Size',
                type: 'Shield',
                weighable: false,
                stepAmounts: [4, 4, 4, 4, 8, 16, 16, 16, 16, 0, 0, 0],
                softCaps: [64, 64, 64, 128, 256, 512, 768, 1024, 1280, 0, 0, 0]
            },
            trainerEfficiency: {
                name: 'Trainer Efficiency',
                type: 'Shield',
                weighable: false,
                stepAmounts: [1, 1, 1, 2, 2, 2, 2, 2, 2, 0, 0, 0],
                softCaps: [20, 20, 20, 40, 60, 80, 100, 120, 140, 0, 0, 0]
            },
            trimpAttack: {
                name: 'Trimp Attack',
                type: 'Shield',
                weighable: true,
                stepAmounts: [2, 2, 2, 2, 5, 5, 5, 6, 8, 10, 10, 20],
                softCaps: [20, 20, 20, 40, 100, 150, 200, 260, 356, 460, 750, 1100]
            },
            trimpBlock: {
                name: 'Trimp Block',
                type: 'Shield',
                weighable: false,
                stepAmounts: [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
                softCaps: [7, 7, 7, 10, 40, 60, 80, 100, 120, 0, 0, 0]
            },
            trimpHealth: {
                name: 'Trimp Health',
                type: 'Shield',
                weighable: true,
                stepAmounts: [2, 2, 2, 2, 5, 5, 5, 6, 8, 10, 10, 20],
                softCaps: [20, 20, 20, 40, 100, 150, 200, 260, 356, 460, 750, 1100]
            },
            voidMaps: {
                name: 'Void Map Drop Chance',
                type: 'Shield',
                weighable: true,
                stepAmounts: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.25, 0.25, 0.1, 0.1],
                softCaps: [7, 7, 7, 11, 16, 22, 30, 38, 50, 60, 7, 12],
                hardCaps: [50, 50, 50, 50, 50, 50, 50, 50, 80, 99, 40, 50],
                heirloopy: true
            },
            prismatic: {
                name: 'Prismatic Shield',
                type: 'Shield',
                get weighable() {
                    return game.global.universe === 2;
                },
                stepAmounts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2],
                softCaps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 40, 60],
                hardCaps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 250, 500, 750],
                immutable: true
            },
            gammaBurst: {
                name: 'Gamma Burst',
                type: 'Shield',
                weighable: true,
                stepAmounts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0],
                softCaps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 2000, 0, 0]
            },
            inequality: {
                name: 'Inequality',
                type: 'Shield',
                get weighable() {
                    return game.global.universe === 2;
                },
                stepAmounts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.25],
                softCaps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200],
                hardCaps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 400]
            }
        };
    else if (type === 'Staff')
        heirloomMods = {
            DragimpSpeed: {
                name: 'Dragimp Efficiency',
                type: 'Staff',
                weighable: true,
                stepAmounts: [1, 1, 1, 1, 2, 4, 8, 16, 32, 64, 128, 256],
                softCaps: [6, 6, 6, 12, 40, 80, 160, 320, 640, 1280, 2560, 5120]
            },
            ExplorerSpeed: {
                name: 'Explorer Efficiency',
                type: 'Staff',
                weighable: true,
                stepAmounts: [1, 1, 1, 1, 2, 4, 8, 16, 32, 64, 128, 256],
                softCaps: [6, 6, 6, 12, 40, 80, 160, 320, 640, 1280, 2560, 5120]
            },
            FarmerSpeed: {
                name: 'Farmer Efficiency',
                type: 'Staff',
                weighable: true,
                stepAmounts: [1, 1, 1, 1, 2, 4, 8, 16, 32, 64, 128, 256],
                softCaps: [6, 6, 6, 12, 40, 80, 160, 320, 640, 1280, 2560, 5120]
            },
            FluffyExp: {
                name: 'Pet Exp',
                type: 'Staff',
                weighable: true,
                stepAmounts: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1.2],
                softCaps: [0, 0, 0, 0, 0, 0, 0, 0, 50, 100, 200, 400],
                heirloopy: true
            },
            LumberjackSpeed: {
                name: 'Lumberjack Efficiency',
                type: 'Staff',
                weighable: true,
                stepAmounts: [1, 1, 1, 1, 2, 4, 8, 16, 32, 64, 128, 256],
                softCaps: [6, 6, 6, 12, 40, 80, 160, 320, 640, 1280, 2560, 5120]
            },
            MinerSpeed: {
                name: 'Miner Efficiency',
                type: 'Staff',
                weighable: true,
                stepAmounts: [1, 1, 1, 1, 2, 4, 8, 16, 32, 64, 128, 256],
                softCaps: [6, 6, 6, 12, 40, 80, 160, 320, 640, 1280, 2560, 5120]
            },
            ScientistSpeed: {
                name: 'Scientist Efficiency',
                type: 'Staff',
                weighable: true,
                stepAmounts: [1, 1, 1, 1, 2, 4, 8, 16, 32, 64, 128, 256],
                softCaps: [6, 6, 6, 12, 40, 80, 160, 320, 640, 1280, 2560, 5120]
            },
            foodDrop: {
                name: 'Food Drop Rate',
                type: 'Staff',
                weighable: false,
                stepAmounts: [1, 1, 1, 1, 2, 4, 8, 16, 32, 64, 128, 256],
                softCaps: [6, 6, 6, 12, 40, 80, 160, 320, 640, 1280, 2560, 5120]
            },
            fragmentsDrop: {
                name: 'Fragment Drop Rate',
                type: 'Staff',
                weighable: false,
                stepAmounts: [1, 1, 1, 1, 2, 4, 8, 16, 32, 64, 128, 256],
                softCaps: [6, 6, 6, 12, 40, 80, 160, 320, 640, 1280, 2560, 5120]
            },
            gemsDrop: {
                name: 'Gem Drop Rate',
                type: 'Staff',
                weighable: false,
                stepAmounts: [1, 1, 1, 1, 2, 4, 8, 16, 32, 64, 128, 256],
                softCaps: [6, 6, 6, 12, 40, 80, 160, 320, 640, 1280, 2560, 5120]
            },
            metalDrop: {
                name: 'Metal Drop Rate',
                type: 'Staff',
                weighable: false,
                stepAmounts: [1, 1, 1, 1, 2, 4, 8, 16, 32, 64, 128, 256],
                softCaps: [6, 6, 6, 12, 40, 80, 160, 320, 640, 1280, 2560, 5120]
            },
            woodDrop: {
                name: 'Wood Drop Rate',
                type: 'Staff',
                weighable: false,
                stepAmounts: [1, 1, 1, 1, 2, 4, 8, 16, 32, 64, 128, 256],
                softCaps: [6, 6, 6, 12, 40, 80, 160, 320, 640, 1280, 2560, 5120]
            },
            ParityPower: {
                name: 'Parity Power',
                type: 'Staff',
                weighable: true,
                stepAmounts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
                softCaps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 500]
            }
        };
    else if (type === 'Core')
        heirloomMods = {
            fireTrap: {
                name: 'Fire',
                type: 'Core',
                weighable: true,
                stepAmounts: [1, 1, 1, 1, 2, 3, 4],
                softCaps: [25, 25, 25, 50, 100, 199, 400],
                immutable: true
            },
            poisonTrap: {
                name: 'Poison',
                type: 'Core',
                weighable: true,
                stepAmounts: [1, 1, 1, 1, 2, 3, 4],
                softCaps: [25, 25, 25, 50, 100, 199, 400],
                immutable: true
            },
            lightningTrap: {
                name: 'Lightning',
                type: 'Core',
                weighable: true,
                stepAmounts: [0, 0, 1, 1, 2, 2, 3],
                softCaps: [0, 0, 10, 20, 50, 100, 199],
                immutable: true
            },
            strengthEffect: {
                name: 'Strength',
                type: 'Core',
                weighable: true,
                stepAmounts: [1, 1, 1, 1, 2, 2, 3],
                softCaps: [10, 10, 10, 20, 50, 100, 199],
                immutable: true
            },
            condenserEffect: {
                name: 'Condenser',
                type: 'Core',
                weighable: true,
                stepAmounts: [0, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5],
                softCaps: [0, 5, 5, 10, 15, 20, 30],
                hardCaps: [0, 10, 10, 15, 25, 35, 50],
                immutable: true
            },
            runestones: {
                name: 'Runestones',
                type: 'Core',
                weighable: true,
                stepAmounts: [1, 1, 1, 1, 2, 3, 4],
                softCaps: [25, 25, 25, 50, 100, 199, 400],
                immutable: true
            },
            empty: {
                name: 'Empty',
                weighable: false
            }
        };

    return heirloomMods;
}

MODULES.autoHeirlooms = {};
MODULES.heirloomUI = {};

function setupHeirloomUI() {
    var heirloomInputs = JSON.parse(localStorage.getItem('heirloomInputs'));
    //Setting up data of id, names, and descriptions for each input.
    const inputBoxes = {
        //Top Row
        row1: {
            equipLevels: {
                name: 'Weapon Levels',
                description: 'The amount of weapon (primarily Dagger) levels that you have at the end of your runs.',
                minValue: 1,
                maxValue: null,
                defaultValue: 90
            },
            VMWeight: {
                name: 'Weight: Void Maps',
                description:
                    'VM weight, XP weight, and HP weight are multipliers to the value of the Void Map Drop Chance, Fluffy Exp, and Trimp Health/Breed Speed mods respectively. So if your next VMDC upgrade were to increase your value by 0.5%, the default weight of 12 will multiply it by 12 so it will be calculated as if it were to increase your value by 6%. The default weights (12/11.25) are used to provide a good balance between damage and helium/exp gain.',
                minValue: 0,
                maxValue: null,
                defaultValue: 0
            },
            XPWeight: {
                name: 'Weight: XP',
                description:
                    'VM weight, XP weight, and HP weight are multipliers to the value of the Void Map Drop Chance, Fluffy Exp, and Trimp Health/Breed Speed mods respectively. So if your next VMDC upgrade were to increase your value by 0.5%, the default weight of 12 will multiply it by 12 so it will be calculated as if it were to increase your value by 6%. The default weights (12/11.25) are used to provide a good balance between damage and helium/exp gain.',
                minValue: 0,
                maxValue: null,
                defaultValue: 0
            },
            HPWeight: {
                name: 'Weight: HP',
                description:
                    'VM weight, XP weight, and HP weight are multipliers to the value of the Void Map Drop Chance, Fluffy Exp, and Trimp Health/Breed Speed mods respectively. So if your next VMDC upgrade were to increase your value by 0.5%, the default weight of 12 will multiply it by 12 so it will be calculated as if it were to increase your value by 6%. The default weights (12/11.25) are used to provide a good balance between damage and helium/exp gain.',
                minValue: 0,
                maxValue: null,
                defaultValue: 1
            }
        },
        row2: {
            equalityTarget: {
                name: 'Equality Target',
                description: 'The amount of equality that you use for your hardest zones in your run.',
                minValue: 1,
                maxValue: null,
                defaultValue: 100,
                get weighable() {
                    return !game.global.universe === 2;
                }
            }
        }
    };

    //Code to setup each input button for the heirloom UI.
    createInput = function (perkLine, id, inputObj, savedValue, row) {
        if (!id) return;
        if (document.getElementById(id + 'Div') !== null) {
            console.log("You most likely have a setup error in your inputBoxes. It will be trying to access a input box that doesn't exist.");
            return;
        }
        //Creating container for both the label and the input.
        var heirloomDiv = document.createElement('DIV');
        heirloomDiv.id = id + 'Div';
        var style = 'display: inline;';
        //If it's the first input in the row, float it left. If it's the last, float it right.
        if (id === 'equalityTarget') style += ' float: right;';
        else if (inputBoxes[row][Object.keys(inputBoxes[row])[0]] === inputObj) style += ' float: left;';
        else if (inputBoxes[row][Object.keys(inputBoxes[row])[Object.keys(inputBoxes[row]).length - 1]] === inputObj) style += ' float: right;';
        heirloomDiv.setAttribute('style', style);

        //Creating input box for users to enter their own ratios/stats.
        var heirloomInput = document.createElement('Input');
        heirloomInput.setAttribute('type', 'number');
        heirloomInput.id = id;
        var perkInputStyle = 'text-align: center; width: calc(100vw/22); font-size: 1vw;';
        if (game.options.menu.darkTheme.enabled !== 2) perkInputStyle += ' color: black;';
        heirloomInput.setAttribute('style', perkInputStyle);
        heirloomInput.setAttribute('value', savedValue || inputObj.defaultValue);
        heirloomInput.setAttribute('min', inputObj.minValue);
        heirloomInput.setAttribute('max', inputObj.maxValue);
        heirloomInput.setAttribute('placeholder', inputObj.defaultValue);
        heirloomInput.setAttribute('onchange', 'legalizeInput(this.id); saveHeirloomSettings(); calculate();');
        heirloomDiv.setAttribute('onmouseover', 'tooltip("' + inputObj.name + '", "customText", event, "' + inputObj.description + '")');
        heirloomDiv.setAttribute('onmouseout', 'tooltip("hide")');

        var heirloomText = document.createElement('Label');
        heirloomText.id = id + 'Text';
        heirloomText.innerHTML = inputObj.name;
        heirloomText.setAttribute('style', 'margin-right: 0.7vw; width: calc(100vw/12); color: white; font-size: 0.9vw; font-weight: lighter; margin-left: 0.3vw; ');
        //Combining the input and the label into the container. Then attaching the container to the main div.
        heirloomDiv.appendChild(heirloomText);
        heirloomDiv.appendChild(heirloomInput);
        perkLine.appendChild(heirloomDiv);
    };

    MODULES.heirloomUI.GUI = {};

    //Code to remove the heirloom UI. Should never get called anywhere! But it never hurts for it to be setup.
    MODULES.heirloomUI.removeGUI = function () {
        Object.keys(MODULES.heirloomUI.GUI).forEach(function (key) {
            var $elem = MODULES.heirloomUI.GUI[key];
            if (!$elem) {
                console.log('error in: ' + key);
                return;
            }
            if ($elem.parentNode) {
                $elem.parentNode.removeChild($elem);
                delete $elem;
            }
        });
    };

    MODULES.heirloomUI.displayGUI = function () {
        var setupNeeded = false;

        //If the heirloomInputs localstorage value is null, then try to extract the info from AT settings if available.
        if (heirloomInputs === null && typeof autoTrimpSettings !== 'undefined' && typeof autoTrimpSettings.ATversion !== 'undefined' && !autoTrimpSettings.ATversion.includes('SadAugust')) {
            var atSetting = autoTrimpSettings['autoHeirloomStorage']['value' + (game.global.universe === 2 ? 'U2' : '')];
            if (atSetting !== '{"":""}') {
                heirloomInputs = JSON.parse(atSetting);
                localStorage.setItem('heirloomInputs', JSON.stringify(heirloomInputs));
            }
        }
        if (heirloomInputs === null) {
            setupNeeded = true;
            heirloomInputs = {};
        }

        const heirloomGUI = MODULES.heirloomUI.GUI;

        //Setting up a DIV to contain the entire heirloom UI.
        var $buttonbar = document.getElementById('extraHeirlooms');
        $buttonbar.setAttribute('style', 'margin-bottom: 0.2vw;');
        heirloomGUI.$heirloomRatios = document.createElement('DIV');
        heirloomGUI.$heirloomRatios.id = 'heirloomRatios';
        heirloomGUI.$heirloomRatios.setAttribute('style', 'display: none; width: 100%');

        //Line 1 of the UI
        //Populating it through the createInput function
        heirloomGUI.$ratiosLine1 = document.createElement('DIV');
        heirloomGUI.$ratiosLine1.id = 'ratioLine1';
        heirloomGUI.$ratiosLine1.setAttribute('style', 'display: inline-block; text-align: center; width: 100%; margin-bottom: 0.1vw;');
        for (var item in inputBoxes.row1) {
            createInput(heirloomGUI.$ratiosLine1, item, inputBoxes.row1[item], heirloomInputs[item], 'row1');
        }
        heirloomGUI.$heirloomRatios.appendChild(heirloomGUI.$ratiosLine1);

        //Line 2
        //Populating it through the createInput function
        heirloomGUI.$ratiosLine2 = document.createElement('DIV');
        heirloomGUI.$ratiosLine2.id = 'ratioLine2';
        heirloomGUI.$ratiosLine2.setAttribute('style', 'display: inline-block; text-align: center; width: 100%; margin-bottom: 0.1vw;');
        for (var item in inputBoxes.row2) {
            createInput(heirloomGUI.$ratiosLine2, item, inputBoxes.row2[item], heirloomInputs[item], 'row2');
        }
        heirloomGUI.$heirloomRatios.appendChild(heirloomGUI.$ratiosLine2);

        //Adding the heirloom UI to the main heirlooms UI below the section that heirlooms appear when selected.
        var $portalWrapper = document.getElementById('selectedHeirloom').parentNode;
        $portalWrapper.appendChild(heirloomGUI.$heirloomRatios);
        //Setup Allocate Nullifium/Spirestones button
        var apGUI = MODULES.heirloomUI.GUI;
        apGUI.$allocatorBtn = document.createElement('DIV');
        apGUI.$allocatorBtn.id = 'heirloomAllocatorBtn';
        apGUI.$allocatorBtn.setAttribute('class', 'btn ');
        apGUI.$allocatorBtn.setAttribute('onclick', 'runHeirlooms()');
        apGUI.$allocatorBtn.setAttribute('onmouseover', 'tooltip("Auto Allocate", "customText", event, "Buys the shown optimal levels in each modifier when pressed.")');
        apGUI.$allocatorBtn.setAttribute('onmouseout', 'tooltip("hide")');
        var oldstyle = 'background-color: #3b0076; border: 0.1vw solid #777; text-align: center; width: 13.9vw; font-size: 0.9vw; font-weight: lighter; margin-right: 13.88vw';
        if (game.options.menu.darkTheme.enabled !== 2) oldstyle += ' color: black;';
        apGUI.$allocatorBtn.setAttribute('style', oldstyle);
        apGUI.$allocatorBtn.textContent = 'Allocate Nullifium';

        if (document.getElementById(apGUI.$allocatorBtn.id) === null) heirloomGUI.$ratiosLine1.insertBefore(apGUI.$allocatorBtn, document.getElementById('XPWeightDiv'));

        apGUI.$customRatioBtn = document.createElement('DIV');
        apGUI.$customRatioBtn.id = 'heirloomCustomRatioBtn';
        apGUI.$customRatioBtn.setAttribute('class', 'btn settingsBtn settingBtnfalse ');
        apGUI.$customRatioBtn.setAttribute('onclick', 'toggleCustomRatio()');
        apGUI.$customRatioBtn.setAttribute('onmouseover', 'tooltip("Custom Ratio", "customText", event, "Enabling this allows you to set custom ratios for this heirloom.")');
        apGUI.$customRatioBtn.setAttribute('onmouseout', 'tooltip("hide")');
        var oldstyle = 'float:left; border: 0.1vw solid #777; text-align: center; width: 13.9vw; font-size: 0.9vw; font-weight: lighter; margin-right: 13.88vw';
        if (game.options.menu.darkTheme.enabled !== 2) oldstyle += ' color: black;';
        apGUI.$customRatioBtn.setAttribute('style', oldstyle);
        apGUI.$customRatioBtn.textContent = 'Use Custom Ratios';
        if (document.getElementById(apGUI.$customRatioBtn.id) === null) heirloomGUI.$ratiosLine2.insertBefore(apGUI.$customRatioBtn, document.getElementById('equalityTargetDiv'));

        if (setupNeeded) {
            saveHeirloomSettings();
            heirloomInputs = JSON.parse(localStorage.getItem('heirloomInputs'));
        }
        document.getElementById('VMWeightDiv').style.float = 'left';
        document.getElementById('XPWeightDiv').style.float = 'right';
    };

    MODULES.heirloomUI.displayGUI();
}

setupHeirloomUI();

function toggleCustomRatio() {
    const ratioBtn = document.getElementById('heirloomCustomRatioBtn');
    const className = ['settingBtnfalse', 'settingBtntrue'];
    className.splice(className.indexOf(ratioBtn.className.split(' ')[2]), 1);
    ratioBtn.setAttribute('class', 'btn settingsBtn ' + className[0]);

    if (className[0] === 'settingBtntrue') {
        saveHeirloomSettings();
    } else {
        let heirloomInputs = JSON.parse(localStorage.getItem('heirloomInputs'));
        delete heirloomInputs[_getSelectedHeirloom().id];
        localStorage.setItem('heirloomInputs', JSON.stringify(heirloomInputs));
        loadHeirloomSettings();
    }
    calculate();
}

function _getSelectedHeirloom() {
    let heirloom;
    if (game.global.selectedHeirloom[1] === 'heirloomsCarried') heirloom = game.global.heirloomsCarried[game.global.selectedHeirloom[0]];
    else heirloom = game.global[game.global.selectedHeirloom[1]];

    return heirloom;
}

function saveHeirloomSettings() {
    let heirloomInputs = JSON.parse(localStorage.getItem('heirloomInputs'));
    if (heirloomInputs === null) heirloomInputs = {};
    let update = heirloomInputs;
    const customRatio = JSON.parse(document.getElementById('heirloomCustomRatioBtn').className.split(' ')[2].slice(10));
    if (customRatio) {
        heirloomInputs[_getSelectedHeirloom().id] = {};
        update = heirloomInputs[_getSelectedHeirloom().id];
    }

    update.VMWeight = $$('#VMWeight').value;
    update.XPWeight = $$('#XPWeight').value;
    update.HPWeight = $$('#HPWeight').value;
    update.equipLevels = $$('#equipLevels').value;
    update.equalityTarget = $$('#equalityTarget').value;

    localStorage.setItem('heirloomInputs', JSON.stringify(heirloomInputs));
    if (typeof autoTrimpSettings !== 'undefined' && typeof autoTrimpSettings.ATversion !== 'undefined' && autoTrimpSettings.ATversion.includes('SadAugust') && autoTrimpSettings['autoHeirloomStorage']['value' + (game.global.universe === 2 ? 'U2' : '')] !== 'undefined') {
        autoTrimpSettings['autoHeirloomStorage']['value' + (game.global.universe === 2 ? 'U2' : '')] = JSON.stringify(heirloomInputs);
        saveSettings();
    }
}

function loadHeirloomSettings() {
    let heirloomInputs = JSON.parse(localStorage.getItem('heirloomInputs'));
    if (heirloomInputs[_getSelectedHeirloom().id]) {
        heirloomInputs = heirloomInputs[_getSelectedHeirloom().id];
        document.getElementById('heirloomCustomRatioBtn').setAttribute('class', 'btn settingsBtn settingBtntrue');
    } else {
        document.getElementById('heirloomCustomRatioBtn').setAttribute('class', 'btn settingsBtn settingBtnfalse');
    }
    $$('#VMWeight').value = heirloomInputs.VMWeight;
    $$('#XPWeight').value = heirloomInputs.XPWeight;
    $$('#HPWeight').value = heirloomInputs.HPWeight;
    $$('#equipLevels').value = heirloomInputs.equipLevels;
    $$('#equalityTarget').value = heirloomInputs.equalityTarget;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function roundFloatingPointErrors(n) {
    return Number(parseFloat(n.toFixed(2)));
}

class Heirloom {
    constructor(heirloom) {
        // preserve the info of the heirloom
        Object.assign(this, heirloom);
        // then add custom info we need
        if (!this.isEmpty()) {
            const basePrices = [5, 10, 15, 25, 75, 150, 400, 1000, 2500, 7500, 50000, 375000];
            const coreBasePrices = [20, 200, 2000, 20000, 200000, 2000000, 20000000, 200000000, 2000000000, 20000000000, 200000000000, 2000000000000];
            const priceIncreases = [1.5, 1.5, 1.25, 1.19, 1.15, 1.12, 1.1, 1.06, 1.04, 1.03, 1.02, 1.015];
            const settings = JSON.parse(localStorage.getItem('heirloomInputs'));
            this.inputs = settings[this.id] ? settings[this.id] : settings;
            this.isCore = this.type === 'Core';
            this.basePrice = this.isCore ? coreBasePrices[this.rarity] : basePrices[this.rarity];
            this.priceIncrease = priceIncreases[this.rarity];
            this.stepAmounts = {};
            this.foodHeirloom = this.type === 'Staff' && this.name === getPageSetting('heirloomStaffFood');
            this.woodHeirloom = this.type === 'Staff' && this.name === getPageSetting('heirloomStaffWood');
            this.scienceHeirloom = this.type === 'Staff' && this.name === getPageSetting('heirloomStaffScience');
            this.metalHeirloom = !this.foodHeirloom && !this.woodHeirloom && !this.scienceHeirloom;
            for (const mod of this.mods) {
                if (mod[0] === 'empty') continue;
                this.stepAmounts[mod[0]] = this.getStepAmount(mod[0], this.rarity);
            }
            this.softCaps = {};
            for (const mod of this.mods) {
                if (mod[0] === 'empty') continue;
                this.softCaps[mod[0]] = this.getSoftCap(mod[0], this.rarity);
            }
            this.hardCaps = {};
            for (const mod of this.mods) {
                if (mod[0] === 'empty') continue;
                if (this.heirloomInfo[mod[0]].hardCaps !== undefined) this.hardCaps[mod[0]] = this.getHardCap(mod[0], this.rarity);
            }
        }
    }

    getStepAmount(type, rarity) {
        if ((this.heirloomInfo[type].heirloopy && Fluffy.isRewardActive('heirloopy')) || this.heirloomInfo[type].immutable || type === 'inequality') return this.heirloomInfo[type].stepAmounts[rarity];
        if (game.global.universe === 2) return this.heirloomInfo[type].stepAmounts[rarity] / 10;
        return this.heirloomInfo[type].stepAmounts[rarity];
    }

    getSoftCap(type, rarity) {
        if ((this.heirloomInfo[type].heirloopy && Fluffy.isRewardActive('heirloopy')) || this.heirloomInfo[type].immutable || type === 'inequality') return this.heirloomInfo[type].softCaps[rarity];
        if (game.global.universe === 2) return this.heirloomInfo[type].softCaps[rarity] / 10;
        return this.heirloomInfo[type].softCaps[rarity];
    }

    getHardCap(type, rarity) {
        if ((this.heirloomInfo[type].heirloopy && Fluffy.isRewardActive('heirloopy')) || this.heirloomInfo[type].immutable || type === 'inequality') return this.heirloomInfo[type].hardCaps[rarity];
        if (game.global.universe === 2) return this.heirloomInfo[type].hardCaps[rarity] / 10;
        return this.heirloomInfo[type].hardCaps[rarity];
    }

    normalizedCrit(critChance, critDamage, megaCrits, megaCritMult) {
        if (megaCrits === 0) {
            return critDamage * critChance + (1 - critChance) * 100;
        }
        const lowCrit = 1 - critChance;
        return critDamage * Math.pow(megaCritMult, megaCrits - 1) * (lowCrit + critChance * megaCritMult);
    }

    get innate() {
        return this.getInnate(this.getTotalSpent());
    }

    // custom methods for ease of use
    isEmpty() {
        if (this.type === undefined) return true;
        return false;
    }

    hasUpgradableMods() {
        if (this.isEmpty()) return false;
        for (const mod of this.mods) {
            if (this.getModEfficiency(mod[0]) > 1) return true;
        }
        return false;
    }

    getModValue(type) {
        for (const mod of this.mods) {
            if (mod[0] === type) {
                if ((this.heirloomInfo[type].heirloopy && Fluffy.isRewardActive('heirloopy')) || this.heirloomInfo[type].immutable || type === 'inequality') return mod[1];
                if (game.global.universe === 2) return mod[1] / 10;
                return mod[1];
            }
        }
        return 0;
    }

    getModDefaultValue(type) {
        for (const mod of this.mods) {
            if (mod[0] === type) {
                return mod[1];
            }
        }
        return 0;
    }

    getModGain(type) {
        const value = this.getModValue(type);
        const stepAmount = this.stepAmounts[type];
        if (this.hardCaps[type] && value >= this.hardCaps[type]) return 1;
        if (type === 'trimpAttack') {
            return (value + 100 + stepAmount) / (value + 100);
        }
        if (type === 'trimpHealth') {
            return (value + 100 + stepAmount * this.inputs.HPWeight) / (value + 100);
        }
        if (type === 'breedSpeed') {
            // magic number is log(1.01) / log(1 / 0.98)
            return (100 * Math.pow(value + stepAmount * this.inputs.HPWeight, 0.492524625)) / (100 * Math.pow(value, 0.492524625));
        }
        if (type === 'prismatic') {
            // 50 base, 50 from prismatic palace
            var shieldPercent = 100;
            shieldPercent += game.portal.Prismal.radLevel;
            if (Fluffy.isRewardActive('prism')) shieldPercent += 25;

            return (value + shieldPercent + 100 + stepAmount * this.inputs.HPWeight) / (value + shieldPercent + 100);
        }
        if (type === 'critDamage') {
            const relentlessness = game.global.universe === 2 ? 0 : game.portal.Relentlessness.level;
            const criticality = game.global.universe === 2 ? game.portal.Criticality.radLevel : 0;
            var critChance = relentlessness * 5;
            var megaCritMult = 5;
            if (game.talents.crit.purchased) critChance += this.getModValue('critChance') * 1.5;
            else critChance += this.getModValue('critChance');
            if (Fluffy.isRewardActive('critChance')) critChance += 50 * Fluffy.isRewardActive('critChance');
            if (critChance === 0) return 1;
            if (Fluffy.isRewardActive('megaCrit')) megaCritMult += 2;
            if (game.talents.crit.purchased) megaCritMult += 1;
            const megaCrits = Math.floor(critChance / 100);
            critChance = Math.min(critChance - megaCrits * 100, 100) / 100;
            const critDamage = value + 230 * Math.min(relentlessness, 1) + 30 * Math.max(Math.min(relentlessness, 10) - 1, 0) + criticality * 10;
            const critDmgNormalizedBefore = this.normalizedCrit(critChance, critDamage, megaCrits, megaCritMult);
            const critDmgNormalizedAfter = this.normalizedCrit(critChance, critDamage + stepAmount, megaCrits, megaCritMult);

            return critDmgNormalizedAfter / critDmgNormalizedBefore;
        }
        if (type === 'critChance') {
            const relentlessness = game.global.universe === 2 ? 0 : game.portal.Relentlessness.level;
            const criticality = game.global.universe === 2 ? game.portal.Criticality.radLevel : 0;
            var critChanceBefore = relentlessness * 5;
            var critChanceAfter = relentlessness * 5;
            var critDamage = 230 * Math.min(relentlessness, 1) + 30 * Math.max(Math.min(relentlessness, 10) - 1, 0) + criticality * 10;
            var megaCritMult = 5;
            if (game.talents.crit.purchased) critChanceBefore += value * 1.5;
            else critChanceBefore += value;
            if (game.talents.crit.purchased) critChanceAfter += value * 1.5;
            else critChanceAfter += value;
            if (isNumeric(this.getModValue('critDamage'))) {
                critDamage += this.getModValue('critDamage');
            }
            if (critDamage === 0) return 1;
            if (Fluffy.isRewardActive('critChance')) {
                critChanceBefore += 50 * Fluffy.isRewardActive('critChance');
            }
            if (Fluffy.isRewardActive('megaCrit')) {
                megaCritMult += 2;
            }
            if (game.talents.crit.purchased) {
                megaCritMult += 1;
            }
            const megaCritsBefore = Math.floor(critChanceBefore / 100);
            const megaCritsAfter = Math.floor((critChanceBefore + (game.talents.crit.purchased ? stepAmount * 1.5 : stepAmount)) / 100);
            critChanceAfter = Math.min(critChanceBefore + (game.talents.crit.purchased ? stepAmount * 1.5 : stepAmount) - megaCritsAfter * 100, 100) / 100;
            critChanceBefore = Math.min(critChanceBefore - megaCritsBefore * 100, 100) / 100;
            const critDmgNormalizedBefore = this.normalizedCrit(critChanceBefore, critDamage, megaCritsBefore, megaCritMult);
            const critDmgNormalizedAfter = this.normalizedCrit(critChanceAfter, critDamage, megaCritsAfter, megaCritMult);

            return critDmgNormalizedAfter / critDmgNormalizedBefore;
        }
        if (type === 'voidMaps') {
            if (game.global.universe === 2) return (value + stepAmount * (this.inputs.VMWeight / 10)) / value;
            return (value + stepAmount * this.inputs.VMWeight) / value;
        }
        if (type === 'gammaBurst') {
            return ((value + stepAmount) / 100 + 1) / 5 / ((value / 100 + 1) / 5);
        }
        if (type === 'FluffyExp') {
            return (value + 100 + stepAmount * this.inputs.XPWeight) / (value + 100);
        }
        if (type === 'plaguebringer') {
            return (value + 100 + stepAmount) / (value + 100);
        }
        if (type === 'DragimpSpeed') {
            return Math.log(((value + 1 + stepAmount) / (value + 128)) * (Math.pow(1.2, this.inputs.equipLevels) - 1) + 1) / Math.log(1.2) / this.inputs.equipLevels;
        }
        if (type === 'ExplorerSpeed') {
            return Math.log(((value + 1 + stepAmount) / (value + 128)) * (Math.pow(1.2, this.inputs.equipLevels) - 1) + 1) / Math.log(1.2) / this.inputs.equipLevels;
        }
        if (type === 'FarmerSpeed' && this.foodHeirloom) {
            return Math.log(((value + 100 + stepAmount) / (value + 100)) * (Math.pow(1.2, this.inputs.equipLevels) - 1) + 1) / Math.log(1.2) / this.inputs.equipLevels;
        }
        if (type === 'LumberjackSpeed' && this.woodHeirloom) {
            return Math.log(((value + 100 + stepAmount) / (value + 100)) * (Math.pow(1.2, this.inputs.equipLevels) - 1) + 1) / Math.log(1.2) / this.inputs.equipLevels;
        }
        if (type === 'MinerSpeed' && this.metalHeirloom) {
            return Math.log(((value + 100 + stepAmount) / (value + 100)) * (Math.pow(1.2, this.inputs.equipLevels) - 1) + 1) / Math.log(1.2) / this.inputs.equipLevels;
        }
        if (type === 'ScientistSpeed' && this.scienceHeirloom) {
            return Math.log(((value + 100 + stepAmount) / (value + 100)) * (Math.pow(1.2, this.inputs.equipLevels) - 1) + 1) / Math.log(1.2) / this.inputs.equipLevels;
        }
        if (type === 'ParityPower' && !this.scienceHeirloom) {
            return Math.log(((value + 1 + stepAmount) / (value + 1)) * (Math.pow(1.2, this.inputs.equipLevels) - 1) + 1) / Math.log(1.2) / this.inputs.equipLevels;
        }
        if (type === 'inequality') {
            return Math.pow((1 - 0.1 * (1 - (value + stepAmount) / 100)) / 0.9, this.inputs.equalityTarget) / Math.pow((1 - 0.1 * (1 - value / 100)) / 0.9, this.inputs.equalityTarget);
        }
        if (this.isCore) {
            loadCore(this);
            const before = getMaxEnemyHP();
            const beforeRS = estimatedMaxDifficulty(getMaxEnemyHP()).runestones;
            loadCore(this, type, value + stepAmount);
            const after = getMaxEnemyHP();
            const afterRS = estimatedMaxDifficulty(getMaxEnemyHP()).runestones;
            // 0.971 is the andrew constant, thanks andrew
            // also ghostfrog, pls pm me to tell me how I did this wrong again
            if (type === 'runestones') return (afterRS / beforeRS - 1) * 0.971 + 1;
            return after / before;
        }
        return 0;
    }

    getModEfficiency(type) {
        if (type === 'empty') return 1;
        if (this.heirloomInfo[type].weighable) {
            const modCost = this.getModCost(type);
            if (modCost >= 1e100) return 0;
            return (this.getModGain(type) - 1) / (modCost / this.basePrice) + 1;
        }
        return 1;
    }

    // add arrays for max normal values, if below or equal to, return normal price, else divide the amount over the normal value by the step to get amount and calculate the price with the amount
    getModCost(type) {
        if (type === 'empty') return 1e100;
        const value = this.getModValue(type);
        if (value <= this.softCaps[type] || !isNumeric(value)) return this.basePrice;
        const amount = (value - this.softCaps[type]) / this.stepAmounts[type];
        if (this.hardCaps[type]) return value >= this.hardCaps[type] ? 1e100 : Math.floor(this.basePrice * Math.pow(this.priceIncrease, amount));
        return Math.floor(this.basePrice * Math.pow(this.priceIncrease, amount));
    }

    getModSpent(type) {
        var cost = 0;
        if (type === 'empty') return cost;
        const dummyHeirloom = new Heirloom(deepClone(this));
        for (const mod of dummyHeirloom.mods) {
            if (mod[0] === type) {
                const stepAmount = this.heirloomInfo[type].stepAmounts[this.rarity];
                const name = type;
                const targetValue = mod[1];
                mod[1] -= mod[3] * stepAmount;
                while (mod[1] < targetValue) {
                    cost += dummyHeirloom.getModCost(name);
                    mod[1] += stepAmount;
                    mod[1] = roundFloatingPointErrors(mod[1]);
                }
            }
        }
        return cost;
    }

    getTotalSpent() {
        if (this.isEmpty()) return 0;
        var cost = 0;
        if (this.replaceSpent) cost += this.replaceSpent;
        for (const mod of this.mods) {
            if (mod[0] !== 'empty') cost += this.getModSpent(mod[0]);
        }
        if (this.isCore) return cost;
        return cost;
    }

    getDamageMult() {
        var trimpAttackMult = 1 + this.getModValue('trimpAttack') / 100;
        trimpAttackMult *= Math.pow((1 - 0.1 * (1 - this.getModValue('inequality') / 100)) / 0.9, this.inputs.equalityTarget);
        const relentlessness = game.global.universe === 2 ? 0 : game.portal.Relentlessness.level;
        const criticality = game.global.universe === 2 ? game.portal.Criticality.radLevel : 0;
        var critChance = relentlessness * 5;
        var megaCritMult = 5;
        if (game.talents.crit.purchased) critChance += this.getModValue('critChance') * 1.5;
        else critChance += this.getModValue('critChance');
        if (Fluffy.isRewardActive('critChance')) critChance += 50 * Fluffy.isRewardActive('critChance');
        if (Fluffy.isRewardActive('megaCrit')) megaCritMult += 2;
        if (game.talents.crit.purchased) megaCritMult += 1;
        const megaCrits = Math.floor(critChance / 100);
        critChance = Math.min(critChance - megaCrits * 100, 100) / 100;
        const critDamage = this.getModValue('critDamage') + 230 * Math.min(relentlessness, 1) + 30 * Math.max(Math.min(relentlessness, 10) - 1, 0) + criticality * 10;
        const critDmgNormalized = this.normalizedCrit(critChance, critDamage, megaCrits, megaCritMult);

        return (trimpAttackMult * critDmgNormalized) / 100;
    }

    forceCritBreakpoint() {
        if (this.isEmpty()) return new Heirloom();
        const heirloom = new Heirloom(deepClone(this));
        var currency = Math.floor(game.global.nullifium * getNuSpendMult()) - this.getTotalSpent();
        var efficiency = 1;
        var paid = 0;
        var cost = 0;
        var name = '';
        var index = -1;
        const purchases = [0, 0, 0, 0, 0, 0, 0];
        const relentlessness = game.global.universe === 2 ? 0 : game.portal.Relentlessness.level;
        var critChance = relentlessness * 5;
        if (Fluffy.isRewardActive('critChance')) critChance += 50 * Fluffy.isRewardActive('critChance');
        const megaCrits = Math.floor((critChance + game.talents.crit.purchased ? heirloom.getModValue('critChance') * 1.5 : heirloom.getModValue('critChance')) / 100);

        while (true) {
            while (Math.floor((critChance + game.talents.crit.purchased ? heirloom.getModValue('critChance') * 1.5 : heirloom.getModValue('critChance')) / 100) === megaCrits) {
                cost = heirloom.getModCost('critChance');
                index = heirloom.mods.indexOf(heirloom.mods.filter((mod) => mod[0] === 'critChance')[0]);
                if (currency >= cost) {
                    heirloom.mods[index][1] += this.heirloomInfo.critChance.stepAmounts[heirloom.rarity];
                    heirloom.mods[index][3] += 1;
                    purchases[index] += 1;
                    currency -= cost;
                    paid += cost;
                } else {
                    break;
                }
            }

            efficiency = 1;
            for (const mod of heirloom.mods) {
                if (heirloom.getModEfficiency(mod[0]) > efficiency) {
                    efficiency = heirloom.getModEfficiency(mod[0]);
                    cost = heirloom.getModCost(mod[0]);
                    name = mod[0];
                    index = heirloom.mods.indexOf(mod);
                }
            }

            if (name === '') break;
            if (currency >= cost) {
                heirloom.mods[index][1] += this.heirloomInfo[name].stepAmounts[heirloom.rarity];
                heirloom.mods[index][3] += 1;
                purchases[index] += 1;
                currency -= cost;
                paid += cost;
            } else {
                break;
            }
        }

        const nextCost = Math.floor((cost - (Math.floor(game.global.nullifium * getNuSpendMult()) - heirloom.getTotalSpent())) / getNuSpendMult());
        heirloom.paid = paid;
        heirloom.next = { name, cost: nextCost };
        heirloom.purchases = purchases;
        heirloom.successful = Math.floor((critChance + game.talents.crit.purchased ? heirloom.getModValue('critChance') * 1.5 : heirloom.getModValue('critChance')) / 100) > megaCrits;
        return heirloom;
    }

    calculatePurchases() {
        if (this.isEmpty()) return new Heirloom();
        const heirloom = new Heirloom(deepClone(this));
        var currency = this.isCore ? playerSpire.spirestones - this.getTotalSpent() : Math.floor(game.global.nullifium * getNuSpendMult()) - this.getTotalSpent();
        var efficiency = 1;
        var paid = 0;
        var cost = 0;
        var name = '';
        var index = -1;
        const purchases = [0, 0, 0, 0, 0, 0, 0];

        // eslint-disable-next-line no-constant-condition
        while (true) {
            efficiency = 1;
            for (const mod of heirloom.mods) {
                var modEff = heirloom.getModEfficiency(mod[0]);
                if (modEff > efficiency) {
                    efficiency = modEff;
                    cost = heirloom.getModCost(mod[0]);
                    name = mod[0];
                    index = heirloom.mods.indexOf(mod);
                }
            }

            if (name === '') break;
            if (currency >= cost) {
                heirloom.mods[index][1] += this.heirloomInfo[name].stepAmounts[heirloom.rarity];
                // fp errors can lead to fractional purchases
                heirloom.mods[index][1] = roundFloatingPointErrors(heirloom.mods[index][1]);
                heirloom.mods[index][3] += 1;
                purchases[index] += 1;
                currency -= cost;
                paid += cost;
            } else {
                break;
            }
        }

        if (heirloom.type === 'Shield') {
            const forcedCritHeirloom = this.forceCritBreakpoint();
            if (forcedCritHeirloom.getDamageMult() > heirloom.getDamageMult() && forcedCritHeirloom.successful) return forcedCritHeirloom;
        }

        const nextCost = heirloom.isCore ? Math.floor(cost - (playerSpire.spirestones - heirloom.getTotalSpent())) : Math.floor((cost - (Math.floor(game.global.nullifium * getNuSpendMult()) - heirloom.getTotalSpent())) / getNuSpendMult());
        heirloom.paid = paid;
        heirloom.next = { name, cost: nextCost };
        heirloom.purchases = purchases;

        //Fix any floating point errors that may have occured.
        for (const mod of heirloom.mods) {
            name = mod[0];
            if (name === 'empty') continue;
            index = heirloom.mods.indexOf(mod);
            if (this.hardCaps[name] && heirloom.mods[index][1] > this.hardCaps[name]) {
                heirloom.mods[index][1] = this.hardCaps[name];
            }
            if (heirloom.heirloomInfo[name].heirloopy && game.global.universe === 2 && !Fluffy.isRewardActive('heirloopy')) mod[1] *= 10;
        }

        return heirloom;
    }

    getInnate(spent) {
        if (this.type === 'Staff') {
            const parityPower = game.global.StaffEquipped.mods.filter((mod) => mod[0] === 'ParityPower');
            var mult = Math.log10(spent + 1e6) / 5;
            if (parityPower.length > 0) {
                mult *= 1 + parityPower[0][1] / 1000;
            }
            return (mult - 1) * 100;
        }
        // shield
        var mult = Math.log10(spent + 1e6) * (this.rarity === 11 ? 10000 : 4000);
        return game.global.universe === 2 ? mult / 10 : mult;
    }

    getInnateGain(type) {
        if (this.rarity < 10) return 1;
        const value = this.getInnate(this.getTotalSpent());
        const stepAmount = this.getInnate(this.getTotalSpent() + this.getModCost(type)) - value;

        var gain;
        if (this.type === 'Staff') {
            gain = Math.log(((value + 100 + stepAmount) / (value + 100)) * (Math.pow(1.2, this.inputs.equipLevels) - 1) + 1) / Math.log(1.2) / this.inputs.equipLevels;
        } else if (this.type === 'Shield') {
            gain = ((value + stepAmount) / 100 + 1) / 5 / ((value / 100 + 1) / 5);
        }
        return gain;
    }

    getInnateEfficiency(type) {
        if (this.rarity < 10) return 0;
        return (this.getInnateGain(type) - 1) / (this.getModCost(type) / this.basePrice);
    }
}

function updateModContainer(divName, heirloom) {
    function humanify(num, places) {
        return Number(num)
            .toFixed(places)
            .replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/u, '$1');
    }

    var infoText = `Below is a list of the calulated costs, gains, and efficiency of each weighted<br>upgrade, taken from the stats displayed on this heirloom.<br><br>`;
    var bestEfficiency = 1;
    for (mod of heirloom.mods) {
        if (heirloom.getModEfficiency(mod[0]) > bestEfficiency) bestEfficiency = heirloom.getModEfficiency(mod[0]);
    }

    const heirloomData = heirloomInfo(heirloom.type);

    for (var i = 0; i < 7; i++) {
        const mod = heirloom.mods[i];
        if (mod) {
            if (heirloom.getModEfficiency(mod[0]) > 1) {
                infoText += `<b>${heirloomData[mod[0]].name}</b>:<br>`;
                infoText += `&nbsp&nbsp&nbsp<b>•&nbsp&nbspCost</b>: ${heirloom.getModCost(mod[0]) === 1e100 ? '∞' : prettify(heirloom.getModCost(mod[0]))}`;
                infoText += `&nbsp&nbsp&nbsp<b>•&nbsp&nbspGain</b>: ${humanify((heirloom.getModGain(mod[0]) + heirloom.getInnateGain(mod[0]) - 2) * 100, 3)}%`;
                infoText += `&nbsp&nbsp&nbsp<b>•&nbsp&nbspEfficiency</b>: ${humanify(((heirloom.getModEfficiency(mod[0]) - 1) / (bestEfficiency - 1)) * 100, 2)}%</span>`;
                infoText += `<br>`;
            }
        }
    }

    const heirloomValue = heirloom.getTotalSpent();
    var infoValueText = '';
    for (const mod of heirloom.mods) {
        const cost = heirloom.getModSpent(mod[0]);
        if (mod[0] !== 'empty' && cost > 0) infoValueText += `<br>&nbsp&nbsp&nbsp•&nbsp&nbsp<b>${heirloomData[mod[0]].name}</b>: +${prettify(cost)} (${humanify((cost / heirloomValue) * 100, 2)}%)`;
    }
    infoText += `<b>${heirloom.isCore ? 'Spirestone' : 'Nullifium'} Value</b>:`;
    infoText += `${heirloom.replaceSpent ? `<br>&nbsp&nbsp&nbsp•&nbsp&nbsp<b>Mod changes</b>: ${prettify(heirloom.replaceSpent)} (${humanify((heirloom.replaceSpent / heirloomValue) * 100, 2)}%)` : ''}`;
    infoText += ` ${infoValueText}`;
    infoText += `<br>&nbsp&nbsp&nbsp•&nbsp&nbsp<b>Total</b>: ${prettify(heirloomValue)}<br>`;
    if (heirloom.type.includes('Core')) {
        infoText += `<br>Your spire deals <span style='color: #fff59d'>${prettify(Math.round(getMaxEnemyHP()))}</span> damage with this core, and averages`;
        infoText += ` <b><span style='color: #9fa8da'>${prettify(Math.round(estimatedMaxDifficulty(getMaxEnemyHP()).runestones))}</span></b> runestones per enemy,`;
        infoText += ` while managing a threat of <b><span style='color: #ef9a9a;'>${Math.round(estimatedMaxDifficulty(getMaxEnemyHP()).difficulty)}</span></b>.`;
    }
    tooltipText = 'tooltip(' + '"Heirloom Modifier Information", ' + '"customText", ' + 'event, ' + '"' + infoText + '")';
    document.getElementById(`${divName}`).setAttribute('onmouseover', tooltipText);
}

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function setupHeirloomHelpBtn() {
    //Setting up heirloom info tooltip button.
    //Attaches to top right of the selected heirloom
    if (document.getElementById('heirloomHelpBtn') !== null) document.getElementById('heirloomHelpBtn').remove();
    var heirloomHelpBtn = document.createElement('DIV');
    heirloomHelpBtn.setAttribute('id', 'heirloomHelpBtn');
    heirloomHelpBtn.setAttribute('class', 'glyphicon glyphicon-question-sign');
    heirloomHelpBtn.setAttribute('style', 'position:absolute; top:1vw; right:2vw;');
    heirloomHelpBtn.setAttribute('onmouseout', 'tooltip("hide")');
    document.getElementById('selectedHeirloom').children[0].children[0].appendChild(heirloomHelpBtn);
}

function calculate(autoUpgrade) {
    var selectedLoom = game.global.selectedHeirloom;
    var startingHeirloom;

    if (selectedLoom.length === 0) return;
    if (selectedLoom[1].includes('Equipped')) startingHeirloom = game.global[selectedLoom[1]];
    else startingHeirloom = game.global[selectedLoom[1]][selectedLoom[0]];
    startingHeirloom.heirloomInfo = heirloomInfo(startingHeirloom.type);
    startingHeirloom = new Heirloom(startingHeirloom);
    //Set the display of the heirloom ratios to be visible. Gets hidden when you don't have an heirloom selected
    if (document.getElementById('heirloomRatios').style.display !== 'inline-block') document.getElementById('heirloomRatios').style.display = 'inline-block';
    if (document.getElementById('heirloomAllocatorBtn').innerHTML !== 'Allocate Nullifium' && !startingHeirloom.type.includes('Core')) document.getElementById('heirloomAllocatorBtn').innerHTML = 'Allocate Nullifium';
    //When looking at Shields show VM, HP, XP and Equality settings.

    if (document.getElementById('heirloomAllocatorBtn').style.marginRight !== '0vw') document.getElementById('heirloomAllocatorBtn').style.marginRight = '0vw';
    if (startingHeirloom.type.includes('Shield')) {
        //Enable used settings!
        if (document.getElementById('VMWeight').parentNode.style.display !== 'inline-block') document.getElementById('VMWeight').parentNode.style.display = 'inline-block';

        if (document.getElementById('HPWeight').parentNode.style.display !== 'inline-block') document.getElementById('HPWeight').parentNode.style.display = 'inline-block';

        //Show equality button if inside U2
        if (game.global.universe === 2) {
            if (document.getElementById('equalityTarget').parentNode.style.display !== 'inline') document.getElementById('equalityTarget').parentNode.style.display = 'inline';
        } else if (document.getElementById('equalityTarget').parentNode.style.display !== 'none') document.getElementById('equalityTarget').parentNode.style.display = 'none';
        //Hide equip levels & xp when not viewing staffs
        if (document.getElementById('equipLevels').parentNode.style.display !== 'none') document.getElementById('equipLevels').parentNode.style.display = 'none';

        if (document.getElementById('XPWeight').parentNode.style.display !== 'none') document.getElementById('XPWeight').parentNode.style.display = 'none';
    }
    //When looking at Staffs show weapon levels & xp settings.
    else if (startingHeirloom.type.includes('Staff')) {
        //Enable used settings!
        if (document.getElementById('equipLevels').parentNode.style.display !== 'inline') document.getElementById('equipLevels').parentNode.style.display = 'inline';

        //Show XP weight if Fluffy/Scruffy are unlocked
        if (game.global.spiresCompleted >= 2) {
            if (document.getElementById('XPWeight').parentNode.style.display !== 'inline') document.getElementById('XPWeight').parentNode.style.display = 'inline';
        } else {
            if (document.getElementById('XPWeight').parentNode.style.display !== 'none') document.getElementById('XPWeight').parentNode.style.display = 'none';
        }

        //Hide unused settings!
        //Set 2nd row to be hidden when not viewing Shields.
        if (document.getElementById('equalityTarget').parentNode.style.display !== 'none') document.getElementById('equalityTarget').parentNode.style.display = 'none';

        if (document.getElementById('VMWeight').parentNode.style.display !== 'none') document.getElementById('VMWeight').parentNode.style.display = 'none';

        if (document.getElementById('HPWeight').parentNode.style.display !== 'none') document.getElementById('HPWeight').parentNode.style.display = 'none';
    }
    //When looking at Cores show no settings.
    else if (startingHeirloom.type.includes('Core')) {
        //Hide unused settings (all)!
        if (document.getElementById('equalityTarget').parentNode.style.display !== 'none') document.getElementById('equalityTarget').parentNode.style.display = 'none';

        if (document.getElementById('VMWeight').parentNode.style.display !== 'none') document.getElementById('VMWeight').parentNode.style.display = 'none';

        if (document.getElementById('HPWeight').parentNode.style.display !== 'none') document.getElementById('HPWeight').parentNode.style.display = 'none';

        if (document.getElementById('equipLevels').parentNode.style.display !== 'none') document.getElementById('equipLevels').parentNode.style.display = 'none';

        if (document.getElementById('XPWeight').parentNode.style.display !== 'none') document.getElementById('XPWeight').parentNode.style.display = 'none';

        document.getElementById('heirloomAllocatorBtn').innerHTML = 'Allocate Spirestones';

        startTDCalc();
    }

    startingHeirloom.heirloomInfo = heirloomInfo(startingHeirloom.type);
    var newHeirloom = new Heirloom(startingHeirloom).calculatePurchases();
    if (autoUpgrade)
        return {
            oldLoom: selectedLoom,
            newLoom: newHeirloom
        };

    function precisionRoundMod(number, precision) {
        var factor = Math.pow(10, precision);
        var n = precision < 0 ? number : 0.01 / factor + number;
        return Math.round(n * factor) / factor;
    }

    const heirloomData = heirloomInfo(newHeirloom.type);
    function getModValue(mod) {
        if ((heirloomData[mod[0]].heirloopy && Fluffy.isRewardActive('heirloopy')) || heirloomData[mod[0]].immutable || heirloomData[mod[0]].name === 'inequality') return mod[1];
        if (game.global.universe === 2) return mod[1] / 10;
        return mod[1];
    }

    var modDetails = '';
    if (newHeirloom) {
        for (var y = 0; y < newHeirloom.mods.length; y++) {
            if (newHeirloom.purchases[y] === 0) continue;
            modDetails = document.getElementsByClassName('heirloomMod')[y].innerHTML.split('(')[0];
            var modValue = precisionRoundMod(getModValue(newHeirloom.mods[y]), 3);
            document.getElementsByClassName('heirloomMod')[y].innerHTML = `${modDetails} (${modValue}% +${newHeirloom.purchases[y]})`;
        }
    }

    setupHeirloomHelpBtn();
    updateModContainer('heirloomHelpBtn', startingHeirloom);
}

// On selecting an heirloom load.
var originalselectHeirloom = selectHeirloom;
selectHeirloom = function () {
    originalselectHeirloom(...arguments);
    try {
        calculate();
        loadHeirloomSettings();
    } catch (e) {
        console.log('Heirloom issue: ' + e, 'other');
    }
};

// On selecting an heirloom mod load.
var originalselectMod = selectMod;
selectMod = function () {
    originalselectMod(...arguments);
    try {
        calculate();
    } catch (e) {
        console.log('Heirloom issue: ' + e, 'other');
    }
};

function autoUpgradeHeirlooms() {
    if (!getPageSetting('autoHeirlooms')) return;
    for (let i = 0; i < game.global.heirloomsCarried.length; i++) {
        if (getTotalHeirloomRefundValue(game.global.heirloomsCarried[i], true) === 0) continue;
        game.global.selectedHeirloom = [i, 'heirloomsCarried'];
        runHeirlooms();
    }
    if (!isObjectEmpty(game.global.ShieldEquipped) && Object.keys(game.global.ShieldEquipped).length !== 1 && getTotalHeirloomRefundValue(game.global.ShieldEquipped, true) > 0) {
        game.global.selectedHeirloom = [-1, 'ShieldEquipped'];
        runHeirlooms();
    }
    if (!isObjectEmpty(game.global.StaffEquipped) && Object.keys(game.global.StaffEquipped).length !== 1 && getTotalHeirloomRefundValue(game.global.StaffEquipped, true) > 0) {
        game.global.selectedHeirloom = [-1, 'StaffEquipped'];
        runHeirlooms();
    }
    if (!isObjectEmpty(game.global.CoreEquipped) && Object.keys(game.global.CoreEquipped).length !== 1 && getTotalHeirloomRefundValue(game.global.CoreEquipped, true) > 0) {
        game.global.selectedHeirloom = [-1, 'CoreEquipped'];
        runHeirlooms();
    }
}

//When unselecting any heirlooms hide ratios.
var originalpopulateHeirloomWindow = populateHeirloomWindow;
populateHeirloomWindow = function () {
    originalpopulateHeirloomWindow(...arguments);
    try {
        if (document.getElementById('heirloomRatios').style.display !== 'none') document.getElementById('heirloomRatios').style.display = 'none';
    } catch (e) {
        console.log('Heirloom issue: ' + e, 'other');
    }
};

function runHeirlooms() {
    var heirlooms = calculate(true);

    var selectedLoom = game.global.selectedHeirloom;
    var startingHeirloom;
    //Disable if we don't have an heirloom selected.
    if (selectedLoom.length === 0) return;

    if (selectedLoom[1].includes('Equipped')) startingHeirloom = game.global[selectedLoom[1]];
    else startingHeirloom = game.global[selectedLoom[1]][selectedLoom[0]];
    startingHeirloom.mods = heirlooms.newLoom.mods;
    displaySelectedHeirloom(true);

    setupHeirloomHelpBtn();
    updateModContainer('heirloomHelpBtn', heirlooms.newLoom);
    recalculateHeirloomBonuses();
    return;
}

//CORE CALCULATIONS
function startTDCalc() {
    if (playerSpire.layout === null) return;

    MODULES.autoHeirlooms.strengthLocations = [];
    MODULES.autoHeirlooms.lightColStacks = [0, 0, 0, 0, 0];
    MODULES.autoHeirlooms.selectedTrap = null;
    MODULES.autoHeirlooms.finalToxicity = 0;

    MODULES.autoHeirlooms.detailed = [{}];
    for (var x = 0; x < 5 * playerSpire.rowsAllowed; x++) {
        if (MODULES.autoHeirlooms.detailed[x] === undefined) {
            MODULES.autoHeirlooms.detailed[x] = {};
        }
    }

    const index = playerSpire.layout.length;
    for (var x = 0; index > x; x++) {
        MODULES.autoHeirlooms.selectedTrap = playerSpire.layout[x].trap.name;
        setTrap(x);
    }
    for (const trap in playerSpireTraps) {
        updateTrapDamage(trap.toLowerCase(), playerSpireTraps[trap].level, true);
    }
    runInformation();
}

function runInformation() {
    imAnEnemy();
    imAnEnemy(getMaxEnemyHP());
}

const traps = {
    fire: {
        locked: false,
        damage: 50,
        level: 1,
        maxLevel: 10,
        dmgs: [0, 50, 500, 2500, 5e3, 10e3, 10e4, 10e5, 10e7, 10e9, 10e11],
        coreMult: 1
    },
    frost: {
        locked: false,
        damage: 10,
        slow: 3,
        effect: 2,
        level: 1,
        maxLevel: 8,
        fireIncrease: 1.25,
        dmgs: [0, 10, 50, 500, 2500, 5000, 25000, 50000, 10000],
        slows: [0, 3, 4, 4, 4, 4, 5, 5, 5],
        runestones: [0, 0, 0, 0, 0, 0.02, 0.02, 0.04, 0.06]
    },
    poison: {
        locked: true,
        defaultStack: 5,
        level: 1,
        maxLevel: 9,
        stacks: [0, 5, 10, 10, 20, 40, 80, 160, 480, 1920],
        coreMult: 1
    },
    lightning: {
        locked: true,
        damage: 50,
        effect: 2,
        length: 1,
        damageBuff: 2,
        level: 1,
        maxLevel: 7,
        dmgs: [0, 50, 500, 5000, 5000, 5e4, 5e5, 5e5],
        dmgbuffs: [0, 2, 2, 4, 4, 4, 8, 8],
        lengths: [0, 1, 2, 2, 2, 3, 3, 3],
        coreMult: 1
    },
    strength: {
        locked: true,
        // 100%
        effect: 2,
        level: 1,
        maxLevel: 1,
        coreMult: 1
    },
    condenser: {
        locked: true,
        // 25%
        effect: 0.25,
        level: 1,
        maxLevel: 1,
        coreMult: 1
    },
    knowledge: {
        locked: true,
        slow: 5,
        effect: 3,
        level: 1,
        maxLevel: 1
    },
    runestones: {
        coreMult: 1
    }
};

function loadCore(core, overwrite, overwriteValue) {
    if (!core.isEmpty()) {
        // reset data
        traps.fire.coreMult = 1;
        traps.poison.coreMult = 1;
        traps.lightning.coreMult = 1;
        traps.strength.coreMult = 1;
        traps.condenser.coreMult = 1;
        traps.runestones.coreMult = 1;

        const modNamesToTraps = {
            fireTrap: 'fire',
            poisonTrap: 'poison',
            lightningTrap: 'lightning',
            strengthEffect: 'strength',
            condenserEffect: 'condenser',
            runestones: 'runestones'
        };

        for (const mod of core.mods) {
            const bonus = mod[1];
            traps[modNamesToTraps[mod[0]]].coreMult = 1 + bonus / 100;
        }

        // overwrite lets you overwrite one of the core values, to make it easier to calc upg gain
        if (overwrite !== undefined) {
            traps[modNamesToTraps[overwrite]].coreMult = 1 + overwriteValue / 100;
        }
    }
}

function insertSelection(loc) {
    if (loc >= playerSpire.layout.length || loc < 0) return;

    const insertType = MODULES.autoHeirlooms.selectedTrap;
    MODULES.autoHeirlooms.selectedTrap = 'Empty';
    var first = 0;
    var last = -1;
    const newTraps = [];

    for (var i = 0; i < playerSpire.layout.length; i++) {
        if (MODULES.autoHeirlooms.detailed[i].selected === undefined || MODULES.autoHeirlooms.detailed[i].selected === false) {
            if (first > last) {
                first++;
            } else {
                newTraps[newTraps.length] = null;
            }
        } else {
            last = i;
            newTraps[newTraps.length] = MODULES.autoHeirlooms.detailed[i].type;

            if (insertType === 'Move') {
                setTrap(i);
            }
        }
    }

    if (last !== -1) {
        for (var e = 0; e < newTraps.length && e + loc < playerSpire.layout.length && e <= last - first; e++) {
            if (newTraps[e] !== null) {
                // empty all cells first to clear any Strength towers
                setTrap(e + loc);
            }
        }

        imAnEnemy();

        for (var n = 0; n < newTraps.length && n + loc < playerSpire.layout.length && n <= last - first; n++) {
            MODULES.autoHeirlooms.selectedTrap = newTraps[n];
            setTrap(n + loc);
        }
    }

    runInformation();
}

function setTrap(number) {
    if (MODULES.autoHeirlooms.selectedTrap === null || MODULES.autoHeirlooms.selectedTrap === MODULES.autoHeirlooms.detailed[number].type) return false;

    const row = Math.floor(number / 5);
    if (MODULES.autoHeirlooms.strengthLocations[row] === true && MODULES.autoHeirlooms.selectedTrap === 'Strength') {
        for (s = row * 5; s < (row + 1) * 5; s++) {
            if (MODULES.autoHeirlooms.detailed[s].type === 'Strength') {
                MODULES.autoHeirlooms.selectedTrap = 'Empty';
                setTrap(s);
                MODULES.autoHeirlooms.selectedTrap = 'Strength';
                break;
            }
        }
    }

    switch (MODULES.autoHeirlooms.selectedTrap) {
        case 'Strength':
            MODULES.autoHeirlooms.strengthLocations[row] = true;
            break;
        case 'Lightning':
            MODULES.autoHeirlooms.lightColStacks[number % 5]++;
        // fall through to default
        default:
            if (MODULES.autoHeirlooms.detailed[number].type === 'Strength') {
                MODULES.autoHeirlooms.strengthLocations[row] = false;
            }
            break;
    }

    if (MODULES.autoHeirlooms.detailed[number].type === 'Lightning' && MODULES.autoHeirlooms.lightColStacks[number % 5] > 0) {
        MODULES.autoHeirlooms.lightColStacks[number % 5]--;
    }

    MODULES.autoHeirlooms.detailed[number].selected = false;
    MODULES.autoHeirlooms.detailed[number].type = MODULES.autoHeirlooms.selectedTrap;
    return true;
}

function imAnEnemy(health = 0) {
    // hey you're an enemy cool
    MODULES.autoHeirlooms.ticks = 0;

    // damage you've taken
    var damageTaken = 0;
    // chilled by Frost Trap
    var chilledFor = 0;
    // frozen by knowledge
    var frozenFor = 0;
    // current Poison Stack you have, will take damage at end of turn
    var poisonStack = 0;
    var shockedFor = 0;
    var addDamage = 0;
    var addStack = 0;
    var instaKill = false;

    var toxy;
    var condensed;

    for (var p = 0; p < playerSpire.layout.length; p++) {
        MODULES.autoHeirlooms.detailed[p].row = Math.floor(p / 5);
        MODULES.autoHeirlooms.detailed[p].killCount = 0;
        if (MODULES.autoHeirlooms.detailed[p].type === undefined) {
            MODULES.autoHeirlooms.detailed[p].type = playerSpire.layout[p].trap.name;
        }
        if (chilledFor > 0 && frozenFor === 0) {
            MODULES.autoHeirlooms.detailed[p].chilled = true;
            chilledFor -= 1;
        } else {
            MODULES.autoHeirlooms.detailed[p].chilled = false;
        }
        if (frozenFor > 0 && chilledFor === 0) {
            MODULES.autoHeirlooms.detailed[p].frozen = true;
            frozenFor -= 1;
        } else {
            MODULES.autoHeirlooms.detailed[p].frozen = false;
        }
        if (MODULES.autoHeirlooms.strengthLocations[MODULES.autoHeirlooms.detailed[p].row]) {
            MODULES.autoHeirlooms.detailed[p].strengthed = true;
        } else {
            MODULES.autoHeirlooms.detailed[p].strengthed = false;
        }
        if (shockedFor > 0) {
            MODULES.autoHeirlooms.detailed[p].shocked = true;
        } else {
            MODULES.autoHeirlooms.detailed[p].shocked = false;
        }

        switch (MODULES.autoHeirlooms.detailed[p].type) {
            case 'Empty':
                break;
            case 'Fire':
                addDamage = calcFire(p, shockedFor);
                break;
            case 'Frost':
                addDamage = calcFrost(p);
                chilledFor = traps.frost.slow;
                if (MODULES.autoHeirlooms.detailed[p].shocked) chilledFor *= traps.lightning.effect;
                if (MODULES.autoHeirlooms.detailed[p].frozen) {
                    frozenFor = 0;
                    MODULES.autoHeirlooms.detailed[p].frozen = false;
                }
                break;
            case 'Poison':
                toxy = calcPoison(p, shockedFor, health, damageTaken);
                addStack = toxy.stack;
                addDamage = toxy.damage;
                break;
            case 'Lightning':
                shockedFor = traps.lightning.length;
                addDamage = calcLightning(p);
                break;
            case 'Strength':
                MODULES.autoHeirlooms.strengthLocations[MODULES.autoHeirlooms.detailed[p].row] = true;
                addDamage = calcStrength(p, shockedFor);
                break;
            case 'Condenser':
                condensed = calcCondenser(p, shockedFor);
                addDamage += poisonStack * condensed.damageFactor;
                poisonStack *= condensed.poisonMult;
                break;
            case 'Knowledge':
                if (MODULES.autoHeirlooms.detailed[p].chilled) {
                    chilledFor = 0;
                    frozenFor = traps.knowledge.slow;
                    if (MODULES.autoHeirlooms.detailed[p].shocked) frozenFor *= traps.lightning.effect;
                }
                break;
        }

        if (health !== 0 && MODULES.autoHeirlooms.detailed[p].type === 'Fire' && traps.fire.level >= 4 && damageTaken + addDamage > health * 0.8 && !instaKill) {
            addDamage += health * 0.2;
            instaKill = true;
        } else if (MODULES.autoHeirlooms.detailed[p].type !== 'Condenser') {
            // condenser poison stack damage is complicated and is handled in the case statement above
            addDamage += poisonStack * multipleDamage(MODULES.autoHeirlooms.detailed[p], 'poisonDamage');
        }

        MODULES.autoHeirlooms.detailed[p].addedPoison = addStack;
        MODULES.autoHeirlooms.detailed[p].poisonStacks = poisonStack;
        MODULES.autoHeirlooms.detailed[p].damageTaken = addDamage;
        MODULES.autoHeirlooms.detailed[p].allDamageTaken = damageTaken + addDamage;
        // turn new stacks into old stacks
        poisonStack += addStack;
        addStack = 0;
        MODULES.autoHeirlooms.ticks += 1;

        //Add additional ticks if needed to account for runestone buffs
        if (MODULES.autoHeirlooms.detailed[p].chilled && MODULES.autoHeirlooms.detailed[p].type != 'Knowledge' && MODULES.autoHeirlooms.detailed[p].type != 'Frost') MODULES.autoHeirlooms.ticks += 1;
        if (MODULES.autoHeirlooms.detailed[p].frozen && MODULES.autoHeirlooms.detailed[p].type != 'Frost') MODULES.autoHeirlooms.ticks += 2;

        // damage
        damageTaken += addDamage;
        addDamage = 0;

        shockedFor -= subtractShocks(p, shockedFor);
    }

    MODULES.autoHeirlooms.finalToxicity = poisonStack;

    if (health !== 0) {
        estimatedMaxDifficulty(health);
    } else if (damageTaken === 0) {
        estimatedMaxDifficulty(0);
    }

    // turn new damage into old damage;
    return damageTaken;
}

function getMaxEnemyHP() {
    var lowerBound = 0;
    var testHP = imAnEnemy();
    while (testHP < damageByHealth(testHP)) {
        lowerBound = testHP;
        testHP *= 10;
    }

    var upperBound = testHP;
    var midPoint = 0;
    while ((upperBound - lowerBound) / lowerBound > 0.0001 && upperBound > lowerBound + 1) {
        midPoint = lowerBound + (upperBound - lowerBound) / 2;
        var newDamage = damageByHealth(midPoint);
        if (newDamage > midPoint) {
            lowerBound = midPoint;
        } else {
            upperBound = midPoint;
        }
    }

    return Math.floor(lowerBound);
}

function damageByHealth(hp, tally = false) {
    var damageDealt = 0;
    // chilled by Frost Trap
    var chilledFor = 0;
    // frozen by knowledge
    var frozenFor = 0;
    // current Poison Stack you have, will take damage at end of turn
    var poisonStack = 0;
    var shockedFor = 0;
    var addDamage = 0;
    var addStack = 0;

    var slowsOnKill = 0;
    var deadEnemy = false;

    var toxy;
    var condensed;

    for (var p = 0; p < playerSpire.layout.length; p++) {
        if (!tally) {
            MODULES.autoHeirlooms.detailed[p].killCount = 0;
        }
        if (chilledFor > 0 && frozenFor === 0) {
            chilledFor -= 1;
        }
        if (frozenFor > 0 && chilledFor === 0) {
            frozenFor -= 1;
        }

        switch (MODULES.autoHeirlooms.detailed[p].type) {
            case 'Fire':
                addDamage = calcFire(p, shockedFor);
                break;
            case 'Frost':
                addDamage = calcFrost(p);
                chilledFor = traps.frost.slow;
                if (MODULES.autoHeirlooms.detailed[p].shocked) chilledFor = traps.frost.slow * traps.lightning.effect;
                if (MODULES.autoHeirlooms.detailed[p].frozen) {
                    frozenFor = 0;
                }
                break;
            case 'Poison':
                toxy = calcPoison(p, shockedFor, hp, damageDealt);
                addStack = toxy.stack;
                addDamage = toxy.damage;
                break;
            case 'Lightning':
                shockedFor = traps.lightning.length;
                addDamage = calcLightning(p);
                break;
            case 'Strength':
                addDamage = calcStrength(p, shockedFor);
                break;
            case 'Condenser':
                condensed = calcCondenser(p, shockedFor);
                addDamage += poisonStack * condensed.damageFactor;
                poisonStack *= condensed.poisonMult;
                break;
            case 'Knowledge':
                if (MODULES.autoHeirlooms.detailed[p].chilled) {
                    chilledFor = 0;
                    frozenFor = traps.knowledge.slow;
                    if (MODULES.autoHeirlooms.detailed[p].shocked) frozenFor *= traps.lightning.effect;
                }
                break;
        }

        if (hp !== 0 && MODULES.autoHeirlooms.detailed[p].type === 'Fire' && traps.fire.level >= 4 && damageDealt + addDamage > hp * 0.8) {
            addDamage += hp * 0.2;
        } else if (MODULES.autoHeirlooms.detailed[p].type !== 'Condenser') {
            // condenser poison stack damage is complicated and is handled in the case statement above
            addDamage += poisonStack * multipleDamage(MODULES.autoHeirlooms.detailed[p], 'poisonDamage');
        }

        shockedFor -= subtractShocks(p, shockedFor);

        // turn new stacks into old stacks
        poisonStack += addStack;
        addStack = 0;

        // damage
        damageDealt += addDamage;
        addDamage = 0;

        if (tally) {
            if (hp > damageDealt) {
                if (MODULES.autoHeirlooms.detailed[p].type !== 'Frost') {
                    if (MODULES.autoHeirlooms.detailed[p].chilled && MODULES.autoHeirlooms.detailed[p].type !== 'Knowledge') {
                        slowsOnKill++;
                    } else if (MODULES.autoHeirlooms.detailed[p].frozen) {
                        slowsOnKill += 2;
                    }
                }
            } else if (!deadEnemy) {
                deadEnemy = true;
                MODULES.autoHeirlooms.detailed[p].killCount++;
                if (MODULES.autoHeirlooms.detailed[p].type === 'Fire') {
                    fireKill = true;
                }
            }
        }
    }

    return damageDealt;
}

function calcFire(c, shocked) {
    const thisFireDamage = traps.fire.damage * traps.fire.coreMult * lightColMult(c);
    var thisAddDamage = thisFireDamage;
    if (MODULES.autoHeirlooms.detailed[c].shocked) thisAddDamage = thisFireDamage * traps.lightning.damageBuff * traps.lightning.coreMult;
    if (MODULES.autoHeirlooms.detailed[c].chilled || MODULES.autoHeirlooms.detailed[c].frozen) thisAddDamage += thisFireDamage * getLightningMultiplier(shocked, 1);
    if (MODULES.autoHeirlooms.detailed[c].frozen) thisAddDamage += thisFireDamage * getLightningMultiplier(shocked, 2);
    if (MODULES.autoHeirlooms.strengthLocations[MODULES.autoHeirlooms.detailed[c].row]) thisAddDamage *= traps.strength.effect * traps.strength.coreMult;
    if (MODULES.autoHeirlooms.detailed[c].chilled && traps.frost.level >= 3) thisAddDamage *= traps.frost.fireIncrease;
    return thisAddDamage;
}

function calcFrost(c) {
    return MODULES.autoHeirlooms.detailed[c].shocked ? traps.frost.damage * traps.lightning.damageBuff * traps.lightning.coreMult : traps.frost.damage;
}

function calcPoison(c, shocked, hp, dmg) {
    const output = {};
    const lastCell = c === playerSpire.layout.length - 1;
    var baseStack = traps.poison.defaultStack * lightColMult(c) * traps.poison.coreMult;

    if (traps.poison.level >= 3) {
        if (c > 0) {
            if (MODULES.autoHeirlooms.detailed[c - 1].type === 'Poison') {
                baseStack *= 3;
            }
        }
        if (!lastCell) {
            if (MODULES.autoHeirlooms.detailed[c + 1].type === 'Poison') {
                baseStack *= 3;
            }
        }
        if (hp !== 0 && traps.poison.level >= 5 && dmg > 0.25 * hp) {
            baseStack *= 5;
        }
    }
    if (!lastCell) {
        if (traps.frost.level >= 4 && MODULES.autoHeirlooms.detailed[c + 1].type === 'Frost') {
            baseStack *= 4;
        }
    }

    output.stack = baseStack;
    if (MODULES.autoHeirlooms.detailed[c].shocked) {
        output.stack *= traps.lightning.damageBuff * traps.lightning.coreMult;
    }
    output.damage = output.stack;
    if (MODULES.autoHeirlooms.detailed[c].chilled || MODULES.autoHeirlooms.detailed[c].frozen) {
        output.stack += baseStack * getLightningMultiplier(shocked, 1);
        output.damage += output.stack;
    }
    if (MODULES.autoHeirlooms.detailed[c].frozen) {
        output.stack += baseStack * getLightningMultiplier(shocked, 2);
        output.damage += output.stack;
    }

    return output;
}

function calcLightning(c) {
    const baseDamage = traps.lightning.damage * traps.lightning.coreMult;
    const shockMult = traps.lightning.damageBuff * traps.lightning.coreMult;
    var thisAddDamage = baseDamage;
    if (MODULES.autoHeirlooms.detailed[c].shocked) thisAddDamage *= shockMult;
    if (MODULES.autoHeirlooms.detailed[c].chilled || MODULES.autoHeirlooms.detailed[c].frozen) thisAddDamage += baseDamage * shockMult;
    if (MODULES.autoHeirlooms.detailed[c].frozen) thisAddDamage += baseDamage * shockMult;
    return thisAddDamage;
}

function calcStrength(c, shocked) {
    const strengthDamage = getStrengthDamage(MODULES.autoHeirlooms.detailed[c]);
    var thisAddDamage = strengthDamage;
    if (MODULES.autoHeirlooms.detailed[c].shocked) thisAddDamage = strengthDamage * traps.lightning.damageBuff * traps.lightning.coreMult;
    if (MODULES.autoHeirlooms.detailed[c].chilled || MODULES.autoHeirlooms.detailed[c].frozen) thisAddDamage += strengthDamage * getLightningMultiplier(shocked, 1);
    if (MODULES.autoHeirlooms.detailed[c].frozen) thisAddDamage += strengthDamage * getLightningMultiplier(shocked, 2);
    return thisAddDamage;
}

function calcCondenser(c, shocked) {
    const output = {};
    const thisBaseEffect = traps.condenser.effect * traps.condenser.coreMult;
    output.poisonMult = 1;
    if (MODULES.autoHeirlooms.detailed[c].shocked) {
        output.poisonMult *= traps.lightning.effect * thisBaseEffect + 1;
    } else {
        output.poisonMult *= thisBaseEffect + 1;
    }
    output.damageFactor = output.poisonMult;
    if (MODULES.autoHeirlooms.detailed[c].chilled || MODULES.autoHeirlooms.detailed[c].frozen) {
        output.poisonMult *= thisBaseEffect * getLightningMultiplier(shocked, 1, 'condenser') + 1;
        output.damageFactor += output.poisonMult;
    }
    if (MODULES.autoHeirlooms.detailed[c].frozen) {
        output.poisonMult *= thisBaseEffect * getLightningMultiplier(shocked, 2, 'condenser') + 1;
        output.damageFactor += output.poisonMult;
    }
    return output;
}

function subtractShocks(c, shocked) {
    var adjust = shocked < 0 ? shocked : 0;
    if (shocked > 0 && MODULES.autoHeirlooms.detailed[c].type !== 'Lightning') {
        if (MODULES.autoHeirlooms.detailed[c].type !== 'Frost') {
            if (MODULES.autoHeirlooms.detailed[c].chilled && MODULES.autoHeirlooms.detailed[c].type !== 'Knowledge') {
                adjust = 2;
            } else if (MODULES.autoHeirlooms.detailed[c].frozen) {
                adjust = 3;
            } else {
                adjust = 1;
            }
        } else {
            adjust = 1;
        }
    }
    return adjust;
}

function multipleDamage(index, type) {
    var returnN = 0;
    if (index.type !== 'Frost') {
        if (index.frozen) {
            returnN += traps.knowledge.effect;
        } else if (index.chilled && index.type !== 'Knowledge') {
            returnN += traps.frost.effect;
        }
    }
    if (index.shocked && type !== 'poisonDamage') {
        returnN += traps.lightning.effect;
    }

    if (returnN === 0) returnN = 1;
    return returnN;
}

function getStrengthDamage(data) {
    var rowStart = data.row * 5;
    var returnDamage = traps.fire.damage * traps.fire.coreMult * traps.strength.effect * traps.strength.coreMult;
    var amountOfFire = 0;
    for (var x = rowStart; x < rowStart + 5; x++) {
        if (playerSpire.layout[x].trap.name === 'Fire') {
            amountOfFire += lightColMult(x);
        }
    }
    if (data.chilled && traps.frost.level >= 3) returnDamage *= traps.frost.fireIncrease;
    return returnDamage * amountOfFire;
}

// developed with trial and error and curve fitting
// Maximum known error of ~15% (e.g. 29.6% vs 25.8% around 2,300 damage)
function escapePercent(damage) {
    var est = 0;
    if (damage < 1460) {
        est = 1 / 3;
    } else if (damage < 6880) {
        est = 0.96 - 0.086 * Math.log(damage);
    } else if (damage < 10000) {
        est = 0.2;
    } else {
        est = 1 / (Math.log(damage * 10) / Math.log(10));
    }
    return est;
}

function getHealthWith(difficulty, killPct) {
    const scaledMod = Math.pow(1.012, difficulty);
    var health = 10 + difficulty * 4 + scaledMod;
    var difPct = 0.00053 * difficulty;
    if (difPct > 0.85) difPct = 0.85;
    if (difPct < 0.15) difPct = 0.15;
    // the (2/3) here an estimate for Math.random()
    health = health * (1 - difPct) + killPct * difPct * health;
    return Math.floor(health);
}

//CHECK THIS
function estimatedMaxDifficulty(maxHealth) {
    const damage = maxHealth;
    const killPct = 1 - escapePercent(maxHealth);
    var difficulty = 1;
    min = 1;
    max = 5000;
    while (true) {
        if (damage === 0 || damage === null || damage === undefined) {
            break;
        }
        check = (max + min) / 2;
        const health = getHealthWith(check, killPct);
        if (damage > health) {
            min = check;
        } else {
            max = check;
        }
        if ((health <= damage && damage - health <= 1) || max - min <= 1) {
            difficulty = check;
            break;
        }
    }

    var avgReward = 0;
    const steps = 1000;
    for (var h = 0; h < steps; h++) {
        if (h / steps < killPct) {
            avgReward += getRsReward(getHealthWith(difficulty, h / steps), difficulty);
        } else if (traps.poison.level >= 6) {
            // poison leaking bonus for escaped enemies
            avgReward += MODULES.autoHeirlooms.finalToxicity * 0.1;
        }
    }
    avgReward /= steps;
    avgReward *= traps.runestones.coreMult;

    return { difficulty, runestones: avgReward };
}

function getRsReward(health, threat) {
    var reward = Math.ceil(health / 600);
    reward += threat / 20;
    reward *= Math.pow(1.00116, threat);
    if (MODULES.autoHeirlooms.detailed[playerSpire.layout.length - 1].type === 'Fire' && traps.fire.level >= 7) {
        if (traps.fire.level >= 9) reward *= 1.5;
        else reward *= 1.2;
    }
    if (traps.frost.level >= 5) reward *= 1 + (MODULES.autoHeirlooms.ticks - playerSpire.layout.length) * traps.frost.runestones[traps.frost.level];
    return reward;
}

function getRows(difficulty) {
    const maxRows = Math.min(Math.floor(difficulty / 100), 20);
    return maxRows;
}

function updateTrapDamage(type, level, noEnemy) {
    const upgradeableTraps = ['fire', 'frost', 'poison', 'lightning'];
    if (!upgradeableTraps.includes(type)) return;
    traps[type].level = level;
    if (type === 'fire') {
        traps.fire.damage = traps.fire.dmgs[level];
    }
    if (type === 'frost') {
        traps.frost.damage = traps.frost.dmgs[level];
        traps.frost.slow = traps.frost.slows[level];
    }
    if (type === 'poison') {
        traps.poison.defaultStack = traps.poison.stacks[level];
    }
    if (type === 'lightning') {
        traps.lightning.damage = traps.lightning.dmgs[level];
        traps.lightning.damageBuff = traps.lightning.dmgbuffs[level];
        traps.lightning.length = traps.lightning.lengths[level];
    }
    if (noEnemy !== true) {
        runInformation();
    }
}

function getLightningMultiplier(length, times, type) {
    if (length - times === 0 || length - times < 0) {
        return 1;
    }
    if (length - times >= 1) {
        if (type === 'condenser') {
            return traps.lightning.effect;
        }
        return traps.lightning.damageBuff * traps.lightning.coreMult;
    }
    return 1;
}

function lightColMult(cell) {
    return traps.lightning.level >= 4 ? 1 + (traps.lightning.level >= 7 ? 0.2 : 0.1) * MODULES.autoHeirlooms.lightColStacks[cell % 5] * traps.lightning.coreMult : 1;
}
