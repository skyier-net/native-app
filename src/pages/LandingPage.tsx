import React from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonText } from '@ionic/react';
import logo from '/logo.png';
import svgImage from '/undraw_my_current_location_re_whmt.svg';

const LandingPage: React.FC = () => (
  <IonPage>
    <IonContent fullscreen className='flex justify-center items-center h-full'>
      <div className='p-2'>
        <IonImg src={logo} alt="Logo" className='w-1/3 mb-4' />
        <div className='flex flex-col justify-center items-center mt-20'>
          <IonImg src={svgImage} className='w-[90%]' />
          <IonText color="primary">
            <h1 className='text-xl text-center mt-5 font-landing_carousel pl-10 pr-10'>Create groups and see your friends' location</h1>
          </IonText>
          <IonText color="medium">
            <p className='text-xs mt-5 text-center font-landing_carousel pl-20 pr-20'>Our app will help you find others from the group and connect.</p>
          </IonText>
          <div className='mt-16 w-1/2'>
            <IonButton expand="full" shape="round">Next</IonButton>
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
);


export default LandingPage;
