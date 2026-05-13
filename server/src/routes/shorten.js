import { Router } from 'express';
import Url from '../models/Url.js';
import generateCode from '../utils/nanoid.js';
import { isValidUrl } from '../utils/validateUrl.js';

const router = Router();

// Public — no auth required
router.post('/', async (req, res, next) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) return res.status(400).json({ message: 'URL is required' });
    if (!isValidUrl(originalUrl)) return res.status(400).json({ message: 'Invalid URL format' });

    const shortCode = generateCode();
    const url = await Url.create({ originalUrl, shortCode });
    res.status(201).json(url);
  } catch (err) {
    next(err);
  }
});

export default router;
