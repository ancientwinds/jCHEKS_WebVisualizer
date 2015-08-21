function nbOccurrences_LevelVariation(dataReader) {
    var id = "levelVariation";
    var systemIds = dataReader.getSystemNameForAType("levelsVariationName");
    var updateButton = $("<button>").text("update");
    Layout.addTab(id, "Nb occurrences Level Variation");
    var colorChartSidebar = ColorChartSidebar(id);
    function getOverallData(){
        return dataReader.sendDataRequest({
            formatter: dataReader.overallDataFormatter,
            type: "overallOccurenceVariation",
        });
    }
    function getData(currentId){
        return dataReader.sendDataRequest({
            formatter: dataReader.occurrenceDataFormatter,
            type: "occurenceVariation",
            system: systemIds[currentId],
            limitedRow: "variation"
        });
    }

    var config = {
        height: Layout.getContainerHeight(),
        width: Layout.getContainerWidth(),
        target: id + "Svg",
        yAxisTitle: "Agent",
        overall_yAxisTitle: "System",
        yAxisToUse: "specific",
        xAxisTitle: "Variation",
        chartTitle: "Occurrences of level variation"
    };

    function updateConfig() {
        colorChartSidebar.updateConfigs(config);
    }

    function updateChart(currentId) {
        chart.update(getData(currentId), config);
        colorChartSidebar.updateStats(chart.getStats());
    }

    var chart = Chart.ColorChart(getData(0), config);

    var updater = {
        loadASystem: function (currentId) {
            updateConfig();
            updateChart(currentId);
        },
        loadAllSystems: function () {
            chart.update(getOverallData(), config);
            colorChartSidebar.updateStats(chart.getStats());
        },
        update: null,
        updateButton: updateButton,
        config: config
    };

    updateButton.click(updater.update);
    var sideBarContents = [];
    sideBarContents.push(MultiSystemManager(systemIds, updater));
    sideBarContents.push(colorChartSidebar.getHTML());
    sideBarContents.push(updateButton);
    Layout.setSidebarContent(id, sideBarContents);
}
