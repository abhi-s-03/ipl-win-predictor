import { useState, useEffect, useRef } from 'react';
import { CircleDot, RotateCcw } from 'lucide-react';
import { teams } from '../data/teams';
import { venues } from '../data/venues';
import { TeamSelect } from './TeamSelect';
import { NumberInput } from './NumberInput';
import { OversInput } from './OversInput';

export const PredictionForm = () => {
  const [battingTeam, setBattingTeam] = useState("");
  const [bowlingTeam, setBowlingTeam] = useState("");
  const [selectedVenue, setSelectedVenue] = useState("");
  const [target, setTarget] = useState(0);
  const [score, setScore] = useState(0);
  const [overs, setOvers] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [prediction, setPrediction] = useState(false);
  const [battingProb, setBattingProb] = useState(0);
  const [bowlingProb, setBowlingProb] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const predictionRef = useRef(null);

  useEffect(() => {
    if (error) {
      setShowError(true);
      setFadeOut(false);

      const fadeTimeout = setTimeout(() => {
        setFadeOut(true);
      }, 2000);

      const hideTimeout = setTimeout(() => {
        setShowError(false);
        setFadeOut(false);
      }, 3000);

      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(hideTimeout);
      };
    }

    if (prediction && predictionRef.current) {
      predictionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [error, prediction]);

  const predictProbability = () => {
    setIsLoading(true);
    setPrediction(false);
    if (!battingTeam || !bowlingTeam || !selectedVenue) {
      setError("Please fill in all the fields");
      setIsLoading(false);
      return;
    } else if (target > 350) {
      setError("Invalid target");
      setIsLoading(false);
      return;
    } else if (
      overs < 0 ||
      overs > 20 ||
      overs % 1 > 0.6
    ) {
      setError("Invalid overs");
      setIsLoading(false);
      return;
    } else if (wickets < 0 || wickets > 9) {
      setError("Invalid wickets");
      setIsLoading(false);
      return;
    } else {
      setError("");
    }

    let adjustedOvers = overs;
    if ((overs * 10) % 10 === 6) {
      adjustedOvers = Math.ceil(overs);
    }

    const runsreq = target - score;
    const ballsleft = 120 - (Math.floor(adjustedOvers) * 6 + (adjustedOvers % 1) * 10);
    const wicketsLeft = 10 - wickets;
    const crr = score / adjustedOvers;
    const rrr = (runsreq * 6) / ballsleft;

    const data = {
      Venue: selectedVenue,
      BattingTeam: battingTeam,
      BowlingTeam: bowlingTeam,
      target: target + 1,
      runs_req: runsreq,
      balls_left: ballsleft,
      wickets_left: wicketsLeft,
      crr: crr,
      rrr: rrr,
    };

    console.log(data);

    fetch("https://ipl-iolu.onrender.com/predict", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Prediction request failed');
        }
        return res.json();
      })
      .then((data) => {
        setBattingProb(data.bat);
        setBowlingProb(data.bowl);
        setPrediction(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Prediction failed. Please try again.");
        console.error("Prediction request failed:", error);
        setIsLoading(false);
      });
  };

  const handleReset = () => {
    setBattingTeam("");
    setBowlingTeam("");
    setSelectedVenue("");
    setTarget(0);
    setScore(0);
    setOvers(0);
    setWickets(0);
    setPrediction(false);
    setBattingProb(0);
    setBowlingProb(0);
    setError("");
    setShowError(false);
  };

  const getProbabilityColor = (prob) => {
    if (prob > 0.5) return 'text-green-500';
    if (prob < 0.5) return 'text-red-500';
    return 'text-blue-500';
  };

  return (
    <>
      {showError && (
        <div
          className={`fixed top-5 right-5 bg-red-500 text-white font-bold px-4 py-2 rounded-lg shadow-lg transition-opacity duration-1000 ${fadeOut ? "opacity-0" : "opacity-100"
            }`}
        >
          {error}
        </div>
      )}

      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">First Innings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TeamSelect
              teams={teams}
              value={bowlingTeam}
              onChange={(e) => setBowlingTeam(e.target.value)}
              excludeTeam={battingTeam}
              label="Team"
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Venue</label>
              <select
                value={selectedVenue}
                onChange={(e) => setSelectedVenue(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select venue</option>
                {venues.map((venue) => (
                  <option key={venue.id} value={venue.name}>
                    {venue.name}
                  </option>
                ))}
              </select>
            </div>

            <NumberInput
              label="Score"
              value={target}
              onChange={(e) => setTarget(parseInt(e.target.value))}
              min={0}
            />

            <NumberInput
              label="Wickets"
              min={0}
              max={10}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Second Innings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TeamSelect
              teams={teams}
              value={battingTeam}
              onChange={(e) => setBattingTeam(e.target.value)}
              excludeTeam={bowlingTeam}
              label="Team"
            />

            <NumberInput
              label="Current Score"
              value={score}
              onChange={(e) => setScore(parseInt(e.target.value))}
              min={0}
            />

            <NumberInput
              label="Wickets Lost"
              value={wickets}
              onChange={(e) => setWickets(parseInt(e.target.value))}
              min={0}
              max={10}
            />

            <OversInput
              label="Overs Completed"
              min="0"
              max="20"
              step="0.1"
              value={overs}
              onChange={(e) => setOvers(parseFloat(e.target.value))}
            />
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            disabled={isLoading}
            onClick={predictProbability}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <CircleDot className="w-5 h-5 animate-spin" />
                <span>Calculating...</span>
              </>
            ) : (
              <>
                <CircleDot className="w-5 h-5" />
                <span>Calculate Prediction</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset</span>
          </button>
        </div>
        {prediction && (
          <div
            ref={predictionRef}
            className="text-center space-y-4 mt-6"
          >
            <h2 className="text-xl font-semibold">
              {battingTeam} -{" "}
              <span className={getProbabilityColor(battingProb)}>
                {Math.round(battingProb * 100)}%
              </span>
            </h2>
            <h2 className="text-xl font-semibold">
              {bowlingTeam} -{" "}
              <span className={getProbabilityColor(bowlingProb)}>
                {Math.round(bowlingProb * 100)}%
              </span>
            </h2>
          </div>
        )}
      </div>
    </>
  );
};
