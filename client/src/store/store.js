// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // Local storage ke liye
// import alertsSlice from "./features/alertSlice";
// import usersSlice from "./features/userSlice";
// import { combineReducers } from "redux";

// // ✅ Saare reducers ko combine karein
// const rootReducer = combineReducers({
//   alerts: alertsSlice,
//   users: usersSlice,
// });

// // ✅ Redux Persist ka configuration
// const persistConfig = {
//   key: "root",
//   storage, // Local storage ka use ho raha hai
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // ✅ Redux Store Create karein
// // ✅ Middleware me serializableCheck ko ignore karein
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // 🚀 Yeh warning hata dega
//     }),
// });

// export const persistor = persistStore(store);

import { configureStore } from "@reduxjs/toolkit";
import alertsSlice from "./features/alertSlice";
import usersSlice from "./features/userSlice";
import { combineReducers } from "redux";

// ✅ Saare reducers ko combine karein
const rootReducer = combineReducers({
  alerts: alertsSlice,
  users: usersSlice,
});

// ✅ Redux Store Create karein
export const store = configureStore({
  reducer: rootReducer,
});
