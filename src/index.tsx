import './index.scss';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import { store } from './store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App/>
    </Provider>
);

