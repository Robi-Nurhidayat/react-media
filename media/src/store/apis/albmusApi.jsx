import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Faker, faker } from "@faker-js/faker";

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),

  endpoints: (build) => ({
    removeAlbum: build.mutation({
      invalidatesTags: (result, error, album) => {
        console.log(album);
        return [{ type: "Album", id: album.id }];
      },
      query: (album) => ({
        url: `/albums/${album.id}`,
        method: "DELETE",
      }),
    }),
    addAlbum: build.mutation({
      invalidatesTags: (result, error, user) => {
        return [{ type: "UsersAlbums", id: user.id }];
      },
      query: (user) => ({
        url: "/albums",
        method: "POST",
        body: {
          userId: user.id,
          title: faker.commerce.productName(),
        },
      }),
    }),
    fetchAlbums: build.query({
      providesTags: (result, error, user) => {
        // console.log(result);
        // console.log(user);
        // return [{ type: "Album", id: user.id }];

        const tags = result.map((album) => {
          return { type: "Album", id: album.id };
        });
        tags.push({ type: "UsersAlbums", id: user.id });

        return tags;
      },
      query: (user) => ({
        url: "/albums",
        params: {
          userId: user.id,
        },
        method: "GET",
      }),
    }),
  }),
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;

export { albumsApi };
