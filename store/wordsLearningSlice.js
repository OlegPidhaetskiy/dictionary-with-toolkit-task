import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_FORGETTING_SPAN } from "../constants";

const initialState = {
  words: [],
};

// status: 0 - does not know, 1 - partly knows, 2 - knows
function calculateStatus(word, now) {
  if (now > word.dateTotallyForgets) {
    return 0;
  }
  if (now > word.dateForgets) {
    return 1;
  }
  return 2;
}

const wordsLearningSlice = createSlice({
  name: "wordsLearning",
  initialState,
  reducers: {
    addWord(state, action) {
      const { word, phonetics, audio, meaning, partOfSpeech } = action.payload;
      if (state.words.some((item) => item.word === word)) {
        return;
      }
      const now = new Date().getTime();
      state.words.push({
        word,
        phonetics,
        audio,
        meaning,
        partOfSpeech,
        status: 0,
        forgettingSpan: INITIAL_FORGETTING_SPAN,
        dateForgets: now - INITIAL_FORGETTING_SPAN,
        dateTotallyForgets: now,
      });
    },
    updateWord(state, action) {
      const { word, phonetics, audio, meaning, partOfSpeech } = action.payload;
      const existing = state.words.find((item) => item.word === word);
      if (existing) {
        existing.phonetics = phonetics;
        existing.audio = audio;
        existing.meaning = meaning;
        existing.partOfSpeech = partOfSpeech;
      }
    },
    removeWord(state, action) {
      state.words = state.words.filter((item) => item.word !== action.payload);
    },
    updateWordLearnInfo(state, action) {
      const existing = state.words.find((item) => item.word === action.payload);
      if (!existing) {
        return;
      }
      const now = new Date().getTime();
      const span = existing.forgettingSpan;
      existing.dateForgets = now + span;
      existing.dateTotallyForgets = now + span * 2;
      existing.forgettingSpan = span * 2;
      existing.status = 2;
    },
    updateStatuses(state) {
      const now = new Date().getTime();
      state.words.forEach((item) => {
        item.status = calculateStatus(item, now);
      });
    },
  },
});

export const selectWords = (state) => state.wordsLearning.words;

export const selectWordsToLearn = createSelector([selectWords], (words) =>
  words.filter((item) => item.status < 2)
);

export const selectStatistics = createSelector([selectWords], (words) => ({
  toLearn: words.filter((item) => item.status === 0).length,
  inProcess: words.filter((item) => item.status === 1).length,
  learned: words.filter((item) => item.status === 2).length,
}));

// For correct passing of the tests please, leave these exports as they are
export const wordsLearningActions = wordsLearningSlice.actions;

export default wordsLearningSlice;
