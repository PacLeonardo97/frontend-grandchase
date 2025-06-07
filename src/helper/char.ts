import { EChar } from '@/enum/char.enum';

export function getPointsByChar(char: EChar) {
  return {
    Elesis: { qnty: 35, canGetAll: false },
    Lire: { qnty: 35, canGetAll: false },
    Arme: { qnty: 35, canGetAll: false },
    Lass: { qnty: 35, canGetAll: false },
    Ryan: { qnty: 35, canGetAll: false },
    Ronan: { qnty: 35, canGetAll: true },
    Amy: { qnty: 35, canGetAll: false },
    Jin: { qnty: 35, canGetAll: false },
    Sieghart: { qnty: 35, canGetAll: false },
    Mari: { qnty: 35, canGetAll: true },
    Dio: { qnty: 110, canGetAll: false },
    Zero: { qnty: 110, canGetAll: false },
    Rey: { qnty: 110, canGetAll: false },
    Lupus: { qnty: 110, canGetAll: true },
    Lin: { qnty: 160, canGetAll: true },
    Azin: { qnty: 160, canGetAll: true },
    Holy: { qnty: 160, canGetAll: true },
    Edel: { qnty: 160, canGetAll: true },
    Veigas: { qnty: 160, canGetAll: true },
    Decane: { qnty: 160, canGetAll: true },
    AI: { qnty: 160, canGetAll: true },
    Kallia: { qnty: 160, canGetAll: true },
    Uno: { qnty: 160, canGetAll: true },
  }[char];
}

export function getClassByChar(char: EChar) {
  return {
    Elesis: ['class_1', 'class_2', 'class_3', 'class_4', 'class_5'],
    Lire: ['class_1', 'class_2', 'class_3', 'class_4', 'class_5'],
    Arme: ['class_1', 'class_2', 'class_3', 'class_4', 'class_5'],
    Lass: ['class_1', 'class_2', 'class_3', 'class_4', 'class_5'],
    Ryan: ['class_1', 'class_2', 'class_3', 'class_4', 'class_5'],
    Ronan: ['class_1', 'class_2', 'class_3', 'class_4', 'class_5'],
    Amy: ['class_1', 'class_2', 'class_3', 'class_4', 'class_5'],
    Jin: ['class_1', 'class_2', 'class_3', 'class_4', 'class_5'],
    Sieghart: ['class_1', 'class_2', 'class_3', 'class_4', 'class_5'],
    Mari: ['class_1', 'class_2', 'class_3', 'class_4', 'class_5'],
    Dio: ['class_1', 'class_2', 'class_3', 'class_4', 'class_5'],
    Zero: ['class_1', 'class_2', 'class_3', 'class_4', 'class_5'],
    Rey: ['class_1', 'class_2', 'class_3', 'class_4', 'class_5'],
    Lupus: ['class_1', 'class_2', 'class_3', 'class_4', 'class_5'],
    Lin: ['class_1', 'class_2', 'class_3', 'class_4', 'class_5'],
    Azin: ['class_1', 'class_2', 'class_5'],
    Holy: ['class_1', 'class_2', 'class_5'],
    Edel: ['class_1', 'class_2', 'class_5'],
    Veigas: ['class_1', 'class_5'],
    Decane: ['class_1', 'class_2', 'class_5'],
    AI: ['class_1', 'class_2', 'class_5'],
    Kallia: ['class_1', 'class_2', 'class_5'],
    Uno: ['class_1', 'class_2', 'class_5'],
  }[char];
}
