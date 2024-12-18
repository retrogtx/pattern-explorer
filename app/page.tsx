'use client';

import { useChat } from 'ai/react';
import FileUpload from '@/components/FileUpload';
import { Loader2, MessageSquareText } from 'lucide-react';

export default function AnalysisPage() {
  const { messages, append, isLoading } = useChat();

  const handleFileSelect = async (file: File) => {
    try {
      const text = await file.text();
      await append({
        role: 'user',
        content: text,
      });
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <div className="w-full max-w-[90rem] py-12 md:py-24 mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-8">
          <MessageSquareText className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-center tracking-tight">WhatsApp Pattern Explorer</h1>
        </div>
        
        {!isLoading && messages.length === 0 && (
          <div className="mt-8 space-y-8">
            <div className="text-center space-y-4">
              <p className="text-lg text-muted-foreground tracking-tight">
                Discover insights and patterns in your WhatsApp conversations
              </p>
              <p className="text-sm text-muted-foreground tracking-tight">
                Upload your chat export file to get started
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md p-8 rounded-xl bg-white dark:bg-neutral-800 shadow-lg">
                <FileUpload onFileSelect={handleFileSelect} />
              </div>
            </div>
          </div>
        )}

        {messages.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Chat */}
            <div className="h-[calc(100vh-12rem)] overflow-y-auto rounded-xl bg-white dark:bg-neutral-800 p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 tracking-tight">Chat Input</h2>
              <pre className="text-sm leading-relaxed whitespace-pre-wrap">
                {messages[0]?.content || ''}
              </pre>
            </div>

            {/* Analysis Output */}
            <div className="h-[calc(100vh-12rem)] overflow-y-auto">
              <div className="rounded-xl bg-white dark:bg-neutral-800 p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-4 tracking-tight">Analysis</h2>
                {messages.slice(1).map(m => (
                  <pre 
                    key={m.id}
                    className="text-sm whitespace-pre-wrap leading-relaxed"
                  >
                    {m.content}
                  </pre>
                ))}
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              <Loader2 className="h-8 w-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse text-primary" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-lg font-medium tracking-tight">Analyzing your chat history</p>
              <p className="text-sm text-muted-foreground tracking-tight">This may take a few moments...</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}