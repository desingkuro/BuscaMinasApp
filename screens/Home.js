import { View, Text, Button, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Screen from "../src/Components/screen";
import Mine from "../assets/mine";
import { context } from "../src/context/contextGeneral";
import Btn from "../src/Components/Btn";
import { BannerAds } from "../src/Components/Banner";
import { AdEventType, InterstitialAd } from "react-native-google-mobile-ads";

const adUnitId = "ca-app-pub-2284145159855511/1111354072";

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ["fashion", "clothing","gaming", "technology"],
});

const Home = ({navigation}) => {
  const { difficulties, valueActual, setValue, goToPage } = useContext(context);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );
    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setLoaded(false);
        interstitial.load();
      }
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribe();
      unsubscribeClosed();
    };
  }, []);


  function handleBtn(nivel){
    switch (nivel) {
      case 'easy':
        setValue(difficulties.easy);
        break;
      case 'medium':
        setValue(difficulties.medium);
        break;
      case 'hard':
        setValue(difficulties.hard);
        break;
      default:
        console.log('error de eleccion')
        break;
    }
    goToPage(navigation,'game');
    if(loaded){interstitial.show();}
  }

  return (
    <Screen>
      <View className="items-center justify-center p-5 rounded-lg bg-gray-600 h-4/6 w-11/12">
        <Mine height={160} width={160} color={"#B6EADA"} />
        <Text className="font-bold text-white text-4xl mt-10 mb-10">
          Minesweeper
        </Text>

        <Btn
          text={'Easy'}
          styleBtn={'bg-orange-500'}
          callback={()=>handleBtn('easy')}
        />    
        <Btn
          text={'Medium'}
          styleBtn={'bg-blue-500'}
          callback={()=>handleBtn('medium')}
        />  
        <Btn
          text={'Hard'}
          styleBtn={'bg-red-500'}
          callback={()=>handleBtn('hard')}
        />   
      </View>
      <View className="absolute bottom-0 w-full py-3">
      <BannerAds/>
      </View>
    </Screen>
  );
};

export default Home;
