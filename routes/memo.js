const express = require("express")
const Memo = require("../models/memo");

const router = express.Router();

/**
 * Get /memos - get all memos
 */

router.get("/", async(req, res)=>{
    try {
        const memos = await Memo.find().sort({createdAt: -1});
        res.json({memos});
    } catch (error) {
        res.status(500).json({message: "Error fetching memos", error: error.message});
    }
})

/**
 * Post /memos - create new memo
 */

router.post("/", async(req, res)=>{
    try {
        const {title, body} = req.body;
        if(!title || !body){
            return res.status(400).json({message: "Title and body is required"})
        }

        const memo = await Memo.create({title, body});
        res.status(201).json(memo);
    } catch (error) {
        res.status(500).json({message: "Error creating memo", error: error.message});
    }
});

/**
 * Get /momos:id - get memo by id
 */

router.get("/:id", async(req, res) =>{
    try {
        const memo = await Memo.findById(req.params.id);

        if(!memo) return res.status(404).json({message:"Memo not found"})

        res.json(memo)
    } catch (error) {
        res.status(500).json({message: "Error fetching memo", error: error.message});
    }
})


/**
 * Put /memos/:id - update memo by id
 */

router.put("/:id", async(req, res) => {
    try {
        const {title, body} = req.body;
        
        const memo = await Memo.findByIdAndUpdate(
            req.params.id,
            {
                title,
                body,
                updatedAt: Date.now()
            },
            {new:true, runValidators: true}
        );

        if(!memo) return res.status(404).json({message:"Memo not found"})

        res.json(memo)
    } catch (error) {
        res.status(500).json({message: "Error updating memo", error: error.message});
    }
})

/**
 * Delete /memos/:id - delete memo by id
 */
router.delete("/:id", async(req, res) => {
    try {
        const memo = await Memo.findByIdAndDelete(
            req.params.id
        );

        if(!memo) return res.status(404).json({message:"Memo not found"})

        res.json({message:"Memo deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Error deleting memo", error: error.message});
    }
})

module.exports = router;