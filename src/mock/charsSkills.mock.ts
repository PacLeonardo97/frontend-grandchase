export const mockCharsSkills = {
  elesis: [
    {
      '1': {
        maxValue: '3',
        current: '3',
      },
      '2': {
        maxValue: '3',
        current: '3',
      },
      '3': {
        maxValue: '4',
        current: '1',
        dependsOn: {
          target: '1',
          value: '3',
        },
      },
      '4': {
        maxValue: '5',
        current: '0',
        dependsOn: {
          target: '2',
          value: '3',
        },
      },
      '5': {
        maxValue: '5',
        current: '0',
        dependsOn: {
          target: '2',
          value: '3',
        },
      },
    },
  ],
  Lire: [
    {
      '1': {
        maxValue: '3',
        current: '3',
      },
      '2': {
        maxValue: '3',
        current: '0',
        dependsOn: {
          value: '3',
          target: '1',
        },
      },
    },
  ],
};
