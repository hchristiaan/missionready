import React from 'react';



class checkInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { locationID: '' }
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    //var username = this.state.username;
    //var password = this.state.password;
    //alert("You are submitting " + username + ' and ' + password);
    fetch("./checkIn", {
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
    this.setState({locationID: event.target.value});
  };

  render() {
    return (
      <form onSubmit={this.mySubmitHandler}>
      <h1>Hello </h1>
      <p>Enter your location ID:</p>
      <input
        type='text'
        onChange={this.myChangeHandler}
      />
      <input
        type='submit'
      />
      </form>
    );
  }
};


export default checkInForm;
// ReactDOM.render(<MyForm />, document.getElementById('root'));