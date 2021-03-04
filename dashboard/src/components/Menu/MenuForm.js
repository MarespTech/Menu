import React, { useState } from 'react';
import swal from 'sweetalert';
import 'materialize-css';
import { Select, Checkbox } from 'react-materialize';
import axios from 'axios';


const MenuForm = ({categories, menu, saveMenu}) => {

    const [ plate, savePlate ] = useState({
        name: '',
        cost: '',
        description: '',
        special: 0,
        category: '',
        picture: ''
    });

    const { name, cost, description, category } = plate;

    const onChangeInputs = e => {
        savePlate({
            ...plate,
            [e.target.name]: e.target.value
        });
    }

    const onChangeCheck = e => {
        savePlate({
            ...plate,
            ["special"]: e.target.checked ? 1 : 0
        });
    }

    const onChangeFile = e => {
        savePlate({
            ...plate,
            ["picture"]: e.target.files[0]
        });
    }

    const onSubmit = e => {
        e.preventDefault();

        // Validar
        if(name.trim() === '') {
            return swal('Error!', 'The name is required', 'error');
        }
        if(cost.trim() === '') {
            return swal('Error!', 'The cost is required', 'error');
        }
        if(isNaN(Number(cost))) {
            return swal('Error!', 'The cost have to be a number', 'error');
        }
        if(plate.category === '') {
            return swal('Error!', 'The category is required', 'error');
        }
        
        if(plate.picture === '') {
            swal({
                title: "You didn't put a picture",
                text: "Do you want to submit it without picture?",
                icon: "warning",
                buttons: true,
                
              })
              .then((willDelete) => {
                if (!willDelete) {
                    return null   
                }
              });
        }

        const url = 'http://localhost/menu_dashboard/API/API.php?function=add_menu';
        const formData = new FormData();
        
        formData.append("name", name);
        formData.append("cost", cost);
        formData.append("description", description);
        formData.append("special", plate.special);
        formData.append("category", plate.category);
        formData.append("picture", plate.picture);

        axios.post(url, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(response => {
                let result = response.data;
                let cate = [...categories.filter(cat => cat.id == category)][0];
                console.log(result)
                if(result.ok) {
                    swal('Success!',`${result.message}`, 'success');
                    saveMenu([...menu, {
                        id: result.id,
                        name,
                        cost,
                        description,
                        id_category: category,
                        category: cate.name,
                        special: plate.special,
                        picture: result.picture_url

                    } ]);
                    savePlate({
                        name: '',
                        cost: '',
                        description: '',
                        special: 0,
                        category: '',
                        picture: ''
                    });
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
                    <span className="card-title">Add Plate</span>
                    <form
                        onSubmit={onSubmit}
                    >
                        <div className="row">
                            <div className="input-field col s12 m8">
                                <input 
                                    id="name" 
                                    name="name" 
                                    type="text" 
                                    className="validate"
                                    onChange={onChangeInputs}  
                                    value={name}
                                    required
                                />
                                <label htmlFor="name">Name <small className="required">* required</small></label>
                            </div>          
                            <div className="input-field col s12 m4">
                                <input 
                                    id="cost" 
                                    name="cost" 
                                    type="text" 
                                    className="validate"
                                    onChange={onChangeInputs} 
                                    value={cost}
                                    required
                                />
                                <label htmlFor="cost">Cost <small className="required">* required</small></label>
                            </div>
                            <div className="input-field col s12">
                                <textarea 
                                    id="description" 
                                    name="description" 
                                    className="validate materialize-textarea"
                                    onChange={onChangeInputs}  
                                    value={description}
                                    required
                                ></textarea>
                                <label htmlFor="description">Description <small className="required">* required</small></label>
                            </div>
                            <div className="input-field col s12 m7">
                                <Select
                                    id="category"
                                    name="category"
                                    label="Category"
                                    multiple={false}
                                    onChange={onChangeInputs}
                                    options={{
                                        classes: '',
                                        dropdownOptions: {
                                        alignment: 'left',
                                        autoTrigger: true,
                                        closeOnClick: true,
                                        constrainWidth: true,
                                        coverTrigger: true,
                                        hover: false,
                                        inDuration: 150,
                                        onCloseEnd: null,
                                        onCloseStart: null,
                                        onOpenEnd: null,
                                        onOpenStart: null,
                                        outDuration: 250
                                        }
                                    }}
                                    value={category}
                                >
                                        <option disabled value=""> Select a category</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                </Select>                                
                            </div>
                            <div className="input-field col s12 m5">
                                <Checkbox                                    
                                    filledIn
                                    id="In special"
                                    name="special"
                                    label="In special"
                                    value="1"
                                    onChange={onChangeCheck}
                                />
                            </div>

                            <div className="file-field input-field col s12">
                                <div className="btn light-blue darken-2">
                                    <span>Picture</span>
                                    <input type="file" onChange={onChangeFile}/>
                                </div>
                                <div className="file-path-wrapper">
                                    <input name="picture" className="file-path validate" type="text"/>
                                </div>
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
 
export default MenuForm;