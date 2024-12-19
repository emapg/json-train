"use client";

import { useState } from "react";
import { jsonToCSV } from "@/lib/json-utils";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/json-editor";

export default function JsonToCsv() {
  const [json, setJson] = useState("");
  const [csv, setCsv] = useState("");

  const handleConvert = () => {
    try {
      const parsed = JSON.parse(json);
      if (!Array.isArray(parsed)) {
        throw new Error("Input must be an array of objects");
      }
      const result = jsonToCSV(parsed);
      setCsv(result);
      toast.success("JSON converted to CSV successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Invalid JSON");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">JSON to CSV Converter</h1>
        <p className="text-muted-foreground mb-6">
          Convert JSON array of objects to CSV format.
        </p>

        <div className="grid gap-6">
          <JsonEditor
            value={json}
            onChange={setJson}
            height="200px"
          />

          <Button onClick={handleConvert}>Convert to CSV</Button>

          <Card>
            <CardContent className="p-4">
              <label className="block text-sm font-medium mb-2">CSV Output</label>
              <Textarea
                value={csv}
                readOnly
                className="font-mono h-[200px]"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}