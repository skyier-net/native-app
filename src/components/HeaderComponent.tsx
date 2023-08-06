import { UserButton } from "@clerk/clerk-react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  useIonRouter,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import { useLocation } from "react-router";

export const HeaderComponent = () => {
  const routeToName = new Map();
  routeToName.set("/tab1", "Tab 1");
  routeToName.set("/tab2", "Tab 2");
  routeToName.set("/tab3", "Tab 3");

  const router = useLocation();
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/"></IonBackButton>
        </IonButtons>
        <IonTitle>{routeToName.get(router.pathname) ?? ""}</IonTitle>
        <IonButtons slot="end">
          <UserButton afterSignOutUrl={"/redirectTo" + router.pathname} />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};
