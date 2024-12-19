import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, FileJson, FileText, FileType2 } from "lucide-react";
import Link from "next/link";

const tools = [
  {
    name: "JSON Viewer & Formatter",
    description: "View and format JSON data with syntax highlighting",
    href: "/viewer",
    icon: FileJson,
  },
  {
    name: "JSON Validator",
    description: "Validate JSON structure and syntax",
    href: "/validator",
    icon: Code2,
  },
  {
    name: "Format Conversion",
    description: "Convert between JSON, XML, CSV, and TSV formats",
    href: "/xml-to-json",
    icon: FileType2,
  },
  {
    name: "JSON Text Tools",
    description: "Minify, beautify, and transform JSON data",
    href: "/minify",
    icon: FileText,
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          JSON Tools Suite
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A comprehensive collection of tools to work with JSON data. Format, validate,
          convert, and transform your JSON with ease.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-4">
                  <tool.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>{tool.name}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}