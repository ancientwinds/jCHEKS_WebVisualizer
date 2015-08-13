<?php
    include("db/db.php"); 
    header('Content-type: application/json');
    header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']);
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    function getData($type, $systemId, $databaseName, $limit, $limitedRow, $overallColumn) {
        $db = new DatabaseManager($databaseName, $limit, $limitedRow);
        if(!$db) {
           echo $db->lastErrorMsg();
        }
        
        switch ($type) {
            case "keyBits" :
                echo json_encode($db->getDataOfAllSystemsFromTableInDatabase("nbEvolutions_allKeyBits"));
                break;
            case "agentLevels":
                echo json_encode($db->getDataOfAllSystemsFromTableInDatabase("nbEvolutions_allAgentLevels"));
                break;
            case "levelsName":
                echo json_encode($db->getSystemsNamesInTable("nbOccurrences_level"));
                break; 
            case "occurenceLevel":
                if($systemId != ""){
                    echo json_encode($db->getDataForASystemFromTableInDatabase("nbOccurrences_level", $systemId));
                }
                else{
                    echo json_encode($db->getOverallOccurenceData);
                }
                break;                       
            case "nist1":
                echo json_encode($db->getDataOfAllSystemsFromTableInDatabase("FrequencyMonobit_NIST_1"));
                break;
            case "nist2":
                echo json_encode($db->getDataOfAllSystemsFromTableInDatabase("FrequencyBlock_NIST_2"));
                break;
            case "nist3":
                echo json_encode($db->getDataOfAllSystemsFromTableInDatabase("Runs_NIST_3"));
                break;
            case "nist4":
                echo json_encode($db->getDataOfAllSystemsFromTableInDatabase("LongestRun_NIST_4"));
                break;
            case "butterflyName":
                echo json_encode($db->getSystemsNamesInTable("butterfly_effect"));
                break;
            case "butterfly":
                echo json_encode($db->getDataForASystemFromTableInDatabase("butterfly_effect", $systemId));
                break;
            case "levelsVariationName":
                echo json_encode($db->getSystemsNamesInTable("nbOccurrences_levelVariation"));
                break;
            case "occurenceVariation":
                echo json_encode($db->getDataForASystemFromTableInDatabase("nbOccurrences_levelVariation", $systemId));
                break;
            case "distanceEvolution":
                echo json_encode($db->getDataForASystemFromTableInDatabase("distance_between_evolution", $systemId));
                break;
            case "namesForDistanceEvolution":
                echo json_encode($db->getSystemsNamesInTable("distance_between_evolution"));
                break;
            case "overallOccurenceVariation":
                echo json_encode($db->getOverallOccurenceData("nbOccurrences_levelVariation", $overallColumn));
                break;
            case "overallOccurenceLevel":
                echo json_encode($db->getOverallOccurenceData("nbOccurrences_level", $overallColumn));
                break;
            case "overallButterfly":
                echo json_encode($db->getOverallOccurenceData("butterfly_effect", $overallColumn));
                break;
        }
    }

    $type = "";
    $system = "";
    $name = "";
    $limit = "";
    $limitedRow = "";
    $overallColumn = "";
    if(isset($_GET["type"])) $type = $_GET["type"];
    if(isset($_GET["system"])) $system = $_GET["system"];
    if(isset($_GET["name"])) $name = $_GET["name"];
    if(isset($_GET["limit"])) $limit = $_GET["limit"];
    if(isset($_GET["limitedRow"])) $limitedRow = $_GET["limitedRow"];
    if(isset($_GET["overallColumn"])) $overallColumn = $_GET["overallColumn"];

    getData($type, $system, $name, $limit, $limitedRow, $overallColumn);
