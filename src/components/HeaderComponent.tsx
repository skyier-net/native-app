import { useState } from "react";
import { UserButton } from "@clerk/clerk-react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonImg,
  IonButton,
  IonPopover,
  IonBadge,
  IonList,
  IonItem
} from "@ionic/react";
import { useLocation } from "react-router";
import icon from "/favicon.png";
import bell_icon from "/images/bell_icon.svg";

export const HeaderComponent = () => {
  const routeToName = new Map();
  routeToName.set("/home", "Home");
  routeToName.set("/create", "Create group");
  routeToName.set("/explore", "Explore");

  const router = useLocation();

  // State за управление на IonPopover и броя на нотификациите
  const [showPopover, setShowPopover] = useState(false);
  const [notificationsCount] = useState(2);
  const [popoverEvent, setPopoverEvent] = useState(null);

  const handleButtonClick = (e) => {
    setPopoverEvent(e.nativeEvent);
    setShowPopover(true);
  };

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonImg src={icon} className="w-7" />
        </IonButtons>
        <IonTitle>{routeToName.get(router.pathname) ?? ""}</IonTitle>
        <IonButtons slot="end">
          <IonButton class="cursor-pointer" onClick={handleButtonClick}>
            <div className="relative">
              <IonImg src={bell_icon} className="w-5 mr-3" />
              {notificationsCount > 0 && (
                <IonBadge class="absolute top-[5px] left-[11px] p-[2px] pl-[5px] pr-[5px]" color="danger">
                  {notificationsCount}
                </IonBadge>
              )}
            </div>
          </IonButton>
          <IonPopover
            isOpen={showPopover}
            event={popoverEvent}
            onDidDismiss={() => setShowPopover(false)}
          >
            <IonList>
              <IonItem>Notification 1</IonItem>
              <IonItem>Notification 2</IonItem>
            </IonList>
          </IonPopover>
          <UserButton
            afterSignOutUrl={
              "/redirectTo/" + router.pathname.slice(1).replaceAll("/", "_")
            }
            signInUrl={
              "/redirectTo/" + router.pathname.slice(1).replaceAll("/", "_")
            }
          />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};
