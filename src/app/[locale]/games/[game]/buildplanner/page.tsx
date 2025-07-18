import type { Metadata } from 'next';

import CharLeft from './components/CharLeft';
import HeaderBuildPlanner from './components/HeaderBuildPlanner';
import SkillTree from './components/SkillTree';
import StatusChar from './components/Status';
import styled from './styles.module.scss';

export const metadata: Metadata = {
  title: 'Build Planner Grand Chase Classic',
  description: 'Build Planner Grand Chase Classic',
};

export function generateStaticParams() {
  return [
    { game: 'grandchase', locale: 'en' },
    { game: 'grandchase', locale: 'pt' },
  ];
}

export const dynamicParams = false;

export default async function Page() {
  return (
    <>
      <HeaderBuildPlanner />
      <div className={styled.section_char_skill}>
        <CharLeft />
        <StatusChar />
      </div>
      <SkillTree />
    </>
  );
}
