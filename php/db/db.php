<?php
class DatabaseManager {
    var $db = null;

    function __construct($name, $limitedRow = null, $xLimit = null, $yLimit = null, $limitedColumn = null) {
        $this->xLimit = $xLimit;
        $this->yLimit = $yLimit;
        $this->limitedColumn = $limitedColumn;

        $this->db = new PDO("sqlite:databases/" . $name);
        $this->db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
        ini_set('memory_limit', '256M');
        set_time_limit(300);
    }

    function secureAlpha($tableName){
        return (preg_match("/^[A-Za-z0-9_-]+$/",trim($tableName)))? trim($tableName) : null;
    }

    function secureNumeric($limit){
        return (ctype_digit(trim($limit)))? trim($limit) : 0;
    }

    function getDataForASystemFromTableInDatabase($table, $systemId){
        $statement = $this->db->prepare("SELECT * FROM ".$table." WHERE chaotic_system_id='".$this->secureAlpha($systemId)."' ".$this->secureNumeric($this->xlimit));
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        if(!$statement->execute())return null;
        return $statement->fetchAll();
    }
    
    function getDataOfAllSystemsFromTableInDatabase($table){
        if(!$this->secureNumeric($this->baselimit)){echo "Invalid limit.";}
        $statement = $this->db->prepare("SELECT * FROM ".$this->secureAlpha($table)." ".$this->secureNumeric($this->xlimit));
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        if(!$statement->execute()) return null;
        return $statement->fetchAll();
    }
    
    function getOverallOccurenceData($table){
        if(!$this->secureNumeric($this->baselimit)){echo "Invalid limit.";}
        $this->xLimit = str_replace("LIMIT","",$this->xLimit);
        $statement = $this->db->prepare("SELECT * FROM '".$this->secureAlpha($table)."' GROUP BY chaotic_system_id, groupIndex");
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        if(!$statement->execute()) return null;
        return $statement->fetchAll();
    }
    
    function getSystemsNamesInTable($table){
        if(!$this->secureNumeric($this->baselimit)){echo "Invalid limit.";}
        $statement = $this->db->prepare("SELECT DISTINCT chaotic_system_id FROM ".$this->secureAlpha($table)." ".$this->secureNumeric($this->xlimit));
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        if(!$statement->execute()) return null;
        return $statement->fetchAll();
    }


}
