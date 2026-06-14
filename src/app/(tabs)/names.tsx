import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { AllahName } from '@/data/namesOfAllah';
import { useNameStatsStore } from '@/stores/nameStatsStore';

export default function NamesScreen() {
  const { theme, isDark } = useTheme();
  const { names, incrementName, resetName, updateName } = useNameStatsStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedName, setSelectedName] = useState<AllahName | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'counter'>('info');

  const filteredNames = names.filter(
    (name) => name.name.includes(searchQuery) || name.meaning.includes(searchQuery)
  );

  const renderNameItem = ({ item }: { item: AllahName }) => {
    const progress = item.target > 0 ? Math.min(100, Math.round((item.dailyCount / item.target) * 100)) : 0;
    return (
      <TouchableOpacity
        style={[styles.nameCard, { backgroundColor: theme.card, borderColor: theme.border }]}
        onPress={() => { setSelectedName(item); setActiveTab('info'); }}
      >
        <Text style={[styles.nameText, { color: item.color || theme.neon }]}>{item.name}</Text>
        <Text style={[styles.meaningText, { color: theme.textSecondary }]} numberOfLines={2}>
          {item.meaning}
        </Text>
        <View style={styles.statsRow}>
          <Text style={[styles.statsText, { color: theme.textSecondary }]}>
            {item.dailyCount}/{item.target}
          </Text>
          <Ionicons name="checkmark-circle" size={14} color={progress >= 100 ? theme.success : theme.textSecondary} />
        </View>
        <View style={[styles.miniProgress, { backgroundColor: theme.progressBg }]}>
          <View style={[styles.miniProgressFill, { width: `${progress}%`, backgroundColor: progress >= 100 ? theme.success : theme.progress }]} />
        </View>
        <View style={styles.nameId}>
          <Text style={[styles.nameIdText, { color: theme.textSecondary }]}>{item.id}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>أسماء الله الحسنى</Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          99 اسماً من أسماء الله الحسنى
        </Text>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Ionicons name="search" size={20} color={theme.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="ابحث عن اسم..."
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          textAlign="right"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredNames}
        renderItem={renderNameItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.namesRow}
        contentContainerStyle={styles.namesList}
        showsVerticalScrollIndicator={false}
      />

      <Modal visible={selectedName !== null} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <ScrollView style={[styles.modalContent, { backgroundColor: theme.card, maxHeight: '85%' }]}>
            {selectedName && (
              <>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={() => setSelectedName(null)}>
                    <Ionicons name="close" size={28} color={theme.textSecondary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setActiveTab(activeTab === 'info' ? 'counter' : 'info')}
                    style={[styles.tabSwitch, { backgroundColor: theme.cardSecondary }]}
                  >
                    <Ionicons
                      name={activeTab === 'info' ? 'analytics' : 'information-circle'}
                      size={20}
                      color={theme.neon}
                    />
                    <Text style={[styles.tabSwitchText, { color: theme.neon }]}>
                      {activeTab === 'info' ? 'المسبحة' : 'التفاصيل'}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={[styles.modalName, { color: selectedName.color || theme.neon }]}>
                  {selectedName.name}
                </Text>

                {activeTab === 'info' ? (
                  <>
                    <View style={[styles.modalSection, { backgroundColor: theme.cardSecondary }]}>
                      <Text style={[styles.modalSectionTitle, { color: theme.text }]}>المعنى</Text>
                      <Text style={[styles.modalSectionText, { color: theme.textSecondary }]}>
                        {selectedName.meaning}
                      </Text>
                    </View>
                    <View style={[styles.modalSection, { backgroundColor: theme.cardSecondary }]}>
                      <Text style={[styles.modalSectionTitle, { color: theme.text }]}>التطبيق العملي</Text>
                      <Text style={[styles.modalSectionText, { color: theme.textSecondary }]}>
                        {selectedName.application}
                      </Text>
                    </View>
                  </>
                ) : (
                  <View style={styles.counterContainer}>
                    <Text style={[styles.counterLabel, { color: theme.textSecondary }]}>التسبيح</Text>
                    <View style={[styles.counterCircle, { borderColor: selectedName.color || theme.neon }]}>
                      <Text style={[styles.counterNumber, { color: selectedName.color || theme.neon }]}>
                        {selectedName.dailyCount}
                      </Text>
                      <Text style={[styles.counterTarget, { color: theme.textSecondary }]}>
                        / {selectedName.target}
                      </Text>
                    </View>

                    <View style={styles.counterButtons}>
                      <TouchableOpacity
                        style={[styles.counterBtn, { backgroundColor: selectedName.color || theme.neon }]}
                        onPress={() => incrementName(selectedName.id)}
                      >
                        <Ionicons name="add" size={28} color="#fff" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.counterBtn, { backgroundColor: theme.danger }]}
                        onPress={() => resetName(selectedName.id)}
                      >
                        <Ionicons name="refresh" size={24} color="#fff" />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.statsGrid}>
                      <View style={[styles.statItem, { backgroundColor: theme.cardSecondary }]}>
                        <Text style={[styles.statValue, { color: selectedName.color || theme.neon }]}>
                          {selectedName.dailyCount}
                        </Text>
                        <Text style={[styles.statLabel, { color: theme.textSecondary }]}>اليوم</Text>
                      </View>
                      <View style={[styles.statItem, { backgroundColor: theme.cardSecondary }]}>
                        <Text style={[styles.statValue, { color: selectedName.color || theme.neon }]}>
                          {selectedName.weeklyCount}
                        </Text>
                        <Text style={[styles.statLabel, { color: theme.textSecondary }]}>الأسبوع</Text>
                      </View>
                      <View style={[styles.statItem, { backgroundColor: theme.cardSecondary }]}>
                        <Text style={[styles.statValue, { color: selectedName.color || theme.neon }]}>
                          {selectedName.totalCount}
                        </Text>
                        <Text style={[styles.statLabel, { color: theme.textSecondary }]}>الإجمالي</Text>
                      </View>
                    </View>

                    <View style={[styles.progressSection, { backgroundColor: theme.cardSecondary }]}>
                      <Text style={[styles.progressLabel, { color: theme.text }]}>تقدم الهدف</Text>
                      <View style={[styles.progressBar, { backgroundColor: theme.progressBg }]}>
                        <View style={[styles.progressFill, {
                          width: `${Math.min(100, Math.round((selectedName.dailyCount / selectedName.target) * 100))}%`,
                          backgroundColor: selectedName.color || theme.neon
                        }]} />
                      </View>
                      {selectedName.lastUsed && (
                        <Text style={[styles.lastUsed, { color: theme.textSecondary }]}>
                          آخر استخدام: {new Date(selectedName.lastUsed).toLocaleDateString('ar-EG')}
                        </Text>
                      )}
                    </View>
                  </View>
                )}

                <View style={[styles.modalNumber, { backgroundColor: selectedName.color || theme.neon }]}>
                  <Text style={styles.modalNumberText}>{selectedName.id}</Text>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  header: { alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 4 },
  headerSubtitle: { fontSize: 14 },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', marginHorizontal: 20,
    paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12,
    borderWidth: 1, marginBottom: 20, gap: 12,
  },
  searchInput: { flex: 1, fontSize: 16 },
  namesList: { paddingHorizontal: 16, paddingBottom: 40 },
  namesRow: { justifyContent: 'space-between', marginBottom: 12 },
  nameCard: {
    width: '48%', padding: 16, borderRadius: 12, borderWidth: 1, alignItems: 'center',
  },
  nameText: { fontSize: 18, fontWeight: 'bold', marginBottom: 4, textAlign: 'center' },
  meaningText: { fontSize: 11, textAlign: 'center', lineHeight: 16, marginBottom: 8 },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statsText: { fontSize: 11 },
  miniProgress: { width: '100%', height: 3, borderRadius: 2, overflow: 'hidden', marginTop: 6 },
  miniProgressFill: { height: '100%', borderRadius: 2 },
  nameId: {
    position: 'absolute', top: 8, left: 8,
    backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 12,
    paddingHorizontal: 8, paddingVertical: 2,
  },
  nameIdText: { fontSize: 10 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', padding: 20 },
  modalContent: { borderRadius: 20, padding: 24 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  tabSwitch: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, gap: 6 },
  tabSwitchText: { fontSize: 12, fontWeight: '600' },
  modalName: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  modalSection: { padding: 16, borderRadius: 12, marginBottom: 16 },
  modalSectionTitle: { fontSize: 16, fontWeight: '600', textAlign: 'right', marginBottom: 8 },
  modalSectionText: { fontSize: 14, textAlign: 'right', lineHeight: 22 },
  modalNumber: {
    width: 40, height: 40, borderRadius: 20, alignItems: 'center',
    justifyContent: 'center', alignSelf: 'center', marginTop: 16,
  },
  modalNumberText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  counterContainer: { alignItems: 'center', marginBottom: 16 },
  counterLabel: { fontSize: 14, marginBottom: 16 },
  counterCircle: {
    width: 180, height: 180, borderRadius: 90, borderWidth: 4,
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  counterNumber: { fontSize: 48, fontWeight: 'bold' },
  counterTarget: { fontSize: 16 },
  counterButtons: { flexDirection: 'row', gap: 16, marginBottom: 24 },
  counterBtn: {
    width: 56, height: 56, borderRadius: 28,
    alignItems: 'center', justifyContent: 'center',
  },
  statsGrid: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  statItem: { flex: 1, padding: 12, borderRadius: 12, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: 'bold' },
  statLabel: { fontSize: 12, marginTop: 4 },
  progressSection: { padding: 16, borderRadius: 12, width: '100%' },
  progressLabel: { fontSize: 14, fontWeight: '600', textAlign: 'right', marginBottom: 8 },
  progressBar: { width: '100%', height: 8, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  lastUsed: { fontSize: 11, marginTop: 8, textAlign: 'right' },
});
