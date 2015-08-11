    function countEvolutions_AllAgentLevels(dataReader) {

        var id = "allLevelAgent";
        Layout.addTab(id, "AllLevelAgent");

        Chart.BarChart(dataReader.getAllLevelAgent(), {
            height: Layout.getContainerHeight(),
            width: Layout.getContainerWidth(),
            target: id + "Svg",
            yAxisTitle: "System",
            xAxisTitle: "Evolutions",
            chartTitle: "Evolutions to see all agent levels"
        });

    }
