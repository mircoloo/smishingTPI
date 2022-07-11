const express = require('express');
const router = express.Router();
const db = require('../scripts/db')

router.get('/:id', async (req, res) => {
    
    let sql = "SELECT * FROM Users WHERE id = " + req.params.id;
    await db.query(sql, (err, result) => {
        if(err) throw(err)
        res.json(result)
})
})



module.exports = router