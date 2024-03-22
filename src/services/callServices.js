import { WebSocketInterface, UA } from 'jssip';

const socket = new WebSocketInterface(process.env.REACT_APP_WS_CALL);
const KEY_LINE = 'line';
class callServices {
  constructor(
    configuration = {
      uri: '882@node2-95pl.voip24h.vn',
      password: '76808fb215169d',
    },
  ) {
    this.ua = new UA({ sockets: [socket], ...configuration });
  }

  checkReady() {
    return this.ua.isRegistered();
  }

  start() {
    return this.ua.start();
  }

  getStatus() {
    return this.ua.status;
  }

  call(phoneNumber) {
    return this.ua.call(phoneNumber, {
      mediaConstraints: { audio: true, video: false },
    });
  }

  endCall() {
    this.ua.terminateSessions();
  }

  stop() {
    this.ua.stop();
  }

  static saveLine({ name, password }) {
    localStorage.setItem(KEY_LINE, JSON.stringify({ name, password }));
  }

  static getLine() {
    const line = localStorage.getItem(KEY_LINE);

    if (line) {
      return JSON.parse(line);
    }

    return null;
  }

  static clearLine() {
    localStorage.removeItem(KEY_LINE)
  }
}

export default callServices;
