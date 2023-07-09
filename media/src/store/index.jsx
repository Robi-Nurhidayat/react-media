import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userReducer } from "./slices/usersSlice";
import { albumsApi } from "./apis/albmusApi";
import { photosApi } from "./apis/photosApi";

export const store = configureStore({
  reducer: {
    users: userReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware);
  },
});

setupListeners(store.dispatch);

export * from "./thunk/fetchUsers";
export * from "./thunk/addUser";
export * from "./thunk/removeUser";
export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} from "./apis/albmusApi";

export {
  useFetchPhotosQuery,
  useRemovePhotosMutation,
  useAddPhotosMutation,
} from "./apis/photosApi";
