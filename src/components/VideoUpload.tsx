import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Video, X } from 'lucide-react';

interface VideoUploadProps {
  onVideoSelect: (file: File) => void;
  selectedVideo: File | null;
  onClearVideo: () => void;
}

export const VideoUpload = ({ onVideoSelect, selectedVideo, onClearVideo }: VideoUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('video/')) {
      onVideoSelect(files[0]);
    }
  }, [onVideoSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onVideoSelect(files[0]);
    }
  }, [onVideoSelect]);

  if (selectedVideo) {
    return (
      <Card className="p-6 border-2 border-dashed border-success">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-success rounded-lg">
              <Video className="h-5 w-5 text-success-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">{selectedVideo.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedVideo.size / (1024 * 1024)).toFixed(1)} MB
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onClearVideo}>
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className={`p-8 border-2 border-dashed transition-all duration-200 cursor-pointer hover:border-accent ${
        isDragging ? 'border-accent bg-accent/5' : 'border-border'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="text-center">
        <div className="mx-auto mb-4 p-3 bg-gradient-accent rounded-xl w-fit">
          <Upload className="h-8 w-8 text-accent-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Upload Your Climbing Video</h3>
        <p className="text-muted-foreground mb-4">
          Drag and drop your climbing video here, or click to browse
        </p>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          className="hidden"
          id="video-upload"
        />
        <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
          <label htmlFor="video-upload" className="cursor-pointer">
            Choose Video File
          </label>
        </Button>
        <p className="text-xs text-muted-foreground mt-3">
          Supports MP4, WebM, AVI (max 100MB)
        </p>
      </div>
    </Card>
  );
};