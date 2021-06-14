import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from './web3'
import lottery from './lottery'
import Web3Utils from 'web3-utils'

class App extends React.Component {
   state = {
     manager : '',
     players:[],
     balance:'',
     value:'',
     message:'',
   };
   

 async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({manager,players,balance});
  }
  
  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({message:'Submitting...'})

    await lottery.methods.enter().send({
      from: accounts[0],
      value: Web3Utils.toWei(this.state.value,'ether')
    })

    this.setState({message:'You Have Been Entered!'})
  }
  onPickWinnerButton = async (event) => {
     const accounts = await web3.eth.getAccounts();
     this.setState({message:'Submitting...'})
     await lottery.methods.pickWinner().send({
       from:accounts[0]
     })
    this.setState({message:'Winner Picked.'})
  }
  
  render() {
    return (
      <div>
        <h2> Lottery Contract </h2>
        <p> This Contract Is Managed By {this.state.manager} </p>
        <p> There are currently {this.state.players.length} players entered </p>
        <p> Balance: {Web3Utils.fromWei(this.state.balance,'ether')} </p>
      
        <hr/>
  
        <form onSubmit={this.onSubmit}>
           <h4> Want To Try Your Luck? </h4>
           <div>
             <label> Amount of Ether To Enter </label>
             <input 
               onChange = {e=>this.setState({value:e.target.value})}
               value = {this.state.value}
             /> 
           </div>
           <button> Enter </button>
        </form>
        <hr/>
        <h1> {this.state.message} </h1>

        <hr/>
          <h4> Pick A Winner </h4>
            <button onClick={this.onPickWinnerButton}> Pick Winner </button>
      </div>
    );
  }
}
export default App;


/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
