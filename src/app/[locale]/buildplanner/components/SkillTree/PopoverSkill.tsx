import { Typography } from '@mui/material';
import Popover from '@mui/material/Popover';

import type { ISkill } from '@/interface/skill';

interface IProps {
  handlePopoverClose: () => void;
  anchorEl: HTMLElement | null;
  currentSkill: ISkill;
}

export default function PopoverSkill({
  handlePopoverClose,
  anchorEl,
  currentSkill,
}: IProps) {
  return (
    <Popover
      open={Boolean(anchorEl)}
      disableScrollLock
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
      sx={{ pointerEvents: 'none' }}
    >
      <Typography variant="body2">
        Requer:{' '}
        {currentSkill.dependsOn?.target.replaceAll('_', ' ') || 'Nenhum'}
      </Typography>
    </Popover>
  );
}
