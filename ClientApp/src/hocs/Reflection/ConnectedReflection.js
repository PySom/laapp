import { connect } from 'react-redux'
import ReflectionList from '../../components/Reflections/Reflection'
import { createReflection, setReflection, editReflection, deleteReflection } from '../../creators/reflectionCreator'
import { isBusy } from '../../creators/loaderCreator';

const mapStateToProps = ({ reflections }) => {
    return {
        reflections
    }
}


const ConnectedReflectionList = connect(mapStateToProps, {
    createReflection, setReflection, editReflection, deleteReflection, isBusy
})(ReflectionList)

export default ConnectedReflectionList