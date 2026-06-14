import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Switch,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { useSettingsStore, ThemeMode, AppTheme } from '@/stores/settingsStore';
import { useStatsStore } from '@/stores/statsStore';

export default function SettingsScreen() {
  const { theme, isDark } = useTheme();
  const { 
    themeMode, 
    setThemeMode,
    appTheme,
    setAppTheme,
    soundEnabled,
    setSoundEnabled,
    vibrationEnabled,
    setVibrationEnabled,
    notificationsEnabled,
    setNotificationsEnabled,
    notificationTime,
    setNotificationTime,
    pinCode,
    setPinCode,
  } = useSettingsStore();
  const { gender, setGender, ageGroup, setAgeGroup, region, setRegion, targetCount, setTargetCount } = useStatsStore();
  
  const [showPinModal, setShowPinModal] = useState(false);
  const [newPin, setNewPin] = useState('');

  const themeOptions: { value: ThemeMode; label: string }[] = [
    { value: 'dark', label: 'الليل' },
    { value: 'light', label: 'النهار' },
    { value: 'system', label: 'تلقائي' },
  ];

  const appThemeOptions: { value: AppTheme; label: string }[] = [
    { value: 'night-city', label: 'مدينة الليل' },
    { value: 'desert-sunrise', label: 'شروق الصحراء' },
    { value: 'ocean-dusk', label: 'غروب المحيط' },
  ];

  const genderOptions: { value: 'ذكر' | 'أنثى'; label: string }[] = [
    { value: 'ذكر', label: 'ذكر' },
    { value: 'أنثى', label: 'أنثى' },
  ];

  const ageOptions: { value: 'طفل' | 'بالغ' | 'كبير'; label: string }[] = [
    { value: 'طفل', label: 'طفل' },
    { value: 'بالغ', label: 'بالغ' },
    { value: 'كبير', label: 'كبير' },
  ];

  const handleSetPin = () => {
    if (newPin.length === 4) {
      setPinCode(newPin);
      setShowPinModal(false);
      setNewPin('');
      Alert.alert('تم', 'تم تعيين رمز الدفتر السري');
    }
  };

  const renderOption = <T extends string>(
    options: { value: T; label: string }[],
    selected: T,
    onSelect: (value: T) => void
  ) => (
    <View style={styles.optionsRow}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.optionButton,
            { 
              backgroundColor: selected === option.value ? theme.neon : theme.cardSecondary,
              borderColor: selected === option.value ? theme.neon : theme.border,
            },
          ]}
          onPress={() => onSelect(option.value)}
        >
          <Text style={[
            styles.optionText,
            { color: selected === option.value ? '#fff' : theme.text }
          ]}>
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>الإعدادات</Text>
        </View>

        {/* Personal Info */}
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>البيانات الشخصية</Text>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.textSecondary }]}>الجنس</Text>
            {renderOption(genderOptions, gender, setGender)}
          </View>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.textSecondary }]}>الفئة العمرية</Text>
            {renderOption(ageOptions, ageGroup, setAgeGroup)}
          </View>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.textSecondary }]}>المنطقة</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.cardSecondary, color: theme.text, borderColor: theme.border }]}
              placeholder="مثال: القاهرة"
              placeholderTextColor={theme.textSecondary}
              value={region}
              onChangeText={setRegion}
              textAlign="right"
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.textSecondary }]}>العدد المستهدف يومياً</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.cardSecondary, color: theme.text, borderColor: theme.border }]}
              placeholder="33"
              placeholderTextColor={theme.textSecondary}
              value={targetCount.toString()}
              onChangeText={(text) => setTargetCount(parseInt(text) || 33)}
              keyboardType="numeric"
              textAlign="right"
            />
          </View>
        </View>

        {/* Theme Settings */}
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>المظهر</Text>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.textSecondary }]}>الوضع</Text>
            {renderOption(themeOptions, themeMode, setThemeMode)}
          </View>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.textSecondary }]}>السمة</Text>
            {renderOption(appThemeOptions, appTheme, setAppTheme)}
          </View>
        </View>

        {/* Sound & Vibration */}
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>الصوت والاهتزاز</Text>
          
          <View style={styles.switchItem}>
            <Text style={[styles.switchLabel, { color: theme.text }]}>الصوت</Text>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: theme.border, true: theme.neon }}
              thumbColor="#fff"
            />
          </View>
          
          <View style={styles.switchItem}>
            <Text style={[styles.switchLabel, { color: theme.text }]}>الاهتزاز</Text>
            <Switch
              value={vibrationEnabled}
              onValueChange={setVibrationEnabled}
              trackColor={{ false: theme.border, true: theme.neon }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Notifications */}
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>التذكيرات</Text>
          
          <View style={styles.switchItem}>
            <Text style={[styles.switchLabel, { color: theme.text }]}>التذكيرات اليومية</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: theme.border, true: theme.neon }}
              thumbColor="#fff"
            />
          </View>
          
          {notificationsEnabled && (
            <View style={styles.settingItem}>
              <Text style={[styles.settingLabel, { color: theme.textSecondary }]}>وقت التذكير</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.cardSecondary, color: theme.text, borderColor: theme.border }]}
                placeholder="06:00"
                placeholderTextColor={theme.textSecondary}
                value={notificationTime}
                onChangeText={setNotificationTime}
                textAlign="right"
              />
            </View>
          )}
        </View>

        {/* Security */}
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>الأمان</Text>
          
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => setShowPinModal(true)}
          >
            <Text style={[styles.settingLabel, { color: theme.text }]}>تعيين رمز الدفتر السري</Text>
            <Ionicons name="chevron-back" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
          
          {pinCode && (
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => {
                Alert.alert('حذف الرمز', 'هل أنت متأكد من حذف رمز الدفتر السري؟', [
                  { text: 'إلغاء', style: 'cancel' },
                  { text: 'حذف', style: 'destructive', onPress: () => setPinCode(null) },
                ]);
              }}
            >
              <Text style={[styles.settingLabel, { color: theme.danger }]}>حذف رمز الدفتر السري</Text>
              <Ionicons name="trash" size={20} color={theme.danger} />
            </TouchableOpacity>
          )}
        </View>

        {/* Backup */}
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>النسخ الاحتياطي</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.text }]}>تصدير البيانات</Text>
            <Ionicons name="download" size={20} color={theme.neon} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.text }]}>استيراد البيانات</Text>
            <Ionicons name="upload" size={20} color={theme.neon} />
          </TouchableOpacity>
        </View>

        {/* About */}
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>عن التطبيق</Text>
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.textSecondary }]}>الإصدار</Text>
            <Text style={[styles.settingValue, { color: theme.text }]}>1.0.0</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.textSecondary }]}>المطور</Text>
            <Text style={[styles.settingValue, { color: theme.text }]}>حصن نفسك</Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* PIN Modal */}
      <View style={[styles.modalOverlay, !showPinModal && { display: 'none' }]}>
        <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
          <Text style={[styles.modalTitle, { color: theme.text }]}>تعيين رمز الدفتر السري</Text>
          <Text style={[styles.modalSubtitle, { color: theme.textSecondary }]}>
            أدخل رمز مكون من 4 أرقام
          </Text>
          <TextInput
            style={[styles.pinInput, { backgroundColor: theme.cardSecondary, color: theme.text, borderColor: theme.border }]}
            placeholder="0000"
            placeholderTextColor={theme.textSecondary}
            value={newPin}
            onChangeText={setNewPin}
            keyboardType="numeric"
            maxLength={4}
            textAlign="center"
            secureTextEntry
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: theme.neon }]}
              onPress={handleSetPin}
            >
              <Text style={styles.modalButtonText}>حفظ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: theme.danger }]}
              onPress={() => setShowPinModal(false)}
            >
              <Text style={styles.modalButtonText}>إلغاء</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 14,
  },
  settingValue: {
    fontSize: 14,
  },
  input: {
    width: 150,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 14,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  switchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  switchLabel: {
    fontSize: 14,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    marginBottom: 24,
  },
  pinInput: {
    width: 200,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 16,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
