/*
=> A route group can be created by wrapping a folder's name in parenthesis: (folderName)
For example, if you have routes defined in files within the admin folder like admin/dashboard, admin/users, etc., 
these routes would be accessible via URLs like /admin/dashboard, /admin/users, etc.
=> This approach helps to organize your routes, especially when you have a large number of routes related to a specific feature
 or area of your application.
*/
import React from "react";

const Home = () => {
  return <div>Dashboard</div>;
};

export default Home;
