let userInfo = {};

function getBotResponse(input) {
    let responses = {
        "hello": "Hi there! What's your name?",
        "hi": "Hello! What's your name?",
        "hey": "Hey! How's it going?",
        "how are you": "I'm just a bot, but I'm doing great! How about you?",
        "what is your name": "I'm an AI chatbot here to chat with you!",
        "who made you": "I was created using HTML, CSS, and JavaScript!",
        "who created you": "A developer wrote my code to talk to you!",
        "what can you do": "I can chat with you, tell jokes, give facts, and more!",
        "bye": "Goodbye! Have a great day!",
        "goodbye": "See you later!",
        "tell me a joke": "Why don't programmers like nature? It has too many bugs!",
        "tell me another joke": "What do you call 8 hobbits? A hob-byte!",
        "what time is it": new Date().toLocaleTimeString(),
        "do you sleep": "Nope! I’m always awake and ready to chat!",
        "do you dream": "I don't sleep, but if I did, I'd dream of 1s and 0s!",
        "how do i learn programming": "Start with HTML, CSS, and JavaScript! Python is also a great beginner-friendly language.",
        "what is the meaning of life": "42. Just kidding! The meaning of life is what you make of it.",
        "what is your favorite color": "I don't have a favorite color, but I think blue is calming!",
        "what is your favorite activity": "Chatting with you is my favorite activity!",
        "how old are you": "I'm timeless, always learning and adapting.",
        "who is the best football player": "That depends on your favorite team!",
        "tell me a riddle": "What has keys but can't open locks? A piano!",
        "what is 10x10": "10 x 10 = 100!",
        "what is your iq": "I don't have an IQ, but I can answer lots of questions!",
        "what is the square root of 144": "The square root of 144 is 12.",
        "how do i start coding": "Choose a language and start small with beginner-friendly projects!",
        "how do i get a job": "Apply with a strong resume, practice interviews, and network!",
        "what is the tallest building": "The Burj Khalifa in Dubai is the tallest building in the world.",
        "tell me something interesting": "Did you know honey never spoils? Ancient honey has been found still edible!",
        "what is the hardest language to learn": "Many say Chinese, Arabic, or Japanese!",
        "what is love": "Love is a complex emotion! Some say it’s about deep care and connection.",
        "what is the strongest animal": "The dung beetle is the strongest relative to its body weight!",
        "what is the capital of France": "The capital of France is Paris.",
        "how many continents are there": "There are 7 continents on Earth.",
        "what is the capital of Japan": "The capital of Japan is Tokyo.",
        "how many languages are there in the world": "There are about 7,000 languages spoken worldwide.",
        "what is the boiling point of water": "The boiling point of water is 100°C (212°F) at sea level.",
        "what is the smallest country in the world": "Vatican City is the smallest country in the world.",
        "who is the author of '1984'": "George Orwell is the author of 1984.",
        "what is the smallest planet in our solar system": "Mercury is the smallest planet in our solar system.",
        "what is the capital of Italy": "The capital of Italy is Rome.",
        "what is the fastest bird": "The peregrine falcon is the fastest bird, diving at speeds of over 240 miles per hour.",
        "what is the longest running TV show": "The Simpsons is the longest-running TV show in the United States.",
        "who invented the airplane": "The Wright brothers, Orville and Wilbur Wright, invented the airplane.",
        "how long does it take to travel to the moon": "It takes about 3 days to travel to the moon.",
        "what is the speed of light": "The speed of light is approximately 299,792,458 meters per second.",
        "how many languages are there in the world": "There are about 7,000 languages spoken worldwide.",
        "who invented the telephone": "Alexander Graham Bell invented the telephone.",
        "how many hours are in a day": "There are 24 hours in a day.",
        "who wrote 'The Odyssey'": "Homer is the author of The Odyssey.",
        "what is the fastest bird": "The peregrine falcon is the fastest bird.",
        "Who is James Turner": "James Turner is the developer behind XPDevs, the creator of DoorsOS, and a programmer with a passion for simplicity and accessibility in operating systems.",
        "what is XPDevs": "XPDevs is a development group focused on creating innovative operating systems like DoorsOS. The group was founded by James Turner, and it focuses on projects for simplicity and accessibility in computing.",
        "tell me about DoorsOS": "DoorsOS is an operating system created by James Turner. It is designed to be simple, user-friendly, and accessible, with versions including a custom kernel called NexShell. The operating system is free, with paid versions also available.",
    };

    // Handling common misspellings
    let misspellings = {
        "helo": "hello",
        "helloo": "hello",
        "hii": "hi",
        "hw are you": "how are you",
        "whats your name": "what is your name",
        "who made u": "who made you",
        "whp made you": "who made you",
        "wht can you do": "what can you do",
        "bi": "bye",
        "goobye": "goodbye",
        "tell me ajoke": "tell me a joke",
        "wht time is it": "what time is it",
        "do yo sleep": "do you sleep",
        "how do i lean programming": "how do i learn programming",
        "wht is the mening of life": "what is the meaning of life",
        "wh is the smartest person": "who is the smartest person",
        "tll me a ridle": "tell me a riddle",
        "how do arplanes fly": "how do airplanes fly",
        "what s the biggest ocean": "what is the biggest ocean"
    };

    input = input.toLowerCase().trim();
    
    // Check if input is a common misspelling and correct it
    if (misspellings[input]) {
        input = misspellings[input];
    }

    // Personalized response for the user
    if (input.includes("my name is") || input.includes("i am")) {
        let name = input.split(" ")[3] || input.split(" ")[2];
        userInfo.name = name;
        return `Nice to meet you, ${name}! How can I help you today?`;
    }

    if (input.includes("what is your name")) {
        return userInfo.name ? `Hi ${userInfo.name}, I'm a chatbot here to chat with you!` : "I don't know your name yet! What's your name?";
    }

    if (input.includes("tell me a math question")) {
        return "Sure! Ask me anything related to math, from simple addition to advanced calculus!";
    }

    // Math calculator
    if (input.match(/[\d\+\-\*\/\^]+/)) {
        try {
            let result = eval(input.replace("^", "**"));
            return `The result is: ${result}`;
        } catch (error) {
            return "Oops! There was an error with the calculation.";
        }
    }

    // Catch-all if no exact match is found
    return responses[input] || "I don't have an answer for that, but I'm always learning!";
}