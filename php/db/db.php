<?php class DatabaseManager {
    var $db = null;
    function __construct($name, $limit = "" , $limitedRow) {
        $this->limitedRow = $limitedRow;
        if($this->limitedRow != ""){
            $this->limit = "AND ".$this->limitedRow . " < ".$limit. " ";
        } else{
            $this->limit = "LIMIT ".$limit. " ";
        }
        $this->db = new PDO("sqlite:databases/" . $name);
        $this->db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
        ini_set('memory_limit', '256M');
        set_time_limit(300);
    }
    
    function getDataForASystemFromTableInDatabase($table, $systemId){
        $statement = $this->db->prepare("SELECT * FROM ".$table." WHERE chaotic_system_id='".$systemId."' ".$this->limit);
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        if(!$statement->execute())return null;
        return $statement->fetchAll();
    }
    
    function getDataOfAllSystemsFromTableInDatabase($table){
        $statement = $this->db->prepare("SELECT * FROM ".$table." ".$this->limit);
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        if(!$statement->execute()) return null;
        return $statement->fetchAll();
    }
    
    function getOverallOccurenceData($table, $overallColumn){
        $this->limit = str_replace("AND","WHERE",$this->limit);
       $statement = $this->db->prepare("SELECT *, sum(".$overallColumn.") AS system FROM '".$table."' ".$this->limit."GROUP BY chaotic_system_id, ".$this->limitedRow);
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        if(!$statement->execute()) return null;
        return $statement->fetchAll();
    }
    
    function getSystemsNamesInTable($table){
        $statement = $this->db->prepare("SELECT DISTINCT chaotic_system_id FROM ".$table." ".$this->limit);
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        if(!$statement->execute()) return null;
        return $statement->fetchAll();
    }
}
