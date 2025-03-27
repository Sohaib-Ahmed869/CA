import { DatePicker, Select, InputNumber, Button, Form, message } from "antd";
import { FaBullseye } from "react-icons/fa";
import { updateAgentTarget } from "../../Customer/Services/adminServices";

const AssignTargetsForm = ({ agents, onSuccess }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const payload = {
        targetType: values.targetType,
        targetValue: Number(values.targetValue), // ✅ Ensure it's a number
        date: values.date.format("YYYY-MM-DD"),
      };

      if (values.agentId === "all") {
        // ✅ Handle failures in Promise.all
        const results = await Promise.allSettled(
          agents.map((agent) => updateAgentTarget(agent.id, payload))
        );

        // Check if any update failed
        const failedUpdates = results.filter(
          (res) => res.status === "rejected"
        );

        if (failedUpdates.length) {
          message.error(`${failedUpdates.length} targets failed to update.`);
        } else {
          message.success("Targets updated successfully");
        }
      } else {
        await updateAgentTarget(values.agentId, payload);
        message.success("Target updated successfully");
      }

      form.resetFields();
      onSuccess?.();
    } catch (error) {
      message.error("Failed to update targets");
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <div className="grid gap-4 md:grid-cols-2">
        <Form.Item
          label="Select Agent"
          style={{
            fontFamily: "outfit",
            fontWeight: "400",
            color: "red ",
          }}
          name="agentId"
          rules={[{ required: true, message: "Please select an agent" }]}
        >
          <Select
            placeholder="Choose agent"
            className="w-full"
            suffixIcon={<FaBullseye className="text-gray-400" />}
          >
            <Select.Option value="all">All Agents</Select.Option>
            {agents.map((agent) => (
              <Select.Option key={agent.id} value={agent.id}>
                {agent.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Target Type"
          name="targetType"
          rules={[{ required: true, message: "Please select target type" }]}
        >
          <Select placeholder="Select target type" className="w-full">
            <Select.Option value="applications">Applications</Select.Option>
            <Select.Option value="calls">Calls</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Target Date"
          name="date"
          rules={[{ required: true, message: "Please select date" }]}
        >
          <DatePicker
            format="YYYY-MM-DD"
            className="w-full"
            placeholder="Select date"
          />
        </Form.Item>

        <Form.Item
          label="Target Value"
          name="targetValue"
          rules={[
            { required: true, message: "Please enter target value" },
            { type: "number", min: 1, message: "Minimum value is 1" },
          ]}
        >
          <InputNumber min={1} className="w-full" placeholder="Enter target" />
        </Form.Item>
      </div>

      <Form.Item className="mt-6">
        <button
          type="submit"
          className="w-full rounded-lg  text-white hover:bg-emerald-700 bg-emerald-600 transition-all transition-duration-300 ease-in-out  h-10 font-semibold"
        >
          Set Targets
        </button>
      </Form.Item>
    </Form>
  );
};

export default AssignTargetsForm;
