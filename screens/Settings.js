import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { View, StyleSheet, Switch, Text } from "react-native";

import { themeActions } from "../store/themeSlice";

function Settings() {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);
  const colors = useSelector((state) => state.theme.colors);
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.container}>
      <Text style={styles.caption}>Choose color theme:</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.caption}>Light</Text>
        <Switch
          value={isDark}
          onValueChange={() => dispatch(themeActions.toggle())}
          trackColor={{
            false: colors.grey300,
            true: colors.primary300,
          }}
          thumbColor={colors.primary900}
          ios_backgroundColor={colors.primary200}
          style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
        />
        <Text style={styles.caption}>Dark</Text>
      </View>
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.appBackground,
  },
  switchContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 100,
  },
  caption: {
    fontSize: 18,
    margin: 30,
    color: colors.fontMain,
  },
});

export default Settings;
