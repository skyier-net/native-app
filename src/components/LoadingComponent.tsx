import { IonContent, IonImg, IonLoading, IonPage } from "@ionic/react";
import icon from "/favicon.png";

export const LoadingComponent = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="h-full w-full animate-pulse bg-[--ion-color-light] absolute" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="relative flex h-24 w-24">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[--ion-color-primary] opacity-50"></span>
            <IonImg
              src={icon}
              class="relative inline-flex rounded-full h-24 w-24"
            />
          </span>
        </div>
      </IonContent>
    </IonPage>
  );
};
