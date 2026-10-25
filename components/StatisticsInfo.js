import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import InfoCard from "./InfoCard";
import { selectStatistics } from "../store/wordsLearningSlice";

function StatisticsInfo() {
  const isDark = useSelector((state) => state.theme.isDark);
  const { toLearn, inProcess, learned } = useSelector(selectStatistics);

  return (
    <View style={styles.container}>
      <InfoCard
        caption={"To learn"}
        number={toLearn}
        color={isDark ? "hotpink" : "mediumvioletred"}
      />
      <InfoCard
        caption={"In process"}
        number={inProcess}
        color={isDark ? "lightgreen" : "green"}
      />
      <InfoCard
        caption={"Learned"}
        number={learned}
        color={isDark ? "lightblue" : "mediumblue"}
      />
    </View>
  );
}

export default StatisticsInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: "20%",
  },
});
