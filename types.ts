
export type EducationLevel = 'SD' | 'SMP' | 'SMA';
export type PedagogicalPractice = 'Inkuiri' | 'PjBL' | 'Diskusi' | 'Kolaboratif' | 'Problem Solving' | 'Game Based Learning' | 'Station Learning';
export type GraduateDimension = 'Keimanan & Ketakwaan' | 'Kewargaan' | 'Penalaran Kritis' | 'Kreativitas' | 'Kolaborasi' | 'Kemandirian' | 'Kesehatan' | 'Komunikasi';

export interface FormData {
  schoolName: string;
  teacherName: string;
  teacherNip: string;
  principalName: string;
  principalNip: string;
  educationLevel: EducationLevel;
  grade: string;
  subject: string;
  learningOutcomes: string;
  learningMaterial: string;
  meetingCount: number;
  meetingDuration: string;
  pedagogicalPractices: PedagogicalPractice[];
  graduateDimensions: GraduateDimension[];
}

export interface Identification {
  schoolName: string;
  subject: string;
  educationLevel: string;
  grade: string;
  teacherName: string;
  teacherNip: string;
  principalName: string;
  principalNip: string;
  meetingCount: number;
  meetingDuration: string;
}

export interface LearningDesign {
  learningOutcomes: string;
  learningObjectives: string[];
  graduateDimensions: string[];
  keyQuestions: string[];
}

export interface LearningExperience {
  meeting: number;
  pedagogicalPractice: string;
  learningMaterial: string;
  activities: {
    opening: string;
    core: string;
    closing: string;
  };
  toolsAndMaterials: string[];
}

export interface LearningAssessment {
  formative: {
    technique: string;
    description: string;
  };
  summative: {
    technique: string;
    description: string;
  };
}

export interface RpmOutput {
  identification: Identification;
  learningDesign: LearningDesign;
  learningExperience: LearningExperience[];
  learningAssessment: LearningAssessment;
}
