import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

const TradeModal = ({ open, handleClose, games, symbol }: any) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="trade-modal-title"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
        minWidth: 300,
        maxWidth: '80%',
        maxHeight: '80%',
        overflowY: 'auto'
      }}>
        <Typography id="trade-modal-title" variant="h6" component="h2" sx={{ marginBottom: 2 }}>
          {`Choose a game to trade $${symbol}`}
        </Typography>
        <Grid container spacing={2}>
          {games.map((game: any) => (
            <Grid item xs={12} sm={6} md={4} key={game.id}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => window.location.href = `/games/${game.shareId}?symbol=${symbol}`}
                sx={{ justifyContent: 'flex-start' }}
              >
                {game.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Modal>
  );
};

export default TradeModal;
