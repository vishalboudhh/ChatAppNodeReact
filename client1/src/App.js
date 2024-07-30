import './App.css';
import Chats from './Chats';
import io from "socket.io-client";
import{ useState } from 'react';
const socket = io.connect("http://localhost:3001");


function App() {
  const [username,setUsername] = useState("")
  const [room,setRoom] = useState("")
  const [showChat,setShowChat] = useState(false)


const joinRoom = () =>{
  if(username !== "" && room !==""){
    socket.emit("Join_room",room);
    setShowChat(true);
  }
}

  return (
    <div className="App">

      {!showChat ? (
      
      <div className='joinChatContainer'>
      <h3>Join A chat</h3>
      <input
       type="text" 
       placeholder="vishal" 
       onChange={(event) => { setUsername(event.target.value);
       }

      }
      />

      <input
       type="text" 
       placeholder="Room Id" 
       onChange={(event) => { setRoom(event.target.value);
       }

      }
      />
      
      <button onClick={joinRoom}>Join a Room </button>
      </div>
      )
:      (

      <Chats socket={socket} username={username} room={room}/>
      )}
    </div>
  );
}

export default App;
