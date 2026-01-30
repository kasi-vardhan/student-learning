import { questions } from '../data/questions';

export const getQuestions = (count = 10) => {
    // Shuffle and pick 'count' questions
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

export const calculateScore = (answers) => {
    let score = 0;
    answers.forEach(ans => {
        const question = questions.find(q => q.id === ans.questionId);
        if (question && question.answer.toLowerCase() === ans.selectedAnswer.toLowerCase()) {
            score++;
        }
    });
    return score;
};
