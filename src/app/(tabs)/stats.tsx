import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useTheme } from '@/hooks/useTheme';
import { useStatsStore } from '@/stores/statsStore';
import { useAdhkarStore } from '@/stores/adhkarStore';
import { BarChart } from 'react-native-gifted-charts';

const { width } = Dimensions.get('window');

function HeartProgress({ progress, color, secondaryColor }: { progress: number; color: string; secondaryColor: string }) {
  const size = width * 0.5;
  const strokeWidth = 8;
  const heartPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
  
  return (
    <View style={styles.heartContainer}>
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Defs>
          <LinearGradient id="heartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <Stop offset={`${progress}%`} stopColor={color} stopOpacity="0.3" />
            <Stop offset={`${progress}%`} stopColor={secondaryColor} stopOpacity="0.1" />
            <Stop offset="100%" stopColor={secondaryColor} stopOpacity="0.1" />
          </LinearGradient>
          <LinearGradient id="heartStroke" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={color} />
            <Stop offset="100%" stopColor={secondaryColor} />
          </LinearGradient>
        </Defs>
        <Path
          d={heartPath}
          fill="url(#heartGrad)"
          stroke="url(#heartStroke)"
          strokeWidth={strokeWidth / size * 24}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
      <View style={styles.heartOverlay}>
        <Text style={[styles.heartPercentage, { color }]}>{progress}%</Text>
        <Text style={[styles.heartLabel, { color: secondaryColor }]}>التقدم الروحي</Text>
      </View>
    </View>
  );
}

