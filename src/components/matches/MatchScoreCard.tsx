import React, { useState } from 'react';
import { Match, Frame, Player } from '../../types';
import { Trophy, User, X } from 'lucide-react';
import { updateMatchScores } from '../../utils/scoreUtils';

interface Props {
  match: Match;
  onClose: () => void;
  onScoreUpdate: (frames: Frame[], homePlayer: Player, awayPlayer: Player) => void;
}

export const MatchScoreCard: React.FC<Props> = ({ match, onClose, onScoreUpdate }) => {
  const [frames, setFrames] = useState<Frame[]>(
    Array.from({ length: 10 }, (_, i) => ({
      id: `${match.id}-${i + 1}`,
      matchId: match.id,
      frameNumber: i + 1,
      homePlayerScore: 0,
      awayPlayerScore: 0,
      winner: null,
      homePlayerName: '',
      awayPlayerName: ''
    }))
  );

  const [selectedFrame, setSelectedFrame] = useState<number>(0);

  const handleFrameSelect = (frameIndex: number) => {
    setSelectedFrame(frameIndex);
  };

  const handlePlayerName = (frameIndex: number, isHome: boolean, name: string) => {
    const updatedFrames = frames.map((frame, index) => {
      if (index === frameIndex) {
        return {
          ...frame,
          [isHome ? 'homePlayerName' : 'awayPlayerName']: name
        };
      }
      return frame;
    });
    setFrames(updatedFrames);
  };

  const handleFrameScore = (frameIndex: number, isHome: boolean, value: string) => {
    const score = parseInt(value) || 0;
    const updatedFrames = frames.map((frame, index) => {
      if (index === frameIndex) {
        const updatedFrame = {
          ...frame,
          [isHome ? 'homePlayerScore' : 'awayPlayerScore']: score
        };
        
        // Determine winner if both scores are entered
        const homeScore = isHome ? score : frame.homePlayerScore;
        const awayScore = isHome ? frame.awayPlayerScore : score;
        
        if (homeScore > 0 && awayScore > 0) {
          updatedFrame.winner = homeScore > awayScore ? 'home' : 'away';
        }
        
        return updatedFrame;
      }
      return frame;
    });
    
    setFrames(updatedFrames);
  };

  const handleSubmit = () => {
    // Validate all frames have player names and scores
    const missingData = frames.some(
      frame => !frame.homePlayerName || 
               !frame.awayPlayerName || 
               frame.homePlayerScore === 0 || 
               frame.awayPlayerScore === 0
    );

    if (missingData) {
      alert('Please complete all frame data before submitting');
      return;
    }

    // Create aggregate player statistics
    const homePlayer: Player = {
      id: `${match.id}-home`,
      name: frames[0].homePlayerName,
      teamId: match.homeTeam.id,
      played: 1,
      won: 0,
      lost: 0,
      framesWon: frames.filter(f => f.winner === 'home').length,
      framesLost: frames.filter(f => f.winner === 'away').length,
      winPercentage: 0
    };

    const awayPlayer: Player = {
      id: `${match.id}-away`,
      name: frames[0].awayPlayerName,
      teamId: match.awayTeam.id,
      played: 1,
      won: 0,
      lost: 0,
      framesWon: frames.filter(f => f.winner === 'away').length,
      framesLost: frames.filter(f => f.winner === 'home').length,
      winPercentage: 0
    };

    // Update match scores and all related statistics
    updateMatchScores(match, frames, homePlayer, awayPlayer);
    onScoreUpdate(frames, homePlayer, awayPlayer);
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Match Score Card</h3>
        <div className="flex items-center space-x-4">
          {match.isCompleted && <Trophy className="text-yellow-500" size={24} />}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <User size={20} className="text-blue-500" />
            <span className="font-medium">{match.homeTeam.name}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <User size={20} className="text-red-500" />
            <span className="font-medium">{match.awayTeam.name}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Frames</h4>
        <div className="grid grid-cols-5 gap-4">
          {frames.map((frame, index) => (
            <div 
              key={frame.id} 
              className={`p-3 border rounded-md space-y-2 cursor-pointer ${
                selectedFrame === index ? 'border-blue-500 ring-2 ring-blue-200' : ''
              }`}
              onClick={() => handleFrameSelect(index)}
            >
              <div className="text-sm font-medium text-center">Frame {frame.frameNumber}</div>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Home Player"
                  value={frame.homePlayerName}
                  onChange={(e) => handlePlayerName(index, true, e.target.value)}
                  className="w-full px-2 py-1 border rounded text-center text-sm"
                  disabled={match.isCompleted}
                />
                <input
                  type="number"
                  min="0"
                  max="147"
                  value={frame.homePlayerScore}
                  onChange={(e) => handleFrameScore(index, true, e.target.value)}
                  className="w-full px-2 py-1 border rounded text-center"
                  disabled={match.isCompleted}
                />
                <input
                  type="text"
                  placeholder="Away Player"
                  value={frame.awayPlayerName}
                  onChange={(e) => handlePlayerName(index, false, e.target.value)}
                  className="w-full px-2 py-1 border rounded text-center text-sm"
                  disabled={match.isCompleted}
                />
                <input
                  type="number"
                  min="0"
                  max="147"
                  value={frame.awayPlayerScore}
                  onChange={(e) => handleFrameScore(index, false, e.target.value)}
                  className="w-full px-2 py-1 border rounded text-center"
                  disabled={match.isCompleted}
                />
              </div>
              {frame.winner && (
                <div className={`text-center text-sm ${frame.winner === 'home' ? 'text-blue-500' : 'text-red-500'}`}>
                  {frame.winner === 'home' ? '🏠 Home' : '🏃 Away'}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {!match.isCompleted && (
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Submit Scores
          </button>
        </div>
      )}
    </div>
  );
};