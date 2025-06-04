'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

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
import { useCharByName } from '@/hooks/allChars/useCharByName';
import { useUpdateChar } from '@/hooks/allChars/useUpdateChar';
import type { IChar } from '@/interface/char';
import { ICharSkills, ISkill } from '@/interface/skill';

export default function SkillTree() {
  const [isClient, setIsClient] = useState(false);
  const [stSelected, setStSelected] = useState(EClassChar.class_1);

  const t = useTranslations('Skills');

  const searchParams = useSearchParams();
  const charName = searchParams.get('charName') as string;
  const { data: charSelected } = useCharByName();

  const skillTreeSelected = useMemo(
    () => charSelected?.skills?.[stSelected],
    [charSelected?.skills, stSelected],
  );

  const { mutate: updateChar } = useUpdateChar();

  const [anchorEl, setAnchorEl] = useState({
    anchor: null as HTMLElement | null,
    currentSkill: {} as ISkill,
    className: '',
  });
  const getAllPoints = useMemo(
    () => getTotalCurrent(charSelected?.skills as ICharSkills),
    [charSelected?.skills],
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
    updateChar({
      name: charName,
      skills: { [stSelected]: { [skillName]: { current } } },
    } as IChar);
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Box
        sx={(theme) => ({
          [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
          },
        })}
      >
        <Typography variant="h4">
          Quantidade de pontos:
          {isClient ? ` ${getAllPoints}/${charSelected?.total_points_st}` : ''}
        </Typography>
        <Tabs onChange={handleChange} value={stSelected || 'class_1'}>
          {isClient
            ? qnttClassesChar.map((classes) => (
                <Tab key={classes} label={t.raw(classes)} value={classes} />
              ))
            : null}
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
