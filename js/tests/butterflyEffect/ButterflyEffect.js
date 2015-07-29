    function ButterflyEffect(dataReader) {


        var systemIds = dataReader.getSystemNamesForButterflyEffect();

        var id = "butterfly";

        Layout.addTab(id, "Butterfly Effect");

        var currentSpecificId = 0;

        var config = {
            height: Layout.getContainerHeight(),
            width: Layout.getContainerWidth(),
            target: id + "Svg",
            yAxisTitle: "System",
            xAxisTitle: "Evolution",
            chartTitle: "Distance (Butterfly)"
        };

        var chart = Chart.colorChart(dataReader.getButterflyEffect(systemIds[currentSpecificId]), config);

        function incrementSpecificId() {
            currentSpecificId++;
            if (currentSpecificId >= systemIds.length) currentSpecificId = 0;
        }

        function decrementSpecificId() {
            currentSpecificId--;
            if (currentSpecificId < 0) currentSpecificId = systemIds.length - 1;
        }

        function updateConfig() {
            config.minDomain = $("#" + id + "MinDomain").val() || config.minDomain;
            config.maxDomain = $("#" + id + "MaxDomain").val() || config.maxDomain;
        }

        function updateChart() {
            chart.update(dataReader.getButterflyEffect(systemIds[currentSpecificId]), config)
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
            decrementSpecificId;
            update();
        };

        var sideBarContents = [];
        sideBarContents.push(Layout.createNavigationButtons(onPrevious, onNext));
        sideBarContents.push("<hr><br>Color minimum domain: ");
        sideBarContents.push(Layout.createScaleInput(id + "MinDomain"));
        sideBarContents.push("<hr><br>Color maximum domain: ");
        sideBarContents.push(Layout.createScaleInput(id + "MaxDomain"));
        sideBarContents.push($("<button>").text("update").click(update));
        Layout.setSidebarContent(id, sideBarContents);
    }