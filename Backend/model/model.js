const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
	questions: [
		{
			question: String,
			answer: String,
		},
	],
});

module.exports = mongoose.model(
	"KnowledgeBase",
	QuestionSchema,
	"knowledgeBase"
);
