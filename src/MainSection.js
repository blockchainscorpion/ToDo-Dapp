import './MainSection.css';
import Cat from './Cat.js';
import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import ABI from "./contractABI.json";
import Card from "./Card.js";

function MainSection() {

  const [currentAccount, setCurrentAccount] = useState(null);  
  const [chainName, setChainName] = useState(null);
  const [task, setTask] = useState([]);

  const [input, setInput] = useState(null);

  const change = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract('0x51eDAC7942AB67F0f3c64ad6300E3D9FDe43325C', ABI, signer);

    const createTask = await contract.createTask(input);
    
  }

  const getData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract('0x51eDAC7942AB67F0f3c64ad6300E3D9FDe43325C', ABI, signer);

    const total = await contract.totalTasks();
      console.log(total);

      setTask([]);

      for (var i =0; i < total; i++) {
      const currentTask = await contract.taskList(i);
      setTask(previousTask => [...previousTask, currentTask]);
      }

    console.log(task)

  }


  const getWalletAddress = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      await provider.send("eth_requestAccounts");      
      const currentAddress = await signer.getAddress();

      const contract = new ethers.Contract('0x51eDAC7942AB67F0f3c64ad6300E3D9FDe43325C', ABI, signer);

      
      console.log(currentAddress);
      setCurrentAccount(currentAddress)

      const chain = await provider.getNetwork();
      setChainName(chain.name);      
    }

    

  }
    const chainChanged = () => {
      window.location.reload();
    }

    window.ethereum.on('chainChanged', chainChanged);
    window.ethereum.on('accountsChanged', getWalletAddress)
    useEffect(() => {
    getWalletAddress();
    getData();
  }, []);
 

  return (
    <div className="MainSection">
        <div className="Content">          
          
          <p>{currentAccount}</p>          
          <p>chain Name: {chainName}</p>
          <input value={input} onInput={e => setInput(e.target.value)}></input>
          <p> {input} </p>
          <button onClick={change}> Create Task </button>

          {task.map((item) => (
           <Card Name = {item.taskName} id={item.id} done= {item.completedYet}/>
          ))}         

        </div>

        <div className="Sidebar">
          <Cat id="300" name="Jeffrey"/>
          <Cat id="301" name="Mittens"/>
          <Cat id="302" name="Casper"/>          
          <Cat id="303" name="Fire"/>
        </div>
        
    </div>
  );
}

export default MainSection;
