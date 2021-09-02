import { Request, GetConnectedDevicesResponseType } from "@congruent-labs/device-bridge-types";

let _port: chrome.runtime.Port;

const handleRequest = (message: MessageEvent<Request>): void => {
  const response = new GetConnectedDevicesResponseType(
    message.data.requestId,
    [{ deviceType: "yubikey4", isHardwareToken: true, serialNumber: "1234", vendor: "YUBICO" }]
  )
  
  _port.postMessage(response);
};

const connected = (port: chrome.runtime.Port): void => {
  _port = port;
  _port.onMessage.addListener(handleRequest);
};

chrome.runtime.onConnect.addListener(connected);