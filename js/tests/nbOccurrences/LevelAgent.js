function nbOccurrences_LevelAgent(dataReader) {

    var systemIds = dataReader.getSystemNamesForLevel();
    var id = "levelAgent"
    Layout.addTab(id, "Nb Occurences LevelAgent");


    var currentSpecificId = 0;

    var config = {
        height: Layout.getContainerHeight(),
        width: Layout.getContainerWidth(),
        target: id + "Svg",
        yAxisTitle: "Agent",
        xAxisTitle: "Level",
        chartTitle: "Occurence of agent levels"
    };

    function incrementSpecificId() {
        currentSpecificId++;
        if (currentSpecificId >= systemIds.length) currentSpecificId = 0;
    }

    function decrementSpecificId() {
        currentSpecificId--;
        if (currentSpecificId < 0) currentSpecificId = systemIds.length - 1;
    }

    function updateChart() {
        chart.update(dataReader.getLevelOccurences(systemIds[currentSpecificId]), config)
    }

    function updateConfig() {
        config.minDomain = $("#" + id + "MinDomain").val();
        config.maxDomain = $("#" + id + "MaxDomain").val();
    }
    var update = function () {
        updateConfig();
        updateChart();
    }
    var onNext = function () {
        incrementSpecificId();
        update();
    };

    var onPrevious = function () {
        decrementSpecificId();
        update();
    };

    var chart = Chart.colorChart(dataReader.getLevelOccurences(systemIds[currentSpecificId]), config);

    var sideBarContents = [];

    sideBarContents.push(Layout.createNavigationButtons(onPrevious, onNext));
    sideBarContents.push("<hr><br>Color minimum domain: ");
    sideBarContents.push(Layout.createScaleInput(id + "MinDomain"));
    sideBarContents.push("<hr><br>Color maximum domain: ");
    sideBarContents.push(Layout.createScaleInput(id + "MaxDomain"));
    sideBarContents.push($("<button>").text("update").click(update));
    Layout.setSidebarContent(id, sideBarContents);

}