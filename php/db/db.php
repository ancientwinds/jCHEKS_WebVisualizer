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

    function getDataForASystemFromTableInDatabase($table, $systemId){
        $systemIdClean = $this->escape($systemId);
        $tableClean = $this->escape($table);
        $xlimitClean = $this->escape($this->xLimit);
        $sql = "SELECT * FROM ". $tableClean ." WHERE chaotic_system_id='" . $systemIdClean . "'";
        if($xlimitClean){
            $sql = $sql . " LIMIT " . $xlimitClean;
        }
        $statement = $this->db->prepare($sql);
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        if(!$statement->execute())return null;
        return $statement->fetchAll();
    }
    
    function getDataOfAllSystemsFromTableInDatabase($table){
        $tableClean = $this->escape($table);
        $xlimitClean = $this->escape($this->xLimit);
        $sql = "SELECT * FROM '". $tableClean . "'";
        if($xlimitClean){
            $sql = $sql . " LIMIT " . $xlimitClean;
        }
        $statement = $this->db->prepare($sql);
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        if(!$statement->execute()) return null;
        return $statement->fetchAll();
    }
    
    function getOverallOccurenceData($table){
        $this->xLimit = str_replace("LIMIT","",$this->xLimit);
        $xlimitClean = $this->escape($this->xLimit);
        $tableClean = $this->escape($table);
        $limitedColumnClean = $this->esccape($this.limitedColumn);
        $sql = "SELECT * FROM '" . $tableClean . "'";
        if($xlimitClean &&  $limitedColumnClean){
            $sql = $sql . " WHERE " . $limitedColumnClean . " < " . $xlimitClean;
        }
        $sql = $sql . " GROUP BY chaotic_system_id, groupIndex";
        $statement = $this->db->prepare($sql);
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        if(!$statement->execute()) return null;
        return $statement->fetchAll();
    }
    
    function getSystemsNamesInTable($table){
        $tableClean = $this->escape($table);
        $xlimitClean = $this->escape($this->xLimit);
        $sql = "SELECT DISTINCT chaotic_system_id FROM " . $tableClean;
        if($xlimitClean){
            $sql = $sql . " LIMIT " . $xlimitClean;
        }
        $statement = $this->db->prepare($sql);

        $statement->setFetchMode(PDO::FETCH_ASSOC);
        if(!$statement->execute()) return null;
        return $statement->fetchAll();
    }
    function escape($value){
        $search = array("\\",  "\x00", "\n",  "\r",  "'",  '"', "\x1a");
        $replace = array("\\\\","\\0","\\n", "\\r", "\'", '\"', "\\Z");

        return str_replace($search, $replace, $value);
    }

}
