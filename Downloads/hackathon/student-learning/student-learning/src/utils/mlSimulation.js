// This mock utility simulates the Machine Learning backend.
// In a real app, this would call a Python Flask API.

export const predictLearningStyle = (data) => {
    // Simulate processing delay
    return new Promise((resolve) => {
        setTimeout(() => {
            // Logic to determine cluster (K-Means simulation)
            // Clusters: 
            // 0: High Achiever (High Time, High Score, High Engagement)
            // 1: Struggling Learner (Low Score, High Time)
            // 2: Fast Learner (Low Time, High Score)
            // 3: Disengaged (Low Time, Low Score, Low Engagement)

            const { timeSpent, quizScore, engagement } = data;

            let cluster = 0;
            let label = "Balanced Learner";
            let description = "Maintains a steady pace with average performance.";
            let recommendations = ["Try to increase consistency.", "Take more challenging quizzes."];

            const score = parseFloat(quizScore);
            const time = parseFloat(timeSpent);

            // Heuristic rules to simulate clustering
            if (score > 85 && time < 5) {
                cluster = 2;
                label = "Fast Learner";
                description = "Grasps concepts quickly with minimal study time. Highly efficient.";
                recommendations = [
                    "Challenge yourself with advanced topics.",
                    "Help peers to reinforce your knowledge.",
                    "Focus on depth rather than breadth."
                ];
            } else if (score > 80 && engagement === 'high') {
                cluster = 0;
                label = "High Achiever";
                description = "Dedicates significant effort and achieves top results. Highly motivated.";
                recommendations = [
                    "Maintain your current study habits.",
                    "Explore supplementary materials.",
                    " Prepare for competitive exams."
                ];
            } else if (score < 60 && time > 10) {
                cluster = 1;
                label = "Struggling Learner";
                description = "Spending a lot of time but struggling with concepts. Needs focused guidance.";
                recommendations = [
                    "Review fundamental concepts.",
                    "Try different learning resources (videos vs text).",
                    "Schedule a session with a mentor."
                ];
            } else if (score < 50 || engagement === 'low') {
                cluster = 3;
                label = "Disengaged / Needs Motivation";
                description = "Low engagement and performance. May need a different approach or motivation.";
                recommendations = [
                    "Set small, achievable goals.",
                    "Gamify your learning experience.",
                    "Identify distractions and minimize them."
                ];
            } else {
                // Default / Middle ground
                cluster = 4;
                label = "Steady Learner";
                description = "Consistent performance but has room for optimization.";
                recommendations = [
                    "Increase practice frequency.",
                    "Analyze quiz mistakes deeply.",
                    "Participate in group studies."
                ];
            }

            resolve({
                cluster,
                label,
                description,
                recommendations,
                originalData: data
            });
        }, 2000); // 2 second mock delay
    });
};

// Generate dummy data for the dashboard
export const generateMockStudents = (count = 20) => {
    const styles = ["Fast Learner", "High Achiever", "Struggling Learner", "Disengaged", "Steady Learner"];
    const students = [];

    for (let i = 0; i < count; i++) {
        students.push({
            id: i + 1,
            name: `Student ${i + 1}`,
            style: styles[Math.floor(Math.random() * styles.length)],
            score: Math.floor(Math.random() * 40) + 60, // 60-100
            time: Math.floor(Math.random() * 15) + 1,
        });
    }
    return students;
};
