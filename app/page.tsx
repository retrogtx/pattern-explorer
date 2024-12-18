'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [fileContent, setFileContent] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.type === 'text/plain') {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result
        setFileContent(typeof text === 'string' ? text : null)
      }
      reader.readAsText(selectedFile)
    } else {
      alert('Please select a valid .txt file')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>WhatsApp Chat Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="file"
              accept=".txt"
              onChange={handleFileChange}
            />
            {file && (
              <p className="text-sm text-green-600">
                File uploaded: {file.name}
              </p>
            )}
            {fileContent && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">File Content:</h2>
                <div className="bg-gray-100 p-4 rounded-md max-h-60 overflow-y-auto">
                  <pre className="whitespace-pre-wrap">{fileContent}</pre>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

