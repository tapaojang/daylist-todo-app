import { useEffect, useId, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

function createDraft(values) {
  return {
    title: values?.title ?? '',
    mascotSrc: values?.mascotSrc ?? '',
    mascotAlt: values?.mascotAlt ?? '',
  };
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(typeof reader.result === 'string' ? reader.result : '');
    };
    reader.onerror = () => reject(new Error('Unable to read image file.'));
    reader.readAsDataURL(file);
  });
}

export default function HeroBannerEditorDialog({ open, initialValues, onClose, onSave }) {
  const theme = useTheme();
  const titleId = useId();
  const imageInputId = useId();
  const [draft, setDraft] = useState(() => createDraft(initialValues));

  useEffect(() => {
    if (open) {
      setDraft(createDraft(initialValues));
    }
  }, [open, initialValues]);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const dataUrl = await readFileAsDataUrl(file);
    setDraft((current) => ({ ...current, mascotSrc: dataUrl }));
    event.target.value = '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(draft);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" aria-labelledby={titleId}>
      <DialogTitle id={titleId} sx={{ pb: theme.spacing(1) }}>
        Edit hero banner
      </DialogTitle>
      <DialogContent dividers sx={{ pt: theme.spacing(3) }}>
        <Stack component="form" spacing={3} onSubmit={handleSubmit}>
          <Typography variant="body2" color="text.secondary">
            Update the header title and replace the mascot image without leaving the page.
          </Typography>

          <TextField
            label="Hero title"
            value={draft.title}
            onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
            required
            fullWidth
            autoFocus
          />

          <Stack spacing={1.5}>
            <Typography variant="subtitle2" component="label">
              Mascot image
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing(2),
                p: theme.spacing(2),
                borderRadius: `${theme.shape.borderRadius}px`,
                border: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.default,
                [theme.breakpoints.down('sm')]: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                },
              }}
            >
              <Box
                sx={{
                  width: theme.spacing(14),
                  height: theme.spacing(14),
                  borderRadius: `${theme.shape.borderRadius}px`,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.shadows[0],
                  backgroundColor: theme.palette.background.paper,
                  overflow: 'hidden',
                  flexShrink: 0,
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                {draft.mascotSrc ? (
                  <Box
                    component="img"
                    src={draft.mascotSrc}
                    alt={draft.mascotAlt || 'Mascot preview'}
                    sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', px: 1 }}>
                    No image selected
                  </Typography>
                )}
              </Box>

              <Stack spacing={1.25} sx={{ minWidth: 0 }}>
                <Typography variant="body2" color="text.secondary">
                  Preview the mascot before saving.
                </Typography>
                <Button component="label" variant="outlined" sx={{ alignSelf: 'flex-start' }}>
                  {draft.mascotSrc ? 'Replace image' : 'Upload image'}
                  <Box
                    component="input"
                    id={imageInputId}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageUpload}
                  />
                </Button>
              </Stack>
            </Box>
          </Stack>

          <TextField
            label="Mascot alt text"
            value={draft.mascotAlt}
            onChange={(event) => setDraft((current) => ({ ...current, mascotAlt: event.target.value }))}
            helperText="Describe the mascot for screen readers and non-visual users."
            fullWidth
          />

          <DialogActions sx={{ px: 0, pt: theme.spacing(1) }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save changes
            </Button>
          </DialogActions>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
