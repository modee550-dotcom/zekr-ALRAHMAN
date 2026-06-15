import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { useStatsStore } from '@/stores/statsStore';
import { useAdhkarStore } from '@/stores/adhkarStore';
import { BarChart } from 'react-native-gifted-charts';

export default function StatsScreen() {
  const { theme, isDark } = useTheme();
  const { totalRecitations, daysActive, streak, weekData, gender, ageGroup } = useStatsStore();
  const { azkar } = useAdhkarStore();

  const totalCompleted = azkar.reduce((sum, item) => sum + item.completed, 0);
  const weeklyPercentage = weekData.length > 0 
    ? Math.round(weekData.reduce((sum, day) => sum + day.percentage, 0) / weekData.length)
    : 0;

  const barData = weekData.map((day, index) => ({
    value: day.percentage,
    label: getDayLabel(day.date),
    frontColor: day.percentage >= 100 ? theme.success : theme.neon,
    topLabelStyle: { color: theme.textSecondary, fontSize: 10 },
  }));

  const stats = [
    { icon: 'book', label: 'إجمالي الأذكار', value: totalRecitations.toString() },
    { icon: 'checkmark-circle', label: 'الأذكار المكتملة', value: totalCompleted.toString() },
    { icon: 'flame', label: 'أيام متتالية', value: streak.toString() },
    { icon: 'calendar', label: 'أيام نشطة', value: daysActive.toString() },
    { icon: 'person', label: 'الجنس', value: gender },
    { icon: 'people', label: 'الفئة العمرية', value: ageGroup },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>الإحصائيات</Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>تتبع تقدمك الأسبوعي</Text>
        </View>

        {/* Weekly Percentage Card */}
        <View style={[styles.percentageCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.percentageLabel, { color: theme.textSecondary }]}>نسبة الإنجاز الأسبوعية</Text>
          <Text style={[styles.percentageValue, { color: theme.neon }]}>{weeklyPercentage}%</Text>
          <View style={[styles.progressBar, { backgroundColor: theme.progressBg }]}>
            <View style={[styles.progressFill, { width: `${weeklyPercentage}%`, backgroundColor: theme.progress }]} />
          </View>
        </View>

        {/* Weekly Chart */}
        <View style={[styles.chartCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.chartTitle, { color: theme.text }]}>تقرير الأسبوع</Text>
          <View style={styles.chartContainer}>
            <BarChart
              data={barData}
              barWidth={28}
              spacing={16}
              roundedTop
              noOfSections={4}
              yAxisThickness={0}
              xAxisThickness={1}
              xAxisColor={theme.border}
              yAxisTextStyle={{ color: theme.textSecondary, fontSize: 10 }}
              xAxisLabelTextStyle={{ color: theme.textSecondary, fontSize: 10 }}
              isAnimated
              barBorderRadius={4}
            />
          </View>
          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: theme.neon }]} />
              <Text style={[styles.legendText, { color: theme.textSecondary }]}>أقل من 100%</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: theme.success }]} />
              <Text style={[styles.legendText, { color: theme.textSecondary }]}>100% مكتمل</Text>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View 
              key={index} 
              style={[
                styles.statCard, 
                { 
                  backgroundColor: theme.card, 
                  borderColor: theme.border,
                  width: '48%',
                }
              ]}
            >
              <Ionicons name={stat.icon as any} size={24} color={theme.neon} />
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{stat.label}</Text>
              <Text style={[styles.statValue, { color: theme.text }]}>{stat.value}</Text>
            </View>
          ))}
        </View>

        {/* Motivational Quote */}
        <View style={[styles.quoteCard, { backgroundColor: theme.cardSecondary, borderColor: theme.border }]}>
          <Ionicons name="heart" size={24} color={theme.neonSecondary} />
          <Text style={[styles.quoteText, { color: theme.text }]}>
            "{azkar.length > 0 ? 'استمر في الذكر فإنه طمأنينة للقلب' : 'ابدأ اليوم بذكر الله'}"
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function getDayLabel(dateStr: string): string {
  const date = new Date(dateStr);
  const days = [' أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت'];
  return days[date.getDay()];
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  percentageCard: {
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  percentageLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  percentageValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressBar: {
    width: '100%',
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  chartCard: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 16,
  },
  chartContainer: {
    height: 200,
    marginVertical: 16,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  quoteCard: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 40,
  },
  quoteText: {
    flex: 1,
    fontSize: 14,
    textAlign: 'right',
    fontStyle: 'italic',
  },
});
