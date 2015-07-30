var Layout = (function () {

    var frameIds = [];

    function switchTabs(frameToSwitch) {
        for (var i = 0; i < frameIds.length; i++) {
            if (frameIds[i] == frameToSwitch) {
                if ($("#" + frameIds[i] + "Svg").is(":hidden")) {
                    $("#" + frameIds[i] + "Svg").fadeIn();
                }
                if ($("#" + frameIds[i] + "Sidebar").is(":hidden")) {
                    $("#" + frameIds[i] + "Sidebar").fadeIn();
                }

            } else {
                $('#' + frameIds[i] + "Svg").hide();
                $('#' + frameIds[i] + "Sidebar").hide();
            }

        }
        w2ui.layout.get("main").tabs.active = frameToSwitch;
        w2ui.layout.get("main").tabs.refresh();
    }

    function initW2Layout(callback) {
        var pstyle = 'border: 1px solid #dfdfdf; padding: 5px;';
        
        var database = [];
        $.ajax({
            url: "../php/getDatabaseNames.php",
            type: "POST",
            dataType: 'json',
            async: false,
            data: "type=levelsVariationName",
            success: function(data2) {
                for(var i = 0; i < data2.length; i++) {
                    database.push(data2[i]);
                }
            }
        });
        $("body").w2layout({
            name: 'layout',
            panels: [
                {
                    type: 'top',
                    size: 50,
                    resizable: false,
                    //style: pstyle,
                    toolbar: {
                        name: 'toolbar',
                        items: [
                            {
                                id: "fileLabel",
                                type: 'html',
                                caption: 'File: ',
                            },
                            {
                                type: 'html',
                                id: 'file',

                                html: "<input type='file' id='file'>"
                            },
                            {
                                type: 'button',
                                id: 'loadButton',
                                caption: 'Load',
                                onClick: callback
                            },
                            { type: 'menu',   id: 'item2', caption: 'Database', img: 'icon-folder', items: [
                                    { text: 'Item 1', icon: 'icon-page' }, 
                                    { text: 'Item 2', icon: 'icon-page' }, 
                                    { text: 'Item 3', value: 'Item Three', icon: 'icon-page' }
                            ]}
                        ]
                    }
                },
                {
                    type: 'left',
                    size: 200,
                    resizable: false,
                    content: "<div id='sidebar'></div>"
                },
                {
                    type: 'main',
                    content: "<div id='tabs'></div>",
                    tabs: {
                        onClick: function (event) {
                            switchTabs(event.target)
                        }
                    }

                }
                ]

        });

        $('#file').w2field('file', {
            max: 1
        });

    }

    var getContainerWidth = function () {
        return window.innerWidth - 200;
    }

    var getContainerHeight = function () {
        return $("#tabs").height();
    }

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
    }

    function addToList(id) {
        frameIds.push(id);
    }

    var addTab = function (id, caption) {
        addTabSvg(id);
        addTabSideBar(id);
        addTabElement(id, caption);
        addToList(id);
        switchTabs(id)
    }

    var setSidebarContent = function (id, contents) {
        for (var i = 0; i < contents.length; i++) {
            $("#" + id + "Sidebar").append(contents[i]);
        }
    }

    var show = function () {
        $("body").fadeIn(1000);
    }
    var getSelectedFile = function () {
        return $("#file").data('selected')[0].file;
    }

    var createNavigationButtons = function (onPreviousClick, onNextClick) {
        var previousButton = $("<button>").text("Previous").click(onPreviousClick)
        var nextButton = $("<button>").text("Next").click(onNextClick);
        return $("<div>").append(previousButton).append(nextButton);
    }

    var createScaleInput = function (id) {
        return $("<input>").attr("type", "number").attr("min", "0").attr("id", id);
    }

    return {
        init: initW2Layout,
        addTab: addTab,
        setSidebarContent: setSidebarContent,
        getContainerWidth: getContainerWidth,
        getContainerHeight: getContainerHeight,
        show: show,
        getSelectedFile: getSelectedFile,
        createNavigationButtons: createNavigationButtons,
        createScaleInput: createScaleInput
    };
})();