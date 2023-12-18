import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import "../css/UserList.css";
import { Table, Button, Result } from "antd";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";

function UserList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setfilteredUsers] = useState([]);

  //get all users into table
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("/api/users/getallUsers");
        setUsers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      align: "center",
    },
    {
      title: "Phone Number",
      dataIndex: "mobile",
      key: "mobile",
      align: "center",
    },
    {
      title: "Action",
      align: "center",
      key: "action",
      render: (_, record) => (
        <>
          <button className="upd-btn">
            <a href={`/updateuser/${record._id}`}>Update</a>
          </button>
          <button className="dlt-btn" onClick={() => handleDelete(record._id)}>
            Delete
          </button>
        </>
      ),
    },
  ];

  //delete user
  const handleDelete = async (_id) => {
    Swal.fire({
      title: "Confirm deleting this user ?",
      icon: "question",
      showCancelButton: "true",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      confirmButtontext: "Yes,delete it ",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch("/api/users/deleteUser", { _id });
          Swal.fire("Deleted!", "The User Deleted Success !", "success").then(
            (result) => {
              window.location.reload();
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  //download pdf
  const pdfDownload = () => {
    //create a new jsPDF instance
    const doc = new jsPDF();

    //define table headers
    const headers = [["Fist Name", "Last Name", "City", "Phone Number"]];

    //map the data into the table
    const data = users.map((user) => [
      user.firstName,
      user.lastName,
      user.city,
      user.mobile,
    ]);

    //add the table into pdf
    doc.autoTable({
      head: headers,
      body: data,
    });

    //save the pdf with file name
    doc.save("user.pdf");
  };

  //search function

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredUsers = users.filter((user) => {
      return (
        user.firstName.toLowerCase().includes(searchQuery) ||
        user.lastName.toLowerCase().includes(searchQuery) ||
        user.city.toLowerCase().includes(searchQuery) ||
        user.mobile.toLowerCase().includes(searchQuery)
      );
    });
    setfilteredUsers(filteredUsers);
  };

  return (
    <div>
      <Header />
      <div className="UserList-main">
        <div className="head">
          <h2>Users List</h2>
        </div>
        <div className="s-p">
          <input
            type="search"
            placeholder=" Search"
            name="searchQuery"
            onChange={handleSearch}
          />
          <button className="pdf-btn" onClick={pdfDownload}>
            PDF
          </button>
        </div>
        <div className="tble-sec">
          <Table
            dataSource={filteredUsers.length > 0 ? filteredUsers : users} //If there are filtered users (filteredUsers array has a length greater than 0), use filteredUsers; otherwise, use users.
            columns={columns}
            className="user-list-table"
            pagination={{ pageSize: 4 }}
            footer={() => (
              <div className="footer-number">{`Total ${users.length} items`}</div>
            )}
            rowKey={(record) => record._id}
          />
        </div>
      </div>
    </div>
  );
}

export default UserList;
