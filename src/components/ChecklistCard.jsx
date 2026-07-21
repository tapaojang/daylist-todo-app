import { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Checkbox,
  IconButton,
  TextField,
  Collapse,
} from '@mui/material';
import { Plus, Trash2, X, Check } from 'lucide-react';

export default function ChecklistCard({ title, icon, items, onToggle, onAdd, onRemove }) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState('');

  const doneCount = items.filter((i) => i.done).length;

  const submitDraft = () => {
    const value = draft.trim();
    if (value) onAdd(value);
    setDraft('');
    setAdding(false);
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <span style={{ fontSize: 16, lineHeight: 1 }}>{icon}</span>
          <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: 14 }}>
            {title}
          </Typography>
        </Stack>
        <Typography sx={{ fontSize: 11.5, color: 'text.secondary', fontFamily: 'JetBrains Mono', transform: 'translate(10px, 2px)'}}>
          {doneCount}/{items.length}
        </Typography>
      </Stack>

      <Stack spacing={0.25}>
        {items.map((item) => (
          <Stack
            key={item.id}
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{
              borderRadius: 1.5,
              px: 0.5,
              '&:hover .row-delete': { opacity: 1 },
            }}
          >
            <Checkbox
              size="small"
              checked={item.done}
              onChange={() => onToggle(item.id)}
              sx={{ p: 0.75 }}
            />
            <Typography
              sx={{
                fontSize: 13.5,
                flex: 1,
                textDecoration: item.done ? 'line-through' : 'none',
                color: item.done ? 'text.secondary' : 'text.primary',
                transform: 'translateY(6px)',
              }}
            >
              {item.title}
            </Typography>
            <IconButton
              size="small"
              className="row-delete"
              onClick={() => onRemove(item.id)}
              sx={{ opacity: 0, transition: 'opacity 0.14s ease', p: 0.5 }}
              aria-label={`Remove ${item.title}`}
            >
              <Trash2 size={13} />
            </IconButton>
          </Stack>
        ))}
      </Stack>

      <Collapse in={adding}>
        <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5} px={0.5}>
          <TextField
            size="small"
            autoFocus
            placeholder="Add an item…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submitDraft();
              if (e.key === 'Escape') { setAdding(false); setDraft(''); }
            }}
            variant="standard"
            fullWidth
          />
          <IconButton size="small" onClick={submitDraft} aria-label="Confirm add">
            <Check size={14} />
          </IconButton>
          <IconButton size="small" onClick={() => { setAdding(false); setDraft(''); }} aria-label="Cancel add">
            <X size={14} />
          </IconButton>
        </Stack>
      </Collapse>

      {!adding && (
        <Box
          component="button"
          onClick={() => setAdding(true)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            mt: 0.5,
            ml: 0.5,
            border: 'none',
            background: 'none',
            color: 'primary.main',
            fontSize: 12.5,
            fontWeight: 600,
            fontFamily: 'Inter',
            cursor: 'pointer',
            p: 0.5,
          }}
        >
          <Plus size={13} strokeWidth={2.4} /> Add list item
        </Box>
      )}
    </Box>
  );
}
