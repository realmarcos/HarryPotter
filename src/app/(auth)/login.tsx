import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function LoginScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { signIn } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    try {
      signIn(identifier, password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.lightning, { color: theme.colors.primary }]}>
            ⚡
          </Text>
          <Text
            variant="headlineLarge"
            style={[styles.title, { color: theme.colors.primary }]}
          >
            Harry Potter
          </Text>
          <Text
            variant="bodyMedium"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            Entre no mundo mágico
          </Text>
        </View>

        {/* Form card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.outlineVariant,
            },
          ]}
        >
          <Text
            variant="titleLarge"
            style={[styles.cardTitle, { color: theme.colors.onSurface }]}
          >
            Entrar
          </Text>

          <TextInput
            label="Usuário ou e-mail"
            value={identifier}
            onChangeText={setIdentifier}
            mode="outlined"
            left={<TextInput.Icon icon="account-outline" />}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            style={styles.input}
          />

          <TextInput
            label="Senha"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry={!showPassword}
            left={<TextInput.Icon icon="lock-outline" />}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off-outline" : "eye-outline"}
                onPress={() => setShowPassword((v) => !v)}
              />
            }
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.primaryButton}
            contentStyle={styles.buttonContent}
          >
            Entrar
          </Button>

          <View style={styles.dividerRow}>
            <View
              style={[
                styles.dividerLine,
                { backgroundColor: theme.colors.outlineVariant },
              ]}
            />
            <Text
              variant="bodySmall"
              style={{
                color: theme.colors.onSurfaceVariant,
                marginHorizontal: 8,
              }}
            >
              ou
            </Text>
            <View
              style={[
                styles.dividerLine,
                { backgroundColor: theme.colors.outlineVariant },
              ]}
            />
          </View>

          <Button
            mode="outlined"
            onPress={() => router.push("/(auth)/register")}
            style={styles.secondaryButton}
            contentStyle={styles.buttonContent}
          >
            Criar conta
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  lightning: {
    fontSize: 64,
    marginBottom: 8,
  },
  title: {
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 4,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    gap: 12,
  },
  cardTitle: {
    fontWeight: "700",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "transparent",
  },
  primaryButton: {
    marginTop: 4,
    borderRadius: 10,
  },
  secondaryButton: {
    borderRadius: 10,
  },
  buttonContent: {
    height: 48,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
});
