import React, { useEffect, useState } from "react";
// import api from "./API/api";
import axios from "axios";
function App() {
  //console.log(process.env.NODE_ENV);
  const [value, setValue] = useState({name: "Isim"});
  useEffect(() => {
    const fetchData = async () => {
      
      const {data} = await axios.get("http://localhost:5000/api/users/315");
      console.log(data);
      setValue(data);
    };
    fetchData();
  }, []);

  // const handleSubmit = async () => {
  //   await api.post("form", { formValues: value });
  // };
  return (
    <div className="App">
     <div>{value.name}</div>
    
      {/* <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
      />
      <button onClick={handleSubmit}>Submit</button> */}
    </div>
  );
}

export default App;