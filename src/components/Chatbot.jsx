import React, { useState, useRef, useEffect } from 'react';

const Chatbot = ({ analysisResult }) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [isChatLoading, setIsChatLoading] = useState(false);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSendMessage = async () => {
        if (!chatInput.trim()) return;

        const newUserMessage = { role: 'user', content: chatInput };
        setChatHistory(prev => [...prev, newUserMessage]);
        setChatInput('');
        setIsChatLoading(true);

        try {
            let contents = [
                ...chatHistory.map(msg => ({
                    role: msg.role === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.content }]
                })),
                {
                    role: 'user',
                    parts: [{ text: chatInput }]
                }
            ];

            if (analysisResult && analysisResult.reasoning !== "No possible trade.") {
                const analysisContext = `The user is discussing a chart with the following analysis: Entry: ${analysisResult.entry}, Stop-Loss: ${analysisResult.stopLoss}, Target: ${analysisResult.target}, Risk-to-Reward: ${analysisResult.riskToReward}, Reasoning: ${analysisResult.reasoning}. Please refer to this context when answering the user's questions.`;
                contents.unshift({
                    role: 'user',
                    parts: [{ text: analysisContext }]
                });
            }

            const payload = { contents: contents };
            const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;


            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.statusText}`);
            }

            const result = await response.json();
            
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const botResponse = result.candidates[0].content.parts[0].text;
                setChatHistory(prev => [...prev, { role: 'model', content: botResponse }]);
            } else {
                setChatHistory(prev => [...prev, { role: 'model', content: 'Sorry, I could not generate a response.' }]);
            }
        } catch (error) {
            console.error('An error occurred during chat:', error);
            setChatHistory(prev => [...prev, { role: 'model', content: 'An error occurred. Please try again later.' }]);
        } finally {
            setIsChatLoading(false);
        }
    };
    
    const isChatEmpty = chatHistory.length === 0;

    return (
        <div className="flex flex-col h-full bg-gray-900 rounded-xl p-4 shadow-inner border border-gray-700">
            <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500 mb-4">
                Trading Chatbot
            </h2>
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 p-2 mb-4">
                {isChatEmpty ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-center text-sm md:text-base text-gray-500 italic">
                            Start a conversation! Ask about trading strategies, market analysis, or anything else.
                        </p>
                    </div>
                ) : (
                    chatHistory.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`p-3 rounded-xl shadow-md transition-all duration-300 text-sm md:text-base max-w-[75%] ${
                                    message.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-gray-700 text-gray-100 rounded-bl-none'
                                }`}
                            >
                                {message.content}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="flex space-x-2">
                <input
                    type="text"
                    className="flex-1 px-4 py-2 border border-gray-600 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-gray-100 transition-colors text-sm md:text-base"
                    placeholder="Type your message..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !isChatLoading && handleSendMessage()}
                    disabled={isChatLoading}
                />
                <button
                    onClick={handleSendMessage}
                    disabled={isChatLoading}
                    className="px-6 py-2 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isChatLoading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <span>Send</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Chatbot;