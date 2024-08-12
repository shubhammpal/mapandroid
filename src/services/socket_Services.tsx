
import { useRef } from "react";
import { io } from "socket.io-client";

// const SOCKET_URL = 'http://3.111.234.55:6008'
const SOCKET_URL = 'http://3.111.234.55:9000/'

class WSService {
  socket: any;

  initializeSocket = async () => {
    try {



      this.socket = io(SOCKET_URL, {
        transports: ['websocket'],


      })

      console.log("initializing socket", this.socket);

      this.socket.on('connect', (data: any) => {
        console.log("====socket connect=====",data);

      })
      this.socket.on('disconnect', (data: any) => {
        console.log("====socket disssconnect=====");

      })
      this.socket.on('error', (data: any) => {
        console.log("====server id not working=====",data);

      })


    } catch (error) {
      console.log("servererror", error);
    }

  }


  emit(event: string, data = {}) {
    this.socket.emit(event, data)
  }
  on(event: string, cb: (msg: any) => void) {
    this.socket.on(event, cb)
  }
  removeListener(listenerName: any) {
    this.socket.removeListener(listenerName)
  }
}

const socketServices = new WSService()

export default socketServices
