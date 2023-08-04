import React from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg } from '@ionic/react';
import logo from '/logo.png';
import svgImage from '/undraw_my_current_location_re_whmt.svg'; 

const LandingPage: React.FC = () => (
  <IonPage>
    <IonContent fullscreen className='flex justify-center items-center'>
      <IonImg src={logo} alt="Logo" />
      <IonButton>Default</IonButton>
      <IonImg src={svgImage} alt="Current location" />
    </IonContent>
  </IonPage>
);


export default LandingPage;