const AgentFilter = ({ agents, selectedAgent, onSelectAgent }) => (
  <div className="flex items-center gap-2">
    <span className="text-sm font-medium text-gray-700">Filter by Agent:</span>
    <select
      value={selectedAgent}
      onChange={(e) => onSelectAgent(e.target.value)}
      className="p-2 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
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

export const FilterByPriority = ({ priority, setPriority }) => (
  <div className="flex items-center gap-2">
    <span className="text-sm font-medium text-gray-700">Sort by Priority:</span>
    <select
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
      className="p-2 border-none rounded-lg focus:ring-2   focus:ring-emerald-500 text-sm"
    >
      <option value="high">High to Low</option>
      <option value="low">Low to High</option>
    </select>
  </div>
);
