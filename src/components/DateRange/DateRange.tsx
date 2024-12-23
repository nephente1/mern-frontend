import { useState } from "react";



export const DateRange = ({workouts}) => {
  const [date, setDate] = useState<Date | string>(() =>{
      // Initialize with today's date in the correct format for input type="date"
      const today = new Date();
      return today.toISOString().split('T')[0]
    });
    
  return (
    <div>
      <label>Date:</label>
      <input 
        type="date" 
        onChange={(e) => setDate(e.target.value)} 
        value={typeof date === 'string' ? date : date.toISOString().split('T')[0].split('-').reverse().join('-')}
        // value={typeof date === 'string' ? date : date.toISOString().split('T')[0].split('-').reverse().join('-')}
      />
    </div>
  )
}