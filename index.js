import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    /*if(req.body.txtBox.value.length = 0) {
        req.body.keyWord.value = "Random"
    }*/
    //console.log("keyWord: " + req.body.keyWord);
    try {
        const img = await axios.get("https://shibe.online/api/shibes");
        const qte = await axios.get("https://ron-swanson-quotes.herokuapp.com/v2/quotes");
        //console.log("-----js side-----");
        //console.log("img: " + img.data + "\nqte: " + qte.data);
        res.render("index.ejs", { image : img.data, quote : qte.data });
    } catch (error) {
        res.render("index.ejs", { data : JSON.stringify(error.response.data) });
    }
});

app.post("/", async (req, res) => {
    //console.log("keyWord: " + req.body.keyWord);
    try {
        /*if(req.body.txtBox.length = 0) {
            req.body.keyWord.value = "Random"
        }*/
        const keyW = req.body.keyWord;
        //console.log("Key: " + keyW);
        const img = await axios.get("https://shibe.online/api/shibes");
        if(keyW.length > 0) {
            const qte = await axios.get("https://ron-swanson-quotes.herokuapp.com/v2/quotes/search/" + keyW);
            res.render("index.ejs", { image : img.data, quote : qte.data });
        } else {
            const qte = await axios.get("https://ron-swanson-quotes.herokuapp.com/v2/quotes/");
            res.render("index.ejs", { image : img.data, quote : qte.data });
        }
    } catch (error) {
        res.render("index.ejs", { quote : JSON.stringify(error.response.data) });
    }
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});