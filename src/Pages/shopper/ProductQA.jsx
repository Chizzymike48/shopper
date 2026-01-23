// src/components/shopper/ProductQA.jsx
import { useState } from 'react';
import { ThumbsUp, MessageCircle, CheckCircle } from 'lucide-react';
import Card from '../../components/Shared/Card';
import Button from '../../components/Shared/Button';
import Badge from '../../components/Shared/Badge';

// Mock Q&A data
const mockQAs = [
  {
    id: 1,
    question: 'What is the battery life on this product?',
    askedBy: 'John D.',
    askedDate: '2024-12-20',
    answers: [
      {
        id: 1,
        answer: 'The battery lasts approximately 30 hours on a single charge with normal use.',
        answeredBy: 'Seller',
        answeredDate: '2024-12-20',
        isSeller: true,
        helpful: 45,
      },
      {
        id: 2,
        answer: 'I\'ve been using it for 2 weeks and can confirm it easily lasts 25-30 hours.',
        answeredBy: 'Sarah M.',
        answeredDate: '2024-12-21',
        isSeller: false,
        helpful: 23,
      },
    ],
  },
  {
    id: 2,
    question: 'Does this come with a warranty?',
    askedBy: 'Emily R.',
    askedDate: '2024-12-18',
    answers: [
      {
        id: 3,
        answer: 'Yes, it includes a 1-year manufacturer warranty covering defects.',
        answeredBy: 'Seller',
        answeredDate: '2024-12-18',
        isSeller: true,
        helpful: 67,
      },
    ],
  },
  {
    id: 3,
    question: 'Is it compatible with iPhone 15?',
    askedBy: 'Mike T.',
    askedDate: '2024-12-15',
    answers: [
      {
        id: 4,
        answer: 'Yes, it works perfectly with iPhone 15 and all recent iPhone models.',
        answeredBy: 'Seller',
        answeredDate: '2024-12-15',
        isSeller: true,
        helpful: 89,
      },
      {
        id: 5,
        answer: 'I have an iPhone 15 Pro and it works great!',
        answeredBy: 'Alex K.',
        answeredDate: '2024-12-16',
        isSeller: false,
        helpful: 34,
      },
    ],
  },
  {
    id: 4,
    question: 'What colors are available?',
    askedBy: 'Lisa W.',
    askedDate: '2024-12-10',
    answers: [
      {
        id: 6,
        answer: 'Currently available in Black, White, and Blue.',
        answeredBy: 'Seller',
        answeredDate: '2024-12-10',
        isSeller: true,
        helpful: 56,
      },
    ],
  },
];

export default function ProductQA() {
  const [showAskModal, setShowAskModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [expandedQAs, setExpandedQAs] = useState(new Set([1, 2])); // First 2 expanded by default

  const toggleQA = (id) => {
    const newExpanded = new Set(expandedQAs);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedQAs(newExpanded);
  };

  const handleAskQuestion = (e) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      // In real app, submit to API
      console.log('New question:', newQuestion);
      setNewQuestion('');
      setShowAskModal(false);
      // Show success message
      alert('Your question has been submitted and will be answered soon!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Questions & Answers
          </h2>
          <p className="text-gray-600">
            {mockQAs.length} questions answered
          </p>
        </div>
        <Button onClick={() => setShowAskModal(true)} leftIcon={<MessageCircle className="w-5 h-5" />}>
          Ask a Question
        </Button>
      </div>

      {/* Q&A List */}
      <div className="space-y-4">
        {mockQAs.map((qa) => {
          const isExpanded = expandedQAs.has(qa.id);
          const totalAnswers = qa.answers.length;

          return (
            <Card key={qa.id}>
              {/* Question */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-emerald-700" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Q: {qa.question}</h3>
                  <p className="text-sm text-gray-600">
                    Asked by {qa.askedBy} on{' '}
                    {new Date(qa.askedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {/* Answers */}
              <div className="ml-11 space-y-4">
                {(isExpanded ? qa.answers : qa.answers.slice(0, 1)).map((answer) => (
                  <div key={answer.id} className="pl-4 border-l-2 border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-900">A:</span>
                          {answer.isSeller && (
                            <Badge variant="primary" className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Seller
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-700 mb-2">{answer.answer}</p>
                        <div className="flex items-center gap-4">
                          <p className="text-sm text-gray-600">
                            {answer.answeredBy} •{' '}
                            {new Date(answer.answeredDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                          <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                            <ThumbsUp className="w-4 h-4" />
                            Helpful ({answer.helpful})
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Show More/Less */}
                {totalAnswers > 1 && (
                  <button
                    onClick={() => toggleQA(qa.id)}
                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                  >
                    {isExpanded
                      ? 'Show less'
                      : `Show ${totalAnswers - 1} more ${totalAnswers - 1 === 1 ? 'answer' : 'answers'}`}
                  </button>
                )}

                {/* Answer Button */}
                <Button variant="outline" size="sm">
                  Answer this question
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">Load More Questions</Button>
      </div>

      {/* Ask Question Modal */}
      {showAskModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ask a Question</h3>
            <form onSubmit={handleAskQuestion}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Question
                </label>
                <textarea
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="What would you like to know about this product?"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200 resize-none"
                  required
                />
                <p className="text-sm text-gray-600 mt-2">
                  Your question will be visible to other customers and will be answered by the seller or community.
                </p>
              </div>

              <div className="flex gap-3">
                <Button type="submit" fullWidth>
                  Submit Question
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    setShowAskModal(false);
                    setNewQuestion('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
