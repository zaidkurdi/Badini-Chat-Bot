const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Question = require("./model/model");
const app = express();
const PORT = 4400;
app.use(bodyParser.json());
app.use(express.json());

require("dotenv").config();

const corsOptions = {
	origin: "http://localhost:4200",
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

mongoose
	.connect(process.env.DB_URL)
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));

app.post("/addQuestion", async (req, res) => {
	const { question, answer } = req.body;
	try {
		const existingDoc = await Question.findOne();
		existingDoc.questions.push({ question, answer });
		await existingDoc.save();
		res.status(200).send("Question added successfully");
	} catch (error) {
		console.error(error);
		res.status(500).send("Error adding question " + error.message);
	}
});

app.get("/getAllQuestions", async (req, res) => {
	try {
		const questions = await Question.find();
		res.status(200).send(questions);
	} catch (error) {
		console.error(error);
		res.status(500).send("Error fetching questions");
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
