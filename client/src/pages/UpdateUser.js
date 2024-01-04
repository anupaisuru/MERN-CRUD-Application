import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../css/UpdateUser.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateUser() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [city, setcity] = useState("");
  const [mobile, setmobile] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/users/getUser/${id}`);

        const userData = result.data.user;
        setfirstName(userData.firstName);
        setlastName(userData.lastName);
        setcity(userData.city);
        setmobile(userData.mobile);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [id]);

  const updatedata = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.patch(`/api/users/updateUser/${id}`, {
        firstName,
        lastName,
        city,
        mobile,
      });

      //API returns a success message in the response
      if (
        result.data &&
        result.data.message === "User details updated successfully"
      ) {
        alert("Updated Success");
        navigate("/userList");
      } else {
        console.log("Unexpected API response:", result.data);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="UpdateUser">
      <Header />
      <div className="UpdateUser-main">
        <div className="head">
          <h2>Update User</h2>
        </div>
        <div className="form-section">
          <form onSubmit={updatedata}>
            <div>
              <label>First Name : </label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                required
              ></input>
            </div>
            <div>
              <label>Last Name : </label>
              <input
                type="text"
                name="lastName"
                placeholder="last Name"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                required
              ></input>
            </div>
            <div>
              <label>City : </label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={city}
                onChange={(e) => setcity(e.target.value)}
                required
              ></input>
            </div>
            <div>
              <label>Phone Number : </label>
              <input
                type="text"
                name="mobile"
                placeholder="Phone Number"
                value={mobile}
                onChange={(e) => setmobile(e.target.value)}
                required
              ></input>
            </div>
            <div>
              <button className="create-btn" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
