import {
  InAppBrowser,
  InAppBrowserEvent,
  InAppBrowserObject,
} from "@awesome-cordova-plugins/in-app-browser";
import { SIGN_IN_URL } from "../properties";
import { Observable } from "rxjs";

export const InAppBrowserComponent = () => {
  const browser = InAppBrowser.create(SIGN_IN_URL, "_blank", "location=no");
  browser.executeScript({
    code: "\
  var message = 'this is the message';\
  var messageObj = {my_message: message};\
  var stringifiedMessageObj = JSON.stringify(messageObj);\
  webkit.messageHandlers.cordova_iab.postMessage(stringifiedMessageObj);",
  });
  const message = browser.on("message");
  console.log(message);
  //   .subscribe((event: InAppBrowserEvent) => {
  //     console.log(event);
  //     console.log(event.message);
  //     console.log(event.data);
  //   });
  return <></>;
};
