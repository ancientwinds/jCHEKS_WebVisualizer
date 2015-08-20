<?php
class DatabaseManager {
    var $db = null;

    function __construct($name, $limit = "" , $limitedRow) {
        $this->limitedRow = $limitedRow;
        $this->baselimit = $limit;
        if($this->limitedRow != ""){
            $this->limit = "AND ".$this->limitedRow . " < ".$limit. " ";
        } else{
            $this->limit = "LIMIT ".$limit. " ";
        }
        $this->db = new PDO("sqlite:databases/" . $name);
        $this->db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
    }
    function secureAlpha($tableName){
        return (preg_match("/^[A-Za-z0-9_-]+$/",trim($tableName)))? trim($tableName) : null;
    }
    function secureNumeric($limit){
        return (ctype_digit(trim($limit)))? trim($limit) : null;
    }
    function getDataForASystemFromTableInDatabase($table, $systemId){
        if(!$this->secureNumeric($this->baselimit)){echo "Invalid limit.";}
        $statement = $this->db->prepare("SELECT * FROM ".$table." WHERE chaotic_system_id='".$this->secureAlpha($systemId)."' ".$this->limit);
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        if(!$statement->execute())return null;
        return $statement->fetchAll();
    }
    
    function getDataOfAllSystemsFromTableInDatabase($table){
        if(!$this->secureNumeric($this->baselimit)){echo "Invalid limit.";}
        $statement = $this->db->prepare("SELECT * FROM ".$this->secureAlpha($table)." ".$this->limit);
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        if(!$statement->execute()) return null;
        return $statement->fetchAll();
    }
    
    function getOverallOccurenceData($table){
        if(!$this->secureNumeric($this->baselimit)){echo "Invalid limit.";}
        $this->limit = str_replace("LIMIT","",$this->limit);
       $statement = $this->db->prepare("SELECT * FROM '".$this->secureAlpha($table)."' GROUP BY chaotic_system_id, groupIndex");
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        if(!$statement->execute()) return null;
        return $statement->fetchAll();
    }
    
    function getSystemsNamesInTable($table){
        if(!$this->secureNumeric($this->baselimit)){echo "Invalid limit.";}
        $statement = $this->db->prepare("SELECT DISTINCT chaotic_system_id FROM ".$this->secureAlpha($table)." ".$this->limit);
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        if(!$statement->execute()) return null;
        return $statement->fetchAll();
    }


}
