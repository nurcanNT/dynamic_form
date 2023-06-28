
import './App.css';
import ManagementPage from './components/management/ManagementPage';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
    <ManagementPage />
  </Provider>
  );
}

export default App;
