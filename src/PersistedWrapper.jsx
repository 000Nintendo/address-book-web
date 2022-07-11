import PropTypes from 'prop-types';
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistedStore } from './redux/persistedStore'
import { store } from './redux/store'


const PersistedWrapper = ({ children }) => {
    return (
        <Provider store={store}>    
            <PersistGate loading={null} persistor={persistedStore}>
                {children}
            </PersistGate>
        </Provider>
    )
}

PersistedWrapper.propTypes = {
    children: PropTypes.any
}

export default PersistedWrapper