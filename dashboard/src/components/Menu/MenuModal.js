import React, { useState, useEffect } from 'react';
import { Modal, Button, Select, Checkbox } from 'react-materialize';
import axios from 'axios';
import swal from 'sweetalert';

const MenuModal = ({plate, categories, isOpen, setIsOpen, saveMenu, menu}) => {

    const [ plateEdit, savePlateEdit ] = useState({
        nameEdit: plate.name,
        costEdit: plate.cost,
        descriptionEdit: plate.description,
        categoryEdit: plate.id_category,
        specialEdit: plate.special,
        pictureEdit: '',
        id: plate.id
    });

    useEffect(() => {
        savePlateEdit({
            nameEdit: plate.name,
            costEdit: plate.cost,
            descriptionEdit: plate.description,
            categoryEdit: plate.id_category,
            specialEdit: plate.special,
            pictureEdit: plate.picture
        })
    }, [plate]);


    const { id, nameEdit, costEdit, descriptionEdit, categoryEdit, specialEdit, pictureEdit } = plateEdit;

    const onChangeInputs = e => {
        savePlateEdit({
            ...plateEdit,
            [e.target.name]: e.target.value
        });
    }

    const onChangeCheck = e => {
        savePlateEdit({
            ...plateEdit,
            ["specialEdit"]: e.target.checked ? 1 : 0
        });
    }

    const onChangeFile = e => {
        savePlateEdit({
            ...plateEdit,
            ["pictureEdit"]: e.target.files[0]
        });
    }

    const onEdit = () => {

        if(nameEdit.trim() === '') {
            return swal('Error!', 'The name is required', 'error');
        }
        if(isNaN(Number(costEdit))) {
            return swal('Error!', 'The cost have to be a number', 'error');
        }
        if(categoryEdit === '') {
            return swal('Error!', 'The category is required', 'error');
        }
        
        if(pictureEdit === '') {
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

        const url = 'http://localhost/menu_dashboard/API/API.php?function=edit_menu';
        const formData = new FormData();
        
        formData.append("name", nameEdit);
        formData.append("cost", costEdit);
        formData.append("description", descriptionEdit);
        formData.append("special", specialEdit);
        formData.append("category", categoryEdit);
        formData.append("picture", pictureEdit);
        formData.append("id", id);

        axios.post(url, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(response => {
                let result = response.data;
                let cate = [...categories.filter(cat => cat.id == categoryEdit)][0];
                console.log(result)
                if(result.ok) {
                    swal('Success!',`${result.message}`, 'success');
                    saveMenu([...menu.filter((plat => plat.id !== id)), {
                        id,
                        name: nameEdit,
                        cost: costEdit,
                        description: descriptionEdit,
                        id_category: categoryEdit,
                        category: cate.name,
                        special: specialEdit,
                        picture: result.picture_url

                    } ]);
                }
                else {
                    swal('Error!',`${result.message}`, 'error');
                }
            });

        setIsOpen(false);
    }



    return ( 
        <Modal
            actions={[
                <Button flat onClick={() => {setIsOpen(false)}} node="button" waves="light">Close</Button>,
                <Button flat onClick={() => setTimeout(onEdit, 3000)} node="button" waves="light">Edit</Button>
            ]}
            bottomSheet={false}
            fixedFooter={false}
            header={plate.name}
            id="Modal-0"
            open={isOpen}
            options={{
                // dismissible: true,
                endingTop: '10%',
                inDuration: 250,
                opacity: 0.5,
                outDuration: 250,
                preventScrolling: true,
                startingTop: '4%',
                onCloseEnd: () => {setIsOpen(false)}
            }}
        >
           <div className="row">
                <div className="col s12 m6">
                    <img className="responsive-img" src={plate.picture} alt={plate.name}/>
                </div>
                <div className="col s12 m6">
                    <div className="row">
                        <div className="input-field col s12 m8">
                            <input 
                                id="nameEdit" 
                                name="nameEdit" 
                                type="text" 
                                className="validate"
                                onChange={onChangeInputs}  
                                value={nameEdit}
                                required
                            />
                            <label htmlFor="nameEdit" class="active">Name <small className="required">* required</small></label>
                        </div>          
                        <div className="input-field col s12 m4">
                            <input 
                                id="costEdit" 
                                name="costEdit" 
                                type="text" 
                                className="validate"
                                onChange={onChangeInputs} 
                                value={costEdit}
                                required
                            />
                            <label htmlFor="costEdit" class="active">Cost <small className="required">* required</small></label>
                        </div>
                        <div className="input-field col s12">
                            <textarea 
                                id="descriptionEdit" 
                                name="descriptionEdit" 
                                className="validate materialize-textarea"
                                onChange={onChangeInputs}  
                                value={descriptionEdit}
                                required
                            ></textarea>
                            <label htmlFor="descriptionEdit" class="active">Description <small className="required">* required</small></label>
                        </div>
                        <div className="input-field col s12 m7">
                            <Select
                                id="categoryEdit"
                                name="categoryEdit"
                                label="CategoryEdit"
                                multiple={false}
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
                                onChange={onChangeInputs}
                                value={categoryEdit}
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
                                id="In special edit"
                                name="specialEdit"
                                label="In special"
                                value="1"
                                onChange={onChangeCheck}
                                checked={specialEdit == 1 ? "checked" : null}
                            />
                        </div>

                        <div class="file-field input-field col s12">
                            <div class="btn light-blue darken-2">
                                <span>Picture</span>
                                <input 
                                    type="file" 
                                    onChange={onChangeFile}    
                                />
                            </div>
                            <div class="file-path-wrapper">
                                <input name="pictureEdit" class="file-path validate" type="text" value={plate.picture}/>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        </Modal>
     );
}
 
export default MenuModal;