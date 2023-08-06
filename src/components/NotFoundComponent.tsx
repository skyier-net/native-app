import { IonContent, IonPage } from "@ionic/react";
import ExploreContainer from "./ExploreContainer";

export const NotFoundComponent = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <ExploreContainer name="404! PAGE NOT FOUND" />
      </IonContent>
    </IonPage>
  );
};
