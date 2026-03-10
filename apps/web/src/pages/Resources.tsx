import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import {
  Search,
  BookOpen,
  Video,
  FileText,
  Link as LinkIcon,
  Download,
  ExternalLink,
  Star,
  Clock,
  Filter
} from "lucide-react";

const resources = [
  {
    id: 1,
    title: "JavaScript: The Good Parts",
    type: "book",
    category: "resources:categories.javascript",
    description: "resources:mock.jsGoodParts",
    rating: 4.8,
    downloads: 1250,
    url: "#"
  },
  {
    id: 2,
    title: "React Hooks Tutorial",
    type: "video",
    category: "resources:categories.react",
    description: "resources:mock.reactHooks",
    rating: 4.9,
    duration: "2h 30m",
    url: "#"
  },
  {
    id: 3,
    title: "TypeScript Handbook",
    type: "document",
    category: "resources:categories.typescript",
    description: "resources:mock.tsHandbook",
    rating: 4.7,
    pages: 150,
    url: "#"
  },
  {
    id: 4,
    title: "MDN Web Docs",
    type: "link",
    category: "resources:categories.web",
    description: "resources:mock.mdn",
    rating: 5.0,
    url: "https://developer.mozilla.org"
  },
  {
    id: 5,
    title: "Python for Data Science",
    type: "book",
    category: "resources:categories.python",
    description: "resources:mock.pythonDataScience",
    rating: 4.6,
    downloads: 890,
    url: "#"
  },
  {
    id: 6,
    title: "Node.js Best Practices",
    type: "document",
    category: "resources:categories.nodejs",
    description: "resources:mock.nodeBestPractices",
    rating: 4.5,
    pages: 80,
    url: "#"
  },
  {
    id: 7,
    title: "resources:mock.gitGithub.title",
    type: "video",
    category: "resources:categories.tools",
    description: "resources:mock.gitGithub",
    rating: 4.8,
    duration: "1h 45m",
    url: "#"
  },
  {
    id: 8,
    title: "CSS Tricks",
    type: "link",
    category: "resources:categories.css",
    description: "resources:mock.cssTricks",
    rating: 4.7,
    url: "https://css-tricks.com"
  },
];

const categories = ["resources:categories.all", "resources:categories.javascript", "resources:categories.react", "resources:categories.typescript", "resources:categories.python", "resources:categories.nodejs", "resources:categories.css", "resources:categories.web", "resources:categories.tools"];

const Resources = () => {
  const { t } = useTranslation(["common", "resources"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("resources:categories.all");
  const [selectedType, setSelectedType] = useState("all");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "book": return BookOpen;
      case "video": return Video;
      case "document": return FileText;
      case "link": return LinkIcon;
      default: return FileText;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "book": return t("resources:types.book");
      case "video": return t("resources:types.video");
      case "document": return t("resources:types.document");
      case "link": return t("resources:types.link");
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "book": return "bg-blue-500";
      case "video": return "bg-red-500";
      case "document": return "bg-green-500";
      case "link": return "bg-purple-500";
      default: return "bg-muted";
    }
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(resource.description as any).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "resources:categories.all" || resource.category === selectedCategory;
    const matchesType = selectedType === "all" || resource.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("resources:title")}</h1>
          <p className="text-muted-foreground">{t("resources:subtitle")}</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("resources:placeholders.search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs value={selectedType} onValueChange={setSelectedType} className="w-auto">
            <TabsList>
              <TabsTrigger value="all">{t("resources:types.all")}</TabsTrigger>
              <TabsTrigger value="book">{t("resources:types.book")}</TabsTrigger>
              <TabsTrigger value="video">{t("resources:types.video")}</TabsTrigger>
              <TabsTrigger value="document">{t("resources:types.document")}</TabsTrigger>
              <TabsTrigger value="link">{t("resources:types.link")}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {t(category as any)}
            </Button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((resource) => {
            const Icon = getTypeIcon(resource.type);
            return (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${getTypeColor(resource.type)}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold truncate">{resource.title.startsWith('resources:') ? t(resource.title as any) : resource.title}</h3>
                        <Badge variant="secondary" className="shrink-0">
                          {t(resource.category as any)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {t(resource.description as any)}
                      </p>

                      <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-warning fill-warning" />
                          {resource.rating}
                        </span>
                        {resource.duration && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {resource.duration}
                          </span>
                        )}
                        {resource.downloads && (
                          <span className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            {resource.downloads}
                          </span>
                        )}
                        {resource.pages && (
                          <span className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            {resource.pages} {t("resources:fields.pages")}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="flex-1">
                          {resource.type === "link" ? (
                            <>
                              <ExternalLink className="h-4 w-4 mr-1" />
                              {t("resources:actions.access")}
                            </>
                          ) : resource.type === "video" ? (
                            <>
                              <Video className="h-4 w-4 mr-1" />
                              {t("resources:actions.watch")}
                            </>
                          ) : (
                            <>
                              <Download className="h-4 w-4 mr-1" />
                              {t("resources:actions.download")}
                            </>
                          )}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">{t("resources:messages.noResources")}</p>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default Resources;
