const AgentFilter = ({ agents, selectedAgent, onSelectAgent }) => (
  <div className="flex items-center gap-4">
    <span className="text-gray-600">Filter by Agent:</span>
    <select
      value={selectedAgent}
      onChange={(e) => onSelectAgent(e.target.value)}
      className="px-4 py-2 border rounded"
    >
      <option value="all">All Agents</option>
      {agents.map((agent) => (
        <option key={agent.id} value={agent.name}>
          {agent.name}
        </option>
      ))}
    </select>
  </div>
);

export default AgentFilter;
