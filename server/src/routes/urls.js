import { Router } from 'express';
import Url from '../models/Url.js';
import auth from '../middleware/auth.js';
import generateCode from '../utils/nanoid.js';
import { isValidUrl } from '../utils/validateUrl.js';

const router = Router();
router.use(auth);

router.post('/', async (req, res, next) => {
  try {
    const { originalUrl, customAlias, expiresAt } = req.body;
    if (!originalUrl) return res.status(400).json({ message: 'Original URL is required' });
    if (!isValidUrl(originalUrl)) return res.status(400).json({ message: 'Invalid URL format' });

    const shortCode = customAlias?.trim() || generateCode();

    if (customAlias?.trim()) {
      const exists = await Url.findOne({ shortCode });
      if (exists) return res.status(409).json({ message: 'Alias already taken' });
    }

    const url = await Url.create({
      originalUrl,
      shortCode,
      user: req.user.id,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    });

    res.status(201).json(url);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const urls = await Url.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const url = await Url.findOne({ _id: req.params.id, user: req.user.id });
    if (!url) return res.status(404).json({ message: 'Not found' });
    res.json(url);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const url = await Url.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!url) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
