import React from "react";
import { useRemoveAlbumMutation } from "../store";
import ExpandedPanel from "./ExpandedPanel";
import Button from "./Button";
import { GoTrashcan } from "react-icons/go";
import PhotosList from "./PhotosList";

function AlbumsListItem({ al, user }) {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const handleRemoveAlbum = () => {
    removeAlbum(al);
  };
  const header = (
    <>
      <Button
        className="mr-2"
        loading={results.isLoading}
        onClick={handleRemoveAlbum}
      >
        <GoTrashcan />
      </Button>
      {al.title}
    </>
  );
  return (
    <ExpandedPanel key={al.id} header={header} user={user}>
      <PhotosList album={al} />
    </ExpandedPanel>
  );
}

export default AlbumsListItem;
