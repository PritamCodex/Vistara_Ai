import React from 'react';

const FeaturesPage = ({ onBack }) => {
    const features = [
        {
            title: "Advanced AI Analysis",
            description: "Our AI model analyzes your uploaded chart screenshots using professional trading strategies like ICT, trend analysis, and volumetric data to provide actionable insights.",
            icon: (
                <svg className="w-12 h-12 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-4c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
            )
        },
        {
            title: "Risk-to-Reward Filtering",
            description: "The analysis is optimized to suggest only trades with a risk-to-reward ratio of 1:2 or higher, promoting disciplined and responsible trading practices.",
            icon: (
                <svg className="w-12 h-12 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h-2V9h4v8z"/>
                </svg>
            )
        },
        {
            title: "Interactive Chatbot",
            description: "Engage in a conversation with our AI chatbot to ask specific questions about the analysis, get explanations for technical terms, or discuss general trading strategies.",
            icon: (
                <svg className="w-12 h-12 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V7h12v4z"/>
                </svg>
            )
        },
        {
            title: "Seamless Screenshot Uploads",
            description: "Quickly analyze charts by uploading a file or simply pasting a screenshot from your clipboard, making the process fast and efficient.",
            icon: (
                <svg className="w-12 h-12 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 12h-2v4h-8v-4H5V8h14zm-4-4h-2V6h-2v2h-2v2h6V8z"/>
                </svg>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-[#0E1020] text-gray-100 p-8 flex flex-col items-center font-sans transition-colors duration-300">
            <div className="w-full max-w-7xl">
                <button onClick={onBack} className="absolute top-4 left-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                </button>
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
                        Key Features
                    </h1>
                    <p className="text-lg text-gray-400">
                        Discover what makes our AI Trading Chart Analyzer an essential tool for your trading journey.
                    </p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} 
                             className="bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center text-center space-y-4 transform transition-transform duration-300 hover:scale-105 animate-card-fade-in"
                             style={{
                                 boxShadow: `0 0 10px rgba(59, 130, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.1)`,
                                 transition: 'box-shadow 0.3s ease-in-out',
                                 animationDelay: `${index * 0.2}s`
                             }}
                        >
                            {feature.icon}
                            <h3 className="text-xl font-bold text-gray-100">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturesPage;