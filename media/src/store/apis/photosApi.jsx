import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),

  endpoints: (builder) => ({
    fetchPhotos: builder.query({
      providesTags: (result, error, album) => {
        const tags = result.map((photo) => {
          return { type: "Photo", id: photo.id };
        });

        tags.push({ type: "AlbumPhoto", id: album.id });

        return tags;
      },
      query: (album) => ({
        url: "/photos",
        params: {
          albumId: album.id,
        },
        method: "GET",
      }),
    }),
    addPhotos: builder.mutation({
      invalidatesTags: (result, error, album) => {
        return [{ type: "AlbumPhoto", id: album.id }];
      },
      query: (album) => ({
        method: "POST",
        url: "/photos",
        body: {
          albumId: album.id,
          url: faker.image.abstract(150, 150, true),
        },
      }),
    }),
    removePhotos: builder.mutation({
      invalidatesTags: (result, error, photo) => {
        return [{ type: "Photo", id: photo.id }];
      },
      query: (photo) => ({
        method: "DELETE",
        url: `/photos/${photo.id}`,
      }),
    }),
  }),
});

export const {
  useFetchPhotosQuery,
  useRemovePhotosMutation,
  useAddPhotosMutation,
} = photosApi;

export { photosApi };
