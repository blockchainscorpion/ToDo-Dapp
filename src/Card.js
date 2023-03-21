import './Card.css';
import { useState } from 'react';
import ABI from "./contractABI.json";
import { ethers } from "ethers";

function Card(props) {

    const [checked, setChecked] = useState(props.done)
    
    const toggle = async () => {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract('0x51eDAC7942AB67F0f3c64ad6300E3D9FDe43325C', ABI, signer);

      const toggleTask = await contract.toggleTask(props.id);

      const receipt = await toggleTask.wait();
      if(receipt.confirmations > 0) {
       setChecked(!checked);
      }

      
    }

  return (
    <div className = "ToDoItem">        
        <p>{props.Name}</p>
        <input onClick={toggle}  type ="checkbox" checked={checked} />
    </div>
  );
}

export default Card;