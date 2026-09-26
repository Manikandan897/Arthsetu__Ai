import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Shield, ArrowRight, Bot } from 'lucide-react';
import { generateAssistantReply, AssistantMessage } from '../../services/aiService';
import { UserProfile, ActiveTab } from '../../types';

interface FloatingAssistantProps {
  userProfile: UserProfile;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSchemeDetails: (schemeId: string) => void;
}

export const FloatingAssistant: React.FC<FloatingAssistantProps> = ({
  userProfile,
  setActiveTab,
  onOpenSchemeDetails
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Namaste! I am the ArthSetu Government Assistance Guide. I can help clarify scheme rules, explain why your profile matches specific programs, outline required documents, and guide your application route. How can I assist you today?`,
      timestamp: 'Just now',
      actionSuggestions: [
        { label: 'Which scheme may suit me?', tab: 'scheme-results' },
        { label: 'Why am I eligible?', tab: 'scheme-results' },
        { label: 'What documents do I need?', tab: 'documents' },
        { label: 'How is EMI calculated?', tab: 'calculator' },
        { label: 'Where can I apply?', tab: 'partners' }
      ]
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: AssistantMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: text,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const { reply, actionSuggestions } = generateAssistantReply(text, userProfile);
      const botMsg: AssistantMessage = {
        id: 'bot-' + Date.now(),
        sender: 'assistant',
        text: reply,
        timestamp: 'Just now',
        actionSuggestions
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-slate-900 hover:bg-slate-950 text-white rounded-full shadow-xl hover:shadow-2xl active:scale-95 transition-all border border-slate-700"
          aria-label="Open ArthSetu AI Assistant"
        >
          <div className="w-6 h-6 rounded-full bg-blue-700 border border-amber-400/40 flex items-center justify-center text-amber-300 text-xs font-bold font-serif">
            अ
          </div>
          <span className="text-xs font-bold tracking-wide">Ask ArthSetu AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      )}

      {/* Assistant Dialogue Panel */}
      {isOpen && (
        <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-[92vw] sm:w-[420px] h-[550px] max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
          {/* Header */}
          <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-blue-900 border border-slate-700 flex items-center justify-center font-bold text-xs text-amber-400 font-serif">
                अ
              </div>
              <div>
                <div className="text-xs font-bold tracking-tight flex items-center gap-1.5">
                  <span>ArthSetu Citizen Assistant</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Government Guidelines Grounded · SIH26092
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded"
              aria-label="Close assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Statutory Tone Notice Strip */}
          <div className="bg-slate-100 px-3 py-1 text-[10px] text-slate-600 border-b border-slate-200 flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>Provides informational guidance; final approvals require bank branch appraisal.</span>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[88%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-900 text-white'
                      : 'bg-slate-100 text-slate-800 border border-slate-200'
                  }`}
                >
                  <p className="whitespace-pre-line text-xs">{msg.text}</p>
                </div>

                {/* Action Suggestions inside bot messages */}
                {msg.actionSuggestions && (
                  <div className="mt-2 flex flex-wrap gap-1.5 max-w-[90%]">
                    {msg.actionSuggestions.map((act, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          if (act.tab) {
                            setActiveTab(act.tab as ActiveTab);
                            setIsOpen(false);
                          } else {
                            handleSend(act.label);
                          }
                        }}
                        className="text-[11px] px-2.5 py-1 bg-white hover:bg-blue-50 hover:text-blue-900 border border-slate-200 rounded-md text-slate-700 transition-colors flex items-center gap-1 font-medium shadow-2xs"
                      >
                        <span>{act.label}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] p-2 bg-slate-50 rounded w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1">Referencing official scheme gazette...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Chips */}
          <div className="p-2 border-t border-slate-100 bg-slate-50 flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
            <button
              onClick={() => handleSend("Which scheme may suit me?")}
              className="px-2 py-1 bg-white hover:bg-slate-200 border border-slate-200 rounded text-slate-700"
            >
              Which scheme suits me?
            </button>
            <button
              onClick={() => handleSend("What documents do I need?")}
              className="px-2 py-1 bg-white hover:bg-slate-200 border border-slate-200 rounded text-slate-700"
            >
              Documents needed
            </button>
            <button
              onClick={() => handleSend("How is EMI calculated?")}
              className="px-2 py-1 bg-white hover:bg-slate-200 border border-slate-200 rounded text-slate-700"
            >
              EMI calculation
            </button>
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Ask a question about government loans..."
              className="flex-1 text-xs p-2 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputVal.trim()}
              className="p-2 bg-blue-900 hover:bg-blue-950 disabled:bg-slate-200 text-white rounded-md transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
