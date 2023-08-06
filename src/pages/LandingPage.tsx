import React, { useRef, useState, useEffect } from "react";
import {
  IonButton,
  IonContent,
  IonPage,
  IonImg,
  IonText,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import logo from "/favicon.png";
import logo_squared from "/logo.png";
import svgImage from "/images/undraw_my_current_location_re_whmt.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { useLocation } from "react-router";

const CarouselSlide1 = ({ advanceSlider }) => (
  <div className="p-2 flex flex-col justify-center items-center mt-24 md:mt-20">
    <IonImg src={svgImage} className="w-[90%] md:w-[80%] lg:w-[70%]" />
    <IonText color="primary">
      <h1 className="text-2xl text-center mt-5 font-landing_carousel pl-10 pr-10 md:text-2xl lg:text-3xl">
        Create groups and see your friends' location
      </h1>
    </IonText>
    <IonText color="medium">
      <p className="text-xs mt-5 text-center font-landing_carousel pl-20 pr-20 md:text-sm lg:text-base">
        Our app will help you find others from the group and connect.
      </p>
    </IonText>
    <div className="mt-16 w-1/2 md:w-1/3 lg:w-1/4">
      <IonButton expand="full" shape="round" onClick={advanceSlider}>
        Next
      </IonButton>
    </div>
  </div>
);

const CarouselSlide2 = ({ advanceSlider }) => (
  <div className="p-2 flex flex-col justify-center items-center mt-24 md:mt-20">
    <IonImg src={svgImage} className="w-[90%] md:w-[80%] lg:w-[70%]" />
    <IonText color="primary">
      <h1 className="text-2xl text-center mt-5 font-landing_carousel pl-10 pr-10 md:text-2xl lg:text-3xl">
        Create groups and see your friends' location
      </h1>
    </IonText>
    <IonText color="medium">
      <p className="text-xs mt-5 text-center font-landing_carousel pl-20 pr-20 md:text-sm lg:text-base">
        Our app will help you find others from the group and connect.
      </p>
    </IonText>
    <div className="mt-16 w-1/2 md:w-1/3 lg:w-1/4">
      <IonButton expand="full" shape="round" onClick={advanceSlider}>
        Get Started
      </IonButton>
    </div>
  </div>
);

const LandingPage: React.FC = () => {
  const sliderRef = useRef(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const advanceSlider = () => {
    (sliderRef!.current! as any).slickNext();
  };

  useEffect(() => {
    setIsDarkTheme(
      window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }, []);

  const route = useLocation();
  const redirectTo = route.pathname.includes("redirectTo")
    ? route.pathname.split("/").length > 2
      ? route.pathname.split("/")[2].replaceAll("_", "/")
      : "/tab1"
    : "";

  const [activeSlide, setActiveSlide] = useState(redirectTo ? 2 : 0);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: redirectTo ? 2 : 0,

    afterChange: (currentSlide: number) => {
      setActiveSlide(currentSlide);
    },
  };

  return (
    <IonPage className={isDarkTheme ? "dark-theme" : ""}>
      <div className="h-[100%] flex justify-center items-center">
        <IonContent
          fullscreen
          className="flex flex-col justify-center items-center h-full"
        >
          <IonImg
            src={logo}
            alt="Skyier"
            className={`w-[12%] m-2 absolute transition-all ${
              activeSlide !== 2 ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          />

          <Slider ref={sliderRef} {...settings} className="flex-1">
            <CarouselSlide1 advanceSlider={advanceSlider} />
            <CarouselSlide2 advanceSlider={advanceSlider} />
            <div className="p-10 flex flex-col items-center justify-center flex-1 mt-20">
              <div className="flex justify-center items-center w-full">
                <IonImg src={logo_squared} alt="Skyier" className="w-[70%]" />
              </div>
              <div className="p-2 flex flex-col justify-center items-center mt-10 md:mt-10">
                <IonText color="primary">
                  <h1 className="text-2xl text-center mt-5 font-landing_carousel pl-10 pr-10 md:text-2xl lg:text-3xl">
                    Join us now
                  </h1>
                </IonText>
                <div className="mt-8 w-[80%] md:w-1/3 lg:w-1/4">
                  <SignInButton
                    mode="modal"
                    afterSignUpUrl={"/" + redirectTo}
                    afterSignInUrl={"/" + redirectTo}
                  >
                    <IonButton expand="full" shape="round">
                      Sign In
                    </IonButton>
                  </SignInButton>
                  <IonRow style={{ innerHeight: "10px" }}></IonRow>
                  <SignUpButton
                    mode="modal"
                    afterSignUpUrl={"/" + redirectTo}
                    afterSignInUrl={"/" + redirectTo}
                  >
                    <IonButton
                      expand="full"
                      shape="round"
                      color="primaryshaded"
                    >
                      Register
                    </IonButton>
                  </SignUpButton>
                </div>
              </div>
            </div>
          </Slider>
        </IonContent>
      </div>
    </IonPage>
  );
};

export default LandingPage;
