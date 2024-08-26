import React from 'react';
import { BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';

const adUnitId = 'ca-app-pub-2284145159855511/3585905375';

export function BannerAds() {
  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        networkExtras: {
          collapsible: 'bottom',
        },
      }}
    />
  );
}
