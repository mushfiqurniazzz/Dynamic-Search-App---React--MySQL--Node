const AddUser = async (req, res) => {
  //retrieving firstname, lastname and email from req body
  const { first_name, last_name, email } = req.body;

  //check if all the fields are found
  if (
    !first_name ||
    first_name === "" ||
    !last_name ||
    last_name === "" ||
    !email ||
    email === ""
  ) {
    return res.status(404).send("All Fields Are Required.");
  }

  //using a try catch block for better code readability
  try {
    //check if a user with same email exists or not
    const [
      CheckUniqueEmail
    ] = await req.pool.query(
      `SELECT COUNT(*) AS count FROM \`${process.env
        .DB_AUTHTABLE}\` WHERE email = ?`,
      [email]
    );

    //if the query doesnt return 0 return a error message
    if (CheckUniqueEmail[0].count > 0) {
      return res.status(409).send("User With Same Email Already Exists.");
    }

    //insert the items into the database if the email doesn't already exist
    const [InsertData] = await req.pool.query(
      `
      INSERT INTO \`${process.env
        .DB_AUTHTABLE}\` ( first_name, last_name, email) VALUES ( ?, ?, ? )
      `,
      [first_name, last_name, email]
    );

    //get hold of the inserted row's id using a inbuilt method
    const id = InsertData.insertId;

    //console log a message to print in server
    console.log(`User With Id = ${id}, Has Been Added.`);

    //send a success message indicating the add user was successful
    return res.status(200).json({
      id: id,
      names: `${first_name} ${last_name}`,
      email: email
    });
  } catch (error) {
    //basic error handling incase of error
    console.log(error);
    return res.status(400).send("Something Went Wrong.");
  }
};

const GetUsers = async (req, res) => {
  //using try catch block for better readability of code
  try {
    //query to retrieve all the rows from the database
    const [RetrieveData] = await req.pool.query(
      `SELECT * FROM \`${process.env.DB_AUTHTABLE}\``
    );

    //send the json array back to the client with a success message
    return res.status(200).json(RetrieveData);
  } catch (error) {
    //basic error handler incase of error
    console.log(error);
    return res.status(400).send("Something Went Wrong.");
  }
};

module.exports = { AddUser, GetUsers };
