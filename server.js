const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use((err, req, res, next) => {
    console.log(err);
    res.status(400).json({ "error": "Could not decode request. Please ensure all JSON objects in your request are formatted correctly :)" })
});

app.post("/", (req, res) => {
    try {
        res.json({ "response": searchShows(req.body.payload) });
    } catch(err) {
        console.log(err);
        res.status(400).json({ "error": "Could not decode request. Please ensure all shows are provided under the 'payload' key :)"});
    }
});

function searchShows(showList) {
    let showsPassed = [];
    showList.forEach(show => {
        show = checkShow(show);
        if(show) showsPassed.push(show);
    });
    return showsPassed;
};

function checkShow(show) {
    if(show.drm && show.episodeCount > 0) {
        return {
            image: show.image.showImage,
            slug:  show.slug,
            title: show.title
        };
    };
};

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;