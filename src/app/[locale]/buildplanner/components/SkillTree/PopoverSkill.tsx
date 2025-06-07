import { Typography } from '@mui/material';
import Popover from '@mui/material/Popover';

import type { ISkill } from '@/interface/skill';

interface IProps {
  handlePopoverClose: () => void;
  anchorEl: HTMLElement | null;
  currentSkill: ISkill;
  className: string;
}

export default function PopoverSkill({
  handlePopoverClose,
  anchorEl,
  currentSkill,
  className,
}: IProps) {
  return (
    <Popover
      open={Boolean(anchorEl)}
      disableScrollLock
      disableRestoreFocus
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
      sx={{ pointerEvents: 'none' }}
    >
      <Typography variant="body1">{className.replaceAll('_', ' ')}</Typography>
      <Typography variant="body2">PT: {currentSkill.qnttyPoints}</Typography>
      <Typography variant="body2">
        Requer:{' '}
        {currentSkill.dependsOn?.target.replaceAll('_', ' ') || 'Nenhum'}
      </Typography>
    </Popover>
  );
}
