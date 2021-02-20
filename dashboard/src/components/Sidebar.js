import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({saveSelectCategories}) => {
    return ( 
        <div id="sidebar" className="col l2 hide-on-med-and-down">
            <div className="row">
                <div className="col s6 mt20">
                    <img className="responsive-img circle" src="assets/img/Koala.jpg" alt="profile_picture"/>
                </div>
                <div className="col s6">
                    <p>Welcome, Martin</p>
                    <i className="material-icons cursor">mail</i>
                    <i className="material-icons cursor">person</i>
                    <i className="material-icons cursor">settings</i>
                </div>
            </div>
            <div id="links">
                <Link to={'/'}><h5 className="fw-600 clr-black">Dashboard</h5></Link>
                <ul className="sidebar-left">
                    <Link 
                        to={'/categories'}
                        onClick={ () => saveSelectCategories(true) }
                    >
                        <li className="waves-effect">
                            <i className="material-icons">view_module</i>  Categories
                        </li>
                    </Link>
                    <Link to={'/'}>
                        <li className="waves-effect">
                            <i className="material-icons">web</i>  Menu
                        </li>
                    </Link>
                    <Link to={'/'}>
                        <li className="waves-effect">
                            <i className="material-icons">storage</i>  Stocks
                        </li>
                    </Link>
                    <Link to={'/'}>
                        <li className="waves-effect">
                            <i className="material-icons">insert_chart</i>  Reports
                        </li>
                    </Link>                    
                    <Link to={'/'}>
                        <li className="waves-effect">
                            <i className="material-icons">people</i>  Users
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}
 
export default Sidebar;