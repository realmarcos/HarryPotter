import { Image } from "expo-image";
import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Chip,
  IconButton,
  Searchbar,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";

import { useFavorites } from "@/contexts/favorites-context";
import { useHarryAPI } from "@/contexts/harry-api-contexto";
import {
  Book,
  Category,
  Character,
  FavoriteItem,
  House,
  Spell,
} from "@/types/potter-api";

const CATEGORIES: { value: Category; label: string; icon: string }[] = [
  { value: "books", label: "Livros", icon: "book-open-variant" },
  { value: "characters", label: "Personagens", icon: "account-group" },
  { value: "spells", label: "Magias", icon: "auto-fix" },
  { value: "houses", label: "Casas", icon: "home-city" },
];

type AnyItem = Book | Character | Spell | House;

function toFavoriteItem(category: Category, item: AnyItem): FavoriteItem {
  switch (category) {
    case "books": {
      const b = item as Book;
      return {
        id: `book-${b.index}`,
        type: "books",
        title: b.title,
        subtitle: `${b.pages} páginas · ${b.releaseDate}`,
        image: b.cover,
      };
    }
    case "characters": {
      const c = item as Character;
      return {
        id: `character-${c.index}`,
        type: "characters",
        title: c.fullName,
        subtitle: c.hogwartsHouse,
        image: c.image,
      };
    }
    case "spells": {
      const s = item as Spell;
      return {
        id: `spell-${s.index}`,
        type: "spells",
        title: s.spell,
        subtitle: s.use,
      };
    }
    case "houses": {
      const h = item as House;
      return {
        id: `house-${h.index}`,
        type: "houses",
        title: h.house,
        subtitle: `${h.animal} · Fundador: ${h.founder}`,
        emoji: h.emoji,
      };
    }
  }
}

