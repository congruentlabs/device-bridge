import { Request, Response  } from "@congruent-labs/device-bridge-types";

const port = chrome.runtime.connect();

const passToBackgroundScript = (message: MessageEvent<Request>) => {
  if (message.source != window) {
    return;
  }

  if (message.data.requestId !== undefined && message.data.requestType.startsWith("CLDB_")) {
    port.postMessage(message.data);
  }
}

const passToBrowser = (message: MessageEvent<Response>) => {
  if (message.data.responseType.startsWith("CLDB_")) {
    window.postMessage(message, "message");
  }
};

window.addEventListener("message", passToBackgroundScript);

port.onMessage.addListener(passToBrowser);