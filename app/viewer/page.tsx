"use client";

import { useState } from "react";
import { JsonEditor } from "@/components/json-editor";
import { formatJSON, minifyJSON } from "@/lib/json-utils";
import { toast } from "sonner";

export default function JsonViewer() {
  const [json, setJson] = useState("");

  const handleFormat = () => {
    try {
      const formatted = formatJSON(json);
      setJson(formatted);
      toast.success("JSON formatted successfully");
    } catch (error) {
      toast.error("Invalid JSON");
    }
  };

  const handleMinify = () => {
    try {
      const minified = minifyJSON(json);
      setJson(minified);
      toast.success("JSON minified successfully");
    } catch (error) {
      toast.error("Invalid JSON");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">JSON Viewer & Formatter</h1>
        <p className="text-muted-foreground mb-6">
          Paste your JSON below to view, format, or minify it.
        </p>
        
        <JsonEditor
          value={json}
          onChange={setJson}
          onFormat={handleFormat}
          onMinify={handleMinify}
        />
      </div>
    </div>
  );
}