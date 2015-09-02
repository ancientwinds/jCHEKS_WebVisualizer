<?php
    include("db/db.php"); 
    header('Content-type: application/json');
    function getData($configs) {
        $db = new DatabaseManager($configs["name"], $configs["limit"], $configs["limitedRow"], $configs["xLimit"], $configs["yLimit"]);
        if(!$db) {
           echo $db->lastErrorMsg();
        }
        
        switch ($configs["type"]) {
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
                echo json_encode($db->getDataForASystemFromTableInDatabase("nbOccurrences_level", $configs["system"]));
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
            case "nist5":
                echo json_encode($db->getDataOfAllSystemsFromTableInDatabase("Binary_Matrix_Rank_NIST_5"));
                break;
            case "nist9":
                echo json_encode($db->getDataOfAllSystemsFromTableInDatabase("Maurers_Universal_Statistical_NIST_9"));
                break;
            case "nist10":
                echo json_encode($db->getDataOfAllSystemsFromTableInDatabase("Linear_Complexity_NIST_10"));
                break;
            case "nist12":
                echo json_encode($db->getDataOfAllSystemsFromTableInDatabase("Approximate_Entropy_NIST_12"));
                break;
            case "butterflyName":
                echo json_encode($db->getSystemsNamesInTable("butterfly_effect"));
                break;
            case "butterfly":
                echo json_encode($db->getDataForASystemFromTableInDatabase("butterfly_effect", $configs["system"]));
                break;
            case "levelsVariationName":
                echo json_encode($db->getSystemsNamesInTable("nbOccurrences_levelVariation"));
                break;
            case "occurenceVariation":
                echo json_encode($db->getDataForASystemFromTableInDatabase("nbOccurrences_levelVariation", $configs["system"]));
                break;
            case "distanceEvolution":
                echo json_encode($db->getDataForASystemFromTableInDatabase("distance_between_evolution", $configs["system"]));
                break;
            case "namesForDistanceEvolution":
                echo json_encode($db->getSystemsNamesInTable("distance_between_evolution"));
                break;
            case "overallOccurenceVariation":
                echo json_encode($db->getOverallOccurenceData("overall_nbOccurrences_levelVariation"));
                break;
            case "overallOccurenceLevel":
                echo json_encode($db->getOverallOccurenceData("overall_nbOccurrences_level"));
                break;
            case "overallButterfly":
                echo json_encode($db->getOverallOccurenceData("overall_butterfly"));
                break;
        }
    }

    function validateConfigs($configs){
        $settingNames = array_keys($configs);
        $result = array();
        foreach($settingNames as $setting){
                $result[$setting] = (isset($_GET[$setting]))? $_GET[$setting] : "";
        }
        return $result;
    }
    $configs = array("type" => "", "system" => "", "name" => "", "xLimit" => "", "yLimit" => "",  "limitedRow" => "", "overallColumn" => "" );
    $configs = validateConfigs($configs);
    getData($configs);