export default function StatsScreen() {
  const { theme, isDark } = useTheme();
  const { totalRecitations, daysActive, streak, weekData, gender, ageGroup } = useStatsStore();
  const { azkar } = useAdhkarStore();

  const totalCompleted = azkar.reduce((sum, item) => sum + item.completed, 0);
  const totalTarget = azkar.reduce((sum, item) => sum + item.count, 0);
  const weeklyPercentage = weekData.length > 0 
    ? Math.round(weekData.reduce((sum, day) => sum + day.percentage, 0) / weekData.length)
    : 0;

  const barData = weekData.map((day) => ({
    value: day.percentage,
    label: getDayLabel(day.date),
    frontColor: day.percentage >= 100 ? theme.success : theme.neon,
    topLabelStyle: { color: theme.textSecondary, fontSize: 10 },
  }));

  const stats = [
    { icon: 'book', label: 'إجمالي الأذكار', value: totalRecitations.toString(), color: theme.neon },
    { icon: 'checkmark-circle', label: 'المكتملة', value: totalCompleted.toString(), color: theme.success },
    { icon: 'flame', label: 'أيام متتالية', value: streak.toString(), color: theme.neonSecondary },
    { icon: 'calendar', label: 'أيام نشطة', value: daysActive.toString(), color: theme.neonCyan },
  ];

  const motivationalQuotes = [
    'استمر في الذكر فإنه طمأنينة للقلب',
    'ذكر الله تعالى يزيل الهموم',
    'القلوب تطمن بالذكر',
    'اللهم صل وسلم على نبينا محمد',
  ];
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>الإحصائيات</Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>تتبع تقدمك الروحي</Text>
        </View>

        {/* Heart Progress */}
        <View style={[styles.heartCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <HeartProgress 
            progress={weeklyPercentage} 
            color={theme.neon} 
            secondaryColor={theme.neonSecondary} 
          />
          <Text style={[styles.heartCardSubtitle, { color: theme.textSecondary }]}>
            نسبة الإنجاز الأسبوعية
          </Text>
        </View>

        {/* Quick Stats Row */}
        <View style={styles.quickStatsRow}>
          {stats.map((stat, index) => (
            <View 
              key={index} 
              style={[styles.quickStatCard, { backgroundColor: theme.card, borderColor: theme.border }]}
            >
              <Ionicons name={stat.icon as any} size={20} color={stat.color} />
              <Text style={[styles.quickStatValue, { color: theme.text }]}>{stat.value}</Text>
              <Text style={[styles.quickStatLabel, { color: theme.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Weekly Chart */}
        <View style={[styles.chartCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.chartHeader}>
            <Text style={[styles.chartTitle, { color: theme.text }]}>تقرير الأسبوع</Text>
            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: theme.neon }]} />
                <Text style={[styles.legendText, { color: theme.textSecondary }]}>أقل من 100%</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: theme.success }]} />
                <Text style={[styles.legendText, { color: theme.textSecondary }]}>مكتمل</Text>
              </View>
            </View>
          </View>
          <View style={styles.chartContainer}>
            <BarChart
              data={barData}
              barWidth={24}
              spacing={12}
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
        </View>

        {/* Daily Target Progress */}
        <View style={[styles.targetCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.targetHeader}>
            <Ionicons name="flag" size={24} color={theme.neon} />
            <Text style={[styles.targetTitle, { color: theme.text }]}>الهدف اليومي</Text>
          </View>
          <View style={styles.targetProgress}>
            <View style={[styles.targetBar, { backgroundColor: theme.progressBg }]}>
              <View style={[
                styles.targetFill, 
                { 
                  width: `${Math.min(100, totalTarget > 0 ? (totalCompleted / totalTarget) * 100 : 0)}%`, 
                  backgroundColor: theme.progress 
                }
              ]} />
            </View>
            <Text style={[styles.targetText, { color: theme.textSecondary }]}>
              {totalCompleted} / {totalTarget}
            </Text>
          </View>
        </View>

        {/* Motivational Quote */}
        <View style={[styles.quoteCard, { backgroundColor: theme.cardSecondary, borderColor: theme.border }]}>
          <Ionicons name="heart" size={24} color={theme.neonSecondary} />
          <Text style={[styles.quoteText, { color: theme.text }]}>
            "{randomQuote}"
          </Text>
        </View>

        {/* Personal Info */}
        <View style={[styles.personalCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.personalTitle, { color: theme.text }]}>معلومات شخصية</Text>
          <View style={styles.personalRow}>
            <View style={styles.personalItem}>
              <Ionicons name="person" size={20} color={theme.neon} />
              <Text style={[styles.personalLabel, { color: theme.textSecondary }]}>الجنس</Text>
              <Text style={[styles.personalValue, { color: theme.text }]}>{gender}</Text>
            </View>
            <View style={styles.personalItem}>
              <Ionicons name="people" size={20} color={theme.neonCyan} />
              <Text style={[styles.personalLabel, { color: theme.textSecondary }]}>الفئة</Text>
              <Text style={[styles.personalValue, { color: theme.text }]}>{ageGroup}</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
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
  heartCard: {
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  heartContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartOverlay: {
    position: 'absolute',
    alignItems: 'center',
  },
  heartPercentage: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  heartLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  heartCardSubtitle: {
    fontSize: 14,
    marginTop: 16,
  },
  quickStatsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  quickStatCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  quickStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  quickStatLabel: {
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
  chartCard: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  chartLegend: {
    flexDirection: 'row',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 10,
  },
  chartContainer: {
    height: 180,
    marginVertical: 8,
  },
  targetCard: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  targetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  targetTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  targetProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  targetBar: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  targetFill: {
    height: '100%',
    borderRadius: 5,
  },
  targetText: {
    fontSize: 14,
    fontWeight: '600',
    minWidth: 60,
    textAlign: 'center',
  },
  quoteCard: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  quoteText: {
    flex: 1,
    fontSize: 14,
    textAlign: 'right',
    fontStyle: 'italic',
  },
  personalCard: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  personalTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 16,
  },
  personalRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  personalItem: {
    alignItems: 'center',
    gap: 4,
  },
  personalLabel: {
    fontSize: 12,
  },
  personalValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});
