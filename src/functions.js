import i18n from './i18n.js';
import {
  MAX_NAME_LENGTH,
  MIN_PLAYER_COUNT,
  MAX_PLAYER_COUNT,
  MAX_ROUND_SCORE,
  MAX_ROUND_COUNT,
} from './constants.js';

const getPlayerCount = (players) => Object.keys(players).length;

export const isGameInProgress = (roundCounter) => roundCounter > 0;

export const isInvalidPlayerName = (name) => name.length <= 0 || name.length > MAX_NAME_LENGTH;

export const isInvalidPlayerAddition = (players, name) =>
  isInvalidPlayerName(name) || getPlayerCount(players) >= MAX_PLAYER_COUNT;

export const isInvalidGameStart = (players) =>
  getPlayerCount(players) < MIN_PLAYER_COUNT || getPlayerCount(players) > MAX_PLAYER_COUNT;

export const isInvalidRoundScore = (score) => score < 0 || score > MAX_ROUND_SCORE;

export const isInvalidRoundFinishing = (players, roundCounter, finishingGame) =>
  Object.values(players).some((player) => isInvalidRoundScore(player.roundScore)) ||
  (finishingGame ? roundCounter > MAX_ROUND_COUNT : roundCounter >= MAX_ROUND_COUNT);

export const validateScoreInput = (score) => Math.abs(Math.round(score)) || 0;

export const addPlayer = (players, name) => {
  const id = crypto.randomUUID();
  players[id] = {
    name,
    roundScore: 0,
    totalScore: 0,
  };
};

export const addUpTotalScore = (players) => {
  Object.values(players).forEach((player) => {
    player.totalScore += player.roundScore;
    player.roundScore = 0;
  });
};

export const resetScores = (players) => {
  Object.values(players).forEach((player) => {
    player.roundScore = 0;
    player.totalScore = 0;
  });
};

export const getLeaderBoard = (players) =>
  Object.values(players)
    .map((player) => ({ ...player }))
    .sort((a, b) => b.totalScore - a.totalScore);

export const isTie = (leaderBoard) =>
  !isInvalidGameStart(leaderBoard) && leaderBoard[0].totalScore === leaderBoard[1].totalScore;

export const getNextLanguageKey = (selectedLanguageKey) => {
  const availableLanguages = Object.keys(i18n);
  const indexLimit = availableLanguages.length - 1;
  const oldIndex = availableLanguages.indexOf(selectedLanguageKey);
  const newIndex = oldIndex + 1;
  return newIndex <= indexLimit ? availableLanguages[newIndex] : availableLanguages[0];
};

export const getNextLanguageName = (selectedLanguageKey) =>
  i18n[getNextLanguageKey(selectedLanguageKey)]._name;
