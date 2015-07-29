var DataReader = function (databaseFile, callback) {
    var reader = new FileReader();
    var database;
    var ready = false;

    var self = {};

    self.getAllKeybits = function () {
        var data = [];
        var stmt = database.prepare("SELECT * FROM nbEvolutions_AllKeyBits;");
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
        stmt.free();
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
        var stmt = database.prepare("SELECT * FROM nbEvolutions_allAgentLevels;");
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
        stmt.free();
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
        var stmt = database.prepare("SELECT * FROM nbOccurrences_level WHERE chaotic_system_id='" + systemId + "';");
        var formatedObject;
        var rowObject;
        while (stmt.step()) {
            rowObject = stmt.getAsObject();
            formatedObject = {
                systemId: rowObject.chaotic_system_id,
                y: rowObject.agent_id,
                x: rowObject.variation,
                color: rowObject.occurence_count

            };
            data.push(formatedObject);
        }
        stmt.free();
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
        var stmt = database.prepare("SELECT * FROM nbOccurences_levelVariation WHERE chaotic_system_id='" + systemId + "';");
        var formatedObject;
        var rowObject;
        while (stmt.step()) {
            rowObject = stmt.getAsObject();
            formatedObject = {
                //systemId: rowObject.chaotic_system_id,
                y: rowObject.agent_id,
                x: rowObject.variation,
                color: rowObject.occurence_count

            };
            data.push(formatedObject);
        }
        stmt.free();
        return data;
    };

    self.getButterflyEffect = function (systemId) {
        var data = [];
        var stmt = database.prepare("SELECT * FROM butterfly_effect WHERE chaotic_system_id='" + systemId + "' AND evolution_count < 150;");
        var formatedObject;
        var rowObject;
        while (stmt.step()) {
            rowObject = stmt.getAsObject();
            formatedObject = {
                systemId: rowObject.chaotic_system_id,
                y: rowObject.clone_id,
                x: rowObject.evolution_count,
                color: rowObject.distance

            };
            data.push(formatedObject);
        }
        stmt.free();
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
        var stmt = database.prepare("SELECT * FROM FrequencyMonobit_NIST_1;");
        var formatedObject;
        var rowObject;
        var y = 0;
        while (stmt.step()) {
            rowObject = stmt.getAsObject();
            formatedObject = {
                systemId: rowObject.chaotic_system_id,
                y: y,
                x: 1,
                color: rowObject.p_value
            };
            data.push(formatedObject);
            y++
        }
        stmt.free();
        console.log(data);
        return data;
    }

    function getNist2() {
        var data = [];
        var stmt = database.prepare("SELECT * FROM FrequencyBlock_NIST_2;");
        var formatedObject;
        var rowObject;
        var y = 0;
        while (stmt.step()) {
            rowObject = stmt.getAsObject();
            formatedObject = {
                systemId: rowObject.chaotic_system_id,
                x: 2,
                y: y,
                color: rowObject.p_value
            };
            data.push(formatedObject);
            y++
        }
        stmt.free();
        console.log(data);
        return data;
    }

    function getNist3() {
        var data = [];
        var stmt = database.prepare("SELECT * FROM Runs_NIST_3;");
        var formatedObject;
        var rowObject;
        var y = 0;
        while (stmt.step()) {
            rowObject = stmt.getAsObject();
            formatedObject = {
                systemId: rowObject.chaotic_system_id,
                y: y,
                x: 3,
                color: rowObject.p_value
            };
            data.push(formatedObject);
            y++;
        }
        stmt.free();
        console.log(data);
        return data;
    }

    function getNist4() {
        var data = [];
        var stmt = database.prepare("SELECT * FROM LongestRun_NIST_4;");
        var formatedObject;
        var rowObject;
        var y = 0;
        while (stmt.step()) {
            rowObject = stmt.getAsObject();
            formatedObject = {
                systemId: rowObject.chaotic_system_id,
                y: y,
                x: 4,
                color: rowObject.p_value
            };
            data.push(formatedObject);
            y++;
        }
        stmt.free();
        console.log(data);
        return data;
    }

    self.getNist = function () {
        var data = [];
        data = data.concat(getNist1()).concat(getNist2()).concat(getNist3()).concat(getNist4());
        return data;
    };

    self.getSystemNamesForButterflyEffect = function () {
        var data = [];
        var stmt = database.prepare("SELECT DISTINCT chaotic_system_id FROM butterfly_effect ORDER BY chaotic_system_id;");
        while (stmt.step()) {
            data.push(stmt.getAsObject().chaotic_system_id);
        }
        stmt.free();
        return data;
    }
    
    self.getSystemNamesForLevel = function () {
        var data = [];
        var stmt = database.prepare("SELECT DISTINCT chaotic_system_id FROM nbOccurrences_level  ORDER BY chaotic_system_id;");
        while (stmt.step()) {
            data.push(stmt.getAsObject().chaotic_system_id);
        }
        stmt.free();
        return data;
    }
    
    self.getSystemNamesForLevelVariation = function () {
        var data = [];
        var stmt = database.prepare("SELECT DISTINCT chaotic_system_id FROM nbOccurences_levelVariation ORDER BY chaotic_system_id;");
        while (stmt.step()) {
            data.push(stmt.getAsObject().chaotic_system_id);
        }
        stmt.free();
        return data;
    }

    var onReady = function () {
        database = new SQL.Database(new Uint8Array(reader.result));
        callback(self);
    }

    reader.onload = onReady;
    reader.readAsArrayBuffer(databaseFile);


};