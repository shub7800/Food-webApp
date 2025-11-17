import React from "react";
// We import React because class components come from React library.

class UserClass extends React.Component {
  // We create a class component by extending React.Component.
  // This gives us access to render() and lifecycle methods.

  constructor(props) {
    // The constructor is the first method called when the component is created.
    // It is used to receive props, initialize state, and bind methods.

    super(props);
    // super(props) calls the parent class (React.Component) constructor.
    // This is required to use 'this' inside the constructor
    // and to make this.props available inside the constructor.

    this.state = {
      userInfo: {
        name: "dummy name ",
        location: "Noida",
        avatar_url: "http//dummy url",
        email: "dummy@gmail.com",
      },
    };
  }

  async componentDidMount() {
    // api call
    const data = await fetch("https://api.github.com/users/shub7800");
    const json = await data.json();

    console.log(json);

    this.setState({
      userInfo: json,
    });
  }


  render() {
    // The render() method is mandatory in class components.
    // Whatever we return here will be displayed on the UI.

    // const { name } = this.props;
    // const { count } = this.state;

    const { name, location, avatar_url, email } = this.state.userInfo;

    return (
      <div className="user-card">
        <img src={avatar_url} alt="user pic" />
        {/* <h1>count: {count}</h1> 
        <button
          onClick={() => {
            4;
            //never update state variable directly
            this.setState({
              count: this.state.count + 1,
            });
          }}
        >
          count increase
        </button> */}
        {/* Static user details displayed on the screen */}
        <h2>Name: {name}</h2>
        <h2>Address : {location}</h2>
        <h2>Contact:{email}</h2>
      </div>
    );
  }
}

export default UserClass;
// Exporting the component so it can be used in other files.
