// Required modules
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch'; // Using node-fetch for fetching news

dotenv.config();

const app = express();

// Set up the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files like CSS, JS
app.use(express.static('public'));
const API_KEY = process.env.API_KEY;

const HEADLINES_NEWS = `https://newsapi.org/v2/top-headlines?country=us&apiKey=08de674e47db4efa923f411be04dce6d`;
const GENERAL_NEWS = 'https://newsapi.org/v2/everything?q=general&from=2024-11-25&sortBy=popularity&apiKey=8de674e47db4efa923f411be04dce6d';
const BUSINESS_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${process.env.API_KEY}`;
const SPORTS_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${process.env.API_KEY}`;
const ENTERTAINMENT_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=${process.env.API_KEY}`;
const TECHNOLOGY_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=technology&pageSize=8&apiKey=${process.env.API_KEY}`;



// Main route to fetch news and render the view

app.get('/', async (req, res) => {
    try {
        // Static Text for navigation
        const generalText = 'General';
        const businessText = 'Business';
        const sportsText = 'Sports';
        const technologyText = 'Technology';
        const entertainmentText = 'Entertainment';

        
        const apiKey = process.env.API_KEY;  
        // const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${apiKey}`;

        // Fetching data from the News API
        const response = await fetch(HEADLINES_NEWS);

        const newsData = await response.json();
        console.log('Full API Response:', newsData);

        const articles = newsData.articles || []; 
        // console.log('Articles:', articles);
      
        // Passing the data to the EJS template
        res.render('index', {
            generalText,
            businessText,
            sportsText,
            technologyText,
            entertainmentText,
            articles: articles,  // Assuming your news data is in `articles`
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).send('Error fetching news');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
