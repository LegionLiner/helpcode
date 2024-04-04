import { defineStore } from "pinia";

interface Feedback {
    id: number;
    course_id: number;
    text: string;
    rate: number;
    feedback_by: string;
}

let feedbacksLocal = [];
if (localStorage.getItem("helpcode-feedbacks")) {
    feedbacksLocal = JSON.parse(localStorage.getItem("helpcode-feedbacks") as string);
}

export const useFeedbackStore = defineStore("feedbackStore", () => {
    const feedbacks = ref<Feedback[]>([]);

    function addFeedback(feedback: Feedback) {
        feedbacks.value.push({
            ...feedback,
            id: feedbacks.value.length + 1
        });
        localStorage.setItem("helpcode-feedbacks", JSON.stringify(feedbacks.value));
    }
    function deleteFeedback(id: number) {
        const index = feedbacks.value.findIndex((feedback: Feedback) => {
            return feedback.id === id;
        });
        feedbacks.value.splice(index, 1);
        localStorage.setItem("helpcode-feedbacks", JSON.stringify(feedbacks.value));
    }
    function getFeedback(id: number) {
        return feedbacks.value.filter((feedback: Feedback) => {
            return feedback.course_id === id;
        })
    }
    function onloaded() {
        if (feedbacksLocal.length) {
            feedbacks.value = feedbacksLocal;
        }
    }

    return {
        feedbacks, addFeedback, deleteFeedback, getFeedback, onloaded
    }
})