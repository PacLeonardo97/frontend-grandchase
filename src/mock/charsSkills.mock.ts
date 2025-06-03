import { EClassChar } from '@/enum/char.enum';
import type { ICharSkills } from '@/interface/skill';

export const mockElesisSkill: ICharSkills = {
  [EClassChar.class_1]: {
    Combo_Com_5_golpes: {
      maxValue: '1',
      current: '0',
      qnttyPoints: '0',
      img: '',
    },
    Combo_De_4_golpes: {
      maxValue: '1',
      qnttyPoints: '2',
      current: '0',
      img: '',
      dependsOn: {
        target: 'Combo_Com_5_golpes',
        value: '1',
      },
    },

    Combo_Aereo_Nv_1: {
      maxValue: '1',
      qnttyPoints: '0',
      current: '0',
      img: '',
    },
    Investida: {
      maxValue: '1',
      qnttyPoints: '1',
      current: '0',
      img: '',
      dependsOn: {
        target: 'Combo_Aereo_Nv_1',
        value: '1',
      },
    },
    Ataque_Duplo_Aereo: {
      maxValue: '1',
      qnttyPoints: '1',
      current: '0',
      img: '',
      dependsOn: {
        target: 'Investida',
        value: '1',
      },
    },
    Combo_Aereo_Nv_2: {
      maxValue: '1',
      qnttyPoints: '2',
      current: '0',
      img: '',
      dependsOn: {
        target: 'Ataque_Duplo_Aereo',
        value: '1',
      },
    },
    Ataque_Critico_Nv_1: {
      maxValue: '1',
      qnttyPoints: '0',
      current: '0',
      img: '',
    },
    Critico_Nv_2: {
      maxValue: '1',
      qnttyPoints: '2',
      current: '0',
      img: '',
      dependsOn: {
        target: 'Ataque_Critico_Nv_1',
        value: '1',
      },
    },
    Ataque_Duplo_Nv_1: {
      maxValue: '1',
      qnttyPoints: '0',
      current: '0',
      img: '',
    },
    Ataque_Duplo_Nv_2: {
      maxValue: '1',
      qnttyPoints: '2',
      current: '0',
      img: '',
      dependsOn: {
        target: 'Ataque_Duplo_Nv_1',
        value: '1',
      },
    },
    Estocada_Longa: {
      maxValue: '1',
      qnttyPoints: '1',
      current: '0',
      img: '',
    },
    Moinho_De_Vento: {
      maxValue: '1',
      qnttyPoints: '2',
      current: '0',
      img: '',
      dependsOn: {
        target: 'Estocada_Longa',
        value: '1',
      },
    },
    Corrida: {
      maxValue: '1',
      qnttyPoints: '0',
      current: '0',
      img: '',
    },
    Pulo_e_corrida: {
      maxValue: '1',
      qnttyPoints: '2',
      current: '0',
      img: '',
      dependsOn: {
        target: 'Corrida',
        value: '1',
      },
    },
    Ataque_Durante_A_Corrida_NV_1: {
      maxValue: '1',
      qnttyPoints: '0',
      current: '0',
      img: '',
    },
    Ataque_Durante_A_Corrida_Nv_2: {
      maxValue: '1',
      qnttyPoints: '2',
      current: '0',
      img: '',
      dependsOn: {
        target: 'Ataque_Durante_A_Corrida_NV_1',
        value: '1',
      },
    },
    Ataque_Durante_A_Corrida_Nv_3: {
      maxValue: '1',
      qnttyPoints: '2',
      current: '0',
      img: '',
      dependsOn: {
        target: 'Ataque_Durante_A_Corrida_Nv_2',
        value: '1',
      },
    },
    Ataque_Com_Pulo: {
      maxValue: '1',
      qnttyPoints: '0',
      current: '0',
      img: '',
    },
    Ataque_Duplo_Com_Pulo: {
      maxValue: '1',
      qnttyPoints: '2',
      current: '0',
      img: '',
      dependsOn: {
        target: 'Ataque_Com_Pulo',
        value: '1',
      },
    },
    Corte_Evasivo: {
      maxValue: '1',
      qnttyPoints: '1',
      current: '0',
      img: '',
    },
    Provocar: {
      maxValue: '1',
      qnttyPoints: '1',
      current: '0',
      img: '',
    },
  },

  [EClassChar.class_2]: {
    Def_Magica: {
      maxValue: '1',
      current: '0',
      qnttyPoints: '0',
      img: '',
    },
  },
};
