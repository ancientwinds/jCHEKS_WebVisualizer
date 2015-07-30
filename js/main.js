$().ready(function () {
    var onDatabaseLoaded = function (dataReader) {
        //new nbOccurrences_LevelAgent(dataReader);
        new nbOccurrences_LevelVariation(dataReader);
        //new ButterflyEffect(dataReader);
        //new countEvolution_AllKeyBits(dataReader);
        //new countEvolutions_AllAgentLevels(dataReader);
        //new KeyRepetition(dataReader);
        //new Nist(dataReader);  
    };

    var onFileSelected = function () {
        //var dataReader = DataReader(Layout.getSelectedFile(), onDatabaseLoaded);
        var dataReader = DataReader_1(Layout.getSelectedDatabase(), onDatabaseLoaded);
    };
    Layout.init(onFileSelected);
    Layout.show();
});