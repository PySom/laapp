import { connect } from 'react-redux';
import {
    createDeanery, createParish, editDeanery, editParish,
    setDeaneries, deleteDeanery, deleteParish,
    createMass, createConfession, editConfession, editMass,
    deleteConfession, deleteMass
} from '../../creators/ecclesiaCreator';
import { isBusy } from '../../creators/loaderCreator';
import DeaneryList from '../../components/Deaneries/Deanery'

const mapStateToProps = (state) => {
    return {
        ecclesia: state.ecclesia,
    }
}

const Ecclesia = connect(mapStateToProps, {
                    createDeanery, createParish, editDeanery, editParish,
                    setDeaneries, deleteDeanery, deleteParish,
                    createMass, createConfession, editConfession, editMass,
                    deleteConfession, deleteMass, isBusy
                })(DeaneryList)

export default Ecclesia