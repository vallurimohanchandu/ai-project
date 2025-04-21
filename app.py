from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import google.generativeai as genai
import os

app = Flask(__name__)
CORS(app)

# Configure Gemini API
GEMINI_API_KEY = "AIzaSyD4OuyUUsUWEc1V6B4T3LEuUuNS8t0jtHE"
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash')

@app.route('/')
def index():
    return send_from_directory(os.path.dirname(os.path.abspath(__file__)), 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(os.path.dirname(os.path.abspath(__file__)), filename)

def get_budget_recommendations(budget):
    prompt = f"""As a grocery shopping expert in India, provide a detailed shopping recommendation for a budget of ₹{budget}.
    Include:
    1. Suggested grocery categories with typical Indian items
    2. Estimated costs per category in INR
    3. Tips for maximizing the budget in Indian grocery stores
    4. Suggestions for seasonal vegetables and fruits available in India
    
    Format the response in a clear, structured way with categories and bullet points.
    All prices should be in INR (₹).
    Consider local Indian brands and products available in typical Indian grocery stores."""
    
    response = model.generate_content(prompt)
    return response.text

def get_chatbot_response(user_message):
    prompt = f"""As a grocery shopping and meal planning expert familiar with Indian markets and cuisine, please respond to: {user_message}
    
    Consider:
    - Indian grocery items and brands
    - Local market conditions and pricing
    - Regional variations in prices
    - Seasonal availability of items in India
    - Traditional Indian cooking methods and ingredients
    
    Provide practical advice related to grocery shopping, meal planning, or budgeting in the Indian context.
    All prices should be mentioned in INR (₹)."""
    
    response = model.generate_content(prompt)
    return response.text

@app.route('/recommendations', methods=['POST'])
def recommendations():
    try:
        data = request.json
        budget = data.get('budget')
        
        if not budget:
            return jsonify({'error': 'Budget is required'}), 400
            
        recommendations = get_budget_recommendations(budget)
        return jsonify({'recommendations': recommendations})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        message = data.get('message')
        
        if not message:
            return jsonify({'error': 'Message is required'}), 400
            
        response = get_chatbot_response(message)
        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 