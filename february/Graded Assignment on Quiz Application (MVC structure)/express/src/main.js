const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://localhost/quizApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Mongoose schemas for User and QuizQuestion
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});

const quizQuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctOption: Number,
});

// Create Mongoose models
const UserModel = mongoose.model("User", userSchema);
const QuizQuestionModel = mongoose.model("QuizQuestion", quizQuestionSchema);

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Mock Quiz Question Data Array
const quizData = [
  {
    question: "What does HTML stand for?",
    choices: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminal Motorboats Lamborginis",
    ],
    answer: "Hypertext Markup Language",
  },
  {
    question: "What does CSS stand for?",
    choices: [
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "What does JS stand for?",
    choices: ["JavaScript", "JavaSuper", "JustScript", "JollySavage"],
    answer: "JavaScript",
  },
  {
    question: "What does API stand for?",
    choices: [
      "Application Programming Interface",
      "Apple Pie Is...",
      "Application Pie Interface",
      "Apples Play Idle",
    ],
    answer: "Application Programming Interface",
  },
  {
    question: "What does JSON stand for?",
    choices: [
      "JavaScript Object Notation",
      "JavaScript On Nap",
      "Java Source Open Now",
      "Jump Source Object Notation",
    ],
    answer: "JavaScript Object Notation",
  },
];

let currentQuestionIndex = 0;
let correctAnswers = 0;

// Endpoint to get the current quiz question
app.get("/quiz/question", (req, res) => {
  const currentQuestion = quizData[currentQuestionIndex];
  res.json({
    question: currentQuestion.question,
    options: currentQuestion.options,
  });
});

// Endpoint to submit an answer
app.post("/quiz/submit", (req, res) => {
  const selectedOptionIndex = req.body.optionIndex;

  if (
    selectedOptionIndex !== undefined &&
    selectedOptionIndex >= 0 &&
    selectedOptionIndex < quizData[currentQuestionIndex].options.length
  ) {
    const isCorrect =
      selectedOptionIndex === quizData[currentQuestionIndex].correctOption;
    if (isCorrect) {
      correctAnswers++;
    }
    console.log(
      `Question ${currentQuestionIndex + 1}: ${isCorrect ? "Correct" : "Wrong"}`
    );

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
      const nextQuestion = quizData[currentQuestionIndex];
      res.json({
        question: nextQuestion.question,
        options: nextQuestion.options,
      });
    } else {
      res.json({
        result: `You answered ${correctAnswers} / ${quizData.length} questions correctly`,
      });
    }
  } else {
    res.status(400).json({ error: "Invalid option selected." });
  }
});

// Endpoint for student signup
app.post("/signup/student", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    username,
    password: hashedPassword,
    role: "student",
  });

  await newUser.save();
  res.status(201).json({ message: "Student signed up successfully" });
});

// Endpoint for student login
app.post("/login/student", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Student logged in successfully" });
});

// Endpoint for admin signup
app.post("/signup/admin", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    username,
    password: hashedPassword,
    role: "admin",
  });

  await newUser.save();
  res.status(201).json({ message: "Admin signed up successfully" });
});

// Endpoint for admin login
app.post("/login/admin", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (
    !user ||
    !(await bcrypt.compare(password, user.password)) ||
    user.role !== "admin"
  ) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Admin logged in successfully" });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
