import React from 'react';
import Logo from '../components/Logo';
import LanguageIcons, { languageList } from '../templates/LanguageIcons';

export function findMatchingLanguage(language) {
  const matchingLanguage = languageList.find((lan) => lan.toLowerCase() === language.toLowerCase());

  return matchingLanguage;
}

export function findMatchingLanguageIcon(tags) {
  const firstMatchingLanguageName = tags.map((tag) => languageList.find((lan) => lan.toLowerCase() === tag.toLowerCase()))[0];

  return firstMatchingLanguageName;
}

export default function matchingLanguageIcon(lan, size) {
  let languageTag;

  if (Array.isArray(lan)) {
    languageTag = findMatchingLanguageIcon(lan);
  } else {
    languageTag = findMatchingLanguage(lan);
  }

  return <>{languageTag ? <LanguageIcons language={languageTag} width={size} /> : <Logo height={size} link={false} />}</>;
}
