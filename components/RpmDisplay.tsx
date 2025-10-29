
import React from 'react';
import { RpmOutput } from '../types';

interface RpmDisplayProps {
  data: RpmOutput;
}

const RpmDisplay: React.FC<RpmDisplayProps> = ({ data }) => {
  const { identification, learningDesign, learningExperience, learningAssessment } = data;

  return (
    <div className="space-y-8 rpm-output">
      <h2 className="text-2xl font-bold text-center text-blue-800">Rencana Pembelajaran Mendalam (RPM)</h2>

      {/* Section 1: Identifikasi */}
      <section>
        <h3 className="section-title">A. Identifikasi</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 p-4 border rounded-lg">
          <InfoPair label="Nama Satuan Pendidikan" value={identification.schoolName} />
          <InfoPair label="Mata Pelajaran" value={identification.subject} />
          <InfoPair label="Jenjang / Kelas" value={`${identification.educationLevel} / ${identification.grade}`} />
          <InfoPair label="Jumlah & Durasi Pertemuan" value={`${identification.meetingCount} Pertemuan (@${identification.meetingDuration})`} />
        </div>
      </section>

      {/* Section 2: Desain Pembelajaran */}
      <section>
        <h3 className="section-title">B. Desain Pembelajaran</h3>
        <div className="table-container">
          <table className="w-full">
            <tbody>
              <TableRow header="Capaian Pembelajaran">
                <p>{learningDesign.learningOutcomes}</p>
              </TableRow>
              <TableRow header="Tujuan Pembelajaran">
                <ul className="list-disc pl-5 space-y-1">
                  {learningDesign.learningObjectives.map((obj, i) => <li key={i}>{obj}</li>)}
                </ul>
              </TableRow>
              <TableRow header="Dimensi Lulusan">
                <p>{learningDesign.graduateDimensions.join(', ')}</p>
              </TableRow>
              <TableRow header="Pertanyaan Kunci">
                <ul className="list-disc pl-5 space-y-1">
                  {learningDesign.keyQuestions.map((q, i) => <li key={i}>{q}</li>)}
                </ul>
              </TableRow>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Pengalaman Belajar */}
      <section>
        <h3 className="section-title">C. Pengalaman Belajar</h3>
        <div className="table-container">
          <table className="w-full">
            <thead className="bg-blue-100 text-blue-900">
              <tr>
                <th className="table-header w-1/6">Pertemuan</th>
                <th className="table-header w-4/6">Alur Kegiatan Belajar</th>
                <th className="table-header w-1/6">Alat & Bahan</th>
              </tr>
            </thead>
            <tbody>
              {learningExperience.map(exp => (
                <tr key={exp.meeting} className="border-b">
                  <td className="p-3 align-top font-semibold">
                    <div>Pertemuan {exp.meeting}</div>
                    <div className="text-sm font-normal text-blue-700 mt-1">({exp.pedagogicalPractice})</div>
                    <div className="text-sm font-normal text-gray-600 mt-2">
                        <strong>Materi:</strong> {exp.learningMaterial}
                    </div>
                  </td>
                  <td className="p-3 align-top space-y-2">
                    <Activity title="Pendahuluan" content={exp.activities.opening} />
                    <Activity title="Kegiatan Inti" content={exp.activities.core} />
                    <Activity title="Penutup" content={exp.activities.closing} />
                  </td>
                  <td className="p-3 align-top">
                    <ul className="list-disc pl-5 space-y-1">
                      {exp.toolsAndMaterials.map((tool, i) => <li key={i}>{tool}</li>)}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      
      {/* Section 4: Asesmen Pembelajaran */}
      <section>
        <h3 className="section-title">D. Asesmen Pembelajaran</h3>
        <div className="table-container">
          <table className="w-full">
            <tbody>
              <TableRow header="Asesmen Formatif">
                <div>
                    <p className="font-semibold">{learningAssessment.formative.technique}</p>
                    <p>{learningAssessment.formative.description}</p>
                </div>
              </TableRow>
              <TableRow header="Asesmen Sumatif">
                <div>
                    <p className="font-semibold">{learningAssessment.summative.technique}</p>
                    <p>{learningAssessment.summative.description}</p>
                </div>
              </TableRow>
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer Signatures */}
      <footer className="pt-12 text-center">
        <div className="flex justify-between">
            <div className="w-1/3">
                <p>Mengetahui,</p>
                <p>Kepala Sekolah</p>
                <div className="h-20"></div>
                <p className="font-bold underline">{identification.principalName}</p>
                <p>NIP. {identification.principalNip}</p>
            </div>
            <div className="w-1/3">
                <p>Guru Mata Pelajaran</p>
                <div className="h-20"></div>
                <p className="font-bold underline">{identification.teacherName}</p>
                <p>NIP. {identification.teacherNip}</p>
            </div>
        </div>
      </footer>
       <style>{`
        .section-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e3a8a;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #3b82f6;
        }
        .table-container {
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          overflow: hidden;
        }
        .table-header {
          padding: 0.75rem;
          text-align: left;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .table-row-header {
          background-color: #eff6ff;
          font-weight: 600;
          color: #1e3a8a;
          width: 25%;
          padding: 0.75rem;
          vertical-align: top;
          border-right: 1px solid #d1d5db;
        }
      `}</style>
    </div>
  );
};

// Helper components for display
const InfoPair: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div>
    <span className="font-semibold text-gray-700">{label}:</span>
    <span className="ml-2 text-gray-800">{value || '-'}</span>
  </div>
);

const TableRow: React.FC<{ header: string; children: React.ReactNode }> = ({ header, children }) => (
  <tr className="border-b last:border-b-0">
    <td className="table-row-header">{header}</td>
    <td className="p-3 align-top">{children}</td>
  </tr>
);

const Activity: React.FC<{ title: string; content: string }> = ({ title, content }) => (
    <div>
      <p className="font-semibold">{title}:</p>
      <p className="text-gray-700 whitespace-pre-line">{content}</p>
    </div>
);

export default RpmDisplay;
