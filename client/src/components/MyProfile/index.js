import React, { useState, useEffect } from 'react';
import NavBar from '../NavigationBar';
import Cookies from 'js-cookies';
import ServiceProviderProfile from './ServiceProviderProfile';
import CustomerProfile from './CustomerProfile'
import jwt_decode from 'jwt-decode';

function MyProfile() {

  // parse the token 
  // if the isServiceProvider is true, 
  // display the ServiceProviderProfile component
  // else display the CustomerProfile component
  let token = Cookies.getItem('token')
  const decodedToken = jwt_decode(token);
  console.log("decoded token is ", decodedToken)
  let userObj = decodedToken['tokenObj']

  const [profile, setProfile] = useState([]);

  let api = "";
  let id = 0;

  if (userObj["cust_id"] === null) {
    api = "/api/getproviderprofile";
    id = userObj["Service_ProviderID"];
  } else {
    api = "/api/getcustomerprofile";
    id = userObj["cust_id"]
  }

  const serverURL = ""

  // call the profile api
  const callApiProfile = async (id) => {
    const url = serverURL + api;
    console.log(url)
    const profileID = JSON.stringify({"id": Number(id)})
    

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: profileID,
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(" success : ", body);
    return body;
  }

  useEffect(() => {
    getProfileData(id);
  }, []);

  let getProfileData = (id) => {
    callApiProfile(id)
    .then(res => {
      console.log("callApiProfile profile data returned: ", res)
      setProfile(res["results"])
    })
  }
  const profileData = profile;

  if (userObj["cust_id"] === null && profile.length > 0) {
    return (
      <div>
          <NavBar />
          <ServiceProviderProfile profileData={profileData} id={id}/>
          
      </div>
    );
  } else if (userObj["Service_ProviderID"] === null && profile.length > 0) {
    return (
      <div>
          <NavBar />
          <CustomerProfile profileData={profileData} id={id}/>
      </div>
    );
  } else {
    return (
      <div>
        <NavBar />
      </div>
    )
  }
  
}

export default MyProfile;