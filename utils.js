const fs = require("fs");

const findUsers = () => {
  let users = load();
  return users;
};
//read
const findUser = (id) => {
  //put json data in users variable:
  let users = load();
  let user = users.find((user) => user.passport_id === id);
  if (user) {
    return user;
  } else {
    console.log("user doesnt exists123");
    return -1;
  }
};

const createUser = (user) => {
    const clientsData = load();
    //check if the user already exists
    const duplicateUser = clientsData.find(
      (client) => client.passport_id === user.passport_id
    );
    if (duplicateUser) {
      console.log("The passport ID already exists");
    } else {
      clientsData.push(user);
      save(clientsData);
    }
  return user;
};

//UPDATE USER
const deposit = (id, cash) => {
    const currentUsersData = load();
    let userToUpdate = findUser(id);
    if (userToUpdate!==-1) {
        const editedUser = {
           ...userToUpdate,
           cash: cash || userToUpdate.cash,
        };
        currentUsersData.splice(userToUpdate, 1, editedUser);
        save(currentUsersData);
        console.log("Edited User:", editedUser);
    };
    
  
};

const save = (users) => {
    const dataJSON = JSON.stringify(users);
    fs.writeFileSync("users.json", dataJSON);
  };

const load = () => {
  try {
    const dataJSON = fs.readFileSync("users.json", "utf-8");
    const data = JSON.parse(dataJSON);
    return data;
  } catch (e) {
    return [];
    console.log(e);
  }
};

module.exports = {
  findUsers,
  findUser,
  createUser,
  deposit,
};
