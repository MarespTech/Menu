import React, { useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';

const CategoriesForm = ({categories, saveCategories}) => {

    const [ category, saveCategory ] = useState('');

    const addCategory = async (e) => {
        e.preventDefault();

        if(category.trim() === '') {
            swal(`You have to write a name for the category`, {
                icon: "error",
              });
            return;
        }

        const url = 'http://localhost/menu_dashboard/API/API.php?function=add_category';
        axios.post(url, {
            name: category
        })
            .then(response => {
                let result = response.data;
                if(result.ok) {
                    swal('Success!',`${result.message}`, 'success');
                    saveCategories([...categories, {id: result.id, name: category}]);
                    saveCategory('');
                }
                else {
                    swal('Error!',`${result.message}`, 'error');
                }
            });

        
    }

    return ( 
        <div className="col s12 l4">
            
            <div className="card">
                <div className="card-content">
                    <span className="card-title">Add category</span>
                    <form
                        onSubmit={addCategory}
                    >
                        <div className="row">
                            <div className="input-field col s12">
                                <input 
                                    id="name" 
                                    type="text" 
                                    className="validate"
                                    value={category}  
                                    onChange={e => saveCategory(e.target.value)}  
                                />
                                <label htmlFor="name">Category name <small className="required">* required</small></label>
                            </div>

                            <button 
                                type="submit"
                                className="waves-effect btn btn-large btn-block light-blue accent-2"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    );
}
 
export default CategoriesForm;