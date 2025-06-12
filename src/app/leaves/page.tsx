import React from 'react';

async function getLeaves() {
  const res = await fetch('http://localhost:8000/api/leaves');
  if (!res.ok) throw new Error('Failed to fetch leaves');
  return res.json();
}

export default async function LeavesPage() {
  const leaves = await getLeaves();
  return (
    <div>
      <h1>Leave</h1>
      <ul>
        {leaves.map((leave: any) => (
          <li key={leave.id}>
            Employee ID: {leave.employeeId} - Start: {leave.startDate} - End: {leave.endDate} - Type: {leave.type} - Status: {leave.status}
          </li>
        ))}
      </ul>
    </div>
  );
} 