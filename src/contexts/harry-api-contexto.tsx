import { Book, Character, House, Spell } from "@/types/potter-api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type HarryAPIContextType = {
  books: Book[];
  spells: Spell[];
  characters: Character[];
  houses: House[];
  isLoading?: boolean;
};

const BASE_URL = "https://potterapi-fedeperin.vercel.app/pt";
const HarryAPIContext = createContext<HarryAPIContextType | null>(null);

export function HarryAPIProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [spells, setSpells] = useState<Spell[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [houses, setHouses] = useState<House[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDataAPI = async () => {
    try {
      const responseBooks = await fetch(`${BASE_URL}/books`);
      const responseSpells = await fetch(`${BASE_URL}/spells`);
      const responseCharacters = await fetch(`${BASE_URL}/characters`);
      const responseHouses = await fetch(`${BASE_URL}/houses`);

      const dataBooks = await responseBooks.json();
      const dataSpells = await responseSpells.json();
      const dataCharacters = await responseCharacters.json();
      const dataHouses = await responseHouses.json();

      const harryData: HarryAPIContextType = {
        books: dataBooks,
        spells: dataSpells,
        characters: dataCharacters,
        houses: dataHouses,
      };

      AsyncStorage.setItem("@harryData", JSON.stringify(harryData));
      setBooks(dataBooks);
      setSpells(dataSpells);
      setCharacters(dataCharacters);
      setHouses(dataHouses);
    } catch (error) {
      console.error("Failed to fetch data from API:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const storagedData = await AsyncStorage.getItem("@harryData");

        if (storagedData) {
          const harryData: HarryAPIContextType = JSON.parse(storagedData);
          setBooks(harryData.books);
          setSpells(harryData.spells);
          setCharacters(harryData.characters);
          setHouses(harryData.houses);
        } else {
          fetchDataAPI();
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <HarryAPIContext.Provider
      value={{ books, spells, characters, houses, isLoading }}
    >
      {children}
    </HarryAPIContext.Provider>
  );
}

export const useHarryAPI = () => {
  const context = useContext(HarryAPIContext);
  if (!context) {
    throw new Error("useHarryAPI must be used within a HarryAPIProvider");
  }
  return context;
};
