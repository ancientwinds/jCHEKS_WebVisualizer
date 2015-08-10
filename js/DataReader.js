var DataReader = function (databaseName) {
    var shared = {};
    shared.dataArray = [];
    shared.formatedObject = {};
    shared.counter = 0;
    var defaultLimit = 150;
    function resetDataArray() {
        shared.dataArray = [];
    }

    var self = {};

    self.sendDataRequest = function (config) {
        config.limit = (config.limit) ? config.limit: defaultLimit;
        resetDataArray();
        var dataToSend= "";
        dataToSend += ((config.system) ? "&system=" + config.system : "");
        dataToSend += ((config.limit) ? "&limit=" + config.limit : "");
        dataToSend += ((config.limitedRow) ? "&limitedRow=" + config.limitedRow : "");
        dataToSend += ((config.overallColumn) ? "&overallColumn=" + config.overallColumn : "");
        dataToSend += "&type=" + config.type;
        dataToSend += "&name=" + databaseName;

        console.log(dataToSend.replace("&","").split("&").join(",   ").split("=").join(" = "));
        $.ajax({
            url: "../php/getter.php",
            type: "POST",
            dataType: 'json',
            async: false,
            data: dataToSend,
            success: config.formatter,
            error: function (msg) {
                $("body").html(msg.responseText);
            }
        });

        console.log(shared.dataArray.slice());
        return shared.dataArray.slice();
    }

    var evolutionDataFormatter = function (receivedData) {
        for (var i = 0; i < receivedData.length; i++) {
            shared.formatedObject = {
                systemId: receivedData[i].chaotic_system_id,
                x: parseInt(receivedData[i].evolution_count)
            };
            shared.dataArray.push(shared.formatedObject);
        }
    };

    var occurrenceDataFormatter = function (receivedData) {
        for (var i = 0; i < receivedData.length; i++) {
            shared.formatedObject = {
                systemId: receivedData[i].chaotic_system_id,
                y: parseInt(receivedData[i].agent_id),
                x: parseInt(receivedData[i].variation),
                color: parseInt(receivedData[i].occurence_count)

            };
            shared.dataArray.push(shared.formatedObject);
        }
    };

    var overallOccurrenceDataFormatter =function (receivedData) {
        var name;
        var yValue = -1;
        for (var i = 0; i < receivedData.length; i++) {
            if(receivedData[i].chaotic_system_id!=name){
                yValue++;
                name = receivedData[i].chaotic_system_id;
            }
            shared.formatedObject = {
                systemId: receivedData[i].chaotic_system_id,
                y: yValue,
                x: parseInt(receivedData[i].variation),
                color: parseInt(receivedData[i].system)

            };
            shared.dataArray.push(shared.formatedObject);
        }
    };

    var overallButterflyFormatter =function (receivedData) {
        var name;
        var yValue = -1;
        for (var i = 0; i < receivedData.length; i++) {
            if(receivedData[i].chaotic_system_id!=name){
                yValue++;
                name = receivedData[i].chaotic_system_id;
            }
            shared.formatedObject = {
                systemId: receivedData[i].chaotic_system_id,
                y: yValue,
                x: parseInt(receivedData[i].evolution_count),
                color: parseInt(receivedData[i].system)

            };
            shared.dataArray.push(shared.formatedObject);
        }
    };

    var butterflyDataFormatter = function (receivedData) {
        for (var i = 0; i < receivedData.length; i++) {
            shared.formatedObject = {
                systemId: receivedData[i].chaotic_system_id,
                y: parseInt(receivedData[i].clone_id),
                x: parseInt(receivedData[i].evolution_count),
                color: parseInt(receivedData[i].distance)
            };
            shared.dataArray.push(shared.formatedObject);
        }
    }

    var NISTDataFormatter = function (receivedData) {
        for (var i = 0; i < receivedData.length; i++) {
            shared.formatedObject = {
                systemId: receivedData[i].chaotic_system_id,
                y: i,
                x: shared.counter,
                color: parseFloat(receivedData[i].p_value)
            };
            shared.dataArray.push(shared.formatedObject);
        }
    }

    var distanceDataFormatter = function (data2) {
        for (var i = 0; i < data2.length; i++) {
            shared.formatedObject = {
                systemId: data2[i].chaotic_system_id,
                y: shared.counter,
                x: parseInt(data2[i].evolution_count),
                color: parseInt(data2[i].distance)
            };
            shared.dataArray.push(shared.formatedObject);
        }
    }

    var nameListFormatter = function (receivedData) {
        for (var i = 0; i < receivedData.length; i++) {
            shared.dataArray.push(receivedData[i].chaotic_system_id);
        }
    }

    self.getKeyRepetitions = function () {
        console.error("Datareader.getKeyRepetitions() Not implemented.");
    };

    self.getOverallLevelOccurences = function () {
        return self.sendDataRequest({ formatter: overallOccurrenceDataFormatter, type: "overallOccurenceLevel", limitedRow: "variation", overallColumn: "occurence_count"});
    };

    self.getOverallVariationOccurences = function () {
        return self.sendDataRequest({ formatter: overallOccurrenceDataFormatter, type: "overallOccurenceVariation", limitedRow: "variation", overallColumn: "occurence_count"});
    };

    self.getOverallButterflyEffect = function () {
        return self.sendDataRequest({ formatter: overallButterflyFormatter, type: "overallButterfly", limitedRow: "evolution_count", overallColumn: "distance"});
    };

    self.getAllKeybits = function () {
        return self.sendDataRequest({formatter: evolutionDataFormatter, type: "keyBits"});
    };

    self.getAllLevelAgent = function () {
        return self.sendDataRequest({formatter: evolutionDataFormatter, type: "agentLevels"});
    };

    self.getLevelOccurences = function (systemId) {
        return self.sendDataRequest({formatter: occurrenceDataFormatter, type: "occurenceLevel", system: systemId, limitedRow: "variation"});
    };

    self.getVariationOccurences = function (systemId) {
        return self.sendDataRequest({ formatter: occurrenceDataFormatter, type: "occurenceVariation", system: systemId, limitedRow: "variation"});
    };

    self.getButterflyEffect = function (systemId) {
        return self.sendDataRequest({formatter: butterflyDataFormatter, type: "butterfly", system: systemId, limitedRow: "evolution_count"});
    };

    self.getDistanceEvolutionForASystem = function (systemId) {
        return self.sendDataRequest({formatter: distanceDataFormatter, type: "distanceEvolution", system: systemId,  limit: 150});
    };

    self.getDistanceEvolution = function () {
        var allDistanceData = [];
        var systemIds = self.getSystemNamesForDistanceEvolution();
        for (shared.counter = 0; shared.counter < systemIds.length; shared.counter++) {
            allDistanceData = allDistanceData.concat(self.getDistanceEvolutionForASystem(systemIds[shared.counter]));
        }
        return allDistanceData;
    };

    self.getNist = function () {
        var allNistData = [];
        shared.counter = 1;
        allNistData = allNistData.concat(self.sendDataRequest({formatter: NISTDataFormatter, type: "nist1"}));
        shared.counter++;
        allNistData = allNistData.concat(self.sendDataRequest({formatter: NISTDataFormatter, type: "nist2"}));
        shared.counter++;
        allNistData = allNistData.concat(self.sendDataRequest({formatter: NISTDataFormatter, type: "nist3"}));
        shared.counter++;
        allNistData = allNistData.concat(self.sendDataRequest({formatter: NISTDataFormatter, type: "nist4"}));
        return allNistData;
    };

    self.getSystemNamesForDistanceEvolution = function () {
        return self.sendDataRequest({ formatter: nameListFormatter, type: "namesForDistanceEvolution"});
    };

    self.getSystemNamesForLevel = function () {
        return self.sendDataRequest({formatter: nameListFormatter, type: "levelsName"});
    };

    self.getSystemNamesForLevelVariation = function () {
        return self.sendDataRequest({formatter: nameListFormatter, type: "levelsVariationName"});
    };

    self.getSystemNamesForButterflyEffect = function () {
        return self.sendDataRequest({formatter: nameListFormatter, type: "butterflyName"});
    };

    return self;
};
