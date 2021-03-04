import React, { useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net';

import MenuModal from './MenuModal';


const MenuTable = ({menu, saveMenu, categories}) => {
    const data = [];
    let count = 1;

    menu.forEach(plate => {
        data.push(
            <tr>
                <td>{count}</td>
                <td>{plate.name}</td>
                <td>{plate.cost}</td>
                <td>{plate.category}</td>
                <td>{plate.description}</td>
                <td>{plate.special === 1 ? <i class="fas fa-check"></i> : <i class="fas fa-times"></i>}</td>
                <td><img className="responsive-img table-img" src={plate.picture} alt={plate.name}/></td>
                <td>
                    <MenuModal 
                        key={plate.id}
                        plate={plate}
                        categories={categories}
                    />
                    <button 
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

    const editMenu = async(plate) => {
        console.log(plate);
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

        </div>
    );
}
 
export default MenuTable;