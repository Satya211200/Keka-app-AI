import React from 'react';

async function getEmployees() {
  const res = await fetch('http://localhost:8000/api/employees');
  if (!res.ok) throw new Error('Failed to fetch employees');
  return res.json();
}

export default async function EmployeesPage() {
  const employees = await getEmployees();
  return (
    <div>
      <h1>Employees</h1>
      <ul>
        {employees.map((employee: any) => (
          <li key={employee.id}>{employee.name} - {employee.email}</li>
        ))}
      </ul>
    </div>
  );
} 