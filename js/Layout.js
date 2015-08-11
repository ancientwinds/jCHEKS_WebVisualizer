var Layout = (function () {

    var frameIds = [];

    function switchTabs(frameToSwitch) {
        var svgElement;
        var sideBarElement;
        for (var i = 0; i < frameIds.length; i++) {
            svgElement = $("#" + frameIds[i] + "Svg");
            sideBarElement = $("#" + frameIds[i] + "Sidebar");
            if (frameIds[i] == frameToSwitch) {
                if (svgElement.is(":hidden")) svgElement.fadeIn();
                if (sideBarElement.is(":hidden")) sideBarElement.fadeIn();
            } else {
                svgElement.hide();
                sideBarElement.hide();
            }
        }
        w2ui.layout.get("main").tabs.active = frameToSwitch;
        w2ui.layout.get("main").tabs.refresh();
    }

    function initW2Layout(callback) {
        $("body").w2layout({
            name: 'layout',
            panels: [{
                type: 'top',
                size: 50,
                resizable: false,
                toolbar: {
                    name: 'toolbar',
                    items: [{
                        type: 'button',
                        id: 'loadButton',
                        caption: 'Load',
                        onClick: callback
                            }, {
                        type: 'html',
                        id: 'file',
                        html: "<select id='dropdown'></select>"
                            }]
                }
                }, {
                type: 'left',
                size: 200,
                resizable: false,
                content: "<div id='sidebar'></div>"
                }, {
                type: 'main',
                content: "<div id='tabs'></div>",
                tabs: {
                    onClick: function (event) {
                        switchTabs(event.target)
                    }
                }
            }]
        });

        $.ajax({
            url: "../php/getDatabaseNames.php",
            type: "POST",
            dataType: 'json',
            async: false,
            success: function (data2) {
                for (var i = 0; i < data2.length; i++) {
                    $("#dropdown").append($("<option value='" + data2[i] + "'>" + data2[i] + "</option>"))
                }
            }
        });

    }

    var getContainerWidth = function () {
        return window.innerWidth - 200;
    };

    var getContainerHeight = function () {
        return $("#tabs").height();
    };

    function addTabSvg(id) {
        $("#tabs").append($("<svg id='" + id + "Svg'></svg>"))
    }

    function addTabSideBar(id) {
        $("#sidebar").append($("<div class='panel' width='200' height='600' id='" + id + "Sidebar'>" + id + "</div>"));
    }

    function addTabElement(id, caption) {
        w2ui.layout.get("main").tabs.add({
            id: id,
            caption: caption
        });
    };

    function addToList(id) {
        frameIds.push(id);
    };

    var addTab = function (id, caption) {
        addTabSvg(id);
        addTabSideBar(id);
        addTabElement(id, caption);
        addToList(id);
        switchTabs(id)
    };

    var setSidebarContent = function (id, contents) {
        for (var i = 0; i < contents.length; i++) {
            $("#" + id + "Sidebar").append(contents[i]);
        }
    };

    var getSelectedDatabase = function () {
        return $("#dropdown option:selected").text();;
    };


    return {
        init: initW2Layout,
        addTab: addTab,
        setSidebarContent: setSidebarContent,
        getContainerWidth: getContainerWidth,
        getContainerHeight: getContainerHeight,
        getSelectedDatabase: getSelectedDatabase,
    };
})();
