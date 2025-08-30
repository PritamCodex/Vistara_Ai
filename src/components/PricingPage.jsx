import React from 'react';

const PricingPage = ({ onBack }) => {
    const plans = [
        { name: "Monthly", pricePerMonth: 800, description: "Perfect for short-term use and trying out our features.", highlight: false, color: '#A82FFC' },
        { name: "Quarterly", pricePerMonth: 600, description: "Save more with a 3-month commitment.", highlight: true, discount: "25% off", color: '#6C2BFF' },
        { name: "Yearly", pricePerMonth: 550, description: "The best value for long-term traders.", highlight: false, discount: "31% off", color: '#2B6BFF' }
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
                        Pricing Plans
                    </h1>
                    <p className="text-lg text-gray-400">
                        Choose the plan that best fits your trading needs.
                    </p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div key={index} 
                             className={`bg-gray-900 rounded-xl shadow-lg p-8 text-center flex flex-col justify-between transform transition-transform duration-300 ${plan.highlight ? 'ring-4 ring-blue-500 scale-105' : 'hover:scale-105'} animate-card-fade-in`}
                             style={{
                                 boxShadow: `0 0 15px rgba(108, 43, 255, 0.2), 0 0 30px rgba(108, 43, 255, 0.1)`,
                                 transition: 'box-shadow 0.3s ease-in-out',
                                 borderColor: plan.color,
                                 borderWidth: plan.highlight ? '4px' : '0',
                                 animationDelay: `${index * 0.2}s`
                             }}
                        >
                            {plan.highlight && (
                                <span className="absolute top-0 right-0 -mt-3 -mr-3 px-3 py-1 text-xs font-bold text-white bg-blue-500 rounded-full shadow-lg">
                                    Recommended
                                </span>
                            )}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <p className="text-gray-400">{plan.description}</p>
                                <div className="my-6">
                                    <span className="text-5xl font-extrabold text-white">₹{plan.pricePerMonth}</span>
                                    <span className="text-lg text-gray-500">/mo</span>
                                </div>
                                {plan.discount && (
                                    <p className="text-sm font-semibold text-green-400">{plan.discount}</p>
                                )}
                            </div>
                            <button className="w-full px-8 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-colors">
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingPage;