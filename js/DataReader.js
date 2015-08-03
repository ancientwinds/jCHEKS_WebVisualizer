var DataReader = function (callback) {
 //var reader = new FileReader();
    var database;

    var self = {};

    self.getAllKeybits = function () {
        var data = [];
        var formatedObject;

        $.ajax({
            url: "../php/getter.php",
            type: "POST",
            dataType: 'json',
            async: false,
            data: "type=keyBits",
            success: function(data2) {
                for(var i = 0; i < data2.length; i++) {
                    formatedObject = {
                      systemId: data2[i].chaotic_system_id,
                      x: parseInt(data2[i].evolution_count)
                    };
                    data.push(formatedObject);
                }
            }
        });
        return data;
    };

    self.getKeyRepetitions = function () {
        var data = [];
        /*var stmt = database.prepare("SELECT * FROM nbEvolutions_keyRepetition;");
        var formatedObject;
        var rowObject;
        while (stmt.step()) {
            rowObject = stmt.getAsObject();
            formatedObject = {
                systemId: rowObject.chaotic_system_id,
                x: rowObject.evolution_count,
            };
            data.push(formatedObject);
        }
        stmt.free();*/
        return data;
    };

    self.getAllLevelAgent = function () {
        var data = [];
        var formatedObject;

        $.ajax({
            url: "../php/getter.php",
            type: "POST",
            dataType: 'json',
            async: false,
            data: "type=agentLevels",
            success: function(data2) {
                for(var i = 0; i < data2.length; i++) {
                    formatedObject = {
                      systemId: data2[i].chaotic_system_id,
                      x: parseInt(data2[i].evolution_count)
                    };
                    data.push(formatedObject);
                }
            }
        });
        return data;
    };

    self.getOverallLevelOccurences = function () {
        console.error("'getOverallLevelOccurences' not implemented, random values will be returned.");
        var data = [];
        var maxY = Math.floor(Math.random() * 200) + 10;
        var maxX = Math.floor(Math.random() * 200) + 10;
        for (var y = 0; y < maxY; y++) {
            for (var x = 0; x < maxX; x++) {
                data[y * maxX + x] = {};
                data[y * maxX + x].color = Math.floor(Math.random() * 4000) + 4000;
                data[y * maxX + x].x = x;
                data[y * maxX + x].y = y;
            }
        }
        return data;
    };

    self.getLevelOccurences = function (systemId) {
        var data = [];
        var formatedObject;

        $.ajax({
            url: "../php/getter.php",
            type: "POST",
            dataType: 'json',
            async: false,
            data: "type=occurenceLevel&system=" + systemId,
            success: function(data2) {
                for(var i = 0; i < data2.length; i++) {
                    formatedObject = {
                      systemId: data2[i].chaotic_system_id,
                      y: parseInt(data2[i].agent_id),
                      x: parseInt(data2[i].variation),
                      color: parseInt(data2[i].occurence_count)

                    };
                    data.push(formatedObject);
                }
            }
        });
        return data;
    };

    self.getOverallVariationOccurences = function () {
        console.error("'getOverallVariationOccurences' not implemented, random values will be returned.");
        var data = [];
        var maxY = 50; //Math.floor(Math.random() * 200) + 56;
        var maxX = 50; //Math.floor(Math.random() * 200) + 56;
        for (var y = 0; y < maxY; y++) {
            for (var x = 0; x < maxX; x++) {
                data[y * maxX + x] = {};
                data[y * maxX + x].color = Math.floor(Math.random() * 4000) + 4000;
                data[y * maxX + x].x = x;
                data[y * maxX + x].y = y;
            }
        }
        console.log(data);
        return data;
    };

    self.getVariationOccurences = function (systemId) {
        var data = [];
        var formatedObject;

        $.ajax({
            url: "../php/getter.php",
            type: "POST",
            dataType: 'json',
            async: false,
            data: "type=occurenceVariation&system=" + systemId,
            success: function(data2) {
                for(var i = 0; i < data2.length; i++) {
                    formatedObject = {
                      y: parseInt(data2[i].agent_id),
                      x: parseInt(data2[i].variation),
                      color: parseInt(data2[i].occurence_count)

                    };
                    data.push(formatedObject);
                }
            }
        });

        return data;
    };

    self.getButterflyEffect = function (systemId) {
        var data = [];
        var formatedObject;

        $.ajax({
            url: "../php/getter.php",
            type: "POST",
            dataType: 'json',
            async: false,
            data: "type=butterfly&system=" + systemId,
            success: function(data2) {
                for(var i = 0; i < data2.length; i++) {
                    formatedObject = {
                      systemId: data2[i].chaotic_system_id,
                      y: parseInt(data2[i].clone_id),
                      x: parseInt(data2[i].evolution_count),
                      color: parseInt(data2[i].distance)

                    };
                    data.push(formatedObject);
                }
            }
        });
        return data;
    };

    self.getOverallButterflyEffect = function () {
        console.error("'getOverallButterfly' not implemented, random values will be returned.");
        var data = [];
        var maxY = 10; //Math.floor(Math.random() * 128) + 4;
        var maxX = 10; //Math.floor(Math.random() * 200) + 32;
        for (var y = 0; y < maxY; y++) {
            for (var x = 0; x < maxX; x++) {
                data[y * maxX + x] = {};
                data[y * maxX + x].color = Math.floor(Math.random() * 256);
                data[y * maxX + x].x = x;
                data[y * maxX + x].y = y;
            }
        }
        return data;
    };

    self.getOverallLevelVariation = function () {
        console.error("'getOverallButterfly' not implemented, random values will be returned.");
        var data = [];
        var maxY = 10; //Math.floor(Math.random() * 128) + 4;
        var maxX = 10; //Math.floor(Math.random() * 200) + 32;
        for (var y = 0; y < maxY; y++) {
            for (var x = 0; x < maxX; x++) {
                data[y * maxX + x] = {};
                data[y * maxX + x].color = Math.floor(Math.random() * 256);
                data[y * maxX + x].x = x;
                data[y * maxX + x].y = y;
            }
        }
        return data;
    };

    function getNist1() {
        var data = [];
        var formatedObject;

        $.ajax({
            url: "../php/getter.php",
            type: "POST",
            dataType: 'json',
            async: false,
            data: "type=nist1",
            success: function(data2) {
                for(var i = 0; i < data2.length; i++) {
                    formatedObject = {
                      systemId: data2[i].chaotic_system_id,
                      y: i,
                      x: 1,
                      color: parseFloat(data2[i].p_value)

                    };
                    data.push(formatedObject);
                }
            }
        });
        return data;
    }

    function getNist2() {
        var data = [];
        var formatedObject;

        $.ajax({
            url: "../php/getter.php",
            type: "POST",
            dataType: 'json',
            async: false,
            data: "type=nist2",
            success: function(data2) {
                for(var i = 0; i < data2.length; i++) {
                    formatedObject = {
                      systemId: data2[i].chaotic_system_id,
                      y: i,
                      x: 2,
                      color: parseFloat(data2[i].p_value)

                    };
                    data.push(formatedObject);
                }
            }
        });
        return data;
    }

    function getNist3() {
        var data = [];
        var formatedObject;

        $.ajax({
            url: "../php/getter.php",
            type: "POST",
            dataType: 'json',
            async: false,
            data: "type=nist3",
            success: function(data2) {
                for(var i = 0; i < data2.length; i++) {
                    formatedObject = {
                      systemId: data2[i].chaotic_system_id,
                      y: i,
                      x: 3,
                      color: parseFloat(data2[i].p_value)

                    };
                    data.push(formatedObject);
                }
            }
        });
        return data;
    }

    function getNist4() {
        var data = [];
        var formatedObject;

        $.ajax({
            url: "../php/getter.php",
            type: "POST",
            dataType: 'json',
            async: false,
            data: "type=nist4",
            success: function(data2) {
                for(var i = 0; i < data2.length; i++) {
                    formatedObject = {
                      systemId: data2[i].chaotic_system_id,
                      y: i,
                      x: 4,
                      color: parseFloat(data2[i].p_value)

                    };
                    data.push(formatedObject);
                }
            }
        });
        return data;
    }

    self.getNist = function () {
        var data = [];
        data = data.concat(getNist1()).concat(getNist2()).concat(getNist3()).concat(getNist4());
        return data;
    };

    self.getSystemNamesForButterflyEffect = function () {
        var data = [];

        $.ajax({
            url: "../php/getter.php",
            type: "POST",
            dataType: 'json',
            async: false,
            data: "type=butterflyName",
            success: function(data2) {
                for(var i = 0; i < data2.length; i++) {
                    data.push(data2[i].chaotic_system_id);
                }
            }
        });

        return data;
    };

    self.getSystemNamesForLevel = function () {
        var data = [];

        $.ajax({
            url: "../php/getter.php",
            type: "POST",
            dataType: 'json',
            async: false,
            data: "type=levelsName",
            success: function(data2) {
                for(var i = 0; i < data2.length; i++) {
                    data.push(data2[i].chaotic_system_id);
                }
            }
        });

        return data;
    };

    self.getSystemNamesForLevelVariation = function () {
        var data = [];

        $.ajax({
            url: "../php/getter.php",
            type: "POST",
            dataType: 'json',
            async: false,
            data: "type=levelsVariationName",
            success: function(data2) {
                for(var i = 0; i < data2.length; i++) {
                    data.push(data2[i].chaotic_system_id);
                }
            }
        });

        return data;
    };

    return self;

};
