import React, { useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net';

import MenuModal from './MenuModal';


const MenuTable = ({menu, saveMenu, categories}) => {

    const [ isOpen, setIsOpen ] = useState(false);
    const [ plateToEdit, savePlateToEdit ] = useState({
        name: '',
        cost: '',
        description: '',
        special: 0,
        category: '',
        picture: ''
    });

    const data = [];
    let count = 1;

    const abrirModal = plate => {
        savePlateToEdit({...plate});
        setIsOpen(true);
    }

    menu.forEach(plate => {
        data.push(
            <tr
                key={plate.id}
            >
                <td>{count}</td>
                <td>{plate.name}</td>
                <td>{plate.cost}</td>
                <td>{plate.category}</td>
                <td>{plate.description}</td>
                <td>{plate.special === 1 ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>}</td>
                <td><img className="responsive-img table-img" src={plate.picture} alt={plate.name}/></td>
                <td>
                    <button onClick={ () => {abrirModal(plate)} } className="btn yellow darken-1 mr5 mt5" ><i className="fas fa-edit"></i> Edit</button>
                    <button 
                        key={plate.id}
                        className="btn red darken-1 mt5"
                        onClick={() => deleteMenu(plate)}
                    >
                        <i className="fas fa-times"></i> Delete
                    </button>
                </td>
            </tr>
        );
        count++;
    });


    const deleteMenu = async(plate) => {
        const { id, name } = plate;

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this plate!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

                const url = 'http://localhost/menu_dashboard/API/API.php?function=delete_menu';
                axios.post(url, {
                    id
                })
                .then(response => {
                    let result = response.data;
                    if(result.ok) {
                        swal(`${name} has been deleted`, {
                            icon: "success",
                        });
                        saveMenu([...menu.filter(plate => plate.id !== id)]);
                    }
                    else {
                        swal('Error!',`${result.message}`, 'error');
                    }
                });  
            }
          });
    }
         
    return ( 
        <div className="col s12 l8">
            <div className="card">
                <div className="card-content">
                    <span className="card-title">Plates</span>
                    <table id="table" className="highlight centered " ref={elem=>$(elem).DataTable()}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Cost</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>In special</th>
                                <th>Picture</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                item
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <MenuModal 
                plate={plateToEdit}
                categories={categories}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                saveMenu={saveMenu}
                menu={menu}
            />
        </div>
    );
}
 
export default MenuTable;