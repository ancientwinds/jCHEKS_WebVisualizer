function nbOccurrences_LevelAgent(dataReader) {

    var systemIds = dataReader.getSystemNamesForLevel();
    var id = "levelAgent"
    Layout.addTab(id, "Nb Occurences LevelAgent");
    var updateButton = $("<button>").text("update");
    var colorChartSidebar = ColorChartSidebar(id);

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
        colorChartSidebar.updateConfigs(config);
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
    sideBarContents.push(colorChartSidebar.getHTML());
    sideBarContents.push(updateButton);
    Layout.setSidebarContent(id, sideBarContents);

}
