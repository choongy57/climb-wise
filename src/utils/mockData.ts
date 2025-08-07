// Mock data for development - simulates backend API responses

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Generate dynamic mock data based on video duration
export const generateMockFeedbackItems = (videoDuration: number) => {
  const maxTime = Math.max(30, videoDuration - 5); // Ensure timestamps don't exceed video length
  
  return [
    {
      timestamp: formatTime(Math.min(14, maxTime * 0.2)),
      issue: "Hip Misalignment",
      severity: "medium" as const,
      description: "Hips are 18° off from optimal position. Focus on engaging core muscles."
    },
    {
      timestamp: formatTime(Math.min(32, maxTime * 0.4)),
      issue: "Overgripping",
      severity: "high" as const,
      description: "Excessive tension detected (82%). Try to relax your grip and trust your legs."
    },
    {
      timestamp: formatTime(Math.min(45, maxTime * 0.6)),
      issue: "Flag Instability",
      severity: "low" as const,
      description: "Flagging leg movement causing body swing. Keep leg more controlled."
    },
    {
      timestamp: formatTime(Math.min(60, maxTime * 0.8)),
      issue: "Poor Rest Position",
      severity: "medium" as const,
      description: "Rushed through rest position. Take time to shake out and plan next moves."
    }
  ].filter(item => {
    const [mins, secs] = item.timestamp.split(':').map(Number);
    const totalSeconds = mins * 60 + secs;
    return totalSeconds < videoDuration;
  });
};

export const generateMockMoveCompletions = (videoDuration: number) => {
  const maxTime = Math.max(30, videoDuration - 5);
  
  return [
    {
      timestamp: formatTime(Math.min(18, maxTime * 0.25)),
      completed: true,
      confidence: 0.89
    },
    {
      timestamp: formatTime(Math.min(28, maxTime * 0.45)),
      completed: false,
      confidence: 0.34
    },
    {
      timestamp: formatTime(Math.min(38, maxTime * 0.65)),
      completed: true,
      confidence: 0.76
    },
    {
      timestamp: formatTime(Math.min(50, maxTime * 0.85)),
      completed: false,
      confidence: 0.21
    }
  ].filter(item => {
    const [mins, secs] = item.timestamp.split(':').map(Number);
    const totalSeconds = mins * 60 + secs;
    return totalSeconds < videoDuration;
  });
};

// Static fallback data for when video duration is not available
export const mockFeedbackItems = [
  {
    timestamp: "00:14",
    issue: "Hip Misalignment",
    severity: "medium" as const,
    description: "Hips are 18° off from optimal position. Focus on engaging core muscles."
  },
  {
    timestamp: "00:32",
    issue: "Overgripping",
    severity: "high" as const,
    description: "Excessive tension detected (82%). Try to relax your grip and trust your legs."
  }
];

export const mockMoveCompletions = [
  {
    timestamp: "00:18",
    completed: true,
    confidence: 0.89
  },
  {
    timestamp: "00:28",
    completed: false,
    confidence: 0.34
  }
];

export const mockCoachingAdvice = `Great effort on this route! I can see you're making good progress, but there are a few key areas to focus on:

**Grip Efficiency**: You're gripping too tightly, especially on the jugs around 0:32. Remember that overgripping wastes energy quickly. Practice the "minimum effective grip" - hold just tight enough to stay on.

**Hip Position**: Your hip alignment could be improved. When you turn your hips toward the wall (especially at 0:14), you'll find better balance and reduce strain on your arms.

**Rest Strategy**: You're rushing through rest positions. Each rest is an opportunity to recover and plan your next sequence. Take advantage of these moments!

Keep practicing these fundamentals and you'll see significant improvement in your efficiency score. Your movement is already quite fluid - now let's make it more energy-efficient!`;

// Simulates API delay
export const simulateApiCall = (delay: number = 2000) => {
  return new Promise(resolve => setTimeout(resolve, delay));
};

export const mockAnalysisResults = {
  efficiencyScore: 72,
  feedbackItems: mockFeedbackItems,
  moveCompletions: mockMoveCompletions,
  coachingAdvice: mockCoachingAdvice
};