import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './usercomponents/Home';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import Register from './usercomponents/Register';
import ReverseProtectiveCheck from './Pages/ReverseProtective';
import ProtectiveCheck from './Pages/ProtectiveCheck'
import Login from './usercomponents/Login';
import Profile from './usercomponents/Profile';
import EditProfile from './usercomponents/EditProfile';
const Body = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<ReverseProtectiveCheck><Login/></ReverseProtectiveCheck>}/>
            <Route path="/register" element={<ReverseProtectiveCheck><Register/></ReverseProtectiveCheck>}/>
            <Route path="/home" element={<ProtectiveCheck><Home/></ProtectiveCheck>} />
            <Route path='/profile' element={<ProtectiveCheck><Profile/></ProtectiveCheck>}/>
            <Route path='/edituser' element={<ProtectiveCheck><EditProfile/></ProtectiveCheck>}/>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default Body;
