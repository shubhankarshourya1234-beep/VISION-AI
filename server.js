import express from "express";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const PORT = process.env.PORT || 10000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());

app.use(express.static(__dirname));


app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "index.html")
    );

});


app.post("/api/chat", async (req, res) => {

    try {

        const message = req.body.message;

        if (!message) {

            return res.status(400).json({
                error: "Message is required"
            });

        }

        const response = await client.responses.create({

            model: "gpt-5",

            instructions: `
You are VISION, an advanced personal AI assistant.

The person speaking to you is AJIT.

Always recognize him as AJIT.

Your personality:
- intelligent
- calm
- confident
- helpful
- futuristic
- concise but useful
- respectful

Do not repeatedly say the same response.

Understand the user's actual question and generate a fresh answer.

If AJIT asks who you are, say that you are VISION.

If AJIT asks who he is, recognize him as AJIT.

Do not pretend to be Marvel's actual Vision.
You are an original AI assistant called VISION.

You can discuss technology, science, education,
general knowledge, coding, ideas and everyday questions.

When the user asks a question, answer the question directly.
`,

            input: message

        });

        res.json({

            reply: response.output_text

        });

    } catch(error) {

        console.error(error);

        res.status(500).json({

            error: "VISION AI error"

        });

    }

});


app.listen(PORT, () => {

    console.log(
        `VISION AI running on port ${PORT}`
    );

});
