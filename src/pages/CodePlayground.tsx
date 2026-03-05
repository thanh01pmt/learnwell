import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import {
  Play,
  RotateCcw,
  Copy,
  Download,
  Share2,
  CheckCircle,
  XCircle,
  Clock,
  Lightbulb,
  Code,
  Terminal
} from "lucide-react";

const challenges = [
  {
    id: 1,
    title: "playground:exercises.reverseString.title",
    difficulty: "playground:difficulty.easy",
    description: "playground:exercises.reverseString.desc",
    example: "Input: 'hello' → Output: 'olleh'",
    testCases: [
      { input: "'hello'", expected: "'olleh'" },
      { input: "'JavaScript'", expected: "'tpircSavaJ'" },
    ],
    starterCode: `function reverseString(str) {
  // Write your code here
  
}`,
  },
  {
    id: 2,
    title: "playground:exercises.fibonacci.title",
    difficulty: "playground:difficulty.medium",
    description: "playground:exercises.fibonacci.desc",
    example: "Input: 6 → Output: 8 (0,1,1,2,3,5,8)",
    testCases: [
      { input: "0", expected: "0" },
      { input: "6", expected: "8" },
    ],
    starterCode: `function fibonacci(n) {
  // Write your code here
  
}`,
  },
  {
    id: 3,
    title: "playground:exercises.palindrome.title",
    difficulty: "playground:difficulty.easy",
    description: "playground:exercises.palindrome.desc",
    example: "Input: 'racecar' → Output: true",
    testCases: [
      { input: "'racecar'", expected: "true" },
      { input: "'hello'", expected: "false" },
    ],
    starterCode: `function isPalindrome(str) {
  // Write your code here
  
}`,
  },
];

const CodePlayground = () => {
  const { t } = useTranslation(["common", "playground"]);
  const [selectedChallenge, setSelectedChallenge] = useState(challenges[0]);
  const [code, setCode] = useState(selectedChallenge.starterCode);
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<{ passed: boolean; input: string; expected: string; actual: string }[]>([]);

  const handleRun = () => {
    setIsRunning(true);
    setOutput(t("playground:output.running"));

    // Simulate code execution
    setTimeout(() => {
      setOutput(t("playground:output.default"));
      setTestResults([
        { passed: true, input: selectedChallenge.testCases[0].input, expected: selectedChallenge.testCases[0].expected, actual: selectedChallenge.testCases[0].expected },
        { passed: false, input: selectedChallenge.testCases[1].input, expected: selectedChallenge.testCases[1].expected, actual: "undefined" },
      ]);
      setIsRunning(false);
    }, 1000);
  };

  const handleReset = () => {
    setCode(selectedChallenge.starterCode);
    setOutput("");
    setTestResults([]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "playground:difficulty.easy": return "bg-green-500";
      case "playground:difficulty.medium": return "bg-yellow-500";
      case "playground:difficulty.hard": return "bg-red-500";
      default: return "bg-muted";
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Code Playground</h1>
            <p className="text-muted-foreground">{t("playground:subtitle")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Challenges List */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("playground:sections.exercises")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {challenges.map((challenge) => (
                  <button
                    key={challenge.id}
                    onClick={() => {
                      setSelectedChallenge(challenge);
                      setCode(challenge.starterCode);
                      setOutput("");
                      setTestResults([]);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${selectedChallenge.id === challenge.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 hover:bg-muted"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{challenge.title}</span>
                      <Badge className={`${getDifficultyColor(challenge.difficulty)} text-white text-xs`}>
                        {t(challenge.difficulty)}
                      </Badge>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Challenge Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-warning" />
                  {t("common:description")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{t(selectedChallenge.description)}</p>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-mono">{selectedChallenge.example}</p>
                </div>
                <div>
                  <p className="font-medium mb-2">Test cases:</p>
                  {selectedChallenge.testCases.map((tc, i) => (
                    <div key={i} className="text-sm font-mono p-2 bg-muted/50 rounded mb-1">
                      Input: {tc.input} → Expected: {tc.expected}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Code Editor */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="overflow-hidden">
              <CardHeader className="py-3 px-4 border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    <span className="font-medium">{t(selectedChallenge.title)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(code)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-[300px] font-mono text-sm border-0 rounded-none resize-none focus-visible:ring-0"
                  placeholder={t("playground:editor.placeholder")}
                />
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button onClick={handleRun} disabled={isRunning} className="gap-2">
                {isRunning ? (
                  <Clock className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {isRunning ? t("playground:output.running") : t("playground:actions.run")}
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>

            {/* Output */}
            <Card>
              <CardHeader className="py-3 px-4 border-b bg-muted/30">
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  <span className="font-medium">Output</span>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <Tabs defaultValue="output">
                  <TabsList className="mb-4">
                    <TabsTrigger value="output">Console</TabsTrigger>
                    <TabsTrigger value="tests">
                      Test Results
                      {testResults.length > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {testResults.filter(t => t.passed).length}/{testResults.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="output">
                    <pre className="bg-muted p-4 rounded-lg font-mono text-sm min-h-[100px] overflow-auto">
                      {output || t("playground:output.placeholder")}
                    </pre>
                  </TabsContent>

                  <TabsContent value="tests">
                    <div className="space-y-2">
                      {testResults.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">
                          {t("playground:output.runToSeeResults")}
                        </p>
                      ) : (
                        testResults.map((result, i) => (
                          <div
                            key={i}
                            className={`p-3 rounded-lg ${result.passed ? "bg-success/10" : "bg-destructive/10"
                              }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {result.passed ? (
                                <CheckCircle className="h-5 w-5 text-success" />
                              ) : (
                                <XCircle className="h-5 w-5 text-destructive" />
                              )}
                              <span className="font-medium">Test case {i + 1}</span>
                              <Badge variant={result.passed ? "default" : "destructive"}>
                                {result.passed ? "Passed" : "Failed"}
                              </Badge>
                            </div>
                            <div className="text-sm font-mono space-y-1">
                              <p>Input: {result.input}</p>
                              <p>Expected: {result.expected}</p>
                              <p>Actual: {result.actual}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CodePlayground;
