import React, { useState } from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { logout } from './sideEffects/apis/auth'
import Home from './components/Home/Home'
import Register, { Login } from './components/Authentication/Authentication'
import ConnectedNewsList from './hocs/News/ConnectedNewsList'
import ConnectedQuotesList from './hocs/Quote/ConnectedQuoteList'
import Ecclesia from './hocs/Ecclesia/Ecclesia'
import ConnectedDonationList from './hocs/Donation/ConnectedDonation';
import ConnectedOccasionList from './hocs/Occasion/ConnectedOccasion';
import ConnectedReflectionList from './hocs/Reflection/ConnectedReflection';
import ConnectedDonorList from './hocs/Donor/ConnectedDonor';
import Spinner from './components/Spinner/Spinner';
import Navigation from './components/Navigation/Navigation';

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

    const permitRoute = () => {
        const path = props.history.location.pathname.slice(1);
        return (path === 'login' || path === 'register')
    }

    const onLogout = () => {
        logout();
        props.history.push('/')
    }

    return (
        <>
            {props.loading && <Spinner />}
            <Navigation user={user} known={known} logout={onLogout} url={url} permitted={!permitRoute()}>
                <Switch>
                    <Route exact path="/" render={() => user ? <Home /> : <Redirect to='/login?redirectUrl=/' />} />
                    <Route path="/news" render={() => user ? <ConnectedNewsList /> : <Redirect to='/login?redirectUrl=/news' />} />
                    <Route path="/quotes" render={() => user ? <ConnectedQuotesList /> : <Redirect to='/login?redirectUrl=/quotes' />} />
                    <Route path="/ecclesia" render={() => user ? <Ecclesia /> : <Redirect to='/login?redirectUrl=/ecclesia' />} />
                    <Route path="/donations" render={() => user ? <ConnectedDonationList /> : <Redirect to='/login?redirectUrl=/donations' />} />
                    <Route path="/events" render={() => user ? <ConnectedOccasionList /> : <Redirect to='/login?redirectUrl=/events' />} />
                    <Route path="/reflections" render={() => user ? <ConnectedReflectionList /> : <Redirect to='/login?redirectUrl=/reflections' />} />
                    <Route path="/donors" render={() => user ? <ConnectedDonorList /> : <Redirect to='/login?redirectUrl=/donors' />} />
                    <Route path="/register" render={() => <Register {...props} url={url} user={user} />} />
                    <Route path="/login" render={() => <Login {...props} url={url} user={user} />} />
                    <Route render={() => <NotFound setKnown={(isKnown) => setKnown(isKnown)} />} />
                </Switch>
            </Navigation>
            
            
        </>
      )
}




const NotFound = ({ setKnown }) => {
    setKnown(false);
    return (<p>Page not found. Go to home <Link to='/'>Home</Link></p>)
}

export default App;