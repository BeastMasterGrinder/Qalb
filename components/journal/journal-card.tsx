import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import styles from "./styles.module.css"

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
    joy: styles.joy,
    sadness: styles.sadness,
    anger: styles.anger,
    fear: styles.fear,
  }[journal.sentiment || "neutral"]

  return (
    <Link href={`/journals/${journal.id}`} className="rounded-xl overflow-hidden group hover:shadow-lg transition-shadow duration-200">
      <Card className="rounded-xl overflow-hidden group hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="text-xl">
            {journal.content.length > 150 ? `${journal.content.slice(0, 150)}...` : journal.content}
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {journal.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className={"text-sm"}>
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <span>
            {formatDistanceToNow(new Date(journal.createdAt), {
              addSuffix: true
            })}
          </span>
          {journal.sentiment && (
            <Badge variant="outline" className={sentimentColor}>
              {journal.sentiment}
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}

