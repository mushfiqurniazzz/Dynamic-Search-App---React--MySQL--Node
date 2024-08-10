//
import { useState } from "react";
import styles from "../styles/AddUserPage.module.css";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const AddUserPage = () => {
  //use state variable for having hold of the value typed in the input fields and then send to the database
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [user_email, setUser_email] = useState("");

  //function to be called to add a user
  const AddUserHandler = async (e) => {
    //prevents the default form submission action which is reload the page
    e.preventDefault();
    //render a toast notification if all the fields are not provided
    if (!first_name || first_name === "" || !last_name || last_name === "") {
      return toast.info("All fields are required.");
    }

    //using try catch block for better code readability
    try {
      //send a axios post request to the server
      const res = await axios.post("http://localhost:3000/adduser", {
        first_name: first_name,
        last_name: last_name,
        email: user_email
      });

      //console log the data recieved from the server
      console.log(res.data);

      //if a user with the same email already exists
      if (res.status === 409) {
        return toast.warning("User with same email already exists.");
      }

      //set the state variables empty
      setFirst_name("");
      setLast_name("");
      setUser_email("");

      //render a success message
      toast.success("User has been added.");
    } catch (error) {
      //basic error handling incase of error
      console.log(error);
      if (error.response.status === 409) {
        return toast.warning("User with same email already exists.");
      }
      return toast.error("Something went wrong.");
    }
  };
  return (
    <>
      <div className={styles.formparent}>
        <form className={styles.form}>
          <h3>Add User.</h3>
          <hr />
          <div className="mb-3">
            <label htmlFor="PostTitleInput" className="form-label">
              First Name:
            </label>
            <input
              type="text"
              value={first_name}
              onChange={(e) => {
                setFirst_name(e.target.value);
              }}
              className="form-control"
              placeholder="First Name"
              id="PostTitleInput"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="PostBodyInput" className="form-label">
              Last Name:
            </label>
            <input
              type="text"
              value={last_name}
              onChange={(e) => {
                setLast_name(e.target.value);
              }}
              placeholder="Last Name"
              className="form-control"
              id="PostBodyInput"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="PostBodyInput" className="form-label">
              User Email:
            </label>
            <input
              type="text"
              value={user_email}
              onChange={(e) => {
                setUser_email(e.target.value);
              }}
              placeholder="User Email"
              className="form-control"
              id="PostBodyInput"
            />
          </div>
          <div id={styles.formfooterbutton}>
            <button
              type="submit"
              onClick={AddUserHandler}
              className="btn btn-primary"
            >
              Create Post
            </button>
            <Link to="/" className="btn btn-success">
              Search Page
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUserPage;
