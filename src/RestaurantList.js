import React, { Suspense } from "react";
import { unstable_createResource } from "react-cache";
import Spinner from "react-svg-spinner";

const RestaurantListResource = unstable_createResource(function() {
  return new Promise((resolve, reject) => {
    fetch("https://8kq2vljq58.sse.codesandbox.io/restaurants")
      .then(res => res.json())
      .then(response => {
        const { restaurants } = response;
        resolve(restaurants);
      });
  });
});

const RestaurantList = props => {
  const restaurtants = RestaurantListResource.read();
  return restaurtants.map(restaurtant => {
    return <p key={restaurtant.id}>{restaurtant.name}</p>;
  });
};

const RestaurantListContainer = props => {
  return (
    <Suspense fallback={<Spinner />}>
      <RestaurantList />
    </Suspense>
  );
};

export default RestaurantListContainer;
