const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET all products
router.get('/', (req, res) => {
  Product.findAll({
    include: [{ model: Category }, { model: Tag }],
  })
    .then((products) => res.json(products))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

// GET a product by ID
router.get('/:id', (req, res) => {
  Product.findByPk(req.params.id, {
    include: [{ model: Category }, { model: Tag }],
  })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

// POST a new product
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(201).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

// PUT update a product by ID
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((rowsUpdated) => {
      if (!rowsUpdated[0]) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // Update ProductTag associations if tagIds were provided
      if (req.body.tagIds && req.body.tagIds.length) {
        return ProductTag.findAll({ where: { product_id: req.params.id } })
          .then((productTags) => {
            const productTagIds = productTags.map(({ tag_id }) => tag_id);
            const newProductTags = req.body.tagIds
              .filter((tag_id) => !productTagIds.includes(tag_id))
              .map((tag_id) => {
                return {
                  product_id: req.params.id,
                  tag_id,
                };
              });
            const productTagsToRemove = productTags
              .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
              .map(({ id }) => id);

            return Promise.all([
              ProductTag.destroy({ where: { id: productTagsToRemove } }),
              ProductTag.bulkCreate(newProductTags),
            ]);
          });
      }
      return res.json({ message: 'Product updated' });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

// DELETE a product by ID
router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleted) => {
      if (!deleted) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;
