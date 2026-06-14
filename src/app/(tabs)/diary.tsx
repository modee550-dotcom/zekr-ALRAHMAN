import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  TextInput,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { useSettingsStore } from '@/stores/settingsStore';
import { useDiaryStore, DiaryEntry } from '@/stores/diaryStore';

export default function DiaryScreen() {
  const { theme, isDark } = useTheme();
  const { pinCode, setPinCode, isDiaryUnlocked, setIsDiaryUnlocked } = useSettingsStore();
  const { entries, addEntry, editEntry, deleteEntry } = useDiaryStore();
  
  const [showPinModal, setShowPinModal] = useState(!isDiaryUnlocked && pinCode !== null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);
  const [inputPin, setInputPin] = useState('');
  const [newEntryText, setNewEntryText] = useState('');
  const [pinError, setPinError] = useState(false);

  const handlePinSubmit = () => {
    if (inputPin === pinCode) {
      setIsDiaryUnlocked(true);
      setShowPinModal(false);
      setInputPin('');
      setPinError(false);
    } else {
      setPinError(true);
      setInputPin('');
    }
  };

  const handleAddEntry = () => {
    if (newEntryText.trim()) {
      addEntry(newEntryText.trim());
      setNewEntryText('');
      setShowAddModal(false);
    }
  };

  const handleEditEntry = () => {
    if (editingEntry && newEntryText.trim()) {
      editEntry(editingEntry.id, newEntryText.trim());
      setNewEntryText('');
      setShowEditModal(false);
      setEditingEntry(null);
    }
  };

  const handleDeleteEntry = (id: string) => {
    Alert.alert('حذف الدعاء', 'هل أنت متأكد من حذف هذا الدعاء؟', [
      { text: 'إلغاء', style: 'cancel' },
      { text: 'حذف', style: 'destructive', onPress: () => deleteEntry(id) },
    ]);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderEntry = ({ item }: { item: DiaryEntry }) => (
    <View style={[styles.entryCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.entryText, { color: theme.text }]}>{item.text}</Text>
      <Text style={[styles.entryDate, { color: theme.textSecondary }]}>{formatDate(item.createdAt)}</Text>
      <View style={styles.entryActions}>
        <TouchableOpacity
          style={[styles.entryButton, { backgroundColor: theme.neon + '20' }]}
          onPress={() => {
            setEditingEntry(item);
            setNewEntryText(item.text);
            setShowEditModal(true);
          }}
        >
          <Ionicons name="create" size={18} color={theme.neon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.entryButton, { backgroundColor: theme.danger + '20' }]}
          onPress={() => handleDeleteEntry(item.id)}
        >
          <Ionicons name="trash" size={18} color={theme.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );

  // If diary is locked and not unlocked, show lock screen
  if (pinCode && !isDiaryUnlocked) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.lockContainer}>
          <Ionicons name="lock-closed" size={64} color={theme.neon} />
          <Text style={[styles.lockTitle, { color: theme.text }]}>الدفتر السري</Text>
          <Text style={[styles.lockSubtitle, { color: theme.textSecondary }]}>
            أدخل الرمز السري لفتح الدفتر
          </Text>
          <TouchableOpacity
            style={[styles.unlockButton, { backgroundColor: theme.neon }]}
            onPress={() => setShowPinModal(true)}
          >
            <Text style={styles.unlockButtonText}>فتح الدفتر</Text>
          </TouchableOpacity>
        </View>

        {/* PIN Modal */}
        <Modal visible={showPinModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
              <Ionicons name="lock-closed" size={48} color={theme.neon} />
              <Text style={[styles.modalTitle, { color: theme.text }]}>أدخل الرمز السري</Text>
              {pinError && (
                <Text style={[styles.errorText, { color: theme.danger }]}>الرمز غير صحيح</Text>
              )}
              <TextInput
                style={[styles.pinInput, { backgroundColor: theme.cardSecondary, color: theme.text, borderColor: theme.border }]}
                placeholder="0000"
                placeholderTextColor={theme.textSecondary}
                value={inputPin}
                onChangeText={setInputPin}
                keyboardType="numeric"
                maxLength={4}
                textAlign="center"
                secureTextEntry
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: theme.neon }]}
                  onPress={handlePinSubmit}
                >
                  <Text style={styles.modalButtonText}>فتح</Text>
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
        </Modal>
      </View>
    );
  }

  // If no PIN is set, show setup screen
  if (!pinCode) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.lockContainer}>
          <Ionicons name="lock-open" size={64} color={theme.neonSecondary} />
          <Text style={[styles.lockTitle, { color: theme.text }]}>الدفتر السري</Text>
          <Text style={[styles.lockSubtitle, { color: theme.textSecondary }]}>
            سجّل أدعيةك الشخصية هنا. لا يُشاركه مع أحد.
          </Text>
          <TouchableOpacity
            style={[styles.unlockButton, { backgroundColor: theme.neon }]}
            onPress={() => setShowPinModal(true)}
          >
            <Text style={styles.unlockButtonText}>تعيين رمز سري</Text>
          </TouchableOpacity>
        </View>

        {/* PIN Setup Modal */}
        <Modal visible={showPinModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
              <Ionicons name="lock-open" size={48} color={theme.neon} />
              <Text style={[styles.modalTitle, { color: theme.text }]}>تعيين رمز سري</Text>
              <Text style={[styles.modalSubtitle, { color: theme.textSecondary }]}>
                أدخل رمز مكون من 4 أرقام لحماية دفترك
              </Text>
              <TextInput
                style={[styles.pinInput, { backgroundColor: theme.cardSecondary, color: theme.text, borderColor: theme.border }]}
                placeholder="0000"
                placeholderTextColor={theme.textSecondary}
                value={inputPin}
                onChangeText={setInputPin}
                keyboardType="numeric"
                maxLength={4}
                textAlign="center"
                secureTextEntry
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: theme.neon }]}
                  onPress={() => {
                    if (inputPin.length === 4) {
                      setPinCode(inputPin);
                      setIsDiaryUnlocked(true);
                      setShowPinModal(false);
                      setInputPin('');
                    }
                  }}
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
        </Modal>
      </View>
    );
  }

  // Diary is unlocked - show entries
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setIsDiaryUnlocked(false)}>
          <Ionicons name="lock-closed" size={24} color={theme.neon} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>الدفتر السري</Text>
        <TouchableOpacity onPress={() => setShowAddModal(true)}>
          <Ionicons name="add-circle" size={28} color={theme.neon} />
        </TouchableOpacity>
      </View>

      {/* Entries List */}
      {entries.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text" size={64} color={theme.textSecondary} />
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            لا توجد أدعية بعد
          </Text>
          <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
            اضغط + لإضافة دعاء جديد
          </Text>
        </View>
      ) : (
        <FlatList
          data={entries}
          renderItem={renderEntry}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.entriesList}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Add Entry Modal */}
      <Modal visible={showAddModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>إضافة دعاء جديد</Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: theme.cardSecondary, color: theme.text, borderColor: theme.border }]}
              placeholder="اكتب دعاءك هنا..."
              placeholderTextColor={theme.textSecondary}
              value={newEntryText}
              onChangeText={setNewEntryText}
              multiline
              numberOfLines={5}
              textAlign="right"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: theme.neon }]}
                onPress={handleAddEntry}
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

      {/* Edit Entry Modal */}
      <Modal visible={showEditModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>تعديل الدعاء</Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: theme.cardSecondary, color: theme.text, borderColor: theme.border }]}
              placeholder="اكتب دعاءك هنا..."
              placeholderTextColor={theme.textSecondary}
              value={newEntryText}
              onChangeText={setNewEntryText}
              multiline
              numberOfLines={5}
              textAlign="right"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: theme.neon }]}
                onPress={handleEditEntry}
              >
                <Text style={styles.modalButtonText}>حفظ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: theme.danger }]}
                onPress={() => setShowEditModal(false)}
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
  lockContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  lockTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
  },
  lockSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  unlockButton: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
  },
  unlockButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
  },
  entriesList: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  entryCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  entryText: {
    fontSize: 16,
    textAlign: 'right',
    lineHeight: 24,
    marginBottom: 12,
  },
  entryDate: {
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 12,
  },
  entryActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  entryButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
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
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    marginBottom: 16,
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
  textArea: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    fontSize: 16,
    marginBottom: 24,
    textAlignVertical: 'top',
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
