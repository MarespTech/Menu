import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import 'materialize-css';
import { Navbar as Navb, Icon } from 'react-materialize';


const Navbar = ({saveSelectCategories, saveSelectMenu}) => {

    return ( 

        <Navb 
            className="light-blue darken-3"
            alignLinks="left"
            brand={<Link className="brand-logo right" to={'/'}>Logo</Link>}
            id="mobile-nav"
            menuIcon={<Icon>menu</Icon>}
            options={{
                draggable: true,
                edge: 'right',
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 200,
                preventScrolling: true
            }}
            sidenav={
                <Fragment>
                    <ul>
                        <div className="row mt20">
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
                        <a href="/"><h5 className="fw-600 clr-black center">Dashboard</h5></a>
                        <li>
                            <Link 
                                to={"/categories"}
                                onClick={ ()=> saveSelectCategories(true) }
                            >
                                <i className="material-icons">view_module</i>  Categories
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to={'/menu'}
                                onClick={ ()=> saveSelectMenu(true) }
                                
                            >
                                <i className="material-icons">web</i>  Menu
                            </Link>
                        </li>
                        <li><Link to={'/'}><i className="material-icons">storage</i>  Stocks</Link></li>
                        <li><Link to={'/'}><i className="material-icons">insert_chart</i>  Reports</Link></li>
                        <li><Link to={'/'}><i className="material-icons">people</i>  Users</Link></li>
                    </ul>
                </Fragment>
            }
        >
        </Navb>
    );
}
 
export default Navbar;