export default function ExploreScreen() {
  const theme = useTheme();
  const { books, characters, spells, houses, isLoading } = useHarryAPI();
  const { width } = useWindowDimensions();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const [category, setCategory] = useState<Category>("books");
  const [searchQuery, setSearchQuery] = useState("");

  const visibleItems = useMemo<AnyItem[]>(() => {
    const source: Record<Category, AnyItem[]> = {
      books,
      characters,
      spells,
      houses,
    };
    const list = source[category];
    const q = searchQuery.trim().toLowerCase();
    if (!q) return list;
    return list.filter((item) => {
      switch (category) {
        case "books": {
          const b = item as Book;
          return (
            b.title.toLowerCase().includes(q) ||
            b.originalTitle.toLowerCase().includes(q)
          );
        }
        case "characters": {
          const c = item as Character;
          return (
            c.fullName.toLowerCase().includes(q) ||
            c.nickname.toLowerCase().includes(q)
          );
        }
        case "spells": {
          const s = item as Spell;
          return (
            s.spell.toLowerCase().includes(q) || s.use.toLowerCase().includes(q)
          );
        }
        case "houses": {
          const h = item as House;
          return h.house.toLowerCase().includes(q);
        }
      }
    });
  }, [category, books, characters, spells, houses, searchQuery]);

  const handleSearch = (text: string) => setSearchQuery(text);

  const toggleFavorite = useCallback(
    (item: AnyItem) => {
      const fav = toFavoriteItem(category, item);
      if (isFavorite(fav.id)) removeFavorite(fav.id);
      else addFavorite(fav);
    },
    [category, isFavorite, addFavorite, removeFavorite],
  );

  // ── renderers ────────────────────────────────────────────────────────────

  const renderBook = (item: Book) => {
    const favId = `book-${item.index}`;
    return (
      <Surface
        style={[styles.card, { backgroundColor: theme.colors.surface }]}
        elevation={1}
      >
        <Image
          source={{ uri: item.cover }}
          style={styles.bookCover}
          contentFit="cover"
        />
        <View style={styles.cardBody}>
          <Text
            variant="titleSmall"
            numberOfLines={2}
            style={{ color: theme.colors.onSurface }}
          >
            {item.title}
          </Text>
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant, marginTop: 2 }}
          >
            {item.pages} páginas
          </Text>
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            {item.releaseDate}
          </Text>
        </View>
        <IconButton
          icon={isFavorite(favId) ? "heart" : "heart-outline"}
          iconColor={
            isFavorite(favId)
              ? theme.colors.primary
              : theme.colors.onSurfaceVariant
          }
          onPress={() => toggleFavorite(item)}
        />
      </Surface>
    );
  };

  const cardWidth = (width - 48) / 2;

  const renderCharacter = (item: Character) => {
    const favId = `character-${item.index}`;
    return (
      <Surface
        style={[
          styles.gridCard,
          { backgroundColor: theme.colors.surface, width: cardWidth },
        ]}
        elevation={1}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.characterImage}
          contentFit="cover"
        />
        <View style={styles.gridBody}>
          <Text
            variant="labelMedium"
            numberOfLines={1}
            style={{ color: theme.colors.onSurface, fontWeight: "700" }}
          >
            {item.nickname}
          </Text>
          <Text
            variant="bodySmall"
            numberOfLines={1}
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            {item.hogwartsHouse}
          </Text>
          <Text
            variant="bodySmall"
            numberOfLines={1}
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            🎬 {item.interpretedBy}
          </Text>
        </View>
        <IconButton
          icon={isFavorite(favId) ? "heart" : "heart-outline"}
          iconColor={
            isFavorite(favId)
              ? theme.colors.primary
              : theme.colors.onSurfaceVariant
          }
          size={18}
          style={styles.gridFavBtn}
          onPress={() => toggleFavorite(item)}
        />
      </Surface>
    );
  };

  const renderSpell = (item: Spell) => {
    const favId = `spell-${item.index}`;
    return (
      <Surface
        style={[styles.card, { backgroundColor: theme.colors.surface }]}
        elevation={1}
      >
        <View
          style={[
            styles.spellBadge,
            { backgroundColor: theme.colors.primaryContainer },
          ]}
        >
          <Text style={styles.wand}>🪄</Text>
        </View>
        <View style={styles.cardBody}>
          <Text
            variant="titleSmall"
            style={{ color: theme.colors.primary, fontWeight: "700" }}
          >
            {item.spell}
          </Text>
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant, marginTop: 2 }}
            numberOfLines={2}
          >
            {item.use}
          </Text>
        </View>
        <IconButton
          icon={isFavorite(favId) ? "heart" : "heart-outline"}
          iconColor={
            isFavorite(favId)
              ? theme.colors.primary
              : theme.colors.onSurfaceVariant
          }
          onPress={() => toggleFavorite(item)}
        />
      </Surface>
    );
  };

  const renderHouse = (item: House) => {
    const favId = `house-${item.index}`;
    return (
      <Surface
        style={[styles.card, { backgroundColor: theme.colors.surface }]}
        elevation={1}
      >
        <View
          style={[
            styles.houseEmojiBadge,
            { backgroundColor: theme.colors.primaryContainer },
          ]}
        >
          <Text style={styles.houseEmoji}>{item.emoji}</Text>
        </View>
        <View style={styles.cardBody}>
          <Text
            variant="titleSmall"
            style={{ color: theme.colors.onSurface, fontWeight: "700" }}
          >
            {item.house}
          </Text>
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant, marginTop: 2 }}
          >
            Fundador: {item.founder}
          </Text>
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            Animal: {item.animal}
          </Text>
          <View style={styles.colorsRow}>
            {item.colors.map((c) => (
              <Chip
                key={c}
                compact
                style={[
                  styles.colorChip,
                  { backgroundColor: theme.colors.secondaryContainer },
                ]}
                textStyle={{
                  color: theme.colors.onSecondaryContainer,
                  fontSize: 10,
                }}
              >
                {c}
              </Chip>
            ))}
          </View>
        </View>
        <IconButton
          icon={isFavorite(favId) ? "heart" : "heart-outline"}
          iconColor={
            isFavorite(favId)
              ? theme.colors.primary
              : theme.colors.onSurfaceVariant
          }
          onPress={() => toggleFavorite(item)}
        />
      </Surface>
    );
  };

  const renderItem = ({ item }: { item: AnyItem }) => {
    switch (category) {
      case "books":
        return renderBook(item as Book);
      case "characters":
        return renderCharacter(item as Character);
      case "spells":
        return renderSpell(item as Spell);
      case "houses":
        return renderHouse(item as House);
    }
  };

  const isGrid = category === "characters";

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
      {/* Search bar */}
      <Searchbar
        placeholder="Buscar..."
        value={searchQuery}
        onChangeText={handleSearch}
        style={[
          styles.searchbar,
          { backgroundColor: theme.colors.surfaceVariant },
        ]}
        inputStyle={{ color: theme.colors.onSurface }}
      />

      {/* Category chips */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        >
          {CATEGORIES.map((cat) => (
            <Chip
              key={cat.value}
              selected={category === cat.value}
              showSelectedCheck={false}
              mode={category === cat.value ? "flat" : "outlined"}
              onPress={() => setCategory(cat.value)}
              icon={cat.icon}
              style={styles.chip}
              selectedColor={theme.colors.primary}
            >
              {cat.label}
            </Chip>
          ))}
        </ScrollView>
      </View>

      {/* Results */}
      <View style={styles.listContainer}>
        {isLoading ? (
          <View style={styles.center}>
            <ActivityIndicator color={theme.colors.primary} size="large" />
          </View>
        ) : (
          <FlatList
            data={visibleItems}
            keyExtractor={(item) =>
              `${category}-${(item as { index: number }).index}`
            }
            renderItem={renderItem}
            numColumns={isGrid ? 2 : 1}
            key={isGrid ? "grid" : "list"}
            contentContainerStyle={[styles.list, isGrid && styles.gridList]}
            columnWrapperStyle={isGrid ? styles.gridRow : undefined}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.center}>
                <Text style={{ fontSize: 36 }}>🔍</Text>
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurfaceVariant, marginTop: 8 }}
                >
                  Nenhum resultado encontrado
                </Text>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  searchbar: {
    margin: 16,
    marginBottom: 8,
    borderRadius: 12,
    elevation: 0,
  },
  chipRow: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  chip: { marginRight: 0 },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  listContainer: { flex: 1 },
  list: { paddingHorizontal: 16, paddingBottom: 24, gap: 10 },
  gridList: { paddingHorizontal: 16, paddingBottom: 24 },
  gridRow: { gap: 16, marginBottom: 16 },

  // Card (list)
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    padding: 10,
    gap: 10,
  },
  cardBody: { flex: 1 },

  // Books
  bookCover: { width: 52, height: 78, borderRadius: 6 },

  // Characters grid
  gridCard: {
    borderRadius: 14,
    overflow: "hidden",
  },
  characterImage: { width: "100%", height: 140 },
  gridBody: { padding: 8, paddingBottom: 4 },
  gridFavBtn: { alignSelf: "flex-end", margin: 0 },

  // Spells
  spellBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  wand: { fontSize: 24 },

  // Houses
  houseEmojiBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  houseEmoji: { fontSize: 28 },
  colorsRow: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 4 },
  colorChip: { height: 22 },
});
