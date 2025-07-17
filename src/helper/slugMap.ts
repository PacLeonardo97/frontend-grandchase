export const gameSlugMap: Record<string, string> = {
  'Grand Chase Classic': 'grandchase',
  'Elden Ring Nightreign': 'nightreign',
  Palworld: 'palworld',
};

export const gameCategoryMap: Record<string, string> = {
  grandchase: 'Grand Chase Classic',
  nightreign: 'Elden Ring Nightreign',
  palworld: 'Palworld',
};

export const articleTypeSlugMap: Record<string, string> = {
  news: 'news',
  character_guide: 'characterguides',
  game_guide: 'gameguides',
};

export function getGameSlug(gameName: string): string {
  return gameSlugMap[gameName];
}

export function getGameCategory(categoryName: string): string {
  return gameCategoryMap[categoryName];
}

export function getArticleTypeSlug(articleType: string): string {
  return articleTypeSlugMap[articleType];
}
