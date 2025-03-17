"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, ThumbsUp, Flag, Send } from "lucide-react"

interface Comment {
  id: string
  author: string
  authorInitials: string
  content: string
  timestamp: string
  likes: number
  userLiked: boolean
}

export function CommunityDiscussion() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Budi Santoso",
      authorInitials: "BS",
      content:
        "This case shows how deeply corruption has penetrated our institutions. We need stronger oversight and whistleblower protections.",
      timestamp: "2 hours ago",
      likes: 24,
      userLiked: false,
    },
    {
      id: "2",
      author: "Siti Rahayu",
      authorInitials: "SR",
      content: "I'm shocked by the amount of money stolen. That could have built schools and hospitals in my district.",
      timestamp: "5 hours ago",
      likes: 18,
      userLiked: false,
    },
    {
      id: "3",
      author: "Ahmad Wijaya",
      authorInitials: "AW",
      content:
        "We should organize community watchdog groups to monitor government projects in our areas. Local citizens can spot corruption more easily than distant officials.",
      timestamp: "1 day ago",
      likes: 32,
      userLiked: true,
    },
  ])

  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLike = (id: string) => {
    if (!id) return

    setComments((prevComments) => {
      if (!prevComments) return []

      return prevComments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            likes: comment.userLiked ? comment.likes - 1 : comment.likes + 1,
            userLiked: !comment.userLiked,
          }
        }
        return comment
      })
    })
  }

  const handleSubmit = () => {
    if (!newComment || !newComment.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newCommentObj: Comment = {
        id: Date.now().toString(),
        author: "You",
        authorInitials: "YO",
        content: newComment,
        timestamp: "Just now",
        likes: 0,
        userLiked: false,
      }

      setComments((prevComments) => [newCommentObj, ...(prevComments || [])])
      setNewComment("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Community Discussion
        </CardTitle>
        <CardDescription>Join the conversation about this corruption case</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-3">
            <Avatar>
              <AvatarFallback>YO</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="resize-none"
              />
              <div className="flex justify-end mt-2">
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  disabled={!newComment || !newComment.trim() || isSubmitting}
                  className="gap-1"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Posting..." : "Post"}
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            {comments &&
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar>
                    <AvatarFallback>{comment.authorInitials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{comment.author}</p>
                        <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{comment.content}</p>
                    <div className="flex gap-4 mt-2">
                      <button
                        className={`text-xs flex items-center gap-1 ${comment.userLiked ? "text-primary" : "text-muted-foreground"}`}
                        onClick={() => handleLike(comment.id)}
                      >
                        <ThumbsUp className="h-3 w-3" />
                        {comment.likes}
                      </button>
                      <button className="text-xs flex items-center gap-1 text-muted-foreground">
                        <Flag className="h-3 w-3" />
                        Report
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-center">
        <Button variant="outline" size="sm">
          View All Comments
        </Button>
      </CardFooter>
    </Card>
  )
}

