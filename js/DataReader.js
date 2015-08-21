var DataReader = function (databaseName) {
    var shared = {};
    shared.dataArray = [];
    shared.formatedObject = {};
    shared.counter = 0;
    shared.NISTCounter = 0;
    var defaultLimit = 500;

    function resetDataArray() {
        shared.dataArray = [];
    }

    var self = {};

    self.sendDataRequest = function (config) {
        config.limit = (config.limit) ? config.limit : defaultLimit;
        resetDataArray();
        var dataToSend= "";
        dataToSend += "type=" + config.type;
        dataToSend += "&name=" + databaseName;
        dataToSend += ((config.system) ? "&system=" + config.system : "");
        dataToSend += ((config.limit) ? "&limit=" + config.limit : "");
        dataToSend += ((config.limitedRow) ? "&limitedRow=" + config.limitedRow : "");
        dataToSend += ((config.overallColumn) ? "&overallColumn=" + config.overallColumn : "");
        $.ajax({
            url: "../php/getter.php",
            type: 'GET',
            dataType: 'json',
            async: false,
            data: dataToSend,
            success: config.formatter,
            error: function (msg) {
                $("body").html(msg.responseText);
            }
        });

        return shared.dataArray.slice();
    }

    self.evolutionDataFormatter = function (receivedData) {
        for (var i = 0; i < receivedData.length; i++) {
            shared.formatedObject = {
                systemId: receivedData[i].chaotic_system_id,
                x: parseInt(receivedData[i].evolution_count)
            };
            shared.dataArray.push(shared.formatedObject);
        }
    };

    self.occurrenceDataFormatter = function (receivedData) {
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

    self.overallDataFormatter = function (receivedData) {
        var name;
        var yValue = -1;
        for (var i = 0; i < receivedData.length; i++) {
            if (receivedData[i].chaotic_system_id != name) {
                yValue++;
                name = receivedData[i].chaotic_system_id;
            }
            shared.formatedObject = {
                systemId: receivedData[i].chaotic_system_id,
                y: yValue,
                x: parseInt(receivedData[i].groupIndex),
                color: parseInt(receivedData[i].overallSum)

            };
            shared.dataArray.push(shared.formatedObject);
        }
    };

    self.butterflyDataFormatter = function (receivedData) {
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

    self.NISTDataFormatter = function (receivedData) {
        for (var i = 0; i < receivedData.length; i++) {
            shared.formatedObject = {
                systemId: receivedData[i].chaotic_system_id,
                y: i,
                x: shared.NISTCounter,
                color: parseFloat(receivedData[i].p_value)
            };
            shared.dataArray.push(shared.formatedObject);
        }
        shared.NISTCounter++;
    }

    self.distanceDataFormatter = function (data2) {
        for (var i = 0; i < data2.length; i++) {
            shared.formatedObject = {
                systemId: data2[i].chaotic_system_id,
                y: shared.counter,
                x: parseInt(data2[i].evolution_count),
                color: parseInt(data2[i].distance)
            };
            shared.dataArray.push(shared.formatedObject);
        }
        shared.counter++;
    }

    var nameListFormatter = function (receivedData) {
        for (var i = 0; i < receivedData.length; i++) {
            shared.dataArray.push(receivedData[i].chaotic_system_id);
        }
    }


    self.getSystemNameForAType = function(type){
        return self.sendDataRequest({
            formatter: nameListFormatter,
            type: type
        });
    }
    return self;
};
