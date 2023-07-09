import React from "react";
import { GoTrashcan } from "react-icons/go";
import { removeUser } from "../store";
import { useThunk } from "../hook/use-thunk";
import Button from "./Button";
import ExpandedPanel from "./ExpandedPanel";
import AlbumsList from "./AlbumsList";

function UserListItem({ user }) {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);

  const handleClick = () => {
    doRemoveUser(user);
  };

  const header = (
    <>
      <Button className="mr-3" loading={isLoading} onClick={handleClick}>
        <GoTrashcan />
      </Button>
      {error && console.log(error)}
      {user.name}
    </>
  );
  return (
    <ExpandedPanel user={user} header={header}>
      <AlbumsList user={user} />
    </ExpandedPanel>
  );
}

export default UserListItem;
