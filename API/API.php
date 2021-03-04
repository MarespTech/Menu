<?php

    $dominioPermitido = "http://localhost:3000";
    header("Access-Control-Allow-Origin: $dominioPermitido");
    header("Access-Control-Allow-Headers: content-type");
    header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");

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
                        "ok": false,
                        "message": "No data found"
                    }';
                    break;
                }

                $result = '{"ok": true, "results": [';
                while($row_select = $result_select->fetch_assoc()) {
                    $result .= '{"id":' . $row_select['id_category'] . ', "name":"' . $row_select['name_category'] .'"},';
                }

                $result = substr($result, 0, -1) . "]}";
                echo $result;
            } else {
                echo '{
                    "ok": false,
                    "message": "'. $connection->error .'"
                }';
            }
            break;
        case "select_category":
            $id = $_POST['id'];

            if( $id == '') {
                echo '{
                    "ok": false,
                    "message": "The id is not specified"
                }';
                break;
            }

            $query_select  = "SELECT * FROM categories WHERE id_category = $id";
            $result_select = $connection->query($query_select);
            if($result_select) {
                if($result_select->num_rows == 0) {
                    echo '{
                        "ok": false,
                        "message": "No data found"
                    }';
                    break;
                }

                $result = '{"ok": true, "results": [';
                while($row_select = $result_select->fetch_assoc()) {
                    $result .= '{"id":' . $row_select['id_category'] . ', "name":"' . $row_select['name_category'] .'"},';
                }

                $result = substr($result, 0, -1) . "]}";
                echo $result;
            } else {
                echo '{
                    "ok": false,
                    "message": "'. $connection->error .'"
                }';
            }
            break;
        case "add_category":
            
            $category = json_decode(file_get_contents("php://input"));       
            $name = $category->name;     

            if(trim($name) == '') {
                echo '{
                    "ok": false,
                    "message": "The name is not specified",
                    "name": "'. $name .'"
                }';
                break;
            }

            $query_insert  = $connection->prepare("INSERT INTO categories(name_category) VALUES(?)");
            $query_insert->bind_param("s", $name);
            $result_insert = $query_insert->execute();
            if($result_insert) {

                $id = $connection->insert_id;
                echo '{
                    "ok": true,
                    "message": "The category has added succesfully.",
                    "id": '. $id .'
                }';
            } else {
                echo '{
                    "ok": false,
                    "message": "'. $connection->error .'"
                }';
            }

            break;
        case "edit_category":
            $category = json_decode(file_get_contents("php://input"));
            $id   = $category->id;
            $name = $category->name;

            if(trim($name) == '') {
                echo '{
                    "ok": false,
                    "message": "The name is not specified"
                }';
                break;
            } else if( $id == '') {
                echo '{
                    "ok": false,
                    "message": "The id is not specified"
                }';
                break;
            }

            $query_edit  = $connection->prepare("UPDATE categories SET name_category = ? WHERE id_category = ?");
            $query_edit->bind_param("si", $name, $id);
            $result_edit = $query_edit->execute();
            if($result_edit) {
                echo '{
                    "ok": true,
                    "message": "The category has edited succesfully."
                }';
            } else {
                echo '{
                    "ok": false,
                    "message": "'. $connection->error .'"
                }';
            }

            break;
        case "delete_category":
            $category = json_decode(file_get_contents("php://input"));
            $id   = $category->id;

            if( $id == '') {
                echo '{
                    "ok": false,
                    "message": "The id is not specified"
                }';
                break;
            }

            $query_delete  = $connection->prepare("DELETE FROM categories WHERE id_category = ?");
            $query_delete->bind_param("i", $id);
            $result_delete = $query_delete->execute();
            if($result_delete) {
                echo '{
                    "ok": true,
                    "message": "The category has deleted succesfully."
                }';
            } else {
                echo '{
                    "ok": false,
                    "message": "'. $connection->error .'"
                }';
            }

            break;
        case "select_menu":
            $query_select  = "SELECT * FROM menu LEFT JOIN categories ON categories.id_category = menu.category_id WHERE menu.active = 1";
            $result_select = $connection->query($query_select);
            if($result_select) {
                if($result_select->num_rows == 0) {
                    echo '{
                        "ok": false,
                        "message": "No data found"
                    }';
                    break;
                }

                $result = "{\"ok\": true, \"results\": [";
                while($row_select = $result_select->fetch_assoc()) {
                    $result .= '{"id":' . $row_select['id_menu'] 
                             . ',"name":"' . $row_select['name_menu'] .'"'
                             . ',"cost":' . $row_select['cost_menu'] .''
                             . ',"description":"' . $row_select['description_menu'] .'"'
                             . ',"picture":"' . $row_select['picture_menu'] .'"'
                             . ',"id_category":"' . $row_select['id_category'] .'"'
                             . ',"category":"' . $row_select['name_category'] .'"'
                             . ',"special":' . $row_select['special_menu'] . '},';
                             
                }

                $result = substr($result, 0, -1) . "]}";
                echo $result;
            } else {
                echo '{
                    "ok": false,
                    "message": "'. $connection->error .'"
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
        case "add_menu":
            $name        = $_POST['name'];
            $cost        = $_POST['cost'];
            $description = $_POST['description'];
            $special     = $_POST['special'];
            $category    = $_POST['category'];
            $upload_name = "assets/img/no-image.png";


            $upload_dir = 'uploads/';

            if(isset($_FILES["picture"]))
            {
                $avatar_name = $_FILES["picture"]["name"];
                $avatar_tmp_name = $_FILES["picture"]["tmp_name"];
                $error = $_FILES["picture"]["error"];

                if($error > 0){
                    echo '{
                            "ok": false,
                            "message": "An error was ocurred while the file was uploading"
                        }';
                    break;
                }else 
                {
                    $random_name = rand(1000,1000000)."-".$avatar_name;
                    $upload_name = $upload_dir.strtolower($random_name);
                    $upload_name = preg_replace('/\s+/', '-', $upload_name);

                    if(move_uploaded_file($avatar_tmp_name , "../dashboard/public/".$upload_name)) {
                        $response = 1;
                    }else
                    {
                        echo '{
                            "ok": false,
                            "message": "An error was ocurred while the file was uploading"
                        }';
                        break;
                    }
                }    

            }

            if(trim($name) == '') {
                echo '{
                    ok: false,
                    message: "The name is not specified"
                }';
                break;
            }
            if(trim($description) == '') {
                echo '{
                    ok: false,
                    message: "The description is not specified"
                }';
                break;
            }
            if(trim($cost) == '') {
                echo '{
                    ok: false,
                    message: "The cost is not specified"
                }';
                break;
            }

            $query_insert  = $connection->prepare("INSERT INTO menu(`name_menu`, `cost_menu`, `description_menu`, `picture_menu`, `special_menu`, `category_id`) VALUES(?, ?, ?, ?, ?, ?)");
            $query_insert->bind_param("sdssii", $name, $cost, $description, $upload_name, $special, $category);
            $result_insert = $query_insert->execute();
            if($result_insert) {
                echo '{
                    "ok": true,
                    "message": "The plate has added succesfully.",
                    "id": "'. $connection->insert_id .'",
                    "picture_url": "'. $upload_name .'"
                }';
            } else {
                echo '{
                    "ok": false,
                    "message": "'. $connection->error .'"
                }';
            }

            break;
        case "edit_menu":
            $id          = $_POST['id'];
            $name        = $_POST['name'];
            $cost        = $_POST['cost'];
            $description = $_POST['description'];
            $special     = $_POST['special'];
            $category    = $_POST['category'];
            $upload_name = "assets/img/no-image.png";


            $upload_dir = 'uploads/';

            if(isset($_FILES["picture"]))
            {
                $avatar_name = $_FILES["picture"]["name"];
                $avatar_tmp_name = $_FILES["picture"]["tmp_name"];
                $error = $_FILES["picture"]["error"];

                if($error > 0){
                    echo '{
                            "ok": false,
                            "message": "An error was ocurred while the file was uploading"
                        }';
                    break;
                }else 
                {
                    $random_name = rand(1000,1000000)."-".$avatar_name;
                    $upload_name = $upload_dir.strtolower($random_name);
                    $upload_name = preg_replace('/\s+/', '-', $upload_name);

                    if(move_uploaded_file($avatar_tmp_name , "../dashboard/public/".$upload_name)) {
                        $response = 1;
                    }else
                    {
                        echo '{
                            "ok": false,
                            "message": "An error was ocurred while the file was uploading"
                        }';
                        break;
                    }
                }    

            }

            if(trim($name) == '') {
                echo '{
                    ok: false,
                    message: "The name is not specified"
                }';
                break;
            }
            if(trim($description) == '') {
                echo '{
                    ok: false,
                    message: "The description is not specified"
                }';
                break;
            }
            if(trim($cost) == '') {
                echo '{
                    ok: false,
                    message: "The cost is not specified"
                }';
                break;
            }

            $query_insert  = $connection->prepare("UPDATE menu SET `name_menu` = ?, `cost_menu` = ?, `description_menu` = ?, `picture_menu` = ?, `special_menu` = ?, `category_id` = ? WHERE id_menu = ?");
            $query_insert->bind_param("sdssiii", $name, $cost, $description, $upload_name, $special, $category, $id);
            $result_insert = $query_insert->execute();
            if($result_insert) {
                echo '{
                    "ok": true,
                    "message": "The plate has edited succesfully.",
                    "picture_url": "'. $upload_name .'"
                }';
            } else {
                echo '{
                    "ok": false,
                    "message": "'. $connection->error .'"
                }';
            }

            break;
        case "delete_menu": 
            $plate = json_decode(file_get_contents("php://input"));
            $id = $plate->id;

            $query_delete  = "DELETE FROM menu WHERE id_menu = $id";
            $result_delete = $connection->query($query_delete);
            if($result_delete) {
                echo '{
                    "ok": true,
                    "message": "The plate has deleted succesfully."
                }';
            } else {
                echo '{
                    "ok": false,
                    "message": "'. $connection->error .'"
                }';
            }
            break;
        default:
            echo '{
                ok: false,
                message: "Invalid function"
            }';
            break;
    }

    