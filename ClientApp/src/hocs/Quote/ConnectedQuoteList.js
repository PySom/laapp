import { connect } from 'react-redux';
import { createQuote, setQuotes, editQuotes, deleteQuotes } from '../../creators/quotesCreator';
import { isBusy } from '../../creators/loaderCreator';
import QuotesList from '../../components/Quotes/Quotes'

const mapStateToProps = (state) => {
    return {
        quotes: state.quotes,
    }
}

const ConnectedQuoteList = connect(mapStateToProps, { createQuote, setQuotes, deleteQuotes, editQuotes, isBusy })(QuotesList)
export default ConnectedQuoteList