import React, { useState } from "react";
import { Button, Input, Select, Space, Card, Switch } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const defaultField = () => ({
  key: "",
  type: "",
  required: false,
  children: [],
  isEditing: true,
});

const FieldBuilder = ({ fields, setFields }) => {
  const addField = () => {
    setFields([...fields, defaultField()]);
  };

  const updateField = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    if (key === "type" && value !== "Nested") {
      updatedFields[index].children = [];
    }
    setFields(updatedFields);
  };

  const deleteField = (index) => {
    const updated = [...fields];
    updated.splice(index, 1);
    setFields(updated);
  };

  return (
    <>
      {fields.map((field, index) => (
        <Card key={index} size="small" style={{ marginBottom: 10 }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Space wrap>
              {field.isEditing ? (
                <>
                  <Input
                    placeholder="Field name"
                    value={field.key}
                    onChange={(e) => updateField(index, "key", e.target.value)}
                  />
                  <Select
                    placeholder="Field type"
                    value={field.type}
                    style={{ width: 120 }}
                    onChange={(val) => updateField(index, "type", val)}
                  >
                    <Option value="String">String</Option>
                    <Option value="Number">Number</Option>
                    <Option value="Boolean">Boolean</Option>
                    <Option value="Date">Date</Option>
                    <Option value="Email">Email</Option>
                    <Option value="Array">Array</Option>
                    <Option value="Object">Object</Option>
                    <Option value="Nested">Nested</Option>
                  </Select>
                  <Switch
                    checked={field.required}
                    onChange={(val) => updateField(index, "required", val)}
                  />
                  <Button
                    type="primary"
                    onClick={() => updateField(index, "isEditing", false)}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <span>
                    <b>{field.key}</b> ({field.type}){" "}
                    {field.required ? "✅" : "❌"}
                  </span>
                  <Button onClick={() => updateField(index, "isEditing", true)}>
                    Edit
                  </Button>
                </>
              )}
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => deleteField(index)}
              />
            </Space>

            {field.type === "Nested" && (
              <FieldBuilder
                fields={field.children}
                setFields={(newChildren) => {
                  const updated = [...fields];
                  updated[index].children = newChildren;
                  setFields(updated);
                }}
              />
            )}
          </Space>
        </Card>
      ))}
      <Button type="primary" onClick={addField} style={{ width: "100%" }}>
        Add Item
      </Button>
    </>
  );
};

const App = () => {
  const [fields, setFields] = useState([]);

  const generateJSON = (fields) => {
    const result = {};
    fields.forEach((field) => {
      switch (field.type) {
        case "String":
          result[field.key] = "example";
          break;
        case "Number":
          result[field.key] = 123;
          break;
        case "Boolean":
          result[field.key] = true;
          break;
        case "Date":
          result[field.key] = "2025-01-01";
          break;
        case "Email":
          result[field.key] = "example@email.com";
          break;
        case "Array":
          result[field.key] = [];
          break;
        case "Object":
          result[field.key] = {};
          break;
        case "Nested":
          result[field.key] = generateJSON(field.children);
          break;
        default:
          result[field.key] = null;
      }
    });
    return result;
  };

  const handleSubmit = () => {
    console.log("Submitted JSON:", generateJSON(fields));
  };

  return (
    <div style={{ display: "flex", gap: 20, padding: 20 }}>
      <div style={{ flex: 1 }}>
        <FieldBuilder fields={fields} setFields={setFields} />
        <Button onClick={handleSubmit} style={{ marginTop: 10 }}>
          Submit
        </Button>
      </div>
      <div style={{ flex: 1 }}>
        <Card title="JSON Preview">
          <pre>{JSON.stringify(generateJSON(fields), null, 2)}</pre>
        </Card>
      </div>
    </div>
  );
};
export default App;
