<?php

class DatabaseManager {
    var $db = null;
    function __construct() {
        $this->db = new PDO("sqlite:keys_temp.db");
        
    }
    
    function getNist1ResultsForSystem($systemId = null) {
        if($systemId) {
            $statement = $this->db->prepare("SELECT * FROM FrequencyMonobit_NIST_1 WHERE chaotic_system_id = :id");
            $statement->bindParam(":id", $systemId, PDO::PARAM_STR);
        } else {
            $statement = $this->db->prepare("SELECT * FROM FrequencyMonobit_NIST_1");
        }       
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        $results = $statement->execute();
        
        if($results) {
            return $statement->fetchAll();
        }
        return null;
    }
    
    function getNist2ResultsForSystem($systemId = null) {
        if($systemId) {
            $statement = $this->db->prepare("SELECT * FROM FrequencyBlock_NIST_2 WHERE chaotic_system_id = :id");
            $statement->bindParam(":id", $systemId, PDO::PARAM_STR);
        } else {
            $statement = $this->db->prepare("SELECT * FROM FrequencyBlock_NIST_2");
        }       
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        $results = $statement->execute();
        
        if($results) {
            return $statement->fetchAll();
        }
        return null;
    }
    
    function getNist3ResultsForSystem($systemId = null) {        
        if($systemId) {
            $statement = $this->db->prepare("SELECT * FROM Runs_NIST_3 WHERE chaotic_system_id = :id");
            $statement->bindParam(":id", $systemId, PDO::PARAM_STR);
        } else {
            $statement = $this->db->prepare("SELECT * FROM Runs_NIST_3");
        }       
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        $results = $statement->execute();
        
        if($results) {
            return $statement->fetchAll();
        }
        return null;
    }
    
    function getNist4ResultsForSystem($systemId = null) {
        if($systemId) {
            $statement = $this->db->prepare("SELECT * FROM LongestRun_NIST_4 WHERE chaotic_system_id = :id");
            $statement->bindParam(":id", $systemId, PDO::PARAM_STR);
        } else {
            $statement = $this->db->prepare("SELECT * FROM LongestRun_NIST_4");
        }       
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        $results = $statement->execute();
        
        if($results) {
            return $statement->fetchAll();
        }
        return null;
    }
    
    function getEvolutionAgentLevelResults($systemId = null) {
        if($systemId) {
            $statement = $this->db->prepare("SELECT * FROM nbEvolutions_allAgentLevels WHERE chaotic_system_id = :id");
            $statement->bindParam(":id", $systemId, PDO::PARAM_STR);
        } else {
            $statement = $this->db->prepare("SELECT * FROM nbEvolutions_allAgentLevels");
        }       
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        $results = $statement->execute();
        
        if($results) {
            return $statement->fetchAll();
        }
        return null;
    }
    
    function getEvolutionKeyBitsResults($systemId = null) {        
        if($systemId) {
            $statement = $this->db->prepare("SELECT * FROM nbEvolutions_allKeyBits WHERE chaotic_system_id = :id");
            $statement->bindParam(":id", $systemId, PDO::PARAM_STR);
        } else {
            $statement = $this->db->prepare("SELECT * FROM nbEvolutions_allKeyBits");
        }   
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        $results = $statement->execute();
        
        if($results) {
            return $statement->fetchAll();
        }
        return null;
    }
    
    function getButterFlyResults($systemId = null) {
        if($systemId) {
            $statement = $this->db->prepare("SELECT * FROM butterfly_effect WHERE chaotic_system_id = :id");
            $statement->bindParam(":id", $systemId, PDO::PARAM_STR);
        } else {
            $statement = $this->db->prepare("SELECT * FROM butterfly_effect");
        }       
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        $results = $statement->execute();
        
        if($results) {
            return $statement->fetchAll();
        }
        return null;
    } 
    
    function getOccurenceLevel($systemId = null) {
        if($systemId) {
            $statement = $this->db->prepare("SELECT * FROM nbOccurrences_level WHERE chaotic_system_id = :id");
            $statement->bindParam(":id", $systemId, PDO::PARAM_STR);
        } else {
            $statement = $this->db->prepare("SELECT * FROM nbOccurrences_level");
        }
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        $results = $statement->execute();
        
        if($results) {
            return $statement->fetchAll();
        }
        return null;
    }
    
    function getOccurenceLevelVariation($systemId = null) {
        if($systemId) {
            $statement = $this->db->prepare("SELECT * FROM nbOccurences_levelVariation WHERE chaotic_system_id = :id");
            $statement->bindParam(":id", $systemId, PDO::PARAM_STR);
        } else {
            $statement = $this->db->prepare("SELECT * FROM nbOccurences_levelVariation");
        }
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        $results = $statement->execute();
        
        if($results) {
            return $statement->fetchAll();
        }
        return null;
    }
    
    function getSystemsNamesForLevel() {
        $statement = $this->db->prepare("SELECT DISTINCT chaotic_system_id FROM nbOccurrences_level  ORDER BY chaotic_system_id;");
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        $results = $statement->execute();
        
        if($results) {
            return $statement->fetchAll();
        }
        return null;
    }
    
    function getSystemsNamesForLevelVariation() {
        $statement = $this->db->prepare("SELECT DISTINCT chaotic_system_id FROM nbOccurences_levelVariation ORDER BY chaotic_system_id;");
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        $results = $statement->execute();
        
        if($results) {
            return $statement->fetchAll();
        }
        return null;
    }
    
    function getSystemNamesForButterfly() {
        $statement = $this->db->prepare("SELECT DISTINCT chaotic_system_id FROM butterfly_effect ORDER BY chaotic_system_id;");
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        $results = $statement->execute();
        
        if($results) {
            return $statement->fetchAll();
        }
        return null;
    }
}

