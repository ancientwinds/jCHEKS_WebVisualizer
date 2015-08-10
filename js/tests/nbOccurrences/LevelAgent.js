function nbOccurrences_LevelAgent(dataReader) {

    var systemIds = dataReader.getSystemNamesForLevel();
    var id = "levelAgent"
    Layout.addTab(id, "Nb Occurences LevelAgent");
    var updateButton = $("<button>").text("update");

    var currentSpecificId = 0;

    var config = {
        height: Layout.getContainerHeight(),
        width: Layout.getContainerWidth(),
        target: id + "Svg",
        yAxisTitle: "Agent",
        xAxisTitle: "Level",
        chartTitle: "Occurence of agent levels"
    };


    function updateChart(currentId) {
        chart.update(dataReader.getLevelOccurences(systemIds[currentId]), config)
    }

    function updateConfig() {
        config.minDomain = $("#" + id + "MinDomain").val();
        config.maxDomain = $("#" + id + "MaxDomain").val();

    }

    var chart = Chart.colorChart(dataReader.getLevelOccurences(systemIds[0]), config);

    var updater = {
        loadASystem: function (currentId) {
            updateConfig();
            updateChart(currentId);
        },
        loadAllSystems: function () {
            updateConfig();
            chart.update(dataReader.getOverallLevelOccurences(), config)
        },
        update: null,
        updateButton: updateButton
    };

    updateButton.click(updater.update);
    var sideBarContents = [];
    sideBarContents.push(MultiSystemManager(systemIds, updater));
    sideBarContents.push("<hr><br>Color minimum domain: ");
    sideBarContents.push(Layout.createScaleInput(id + "MinDomain"));
    sideBarContents.push("<hr><br>Color maximum domain: ");
    sideBarContents.push(Layout.createScaleInput(id + "MaxDomain"));
    sideBarContents.push(updateButton);
    Layout.setSidebarContent(id, sideBarContents);

}
