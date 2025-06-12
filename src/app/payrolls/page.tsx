import React from 'react';

async function getPayrolls() {
  const res = await fetch('http://localhost:8000/api/payrolls');
  if (!res.ok) throw new Error('Failed to fetch payrolls');
  return res.json();
}

export default async function PayrollsPage() {
  const payrolls = await getPayrolls();
  return (
    <div>
      <h1>Payroll</h1>
      <ul>
        {payrolls.map((payroll: any) => (
          <li key={payroll.id}>
            Employee ID: {payroll.employeeId} - Month: {payroll.month} - Year: {payroll.year} - Net Salary: {payroll.netSalary}
          </li>
        ))}
      </ul>
    </div>
  );
} 