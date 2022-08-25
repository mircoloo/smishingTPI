const express = require('express');
var router = express.Router();
const db  = require('../scripts/db')

router.post("/getAll",  async (req, res) => {
    //let sql = "SELECT link, COUNT(*) AS n FROM twittdata GROUP BY link HAVING CHAR_LENGTH(link)>0;"
    let limit = req.body.limit ? parseInt(req.body.limit): 5
    const sql = "SELECT * FROM Telldata ORDER BY id DESC LIMIT " + limit
    await db.query(sql, (err, result) => {
    res.json(result)
    })
})

router.get("/getOne", async (req, res) => {
    const sql = "SELECT * FROM Telldata WHERE Number =  " + req.query.number + " LIMIT 1"
    await db.query(sql, (err, result) => {
    res.json(result)  
    })
})

router.post("/getKeyWords", async (req, res) => {
    const { keyWords } = req.body 
    const sql = `SELECT * FROM Telldata WHERE Comment LIKE '%${keyWords}%';`
    await db.query(sql, (err, result) => {
    res.json(result)  
    })
})




router.post('/comments', async (req, res) => {
    let { telldata_id, nickname, comment} = req.body;
    if (!telldata_id || !nickname || !comment){res.json("Missing informations")}else{
        let sql = `INSERT INTO Comments (telldata_id, nickname, comment) VALUES (${telldata_id}, '${nickname}', '${comment}')`;
        await db.query(sql, (err, result) => {
            if(err) throw(err)
            res.json({inserted: true})
        })
    }
})

router.post('/comments/addLike', async (req, res) => {
    let { comment_id, user_id } = req.body
    
    if (!comment_id || !user_id){res.json("Missing informations")}else
    
    {

            let sql = `SELECT * FROM Likes WHERE comment_id = ${comment_id} AND user_id = ${user_id}`
/*         let sql = `INSERT INTO Likes (comment_id, user_id) select ${comment_id}, ${user_id} WHERE NOT EXISTS (SELECT * FROM Likes WHERE comment_id = ${comment_id} AND user_id = ${user_id});` 
 */        await db.query(sql, (err, result) => {
            if(err) throw(err)
            if(result.length > 0){
                sql = `DELETE FROM Likes WHERE comment_id = ${comment_id} AND user_id = ${user_id}`
                 db.query(sql, (err, result) => {
                    res.json({added: false})
                 })
            }else{
                sql = `INSERT INTO Likes (comment_id, user_id) select ${comment_id}, ${user_id} WHERE NOT EXISTS (SELECT * FROM Likes WHERE comment_id = ${comment_id} AND user_id = ${user_id});`
                 db.query(sql, (err, result) => {
                    res.json({added: true})
                 })
            } 
            
        })
    }
})

router.get('/comments/typeOfSms', async (req, res) => {
    //console.log(req.params)

    let sql = `SELECT type as label ,COUNT(*) as count FROM Telldata GROUP BY type` 
    await db.query(sql, (err, result) => {
        if(err) throw(err)
        res.json(result)
    })
})


router.get('/comments/:id/getLike', async (req, res) => {
        //console.log(req.params)
    
        let sql = `SELECT COUNT(*) AS Count FROM Likes WHERE comment_id = ${req.params.id};` 
        await db.query(sql, (err, result) => {
            if(err) throw(err)
            res.json(result)
        })
})

router.get('/comments/:number', async (req, res) => {
    
    let { number } = req.params;
    let sql = "SELECT  C.id, C.telldata_id, C.comment, C.nickname, C.likes, C.dislikes, C.creationDate, C.parentId FROM Comments as C, Telldata as T WHERE C.telldata_id = T.id AND T.number = " + number;
    await db.query(sql, (err, result) => {
        if(err) throw(err)
        res.json(result)
    })
})

router.post('/comments/addDislike', async (req, res) => {
    let { comment_id, user_id } = req.body
    
    if (!comment_id || !user_id){res.json("Missing informations")}else
    
    {

            let sql = `SELECT * FROM Dislikes WHERE comment_id = ${comment_id} AND user_id = ${user_id}`
/*         let sql = `INSERT INTO Likes (comment_id, user_id) select ${comment_id}, ${user_id} WHERE NOT EXISTS (SELECT * FROM Likes WHERE comment_id = ${comment_id} AND user_id = ${user_id});` 
 */        await db.query(sql, (err, result) => {
            if(err) throw(err)
            if(result.length > 0){
                sql = `DELETE FROM Dislikes WHERE comment_id = ${comment_id} AND user_id = ${user_id}`
                 db.query(sql, (err, result) => {
                    res.json({added: false})
                 })
            }else{
                sql = `INSERT INTO Dislikes (comment_id, user_id) select ${comment_id}, ${user_id} WHERE NOT EXISTS (SELECT * FROM Dislikes WHERE comment_id = ${comment_id} AND user_id = ${user_id});`
                 db.query(sql, (err, result) => {
                    res.json({added: true})
                 })
            } 
            
        })
    }
})

router.get('/comments/:id/getDislike', async (req, res) => {
    //console.log(req.params)

    let sql = `SELECT COUNT(*) AS Count FROM Dislikes WHERE comment_id = ${req.params.id};` 
    await db.query(sql, (err, result) => {
        if(err) throw(err)
        res.json(result)
    })
})



    


module.exports = router