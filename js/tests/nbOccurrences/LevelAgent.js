function nbOccurrences_LevelAgent(dataReader) {

    var systemIds = dataReader.getSystemNameForAType("levelsName");
    var id = "levelAgent"
    Layout.addTab(id, "Nb Occurences LevelAgent");
    var updateButton = $("<button>").text("update");
    var colorChartSidebar = ColorChartSidebar(id);


    var config = {
        height: Layout.getContainerHeight(),
        width: Layout.getContainerWidth(),
        target: id + "Svg",
        yAxisTitle: "Agent",
        overall_yAxisTitle: "System",
        yAxisToUse: "specific",
        xAxisTitle: "Level",
        chartTitle: "Occurence of agent levels",
        limit: {}
    };

    function getOverallData(){
        return dataReader.sendDataRequest({
            formatter: dataReader.overallDataFormatter,
            type: "overallOccurenceLevel",
        });
    }

    function getData(currentId){
        return dataReader.sendDataRequest({
            formatter: dataReader.occurrenceDataFormatter,
            type: "occurenceLevel",
            system: systemIds[currentId],
            limitedRow: "variation",
            limit: config.limit.x
        });
    }


    function getOverallData(){
        return dataReader.sendDataRequest({
            formatter: dataReader.overallDataFormatter,
            type: "overallOccurenceLevel",
        });
    }

    function updateChart(currentId) {
        chart.update(getData(currentId), config);
        colorChartSidebar.updateStats(chart.getStats());
    }

    function updateConfig() {
        colorChartSidebar.updateConfigs(config);
    }

    var chart = Chart.ColorChart(getData(0), config);

    var updater = {
        loadASystem: function (currentId) {
            updateConfig();
            updateChart(currentId);
        },
        loadAllSystems: function () {
            updateConfig();
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
