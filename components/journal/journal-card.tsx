import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { ar } from "date-fns/locale"

interface JournalCardProps {
  journal: {
    id: string
    content: string
    tags: string[]
    createdAt: string
    sentiment?: string
  }
}

export function JournalCard({ journal }: JournalCardProps) {
  const sentimentColor = {
    positive: "bg-green-100 text-green-800",
    negative: "bg-red-100 text-red-800",
    neutral: "bg-blue-100 text-blue-800",
  }[journal.sentiment || "neutral"]

  return (
    <Card className="rounded-xl overflow-hidden group hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="font-aalmaghribi text-lg">
        {journal.content.length > 150 ? `${journal.content.slice(0, 150)}...` : journal.content}
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {journal.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <span>
          {formatDistanceToNow(new Date(journal.createdAt), {
            addSuffix: true,
            locale: ar,
          })}
        </span>
        {journal.sentiment && (
          <Badge variant="outline" className={sentimentColor}>
            {journal.sentiment}
          </Badge>
        )}
      </CardFooter>
    </Card>
  )
}

