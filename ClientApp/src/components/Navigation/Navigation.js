import React from 'react';
import { Link } from 'react-router-dom';
import { Logout } from '../Authentication/Authentication';
import './Navigation.css';

const Navigation = ({ user, logout, url, known, permitted, children }) => {
    return permitted
        ? (
            <div id="wrapper">

                <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                    <li className="nav-item active">
                        <Link to='/' className="nav-link">
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    <hr className="sidebar-divider" />

                    <div className="sidebar-heading">
                        Actions
                  </div>

                    <li className="nav-item">
                        <Link to='/news' className="nav-link">
                            <i className="fas fa-fw fa-table"></i>
                            <span>News</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to='/quotes' className="nav-link">
                            <i className="fas fa-fw fa-table"></i>
                            <span>Quotes</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to='/ecclesia' className="nav-link">
                            <i className="fas fa-fw fa-table"></i>
                            <span>Deaneries</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to='/donations' className="nav-link">
                            <i className="fas fa-fw fa-table"></i>
                            <span>Donations</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to='/events' className="nav-link">
                            <i className="fas fa-fw fa-table"></i>
                            <span>Events</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to='/reflections' className="nav-link">
                            <i className="fas fa-fw fa-table"></i>
                            <span>Reflections</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to='/donors' className="nav-link">
                            <i className="fas fa-fw fa-table"></i>
                            <span>Donors</span>
                        </Link>
                    </li>



                </ul>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">
                        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                                <i className="fa fa-bars"></i>
                            </button>
                            <ul className="navbar-nav ml-auto">
                                <div className="topbar-divider d-none d-sm-block"></div>

                                <li className="nav-item dropdown no-arrow">
                                    <Logout logout={logout} />
                                </li>

                            </ul>
                        </nav>
                        <div className="row p-4">
                            {children}
                        </div>

                    </div>
                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright &copy; Catholic Archdioceses of Lagos {new Date().getFullYear()}</span>
                            </div>
                        </div>
                    </footer>
                </div>


            </div>
            
          )
        : (<div className='row justify-content-center m-0'>{children}</div>)
    //return (
    //    <nav className="menu p-t-30" tabIndex="0">
    //        {user && known
    //            ? <ul>
    //                <li tabIndex="0"><Link to="/">Home</Link> <br /></li>
    //                <li tabIndex="0"><Link to="/news">News</Link> <br /></li>
    //                <li tabIndex="0"><Link to="/quotes">Quotes</Link> <br /></li>
    //                <li tabIndex="0"><Link to="/ecclesia">Deaneries</Link> <br /></li>
    //                <li tabIndex="0"><Link to="/donations">Donations</Link> <br /></li>
    //                <li tabIndex="0"><Link to="/events">Events</Link> <br /></li>
    //                <li tabIndex="0"><Link to="/reflections">Reflections</Link> <br /></li>
    //                <li tabIndex="0"><Link to="/donors">Donors</Link> <br /></li>
    //                <li tabIndex="0"><Logout logout={logout} /></li>
    //            </ul>
    //            : <ul>
    //                <li tabIndex="0"><Link to={url ? `/register?redirectUrl=${url}` : '/register'}>Register</Link></li>
    //                <li tabIndex="0"><Link to={url ? `/login?redirectUrl=${url}` : '/login'}>login</Link></li>
    //            </ul>
    //        }

    //    </nav>
    //)
}

export default Navigation;