const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get('/', (req, res) => {
  Tag.findAll({
    include: [{ model: Product }],
  })
    .then((tags) => res.json(tags))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

// GET a tag by ID
router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {
    include: [{ model: Product }],
  })
    .then((tag) => {
      if (!tag) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      res.json(tag);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

// POST a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((tag) => res.status(201).json(tag))
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

// PUT update a tag by ID
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((rowsUpdated) => {
      if (!rowsUpdated[0]) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      res.json({ message: 'Tag updated' });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

// DELETE a tag by ID
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleted) => {
      if (!deleted) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      res.json({ message: 'Tag deleted' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;
