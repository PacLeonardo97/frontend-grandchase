import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import _ from 'lodash';

import PopoverSkill from './PopoverSkill';
import { EChar } from '@/enum/char.enum';
import { getClassByChar } from '@/helper/char';
import {
  canDecrementSkill,
  canIncrementSkill,
  getTotalCurrent,
} from '@/helper/skill';
import { ICharSkill, mockCharsSkills } from '@/mock/charsSkills.mock';
import { useAppSelector } from '@/store/hooks';

export default function SkillTree() {
  const charSelected = useAppSelector((state) => state.char);
  const [data, setData] = useState([] as ICharSkill[]);
  const [stSelected, setStSelected] = useState('');
  const [anchorEl, setAnchorEl] = useState({
    anchor: null as HTMLElement | null,
    currentSkill: {} as ICharSkill[0],
  });
  const getAllPoints = useMemo(() => getTotalCurrent(data), [data]);

  const qnttClassesChar = useMemo(() => {
    if (charSelected.data?.name) return getClassByChar(charSelected.data?.name);
    return [];
  }, [charSelected.data?.name]);

  const t = useTranslations('Skills');

  useEffect(() => {
    if (charSelected.data?.name) {
      setData(
        mockCharsSkills[charSelected.data?.name as EChar] as ICharSkill[],
      );
      return;
    }
    setData([] as ICharSkill[]);
  }, [charSelected.data?.name]);

  const handleUpdate = (
    nameSkill: string,
    operacao: 'increment' | 'decrement',
  ) => {
    setData((prev) => {
      const newData = _.cloneDeep(prev);
      const etapa = newData[0][nameSkill];

      if (operacao === 'increment') {
        etapa.current = String(Number(etapa.current) + 1);
      } else if (operacao === 'decrement') {
        etapa.current = String(Number(etapa.current) - 1);
      }

      return newData;
    });
  };

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    currentSkill: ICharSkill[0],
  ) => {
    setAnchorEl({ anchor: event.currentTarget, currentSkill });
  };

  const handlePopoverClose = () => {
    setAnchorEl({ anchor: null, currentSkill: {} as ICharSkill[0] });
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setStSelected(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h4">
          Quantidade de pontos: {getAllPoints}/{charSelected.data?.total_points}
        </Typography>
        <Tabs value={stSelected || 'class_1'}>
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
          {data?.map((allSkills) =>
            Object.keys(allSkills).map((skill) => {
              const currentSkill = allSkills[skill as EChar];

              const incrementDisabled = !canIncrementSkill(
                allSkills,
                currentSkill,
                charSelected.data?.total_points as number,
                getAllPoints,
              );

              const decrementDisabled = !canDecrementSkill(
                skill,
                allSkills,
                currentSkill,
              );

              return (
                <Box
                  aria-owns={
                    Boolean(anchorEl.anchor) ? 'mouse-over-popover' : undefined
                  }
                  aria-hidden={!Boolean(anchorEl.anchor)}
                  aria-haspopup="true"
                  onMouseEnter={(e) => handlePopoverOpen(e, currentSkill)}
                  onMouseLeave={handlePopoverClose}
                  key={skill}
                  sx={{
                    padding: '8px',
                    background:
                      currentSkill.current === currentSkill.maxValue
                        ? '#fecb00'
                        : 'red',
                    maxWidth: '240px',
                  }}
                >
                  <Typography>{skill.replaceAll('_', ' ')}</Typography>
                  <Typography>Current: {currentSkill.current}</Typography>
                  <Typography> Max Value: {currentSkill.maxValue}</Typography>
                  <Button
                    onClick={() => handleUpdate(skill, 'increment')}
                    disabled={incrementDisabled}
                  >
                    Aumentar
                  </Button>
                  <Button
                    onClick={() => handleUpdate(skill, 'decrement')}
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
            }),
          )}
        </Box>
      </Box>
    </>
  );
}
