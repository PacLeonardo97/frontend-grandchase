'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Typography, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import _ from 'lodash';

import PopoverSkill from './PopoverSkill';
import Image from '@/components/Image';
import { EClassChar } from '@/enum/char.enum';
import { getClassByChar } from '@/helper/char';
import {
  canDecrementSkill,
  canIncrementSkill,
  getTotalCurrent,
} from '@/helper/skill';
import { ISkill } from '@/interface/skill';
import { updateChar } from '@/store/char';
import { useAppSelector } from '@/store/hooks';

export default function SkillTree() {
  const dispatch = useDispatch();
  const t = useTranslations('Skills');

  const charSelected = useAppSelector((state) => state.char.data);
  const [stSelected, setStSelected] = useState(EClassChar.class_1);
  const skillTreeSelected = useAppSelector(
    (state) => state.char.data.skills?.[stSelected],
  );
  const [anchorEl, setAnchorEl] = useState({
    anchor: null as HTMLElement | null,
    currentSkill: {} as ISkill,
    className: '',
  });
  const getAllPoints = useMemo(
    () => getTotalCurrent(charSelected.skills),
    [charSelected.skills],
  );
  const qnttClassesChar = useMemo(() => {
    if (charSelected?.name) return getClassByChar(charSelected?.name);
    return [];
  }, [charSelected?.name]);

  const handleUpdate = (
    skillName: string,
    operacao: 'increment' | 'decrement',
  ) => {
    let current = _.cloneDeep(skillTreeSelected?.[skillName].current);
    if (operacao === 'increment') {
      current = String(Number(current) + 1);
    } else if (operacao === 'decrement') {
      current = String(Number(current) - 1);
    }

    dispatch(
      updateChar({
        skills: { [stSelected]: { [skillName]: { current } } },
      }),
    );
  };

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    currentSkill: ISkill,
    className: string,
  ) => {
    setAnchorEl({ anchor: event.currentTarget, currentSkill, className });
  };

  const handlePopoverClose = () => {
    setAnchorEl({ anchor: null, currentSkill: {} as ISkill, className: '' });
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: EClassChar) => {
    setStSelected(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h4">
          Quantidade de pontos: {getAllPoints}/{charSelected?.total_points_st}
        </Typography>
        <Tabs onChange={handleChange} value={stSelected || 'class_1'}>
          {qnttClassesChar.map((classes) => (
            <Tab key={classes} label={t.raw(classes)} value={classes} />
          ))}
        </Tabs>
        <Box
          sx={{
            marginTop: '8px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          {skillTreeSelected &&
            Object.entries(skillTreeSelected).map(
              ([className, currentSkill]) => {
                const incrementDisabled = !canIncrementSkill(
                  skillTreeSelected,
                  currentSkill,
                  charSelected?.total_points_st as number,
                  getAllPoints,
                );

                const decrementDisabled = !canDecrementSkill(
                  className,
                  skillTreeSelected,
                  currentSkill,
                );

                return (
                  <Box
                    aria-owns={
                      Boolean(anchorEl.anchor)
                        ? 'mouse-over-popover'
                        : undefined
                    }
                    aria-hidden={!Boolean(anchorEl.anchor)}
                    aria-haspopup="true"
                    onMouseEnter={(e) =>
                      handlePopoverOpen(e, currentSkill, className)
                    }
                    onMouseLeave={handlePopoverClose}
                    key={className}
                    sx={{
                      padding: '8px',
                      background:
                        currentSkill.current === currentSkill.maxValue
                          ? '#fecb00'
                          : 'red',
                      maxWidth: '80px',
                    }}
                  >
                    <Image
                      width={56}
                      height={56}
                      alt={currentSkill?.img}
                      style={{ borderRadius: 4, justifySelf: 'center' }}
                      // Alterar essa porra de src depois
                      src={
                        '/NoImage.svg'
                        // currentSkill?.img ? `/${currentSkill?.img}.webp` : ''
                      }
                    />
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                      }}
                    >
                      <IconButton
                        sx={{ padding: 0 }}
                        onClick={() => handleUpdate(className, 'increment')}
                        disabled={incrementDisabled}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        sx={{ padding: 0 }}
                        onClick={() => handleUpdate(className, 'decrement')}
                        disabled={decrementDisabled}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </Box>
                );
              },
            )}
        </Box>
        {anchorEl.anchor ? (
          <PopoverSkill
            className={anchorEl.className}
            anchorEl={anchorEl.anchor}
            currentSkill={anchorEl.currentSkill}
            handlePopoverClose={handlePopoverClose}
          />
        ) : null}
      </Box>
    </>
  );
}
