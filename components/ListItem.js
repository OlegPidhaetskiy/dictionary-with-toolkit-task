import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { View, StyleSheet, Text, StatusBar, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { playSound } from "../services/soundHandler";
import { wordsLearningActions } from "../store/wordsLearningSlice";

function Item({ item }) {
  const colors = useSelector((state) => state.theme.colors);
  const styles = useMemo(() => createStyles(colors), [colors]);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.item}>
      <Pressable disabled={!item.audio} onPress={() => playSound(item.audio)}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="play-outline"
            size={28}
            style={
              !item.audio
                ? { color: colors.grey300 }
                : { color: colors.primary900 }
            }
          />
        </View>
      </Pressable>
      <Pressable
        style={styles.textContainer}
        onPress={() => navigation.navigate("EditWord", { wordData: item })}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.title}>{item.word}</Text>
          <Ionicons
            name={`battery-${
              item.status === 0 ? "dead" : item.status === 1 ? "half" : "full"
            }-sharp`}
            size={18}
            color={colors.primary900}
          />
        </View>
        <Text style={styles.definition}>{item.meaning}</Text>
      </Pressable>
      <Pressable
        style={styles.iconContainer}
        onPress={() => dispatch(wordsLearningActions.removeWord(item.word))}
      >
        <Ionicons
          name="trash-outline"
          size={22}
          color={colors.secondary800}
        />
      </Pressable>
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    item: {
      zIndex: -10,
      backgroundColor: colors.fontInverse,
      flexDirection: "row",
      marginVertical: 6,
      marginHorizontal: 5,
      alignItems: "center",
      paddingHorizontal: 5,
      borderRadius: 8,
      elevation: 4,
    },
    title: {
      fontSize: 20,
      fontWeight: "800",
      color: colors.fontMain,
      paddingRight: 20,
    },
    definition: {
      fontSize: 16,
      color: colors.fontMain,
    },
    iconContainer: {
      padding: 3,
      borderRadius: 20,
    },
    textContainer: {
      flex: 1,
      paddingLeft: 10,
      paddingBottom: 5,
    },
  });

export default Item;
