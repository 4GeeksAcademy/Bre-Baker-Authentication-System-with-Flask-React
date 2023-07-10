import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Private = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    const access_token = sessionStorage.getItem('token');
    actions.private(access_token);
  }, [actions]);

  return (
    <div className="jumbotron-auto">
      <h1>SECRETS</h1>
      {store.userData ? (
        <div>
          <p>User ID: {store.userData.id}</p>
          <p>Email: {store.userData.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};