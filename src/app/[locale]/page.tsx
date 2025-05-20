'use client';
import { useState } from 'react';

import deepCLone from 'lodash.clonedeep';

import Layout from '@/components/Layout';
import { mockCharsSkills } from '@/mock/charsSkills.mock';

interface Etapa {
  maxValue: string;
  current: string;
  dependsOn?: {
    value: string;
    target: string;
  };
}

type PersonagemData = Record<string, Etapa>;

type Data = Record<string, PersonagemData[]>;

export default function App() {
  const [data, setData] = useState<Data>(mockCharsSkills);

  const handleUpdate = (
    personagem: string,
    etapaKey: string,
    operacao: 'increment' | 'decrement',
  ) => {
    setData((prev) => {
      const newData = deepCLone(prev);
      const etapas = newData[personagem][0];
      const etapa = etapas[etapaKey];
      const current = parseInt(etapa.current);

      if (operacao === 'increment') {
        etapa.current = String(current + 1);
      } else if (operacao === 'decrement') {
        etapa.current = String(current - 1);
      }

      return newData;
    });
  };

  const canIncrement = (etapas: PersonagemData, etapa: Etapa): boolean => {
    const current = parseInt(etapa.current);
    const max = parseInt(etapa.maxValue);
    if (current >= max) return false;

    if (!etapa.dependsOn) return true;

    const target = etapas[etapa.dependsOn.target];
    return target?.current === etapa.dependsOn.value;
  };

  const canDecrement = (
    etapas: PersonagemData,
    etapaKey: string,
    etapa: Etapa,
  ): boolean => {
    const current = parseInt(etapa.current);
    if (current <= 0) return false;

    const isBlocked = Object.entries(etapas).some(([_, e]) => {
      return e.dependsOn?.target === etapaKey && parseInt(e.current) > 0;
    });

    return !isBlocked;
  };

  return (
    <Layout>
      <div style={{ padding: 20, background: 'black' }}>
        {Object.entries(data).map(([personagem, etapasArray]) => {
          const etapas = etapasArray[0]; // considerando só 1 objeto
          return (
            <div key={personagem} style={{ marginBottom: 20 }}>
              <h2>{personagem}</h2>
              {Object.entries(etapas).map(([etapaKey, etapa]) => {
                const incrementDisabled = !canIncrement(etapas, etapa);
                const decrementDisabled = !canDecrement(
                  etapas,
                  etapaKey,
                  etapa,
                );

                return (
                  <div key={etapaKey} style={{ marginBottom: 10 }}>
                    <strong>Etapa {etapaKey}</strong> — Current: {etapa.current}{' '}
                    / {etapa.maxValue}
                    <br />
                    <button
                      onClick={() =>
                        handleUpdate(personagem, etapaKey, 'increment')
                      }
                      disabled={incrementDisabled}
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        handleUpdate(personagem, etapaKey, 'decrement')
                      }
                      disabled={decrementDisabled}
                    >
                      -
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
