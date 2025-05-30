'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import _ from 'lodash';

import PopoverSkill from './PopoverSkill';
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
  ) => {
    setAnchorEl({ anchor: event.currentTarget, currentSkill });
  };

  const handlePopoverClose = () => {
    setAnchorEl({ anchor: null, currentSkill: {} as ISkill });
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: EClassChar) => {
    setStSelected(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h4">
          Quantidade de pontos: {getAllPoints}/{charSelected?.total_points}
        </Typography>
        <Tabs onChange={handleChange} value={stSelected || 'class_1'}>
          {qnttClassesChar.map((classes) => (
            <Tab key={classes} label={t.raw(classes)} value={classes} />
          ))}
        </Tabs>
        <Box
          sx={{
            marginTop: '8px',
            display: 'grid',
            gap: '8px',
            gridTemplateColumns: 'repeat(3, 1fr)',
          }}
        >
          {skillTreeSelected &&
            Object.entries(skillTreeSelected).map(
              ([className, currentSkill]) => {
                const incrementDisabled = !canIncrementSkill(
                  skillTreeSelected,
                  currentSkill,
                  charSelected?.total_points as number,
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
                    onMouseEnter={(e) => handlePopoverOpen(e, currentSkill)}
                    onMouseLeave={handlePopoverClose}
                    key={className}
                    sx={{
                      padding: '8px',
                      background:
                        currentSkill.current === currentSkill.maxValue
                          ? '#fecb00'
                          : 'red',
                      maxWidth: '240px',
                    }}
                  >
                    <Typography>{className.replaceAll('_', ' ')}</Typography>
                    <Typography>Current: {currentSkill.current}</Typography>
                    <Typography> Max Value: {currentSkill.maxValue}</Typography>
                    <Button
                      onClick={() => handleUpdate(className, 'increment')}
                      disabled={incrementDisabled}
                    >
                      Aumentar
                    </Button>
                    <Button
                      onClick={() => handleUpdate(className, 'decrement')}
                      disabled={decrementDisabled}
                    >
                      diminuir
                    </Button>
                    {anchorEl.anchor ? (
                      <PopoverSkill
                        anchorEl={anchorEl.anchor}
                        currentSkill={anchorEl.currentSkill}
                        handlePopoverClose={handlePopoverClose}
                      />
                    ) : null}
                  </Box>
                );
              },
            )}
        </Box>
      </Box>
    </>
  );
}
