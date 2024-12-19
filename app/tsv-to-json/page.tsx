"use client";

import { useState } from "react";
import { JsonEditor } from "@/components/json-editor";
import { tsvToJSON } from "@/lib/json-utils";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function TsvToJson() {
  const [tsv, setTsv] = useState("");
  const [json, setJson] = useState("");

  const handleConvert = () => {
    try {
      const result = tsvToJSON(tsv);
      setJson(JSON.stringify(result, null, 2));
      toast.success("TSV converted to JSON successfully");
    } catch (error) {
      toast.error("Invalid TSV format");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">TSV to JSON Converter</h1>
        <p className="text-muted-foreground mb-6">
          Convert TSV (Tab-Separated Values) data to JSON format. First row should contain column headers.
        </p>

        <div className="grid gap-6">
          <Card>
            <CardContent className="p-4">
              <label className="block text-sm font-medium mb-2">TSV Input</label>
              <Textarea
                value={tsv}
                onChange={(e) => setTsv(e.target.value)}
                className="font-mono h-[200px]"
                placeholder="name\tage\tcity\nJohn\t30\tNew York\nJane\t25\tLondon"
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