import Alpine from 'alpinejs';
import persist from '@alpinejs/persist';
import '@picocss/pico/css/pico.indigo.min.css';
import '@picocss/pico/css/pico.colors.min.css';

import './style.css';
import { author } from '../package.json';
import i18n from './i18n.js';
import { DEFAULT_LANGUAGE_KEY, MAX_NAME_LENGTH, MAX_ROUND_SCORE } from './constants.js';
import {
  addPlayer,
  addUpTotalScore,
  getLeaderBoard,
  getNextLanguageKey,
  getNextLanguageName,
  isGameInProgress,
  isInvalidGameStart,
  isInvalidPlayerAddition,
  isInvalidPlayerName,
  isInvalidRoundFinishing,
  isInvalidRoundScore,
  isTie,
  resetScores,
  validateScoreInput,
} from './functions.js';

let version = 'DEV';

if (import.meta.env.VITE_APP_VERSION) {
  version = import.meta.env.VITE_APP_VERSION;
} else if (import.meta.env.PROD) version = 'PREVIEW';

Alpine.plugin(persist);

Alpine.data('main', function () {
  return {
    init() {
      this.x = i18n[this.languageKey];
      this.nextLanguageName = getNextLanguageName(this.languageKey);
    },
    toggleLanguage() {
      const key = getNextLanguageKey(this.languageKey);
      this.languageKey = key;
      this.x = i18n[key];
      this.nextLanguageName = getNextLanguageName(key);
    },
    languageKey: this.$persist(DEFAULT_LANGUAGE_KEY),
    players: this.$persist({}),
    roundCounter: this.$persist(0),
    finishingGame: this.$persist(false),
    isGameInProgress,
  };
});

Alpine.data('preGame', () => ({
  MAX_NAME_LENGTH,
  addPlayer,
  isInvalidGameStart,
  isInvalidPlayerAddition,
  isInvalidPlayerName,
}));

Alpine.data('inGame', () => ({
  MAX_ROUND_SCORE,
  addUpTotalScore,
  getLeaderBoard,
  isInvalidRoundScore,
  isInvalidRoundFinishing,
  isTie,
  resetScores,
  validateScoreInput,
}));

Alpine.data('meta', () => ({ author, version }));

if (import.meta.env.DEV) window.Alpine = Alpine;

Alpine.start();
