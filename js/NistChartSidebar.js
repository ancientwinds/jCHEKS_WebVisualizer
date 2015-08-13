var NistChartSidebar = function (mainId) {

    function createScaleInput(id, caption) {
        return $("<span>").addClass("setting")
            .append($("<label>").text(caption))
            .append($("<input>").attr("type", "number").attr("min", "0").attr("id", mainId + id));
    }

    var sidebar = {};

    sidebar.range = {};
    sidebar.range.limitInput = createScaleInput("Limit", "Limit");
    sidebar.range.warningRangeInput = createScaleInput("WarningRange", "Range");

    sidebar.elementSize = {};
    sidebar.elementSize.widthInput = createScaleInput("Width", "Width");
    sidebar.elementSize.heightInput = createScaleInput("Height", "Size");


    var self = {};
    self.updateConfigs = function (configToUpdate) {
        configToUpdate.range = {};
        configToUpdate.range.limit = sidebar.range.limitInput.children().eq(1).val();
        configToUpdate.range.warningRange = sidebar.range.warningRangeInput.children().eq(1).val();
        configToUpdate.elementSize = {};
        configToUpdate.elementSize.height = sidebar.elementSize.heightInput.children().eq(1).val();
        configToUpdate.elementSize.width = sidebar.elementSize.widthInput.children().eq(1).val();
    };

    self.getHTML = function () {
        var scaleSettings = $("<div>").attr("id", mainId + "ScaleSettings");
        scaleSettings
            .append("<hr>")
            .append($("<strong>").text("Scale range")).append("<br>")
            .append(sidebar.range.limitInput).append("<br>")
            .append(sidebar.range.warningRangeInput)
            .append("<hr>")
            .append($("<strong>").text("Dimension")).append("<br>")
            .append(sidebar.elementSize.widthInput).append("<br>")
            .append(sidebar.elementSize.heightInput).append("<br>")
            .append("<br>")
            .append(sidebar.stats).append("<br>");

        return scaleSettings;
    };

    return self;
}
