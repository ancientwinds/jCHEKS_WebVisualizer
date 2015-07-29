<?php
    include("db/db.php"); 

    function getTest($type, $system) {
        $db = new DatabaseManager();
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
            case "occurenceLevel":
                echo json_encode($db->getOccurenceLevel($system));
                break;
            case "levelsName":
                echo json_encode($db->getSystemsNamesForLevel());
                break;
            case "levelsVariationName":
                echo json_encode($db->getSystemsNamesForLevelVariation());
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
            case "occurenceVariation":
                echo json_encode($db->getOccurenceLevelVariation($system));
                break;

        }
                
    }
    getTest($_POST["type"], $_POST["system"]);

