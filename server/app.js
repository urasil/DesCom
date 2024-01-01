import express from "express"
import cors from "cors"
import OpenAI from "openai"
import "dotenv/config"
import { systemPrompt } from "./prompt.js"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const app = express()

app.use(cors())
app.use(express.json())

//defining home route
app.get("/", (req, res) => {
    res.send("API working")
})

app.post("/create-fake-comments", async(req, res) => {
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "system",
                content: `${req.body.productName} - ${req.body.commentType} - ${req.body.commentCount} adet`
            }
        ],
    });
    if(chatCompletion.choices[0].message.content === "NO_COMMENT"){
        return res.send({
            error:true
        })
    }

    const comments = chatCompletion.choices[0].message.content.split("---").map(comment => {
        const matches = comment.match(/author: (.+)\ncomment: (.+)/s)
        const author = matches[1]
        const commentText = matches[2]
        return {author, comment: commentText}
    })
    res.send(comments)

})

//starting the server
app.listen(3000, () => console.log("Listening on port 3000"))