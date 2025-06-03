import { Box } from '@mui/material';

import CharLeft from './components/CharLeft';
import HeaderBuildPlanner from './components/HeaderBuildPlanner';
import SkillTree from './components/SkillTree';

export default function Page() {
  return (
    <>
      <HeaderBuildPlanner />
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <CharLeft />
        <SkillTree />
      </Box>
    </>
  );
}
