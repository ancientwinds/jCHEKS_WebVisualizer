    function countEvolutions_AllAgentLevels(dataReader) {

        var id = "allLevelAgent";
        Layout.addTab(id, "AllLevelAgent");
        var barChartSidebar = BarChartSidebar(id);
        function getData(){
            return dataReader.sendDataRequest({formatter: dataReader.evolutionDataFormatter,type: "agentLevels"})
        }
        var config = {
            height: Layout.getContainerHeight(),
            width: Layout.getContainerWidth(),
            target: id + "Svg",
            yAxisTitle: "System",
            xAxisTitle: "Evolutions",
            chartTitle: "Evolutions to see all agent levels"
        }

        var chart = Chart.BarChart(getData(), config);

        function updateConfig() {
            barChartSidebar.updateConfigs(getData(), config);
        }

        function updateChart() {
            chart.update(getData(), config);
            barChartSidebar.updateStats(chart.getStats());
        }

        var update = function () {
            updateConfig();
            updateChart();
        }

        var sideBarContents = [];
        sideBarContents.push(barChartSidebar.getHTML());
        sideBarContents.push($("<button>").text("update").click(update));
        Layout.setSidebarContent(id, sideBarContents);
    }
