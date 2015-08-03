<?php

$names = [];

if ($handle = opendir('databases/')) {

    while (false !== ($entry = readdir($handle))) {
        if ($entry != "." && $entry != "..") {
            $names[] = $entry;
        }
    }

    closedir($handle);
}

echo json_encode($names);

