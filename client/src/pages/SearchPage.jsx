//importing few libraries, hooks and functions for the search page
import React, { useState, useEffect } from "react";
import styles from "../styles/SearchPage.module.css";
import { toast } from "sonner";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchPage = () => {
  //search input field use state variable for having the hold of the variable
  const [Searchfield, setSearchfield] = useState("");

  //for holding the fetched data from the server
  const [users, setUsers] = useState([]);

  //for filtering the users and use state variable for having the hold of its values
  const [filteredUsers, setFilteredUsers] = useState([]);

  //async await function for fetching the users from the server using axios
  const FetchUsers = async () => {
    //try catch block for better code readability
    try {
      //sending a axios get request to the server using a variable
      const res = await axios.get("http://localhost:3000/getusers");

      //hold the data recieved from axios get
      const data = res.data;

      //console log the data recieved from the axios get request
      console.log(data);

      //set the array state variable as the data from the axios get request
      setUsers(data);

      //setting the use state value
      setFilteredUsers(data);
    } catch (error) {
      //basic error handler incase of error
      console.log(error);
      return toast.error("Something went wrong.");
    }
  };

  // function to filter users based on search input
  const filterUsers = (searchText) => {
    const filtered = users.filter(
      (user) =>
        `${user.first_name} ${user.last_name}`
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Update search field and filter users on input change
  const SearchUserHandler = (e) => {
    const value = e.target.value;
    setSearchfield(value);
    filterUsers(value);
  };

  //calling the fetchuser function in use effect hook
  useEffect(() => {
    FetchUsers();
  }, []);
  return (
    <>
      <div className={styles.parentdiv}>
        <div className={styles.usersbox}>
          {filteredUsers.length === 0 ? (
            <div>
              <h1 className={styles.h1}>No Record</h1>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div className={styles.user} key={user.id}>
                <p>ID: {user.id}</p>
                <p>
                  Name: {user.first_name} {user.last_name}
                </p>
                <p>Email: {user.email}</p>
                <p>Joined on: {user.created_at}</p>
              </div>
            ))
          )}
        </div>
        <div className={styles.body}>
          <div className={styles.searchbox}>
            <label htmlFor="searchuserinputfield">
              <h5>Search User:</h5>
            </label>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search User By Name"
              aria-label="Search"
              id="searchuserinputfield"
              value={Searchfield}
              onChange={SearchUserHandler}
            />
            <Link to="/adduser" className="btn btn-primary" id={styles.link}>
              Add User
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
