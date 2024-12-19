"use client";

import { useState } from "react";
import { JsonEditor } from "@/components/json-editor";
import { minifyJSON } from "@/lib/json-utils";
import { toast } from "sonner";

export default function JsonMinify() {
  const [json, setJson] = useState("");
  const [minified, setMinified] = useState("");

  const handleMinify = () => {
    try {
      const result = minifyJSON(json);
      setMinified(result);
      toast.success("JSON minified successfully");
    } catch (error) {
      toast.error("Invalid JSON");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">JSON Minifier</h1>
        <p className="text-muted-foreground mb-6">
          Minify JSON by removing whitespace and formatting.
        </p>

        <div className="grid gap-6">
          <JsonEditor
            value={json}
            onChange={setJson}
            height="200px"
          />

          <button
            onClick={handleMinify}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90"
          >
            Minify JSON
          </button>

          <JsonEditor
            value={minified}
            onChange={setMinified}
            height="200px"
          />
        </div>
      </div>
    </div>
  );
}