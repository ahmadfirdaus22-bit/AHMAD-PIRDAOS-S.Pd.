
import { GoogleGenAI, Type } from "@google/genai";
import { FormData, RpmOutput } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        identification: {
            type: Type.OBJECT,
            properties: {
                schoolName: { type: Type.STRING },
                subject: { type: Type.STRING },
                educationLevel: { type: Type.STRING },
                grade: { type: Type.STRING },
                teacherName: { type: Type.STRING },
                teacherNip: { type: Type.STRING },
                principalName: { type: Type.STRING },
                principalNip: { type: Type.STRING },
                meetingCount: { type: Type.INTEGER },
                meetingDuration: { type: Type.STRING },
            },
        },
        learningDesign: {
            type: Type.OBJECT,
            properties: {
                learningOutcomes: { type: Type.STRING },
                learningObjectives: { type: Type.ARRAY, items: { type: Type.STRING } },
                graduateDimensions: { type: Type.ARRAY, items: { type: Type.STRING } },
                keyQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
        },
        learningExperience: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    meeting: { type: Type.INTEGER },
                    pedagogicalPractice: { type: Type.STRING },
                    learningMaterial: { type: Type.STRING },
                    activities: {
                        type: Type.OBJECT,
                        properties: {
                            opening: { type: Type.STRING },
                            core: { type: Type.STRING },
                            closing: { type: Type.STRING },
                        },
                    },
                    toolsAndMaterials: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
            },
        },
        learningAssessment: {
            type: Type.OBJECT,
            properties: {
                formative: {
                    type: Type.OBJECT,
                    properties: {
                        technique: { type: Type.STRING },
                        description: { type: Type.STRING },
                    },
                },
                summative: {
                    type: Type.OBJECT,
                    properties: {
                        technique: { type: Type.STRING },
                        description: { type: Type.STRING },
                    },
                },
            },
        },
    },
};

const createPrompt = (data: FormData): string => {
    const practicesText = data.pedagogicalPractices
        .map((practice, index) => `Pertemuan ${index + 1}: ${practice}`)
        .join(', ');

    return `
Anda adalah seorang ahli perancang kurikulum dan guru ahli di Indonesia yang berspesialisasi dalam membuat Rencana Pembelajaran Mendalam (RPM) yang terperinci berdasarkan kerangka Kurikulum Merdeka.

Tugas Anda adalah membuat RPM yang komprehensif berdasarkan data berikut:
- Nama Satuan Pendidikan: ${data.schoolName}
- Nama Guru: ${data.teacherName}
- NIP Guru: ${data.teacherNip}
- Nama Kepala Sekolah: ${data.principalName}
- NIP Kepala Sekolah: ${data.principalNip}
- Jenjang Pendidikan: ${data.educationLevel}
- Kelas: ${data.grade}
- Mata Pelajaran: ${data.subject}
- Capaian Pembelajaran (CP): ${data.learningOutcomes}
- Materi Pelajaran: ${data.learningMaterial}
- Jumlah Pertemuan: ${data.meetingCount}
- Durasi Setiap Pertemuan: ${data.meetingDuration}
- Praktik Pedagogis per Pertemuan: ${practicesText}
- Dimensi Lulusan yang ditargetkan: ${data.graduateDimensions.join(', ')}

HASIL HARUS DALAM FORMAT JSON YANG SESUAI DENGAN SKEMA YANG DIBERIKAN.
Pastikan konten yang dihasilkan relevan, praktis, dan dapat langsung digunakan oleh guru. 
- Buat Tujuan Pembelajaran yang terukur dari Capaian Pembelajaran.
- Buat Pertanyaan Kunci yang memantik rasa ingin tahu siswa.
- Rancang setiap pertemuan dengan detail kegiatan (pembuka, inti, penutup) yang sesuai dengan praktik pedagogis yang dipilih.
- Tentukan asesmen formatif dan sumatif yang relevan untuk mengukur ketercapaian tujuan.
- Pastikan semua bagian terisi dengan informasi yang berkualitas dan mendalam.
- Untuk materi pelajaran di setiap sesi pengalaman belajar, pecah materi pelajaran utama menjadi sub-topik yang sesuai untuk setiap pertemuan.
`;
};

export const generateRpm = async (data: FormData): Promise<RpmOutput> => {
    const prompt = createPrompt(data);
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
                temperature: 0.7,
            },
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        
        // Populate identification data directly from form as it's more reliable
        result.identification = {
            schoolName: data.schoolName,
            subject: data.subject,
            educationLevel: `${data.educationLevel} / Sederajat`,
            grade: data.grade,
            teacherName: data.teacherName,
            teacherNip: data.teacherNip,
            principalName: data.principalName,
            principalNip: data.principalNip,
            meetingCount: data.meetingCount,
            meetingDuration: data.meetingDuration,
        };

        return result as RpmOutput;

    } catch (error) {
        console.error("Error generating RPM with Gemini:", error);
        throw new Error("Failed to parse response from AI. Please try again.");
    }
};
