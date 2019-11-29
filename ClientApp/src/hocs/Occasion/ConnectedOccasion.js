import { connect } from 'react-redux'
import OccassionList from '../../components/Occasions/Occasion'
import { createOccasion, setOccasion, editOccasion, deleteOccasion } from '../../creators/occasionCreator'
import { isBusy } from '../../creators/loaderCreator';

const mapStateToProps = ({ occasions}) => {
    return {
        occasions
    }
}


const ConnectedOccasionList = connect(mapStateToProps, {
    createOccasion, setOccasion, editOccasion, deleteOccasion, isBusy
})(OccassionList)

export default ConnectedOccasionList