import { getSong, hello } from '@src/api/song';
import { Router } from 'express';

const router = Router();

router.get('/songs/:songName', getSong);
router.get('/hello', hello);

export default router;
