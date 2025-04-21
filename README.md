# AI Grocery Budget Planner

A professional web application that helps users plan their grocery shopping with AI-powered recommendations and a chatbot assistant. The application uses the Gemini 2.0 Flash API for generating personalized recommendations and chat responses.

## Features

- Budget-based grocery shopping recommendations
- Interactive chatbot for personalized grocery planning advice
- Modern, responsive design with gradient background
- Real-time API integration with Gemini AI
- Mobile-friendly interface

## Prerequisites

- Python 3.8 or higher
- Modern web browser
- Internet connection

## Setup Instructions

1. Clone this repository to your local machine.

2. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

3. The Gemini API key is already configured in the backend code. If you want to use your own API key, update the `GEMINI_API_KEY` variable in `app.py`.

4. Start the Flask backend server:
   ```bash
   python app.py
   ```

5. Open `index.html` in your web browser. You can do this by:
   - Double-clicking the file
   - Using a local development server
   - Using Python's built-in HTTP server:
     ```bash
     python -m http.server 8000
     ```
     Then navigate to `http://localhost:8000`

## Usage

1. **Getting Budget Recommendations:**
   - Enter your grocery budget in the input field
   - Click "Get Recommendations" or press Enter
   - View the AI-generated shopping recommendations

2. **Using the Chatbot:**
   - Type your question about grocery shopping, meal planning, or budgeting
   - Click "Send" or press Enter
   - View the AI assistant's response
   - Continue the conversation as needed

## Technical Details

- Frontend: HTML5, CSS3, Vanilla JavaScript
- Backend: Flask (Python)
- AI Integration: Gemini 2.0 Flash API
- Cross-Origin Resource Sharing (CORS) enabled
- Responsive design with mobile support
- Real-time API communication

## Security Notes

- The Gemini API key is stored securely in the backend
- All API requests are handled server-side
- Input validation is implemented for both frontend and backend
- Error handling is implemented for all API calls

## Troubleshooting

If you encounter any issues:

1. Ensure all Python dependencies are installed correctly
2. Check that the Flask server is running on port 5000
3. Verify your internet connection for API access
4. Check the browser console for any JavaScript errors
5. Ensure CORS is properly configured if using a different domain

## License

This project is open source and available under the MIT License. 