import React from 'react';

async function getAttendances() {
  const res = await fetch('http://localhost:8000/api/attendances');
  if (!res.ok) throw new Error('Failed to fetch attendances');
  return res.json();
}

export default async function AttendancesPage() {
  const attendances = await getAttendances();
  return (
    <div>
      <h1>Attendance</h1>
      <ul>
        {attendances.map((attendance: any) => (
          <li key={attendance.id}>
            Employee ID: {attendance.employeeId} - Date: {attendance.date} - Status: {attendance.status}
          </li>
        ))}
      </ul>
    </div>
  );
} 