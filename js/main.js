$().ready(function () {
    var onFileSelected = function () {
        var dataReader = DataReader(Layout.getSelectedDatabase());

        var i = 0;
        //new DistanceEvolution(dataReader);
        console.log(i++);
        new nbOccurrences_LevelAgent(dataReader);
        console.log(i++);
        new nbOccurrences_LevelVariation(dataReader);
        console.log(i++);
        new ButterflyEffect(dataReader);
        console.log(i++);
        new countEvolution_AllKeyBits(dataReader);
        console.log(i++);
        new countEvolutions_AllAgentLevels(dataReader);
        console.log(i++);
        new Nist(dataReader);
    };
    Layout.init(onFileSelected);
    Layout.show();
});
