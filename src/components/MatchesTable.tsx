const MatchesTable = () => {
  const timeSlots = [
    { id: 1, from: "7:00", to: "7:10", team1: "فريق 1", team2: "فريق 2" },
    { id: 2, from: "7:15", to: "7:25", team1: "فريق 1", team2: "فريق 3" },
    { id: 3, from: "7:30", to: "7:40", team1: "فريق 2", team2: "فريق 3" },
    { id: 4, from: "7:45", to: "7:55", team1: "فريق 1", team2: "فريق 2" },
    { id: 5, from: "8:00", to: "8:10", team1: "فريق 1", team2: "فريق 3" },
    { id: 6, from: "8:15", to: "8:25", team1: "فريق 2", team2: "فريق 3" },
    { id: 7, from: "8:30", to: "8:40", team1: "فريق 1", team2: "فريق 2" },
    { id: 8, from: "8:45", to: "8:55", team1: "فريق 1", team2: "فريق 3" },
  ];

  return (
    <table className="w-full max-w-xl border border-white text-center">
      <thead>
        <tr className="h-18 border border-white">
          <th className="border border-white bg-white p-2">من</th>
          <th className="border border-white bg-white p-2">إلى</th>
          <th colSpan={3} className="border border-white bg-white p-2">
            الفرق
          </th>
        </tr>
      </thead>
      <tbody>
        {timeSlots.map((timeSlot) => (
          <tr className="h-12 border-b border-white font-bold" key={timeSlot.id}>
            <td className="p-2 border-l border-white">{timeSlot.from}</td>
            <td className="p-2 border-l border-white">{timeSlot.to}</td>
            <td className="p-2 w-32">{timeSlot.team1}</td>
            <td className="p-2 w-10">vs</td>
            <td className="p-2 w-32">{timeSlot.team2}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MatchesTable;
