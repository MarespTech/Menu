import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';


import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

import CategoriesForm from './components/Categories/CategoriesForm';
import CategoriesTable from './components/Categories/CategoriesTable';

function App() {

    const [ categories, saveCategories ] = useState([]);
    const [ selectCategories, saveSelectCategories ] = useState(true);


    useEffect(() => {
        const getCategories = async() => {
            const url = 'http://localhost/dashboard/API.php?function=select_categories';
            const response = await axios.get(url)
            const result = response.data;
            if(result.ok){
                saveCategories(result.results);
            }
        }

        if(selectCategories) {
            getCategories();
            console.log(categories);
            saveSelectCategories(false);
        }
    }, [selectCategories])

    return (
        <Router>
            <Switch>
                <Route 
                    exact path="/"
                    component={() => (
                        <div>
                            <Navbar
                                saveSelectCategories={saveSelectCategories}
                            />
                            <div className="row">
                                <Sidebar
                                    saveSelectCategories={saveSelectCategories}
                                />
                                <Dashboard/>
                            </div>
                        </div>
                    )}
                />
                <Route 
                    exact path="/categories"
                    component={() => {

                    return(
                        <div>
                            <Navbar
                                saveSelectCategories={saveSelectCategories}
                            />
                            <div className="row">
                                <Sidebar
                                    saveSelectCategories={saveSelectCategories}
                                />

                                <div className="col s12 l10">
                                    <h3>Categories</h3>
                                    <div className="row">
                                        <CategoriesForm/>
                                        <CategoriesTable
                                            categories={categories}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}}
                />
            </Switch>
        </Router>
    );
}

export default App;
