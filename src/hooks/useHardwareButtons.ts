import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { useSettingsStore, HardwareCounterMode } from '@/stores/settingsStore';
import { useAdhkarStore } from '@/stores/adhkarStore';

type HardwareCallback = () => void;

export function useHardwareButtons() {
  const { hardwareCounterMode, bluetoothHeadsetEnabled, vibrationEnabled } = useSettingsStore();
  const { increment: incrementAzkar, azkar, selectedCategory } = useAdhkarStore();

  const handleIncrement = () => {
    const currentAzkar = azkar.filter(item => item.category === selectedCategory);
    const targetItem = currentAzkar.find(item => item.completed < item.count);
    if (targetItem && vibrationEnabled) {
      incrementAzkar(targetItem.id);
    }
  };

  useEffect(() => {
    const isEnabled = hardwareCounterMode !== 'disabled';

    if (Platform.OS === 'android' && isEnabled) {
      // Note: Full hardware button support requires native modules
      // This is a placeholder for the integration
      // In production, use react-native-volume-manager or expo-hardware-buttons
      
      // Volume up button listener would be registered here
      if (hardwareCounterMode === 'volume-up' || hardwareCounterMode === 'both') {
        // Register volume up listener
      }

      // Volume down button listener would be registered here
      if (hardwareCounterMode === 'volume-down' || hardwareCounterMode === 'both') {
        // Register volume down listener
      }
    }

    if (bluetoothHeadsetEnabled && isEnabled) {
      // Bluetooth/Wired headset button listener would be registered here
      // Using react-native-volume-manager for media button events
    }

    return () => {
      // Cleanup listeners
    };
  }, [hardwareCounterMode, bluetoothHeadsetEnabled]);
}

export function useVolumeButton(
  direction: 'up' | 'down',
  onPress?: HardwareCallback
) {
  const callbackRef = useRef(onPress);

  useEffect(() => {
    callbackRef.current = onPress;
  }, [onPress]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      // Native module integration point
      // Example: VolumeButtonManager.addListener(direction, () => callbackRef.current?.())
    }
    return () => {
      // Cleanup
    };
  }, [direction]);
}

export function useHeadsetButton(
  onPress?: HardwareCallback
) {
  const callbackRef = useRef(onPress);

  useEffect(() => {
    callbackRef.current = onPress;
  }, [onPress]);

  useEffect(() => {
    // Headset button listener
    // Using react-native-volume-manager for media button events
    return () => {
      // Cleanup
    };
  }, []);
}
