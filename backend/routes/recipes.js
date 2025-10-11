const express = require('express');
const router = express.Router();
const recipesData = require('../data/recipes.json');

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Get list of recipes with SFWP options
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Field to sort by (prepTime, rating, name)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order
 *       - in: query
 *         name: cuisine
 *         schema:
 *           type: string
 *         description: Filter by cuisine type
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *         description: Filter by difficulty level
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: List of recipes
 */
router.get('/', (req, res) => {
  let { sort, order, cuisine, difficulty, search, page = 1, limit = 12 } = req.query;
  
  let results = [...recipesData];
  
  // FILTERING
  if (cuisine) {
    results = results.filter(r => r.cuisine === cuisine);
  }
  
  if (difficulty) {
    results = results.filter(r => r.difficulty === difficulty);
  }
  
  // SEARCHING
  if (search) {
    const searchLower = search.toLowerCase();
    results = results.filter(r => 
      r.name.toLowerCase().includes(searchLower) ||
      r.description.toLowerCase().includes(searchLower)
    );
  }
  
  // SORTING
  if (sort) {
    results.sort((a, b) => {
      let valA = a[sort];
      let valB = b[sort];
      
      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }
      
      if (order === 'desc') {
        return valA > valB ? -1 : 1;
      }
      return valA > valB ? 1 : -1;
    });
  }
  
  // PAGINATION
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const start = (pageNum - 1) * limitNum;
  const end = start + limitNum;
  
  const paginated = results.slice(start, end);
  
  res.json({
    data: paginated,
    pagination: {
      currentPage: pageNum,
      totalPages: Math.ceil(results.length / limitNum),
      totalItems: results.length,
      itemsPerPage: limitNum
    }
  });
});

/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     summary: Get recipe details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Recipe details
 *       404:
 *         description: Recipe not found
 */
router.get('/:id', (req, res) => {
  const recipe = recipesData.find(r => r.id === parseInt(req.params.id));
  
  if (!recipe) {
    return res.status(404).json({ error: 'Recipe not found' });
  }
  
  res.json(recipe);
});

module.exports = router;