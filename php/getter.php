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
            case "distanceEvolution":
                echo json_encode($db->getDistanceEvolution($system));
                break;
            case "namesForDistanceEvolution":
                echo json_encode($db->getSystemNamesForDistanceEvolution());
                break;
        }
    }
    $type = "";
    $system = "";
    $name = "";
    if(isset($_POST["type"])) $type = $_POST["type"];
    if(isset($_POST["system"])) $system = $_POST["system"];
    if(isset($_POST["name"])) $name = $_POST["name"];

    getData($type, $system, $name);
