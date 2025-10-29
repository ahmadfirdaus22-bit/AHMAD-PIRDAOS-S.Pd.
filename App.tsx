
import React, { useState } from 'react';
import { FormData, RpmOutput, PedagogicalPractice } from './types';
import { generateRpm } from './services/geminiService';
import InputForm from './components/InputForm';
import RpmDisplay from './components/RpmDisplay';
import { graduateDimensionsOptions, pedagogicalPracticesOptions } from './constants';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    schoolName: '',
    teacherName: '',
    teacherNip: '',
    principalName: '',
    principalNip: '',
    educationLevel: 'SMA',
    grade: '10',
    subject: '',
    learningOutcomes: '',
    learningMaterial: '',
    meetingCount: 1,
    meetingDuration: '2 x 45 menit',
    pedagogicalPractices: ['Inkuiri'],
    graduateDimensions: [],
  });
  const [rpmOutput, setRpmOutput] = useState<RpmOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    setRpmOutput(null);
    try {
      const result = await generateRpm(data);
      setRpmOutput(result);
    } catch (e) {
      console.error(e);
      setError('Gagal membuat RPM. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRpmOutput(null);
    setError(null);
    const initialPractices: PedagogicalPractice[] = Array(1).fill(pedagogicalPracticesOptions[0].value);
    setFormData({
        schoolName: '',
        teacherName: '',
        teacherNip: '',
        principalName: '',
        principalNip: '',
        educationLevel: 'SMA',
        grade: '10',
        subject: '',
        learningOutcomes: '',
        learningMaterial: '',
        meetingCount: 1,
        meetingDuration: '2 x 45 menit',
        pedagogicalPractices: initialPractices,
        graduateDimensions: [],
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">
            Generator Rencana Pembelajaran Mendalam (RPM)
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Dibuat oleh <span className="font-semibold">{formData.teacherName || '...'}</span>
          </p>
        </header>
        
        <main>
          {!rpmOutput && !isLoading && (
             <InputForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                isLoading={isLoading}
             />
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
              <p className="mt-4 text-lg font-semibold text-gray-700">Membuat Rencana Pembelajaran...</p>
              <p className="text-gray-500">Proses ini mungkin memakan waktu sejenak.</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative shadow-md" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline ml-2">{error}</span>
                <button 
                  onClick={() => setError(null)} 
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                >
                  <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </button>
            </div>
          )}

          {rpmOutput && (
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <RpmDisplay data={rpmOutput} />
              <div className="mt-8 text-center">
                <button
                  onClick={handleReset}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
                >
                  Buat RPM Baru
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
