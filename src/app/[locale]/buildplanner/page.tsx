import type { Metadata } from 'next';

import { Box } from '@mui/material';

import CharLeft from './components/CharLeft';
import HeaderBuildPlanner from './components/HeaderBuildPlanner';
import SkillTree from './components/SkillTree';
// import StatusChar from './components/Status';

export const metadata: Metadata = {
  title: 'Build Planner Grand Chase Classic',
  description: 'Build Planner Grand Chase Classic',
};

export default function Page() {
  return (
    <>
      <HeaderBuildPlanner />
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <CharLeft />
        <SkillTree />
      </Box>
      {/* <StatusChar /> */}
    </>
  );
}
