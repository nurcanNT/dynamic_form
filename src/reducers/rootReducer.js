import { combineReducers } from 'redux';
import formReducer from './formReducer'; // Örnek olarak formReducer'ı ekledik

const rootReducer = combineReducers({
  form: formReducer,
  // Diğer reducer'ları buraya ekleyebilirsiniz
});

export default rootReducer;
