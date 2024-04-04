export interface CourseResponse {
  courses: Course[];
}
export interface StarsResponse {
  course_id: string | number;
  starCount: number;
}
export interface CommentsResponse {
  course_id: string | number;
  comments: Object;
}
export interface Comment {
  user_id: string | number;
  comment: string;
}

export interface Course {
  id: number;
  title: string;
  link: string;
  description: {
    short: string;
    full: string;
    duration: number;
    blocks_count: number;
    level: "begginer" | "middle" | "advanced";
    language: "ru" | "en";
    knowledges: string[];
    type: string;
  };
  rate: {
    stars: number;
    feedbacks: number;
  };
  skills_achieve: string[];
  content: CourseBlock[];
  feedback: Feedback[];
}

export interface Feedback {
  user_name: string;
  contnet: string;
  rate: number;
}

export interface CourseBlock {
  title: string;
  duration: number;
  plan: {
    title: string;
    duration: string;
  }[];
}
