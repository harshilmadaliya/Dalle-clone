import express from "express";
import * as dotenv from "dotenv";
import OpenAI from 'openai';
import cors from "cors";



const app = express();

dotenv.config();
app.use(express.json({ limit: '50mb' }));


const router = express.Router();
app.use(cors());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

// router.route("/").get((req, res) => {
//     res.send("Hello");
// });

router.route("/").post(async (req, res) => {
    try {
        const { prompt } = req.body;
        const aiResponse = await  openai.images.generate({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: 'b64_json',
        });
            const image = aiResponse.data.data[0].b64_json
            // const image = aiResponse.data[0].b64_json;

            console.log(aiResponse.data.data[0].url);
            res.status(200).json({ photo: image })
            // console.log(image)
    } catch (error) {
        console.log(error)
        res.status(500).send("hisorry brother")
    }


    // try {
    //     const response = await axios.post('https://api.openai.com/v1/images', {
    //       prompt,
    //       model: 'image-alpha-001',
    //       size: '256x256',
    // }, {
    //   headers: {
    //     Authorization: `Bearer ${apiKey}`,
    //   },
    // });
    //     setImage(response.data.url);
    //   } catch (error) {
    //     console.error('Error generating image:', error);
    //   }



});
export default router;