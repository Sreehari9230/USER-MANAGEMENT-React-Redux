import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVerifiedUser:false,
  UseraccessToken: localStorage.getItem('usetoken')|| '',
};

const initialAdminState = {
    isVerifiedAdmin:false,
    AdminAccessToken:localStorage.getItem('admintoken')||'',
};

const InitialState = {
    email:''
}

const userDataState = {}


const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
      addItems: (state, action) => {
          const token = action.payload.accessToken
          state.UseraccessToken = token;
          state.isVerifiedUser = action.payload.isVerifiedUser
          localStorage.setItem('usetoken',token)
          
      },
      removeItems: (state, action) => {
          state.isVerifiedUser = action.payload.isVerifiedUser;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
      },
      reset: (state) => {
          Object.assign(state, initialState);
      },
  },
});




  const adminTokenSlice = createSlice({
    name: 'adminToken',
    initialState: initialAdminState,
    reducers: {
      addAdminItems: (state, action) => {
        const admintoken= action.payload
        state.isVerifiedAdmin = action.payload.isVerifiedAdmin;
        state.AdminAccessToken = admintoken;
        localStorage.setItem('admintoken',admintoken)
      },
      removeAdminItems: (state) => {
        state.isVerifiedAdmin = false;
        state.AdminAccessToken = '';
      },
      resetAdmin: (state) => {
        Object.assign(state, initialAdminState);
      },
    },
  });

  const userDataSlice = createSlice({
    name: 'userData',
    initialState: userDataState,
    reducers: {
      setUserData: (state, action) => {
        return action.payload;
      },
      resetUserData: () => {
        return userDataState;
      },
    },
  });


const emilReducer = createSlice({
    name:'email',
    initialState:InitialState,
    reducers:{
        addMail(state,action){
            state.email = action.payload
        }
    }
})

export const{addMail} = emilReducer.actions;
export const {setUserData,restUserData} = userDataSlice.actions
export const userDataReducer = userDataSlice.reducer;
export const {addItems,removeItems,reset} = tokenSlice.actions
export const {addAdminItems,removeAdminItems,resetAdmin} = adminTokenSlice.actions
export const userTokenReducer = tokenSlice.reducer;
export const adminTokenReducer = adminTokenSlice.reducer;
export const emailReducer = emilReducer.reducer
