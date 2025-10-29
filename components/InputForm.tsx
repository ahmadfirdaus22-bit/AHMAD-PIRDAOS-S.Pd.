
import React from 'react';
import { FormData, EducationLevel, PedagogicalPractice } from '../types';
import { educationLevels, grades, pedagogicalPracticesOptions, graduateDimensionsOptions } from '../constants';

interface InputFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ formData, setFormData, onSubmit, isLoading }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEducationLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const level = e.target.value as EducationLevel;
    setFormData(prev => ({
      ...prev,
      educationLevel: level,
      grade: grades[level][0],
    }));
  };
  
  const handleMeetingCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value, 10) || 1;
    const newCount = Math.max(1, Math.min(10, count)); // Limit between 1 and 10 meetings
    
    const currentPractices = formData.pedagogicalPractices;
    const newPractices: PedagogicalPractice[] = Array(newCount).fill(pedagogicalPracticesOptions[0].value);
    
    // Preserve existing selections
    for (let i = 0; i < Math.min(newCount, currentPractices.length); i++) {
      newPractices[i] = currentPractices[i];
    }
    
    setFormData(prev => ({
      ...prev,
      meetingCount: newCount,
      pedagogicalPractices: newPractices,
    }));
  };

  const handlePedagogicalPracticeChange = (index: number, value: PedagogicalPractice) => {
    const newPractices = [...formData.pedagogicalPractices];
    newPractices[index] = value;
    setFormData(prev => ({ ...prev, pedagogicalPractices: newPractices }));
  };

  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const dimension = value as (typeof graduateDimensionsOptions[number]['value']);
    
    setFormData(prev => {
      const currentDimensions = prev.graduateDimensions;
      if (checked) {
        return { ...prev, graduateDimensions: [...currentDimensions, dimension] };
      } else {
        return { ...prev, graduateDimensions: currentDimensions.filter(d => d !== dimension) };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Informasi Umum</h3>
          <InputField label="Nama Satuan Pendidikan" name="schoolName" value={formData.schoolName} onChange={handleInputChange} required />
          <InputField label="Nama Guru" name="teacherName" value={formData.teacherName} onChange={handleInputChange} required />
          <InputField label="NIP Guru" name="teacherNip" value={formData.teacherNip} onChange={handleInputChange} />
          <InputField label="Nama Kepala Sekolah" name="principalName" value={formData.principalName} onChange={handleInputChange} required />
          <InputField label="NIP Kepala Sekolah" name="principalNip" value={formData.principalNip} onChange={handleInputChange} />
        </div>
        
        {/* Right Column */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Detail Pembelajaran</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField label="Jenjang Pendidikan" name="educationLevel" value={formData.educationLevel} onChange={handleEducationLevelChange} options={educationLevels} />
            <SelectField label="Kelas" name="grade" value={formData.grade} onChange={handleInputChange} options={grades[formData.educationLevel].map(g => ({ value: g, label: g }))} />
          </div>
          <InputField label="Mata Pelajaran" name="subject" value={formData.subject} onChange={handleInputChange} required />
          <TextAreaField label="Capaian Pembelajaran (CP)" name="learningOutcomes" value={formData.learningOutcomes} onChange={handleInputChange} required />
          <TextAreaField label="Materi Pelajaran" name="learningMaterial" value={formData.learningMaterial} onChange={handleInputChange} required />
        </div>
      </div>
      
      {/* Full-width section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Pengaturan Pertemuan</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <InputField type="number" label="Jumlah Pertemuan" name="meetingCount" value={formData.meetingCount.toString()} onChange={handleMeetingCountChange} min="1" max="10" />
            <InputField label="Durasi per Pertemuan" name="meetingDuration" value={formData.meetingDuration} onChange={handleInputChange} placeholder="cth: 2 x 45 menit" required />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Praktik Pedagogis per Pertemuan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: formData.meetingCount }).map((_, index) => (
            <SelectField 
              key={index} 
              label={`Pertemuan ${index + 1}`} 
              value={formData.pedagogicalPractices[index]} 
              onChange={(e) => handlePedagogicalPracticeChange(index, e.target.value as PedagogicalPractice)} 
              options={pedagogicalPracticesOptions} 
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Dimensi Lulusan (Pilih beberapa)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {graduateDimensionsOptions.map(option => (
            <CheckboxField 
              key={option.value} 
              label={option.label} 
              value={option.value} 
              checked={formData.graduateDimensions.includes(option.value)}
              onChange={handleDimensionChange}
            />
          ))}
        </div>
      </div>
      
      <div className="pt-4 text-center">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-3 px-10 rounded-lg transition-colors duration-300"
        >
          {isLoading ? 'Memproses...' : 'Buat RPM Sekarang'}
        </button>
      </div>
    </form>
  );
};

// Helper components for form fields for cleaner code
const InputField = (props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">{props.label}</label>
    <input {...props} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
  </div>
);

const TextAreaField = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) => (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">{props.label}</label>
      <textarea {...props} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
    </div>
);

const SelectField = (props: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: { value: string; label: string }[] }) => (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">{props.label}</label>
      <select {...props} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white">
        {props.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    </div>
);

const CheckboxField = (props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <label className="flex items-center space-x-2 text-sm text-gray-700 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
    <input type="checkbox" {...props} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
    <span>{props.label}</span>
  </label>
);

export default InputForm;
