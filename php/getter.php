<?php
    include("db/db.php"); 
    header('Content-type: application/json');
    function getData($type, $system, $databaseName) {
        $db = new DatabaseManager($databaseName);
        if(!$db) {
           echo $db->lastErrorMsg();
        }
        
        switch ($type) {
            case "keyBits" :
                echo json_encode($db->getEvolutionKeyBitsResults()); 
                break;
            case "agentLevels":
                echo json_encode($db->getEvolutionAgentLevelResults()); 
                break;
            case "levelsName":
                echo json_encode($db->getSystemsNamesForLevel());
                break; 
            case "occurenceLevel":
                echo json_encode($db->getOccurenceLevel($system));
                break;                       
            case "nist1":
                echo json_encode($db->getNist1ResultsForSystem());
                break;
            case "nist2":
                echo json_encode($db->getNist2ResultsForSystem());
                break;
            case "nist3":
                echo json_encode($db->getNist3ResultsForSystem());
                break;
            case "nist4":
                echo json_encode($db->getNist4ResultsForSystem());
                break;
            case "butterflyName":
                echo json_encode($db->getSystemNamesForButterfly());
                break;
            case "butterfly":
                echo json_encode($db->getButterFlyResults($system));
                break;
            case "levelsVariationName":
                echo json_encode($db->getSystemsNamesForLevelVariation());
                break;
            case "occurenceVariation":
                echo json_encode($db->getOccurenceLevelVariation($system));
                break;
        }
    }
    
    getData($_POST["type"], $_POST["system"], $_POST["name"]);