"use client";

import { useState } from "react";
import { JsonEditor } from "@/components/json-editor";
import { csvToJSON } from "@/lib/json-utils";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CsvToJson() {
  const [csv, setCsv] = useState("");
  const [json, setJson] = useState("");

  const handleConvert = () => {
    try {
      const result = csvToJSON(csv);
      setJson(JSON.stringify(result, null, 2));
      toast.success("CSV converted to JSON successfully");
    } catch (error) {
      toast.error("Invalid CSV format");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">CSV to JSON Converter</h1>
        <p className="text-muted-foreground mb-6">
          Convert CSV data to JSON format. First row should contain column headers.
        </p>

        <div className="grid gap-6">
          <Card>
            <CardContent className="p-4">
              <label className="block text-sm font-medium mb-2">CSV Input</label>
              <Textarea
                value={csv}
                onChange={(e) => setCsv(e.target.value)}
                className="font-mono h-[200px]"
                placeholder="name,age,city&#10;John,30,New York&#10;Jane,25,London"
              />
            </CardContent>
          </Card>

          <Button onClick={handleConvert}>Convert to JSON</Button>

          <JsonEditor
            value={json}
            onChange={setJson}
            height="200px"
          />
        </div>
      </div>
    </div>
  );
}