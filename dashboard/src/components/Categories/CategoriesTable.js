import React from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net';


const CategoriesTable = ({categories, saveCategories}) => {
    const data = [];
    let count = 1;

    categories.forEach(category => {
        data.push(
            <tr>
                <td>{count}</td>
                <td>{category.name}</td>
                <td>
                    <button 
                        className="btn yellow darken-1 mr5"
                        onClick={() => editCategory(category)}
                    >
                        <i className="fas fa-edit"></i> Edit
                    </button>
                    <button 
                        className="btn red darken-1"
                        onClick={() => deleteCategory(category)}
                    >
                        <i className="fas fa-times"></i> Delete
                    </button>
                </td>
            </tr>
        );
        count++;
    });

    const deleteCategory = async(category) => {
        const { id, name } = category;

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this category!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

                const url = 'http://localhost/menu_dashboard/API/API.php?function=delete_category';
                axios.post(url, {
                    id
                })
                .then(response => {
                    let result = response.data;
                    if(result.ok) {
                        swal(`${name} has been deleted`, {
                            icon: "success",
                        });
                        saveCategories([...categories.filter(cat => cat.id !== id)]);
                    }
                    else {
                        swal('Error!',`${result.message}`, 'error');
                    }
                });  
            }
          });
    }

    const editCategory = async(category) => {
        const { id } = category;

        
        swal({
            text: `Write the new name for ${category.name}.`,
            content: "input",
            button: {
              text: "Change",
              closeModal: false,
            },
        })
          .then(name => {
            if (!name) {
                swal(`You have to write a new name.`, {
                    icon: "error",
                  });
                return;
            }
            const url = 'http://localhost/menu_dashboard/API/API.php?function=edit_category';
            axios.post(url, {
                name,
                id
            })
                .then(response => {
                    let result = response.data;
                    if(result.ok) {
                        swal(`${category.name} has been changed to ${name} !`, {
                            icon: "success",
                        });
                        changeCat(id, name);
                    }
                    else {
                        swal('Error!',`${result.message}`, 'error');
                    }
                });            
        });
    }

    const changeCat = (id, name) => {
        let new_categories = [...categories];
        for (var i in categories) {
            if (categories[i].id === id) {
               categories[i].name = name;
               break;
            }
        }
        saveCategories([...new_categories]);
    }
         
    return ( 
        <div className="col s12 l8">

            <div className="card">
                <div className="card-content">
                    <span className="card-title">Categories</span>
                    <table id="table" className="highlight centered " ref={elem=>$(elem).DataTable()}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
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
 
export default CategoriesTable;