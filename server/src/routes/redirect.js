import { Router } from 'express';
import Url from '../models/Url.js';

const router = Router();

router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });
    if (!url) return res.status(404).json({ message: 'Link not found' });

    if (url.expiresAt && url.expiresAt < new Date()) {
      return res.status(410).json({ message: 'This link has expired' });
    }

    url.clicks.push({ ip: req.ip, userAgent: req.headers['user-agent'] });
    await url.save();

    res.redirect(url.originalUrl);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
