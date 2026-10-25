import { useSelector } from "react-redux";
import { useMemo } from "react";
import { View, StyleSheet, Text, StatusBar, Pressable } from "react-native";
import StatisticsInfo from "../../components/StatisticsInfo";
import ImagePile from "../../components/ImagePile";

export default function Statistics() {
  const colors = useSelector((state) => state.theme.colors);
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={[styles.container, { backgroundColor: colors.appBackground }]}>
      <StatisticsInfo />
      <ImagePile />
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
  container: {
    flex: 1,
  },
});
