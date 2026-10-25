import { useSelector } from "react-redux";
import { View, Text, StyleSheet, Image } from "react-native";
import { useState, useMemo } from "react";

import WordCard from "../../components/WordCard";
import { selectWordsToLearn } from "../../store/wordsLearningSlice";

export default function Play() {
  const colors = useSelector((state) => state.theme.colors);
  const styles = useMemo(() => createStyles(colors), [colors]);
  const wordsToStudy = useSelector(selectWordsToLearn);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  return (
    <View style={styles.container}>
      {wordsToStudy.length === 0 ? (
        <>
          <Text style={[styles.text, { alignSelf: "center" }]}>Congrats!</Text>
          <Text style={styles.text}>For now you have learnt all the words</Text>
          <Image
            style={styles.image}
            source={require("../../assets/well-done-icon.png")}
          />
        </>
      ) : (
        <WordCard
          wordInfo={wordsToStudy[currentWordIndex % wordsToStudy.length]}
          setNext={() =>
            setCurrentWordIndex(
              (currentWordIndex) => (currentWordIndex + 1) % wordsToStudy.length
            )
          }
        />
      )}
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  text: {
    color: colors.fontMain,
    fontSize: 22,
    margin: 10,
    marginTop: 25,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    alignSelf: "center",
    resizeMode: "contain",
  },
});
