import App from '../../App'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { isBusy } from '../../creators/loaderCreator';


const mapStateToProps = ({ user, loading }) => {
    return { loading, user }
}


const ConnectedApp = withRouter(connect(mapStateToProps, { isBusy })(App))

export default ConnectedApp