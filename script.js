const API_BASE_URL = 'http://localhost:5000';

// Format number as INR currency
function formatINR(number) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(number);
}

async function getRecommendations() {
    const budget = document.getElementById('budget').value;
    if (!budget || budget < 100) {
        alert('Please enter a valid budget (minimum ₹100)');
        return;
    }

    const loadingElement = document.getElementById('recommendations-loading');
    const recommendationsElement = document.getElementById('recommendations');
    
    loadingElement.style.display = 'block';
    recommendationsElement.textContent = '';

    try {
        const response = await fetch(`${API_BASE_URL}/recommendations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                budget,
                currency: 'INR'
            })
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }

        // Format the recommendations with proper currency
        const formattedRecommendations = data.recommendations.replace(/\$(\d+)/g, (match, amount) => {
            return formatINR(amount);
        });

        recommendationsElement.textContent = formattedRecommendations;
    } catch (error) {
        alert('Error getting recommendations: ' + error.message);
    } finally {
        loadingElement.style.display = 'none';
    }
}

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;

    const chatContainer = document.getElementById('chat-container');
    const loadingElement = document.getElementById('chat-loading');

    // Add user message
    const userDiv = document.createElement('div');
    userDiv.className = 'message user-message';
    userDiv.textContent = message;
    chatContainer.appendChild(userDiv);

    // Clear input and scroll to bottom
    input.value = '';
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Show loading
    loadingElement.style.display = 'block';

    try {
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                message,
                currency: 'INR'  // Indicate preference for INR in responses
            })
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }

        // Format the bot's response with proper currency
        const formattedResponse = data.response.replace(/\$(\d+)/g, (match, amount) => {
            return formatINR(amount);
        });

        // Add bot message
        const botDiv = document.createElement('div');
        botDiv.className = 'message bot-message';
        botDiv.textContent = formattedResponse;
        chatContainer.appendChild(botDiv);
    } catch (error) {
        alert('Error sending message: ' + error.message);
    } finally {
        loadingElement.style.display = 'none';
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

// Handle Enter key in chat input
document.getElementById('chat-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Handle Enter key in budget input
document.getElementById('budget').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getRecommendations();
    }
}); 