import User from "./User";
import UserClass from "./UserClass";

const About =()=>{
    return (
        <div>
            <h1>About</h1>
            {/* <User name={"Shubham (function)"}/> */}
            
            <UserClass name={"Shubham (class)"}/>
        </div>
    )
}

export default About;