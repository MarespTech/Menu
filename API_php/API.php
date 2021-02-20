<?php
/*
    API Comenzada: 2/12/21 2:30pm - 2/12/21 4:40pm
                    Cambiar funciones de menu e ingredientes
                    
*/


    date_default_timezone_set("America/Tijuana");
    define("DB_HOST", "localhost");
    define("DB_NAME", "menu_dashboard");
    define("DB_USER", "root");
    define("DB_PASS", "");
    
    $connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($connection->connect_errno) 
    {
        echo "Error al conectar a Base de datos";
    }

    $function = isset($_GET['function']) ? $_GET['function'] : "";

    switch($function) {
        case "select_categories":
            $query_select  = "SELECT * FROM categories";
            $result_select = $connection->query($query_select);
            if($result_select) {
                if($result_select->num_rows == 0) {
                    echo '{
                        ok: false,
                        message: "No data found"
                    }';
                    break;
                }

                $result = "{ok: true, results: [";
                while($row_select = $result_select->fetch_assoc()) {
                    $result .= '{id:' . $row_select['id_category'] . ', name:"' . $row_select['name_category'] .'"},';
                }

                $result = substr($result, 0, -1) . "]}";
                echo $result;
            } else {
                echo '{
                    ok: false,
                    message: "'. $connection->error .'"
                }';
            }
            break;
        case "select_category":
            $id = $_POST['id'];

            if( $id == '') {
                echo '{
                    ok: false,
                    message: "The id is not specified"
                }';
                break;
            }

            $query_select  = "SELECT * FROM categories WHERE id_category = $id";
            $result_select = $connection->query($query_select);
            if($result_select) {
                if($result_select->num_rows == 0) {
                    echo '{
                        ok: false,
                        message: "No data found"
                    }';
                    break;
                }

                $result = "{ok: true, results: [";
                while($row_select = $result_select->fetch_assoc()) {
                    $result .= '{id:' . $row_select['id_category'] . ', name:"' . $row_select['name_category'] .'"},';
                }

                $result = substr($result, 0, -1) . "]}";
                echo $result;
            } else {
                echo '{
                    ok: false,
                    message: "'. $connection->error .'"
                }';
            }
            break;
        case "add_category":
            $name = isset($_POST['name']) ? $connection->real_escape_string(strip_tags($_POST['name'], ENT_QUOTES)) : '';

            if(trim($name) == '') {
                echo '{
                    ok: false,
                    message: "The name is not specified"
                }';
                break;
            }

            $query_insert  = $connection->prepare("INSERT INTO categories(name_category) VALUES(?)");
            $query_insert->bind_param("s", $name);
            $result_insert = $query_insert->execute();
            if($result_insert) {
                echo '{
                    ok: true,
                    message: "The category has added succesfully."
                }';
            } else {
                echo '{
                    ok: false,
                    message: "'. $connection->error .'"
                }';
            }

            break;
        case "edit_category":
            $name = isset($_POST['name']) ? $connection->real_escape_string(strip_tags($_POST['name'], ENT_QUOTES)) : '';
            $id = $_POST['id'];

            if(trim($name) == '') {
                echo '{
                    ok: false,
                    message: "The name is not specified"
                }';
                break;
            } else if( $id == '') {
                echo '{
                    ok: false,
                    message: "The id is not specified"
                }';
                break;
            }

            $query_edit  = $connection->prepare("UPDATE categories SET name_category = ? WHERE id_category = ?");
            $query_edit->bind_param("si", $name, $id);
            $result_edit = $query_edit->execute();
            if($result_edit) {
                echo '{
                    ok: true,
                    message: "The category has edited succesfully."
                }';
            } else {
                echo '{
                    ok: false,
                    message: "'. $connection->error .'"
                }';
            }

            break;
        case "delete_category":
        case "select_menu":
            $query_select  = "SELECT * FROM menu";
            $result_select = $connection->query($query_select);
            if($result_select) {
                if($result_select->num_rows == 0) {
                    echo '{
                        ok: false,
                        message: "No data found"
                    }';
                    break;
                }

                $result = "{ok: true, results: [";
                while($row_select = $result_select->fetch_assoc()) {
                    $result .= '{id:' . $row_select['id_menu'] 
                             . ',name:"' . $row_select['name_menu'] .'",'
                             . ',cost:' . $row_select['cost_menu'] .','
                             . ',description:"' . $row_select['description_menu'] .'",'
                             . ',picture:"' . $row_select['picture_menu'] .'",'
                             . ',special:' . $row_select['special_menu'] . '},';
                             
                }

                $result = substr($result, 0, -1) . "]}";
                echo $result;
            } else {
                echo '{
                    ok: false,
                    message: "'. $connection->error .'"
                }';
            }
            break;
        case "select_one_menu":
            $id = $_POST['id'];

            if( $id == '') {
                echo '{
                    ok: false,
                    message: "The id is not specified"
                }';
                break;
            }

            $query_select  = "SELECT * FROM menu WHERE id_menu = $id";
            $result_select = $connection->query($query_select);
            if($result_select) {
                if($result_select->num_rows == 0) {
                    echo '{
                        ok: false,
                        message: "No data found"
                    }';
                    break;
                }

                $result = "{ok: true, results: [";
                    while($row_select = $result_select->fetch_assoc()) {
                        $result .= '{id:' . $row_select['id_menu'] 
                                 . ',name:"' . $row_select['name_menu'] .'",'
                                 . ',cost:' . $row_select['cost_menu'] .','
                                 . ',description:"' . $row_select['description_menu'] .'",'
                                 . ',picture:"' . $row_select['picture_menu'] .'",'
                                 . ',special:' . $row_select['special_menu'] . '},';
                                 
                    }

                $result = substr($result, 0, -1) . "]}";
                echo $result;
            } else {
                echo '{
                    ok: false,
                    message: "'. $connection->error .'"
                }';
            }
            break;
        case "add_category":
            $name = isset($_POST['name']) ? $connection->real_escape_string(strip_tags($_POST['name'], ENT_QUOTES)) : '';

            if(trim($name) == '') {
                echo '{
                    ok: false,
                    message: "The name is not specified"
                }';
                break;
            }

            $query_insert  = $connection->prepare("INSERT INTO categories(name_category) VALUES(?)");
            $query_insert->bind_param("s", $name);
            $result_insert = $query_insert->execute();
            if($result_insert) {
                echo '{
                    ok: true,
                    message: "The category has added succesfully."
                }';
            } else {
                echo '{
                    ok: false,
                    message: "'. $connection->error .'"
                }';
            }

            break;
        case "edit_category":
            $name = isset($_POST['name']) ? $connection->real_escape_string(strip_tags($_POST['name'], ENT_QUOTES)) : '';
            $id = $_POST['id'];

            if(trim($name) == '') {
                echo '{
                    ok: false,
                    message: "The name is not specified"
                }';
                break;
            } else if( $id == '') {
                echo '{
                    ok: false,
                    message: "The id is not specified"
                }';
                break;
            }

            $query_edit  = $connection->prepare("UPDATE categories SET name_category = ? WHERE id_category = ?");
            $query_edit->bind_param("si", $name, $id);
            $result_edit = $query_edit->execute();
            if($result_edit) {
                echo '{
                    ok: true,
                    message: "The category has edited succesfully."
                }';
            } else {
                echo '{
                    ok: false,
                    message: "'. $connection->error .'"
                }';
            }

            break;
        case "delete_category":
        case "select_categories":
            $query_select  = "SELECT * FROM categories";
            $result_select = $connection->query($query_select);
            if($result_select) {
                if($result_select->num_rows == 0) {
                    echo '{
                        ok: false,
                        message: "No data found"
                    }';
                    break;
                }

                $result = "{ok: true, results: [";
                while($row_select = $result_select->fetch_assoc()) {
                    $result .= '{id:' . $row_select['id_category'] . ', name:"' . $row_select['name_category'] .'"},';
                }

                $result = substr($result, 0, -1) . "]}";
                echo $result;
            } else {
                echo '{
                    ok: false,
                    message: "'. $connection->error .'"
                }';
            }
            break;
        case "select_category":
            $id = $_POST['id'];

            if( $id == '') {
                echo '{
                    ok: false,
                    message: "The id is not specified"
                }';
                break;
            }

            $query_select  = "SELECT * FROM categories WHERE id_category = $id";
            $result_select = $connection->query($query_select);
            if($result_select) {
                if($result_select->num_rows == 0) {
                    echo '{
                        ok: false,
                        message: "No data found"
                    }';
                    break;
                }

                $result = "{ok: true, results: [";
                while($row_select = $result_select->fetch_assoc()) {
                    $result .= '{id:' . $row_select['id_category'] . ', name:"' . $row_select['name_category'] .'"},';
                }

                $result = substr($result, 0, -1) . "]}";
                echo $result;
            } else {
                echo '{
                    ok: false,
                    message: "'. $connection->error .'"
                }';
            }
            break;
        case "add_category":
            $name = isset($_POST['name']) ? $connection->real_escape_string(strip_tags($_POST['name'], ENT_QUOTES)) : '';

            if(trim($name) == '') {
                echo '{
                    ok: false,
                    message: "The name is not specified"
                }';
                break;
            }

            $query_insert  = $connection->prepare("INSERT INTO categories(name_category) VALUES(?)");
            $query_insert->bind_param("s", $name);
            $result_insert = $query_insert->execute();
            if($result_insert) {
                echo '{
                    ok: true,
                    message: "The category has added succesfully."
                }';
            } else {
                echo '{
                    ok: false,
                    message: "'. $connection->error .'"
                }';
            }

            break;
        case "edit_category":
            $name = isset($_POST['name']) ? $connection->real_escape_string(strip_tags($_POST['name'], ENT_QUOTES)) : '';
            $id = $_POST['id'];

            if(trim($name) == '') {
                echo '{
                    ok: false,
                    message: "The name is not specified"
                }';
                break;
            } else if( $id == '') {
                echo '{
                    ok: false,
                    message: "The id is not specified"
                }';
                break;
            }

            $query_edit  = $connection->prepare("UPDATE categories SET name_category = ? WHERE id_category = ?");
            $query_edit->bind_param("si", $name, $id);
            $result_edit = $query_edit->execute();
            if($result_edit) {
                echo '{
                    ok: true,
                    message: "The category has edited succesfully."
                }';
            } else {
                echo '{
                    ok: false,
                    message: "'. $connection->error .'"
                }';
            }

            break;
        case "delete_category":
            $id = $_POST['id'];
            if( $id == '') {
                echo '{
                    ok: false,
                    message: "The id is not specified"
                }';
                break;
            }

            $query_edit  = $connection->prepare("DELETE FROM categories WHERE id_category = ?");
            $query_edit->bind_param("i", $id);
            $result_edit = $query_edit->execute();
            if($result_edit) {
                echo '{
                    ok: true,
                    message: "The category has deleted succesfully."
                }';
            } else {
                echo '{
                    ok: false,
                    message: "'. $connection->error .'"
                }';
            }
            break;

        
        
            break;
        default:
            echo '{
                ok: false,
                message: "Invalid function"
            }';
            break;
    }