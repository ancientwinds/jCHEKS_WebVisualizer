$().ready(function () {
    var onFileSelected = function () {
        var dataReader = DataReader(Layout.getSelectedDatabase());
        new DistanceEvolution(dataReader);
        new nbOccurrences_LevelAgent(dataReader);
        new nbOccurrences_LevelVariation(dataReader);
        new ButterflyEffect(dataReader);
        new countEvolution_AllKeyBits(dataReader);
        new countEvolutions_AllAgentLevels(dataReader);
        new Nist(dataReader);
        $(window).resize(function () {
            $("body").children().eq(0).height(window.innerHeight);
            $("#layout_layout_panel_main").height(window.innerHeight);
        });
        $("body").children().eq(0).height(window.innerHeight);
        $("#layout_layout_panel_main").height(window.innerHeight);
    };
    Layout.init(onFileSelected);

});
