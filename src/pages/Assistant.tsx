
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Send, MessageSquare, ArrowLeft, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Assistant = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your cooking assistant. I can help you with recipes, cooking tips, ingredient substitutions, and answer any culinary questions you have. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const quickQuestions = [
    "How do I substitute eggs in baking?",
    "What spices go well with chicken?",
    "How long should I cook pasta?",
    "Best way to store fresh herbs?",
    "How to make perfect rice?",
    "Vegetarian protein alternatives?"
  ];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Great question! Based on your cooking needs, I'd recommend...",
        "That's a common cooking challenge! Here's what I suggest...",
        "Perfect timing to ask! For best results, you should...",
        "I love helping with that! The key to success is...",
        "Excellent choice! Here's my professional advice..."
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage: Message = {
        id: Date.now() + 1,
        text: `${randomResponse} ${userMessage.text.toLowerCase().includes('recipe') ? 
          'For recipes like this, I recommend checking our Recipe Generator for detailed instructions with ingredients and step-by-step guidance.' :
          'Let me know if you need more specific details or have follow-up questions about this topic!'
        }`,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleQuickQuestion = (question: string) => {
    setMessage(question);
    handleSendMessage({ preventDefault: () => {} } as React.FormEvent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-recipe-orange/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="text-recipe-orange hover:bg-recipe-orange/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="w-10 h-10 bg-recipe-green rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Cooking Assistant</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Welcome Section */}
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Your Personal Cooking Assistant
          </h2>
          <p className="text-xl text-gray-600">
            Ask me anything about cooking, recipes, ingredients, or techniques!
          </p>
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Quick Questions to Get Started:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickQuestions.map((question, index) => (
                <Badge
                  key={question}
                  variant="outline"
                  className="cursor-pointer hover:bg-recipe-green hover:text-white hover:border-recipe-green p-3 text-sm font-medium border-recipe-green/50 text-recipe-green transition-all hover-lift text-center"
                  onClick={() => handleQuickQuestion(question)}
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  {question}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <Card className="food-card mb-6 animate-fade-in border-0" style={{ animationDelay: '0.4s' }}>
          <CardContent className="p-0">
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${msg.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.isUser ? 'bg-recipe-orange' : 'bg-recipe-green'
                    }`}>
                      {msg.isUser ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`p-4 rounded-2xl ${
                      msg.isUser 
                        ? 'bg-recipe-orange text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-2 ${
                        msg.isUser ? 'text-orange-100' : 'text-gray-500'
                      }`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="flex items-start space-x-3 max-w-[80%]">
                    <div className="w-8 h-8 bg-recipe-green rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 p-4 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-recipe-green rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-recipe-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-recipe-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="flex gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Ask me anything about cooking..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="py-4 px-6 text-lg border-recipe-green/30 focus:border-recipe-green focus:ring-recipe-green/20 rounded-full"
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            className="bg-recipe-green hover:bg-recipe-green-dark text-white px-8 py-4 rounded-full hover-lift"
            disabled={isLoading || !message.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>

        {/* Additional Help */}
        <div className="mt-8 text-center text-gray-600 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-sm">
            Need recipe suggestions? Try our{" "}
            <Link to="/recipe-generator" className="text-recipe-orange hover:text-recipe-orange-dark font-medium hover:underline">
              Recipe Generator
            </Link>
            {" "}for detailed cooking instructions!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
