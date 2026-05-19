import React from "react";
import { StyleSheet, View } from "react-native";
import { Divider, List, Switch, Text, useTheme } from "react-native-paper";

import { useAuth } from "@/contexts/auth-context";
import { useAppTheme } from "@/contexts/theme-context";

export default function SettingScreen() {
  const { signOut } = useAuth();
  const { isDark, toggleTheme } = useAppTheme();
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text
        variant="titleMedium"
        style={[styles.sectionTitle, { color: theme.colors.onSurfaceVariant }]}
      >
        Aparência
      </Text>

      <View
        style={[styles.card, { backgroundColor: theme.colors.surfaceVariant }]}
      >
        <List.Item
          title="Modo escuro"
          description={isDark ? "Tema escuro ativado" : "Tema claro ativado"}
          titleStyle={{ color: theme.colors.onSurface }}
          descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
          left={(props) => (
            <List.Icon
              {...props}
              icon={isDark ? "weather-night" : "white-balance-sunny"}
              color={theme.colors.primary}
            />
          )}
          right={() => <Switch value={isDark} color={theme.colors.primary} />}
          onPress={toggleTheme}
          style={styles.listItem}
        />
        <Divider style={{ backgroundColor: theme.colors.outlineVariant }} />

        <List.Item
          title="Sair"
          titleStyle={{ color: theme.colors.onSurface }}
          left={(props) => (
            <List.Icon {...props} icon="logout" color={theme.colors.primary} />
          )}
          onPress={signOut}
          style={styles.listItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    borderRadius: 12,
    overflow: "hidden",
  },
  listItem: {
    paddingVertical: 4,
  },
});
