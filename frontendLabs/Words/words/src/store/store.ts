import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

type Word = {
  id: string;
  english: string;
  russian: string;
}

export type EnglishRussianPair = [string, string];

type WordsStore = {
  words: Record<string, Word>,
  addWord: (english: string, russian: string) => void,
  updateWord: (id: string, english: string, russian: string) => void,
  removeWord: (id: string) => void,
  getAllWords: () => Record<string, Word>,
  getEnglishRussianPairs: () => EnglishRussianPair[],
}

const useWordsStore = create(
    persist<WordsStore>(
        (set, get) => ({
            words: {},
            addWord: (english, russian) => {
                const id = uuidv4();
                set((state) => ({
                    words: { ...state.words, [id]: { id, english, russian } },
                }));
            },
            updateWord: (id, english, russian) => set((state) => ({
                words: { ...state.words, [id]: { id, english, russian } },
            })),
            removeWord: (id) => set((state) => {
                const newWords = { ...state.words };
                delete newWords[id];
                return { words: newWords };
            }),
            getAllWords: () => get().words,
            getEnglishRussianPairs: () => {
                const words = get().words;
                return Object.entries(words).map(([, word]) => [word.english, word.russian]);
            }
        }),
        {
            name: "words-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export const addWord = (english: string, russian: string) => useWordsStore.getState().addWord(english, russian);
export const updateWord = (id: string, english: string, russian: string) => useWordsStore.getState().updateWord(id, english, russian);
export const removeWord = (id: string) => useWordsStore.getState().removeWord(id);
export const getAllWords = () => useWordsStore.getState().getAllWords();
export const getEnglishRussianPairs = () => useWordsStore.getState().getEnglishRussianPairs();
export const getRussianWordByEnglish = (englishWord: string): string | undefined => {
    const words = useWordsStore.getState().words;
    const russianWord = Object.values(words).find((word) => word.english === englishWord);
    return russianWord ? russianWord.russian : undefined;
};
