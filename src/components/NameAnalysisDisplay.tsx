import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ParsedNameData } from "@/lib/nameParser";

interface NameAnalysisDisplayProps {
  data: ParsedNameData;
  searchedName: string;
}

export const NameAnalysisDisplay = ({ data, searchedName }: NameAnalysisDisplayProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-foreground capitalize">
          {searchedName}
        </h2>
        <p className="text-muted-foreground">Name Analysis & Cultural Significance</p>
      </div>

      {/* Uniqueness Score */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-lg">Uniqueness Score</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="relative inline-block">
            <div className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {data.uniquenessScore}
            </div>
            <span className="text-2xl text-muted-foreground ml-1">/100</span>
          </div>
          <div className="mt-4">
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500"
                style={{ width: `${data.uniquenessScore}%` }}
              />
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {data.uniquenessScore >= 75
              ? "Very Unique - Rare and distinctive"
              : data.uniquenessScore >= 50
              ? "Moderately Unique - Distinctive but not uncommon"
              : data.uniquenessScore >= 25
              ? "Common - Widely used across regions"
              : "Very Common - Extremely popular worldwide"}
          </p>
        </CardContent>
      </Card>

      {/* Cultural Meanings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🌍</span>
            Cultural Meanings & Origins
          </CardTitle>
          <CardDescription>
            How this name is interpreted across different cultures and regions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.meanings.map((meaning, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <Badge variant="secondary" className="mt-1 whitespace-nowrap">
                  {meaning.region}
                </Badge>
                <p className="text-foreground flex-1 leading-relaxed">
                  {meaning.meaning}
                </p>
              </div>
            </div>
          ))}
          {data.meanings.length === 0 && (
            <p className="text-muted-foreground text-center py-4">
              No cultural meanings available
            </p>
          )}
        </CardContent>
      </Card>

      {/* Additional Notes */}
      {data.notes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">📝</span>
              Additional Insights
            </CardTitle>
            <CardDescription>
              Interesting facts and usage patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {data.notes.map((note, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-foreground"
                >
                  <span className="text-primary mt-1 flex-shrink-0">•</span>
                  <span className="flex-1 leading-relaxed">{note}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
