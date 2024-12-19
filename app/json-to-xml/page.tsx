"use client";

import { useState } from "react";
import { jsonToXML } from "@/lib/json-utils";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/json-editor";

export default function JsonToXml() {
  const [json, setJson] = useState("");
  const [xml, setXml] = useState("");

  const handleConvert = () => {
    try {
      const parsed = JSON.parse(json);
      const result = jsonToXML(parsed);
      setXml(result);
      toast.success("JSON converted to XML successfully");
    } catch (error) {
      toast.error("Invalid JSON");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">JSON to XML Converter</h1>
        <p className="text-muted-foreground mb-6">
          Convert JSON data to XML format.
        </p>

        <div className="grid gap-6">
          <JsonEditor
            value={json}
            onChange={setJson}
            height="200px"
          />

          <Button onClick={handleConvert}>Convert to XML</Button>

          <Card>
            <CardContent className="p-4">
              <label className="block text-sm font-medium mb-2">XML Output</label>
              <Textarea
                value={xml}
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