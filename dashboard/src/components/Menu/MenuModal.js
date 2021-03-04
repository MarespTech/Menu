import React, { useState } from 'react';
import { Modal, Button, Select, Checkbox } from 'react-materialize';

const MenuModal = ({plate, categories}) => {

    const [ plateEdit, savePlateEdit ] = useState({
        nameEdit: plate.name,
        costEdit: plate.cost,
        descriptionEdit: plate.description,
        categoryEdit: plate.category,
        specialEdit: plate.special,
        pictureEdit: plate.picture
    });
    const [ open, guardarOpen ] = useState(false);

    const { nameEdit, costEdit, descriptionEdit, categoryEdit, specialEdit, pictureEdit } = plateEdit;

    return ( 
        <Modal
            actions={[
                <Button flat modal="close" node="button" waves="light">Close</Button>,
                <Button flat onClick={() => console.log("Edit")} node="button" waves="light">Edit</Button>
            ]}
            bottomSheet={false}
            fixedFooter={false}
            header={plate.name}
            id="Modal-0"
            open={open}
            options={{
                dismissible: true,
                endingTop: '10%',
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                opacity: 0.5,
                outDuration: 250,
                preventScrolling: true,
                startingTop: '4%'
            }}
            trigger={<button className="btn yellow darken-1 mr5 mt5" ><i className="fas fa-edit"></i> Edit</button>}
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
                                // onChange={onChangeInputs}  
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
                                // onChange={onChangeInputs} 
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
                                // onChange={onChangeInputs}  
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
                                // onChange={onChangeInputs}
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
                                // onChange={onChangeCheck}
                                checked={specialEdit == 1 ? "checked" : null}
                            />
                        </div>

                        <div class="file-field input-field col s12">
                            <div class="btn light-blue darken-2">
                                <span>Picture</span>
                                <input 
                                    type="file" 
                                    // onChange={onChangeFile}    
                                />
                            </div>
                            <div class="file-path-wrapper">
                                <input name="pictureEdit" class="file-path validate" type="text" value={pictureEdit}/>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        </Modal>
     );
}
 
export default MenuModal;