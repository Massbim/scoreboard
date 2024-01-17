import React, { useEffect } from "react";
import { useStopwatch } from "react-timer-hook";
import io from "socket.io-client";

const socket = io("http://localhost:8000"); // Update with your Socket.IO server URL and port

export function MyStopwatch() {
  const { totalSeconds, seconds, minutes, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  useEffect(() => {
    socket.on("start", () => {
      start();
    });

    socket.on("stop", () => {
      pause();
    });

    return () => {
      socket.off("start");
      socket.off("stop");
    };
  }, [start, pause]);

  return (
    <div style={{ textAlign: "center" }}>
      <div id="reset-btn" style={{ fontSize: "70px", color: "white" }}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>

      <button
        style={{ color: "white" }}
        onClick={() => {
          socket.emit("start");
        }}
      >
        Start
      </button>
      <button
        style={{ color: "white" }}
        onClick={() => {
          socket.emit("stop");
        }}
      >
        Pause
      </button>
      <button
        style={{ color: "white" }}
        onClick={() => {
          socket.emit("stop"); // Ensure timer is stopped on all clients
          reset();
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default function Timer() {
  return (
    <div>
      <MyStopwatch />
    </div>
  );
}
