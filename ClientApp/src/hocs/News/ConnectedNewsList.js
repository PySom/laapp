import { connect } from 'react-redux';
import { setNews, createNews, editNews, deleteNews } from '../../creators/newsCreator';
import { isBusy } from '../../creators/loaderCreator';
import NewsList from '../../components/News/News'

const mapStateToProps = (state) => {
    return {
        news: state.news,
    }
}

const ConnectedNewsList = connect(mapStateToProps, { setNews, createNews, editNews, deleteNews, isBusy })(NewsList)

export default ConnectedNewsList