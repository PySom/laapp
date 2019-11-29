import React, { useState } from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { logout } from './sideEffects/apis/auth'
import Home from './components/Home/Home'
import Register, { Login, Logout } from './components/Authentication/Authentication'
import ConnectedNewsList from './hocs/News/ConnectedNewsList'
import ConnectedQuotesList from './hocs/Quote/ConnectedQuoteList'
import Ecclesia from './hocs/Ecclesia/Ecclesia'
import ConnectedDonationList from './hocs/Donation/ConnectedDonation';
import ConnectedOccasionList from './hocs/Occasion/ConnectedOccasion';
import ConnectedReflectionList from './hocs/Reflection/ConnectedReflection';
import ConnectedDonorList from './hocs/Donor/ConnectedDonor';

const getUserFromStorage = () => {
    if (localStorage) {
        return JSON.parse(localStorage.getItem('user'))
    }
    return null;
}

const App = (props) => {
    const search = props.history.location.search
    const url = search ? search.substring(search.indexOf('=') + 1) : ''
    const user = props.user || getUserFromStorage();
    const [known, setKnown] = useState(true);

    const onLogout = () => {
        logout();
        props.history.push('/')
    }

    return (
        <div className='container-fluid row'>
            {props.loading && <Spinner />}
            {(user && known) ?
                <div className='col-md-2 p-3'>
                    <Link to="/">Home</Link> <br />
                    <Link to="/news">News</Link> <br />
                    <Link to="/quotes">Quotes</Link> <br />
                    <Link to="/ecclesia">Deaneries</Link> <br />
                    <Link to="/donations">Donations</Link> <br />
                    <Link to="/events">Events</Link> <br />
                    <Link to="/reflections">Reflections</Link> <br />
                    <Link to="/donors">Donors</Link> <br />
                    {user && <Logout logout={onLogout} />}
                </div>
                :
                <div className='col-md-2 p-3'>
                    {user === null && <><Link to={url ? `/register?redirectUrl=${url}` : '/register'}>Register</Link> <br /></>}
                    {user === null && <><Link to={url ? `/login?redirectUrl=${url}` : '/login'}>login</Link> <br /></>}
                    {user && <Logout logout={onLogout} />}
                </div>
            }
            
            <div className='col-md-8 p-3'>
                <Switch>
                    <Route exact path="/" render={() => user ? <Home /> : <Redirect to='/login?redirectUrl=/'/>} />
                    <Route path="/news" render={() => user ? <ConnectedNewsList /> : <Redirect to='/login?redirectUrl=/news' />} />
                    <Route path="/quotes" render={() => user ? <ConnectedQuotesList /> : <Redirect to='/login?redirectUrl=/quotes' />}/>
                    <Route path="/ecclesia" render={() => user ? <Ecclesia /> : <Redirect to='/login?redirectUrl=/ecclesia' />}/>
                    <Route path="/donations" render={() => user ? <ConnectedDonationList /> : <Redirect to='/login?redirectUrl=/donations' />}/>
                    <Route path="/events" render={() => user ? <ConnectedOccasionList /> : <Redirect to='/login?redirectUrl=/events' />}/>
                    <Route path="/reflections" render={() => user ? <ConnectedReflectionList /> : <Redirect to='/login?redirectUrl=/reflections' />} />
                    <Route path="/donors" render={() => user ? <ConnectedDonorList /> : <Redirect to='/login?redirectUrl=/donors' />} />
                    <Route path="/register" render={() => <Register {...props} url={url} user={user} />} />
                    <Route path="/login" render={() => <Login {...props} url={url} user={user} />} />
                    <Route render={() => <NotFound setKnown={(isKnown) => setKnown(isKnown)}/>} />
                </Switch>
            </div>
        </div>
      )
}


const Spinner = () => {
    return <p>Loading...</p>
}

const NotFound = ({ setKnown }) => {
    setKnown(false);
    return (<p>Page not found. Go to home <Link to='/'>Home</Link></p>)
}

export default App;