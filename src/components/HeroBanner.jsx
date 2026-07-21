import { useMemo } from 'react';
import { alpha } from '@mui/material/styles';
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { Pencil } from 'lucide-react';
import defaultCatMascot from '../assets/cat-mascot.svg';

const QUOTES = [
  "If you're in a bad mood, take a deep breath. If you're in a good mood, give thanks to that.",
  'Small steps still move the list forward.',
  'Done is a feeling too — let yourself have it today.',
  "You don't have to finish everything to have a good day.",
];

function HeroMascot({ src, alt }) {
  const theme = useTheme();

  return (
    <Box
      component="img"
      src={src || defaultCatMascot}
      alt={alt}
      width={theme.spacing(8)}
      height={theme.spacing(8)}
      loading="eager"
      sx={{
        display: 'block',
        flexShrink: 0,
        objectFit: 'contain',
        borderRadius: `${theme.shape.borderRadius}px`,
        boxShadow: theme.shadows[2],
        backgroundColor: theme.palette.background.paper,
      }}
    />
  );
}

export default function HeroBanner({ title, mascotSrc, mascotAlt, onEdit }) {
  const theme = useTheme();
  const quote = useMemo(() => QUOTES[Math.floor(Math.random() * QUOTES.length)], []);
  const heroBackground = `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.92)} 0%, ${alpha(theme.palette.secondary.light, 0.9)} 45%, ${alpha(theme.palette.info.light, 0.9)} 100%)`;
  const panelRadius = `${theme.shape.borderRadius}px`;

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        mb: theme.spacing(3),
        borderRadius: panelRadius,
        boxShadow: theme.shadows[0],
        background: heroBackground,
      }}
    >
      <Box
        aria-hidden="true"
        sx={(innerTheme) => ({
          height: innerTheme.spacing(14),
          [innerTheme.breakpoints.up('sm')]: {
            height: innerTheme.spacing(35.5),
          },
        })}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          gap: theme.spacing(1),
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: theme.spacing(3),
          [theme.breakpoints.down('sm')]: {
            p: theme.spacing(2),
          },
            mt: theme.spacing(13),
        }}
      >
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ minWidth: 0 }}>
            <HeroMascot src={mascotSrc} alt={mascotAlt} />
            <Typography
              component="h1"
              variant="h4"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 600,
                fontSize: 22,
                letterSpacing: '-0.01em',
                lineHeight: 2.5,
                wordBreak: 'break-word',
              }}
            >
              {title}
            </Typography>
          </Stack>

          {onEdit && (
            <IconButton
              onClick={onEdit}
              aria-label="Edit hero banner"
              size="small"
              sx={{
                flexShrink: 0,
              }}
            >
              <Pencil size={14} />
            </IconButton>
          )}
        </Stack>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: theme.spacing(1),
            maxWidth: theme.spacing(72),
            px: theme.spacing(2),
            py: theme.spacing(1.5),
            borderRadius: `${theme.shape.borderRadius / 2}px`,
            border: `1.5px dashed ${theme.palette.warning.main}`,
            backgroundColor: theme.palette.warning.light,
            color: theme.palette.warning.dark,
            fontSize: theme.typography.body2.fontSize,
            fontStyle: 'italic',
            lineHeight: 1.6,
            boxShadow: theme.shadows[0],
          }}
        >
          <Box component="span" sx={{ fontStyle: 'normal', flexShrink: 0 }}>
            💌
          </Box>
          <Box component="span">{quote}</Box>
        </Box>
      </Box>
    </Box>
  );
}
