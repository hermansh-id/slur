"use client"

import type React from "react"

import { useState } from "react"
import { AlertTriangle, Shield, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function ReportCorruption() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Shield className="h-4 w-4" />
          Report Corruption
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle>Report Corruption</DialogTitle>
              <DialogDescription>
                Your report will be kept confidential and forwarded to the appropriate authorities.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    Your identity will be protected. You can report anonymously if you prefer.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name (optional)
                  </Label>
                  <Input id="name" className="col-span-3" placeholder="Anonymous" />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email (optional)
                  </Label>
                  <Input id="email" className="col-span-3" type="email" placeholder="For follow-up if needed" />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <div className="col-span-3">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bribery">Bribery</SelectItem>
                        <SelectItem value="embezzlement">Embezzlement</SelectItem>
                        <SelectItem value="fraud">Fraud</SelectItem>
                        <SelectItem value="nepotism">Nepotism</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input id="location" className="col-span-3" placeholder="City, Province" />
                </div>

                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    className="col-span-3"
                    placeholder="Provide details about the corruption incident"
                    rows={5}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold">Report Submitted</h2>
            <p className="text-muted-foreground">
              Thank you for your report. Your information will be reviewed by our team and forwarded to the appropriate
              authorities.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setIsOpen(false)
              }}
              variant="outline"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

