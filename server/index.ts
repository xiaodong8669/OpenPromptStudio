// @ts-ignore
import express from "express"
// @ts-ignore
import cors from "cors"
import * as dotenv from "dotenv"
import { translate } from "./translate"
dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.post("/prompt-studio/translate/prompts", async (req: any, res: any) => {
    let input: { words: string[]; to: string } = req.body
    let orgText = input.words.join("\n")
    const finText = await translate({ text: orgText, to: input.to ?? "zh-cn", server: "tencent" })

    if (finText) {
        let words = finText.split("\n")
        res.json(words)
    } else {
        res.json([])
    }
})

const port = process.env.PORT || 19212
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
.env：

TENCENT_SECRET_ID = "AKIDWr8RjqPp1zwkIbmpodHl2715Z1Tdt0xi"
TENCENT_SECRET_KEY = "pcFhz6zf7MM7ey4wb3GExZBoJcnptttp"
