import React from 'react';
// import ReactDOM from 'react-dom';



class registrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '' ,  password: '', phonenumber: ''}
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    fetch("./registration", {
      method: "POST",
      mode: "cors",
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
    this.setState({email: event.target.value});
  };

  myChangeHandler2 = (event) => {
    this.setState({password: event.target.value});
  };

  myChangeHandler3 = (event) => {
    this.setState({phonenumber: event.target.value});
  };

  render() {
    return (
      <form onSubmit={this.mySubmitHandler}>
      <h1>Hello </h1>
      <p>Enter your email address:</p>
      <input
        type='text'
        onChange={this.myChangeHandler}
      />
      <p>create your password:</p>
      <input
        type='password'
        onChange={this.myChangeHandler2}
      />
      <p>Enter your phone number, and submit:</p>
      <input
        type='text'
        onChange={this.myChangeHandler3}
      />
      
      <input
        type='submit'
      />
      </form>
    );
  }
};


export default registrationForm;
// ReactDOM.render(<MyForm />, document.getElementById('root'));