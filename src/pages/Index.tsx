import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { VideoUpload } from '@/components/VideoUpload';
import { VideoPlayer } from '@/components/VideoPlayer';
import { AnalysisSidebar } from '@/components/AnalysisSidebar';
import { Mountain, Zap, Play } from 'lucide-react';
import { simulateApiCall, mockAnalysisResults } from '@/utils/mockData';

const Index = () => {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const handleVideoSelect = (file: File) => {
    setSelectedVideo(file);
    setAnalysisResults(null);
  };

  const handleClearVideo = () => {
    setSelectedVideo(null);
    setAnalysisResults(null);
  };

  const handleAnalyze = async () => {
    if (!selectedVideo) return;
    
    setIsAnalyzing(true);
    
    // Simulate backend analysis
    await simulateApiCall(3000);
    
    setAnalysisResults(mockAnalysisResults);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-hero rounded-xl">
                <Mountain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">ClimbCoach AI</h1>
                <p className="text-sm text-muted-foreground">Advanced climbing technique analysis</p>
              </div>
            </div>
            {selectedVideo && (
              <Button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing}
                className="bg-gradient-accent hover:opacity-90 text-accent-foreground shadow-accent"
              >
                {isAnalyzing ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Analyze Video
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {!selectedVideo ? (
            <div className="max-w-2xl mx-auto space-y-8">
              {/* Hero Section */}
              <div className="text-center space-y-4">
                <div className="mx-auto w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center mb-6">
                  <Mountain className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold">AI-Powered Climbing Analysis</h2>
                <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                  Upload your climbing videos to get personalized technique feedback, 
                  efficiency scoring, and professional coaching advice powered by AI.
                </p>
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 text-center">
                  <div className="p-3 bg-gradient-success rounded-xl w-fit mx-auto mb-4">
                    <Zap className="h-6 w-6 text-success-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Pose Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced pose estimation to analyze your climbing technique and body positioning
                  </p>
                </Card>
                
                <Card className="p-6 text-center">
                  <div className="p-3 bg-gradient-accent rounded-xl w-fit mx-auto mb-4">
                    <Mountain className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Move Prediction</h3>
                  <p className="text-sm text-muted-foreground">
                    AI predicts move completion success and identifies crux sections
                  </p>
                </Card>
                
                <Card className="p-6 text-center">
                  <div className="p-3 bg-gradient-primary rounded-xl w-fit mx-auto mb-4">
                    <Play className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Smart Coaching</h3>
                  <p className="text-sm text-muted-foreground">
                    Personalized feedback and training recommendations from our AI coach
                  </p>
                </Card>
              </div>

              {/* Upload Section */}
              <VideoUpload 
                onVideoSelect={handleVideoSelect}
                selectedVideo={selectedVideo}
                onClearVideo={handleClearVideo}
              />
            </div>
          ) : (
            <div className="space-y-6">
              <VideoUpload 
                onVideoSelect={handleVideoSelect}
                selectedVideo={selectedVideo}
                onClearVideo={handleClearVideo}
              />
              
              <VideoPlayer 
                videoFile={selectedVideo}
                onTimeUpdate={setCurrentTime}
                overlayData={analysisResults}
              />
            </div>
          )}
        </div>

        {/* Sidebar */}
        {selectedVideo && (
          <AnalysisSidebar
            isAnalyzing={isAnalyzing}
            efficiencyScore={analysisResults?.efficiencyScore || 0}
            feedbackItems={analysisResults?.feedbackItems || []}
            moveCompletions={analysisResults?.moveCompletions || []}
            coachingAdvice={analysisResults?.coachingAdvice || ''}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
