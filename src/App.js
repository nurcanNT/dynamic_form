
import './App.css';
import ManagementPage from './components/management/ManagementPage';
import { Provider } from 'react-redux';
import store from './store';
import FormPopup from './components/management/FormPopup';

function App() {
  return (
    <Provider store={store}>
    <ManagementPage />
    <FormPopup/>
  </Provider>
  );
}

export default App;
