const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll( {include: [{model: Product}]})
  .then((data) => res.json(data))
  .catch((error) => res.json(error))

});

router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, { include: [{ model: Product}] })
  .then((data) => res.json(data))


});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({ tag_name: req.body.tag_name})
  .then((datainfo) => {
    res.json(datainfo)
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });


});

router.put('/:id', async(req, res) => {
  const update = await Tag.update({tag_name: req.body.tag_name}, {where: {id: req.params.id}})
  const resp =` The tag was updated ${req.body.tag_name}`
  res.json({
    msg: resp,
    request: update
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value

  Tag.destroy({where: {id: req.params.id} })
  .then((category) => {
    res.status(200).json({
      "Message": `"Category with id: ${req.params.id} was deleted"`,
      "Result": req.body.tag_name
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });



});

module.exports = router;
