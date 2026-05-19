import { Image } from "expo-image";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  Divider,
  IconButton,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";

import { useAuth } from "@/contexts/auth-context";
import { useFavorites } from "@/contexts/favorites-context";
import { FavoriteItem } from "@/types/potter-api";

const CATEGORY_LABEL: Record<string, string> = {
  books: "📚 Livro",
  characters: "👤 Personagem",
  spells: "🪄 Magia",
  houses: "🏠 Casa",
};

export default function HomeScreen() {
  const theme = useTheme();
  const { session } = useAuth();
  const { favorites, removeFavorite } = useFavorites();

  const renderFavorite = ({ item }: { item: FavoriteItem }) => (
    <Surface
      style={[styles.card, { backgroundColor: theme.colors.surface }]}
      elevation={1}
    >
      {item.image ? (
        <Image
          source={{ uri: item.image }}
          style={styles.thumb}
          contentFit="cover"
        />
      ) : (
        <View
          style={[
            styles.thumbPlaceholder,
            { backgroundColor: theme.colors.primaryContainer },
          ]}
        >
          <Text style={styles.thumbEmoji}>{item.emoji ?? "🪄"}</Text>
        </View>
      )}

      <View style={styles.cardBody}>
        <Text
          variant="labelSmall"
          style={{ color: theme.colors.primary, fontWeight: "700" }}
        >
          {CATEGORY_LABEL[item.type]}
        </Text>
        <Text
          variant="titleSmall"
          numberOfLines={1}
          style={{ color: theme.colors.onSurface }}
        >
          {item.title}
        </Text>
        {item.subtitle ? (
          <Text
            variant="bodySmall"
            numberOfLines={1}
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            {item.subtitle}
          </Text>
        ) : null}
      </View>

      <IconButton
        icon="heart-remove-outline"
        iconColor={theme.colors.error}
        size={20}
        onPress={() => removeFavorite(item.id)}
      />
    </Surface>
  );

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
      {/* Header banner */}
      <View
        style={[
          styles.header,
          { backgroundColor: theme.colors.primaryContainer },
        ]}
      >
        <Text style={styles.lightning}>⚡</Text>
        <View>
          <Text
            variant="headlineSmall"
            style={{
              color: theme.colors.onPrimaryContainer,
              fontWeight: "800",
            }}
          >
            Olá, {session?.userName ?? "Bruxo"}!
          </Text>
          <Text
            variant="bodyMedium"
            style={{ color: theme.colors.onPrimaryContainer, opacity: 0.85 }}
          >
            Bem-vindo ao mundo mágico
          </Text>
        </View>
      </View>

      {/* Favorites section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.onBackground, fontWeight: "700" }}
          >
            Meus Favoritos
          </Text>
          {favorites.length > 0 && (
            <Text
              variant="labelMedium"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              {favorites.length} {favorites.length === 1 ? "item" : "itens"}
            </Text>
          )}
        </View>

        <Divider
          style={{
            backgroundColor: theme.colors.outlineVariant,
            marginBottom: 12,
          }}
        />

        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderFavorite}
          contentContainerStyle={
            favorites.length === 0 ? styles.emptyContainer : styles.list
          }
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyIcon}>🧙</Text>
              <Text
                variant="titleMedium"
                style={{
                  color: theme.colors.onSurfaceVariant,
                  marginTop: 12,
                  fontWeight: "700",
                }}
              >
                Nenhum favorito ainda
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  color: theme.colors.onSurfaceVariant,
                  textAlign: "center",
                  marginTop: 6,
                  opacity: 0.75,
                }}
              >
                Explore o mundo mágico e toque no ♥{"\n"}para salvar seus
                favoritos
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 14,
  },
  lightning: { fontSize: 48 },

  // Section
  section: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  // List
  list: { gap: 10, paddingBottom: 24 },

  // Favorite card
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    padding: 10,
    gap: 10,
  },
  thumb: { width: 52, height: 52, borderRadius: 10 },
  thumbPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  thumbEmoji: { fontSize: 26 },
  cardBody: { flex: 1 },

  // Empty state
  emptyContainer: { flex: 1 },
  emptyBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  emptyIcon: { fontSize: 64 },
});
