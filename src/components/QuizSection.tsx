import { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/karamData';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, Sparkles } from 'lucide-react';

export function QuizSection() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const question = QUIZ_QUESTIONS[currentQIndex];

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return; // Prevent changing after answer
    setSelectedOption(index);
    const newAnswers = [...answers, index];
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setIsFinished(false);
  };

  // Calculate score
  const score = answers.reduce((acc, ans, idx) => {
    return ans === QUIZ_QUESTIONS[idx].correctIndex ? acc + 1 : acc;
  }, 0);

  return (
    <section id="quiz" className="py-16 sm:py-24 bg-[#F5EDE1]/60 border-t border-[#E8DEC9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8C271E]/10 text-[#8C271E] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Cultural Trivia & Knowledge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#241B15] tracking-tight">
            How Well Do You Know Karam Utsav?
          </h2>
          <p className="text-base sm:text-lg text-[#665548] leading-relaxed">
            Test your knowledge about the sacred tree, the Jawa rituals, the Mandar percussion, and indigenous nature traditions.
          </p>
        </div>

        {/* Quiz Board */}
        <div className="bg-[#FFFDFB] rounded-3xl p-6 sm:p-10 border border-[#E6DDD0] shadow-md">
          
          {!isFinished ? (
            <div className="space-y-6">
              
              {/* Progress & counter */}
              <div className="flex items-center justify-between text-xs text-[#7A6455] font-semibold border-b border-[#EFE5D8] pb-4">
                <span>Question {currentQIndex + 1} of {QUIZ_QUESTIONS.length}</span>
                <span className="text-[#8C271E]">Score: {score}</span>
              </div>

              {/* Question */}
              <h3 className="text-xl sm:text-2xl font-display font-bold text-[#241B15] leading-snug">
                {question.question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === question.correctIndex;
                  const hasAnswered = selectedOption !== null;

                  let optionStyle = 'bg-[#FAF7F2] border-[#DECFBD] hover:bg-[#F2E8DC] text-[#33261C]';

                  if (hasAnswered) {
                    if (isCorrect) {
                      optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-rose-50 border-rose-500 text-rose-950 ring-1 ring-rose-500';
                    } else {
                      optionStyle = 'bg-[#FAF7F2] border-[#EADDCF] opacity-60 text-[#705E51]';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={hasAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base transition-all flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center text-xs font-bold shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </span>

                      {hasAnswered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {hasAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next action */}
              {selectedOption !== null && (
                <div className="pt-4 border-t border-[#EFE5D8] space-y-4">
                  <div className="bg-[#FAF4EB] p-4 rounded-xl border border-[#E3D6C5] text-xs sm:text-sm text-[#544336] leading-relaxed">
                    <strong className="text-[#8C271E] block mb-1">Cultural Explanation:</strong>
                    {question.explanation}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 rounded-xl bg-[#8C271E] hover:bg-[#731E17] text-white font-bold text-sm shadow cursor-pointer transition-colors"
                    >
                      {currentQIndex === QUIZ_QUESTIONS.length - 1 ? 'See Results' : 'Next Question →'}
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* Finished Card */
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#F2E8DC] text-[#8C271E] flex items-center justify-center mx-auto shadow-md">
                <Award className="w-8 h-8 text-[#B45309]" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8C271E]">
                  Quiz Completed!
                </span>
                <h3 className="text-3xl font-display font-bold text-[#241B15]">
                  You Scored {score} / {QUIZ_QUESTIONS.length}
                </h3>
                <p className="text-sm text-[#665548] max-w-md mx-auto">
                  {score === 5
                    ? 'Remarkable! You have deep mastery of Karam Utsav folklore, rituals, and indigenous botany.'
                    : score >= 3
                    ? 'Well done! You possess a solid understanding of the sacred traditions of the Akhra.'
                    : 'Good effort! Exploring the rituals and folklore on this site will help you discover the full beauty of Karam.'}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8C271E] hover:bg-[#731E17] text-white font-bold text-sm shadow cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Trivia</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
