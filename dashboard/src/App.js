import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';


import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

import CategoriesForm from './components/Categories/CategoriesForm';
import CategoriesTable from './components/Categories/CategoriesTable';

import MenuForm from './components/Menu/MenuForm';
import MenuTable from './components/Menu/MenuTable';

function App() {
    // State for categories
    const [ categories, saveCategories ] = useState([]);
    const [ selectCategories, saveSelectCategories ] = useState(true);

    // State for menu
    const [ menu, saveMenu ] = useState([]);
    const [ selectMenu, saveSelectMenu ] = useState(true);


    useEffect(() => {
        const getCategories = async() => {
            const url = 'http://localhost/menu_dashboard/API/API.php?function=select_categories';
            const response = await axios.get(url)
            const result = response.data;
            if(result.ok){
                saveCategories(result.results);
            }
        }
        const getMenu = async() => {
            const url = 'http://localhost/menu_dashboard/API/API.php?function=select_menu';
            const response = await axios.get(url)
            const result = response.data;
            if(result.ok){
                saveMenu(result.results);
            }
        }

        if(selectCategories) {
            getCategories();
            saveSelectCategories(false);
        }

        if(selectMenu) {
            getMenu();
            saveSelectMenu(false);
        }

    }, [selectCategories, selectMenu])

    return (
        <Router>
            <Switch>
                <Route 
                    exact path="/"
                    component={() => (
                        <div>
                            <Navbar
                                saveSelectCategories={saveSelectCategories}
                                saveSelectMenu={saveSelectMenu}
                            />
                            <div className="row">
                                <Sidebar
                                    saveSelectCategories={saveSelectCategories}
                                    saveSelectMenu={saveSelectMenu}
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
                                saveSelectMenu={saveSelectMenu}
                            />
                            <div className="row">
                                <Sidebar
                                    saveSelectCategories={saveSelectCategories}
                                    saveSelectMenu={saveSelectMenu}
                                />

                                <div className="col s12 l10">
                                    <h3>Categories</h3>
                                    <div className="row">
                                        <CategoriesForm
                                            categories={categories}
                                            saveCategories={saveCategories}
                                        />
                                        <CategoriesTable
                                            categories={categories}
                                            saveCategories={saveCategories}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}}
                />
                <Route 
                    exact path="/menu"
                    component={() => {

                    return(
                        <div>
                            <Navbar
                                saveSelectCategories={saveSelectCategories}
                                saveSelectMenu={saveSelectMenu}
                            />
                            <div className="row">
                                <Sidebar
                                    saveSelectCategories={saveSelectCategories}
                                    saveSelectMenu={saveSelectMenu}
                                />

                                <div className="col s12 l10">
                                    <h3>Categories</h3>
                                    <div className="row">
                                        <MenuForm
                                            categories={categories}
                                            menu={menu}
                                            saveMenu={saveMenu}
                                        />
                                        <MenuTable
                                            categories={categories}
                                            menu={menu}
                                            saveMenu={saveMenu}
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
