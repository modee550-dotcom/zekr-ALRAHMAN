import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { useAdhkarStore, AzkarCategory } from '@/stores/adhkarStore';
import { useStatsStore } from '@/stores/statsStore';
import * as Haptics from 'expo-haptics';

const categories: AzkarCategory[] = [
  'أذكار الصباح',
  'أذكار المساء',
  'أذكار النوم',
  'أذكار الصلاة',
  'توابج',
];

export default function AdhkarScreen() {
  const { theme, isDark } = useTheme();
  const { 
    azkar, 
    selectedCategory, 
    setSelectedCategory, 
    increment, 
    decrement,
    resetAzkar,
    addAzkar,
    deleteAzkar,
  } = useAdhkarStore();
  const { updateStats, targetCount } = useStatsStore();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAzkarText, setNewAzkarText] = useState('');
  const [newAzkarCount, setNewAzkarCount] = useState('33');
  const [newAzkarColor, setNewAzkarColor] = useState(theme.neon);
  const [showAzkarDetails, setShowAzkarDetails] = useState<string | null>(null);
  
  const filteredAzkar = azkar.filter(item => item.category === selectedCategory);
  const totalCompleted = filteredAzkar.reduce((sum, item) => sum + item.completed, 0);
  const totalTarget = filteredAzkar.reduce((sum, item) => sum + item.count, 0);
  const progress = totalTarget > 0 ? Math.min(100, Math.round((totalCompleted / totalTarget) * 100)) : 0;

  const handleIncrement = (id: string) => {
    increment(id);
    if (isDark) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    updateStats(totalCompleted + 1, totalTarget);
  };

  const handleAddAzkar = () => {
    if (newAzkarText.trim()) {
      addAzkar(newAzkarText.trim(), parseInt(newAzkarCount) || 33, selectedCategory);
      setNewAzkarText('');
      setNewAzkarCount('33');
      setNewAzkarColor(theme.neon);
      setShowAddModal(false);
    }
  };

  const getProgressColor = (completed: number, target: number) => {
    const pct = target > 0 ? (completed / target) * 100 : 0;
    if (pct >= 100) return theme.success;
    if (pct >= 50) return theme.neon;
    return theme.progress;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>حصن نفسك</Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            بالأذكار تطمئن القلوب
          </Text>
        </View>

        {/* Category Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
          contentContainerStyle={styles.categoryContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                { 
                  backgroundColor: selectedCategory === category ? theme.neon : theme.card,
                  borderColor: selectedCategory === category ? theme.neon : theme.border,
                },
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                { color: selectedCategory === category ? '#fff' : theme.text }
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Daily Progress */}
        <View style={[styles.progressCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.progressTitle, { color: theme.textSecondary }]}>وردك اليومي</Text>
          <Text style={[styles.progressCount, { color: theme.neon }]}>
            {totalCompleted} / {totalTarget}
          </Text>
          <View style={[styles.progressBar, { backgroundColor: theme.progressBg }]}>
            <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: theme.progress }]} />
          </View>
          {progress >= 100 && (
            <View style={styles.celebrationContainer}>
              <Ionicons name="checkmark-circle" size={24} color={theme.success} />
              <Text style={[styles.celebrationText, { color: theme.success }]}>
                أحسنت! لقد أكملت وردك
              </Text>
            </View>
          )}
        </View>

        {/* Add New Dhikr Button */}
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.neon }]}
          onPress={() => setShowAddModal(true)}
        >
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>إضافة ذكر جديد</Text>
        </TouchableOpacity>

        {/* Azkar List */}
        {filteredAzkar.map((item) => {
          const itemProgress = getProgressColor(item.completed, item.count);
          const isCompleted = item.completed >= item.count;
          
          return (
            <View
              key={item.id}
              style={[
                styles.azkarCard,
                { 
                  backgroundColor: theme.card, 
                  borderColor: isCompleted ? theme.success : theme.border,
                  borderLeftWidth: 4,
                  borderLeftColor: isCompleted ? theme.success : itemProgress,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  if (showAzkarDetails === item.id) {
                    setShowAzkarDetails(null);
                  } else {
                    setShowAzkarDetails(item.id);
                  }
                }}
              >
                <View style={styles.azkarContent}>
                  <Text style={[styles.azkarText, { color: theme.text }]}>{item.text}</Text>
                  <Text style={[styles.azkarCount, { color: theme.textSecondary }]}>
                    {item.completed} / {item.count}
                  </Text>
                  {item.virtue && showAzkarDetails === item.id && (
                    <View style={styles.detailsContainer}>
                      <Text style={[styles.detailTitle, { color: theme.neon }]}>
                        الفضيلة:
                      </Text>
                      <Text style={[styles.detailText, { color: theme.textSecondary }]}>
                        {item.virtue}
                      </Text>
                      <Text style={[styles.detailTitle, { color: theme.neon, marginTop: 12 }]}>
                        المعنى:
                      </Text>
                      <Text style={[styles.detailText, { color: theme.textSecondary }]}>
                        {item.meaning}
                      </Text>
                      <Text style={[styles.detailTitle, { color: theme.neon, marginTop: 12 }]}>
                        اللون:
                      </Text>
                      <View style={styles.colorIndicator}>
                        <View style={[styles.colorDot, { backgroundColor: item.color || theme.neon }]} />
                        <Text style={[styles.colorText, { color: theme.textSecondary }]}>
                          {item.color}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              
              <View style={styles.azkarControls}>
                <TouchableOpacity
                  style={[styles.controlButton, { backgroundColor: theme.progressBg }]}
                  onPress={() => handleIncrement(item.id)}
                >
                  <Ionicons name="add" size={24} color={theme.progress} />
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.controlButton, { backgroundColor: theme.progressBg }]}
                  onPress={() => decrement(item.id)}
                >
                  <Ionicons name="remove" size={24} color={theme.progress} />
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.controlButton, { backgroundColor: theme.progressBg }]}
                  onPress={() => resetAzkar(item.id)}
                >
                  <Ionicons name="refresh" size={20} color={theme.progress} />
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.controlButton, { backgroundColor: theme.danger + '20' }]}
                  onPress={() => {
                    Alert.alert('حذف الذكر', 'هل أنت متأكد؟', [
                      { text: 'إلغاء', style: 'cancel' },
                      { text: 'حذف', style: 'destructive', onPress: () => deleteAzkar(item.id) },
                    ]);
                  }}
                >
                  <Ionicons name="trash" size={20} color={theme.danger} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Add Modal */}
      <Modal visible={showAddModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>إضافة ذكر جديد</Text>
            
            <TextInput
              style={[styles.modalInput, { backgroundColor: theme.cardSecondary, color: theme.text, borderColor: theme.border }]}
              placeholder="نص الذكر"
              placeholderTextColor={theme.textSecondary}
              value={newAzkarText}
              onChangeText={setNewAzkarText}
              textAlign="right"
            />
            
            <TextInput
              style={[styles.modalInput, { backgroundColor: theme.cardSecondary, color: theme.text, borderColor: theme.border }]}
              placeholder="عدد المرات"
              placeholderTextColor={theme.textSecondary}
              value={newAzkarCount}
              onChangeText={setNewAzkarCount}
              keyboardType="numeric"
              textAlign="right"
            />
            
            <Text style={[styles.modalTitle, { color: theme.text, fontSize: 16, marginBottom: 12 }]}>
              اختر لونًا:
            </Text>
            <View style={styles.colorGrid}>
              {[
                theme.neon,
                theme.progress,
                theme.success,
                theme.danger,
                theme.neonSecondary,
                theme.accent,
              ].map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    newAzkarColor === color && styles.selectedColorOption,
                  ]}
                  onPress={() => setNewAzkarColor(color)}
                />
              ))}
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: theme.neon }]}
                onPress={() => handleAddAzkar()}
              >
                <Text style={styles.modalButtonText}>حفظ</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: theme.danger }]}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.modalButtonText}>إلغاء</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  categoryContainer: {
    maxHeight: 50,
    marginBottom: 20,
  },
  categoryContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressCard: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  progressCount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  progressBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  celebrationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  celebrationText: {
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  azkarCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  azkarContent: {
    marginBottom: 12,
  },
  azkarText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'right',
    marginBottom: 4,
  },
  azkarCount: {
    fontSize: 14,
    textAlign: 'right',
  },
  azkarControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Details Styles - use static colors (theme not available in StyleSheet.create)
  detailsContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 8,
  },
  colorIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  colorText: {
    fontSize: 12,
  },
  // Color Picker Styles
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  colorOption: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#334155',
  },
  selectedColorOption: {
    borderColor: '#f1f5f9',
    borderWidth: 3,
  },
});


