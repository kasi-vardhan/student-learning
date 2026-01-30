import { collection, addDoc, getDocs, query, orderBy, limit, where, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

const COLLECTION_NAME = "learningResults";

// Simulation Logic (K-Means simplified)
const determineLearningStyle = (data) => {
    const score = Number(data.quizScore);
    const time = Number(data.timeSpent);
    const consistency = Number(data.consistency);
    const attempts = Number(data.attempts);

    if (score > 85 && time < 5) return "Fast Learner";
    if (score > 80 && (time > 8 || consistency > 8)) return "Highly Engaged";
    if (score < 60 && time > 8) return "Slow Learner";
    if (score < 50 || (time < 3 && score < 60)) return "Disengaged Learner";

    return "Average Learner";
};

export const addStudentData = async (studentData) => {
    if (!auth.currentUser) {
        throw new Error("User must be authenticated to add student data");
    }

    const learningStyle = determineLearningStyle(studentData);
    const newStudent = {
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        ...studentData,
        learningStyle,
        createdAt: new Date().toISOString(),
        timeSpent: Number(studentData.timeSpent),
        quizScore: Number(studentData.quizScore),
        attempts: Number(studentData.attempts),
        consistency: Number(studentData.consistency),
    };

    // Save to Firestore
    const docRef = await addDoc(collection(db, COLLECTION_NAME), newStudent);

    return { id: docRef.id, learningStyle };
};

export const getStudents = async () => {
    if (!auth.currentUser) {
        throw new Error("User must be authenticated to view student data");
    }

    // Query Firestore for current user's data
    const q = query(
        collection(db, COLLECTION_NAME),
        where("userId", "==", auth.currentUser.uid),
        limit(50)
    );

    const querySnapshot = await getDocs(q);
    const students = [];

    querySnapshot.forEach((doc) => {
        students.push({
            id: doc.id,
            ...doc.data()
        });
    });

    // Sort locally by createdAt desc to avoid index issues
    return students.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const deleteStudentData = async (studentId) => {
    if (!auth.currentUser) {
        throw new Error("User must be authenticated to delete data");
    }

    const docRef = doc(db, COLLECTION_NAME, studentId);
    await deleteDoc(docRef);
};
