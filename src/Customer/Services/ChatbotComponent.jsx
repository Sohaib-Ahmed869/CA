import React, { useState, useEffect, useRef } from "react";
import {
  sendChatMessage,
  initializeChat,
  addMessageToHistory,
} from "./chatbotService";
import {
  FiSend,
  FiMessageCircle,
  FiX,
  FiChevronDown,
  FiHelpCircle,
} from "react-icons/fi";

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // List of premade questions to randomly select from
  const premadeQuestions = [
    "How do I fill out the emergency contact section?",
    "What evidence do I need for RPL assessment?",
    "How detailed should my employment history be?",
    "What is the difference between RPL and normal enrollment?",
    "Do I need to provide certified copies of my qualifications?",
    "Who can be my referee for the RPL assessment?",
    "How do I submit supporting documents with my application?",
    "What language proficiency evidence do I need to provide?",
    "How long does the enrollment process usually take?",
    "What happens after I submit my enrollment form?",
  ];

  // Initialize chat with a welcome message
  useEffect(() => {
    const newHistory = initializeChat();
    const welcomeMessage = {
      sender: "assistant",
      text: "Hello! I'm your Certified Australia assistant. How can I help you with your enrollment or RPL forms today?",
      timestamp: new Date(),
    };
    setChatHistory([...newHistory, welcomeMessage]);

    // Select two random questions initially
    selectRandomQuestions();
  }, []);

  // Scroll to bottom of messages when chat history updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // Focus input when chat is opened and select random questions
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setUnreadCount(0);
      selectRandomQuestions();
    }
  }, [isOpen]);

  // Function to select two random questions from the premade list
  const selectRandomQuestions = () => {
    const shuffled = [...premadeQuestions].sort(() => 0.5 - Math.random());
    setSuggestedQuestions(shuffled.slice(0, 2));
  };

  // Handle new message from user
  const handleSendMessage = async (e, questionText = null) => {
    e?.preventDefault();

    const messageToSend = questionText || message;
    if (!messageToSend.trim()) return;

    // Add user message to chat
    const updatedHistory = addMessageToHistory(
      chatHistory,
      "user",
      messageToSend
    );
    setChatHistory(updatedHistory);
    setMessage("");
    setIsLoading(true);

    // Generate new suggested questions when user sends a message
    selectRandomQuestions();

    try {
      // Send message to API
      const response = await sendChatMessage(messageToSend, chatHistory);

      if (response.success) {
        // Add assistant response to chat
        setChatHistory((prevHistory) =>
          addMessageToHistory(prevHistory, "assistant", response.data)
        );

        // Increment unread count if chat is closed
        if (!isOpen) {
          setUnreadCount((prev) => prev + 1);
        }
      } else {
        // Handle error
        setChatHistory((prevHistory) =>
          addMessageToHistory(
            prevHistory,
            "assistant",
            "Sorry, I encountered an error. Please try again or contact support if the issue persists."
          )
        );
      }
    } catch (error) {
      console.error("Error in chat:", error);
      // Add error message to chat
      setChatHistory((prevHistory) =>
        addMessageToHistory(
          prevHistory,
          "assistant",
          "Sorry, something went wrong. Please try again later."
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle chat open/closed
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Main chat window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 rounded-lg shadow-lg overflow-hidden flex flex-col bg-white border border-green-100">
          {/* Chat header */}
          <div className="bg-gradient-to-r from-green-400 to-emerald-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-medium flex items-center gap-2">
              <FiMessageCircle className="text-lg" />
              <span>Certified Australia Support</span>
            </h3>
            <button
              onClick={toggleChat}
              className="focus:outline-none hover:bg-green-500 hover:bg-opacity-20 p-1 rounded-full"
            >
              <FiX className="text-lg" />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto max-h-96 bg-gradient-to-b from-green-50 to-white">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`mb-3 ${
                  chat.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block rounded-lg px-4 py-2 max-w-[80%] break-words ${
                    chat.sender === "user"
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {chat.text}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {chat.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce"></div>
                  <div
                    className="w-2 h-2 rounded-full bg-green-500 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-green-500 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions */}
          {suggestedQuestions.length > 0 && (
            <div className="px-4 py-2 bg-green-50 border-t border-green-100">
              <div className="flex items-center text-xs text-green-700 mb-2">
                <FiHelpCircle className="mr-1" />
                <span>Try asking:</span>
              </div>
              <div className="flex flex-col space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={(e) => handleSendMessage(e, question)}
                    className="text-left text-sm bg-white border border-green-200 hover:bg-green-100 hover:border-green-300 rounded-md px-3 py-2 transition-colors duration-200"
                    disabled={isLoading}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat input */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-green-100 bg-white"
          >
            <div className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-green-200 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`bg-gradient-to-r from-green-400 to-emerald-600 text-white p-2 rounded-r-lg ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:from-green-500 hover:to-emerald-700"
                }`}
                disabled={isLoading}
              >
                <FiSend className="text-lg" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Chat button */}
      <button
        onClick={toggleChat}
        className="bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-white rounded-full p-3 shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105"
      >
        {isOpen ? (
          <FiChevronDown className="text-2xl" />
        ) : (
          <div className="relative">
            <FiMessageCircle className="text-2xl" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
        )}
      </button>
    </div>
  );
};

export default ChatbotComponent;
