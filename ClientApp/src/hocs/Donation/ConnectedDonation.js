import { connect } from 'react-redux'
import DonationList from '../../components/Donations/Donation'
import { createDonation, setDonation, editDonation, deleteDonation } from '../../creators/donationCreator'
import { isBusy } from '../../creators/loaderCreator';

const mapStateToProps = (state) => {
    return {
        donations: state.donations
    }
}


const ConnectedDonationList = connect(mapStateToProps, {
                                    createDonation, setDonation, editDonation, deleteDonation, isBusy
                                })(DonationList)

export default ConnectedDonationList