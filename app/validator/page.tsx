"use client";

import { useState } from "react";
import { JsonEditor } from "@/components/json-editor";
import { validateJSON } from "@/lib/json-utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle } from "lucide-react";

export default function JsonValidator() {
  const [json, setJson] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleValidate = () => {
    const valid = validateJSON(json);
    setIsValid(valid);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">JSON Validator</h1>
        <p className="text-muted-foreground mb-6">
          Paste your JSON below to validate its syntax and structure.
        </p>

        {isValid !== null && (
          <Alert className={`mb-6 ${isValid ? "bg-green-500/10" : "bg-red-500/10"}`}>
            <AlertDescription className="flex items-center">
              {isValid ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  <span>Valid JSON</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 mr-2 text-red-500" />
                  <span>Invalid JSON</span>
                </>
              )}
            </AlertDescription>
          </Alert>
        )}
        
        <JsonEditor
          value={json}
          onChange={(value) => {
            setJson(value);
            setIsValid(null);
          }}
        />
        
        <div className="mt-4">
          <button
            onClick={handleValidate}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90"
          >
            Validate JSON
          </button>
        </div>
      </div>
    </div>
  );
}