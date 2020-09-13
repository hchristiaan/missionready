import React from 'react';
// import ReactDOM from 'react-dom';



class loginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' ,  password: '' }
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    //var username = this.state.username;
    //var password = this.state.password;
    //alert("You are submitting " + username + ' and ' + password);
    fetch("./login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( this.state ),
    })
    .then(response => response.json())  
    .then(data => {
    console.log('Success:', data);
    })
  .catch((error) => {
  console.error('Error:', error);
  })
}

  myChangeHandler = (event) => {
    this.setState({username: event.target.value});
  };

  myChangeHandler2 = (event) => {
    this.setState({password: event.target.value});
  };

  render() {
    return (
      <form onSubmit={this.mySubmitHandler}>
      <h1>Hello {this.state.username}</h1>
      <p>Enter your name:</p>
      <input
        type='text'
        onChange={this.myChangeHandler}
      />
      <p>Enter your password, and submit:</p>
      <input
        type='password'
        onChange={this.myChangeHandler2}
      />
      <input
        type='submit'
      />
      </form>
    );
  }
};


export default loginForm;
// ReactDOM.render(<MyForm />, document.getElementById('root'));