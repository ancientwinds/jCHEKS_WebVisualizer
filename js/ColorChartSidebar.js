var ColorChartSidebar = function (mainId) {

    function createScaleInput(id, caption) {
        return $("<span>").addClass("setting")
            .append($("<label>").text(caption))
            .append($("<input>").attr("type", "number").attr("min", "0").attr("id", mainId + id));
    }

    var sidebar = {};

    sidebar.scale = {};
    sidebar.scale.minDomainInput = createScaleInput("ColorMinDomain", "Min");
    sidebar.scale.maxDomainInput = createScaleInput("ColorMaxDomain", "Max");
    sidebar.scale.minRangeInput = createScaleInput("ColorMinRange", "Min");
    sidebar.scale.maxRangeInput = createScaleInput("ColorMaxRange", "Max");

    sidebar.elementSize = createScaleInput("Size", "Size");

    sidebar.white = {};
    sidebar.white.min = null; // Not implemented
    sidebar.white.max = null; // Not implemented

    sidebar.black = {};
    sidebar.black.max = null; // Not implemented
    sidebar.black.min = null; // Not implemented

    sidebar.stats = $("<div>");

    var self = {};
    self.updateConfigs = function (configToUpdate) {
        configToUpdate.scale = {};
        configToUpdate.scale.minDomain = sidebar.scale.minDomainInput.children().eq(1).val();
        configToUpdate.scale.maxDomain = sidebar.scale.maxDomainInput.children().eq(1).val();
        configToUpdate.scale.minRange = sidebar.scale.minRangeInput.children().eq(1).val();
        configToUpdate.scale.maxRange = sidebar.scale.maxRangeInput.children().eq(1).val();
        configToUpdate.elementSize = sidebar.elementSize.children().eq(1).val();
    };

    self.getHTML = function () {
        var scaleSettings = $("<div>").attr("id", mainId + "ScaleSettings");
        scaleSettings
            .append("<hr>")
            .append($("<strong>").text("Scale domain"))
            .append("<br>")
            .append(sidebar.scale.minDomainInput)
            .append("<br>")
            .append(sidebar.scale.maxDomainInput)
            .append("<br>").append("<br>")
            .append($("<strong>").text("Scale range"))
            .append("<br>")
            .append(sidebar.scale.minRangeInput)
            .append("<br>")
            .append(sidebar.scale.maxRangeInput)
            .append("<hr>")
            .append($("<strong>").text("Dimension"))
            .append("<br>")
            .append(sidebar.elementSize)
            .append("<br>")
            .append("<hr>")
            .append($("<strong>").text("Stats"))
            .append(sidebar.stats)
            .append("<br>");

        return scaleSettings;
    };

    self.updateStats = function (stats) {
        sidebar.stats.text("");
        sidebar.stats
            .append("Min: " + stats.minimum + "<br>")
            .append("Max: " + stats.maximum + "<br>")
            .append("Mean: " + Math.round(stats.mean) + "<br>")
            .append("Median: " + stats.median + "<br>")
            .append("Deviation: " + Math.round(stats.deviation) + "<br>")
            .append("<br>");
    };

    return self;
}
