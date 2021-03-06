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
           "cash": cash || userToUpdate.cash,
        };
        currentUsersData.splice(userToUpdate, 1, editedUser);
        save(currentUsersData);
        console.log("Edited User:", editedUser);
    };
};

//update credit
const updateCredit = (id, credit) => {
  const currentUsersData = load();
  let userToUpdate = findUser(id);
  if (userToUpdate!==-1) {
      const editedUser = {
         ...userToUpdate,
         "credit": credit || userToUpdate.credit,
      };
      currentUsersData.splice(userToUpdate, 1, editedUser);
      save(currentUsersData);
      console.log("Edited User:", editedUser);
  };
};
//Withdraw money
const withdraw = (id, sum)=> {
  const currentUsersData = load();
  const userIndex = currentUsersData.findIndex((el) => el.id === id);
  const user = currentUsersData.find((el) => el.id === id);
  console.log("user index", userIndex);
  console.log("user", user);
  if (user==-1) {
    throw new Error("The user doesn't exist");
  };
  const max = user.credit + user.cash;
  console.log("user cash and credit",user.cash, user.credit);
    
    const editedUser = {
       ...user,
       "cash": user.cash - sum, 
    };
    currentUsersData.splice(user, 1, editedUser);
    save(currentUsersData);
    console.log("Edited User:", editedUser);

}





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
  updateCredit,
  withdraw,
};
