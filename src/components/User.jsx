import { useState } from "react";

const User = (props) => {
  const [count,setCount] = useState(0);
    const [count1,setCount1] = useState(2);

  return (
    <div className="user-card">
      <h1>count:{count}</h1>
      <h1>count:{count1}</h1>
      <h2>Name: {props.name} </h2>
      <h2>Address : noida</h2>
      <h2>Contact: +0987654321</h2>
    </div>
  );
};

export default User;
