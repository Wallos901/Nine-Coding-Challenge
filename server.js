const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const errorMsg = "Oh no, theres been a problem. Please ensure you have correctly formatted your JSON object, and all shows are provided under the 'payload' key :)"

app.use(express.json());
app.use((err, req, res, next) => {
    res.status(400).send({ 'error': errorMsg })
});

app.post("/", (req, res) => {
    let response = [];
    try {
        req.body.payload.forEach(show => {
            if(show.drm && show.episodeCount > 0) {
                response.push({
                    image: show.image.showImage,
                    slug: show.slug,
                    title: show.title
                })
            }
        });
        res.send({response});
    } catch(err) { res.status(400).send({ 'error': errorMsg }) }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;