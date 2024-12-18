import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
  const { toast } = useToast();

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) {
      return;
    }

    if (file.type !== 'text/plain') {
      toast({
        title: "Invalid file type",
        description: "Please upload a .txt file",
        variant: "destructive",
      });
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    onFileSelect(file);
    
    toast({
      title: "File uploaded successfully",
      description: "Analyzing your chat export...",
    });
  }, [onFileSelect, toast]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full">
        <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
          <input
            type="file"
            accept=".txt"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label 
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
          >
            <Upload className="h-8 w-8 mb-2 text-neutral-500" />
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500">
              WhatsApp chat export (.txt)
            </p>
          </label>
        </div>
      </div>
      
      <div className="text-center text-xs text-neutral-500 dark:text-neutral-400">
        <p>Maximum file size: 10MB</p>
      </div>
    </div>
  );
} 