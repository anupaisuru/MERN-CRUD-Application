import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../css/UpdateUser.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function UpdateUser() {
  const navigate = useNavigate();

  const location = useLocation();
  const currentUrl = location.pathname.split("/").pop();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    mobile: "",
  });

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(`/api/users/getUser/${currentUrl}`);
        console.log(response.data.user);
        const data = response.data.user;
        setFormData((prevState) => {
          let newData = { ...prevState };
          return {
            ...newData,
            firstName: data.firstName,
            lastName: data.lastName,
            city: data.city,
            mobile: data.mobile,
          };
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/users/updateUser/${currentUrl}`, formData);

      setFormData((prevState) => {
        let newData = { ...prevState };
        return {
          ...newData,
          firstName: "",
          lastName: "",
          city: "",
          mobile: "",
        };
      });
      alert("Update Successfully");
      navigate("/userList");
    } catch (err) {
      console.log(err);
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
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>First Name : </label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div>
              <label>Last Name : </label>
              <input
                type="text"
                name="lastName"
                placeholder="last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div>
              <label>City : </label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div>
              <label>Phone Number : </label>
              <input
                type="text"
                name="mobile"
                placeholder="Phone Number"
                value={formData.mobile}
                onChange={handleChange}
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
