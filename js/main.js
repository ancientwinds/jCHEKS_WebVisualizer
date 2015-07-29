$().ready(function () {
    console.log("1");
    var onDatabaseLoaded = function (dataReader) {
        new nbOccurrences_LevelAgent(dataReader);
        new nbOccurrences_LevelVariation(dataReader);
        new ButterflyEffect(dataReader);
        new countEvolution_AllKeyBits(dataReader);
        new countEvolutions_AllAgentLevels(dataReader);
        //new KeyRepetition(dataReader);
        new Nist(dataReader);
    };

    var onFileSelected = function () {
        console.log("b");
        //var dataReader = DataReader(Layout.getSelectedFile(), onDatabaseLoaded);
        var dataReader = DataReader_1(onDatabaseLoaded);
        console.log("a");
    };
    console.log("0.5");
    Layout.init(onFileSelected);
    Layout.show();
});