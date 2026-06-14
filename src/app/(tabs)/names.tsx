import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  TextInput,
  StyleSheet,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { namesOfAllah, AllahName } from '@/data/namesOfAllah';

export default function NamesScreen() {
  const { theme, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedName, setSelectedName] = useState<AllahName | null>(null);

  const filteredNames = namesOfAllah.filter(
    (name) =>
      name.name.includes(searchQuery) ||
      name.meaning.includes(searchQuery)
  );

  const renderNameItem = ({ item }: { item: AllahName }) => (
    <TouchableOpacity
      style={[
        styles.nameCard,
        { 
          backgroundColor: theme.card, 
          borderColor: theme.border,
        },
      ]}
      onPress={() => setSelectedName(item)}
    >
      <Text style={[styles.nameText, { color: theme.neon }]}>{item.name}</Text>
      <Text style={[styles.meaningText, { color: theme.textSecondary }]} numberOfLines={2}>
        {item.meaning}
      </Text>
      <View style={styles.nameId}>
        <Text style={[styles.nameIdText, { color: theme.textSecondary }]}>{item.id}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>أسماء الله الحسنى</Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          99 اسماً من أسماء الله الحسنى
        </Text>
      </View>

      {/* Search Bar */}
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

      {/* Names Grid */}
      <FlatList
        data={filteredNames}
        renderItem={renderNameItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.namesRow}
        contentContainerStyle={styles.namesList}
        showsVerticalScrollIndicator={false}
      />

      {/* Name Detail Modal */}
      <Modal visible={selectedName !== null} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            {selectedName && (
              <>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={() => setSelectedName(null)}>
                    <Ionicons name="close" size={28} color={theme.textSecondary} />
                  </TouchableOpacity>
                </View>
                
                <Text style={[styles.modalName, { color: theme.neon }]}>
                  {selectedName.name}
                </Text>
                
                <View style={[styles.modalSection, { backgroundColor: theme.cardSecondary }]}>
                  <Text style={[styles.modalSectionTitle, { color: theme.text }]}>المعنى</Text>
                  <Text style={[styles.modalSectionText, { color: theme.textSecondary }]}>
                    {selectedName.meaning}
                  </Text>
                </View>
                
                <View style={[styles.modalSection, { backgroundColor: theme.cardSecondary }]}>
                  <Text style={[styles.modalSectionTitle, { color: theme.text }]}>كيف أطبقها في حياتي؟</Text>
                  <Text style={[styles.modalSectionText, { color: theme.textSecondary }]}>
                    {selectedName.application}
                  </Text>
                </View>
                
                <View style={[styles.modalNumber, { backgroundColor: theme.neon }]}>
                  <Text style={styles.modalNumberText}>{selectedName.id}</Text>
                </View>
              </>
            )}
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  namesList: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  namesRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  nameCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  meaningText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  nameId: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  nameIdText: {
    fontSize: 10,
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
    maxHeight: '80%',
  },
  modalHeader: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  modalName: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 8,
  },
  modalSectionText: {
    fontSize: 14,
    textAlign: 'right',
    lineHeight: 22,
  },
  modalNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modalNumberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
