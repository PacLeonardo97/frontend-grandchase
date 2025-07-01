'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import _ from 'lodash';

import PopoverSkill from './PopoverSkill';
import Image from '@/components/Image';
import { EClassChar, ESkillsSection } from '@/enum/char.enum';
import { getClassByChar } from '@/helper/char';
import {
  canDecrementSkill,
  canIncrementSkill,
  getTotalCurrent,
} from '@/helper/skill';
import { useLocalChageChar } from '@/hooks/allChars/localChangeChar';
import { useCharByName } from '@/hooks/allChars/useCharByName';
import type { IChar } from '@/interface/char';
import { ICharSkills, ISkill } from '@/interface/skill';

export default function SkillTree() {
  const [stSelected, setStSelected] = useState(EClassChar.class_1);
  const [sectionSelected, setSectionSelected] = useState('' as ESkillsSection);
  const t = useTranslations('Skills');

  const searchParams = useSearchParams();
  const charName = searchParams.get('charName') as string;
  const { data: charSelected } = useCharByName();

  const skillTreeSelected = useMemo(
    () => charSelected?.skills?.[stSelected],
    [charSelected?.skills, stSelected],
  );

  const skillSectionSelected = useMemo(
    () => charSelected?.skills?.[stSelected]?.[sectionSelected],
    [charSelected?.skills, stSelected, sectionSelected],
  );

  const { mutate: updateChar } = useLocalChageChar();

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
    sectionName: ESkillsSection,
    operacao: 'increment' | 'decrement',
  ) => {
    let current = _.cloneDeep(
      skillTreeSelected?.[sectionName]?.[skillName].current,
    );
    if (operacao === 'increment') {
      current = String(Number(current) + 1);
    } else if (operacao === 'decrement') {
      current = String(Number(current) - 1);
    }

    updateChar({
      name: charName,
      skills: {
        [stSelected]: {
          [sectionName]: {
            [skillName]: { current },
          },
        },
      },
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

  const handleChangeClass = (
    _event: React.SyntheticEvent,
    newValue: EClassChar,
  ) => {
    setStSelected(newValue);
    const newSection = Object.keys(
      charSelected?.skills?.[newValue] || {},
    )[0] as ESkillsSection;

    if (newSection) {
      setSectionSelected(newSection);
    }
  };

  const handleChangeSection = (
    _event: React.SyntheticEvent,
    newValue: ESkillsSection,
  ) => {
    setSectionSelected(newValue);
  };

  useEffect(() => {
    if (skillTreeSelected && !sectionSelected) {
      const firstSection = Object.keys(skillTreeSelected)[0] as ESkillsSection;
      setSectionSelected(firstSection);
    }
  }, [skillTreeSelected, sectionSelected]);

  return (
    <Box
      sx={(theme) => ({
        background: theme.palette.grey[800],
        marginTop: theme.spacing(1),
        padding: theme.spacing(2),
        borderRadius: theme.spacing(0.5),
        marginRight: theme.spacing(2),
        minHeight: theme.spacing(50),
        [theme.breakpoints.down('sm')]: {
          maxWidth: '100%',
          marginRight: 0,
          minHeight: theme.spacing(80),
        },
      })}
    >
      <Typography variant="h4">
        Quantidade de pontos:
        {`${getAllPoints}/${charSelected?.total_points_st}`}
      </Typography>
      <Tabs onChange={handleChangeClass} value={stSelected || 'class_1'}>
        {qnttClassesChar?.map((classes) => (
          <Tab key={classes} label={t.raw(classes)} value={classes} />
        ))}
      </Tabs>

      <Tabs
        variant="scrollable"
        onChange={handleChangeSection}
        value={sectionSelected || Object.keys(skillTreeSelected || {})[0]}
      >
        {Object.keys(skillTreeSelected || {}).map((section) => (
          <Tab key={section} label={t.raw(section)} value={section} />
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
        {Object.entries(skillSectionSelected || {}).map(
          ([skillName, currentSkill]) => {
            const incrementDisabled = !canIncrementSkill(
              skillSectionSelected!,
              currentSkill,
              charSelected?.total_points_st as number,
              getAllPoints,
            );

            const decrementDisabled = !canDecrementSkill(
              skillName,
              skillSectionSelected!,
              currentSkill,
            );

            return (
              <Box
                aria-owns={
                  Boolean(anchorEl.anchor) ? 'mouse-over-popover' : undefined
                }
                aria-hidden={!Boolean(anchorEl.anchor)}
                aria-haspopup="true"
                onMouseEnter={(e) =>
                  handlePopoverOpen(e, currentSkill, skillName)
                }
                onMouseLeave={handlePopoverClose}
                key={`${sectionSelected}-${skillName}`}
                sx={{
                  padding: '2px',
                  borderRadius: '4px',
                  maxWidth: '64px',
                  height: '80px',
                  background:
                    !decrementDisabled || Number(currentSkill.current) > 0
                      ? '#fecb00'
                      : '',
                  border: '2px, solid #8a4b8a',
                }}
              >
                <Image
                  width={56}
                  height={56}
                  alt={currentSkill?.img}
                  style={{
                    borderRadius: 4,
                    justifySelf: 'center',
                  }}
                  src={'/NoImage.svg'}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                  }}
                >
                  <Button
                    sx={{
                      padding: 0,
                      margin: 0,
                      background: !incrementDisabled ? '#22b0f2' : '#576972',
                      minWidth: '24px',
                      height: '16px',
                    }}
                    onClick={() =>
                      handleUpdate(skillName, sectionSelected, 'increment')
                    }
                    disabled={incrementDisabled}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                  <Button
                    sx={{
                      padding: 0,
                      margin: 0,
                      minWidth: '24px',
                      height: '16px',
                      background: !decrementDisabled ? '#22b0f2' : '#576972',
                    }}
                    onClick={() =>
                      handleUpdate(skillName, sectionSelected, 'decrement')
                    }
                    disabled={decrementDisabled}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
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
  );
}
