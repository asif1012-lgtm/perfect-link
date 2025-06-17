import { useState, useEffect } from 'react';

export interface DeviceInfo {
  screenWidth: number;
  screenHeight: number;
  isTouchDevice: boolean;
  userAgent: string;
  platform: string;
}

export const useDeviceDetector = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    screenWidth: 0,
    screenHeight: 0,
    isTouchDevice: false,
    userAgent: '',
    platform: ''
  });

  useEffect(() => {
    const detectDevice = () => {
      setDeviceInfo({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        userAgent: navigator.userAgent,
        platform: navigator.platform
      });
    };

    detectDevice();
    window.addEventListener('resize', detectDevice);
    return () => window.removeEventListener('resize', detectDevice);
  }, []);

  return deviceInfo;
};
