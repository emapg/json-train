"use client";

import { useState } from "react";
import { JsonEditor } from "@/components/json-editor";
import { xmlToJSON } from "@/lib/json-utils";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function XmlToJson() {
  const [xml, setXml] = useState("");
  const [json, setJson] = useState("");

  const handleConvert = () => {
    try {
      const result = xmlToJSON(xml);
      setJson(JSON.stringify(result, null, 2));
      toast.success("XML converted to JSON successfully");
    } catch (error) {
      toast.error("Invalid XML");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">XML to JSON Converter</h1>
        <p className="text-muted-foreground mb-6">
          Convert XML data to JSON format.
        </p>

        <div className="grid gap-6">
          <Card>
            <CardContent className="p-4">
              <label className="block text-sm font-medium mb-2">XML Input</label>
              <Textarea
                value={xml}
                onChange={(e) => setXml(e.target.value)}
                className="font-mono h-[200px]"
                placeholder="Paste your XML here..."
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