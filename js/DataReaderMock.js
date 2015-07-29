var DataReader = function () {

    var self = {};

    self.getAllKeybits = function () {
        var data = [];
        var maxY = 100;
        for (var y = 0; y < maxY; y++) {
            data[y] = {};
            data[y].x = Math.floor(Math.random() * 400) + 200;
            data[y].id = "system " + Math.floor(Math.random() * 20000);
        }
        return data;
    };


    self.getKeyRepetitions = function () {
        var data = [];
        var maxY = 100;
        for (var y = 0; y < maxY; y++) {
            data[y] = {};
            data[y].x = Math.floor(Math.random() * 400) + 200;
            data[y].id = "system " + Math.floor(Math.random() * 20000);
        }
        return data;
    };

    self.getAllLevelAgent = function () {
        var data = [];
        var maxY = 200;
        for (var y = 0; y < maxY; y++) {
            data[y] = {};
            data[y].x = Math.floor(Math.random() * 2000); //Math.floor(Math.random() * 200);
            data[y].id = "system " + Math.floor(Math.random() * 20000);
        }
        return data;
    };

    self.getOverallLevelOccurences = function () {
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

    self.getLevelOccurences = function () {
        var data = [];
        var maxY = 100; //Math.floor(Math.random() * 128) + 4;
        var maxX = 12; //Math.floor(Math.random() * 200) + 32;
        for (var y = 0; y < maxY; y++) {
            for (var x = 0; x < maxX; x++) {
                data[y * maxX + x] = {};
                data[y * maxX + x].color = Math.floor(Math.random() * 4000) + 4000;
                data[y * maxX + x].x = x;
                data[y * maxX + x].y = y;
            }
        }
        return data;
    }

    self.getOverallVariationOccurences = function () {
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

    self.getVariationOccurences = function () {
        var data = [];
        var maxY = 125; //Math.floor(Math.random() * 128) + 4;
        var maxX = 125; //Math.floor(Math.random() * 200) + 32;
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


    self.getButterflyEffect = function () {
        var data = [];
        var maxY = 10; //Math.floor(Math.random() * 128) + 4;
        var maxX = 10; //Math.floor(Math.random() * 200) + 32;
        for (var y = 0; y < maxY; y++) {
            for (var x = 0; x < maxX; x++) {
                data[y * maxX + x].color = Math.floor(Math.random() * 256);
                data[y * maxX + x].x = x;
                data[y * maxX + x].y = y;
            }
        }
        return data;
    };

    self.getOverallButterflyEffect = function () {
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


    self.getNist = function () {
        var data = [];
        var maxY = 100;
        var maxX = 15;
        for (var y = 0; y < maxY; y++) {
            for (var x = 0; x < maxX; x++) {
                data[y * maxX + x] = {};
                data[y * maxX + x].color = Math.random();
                data[y * maxX + x].x = x;
                data[y * maxX + x].y = y;
            }
        }
        return data;
    };

    return self;

};