import { I18nManager } from 'react-native';

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export const isRTL = I18nManager.isRTL;

export const getRTLStyle = <T>(ltr: T, rtl: T): T => {
  return isRTL ? rtl : ltr;
};
