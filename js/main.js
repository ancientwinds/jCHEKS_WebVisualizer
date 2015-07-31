$().ready(function () {



    var onFileSelected = function () {
        var dataReader = DataReader();
        new DistanceEvolution(dataReader);
        new nbOccurrences_LevelAgent(dataReader);
        new nbOccurrences_LevelVariation(dataReader);
        new ButterflyEffect(dataReader);
        new countEvolution_AllKeyBits(dataReader);
        new countEvolutions_AllAgentLevels(dataReader);
        new KeyRepetition(dataReader);
        new Nist(dataReader);
    };
    Layout.init(onFileSelected);
    Layout.show();
});
