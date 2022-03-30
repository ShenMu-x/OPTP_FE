import { onMounted, ref } from 'vue';
import { wsURL } from '@/utils/option';

export const useWs = () => {
    var ws = new WebSocket(`${wsURL}/web/ide/connect`);
    ws.onopen = function (evt) {
        console.log("Connection open ...");
        ws.send("Hello WebSockets!");
    };

    ws.onmessage = function (evt) {
        console.log("Received Message: " + evt.data);
        ws.close();
    };

    ws.onclose = function (evt) {
        console.log("Connection closed.");
    };
    return ws;
    const closeConnent = () => {
        console.log('关闭连接');
    }
}