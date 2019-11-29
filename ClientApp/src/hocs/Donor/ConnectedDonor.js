import { connect } from 'react-redux'
import DonorList from '../../components/Donors/Donor'
import { setDonor, viewDonor, deleteDonor } from '../../creators/donorCreator'
import { isBusy } from '../../creators/loaderCreator';

const mapStateToProps = ({ donors }) => {
    return {
        donors
    }
}


const ConnectedDonorList = connect(mapStateToProps, {
    setDonor, viewDonor, deleteDonor, isBusy
})(DonorList)

export default ConnectedDonorList