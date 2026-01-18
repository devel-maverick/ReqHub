import WebSocket, { WebSocketServer } from "ws";
import url from "url";

/*
  This creates a WebSocket proxy:
  Client -> ReqHub -> External WS
*/

export function setupWebSocket(server) {
  const wss = new WebSocketServer({ noServer: true });

  // Handle upgrade from HTTP -> WS
  server.on("upgrade", (req, socket, head) => {
    const { pathname, query } = url.parse(req.url, true);

    if (pathname === "/ws") {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit("connection", ws, query);
      });
    } else {
      socket.destroy();
    }
  });

  // When client connects
  wss.on("connection", (clientWs, query) => {
    const targetUrl = query.target;

    if (!targetUrl) {
      clientWs.send(
        JSON.stringify({ type: "error", message: "Missing target WS URL" })
      );
      clientWs.close();
      return;
    }

    // Connect to actual WebSocket API
    const targetWs = new WebSocket(targetUrl);

    /* ===== PIPE MESSAGES ===== */

    // From target -> client
    targetWs.on("message", (msg) => {
      clientWs.send(
        JSON.stringify({
          type: "message",
          data: msg.toString(),
        })
      );
    });

    // From client -> target
    clientWs.on("message", (msg) => {
      if (targetWs.readyState === WebSocket.OPEN) {
        targetWs.send(msg.toString());
      }
    });

    targetWs.on("open", () => {
      clientWs.send(
        JSON.stringify({ type: "status", message: "Connected to target WS" })
      );
    });

    targetWs.on("close", () => {
      clientWs.send(
        JSON.stringify({ type: "status", message: "Target WS closed" })
      );
      clientWs.close();
    });

    targetWs.on("error", (err) => {
      clientWs.send(
        JSON.stringify({ type: "error", message: err.message })
      );
    });

    clientWs.on("close", () => {
      targetWs.close();
    });
  });
}
