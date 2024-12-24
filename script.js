function sendMessage() {
    // Get user input
    const message = document.getElementById('message').value;

    // user enters a message
    if (!message.trim()) {
        alert("Please enter a message.");
        return;
    }

    // data for API
    const data = JSON.stringify({
        messages: [
            {
                role: 'user',
                content: message
            }
        ],
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 256,
        web_access: false
    });

    //XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            const responseElement = document.getElementById('response');
            
            try {
                const jsonResponse = JSON.parse(this.responseText);
                console.log("Parsed Response:", jsonResponse);

                // Update response handling to extract the 'result' field
                if (jsonResponse.result) {
                    responseElement.textContent = jsonResponse.result;
                } else {
                    responseElement.textContent = "Unexpected response format.";
                }
            } catch (error) {
                responseElement.textContent = "Error parsing response: " + error.message;
            }
        }
    });

    // Open and send request
    xhr.open('POST', 'https://chatgpt-42.p.rapidapi.com/gpt4');
    xhr.setRequestHeader('x-rapidapi-key', '7de6f5a7edmsh00119ac6a48dc9fp100bedjsn0e63adf77f99');
    xhr.setRequestHeader('x-rapidapi-host', 'chatgpt-42.p.rapidapi.com');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(data);

    // Show loading text
    document.getElementById('response').textContent = "Loading response...";
}
