"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Copy } from "lucide-react";

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  onFormat?: () => void;
  onMinify?: () => void;
  height?: string;
}

export function JsonEditor({
  value,
  onChange,
  onFormat,
  onMinify,
  height = "400px",
}: JsonEditorProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-2 mb-2">
          {onFormat && (
            <Button variant="secondary" onClick={onFormat}>
              Format
            </Button>
          )}
          {onMinify && (
            <Button variant="secondary" onClick={onMinify}>
              Minify
            </Button>
          )}
          <Button variant="secondary" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-mono"
          style={{ height }}
        />
      </CardContent>
    </Card>
  );
}